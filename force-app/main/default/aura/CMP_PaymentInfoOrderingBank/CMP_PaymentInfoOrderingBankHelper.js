({
    createCase : function(component, event, helper) {
        var obj = component.get('v.paymentObj');
        if(obj != null && obj != undefined){
            
            var action = component.get("c.createCase");
            action.setParams({ 
                paymentId : obj.paymentId,
                paymentCountry : obj.destinationCountry});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    
                    var result = response.getReturnValue();
                    console.log('RES:  ' +  result);
                    helper.navigateToRecord(component, event, helper, result.Id);
                    helper.showSuccessToast(component, event, helper, result.CaseNumber);
                    component.set('v.showSpinner', false);
                    
                }
                else if (state === "INCOMPLETE") {
                    // do something
                    
                }
                    else if (state === "ERROR") {
                        var errors = response.getError(component, event, helper);
                        helper.showErrorToast();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                        
                    }
            });        
            $A.enqueueAction(action); 
        }
    },
    //$Label.c.Toast_Success
    showSuccessToast : function(component, event, helper, caseNumber) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : $A.get("$Label.c.Toast_Success"),
            message: 'Case '+ caseNumber +' was created.',           
            duration:' 5000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },
   // $Label.c.ERROR
    showErrorToast : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : $A.get("$Label.c.ERROR"),
            message:'Mode is pester ,duration is 5sec and Message is not overrriden because messageTemplateData is not specified',            
            duration:' 5000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },

    navigateToRecord : function (component, event, helper, objId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": objId
        });
        navEvt.fire();
    }
})