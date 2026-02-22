jQuery(document).ready(function($) {
    $('#copy-button').tooltip('hide');

    $('#copy-button').on('click', async function() {
        var token = $('#payment-token').text();

        try {
            await navigator.clipboard.writeText(token);
            $(this).attr('data-bs-original-title', 'Copied').tooltip('show');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }

        setTimeout(() => {
            $(this).attr('data-bs-original-title', '').tooltip('hide');
        }, 2000);
    });
});

