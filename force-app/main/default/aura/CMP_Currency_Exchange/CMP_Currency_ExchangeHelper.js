({
    getInformation : function(component, event) {
        var action = component.get("c.getUserCurrency");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var selectedCurrency = response.getReturnValue();    
                component.set("v.currentUserCurrency", selectedCurrency);
                component.set("v.corporateCurrency", selectedCurrency);
                this.getCompanyCurrencies(component, event, selectedCurrency);                
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
    
    getUpdatingDate : function(component, event, str){
        var action = component.get("c.formatDate");
        action.setParams({
            "dateToStr" : str
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var aux = response.getReturnValue();
                component.set("v.upToDate", aux);
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
    
    getCompanyCurrencies : function(component, event, selectedCurrency) {
        var action = component.get("c.getCompanyCurrencies");
        action.setParams({
            "selectedCurrency" : selectedCurrency.IsoCode
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue();
                var custs = [];
                if(conts.length > 0 ){
                    this.getUpdatingDate(component, event, conts[0].LastModifiedDate);
                    for(let i = 0; i < conts.length; i++){
                        custs.push({value:conts[i], key:conts[i].Id});   
                    }
                    component.set("v.corporateCurrencies", custs);
                    component.set("v.end", custs.length);
                    var corporateCurrency = component.get("v.corporateCurrency");    
                    if(corporateCurrency.IsoCode != selectedCurrency.IsoCode){
                        this.exchangeCurrency(component, event, conts);
                    }
                }                
                
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
    selectCurrency: function(component, event, selectedCurrency) {
        if(selectedCurrency != ''){
            var action = component.get("c.getCurrencyInformation");
            action.setParams({
                "str" : selectedCurrency
            });        
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var selectedCurrency = response.getReturnValue(); 
                    selectedCurrency.ConversionRate = 1;
                    component.set("v.currentUserCurrency", selectedCurrency);
                    this.getCompanyCurrencies(component, event, selectedCurrency);
                    var curExEvent = component.getEvent("Currency_Exchanger");
                    curExEvent.setParams({
                        "IsoCode" : selectedCurrency.IsoCode
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
    exchangeCurrency : function(component, event, currencyList){
        
        var action = component.get("c.exchangeCurrency");
        action.setParams({
            "currencyList" : currencyList,
            "selectedCurrency" : component.get("v.currentUserCurrency").IsoCode
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var ret = response.getReturnValue();
                var custs = component.get("v.corporateCurrencies");;
                custs.forEach(function(element) {
                    element.value.ConversionRate = ret[element.value.IsoCode];
                });
                component.set("v.corporateCurrencies", custs);
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
    
    firstPromise : function(component, event, helper) {
        return new Promise($A.getCallback(function(resolve, reject) {
            var x = component.get("v.currentUserCurrency").IsoCode;            
            var whichOne = event.currentTarget.id;
            
            if((x != whichOne) && (whichOne != null) && (whichOne!="undefined") && (whichOne!="")){
                helper.selectCurrency(component, event, whichOne); 
                console.log('whichOne: ' + whichOne);
                console.log("Resolved");
                resolve("Resolved");
            }else{
                console.log('whichOne: ' + whichOne);
                resolve("OK");
                console.log("OK");
            }
        }));
        
    }

})