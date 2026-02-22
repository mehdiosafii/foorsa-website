var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {

      $("#other_education").hide();
      $("#select_education").change(function () {
            var selectedValue = $(this).val();
            if (selectedValue === "{Others}") {
                $("#other_education").show();
            } else {
                $("#other_education").hide();
            }
        });
});

