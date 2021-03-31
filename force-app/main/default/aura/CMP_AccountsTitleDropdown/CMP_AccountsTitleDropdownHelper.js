({
    selectTab : function(component, activateTabId, diactivateTabId) {       
        var activateTab = component.find(activateTabId);        
        var diactivateTab = component.find(diactivateTabId);
        //show tab1
        $A.util.addClass(activateTab, "tabEnabled");
        $A.util.removeClass(activateTab, "tabDisabled");        
        //hide tab2
        $A.util.removeClass(diactivateTab, "tabEnabled");
        $A.util.addClass(diactivateTab, "tabDisabled");        
        var lst = [];
        lst.push(diactivateTabId); 
        //fire event
        var tabEvt = component.getEvent("GlobalBalanceTab");
        tabEvt.setParams({
            "activateTabId" : activateTabId,
            "deactivateTabs" : lst
        });
        tabEvt.fire();        
    },
    //
    //Get currencies information  
    //SNJ - 07/05/2020 - Select currency of the user
    getInformation : function(component, event) {
        
       // var userCurrency = $A.get("$Locale.currencyCode");
       var userCurrency = component.get("v.selectedCurrency");
        var accountCurrency = component.get("v.accountCurrencies");
        /*if(!accountCurrency.includes(userCurrency)){
            accountCurrency.push(userCurrency);
        }*/
        component.set("v.isoCodeList", accountCurrency);
        component.set("v.thisTest", accountCurrency);
        component.set("v.selectedCurrency",userCurrency);
  
        /*
        var action = component.get("c.getUserCurrency");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {             
                var userCurrency = response.getReturnValue(); 
                var accountCurrency = component.get("v.accountCurrencies");
                var currencyList = [];
                for(var i=0;  i< accountCurrency.length; i++){
                    if(!currencyList.includes(accountCurrency[i])){
                        currencyList.push(accountCurrency[i]);  
                    }                   
                }
                if(!currencyList.includes(userCurrency.iIsoCode)){
                    currencyList.push(userCurrency.iIsoCode); 
                }                
                component.set("v.isoCodeList", currencyList); 
                this.getCurrencyList(component, event, userCurrency);                
            }
            else{
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action); */
    },
    
    //Get available currencies por logged user
    getCurrencyList : function(component, event, currentCurrency){
        var currencyList = component.get("v.isoCodeList");
        //var iCurrentCurrency = currentCurrency.IsoCode__c;
        var iCurrentCurrency = currentCurrency.iIsoCode;
        var action = component.get("c.getCurrenciesList");
        action.setParams({
            "userCurrency" : iCurrentCurrency,
            "currencyList" : currencyList
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var iReturn = response.getReturnValue();
                var iDates = [];
                var accCurrencies =[];
                var iCorporateCurrency = "";
                var thisTest = [];
                var showToast;
                var failCurrencies =[];
                
                
                for(var i=0; i<iReturn.length; i++){
                    
                    iDates.push(new Date(iReturn[i].iLastModifiedDate));
                    accCurrencies.push(iReturn[i].iIsoCode);
                    if(iReturn[i].iIsCorporate == true){                
                        component.set("v.corporateCurrency", iReturn[i]);
                        iCorporateCurrency = iReturn[i].iIsoCode;
                    }
                    thisTest.push(iReturn[i].iIsoCode);
                } 
                
                var aux = currentCurrency;
                
                aux.iConversionRate = 1;
                component.set("v.currentCurrency", aux);
                
                
                if(iCurrentCurrency != iCorporateCurrency){
                    this.exchangeCurrency(component, event, aux.iIsoCode, iReturn);
                }else{
                    component.set("v.currencyList",iReturn);
                    component.set("v.thisTest", thisTest);
                    
                }
                for(var i= 0; i<currencyList.length; i++){
                    if(accCurrencies.includes(currencyList[i])== false){
                        showToast= true;
                        failCurrencies.push(currencyList[i]);
                    }
                }
                
                //this.getDateOfUpdate(component, iDates);
                
                /*  if(showToast == true){
                    console.log('lanzamos evento toast');
                    var cmpEvent = component.getEvent("launchToast");
                    cmpEvent.setParams({
                                    "message" :  $A.get("$Label.c.currencyExchangeNotAvailable") + ' ' + failCurrencies.toString(),
                                    "type" : 'warning',
                                    "show" : true
                                    });
                    cmpEvent.fire();    
                } */    
            }
            else{
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);         
    },
    
    //Get Date of the last updated balance
    getDateOfUpdate : function(component, iDates, isLastUpdate, theUpdate, theUpdateMain){
        
        if((theUpdate == null && theUpdate == '' && theUpdate == undefined) && (theUpdateMain == null && theUpdateMain == '' && theUpdateMain == undefined)){
            var datesArray = [];        
            for(var d in iDates){
                datesArray.push(Date.parse(iDates[d]));
            }
            
            var maximumDate = new Date(Math.max.apply(null, datesArray)).toISOString();
            component.set("v.upToDate", maximumDate);
            if(isLastUpdate){
                component.set("v.upToHour", maximumDate.split('T')[1].substring(0,5));
            }else {
                component.set("v.upToHour", "");
            }
            
        }
        else{
            component.set("v.upToDate", theUpdateMain);
            if(isLastUpdate){
                component.set("v.upToHour", theUpdate.split(' ')[1].substring(0,5));
            }else {
                component.set("v.upToHour", "");
            }
        }
        
        
        
    },
    
    //SNJ - 07/05/2020 - paropagate selected currency
    selectCurrency: function(component, event, iCurrency) {
        if(iCurrency != ''){
            component.set("v.currentCurrency", iCurrency);
            
            var curExEvent = component.getEvent("Currency_Exchanger");
            curExEvent.setParams({
                "IsoCode" : iCurrency
            });
            curExEvent.fire();           
            /*   var action = component.get("c.getCurrencyInformation");
            action.setParams({
                "iCurrency" : iCurrency
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var selectedCurrency = response.getReturnValue();                    
                    selectedCurrency.iConversionRate=1;
                    component.set("v.currentCurrency", selectedCurrency);
                    //this.getCurrencyList(component, event, selectedCurrency);
                    
                    var curExEvent = component.getEvent("Currency_Exchanger");
                    curExEvent.setParams({
                        "IsoCode" : selectedCurrency.iIsoCode
                    });
                    curExEvent.fire();
                }
                else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action); */
        }
    },
    
    exchangeCurrency : function(component, event, currentCurrency, currencyList){
        var action = component.get("c.exchangeCurrency");
        action.setParams({
            "currencyList" : component.get("v.isoCodeList"),
            "selectedCurrency" : currentCurrency
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var ret = response.getReturnValue();
                
                var thisTest = [];
                for(var i=0; i<currencyList.length; i++){
                    //currencyList[i].ConversionRate__c = ret[currencyList[i].IsoCode__c];
                    //SNJ
                    currencyList[i].iConversionRate = ret[currencyList[i].iIsoCode];
                    thisTest.push(currencyList[i].iIsoCode);
                }
                component.set("v.currencyList", currencyList);
                component.set("v.thisTest", thisTest);
            }
            else{
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    closeDropdown : function (component, event){
        var changeElement_one = component.find("dropdownCurrency");        
        $A.util.toggleClass(changeElement_one, "slds-is-open");
        $A.util.toggleClass(changeElement_one, "slds-is-close");
    },
    selectedCurrency : function(component, event){
        
        
        console.log("BLUR helper");
    },
    
    goTo : function (component, event, page, url){
        this.encrypt(component, url).then(function(results){
            let navService = component.find("navService");
            let pageReference = {
                type: "comm__namedPage", 
                attributes: {
                    pageName: page
                },
                state: {
                    params : results
                }
            }
            navService.navigate(pageReference); 
        });
    }
    
})