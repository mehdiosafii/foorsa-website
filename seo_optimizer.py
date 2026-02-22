#!/usr/bin/env python3
"""
Comprehensive SEO Optimizer for foorsa.ma
Implements hreflang, canonical, OG tags, structured data, and more
"""

import os
import re
import json
from pathlib import Path
from bs4 import BeautifulSoup
from typing import Dict, List, Tuple

# Base URL
BASE_URL = "https://foorsa.ma"

# Page metadata with optimized titles and descriptions
PAGE_META = {
    "en": {
        "index": {
            "title": "Study in China for Moroccan Students | Scholarships & Admissions - Foorsa",
            "description": "Transform your future with Foorsa. We help Moroccan students access top Chinese universities and scholarships. Expert guidance for studying in China.",
            "keywords": "study in china, study in china for moroccan students, china scholarships, chinese universities, study abroad china"
        },
        "shop": {
            "title": "Apply to Study in China | Start Your Application Today - Foorsa",
            "description": "Ready to study in China? Apply now through Foorsa. Expert application support for Moroccan students seeking admission to Chinese universities.",
            "keywords": "apply to study in china, china university application, study abroad application, chinese university admission"
        },
        "about-us": {
            "title": "About Foorsa | Helping Moroccan Students Study in China Since 2020",
            "description": "Learn about Foorsa's mission to connect Moroccan students with world-class Chinese universities. Your trusted partner for studying in China.",
            "keywords": "about foorsa, study in china morocco, china education consultancy"
        },
        "scholarship": {
            "title": "China Scholarships 2025-2026 | CSC & University Grants for Moroccans - Foorsa",
            "description": "Discover full and partial scholarships for Moroccan students in China. CSC scholarships, provincial grants, and university scholarships available.",
            "keywords": "china scholarships, csc scholarship, chinese government scholarship, study in china scholarship, china scholarships for moroccans"
        },
        "majors": {
            "title": "Study Programs in China | Engineering, Medicine, Business & More - Foorsa",
            "description": "Explore 500+ study programs in Chinese universities. Engineering, Medicine, Business, IT, Arts - taught in English and Chinese. Find your perfect major.",
            "keywords": "study programs in china, china university majors, study medicine in china, study engineering in china, business programs china"
        },
        "fees": {
            "title": "China University Tuition Fees 2025 | Affordable Study Abroad - Foorsa",
            "description": "Transparent pricing for studying in China. Tuition fees from $2,000/year. Flexible payment plans and scholarship options for Moroccan students.",
            "keywords": "china university fees, tuition fees china, cost of studying in china, affordable universities china"
        },
        "step-by-step": {
            "title": "How to Study in China | Step-by-Step Application Guide - Foorsa",
            "description": "Complete guide to applying for Chinese universities. Step-by-step process from choosing a major to getting your visa. Expert support included.",
            "keywords": "how to study in china, china application process, study in china guide, apply to chinese university"
        },
        "documents": {
            "title": "Required Documents to Study in China | Complete Checklist - Foorsa",
            "description": "Everything you need to apply to Chinese universities. Complete document checklist, requirements, and preparation tips for Moroccan students.",
            "keywords": "china university documents, study in china requirements, application documents china"
        },
        "blog": {
            "title": "Study in China Blog | Tips, Guides & Student Stories - Foorsa",
            "description": "Read the latest tips, guides, and success stories from Moroccan students in China. Your resource for everything about studying in China.",
            "keywords": "study in china blog, china student stories, study abroad tips, moroccan students in china"
        },
        "frequently-asked-questions": {
            "title": "Study in China FAQ | Common Questions Answered - Foorsa",
            "description": "Get answers to all your questions about studying in China. Admissions, scholarships, cost of living, campus life, and more.",
            "keywords": "study in china faq, china universities questions, study abroad china faq"
        },
        "contact": {
            "title": "Contact Foorsa | Study in China Consultation & Support",
            "description": "Get in touch with Foorsa's expert team. Free consultation for Moroccan students interested in studying in China. We're here to help.",
            "keywords": "contact foorsa, study in china consultation, china education advisor"
        },
        "mission-values": {
            "title": "Our Mission & Values | Foorsa Educational Consulting",
            "description": "Discover Foorsa's commitment to empowering Moroccan students through quality education in China. Our mission, vision, and core values.",
            "keywords": "foorsa mission, educational values, study abroad mission"
        },
        "engagement": {
            "title": "Student Engagement | Community & Support - Foorsa",
            "description": "Join the Foorsa student community. Events, support network, and resources for Moroccan students studying in China.",
            "keywords": "student engagement, foorsa community, study abroad support"
        },
        "recruitment": {
            "title": "Join Foorsa Team | Careers in Education Consulting",
            "description": "Work with Foorsa to help Moroccan students achieve their dreams of studying in China. Explore career opportunities.",
            "keywords": "foorsa careers, education consulting jobs, work at foorsa"
        },
        "partner-with-us": {
            "title": "Partner with Foorsa | University & Business Partnerships",
            "description": "Collaborate with Foorsa to expand educational opportunities between Morocco and China. Partnership opportunities for universities and organizations.",
            "keywords": "foorsa partnership, university partnership, education collaboration"
        }
    },
    "fr": {
        "index": {
            "title": "Étudier en Chine pour Étudiants Marocains | Bourses & Admissions - Foorsa",
            "description": "Transformez votre avenir avec Foorsa. Nous aidons les étudiants marocains à accéder aux meilleures universités chinoises et bourses d'études.",
            "keywords": "étudier en chine, étudier en chine pour marocains, bourse chine, universités chinoises, études en chine"
        },
        "shop": {
            "title": "Postuler pour Étudier en Chine | Commencez Votre Candidature - Foorsa",
            "description": "Prêt à étudier en Chine? Postulez maintenant via Foorsa. Support expert pour étudiants marocains cherchant l'admission aux universités chinoises.",
            "keywords": "postuler université chine, candidature chine, admission université chinoise"
        },
        "about-us": {
            "title": "À Propos de Foorsa | Aider les Étudiants Marocains depuis 2020",
            "description": "Découvrez la mission de Foorsa: connecter les étudiants marocains aux universités chinoises de classe mondiale. Votre partenaire de confiance.",
            "keywords": "à propos foorsa, études en chine maroc, conseil éducation chine"
        },
        "scholarship": {
            "title": "Bourses Chine 2025-2026 | CSC & Bourses Universitaires pour Marocains - Foorsa",
            "description": "Découvrez les bourses complètes et partielles pour étudiants marocains en Chine. Bourses CSC, provinciales et universitaires disponibles.",
            "keywords": "bourse chine, bourse csc, bourse gouvernement chinois, bourses études chine, bourse chine pour marocains"
        },
        "majors": {
            "title": "Programmes d'Études en Chine | Ingénierie, Médecine, Commerce - Foorsa",
            "description": "Explorez 500+ programmes dans les universités chinoises. Ingénierie, Médecine, Commerce, IT, Arts - en anglais et chinois. Trouvez votre spécialité.",
            "keywords": "programmes études chine, spécialités université chine, étudier médecine chine, étudier ingénierie chine"
        },
        "fees": {
            "title": "Frais Université Chine 2025 | Études Abordables à l'Étranger - Foorsa",
            "description": "Tarifs transparents pour étudier en Chine. Frais de scolarité dès 2000$/an. Plans de paiement flexibles et options de bourses.",
            "keywords": "frais université chine, frais scolarité chine, coût études chine, universités abordables chine"
        },
        "step-by-step": {
            "title": "Comment Étudier en Chine | Guide d'Application Étape par Étape - Foorsa",
            "description": "Guide complet pour postuler aux universités chinoises. Processus pas à pas du choix de spécialité jusqu'au visa. Support expert inclus.",
            "keywords": "comment étudier en chine, processus candidature chine, guide études chine"
        },
        "documents": {
            "title": "Documents Requis pour Étudier en Chine | Liste Complète - Foorsa",
            "description": "Tout ce dont vous avez besoin pour postuler aux universités chinoises. Liste complète des documents et conseils de préparation.",
            "keywords": "documents université chine, exigences études chine, documents candidature chine"
        },
        "blog": {
            "title": "Blog Études en Chine | Conseils, Guides & Témoignages - Foorsa",
            "description": "Lisez les derniers conseils, guides et témoignages d'étudiants marocains en Chine. Votre ressource pour tout sur les études en Chine.",
            "keywords": "blog études chine, témoignages étudiants chine, conseils études étranger"
        },
        "frequently-asked-questions": {
            "title": "FAQ Études en Chine | Questions Fréquentes Répondues - Foorsa",
            "description": "Réponses à toutes vos questions sur les études en Chine. Admissions, bourses, coût de vie, vie campus, et plus encore.",
            "keywords": "faq études chine, questions universités chine, faq études étranger"
        },
        "contact": {
            "title": "Contact Foorsa | Consultation & Support Études en Chine",
            "description": "Contactez l'équipe d'experts Foorsa. Consultation gratuite pour étudiants marocains intéressés par les études en Chine.",
            "keywords": "contact foorsa, consultation études chine, conseiller éducation chine"
        },
        "mission-values": {
            "title": "Notre Mission & Valeurs | Foorsa Conseil Éducatif",
            "description": "Découvrez l'engagement de Foorsa à autonomiser les étudiants marocains par l'éducation de qualité en Chine.",
            "keywords": "mission foorsa, valeurs éducatives, mission études étranger"
        },
        "engagement": {
            "title": "Engagement Étudiant | Communauté & Support - Foorsa",
            "description": "Rejoignez la communauté étudiante Foorsa. Événements, réseau de support, et ressources pour étudiants marocains en Chine.",
            "keywords": "engagement étudiant, communauté foorsa, support études étranger"
        },
        "recruitment": {
            "title": "Rejoindre Foorsa | Carrières en Conseil Éducatif",
            "description": "Travaillez avec Foorsa pour aider les étudiants marocains à réaliser leurs rêves d'études en Chine. Opportunités de carrière.",
            "keywords": "carrières foorsa, emplois conseil éducation, travailler chez foorsa"
        },
        "partner-with-us": {
            "title": "Partenariat avec Foorsa | Partenariats Universitaires",
            "description": "Collaborez avec Foorsa pour élargir les opportunités éducatives entre le Maroc et la Chine. Partenariats universitaires.",
            "keywords": "partenariat foorsa, partenariat universitaire, collaboration éducative"
        }
    },
    "ar": {
        "index": {
            "title": "الدراسة في الصين للطلاب المغاربة | منح دراسية وقبولات - Foorsa",
            "description": "حقق مستقبلك مع Foorsa. نساعد الطلاب المغاربة في الوصول إلى أفضل الجامعات الصينية والمنح الدراسية.",
            "keywords": "الدراسة في الصين, الدراسة في الصين للمغاربة, منح الصين, الجامعات الصينية, الدراسة في الخارج"
        },
        "shop": {
            "title": "التقديم للدراسة في الصين | ابدأ طلبك اليوم - Foorsa",
            "description": "جاهز للدراسة في الصين؟ قدم الآن عبر Foorsa. دعم خبير للطلاب المغاربة الباحثين عن القبول في الجامعات الصينية.",
            "keywords": "التقديم للجامعات الصينية, طلب الدراسة في الصين, قبول الجامعات الصينية"
        },
        "about-us": {
            "title": "عن Foorsa | مساعدة الطلاب المغاربة منذ 2020",
            "description": "تعرف على مهمة Foorsa: ربط الطلاب المغاربة بالجامعات الصينية العالمية. شريكك الموثوق.",
            "keywords": "عن foorsa, الدراسة في الصين المغرب, استشارات التعليم الصين"
        },
        "scholarship": {
            "title": "منح الصين 2025-2026 | منح CSC والجامعات للمغاربة - Foorsa",
            "description": "اكتشف المنح الكاملة والجزئية للطلاب المغاربة في الصين. منح CSC والمنح الإقليمية والجامعية متاحة.",
            "keywords": "منح الصين, منحة csc, منحة الحكومة الصينية, منح الدراسة في الصين, منح الصين للمغاربة"
        },
        "majors": {
            "title": "برامج الدراسة في الصين | هندسة، طب، أعمال والمزيد - Foorsa",
            "description": "استكشف أكثر من 500 برنامج دراسي في الجامعات الصينية. هندسة، طب، أعمال، تقنية المعلومات، فنون - بالإنجليزية والصينية.",
            "keywords": "برامج الدراسة في الصين, تخصصات الجامعات الصينية, دراسة الطب في الصين, دراسة الهندسة في الصين"
        },
        "fees": {
            "title": "رسوم الجامعات الصينية 2025 | دراسة ميسورة في الخارج - Foorsa",
            "description": "أسعار شفافة للدراسة في الصين. رسوم دراسية من 2000 دولار/سنة. خطط دفع مرنة وخيارات منح دراسية.",
            "keywords": "رسوم الجامعات الصينية, رسوم الدراسة في الصين, تكلفة الدراسة في الصين"
        },
        "step-by-step": {
            "title": "كيفية الدراسة في الصين | دليل التقديم خطوة بخطوة - Foorsa",
            "description": "دليل شامل للتقديم للجامعات الصينية. عملية خطوة بخطوة من اختيار التخصص حتى الحصول على التأشيرة.",
            "keywords": "كيفية الدراسة في الصين, عملية التقديم للصين, دليل الدراسة في الصين"
        },
        "documents": {
            "title": "المستندات المطلوبة للدراسة في الصين | قائمة كاملة - Foorsa",
            "description": "كل ما تحتاجه للتقديم للجامعات الصينية. قائمة كاملة بالمستندات المطلوبة ونصائح التحضير.",
            "keywords": "مستندات الجامعات الصينية, متطلبات الدراسة في الصين, وثائق التقديم للصين"
        },
        "blog": {
            "title": "مدونة الدراسة في الصين | نصائح، أدلة وقصص طلاب - Foorsa",
            "description": "اقرأ أحدث النصائح والأدلة وقصص النجاح من الطلاب المغاربة في الصين. مصدرك لكل شيء عن الدراسة في الصين.",
            "keywords": "مدونة الدراسة في الصين, قصص الطلاب في الصين, نصائح الدراسة في الخارج"
        },
        "frequently-asked-questions": {
            "title": "أسئلة شائعة عن الدراسة في الصين | إجابات - Foorsa",
            "description": "احصل على إجابات لجميع أسئلتك حول الدراسة في الصين. القبولات، المنح، تكلفة المعيشة، الحياة الجامعية، والمزيد.",
            "keywords": "أسئلة الدراسة في الصين, أسئلة الجامعات الصينية, أسئلة الدراسة في الخارج"
        },
        "contact": {
            "title": "اتصل بـ Foorsa | استشارة ودعم الدراسة في الصين",
            "description": "تواصل مع فريق خبراء Foorsa. استشارة مجانية للطلاب المغاربة المهتمين بالدراسة في الصين.",
            "keywords": "اتصل بـ foorsa, استشارة الدراسة في الصين, مستشار التعليم في الصين"
        },
        "mission-values": {
            "title": "مهمتنا وقيمنا | Foorsa الاستشارات التعليمية",
            "description": "اكتشف التزام Foorsa بتمكين الطلاب المغاربة من خلال التعليم الجيد في الصين.",
            "keywords": "مهمة foorsa, القيم التعليمية, مهمة الدراسة في الخارج"
        },
        "engagement": {
            "title": "مشاركة الطلاب | المجتمع والدعم - Foorsa",
            "description": "انضم إلى مجتمع طلاب Foorsa. فعاليات، شبكة دعم، وموارد للطلاب المغاربة في الصين.",
            "keywords": "مشاركة الطلاب, مجتمع foorsa, دعم الدراسة في الخارج"
        },
        "recruitment": {
            "title": "انضم لفريق Foorsa | وظائف في الاستشارات التعليمية",
            "description": "اعمل مع Foorsa لمساعدة الطلاب المغاربة على تحقيق أحلامهم في الدراسة في الصين. فرص وظيفية.",
            "keywords": "وظائف foorsa, وظائف الاستشارات التعليمية, العمل في foorsa"
        },
        "partner-with-us": {
            "title": "الشراكة مع Foorsa | شراكات جامعية وتجارية",
            "description": "تعاون مع Foorsa لتوسيع الفرص التعليمية بين المغرب والصين. فرص شراكة للجامعات والمنظمات.",
            "keywords": "شراكة foorsa, شراكة جامعية, تعاون تعليمي"
        }
    }
}

