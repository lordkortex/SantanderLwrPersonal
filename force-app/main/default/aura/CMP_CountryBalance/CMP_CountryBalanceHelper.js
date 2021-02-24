({
    
    getCmpId : function(component, event) {
        var iKey = component.get("v.iRegister").key;
        iKey = iKey.replace(/\s/g,"");
        var iTabSelected = component.get("v.iTabSelected");
        component.set("v.cmpId", iTabSelected + "_firstLayer_" + iKey);
    },
    //DO NOT DELETE the following comment lines. They are highly important to display the available options to order the accounts
    //$Label.c.GlobalBalanceOrderOne
    //$Label.c.	GlobalBalanceOrderTwo
    //$Label.c.GlobalBalanceOrderThree
    getCountryName: function(component,event){
        var sortSelected = component.get("v.iSortSelected");
        if(sortSelected == $A.get("$Label.c.GlobalBalanceOrderOne")){
            var action = component.get("c.getCountryName");
            action.setParams({
                "ISOCode" : component.get("v.iRegister.key")
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
        }     
    },
    getInformation : function(component, event){  
        var sortSelected = component.get("v.iSortSelected");    
        if(sortSelected == $A.get("$Label.c.GlobalBalanceOrderOne")){
            this.getAccountsPerCurrency(component, event);           
        }
        if(sortSelected == $A.get("$Label.c.GlobalBalanceOrderTwo")){
               this.getAccountsPerCurrency(component, event);
        }
        if(sortSelected == $A.get("$Label.c.GlobalBalanceOrderThree")){
             this.getAccountsPerCountry(component, event);
        }
        this.sumBalance(component, event);
    },
    sumBalance :function(component, event){
        
        var iCurrentCurrency = component.get("v.iCurrency");
        var iAccountMap = component.get("v.accounts");
        var lst = [];
        iAccountMap.forEach(function(e1) {
            var aux_i = e1.value;
            aux_i.forEach(function(e2){
                lst.push(e2);
            });            
        });
        var action = component.get("c.getSumBalance");
        action.setParams({
            "currentCurrency" : iCurrentCurrency,
            "accountList" : lst
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue(); 
                for ( var key in conts ) {
                    if(key == "countryBookBalance"){
                        let num = conts[key];
                        component.set("v.bookBalance", num.toFixed(2));
                    }
                    if(key == "countryAvailableBalance"){
                        let num = conts[key];
                        component.set("v.availableBalance", num.toFixed(2));
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
    toggleDropdown : function (component, event, whichOne){   
        var iComponent = document.querySelectorAll("#"+whichOne);
        iComponent.forEach(function(element) {             
            element.classList.toggle("slds-show");
            element.classList.toggle("slds-hide");
        });        
    },
    getAccountsPerCurrency : function(component, event){
        var iReceivedAccounts = component.get("v.iRegister").value;
        var iAccounts = [];
        var iCurrencies = [];
        for(var i = 0; i < iReceivedAccounts.length; i++){
            if(!iCurrencies.includes(iReceivedAccounts[i].currencyCodeAvailableBalance)){                
                iCurrencies.push(iReceivedAccounts[i].currencyCodeAvailableBalance);   
            }           
        }
        for(var j in iCurrencies){
            var lst = [];
            for(var z = 0; z < iReceivedAccounts.length; z++){                
                if(iCurrencies[j] == iReceivedAccounts[z].currencyCodeAvailableBalance){
                    lst.push(iReceivedAccounts[z]);
                }
            }
            
            iAccounts.push({value: lst, key: iCurrencies[j]});
        }
        component.set("v.accounts", iAccounts);
    },
    getAccountsPerCountry : function(component, event){
        var iReceivedAccounts = component.get("v.iRegister").value;
        var iAccounts = [];
        var iCountries = [];
        for(var i = 0; i < iReceivedAccounts.length; i++){
            if(!iCountries.includes(iReceivedAccounts[i].country)){                
                iCountries.push(iReceivedAccounts[i].country);   
            } 
        }
        for(var j in iCountries){
            var lst = [];
            for(var z = 0; z < iReceivedAccounts.length; z++){
                if(iCountries[j] == iReceivedAccounts[z].country){
                    lst.push(iReceivedAccounts[z]);
                }
            }
            iAccounts.push({value: lst, key: iCountries[j]});
        }
        component.set("v.accounts", iAccounts);
    },
    getAccountsPerSubsidiary : function(component, event){
        var iReceivedAccounts = component.get("v.iRegister").value;
        var iAccounts = [];
        var iSubsidiaries = [];
              for(var i = 0; i < iReceivedAccounts.length; i++){
            if(!iSubsidiaries.includes(iReceivedAccounts[i].subsidiaryName)){                
                iSubsidiaries.push(iReceivedAccounts[i].subsidiaryName);   
            } 
        }
        for(var j in iSubsidiaries){
            var lst = [];
            for(var z = 0; z < iReceivedAccounts.length; z++){
                if(iSubsidiaries[j] == iReceivedAccounts[z].subsidiaryName){
                    lst.push(iReceivedAccounts[z]);
                }
            }
            iAccounts.push({value: lst, key: iSubsidiaries[j]});
        }     
        component.set("v.accounts", iAccounts);
    }
 })