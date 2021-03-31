({
	    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    Method tyo show the more info section
    History
    <Date>			<Author>			<Description>
	27/02/2020		Shahad Naji     	Initial version
	*/
	moreInfoSection : function(component, event, helper) {
		component.set("v.isExpanded", !component.get("v.isExpanded"));
	},

	doInit : function(component, event, helper) {
		var comesFromTracker = component.get("v.comesFromTracker");
		var check = component.get("v.iObject");
		var originalDate = check.valueDate;

		if(comesFromTracker == false) {
			var valueDate = originalDate.substring(8, 10)+"/"+originalDate.substring(5, 7)+"/"+originalDate.substring(0, 4);
			component.set("v.valueDate", valueDate);
		} else{
			component.set("v.valueDate", originalDate);
		}
	}
})