({
	  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate dates
    History
    <Date>			<Author>		<Description>
    07/01/2020		R. Alexander Cervino     Initial version*/

    validateDate : function(component, event, helper) {
        try{
            var error="ok";
            var dateFrom=component.get("v.dateFrom");
            var dateTo=component.get("v.dateTo");

            if(dateTo!=null && dateTo !=undefined && dateTo != "" && dateFrom!=null && dateFrom !=undefined && dateFrom != ""){
                if(dateTo<dateFrom){
                    component.set("v.dateErrorTo","dd/mm/yyyy");
                    component.set("v.dateTo","");
                    error="error";
                }
            }

            if(error=="ok"){
                helper.refreshPills(component, event, helper);
            }
        } catch (e) {
            console.log(e);
        }
    },
	handleBlurFrom : function(component,event,helper){

        var fromCMP = component.find("dateFrom");

        fromCMP.setCustomValidity('') ;
        var check2 = fromCMP.get("v.validity");

        if(!check2.valid){
            component.set("v.helpTextFrom","");
            fromCMP.setCustomValidity($A.get("$Label.c.allowedDateFormat") + " " +  $A.get("$Locale.shortDateFormat")) ;

        }else{
            component.set("v.helpTextFrom","dd/mm/yyyy");
            fromCMP.setCustomValidity('') ;
        }
        fromCMP.reportValidity();
    },
	handleBlurTo : function(component,event,helper){

        var toCMP = component.find("dateTo");

        toCMP.setCustomValidity('') ;
        var check1 = toCMP.get("v.validity");

        if(!check1.valid){
            component.set("v.helpTextTo","");
            toCMP.setCustomValidity($A.get("$Label.c.allowedDateFormat") + " " +$A.get("$Locale.shortDateFormat")) ;

        }else{
            toCMP.setCustomValidity('') ;
            component.set("v.helpTextTo","dd/mm/yyyy");
        }
        toCMP.reportValidity();
    },

    displayErrorFrom : function(component,event,helper){
        var fromCMP = component.find("dateFrom");
        fromCMP.setCustomValidity(component.get("v.errorMessageFrom"));
        fromCMP.reportValidity();
        
    },

    displayErrorTo : function(component,event,helper){
        var toCMP = component.find("dateTo");
        toCMP.setCustomValidity(component.get("v.errorMessageTo"));
        toCMP.reportValidity();

        
    },
})