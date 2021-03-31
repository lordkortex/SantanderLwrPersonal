({
    doInit : function(component, event, helper) {
        var dropDownValues = [$A.get("$Label.c.Country"), $A.get("$Label.c.Corporate")];
        component.set("v.dropdownValues", dropDownValues);
    },

    goToAccounts : function(component, event, helper) {
        console.log("entra");
        var url = "&c__tabs="+component.get("v.lastUpdateSelected")+"&c__dropdownSelectedValue="+component.get("v.dropdownSelectedValue");
        url+="&c__consolidationCurrency="+component.get("v.selectedCurrency")+"&c__accountGrouping="+component.get("v.dropdownSelectedValue")+"&c__comesFromGP=";
        component.find("Service").redirect("accounts", url);
    },

    updateData : function(component, event, helper) {
        if(component.get("v.dataIsLoaded")){
            
            component.find("displayAmount").formatNumber(component.get("v.userPreferredNumberFormat"));
            component.find("displayAmount2").formatNumber(component.get("v.userPreferredNumberFormat"));
        }
    }

})