# FAQ data for structured data
FAQ_DATA = [
    {
        "question": "How do professors interact with foreign students?",
        "answer": "Chinese professors are renowned for their respect and appreciation of all students, including foreign ones. This is thanks to their culture, which respects diversity and difference. That's why you'll always find teachers ready to help you and answer any questions you may have. There are many foreign students in China, which has led teachers to develop methods to facilitate communication and ensure their understanding of the lessons."
    },
    {
        "question": "Are all professors Chinese?",
        "answer": "Yes, the majority of teachers in China are Chinese. But some universities have foreign professors, particularly in programs taught in English, such as Australians, British, and Americans. This diversity enriches the learning experience and provides different perspectives."
    },
    {
        "question": "What is the language of communication with the professors?",
        "answer": "It all depends on the specialty you choose and the university that accepts you. English-language programs: many programs, particularly in business, engineering and medicine, are taught in English. This is ideal for students who don't know Chinese. Programs in Chinese: some fields, particularly those related to Chinese culture and history, are taught in Chinese. There are also programs that combine the two languages, allowing students to progressively learn Chinese while developing their language skills."
    },
    {
        "question": "Is the diploma internationally recognized?",
        "answer": "Yes, university degrees obtained in China are internationally recognized. This is thanks to the very high quality of teaching and the good reputation of Chinese universities. Many Chinese universities are ranked among the world's top 200, ensuring that your degree will have significant value on the global job market."
    },
    {
        "question": "What are the tuition fees?",
        "answer": "Tuition fees in China vary depending on the university, program, and level of study. Generally, they are much more affordable than in Western countries. For undergraduate programs, fees typically range from $2,000 to $5,000 per year. Master's programs range from $3,000 to $6,000 annually. Medical and specialized programs may be higher. Many scholarships are available to help offset these costs."
    },
    {
        "question": "What is the cost of living in China?",
        "answer": "Living in China is very affordable compared to Western countries. Monthly expenses typically include: Housing (dormitory): $50-$200; Food: $150-$300; Transportation: $20-$50; Personal expenses: $50-$100. In total, students can comfortably live on $300-$600 per month depending on the city and lifestyle. Major cities like Beijing and Shanghai are more expensive, while smaller cities offer even lower costs."
    },
    {
        "question": "How to apply for scholarships?",
        "answer": "Applying for scholarships through Foorsa is straightforward. First, submit your application through our platform with all required documents (transcripts, passport, motivation letter, etc.). Our team reviews your profile and matches you with suitable scholarship opportunities. We help prepare your application materials and submit them to the appropriate authorities. We guide you through every step, from initial application to acceptance."
    }
]


