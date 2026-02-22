#!/usr/bin/env python3
"""
Update sitemap.xml with all content pages including all blog articles
"""

from pathlib import Path
from datetime import datetime

def generate_sitemap(base_dir):
    base_dir = Path(base_dir)
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Find all content pages
    patterns = [
        ('index.html', 1.0, 'weekly'),
        ('en/*.html', 0.8, 'monthly'),
        ('fr/*.html', 0.8, 'monthly'),
        ('ar/*.html', 0.8, 'monthly'),
        ('en/blog/*.html', 0.7, 'weekly'),
        ('fr/blog/*.html', 0.7, 'weekly'),
        ('ar/blog/*.html', 0.7, 'weekly'),
    ]
    
    urls = []
    
    # High priority pages
    high_priority_pages = ['index.html', 'shop.html', 'scholarship.html', 'fees.html', 'blog.html']
    
    # Collect all pages
    all_pages = set()
    for pattern, priority, changefreq in patterns:
        for page in base_dir.glob(pattern):
            if 'blog2.html' not in str(page) and 'blog-article.html' not in str(page):
                rel_path = page.relative_to(base_dir)
                url = f"https://foorsa.ma/{rel_path}"
                
                # Adjust priority for high-priority pages
                page_priority = priority
                if any(hp in str(rel_path) for hp in high_priority_pages):
                    page_priority = 0.95
                
                all_pages.add((url, page_priority, changefreq))
    
    # Start sitemap
    sitemap = ['<?xml version="1.0" encoding="UTF-8"?>']
    sitemap.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    sitemap.append('        xmlns:xhtml="http://www.w3.org/1999/xhtml">')
    sitemap.append('')
    
    # Add root
    sitemap.append('  <!-- Root Homepage (redirects to /fr/) -->')
    sitemap.append('  <url>')
    sitemap.append('    <loc>https://foorsa.ma/</loc>')
    sitemap.append(f'    <lastmod>{today}</lastmod>')
    sitemap.append('    <changefreq>weekly</changefreq>')
    sitemap.append('    <priority>1.0</priority>')
    sitemap.append('  </url>')
    sitemap.append('')
    
    # Group by page type (index, then main pages, then blog)
    index_pages = sorted([u for u in all_pages if '/index.html' in u[0]])
    main_pages = sorted([u for u in all_pages if '/blog/' not in u[0] and '/index.html' not in u[0]])
    blog_pages = sorted([u for u in all_pages if '/blog/' in u[0] and '/index.html' not in u[0]])
    blog_index = sorted([u for u in all_pages if '/blog/index.html' in u[0]])
    
    # Add index pages with hreflang
    if index_pages:
        sitemap.append('  <!-- Homepage - All Languages -->')
        for url, priority, changefreq in index_pages:
            sitemap.append('  <url>')
            sitemap.append(f'    <loc>{url}</loc>')
            sitemap.append(f'    <lastmod>{today}</lastmod>')
            sitemap.append(f'    <changefreq>{changefreq}</changefreq>')
            sitemap.append(f'    <priority>{priority}</priority>')
            sitemap.append('    <xhtml:link rel="alternate" hreflang="en" href="https://foorsa.ma/en/index.html" />')
            sitemap.append('    <xhtml:link rel="alternate" hreflang="fr" href="https://foorsa.ma/fr/index.html" />')
            sitemap.append('    <xhtml:link rel="alternate" hreflang="ar" href="https://foorsa.ma/ar/index.html" />')
            sitemap.append('    <xhtml:link rel="alternate" hreflang="x-default" href="https://foorsa.ma/en/index.html" />')
            sitemap.append('  </url>')
        sitemap.append('')
    
    # Add blog index pages
    if blog_index:
        sitemap.append('  <!-- Blog Index Pages -->')
        for url, priority, changefreq in blog_index:
            lang = 'en' if '/en/' in url else ('fr' if '/fr/' in url else 'ar')
            sitemap.append('  <url>')
            sitemap.append(f'    <loc>{url}</loc>')
            sitemap.append(f'    <lastmod>{today}</lastmod>')
            sitemap.append(f'    <changefreq>{changefreq}</changefreq>')
            sitemap.append(f'    <priority>0.9</priority>')
            sitemap.append('  </url>')
        sitemap.append('')
    
    # Add main pages
    if main_pages:
        sitemap.append('  <!-- Main Pages -->')
        for url, priority, changefreq in main_pages:
            sitemap.append('  <url>')
            sitemap.append(f'    <loc>{url}</loc>')
            sitemap.append(f'    <lastmod>{today}</lastmod>')
            sitemap.append(f'    <changefreq>{changefreq}</changefreq>')
            sitemap.append(f'    <priority>{priority}</priority>')
            sitemap.append('  </url>')
        sitemap.append('')
    
    # Add blog articles
    if blog_pages:
        sitemap.append('  <!-- Blog Articles -->')
        for url, priority, changefreq in blog_pages:
            sitemap.append('  <url>')
            sitemap.append(f'    <loc>{url}</loc>')
            sitemap.append(f'    <lastmod>{today}</lastmod>')
            sitemap.append(f'    <changefreq>{changefreq}</changefreq>')
            sitemap.append(f'    <priority>{priority}</priority>')
            sitemap.append('  </url>')
        sitemap.append('')
    
    sitemap.append('</urlset>')
    
    return '\n'.join(sitemap)

def main():
    base_dir = Path("/data/.openclaw/workspace/foorsa-website")
    
    print("🗺️  Generating updated sitemap...")
    
    sitemap_content = generate_sitemap(base_dir)
    
    # Save sitemap
    sitemap_path = base_dir / "sitemap.xml"
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    
    # Count URLs
    url_count = sitemap_content.count('<url>')
    
    print(f"✅ Sitemap updated: {url_count} URLs")
    print(f"📄 Saved to: {sitemap_path}")
    
    # Validate XML
    print("\n🔍 Validating sitemap...")
    import subprocess
    result = subprocess.run(['xmllint', '--noout', str(sitemap_path)], 
                          capture_output=True, text=True)
    
    if result.returncode == 0:
        print("✅ Sitemap is valid XML")
    else:
        print(f"❌ Sitemap validation failed: {result.stderr}")

if __name__ == "__main__":
    main()
