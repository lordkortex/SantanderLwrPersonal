({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the component data on its initialization
    History
    <Date>			<Author>			<Description>
	18/12/2019		Guillermo Giral   	Initial version
	*/
	doInit : function(component, event, helper) {
		helper.getComponentData(component, helper);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function triggered when the selected countries changed, to udpate the displayed pills accordingly
    History
    <Date>			<Author>			<Description>
	23/12/2019		Guillermo Giral   	Initial version
	*/
	updateCountryPills : function(component, event, helper){
		var selectedCountries = component.get("v.selectedCountries");
		var countryPills = component.get("v.countryPills");
		var countryNameToCodeMap = component.get("v.countries");
		console.log("[CMP_DownloadBalanceMovementsController.updateCountryPills] Selected countries: " + selectedCountries);

		if(selectedCountries.length > 0){
			var selectedPills = [];
			var dropdownCmp = component.find("countryDropdown");

			for(var country in selectedCountries){
				if(selectedCountries[country] != dropdownCmp.get("v.selectAllValues")){
					if(countryPills.indexOf(countryNameToCodeMap[selectedCountries[country]].substring(0,2).toUpperCase()) == -1){
						countryPills.push(countryNameToCodeMap[selectedCountries[country]].substring(0,2).toUpperCase());
					}
					selectedPills.push(countryNameToCodeMap[selectedCountries[country]]);
				}
			}	
			// Remove the pills that are out of sync with the values selected in the dropdown
			countryPills = selectedPills.filter(pill => countryPills.indexOf(pill) != -1);
		} else {
			countryPills = [];
		}

		component.set("v.countryPills", countryPills);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function triggered when the selected accounts changed, to udpate the displayed pills accordingly
    History
    <Date>			<Author>			<Description>
	23/12/2019		Guillermo Giral   	Initial version
	*/
	updateAccountPills : function(component, event, helper){
		var selectedAccounts = component.get("v.selectedAccounts");
		var accountPills = component.get("v.accountPills");
		var dropdownCmp = component.find("accountDropdown");

		if(selectedAccounts.length > 0){
			var selectedPills = [];
			for(var acc in selectedAccounts){
				if(selectedAccounts[acc] != dropdownCmp.get("v.selectAllValues")){
					var accPillNumber = '...' + selectedAccounts[acc].replace(' ','').substring(24,28);
					if(accountPills.indexOf(accPillNumber) == -1){
						accountPills.push(accPillNumber);
					}
					selectedPills.push(accPillNumber);
				}
			}
			// Remove the pills that are out of sync with the values selected in the dropdown
			accountPills = selectedPills.filter(pill => accountPills.indexOf(pill) != -1);
		} else {
			accountPills = [];
		}

		component.set("v.accountPills", accountPills);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to handle the removal of pills when clicked on the X icon. It also unselects the corresponding value
					in the dropdown, so both pills and dropdown values are in sync.
    History
    <Date>			<Author>			<Description>
	20/12/2019		Guillermo Giral   	Initial version
	*/
	removePill : function(component, event, helper){
		var pillsAuraId = event.getSource().getLocalId();

		// Pills for countries
		if(pillsAuraId == "pillsCountries"){
			var countryCode = event.getParam("currentPill");
			var countryMap = component.get("v.countries");
			console.log("[CMP_DownloadBalanceMovementsController.removePill] Removed country: " + countryCode);

			// Remove country from selected countries list
			var selectedCountries = component.get("v.selectedCountries");
			var remainingCountries = selectedCountries.filter(country => countryMap[country] != countryCode);
			console.log("[CMP_DownloadBalanceMovementsController.removePill] remainingCountries: " + remainingCountries);
			component.set("v.selectedCountries", remainingCountries);

			// Remove country pill
			var countryPills = component.get("v.countryPills");
			countryPills = countryPills.filter(country => country != countryCode);
			component.set("v.countryPills", countryPills);

			// Get the country that has changed and call the dropdown method to update the selected values
			var changedCountries = selectedCountries.filter(function(obj) { return remainingCountries.indexOf(obj) == -1; });
			console.log("[CMP_DownloadBalanceMovementsController.removePill] changedCountries: " + changedCountries);
			if(changedCountries.length > 0){
				var dropdownCmp = component.find("countryDropdown");
				dropdownCmp.updateSelection(changedCountries);
			}

		// Pills for accounts
		} else if(pillsAuraId == "pillsAccounts"){
			// Remove account from selected accounts list
			var accountCode = event.getParam("currentPill");
			var selectedAccounts = component.get("v.selectedAccounts");
			var updatedAccounts = selectedAccounts.filter(account => '...' + account.replace(' ','').substring(24,28) != accountCode);
			component.set("v.selectedAccounts", updatedAccounts);

			// Remove account pill
			var accountPills = component.get("v.accountPills");
			accountPills = accountPills.filter(account => account != accountCode);
			component.set("v.accountPills", accountPills);

			// Get the account that has changed and call the dropdown method to update the selected values
			var changedAccounts = selectedAccounts.filter(function(obj) { return updatedAccounts.indexOf(obj) == -1; });
			console.log("[CMP_DownloadBalanceMovementsController.removePill] changedCountries: " + changedAccounts);
			if(changedAccounts.length > 0){
				var dropdownCmp = component.find("accountDropdown");
				dropdownCmp.updateSelection(changedAccounts);
			}
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to clean all the data stored in the component, to perform a new search from scratch
    History
    <Date>			<Author>			<Description>
	18/12/2019		Guillermo Giral   	Initial version
	*/
	cleanData : function(component,event,helper){
		// Clean checks from picklists
		var accounts = component.get("v.selectedAccounts");		
		var countries = component.get("v.selectedCountries");		

		// Set empty values for all the attributes
		helper.handleClearButton(component,event,helper);
		component.set("v.dates", []);
		component.set("v.singleDate", []);
		component.set("v.fileFormat", []);
		component.set("v.selectedAccounts", []); 
		//component.set("v.fileFormat", ""); 

		component.find("accountDropdown").updateSelection(accounts);

		/*var toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
			"title": "Success!",
			"message":"HOLA",
			"duration":30000000
		});
		toastEvent.fire();*/
		//component.find("countryDropdown").updateSelection(countries);
	},

	/*
	Author:         R. Alexander Cerviño 
    Company:        Deloitte
	Description:    Function to download
    History
    <Date>			<Author>			<Description>
	16/01/2020		R. Alexander Cerviño   	Initial version
	*/
	//$Label.c.SuccessfullyDownloadedFile
	download : function(component){
		//Call the event to show if the download was ok
		var cmpEvent = component.getEvent("showToast"); 
        //Set event attribute value
        cmpEvent.setParams({
			"message" : $A.get("$Label.c.SuccessfullyDownloadedFile"),
			"type" : "success",
			"show" : true
        }); 
        cmpEvent.fire(); 

	},
    
    getTypeOfFile : function(component, event, helper){
        
        var balance = event.target.value;
        var lst = [];
        
        if(balance == "Last update"){
            
            lst.push("MT941", "MT942", "CAMT0052");
            component.set("v.fileFormatList", lst);
        }
        if(balance == "End of day"){
            
            lst.push("MT940", "XML", "N43", "BAI2", "FINSTA", "PDF-Balances", "PDF-Statement", "ExcelBalances", "ExcelTransaction", "SIC Contingency");
            component.set("v.fileFormatList", lst);
        } 
	},
    
    getFileDate : function(component, event, helper){
        
        var fileDate = event.target.value;
        var lastStatement = $A.get("$Label.c.DownloadBalance_LastStatement");
        var statementFor = $A.get("$Label.c.DownloadBalance_UniqueDate");
        var statementBetween = $A.get("$Label.c.DownloadBalance_BetweenDates");
        
        if(fileDate == lastStatement){
            
            component.set("v.fileDate", "lastStatement");
        }
        if(fileDate == statementFor){
            
            component.set("v.fileDate", "statementFor");
        } 
        if(fileDate == statementBetween){
            
            component.set("v.fileDate", "statementBetween");
        } 
	}

})