def get_locale(lang: str) -> str:
    """Get proper locale string for OG tags"""
    locales = {
        "en": "en_US",
        "fr": "fr_FR",
        "ar": "ar_MA"
    }
    return locales.get(lang, "en_US")


def get_page_name(file_path: str) -> str:
    """Extract page name from file path"""
    name = Path(file_path).stem
    if name == "home":
        return "index"
    return name


def generate_hreflang_tags(page_name: str, lang: str) -> List[str]:
    """Generate hreflang tags for a page"""
    tags = []
    page_file = f"{page_name}.html" if page_name != "index" else "index.html"
    
    for l in ["en", "fr", "ar"]:
        tags.append(f'<link rel="alternate" hreflang="{l}" href="{BASE_URL}/{l}/{page_file}" />')
    
    tags.append(f'<link rel="alternate" hreflang="x-default" href="{BASE_URL}/en/{page_file}" />')
    return tags


def generate_canonical_tag(page_name: str, lang: str) -> str:
    """Generate canonical tag"""
    page_file = f"{page_name}.html" if page_name != "index" else "index.html"
    return f'<link rel="canonical" href="{BASE_URL}/{lang}/{page_file}" />'


def generate_og_tags(page_name: str, lang: str, meta: Dict) -> List[str]:
    """Generate Open Graph and Twitter Card tags"""
    page_file = f"{page_name}.html" if page_name != "index" else "index.html"
    locale = get_locale(lang)
    
    tags = [
        f'<meta property="og:title" content="{meta["title"]}" />',
        f'<meta property="og:description" content="{meta["description"]}" />',
        f'<meta property="og:url" content="{BASE_URL}/{lang}/{page_file}" />',
        '<meta property="og:type" content="website" />',
        f'<meta property="og:image" content="{BASE_URL}/assets/img/logo-bl.webp" />',
        '<meta property="og:site_name" content="Foorsa" />',
        f'<meta property="og:locale" content="{locale}" />',
        '<meta name="twitter:card" content="summary_large_image" />',
        f'<meta name="twitter:title" content="{meta["title"]}" />',
        f'<meta name="twitter:description" content="{meta["description"]}" />'
    ]
    return tags


