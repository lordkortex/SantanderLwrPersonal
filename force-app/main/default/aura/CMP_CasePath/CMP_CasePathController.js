({
    onSelect : function (component, event, helper) {

        var stepName = event.getParam("detail").value;        
		var recordHandler = component.find("recordHandler");
        
        // Retreive record and update the picklist value
        var record = recordHandler.get('v.targetRecord');
        var fieldName = component.find("picklistPath").get('v.picklistFieldApiName');
        var fields = component.get('v.simpleRecord');
        fields[fieldName] = stepName;
        component.set('v.simpleRecord', fields);
		
        // Save the updated record        
		recordHandler.saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {                
           
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error[0]));
                
                var toastEvent = $A.get("event.force:showToast");
                var errMsg = "Message: " + saveResult.error[0].message + ", Status Code: " + saveResult.error[0].pageErrors[0].statusCode;
                toastEvent.setParams({
                    "type": "error",
                    "message": errMsg
    			});
    			toastEvent.fire();
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));        
    }
})