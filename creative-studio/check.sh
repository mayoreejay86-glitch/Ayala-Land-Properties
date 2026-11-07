#!/usr/bin/env bash
# Ad Studio check: confirms every tool the ad workflow uses, then renders a
# 6-second 1080x1920 test ad through the whole pipeline: Ken Burns on a still,
# color grade, HTML overlay, brand-font titles, burned-in captions, end card,
# loudness normalization, and a Meta/TikTok-ready H.264 export. It also tests
# reframing, stabilization, GPS stripping and a 4:5 static ad.
#
#   bash creative-studio/check.sh [output-dir]     # exits 1 if anything fails
set -uo pipefail

OUT="${1:-$(mktemp -d)}"; mkdir -p "$OUT"; OUT="$(cd "$OUT" && pwd)"
FONTS=/usr/local/share/fonts/adstudio   # setup.sh names files <Family>-<weight>[-Italic].ttf
pass=0; fail=0; warn=0
ok()   { printf '  PASS  %s\n' "$*"; pass=$((pass+1)); }
bad()  { printf '  FAIL  %s\n' "$*"; fail=$((fail+1)); }
note() { printf '  WARN  %s\n' "$*"; warn=$((warn+1)); }
run() {  # run <label> <command...>: PASS if the command exits 0
  local label="$1"; shift
  if "$@" >"$OUT/step.log" 2>&1; then ok "$label"
  else bad "$label"; tail -n 5 "$OUT/step.log" | sed 's/^/        /'; fi
}
ff() { ffmpeg -hide_banner -loglevel error -y "$@"; }

echo "Tools"
for t in ffmpeg ffprobe convert mediainfo exiftool cwebp node python3; do
  run "$t" command -v "$t"
done

echo "ffmpeg features"
filters="$(ffmpeg -hide_banner -filters 2>/dev/null | awk '{print $2}')"
for f in drawtext subtitles zoompan xfade overlay gblur vidstabdetect \
         vidstabtransform loudnorm ebur128 lut3d; do
  run "filter $f" grep -qx "$f" <<<"$filters"
done
encoders="$(ffmpeg -hide_banner -encoders 2>/dev/null | awk '{print $2}')"
for e in libx264 libx265 aac libvpx-vp9 libwebp; do
  run "encoder $e" grep -qx "$e" <<<"$encoders"
done

echo "Fonts"
families="$(fc-list : family)"
for fam in "Cormorant Garamond" "Jost" "Montserrat ExtraBold" "Inter" "Noto Color Emoji"; do
  run "$fam" grep -qF "$fam" <<<"$families"
done
for file in CormorantGaramond-300 CormorantGaramond-300-Italic Jost-400 Jost-500 Jost-600 Montserrat-800; do
  run "font file $file.ttf" test -s "$FONTS/$file.ttf"
done

echo "Python libraries"
for m in cv2 PIL numpy scenedetect pysubs2 fontTools faster_whisper; do
  run "import $m" python3 -I -c "import $m"
done

echo "Pipeline (output: $OUT)"
# Stand-in 3:2 property photo: warm sky gradient with a tower skyline.
run "stand-in photo (ImageMagick)" convert -size 2400x1600 gradient:'#F3E3C3'-'#5B4A3A' \
  -fill '#2A2420' -draw 'rectangle 250,700 650,1600' -draw 'rectangle 760,420 1180,1600' \
  -draw 'rectangle 1290,880 1640,1600' -draw 'rectangle 1760,560 2150,1600' \
  -fill '#F0D9A0' -draw 'rectangle 840,520 1100,540' "$OUT/photo.jpg"

