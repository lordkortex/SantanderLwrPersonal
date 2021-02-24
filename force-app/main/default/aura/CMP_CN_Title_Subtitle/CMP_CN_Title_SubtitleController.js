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
        var fireNavigationEvent = component.get("v.fireNavigationEvent");
        if(fireNavigationEvent){
            var evt = component.getEvent("navigateBack");
            if(evt){
                evt.fire();
            }
        } else {
            window.history.back();
        }
    }
})