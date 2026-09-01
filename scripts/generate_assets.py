#!/usr/bin/env python3
"""Generate the Open Graph preview image.

The downloadable CV is files/Alun_Rees_CV.pdf — the authored file, not generated here.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "images"


def font(size, bold=False):
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def make_og():
    width, height = 1200, 630
    img = Image.new("RGB", (width, height), "#ffffff")
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, 16, height), fill="#0984e3")
    draw.rectangle((0, height - 16, width, height), fill="#0984e3")

    draw.text((80, 160), "AR", font=font(72, bold=True), fill="#0984e3")
    draw.text((80, 260), "Alun Rees-Lindley", font=font(64, bold=True), fill="#2d3436")
    draw.text(
        (80, 350),
        "Data Scientist  |  Statistical Methodologist  |  Developer",
        font=font(28),
        fill="#636e72",
    )
    draw.text(
        (80, 420),
        "Official statistics, knowledge graphs, and applied AI",
        font=font(26),
        fill="#636e72",
    )
    draw.text((80, 530), "areeslindley.github.io", font=font(24, bold=True), fill="#0984e3")

    out = IMAGES / "og-preview.png"
    img.save(out, "PNG")
    print(f"wrote {out}")


if __name__ == "__main__":
    make_og()