run "write + strip GPS (exiftool)" bash -c "
  exiftool -q -overwrite_original -GPSLatitude=14.55 -GPSLatitudeRef=N \
    -GPSLongitude=121.02 -GPSLongitudeRef=E '$OUT/photo.jpg' &&
  exiftool -q -overwrite_original -gps:all= '$OUT/photo.jpg' &&
  [ -z \"\$(exiftool -q -gps:all '$OUT/photo.jpg')\" ]"

run "WebP still (cwebp)" cwebp -quiet -q 85 "$OUT/photo.jpg" -o "$OUT/photo.webp"

run "Ken Burns 9:16 from still (zoompan)" ff -i "$OUT/photo.jpg" -vf \
  "crop=ih*9/16:ih,scale=2160:3840,zoompan=z='min(zoom+0.0007,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1080x1920:fps=30,format=yuv420p" \
  -frames:v 120 -c:v libx264 -crf 18 -preset veryfast "$OUT/kenburns.mp4"

run "bright & airy grade (eq + colorbalance)" ff -i "$OUT/kenburns.mp4" -vf \
  "eq=brightness=0.03:contrast=1.05:saturation=1.10:gamma=1.04,colorbalance=rm=0.03:bm=-0.03:rh=0.02:bh=-0.02" \
  -c:v libx264 -crf 18 -preset veryfast "$OUT/graded.mp4"

run "16:9 test clip" ff -f lavfi -i "testsrc2=s=1920x1080:r=30:d=3" \
  -c:v libx264 -crf 20 -preset veryfast -pix_fmt yuv420p "$OUT/landscape.mp4"

run "reframe 16:9 -> 9:16 with blurred fill" ff -i "$OUT/landscape.mp4" -filter_complex \
  "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40,eq=brightness=-0.08[bg];[0:v]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p" \
  -c:v libx264 -crf 20 -preset veryfast "$OUT/reframed_9x16.mp4"

run "stabilize, pass 1 (vidstabdetect)" ff -i "$OUT/landscape.mp4" \
  -vf "vidstabdetect=shakiness=6:accuracy=15:result=$OUT/transforms.trf" -f null -
run "stabilize, pass 2 (vidstabtransform)" ff -i "$OUT/landscape.mp4" \
  -vf "vidstabtransform=input=$OUT/transforms.trf:smoothing=30:zoom=2,unsharp=5:5:0.8" \
  -c:v libx264 -crf 20 -preset veryfast "$OUT/stabilized.mp4"

run "HTML overlay + 4:5 static ad (Playwright/Chromium)" node - "$OUT" <<'JS'
const fs = require('fs');
const { chromium } = require('playwright');
const out = process.argv[2];
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  // Price tag with a transparent background, overlaid on the video later.
  await page.setContent(`<body style="margin:0;background:transparent">
    <div id="tag" style="display:inline-flex;align-items:center;gap:24px;padding:26px 44px;
      background:rgba(26,26,26,.82);border:2px solid #B8960C;color:#fff">
      <span style="font:500 30px Jost;letter-spacing:.2em;color:#D4AF37">📍 RFO · MAKATI</span>
      <span style="font:600 54px Jost">From ₱15M</span></div></body>`);
  await page.locator('#tag').screenshot({ path: `${out}/price_tag.png`, omitBackground: true });
  // 4:5 feed still. Load it from a file: pages built with setContent may not read local images.
  fs.writeFileSync(`${out}/static_4x5.html`, `<!doctype html><meta charset="utf-8">
    <body style="margin:0;width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Jost;color:#fff">
    <img id="photo" src="photo.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,0) 35%,rgba(10,10,10,.78))"></div>
    <div style="position:absolute;left:80px;right:80px;bottom:110px">
      <div style="font:500 26px Jost;letter-spacing:.25em;color:#D4AF37;margin-bottom:24px">READY FOR OCCUPANCY</div>
      <div style="font:300 96px/1.05 'Cormorant Garamond'">Where Luxury<br>Becomes <i style="color:#D4AF37">Legacy</i></div>
      <div style="display:inline-block;margin-top:40px;padding:22px 44px;background:#B8960C;
        font:600 26px Jost;letter-spacing:.18em">BOOK A PRIVATE VIEWING</div></div></body>`);
  await page.goto(`file://${out}/static_4x5.html`);
  const loaded = await page.$eval('#photo', img => img.complete && img.naturalWidth > 0);
  if (!loaded) throw new Error('static ad: background photo did not load');
  await page.screenshot({ path: `${out}/static_4x5.png` });
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
JS

run "captions file (pysubs2 .ass)" python3 -I - "$OUT/captions.ass" <<'PY'
import sys, pysubs2
subs = pysubs2.SSAFile()
subs.info.update(PlayResX="1080", PlayResY="1920")
subs.styles["Default"] = pysubs2.SSAStyle(
    fontname="Montserrat ExtraBold", fontsize=66, bold=False,
    primarycolor=pysubs2.Color(255, 255, 255), outlinecolor=pysubs2.Color(0, 0, 0),
    outline=5, shadow=0, alignment=pysubs2.Alignment.BOTTOM_CENTER, marginv=700)
gold = r"{\c&H37AFD4&}"  # brand gold_light in .ass BGR order
subs.append(pysubs2.SSAEvent(start=400, end=1900, text="YOUR NEXT ADDRESS"))
subs.append(pysubs2.SSAEvent(start=1900, end=3400, text=f"IS READY {gold}TODAY"))
subs.save(sys.argv[1])
PY

# libass falls back to another font silently, so confirm what it picked.
run "captions resolve to Montserrat ExtraBold (libass)" bash -c "
  ffmpeg -hide_banner -loglevel verbose -f lavfi -i color=c=black:s=1080x1920:d=1 \
    -vf \"subtitles=filename='$OUT/captions.ass'\" -frames:v 30 -f null - 2>&1 |
  grep -q 'fontselect:.*Montserrat-800.ttf'"

run "compose final ad (overlay + titles + captions + end card + audio)" ff \
  -i "$OUT/graded.mp4" -i "$OUT/price_tag.png" \
  -f lavfi -i "color=c=0x1A1A1A:s=1080x1920:r=30:d=2.5" \
  -f lavfi -i "sine=frequency=196:sample_rate=48000:duration=6" \
  -filter_complex "\
[0:v][1:v]overlay=x=(W-w)/2:y=H*0.42:enable='gte(t,0.6)',\
drawtext=fontfile=$FONTS/CormorantGaramond-300.ttf:text='Where Luxury':fontsize=118:fontcolor=white:x=(w-text_w)/2:y=h*0.17,\
drawtext=fontfile=$FONTS/CormorantGaramond-300-Italic.ttf:text='Becomes Legacy':fontsize=118:fontcolor=0xD4AF37:x=(w-text_w)/2:y=h*0.17+132,\
subtitles=filename='$OUT/captions.ass',fps=30,settb=AVTB,format=yuv420p[v0];\
[2:v]drawtext=fontfile=$FONTS/Jost-500.ttf:text='REE JAY MAYO':fontsize=66:fontcolor=white:x=(w-text_w)/2:y=h*0.34,\
drawtext=fontfile=$FONTS/Jost-400.ttf:text='Premier Property Specialist':fontsize=40:fontcolor=0xD4AF37:x=(w-text_w)/2:y=h*0.34+96,\
drawtext=fontfile=$FONTS/Jost-600.ttf:text='+63 930 616 6011':fontsize=58:fontcolor=white:x=(w-text_w)/2:y=h*0.47,\
drawtext=fontfile=$FONTS/Jost-600.ttf:text='BOOK A PRIVATE VIEWING':fontsize=42:fontcolor=white:box=1:boxcolor=0xB8960C:boxborderw=30:x=(w-text_w)/2:y=h*0.58,\
fps=30,settb=AVTB,format=yuv420p[v1];\
[v0][v1]xfade=transition=fade:duration=0.5:offset=3.5[v];\
[3:a]volume=0.3,afade=t=in:d=0.4,afade=t=out:st=5.3:d=0.7,loudnorm=I=-14:TP=-1:LRA=11,aresample=48000[a]" \
  -map "[v]" -map "[a]" -t 6 -r 30 -c:v libx264 -profile:v high -preset medium -crf 18 \
  -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -movflags +faststart "$OUT/ad_9x16.mp4"

echo "Export checks"
f="$OUT/ad_9x16.mp4"
v="$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,pix_fmt -of default=nw=1 "$f" 2>/dev/null | sort | tr '\n' ' ')"
run "video is H.264 1080x1920 yuv420p ($v)" grep -q "codec_name=h264 height=1920 pix_fmt=yuv420p width=1080" <<<"$v"
a="$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate -of default=nw=1 "$f" 2>/dev/null | sort | tr '\n' ' ')"
run "audio is AAC 48 kHz ($a)" grep -q "codec_name=aac sample_rate=48000" <<<"$a"
d="$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f" 2>/dev/null)"
run "duration is 6 s (${d:-?})" awk -v d="${d:-0}" 'BEGIN{exit !(d>5.9 && d<6.1)}'
s="$(mediainfo --Inform='General;%IsStreamable%' "$f" 2>/dev/null)"
run "fast start for instant playback (mediainfo IsStreamable=${s:-?})" test "$s" = "Yes"
lufs="$(ffmpeg -hide_banner -nostats -i "$f" -af ebur128 -f null - 2>&1 | awk '/Integrated loudness/{x=1} x&&/ I:/{print $2; exit}')"
run "loudness near -14 LUFS (${lufs:-?})" awk -v i="${lufs:--99}" 'BEGIN{exit !(i>-16 && i<-12)}'
r="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$OUT/reframed_9x16.mp4" 2>/dev/null)"
run "reframed clip is 1080x1920 (${r:-?})" test "$r" = "1080x1920"
run "static ad is 1080x1350" test "$(identify -format '%wx%h' "$OUT/static_4x5.png" 2>/dev/null)" = "1080x1350"
run "price tag PNG has transparency" grep -qiE "^(true|blend)" <<<"$(identify -format '%A' "$OUT/price_tag.png" 2>/dev/null)"

