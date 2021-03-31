({
    
	  /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate dates
    History
    <Date>			<Author>		<Description>
    07/01/2020		R. Alexander Cervino     Initial version*/

    validateDate : function(component, event, helper) {
        try{
            var dateFrom=component.get("v.dateFrom");
            var dateTo=component.get("v.dateTo");

            if(dateTo!=null && dateTo !=undefined && dateTo != "" && dateFrom!=null && dateFrom !=undefined && dateFrom != ""){
                if(dateTo<dateFrom){
                    //component.set("v.dateErrorTo","dd/mm/yyyy");
                    //component.set("v.dateTo","");
                    var toCMP = component.find("dateTo");
                    toCMP.setCustomValidity('') ;
                    component.set("v.helpTextTo","");
                    toCMP.setCustomValidity($A.get("$Label.c.validationDate")) ;
                    toCMP.reportValidity();
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    handleBlurFrom : function(component,event,helper){
        component.set("v.validity",true);

        var fromCMP = component.find("dateFrom");
        var toCMP = component.find("dateTo");
        fromCMP.setCustomValidity('') ;
        var check2 = fromCMP.get("v.validity");

        if(!check2.valid){
            component.set("v.validity",false);
            component.set("v.helpTextFrom","");
            //fromCMP.setCustomValidity($A.get("$Label.c.allowedDateFormat")) ;
            fromCMP.setCustomValidity($A.get("$Label.c.IncorrectDateFormat")) ;
            fromCMP.reportValidity();

            component.set("v.helpTextTo",component.get("v.dateFormat"));
            toCMP.setCustomValidity('') ;
            toCMP.reportValidity();
        }else{
            var dateFrom=component.get("v.dateFrom");
            var dateTo=component.get("v.dateTo");

            component.set("v.helpTextFrom",component.get("v.dateFormat"));
            fromCMP.setCustomValidity('') ;
            fromCMP.reportValidity();
            component.set("v.helpTextTo",component.get("v.dateFormat"));
            toCMP.setCustomValidity('') ;
            toCMP.reportValidity();

            if(dateTo!=null && dateTo !=undefined && dateTo != "" && dateFrom!=null && dateFrom !=undefined && dateFrom != ""){
                if(dateTo<dateFrom){
                    component.set("v.validity",false);

                    //component.set("v.dateErrorTo","dd/mm/yyyy");
                    //component.set("v.dateTo","");
                    toCMP.setCustomValidity('') ;
                    component.set("v.helpTextTo","");
                    toCMP.setCustomValidity($A.get("$Label.c.validationDate")) ;
                    toCMP.reportValidity();
                }
            }            
        }
        console.log("validity "+ component.get("v.validity"));
    },
    handleBlurTo : function(component,event,helper){
        component.set("v.validity",true);

        var toCMP = component.find("dateTo");

        toCMP.setCustomValidity('') ;
        var check1 = toCMP.get("v.validity");

        if(!check1.valid){
            component.set("v.validity",false);

            component.set("v.helpTextTo","");
            //toCMP.setCustomValidity($A.get("$Label.c.allowedDateFormat")) ;
			toCMP.setCustomValidity($A.get("$Label.c.IncorrectDateFormat")) ;
        }else{
            var dateFrom=component.get("v.dateFrom");
            var dateTo=component.get("v.dateTo");

            component.set("v.helpTextTo",component.get("v.dateFormat"));
                toCMP.setCustomValidity('') ;

            if(dateTo!=null && dateTo !=undefined && dateTo != "" && dateFrom!=null && dateFrom !=undefined && dateFrom != ""){
                if(dateTo<dateFrom){
                    component.set("v.validity",false);

                    //component.set("v.dateErrorTo","dd/mm/yyyy");
                    //component.set("v.dateTo","");
                    toCMP.setCustomValidity('') ;
                    component.set("v.helpTextTo","");
                    toCMP.setCustomValidity($A.get("$Label.c.validationDate")) ;
                }
            }
        }
        console.log("validity "+ component.get("v.validity"));

        toCMP.reportValidity();
    }

})