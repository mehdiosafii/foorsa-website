#!/usr/bin/env python3
"""
Task 4: Convert blog PNGs to WebP and update HTML references.

- Convert all PNGs in assets/img/blog/ to WebP
- Update all HTML files referencing .png to .webp (in img src, meta tags, JSON-LD)
- Keep original PNGs as backup (or remove if desired)
"""

import os
import re
import glob
from PIL import Image

BASE_DIR = '/home/user/foorsa-website'
BLOG_IMG_DIR = os.path.join(BASE_DIR, 'assets/img/blog')


def convert_pngs():
    """Convert all blog PNGs to WebP."""
    print("\n--- Converting PNGs to WebP ---")
    png_files = glob.glob(os.path.join(BLOG_IMG_DIR, '*.png'))

    converted = []
    for png_path in sorted(png_files):
        filename = os.path.basename(png_path)
        webp_filename = filename.replace('.png', '.webp')
        webp_path = os.path.join(BLOG_IMG_DIR, webp_filename)

        original_size = os.path.getsize(png_path)
        img = Image.open(png_path)
        img.save(webp_path, 'WEBP', quality=85, method=4)
        new_size = os.path.getsize(webp_path)

        reduction = (1 - new_size / original_size) * 100
        print(f"  {filename} ({original_size/1024:.0f} KB) -> {webp_filename} ({new_size/1024:.0f} KB) [{reduction:.1f}% smaller]")
        converted.append((filename, webp_filename))

    return converted


def update_html_references(converted):
    """Update all HTML files to reference .webp instead of .png for blog images."""
    print("\n--- Updating HTML references ---")

    # Find all HTML files (excluding backups)
    all_html = glob.glob(os.path.join(BASE_DIR, '**/*.html'), recursive=True)
    all_html = [f for f in all_html if '.backups' not in f and 'node_modules' not in f]

    total_updates = 0
    for filepath in sorted(all_html):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content
        file_updates = 0

        for png_name, webp_name in converted:
            # Replace in all contexts: img src, meta content, JSON-LD
            old_ref = png_name
            new_ref = webp_name
            if old_ref in content:
                count = content.count(old_ref)
                content = content.replace(old_ref, new_ref)
                file_updates += count

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  FIXED {filepath}: {file_updates} references updated")
            total_updates += file_updates

    return total_updates


def create_missing_webp_placeholders():
    """For blog PNGs referenced in HTML but not existing on disk,
    we can't convert them. Just update HTML references anyway
    since the .webp versions might be created later or the images
    may have been referenced incorrectly."""
    pass


def main():
    print("=" * 60)
    print("TASK 4: Convert blog PNGs to WebP")
    print("=" * 60)

    # Step 1: Convert existing PNGs
    converted = convert_pngs()

    # Step 2: Also handle PNGs referenced in HTML but not on disk
    # We need to update ALL .png references in blog img paths to .webp
    print("\n--- Updating ALL blog PNG references in HTML (including missing files) ---")

    all_html = glob.glob(os.path.join(BASE_DIR, '**/*.html'), recursive=True)
    all_html = [f for f in all_html if '.backups' not in f and 'node_modules' not in f]

    total_updates = 0
    for filepath in sorted(all_html):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Replace all /assets/img/blog/xxx.png with /assets/img/blog/xxx.webp
        content = re.sub(
            r'(assets/img/blog/[^"\'>\s]+)\.png',
            r'\1.webp',
            content
        )

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            changes = sum(1 for a, b in zip(original, content) if a != b)
            # Count actual replacements
            old_count = original.count('.png')
            new_count = content.count('.png')
            replaced = old_count - new_count
            print(f"  FIXED {filepath}: {replaced} .png -> .webp references")
            total_updates += replaced

    print(f"\nTotal HTML references updated: {total_updates}")
    print(f"Total PNGs converted to WebP: {len(converted)}")


if __name__ == '__main__':
    main()