run "OpenCV reads the ad + face detector loads" python3 -I - "$f" <<'PY'
import sys, cv2
cap = cv2.VideoCapture(sys.argv[1]); frames, last = 0, None
while True:
    ok, img = cap.read()
    if not ok: break
    frames, last = frames + 1, img
cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
assert frames >= 170 and not cascade.empty(), (frames, cascade.empty())
cascade.detectMultiScale(cv2.cvtColor(last, cv2.COLOR_BGR2GRAY))
PY
run "scene detection (PySceneDetect)" python3 -I -c \
  "import sys; from scenedetect import detect, ContentDetector; detect(sys.argv[1], ContentDetector())" "$f"

run "preview frames" bash -c "ffmpeg -hide_banner -loglevel error -y -ss 2 -i '$f' -frames:v 1 '$OUT/preview_hook.png' &&
  ffmpeg -hide_banner -loglevel error -y -ss 5.2 -i '$f' -frames:v 1 '$OUT/preview_endcard.png'"

echo "Speech-to-text captions"
if python3 -I -c "from faster_whisper import download_model as d; d('small', local_files_only=True)" >/dev/null 2>&1; then
  run "Whisper 'small' loads and transcribes" python3 -I - "$f" <<'PY'
import sys
from faster_whisper import WhisperModel
segments, info = WhisperModel("small", device="cpu", compute_type="int8").transcribe(sys.argv[1])
list(segments)
PY
else
  note "Whisper model not downloaded: needs huggingface.co (blocked by this environment's network)"
fi

echo
echo "Result: $pass passed, $fail failed, $warn warnings. Files: $OUT"
[ "$fail" -eq 0 ]
