#!/usr/bin/env python3
"""
Task 5: Add width/height to blog images missing them.
Find img tags in blog HTML files (and blog listing pages) missing width/height,
read actual image dimensions with Pillow, and add them.
"""

import os
import re
import glob
from PIL import Image

BASE_DIR = '/home/user/foorsa-website'


def resolve_image_path(src, html_filepath):
    """Resolve a relative image src to an absolute file path."""
    html_dir = os.path.dirname(html_filepath)

    if src.startswith('http'):
        return None  # Can't resolve remote images

    # Handle relative paths
    if src.startswith('../'):
        resolved = os.path.normpath(os.path.join(html_dir, src))
    elif src.startswith('./'):
        resolved = os.path.normpath(os.path.join(html_dir, src))
    elif src.startswith('/'):
        resolved = os.path.join(BASE_DIR, src.lstrip('/'))
    else:
        resolved = os.path.normpath(os.path.join(html_dir, src))

    return resolved


def get_image_dimensions(filepath):
    """Get width and height of an image file."""
    try:
        with Image.open(filepath) as img:
            return img.width, img.height
    except Exception as e:
        print(f"    WARNING: Could not read {filepath}: {e}")
        return None, None


def fix_file(filepath):
    """Find img tags missing width/height and add dimensions."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    count = 0

    def add_dimensions(match):
        nonlocal count
        tag = match.group(0)

        # Skip if already has both width and height
        has_width = re.search(r'\bwidth=', tag)
        has_height = re.search(r'\bheight=', tag)

        if has_width and has_height:
            return tag

        # Get image src
        src_match = re.search(r'src="([^"]*)"', tag)
        if not src_match:
            return tag

        src = src_match.group(1)
        img_path = resolve_image_path(src, filepath)

        if not img_path or not os.path.exists(img_path):
            # Try .webp version if .png was referenced
            if img_path and not os.path.exists(img_path):
                webp_path = img_path.replace('.png', '.webp')
                if os.path.exists(webp_path):
                    img_path = webp_path
                else:
                    print(f"    SKIP (file not found): {src}")
                    return tag
            else:
                return tag

        width, height = get_image_dimensions(img_path)
        if width is None:
            return tag

        # Add missing attributes before the closing >
        attrs_to_add = ''
        if not has_width:
            attrs_to_add += f' width="{width}"'
        if not has_height:
            attrs_to_add += f' height="{height}"'

        # Insert before the closing > or />
        if tag.endswith('/>'):
            tag = tag[:-2] + attrs_to_add + '/>'
        elif tag.endswith('>'):
            tag = tag[:-1] + attrs_to_add + '>'

        count += 1
        print(f"    Added {width}x{height} to: {src}")
        return tag

    content = re.sub(r'<img\s[^>]*?>', add_dimensions, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  FIXED {filepath}: {count} images got dimensions")
    else:
        print(f"  NO CHANGES: {filepath}")

    return count


def main():
    print("=" * 60)
    print("TASK 5: Add width/height to blog images missing them")
    print("=" * 60)

    total = 0

    # Blog listing pages
    for lang in ['en', 'fr', 'ar']:
        blog_listing = os.path.join(BASE_DIR, lang, 'blog.html')
        if os.path.exists(blog_listing):
            total += fix_file(blog_listing)

    # Blog post pages
    blog_posts = glob.glob(os.path.join(BASE_DIR, '*/blog/*.html'))
    blog_posts = [f for f in blog_posts if '.backups' not in f]
    for filepath in sorted(blog_posts):
        total += fix_file(filepath)

    print(f"\nTotal images with dimensions added: {total}")


if __name__ == '__main__':
    main()
