   
 /* Serialize object into AJAX friendly array */   
$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

function getQueryVariable(string, variable){
       var query = string.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


/* Handle the form submission.
/* Use ajax submission with data to AK from form.
/* Submit to page value (hidden form input) */
function submitForm(form, page){
	var the_form = $("#"+form);
	
	if(!validate(the_form))
	{
		return false;
		
	} 
	
		submitActionkitForm(page,  the_form.serializeObject(), afterSubmission);
}
	
	
function afterSubmission(result, data){
	    if (result ==  "success"){
		    handleActionkitSuccess(data)
	    } else {
		    handleActionkitError(data);
	    }
}
	
	
/* Handle and track errors for validation.
/* Add error class to invalid inputs */	
function handleActionkitError(errors) { 
	$.each( errors , function(i, n){
		$("#"+i).addClass("error");
		$('.ak-errors').append('<li>'+i+'</li>');
	});
	
}
        


/* Handle Action Kit submission success
/* Form fades out to reveal a thanks message.
/* Easy to escape from here with esc key or
/* Clicking X or out of lightbox
*/      
function handleActionkitSuccess(form) {
		
		$('.modal').modal('hide');
	
		/*Thank you message */
		var thanks = '<p>Thank you.  You should recieve an email confirmation shortly.</p>'
		$("#thankyou .modal-body").append(thanks);
		$("#thankyou").modal();
		$("#thankyou").modal('show');
		/*var akid = getQueryVariable(form, 'akid').substring(1).split('.')[0];
        
        /* prompt for resume */
/*        var resume = '	<div id="resume_upload_form" style="display:none"><p>Thanks for applying!  Would you like to upload your resume?</p><form action="http://boldprogressives.org/resume_upload.php" method="post" enctype="multipart/form-data"><input id="input_akid" type="hidden" name="akid" value="'+akid+'" /><input type="hidden" name="redirect" value="0" /><p><input type="file" name="resume" size="40" /></p><p><input class="submit button" type="submit" value="upload resume" /></p></form></div><!-- end resume upload form -->';
		$('#apply_form').parent().prepend(resume);
		$("#resume_upload_form").fadeIn();
		$('#apply_form').fadeOut();*/
		
		
};



$('input[type="radio"] + label, input[type="radio"]').addClass('radio');

  
$('input[type=radio]').on('click', function() {
   	var radio_for = this.name;
	$('[name="'+radio_for+'"]').next("label").removeClass('active');
   	$(this).next('label').addClass('active');
});

$(document).on('click', 'a[href="#contact"]', function(){
	$('#contact select').val($(this).attr('data-type'));
});


validators = {};
  validators.email = function(value) {
    if ( !/^\s*\S+@\S+\.\S+\s*$/.test(value) )
        return false
    return true;
  };

  validators.zip = function(value) {
    if ( !/\d{5}/.test(value) )
        return false;
    return true;
  };	  


 function validate(form) {
 
    var valid = true;
    var val = form.find("input[name=email]").val();
    if( !val || !validators.email(val) ) {
      form.find("input[name=email]").css("background-color", "pink");
      
      valid = false;
    } else {
    	
      form.find("input[name=email]").css("background-color", "white");
    }
    var val = form.find("input[name=zip]").val();
    if( !val || !validators.zip(val) ) {
      form.find("input[name=zip]").css("background-color", "pink");
       valid = false;
    } else {
    
      form.find("input[name=zip]").css("background-color", "white");
    }
   
    return valid;
  
  }
  
  
