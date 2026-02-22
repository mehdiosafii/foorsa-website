jQuery(document).ready(function ($) {
    var input = document.querySelector("#phone");
    var utilsPath = (typeof foorsa_contact !== 'undefined' && foorsa_contact.utils_script) 
        ? foorsa_contact.utils_script 
        : '/wp-content/themes/foorsa/assets/libs/utils.js';
    var iti = window.intlTelInput(input, {
        utilsScript: utilsPath,
        initialCountry: "MA",
        separateDialCode: false,
    });

    function validateForm(form) {
        var check = true;
        $(form).find('.error-message').remove();

        $(form).find('input, textarea').each(function () {
            var fieldName = $(this).attr('name');
            var fieldValue = $(this).val();
            var errorSpecialChar = $(this).data('error-special-char');
            var errorRequired = $(this).data('error-required');
            // Exclure le champ de code promo de la validation
            if ($(this).attr('id') === 'promo') {
                return true; 
            }

            // Vérifier et gérer le champ avec l'ID 'name'
            if ($(this).attr('id') === 'name') {
                if (/[^a-zA-Z0-9\s]/.test(fieldValue)) {
                    $(this).closest('.form-input').append('<small class="error-message">' + errorSpecialChar + '</small>');
                    check = false;
                }
            }
        
            // Vérifier si le champ est vide
            if ($.trim(fieldValue) === '') {
                $(this).closest('.form-input').append('<small class="error-message">' + errorRequired +'</small>');
                check = false;
            }
        });

        if ($('#phone').length && !iti.isValidNumber()) {
            var errorInvalid = $('#phone').data('error-invalid');
            $('#phone').closest('.form-input').append('<small class="error-message">' + errorInvalid + '</small>');
            check = false;
        }

        return check;
    }

    // $('#contactForm, #paymentForm').submit(function(event) {
    //     event.preventDefault();

    //     if (validateForm(this) ) {
    //         $(this).submit();
    //     }
    // });

    $(document).ready(function() {
        $('.btnPromo').on('click', function() {
            var promoCode = $('#promo').val();
    
            $('.error-message, .success-message').remove();
    
            $.post(
                ajax_object.ajax_url,
                {
                    action: 'validate_promo_code',
                    promo: promoCode
                },
                function(response) {
                    if (response.success) {
                        $('#promo').closest('.form-input div').append('<small class="success-message">' + response.data.amount + '</small>');
                        $('input[name="amount"]').val(response.data.amount_after_discount);
                    } else {
                        $('#promo').closest('.form-input div').append('<small class="error-message">' + response.data.message + '</small>');
                    }
                }
            );
        });
    });
    
    $('#paymentForm').submit(function (event) {
        // event.preventDefault();
        if (validateForm(this) == true) {
            var name = $('#name').val();
            var email = $('#email').val();
            var phone = $('#phone').val();
            var bac =$("input[name='bac']:checked").val();

            $.post(
                ajax_object.ajax_url, // URL du script PHP dans WordPress
                {
                    action: 'send_payment_email',
                    name: name,
                    email: email,
                    phone: phone,
                    bac:bac
                },
                function (response) {
                    console.log('Réponse du serveur:', response);
                }
            );

            var selectedPayment = $("input[name='payment-with']:checked").val();

           
            if (selectedPayment === "cmi") {
                
                window.location.href = "/checkout";
                return false; 
                // $(this).attr("action", "/SendData.php");
                // $('input[name="BillToName"]').val(name);
                // $('input[name="email"]').val(email);
                // $('input[name="tel"]').val(phone);
               
            } 

            return true;
        }
        return false
    });

});