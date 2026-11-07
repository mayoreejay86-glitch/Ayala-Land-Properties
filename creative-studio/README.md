# Ad Studio

Tools, brand kit, and tested recipes for editing real estate ad creatives:
Reels, Stories, and TikTok videos, plus feed videos and static ads, in the
website's look (Cormorant Garamond, Jost, charcoal, cream, and gold).

```bash
bash creative-studio/setup.sh   # install (about a minute; safe to re-run)
bash creative-studio/check.sh   # verify every tool and render a 6-second test ad
```

`check.sh` renders a test ad through the whole pipeline. It confirms that each
font really resolved, since ffmpeg and libass fall back to other fonts
silently. It also checks the export: size, codec, fast start, and loudness.

## What gets installed

| Tool | Used for |
|---|---|
| **ffmpeg 6.1**, with libass, vidstab, zimg, x264/x265 | Cutting, stabilizing, grading, Ken Burns, captions, crossfades, export |
| **Chromium + Playwright** (preinstalled) | HTML/CSS overlays (price tags, end cards) and static ads, with full typography and emoji |
| **ImageMagick**, **cwebp** | Still images and web-ready WebP |
| **OpenCV 4.14** | Frame analysis, face detection for keeping the agent in frame when reframing |
| **PySceneDetect** | Finding the strongest shots in long walkthrough footage |
| **pysubs2** | Styled `.ass` caption files that ffmpeg burns in |
| **faster-whisper** | Speech-to-text for auto-captions (see [Captions from speech](#captions-from-speech)) |
| **mediainfo**, **exiftool** | Inspecting footage; removing GPS location from photos and clips |
| **Fonts** | Cormorant Garamond and Jost (the website's fonts), Montserrat for captions, plus Inter and Noto Color Emoji |

Two choices were deliberate:
- **No moviepy.** It needs Pillow below 12, which breaks the PDF tools already
  in the cloud image. ffmpeg does everything moviepy would.
- **OpenCV stays on 4.x.** OpenCV 5 removed `CascadeClassifier` face detection.

## Brand kit

`brand.json` holds the colors, fonts, contact details, and CTAs from the website.
It also has the colors in the `&HAABBGGRR` form that `.ass` captions use.

How each tool names the fonts:

| Where | How to name the font | Example |
|---|---|---|
| ffmpeg `drawtext` | `fontfile=` path. Files are named `<Family>-<weight>[-Italic].ttf` in `/usr/local/share/fonts/adstudio/` | `fontfile=/usr/local/share/fonts/adstudio/CormorantGaramond-300-Italic.ttf` |
| `.ass` captions (libass) | Family name that includes the weight | `Montserrat ExtraBold`, `Jost SemiBold` |
| HTML / Chromium | Plain CSS | `font: 300 96px 'Cormorant Garamond'` |

Don't write `font='Jost\:style=SemiBold'` in drawtext. ffmpeg silently renders
Inter instead.

## Ad format cheat sheet

| Placement | Size | Notes |
|---|---|---|
| Reels / Stories / TikTok / Shorts | 1080×1920 (9:16) | Keep text, logos, and CTAs inside roughly x 60–960, y 250–1250. The platforms' own buttons and captions cover the rest. |
| Facebook / Instagram feed | 1080×1350 (4:5) | Fills the most screen in mobile feeds |
| Feed, carousel | 1080×1080 (1:1) | |
| YouTube, website hero | 1920×1080 (16:9) | |

- **Structure:** hook in the first 2–3 s (price, location, or the best view),
  burned-in captions (most people watch muted), and a 2–3 s end card with one CTA.
  Stories and Reels ads usually run 6–15 s.
- **Export:** H.264 High, yuv420p, 30 fps, CRF 18, AAC 48 kHz at 192 kbps,
  `+faststart`, loudness around −14 LUFS with true peak at −1 dBTP.
- Platform specs change, so confirm them in Ads Manager or TikTok's guides
  before a big launch.

## Recipes

All of these were run and verified on this setup. Most are also part of `check.sh`.

```bash
# Inspect footage: resolution, frame rate, rotation, bitrate
mediainfo clip.mp4

# Remove GPS location before posting (photos / videos)
exiftool -overwrite_original -gps:all= photo.jpg
ffmpeg -i clip.mp4 -map_metadata -1 -c copy clean.mp4

# Find the best shots in a long walkthrough (cut list + one thumbnail per shot)
scenedetect -i walkthrough.mp4 -o shots detect-adaptive list-scenes save-images -n 1

# Stabilize handheld footage (two passes)
ffmpeg -i shaky.mp4 -vf vidstabdetect=shakiness=6:accuracy=15:result=t.trf -f null -
ffmpeg -i shaky.mp4 -vf "vidstabtransform=input=t.trf:smoothing=30:zoom=2,unsharp=5:5:0.8" \
  -c:v libx264 -crf 18 stable.mp4

# "Bright & airy" interior grade (a starting point; tune per clip)
ffmpeg -i in.mp4 -vf "eq=brightness=0.03:contrast=1.05:saturation=1.10:gamma=1.04,colorbalance=rm=0.03:bm=-0.03:rh=0.02:bh=-0.02" \
  -c:v libx264 -crf 18 graded.mp4

# Ken Burns: 4 s, 9:16, from a landscape listing photo
ffmpeg -i photo.jpg -vf "crop=ih*9/16:ih,scale=2160:3840,zoompan=z='min(zoom+0.0007,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=1080x1920:fps=30,format=yuv420p" \
  -frames:v 120 -c:v libx264 -crf 18 kenburns.mp4

# Reframe 16:9 footage to 9:16 over a blurred copy of itself
ffmpeg -i wide.mp4 -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40,eq=brightness=-0.08[bg];[0:v]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p" \
  -c:v libx264 -crf 18 -c:a copy vertical.mp4

# 4:5 feed version (center crop)
ffmpeg -i wide.mp4 -vf "scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350,format=yuv420p" \
  -c:v libx264 -crf 18 -c:a copy feed_4x5.mp4
```

**Captions:** write an `.ass` file with pysubs2. Use the style from `check.sh`:
Montserrat ExtraBold, white with a black outline, and the key word in gold
`{\c&H37AFD4&}`. Then burn it in with `-vf subtitles=filename=captions.ass`.

**Overlays and static ads:** build them as HTML and screenshot them with
Playwright. Use `omitBackground: true` to get a transparent PNG, then place it
with ffmpeg `overlay`. Load the page from a file (`page.goto('file://…')`) when
it uses local images. A page built with `setContent` can't read them.

**End card and crossfade:** add `fps=30,settb=AVTB,format=yuv420p` to both
inputs before `xfade`, or ffmpeg rejects the mismatched timebases. The full
compose command, with overlay, titles, captions, end card, and audio, is in
`check.sh`.

**Final export for Meta and TikTok:**

```bash
ffmpeg -i edit.mp4 -af loudnorm=I=-14:TP=-1:LRA=11 -r 30 \
  -c:v libx264 -profile:v high -preset medium -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart final_9x16.mp4
```

## Captions from speech

faster-whisper is installed, but its model downloads from **huggingface.co**.
The Default cloud environment blocks that host, so `check.sh` shows one warning
until it's allowed. Once it is, `setup.sh` downloads the `small` model
(about 480 MB). In Python:

```python
from faster_whisper import WhisperModel
model = WhisperModel("small", device="cpu", compute_type="int8")
segments, _ = model.transcribe("voiceover.wav", word_timestamps=True,
                               initial_prompt="Ayala Land Premier, Parklinks, Makati, BGC")
```

Use `"turbo"` instead of `"small"` for better accuracy on Taglish. It's a
larger download, about 1.6 GB, and slower on a CPU. Until the model is
available, captions can still be written by hand from the script.
