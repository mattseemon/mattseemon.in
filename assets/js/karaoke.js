(function($){
 
   $( '#trackSearchForm' ).on( 'submit', function(e) {
       var $form = $(this);
       var $submitButton = $form.find('button');

       e.preventDefault();
 
       var condition =  $( '#condition' ).val();
       var url = '/api/track/' + condition;
 
       $.ajax({
           type:"GET",
           url: url,
           dataType : 'json',
           contentType: 'application/json',
           beforeSend : function( xhr ) {
               // disable submit button
                $submitButton.attr('disabled','disabled');
                // add spinner icon
                $submitButton.find('i').removeClass().addClass('fa fa-circle-o-notch fa-spin');
           },
           success: function(response) {
               //$( "#results").append( JSON.stringify( response ) );
               //showInputMessage('Thank you for writing. I will get in touch with shortly.', 'success');

               drawTable(response);

                // clear the form
                $form[0].reset();
                // make button active
                $submitButton.removeAttr('disabled');
                // add back icon
                $submitButton.find('i').removeClass().addClass('fa fa-search');
           },
           error: function( response ) {
                // error sending mail - display error message
                showInputMessage('It looks like there was an error submitting the search. Please try again later.', 'danger');
                // make button active
                $submitButton.removeAttr('disabled');
                // add back icon
                $submitButton.find('i').removeClass().addClass('fa fa-search');
           }
       });
      
   });

   function showInputMessage(message, status) {
        $('#messages').empty();
        $('#messages').append('<div class="alert alert-' + status + '" role="alert">' + message + '</div>');
   }

   function drawTable(response)
   {
       
       var tableBody = $("#results");
       tableBody.empty();

       if(response.length == 0)
       {
           tableBody.append($("<tr class='info'><td colspan='2'>Could not find any tracks with the requested search conditions.</td></tr>"));
       }

       for (var i=0; i < response.length; i++)
       {
           tableBody.append(drawRow(response[i]));
       }
   }

   function drawRow(rowData) {
       var row = $("<tr>")
       row.append($("<td>" + rowData.artist + "</td>"));
       row.append($("<td>" + rowData.title + "</td>"));
       row.append($("</tr>"));
       return row;
    }
 
})(jQuery);