# -*- coding: utf-8 -*-
"""Watermark every resume template preview with "SMART ONLINE SERVICE".

Tiled diagonal text across the whole page so the preview cannot be cropped
clean, plus a solid footer strip. Originals are kept in assets/samples/_original/
so the watermark can be re-rendered later if the wording changes.
"""
import io, os, glob, shutil
from PIL import Image, ImageDraw, ImageFont

ROOT = r"C:\Users\Arava Anantha Rao\Desktop\smartonline"
SAMPLES = os.path.join(ROOT, "assets", "samples")
ORIG = os.path.join(SAMPLES, "_original")
TEXT = "SMART ONLINE SERVICE"

os.makedirs(ORIG, exist_ok=True)


def font(size, bold=True):
    for p in (r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
              r"C:\Windows\Fonts\arialbd.ttf", r"C:\Windows\Fonts\arial.ttf"):
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()


def watermark(path):
    name = os.path.basename(path)
    backup = os.path.join(ORIG, name)
    # first run: stash the clean original; later runs: always start from it
    if not os.path.exists(backup):
        shutil.copy2(path, backup)
    im = Image.open(backup).convert("RGB")
    w, h = im.size

    # --- tiled diagonal watermark -------------------------------------
    fsize = max(14, int(w / 17))
    f = font(fsize)
    layer = Image.new("RGBA", (w * 2, h * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    bbox = d.textbbox((0, 0), TEXT, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    step_x, step_y = int(tw * 1.45), int(th * 5.5)
    for row, y in enumerate(range(0, h * 2, step_y)):
        offset = (row % 2) * (step_x // 2)
        for x in range(-step_x, w * 2, step_x):
            d.text((x + offset, y), TEXT, font=f, fill=(20, 20, 20, 46))
    layer = layer.rotate(30, resample=Image.BICUBIC, center=(w, h))
    layer = layer.crop((w // 2, h // 2, w // 2 + w, h // 2 + h))
    im = Image.alpha_composite(im.convert("RGBA"), layer).convert("RGB")

    # --- footer strip --------------------------------------------------
    strip_h = max(20, int(h * 0.042))
    strip = Image.new("RGB", (w, strip_h), (13, 13, 13))
    sd = ImageDraw.Draw(strip)
    sf = font(max(10, int(strip_h * 0.5)))
    label = TEXT + "   ·   smartonlineservice.in"
    lb = sd.textbbox((0, 0), label, font=sf)
    sd.text(((w - (lb[2] - lb[0])) // 2, (strip_h - (lb[3] - lb[1])) // 2 - lb[1]),
            label, font=sf, fill=(244, 180, 0))
    im.paste(strip, (0, h - strip_h))

    ext = os.path.splitext(path)[1].lower()
    if ext in (".jpg", ".jpeg"):
        im.save(path, "JPEG", quality=86, optimize=True)
    else:
        im.save(path, "PNG", optimize=True)
    return w, h


files = sorted(f for f in glob.glob(os.path.join(SAMPLES, "*"))
               if os.path.isfile(f) and f.lower().endswith((".jpg", ".jpeg", ".png")))
print("watermarking %d files..." % len(files))
for i, p in enumerate(files, 1):
    try:
        w, h = watermark(p)
        if i % 10 == 0 or i == len(files):
            print("  %d/%d  %s (%dx%d)" % (i, len(files), os.path.basename(p), w, h))
    except Exception as e:
        print("  FAILED", os.path.basename(p), e)
print("done — clean originals kept in assets/samples/_original/")
