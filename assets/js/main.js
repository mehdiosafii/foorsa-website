var $ = jQuery.noConflict();

 


jQuery(document).ready(function ($) {

    // Hero overlay click to dismiss
    $('#heroOverlay').on('click', function() {
        $(this).addClass('hidden');
    });

    // TODO: Prevent automatic page location restoration
    if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
    }

    // TODO: Program text to disappear after 3 seconds
    setTimeout(function () {
        $('.textEnter').fadeIn('slow');
    }, 3000);


    //TODO: change colors card categories
    colors = ["#7C828E", "#656C7C", "#4D5667", "#343F51"]

    var cards = $('.swiperCategory .swiper-slide .card');

    cards.each(function (index) {
        var colorIndex = index % colors.length;
        $(this).find('.cardNumber, .cardTitle, .cardContent').css('color', colors[colorIndex]);
        $(this).find('button').css('background-color', colors[colorIndex]);
    });


    // TODO: Swiper section media
    // $('#sectionHero').addClass('no-scroll')
    // $('body.home-page').addClass('scroll')
    const swiper = new Swiper('.mediaSlider', {
        direction: "horizontal",
        loop: true,

        breakpoints: {
            320: {
                slidesPerView: 3,
            },
            640: {
                slidesPerView: 4.5,
            },
            1024: {
                slidesPerView: 5,
            },
            1440: {
                slidesPerView: 5,
            },
            1900: {
                slidesPerView: 5,
            },
        },


        freeMode: true,
        autoplay: {
            delay: 1,
            disableOnInteraction: true
        },
        speed: 5000,
        freeModeMomentum: false,
        
    });

    // Show all hero content immediately (no click-to-enter)
    $('.titles .title .text h2').show();
    $('.cloud').show();
    $('.home-page .pathBg').show();
    $('.secondContent').show();
    $('.checkout').show();

    // $('.checkout').hide();

    const swiperCat = new Swiper('.swiperCategory', {
        direction: "horizontal",
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1.5, spaceBetween: 16 },
            640: { slidesPerView: 1.5, spaceBetween: 16 },
            1024: { slidesPerView: 4.5, spaceBetween: 15 },
            1440: { slidesPerView: 4.5, spaceBetween: 15 },
            1900: { slidesPerView: 5, spaceBetween: 18 },
        },
    });

    // Reorder slides by `data-order`
    document.querySelectorAll('.swiper-slide').forEach((slide) => {
        const originalOrder = slide.getAttribute('data-original-order');
        slide.style.order = originalOrder; 
    });


    const swiperEtudiant = new Swiper('.swiperEtudiant', {
        direction: "horizontal",
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 8,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 25,
            },
            1440: {
                slidesPerView: 4,
                spaceBetween: 58,
            },
            1600: {
                slidesPerView: 4.5,
                spaceBetween: 58,
            },
            1900: {
                slidesPerView: 5,
                spaceBetween: 50,
            },
        },
    });

    //TODO: video player 
    $('.buttonPlay').click(function () {
        var videoSrc = $(this).data('video-src');
        var featuredImg = $(this).data('featured-img');

        // Add the YouTube video URL to the iframe
        $('#videoPlayer').attr('src', videoSrc);

        // Update the background image
        $('.bg-video').css('background', 'url(' + featuredImg + ') lightgray 50% / cover no-repeat');
        $('.bg-video').show();
    });

    $('#playVideo').on('hidden.bs.modal', function (e) {
        // Pause the video in the iframe
        $('#videoPlayer').attr('src', '');
    });

    $('.bt-play').click(function () {
        $('.bg-video').hide();
    });
})

// TODO: Flashlight effect on mousemove
function updates(e) {
    var x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    var y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    document.documentElement.style.setProperty('--cursorX', x + 'px')
    document.documentElement.style.setProperty('--cursorY', y + 'px')
}

document.addEventListener('mousemove', updates)


