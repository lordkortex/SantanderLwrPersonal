({
    convertDateFormat : function(component, event, helper) {
        var account = component.get("v.iAccount");
        //SNJ - 15/04/2020
        if(account.lastUpdateAvailableBalance != null && account.lastUpdateAvailableBalance != '' && account.lastUpdateAvailableBalance != undefined && typeof account.lastUpdateAvailableBalance != 'undefined'){
            
            account.lastUpdateAvailableBalanceDate = account.lastUpdateAvailableBalance.split(',')[0];
            account.lastUpdateAvailableBalanceTime = account.lastUpdateAvailableBalance.split(',')[1];
            
            if(account.lastUpdateAvailableBalance.includes(" ")){
            var updateHour = account.lastUpdateAvailableBalance.split(' ')[1];
             
           component.set("v.updatedHour", updateHour.split(':')[0] +':'+ updateHour.split(':')[1]);
            }
            component.set("v.iAccount", account);
        }

        // DA - 06/11/2020 - Permisos
        if(component.get("v.isOneTrade") == true){
            console.log(JSON.stringify(account, null, 4));
            if(account.balanceAllowed == false) {
                component.set("v.showAccount", false);
            }
        }
        
    },

    doInit : function(component, event, helper){
        
        helper.getCmpId(component, event);
        helper.formatDate(component, event);
        helper.formatAmount(component, event);
    },
     displayOptions : function(component, event, helper) {
        try{ 
            var iKey = component.get("v.iKey"); 
            var iParentId = component.get("v.iParentId"); 
            if(iKey!=undefined){
                var iOptionsId = iKey + iParentId + "_options"; 
                var elementSelect = document.getElementById(iOptionsId);
                if(elementSelect.classList.contains('showDialogs') == false){
                    var elements = document.getElementsByClassName("showDialogs");
                    elements.forEach(function(element) {             
                         element.classList.remove("showDialogs");
                    });
                	elementSelect.classList.add("showDialogs"); 
                }else{
                     elementSelect.classList.remove("showDialogs"); 
                } 
                //SNJ
               event.stopPropagation();                
            }
        }catch(e){
            console.error(e);    
        }
    },
    /*
    displayOptions : function(component, event, helper){
        component.set("v.isOpen", !component.get("v.isOpen"));   
       
    },*/
    hideOptions: function(component, event, helper){
        component.set("v.isOpen", false);
    },
    parseDate : function(component, event, helper) {
        helper.formatDate(component, event);        
    },
    /*SNJ - 06/05/2020 adding aliasEntidad, codigoEmisora & codigoCuenta*/ 
    goToAccountTransactions : function(component, event, helper) {
        var aux = "globalBalance";
        //OLD
        //var url = "c__source="+aux+"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance") + "&c__alias="+component.get("v.iAccount.alias") + "&c__lastUpdate="+component.get("v.isLastUpdate")+"&c__country="+component.get("v.iAccount.country")+"&c__countryName="+component.get("v.iAccount.countryName")+"&c__aliasBank="+component.get("v.iAccount.bankName")+"&c__bic="+component.get("v.iAccount.bic")+"&c__accountCode="+component.get("v.iAccount.codigoCuenta")+"&c__bookDate="+component.get("v.iAccount.lastUpdateAvailableBalance")+"&c_valueDate="+component.get("v.iAccount.valueDate");
        var url = 
        "c__source="+aux+
        "&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+
        "&c__accountNumber="+component.get("v.iAccount.displayNumber")+
        "&c__bank="+component.get("v.iAccount.bankName")+
        "&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+
        "&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+
        "&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+
        "&c__alias="+component.get("v.iAccount.alias")+
        "&c__idType="+component.get("v.iAccount.idType")+
        "&c__lastUpdate="+component.get("v.isLastUpdate")+
        "&c__country="+component.get("v.iAccount.country")+
        "&c__aliasBank="+component.get("v.iAccount.bankName")+
        "&c__bic="+component.get("v.iAccount.bic")+
        "&c__accountCode="+component.get("v.iAccount.codigoCuenta")+
        "&c__bookDate="+component.get("v.iAccount.lastUpdateAvailableBalance")+
        "&c__valueDate="+component.get("v.iAccount.valueDate")+
        "&c__codigoBic="+component.get("v.iAccount.codigoBic")+
        "&c__codigoEmisora="+component.get("v.iAccount.codigoEmisora")+
        "&c__aliasEntidad="+component.get("v.iAccount.aliasEntidad")+
        "&c__codigoCuenta="+component.get("v.iAccount.codigoCuenta")+
        "&c__countryName="+component.get("v.iAccount.countryName")
        +"&c__accountsFilters="+JSON.stringify(component.get("v.filters"))
        +"&c__tabs="+component.get("v.isLastUpdate")
        +"&c__sourcePage="+component.get("v.sourcePage")
        +"&c__comesFrom=accountList"
        +"&c__iRegister="+JSON.stringify(component.get("v.iRegister"))
        +"&c__firstAccountCountryList="+JSON.stringify(component.get("v.firstAccountCountryList"))
        +"&c__firstTAccountCountryList="+JSON.stringify(component.get("v.firstTAccountCountryList"))
        +"&c__accountGrouping="+component.get("v.iSortSelected")
        +"&c__consolidationCurrency="+component.get("v.iCurrency")
        +"&c__accountStatus="+component.get("v.iAccount.status");
        
        //AM - 28/09/2020 - Ebury Accounts
        if(component.get("v.iAccount.codigoCorporate") != undefined && component.get("v.iAccount.codigoCorporate") != null){
        url = url + "&c__codigoCorporate="+component.get("v.iAccount.codigoCorporate");
        }
        if(component.get("v.iAccount.dataProvider") != undefined && component.get("v.iAccount.dataProvider") != null){
            url = url + "&c__dataProvider="+component.get("v.iAccount.dataProvider");
        }
        if(component.get("v.iAccount.associatedAccountList") != undefined && component.get("v.iAccount.associatedAccountList") != null){
            url = url + "&c__associatedAccountList="+JSON.stringify(component.get("v.iAccount.associatedAccountList"));
        }

        helper.goTo(component, event,"account-transactions", url);
    },
    goToExtracts : function(component, event, helper) {
        var aux = "globalBalance";
        var url = "c__source="+aux+"&c__accountName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumberAndEntity="+component.get("v.iAccount.displayNumber")+"&c__accountNumberBank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+"&c__lastUpdateAvailableBalance="+component.get("v.iAccount.lastUpdateAvailableBalance")+"&c__codigoBic="+component.get("v.iAccount.codigoBic");
        helper.goTo(component, event,"movementhistorydetail", url);
    },
    goToSwiftTracking : function(component, event, helper) {
        //var url = "c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+"&c__accountNumber="+component.get("v.iAccount.displayNumber")+"&c__bank="+component.get("v.iAccount.bankName")+"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+"&c__agent="+component.get("v.iAccount.bic");
        //helper.goTo(component, event,"payment-details", url);
        var url = 
        "c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")+
        "&c__alias="+component.get("v.iAccount.alias")+
        "&c__bic="+component.get("v.iAccount.bic")+component.get("v.iAccount.paisbic")+component.get("v.iAccount.locatorbic")+component.get("v.iAccount.branch")+
        "&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")+
        "&c__accountNumber="+component.get("v.iAccount.displayNumber")+
        "&c__idType="+component.get("v.iAccount.c__idType")+
        "&c__updateHour="+component.get("v.updatedHour")+
        "&c__date="+component.get("v.iAccount.lastUpdateAvailableBalanceDate")+
        "&c__bank="+component.get("v.iAccount.bankName")+
        "&c__mainAmount="+component.get("v.iAccount.amountMainBalance")+
        "&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")+
        "&c__lastUpdate="+component.get("v.isLastUpdate")+
        "&c__country="+component.get("v.iAccount.countryName")+
        "&c__aliasBank="+component.get("v.iAccount.bankName")+
        "&c__codigoBic="+component.get("v.iAccount.codigoBic")+
        "&c__isOneTrade="+component.get("v.isOneTrade")+
        "&c__source=fromAccount"+
        "&c__showFilters=false";
        /*
		//AM - 01/04/2020 - Account Payments Tracker
		if(!component.get("v.isOneTrade")){
            url+= "&c__showFilters=true";
																				
        }else{
            url+= "&c__showFilters=false";
													  
        }*/
        helper.goTo(component, event,"international-payments-tracker", url); 
		
				
										  
													  
		   
    },
    /*SNJ - 15/04/2020 adding codigoEmisora & codigoCuenta*/
    /*SNJ - 25/04/2020 adding codigoBic*/
    /*SNJ - 06/05/2020 adding aliasEntidad*/ 
    goToAccountDetails : function(component, event, helper) {
        console.log('out');
        console.log(JSON.stringify(component.get("v.filters")));
        var url = "c__source=globalBalance"
        +"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")
        +"&c__accountNumber="+component.get("v.iAccount.displayNumber")
        +"&c__idType="+component.get("v.iAccount.idType")
        +"&c__bank="+component.get("v.iAccount.bankName")
        +"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")
        +"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")
        +"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")
        +"&c__alias="+component.get("v.iAccount.alias")
        +"&c__lastUpdate="+component.get("v.isLastUpdate")
        +"&c__country="+component.get("v.iAccount.countryName")
        +"&c__aliasBank="+component.get("v.iAccount.bankName")
        +"&c__bic="+component.get("v.iAccount.bic")
        +"&c__codigoEmisora="+component.get("v.iAccount.codigoEmisora")
        +"&c__codigoCuenta="+component.get("v.iAccount.codigoCuenta")
        +"&c__filters="+JSON.stringify(component.get("v.filters"))
        +"&c__tabs="+component.get("v.isLastUpdate")
        +"&c__sourcePage="+component.get("v.sourcePage")
        +"&c__codigoBic="+component.get("v.iAccount.codigoBic")
        +"&c__comesFrom=accountList"
        +"&c__iRegister="+JSON.stringify(component.get("v.iRegister"))
        +"&c__firstAccountCountryList="+JSON.stringify(component.get("v.firstAccountCountryList"))
        +"&c__firstTAccountCountryList="+JSON.stringify(component.get("v.firstTAccountCountryList"))
        +"&c__accountGrouping="+component.get("v.iSortSelected")
        +"&c__consolidationCurrency="+component.get("v.iCurrency")
        +"&c__aliasEntidad="+component.get("v.iAccount.aliasEntidad");

        //AM - 28/09/2020 - Ebury Accounts
        if(component.get("v.iAccount.codigoCorporate") != undefined && component.get("v.iAccount.codigoCorporate") != null){
            url = url + "&c__codigoCorporate="+component.get("v.iAccount.codigoCorporate");
            }
            if(component.get("v.iAccount.dataProvider") != undefined && component.get("v.iAccount.dataProvider") != null){
                url = url + "&c__dataProvider="+component.get("v.iAccount.dataProvider");
            }
            if(component.get("v.iAccount.associatedAccountList") != undefined && component.get("v.iAccount.associatedAccountList") != null){
                url = url + "&c__associatedAccountList="+JSON.stringify(component.get("v.iAccount.associatedAccountList"));
            }
        

        
        helper.goTo(component, event,"account-detail-transaction", url);
    },
    displayAmountOne : function(component, event, helper){
        if(!component.get("v.isLoading")){
            component.find("bookBalanceRow").formatNumber(component.get('v.userPreferredNumberFormat'));
        }
        
    },
    displayAmountTwo : function(component, event, helper){
        if(!component.get("v.isLoading")){
            component.find("avaibleBalanceRow").formatNumber(component.get('v.userPreferredNumberFormat'));
        }
    },

    goToHistoryOfExtracts : function(component, event, helper) {

        var url = "c__comesFrom=Accounts"
        +"&c__accountNumber="+component.get("v.iAccount.displayNumber")
        +"&c__bankName="+component.get("v.iAccount.bankName")
        +"&c__subsidiaryName="+component.get("v.iAccount.subsidiaryName")
        +"&c__accountName="+component.get("v.iAccount.alias")
        +"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")
        +"&c__accountCode="+component.get("v.iAccount.codigoCuenta");

        // +"&c__aliasBank="+component.get("v.iAccount.bankName")
        // +"&c__mainAmount="+component.get("v.iAccount.amountMainBalance")
        // +"&c__availableAmount="+component.get("v.iAccount.amountAvailableBalance")
        // +"&c__currentCurrency="+component.get("v.iAccount.currencyCodeAvailableBalance")

        // +"&c__lastUpdate="+component.get("v.isLastUpdate")
        // +"&c__country="+component.get("v.iAccount.countryName")
        // +"&c__bic="+component.get("v.iAccount.bic")
        // +"&c__codigoEmisora="+component.get("v.iAccount.codigoEmisora")
        // +"&c__codigoCuenta="+component.get("v.iAccount.codigoCuenta")
        // +"&c__filters="+JSON.stringify(component.get("v.filters"))
        // +"&c__tabs="+component.get("v.isLastUpdate")
        // +"&c__sourcePage="+component.get("v.sourcePage")
        // +"&c__codigoBic="+component.get("v.iAccount.codigoBic")
        // +"&c__iRegister="+JSON.stringify(component.get("v.iRegister"))
        // +"&c__firstAccountCountryList="+JSON.stringify(component.get("v.firstAccountCountryList"))
        // +"&c__firstTAccountCountryList="+JSON.stringify(component.get("v.firstTAccountCountryList"))
        // +"&c__accountGrouping="+component.get("v.iSortSelected")
        // +"&c__consolidationCurrency="+component.get("v.iCurrency")
        // +"&c__aliasEntidad="+component.get("v.iAccount.aliasEntidad");

        
        helper.goTo(component, event,"history-of-statements", url);
    }
})