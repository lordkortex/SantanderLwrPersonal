({
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    Method to go back
    History
    <Date>			<Author>			<Description>
    27/02/2020		Shahad Naji     	Initial version
    25/03/2020      Guillermo Giral     Added the firing of an event to handle the navigation from the parent
	*/
    goBack : function(component, event, helper) {
        if(component.get("v.comesFromTracker") == false) {
            var fireNavigationEvent = component.get("v.fireNavigationEvent");
            if(fireNavigationEvent){
                var evt = component.getEvent("navigateBack");
                if(evt){
                    evt.fire();
                }
            } else {
                window.history.back();
            }
        } else {
            var filters = component.get("v.filters");
            var url = "c__filters="+filters+"&c__fromDetail=true"+'&c__allAccounts='+component.get("v.fullAccountList");
            
            helper.goTo(component, event,"international-payments-tracker", url);
        }
        
    }
})