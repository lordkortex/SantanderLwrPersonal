({    
    goToSwiftTracking : function(component, event, helper) {
        var url = "c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+"&c__agent="+component.get("v.iAccount.bic")+component.get("v.iAccount.paisbic")+component.get("v.iAccount.locatorbic")+component.get("v.iAccount.branch");
        //helper.goTo(component, event,"payment-details", url);
        console.log(url);
        component.find("Service").redirect("payment-details", url);
    },
    goToHistoryOfExtracts : function(component, event, helper){  
        var aux = "globalBalance";
        var url = "c__source="+aux+"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+"&c__lastUpdateAvailableBalance="+component.get("v.iAccount.lastUpdateAvailableBalance");
        helper.goTo(component, event,"movement-history", url);
    },
    goToAccountTransactions : function(component, event, helper){
        var aux = "globalBalance";
        var url = "c__source="+aux+"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance");
        helper.goTo(component, event,"account-transactions", url);

    }/*,
        goToAccountDetails : function(component, event, helper) {
        var url = "c__source=globalBalance"
        +"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")
        +"&c__accountNumber="+component.get("v.iAccount.displayNumber")
        +"&c__bank="+component.get("v.iAccount.bankName")
        +"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")
        +"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")
        +"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")
        +"&c__alias="+component.get("v.iAccount.alias")
        +"&c__lastUpdate="+component.get("v.isLastUpdate")
        +"&c__country="+component.get("v.iAccount.countryName")
        +"&c__aliasBank="+component.get("v.iAccount.bankName")
        +"&c__bic="+component.get("v.iAccount.bic")
        +"&c__filters="+JSON.stringify(component.get("v.filters"))
        +"&c__tabs="+component.get("v.isLastUpdate")
        +"&c__sourcePage="+component.get("v.sourcePage")
        +"&c__comesFrom=accountList"
        +"&c__iRegister="+JSON.stringify(component.get("v.iRegister"))
        +"&c__firstAccountCountryList="+JSON.stringify(component.get("v.firstAccountCountryList"))
        +"&c__firstTAccountCountryList="+JSON.stringify(component.get("v.firstTAccountCountryList"));

        console.log(url);
        helper.goTo(component, event,"account-detail-transaction", url);
    }*/
})