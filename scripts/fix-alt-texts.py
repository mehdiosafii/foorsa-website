#!/usr/bin/env python3
"""
Task 2: Fix duplicate alt texts on homepage files.
Replace generic 'Foorsa - Study in China services' with unique, descriptive alt text.
"""

import re
import os

BASE_DIR = '/home/user/foorsa-website'

# Map of image src patterns to descriptive alt texts
# These apply across EN, FR, AR homepages
ALT_TEXT_MAP = {
    # Media logos section
    '2M.webp': 'Foorsa featured on 2M Moroccan television',
    'medi1.webp': 'Foorsa featured on Medi1 TV news coverage',
    'opinion.webp': 'Foorsa featured in Opinion Maroc media',
    'hesp.webp': 'Foorsa featured on Hespress Moroccan news',

    # University logos
    'beijing-1.webp': 'Beijing university partner logo',
    'ch-1.webp': 'Chinese university partner logo',
    'linyi-1.webp': 'Linyi University partner logo',
    'nanjing-1.webp': 'Nanjing University partner logo',
    'ningbo-1.webp': 'Ningbo University partner logo',
    'perto-1.webp': 'Partner university logo',
    'sand-1.webp': 'Shandong region university partner logo',
    'shandong-1.webp': 'Shandong University partner logo',

    # Student testimonial video thumbnails
    'Copie-de-fahd.webp': 'Video testimonial thumbnail of student Fahd studying in China',
    'Copie-de-lina-min.webp': 'Video testimonial thumbnail of student Lina studying in China',
    'Copie-de-walid-min.webp': 'Video testimonial thumbnail of student Walid studying in China',
    'Copie-de-salma-min.webp': 'Video testimonial thumbnail of student Salma studying in China',
    'Copie-de-fahd-thumbnails-1.webp': 'Video testimonial thumbnail of student Fahd sharing his experience in China',
    'website-oumaima.webp': 'Video testimonial thumbnail of student Oumaima studying in China',
    'website-nzha.webp': 'Video testimonial thumbnail of student Nzha studying in China',
    'website-yasser.webp': 'Video testimonial thumbnail of student Yasser studying in China',
}

GENERIC_ALT = 'Foorsa - Study in China services'


def fix_file(filepath):
    if not os.path.exists(filepath):
        print(f"  SKIP: {filepath}")
        return 0

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    count = 0

    def replace_alt(match):
        nonlocal count
        tag = match.group(0)

        # Only replace if alt is the generic one
        if f'alt="{GENERIC_ALT}"' not in tag:
            return tag

        # Find the src to determine which image
        src_match = re.search(r'src="([^"]*)"', tag)
        if not src_match:
            return tag

        src = src_match.group(1)
        filename = os.path.basename(src)

        if filename in ALT_TEXT_MAP:
            new_alt = ALT_TEXT_MAP[filename]
            tag = tag.replace(f'alt="{GENERIC_ALT}"', f'alt="{new_alt}"')
            count += 1

        return tag

    content = re.sub(r'<img\s[^>]*?>', replace_alt, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  FIXED {filepath}: {count} alt texts updated")
    else:
        print(f"  NO CHANGES: {filepath}")

    return count


def main():
    print("=" * 60)
    print("TASK 2: Fix duplicate alt texts on homepages")
    print("=" * 60)

    total = 0
    for lang in ['en', 'fr', 'ar']:
        filepath = os.path.join(BASE_DIR, lang, 'index.html')
        total += fix_file(filepath)

    # Also check root index.html
    total += fix_file(os.path.join(BASE_DIR, 'index.html'))

    print(f"\nTotal alt texts fixed: {total}")


if __name__ == '__main__':
    main()
