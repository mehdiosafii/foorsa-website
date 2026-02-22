#!/usr/bin/env python3
"""
Comprehensive SEO Audit Script for foorsa.ma
"""
import os
import re
from pathlib import Path
from bs4 import BeautifulSoup
from collections import defaultdict
import json

class SEOAuditor:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.issues = defaultdict(list)
        self.stats = {
            'total_html_files': 0,
            'missing_titles': 0,
            'duplicate_titles': 0,
            'missing_meta_descriptions': 0,
            'missing_canonical': 0,
            'missing_hreflang': 0,
            'missing_lang_attr': 0,
            'broken_links': 0,
            'missing_alt_text': 0,
            'multiple_h1': 0,
            'no_h1': 0,
            'heading_hierarchy_issues': 0
        }
        self.titles = defaultdict(list)
        self.all_html_files = set()
        
    def find_html_files(self):
        """Find all HTML files"""
        patterns = ['en/**/*.html', 'fr/**/*.html', 'ar/**/*.html', 'index.html']
        html_files = []
        for pattern in patterns:
            html_files.extend(self.base_path.glob(pattern))
        # Exclude uploads directory
        html_files = [f for f in html_files if 'uploads' not in str(f)]
        return html_files
    
    def audit_file(self, filepath):
        """Audit a single HTML file"""
        rel_path = filepath.relative_to(self.base_path)
        self.all_html_files.add(str(rel_path))
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                soup = BeautifulSoup(content, 'html.parser')
        except Exception as e:
            self.issues['parse_errors'].append(f"{rel_path}: {str(e)}")
            return
        
        # Check title
        title_tag = soup.find('title')
        if not title_tag or not title_tag.text.strip():
            self.stats['missing_titles'] += 1
            self.issues['missing_titles'].append(str(rel_path))
        else:
            title_text = title_tag.text.strip()
            self.titles[title_text].append(str(rel_path))
        
        # Check meta description
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if not meta_desc or not meta_desc.get('content', '').strip():
            self.stats['missing_meta_descriptions'] += 1
            self.issues['missing_meta_descriptions'].append(str(rel_path))
        
        # Check canonical
        canonical = soup.find('link', attrs={'rel': 'canonical'})
        if not canonical:
            self.stats['missing_canonical'] += 1
            self.issues['missing_canonical'].append(str(rel_path))
        
        # Check hreflang
        hreflang = soup.find_all('link', attrs={'rel': 'alternate', 'hreflang': True})
        if len(hreflang) == 0:
            self.stats['missing_hreflang'] += 1
            self.issues['missing_hreflang'].append(str(rel_path))
        
        # Check lang attribute
        html_tag = soup.find('html')
        if not html_tag or not html_tag.get('lang'):
            self.stats['missing_lang_attr'] += 1
            self.issues['missing_lang_attr'].append(str(rel_path))
        
        # Check images for alt text
        images = soup.find_all('img')
        for img in images:
            if not img.get('alt'):
                self.stats['missing_alt_text'] += 1
                src = img.get('src', 'unknown')
                self.issues['missing_alt_text'].append(f"{rel_path}: {src}")
        
        # Check internal links
        links = soup.find_all('a', href=True)
        for link in links:
            href = link['href']
            # Skip external links, anchors, and special protocols
            if href.startswith(('http://', 'https://', '#', 'mailto:', 'tel:')):
                continue
            # Check if internal link exists
            target_path = self.resolve_link(filepath, href)
            if target_path and not target_path.exists():
                self.stats['broken_links'] += 1
                self.issues['broken_links'].append(f"{rel_path}: {href}")
        
        # Check H1 tags
        h1_tags = soup.find_all('h1')
        if len(h1_tags) == 0:
            self.stats['no_h1'] += 1
            self.issues['no_h1'].append(str(rel_path))
        elif len(h1_tags) > 1:
            self.stats['multiple_h1'] += 1
            self.issues['multiple_h1'].append(f"{rel_path}: {len(h1_tags)} H1 tags")
        
        # Check heading hierarchy
        headings = []
        for i in range(1, 7):
            for h in soup.find_all(f'h{i}'):
                headings.append((i, h.text.strip()[:50]))
        
        if len(headings) > 1:
            for i in range(1, len(headings)):
                prev_level = headings[i-1][0]
                curr_level = headings[i][0]
                if curr_level > prev_level + 1:
                    self.stats['heading_hierarchy_issues'] += 1
                    self.issues['heading_hierarchy_issues'].append(
                        f"{rel_path}: h{prev_level} → h{curr_level} (skip)"
                    )
                    break
    
    def resolve_link(self, from_file, href):
        """Resolve a relative link to absolute path"""
        if href.startswith('/'):
            return self.base_path / href.lstrip('/')
        else:
            return (from_file.parent / href).resolve()
    
    def run_audit(self):
        """Run the complete audit"""
        html_files = self.find_html_files()
        self.stats['total_html_files'] = len(html_files)
        
        print(f"Scanning {len(html_files)} HTML files...")
        for filepath in html_files:
            self.audit_file(filepath)
        
        # Check for duplicate titles
        for title, files in self.titles.items():
            if len(files) > 1:
                self.stats['duplicate_titles'] += len(files)
                self.issues['duplicate_titles'].append(f"{title}: {files}")
        
    def generate_report(self):
        """Generate audit report"""
        report = []
        report.append("=" * 80)
        report.append("SEO AUDIT REPORT - foorsa.ma")
        report.append("=" * 80)
        report.append("")
        
        report.append("SUMMARY STATISTICS")
        report.append("-" * 80)
        for key, value in sorted(self.stats.items()):
            report.append(f"{key:.<50} {value:>5}")
        report.append("")
        
        report.append("DETAILED ISSUES")
        report.append("-" * 80)
        
        for issue_type, issue_list in sorted(self.issues.items()):
            if issue_list:
                report.append(f"\n{issue_type.upper().replace('_', ' ')} ({len(issue_list)})")
                report.append("-" * 40)
                for issue in issue_list[:20]:  # Limit to first 20
                    report.append(f"  - {issue}")
                if len(issue_list) > 20:
                    report.append(f"  ... and {len(issue_list) - 20} more")
        
        return "\n".join(report)
    
    def save_report(self, filename='seo-audit-results.txt'):
        """Save report to file"""
        report = self.generate_report()
        output_path = self.base_path / filename
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"\nReport saved to: {output_path}")
        return report

if __name__ == '__main__':
    auditor = SEOAuditor('/data/.openclaw/workspace/foorsa-website')
    auditor.run_audit()
    report = auditor.save_report()
    print(report)
