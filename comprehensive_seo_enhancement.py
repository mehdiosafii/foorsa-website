#!/usr/bin/env python3
"""
Comprehensive SEO Enhancement Script for Foorsa.ma
Performs technical audit, schema enhancement, internal linking, and content optimization
"""

import os
import re
from bs4 import BeautifulSoup
from pathlib import Path
from collections import defaultdict
import json

class SEOEnhancer:
    def __init__(self, base_dir):
        self.base_dir = Path(base_dir)
        self.issues = defaultdict(list)
        self.fixes = defaultdict(list)
        self.all_pages = []
        self.internal_links = {}
        
    def find_all_content_pages(self):
        """Find all actual content HTML pages (exclude assets, duplicates, etc.)"""
        patterns = [
            'index.html',
            'en/*.html',
            'fr/*.html',
            'ar/*.html',
            'en/blog/*.html',
            'fr/blog/*.html',
            'ar/blog/*.html'
        ]
        
        pages = set()
        for pattern in patterns:
            for path in self.base_dir.glob(pattern):
                # Exclude non-content files
                if 'blog2.html' not in str(path) and 'blog-article.html' not in str(path):
                    pages.add(path)
        
        self.all_pages = sorted(pages)
        return self.all_pages
    
    def audit_page(self, filepath):
        """Comprehensive audit of a single page"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            rel_path = filepath.relative_to(self.base_dir)
            
            issues = []
            
            # 1. Check title tag
            title = soup.find('title')
            if not title or not title.string or len(title.string.strip()) == 0:
                issues.append("Missing or empty <title> tag")
            elif len(title.string) > 60:
                issues.append(f"Title too long: {len(title.string)} chars (should be <60)")
            
            # 2. Check meta description
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if not meta_desc or not meta_desc.get('content'):
                issues.append("Missing meta description")
            else:
                desc_len = len(meta_desc.get('content', ''))
                if desc_len < 120 or desc_len > 160:
                    issues.append(f"Meta description length: {desc_len} chars (optimal: 150-160)")
            
            # 3. Check canonical URL
            canonical = soup.find('link', attrs={'rel': 'canonical'})
            if not canonical:
                issues.append("Missing canonical URL")
            
            # 4. Check hreflang tags
            hreflang = soup.find_all('link', attrs={'rel': 'alternate', 'hreflang': True})
            if not hreflang and 'index.html' in str(rel_path):
                issues.append("Missing hreflang tags on main page")
            
            # 5. Check lang attribute on html tag
            html_tag = soup.find('html')
            if not html_tag or not html_tag.get('lang'):
                issues.append("Missing lang attribute on <html> tag")
            
            # 6. Check h1 tags
            h1_tags = soup.find_all('h1')
            if len(h1_tags) == 0:
                issues.append("No h1 tag found")
            elif len(h1_tags) > 1:
                issues.append(f"Multiple h1 tags found: {len(h1_tags)} (should be exactly 1)")
            
            # 7. Check heading hierarchy
            headings = []
            for level in range(1, 7):
                headings.extend([(f'h{level}', level) for _ in soup.find_all(f'h{level}')])
            
            prev_level = 0
            for tag, level in headings:
                if level > prev_level + 1:
                    issues.append(f"Heading hierarchy skip: {tag} after h{prev_level}")
                    break
                prev_level = level
            
            # 8. Check images for alt text
            images = soup.find_all('img')
            missing_alt = 0
            for img in images:
                if not img.get('alt'):
                    missing_alt += 1
            if missing_alt > 0:
                issues.append(f"{missing_alt} images missing alt text")
            
            # 9. Check for broken internal links
            links = soup.find_all('a', href=True)
            broken_links = []
            for link in links:
                href = link.get('href', '')
                if href.startswith(('http://', 'https://', 'mailto:', 'tel:', '#')):
                    continue
                
                # Resolve relative link
                link_path = (filepath.parent / href).resolve()
                if not link_path.exists() and '..' not in href:
                    broken_links.append(href)
            
            if broken_links:
                issues.append(f"Broken internal links: {', '.join(broken_links[:3])}")
            
            # 10. Check for schema markup
            scripts = soup.find_all('script', type='application/ld+json')
            schema_types = []
            for script in scripts:
                try:
                    schema = json.loads(script.string)
                    if isinstance(schema, dict):
                        schema_types.append(schema.get('@type', 'Unknown'))
                    elif isinstance(schema, list):
                        schema_types.extend([s.get('@type', 'Unknown') for s in schema])
                except:
                    pass
            
            if not schema_types:
                issues.append("No schema markup found")
            elif 'Organization' not in schema_types:
                issues.append("Missing Organization schema")
            elif 'BreadcrumbList' not in schema_types and 'blog/' not in str(rel_path):
                issues.append("Missing BreadcrumbList schema")
            
            # Store issues
            if issues:
                self.issues[str(rel_path)] = issues
            
            return {
                'path': str(rel_path),
                'title': title.string if title else None,
                'has_h1': len(h1_tags) > 0,
                'h1_count': len(h1_tags),
                'images_count': len(images),
                'missing_alt': missing_alt,
                'schema_types': schema_types,
                'issues': issues
            }
            
        except Exception as e:
            self.issues[str(filepath.relative_to(self.base_dir))].append(f"Error during audit: {str(e)}")
            return None
    
    def add_missing_alt_text(self, filepath):
        """Add descriptive alt text to images missing it"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            images = soup.find_all('img')
            fixed_count = 0
            
            for img in images:
                if not img.get('alt') or img.get('alt').strip() == '':
                    # Generate alt text based on src or context
                    src = img.get('src', '')
                    alt_text = self.generate_alt_text(src, filepath)
                    img['alt'] = alt_text
                    fixed_count += 1
            
            if fixed_count > 0:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(str(soup))
                
                rel_path = filepath.relative_to(self.base_dir)
                self.fixes[str(rel_path)].append(f"Added alt text to {fixed_count} images")
                return fixed_count
            
            return 0
            
        except Exception as e:
            print(f"Error adding alt text to {filepath}: {e}")
            return 0
    
    def generate_alt_text(self, src, filepath):
        """Generate contextual alt text based on image source and page"""
        src_lower = src.lower()
        
        if 'logo' in src_lower:
            return "Foorsa logo - Study in China"
        elif 'hero' in src_lower:
            return "Study in China with Foorsa - Chinese universities"
        elif 'university' in src_lower or 'building' in src_lower:
            return "Chinese university campus building"
        elif 'student' in src_lower or 'testimonial' in src_lower:
            return "Moroccan student studying in China testimonial"
        elif 'flag' in src_lower or 'china' in src_lower:
            return "Chinese flag or China related"
        elif 'morocco' in src_lower:
            return "Morocco related"
        else:
            # Generic based on page type
            if '/blog/' in str(filepath):
                return "Illustration for studying in China"
            elif 'scholarship' in str(filepath):
                return "Chinese scholarship information"
            elif 'contact' in str(filepath):
                return "Contact Foorsa team"
            else:
                return "Foorsa - Study in China services"
    
    def enhance_faq_schema(self, filepath):
        """Add FAQ schema to FAQ pages"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            
            # Check if FAQ schema already exists
            scripts = soup.find_all('script', type='application/ld+json')
            for script in scripts:
                try:
                    schema = json.loads(script.string)
                    if isinstance(schema, dict) and schema.get('@type') == 'FAQPage':
                        return False  # Already has FAQ schema
                except:
                    pass
            
            # Extract Q&A from accordion/FAQ section
            faq_items = []
            
            # Try to find accordion items (common FAQ structure)
            accordions = soup.find_all(['div', 'button'], class_=re.compile(r'accordion|faq|question', re.I))
            
            for acc in accordions:
                question = acc.get_text(strip=True)
                # Find associated answer
                answer_elem = acc.find_next_sibling(['div', 'p'])
                if answer_elem:
                    answer = answer_elem.get_text(strip=True)
                    if question and answer and len(question) > 10:
                        faq_items.append({
                            "@type": "Question",
                            "name": question[:200],
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": answer[:500]
                            }
                        })
            
            # If we found FAQ items, add the schema
            if faq_items:
                faq_schema = {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": faq_items[:10]  # Limit to top 10
                }
                
                # Add schema to head
                head = soup.find('head')
                if head:
                    schema_tag = soup.new_tag('script', type='application/ld+json')
                    schema_tag.string = json.dumps(faq_schema, indent=2, ensure_ascii=False)
                    head.append(schema_tag)
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(str(soup))
                    
                    rel_path = filepath.relative_to(self.base_dir)
                    self.fixes[str(rel_path)].append(f"Added FAQPage schema with {len(faq_items)} questions")
                    return True
            
            return False
            
        except Exception as e:
            print(f"Error enhancing FAQ schema for {filepath}: {e}")
            return False
    
    def run_full_audit(self):
        """Run complete audit on all pages"""
        print("🔍 Starting comprehensive SEO audit...")
        print(f"📄 Found {len(self.all_pages)} content pages\n")
        
        results = []
        for page in self.all_pages:
            result = self.audit_page(page)
            if result:
                results.append(result)
        
        return results
    
    def generate_report(self):
        """Generate comprehensive audit report"""
        report = []
        report.append("# SEO COMPREHENSIVE AUDIT REPORT - Foorsa.ma")
        report.append("=" * 70)
        report.append(f"\n**Generated:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append(f"**Total Pages Audited:** {len(self.all_pages)}\n")
        
        # Summary
        total_issues = sum(len(issues) for issues in self.issues.values())
        pages_with_issues = len(self.issues)
        
        report.append("## 📊 SUMMARY")
        report.append(f"- **Total Issues Found:** {total_issues}")
        report.append(f"- **Pages with Issues:** {pages_with_issues}/{len(self.all_pages)}")
        report.append(f"- **Clean Pages:** {len(self.all_pages) - pages_with_issues}\n")
        
        # Issues by category
        report.append("## 🚨 ISSUES BY CATEGORY\n")
        
        categories = defaultdict(int)
        for page_issues in self.issues.values():
            for issue in page_issues:
                if "title" in issue.lower():
                    categories["Title Issues"] += 1
                elif "meta description" in issue.lower():
                    categories["Meta Description Issues"] += 1
                elif "canonical" in issue.lower():
                    categories["Canonical URL Issues"] += 1
                elif "hreflang" in issue.lower():
                    categories["Hreflang Issues"] += 1
                elif "lang attribute" in issue.lower():
                    categories["Lang Attribute Issues"] += 1
                elif "h1" in issue.lower():
                    categories["H1 Tag Issues"] += 1
                elif "heading hierarchy" in issue.lower():
                    categories["Heading Hierarchy Issues"] += 1
                elif "alt text" in issue.lower():
                    categories["Missing Alt Text"] += 1
                elif "broken" in issue.lower():
                    categories["Broken Links"] += 1
                elif "schema" in issue.lower():
                    categories["Schema Markup Issues"] += 1
                else:
                    categories["Other Issues"] += 1
        
        for category, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
            report.append(f"- **{category}:** {count}")
        
        report.append("\n## 📋 DETAILED ISSUES BY PAGE\n")
        
        for page, issues in sorted(self.issues.items()):
            report.append(f"### {page}")
            for issue in issues:
                report.append(f"  - {issue}")
            report.append("")
        
        # Fixes applied
        if self.fixes:
            report.append("\n## ✅ FIXES APPLIED\n")
            for page, fixes in sorted(self.fixes.items()):
                report.append(f"### {page}")
                for fix in fixes:
                    report.append(f"  - {fix}")
                report.append("")
        
        return "\n".join(report)

def main():
    base_dir = Path("/data/.openclaw/workspace/foorsa-website")
    enhancer = SEOEnhancer(base_dir)
    
    # Find all content pages
    pages = enhancer.find_all_content_pages()
    
    # Run comprehensive audit
    results = enhancer.run_full_audit()
    
    # Fix missing alt text on all pages
    print("\n🖼️  Adding missing alt text to images...")
    total_alt_fixes = 0
    for page in pages:
        fixed = enhancer.add_missing_alt_text(page)
        total_alt_fixes += fixed
    print(f"✅ Added alt text to {total_alt_fixes} images")
    
    # Enhance FAQ pages with schema
    print("\n📝 Enhancing FAQ pages with schema...")
    faq_pages = [p for p in pages if 'faq' in str(p).lower() or 'frequently-asked-questions' in str(p)]
    faq_enhanced = 0
    for faq_page in faq_pages:
        if enhancer.enhance_faq_schema(faq_page):
            faq_enhanced += 1
    print(f"✅ Enhanced {faq_enhanced} FAQ pages with schema")
    
    # Generate report
    print("\n📄 Generating audit report...")
    report = enhancer.generate_report()
    
    # Save report
    report_path = base_dir / "SEO-COMPREHENSIVE-AUDIT.md"
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"✅ Report saved to: {report_path}")
    print("\n" + "=" * 70)
    print("🎉 SEO AUDIT COMPLETE!")
    print("=" * 70)

if __name__ == "__main__":
    main()
