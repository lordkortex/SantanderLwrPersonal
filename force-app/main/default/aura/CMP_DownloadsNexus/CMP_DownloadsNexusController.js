({
    doInit : function(component, event, helper) {
        
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        
        if(window.localStorage.getItem(userId + '_balanceEODGP') != undefined) {
            component.find("service").retrieveFromCache(component, helper,"balanceEODGP", helper.populateComponentData);
        } else {
            helper.getComponentData(component, helper);
        }
        
        component.set("v.fileFormat", $A.get("$Label.c.pdfBalances"));
        component.set("v.fileFormatList", ['MT940', 'XML', 'N43', 'BAI2', $A.get("$Label.c.pdfBalances"), $A.get("$Label.c.pdfStatement"), $A.get("$Label.c.excelBalances"), $A.get("$Label.c.excelTransaction")/*, 'SIC Contingency'*/])
    },
    
    getFileDate : function(component, event, helper){
        
        var fileDate = event.target.value;
        
        if(fileDate == "lastStatement"){
            
            component.set("v.fileDate", "lastStatement");
            component.set("v.dates", []);
            component.set("v.singleDate", []);
        }
        if(fileDate == "statementFor"){
            
            component.set("v.fileDate", "statementFor");
            component.set("v.dates", []);
        } 
        if(fileDate == "betweenDates"){
            
            component.set("v.fileDate", "statementBetween");
            component.set("v.singleDate", []);
        } 
    },
    
    getReportType : function(component, event, helper){
        
        var reportType = event.target.value;
        
        if(reportType == "fileForDay"){
            component.set("v.isFileForDay", "N");
        } else {
            component.set("v.isFileForDay", "S");
        }
    },
    
    cleanData : function(component,event,helper){
        
        var countries = component.get("v.selectedCountries");
        
        // Set empty values for all the attributes
        component.set("v.dates", []);
        component.set("v.singleDate", []);
        component.set("v.fileFormat", $A.get("$Label.c.pdfBalances"));
        //component.find("dropdownAccounts").updateSelection(component.get("v.selectedAccounts"));
        var dropdownAccnts = component.find("dropdownAccounts");
        dropdownAccnts = Array.isArray(dropdownAccnts) ? dropdownAccnts[0].updateSelection(component.get("v.selectedAccounts")) : dropdownAccnts.updateSelection(component.get("v.selectedAccounts"));
        //component.find("dropdownCountries").updateSelection(component.get("v.selectedCountries"));
        var dropdownCountry = component.find("dropdownCountries");
        dropdownCountry = Array.isArray(dropdownCountry) ? dropdownCountry[0].updateSelection(component.get("v.selectedCountries")) : dropdownCountry.updateSelection(component.get("v.selectedCountries"));
        
        component.set("v.accountsListString", component.get("v.keepAccList"));
        //component.set("v.fileFormat", ""); 
    },
    
    selectedCountry : function(component,event,helper){
        
        
        var selectedCountry = component.get("v.selectedCountries");
        var accountCountryList = component.get("v.accountCountryList");
        var selectedAccounts = component.get("v.selectedAccounts");
        var newSelected = [];
        var auxList = [];
        
        for(var i = 0; i < selectedCountry.length; i++) {
            for(var j = 0; j < accountCountryList.length; j++){
                if (selectedCountry[i] == accountCountryList[j][1]){
                    auxList.push(accountCountryList[j][0]);				
                }
            }
        }
        
        for(var i = 0; i < selectedAccounts.length; i++) {
            for (var j = 0; j < auxList.length; j++) {
                if(selectedAccounts[i] == auxList[j]) {
                    newSelected.push(selectedAccounts[i]);
                }
            }
        }
        
        component.set("v.accountsListString", auxList);
        component.set("v.selectedAccounts", newSelected);
        
        setTimeout(function(){
            component.getEvent("accountChange").fire();
        }, 100);
    },
    
    //$Label.c.SuccessfullyDownloadedFile
    download : function(component, event, helper){
        
        if(component.get("v.selectedAccounts") == undefined || component.get("v.selectedAccounts").length == 0) {
            component.set("v.show", true);
            component.set("v.message", $A.get("$Label.c.Downloads_NoAccountSelected"));
            component.set("v.type", "error");
        }
        else
        {
            helper.setExtractType(component, event, helper);
            helper.downloadFiles(component, event, helper);
        }
    },
    
    updateAccountSelection : function(component, event, helper){
        var selectedList = component.get("v.selectedAccounts");
        var accList = component.get("v.accountsListString");
        
        if (selectedList != 0) {
            for(var i = 0; i < accList.length; i++) {
                for (var j = 0; j < selectedList.length; j++) {
                    if(accList[i] == selectedList[j]) {
                        component.find("dropdownAccounts").keepSelection(accList[i]);
                    }
                }
            }
        }
        
        var selectedCountry = component.get("v.selectedCountries");
        if(selectedCountry.length == 0) {
            component.set("v.accountsListString", component.get("v.keepAccList"));
        }
    }
})