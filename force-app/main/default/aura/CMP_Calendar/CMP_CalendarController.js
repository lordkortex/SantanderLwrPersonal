({
    doInit : function(component, event) {
        try{
            if(component.get("v.dateFrom")==null){
                var from=component.find('dateFrom');
                from.set('v.value',component.get("v.placeholderFrom"));
            }
            if(component.get("v.dateTo")==null){
                var to=component.find('dateTo');
                to.set('v.value',component.get("v.placeholderTo"));
            }
           
        // call the apex class method 
       var action = component.get("c.getUserDateFormat");
        // set param to method  
          action.setParams({
              'userId': '',
            });
        // set a callBack    
          action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                var res =response.getReturnValue();
                if(res !='' && res!= undefined && res !=null){
                    component.set("v.dateFormat",response.getReturnValue());
                }

              }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    component.set("v.errorAccount",true);

                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
   
          });
        // enqueue the Action  
          $A.enqueueAction(action);
        }catch (e) {
            console.log(e);
        }
      
      },



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
        var dateFrom=component.get("v.dateFrom");
        var dateTo=component.get("v.dateTo");
        
        if(dateFrom == '' || dateFrom == null || dateFrom == undefined){
            dateFrom=$A.get("$Label.c.from");
            component.set("v.dateFrom", $A.get("$Label.c.from"));
            component.set("v.validity",true);
            component.set("v.validFrom",true);
        }

        if(dateTo == '' || dateTo == null || dateTo == undefined){
            dateTo=$A.get("$Label.c.to");
            component.set("v.dateTo", $A.get("$Label.c.to"));
            component.set("v.validity",true);
            component.set("v.validTo",true);
        }

        //Check if the input is date
        if(dateTo !=$A.get("$Label.c.to")){
            if(dateTo.match("\\d{4}-\\d{2}-\\d{2}") != null){
                component.set("v.validTo",true);
            }else{
                component.set("v.validTo",false);
                component.set("v.validity",false);
                //component.set("v.errorMessageTo",$A.get("$Label.c.allowedDateFormat")+' '+ component.get("v.dateFormat"));
                component.set("v.errorMessageTo",$A.get("$Label.c.IncorrectDateFormat"));
            }
        }

        if(dateFrom !=$A.get("$Label.c.from")){
            if(dateFrom.match("\\d{4}-\\d{2}-\\d{2}") != null){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
                var yyyy = today.getFullYear();
                today = yyyy+'-'+mm+'-'+dd;
                if(dateFrom<= today){
                    component.set("v.validFrom",true);
                }else{
                    component.set("v.validFrom",false);
                    component.set("v.validity",false);
                    component.set("v.errorMessageFrom",$A.get("$Label.c.fromDateLessThanToday"));
                }

            }else{
                component.set("v.validFrom",false);
                component.set("v.validity",false);
                //component.set("v.errorMessageFrom",$A.get("$Label.c.allowedDateFormat")+' '+ component.get("v.dateFormat"));
                component.set("v.errorMessageFrom",$A.get("$Label.c.IncorrectDateFormat"));
            }
        }

        if( component.get("v.validFrom") && dateFrom !=$A.get("$Label.c.from") && component.get("v.validTo") && dateFrom !=$A.get("$Label.c.to")){
            if(dateTo<dateFrom){
                component.set("v.validTo",false);
                component.set("v.validity",false);
                component.set("v.errorMessageTo",$A.get("$Label.c.validationDate"));
            }
        }
        /*if(!check2.valid){
            component.set("v.validity",false);
            component.set("v.helpTextFrom","");
            fromCMP.setCustomValidity($A.get("$Label.c.allowedDateFormat")) ;
            fromCMP.reportValidity();

            component.set("v.helpTextTo","dd/mm/yyyy");
            toCMP.setCustomValidity('') ;
            toCMP.reportValidity();
        }else{
            var dateFrom=component.get("v.dateFrom");
            var dateTo=component.get("v.dateTo");

            component.set("v.helpTextFrom","dd/mm/yyyy");
            fromCMP.setCustomValidity('') ;
            fromCMP.reportValidity();
            component.set("v.helpTextTo","dd/mm/yyyy");
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
        console.log("validity "+ component.get("v.validity"));*/
    }
})