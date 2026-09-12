#!/usr/bin/env bash
# Regenerate The-Premier-Journal-Parklinks.pdf from newsletter-pdf-source.html
# Requires: pip install weasyprint

set -euo pipefail
SRC="$(dirname "$0")/newsletter-pdf-source.html"
OUT="$(dirname "$0")/The-Premier-Journal-Parklinks.pdf"

python3 -c "
from weasyprint import HTML
HTML('$SRC').write_pdf('$OUT')
print('Wrote:', '$OUT')
"
