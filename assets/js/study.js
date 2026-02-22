jQuery(document).ready(function($) {

    const swiperCat = new Swiper('.swiperStudy', {
        direction: "horizontal",
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 4.5,
                spaceBetween: 24,
            },
            1900: {
                slidesPerView: 5.5,
                spaceBetween: 24,
            },
        },

    });


    //TODO: video player 
   
    $('.bt-play').click(function() {
        $(this).closest('.bg-video').hide();
    
        $('video').each(function() {
            this.pause();
        });
    
        var videoPlayer = $(this).closest('.blockVideo').find('#videoPlayer');
        var videoSrc = $(this).closest('.blockVideo').data('video-src');
    
        videoPlayer.attr('src', videoSrc);
        videoPlayer.load();
        videoPlayer.get(0).play(); 
        videoPlayer.prop('controls', true); 
    });
    
    $('.blockVideo').each(function() {
        var featuredImg = $(this).data('featured-img');
        $(this).find('.bg-video').css('background', 'url(' + featuredImg + ') 50% / cover no-repeat');
    });

});