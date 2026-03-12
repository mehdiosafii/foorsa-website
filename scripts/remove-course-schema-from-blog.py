#!/usr/bin/env python3
"""Remove Course JSON-LD schema blocks from blog articles that also have Article/BlogPosting schema."""

import os
import re
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def remove_course_schema(html_content):
    """Remove Course JSON-LD script blocks from content."""
    # Find all JSON-LD script blocks
    pattern = r'<script\s+type="application/ld\+json">\s*(\{[^<]*?\})\s*</script>'

    blocks_to_remove = []
    has_article = False
    has_course = False

    for match in re.finditer(pattern, html_content, flags=re.DOTALL):
        try:
            data = json.loads(match.group(1))
            schema_type = data.get('@type', '')
            if schema_type in ('Article', 'BlogPosting'):
                has_article = True
            if schema_type == 'Course':
                has_course = True
                blocks_to_remove.append(match)
        except json.JSONDecodeError:
            continue

    if has_article and has_course and blocks_to_remove:
        # Remove Course blocks (process in reverse to preserve positions)
        result = html_content
        for match in reversed(blocks_to_remove):
            result = result[:match.start()] + result[match.end():]
        return result, True

    return html_content, False

def main():
    count = 0
    blog_dirs = []
    for lang in ['en', 'fr', 'ar']:
        blog_dir = os.path.join(ROOT, lang, 'blog')
        if os.path.isdir(blog_dir):
            blog_dirs.append(blog_dir)

    for blog_dir in blog_dirs:
        for filename in os.listdir(blog_dir):
            if not filename.endswith('.html'):
                continue
            filepath = os.path.join(blog_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if '"@type": "Course"' not in content:
                continue

            new_content, modified = remove_course_schema(content)
            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                relpath = os.path.relpath(filepath, ROOT)
                print(f"Removed Course schema from: {relpath}")
                count += 1

    print(f"\nTotal blog files fixed: {count}")

if __name__ == '__main__':
    main()
