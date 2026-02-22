jQuery(document).ready(function($) {
    $('#menuToggle input').change(function() {
        if(this.checked) {
            $("body").addClass("overlayMenu"); 
        }else{
            $("body").removeClass("overlayMenu");    
        }
    });
    
    // Typewriter Effect for Hero Headlines
    function initTypewriter() {
        const heroHeadline = document.querySelector('.hero-mobile-headline h1');
        if (!heroHeadline) return;
        
        // Get the original HTML content
        const originalHTML = heroHeadline.innerHTML;
        
        // Extract text parts (before and after <br>)
        const parts = originalHTML.split('<br>');
        const line1 = parts[0].replace(/<[^>]*>/g, '').trim();
        const line2Text = parts[1] ? parts[1].replace(/<[^>]*>/g, '').trim() : '';
        
        // Clear the headline, add active class to show it, and set bolder styling
        heroHeadline.innerHTML = '<span class="typewriter-line1"></span><br><span class="typewriter-line2"></span><span class="typewriter-cursor">|</span>';
        heroHeadline.classList.add('typewriter-active');
        
        const line1El = heroHeadline.querySelector('.typewriter-line1');
        const line2El = heroHeadline.querySelector('.typewriter-line2');
        const cursorEl = heroHeadline.querySelector('.typewriter-cursor');
        
        let charIndex = 0;
        let currentLine = 1;
        const speed = 80;
        
        function type() {
            if (currentLine === 1) {
                if (charIndex < line1.length) {
                    line1El.textContent += line1.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, speed);
                } else {
                    charIndex = 0;
                    currentLine = 2;
                    setTimeout(type, 300);
                }
            } else if (currentLine === 2) {
                if (charIndex < line2Text.length) {
                    line2El.textContent += line2Text.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, speed);
                } else {
                    // Typing complete - blink cursor then hide
                    setTimeout(() => {
                        cursorEl.style.display = 'none';
                    }, 2000);
                }
            }
        }
        
        // Start typing immediately
        type();
    }
    
    // Initialize typewriter immediately on page load
    initTypewriter();
    
    // Typewriter Effect for Titles Section (unlock your potential / study in china)
    function initTitlesTypewriter() {
        const titlesSection = document.querySelector('.titles');
        if (!titlesSection) return;
        
        const frontTexts = titlesSection.querySelectorAll('.front-text');
        if (frontTexts.length === 0) return;
        
        // Store original texts and clear them
        const originalTexts = [];
        frontTexts.forEach((el, index) => {
            originalTexts[index] = el.textContent.trim();
            el.textContent = '';
            el.style.visibility = 'visible';
            el.style.fontWeight = '800';
        });
        
        let currentElement = 0;
        let charIndex = 0;
        const speed = 60;
        
        function typeTitle() {
            if (currentElement >= frontTexts.length) return;
            
            const text = originalTexts[currentElement];
            const el = frontTexts[currentElement];
            
            if (charIndex < text.length) {
                el.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeTitle, speed);
            } else {
                // Move to next element
                charIndex = 0;
                currentElement++;
                if (currentElement < frontTexts.length) {
                    setTimeout(typeTitle, 300);
                }
            }
        }
        
        // Start typing when titles section becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeTitle, 200);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(titlesSection);
    }
    
    // Initialize titles typewriter
    initTitlesTypewriter();
    
    // WhatsApp Sticky Button - Auto inject on all pages
    const whatsappHTML = `
        <div class="whatsapp-sticky">
            <span class="whatsapp-tooltip">Chat with us!</span>
            <a href="https://wa.me/212537911271" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
            </a>
        </div>
    `;
    $('body').append(whatsappHTML);
});