def generate_organization_schema() -> str:
    """Generate Organization structured data"""
    schema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Foorsa",
        "url": BASE_URL,
        "logo": f"{BASE_URL}/assets/img/logo-bl.webp",
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
    return f'<script type="application/ld+json">\n{json.dumps(schema, indent=2, ensure_ascii=False)}\n</script>'


def generate_website_schema(lang: str) -> str:
    """Generate WebSite schema with SearchAction"""
    schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Foorsa",
        "url": f"{BASE_URL}/{lang}/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": f"{BASE_URL}/{lang}/search?q={{search_term_string}}",
            "query-input": "required name=search_term_string"
        }
    }
    return f'<script type="application/ld+json">\n{json.dumps(schema, indent=2, ensure_ascii=False)}\n</script>'


def generate_faq_schema() -> str:
    """Generate FAQPage structured data"""
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": faq["question"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq["answer"]
                }
            }
            for faq in FAQ_DATA
        ]
    }
    return f'<script type="application/ld+json">\n{json.dumps(schema, indent=2, ensure_ascii=False)}\n</script>'


def generate_breadcrumb_schema(page_name: str, lang: str, page_title: str) -> str:
    """Generate BreadcrumbList schema"""
    items = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": f"{BASE_URL}/{lang}/"
        }
    ]
    
    if page_name != "index":
        items.append({
            "@type": "ListItem",
            "position": 2,
            "name": page_title.split("|")[0].strip(),
            "item": f"{BASE_URL}/{lang}/{page_name}.html"
        })
    
    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items
    }
    return f'<script type="application/ld+json">\n{json.dumps(schema, indent=2, ensure_ascii=False)}\n</script>'


