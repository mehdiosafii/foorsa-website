#!/usr/bin/env python3
"""
Fix missing Twitter Card meta tags on HTML pages.

Part 1: Find HTML files in en/, fr/, ar/ that have og:title but missing twitter:card.
         Extract OG values and insert Twitter Card tags after the last OG tag line.

Part 2: Fix 5 specific pages missing OG tags entirely by adding both OG and Twitter Card tags.
"""

import os
import re
import html

BASE_DIR = '/home/user/foorsa-website'
DIRS = ['en', 'fr', 'ar']


def find_html_files():
    """Find all HTML files in en/, fr/, ar/."""
    files = []
    for d in DIRS:
        dirpath = os.path.join(BASE_DIR, d)
        for root, _, filenames in os.walk(dirpath):
            for f in filenames:
                if f.endswith('.html'):
                    files.append(os.path.join(root, f))
    return files


def extract_og_value(content, prop):
    """Extract the content value of an OG meta tag."""
    # Match both formats: content="..." property="og:X" and property="og:X" content="..."
    patterns = [
        rf'<meta\s+content="([^"]*?)"\s+property="{prop}"\s*/?>',
        rf'<meta\s+property="{prop}"\s+content="([^"]*?)"\s*/?>',
    ]
    for pat in patterns:
        m = re.search(pat, content, re.IGNORECASE)
        if m:
            return m.group(1)
    return None


def extract_meta_content(content, name):
    """Extract the content value of a named meta tag."""
    patterns = [
        rf'<meta\s+content="([^"]*?)"\s+name="{name}"\s*/?>',
        rf'<meta\s+name="{name}"\s+content="([^"]*?)"\s*/?>',
    ]
    for pat in patterns:
        m = re.search(pat, content, re.IGNORECASE)
        if m:
            return m.group(1)
    return None


def extract_title(content):
    """Extract the <title> tag value."""
    m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
    if m:
        return m.group(1).strip()
    return None


def file_path_to_url(filepath):
    """Convert file path to canonical URL."""
    rel = os.path.relpath(filepath, BASE_DIR)
    # Convert index.html to directory URL
    if rel.endswith('/index.html'):
        rel = rel[:-len('index.html')]
    elif rel.endswith('index.html'):
        rel = rel[:-len('index.html')]
    url = 'https://foorsa.ma/' + rel
    # Ensure trailing slash for directories, remove .html isn't needed here
    if url.endswith('/'):
        pass
    return url


def build_twitter_tags(title, description, image):
    """Build Twitter Card meta tag lines."""
    lines = []
    lines.append('<meta content="summary_large_image" name="twitter:card"/>')
    if title:
        lines.append(f'<meta content="{title}" name="twitter:title"/>')
    if description:
        lines.append(f'<meta content="{description}" name="twitter:description"/>')
    if image:
        lines.append(f'<meta content="{image}" name="twitter:image"/>')
    return lines


def build_og_tags(title, description, url, og_type, image):
    """Build OG meta tag lines."""
    lines = []
    if title:
        lines.append(f'<meta content="{title}" property="og:title"/>')
    if description:
        lines.append(f'<meta content="{description}" property="og:description"/>')
    if url:
        lines.append(f'<meta content="{url}" property="og:url"/>')
    if og_type:
        lines.append(f'<meta content="{og_type}" property="og:type"/>')
    if image:
        lines.append(f'<meta content="{image}" property="og:image"/>')
    lines.append('<meta content="Foorsa" property="og:site_name"/>')
    return lines


# ============================================================
# PART 1: Fix files that have OG tags but missing Twitter cards
# ============================================================
print("=" * 60)
print("PART 1: Adding Twitter Card tags to pages with OG tags")
print("=" * 60)

all_files = find_html_files()
fixed_count = 0

