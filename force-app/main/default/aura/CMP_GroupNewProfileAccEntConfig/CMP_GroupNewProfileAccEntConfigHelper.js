({
	resetValues : function(component, event, helper) {
		var event = component.getEvent("resetProfileEvent");
		if(event){
			event.fire();
		}
		// Clear accounts
		var accountData = component.get("v.accountData");
		accountData.unfiltered.selected = [];
		accountData.filtered.selected = [];
		accountData.unfiltered.available = component.get("v.accounts");
		accountData.filtered.available = component.get("v.accounts");
		component.set("v.accountData", accountData);	

		// Clear entitlements
		//component.set("v.selectedEntitlements", []);
		var entitlementData = component.get("v.entitlementData");
		entitlementData.unfiltered.selected = [];
		entitlementData.filtered.selected = [];
		entitlementData.unfiltered.available = component.get("v.entitlements");
		entitlementData.filtered.available = component.get("v.entitlements");
		component.set("v.entitlementData", entitlementData);
	}
})