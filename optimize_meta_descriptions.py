#!/usr/bin/env python3
"""
Optimize meta descriptions to be 150-160 characters with CTAs
"""

import os
import re
from bs4 import BeautifulSoup
from pathlib import Path

class MetaDescriptionOptimizer:
    def __init__(self, base_dir):
        self.base_dir = Path(base_dir)
        self.changes = []
        
        # CTAs by language
        self.ctas = {
            'en': [
                'Apply now!',
                'Learn more today.',
                'Get started now.',
                'Contact us today!',
                'Discover more.',
                'Start your journey.',
                'Join us today!'
            ],
            'fr': [
                'Postulez maintenant!',
                'Découvrez plus.',
                'Contactez-nous!',
                'Commencez aujourd\'hui.',
                'Rejoignez-nous!'
            ],
            'ar': [
                'قدّم الآن!',
                'اتصل بنا اليوم!',
                'اكتشف المزيد.',
                'ابدأ رحلتك الآن.'
            ]
        }
    
    def get_language_from_path(self, filepath):
        """Extract language code from file path"""
        path_str = str(filepath)
        if '/en/' in path_str:
            return 'en'
        elif '/fr/' in path_str:
            return 'fr'
        elif '/ar/' in path_str:
            return 'ar'
        return 'en'
    
    def optimize_meta_description(self, filepath):
        """Optimize meta description for a single page"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            
            if not meta_desc or not meta_desc.get('content'):
                return False
            
            current_desc = meta_desc.get('content', '').strip()
            current_len = len(current_desc)
            
            # Only optimize if too short or too long
            if 150 <= current_len <= 160:
                return False  # Already optimal
            
            lang = self.get_language_from_path(filepath)
            
            # If too long, truncate intelligently
            if current_len > 160:
                # Try to cut at sentence or word boundary
                if '.' in current_desc[:155]:
                    parts = current_desc[:155].rsplit('.', 1)
                    new_desc = parts[0] + '.'
                else:
                    words = current_desc[:155].rsplit(' ', 1)
                    new_desc = words[0] + '...'
                
                # Add CTA if space
                if len(new_desc) < 145:
                    cta = self.ctas[lang][0]
                    new_desc = new_desc.rstrip('.') + '. ' + cta
            
            # If too short, add CTA
            elif current_len < 150:
                # Add appropriate CTA
                cta = self.ctas[lang][0]
                
                # Check if description already ends with punctuation
                if current_desc[-1] not in '.!?':
                    new_desc = current_desc + '. ' + cta
                else:
                    new_desc = current_desc + ' ' + cta
                
                # If still too short, keep as is
                if len(new_desc) < 120:
                    return False
            else:
                return False
            
            # Ensure final length is within bounds
            if len(new_desc) > 160:
                new_desc = new_desc[:157] + '...'
            
            # Update the meta description
            meta_desc['content'] = new_desc
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            
            rel_path = filepath.relative_to(self.base_dir)
            self.changes.append({
                'page': str(rel_path),
                'old_len': current_len,
                'new_len': len(new_desc),
                'old': current_desc[:80] + '...' if len(current_desc) > 80 else current_desc,
                'new': new_desc
            })
            
            return True
            
        except Exception as e:
            print(f"Error optimizing {filepath}: {e}")
            return False
    
    def optimize_all_pages(self):
        """Optimize meta descriptions for all pages"""
        print("📝 Optimizing meta descriptions...\n")
        
        # Find all content pages
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
                if 'blog2.html' not in str(path) and 'blog-article.html' not in str(path):
                    pages.add(path)
        
        pages = sorted(pages)
        
        optimized = 0
        for page in pages:
            if self.optimize_meta_description(page):
                optimized += 1
        
        return optimized
    
    def print_report(self):
        """Print summary of changes"""
        print(f"\n✅ Optimized {len(self.changes)} meta descriptions\n")
        
        if self.changes:
            print("📋 Changes made:")
            for change in self.changes[:10]:  # Show first 10
                print(f"\n📄 {change['page']}")
                print(f"   Old length: {change['old_len']} chars")
                print(f"   New length: {change['new_len']} chars")
                print(f"   New: {change['new']}")
            
            if len(self.changes) > 10:
                print(f"\n   ... and {len(self.changes) - 10} more")

def main():
    base_dir = Path("/data/.openclaw/workspace/foorsa-website")
    optimizer = MetaDescriptionOptimizer(base_dir)
    
    # Optimize all pages
    count = optimizer.optimize_all_pages()
    
    # Print report
    optimizer.print_report()

if __name__ == "__main__":
    main()
