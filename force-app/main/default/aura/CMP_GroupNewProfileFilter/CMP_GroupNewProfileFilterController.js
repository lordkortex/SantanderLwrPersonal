({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to collapse the component
    History
    <Date>			<Author>			<Description>
	03/02/2020		Guillermo Giral   	Initial version
	*/
	collapseSection : function(component, event, helper) {
		component.set("v.isExpandedSection", false);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to expand the component
    History
    <Date>			<Author>			<Description>
	03/02/2020		Guillermo Giral   	Initial version
	*/
	expandSection : function(component, event, helper) {
		component.set("v.isExpandedSection", true);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to populate the default dropdown values
    History
    <Date>			<Author>			<Description>
	10/02/2020		Guillermo Giral   	Initial version
	*/
	populateDefaultValues : function(component, event) {
		var params = event.getParam("arguments");
		if(params){
			var accountList = params.accountList;
			var entitlementList = params.entitlementList;
			var countryList = params.countryList;
			// Add all accounts value to the first position of the list
			if(accountList.length > 0 && !accountList.includes($A.get("$Label.c.AllAccounts"))){
				accountList.unshift({ 
					"value" : $A.get("$Label.c.AllAccounts"),
					"displayValue" : $A.get("$Label.c.AllAccounts")
				});
			}
			if(accountList.length > 0 && accountList.includes($A.get("$Label.c.ServiceProfiling_EntitltementNoAccount"))){
				//accountList.splice(accountList.indexOf($A.get("$Label.c.ServiceProfiling_EntitltementNoAccount")),1);
				accountList = accountList.filter(account => account.value != $A.get("$Label.c.ServiceProfiling_EntitltementNoAccount"));
			}
			// Add all entitlements value to the first position of the list
			if(entitlementList.length > 0 && !entitlementList.includes($A.get("$Label.c.ServiceProfiling_AllEntitlements"))){
				entitlementList.unshift({
					"value" : $A.get("$Label.c.ServiceProfiling_AllEntitlements"),
					"displayValue" : $A.get("$Label.c.ServiceProfiling_AllEntitlements")
				});
			}
			// Add all countries value to the first position of the list
			if(countryList.length > 0 && !countryList.includes($A.get("$Label.c.SelectAllCountries"))){
				countryList.unshift({
					"value" : $A.get("$Label.c.SelectAllCountries"),
					"displayValue" : $A.get("$Label.c.SelectAllCountries")
				});
			}
			component.set("v.accounts", accountList);
			component.set("v.entitlements", entitlementList);
			component.set("v.countries", countryList);
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to reset the dropdown values
    History
    <Date>			<Author>			<Description>
	10/02/2020		Guillermo Giral   	Initial version
	*/
	resetDropdownValues : function(component) {
		component.set("v.selectedAccount", null);
		component.set("v.selectedEntitlement", null);
		component.set("v.selectedCountry", null);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to fire the filtering event
					to be handled by the profiling table
    History
    <Date>			<Author>			<Description>
	10/02/2020		Guillermo Giral   	Initial version
	*/
	fireFilterDataEvent : function(component, event) {
		var evt = $A.get("e.c:EVT_ServiceProfilingFilter");
		if(evt){
			var country = "all";
			var account = "all";
			var entitlement = "all";
			if(component.get("v.selectedAccount") != null && component.get("v.selectedAccount") != undefined && component.get("v.selectedAccount") != $A.get("$Label.c.AllAccounts")){
				account = component.get("v.selectedAccount");
			}
			if(component.get("v.selectedEntitlement") != null && component.get("v.selectedEntitlement") != undefined && component.get("v.selectedEntitlement") != $A.get("$Label.c.ServiceProfiling_AllEntitlements")){
				entitlement = component.get("v.selectedEntitlement");
			}
			if(component.get("v.selectedCountry") != null && component.get("v.selectedCountry") != undefined && component.get("v.selectedCountry") != $A.get("$Label.c.SelectAllCountries")){
				country = component.get("v.selectedCountry");
			}
			
			evt.setParams({
				"filterByCountry" : country,
				"filterByAccount" : account,
				"filterByEntitlement" : entitlement,
				"filterDataTable" : true
			});
			evt.fire();
		}
	}
})