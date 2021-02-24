({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to toggle the pills
    History
    <Date>			<Author>			<Description>
	12/03/2020		Guillermo Giral  	Initial version
	*/
	togglePills : function(component, event, helper) {
		var isEndOfDay = component.get("v.endOfDay");
		if(event.currentTarget.id == "lastUpdatePill" && isEndOfDay){
			component.set("v.endOfDay", false);
		} else if(event.currentTarget.id == "endOfDayPill" && !isEndOfDay){
			component.set("v.endOfDay", true);
		}
	}
})