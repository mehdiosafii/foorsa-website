#!/usr/bin/env python3
"""
SEO Optimizer for foorsa.ma website
Optimizes all HTML pages with proper meta tags, hreflang, structured data, etc.
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup
import json

# Page metadata configuration
PAGE_METADATA = {
    'index.html': {
        'en': {
            'title': 'Study in China for Moroccan Students | Scholarships & Admissions - Foorsa',
            'description': 'Transform your future with Foorsa. We help Moroccan students access top Chinese universities and scholarships. Expert guidance for studying in China.',
            'h1': 'Study in China with Expert Guidance'
        },
        'fr': {
            'title': 'Études en Chine pour Étudiants Marocains | Bourses & Admissions - Foorsa',
            'description': 'Transformez votre avenir avec Foorsa. Nous aidons les étudiants marocains à accéder aux meilleures universités chinoises et bourses. Conseils d\'experts pour étudier en Chine.',
            'h1': 'Étudier en Chine avec un Accompagnement Expert'
        },
        'ar': {
            'title': 'الدراسة في الصين للطلاب المغاربة | المنح الدراسية والقبول - فرصة',
            'description': 'غيّر مستقبلك مع فرصة. نساعد الطلاب المغاربة على الوصول إلى أفضل الجامعات الصينية والمنح الدراسية. إرشادات خبراء للدراسة في الصين.',
            'h1': 'ادرس في الصين مع توجيه خبير'
        }
    },
    'shop.html': {
        'en': {
            'title': 'Apply Now - Study in China Programs | Foorsa',
            'description': 'Start your journey to study in China. Choose from our comprehensive application packages and get expert support throughout your admission process.',
            'h1': 'Apply to Study in China'
        },
        'fr': {
            'title': 'Postulez Maintenant - Programmes d\'Études en Chine | Foorsa',
            'description': 'Commencez votre voyage pour étudier en Chine. Choisissez parmi nos forfaits de candidature complets et obtenez un soutien expert tout au long de votre processus d\'admission.',
            'h1': 'Postulez pour Étudier en Chine'
        },
        'ar': {
            'title': 'قدّم الآن - برامج الدراسة في الصين | فرصة',
            'description': 'ابدأ رحلتك للدراسة في الصين. اختر من بين باقات التقديم الشاملة لدينا واحصل على دعم خبراء طوال عملية القبول.',
            'h1': 'قدّم للدراسة في الصين'
        }
    },
    'scholarship.html': {
        'en': {
            'title': 'China Scholarships for Moroccan Students | CSC & University Scholarships - Foorsa',
            'description': 'Discover full scholarships to study in China. Learn about Chinese Government Scholarship (CSC), provincial scholarships, and university funding opportunities.',
            'h1': 'Scholarships to Study in China'
        },
        'fr': {
            'title': 'Bourses Chinoises pour Étudiants Marocains | Bourses CSC et Universitaires - Foorsa',
            'description': 'Découvrez des bourses complètes pour étudier en Chine. En savoir plus sur la bourse du gouvernement chinois (CSC), les bourses provinciales et les opportunités de financement universitaire.',
            'h1': 'Bourses pour Étudier en Chine'
        },
        'ar': {
            'title': 'منح دراسية صينية للطلاب المغاربة | منح CSC والجامعات - فرصة',
            'description': 'اكتشف منحًا دراسية كاملة للدراسة في الصين. تعرف على منحة الحكومة الصينية (CSC) والمنح الإقليمية وفرص التمويل الجامعي.',
            'h1': 'منح دراسية للدراسة في الصين'
        }
    },
    'majors.html': {
        'en': {
            'title': 'University Majors & Programs in China | Medicine, Engineering, Business - Foorsa',
            'description': 'Explore top university majors in China for Moroccan students. Programs in medicine, engineering, business, IT, and more taught in English.',
            'h1': 'Study Programs & Majors in China'
        },
        'fr': {
            'title': 'Spécialités et Programmes Universitaires en Chine | Médecine, Ingénierie, Commerce - Foorsa',
            'description': 'Explorez les meilleures spécialités universitaires en Chine pour les étudiants marocains. Programmes en médecine, ingénierie, commerce, informatique, etc. enseignés en anglais.',
            'h1': 'Programmes et Spécialités d\'Études en Chine'
        },
        'ar': {
            'title': 'التخصصات والبرامج الجامعية في الصين | الطب، الهندسة، الأعمال - فرصة',
            'description': 'استكشف أفضل التخصصات الجامعية في الصين للطلاب المغاربة. برامج في الطب والهندسة والأعمال وتكنولوجيا المعلومات وغيرها تُدرس باللغة الإنجليزية.',
            'h1': 'برامج وتخصصات الدراسة في الصين'
        }
    },
    'fees.html': {
        'en': {
            'title': 'Cost of Studying in China | Tuition Fees & Living Expenses - Foorsa',
            'description': 'Learn about the cost of studying in China for Moroccan students. Detailed breakdown of tuition fees, living expenses, and financing options.',
            'h1': 'Fees & Cost of Studying in China'
        },
        'fr': {
            'title': 'Coût des Études en Chine | Frais de Scolarité et Dépenses de Vie - Foorsa',
            'description': 'Découvrez le coût des études en Chine pour les étudiants marocains. Répartition détaillée des frais de scolarité, des dépenses de vie et des options de financement.',
            'h1': 'Frais et Coût des Études en Chine'
        },
        'ar': {
            'title': 'تكلفة الدراسة في الصين | الرسوم الدراسية ونفقات المعيشة - فرصة',
            'description': 'تعرف على تكلفة الدراسة في الصين للطلاب المغاربة. تفصيل مفصل للرسوم الدراسية ونفقات المعيشة وخيارات التمويل.',
            'h1': 'الرسوم وتكلفة الدراسة في الصين'
        }
    },
    'about-us.html': {
        'en': {
            'title': 'About Foorsa - Your Study in China Partner | Education Consultancy',
            'description': 'Learn about Foorsa, Morocco\'s leading education consultancy for studying in China. Our mission is to help Moroccan students achieve their academic dreams.',
            'h1': 'About Foorsa - Your Study in China Partner'
        },
        'fr': {
            'title': 'À Propos de Foorsa - Votre Partenaire pour Étudier en Chine | Conseil en Éducation',
            'description': 'Découvrez Foorsa, le principal cabinet de conseil en éducation au Maroc pour étudier en Chine. Notre mission est d\'aider les étudiants marocains à réaliser leurs rêves académiques.',
            'h1': 'À Propos de Foorsa - Votre Partenaire pour Étudier en Chine'
        },
        'ar': {
            'title': 'عن فرصة - شريكك للدراسة في الصين | استشارات تعليمية',
            'description': 'تعرف على فرصة، شركة الاستشارات التعليمية الرائدة في المغرب للدراسة في الصين. مهمتنا هي مساعدة الطلاب المغاربة على تحقيق أحلامهم الأكاديمية.',
            'h1': 'عن فرصة - شريكك للدراسة في الصين'
        }
    },
    'step-by-step.html': {
        'en': {
            'title': 'Application Process Step-by-Step | How to Apply to Chinese Universities - Foorsa',
            'description': 'Complete guide to applying to Chinese universities. Follow our step-by-step process from choosing a university to getting your visa.',
            'h1': 'Application Process: Step-by-Step Guide'
        },
        'fr': {
            'title': 'Processus de Candidature Étape par Étape | Comment Postuler aux Universités Chinoises - Foorsa',
            'description': 'Guide complet pour postuler aux universités chinoises. Suivez notre processus étape par étape du choix d\'une université à l\'obtention de votre visa.',
            'h1': 'Processus de Candidature : Guide Étape par Étape'
        },
        'ar': {
            'title': 'عملية التقديم خطوة بخطوة | كيفية التقديم للجامعات الصينية - فرصة',
            'description': 'دليل شامل للتقديم للجامعات الصينية. اتبع عمليتنا خطوة بخطوة من اختيار الجامعة إلى الحصول على التأشيرة.',
            'h1': 'عملية التقديم: دليل خطوة بخطوة'
        }
    },
    'documents.html': {
        'en': {
            'title': 'Required Documents for China University Application | Document Checklist - Foorsa',
            'description': 'Complete list of documents required to apply to Chinese universities. Download our checklist and prepare your application documents correctly.',
            'h1': 'Required Documents for Application'
        },
        'fr': {
            'title': 'Documents Requis pour la Candidature aux Universités Chinoises | Liste de Vérification - Foorsa',
            'description': 'Liste complète des documents requis pour postuler aux universités chinoises. Téléchargez notre liste de vérification et préparez correctement vos documents de candidature.',
            'h1': 'Documents Requis pour la Candidature'
        },
        'ar': {
            'title': 'المستندات المطلوبة للتقديم للجامعات الصينية | قائمة المراجعة - فرصة',
            'description': 'قائمة كاملة بالمستندات المطلوبة للتقديم للجامعات الصينية. قم بتحميل قائمة المراجعة الخاصة بنا وقم بإعداد مستندات التقديم بشكل صحيح.',
            'h1': 'المستندات المطلوبة للتقديم'
        }
    },
    'frequently-asked-questions.html': {
        'en': {
            'title': 'FAQ - Studying in China for Moroccan Students | Common Questions - Foorsa',
            'description': 'Answers to frequently asked questions about studying in China. Get clarity on admissions, scholarships, visas, living in China, and more.',
            'h1': 'Frequently Asked Questions About Studying in China'
        },
        'fr': {
            'title': 'FAQ - Étudier en Chine pour les Étudiants Marocains | Questions Fréquentes - Foorsa',
            'description': 'Réponses aux questions fréquemment posées sur les études en Chine. Obtenez des éclaircissements sur les admissions, les bourses, les visas, la vie en Chine, et plus encore.',
            'h1': 'Questions Fréquemment Posées sur les Études en Chine'
        },
        'ar': {
            'title': 'الأسئلة الشائعة - الدراسة في الصين للطلاب المغاربة - فرصة',
            'description': 'إجابات على الأسئلة المتكررة حول الدراسة في الصين. احصل على توضيحات حول القبول والمنح والتأشيرات والحياة في الصين وغيرها.',
            'h1': 'الأسئلة الشائعة حول الدراسة في الصين'
        }
    },
    'blog.html': {
        'en': {
            'title': 'Blog - Study in China Tips & News | Foorsa Education',
            'description': 'Read our blog for the latest tips, news, and insights about studying in China. Success stories, application advice, and life in China.',
            'h1': 'Study in China Blog'
        },
        'fr': {
            'title': 'Blog - Conseils et Actualités sur les Études en Chine | Foorsa Education',
            'description': 'Lisez notre blog pour les derniers conseils, actualités et informations sur les études en Chine. Histoires de réussite, conseils de candidature et vie en Chine.',
            'h1': 'Blog sur les Études en Chine'
        },
        'ar': {
            'title': 'المدونة - نصائح وأخبار الدراسة في الصين | فرصة للتعليم',
            'description': 'اقرأ مدونتنا للحصول على أحدث النصائح والأخبار والرؤى حول الدراسة في الصين. قصص نجاح ونصائح للتقديم والحياة في الصين.',
            'h1': 'مدونة الدراسة في الصين'
        }
    },
    'contact.html': {
        'en': {
            'title': 'Contact Foorsa - Study in China Consultancy | Get in Touch',
            'description': 'Contact Foorsa for personalized guidance on studying in China. Reach out via phone, email, or visit our office in Morocco.',
            'h1': 'Contact Us'
        },
        'fr': {
            'title': 'Contacter Foorsa - Conseil pour Étudier en Chine | Nous Joindre',
            'description': 'Contactez Foorsa pour des conseils personnalisés sur les études en Chine. Contactez-nous par téléphone, e-mail ou visitez notre bureau au Maroc.',
            'h1': 'Contactez-Nous'
        },
        'ar': {
            'title': 'اتصل بفرصة - استشارات الدراسة في الصين | تواصل معنا',
            'description': 'اتصل بفرصة للحصول على توجيه شخصي حول الدراسة في الصين. تواصل عبر الهاتف أو البريد الإلكتروني أو قم بزيارة مكتبنا في المغرب.',
            'h1': 'اتصل بنا'
        }
    },
    'mission-values.html': {
        'en': {
            'title': 'Our Mission & Values | Foorsa Education Consultancy',
            'description': 'Discover Foorsa\'s mission and core values. We are committed to empowering Moroccan students to pursue world-class education in China.',
            'h1': 'Our Mission & Values'
        },
        'fr': {
            'title': 'Notre Mission et Valeurs | Foorsa Conseil en Éducation',
            'description': 'Découvrez la mission et les valeurs fondamentales de Foorsa. Nous nous engageons à permettre aux étudiants marocains de poursuivre une éducation de classe mondiale en Chine.',
            'h1': 'Notre Mission et Valeurs'
        },
        'ar': {
            'title': 'مهمتنا وقيمنا | استشارات فرصة التعليمية',
            'description': 'اكتشف مهمة فرصة وقيمها الأساسية. نحن ملتزمون بتمكين الطلاب المغاربة من الحصول على تعليم عالمي المستوى في الصين.',
            'h1': 'مهمتنا وقيمنا'
        }
    }
}

def get_lang_from_path(file_path):
    """Extract language from file path"""
    if '/ar/' in file_path:
        return 'ar'
    elif '/fr/' in file_path:
        return 'fr'
    elif '/en/' in file_path:
        return 'en'
    else:
        return 'fr'  # Default to French for root

def get_hreflang_links(file_path, page_name):
    """Generate hreflang links for a page"""
    links = []
    for lang in ['en', 'fr', 'ar']:
        url = f"https://foorsa.ma/{lang}/{page_name}"
        links.append(f'<link rel="alternate" hreflang="{lang}" href="{url}" />')
    links.append(f'<link rel="alternate" hreflang="x-default" href="https://foorsa.ma/en/{page_name}" />')
    return '\n'.join(links)

def get_canonical_url(page_name, lang):
    """Get canonical URL for a page"""
    return f"https://foorsa.ma/{lang}/{page_name}"

def get_og_tags(title, description, url, lang):
    """Generate Open Graph meta tags"""
    locale_map = {'en': 'en_US', 'fr': 'fr_FR', 'ar': 'ar_AR'}
    locale = locale_map.get(lang, 'en_US')
    
    return f'''<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:url" content="{url}" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://foorsa.ma/assets/img/logo-bl.webp" />
<meta property="og:site_name" content="Foorsa" />
<meta property="og:locale" content="{locale}" />'''

def get_twitter_tags(title, description):
    """Generate Twitter Card meta tags"""
    return f'''<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="https://foorsa.ma/assets/img/logo-bl.webp" />'''

def get_organization_schema():
    """Generate Organization JSON-LD schema"""
    return '''{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Foorsa",
  "url": "https://foorsa.ma",
  "logo": "https://foorsa.ma/assets/img/logo-bl.webp",
  "description": "Foorsa helps Moroccan students study in China through scholarships and university admissions support",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MA"
  },
  "sameAs": [
    "https://www.facebook.com/Foorsaconsulting",
    "https://www.instagram.com/foorsa.ma/"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Morocco"
  }
}'''

def get_website_schema(lang):
    """Generate WebSite JSON-LD schema with SearchAction"""
    return f'''{{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Foorsa",
  "url": "https://foorsa.ma/{lang}/",
  "potentialAction": {{
    "@type": "SearchAction",
    "target": "https://foorsa.ma/{lang}/search?q={{search_term_string}}",
    "query-input": "required name=search_term_string"
  }}
}}'''

def get_breadcrumb_schema(page_name, lang):
    """Generate BreadcrumbList JSON-LD schema for subpages"""
    page_titles = {
        'en': {
            'shop.html': 'Apply',
            'scholarship.html': 'Scholarships',
            'majors.html': 'Majors',
            'fees.html': 'Fees',
            'about-us.html': 'About Us',
            'contact.html': 'Contact',
            'documents.html': 'Documents',
            'step-by-step.html': 'Application Process',
            'frequently-asked-questions.html': 'FAQ',
            'blog.html': 'Blog',
            'mission-values.html': 'Mission & Values'
        }
    }
    
    if page_name == 'index.html':
        return None
        
    title = page_titles.get(lang, {}).get(page_name, page_name.replace('.html', '').replace('-', ' ').title())
    
    return f'''{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://foorsa.ma/{lang}/"
    }},
    {{
      "@type": "ListItem",
      "position": 2,
      "name": "{title}",
      "item": "https://foorsa.ma/{lang}/{page_name}"
    }}
  ]
}}'''

def optimize_html_file(file_path):
    """Optimize a single HTML file with SEO tags"""
    print(f"Processing: {file_path}")
    
    # Read file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    # Determine language and page
    lang = get_lang_from_path(file_path)
    page_name = os.path.basename(file_path)
    
    # Get metadata for this page
    page_meta = PAGE_METADATA.get(page_name, {}).get(lang)
    
    if not page_meta:
        # Use generic metadata for pages not in the config
        page_title_base = page_name.replace('.html', '').replace('-', ' ').title()
        page_meta = {
            'title': f'{page_title_base} | Foorsa - Study in China',
            'description': f'Learn more about {page_title_base.lower()} at Foorsa. Expert guidance for Moroccan students studying in China.',
            'h1': page_title_base
        }
    
    # Fix html lang attribute
    html_tag = soup.find('html')
    if html_tag:
        html_tag['lang'] = lang if lang != 'ar' else 'ar'
        if lang == 'ar':
            html_tag['dir'] = 'rtl'
    
    # Update or add title
    title_tag = soup.find('title')
    if title_tag:
        title_tag.string = page_meta['title']
    else:
        head = soup.find('head')
        if head:
            new_title = soup.new_tag('title')
            new_title.string = page_meta['title']
            head.insert(0, new_title)
    
    # Update or add meta description
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if meta_desc:
        meta_desc['content'] = page_meta['description']
    else:
        head = soup.find('head')
        if head:
            new_meta = soup.new_tag('meta', attrs={'name': 'description', 'content': page_meta['description']})
            head.append(new_meta)
    
    # Add or update robots meta
    robots_meta = soup.find('meta', attrs={'name': 'robots'})
    if robots_meta:
        robots_meta['content'] = 'index, follow'
    else:
        head = soup.find('head')
        if head:
            new_meta = soup.new_tag('meta', attrs={'name': 'robots', 'content': 'index, follow'})
            head.append(new_meta)
    
    # Remove WordPress generator meta tags
    generator_meta = soup.find_all('meta', attrs={'name': 'generator'})
    for meta in generator_meta:
        meta.decompose()
    
    # Add canonical URL
    canonical_url = get_canonical_url(page_name, lang)
    canonical_link = soup.find('link', attrs={'rel': 'canonical'})
    if canonical_link:
        canonical_link['href'] = canonical_url
    else:
        head = soup.find('head')
        if head:
            new_link = soup.new_tag('link', attrs={'rel': 'canonical', 'href': canonical_url})
            head.append(new_link)
    
    # Remove existing hreflang links
    for link in soup.find_all('link', attrs={'rel': 'alternate'}):
        if link.get('hreflang'):
            link.decompose()
    
    # Add hreflang links
    head = soup.find('head')
    if head:
        hreflang_html = get_hreflang_links(file_path, page_name)
        for line in hreflang_html.split('\n'):
            if line.strip():
                head.append(BeautifulSoup(line, 'html.parser'))
    
    # Remove existing OG and Twitter tags
    for meta in soup.find_all('meta', attrs={'property': re.compile(r'^og:')}):
        meta.decompose()
    for meta in soup.find_all('meta', attrs={'name': re.compile(r'^twitter:')}):
        meta.decompose()
    
    # Add OG tags
    og_html = get_og_tags(page_meta['title'], page_meta['description'], canonical_url, lang)
    for line in og_html.split('\n'):
        if line.strip():
            head.append(BeautifulSoup(line, 'html.parser'))
    
    # Add Twitter tags
    twitter_html = get_twitter_tags(page_meta['title'], page_meta['description'])
    for line in twitter_html.split('\n'):
        if line.strip():
            head.append(BeautifulSoup(line, 'html.parser'))
    
    # Remove existing JSON-LD scripts
    for script in soup.find_all('script', attrs={'type': 'application/ld+json'}):
        script.decompose()
    
    # Add JSON-LD structured data
    if page_name == 'index.html':
        # Homepage: Organization + WebSite schema
        org_schema = soup.new_tag('script', type='application/ld+json')
        org_schema.string = get_organization_schema()
        head.append(org_schema)
        
        web_schema = soup.new_tag('script', type='application/ld+json')
        web_schema.string = get_website_schema(lang)
        head.append(web_schema)
    else:
        # Subpages: BreadcrumbList
        breadcrumb_json = get_breadcrumb_schema(page_name, lang)
        if breadcrumb_json:
            bc_schema = soup.new_tag('script', type='application/ld+json')
            bc_schema.string = breadcrumb_json
            head.append(bc_schema)
    
    # Write optimized content back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))
    
    print(f"✓ Optimized: {file_path}")

def main():
    """Main function to optimize all HTML files"""
    base_dir = Path('/data/.openclaw/workspace/foorsa-website')
    
    # Find all HTML files (excluding asset directories)
    html_files = []
    for pattern in ['index.html', 'en/*.html', 'fr/*.html', 'ar/*.html']:
        html_files.extend(base_dir.glob(pattern))
    
    # Remove duplicates and sort
    html_files = sorted(set(html_files))
    
    # Exclude certain files
    excluded_patterns = ['admin.html', 'home.html', 'blog2.html', 'cart.html', 'checkout.html', 
                        'payment-confirmation.html', 'payment-failed.html', 'quiz.html',
                        'newsletter.html', 'careers.html', 'recruitment.html', 'partner-with-us.html',
                        'engagement.html', 'refund-policy.html', 'terms-of-sale.html', 
                        'terms-of-service.html', 'privacy-policy.html', 'reviews.html', 'blog-article.html']
    
    html_files = [f for f in html_files if not any(ex in str(f) for ex in excluded_patterns)]
    
    print(f"\nFound {len(html_files)} HTML files to optimize\n")
    
    for html_file in html_files:
        try:
            optimize_html_file(str(html_file))
        except Exception as e:
            print(f"✗ Error processing {html_file}: {e}")
    
    print(f"\n✓ Optimization complete! {len(html_files)} files processed.\n")

if __name__ == '__main__':
    main()