jQuery(document).on('click', '#sectionHero.no-scroll', function (e) {
    e.preventDefault();

    var visitCount = localStorage.getItem('visitCount');


    var x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    var y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    var maxDistance = Math.max(
        x,
        document.documentElement.clientWidth - x,
        y,
        document.documentElement.clientHeight - y
    );

    var finalRadius = maxDistance * 2;

    document.documentElement.style.setProperty('--cursorX', x + 'px');
    document.documentElement.style.setProperty('--cursorY', y + 'px');
    //    document.documentElement.style.setProperty('--backgroundSize', '15vmax');

    var numSteps = 70;

    var stepSize = (finalRadius - 15) / numSteps;

    var currentSize = 15;
    var timer = setInterval(function () {
        currentSize += stepSize;
        document.documentElement.style.setProperty('--backgroundSize', currentSize + 'vmax');
        if (currentSize >= finalRadius) {
            clearInterval(timer);
        }
    }, 80);

    setTimeout(function () {
        $(this).removeClass('no-scroll');
        $('body.home-page').removeClass('scroll');

        // $('.img-building').addClass('slideFromBottom');
        $('.checkout').show();

        setTimeout(function () {
            $('.cloud').addClass('slideFromBottomCloud').show();
        }, 400);

        setTimeout(function () {
            $('.titles .title .text h2').addClass('slideFromBottomText').show();
            $('.scrollToBottom').addClass('slideFromBottom').show();
            $('.home-page .pathBg').addClass('slideFromBottom').show();
            $('.secondContent').addClass('slideFromBottom').show();
            // Reinitialize scroll animation after pathBg is visible
            if (typeof window.reinitializeScrollAnimation === 'function') {
                setTimeout(function() {
                    window.reinitializeScrollAnimation();
                }, 100);
            }
        }, 700);
    }.bind(this), 500); // Using bind(this) to maintain the correct context inside setTimeout
    
});



