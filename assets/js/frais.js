jQuery(document).ready(function($) {

    const swiperFrais = new Swiper('.swiperFrais', {
        direction: "horizontal",
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 1.5,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1440: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
            1900: {
                slidesPerView: 5,
                spaceBetween: 16,
            },
        },

    });
});