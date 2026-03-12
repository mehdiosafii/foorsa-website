#!/usr/bin/env python3
"""
Add missing hreflang="x-default" tags to HTML pages.

Finds all HTML files in en/, fr/, ar/ that have hreflang tags but are missing
x-default, then inserts x-default pointing to the French (fr) version after
the last hreflang line.
"""

import os
import re
import glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANG_DIRS = ['en', 'fr', 'ar']

def find_html_files():
    """Find all HTML files in language directories."""
    files = []
    for lang in LANG_DIRS:
        lang_dir = os.path.join(BASE_DIR, lang)
        for root, _, filenames in os.walk(lang_dir):
            for f in filenames:
                if f.endswith('.html'):
                    files.append(os.path.join(root, f))
    return files

def fix_file(filepath):
    """Add x-default hreflang tag if missing. Returns True if file was fixed."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has x-default
    if 'hreflang="x-default"' in content:
        return False

    # Skip if no hreflang tags at all
    if 'hreflang="en"' not in content:
        return False

    # Extract the fr URL from existing hreflang tag
    # Handle both attribute orders:
    #   <link href="..." hreflang="fr" rel="alternate"/>
    #   <link rel="alternate" hreflang="fr" href="..."/>
    fr_match = re.search(
        r'<link\s[^>]*hreflang="fr"[^>]*href="([^"]+)"[^>]*/?>',
        content
    )
    if not fr_match:
        fr_match = re.search(
            r'<link\s[^>]*href="([^"]+)"[^>]*hreflang="fr"[^>]*/?>',
            content
        )
    if not fr_match:
        print(f"  WARNING: Could not find fr hreflang URL in {filepath}")
        return False

    fr_url = fr_match.group(1)

    # Find the ar hreflang line and insert x-default after it
    # We need to handle both multi-line and single-line (inline) formats

    lines = content.split('\n')
    new_lines = []
    fixed = False

    for i, line in enumerate(lines):
        new_lines.append(line)
        if 'hreflang="ar"' in line and not fixed:
            # Determine the format/indentation from this line
            indent_match = re.match(r'^(\s*)', line)
            indent = indent_match.group(1) if indent_match else ''

            # Check if this is the inline format (multiple tags on one line)
            if 'hreflang="en"' in line or 'hreflang="fr"' in line:
                # Inline format - tags are on the same line
                # We need to insert inline after the ar tag
                ar_tag_match = re.search(
                    r'(<link\s[^>]*hreflang="ar"[^>]*/?>)',
                    line
                )
                if ar_tag_match:
                    ar_tag = ar_tag_match.group(1)
                    # Detect closing style from the ar tag
                    if ar_tag.endswith('/>'):
                        closing = '/>'
                    else:
                        closing = '>'
                    # Match the attribute order of existing tags
                    if 'href=' in line.split('hreflang="ar"')[0].split('<link')[-1]:
                        # href before hreflang: <link href="..." hreflang="ar" rel="alternate"/>
                        xdefault_tag = f'<link href="{fr_url}" hreflang="x-default" rel="alternate"{closing}'
                    else:
                        # rel before hreflang: <link rel="alternate" hreflang="ar" href="..."/>
                        xdefault_tag = f'<link rel="alternate" hreflang="x-default" href="{fr_url}"{closing}'

                    new_lines[-1] = line.replace(ar_tag, ar_tag + xdefault_tag)
                    fixed = True
            else:
                # Multi-line format - each tag on its own line
                # Detect closing style
                if line.rstrip().endswith('/>'):
                    closing = '/>'
                else:
                    closing = '>'

                # Match attribute order from the ar line
                if re.search(r'<link\s+rel=', line):
                    # <link rel="alternate" hreflang="ar" href="..."/>
                    xdefault_line = f'{indent}<link rel="alternate" hreflang="x-default" href="{fr_url}"{closing}'
                else:
                    # <link href="..." hreflang="ar" rel="alternate"/>
                    xdefault_line = f'{indent}<link href="{fr_url}" hreflang="x-default" rel="alternate"{closing}'

                new_lines.append(xdefault_line)
                fixed = True

    if fixed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        return True

    print(f"  WARNING: Found hreflang tags but could not insert x-default in {filepath}")
    return False


def main():
    html_files = find_html_files()
    print(f"Found {len(html_files)} HTML files in language directories")

    fixed_count = 0
    skipped_has_xdefault = 0
    skipped_no_hreflang = 0

    for filepath in sorted(html_files):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'hreflang="x-default"' in content:
            skipped_has_xdefault += 1
            continue
        if 'hreflang="en"' not in content:
            skipped_no_hreflang += 1
            continue

        if fix_file(filepath):
            fixed_count += 1

    print(f"\nResults:")
    print(f"  Fixed (x-default added): {fixed_count}")
    print(f"  Skipped (already had x-default): {skipped_has_xdefault}")
    print(f"  Skipped (no hreflang tags): {skipped_no_hreflang}")
    print(f"  Total files processed: {len(html_files)}")


if __name__ == '__main__':
    main()
