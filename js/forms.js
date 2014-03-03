   
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


window.getArgs = function() {

var argsStr = window.location.search;

var pairs = argsStr.replace(/^\?/, '').split('&');

var args = {};

unesc = unescape;

if ( typeof(decodeURIComponent) != 'undefined' )

unesc = decodeURIComponent;

for ( var i = 0; i < pairs.length; ++i ) {

pair = pairs[i].split('=');

if (pair[0]) {

if (pair[1])

pair[1] = unesc(pair[1].replace(/\+/g, ' '));

args[unesc(pair[0].replace(/\+/g, ' '))] = pair[1];

}

}

return args;

};


$('form').each(function(){
	var args = getArgs();
	});

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
		$("#thankyou .modal-body").html(thanks);
		$("#thankyou").modal();
		$("#thankyou").modal('show');
		    
		}
		

		
};


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
  
  
