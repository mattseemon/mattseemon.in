'use strict';

jQuery(document).ready(function($) {

    // bind submit handler to form
    $('#commentsForm').on('submit', function(e) {
        var $form = $(this);
        var $submitButton = $form.find('button');
        var $cancelButton = $form.find('a');

        // prevent native submit
        e.preventDefault();

        // submit the form
        $form.ajaxSubmit({
            type: 'post',
            dataType: 'json',
            data: $(this).serialize(),
            contentType: 'application/x-www-form-urlencoded',
            beforeSubmit: function(xhr, opts) {
                var recaptchaResponse = grecaptcha.getResponse();
                if(recaptchaResponse.length == 0) {
                    showInputMessage('Please confirm you are not a robot.', 'danger');
                    return false;
                } 

                // disable submit button
                $submitButton.attr('disabled','disabled');
                $cancelButton.attr('disabled','disabled');
                $('#messages').empty();

                // add spinner icon
                $submitButton.find('i').removeClass().addClass('fa fa-circle-o-notch fa-spin');
            },
            success: function(response, status, xhr, form) {
                // mail sent ok - display sent message
                showInputMessage('Thank you for joining the conversation. Your comments will show up on the site once it is approved.', 'success');
                // clear the form
                form[0].reset();
                // make button active
                $submitButton.removeAttr('disabled');
                $cancelButton.removeAttr('disabled');
                // add back icon
                $submitButton.find('i').removeClass().addClass('fa fa-envelope');
                // hide cancel button if displayed
                $("#comment-replying-to").val(null);
                $cancelButton.css('display','none');
            },
            error: function(response) {
                // error sending mail - display error message
                showInputMessage('It looks like there was an error submitting the form. Please try again later.', 'danger');
                // make button active
                $submitButton.removeAttr('disabled');
                // add back icon
                $submitButton.find('i').removeClass().addClass('fa fa-envelope');
            }
        });
        return false;
    });

    function showInputMessage(message, status) {
        $('#messages').empty();
        $('#messages').append('<div class="alert alert-' + status + '" role="alert">' + message + '</div>');
    }
});


var addComment = {
  moveForm: function( commId, parentId, respondId, postId ) {
    var div, element, style, cssHidden,
      t           = this,
      comm        = t.I( commId ),
      respond     = t.I( respondId ),
      cancel      = t.I( 'cancel-comment-reply-btn' ),
      parent      = t.I( 'comment-replying-to' ),
      post        = t.I( 'comment-post-slug' ),
      commentForm = respond.getElementsByTagName( 'form' )[0];

    if ( ! comm || ! respond || ! cancel || ! parent || ! commentForm ) {
      return;
    }

    t.respondId = respondId;
    t.commId = commId;

    postId = postId || false;

    if ( post && postId ) {
      post.value = postId;
    }
    parent.value = parentId;
    cancel.style.display = '';
    
    $('html, body').animate({scrollTop: $('#respond').offset().top -100 }, 'slow');

    cancel.onclick = function() {
      var t       = addComment;
      t.I( 'comment-replying-to' ).value = null;
      this.style.display = 'none';
      this.onclick = null;
      return false;
    };

    /*
     * Set initial focus to the first form focusable element.
     * Try/catch used just to avoid errors in IE 7- which return visibility
     * 'inherit' when the visibility value is inherited from an ancestor.
     */
    try {
      for ( var i = 0; i < commentForm.elements.length; i++ ) {
        element = commentForm.elements[i];
        cssHidden = false;

        // Modern browsers.
        if ( 'getComputedStyle' in window ) {
          style = window.getComputedStyle( element );
        // IE 8.
        } else if ( document.documentElement.currentStyle ) {
          style = element.currentStyle;
        }

        /*
         * For display none, do the same thing jQuery does. For visibility,
         * check the element computed style since browsers are already doing
         * the job for us. In fact, the visibility computed style is the actual
         * computed value and already takes into account the element ancestors.
         */
        if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ( 'hidden' === element.type || element.disabled || cssHidden ) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }

    } catch( er ) {}

    return false;
  },

  I: function( id ) {
    return document.getElementById( id );
  }
};