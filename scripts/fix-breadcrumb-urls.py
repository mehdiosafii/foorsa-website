#!/usr/bin/env python3
"""Fix BreadcrumbList JSON-LD URLs: remove .html extensions and /index references."""

import os
import re
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def fix_breadcrumb_urls(html_content):
    """Find BreadcrumbList JSON-LD blocks and fix URLs inside them."""
    modified = False

    def fix_breadcrumb_block(match):
        nonlocal modified
        script_tag = match.group(0)
        try:
            # Extract JSON content between script tags
            json_start = script_tag.index('>') + 1
            json_end = script_tag.rindex('</script>')
            json_str = script_tag[json_start:json_end]
            data = json.loads(json_str)

            if data.get('@type') != 'BreadcrumbList':
                return script_tag

            changed = False
            for item in data.get('itemListElement', []):
                url = item.get('item', '')
                if not url:
                    continue
                new_url = url
                # Replace /index.html with /
                new_url = re.sub(r'/index\.html$', '/', new_url)
                # Remove .html extension
                new_url = re.sub(r'\.html$', '', new_url)
                if new_url != url:
                    item['item'] = new_url
                    changed = True

            if changed:
                modified = True
                prefix = script_tag[:json_start]
                suffix = script_tag[json_end:]
                new_json = json.dumps(data, ensure_ascii=False, indent=2)
                return prefix + new_json + suffix

        except (json.JSONDecodeError, ValueError):
            pass
        return script_tag

    result = re.sub(
        r'<script\s+type="application/ld\+json">[^<]*?</script>',
        fix_breadcrumb_block,
        html_content,
        flags=re.DOTALL
    )

    return result, modified

def main():
    count = 0
    for dirpath, dirnames, filenames in os.walk(ROOT):
        # Skip scripts directory and hidden directories
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'scripts' and d != 'node_modules']
        for filename in filenames:
            if not filename.endswith('.html'):
                continue
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if 'BreadcrumbList' not in content:
                continue

            new_content, modified = fix_breadcrumb_urls(content)
            if modified:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                relpath = os.path.relpath(filepath, ROOT)
                print(f"Fixed: {relpath}")
                count += 1

    print(f"\nTotal files fixed: {count}")

if __name__ == '__main__':
    main()
