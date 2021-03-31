({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to get the URL params 
					sent from the previous window and initialize the data
    History
    <Date>			<Author>			<Description>
	31/01/2020		Guillermo Giral   	Initial version
	*/
	doInit : function(component, event, helper) {
		component.set("v.profilingTableExpanded", false);
		helper.getURLParams(component,event,helper);
		//helper.getServiceProfilingData(component, event, helper);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to update the profiling table
					when new ent / accs must be added
    History
    <Date>			<Author>			<Description>
	31/01/2020		Guillermo Giral   	Initial version
	*/
	updateProfilingTable : function(component, event, helper){
		if(event){
			var profilingData = event.getParams().updatedData;
			// If "Entitlement with no accounts" and "Downloads & Reporting - SIC Contingency" has been
			// selected, this data must go to the "Entilement with no associate account" table instead
			var entWithoutAccount = profilingData.filter(
				row => 	row.account == $A.get("$Label.c.ServiceProfiling_EntitltementNoAccount") &&
						row.entitlement.includes($A.get("$Label.c.ServiceProfiling_DowRepSicContingency"))
			);
			if(entWithoutAccount.length > 0){
				let result = [];
				result.push(entWithoutAccount[0].entitlement[entWithoutAccount[0].entitlement.indexOf($A.get("$Label.c.ServiceProfiling_DowRepSicContingency"))]);
				component.set("v.entitlementsWithoutAccount", result);
			}
			
			if(component.get("v.profilingTableInnerData").length > 0){
				component.find("profilingTable").addNewData(profilingData);
			// If there is no data in the table, it means it needs to be built
			} else {
				var grouping = [];
				var countriesMap = component.get("v.countriesMap");
				for(var key in profilingData){
					if(!grouping.includes(profilingData[key].account.substring(0,2))){
						grouping.push(profilingData[key].account.substring(0,2));
					}
				}
				component.find("profilingTable").buildTable(profilingData, grouping);
			}
			component.set("v.profilingTableExpanded", true);
		} 
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to clear the values in the
					ent and acc multipicklists
    History
    <Date>			<Author>			<Description>
	31/01/2020		Guillermo Giral   	Initial version
	*/
	clearMultipicklist : function(component, event){
		var defaultAccs = component.get("v.defaultAccounts");
		var defaultEnts = component.get("v.defaultEntitlements");
		component.set("v.accounts", defaultAccs);
		component.set("v.entitlements", defaultEnts);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to show the entitlements pop-up and
					pass it the necessary info
    History
    <Date>			<Author>			<Description>
	04/02/2020		Guillermo Giral   	Initial version
	*/
	handleEntitlementsUpdate : function(component, event){
		var params = event.getParams();
		if(params.entitlementEditClicked){
			component.set("v.selectedEntitlements", params.currentEntitlements);
			component.set("v.currentAccount", params.currentAccount);
			component.set("v.displayEntitlementModal", true);
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to update the corresponding account
					with the selected entitlements
    History
    <Date>			<Author>			<Description>
	04/02/2020		Guillermo Giral   	Initial version
	*/
	updateAccountEntitlements : function(component, event){
		// Update the entitlements
		let params = event.getParams();
		if(params.entitlementEditClicked && params.currentEntitlements.length > 0 && params.currentAccount != null){
			component.find("profilingTable").updateEntitlements(params.currentAccount, params.currentEntitlements);
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function used to check whether any data exists in
					any of the two tables and show the "Remove all" trash icon accordingly
    History
    <Date>			<Author>			<Description>
	19/02/2020		Guillermo Giral   	Initial version
	*/
	checkDataContent : function(component, event){
		component.get("v.entitlementsWithoutAccount").length > 0 || component.get("v.profilingTableContainsData") ? component.set("v.showTrashIcon", true) : component.set("v.showTrashIcon", false);
	}
})