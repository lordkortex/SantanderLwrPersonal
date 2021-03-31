({

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    çMethod to refresh the filtering
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    refreshInput : function(component, event, helper) {
        var cmpEvent = component.getEvent("updateFilterDropdown"); 

        cmpEvent.setParams({filter:'settledFrom',value:component.get("v.settledFrom")});
        cmpEvent.fire(); 

        cmpEvent = component.getEvent("updateFilterDropdown"); 

        cmpEvent.setParams({filter:'settledTo',value:component.get("v.settledTo")});
        cmpEvent.fire(); 
    },

     /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to validate settled amounts
    History
    <Date>			<Author>		<Description>
    21/01/2020		R. Alexander Cervino     Initial version*/

    validateSettled : function(component, event, helper) {
        try{
            var error=false;
            var settledFrom=component.get("v.settledFrom");
            var settledTo=component.get("v.settledTo");
            if(settledFrom!=null && settledFrom !=undefined && settledFrom != ""){
                if(parseInt(settledFrom)<0){
                    component.set("v.settledFrom","");
                }
            }

            if(settledTo!=null && settledTo !=undefined && settledTo != ""){
                if(parseInt(settledTo)<0){
                    component.set("v.settledTo","");
                }
            }

            if(settledTo!=null && settledTo !=undefined && settledTo != "" && settledFrom!=null && settledFrom !=undefined && settledFrom != ""){
                if(parseInt(settledTo)<parseInt(settledFrom)){
                    error=true;
                    component.set("v.settledErrorTo",$A.get("$Label.c.toAmountLowerThanFrom"));
                }else{
                    component.set("v.settledErrorTo","");
                }
            
            }else{
                component.set("v.settledErrorTo","");
            }

            if(error==false){
                helper.updatePlaceHolder(component);
                helper.refreshInput(component, event, helper);
            }else{
                component.set("v.valuePlaceholder", $A.get("$Label.c.amount"));
            }

        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to update the placeholder
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    updatePlaceHolder : function(component){
        var settledFrom=component.get("v.settledFrom");
        var settledTo=component.get("v.settledTo");
    
        component.set("v.valuePlaceholder", $A.get("$Label.c.amount"));
        if(settledFrom!="" && settledFrom!=null && settledFrom!=undefined && (settledTo=='' || settledTo==null || settledTo==undefined) ){
            settledFrom=settledFrom.toLocaleString($A.get("$Locale.userLocaleLang"));
            component.set("v.valuePlaceholder", $A.get("$Label.c.amount") +' ('+settledFrom+" - Max)");
        }
        if(settledTo!="" && settledTo!=null && settledTo!=undefined && (settledFrom=='' || settledFrom==null || settledFrom==undefined) ){
            settledTo=settledTo.toLocaleString($A.get("$Locale.userLocaleLang"));

            component.set("v.valuePlaceholder", $A.get("$Label.c.amount") +' (Min - '+settledTo+")");
        }
        if(settledTo!=null && settledTo !=undefined && settledTo != "" && settledFrom!=null && settledFrom !=undefined && settledFrom != ""){
            settledFrom=settledFrom.toLocaleString($A.get("$Locale.userLocaleLang"));
            settledTo=settledTo.toLocaleString($A.get("$Locale.userLocaleLang"));
            component.set("v.valuePlaceholder", $A.get("$Label.c.amount") +' ('+settledFrom+' - '+settledTo+")");
        }
       
    }
})