jQuery(document).ready(function ($) {

    var faqImages = {
        97: '/assets/img/faq-studying.png',
        98: '/assets/img/faq-finance.png',
        447: '/assets/img/faq-scholarships.png',
        101: '/assets/img/faq-culture.png'
    };
    
    var faqCategories = {
        97: 'studying',
        98: 'finance',
        447: 'scholarships',
        101: 'culture'
    };

    function loadQuestion(question_id) {
        if (typeof faqData === 'undefined' || !faqData[question_id]) {
            console.warn('FAQ data not found for question ID:', question_id);
            return;
        }
        
        var faq = faqData[question_id];
        var categoryImage = faqImages[question_id] || '/assets/img/faq-placeholder.jpg';
        var categoryName = faqCategories[question_id] || 'studying';
        
        // Set category data attribute for gradient colors
        $('.subCategory').attr('data-category', categoryName);
        
        $(".detailQuestion .number").text(faq.number);
        $(".detailQuestion .questionTitle").text(faq.title);
        $(".detailQuestion .questionDetail").text('');

        var answersHtml = '';
        $.each(faq.responses, function (index, answer) {
            answersHtml += `
                <div class="swiper-slide">
                    <div class="cardSubCat-wrap">
                        <div class="cardSubCat">
                            <img src="${categoryImage}" alt="${answer.titre}">
                            <div class="badge">${answer.numero}</div>
                            <div class="front">
                                <div class="globalcontent">
                                    <div class="numberFront">${answer.numero}</div>
                                    <div class="titleFront">${answer.titre}</div>
                                </div>
                            </div>
                            <div class="back">
                                <div>
                                    <div class="titleBack">${answer.titre}</div>
                                    <div class="contentBack">${answer.contenu}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        $('.swiperSubCategory .swiper-wrapper').html(answersHtml);

        if (window.swiperSubCategoryInstance) {
            window.swiperSubCategoryInstance.destroy(true, true);
        }
        
        window.swiperSubCategoryInstance = new Swiper('.swiperSubCategory', {
            direction: "horizontal",
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: { slidesPerView: 1.5, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 2.5, spaceBetween: 25 },
                1440: { slidesPerView: 2.5, spaceBetween: 25 },
                1600: { slidesPerView: 2.5, spaceBetween: 25 },
                1900: { slidesPerView: 3.5, spaceBetween: 25 },
            },
        });
    }

    const firstQuestion = $('.link').first();
    if (firstQuestion.length) {
        firstQuestion.addClass('active');
        var firstQuestionId = firstQuestion.data('question-id');
        if (firstQuestionId && typeof faqData !== 'undefined') {
            loadQuestion(firstQuestionId);
        } else {
            window.swiperSubCategoryInstance = new Swiper('.swiperSubCategory', {
                direction: "horizontal",
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    320: { slidesPerView: 1.5, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 2.5, spaceBetween: 25 },
                    1440: { slidesPerView: 2.5, spaceBetween: 25 },
                    1600: { slidesPerView: 2.5, spaceBetween: 25 },
                    1900: { slidesPerView: 3.5, spaceBetween: 25 },
                },
            });
        }
    }

    $(document).on('click', '.link', function () {
        const question_id = $(this).data('question-id');
        loadQuestion(question_id);
        $('.link').removeClass('active');
        $(this).addClass('active');
    });

    // Animate subCategory
    $('.subCategory').removeClass('hidden').addClass('visible');
    var bgIcons = document.querySelector(".section#sectionEducation .subCategory .bgIconPad");
    if (bgIcons) {
        gsap.from(".section#sectionEducation .subCategory .bgIconPad, .section#sectionEducation .subCategory .bgIconCalculator", {
            opacity: 0, x: -200, duration: 1, ease: "back.out(1)",
        });
        gsap.from(".section#sectionEducation .subCategory .bgIconPen", {
            opacity: 0, x: 200, duration: 1, ease: "back.out(1)",
        });
        gsap.from(".section#sectionEducation .subCategory .detailQuestion", {
            opacity: 0, y: -200, duration: 1, ease: "back.out(1)",
        });
        gsap.from(".section#sectionEducation .subCategory .swiper-slide", {
            opacity: 0, y: 200, duration: 1, ease: "back.out(1)", stagger: 0.2,
        });
    }


});



// TODO: Animate Category 
function animateSectionEducation() {
    var blockHeader = document.querySelector(".section#sectionEducation .categories .blockHeader");
    if (blockHeader) {
        gsap.from(blockHeader, {
            opacity: 0,
            y: 200,
            duration: 1.5,
            ease: "back.out(2.5)",
        });
    }
    var blockSlider = document.querySelector(".section#sectionEducation .blockSliderSubCat");
    if (blockSlider) {
        gsap.from(blockSlider, {
            opacity: 0,
            y: 200,
            duration: 1.5,
            ease: "back.out(3)",
        });
    }
}


function animateSectionUniversity() {
    var blockHeader = document.querySelector(".section#sectionUniversities .blockHeader");
    if (blockHeader) {
        gsap.from(blockHeader, {
            opacity: 0,
            y: 200,
            duration: 1.5,
            ease: "back.out(2.5)",
        });
    }
    $('.universities').addClass('animateLogos');
}

function animateSectionJoinUs() {
    var blockHeader = document.querySelector(".section#sectionJoinUs .blockHeader");
    if (blockHeader) {
        gsap.from(blockHeader, {
            opacity: 0,
            y: 200,
            duration: 1.5,
            ease: "back.out(2.5)",
        });
    }

    var signup = document.querySelector('.signup');
    if (signup) {
        var increment = 0;
        var interval = setInterval(function () {
            $('.signup').text(increment + '%');
            increment++;
            if (increment > 100) {
                clearInterval(interval);
            }
            $('.signup').addClass('moved');
        }, 10);
    }

    var cartoonBtn = document.querySelector("section#sectionJoinUs .cartoon-btn");
    if (cartoonBtn) {
        gsap.set(cartoonBtn, { opacity: 0, y: 200 });
        setTimeout(function () {
            gsap.to(cartoonBtn, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "back.out(2.5)",
            });
        }, 2000);
    }
}

// TODO: Animate section Etudiant 
function animateSectionEtudiant() {
    var blockHeader = document.querySelector(".section#sectionEtudiant .blockHeader");
    if (blockHeader) {
        gsap.from(blockHeader, {
            opacity: 0,
            y: 200,
            duration: 1.5,
            ease: "back.out(2.5)",
        });
    }
    var blockSlider = document.querySelector(".section#sectionEtudiant .blockSlider");
    if (blockSlider) {
        gsap.from(blockSlider, {
            opacity: 0,
            y: 200,
            duration: 1.5,
            ease: "back.out(3)",
        });
    }
}


// TODO: Animate section Footer 
function animateSectionFooter() {
    // gsap.from(".section#sectionFooter  .footer", {
    //     opacity: 0,
    //     y: 200,
    //     duration: 1.5,
    //     ease: "back.out(0.5)",
    // });

    // gsap.fromTo(
    //     ".section#sectionFooter  .footer",
    //     {
    //         y: -100,
    //     },
    //     {
    //         y: 0,
    //         duration: 1.5,
    //         ease: "back.out(1)",
    //     });
}

// Créer un objet pour suivre l'état de chaque section
const sectionState = {
    sectionEducation: false,
    sectionUniversities: false,
    sectionJoinUs: false,
    sectionEtudiant: false,
    sectionFooter: false
};

// Fonction pour réinitialiser les animations d'une section
function resetSectionAnimation(sectionId) {
    if ($('.signup').hasClass('moved')) {
        $('.signup').removeClass('moved');
    }
    switch (sectionId) {
        case "sectionEducation":
            animateSectionEducation();
            break;
        case "sectionUniversities":
            animateSectionUniversity();
            break;
        case "sectionJoinUs":
            animateSectionJoinUs();
            break;
        case "sectionEtudiant":
            animateSectionEtudiant();
            break;
        case "sectionFooter":
            animateSectionFooter();
            break;
        default:
            break;
    }
}

// Déclencheur pour chaque section
for (const sectionId in sectionState) {
    if (sectionState.hasOwnProperty(sectionId)) {
        ScrollTrigger.create({
            trigger: `.section#${sectionId}`,
            start: "top 70%",
            onEnter: () => {
                sectionState[sectionId] = false;
                if (!sectionState[sectionId]) {
                    resetSectionAnimation(sectionId);
                    sectionState[sectionId] = true;
                }

            },
            onEnterBack: () => {
                sectionState[sectionId] = false;
                if (!sectionState[sectionId]) {
                    resetSectionAnimation(sectionId);
                    sectionState[sectionId] = true;
                }

            },

        });
    }
}



// TODO: Animation circle and path

// Only run scroll animation on homepage
if (!document.body.classList.contains('home-page')) {
    console.log('Scroll animation skipped - not on homepage');
} else {

// Helper function to create a tween for each SVG
function createTween(svg) {
    const motionPath = svg.querySelector(".motionPath");
    const iconRotate = svg.querySelector(".iconRotate");
    
    if (!motionPath || !iconRotate) {
        return null;
    }
    
    const offsetFromTop = window.innerHeight * 0.35;
    const pathBB = motionPath.getBoundingClientRect();
    const finishDistance = pathBB.height - offsetFromTop;

    return {
        tween: gsap.to(iconRotate, {
            duration: 5,
            paused: true,
            ease: "none",
            motionPath: {
                path: motionPath,
                align: motionPath,
                autoRotate: true,
                alignOrigin: [0.5, 0.5]
            }
        }).pause(0.001),
        finishDistance
    };
}

// Tween array for scroll animation
let tweens = [];

// Function to initialize tweens (called after pathBg is visible)
function initializeTweens() {
    // Re-query the DOM each time to get visible elements
    const pathBgs = document.querySelectorAll('.pathBg');
    tweens = [];
    pathBgs.forEach(pathBg => {
        // Check if element is visible (has dimensions)
        const rect = pathBg.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
            return; // Skip hidden elements
        }
        // Find the SVG inside pathBg
        const svg = pathBg.querySelector('svg');
        if (!svg) {
            return; // No SVG found
        }
        const tween = createTween(svg);
        if (tween && tween.finishDistance > 0) {
            tweens.push(tween);
            console.log('Created tween with finishDistance:', tween.finishDistance);
        }
    });
    console.log('Scroll animation initialized with', tweens.length, 'tweens');
}

// Create tweens for each SVG (initial attempt)
initializeTweens();

// Re-initialize tweens when pathBg becomes visible (expose globally)
window.reinitializeScrollAnimation = initializeTweens;

let requestId = null;
let lastScrollY = window.scrollY;
let scrollDirection = 'down';

function update() {
    const scrollY = window.scrollY;

    // Detect scroll direction
    if (scrollY > lastScrollY) {
        scrollDirection = 'down';
    } else if (scrollY < lastScrollY) {
        scrollDirection = 'up';
    }
    lastScrollY = scrollY;

    // Update arrow flip based on scroll direction
    const iconRotate = document.querySelectorAll('.iconRotate');
    iconRotate.forEach(icon => {
        if (scrollDirection === 'up') {
            icon.classList.add('scrolling-up');
        } else {
            icon.classList.remove('scrolling-up');
        }
    });

    // Update each tween based on scroll position
    tweens.forEach(({ tween, finishDistance }) => {
        tween.progress(scrollY / finishDistance);
    });

    // Let the scroll event fire again
    requestId = null;
}

// Listen to the scroll event
document.addEventListener("scroll", function () {
    // Prevent the update from happening too often (throttle the scroll event)
    if (!requestId) {
        requestId = requestAnimationFrame(update);
    }
});

// Initial update
update();

// Hide pathBg when footer comes into view to prevent SVG overflow
(function() {
    const footer = document.getElementById('sectionFooter');
    const pathBg = document.querySelector('.pathBg');
    
    if (footer && pathBg) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    pathBg.style.opacity = '0';
                    pathBg.style.transition = 'opacity 0.3s ease';
                } else {
                    pathBg.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(footer);
    }
})();

} // End of homepage-only scroll animation code



$(document).ready(function(){
    // Initialize Reviews Swiper with autoplay
    if (document.querySelector('.swiperReviews')) {
        new Swiper('.swiperReviews', {
            direction: "horizontal",
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            },
        });
    }

    const sectionHero = document.getElementById('sectionHero');

    if (sectionHero) {
        // Always show content immediately, no click-to-enter
        sectionHero.classList.remove('no-scroll');
        $('body').removeClass('scroll');
        $('.checkout').show();
        $('.cloud').addClass('slideFromBottomCloud').show();
        $('.titles .title .text h2').addClass('slideFromBottomText').show();
        $('.scrollToBottom').addClass('slideFromBottom').show();
        $('.home-page .pathBg').addClass('slideFromBottom').show();
        $('.secondContent').addClass('slideFromBottom').show();
        if (typeof window.reinitializeScrollAnimation === 'function') {
            setTimeout(function() { window.reinitializeScrollAnimation(); }, 100);
        }
    }
})