for filepath in all_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    has_og = 'property="og:title"' in content
    has_twitter = 'name="twitter:card"' in content

    if has_og and not has_twitter:
        og_title = extract_og_value(content, 'og:title')
        og_desc = extract_og_value(content, 'og:description')
        og_image = extract_og_value(content, 'og:image')

        twitter_tags = build_twitter_tags(og_title, og_desc, og_image)
        twitter_block = '\n'.join(twitter_tags)

        # Find the last OG tag line and insert after it
        lines = content.split('\n')
        last_og_line_idx = -1
        for i, line in enumerate(lines):
            if 'property="og:' in line:
                last_og_line_idx = i

        if last_og_line_idx == -1:
            # OG tags might be on same line (minified HTML)
            # Find the last og tag match and insert after it
            og_matches = list(re.finditer(r'<meta\s+[^>]*property="og:[^"]*"[^>]*/?>',
                                          content, re.IGNORECASE))
            if og_matches:
                last_match = og_matches[-1]
                insert_pos = last_match.end()
                new_content = content[:insert_pos] + twitter_block + content[insert_pos:]
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                fixed_count += 1
                print(f"  Fixed (inline): {os.path.relpath(filepath, BASE_DIR)}")
        else:
            # Detect indentation from the last OG line
            og_line = lines[last_og_line_idx]
            indent = ''
            stripped = og_line.lstrip()
            if len(og_line) > len(stripped):
                indent = og_line[:len(og_line) - len(stripped)]

            twitter_lines = [indent + tag for tag in twitter_tags]
            # Insert after the last OG line
            for j, tl in enumerate(twitter_lines):
                lines.insert(last_og_line_idx + 1 + j, tl)

            new_content = '\n'.join(lines)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            fixed_count += 1
            print(f"  Fixed: {os.path.relpath(filepath, BASE_DIR)}")

print(f"\nPart 1 complete: {fixed_count} files fixed with Twitter Card tags.\n")


# ============================================================
# PART 2: Fix 5 specific pages missing OG tags entirely
# ============================================================
print("=" * 60)
print("PART 2: Adding OG + Twitter Card tags to 5 pages missing OG tags")
print("=" * 60)

missing_og_pages = [
    ('/home/user/foorsa-website/en/referral.html', 'website'),
    ('/home/user/foorsa-website/en/blog/index.html', 'website'),
    ('/home/user/foorsa-website/fr/blog/index.html', 'website'),
    ('/home/user/foorsa-website/ar/blog/index.html', 'website'),
    ('/home/user/foorsa-website/ar/media.html', 'website'),
]

DEFAULT_IMAGE = 'https://foorsa.ma/assets/img/logo.png'
fixed_count_2 = 0

for filepath, og_type in missing_og_pages:
    if not os.path.exists(filepath):
        print(f"  SKIP (not found): {filepath}")
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if OG tags already exist (in case script is run twice)
    if 'property="og:title"' in content:
        print(f"  SKIP (already has OG): {os.path.relpath(filepath, BASE_DIR)}")
        continue

    title = extract_title(content)
    description = extract_meta_content(content, 'description')
    canonical_url = file_path_to_url(filepath)

    if not title:
        print(f"  SKIP (no title found): {filepath}")
        continue

    # The title/description values are already HTML-escaped in the source,
    # so we use them as-is (no double-escaping).
    title_escaped = title
    desc_escaped = description if description else ''

    og_tags = build_og_tags(title_escaped, desc_escaped, canonical_url, og_type, DEFAULT_IMAGE)
    twitter_tags = build_twitter_tags(title_escaped, desc_escaped, DEFAULT_IMAGE)
    all_tags = og_tags + twitter_tags

    # Determine insertion point
    lines = content.split('\n')
    insert_idx = None

    # Look for first <script type="application/ld+json">
    for i, line in enumerate(lines):
        if 'application/ld+json' in line:
            insert_idx = i
            break

    # Fall back to </head>
    if insert_idx is None:
        for i, line in enumerate(lines):
            if '</head>' in line.lower():
                insert_idx = i
                break

    if insert_idx is None:
        print(f"  SKIP (no </head> found): {filepath}")
        continue

    # Detect indentation
    ref_line = lines[insert_idx]
    indent = ''
    stripped = ref_line.lstrip()
    if len(ref_line) > len(stripped):
        indent = ref_line[:len(ref_line) - len(stripped)]

    tag_lines = [indent + tag for tag in all_tags]
    for j, tl in enumerate(tag_lines):
        lines.insert(insert_idx + j, tl)

    new_content = '\n'.join(lines)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    fixed_count_2 += 1
    print(f"  Fixed: {os.path.relpath(filepath, BASE_DIR)} (url: {canonical_url})")

print(f"\nPart 2 complete: {fixed_count_2} files fixed with OG + Twitter Card tags.\n")
print(f"TOTAL: {fixed_count + fixed_count_2} files fixed.")
