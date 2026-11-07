#!/usr/bin/env bash
# Ad Studio setup: installs the tools used to edit real estate ad creatives
# (Reels / Stories / feed video and static ads). Safe to re-run: it skips
# anything already installed.
#
#   bash creative-studio/setup.sh      # then verify: bash creative-studio/check.sh
#
# Written for Claude Code cloud sessions (Ubuntu 24.04, root), whose image
# already has Python 3, numpy, Pillow, Node, and Playwright with Chromium.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FONT_DIR=/usr/local/share/fonts/adstudio
SUDO=""; [ "$(id -u)" -eq 0 ] || SUDO="sudo"
say() { printf '\n==> %s\n' "$*"; }

say "1/4 System packages"
# ffmpeg: editing engine | imagemagick: stills | mediainfo: inspect specs
# exiftool: read or strip GPS/camera metadata | webp: web-ready stills
# fonts-inter + fonts-noto-color-emoji: caption font and emoji in overlays
pkgs=(ffmpeg imagemagick mediainfo libimage-exiftool-perl webp fontconfig
      fonts-inter fonts-noto-color-emoji)
missing=()
for p in "${pkgs[@]}"; do dpkg -s "$p" >/dev/null 2>&1 || missing+=("$p"); done
if [ "${#missing[@]}" -gt 0 ]; then
  $SUDO apt-get update -qq
  $SUDO env DEBIAN_FRONTEND=noninteractive \
    apt-get install -y -qq --no-install-recommends "${missing[@]}" >/dev/null
  echo "installed: ${missing[*]}"
else
  echo "all present"
fi

say "2/4 Python libraries"
if command -v uv >/dev/null 2>&1; then
  $SUDO uv pip install --system -q -r "$HERE/requirements.txt"
else
  $SUDO python3 -m pip install -q -r "$HERE/requirements.txt"
fi

say "3/4 Brand fonts (Google Fonts, SIL Open Font License) -> $FONT_DIR"
# Cormorant Garamond + Jost match the website; Montserrat is for bold captions.
CSS_URL='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&family=Montserrat:ital,wght@0,500;0,600;0,700;0,800;0,900;1,800'
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
curl -fsS "$CSS_URL" -o "$tmp/fonts.css"   # curl's default user agent gets .ttf files
python3 -I - "$tmp/fonts.css" > "$tmp/fonts.list" <<'PY'
import re, sys
css = open(sys.argv[1]).read()
for face in re.findall(r"@font-face\s*\{([^}]*)\}", css):
    family = re.search(r"font-family:\s*'([^']+)'", face).group(1).replace(" ", "")
    italic = "-Italic" if "font-style: italic" in face else ""
    weight = re.search(r"font-weight:\s*(\d+)", face).group(1)
    url = re.search(r"url\((https://\S+?\.ttf)\)", face).group(1)
    print(f"{family}-{weight}{italic}.ttf {url}")
PY
$SUDO mkdir -p "$FONT_DIR"
while read -r name url; do
  [ -s "$FONT_DIR/$name" ] || $SUDO curl -fsS -o "$FONT_DIR/$name" "$url"
done < "$tmp/fonts.list"
$SUDO fc-cache -f "$FONT_DIR" >/dev/null
echo "$(ls "$FONT_DIR" | wc -l) font files in $FONT_DIR"

say "4/4 Caption model (Whisper 'small' for faster-whisper, about 480 MB)"
if curl -fsS -o /dev/null --max-time 10 \
     https://huggingface.co/api/models/Systran/faster-whisper-small 2>/dev/null; then
  HF_HUB_DISABLE_XET=1 python3 -I -c \
    "from faster_whisper import download_model as d; print(d('small'))"
else
  echo "skipped: huggingface.co is blocked by this environment's network policy."
  echo "Everything else works; speech-to-text captions need huggingface.co allowed."
fi

say "Done. Verify with: bash $HERE/check.sh"
