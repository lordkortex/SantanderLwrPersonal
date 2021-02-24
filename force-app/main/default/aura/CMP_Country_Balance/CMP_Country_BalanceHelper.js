({ 
    getCmpId: function(component,event) { 
        var currentCountry = component.get("v.currentCountry");
        var cmpId="";
        cmpId = currentCountry.replace(/\s/g,""); 
        component.set("v.cmpId", cmpId);
    },
    getCountryName: function(component,event){
        var action = component.get("c.getCountryName");
        action.setParams({
            "ISOCode" : component.get("v.currentCountry")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.countryName", response.getReturnValue());
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
    getInformation: function(component,event) { 
        
        var conts = component.get("v.receivedList");
        var currencies = [];
        
        for(var i = 0; i < conts.length; i++){         
            if(!currencies.includes(conts[i].curencyCodeAvailableBalance)){
                currencies.push(conts[i].curencyCodeAvailableBalance);                
            }
        }
        component.set("v.currencyList",currencies);
        
        var action = component.get("c.generateInformation");
        action.setParams({
            "accountList" : component.get("v.receivedList"),
            "currencyList" : currencies
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                var custs = [];
                var conts = response.getReturnValue();
                
                for (var key in conts ) {
                    custs.push({value:conts[key], key:key});
                }
                component.set("v.currencyAccountList", custs);
                this.sumBalance(component, event);
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
    getCurrencyAccountMethod: function(component,event) {
        var action = component.get("c.generateInformation");
        action.setParams({
            "accountsList" : component.get("v.accountsList"),
            "currencyList" : component.get("v.availableCurrencies")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var custs = [];
                var conts = response.getReturnValue();
                for ( var key in conts ) {
                    custs.push({value:conts[key], key:key});
                }
                component.set("v.currencyAccountList", custs);
            }
            else{
                console.log(">>> SNJ ERROR");
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
    showHideAction : function(component,event,secId) { 
        var acc = document.querySelectorAll("#"+secId); 
        acc.forEach(function(element) {             
            element.classList.toggle("slds-show");
            element.classList.toggle("slds-hide");
        });
    },
    
    sumBalance :function(component, event){
        
        var currentCurrency = component.get("v.currentUserCurrency");
        var accountMap = component.get("v.currencyAccountList");
        var lst = [];
        accountMap.forEach(function(e1) {
            var aux_i = e1.value;
            aux_i.forEach(function(e2){
                lst.push(e2);
                console.log('>>> country sum balance: ' + e2.curencyCodeAvailableBalance +' ' +e2.amountMainBalance);
            });
            
        });
        
        var action = component.get("c.getSumBalance");
        action.setParams({
            "currentCurrency" : currentCurrency,
            "accountList" : lst
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue(); 
                for ( var key in conts ) {
                    if(key == "countryBookBalance"){
                        component.set("v.countryBookBalance", conts[key]);
                    }
                    if(key == "countryAvailableBalance"){
                        component.set("v.countryAvailableBalance", conts[key]);
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
    }
})