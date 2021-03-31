({ 	
    itemOne : function(component, event, helper) {
        alert("N/A");
    },
    goToSwiftTracking : function(component, event, helper) {
       var url = "c__accountNumber="+component.get("v.accountItem.displayNumber")+"&c__bank="+component.get("v.accountItem.bankName")+"&c__mainAmount="+component.get("v.accountItem.amountMainBalance")+"&c__availableAmount="+component.get("v.accountItem.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.accountItem.currencyCodeAvailableBalance")+"&c__agent="+component.get("v.accountItem.bic");
        console.log(">>> goToSwiftTracking: " + url);
        helper.goTo(component, event,"swifttracking", url);
    }
})