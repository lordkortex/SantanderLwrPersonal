({
    //Get currencies information  
    getInformation : function(component, event) {        
        var action = component.get("c.getUserCurrency");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {             
                var userCurrency = response.getReturnValue(); 
                var accountCurrency = component.get("v.accountCurrencies");
                var currencyList = ['EUR','USD','GBP'];
                
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
        $A.enqueueAction(action); 
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
                var iCorporateCurrency = "";
                var thisTest = [];
                
                for(var i=0; i<iReturn.length; i++){
                    iDates.push(new Date(iReturn[i].iLastModifiedDate));
                    
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
                
                this.getDateOfUpdate(component, iDates);
                
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
    
    //Get Date of the last updated currency and set corporateCurrencyValue
    getDateOfUpdate : function(component, iDates){
        var maximumDate=new Date(Math.max.apply(null, iDates));
        var action = component.get("c.formatDate");
        action.setParams({
            "dateToStr" : maximumDate
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var iReturn = response.getReturnValue();
                component.set("v.upToDate", iReturn);
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
    
    selectCurrency: function(component, event, iCurrency) {
        if(iCurrency != ''){
            var action = component.get("c.getCurrencyInformation");
            action.setParams({
                "iCurrency" : iCurrency
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var selectedCurrency = response.getReturnValue();                    
                    selectedCurrency.iConversionRate=1;
                    component.set("v.currentCurrency", selectedCurrency);
                    this.getCurrencyList(component, event, selectedCurrency);
                    
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
            $A.enqueueAction(action); 
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
    }
})