({
    
    getCmpId : function(component, event) {
        var iKey = component.get("v.iRegister").key;
        iKey = iKey.replace(/\s/g,"");
        var iTabSelected = component.get("v.iTabSelected");
        component.set("v.cmpId", iTabSelected + "_firstLayer_" + iKey);
    },
    //DO NOT DELETE the following comment lines. They are highly important to display the available options to order the accounts
    //$Label.c.Country
    //$Label.c.currency
    //$Label.c.Corporate
    getCountryName: function(component,event){
        var sortSelected = component.get("v.iSortSelected");
        if(sortSelected == $A.get("$Label.c.Country")){
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
    
    //DO NOT DELETE the following comment lines. They are highly important to display the available options to order the accounts
    //$Label.c.Country
    //$Label.c.currency
    //$Label.c.Corporate
    getInformation : function(component, event){  
        var sortSelected = component.get("v.iSortSelected");
        
        if(sortSelected == undefined) {
            sortSelected = $A.get("$Label.c.Country");
            this.sumBalanceExperto(component, event);
        }
        if(sortSelected == $A.get("$Label.c.Country")){
            this.getAccountsPerCountry(component, event);
            this.sumBalanceExperto(component, event);
        }
        if(sortSelected == $A.get("$Label.c.currency")){
            this.getAccountsPerCurrency(component, event);            
            this.sumBalanceCurrency(component, event);
        }
        if(sortSelected == $A.get("$Label.c.Corporate")){
            this.getAccountsPerSubsidiary(component, event);
            this.sumBalanceExperto(component, event);
        } 
    },
    //SNJ - 27/04/2020 - Zero values format
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
                        if(num == 0) {
                            component.set("v.bookBalance", "0.00");
                        }else{
                            component.set("v.bookBalance", num); 
                        }                        
                        
                        
                    }
                    if(key == "countryAvailableBalance"){
                        let num = conts[key];                     
                        if(num == 0){
                            component.set("v.availableBalance", "0.00");
                        }else{
                            component.set("v.availableBalance", num);
                        }
                        
                        
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
    toggleDropdown : function (component, event, whichOne, whichKey){   
        if(whichKey!=undefined){
            var iOptionsId = whichKey + "_cardParent"; 
            var elementSelect = document.getElementById(iOptionsId);
            var rowsSe= elementSelect.getElementsByClassName('contentAccount'); 
            Array.from(rowsSe).forEach(function(element) {             
                element.classList.toggle("slds-show");
                element.classList.toggle("slds-hide"); 
            });     
        }
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
        iAccounts.forEach(function(e1) {
            var aux_i = e1.value});        
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
    },
    sumBalanceCurrency :function(component, event){
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
            "accountList" : lst
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue(); 
                for ( var key in conts ) {
                    if(key == "countryBookBalance"){
                        let num = conts[key];                       
                        if(num == 0) {
                            component.set("v.bookBalance", "0.00");
                        }else{
                            component.set("v.bookBalance", num); 
                        }                        
                        
                        
                    }
                    if(key == "countryAvailableBalance"){
                        let num = conts[key];                     
                        if(num == 0){
                            component.set("v.availableBalance", "0.00");
                        }else{
                            component.set("v.availableBalance", num);
                        }
                        
                        
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
    //SNJ - 29/05/2020 - Sum the values using exchange currency data retrieved from Service
    sumBalanceExperto : function(component, event){
        var iCurrencyList = component.get("v.iCurrencyList");
        var iCurrentCurrency = component.get("v.iCurrency");
        var iAccountMap = component.get("v.accounts");
        var lst = []; 
        

        iAccountMap.forEach(function(e1) {
            var aux_i = e1.value;
            aux_i.forEach(function(e2){
                lst.push(e2);                
            });            
        });

      
       var action = component.get("c.getSumBalanceExperto");
        action.setParams({ 
            "currentCurrency" : iCurrentCurrency,
            "accountList" : lst,
            "currencies" : iCurrencyList 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue(); 
                for ( var key in conts ) {
                    if(key == "countryBookBalance"){
                        let num = conts[key];                       
                        if(num == 0) {
                            component.set("v.bookBalance", "0.00");
                        }else{
                            component.set("v.bookBalance", num); 
                        }                        
                        
                        
                    }
                    if(key == "countryAvailableBalance"){
                        let num = conts[key];                        
                        if(num == 0){
                            component.set("v.availableBalance", "0.00");
                        }else{
                            component.set("v.availableBalance", num);
                        }
                        
                        
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