({
    // Do NOT Delete the following commented labels because this is to ensure that they are preloaded
    // $Label.c.LastUpdate
    // $Label.c.EndOfDay
    initData :  function (component, event, tab){
        
        var action = component.get("c.initClass");
        var tabLabel = "";
        if(tab == "EndOfDayTab"){
            tabLabel = $A.get("$Label.c.EndOfDay");
        }
        else{
            tabLabel = $A.get("$Label.c.LastUpdate");
        }
        
        action.setParams({
            "iWhen" : tabLabel
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var iReturn = response.getReturnValue();
                console.log("INTERNATIONAL");
                console.log(iReturn);
                if(tabLabel == $A.get("$Label.c.EndOfDay")){
                    component.set("v.tGlobalBalance", iReturn);
                }else{
                    component.set("v.rGlobalBalance", iReturn);
                }                
                this.orderByCountry(component, event, tabLabel);
                this.orderByCurrency(component, event, tabLabel);
                this.orderBySubsidiary(component, event, tabLabel);
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
    orderByCountry : function(component, event, tabLabel){
        var action = component.get("c.orderByCountry");
        var iAccountList;
        var iCountries;
        
        if(tabLabel == $A.get("$Label.c.LastUpdate")){
            iAccountList = component.get("v.rGlobalBalance").accountList;
            iCountries = component.get("v.rGlobalBalance").countryList; 
        }
        if(tabLabel == $A.get("$Label.c.EndOfDay")){
            iAccountList = component.get("v.tGlobalBalance").accountList;
            iCountries = component.get("v.tGlobalBalance").countryList;
        }
        
        action.setParams({
            "iCountries" : iCountries,
            "iAccountList" : iAccountList
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var iReturn = response.getReturnValue();               
                var custs = [];                
                for(var key in iReturn){
                    var account = iReturn[key];
                    custs.push({value:account, key:key});
                }
                if(tabLabel == $A.get("$Label.c.LastUpdate")){
                    component.set("v.accountCountryList", custs); 
                }
                if(tabLabel == $A.get("$Label.c.EndOfDay")){
                    component.set("v.tAccountCountryList", custs); 
                }
                
                $A.util.addClass(component.find("spinner"), "slds-hide");
                $A.util.removeClass(component.find("spinner"), "slds-show");
                
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
    orderByCurrency : function(component, event, tabLabel) {
        var action = component.get("c.orderByCurrency");
        var iAccountList;
        var iCurrencies;
        
        if(tabLabel == $A.get("$Label.c.LastUpdate")){
            iAccountList = component.get("v.rGlobalBalance").accountList;
            iCurrencies = component.get("v.rGlobalBalance").currencyList; 
        }
        if(tabLabel == $A.get("$Label.c.EndOfDay")){
            iAccountList = component.get("v.tGlobalBalance").accountList;
            iCurrencies = component.get("v.tGlobalBalance").currencyList;
        }
        action.setParams({
            "iCurrencies" : iCurrencies,
            "iAccountList" : iAccountList
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var iReturn = response.getReturnValue();
                var conts = response.getReturnValue();
                var custs = [];                
                for(var key in iReturn){
                    var account = iReturn[key];
                    custs.push({value:account, key:key});
                }
                if(tabLabel == $A.get("$Label.c.LastUpdate")){
                    component.set("v.accountCurrencyList", custs);
                }
                if(tabLabel == $A.get("$Label.c.EndOfDay")){
                    component.set("v.tAccountCurrencyList", custs);
                }
                
                $A.util.addClass(component.find("spinner"), "slds-hide");
                $A.util.removeClass(component.find("spinner"), "slds-show");
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
    
    orderBySubsidiary : function(component, event, tabLabel) {
        var action = component.get("c.orderBySubsidiary");
        var iAccountList;
        var iSubsidiaries;
        
        if(tabLabel == $A.get("$Label.c.LastUpdate")){
            iAccountList = component.get("v.rGlobalBalance").accountList;
            iSubsidiaries = component.get("v.rGlobalBalance").subsidiaryList; 
        }
        if(tabLabel == $A.get("$Label.c.EndOfDay")){
            iAccountList = component.get("v.tGlobalBalance").accountList;
            iSubsidiaries = component.get("v.tGlobalBalance").subsidiaryList;
        }
        action.setParams({
            "iSubsidiaries" : iSubsidiaries,
            "iAccountList" : iAccountList
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var iReturn = response.getReturnValue();
                var conts = response.getReturnValue();
                var custs = [];                
                for(var key in iReturn){
                    var account = iReturn[key];
                    custs.push({value:account, key:key});
                }
                if(tabLabel == $A.get("$Label.c.LastUpdate")){
                    component.set("v.accountSubsidiaryList", custs);    
                }
                if(tabLabel == $A.get("$Label.c.EndOfDay")){
                    component.set("v.tAccountSubsidiaryList", custs);    
                } 
                
                $A.util.addClass(component.find("spinner"), "slds-hide");
                $A.util.removeClass(component.find("spinner"), "slds-show");
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

    getIsCashNexus :  function (component, event){
        var action = component.get("c.getIsCashNexus");
        
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var iReturn = response.getReturnValue();
                    for ( var key in iReturn ) {
                        if(key == "agreedTerms"){
                            component.set("v.agreedTerms", iReturn[key]);
                        }
                        if(key == "isCashNexusUser"){
                            component.set("v.isCashNexus", iReturn[key]);
                        }
                        if(key == "BIC"){
                            component.set("v.isBIC", iReturn[key]);
                        }
                    }
                    
                    var nexus = component.get("v.isCashNexus");
                    var terms = component.get("v.agreedTerms");
                    var bic = component.get("v.isBIC");
                    
                    if(nexus == true && terms == false){
                        component.set("v.showTerms", true);
                    }
                    
                    if(nexus == false && bic == true && terms == false) {
                        component.set("v.showTerms", true);
                    }
                }
                else {
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
    
    getUserInfo : function(component, event){
        var action = component.get("c.getUserInfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue();
                for ( var key in conts ) {
                    if(key == "getDefaultCurrency"){
                        component.set("v.currentUserCurrency", conts[key]);
                        component.set("v.tCurrentUserCurrency", conts[key]);
                    }
                    if(key == "getLanguage"){
                        component.set("v.currentUserLanguage", conts[key]);
                    }
                    if(key == "isCashNexusUser"){
                        component.set("v.isCashNexus",conts[key]);
                        //component.set("v.isCashNexus",True);
                        //console.log(">>> ", component.get("v.isCashNexus"));
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
    
    exchangeCurrency : function(component, event){        
        var IsoCode = event.getParam("IsoCode");
        var tabSelected = component.get("v.tabSelected");
        if(tabSelected == "EndOfDayTab"){
            component.set("v.tCurrentUserCurrency", IsoCode); 
        }
        else if(tabSelected == "LastUpdateTab"){
            component.set("v.rCurrentUserCurrency", IsoCode); 
        }
            else{
                component.set("v.currentUserCurrency", IsoCode);   
            }
    },
    sortAccount : function(component, event){
        var s = event.getParam("displayOrder");
        component.set("v.sortSelected", s);
    },
    
    //DO NOT DELETE the following comment lines. They are highly important to display notification messages
    //$Label.c.SuccessfullyDownloadedFile
    //$Label.c.FailedDownloadFile
    download : function(component, event){
        try{
            var itabSelected = component.get("v.tabSelected");
            var lst = [];
            if(itabSelected == "LastUpdateTab"){
                lst = component.get("v.rGlobalBalance.accountList");
            }
            if(itabSelected == "EndOfDayTab"){
                lst = component.get("v.tGlobalBalance.accountList");
            }
            if(lst.length > 0){
                // call the helper function which "return" the CSV data as a String   
                var csv = this.convertArrayOfObjectsToCSV(component,lst);   
                if (csv == null){return;} 
                
                //step 1: create a blob
                const blob = new Blob("\ufeff"+csv, {type : "text/plain"});
                //const blob = new Blob(csv, {type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"});
                this.downloadFile(component, event, blob, "BalanceDownload.csv"); 
            }
            component.set("v.message",  $A.get("$Label.c.SuccessfullyDownloadedFile"));
            component.set("v.show", true);
        }catch(e){
            component.set("v.message",  $A.get("$Label.c.FailedDownloadFile"));
            component.set("v.type", "error");
            component.set("v.show", true);
            console.log(e);
        }        
    },
    //DO NOT DELETE the following comment lines. They are highly important to display the table headers
    //$Label.c.Country
    //$Label.c.currency
    //$Label.c.Entity
    //$Label.c.SubsidiaryName
    //$Label.c.Alias_Name
    //$Label.c.Date
    //$label.c.Available_Balance
    //$label.c.Book_Balance
    convertArrayOfObjectsToCSV : function (component,objectRecords){
        // declare variables
        var csvStringResult, counter, keys, columnDivider, lineDivider;
        // check if "objectRecords" parameter is null, then return from function
        if (objectRecords == null || !objectRecords.length) {
            return null;
        }
        // store ,[comma] in columnDivider variabel for sparate CSV values and 
        // for start next line use '\n' [new line] in lineDivider varaible  
        columnDivider = '|';
        lineDivider =  '\n';        
        // in the keys valirable store fields API Names as a key 
        // this labels use in CSV file header  
        keys = [""+$A.get("$Label.c.Country")+"",""+$A.get("$Label.c.currency")+"",""+$A.get("$Label.c.Account_Number")+"",""+$A.get("$Label.c.Entity")+"",""+$A.get("$Label.c.SubsidiaryName")+"",""+$A.get("$Label.c.Alias_Name"),""+$A.get("$Label.c.Date")+"",""+$A.get("$Label.c.Available_Balance")+"",""+$A.get("$Label.c.Book_Balance")+""];
        csvStringResult = '';
        csvStringResult += keys.join(columnDivider);
        csvStringResult += lineDivider;
        
        for(var i=0; i < objectRecords.length; i++){   
            
            csvStringResult += objectRecords[i].countryName;
            csvStringResult += columnDivider; 
            
            csvStringResult += objectRecords[i].currencyCodeAvailableBalance;
            csvStringResult += columnDivider;
            
            csvStringResult += objectRecords[i].displayNumber;
            csvStringResult += columnDivider; 
            
            csvStringResult += objectRecords[i].bankName;
            csvStringResult += columnDivider;
            
            csvStringResult += objectRecords[i].subsidiaryName;
            csvStringResult += columnDivider; 
            
            csvStringResult += objectRecords[i].alias;
            csvStringResult += columnDivider;  
            
            csvStringResult += objectRecords[i].lastUpdateAvailableBalance;
            csvStringResult += columnDivider;
            
            csvStringResult += objectRecords[i].amountAvailableBalance;
            csvStringResult += columnDivider;
            
            csvStringResult += objectRecords[i].amountMainBalance;
            
            // inner for loop close 
            csvStringResult += lineDivider;
        }// outer main for loop close 
        
        // return the CSV formate String 
        return csvStringResult;   
    },
    
    //step 2: Function accepts Blob and File name
    downloadFile : function(component, event, blob, filename){
        //step 3: Create URL for Blob
        const url = window.URL.createObjectURL(blob);
        //step 4: Anchor Tag to download
        const a = document.createElement("a");
        //Before click we need to add some properties to "a" tag
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
        document.addEventListener("focus", w=>{window.URL.revokeObjectURL(blob)}); 
                                               
	} 
})