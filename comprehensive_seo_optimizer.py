#!/usr/bin/env python3
"""
Comprehensive SEO Optimizer for foorsa.ma
Optimizes all HTML pages with proper meta tags, structured data, and more.
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime

# Brand configuration
BRAND = "Foorsa"
DOMAIN = "https://foorsa.ma"
OG_IMAGE = "/assets/img/logo.png"
BRAND_COLORS = {"primary": "#041228", "secondary": "#eaca91"}

# Page metadata configuration
PAGE_META = {
    "index.html": {
        "en": {
            "title": "Study in China for Moroccan Students | Scholarships & Admissions - Foorsa",
            "description": "Transform your future with Foorsa. We help Moroccan students access top Chinese universities and scholarships. Expert guidance for studying in China.",
            "keywords": "study in china, study in china for moroccan students, china scholarships, chinese universities, study abroad china"
        },
        "fr": {
            "title": "Études en Chine pour Étudiants Marocains | Bourses & Admissions - Foorsa",
            "description": "Transformez votre avenir avec Foorsa. Nous aidons les étudiants marocains à accéder aux meilleures universités chinoises et bourses. Conseils d'experts pour étudier en Chine.",
            "keywords": "étudier en chine, bourses chine maroc, universités chinoises, études à l'étranger"
        },
        "ar": {
            "title": "الدراسة في الصين للطلاب المغاربة | المنح الدراسية والقبول - فرصة",
            "description": "غيّر مستقبلك مع فرصة. نساعد الطلاب المغاربة على الوصول إلى أفضل الجامعات الصينية والمنح الدراسية. إرشادات خبراء للدراسة في الصين.",
            "keywords": "الدراسة في الصين, الدراسة في الصين للمغاربة, منح الصين, الجامعات الصينية, الدراسة في الخارج"
        }
    },
    "shop.html": {
        "en": {
            "title": "Apply Now - Study in China Programs | Foorsa",
            "description": "Start your journey to study in China. Choose from our comprehensive programs for bachelor's, master's, and PhD studies with scholarship opportunities.",
            "keywords": "apply china university, china program application, study abroad application"
        },
        "fr": {
            "title": "Postulez Maintenant - Programmes d'Études en Chine | Foorsa",
            "description": "Commencez votre parcours d'études en Chine. Choisissez parmi nos programmes complets pour licence, master et doctorat avec opportunités de bourses.",
            "keywords": "postuler université chine, candidature programme chine"
        },
        "ar": {
            "title": "قدم الآن - برامج الدراسة في الصين | فرصة",
            "description": "ابدأ رحلتك للدراسة في الصين. اختر من بين برامجنا الشاملة للبكالوريوس والماجستير والدكتوراه مع فرص المنح الدراسية.",
            "keywords": "التقديم جامعة صينية, تقديم برنامج الصين"
        }
    },
    "scholarship.html": {
        "en": {
            "title": "China Scholarships for Moroccan Students | CSC & University Scholarships - Foorsa",
            "description": "Explore full and partial scholarships for Moroccan students to study in China. CSC scholarships, university scholarships, and provincial government funding.",
            "keywords": "china scholarships, csc scholarship morocco, chinese government scholarship"
        },
        "fr": {
            "title": "Bourses Chinoises pour Étudiants Marocains | Bourses CSC et Universitaires - Foorsa",
            "description": "Découvrez les bourses complètes et partielles pour étudiants marocains en Chine. Bourses CSC, bourses universitaires et financements gouvernementaux.",
            "keywords": "bourses chine, bourse csc maroc, bourse gouvernement chinois"
        },
        "ar": {
            "title": "منح الصين للطلاب المغاربة | منح CSC والمنح الجامعية - فرصة",
            "description": "استكشف المنح الدراسية الكاملة والجزئية للطلاب المغاربة للدراسة في الصين. منح CSC، منح جامعية، وتمويل حكومي إقليمي.",
            "keywords": "منح الصين, منحة csc المغرب, منحة الحكومة الصينية"
        }
    },
    "majors.html": {
        "en": {
            "title": "Study Programs & Majors in China | Medical, Engineering, Business - Foorsa",
            "description": "Discover top study programs in China: MBBS Medicine, Engineering (Civil, Computer, Electrical), Business, Architecture, and more. English-taught programs available.",
            "keywords": "mbbs china, engineering programs china, business studies china, medical school china"
        },
        "fr": {
            "title": "Programmes d'Études et Spécialités en Chine | Médecine, Ingénierie, Commerce - Foorsa",
            "description": "Découvrez les meilleurs programmes en Chine: Médecine MBBS, Ingénierie (Civil, Informatique, Électrique), Commerce, Architecture. Programmes en anglais disponibles.",
            "keywords": "mbbs chine, programmes ingénierie chine, études commerce chine"
        },
        "ar": {
            "title": "برامج الدراسة والتخصصات في الصين | الطب، الهندسة، الأعمال - فرصة",
            "description": "اكتشف أفضل برامج الدراسة في الصين: طب MBBS، الهندسة (مدنية، حاسوب، كهرباء)، الأعمال، العمارة. برامج بالإنجليزية متاحة.",
            "keywords": "mbbs الصين, برامج هندسة الصين, دراسة الأعمال الصين"
        }
    },
    "fees.html": {
        "en": {
            "title": "Tuition Fees & Living Costs in China | Affordable Education - Foorsa",
            "description": "Transparent pricing for studying in China. Learn about tuition fees, living expenses, accommodation costs, and our service fees for Moroccan students.",
            "keywords": "china tuition fees, cost of living china students, study in china fees"
        },
        "fr": {
            "title": "Frais de Scolarité et Coûts de Vie en Chine | Éducation Abordable - Foorsa",
            "description": "Prix transparents pour étudier en Chine. Informations sur les frais de scolarité, dépenses de vie, coûts d'hébergement et nos frais de service.",
            "keywords": "frais scolarité chine, coût de vie chine étudiants"
        },
        "ar": {
            "title": "رسوم الدراسة وتكاليف المعيشة في الصين | تعليم ميسور - فرصة",
            "description": "أسعار شفافة للدراسة في الصين. تعرف على رسوم الدراسة، نفقات المعيشة، تكاليف السكن ورسوم خدماتنا للطلاب المغاربة.",
            "keywords": "رسوم الدراسة الصين, تكلفة المعيشة الصين طلاب"
        }
    },
    "frequently-asked-questions.html": {
        "en": {
            "title": "FAQ - Studying in China for Moroccan Students | Common Questions - Foorsa",
            "description": "Get answers to frequently asked questions about studying in China: admissions, scholarships, visa process, language requirements, and living in China.",
            "keywords": "china study faq, studying in china questions, student visa china"
        },
        "fr": {
            "title": "FAQ - Étudier en Chine pour Étudiants Marocains | Questions Fréquentes - Foorsa",
            "description": "Réponses aux questions fréquentes sur les études en Chine: admissions, bourses, processus de visa, exigences linguistiques et vie en Chine.",
            "keywords": "faq études chine, questions étudier chine, visa étudiant chine"
        },
        "ar": {
            "title": "الأسئلة الشائعة - الدراسة في الصين للطلاب المغاربة - فرصة",
            "description": "احصل على إجابات للأسئلة الشائعة حول الدراسة في الصين: القبول، المنح، إجراءات التأشيرة، متطلبات اللغة، والحياة في الصين.",
            "keywords": "أسئلة شائعة الدراسة الصين, تأشيرة طالب الصين"
        }
    },
    "about-us.html": {
        "en": {
            "title": "About Foorsa | Your Partner for Studying in China from Morocco",
            "description": "Learn about Foorsa - the leading consultancy helping Moroccan students achieve their dreams of studying in China since 2019. Expert guidance, proven success.",
            "keywords": "about foorsa, china education consultancy morocco, study abroad agency"
        },
        "fr": {
            "title": "À Propos de Foorsa | Votre Partenaire pour Étudier en Chine depuis le Maroc",
            "description": "Découvrez Foorsa - le cabinet de conseil leader aidant les étudiants marocains à réaliser leurs rêves d'étudier en Chine depuis 2019.",
            "keywords": "à propos foorsa, agence études chine maroc"
        },
        "ar": {
            "title": "عن فرصة | شريكك للدراسة في الصين من المغرب",
            "description": "تعرف على فرصة - الاستشارات الرائدة التي تساعد الطلاب المغاربة على تحقيق أحلامهم بالدراسة في الصين منذ 2019.",
            "keywords": "عن فرصة, استشارات التعليم الصين المغرب"
        }
    },
    "mission-values.html": {
        "en": {
            "title": "Our Mission & Values | Making Global Education Accessible - Foorsa",
            "description": "Foorsa's mission is to empower Moroccan students with access to world-class education in China. Learn about our values of integrity, excellence, and student success.",
            "keywords": "foorsa mission, education values, student success"
        },
        "fr": {
            "title": "Notre Mission et Valeurs | Rendre l'Éducation Mondiale Accessible - Foorsa",
            "description": "La mission de Foorsa est d'autonomiser les étudiants marocains avec l'accès à une éducation de classe mondiale en Chine.",
            "keywords": "mission foorsa, valeurs éducation"
        },
        "ar": {
            "title": "مهمتنا وقيمنا | جعل التعليم العالمي متاحًا - فرصة",
            "description": "مهمة فرصة هي تمكين الطلاب المغاربة من الوصول إلى التعليم العالمي في الصين. تعرف على قيمنا.",
            "keywords": "مهمة فرصة, قيم التعليم"
        }
    },
    "step-by-step.html": {
        "en": {
            "title": "Application Process Step-by-Step | How to Apply for China Universities - Foorsa",
            "description": "Complete guide to applying for Chinese universities: from choosing your program to visa application. Simple 8-step process with Foorsa's expert support.",
            "keywords": "china university application process, how to apply china university, admission steps"
        },
        "fr": {
            "title": "Processus de Candidature Étape par Étape | Comment Postuler aux Universités Chinoises - Foorsa",
            "description": "Guide complet pour postuler aux universités chinoises: du choix du programme à la demande de visa. Processus simple en 8 étapes avec Foorsa.",
            "keywords": "processus candidature université chine, comment postuler"
        },
        "ar": {
            "title": "عملية التقديم خطوة بخطوة | كيفية التقديم للجامعات الصينية - فرصة",
            "description": "دليل شامل للتقديم للجامعات الصينية: من اختيار البرنامج إلى طلب التأشيرة. عملية بسيطة من 8 خطوات مع فرصة.",
            "keywords": "عملية التقديم جامعة صينية, كيفية التقديم"
        }
    },
    "documents.html": {
        "en": {
            "title": "Required Documents for China University Application | Document Checklist - Foorsa",
            "description": "Complete list of documents needed to apply for Chinese universities: academic transcripts, passport, medical certificate, recommendation letters, and more.",
            "keywords": "china university documents, required documents study china, application checklist"
        },
        "fr": {
            "title": "Documents Requis pour la Candidature Universitaire en Chine | Liste de Contrôle - Foorsa",
            "description": "Liste complète des documents nécessaires pour postuler aux universités chinoises: relevés académiques, passeport, certificat médical, lettres de recommandation.",
            "keywords": "documents université chine, documents requis études chine"
        },
        "ar": {
            "title": "المستندات المطلوبة للتقديم للجامعة الصينية | قائمة المراجعة - فرصة",
            "description": "قائمة كاملة بالمستندات المطلوبة للتقديم للجامعات الصينية: كشوف الدرجات، جواز السفر، شهادة طبية، خطابات توصية.",
            "keywords": "مستندات جامعة صينية, مستندات مطلوبة دراسة الصين"
        }
    },
    "contact.html": {
        "en": {
            "title": "Contact Foorsa | Get Expert Advice for Studying in China",
            "description": "Contact Foorsa for personalized guidance on studying in China. Reach us via WhatsApp, email, or visit our office in Morocco. Free consultation available.",
            "keywords": "contact foorsa, china study consultation, education consultancy contact"
        },
        "fr": {
            "title": "Contactez Foorsa | Obtenez des Conseils d'Experts pour Étudier en Chine",
            "description": "Contactez Foorsa pour des conseils personnalisés sur les études en Chine. WhatsApp, email, ou visitez notre bureau au Maroc. Consultation gratuite.",
            "keywords": "contacter foorsa, consultation études chine"
        },
        "ar": {
            "title": "اتصل بفرصة | احصل على استشارة خبراء للدراسة في الصين",
            "description": "اتصل بفرصة للحصول على إرشادات شخصية للدراسة في الصين. تواصل عبر واتساب، البريد الإلكتروني، أو زر مكتبنا في المغرب.",
            "keywords": "اتصل بفرصة, استشارة دراسة الصين"
        }
    },
    "blog.html": {
        "en": {
            "title": "Blog - Study in China Tips & Guides | Foorsa",
            "description": "Read the latest articles, tips, and guides about studying in China for Moroccan students. University reviews, scholarship tips, and student experiences.",
            "keywords": "china study blog, student experiences china, university guides"
        },
        "fr": {
            "title": "Blog - Conseils et Guides pour Étudier en Chine | Foorsa",
            "description": "Lisez les derniers articles, conseils et guides sur les études en Chine pour étudiants marocains. Avis universitaires, conseils sur les bourses.",
            "keywords": "blog études chine, expériences étudiants chine"
        },
        "ar": {
            "title": "المدونة - نصائح وأدلة للدراسة في الصين | فرصة",
            "description": "اقرأ أحدث المقالات والنصائح والأدلة حول الدراسة في الصين للطلاب المغاربة. مراجعات الجامعات، نصائح المنح.",
            "keywords": "مدونة الدراسة الصين, تجارب طلاب الصين"
        }
    },
    "reviews.html": {
        "en": {
            "title": "Student Reviews & Success Stories | Foorsa Alumni Testimonials",
            "description": "Read testimonials from Moroccan students who studied in China with Foorsa. Real success stories, experiences, and reviews from our alumni.",
            "keywords": "student testimonials china, foorsa reviews, success stories"
        },
        "fr": {
            "title": "Avis d'Étudiants et Histoires de Réussite | Témoignages d'Anciens de Foorsa",
            "description": "Lisez les témoignages d'étudiants marocains ayant étudié en Chine avec Foorsa. Histoires de réussite réelles et avis de nos anciens.",
            "keywords": "témoignages étudiants chine, avis foorsa"
        },
        "ar": {
            "title": "آراء الطلاب وقصص النجاح | شهادات خريجي فرصة",
            "description": "اقرأ شهادات الطلاب المغاربة الذين درسوا في الصين مع فرصة. قصص نجاح حقيقية وتجارب وآراء من خريجينا.",
            "keywords": "شهادات طلاب الصين, آراء فرصة"
        }
    },
    "partner-with-us.html": {
        "en": {
            "title": "Partner with Foorsa | University Partnerships & Collaborations",
            "description": "Partner with Foorsa to recruit Moroccan students. We connect top Chinese universities with qualified students. B2B partnership opportunities available.",
            "keywords": "university partnership, recruitment agency china, b2b education"
        },
        "fr": {
            "title": "Partenariat avec Foorsa | Partenariats Universitaires et Collaborations",
            "description": "Partenariat avec Foorsa pour recruter des étudiants marocains. Nous connectons les meilleures universités chinoises avec des étudiants qualifiés.",
            "keywords": "partenariat universitaire, agence recrutement chine"
        },
        "ar": {
            "title": "شراكة مع فرصة | شراكات جامعية وتعاونات",
            "description": "شراكة مع فرصة لتوظيف الطلاب المغاربة. نربط أفضل الجامعات الصينية بطلاب مؤهلين. فرص شراكة B2B متاحة.",
            "keywords": "شراكة جامعية, وكالة توظيف الصين"
        }
    },
    "careers.html": {
        "en": {
            "title": "Careers at Foorsa | Join Our Team",
            "description": "Explore career opportunities at Foorsa. Join our mission to help Moroccan students study abroad. Open positions in consulting, marketing, and operations.",
            "keywords": "foorsa careers, education jobs morocco, study abroad jobs"
        },
        "fr": {
            "title": "Carrières chez Foorsa | Rejoignez Notre Équipe",
            "description": "Explorez les opportunités de carrière chez Foorsa. Rejoignez notre mission d'aider les étudiants marocains à étudier à l'étranger.",
            "keywords": "carrières foorsa, emplois éducation maroc"
        },
        "ar": {
            "title": "وظائف في فرصة | انضم إلى فريقنا",
            "description": "استكشف فرص العمل في فرصة. انضم إلى مهمتنا لمساعدة الطلاب المغاربة على الدراسة في الخارج.",
            "keywords": "وظائف فرصة, وظائف تعليم المغرب"
        }
    },
    "quiz.html": {
        "en": {
            "title": "Find Your Perfect Study Program | Foorsa Program Finder Quiz",
            "description": "Take our interactive quiz to discover the best study program and university in China for you. Personalized recommendations based on your interests and goals.",
            "keywords": "study program quiz, find university china, program finder"
        },
        "fr": {
            "title": "Trouvez Votre Programme d'Études Idéal | Quiz de Foorsa",
            "description": "Répondez à notre quiz interactif pour découvrir le meilleur programme d'études et université en Chine pour vous.",
            "keywords": "quiz programme études, trouver université chine"
        },
        "ar": {
            "title": "ابحث عن برنامج الدراسة المثالي | اختبار فرصة",
            "description": "خذ اختبارنا التفاعلي لاكتشاف أفضل برنامج دراسي وجامعة في الصين لك. توصيات شخصية بناءً على اهتماماتك وأهدافك.",
            "keywords": "اختبار برنامج الدراسة, إيجاد جامعة الصين"
        }
    },
    "privacy-policy.html": {
        "en": {
            "title": "Privacy Policy | Foorsa",
            "description": "Read Foorsa's privacy policy. Learn how we collect, use, and protect your personal information when you use our services.",
            "keywords": "privacy policy, data protection, gdpr"
        },
        "fr": {
            "title": "Politique de Confidentialité | Foorsa",
            "description": "Lisez la politique de confidentialité de Foorsa. Découvrez comment nous collectons, utilisons et protégeons vos informations personnelles.",
            "keywords": "politique de confidentialité, protection des données"
        },
        "ar": {
            "title": "سياسة الخصوصية | فرصة",
            "description": "اقرأ سياسة الخصوصية الخاصة بفرصة. تعرف على كيفية جمع واستخدام وحماية معلوماتك الشخصية.",
            "keywords": "سياسة الخصوصية, حماية البيانات"
        }
    },
    "terms-of-service.html": {
        "en": {
            "title": "Terms of Service | Foorsa",
            "description": "Read Foorsa's terms of service. Understand your rights and obligations when using our educational consultancy services.",
            "keywords": "terms of service, terms and conditions, service agreement"
        },
        "fr": {
            "title": "Conditions d'Utilisation | Foorsa",
            "description": "Lisez les conditions d'utilisation de Foorsa. Comprenez vos droits et obligations lors de l'utilisation de nos services de conseil.",
            "keywords": "conditions d'utilisation, conditions générales"
        },
        "ar": {
            "title": "شروط الخدمة | فرصة",
            "description": "اقرأ شروط الخدمة الخاصة بفرصة. افهم حقوقك والتزاماتك عند استخدام خدماتنا الاستشارية التعليمية.",
            "keywords": "شروط الخدمة, شروط وأحكام"
        }
    }
}


def get_lang_from_path(file_path):
    """Determine language from file path"""
    if '/en/' in file_path:
        return 'en'
    elif '/fr/' in file_path:
        return 'fr'
    elif '/ar/' in file_path:
        return 'ar'
    # Root index.html defaults to French
    elif file_path.endswith('/index.html') and '/en/' not in file_path and '/fr/' not in file_path:
        return 'fr'
    return 'en'


def get_page_slug(file_path):
    """Extract page slug from file path"""
    return os.path.basename(file_path)


def get_canonical_url(file_path, lang):
    """Generate canonical URL for a page"""
    slug = get_page_slug(file_path)
    if slug == 'index.html':
        return f"{DOMAIN}/{lang}/index.html"
    return f"{DOMAIN}/{lang}/{slug}"


def get_hreflang_urls(file_path):
    """Generate hreflang URLs for all language versions"""
    slug = get_page_slug(file_path)
    urls = {
        'en': f"{DOMAIN}/en/{slug}",
        'fr': f"{DOMAIN}/fr/{slug}",
        'ar': f"{DOMAIN}/ar/{slug}"
    }
    return urls


def get_page_meta(slug, lang):
    """Get metadata for a specific page and language"""
    if slug in PAGE_META and lang in PAGE_META[slug]:
        return PAGE_META[slug][lang]
    
    # Default fallback metadata
    return {
        "title": f"{BRAND} - {slug.replace('.html', '').replace('-', ' ').title()}",
        "description": f"Learn more about {slug.replace('.html', '').replace('-', ' ')} with Foorsa.",
        "keywords": "study in china, foorsa, moroccan students"
    }


def create_json_ld_organization():
    """Create Organization JSON-LD structured data"""
    return {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": BRAND,
        "url": DOMAIN,
        "logo": f"{DOMAIN}{OG_IMAGE}",
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
    }


def create_json_ld_website(lang):
    """Create WebSite JSON-LD structured data"""
    lang_path = f"/{lang}/" if lang != 'fr' else "/fr/"
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": BRAND,
        "url": f"{DOMAIN}{lang_path}",
        "potentialAction": {
            "@type": "SearchAction",
            "target": f"{DOMAIN}{lang_path}search?q={{search_term_string}}",
            "query-input": "required name=search_term_string"
        }
    }


def create_json_ld_breadcrumb(page_name, lang):
    """Create BreadcrumbList JSON-LD for subpages"""
    lang_labels = {
        'en': 'Home',
        'fr': 'Accueil',
        'ar': 'الرئيسية'
    }
    
    breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": lang_labels.get(lang, 'Home'),
                "item": f"{DOMAIN}/{lang}/index.html"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": page_name.replace('.html', '').replace('-', ' ').title(),
                "item": f"{DOMAIN}/{lang}/{page_name}"
            }
        ]
    }
    return breadcrumb


def create_json_ld_service(lang):
    """Create Service JSON-LD for program/service pages"""
    descriptions = {
        'en': "Comprehensive study abroad consultancy services for Moroccan students wanting to study in China",
        'fr': "Services de conseil complets pour les étudiants marocains souhaitant étudier en Chine",
        'ar': "خدمات استشارية شاملة للطلاب المغاربة الراغبين في الدراسة في الصين"
    }
    
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Educational Consultancy",
        "provider": {
            "@type": "EducationalOrganization",
            "name": BRAND,
            "url": DOMAIN
        },
        "areaServed": {
            "@type": "Country",
            "name": "Morocco"
        },
        "description": descriptions.get(lang, descriptions['en'])
    }


def optimize_html_file(file_path):
    """Optimize a single HTML file with SEO enhancements"""
    print(f"Optimizing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        
        # Determine language
        lang = get_lang_from_path(file_path)
        slug = get_page_slug(file_path)
        
        # Set html lang attribute
        if soup.html:
            soup.html['lang'] = lang
            if lang == 'ar':
                soup.html['dir'] = 'rtl'
        
        # Get page metadata
        page_meta = get_page_meta(slug, lang)
        canonical_url = get_canonical_url(file_path, lang)
        hreflang_urls = get_hreflang_urls(file_path)
        
        # Remove WordPress generator meta if exists
        for meta in soup.find_all('meta', {'name': 'generator'}):
            meta.decompose()
        
        # Ensure head exists
        if not soup.head:
            head = soup.new_tag('head')
            soup.html.insert(0, head)
        
        # Update or create title
        if soup.title:
            soup.title.string = page_meta['title']
        else:
            title_tag = soup.new_tag('title')
            title_tag.string = page_meta['title']
            soup.head.append(title_tag)
        
        # Remove existing meta description and add new one
        for meta in soup.find_all('meta', {'name': 'description'}):
            meta.decompose()
        meta_desc = soup.new_tag('meta', attrs={'name': 'description', 'content': page_meta['description']})
        soup.head.append(meta_desc)
        
        # Remove existing keywords and add new
        for meta in soup.find_all('meta', {'name': 'keywords'}):
            meta.decompose()
        if page_meta.get('keywords'):
            meta_keywords = soup.new_tag('meta', attrs={'name': 'keywords', 'content': page_meta['keywords']})
            soup.head.append(meta_keywords)
        
        # Ensure robots meta exists
        if not soup.find('meta', {'name': 'robots'}):
            meta_robots = soup.new_tag('meta', attrs={'name': 'robots', 'content': 'index, follow'})
            soup.head.append(meta_robots)
        
        # Remove existing canonical and add new
        for link in soup.find_all('link', {'rel': 'canonical'}):
            link.decompose()
        canonical_link = soup.new_tag('link', attrs={'rel': 'canonical', 'href': canonical_url})
        soup.head.append(canonical_link)
        
        # Remove existing hreflang and add new
        for link in soup.find_all('link', {'rel': 'alternate', 'hreflang': True}):
            link.decompose()
        for hreflang_code, hreflang_url in hreflang_urls.items():
            hreflang_link = soup.new_tag('link', attrs={'rel': 'alternate', 'hreflang': hreflang_code, 'href': hreflang_url})
            soup.head.append(hreflang_link)
        # Add x-default
        xdefault_link = soup.new_tag('link', attrs={'rel': 'alternate', 'hreflang': 'x-default', 'href': hreflang_urls['en']})
        soup.head.append(xdefault_link)
        
        # Open Graph tags
        og_locale_map = {'en': 'en_US', 'fr': 'fr_FR', 'ar': 'ar_AR'}
        og_tags = {
            'og:title': page_meta['title'],
            'og:description': page_meta['description'],
            'og:url': canonical_url,
            'og:type': 'website',
            'og:image': f"{DOMAIN}{OG_IMAGE}",
            'og:site_name': BRAND,
            'og:locale': og_locale_map.get(lang, 'en_US')
        }
        
        for prop, content in og_tags.items():
            # Remove existing
            for meta in soup.find_all('meta', {'property': prop}):
                meta.decompose()
            # Add new
            og_meta = soup.new_tag('meta', attrs={'property': prop, 'content': content})
            soup.head.append(og_meta)
        
        # Twitter Card tags
        twitter_tags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': page_meta['title'],
            'twitter:description': page_meta['description'],
            'twitter:image': f"{DOMAIN}{OG_IMAGE}"
        }
        
        for name, content in twitter_tags.items():
            # Remove existing
            for meta in soup.find_all('meta', {'name': name}):
                meta.decompose()
            # Add new
            twitter_meta = soup.new_tag('meta', attrs={'name': name, 'content': content})
            soup.head.append(twitter_meta)
        
        # JSON-LD Structured Data
        # Remove existing JSON-LD scripts
        for script in soup.find_all('script', {'type': 'application/ld+json'}):
            script.decompose()
        
        # Add Organization + WebSite for homepages
        if slug == 'index.html':
            org_script = soup.new_tag('script', type='application/ld+json')
            import json
            org_script.string = json.dumps(create_json_ld_organization(), indent=2, ensure_ascii=False)
            soup.head.append(org_script)
            
            website_script = soup.new_tag('script', type='application/ld+json')
            website_script.string = json.dumps(create_json_ld_website(lang), indent=2, ensure_ascii=False)
            soup.head.append(website_script)
        
        # Add BreadcrumbList for subpages
        elif slug not in ['index.html', 'cart.html', 'checkout.html', 'payment-confirmation.html', 'payment-failed.html']:
            breadcrumb_script = soup.new_tag('script', type='application/ld+json')
            import json
            breadcrumb_script.string = json.dumps(create_json_ld_breadcrumb(slug, lang), indent=2, ensure_ascii=False)
            soup.head.append(breadcrumb_script)
        
        # Add Service schema for program pages
        if slug in ['shop.html', 'scholarship.html', 'majors.html', 'fees.html']:
            service_script = soup.new_tag('script', type='application/ld+json')
            import json
            service_script.string = json.dumps(create_json_ld_service(lang), indent=2, ensure_ascii=False)
            soup.head.append(service_script)
        
        # Ensure single H1
        h1_tags = soup.find_all('h1')
        if len(h1_tags) > 1:
            print(f"  ⚠ Multiple H1 tags found ({len(h1_tags)}), keeping first one visible")
            for idx, h1 in enumerate(h1_tags[1:], 1):
                # Change to h2 instead of removing
                h1.name = 'h2'
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"  ✓ Optimized: {slug} ({lang})")
        return True
    
    except Exception as e:
        print(f"  ✗ Error optimizing {file_path}: {e}")
        return False


def find_all_html_files(base_dir):
    """Find all legitimate HTML files (excluding duplicates/junk)"""
    html_files = []
    
    # Main language directories
    for lang in ['en', 'fr', 'ar']:
        lang_dir = os.path.join(base_dir, lang)
        if os.path.exists(lang_dir):
            for file in os.listdir(lang_dir):
                if file.endswith('.html') and not file.startswith('.'):
                    html_files.append(os.path.join(lang_dir, file))
    
    # Root index.html
    root_index = os.path.join(base_dir, 'index.html')
    if os.path.exists(root_index):
        html_files.append(root_index)
    
    return html_files


def main():
    """Main optimization function"""
    base_dir = '/data/.openclaw/workspace/foorsa-website'
    
    print("=" * 60)
    print("COMPREHENSIVE SEO OPTIMIZATION FOR FOORSA.MA")
    print("=" * 60)
    
    # Find all HTML files
    html_files = find_all_html_files(base_dir)
    print(f"\nFound {len(html_files)} HTML files to optimize\n")
    
    # Optimize each file
    success_count = 0
    fail_count = 0
    
    for file_path in html_files:
        if optimize_html_file(file_path):
            success_count += 1
        else:
            fail_count += 1
    
    print("\n" + "=" * 60)
    print(f"OPTIMIZATION COMPLETE")
    print(f"✓ Success: {success_count} files")
    print(f"✗ Failed: {fail_count} files")
    print("=" * 60)


if __name__ == '__main__':
    main()
