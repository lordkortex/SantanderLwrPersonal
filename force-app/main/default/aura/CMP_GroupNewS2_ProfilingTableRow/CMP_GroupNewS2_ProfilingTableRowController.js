({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to collapse or expand one
					grouping row (country) in the table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
	toggleRow : function(component, event, helper) {
		component.set("v.group.displayRow", !component.get("v.group.displayRow"));
		var evt = component.getEvent("rowDisplayChange");
		if(evt){
			evt.setParams({
							arrowClicked : true,
							countryDeleted : "",
							countryDeleteClicked : false,
							accountDeleteClicked : false,
							entitlementEditClicked : false
						});
			evt.fire();
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to delete a grouping row (country)
					or inner row (account) from the table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
	onDeleteCountryRow : function(component, event, helper) {
		var country = component.get("v.group.country");
		var evt = component.getEvent("rowDisplayChange");
		if(evt){
			evt.setParams({
				arrowClicked : false,
				countryDeleted : country,
				countryDeleteClicked : true,
				accountDeleteClicked : false,
				entitlementEditClicked : false
			});
			evt.fire();
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to delete an inner row (account)
					from the table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
	onDeleteAccountRow : function(component, event, helper) {
		var account = event.currentTarget.name;
		var evt = component.getEvent("rowDisplayChange");
		if(evt){
			evt.setParams({
				accountDeleteClicked : true,
				accountDeleted : account
			});
			evt.fire();
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to modify the entitlements associated
					with and account in the table
    History
    <Date>			<Author>			<Description>
	27/01/2020  	Guillermo Giral   	Initial version
	*/
	onModifyEntitlementRow : function(component, event, helper) {
		var selectedAccount = event.currentTarget.id;
		var currentEntitlements = [];
		var accounts = component.get("v.group.rows");

		// Get the entitlement list from the selected account
		for(var accRow in accounts){
			if(accounts[accRow].account == selectedAccount){
				currentEntitlements = accounts[accRow].entitlement;
			}
		}

		// Get the event, set the params and fire it
		if(selectedAccount != undefined && currentEntitlements.length > 0){
			var evt = component.getEvent("rowDisplayChange");
			if(evt){
				evt.setParams({
								"entitlementEditClicked" : true,
								"currentAccount" : selectedAccount,
								"currentEntitlements" : currentEntitlements
				});
				evt.fire();
			}
		}
	}
})