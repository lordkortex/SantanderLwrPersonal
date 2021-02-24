({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to reset the values of the multiselect.
					This function is called only once, on component initialization.
    History
    <Date>			<Author>			<Description>
	30/01/2020  	Guillermo Giral   	Initial version
	*/
	initializeDropdowns : function(component, event) {	
		// Initialize account data
		var accounts = component.get("v.accounts");
		var accountData = {};
		accountData.unfiltered = {};
		accountData.filtered = {};
		accountData.unfiltered.available = accounts;
		accountData.unfiltered.selected = [];
		accountData.filtered.available = accounts;
		accountData.filtered.selected = [];
		component.set("v.accountData", accountData);

		// Initialize entitlement data
		var entitlements = component.get("v.entitlements");
		var entitlementData = {};
		entitlementData.unfiltered = {};
		entitlementData.filtered = {};
		entitlementData.unfiltered.available = entitlements;
		entitlementData.unfiltered.selected = [];
		entitlementData.filtered.available = entitlements;
		entitlementData.filtered.selected = [];
		component.set("v.entitlementData", entitlementData);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used update the unfiltered values int he account data map when needed + 
					remove the extra entitlements when the "Entitlement with no associate account"
					value is selected
    History
    <Date>			<Author>			<Description>
	07/02/2020  	Guillermo Giral   	Initial version
	*/
	handleMultipicklistValues : function(component, event) {
		//DO NOT DELETE the following comment line. They are highly important to access custom labels.
        //$Label.c.ServiceProfiling_DowRepSicContingency
		var accountData = component.get("v.accountData");
		var entitlementData = component.get("v.entitlementData");
		// If one filtered value has been moved from left to right (or viceversa) the corresponding
		// unfiltered value must be moved as well, to keep both lists in sync
		var params = event.getParams();
		if(event.getSource().getLocalId() == "accountsCombo"){
			if(params){
				// If filtered values moved from RIGHT to LEFT "<"
				// The unfiltered selected value must be moved to available
				if(!params.selected) {
					accountData.unfiltered.available.push(params.value);
					accountData.unfiltered.selected = accountData.unfiltered.selected.filter(account => account != params.value);
					component.set("v.accountData.unfiltered", accountData.unfiltered);

					// Display all the entitlements values
					if(params.value == $A.get("$Label.c.ServiceProfiling_EntitltementNoAccount")){
						component.set("v.entitlementData.filtered.available", component.get("v.entitlementData.unfiltered.available"));
						component.set("v.entitlementData.filtered.selected", component.get("v.entitlementData.unfiltered.selected"));
					}
				// If filtered values moved from LEFT to RIGHT ">"
				// The unfiltered available value must be moved to selected
				} else {
					accountData.unfiltered.selected.push(params.value);
					accountData.unfiltered.available = accountData.unfiltered.available.filter(account => account != params.value);
					component.set("v.accountData.unfiltered", accountData.unfiltered);

					// Filter the entitlements when "Entitlement with no account" is selected
					if(params.value == $A.get("$Label.c.ServiceProfiling_EntitltementNoAccount")){
						entitlementData.filtered.available = entitlementData.unfiltered.available.filter(ent => ent == $A.get("$Label.c.ServiceProfiling_DowRepSicContingency"));
						entitlementData.filtered.selected = entitlementData.unfiltered.selected.filter(ent => ent == $A.get("$Label.c.ServiceProfiling_DowRepSicContingency"));
						component.set("v.entitlementData.filtered", entitlementData.filtered);
					}
				}
			}
		} else if(event.getSource().getLocalId() == "entitlementsCombo"){
			// Keep the filtered / unfiltered data in sync
			// Value moved from right to left
			if(params){
				if(!params.selected){
					entitlementData.unfiltered.available.push(params.value);
					entitlementData.unfiltered.selected = entitlementData.unfiltered.selected.filter(ent => ent != params.value);		
				// Value moved from left to right
				} else {
					entitlementData.unfiltered.selected.push(params.value);
					entitlementData.unfiltered.available = entitlementData.unfiltered.available.filter(ent => ent != params.value);
				}
				component.set("v.entitlementData.unfiltered", entitlementData.unfiltered);
			}
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to collapse the section
    History
    <Date>			<Author>			<Description>
	30/01/2020  	Guillermo Giral   	Initial version
	*/
	collapseSection : function(component, event, helper) {
		component.set("v.isExpandedSection", false);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to expand the section
    History
    <Date>			<Author>			<Description>
	30/01/2020  	Guillermo Giral   	Initial version
	*/
	expandSection : function(component, event, helper) {
		component.set("v.isExpandedSection", true);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to update the profiling table depending
					on the values selected (acc + ent)
    History
    <Date>			<Author>			<Description>
	30/01/2020  	Guillermo Giral   	Initial version
	*/
	updateProfiling : function(component, event, helper){
		// Create the list of accounts / entitlements combinations to be sent to the table
		var accountList = component.get("v.accountData.filtered.selected");
		var entitlementList = component.get("v.entitlementData.filtered.selected");
		var accEntData = [];
		if(accountList.length > 0 && entitlementList.length > 0){
			for(var acc in accountList){
				var entitlements = [];
				var data = {};
				for(var ent in entitlementList){
					entitlements.push(entitlementList[ent]);
					data.entitlement = entitlements;
				}
				data.account = accountList[acc];
				accEntData.push(data);
			}
			// Fire event to notify that the table data is going to be updated
			var updateDataEvent = component.getEvent("updateProfileEvent");
			updateDataEvent.setParams({
				"updatedData" : accEntData
			});
			updateDataEvent.fire();

			// Fire event to collapse / expand the sections
			var toggleSectionVisibilityEvent = $A.get("e.c:EVT_ServiceProfilingUpdateProfileOnClick");
			toggleSectionVisibilityEvent.fire();
			component.set("v.isExpandedSection", false);
			helper.resetValues(component, event, helper);
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to reset the values of the multiselect
    History
    <Date>			<Author>			<Description>
	30/01/2020  	Guillermo Giral   	Initial version
	*/
	clearRightColumn : function(component, event, helper){
		helper.resetValues(component, event, helper);
	},
	
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to filter the accounts displayed in the 
					multiselect picklist
    History
    <Date>			<Author>			<Description>
	06/02/2020  	Guillermo Giral   	Initial version
	*/
	filterDisplayedAccounts : function(component, event, helper){
		var params = event.getParams();
		if(params){
			if(params.filterDataTable == false && params.filterByCountry != undefined){
				if(params.filterByCountry == $A.get("$Label.c.ServiceProfiling_AllCountries")) {
					component.set("v.accountData.filtered.available", component.get("v.accountData.unfiltered.available"));
					component.set("v.accountData.filtered.selected", component.get("v.accountData.unfiltered.selected"));
				} else {
					// Filter the unfiltered data to assign the filtered data
					var countries = component.get("v.countryMap");
					component.set("v.accountData.filtered.available" , 
									component.get("v.accountData.unfiltered.available").filter(account => account.substring(0,2) == countries[params.filterByCountry]));
					component.set("v.accountData.filtered.selected" , 
									component.get("v.accountData.unfiltered.selected").filter(account => account.substring(0,2) == countries[params.filterByCountry]));
				}
			}
		}
	}
})