({    
    goToSwiftTracking : function(component, event, helper) {
        var url = "c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+"&c__agent="+component.get("v.iAccount.bic");
        helper.goTo(component, event,"swifttracking", url);
    },
    goToHistoryOfExtracts : function(component, event, helper){  
        var aux = "globalBalance";
        var url = "c__source="+aux+"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+"&c__lastUpdateAvailableBalance="+component.get("v.iAccount.lastUpdateAvailableBalance");
        helper.goTo(component, event,"movement-history", url);
    },
    goToAccountTransactions : function(component, event, helper){
        var aux = "globalBalance";
        var url = "c__source="+aux+"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance");
        helper.goTo(component, event,"transaction-search", url);
    }
})