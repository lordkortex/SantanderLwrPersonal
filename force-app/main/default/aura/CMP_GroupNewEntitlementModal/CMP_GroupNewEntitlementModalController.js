({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used close the entitlements modal
    History
    <Date>			<Author>			<Description>
	05/02/2020  	Guillermo Giral   	Initial version
	*/
	closeModal : function(component, event, helper) {
		component.set("v.displayModal", false);
	},
	
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to update the entitlements associated with the current account in the profiling table.
					It fires an event that is handled in the parent component and adds the new data to the table.
    History
    <Date>			<Author>			<Description>
	05/02/2020  	Guillermo Giral   	Initial version
	*/
	updateEntitlements : function(component, event, helper) {
		if(component.get("v.selectedEntitlements").length > 0){
			var evt = component.getEvent("entitlementUpdateEvent");
			if(evt){
				evt.setParams({
					"entitlementEditClicked" : true,
					"currentEntitlements" : component.get("v.selectedEntitlements"),
					"currentAccount" : component.get("v.account")
				});
				evt.fire();
			}
			component.set("v.displayModal", false);
		}
	},
	
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to set the available entitlements
					when displayed in the modal
    History
    <Date>			<Author>			<Description>
	12/02/2020  	Guillermo Giral   	Initial version
	*/
	setAvailableEntitlements : function(component, event, helper) {
		// If the modal has just displayed ('displayModal' == true)
		if(event.getParam("value")){
			let available = component.get("v.availableEntitlements");
			let selectable = JSON.parse(JSON.stringify(available));
			let selected = component.get("v.selectedEntitlements");
			selectable = selectable.filter(ent => !selected.includes(ent));
			component.set("v.selectableEntitlements", selectable);
		}
	}
})