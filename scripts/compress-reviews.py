#!/usr/bin/env python3
"""
Task 3: Compress review images.
Resize to max 800px width, re-save as WebP quality=80.
"""

import os
from PIL import Image

IMG_DIR = '/home/user/foorsa-website/assets/img'

def main():
    print("=" * 60)
    print("TASK 3: Compress review images")
    print("=" * 60)

    for i in range(1, 7):
        filename = f'review{i}.webp'
        filepath = os.path.join(IMG_DIR, filename)

        if not os.path.exists(filepath):
            print(f"  SKIP (not found): {filepath}")
            continue

        original_size = os.path.getsize(filepath)
        img = Image.open(filepath)
        original_dims = img.size
        print(f"\n  {filename}: {original_dims[0]}x{original_dims[1]}, {original_size / 1024:.0f} KB")

        # Resize if wider than 800px
        max_width = 800
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.LANCZOS)
            print(f"    Resized to {img.width}x{img.height}")

        # Save as WebP with quality 80
        img.save(filepath, 'WEBP', quality=80, method=4)
        new_size = os.path.getsize(filepath)
        reduction = (1 - new_size / original_size) * 100
        print(f"    Compressed: {original_size / 1024:.0f} KB -> {new_size / 1024:.0f} KB ({reduction:.1f}% reduction)")

    print("\nDone!")


if __name__ == '__main__':
    main()
