({
	    getCurrentUserData: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getUserData');
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var result = response.getReturnValue();
                    if (result.success) {
                        if(!$A.util.isEmpty(result.value)){
                            if(!$A.util.isEmpty(result.value.userData)){
                                component.set('v.currentUser', result.value.userData);
                                resolve('getCurrentUserData_OK');
                            }
                        }
                    }
                }
            });        
            $A.enqueueAction(action); 
        }), this); 
    },
    
    doRedirect: function (component, event, helper){
    	if(event.getParams().changeType == "LOADED"){          
            var urlParams = 
                "c__currentUser="+JSON.stringify(component.get("v.currentUser"))
                +"&c__paymentID="+component.get("v.paymentRecord.PAY_TXT_PaymentId__c"); 
            var page = component.get("v.detailsPage");
            if(page != null && urlParams != null){
                component.find("service").redirect(page, urlParams);
            }
        }else if (event.getParams().changeType == "ERROR"){
            let navService = component.find("navService");
            let pageReference = {
                type: "comm__namedPage",
                attributes: {
                    pageName: "contact-us"
                },
                state: {
                    params : ""
                }
            }
            navService.navigate(pageReference);
        }
    }
})