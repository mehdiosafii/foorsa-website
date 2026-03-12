#!/usr/bin/env python3
"""
Fix above-fold loading="lazy" issues across the website.

For homepage files (en/index.html, fr/index.html, ar/index.html, index.html):
  - Logo images, video poster images, and first 2-3 flag images should be loading="eager"

For ALL other HTML files:
  - Just the first img tag (logo) should be loading="eager"
"""

import os
import re
import glob

BASE_DIR = '/home/user/foorsa-website'

# Homepage files need special treatment: logo + video poster + first flags
HOMEPAGE_FILES = [
    os.path.join(BASE_DIR, 'en/index.html'),
    os.path.join(BASE_DIR, 'fr/index.html'),
    os.path.join(BASE_DIR, 'ar/index.html'),
    os.path.join(BASE_DIR, 'index.html'),
]

def fix_homepage(filepath):
    """Fix homepage: change first ~6 loading=lazy to eager (2 logos, video poster, 3 flags)."""
    if not os.path.exists(filepath):
        print(f"  SKIP (not found): {filepath}")
        return 0

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    count = 0

    # Find all img tags with loading="lazy"
    pattern = r'<img\s[^>]*?loading="lazy"[^>]*?>'

    def replace_first_n(match):
        nonlocal count
        tag = match.group(0)
        src_match = re.search(r'src="([^"]*)"', tag)
        src = src_match.group(1) if src_match else ''

        # Change to eager if it's a logo, video-poster, or flag image
        is_logo = 'logo' in src.lower()
        is_poster = 'poster' in src.lower() or 'building-bg' in src.lower()
        is_flag = 'flagcdn' in src.lower() or 'flag' in src.lower()

        if is_logo or is_poster or (is_flag and count < 8):
            count += 1
            return tag.replace('loading="lazy"', 'loading="eager"')
        return tag

    content = re.sub(pattern, replace_first_n, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  FIXED {filepath}: {count} images changed to eager")
    else:
        print(f"  NO CHANGES: {filepath}")

    return count


def fix_other_file(filepath):
    """Fix non-homepage: change first loading=lazy (logo) to eager."""
    if not os.path.exists(filepath):
        return 0

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Find first img with loading="lazy" and change to eager
    pattern = r'(<img\s[^>]*?)loading="lazy"([^>]*?>)'
    match = re.search(pattern, content)
    if match:
        # Verify it's likely a logo (first img)
        full_tag = match.group(0)
        content = content[:match.start()] + match.group(1) + 'loading="eager"' + match.group(2) + content[match.end():]

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  FIXED {filepath}: first img changed to eager")
            return 1

    print(f"  NO CHANGES: {filepath}")
    return 0


def main():
    print("=" * 60)
    print("TASK 1: Fix above-fold loading='lazy' issues")
    print("=" * 60)

    total = 0

    # Fix homepages
    print("\n--- Homepage files ---")
    for hp in HOMEPAGE_FILES:
        total += fix_homepage(hp)

    # Fix all other HTML files
    print("\n--- Other HTML files ---")
    all_html = glob.glob(os.path.join(BASE_DIR, '**/*.html'), recursive=True)
    for filepath in sorted(all_html):
        if '.backups' in filepath or 'node_modules' in filepath:
            continue
        if filepath in HOMEPAGE_FILES:
            continue
        total += fix_other_file(filepath)

    print(f"\nTotal images changed to loading='eager': {total}")


if __name__ == '__main__':
    main()
