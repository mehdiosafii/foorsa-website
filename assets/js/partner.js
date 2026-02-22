var $ = jQuery.noConflict();

jQuery(document).ready(function ($) {

    $("#other_position").hide();
    $("#other_intersted").hide();
    $("#change_position").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue === "{Other}") {
            $("#other_position").show();
        } else {
            $("#other_position").hide();
        }
    });
    $("#change_intersted").change(function () {
        var selectedValue = $(this).val();
        if (selectedValue === "{Other}") {
            $("#other_intersted").show();
        } else {
            $("#other_intersted").hide();
        }
    });
});
