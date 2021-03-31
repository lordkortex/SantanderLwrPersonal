({
    doInit : function(component, event, helper){
        console.log(component.get("v.iAccount"));
        helper.getCmpId(component, event);
        helper.formatDate(component, event);
        helper.formatAmount(component, event);
    },
    displayOptions : function(component, event, helper) {
        try{
            var iCmpId = component.get("v.cmpId");
            if(iCmpId!=undefined){
                var iOptionsId = iCmpId + "_options";
                var elements = document.querySelectorAll("#"+iOptionsId);
                elements.forEach(function(element) {             
                    element.classList.toggle("slds-is-close");
                    element.classList.toggle("slds-is-open");
                });
                event.stopPropagation();
            }
        }catch(e){
            console.error(e);    
        }
    },
    parseDate : function(component, event, helper) {
        helper.formatDate(component, event);        
    },
    goToAccountTransactions : function(component, event, helper) {
        var aux = "globalBalance";
        var url = "c__source="+aux+"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance");
        helper.goTo(component, event,"transaction-search", url);
    },
    goToExtracts : function(component, event, helper) {
        var aux = "globalBalance";
        var url = "c__source="+aux+"&c__accountName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumberAndEntity="+component.get("v.iAccount.displayNumber")+"&c__accountNumberBank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+"&c__lastUpdateAvailableBalance="+component.get("v.iAccount.lastUpdateAvailableBalance");
        helper.goTo(component, event,"movementhistorydetail", url);
    },
    goToSwiftTracking : function(component, event, helper) {
        var url = "c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+"&c__agent="+component.get("v.iAccount.bic");
        helper.goTo(component, event,"swifttracking", url);
    }
})