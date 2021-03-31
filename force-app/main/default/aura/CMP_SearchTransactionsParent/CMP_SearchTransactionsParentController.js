({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to open the advanced filter modal
    History
    <Date>			<Author>			<Description>
	06/03/2020		Guillermo Giral   	Initial version
	*/
	doInit : function(component, event, helper) {
		helper.getURLParams(component, event, helper);
	},
	
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function filter the data in the table based on the retrieved filters
    History
    <Date>			<Author>			<Description>
	12/03/2020		Guillermo Giral   	Initial version
	*/
	filterTableData : function(component, event, helper){
		// If the action is triggered by the "Apply filters" event
		if(event){
            component.set("v.loading", true);
			var filters = event.getParam("selectedFilters");
			var isEndOfDay = component.get("v.endOfDay");
			component.set("v.selectedFilters", filters);
			if(filters.length > 0){
				helper.sendDataServiceRequestWithFilters(component, helper, filters, isEndOfDay);
			} else {
                component.set("v.applyWithoutFilters", true);
              	helper.sendDataServiceRequest(component, helper, component.get("v.accountsData")[0], isEndOfDay); 
            }
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get new data on "End of Day" / "Last update" click
    History
    <Date>			<Author>			<Description>
	25/03/2020		Guillermo Giral   	Initial version
	*/
	getUpdatedData : function(component, event, helper){
		var userId = $A.get( "$SObjectType.CurrentUser.Id" );
		if(event){
			// If the search again button has been pressed
			if(event.getName() == "searchAgain"){
				component.set("v.showModal", true);
			} else if(!component.get("v.tabChangedByCache")){
				// If the tab has changed from EOD to LU (or viceversa) and
				var isEndOfDay = component.get("v.endOfDay");
				component.set("v.applyWithoutFilters", false);
				if(isEndOfDay){
					window.localStorage.setItem(userId + '_' + 'tab', 'endOfDay');
					helper.initComponentData(component, "endOfDay", helper);
				} else {
					window.localStorage.setItem(userId + '_' + 'tab', 'lastUpdate');
					helper.initComponentData(component, "lastUpdate", helper);
				}
			} else {
				component.set("v.tabChangedByCache", false);
			}
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to filter the data based on a time period,
					rather than on a fixed timeframe
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral   	Initial version
	*/
	filterByTimePeriod : function (component, event, helper){
		var timePeriod = event.getParam("value");
		if(timePeriod != $A.get("$Label.c.selectOne")){
			var selection = {};
			var selectedFilters = [];
			selection.value = {};
			
			// Curent date
			var currentDate = new Date();
			var currentMonth = currentDate.getMonth()+1;
			selection.value.to = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDate.getDate();

			switch(timePeriod){
				case $A.get("$Label.c.lastDay"): 
					var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 1);
					var previousMonth = previousDate.getMonth()+1;
					selection.value.from = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();
					selection.name = $A.get("$Label.c.bookDate");
					selection.type = "dates";
					selectedFilters.push(selection);
				break;

				case $A.get("$Label.c.last7Days"): 
					var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 7);
					var previousMonth = previousDate.getMonth()+1;
					selection.value.from = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();
					selection.name = $A.get("$Label.c.bookDate");
					selection.type = "dates";
					selectedFilters.push(selection);
				break;

				case $A.get("$Label.c.lastMonth"): 
					var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 30);
					var previousMonth = previousDate.getMonth()+1;
					selection.value.from = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();
					selection.name = $A.get("$Label.c.bookDate");
					selection.type = "dates";
					selectedFilters.push(selection);
				break;
			}
			// Remove the Select One value
			var timePeriods = JSON.parse(JSON.stringify(component.get("v.timePeriods")));
			timePeriods = timePeriods.filter(opt => opt != $A.get("$Label.c.selectOne"));
			component.set("v.timePeriods", timePeriods);

			// Pass the filters to the filter method
			component.set("v.loading", true);
			var isEndOfDay = component.get("v.endOfDay");
			
			// Update the filters attribute so that the book date is updated
			component.set("v.selectedTimeframe", timePeriod);
			component.set("v.dates", []);
			helper.sendDataServiceRequestWithFilters(component, helper, selectedFilters, isEndOfDay);
		}
	},

	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to sort the columns of the transactions table.
    History
    <Date>			<Author>			<Description>
	02/03/2020		Pablo Tejedor   	Initial version
	*/
	sortBy : function(component, event, helper) {
		var params = event.getParams();
		if(params){
			var sortItem = params.sortItem;
			var sorted = helper.sortBy(component, sortItem ,helper, params.column);

			if (sorted != undefined && sorted !=null){

				component.set("v.transactionResults.obtTransacBusqueda", sorted);

				//Update the sort order
				if( component.get(sortItem) == 'asc'){
					component.set(sortItem,'desc');
				}else{
					component.set(sortItem,'asc');
				}
			}
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to dynamically change the selectable options
					in the advanced filters dropdowns (only for Last Update)
    History
    <Date>			<Author>			<Description>
	13/04/2020		Guillermo Giral   	Initial version
	*/
	updateDropdownFilters : function(component, event, helper) {
        
        var defaultFilters = JSON.parse(JSON.stringify(component.get("v.defaultFilters")));	
        // Clear all if the clear all event is captured (from simple or advanced filters)
        if((event.getName() == "onOptionSelection" && event.getParams().source == "clearAll") || event.getName() == "clearAllFilters"){
			component.set("v.filters", JSON.parse(JSON.stringify(defaultFilters)));
			component.set("v.selectedFilters", []);
			var isEndOfDay = component.get("v.endOfDay");
            var iWhen = '';
            
            if(isEndOfDay){
                iWhen = 'endOfDay';
            } else {
                iWhen = 'lastUpdate';
            }
            
            helper.initComponentData(component, iWhen, helper);
        } else{         
			var params = event.getParams();
			var filters = JSON.parse(JSON.stringify(component.get("v.filters")));
			var accountCodeToInfoMap = JSON.parse(JSON.stringify(component.get("v.accountCodeToInfo")));

			if(params){
				var filterName = params.filterName;
				var accountLabel = $A.get("$Label.c.Account");
				var bankLabel = $A.get("$Label.c.Bank");
				var currencyLabel = $A.get("$Label.c.currency");
				var countryLabel = $A.get("$Label.c.Country");
				var filterLabels = new Array(accountLabel, bankLabel, currencyLabel, countryLabel);
				var availableAccounts = [];
				var availableBanks = [];
				var availableCountries = [];
				var availableCurrencies = [];
				var recalculateCurrentFilter = false; // Flag activated when the current filter must be recalculated i.e. when one of its options has been unchecked
				
				var selectedOptionsMap = {};
				var allOptionsMap = {};
				if(filterName != $A.get("$Label.c.Category")){
					// Get the checked options from the filters
					for(var key in filters){
						var selectedOptionsByFilter = [];
						var allOptionsByFilter = [];
						if(filterLabels.includes(filters[key].name)){
							for(var option in filters[key].data){
								allOptionsByFilter.push(filters[key].data[option].value);
								if(filters[key].data[option].checked){
									selectedOptionsByFilter.push(filters[key].data[option].value);
								}
							}
							selectedOptionsMap[filters[key].name] = selectedOptionsByFilter;
							allOptionsMap[filters[key].name] = allOptionsByFilter;
						}
					}



					// Take the default filters and check the options before continuing 
					for(var oFilters in defaultFilters){
						var filterKeys = Object.keys(selectedOptionsMap);
						for(var key in filterKeys){
							var currentFilter = selectedOptionsMap[filterKeys[key]];
							if(defaultFilters[oFilters].name == filterKeys[key]){
								if(defaultFilters[oFilters].name == filterName){
									defaultFilters[oFilters].displayOptions = true;
								}
								for(var opt in defaultFilters[oFilters].data){
									if(currentFilter.includes(defaultFilters[oFilters].data[opt].value)){																		
										defaultFilters[oFilters].data[opt].checked = true;
									} else {
										if(defaultFilters[oFilters] == filterName && !currentFilter.includes(defaultFilters[oFilters].data[opt].value)){
											defaultFilters[oFilters].data[opt].checked = false;
											recalculateCurrentFilter = true;
										}
									}						
								}
							} else if(defaultFilters[oFilters].type == "text" || defaultFilters[oFilters].name == $A.get("$Label.c.Category")){
								defaultFilters[oFilters] = JSON.parse(JSON.stringify(filters[oFilters]));
							}
						}
					}

					filters = JSON.parse(JSON.stringify(defaultFilters));				
				
					// Get the accounts meeting all the criteria * If one or more accounts are already selected, we need to filter the account codes map before,
					// so only the selected accounts are processed
					var accCodesMapKeys = Object.keys(accountCodeToInfoMap);

					if(selectedOptionsMap[accountLabel].length > 0 && filterName != accountLabel){
						accCodesMapKeys = accCodesMapKeys.filter(accCode => selectedOptionsMap[accountLabel].includes(accCode));
						var accountCodes = Object.keys(accountCodeToInfoMap);
						var selectedOpts = Object.keys(selectedOptionsMap);
						var bankList = [];
						var currencyList = [];
						var countryList = [];
						for(var opt in selectedOpts){
							switch (selectedOpts[opt]) {
								case bankLabel :
									for(var b in selectedOptionsMap[selectedOpts[opt]]){
										var selected = selectedOptionsMap[selectedOpts[opt]];
										bankList.push(selected[b]);
									}
									break;
								case countryLabel :
									for(var c in selectedOptionsMap[selectedOpts[opt]]){
										var selected = selectedOptionsMap[selectedOpts[opt]];
										countryList.push(selected[c]);
									}
									break;
								case currencyLabel :
									for(var c in selectedOptionsMap[selectedOpts[opt]]){
										var selected = selectedOptionsMap[selectedOpts[opt]];
										currencyList.push(selected[c]);
									}
									break;
							}
						}
						for(var key in accountCodes){
							var accCode = accountCodes[key];
							// Add the accounts that meets the new criteria
							if(
								(bankList.includes(accountCodeToInfoMap[accCode].bankLabel) || bankList.length == 0) &&
								(currencyList.includes(accountCodeToInfoMap[accCode].currencyLabel) || currencyList.length == 0) &&
								(countryList.includes(accountCodeToInfoMap[accCode].countryLabel) || countryList.length == 0)
							){
								accCodesMapKeys.push(accCode);
							}
						}
					} else if(selectedOptionsMap[accountLabel].length > 0 && filterName == accountLabel) {
						accCodesMapKeys = accCodesMapKeys.filter(accCode => selectedOptionsMap[accountLabel].includes(accCode));
					}
					
					for(var key in accCodesMapKeys){
						var currentAccount = accountCodeToInfoMap[accCodesMapKeys[key]]; 
						if(
							(selectedOptionsMap[bankLabel].includes(currentAccount.bankLabel) || selectedOptionsMap[bankLabel].length == 0) &&
							(selectedOptionsMap[currencyLabel].includes(currentAccount.currencyLabel) || selectedOptionsMap[currencyLabel].length == 0) &&
							(selectedOptionsMap[countryLabel].includes(currentAccount.countryLabel) || selectedOptionsMap[countryLabel].length == 0)
						){
							if(filterName != accountLabel){
								availableAccounts.push(accCodesMapKeys[key]);
							}
							availableBanks.push(currentAccount.bankLabel);
							availableCountries.push(currentAccount.countryLabel);
							availableCurrencies.push(currentAccount.currencyLabel);
						}
					}

					// If the filter selected is Account, we need to check for add the banks, countries and currencies of the selected accounts
					if(filterName == accountLabel){
						for(var key in selectedOptionsMap[accountLabel]){
							if(!availableAccounts.includes(selectedOptionsMap[accountLabel][key])){
								var candidateAccountCode = selectedOptionsMap[accountLabel][key];
								availableAccounts.push(candidateAccountCode);
								availableBanks.push(accountCodeToInfoMap[candidateAccountCode].bankLabel);
								availableCurrencies.push(accountCodeToInfoMap[candidateAccountCode].currencyLabel);
								availableCountries.push(accountCodeToInfoMap[candidateAccountCode].countryLabel);
							}
						}
						// WITH ACCOUNT FILTER RECALCULATION
						//recalculateCurrentFilter = true;
					}
					
					// Create an array of currently selected filters, it's needed to the last step
					// because we need to make sure if only one filter is selected, all its options must be displayed
					var selectedFilters = [];
					var selectedOptions = Object.keys(selectedOptionsMap);
					for(var selectedOpt in selectedOptions){
						var currentOpt = selectedOptions[selectedOpt];
						if(selectedOptionsMap[currentOpt].length > 0){
							selectedFilters.push(currentOpt);
						}
					}

					// Filter the options that need to be removed
					for(var f in filters){
						if(
							filters[f].type == "checkbox" && 
							filterLabels.includes(filters[f].name) && 
							(filters[f].name != filterName || recalculateCurrentFilter)
						){ 
							if(selectedFilters.length > 1 || (selectedFilters.length == 1 && filters[f].name != selectedFilters[0])){
								switch(filters[f].name){
									case accountLabel :
										filters[f].data = filters[f].data.filter(option => availableAccounts.includes(option.value));
									break;
									case bankLabel :
										filters[f].data = filters[f].data.filter(option => availableBanks.includes(option.value));
									break;
									case currencyLabel :							
										filters[f].data = filters[f].data.filter(option => availableCurrencies.includes(option.value));
									break;
									case countryLabel :
										filters[f].data = filters[f].data.filter(option => availableCountries.includes(option.value));
									break;
								}
							}
						}
						// Set the number of checked options
						if(filters[f].type == "checkbox"){
							filters[f].numberChecked = filters[f].data.filter(option => option.checked).length;
							// Set the available accounts to send to the LU transaction search
							if(filters[f].name == accountLabel && filters[f].numberChecked == 0){
									component.set("v.accountCodesToSearch", availableAccounts);
							} else if(filters[f].name == accountLabel && filters[f].numberChecked != 0) {
									component.set("v.accountCodesToSearch", selectedOptionsMap[accountLabel]);
							}
						}
					}
					if(filterName == bankLabel){
						component.set("v.filters[0]", filters[0]);
						component.set("v.filters[2]", filters[2]);
						component.set("v.filters[5]", filters[5]);
					} else if(filterName == currencyLabel){
						component.set("v.filters[0]", filters[0]);
						component.set("v.filters[1]", filters[1]);
						component.set("v.filters[2]", filters[2]);
					} else if(filterName == countryLabel){
						component.set("v.filters[5]", filters[5]);
						component.set("v.filters[1]", filters[1]);
						component.set("v.filters[2]", filters[2]);
					}else if(filterName == accountLabel){
						// WITH ACCOUNT RECALCULATION
						component.set("v.filters[0]", filters[0]);
						component.set("v.filters[1]", filters[1]);
						//component.set("v.filters[2]", filters[2]);
						component.set("v.filters[5]", filters[5]);
					}
				}
			}  
		}    
        
        // Clear all if necessary
        
        // if(event.getParams().source == "clearAll"){
        //     var isEndOfDay = component.get("v.endOfDay");
        //     var iWhen = '';
            
        //     if(isEndOfDay){
        //         iWhen = 'endOfDay';
        //     } else {
        //         iWhen = 'lastUpdate';
        //     }
            
        //     helper.initComponentData(component, iWhen, helper);
        // }
	},
		/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to clear all the filters and set them by default
    History
    <Date>			<Author>			<Description>
	18/04/2020		Guillermo Giral   	Initial version
	*/
	clearAllFilters : function(component, event,helper) {
		if(event){
			var filterName  = event.getParam("filterName");
			var defaultFilters = JSON.parse(JSON.stringify(component.get("v.defaultFilters")));
			component.set("v.accountCodesToSearch", []);

			// Set pill to active if 'Clear All' has been pushed from the pill
			if(event.getSource().getName() == "cCMP_CN_Filters"){
				for(var f in defaultFilters){
					if(defaultFilters[f].name == filterName){
						defaultFilters[f].displayOptions = true;
					}
				}
			}
			component.set("v.filters", defaultFilters);
			var isEndOfDay = component.get("v.endOfDay");
			var iWhen = '';

			if(isEndOfDay){
				iWhen = 'endOfDay';
			} else {
				iWhen = 'lastUpdate';
			}
			
			helper.initComponentData(component, iWhen, helper);
		}
	},

	/*
	Author:         Guillermo Giral  
    Company:        Deloitte
    Description:    Function to download an .xls file
    				with the transactions data
    History
    <Date>			<Author>						<Description>
    27/04/2020		Guillermo Giral  				Initial version
	*/
    downloadTransactions : function(component, event, helper) { 
		if(component.get("v.maximumRecords") < $A.get("$Label.c.limitTransactionSearchNumber")){
			component.set("v.showLimitTransactionsToast", false);
			helper.downloadFile(component, event, helper);
		} else {
			component.set("v.showLimitTransactionsToast", true);
		}
    }
})