({
	doInit : function(component, event, helper) {
        helper.getURLParams(component, event, helper);
        
	},
    
    populateProfilingTable : function(component, event, helper) {
        if(component.get("v.currentStageNumber") == 3 && component.get("v.profilingTableInnerData").length == 0 && component.get("v.hasProfile")){
            helper.getServiceProfilingData(component, event, helper);
        }else if(!component.get("v.hasProfile")){
			component.set("v.profilingTableInnerData", []);
		}
    },



	cancelButtons : function(component, event, helper) {
		component.set("v.isCancelling", false);
        
        if(event.getParam("ConfirmAccepted") == true) {
            var urlToSend = "";

            helper.encrypt(component, urlToSend).then(function(results)
            {
            let navService = component.find("navService");

            let pageReference = 
            {
                type: "comm__namedPage",
                attributes: 
                {
                    pageName: "users"
                },
                state: 
                {
                    params : results
                }
            }

            component.set("v.pageReference", pageReference);
            navService.navigate(pageReference); 
            });
            }

	}
})