
    jQuery(document).ready(function($) {
        const firstForm = $('.first-card form');
        const secondCard = $('.second-card');
        const secondForm = $('.second-card form');
        let selectedRating = '';

        firstForm.on('submit', function (e) {
            e.preventDefault();
            selectedRating = $('input[name="rating"]:checked').val();

            if (selectedRating == '5') {
                window.open('https://search.google.com/local/writereview?placeid=ChIJidaH7OBtpw0ReTyqFV-QCSY', '_blank');
            } else if (selectedRating) {
                $('.first-card').hide();
                secondCard.show();
            } else {
                alert('Please select a rating.');
            }
        });

        secondForm.on('submit', function (e) {
            e.preventDefault();
            
            const email = $('#email').val();
            const plainte = $('#plainte').val();
            
            $.ajax({
                url: ajax_object.ajax_url,
                type: 'POST',
                data: {
                    action: 'submit_plainte',
                    email: email,
                    plainte: plainte,
                    rating: selectedRating
                },
                success: function (response) {
                    if (response.success) {
                        secondCard.append(`<small class="success-message">${response.data.message}</small>`)
                    } else {
                        secondCard.append(`<small class="error-message">${response.data.message}</small>`)
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        });
    });
