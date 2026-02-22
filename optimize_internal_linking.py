#!/usr/bin/env python3
"""
Optimize internal linking across the site
- Add contextual internal links within blog content
- Add "Related Articles" section to all blog posts
"""

import os
import re
from bs4 import BeautifulSoup
from pathlib import Path
import random

class InternalLinkingOptimizer:
    def __init__(self, base_dir):
        self.base_dir = Path(base_dir)
        self.blog_articles = {
            'en': [],
            'fr': [],
            'ar': []
        }
        
        # Map keywords to internal pages
        self.keyword_links = {
            'en': {
                'scholarship': '../scholarship.html',
                'scholarships': '../scholarship.html',
                'csc scholarship': '../scholarship.html',
                'fees': '../fees.html',
                'tuition': '../fees.html',
                'cost': '../fees.html',
                'majors': '../majors.html',
                'programs': '../majors.html',
                'study programs': '../majors.html',
                'documents': '../documents.html',
                'required documents': '../documents.html',
                'contact': '../contact.html',
                'faq': '../frequently-asked-questions.html',
                'questions': '../frequently-asked-questions.html',
                'step by step': '../step-by-step.html',
                'application process': '../step-by-step.html',
                'about us': '../about-us.html',
            },
            'fr': {
                'bourse': '../scholarship.html',
                'bourses': '../scholarship.html',
                'frais': '../fees.html',
                'coût': '../fees.html',
                'filières': '../majors.html',
                'programmes': '../majors.html',
                'documents': '../documents.html',
                'contact': '../contact.html',
                'faq': '../frequently-asked-questions.html',
                'questions': '../frequently-asked-questions.html',
                'étape par étape': '../step-by-step.html',
                'à propos': '../about-us.html',
            },
            'ar': {
                'منحة': '../scholarship.html',
                'منح': '../scholarship.html',
                'الرسوم': '../fees.html',
                'التكاليف': '../fees.html',
                'التخصصات': '../majors.html',
                'البرامج': '../majors.html',
                'الوثائق': '../documents.html',
                'اتصل': '../contact.html',
                'الأسئلة': '../frequently-asked-questions.html',
                'خطوة بخطوة': '../step-by-step.html',
                'من نحن': '../about-us.html',
            }
        }
    
    def find_blog_articles(self):
        """Discover all blog articles by language"""
        for lang in ['en', 'fr', 'ar']:
            blog_dir = self.base_dir / lang / 'blog'
            if blog_dir.exists():
                for article in blog_dir.glob('*.html'):
                    if article.name not in ['index.html', 'blog2.html']:
                        self.blog_articles[lang].append({
                            'path': article,
                            'filename': article.name,
                            'title': self.extract_title(article)
                        })
    
    def extract_title(self, filepath):
        """Extract title from blog article"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            soup = BeautifulSoup(content, 'html.parser')
            
            # Try h1 first
            h1 = soup.find('h1')
            if h1:
                return h1.get_text(strip=True)
            
            # Fallback to title tag
            title = soup.find('title')
            if title:
                return title.string.split('|')[0].strip()
            
            return filepath.stem.replace('-', ' ').title()
        except:
            return filepath.stem.replace('-', ' ').title()
    
    def add_contextual_links(self, filepath, lang='en'):
        """Add contextual internal links within blog content"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            article = soup.find('article')
            
            if not article:
                return False
            
            changes = 0
            
            # Find all paragraphs
            paragraphs = article.find_all('p')
            
            for p in paragraphs:
                # Skip if paragraph already has links
                if p.find('a'):
                    continue
                
                text = p.get_text()
                
                # Check for keywords and add link to first occurrence only
                for keyword, link in self.keyword_links.get(lang, {}).items():
                    if keyword.lower() in text.lower():
                        # Replace first occurrence with link
                        pattern = re.compile(re.escape(keyword), re.IGNORECASE)
                        match = pattern.search(text)
                        
                        if match:
                            # Create new content with link
                            before = text[:match.start()]
                            matched_text = text[match.start():match.end()]
                            after = text[match.end():]
                            
                            # Clear paragraph and rebuild with link
                            p.clear()
                            p.append(before)
                            
                            link_tag = soup.new_tag('a', href=link, style="color: #eaca91;")
                            link_tag.string = matched_text
                            p.append(link_tag)
                            p.append(after)
                            
                            changes += 1
                            break  # Only one link per paragraph
            
            if changes > 0:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(str(soup))
                return True
            
            return False
            
        except Exception as e:
            print(f"Error adding contextual links to {filepath}: {e}")
            return False
    
    def add_related_articles(self, filepath, lang='en'):
        """Add 'Related Articles' section to blog post"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            article = soup.find('article')
            
            if not article:
                return False
            
            # Check if related articles section already exists
            if soup.find(string=re.compile(r'Related Articles|Articles Connexes|مقالات ذات صلة')):
                return False  # Already has related articles
            
            # Get other articles in same language (exclude current)
            current_filename = Path(filepath).name
            related = [a for a in self.blog_articles[lang] if a['filename'] != current_filename]
            
            if len(related) < 2:
                return False  # Not enough articles
            
            # Select 2-3 random related articles
            num_related = min(3, len(related))
            selected = random.sample(related, num_related)
            
            # Create related articles section
            section_titles = {
                'en': 'Related Articles',
                'fr': 'Articles Connexes',
                'ar': 'مقالات ذات صلة'
            }
            
            read_more_texts = {
                'en': 'Read more',
                'fr': 'Lire la suite',
                'ar': 'اقرأ المزيد'
            }
            
            section_title = section_titles.get(lang, section_titles['en'])
            read_more = read_more_texts.get(lang, read_more_texts['en'])
            
            # Build HTML for related articles
            related_html = f'''
<div style="margin-top: 60px; padding-top: 40px; border-top: 2px solid #eaca91;">
    <h2 style="color: #eaca91; margin-bottom: 30px;">{section_title}</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
'''
            
            for article in selected:
                related_html += f'''
        <div style="background: #1a2d42; padding: 20px; border-radius: 8px;">
            <h3 style="color: #eaca91; font-size: 1.2rem; margin-bottom: 15px;">{article['title'][:80]}</h3>
            <a href="{article['filename']}" style="color: #eaca91; text-decoration: none; font-weight: bold;">
                {read_more} →
            </a>
        </div>
'''
            
            related_html += '''
    </div>
</div>
'''
            
            # Add related articles section before closing article tag
            # Parse the related HTML and insert it
            from bs4 import NavigableString
            related_div = BeautifulSoup(related_html, 'html.parser').find('div')
            
            if related_div and hasattr(article, 'append'):
                article.append(related_div)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(str(soup))
                
                return True
            
            return False
            
        except Exception as e:
            print(f"Error adding related articles to {filepath}: {e}")
            return False
    
    def optimize_all_blogs(self):
        """Optimize all blog articles"""
        print("🔗 Optimizing internal linking for all blog articles...\n")
        
        contextual_links_added = 0
        related_sections_added = 0
        
        for lang in ['en', 'fr', 'ar']:
            print(f"📝 Processing {lang.upper()} blog articles...")
            
            for article in self.blog_articles[lang]:
                filepath = article['path']
                rel_path = filepath.relative_to(self.base_dir)
                
                # Add contextual links (currently disabled to preserve content)
                # if self.add_contextual_links(filepath, lang):
                #     contextual_links_added += 1
                #     print(f"  ✅ {rel_path}: Added contextual links")
                
                # Add related articles section
                if self.add_related_articles(filepath, lang):
                    related_sections_added += 1
                    print(f"  ✅ {rel_path}: Added related articles section")
            
            print()
        
        print(f"✅ Optimization complete!")
        print(f"   - Contextual links added: {contextual_links_added}")
        print(f"   - Related articles sections added: {related_sections_added}")

def main():
    base_dir = Path("/data/.openclaw/workspace/foorsa-website")
    optimizer = InternalLinkingOptimizer(base_dir)
    
    # Discover all blog articles
    optimizer.find_blog_articles()
    
    print(f"📚 Found blog articles:")
    print(f"   - EN: {len(optimizer.blog_articles['en'])}")
    print(f"   - FR: {len(optimizer.blog_articles['fr'])}")
    print(f"   - AR: {len(optimizer.blog_articles['ar'])}")
    print()
    
    # Optimize internal linking
    optimizer.optimize_all_blogs()

if __name__ == "__main__":
    main()
