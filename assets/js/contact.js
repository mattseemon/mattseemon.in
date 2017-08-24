'use strict';

jQuery(document).ready(function($) {

    $('#contactForm').on('submit', function(e) {
        var $form = $(this);
        var $submitButton = $form.find('button');
        e.preventDefault();

        $form.ajaxSubmit({
            url: '//formspree.io/' + 'contact' + '@' + 'mattseemon' + '.' + 'in',
            type: 'post',
            dataType: 'json',
            beforeSubmit: function() {
                $submitButton.attr('disabled', 'disabled');
                $submitButton.find('i').removeClass().addClass('fa fa-circle-o-notch fa-spin');
            },
            success: function(response, status, xhr, form) {
                showMessage('Thank you for writing. I will be in touch with you shortly.', 'success');
                form[0].reset();
                $submitButton.removeAttr('disabled');
                $submitButton.find('i').removeClass().addClass('fa fa-envelope');
            },
            error: function(response) {
                showMessage('It looks like there was an error submitting the form. Please try again later.', 'danger');
                $submitButton.removeAttr('disabled');
                $submitButton.find('i').removeClass().addClass('fa fa-envelope');
            }
        });

        return false;
    });

    function showMessage(message, status) {
        $('#messages').empty();
        $('#messages').append('<div class="alert alert-' + status + '" role="alert">' + message + '</div>');
    }
});