def generate_service_schema() -> str:
    """Generate Service schema for shop/apply page"""
    schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Educational Consulting",
        "provider": {
            "@type": "EducationalOrganization",
            "name": "Foorsa"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Morocco"
        },
        "description": "University admission assistance and scholarship consulting for Moroccan students wanting to study in China"
    }
    return f'<script type="application/ld+json">\n{json.dumps(schema, indent=2, ensure_ascii=False)}\n</script>'


def process_html_file(file_path: str, lang: str) -> bool:
    """Process a single HTML file to add SEO optimizations"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        head = soup.find('head')
        
        if not head:
            print(f"⚠️  No <head> found in {file_path}, skipping")
            return False
        
        page_name = get_page_name(file_path)
        
        # Get or use default meta
        if page_name in PAGE_META.get(lang, {}):
            meta = PAGE_META[lang][page_name]
        else:
            # Use existing title and description or defaults
            title_tag = soup.find('title')
            desc_tag = soup.find('meta', {'name': 'description'})
            meta = {
                "title": title_tag.string if title_tag else "Foorsa - Study in China",
                "description": desc_tag.get('content', '') if desc_tag else "Study in China with Foorsa",
                "keywords": "study in china, foorsa"
            }
        
        # Remove WordPress generator meta
        generator = head.find('meta', {'name': 'generator'})
        if generator:
            generator.decompose()
        
        # Update or add title
        title_tag = head.find('title')
        if title_tag:
            title_tag.string = meta['title']
        else:
            title_tag = soup.new_tag('title')
            title_tag.string = meta['title']
            head.append(title_tag)
        
        # Update or add description
        desc_tag = head.find('meta', {'name': 'description'})
        if desc_tag:
            desc_tag['content'] = meta['description']
        else:
            desc_tag = soup.new_tag('meta')
            desc_tag['name'] = 'description'
            desc_tag['content'] = meta['description']
            head.append(desc_tag)
        
        # Add or update keywords
        keywords_tag = head.find('meta', {'name': 'keywords'})
        if keywords_tag:
            keywords_tag['content'] = meta['keywords']
        else:
            keywords_tag = soup.new_tag('meta')
            keywords_tag['name'] = 'keywords'
            keywords_tag['content'] = meta['keywords']
            head.append(keywords_tag)
        
        # Update or add robots meta
        robots_tag = head.find('meta', {'name': 'robots'})
        if robots_tag:
            robots_tag['content'] = 'index, follow, max-image-preview:large'
        else:
            robots_tag = soup.new_tag('meta')
            robots_tag['name'] = 'robots'
            robots_tag['content'] = 'index, follow, max-image-preview:large'
            head.append(robots_tag)
        
        # Remove existing hreflang, canonical, og tags to avoid duplicates
        for tag in head.find_all('link', {'rel': 'alternate'}):
            tag.decompose()
        for tag in head.find_all('link', {'rel': 'canonical'}):
            tag.decompose()
        for tag in head.find_all('meta', {'property': lambda x: x and x.startswith('og:')}):
            tag.decompose()
        for tag in head.find_all('meta', {'name': lambda x: x and x.startswith('twitter:')}):
            tag.decompose()
        for tag in head.find_all('script', {'type': 'application/ld+json'}):
            tag.decompose()
        
        # Add hreflang tags
        for hreflang in generate_hreflang_tags(page_name, lang):
            soup_tag = BeautifulSoup(hreflang, 'html.parser')
            head.append(soup_tag)
        
        # Add canonical tag
        canonical = generate_canonical_tag(page_name, lang)
        soup_tag = BeautifulSoup(canonical, 'html.parser')
        head.append(soup_tag)
        
        # Add OG and Twitter tags
        for og_tag in generate_og_tags(page_name, lang, meta):
            soup_tag = BeautifulSoup(og_tag, 'html.parser')
            head.append(soup_tag)
        
        # Add structured data
        if page_name == "index":
            # Homepage: Organization + WebSite schema
            head.append(BeautifulSoup(generate_organization_schema(), 'html.parser'))
            head.append(BeautifulSoup(generate_website_schema(lang), 'html.parser'))
        elif page_name == "frequently-asked-questions":
            # FAQ page: FAQPage schema + breadcrumb
            head.append(BeautifulSoup(generate_faq_schema(), 'html.parser'))
            head.append(BeautifulSoup(generate_breadcrumb_schema(page_name, lang, meta['title']), 'html.parser'))
        elif page_name == "shop":
            # Shop page: Service schema + breadcrumb
            head.append(BeautifulSoup(generate_service_schema(), 'html.parser'))
            head.append(BeautifulSoup(generate_breadcrumb_schema(page_name, lang, meta['title']), 'html.parser'))
        else:
            # Other pages: Breadcrumb schema
            head.append(BeautifulSoup(generate_breadcrumb_schema(page_name, lang, meta['title']), 'html.parser'))
        
        # Fix H1 duplicates in root index.html
        if file_path.endswith('/index.html') and '/en/' not in file_path and '/fr/' not in file_path and '/ar/' not in file_path:
            h1_tags = soup.find_all('h1')
            if len(h1_tags) > 1:
                # Keep first H1, change others to H2
                for i, h1 in enumerate(h1_tags):
                    if i > 0:
                        h1.name = 'h2'
                print(f"✓ Fixed {len(h1_tags)-1} duplicate H1 tag(s) in {file_path}")
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        return True
    
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False


def process_all_html_files():
    """Process all HTML files in the project"""
    base_path = Path(__file__).parent
    
    processed = 0
    failed = 0
    
    # Process language-specific directories
    for lang in ["en", "fr", "ar"]:
        lang_dir = base_path / lang
        if not lang_dir.exists():
            continue
        
        print(f"\n📁 Processing {lang.upper()} directory...")
        
        for html_file in lang_dir.glob("*.html"):
            if html_file.name.startswith('.'):
                continue
            
            print(f"  Processing: {html_file.name}...", end=" ")
            if process_html_file(str(html_file), lang):
                print("✓")
                processed += 1
            else:
                print("❌")
                failed += 1
    
    # Process root index.html
    root_index = base_path / "index.html"
    if root_index.exists():
        print(f"\n📄 Processing root index.html...", end=" ")
        # Treat root as English for now
        if process_html_file(str(root_index), "en"):
            print("✓")
            processed += 1
        else:
            print("❌")
            failed += 1
    
    print(f"\n✅ Processed: {processed} files")
    if failed > 0:
        print(f"⚠️  Failed: {failed} files")


def update_vercel_json():
    """Update vercel.json with redirects for duplicate content"""
    vercel_path = Path(__file__).parent / "vercel.json"
    
    try:
        with open(vercel_path, 'r') as f:
            config = json.load(f)
        
        # Add redirects if not exists
        if "redirects" not in config:
            config["redirects"] = []
        
        redirects_to_add = [
            {
                "source": "/universities-in-china/en/:path*",
                "destination": "/en/:path*",
                "statusCode": 301
            },
            {
                "source": "/universities-in-china/ar/:path*",
                "destination": "/ar/:path*",
                "statusCode": 301
            },
            {
                "source": "/scholarships/en/:path*",
                "destination": "/en/:path*",
                "statusCode": 301
            },
            {
                "source": "/scholarships/ar/:path*",
                "destination": "/ar/:path*",
                "statusCode": 301
            }
        ]
        
        # Check if redirects already exist
        existing = {r.get('source') for r in config.get('redirects', [])}
        new_redirects = [r for r in redirects_to_add if r['source'] not in existing]
        
        if new_redirects:
            config["redirects"].extend(new_redirects)
            
            with open(vercel_path, 'w') as f:
                json.dump(config, f, indent=2)
            
            print(f"\n✅ Added {len(new_redirects)} redirects to vercel.json")
        else:
            print("\n✓ Redirects already exist in vercel.json")
        
        return True
    
    except Exception as e:
        print(f"\n❌ Error updating vercel.json: {e}")
        return False


def generate_sitemap():
    """Generate comprehensive sitemap.xml"""
    sitemap_path = Path(__file__).parent / "sitemap.xml"
    
    pages = [
        ("index", 1.0, "weekly"),
        ("shop", 0.9, "weekly"),
        ("scholarship", 0.9, "weekly"),
        ("majors", 0.8, "weekly"),
        ("fees", 0.8, "weekly"),
        ("about-us", 0.7, "monthly"),
        ("step-by-step", 0.7, "monthly"),
        ("documents", 0.7, "monthly"),
        ("frequently-asked-questions", 0.7, "weekly"),
        ("blog", 0.6, "weekly"),
        ("contact", 0.6, "monthly"),
        ("mission-values", 0.6, "monthly"),
        ("engagement", 0.5, "monthly"),
        ("recruitment", 0.5, "monthly"),
        ("partner-with-us", 0.5, "monthly"),
    ]
    
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    ]
    
    # Add root
    xml_lines.append('  <url>')
    xml_lines.append(f'    <loc>{BASE_URL}/</loc>')
    xml_lines.append('    <lastmod>2026-02-22</lastmod>')
    xml_lines.append('    <changefreq>weekly</changefreq>')
    xml_lines.append('    <priority>1.0</priority>')
    xml_lines.append('  </url>')
    
    # Add all language versions of pages
    for page, priority, changefreq in pages:
        page_file = f"{page}.html"
        
        for lang in ["en", "fr", "ar"]:
            xml_lines.append('  <url>')
            xml_lines.append(f'    <loc>{BASE_URL}/{lang}/{page_file}</loc>')
            xml_lines.append('    <lastmod>2026-02-22</lastmod>')
            xml_lines.append(f'    <changefreq>{changefreq}</changefreq>')
            xml_lines.append(f'    <priority>{priority}</priority>')
            
            # Add hreflang references
            for alt_lang in ["en", "fr", "ar"]:
                xml_lines.append(f'    <xhtml:link rel="alternate" hreflang="{alt_lang}" href="{BASE_URL}/{alt_lang}/{page_file}" />')
            xml_lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{BASE_URL}/en/{page_file}" />')
            
            xml_lines.append('  </url>')
    
    xml_lines.append('</urlset>')
    
    try:
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(xml_lines))
        
        print("\n✅ Generated comprehensive sitemap.xml")
        return True
    
    except Exception as e:
        print(f"\n❌ Error generating sitemap: {e}")
        return False


if __name__ == "__main__":
    print("🚀 Foorsa SEO Optimizer")
    print("=" * 60)
    
    # Process HTML files
    print("\n📝 Step 1: Processing HTML files...")
    process_all_html_files()
    
    # Update vercel.json
    print("\n🔀 Step 2: Updating vercel.json...")
    update_vercel_json()
    
    # Generate sitemap
    print("\n🗺️  Step 3: Generating sitemap...")
    generate_sitemap()
    
    print("\n" + "=" * 60)
    print("✨ SEO optimization complete!")
    print("\nNext steps:")
    print("1. Review a few HTML files to ensure changes are correct")
    print("2. Git commit all changes")
    print("3. Deploy with: npx vercel --prod --token YOUR_TOKEN --yes")
