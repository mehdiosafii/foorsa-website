jQuery(document).ready(function($) {
    var radius = 350; // ajustez pour déplacer les éléments à l'intérieur et à l'extérieur
    var fields = $('.item'),
        container = $('#circleObj'),
        width = container.width() + 2,
        height = container.height() + 2;

    // Fonction pour positionner les éléments initialement

    function positionInitialElements() {
        fields.each(function (index) {
            switch (index) {
                case 0:
                    var x = width / 2 - $(this).width() / 2;
                    var y = height / 2 - radius;
                    break;
                case 1:
                    var x = width / 2 + radius - $(this).width() / 2;
                    var y = height * 0.2 - $(this).height() / 2;
                    break;
                case 2:
                    var x = width / 2 + radius - $(this).width() / 2;
                    var y = height * 0.8 - $(this).height() / 2;
                    break;
                case 3:
                    var x = width / 2 - radius - $(this).width() / 2;
                    var y = height * 0.8 - $(this).height() / 2;
                    break;
                case 4:
                    var x = width / 2 - radius - $(this).width() / 2;
                    var y = height * 0.2 - $(this).height() / 2;
                    break;
                default:
                    // if there are more than 5 elements, position them randomly
                    var x = Math.random() * (width - $(this).width());
                    var y = Math.random() * (height - $(this).height());
            }

            $(this).css({
                left: x + 'px',
                top: y + 'px'
            });
        });
    }

    positionInitialElements();

    // Fonction pour redémarrer l'animation
    function restartAnimation() {
        fields.each(function (index) {
            var nextIndex = (index + 1) % fields.length;
            var nextElement = fields.eq(nextIndex);
            var x = nextElement.position().left;
            var y = nextElement.position().top;

            $(this).animate({
                left: x + 'px',
                top: y + 'px'
            }, 1000);
        });
    }


    
    // Redémarrer l'animation à intervalles réguliers
    setInterval(restartAnimation, 5000);

});