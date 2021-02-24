({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the data from the apex controller on component initialization
    History
    <Date>			<Author>			<Description>
    03/03/2020		Guillermo Giral   	Initial version
    20/05/2020      Shahad Naji         Update Local Storage when Currency, Account Alias and/or User preferences are updated
	*/
    // Do NOT Delete the following commented labels because this is to ensure that they are preloaded
    // $Label.c.LastUpdate
    // $Label.c.EndOfDay
    initData :  function (component, event, helper){
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        
        // Call the apex method from the service component
        var params = {
            "iWhen" : "oneTrade",
            "iUserId" : $A.get("$SObjectType.CurrentUser.Id")      
        };

        component.set("v.isLoading" , true);

        // Fetch the data from the cache if available. Otherwise get the data from the accounts web service
        var storageBalance = window.localStorage.getItem(userId + '_' + 'balanceGP');
        var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceTimestampGP');
        if(storageBalance != 'null' && storageBalance != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 ){
            helper.decryptInitialData(component, event, helper,  storageBalance); 
        }else{
            component.find("service").callApex2(component, helper, "c.callMulesoft", params , this.setComponentInitialData);        
        }
    },
    /*
	Author:         Pablo Tejedor 
    Company:        Deloitte
    Description:    This method is to show the cards with the country, currency or corporate filter.
    History
    <Date>			<Author>			<Description>
	28/10/2019		Pablo Tejedor     	Initial version
    */
    filterGroupBy : function(component, event, helper){
        if(component.get("v.filters").length > 0){
            if(component.get("v.sortSelected") == $A.get("$Label.c.Country")){
                var filters = component.get("v.filterParams");
                
                var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountCountryList")));
                var filteredData = helper.filterData(initialDataCards, filters,component,'');
                component.set("v.accountCountryList", filteredData);
            }else if(component.get("v.sortSelected") == $A.get("$Label.c.currency")){
                var filters = component.get("v.filterParams");
                
                var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountCurrencyList")));
                var filteredData = helper.filterData(initialDataCards, filters,component,'');
                component.set("v.accountCurrencyList", filteredData);
            }else{
                var filters = component.get("v.filterParams");
                
                var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountSubsidiaryList")));
                var filteredData = helper.filterData(initialDataCards, filters,component,'');
                component.set("v.accountSubsidiaryList", filteredData);
            }
        }
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Sets the data fetched in the initData() helper method
    History
    <Date>			<Author>			<Description>
    03/03/2020		Guillermo Giral   	Initial version
    29/04/2020      Shahad Naji         Load user currency selected by the user previously
    05/05/2020		Shahad Naji 		Show error message when the information could not be returned
    21/05/2020      Shahad Naji         Stores wheather user currency has been updated or not
    22/05/2020      Shahad Naji         Store wheather user pereferences have been updated or not
    25/05/2020      Shahad Naji         Store wheather an Account Alias has been updated or not
	*/
    // DO NOT DELETE the following lines. They are hints to ensure labels are preloaded
    // $Label.c.ERROR_NOT_RETRIEVED
    setComponentInitialData : function(component, helper, iReturn,decrypt){
        if(iReturn != null && iReturn.is403Error)
        {
            component.set("v.showError403", true);
            component.set("v.isLoading", false);
        }
        else
        {
            var userId = $A.get( "$SObjectType.CurrentUser.Id" );
            window.localStorage.setItem(userId + "_hasPaymentsTrackerAccess",  iReturn.canUserSeePaymentsTracker);
            window.localStorage.setItem(userId + "_hasGlobalPositionAccess",  iReturn.canUserSeeGP);
            window.sessionStorage.setItem(userId + "_firstAccess", false);
            //component.set("v.isLoading" , true);
            if(iReturn != null){
                
                if(decrypt!=true){
                    helper.encryptInitialData(component, helper, iReturn);
                }
                
                // Set the preferred user date and number
                component.set("v.userPreferredDateFormat", iReturn.mapUserFormats.dateFormat != '' ? iReturn.mapUserFormats.dateFormat : "dd/MM/yyyy");
                component.set("v.userPreferredNumberFormat", iReturn.mapUserFormats.numberFormat != '' ? iReturn.mapUserFormats.numberFormat : "###.###.###,##");
                
                //AM - 28/10/2020 - FIX INC726
                var userCurrency = window.localStorage.getItem(userId + "_actualCurrencyChange");
                if(userCurrency == undefined || userCurrency == null){
                    userCurrency =  $A.get("$Locale.currencyCode");
                }
                
                if(iReturn.accountList.length > 0 ){              
                    if(iReturn.currencyList.length > 0){
                        if(!iReturn.currencyList.includes(userCurrency)){
                            userCurrency = 'EUR';
                            var action = component.get("c.setUserCurrencyString");
                            action.setParams({
                                "currencyStr" : userCurrency
                            });
                            
                            action.setCallback(this, function(response) {
                                var state = response.getState();
                                if (state === "SUCCESS") {
                                    var res = response.getReturnValue();  
                                    helper.setComponentInitialDataUpdate(component, helper, iReturn, res);
                                } else{
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
                            
                        }else{
                            helper.setComponentInitialDataUpdate(component, helper, iReturn, userCurrency);
                            
                        }
                    }               
                    
                    
                }else{
                    component.set("v.isLoading" , false);
                    var msg = $A.get("$Label.c.ERROR_NOT_RETRIEVED");
                    component.set("v.show", true);
                    component.set("v.message", msg);
                    component.set("v.type", "error");
                    component.set("v.toBeHiddenToast", false);
                }
            }else{
                component.set("v.isLoading" , false);
                var msg = $A.get("$Label.c.ERROR_NOT_RETRIEVED");
                component.set("v.show", true);
                component.set("v.message", msg);
                component.set("v.type", "error");
                component.set("v.toBeHiddenToast", false);
                
            }
            
        }     
    },
        
    setComponentInitialDataUpdate : function(component, helper, iReturn, divisa){
        var currentCurrency = "";
        if(iReturn.currencyList.includes(divisa)){
            var userCurrency = divisa;
        }
        
        component.set("v.rGlobalBalance", iReturn); 
        component.set("v.currentUserCurrency", userCurrency);
        component.set("v.rCurrentUserCurrency",  userCurrency);
        component.set("v.rCurrencyList", iReturn.tipoDeCambioList);
        currentCurrency = component.get("v.rCurrentUserCurrency");
        component.set("v.selectedCurrency",userCurrency );
        component.set("v.accountLastUpdate", iReturn.headerLastModifiedDate);
        if(iReturn.accountList != undefined){
            component.find("accountTitleDropdown_one").calculateLastUpdated(true, iReturn.accountList, iReturn.headerLastModifiedDate, iReturn.headerLastModifiedDateMain);   
        }

        component.set("v.tabsChange", !component.get("v.tabsChange")); 
        
        helper.orderByCountry(component, event, helper);
        helper.orderByCurrency(component, event, helper);
        helper.orderBySubsidiary(component, event, helper);
        
        // Set the global balance amounts
        component.set("v.globalBookBalance", iReturn.currencyGlobalBalance[currentCurrency][0]);  
        component.set("v.globalAvailableBalance", iReturn.currencyGlobalBalance[currentCurrency][1]);
        
        if(component.get("v.heritagedFilters")==false){            
            helper.listOfFilters(component, event, helper, iReturn);           
        }else{
            helper.updateFilter(component, helper,component.get("v.heriFilters"),iReturn);
        }     
        // Set the selected currency to the one currently selected in the dropdown
        if(component.get("v.selectedCurrency") != undefined){
            var sCurrency = component.get("v.selectedCurrency");
            component.find("accountTitleDropdown_one").selectCurrency(sCurrency);
        }
        component.set("v.isLoading" , false);
    },
    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Update the filters
    History
    <Date>			<Author>			<Description>
	08/04/2020		 R. Cervino   	Initial version
    05/05/2020		Shaahd Naji		Save filters when access to other pages 
	*/
    updateFilter : function(component, helper, filter,iReturn){
        
        helper.listOfFilters(component, event, helper, iReturn);
        
        var initFilters=component.get("v.filters");
        
        if(filter!=undefined && filter!=null){
            var sourcePage = component.get("v.sourcePage");
            if(sourcePage != "GlobalPosition"){
                component.set("v.filters",filter);            
                component.set("v.heritagedFilters",true); 
            }else{
                for(var i=0;i<initFilters.length;i++){
                    if(initFilters[i].name==filter[0].name){
                        var count=0;
                        for(var j=0; j<initFilters[i].data.length;j++){
                            if(initFilters[i].data[j].value==filter[0].value){
                                count++;
                                initFilters[i].numberChecked=count;
                                initFilters[i].data[j].checked=true;
                            }
                        }
                        
                    }
                }
                
                component.set("v.filters",initFilters);
                
                component.set("v.heritagedFilters",true); 
                component.set("v.sourcePage", "Account");
            }
        }
    },
    
    /*
	Author:         Teresa Santos
    Company:        Deloitte
    Description:    Creates the filter list to be passed to CMP_CN_Filters component
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
    11/04/2020		Shahad Naji			Do not add null values to filters
	*/
    
    listOfFilters : function (component, event, helper, iReturn){
        
        var timePeriods = [];
        timePeriods.push($A.get("$Label.c.Country"));
        timePeriods.push($A.get("$Label.c.currency"));
        timePeriods.push($A.get("$Label.c.Corporate"));
        component.set("v.timePeriods", timePeriods);
        var comesFromGlobalPosition = component.get("v.sourcePage") == 'globalBalance';
        
        if(iReturn != null ){
            
            
            
            // if(iReturn != null && component.get("v.filters").length == 0 ){ 
            
            var countryList = new Set();
            var displayedCountryList = new Set();
            var accounts = iReturn.accountList;
            var accCurrencies = new Set();
            var corpoList = new Set();
            
            for(var i = 0; i< accounts.length ; i++){
                displayedCountryList.add(accounts[i].country +' - '+ accounts[i].countryName);
                countryList.add(accounts[i].country);
                if(accounts[i].currencyCodeAvailableBalance != '' && accounts[i].currencyCodeAvailableBalance != undefined && accounts[i].currencyCodeAvailableBalance != null){
                  accCurrencies.add(accounts[i].currencyCodeAvailableBalance);  
                }
                if(accounts[i].subsidiaryName != '' && accounts[i].subsidiaryName != undefined && accounts[i].subsidiaryName != null){
                   corpoList.add(accounts[i].subsidiaryName); 
                }  
				
				
            }
            
            // COUNTRY LIST CREATION
            var countryAux = Array.from(countryList);
            var displayCountryAux = Array.from(displayedCountryList);
            component.set("v.countryMap", displayCountryAux);
            
            // COUNTRY LIST CREATION
            var countryAux = Array.from(countryList);
            var displayCountryAux = Array.from(displayedCountryList);
            var listObject = [];
            listObject.push({});
            listObject[0].data = []
            for(var i in countryAux) {
                var a = {
                    value : countryAux[i],
                    displayValue : displayCountryAux[i],
                    checked : false
                };
                listObject[0].data.push(a);
                
            }
            
            
            listObject[0].name = $A.get("$Label.c.Country"); 
            listObject[0].type = 'checkbox';
            listObject[0].numberChecked = 0;
            listObject[0].displayFilter = !comesFromGlobalPosition;
            //listObject[0].dependsOn = [$A.get("$Label.c.currency"),$A.get("$Label.c.Corporate")];
            
            // CURRENCY LIST CREATION
            var listCurrencies = Array.from(accCurrencies);
            listObject.push({});
            listObject[1].data = []
            for(var i in listCurrencies) {
                var a = {
                    value : listCurrencies[i],
                    displayValue : listCurrencies[i],
                    checked : false
                };
                listObject[1].data.push(a);
                
            }
            listObject[1].name = $A.get("$Label.c.currency"); 
            listObject[1].displayFilter = false;
            listObject[1].type = 'checkbox';
            listObject[1].numberChecked = 0;
            listObject[1].displayFilter = !comesFromGlobalPosition;
            //listObject[1].dependsOn = [$A.get("$Label.c.Country"),$A.get("$Label.c.Corporate")];
            
            
            // COUNTRY LIST CREATION
            var listCorpo = Array.from(corpoList);
            listObject.push({});
            listObject[2].data = []
            for(var i in listCorpo) {
                var a = {
                    value : listCorpo[i],
                    displayValue : listCorpo[i],
                    checked : false
                };
                listObject[2].data.push(a);
                
            }
            listObject[2].name = $A.get("$Label.c.Corporate"); 
            listObject[2].displayFilter = false;
            listObject[2].type = 'checkbox';
            listObject[2].numberChecked = 0;
            listObject[2].displayFilter = !comesFromGlobalPosition;
            //listObject[2].dependsOn = [$A.get("$Label.c.currency"),$A.get("$Label.c.Country")];
            
            
            
            component.set("v.filters", listObject);
            component.set("v.initialFilters",JSON.parse(JSON.stringify( listObject)));
            component.set("v.isLoading" , false);
            
        }
        component.set("v.isLoading" , false);
        
        //helper.filterGroupBy(component, event, helper);
        
    },
    
    
    filterData : function(data, filters, component, selectedFilter){
        var originalData=data;
        if(filters.length > 0 && data != null && data != undefined){
            for(var filter in filters){
                
                var filterName = filters[filter].name;
                if(filters[filter].value != undefined){
                    var selectedFilters = filters[filter].value;
                    
                    if(selectedFilters != undefined){
                        if(
                            filterName == $A.get("$Label.c.Country") || filterName == $A.get("$Label.c.currency")|| filterName == $A.get("$Label.c.Corporate")
                        ){
                            data = this.filterOptions(data, selectedFilters, filterName,component,originalData, selectedFilter);
                        }
                    }
                }
            }
            return data;
        }else{
            component.set("v.filters",JSON.parse(JSON.stringify( component.get("v.initialFilters"))));
            return data;
        }
        //return null;
    },
    
    filterOptions : function(data, filters, filterName,component, originalData, selectedFilter){
        
        var filteredData = JSON.parse(JSON.stringify(data)); 
        var filterValues = [];
        var filterOfFilters = JSON.parse(JSON.stringify(component.get("v.filters")));
        var listaux = [];
        var listOfAccounts = [];
        var listOfCurrencies = new Set();
        var listOfCountries = new Set();
        var listOfCorpos = new Set();
        
        for(var i = 0; i < originalData.length; i++){
            listaux.push(originalData[i].value);
            for(var j=0; j<originalData[i].value.length; j++){
                listOfAccounts.push(originalData[i].value[j]);
                
            }
        }
        
        
        for(var key in filters){
            filterValues.push(filters[key].value);
        }
        
        
        if(filterValues.length > 0){
            switch (filterName) {
                    
                case $A.get("$Label.c.Country"):
                    for(var key in data){
                        filteredData[key].value = data[key].value.filter(row => filterValues.includes(row.country));
                    }
                    
                    filteredData = filteredData.filter(countryRow => countryRow.value.length > 0);
                    
                    for(var i = 0; i < listOfAccounts.length; i++){
                        
                        if( filterValues.includes(listOfAccounts[i].country)){
                            listOfCurrencies.add(listOfAccounts[i].currencyCodeAvailableBalance);
                        }
                    }
                    
                    if(selectedFilter!=$A.get("$Label.c.currency")){
                        var listAuxCurrency = [];
                        
                        for(var i= 0 ; i < filterOfFilters.length; i++){
                            if(filterOfFilters[i].name == $A.get("$Label.c.currency") ){
                                filterOfFilters[i].data = filterOfFilters[i].data.filter(row => Array.from(listOfCurrencies).includes(row.value));
                                for(var j=0; j<filterOfFilters[i].data.length ; j++){
                                    listAuxCurrency.push( filterOfFilters[i].data[j].value);
                                }
                            }
                        } 
                        var listAuxOfCurrencies = Array.from(listOfCurrencies);
                        var listToAdd = [];
                        
                        for(var i=0; i<listAuxOfCurrencies.length ; i++){
                            if(listAuxCurrency.includes(listAuxOfCurrencies[i]) == false){
                                listToAdd.push(listAuxOfCurrencies[i]);
                            }   
                        }
                        if(listToAdd.length > 0 ){
                            for(var i = 0 ; i<listToAdd.length ; i++){
                                var optionChecked = false;
                                if(filterValues.includes(listToAdd[i])){
                                    optionChecked = true;
                                }
                                filterOfFilters[1].data.push({
                                    value : listToAdd[i],
                                    displayValue : listToAdd[i],
                                    checked : optionChecked
                                    
                                });
                            }
                        }
                    }
                    
                    
                    // FILTER CORPORATE

                    if(selectedFilter!=$A.get("$Label.c.Corporate")){

                        
                        for(var i = 0; i < listOfAccounts.length; i++){
                            
                            if( filterValues.includes(listOfAccounts[i].country)){
                                listOfCorpos.add(listOfAccounts[i].subsidiaryName);
                            }
                        }
                        
                        
                        var listOfCorporationAux = [];
                        
                        for(var i= 0 ; i < filterOfFilters.length; i++){
                            if(filterOfFilters[i].name == $A.get("$Label.c.Corporate") ){
                                filterOfFilters[i].data = filterOfFilters[i].data.filter(row => Array.from(listOfCorpos).includes(row.value));
                                for(var j=0; j<filterOfFilters[i].data.length ; j++){
                                    listOfCorporationAux.push( filterOfFilters[i].data[j].value);
                                }
                            }
                        } 
                        var listOfCorposAux = Array.from(listOfCorpos);
                        var listToAddCorpo = [];
                        
                        for(var i=0; i<listOfCorposAux.length ; i++){
                            if(listOfCorporationAux.includes(listOfCorposAux[i]) == false){
                                listToAddCorpo.push(listOfCorposAux[i]);
                            }   
                        }
                        if(listToAddCorpo.length > 0 ){
                            for(var i = 0 ; i<listToAddCorpo.length ; i++){
                                var optionChecked = false;
                                if(filterValues.includes(listToAddCorpo[i])){
                                    optionChecked = true;
                                }
                                filterOfFilters[2].data.push({
                                    value : listToAddCorpo[i],
                                    displayValue : listToAddCorpo[i],
                                    checked : optionChecked
                                    
                                });
                            }
                        }
                    }
                    
                    
                    
                    break;
                    
                case $A.get("$Label.c.Corporate"):
                    for(var key in data){
                        filteredData[key].value = data[key].value.filter(row => filterValues.includes(row.subsidiaryName));
                    }
                    
                    filteredData = filteredData.filter(countryRow => countryRow.value.length > 0);
                    
                    //FILTER CURRENCY

                    if(selectedFilter!=$A.get("$Label.c.currency")){

                    
                        for(var i = 0; i < listOfAccounts.length; i++){
                            
                            if( filterValues.includes(listOfAccounts[i].subsidiaryName)){
                                listOfCurrencies.add(listOfAccounts[i].currencyCodeAvailableBalance);
                            }
                        }
                        
                        var listAuxCurrency = [];
                        
                        for(var i= 0 ; i < filterOfFilters.length; i++){
                            if(filterOfFilters[i].name == $A.get("$Label.c.currency") ){
                                filterOfFilters[i].data = filterOfFilters[i].data.filter(row => Array.from(listOfCurrencies).includes(row.value));
                                for(var j=0; j<filterOfFilters[i].data.length ; j++){
                                    listAuxCurrency.push( filterOfFilters[i].data[j].value);
                                }
                            }
                        } 
                        var listAuxOfCurrencies = Array.from(listOfCurrencies);
                        var listToAdd = [];
                        
                        for(var i=0; i<listAuxOfCurrencies.length ; i++){
                            if(listAuxCurrency.includes(listAuxOfCurrencies[i]) == false){
                                listToAdd.push(listAuxOfCurrencies[i]);
                            }   
                        }
                        if(listToAdd.length > 0 ){
                            for(var i = 0 ; i<listToAdd.length ; i++){
                                var optionChecked = false;
                                if(filterValues.includes(listToAdd[i])){
                                    optionChecked = true;
                                }
                                filterOfFilters[1].data.push({
                                    value : listToAdd[i],
                                    displayValue : listToAdd[i],
                                    checked : optionChecked                             
                                });
                            }
                        }
                    }
                    // FILTER COUNTRY
                    if(selectedFilter!=$A.get("$Label.c.Country")){

                        for(var i = 0; i < listOfAccounts.length; i++){  
                            if(filterValues.includes(listOfAccounts[i].subsidiaryName)){ 
                                listOfCountries.add(listOfAccounts[i].country);
                                
                            }
                        }
                        
                        var listAuxCountry = [];
                        
                        for(var i= 0 ; i < filterOfFilters.length; i++){
                            if(filterOfFilters[i].name == $A.get("$Label.c.Country") ){
                                filterOfFilters[i].data = filterOfFilters[i].data.filter(row => Array.from(listOfCountries).includes(row.value));
                                
                                for(var j=0; j<filterOfFilters[i].data.length ; j++){
                                    listAuxCountry.push( filterOfFilters[i].data[j].value);
                                }
                            }
                        } 
                        
                        var listAuxOfCountries = Array.from(listOfCountries);
                        var listToAdd = [];
                        
                        for(var i=0; i<listAuxOfCountries.length ; i++){
                            if(listAuxCountry.includes(listAuxOfCountries[i]) == false){
                                listToAdd.push(listAuxOfCountries[i]);
                            }   
                        }
                        
                        var countryDisplayName = new Set();
                        
                        for(var i=0; i< listOfAccounts.length; i++){
                            if(listToAdd.includes(listOfAccounts[i].country)){
                                countryDisplayName.add({
                                    isoName : listOfAccounts[i].country,
                                    countryName : listOfAccounts[i].countryName
                                });
                                
                                
                            }
                        }
                        
                        
                        var countriesToAdd = Array.from(countryDisplayName);
                        const countriesToShow2 = Array.from(new Set(countriesToAdd.map(a => a.isoName))).map(isoName =>{
                            return countriesToAdd.find( a => a.isoName === isoName)
                        });
                        
                        
                        if(countriesToShow2.length > 0 ){
                            for(var i = 0 ; i < countriesToShow2.length ; i++){
                                var optionChecked = false;
                                if(filterValues.includes(countriesToShow2[i])){
                                    optionChecked = true;
                                }
                                filterOfFilters[0].data.push({
                                    value : countriesToShow2[i].isoName,
                                    displayValue : countriesToShow2[i].isoName + ' - ' + countriesToShow2[i].countryName ,
                                    checked : optionChecked
                                    
                                });
                            }
                        }
                    }
                    
                    
                    break;
                    
                case $A.get("$Label.c.currency"):
                    
                    
                    for(var key in data){
                        filteredData[key].value = data[key].value.filter(row => filterValues.includes(row.currencyCodeAvailableBalance));
                    }
                    
                    filteredData = filteredData.filter(countryRow => countryRow.value.length > 0);
                    
                    
                    // FILTER CORPORATE
                    if(selectedFilter!=$A.get("$Label.c.Corporate")){

                        for(var i = 0; i < listOfAccounts.length; i++){
                            if( filterValues.includes(listOfAccounts[i].currencyCodeAvailableBalance)){
                                listOfCorpos.add(listOfAccounts[i].subsidiaryName);
                            }
                        }
                        
                        
                        
                        var listOfCorporationAux = [];
                        
                        for(var i= 0 ; i < filterOfFilters.length; i++){
                            if(filterOfFilters[i].name == $A.get("$Label.c.Corporate") ){
                                filterOfFilters[i].data = filterOfFilters[i].data.filter(row => Array.from(listOfCorpos).includes(row.value));
                                for(var j=0; j<filterOfFilters[i].data.length ; j++){
                                    listOfCorporationAux.push( filterOfFilters[i].data[j].value);
                                }
                            }
                        } 
                        var listOfCorposAux = Array.from(listOfCorpos);
                        var listToAddCorpo = [];
                        
                        for(var i=0; i<listOfCorposAux.length ; i++){
                            if(listOfCorporationAux.includes(listOfCorposAux[i]) == false){
                                listToAddCorpo.push(listOfCorposAux[i]);
                            }   
                        }
                        if(listToAddCorpo.length > 0 ){
                            for(var i = 0 ; i<listToAddCorpo.length ; i++){
                                var optionChecked = false;
                                if(filterValues.includes(listToAddCorpo[i])){
                                    optionChecked = true;
                                }
                                filterOfFilters[2].data.push({
                                    value : listToAddCorpo[i],
                                    displayValue : listToAddCorpo[i],
                                    checked : optionChecked
                                    
                                });
                            }
                        }
                    }
                    
                    
                    
                    
                    
                    // FILTER CPOUNTRY
                    if(selectedFilter!=$A.get("$Label.c.Country")){

                        for(var i = 0; i < listOfAccounts.length; i++){  
                            if(filterValues.includes(listOfAccounts[i].currencyCodeAvailableBalance)){ 
                            
                                //COUNTRY a INCLUIR
                                listOfCountries.add(listOfAccounts[i].country);
                                
                            }
                        }
                        
                        var listAuxCountry = [];
                        
                        for(var i= 0 ; i < filterOfFilters.length; i++){
                            if(filterOfFilters[i].name == $A.get("$Label.c.Country") ){
                                filterOfFilters[i].data = filterOfFilters[i].data.filter(row => Array.from(listOfCountries).includes(row.value));
                                
                                for(var j=0; j<filterOfFilters[i].data.length ; j++){
                                    listAuxCountry.push( filterOfFilters[i].data[j].value);
                                }
                            }
                        } 
                        
                        var listAuxOfCountries = Array.from(listOfCountries);
                        
                        var listToAdd = [];
                        
                        for(var i=0; i<listAuxOfCountries.length ; i++){
                            if(listAuxCountry.includes(listAuxOfCountries[i]) == false){
                                listToAdd.push(listAuxOfCountries[i]);
                            }   
                        }
                        
                        var countryDisplayName = new Set();
                        
                        for(var i=0; i< listOfAccounts.length; i++){
                            if(listToAdd.includes(listOfAccounts[i].country)){
                                countryDisplayName.add({
                                    isoName : listOfAccounts[i].country,
                                    countryName : listOfAccounts[i].countryName
                                });
                                
                                
                            }
                        }
                        
                        
                        var countriesToAdd = Array.from(countryDisplayName);
                        const countriesToShow = Array.from(new Set(countriesToAdd.map(a => a.isoName))).map(isoName =>{
                            return countriesToAdd.find( a => a.isoName === isoName)
                        });
                        
                        
                        if(countriesToShow.length > 0 ){
                            for(var i = 0 ; i < countriesToShow.length ; i++){
                                var optionChecked = false;
                                if(filterValues.includes(countriesToShow[i])){
                                    optionChecked = true;
                                }
                                filterOfFilters[0].data.push({
                                    value : countriesToShow[i].isoName,
                                    displayValue : countriesToShow[i].isoName + ' - ' + countriesToShow[i].countryName ,
                                    checked : optionChecked
                                    
                                });
                            }
                        }
                    }
                    
                    
                    
                    break;
            }
            
        }
        
        component.set("v.filters" ,filterOfFilters );
        
        return filteredData;
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to order the accounts based on country
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
	*/
    orderByCountry : function(component, event, helper){
        var iAccountList;
        var iCountries;
        
        iAccountList = component.get("v.rGlobalBalance").accountList;
        iCountries = component.get("v.rGlobalBalance").countryList; 
        
        // Call the apex method from the service component
        var params = {
            "iCountries" : iCountries,
            "iAccountList" : iAccountList
        };
        component.find("service").callApex2(component, helper, "c.orderByCountry", params, this.setAccountsByCountry);
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Sets the data fetched in the orderByCountry() helper method
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
	*/
    setAccountsByCountry : function(component, helper, iReturn){     
        var custs = [];             
        for(var key in iReturn){
            var account = iReturn[key];
            custs.push({value:account, key:key});
            
        }
        component.set("v.accountCountryList", custs); 
        component.set("v.firstAccountCountryList", custs);
        
        $A.util.addClass(component.find("spinner"), "slds-hide");
        $A.util.removeClass(component.find("spinner"), "slds-show"); 
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to order the accounts based on currency
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
	*/
    orderByCurrency : function(component, event, helper) {
        
        var iAccountList;
        var iCurrencies;
        
        iAccountList = component.get("v.rGlobalBalance").accountList;
        iCurrencies = component.get("v.rGlobalBalance").currencyList; 
        
        // Call the apex method from the service component
        var params = {
            "iCurrencies" : iCurrencies,
            "iAccountList" : iAccountList
        };
        component.find("service").callApex2(component, helper, "c.orderByCurrency", params, this.setAccountsByCurrency);
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Sets the data fetched in the orderByCurrency() helper method
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
	*/
    setAccountsByCurrency : function(component, helper, iReturn){
        var custs = [];          
        for(var key in iReturn){
            var account = iReturn[key];
            custs.push({value:account, key:key});
        }
        component.set("v.accountCurrencyList", custs);
        component.set("v.firstAccountCurrencyList", custs);
        
        $A.util.addClass(component.find("spinner"), "slds-hide");
        $A.util.removeClass(component.find("spinner"), "slds-show");
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to order the accounts based on subsidiary
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
	*/
    orderBySubsidiary : function(component, event, helper) {
        var iAccountList;
        var iSubsidiaries;
        
        iAccountList = component.get("v.rGlobalBalance").accountList;
        iSubsidiaries = component.get("v.rGlobalBalance").subsidiaryList; 
        
        // Call the apex method from the service component
        var params = {
            "iSubsidiaries" : iSubsidiaries,
            "iAccountList" : iAccountList
        };
        
        component.find("service").callApex2(component, helper, "c.orderBySubsidiary", params, this.setAccountsBySubsidiary);
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Sets the data fetched in the orderBySubsidiary() helper method
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
	*/
    setAccountsBySubsidiary : function(component, helper, iReturn){
        
        var custs = [];                
        for(var key in iReturn){
            var account = iReturn[key];
            custs.push({value:account, key:key});
        }
        
        component.set("v.accountSubsidiaryList", custs);    
        component.set("v.firstAccountSubsidiaryList", custs);    
        
        if(component.get("v.heritagedFilters")==true){
            component.find("filtering").filterData();
        }
        
        $A.util.addClass(component.find("spinner"), "slds-hide");
        $A.util.removeClass(component.find("spinner"), "slds-show");
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the user info stored in SF
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
	*/
    getUserInfo : function(component, event, helper){
        // Call the apex method from the service component
        component.find("service").callApex2(component, helper, "c.getUserInfo", {}, this.setUserInfo);
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Sets the data fetched in the getUserInfo() helper method
    History
    <Date>			<Author>			<Description>
	03/03/2020		Guillermo Giral   	Initial version
	*/
    setUserInfo : function(component, helper, conts){
        for ( var key in conts ) {
            if(key == "getLanguage"){
                component.set("v.currentUserLanguage", conts[key]);
            }
            if(key == "isCashNexusUser"){
                component.set("v.isCashNexus",conts[key]);
            }
        }
    },
    
    /*
	Author:         Shahad Naji
    Company:        Deloitte
    Description:    Function to change the currency based on the tab selected
    History
    <Date>			<Author>			<Description>
    03/03/2020		Shahad Naji   	Initial version
    21/05/2020      Shahad Naji     Store wheather user currency has been updated or not
	*/
    exchangeCurrency : function(component, helper,IsoCode){        
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        try{
            
            var action = component.get("c.setUserCurrency");  
            action.setParams({
                "currencyStr" : IsoCode
            });              
            action.setCallback(this, function(response) {
                var state = response.getState();              
                if (state === "SUCCESS") {
                    component.set("v.rCurrentUserCurrency", IsoCode); 
                    component.set("v.currentUserCurrency", IsoCode); 
                    
                    //AM - 28/10/2020 - FIX INC726
                    var userId = $A.get( "$SObjectType.CurrentUser.Id" );
                    window.localStorage.setItem(userId + "_actualCurrencyChange",  IsoCode);
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
            
        }catch(e){
            console.log("CMP_AccountsParent / exchangeCurrency : " + e);
        }
        
        
    },
    /*
	Author:         Shahad Naji
    Company:        Deloitte
    Description:    Function to sorts the accounts
    History
    <Date>			<Author>			<Description>
	03/03/2020		Shahad Naji   	Initial version
	*/
    sortAccount : function(component, event){
        var s = event.getParam("displayOrder");
        component.set("v.sortSelected", s);
    },
    
    /*
	Author:         Shahad Naji
    Company:        Deloitte
    Description:    Function to create a CSV from an array of objects
    History
    <Date>			<Author>			<Description>
	03/03/2020		Shahad Naji      	Initial version
	*/
    //DO NOT DELETE the following comment lines. They are highly important to display the table headers
    //$Label.c.Country
    //$Label.c.currency
    //$Label.c.Entity
    //$Label.c.SubsidiaryName
    //$Label.c.Alias_Name
    //$Label.c.Date
    //$label.c.Available_Balance
    //$label.c.Book_Balance
    
    getParametersUrl : function(component, event, helper) {
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        //SNJ - 15/04/2020
        if(sPageURLMain.includes('params=')){           
            component.find("service").dataDecryption(component,helper, sPageURLMain, this.handleParams);
        } else {
            helper.initData(component, event, helper);
            helper.getUserInfo(component, event, helper);
        }
    },
    
    handleParams : function(component, helper, response) {
        if(response != "") {
            var sParameterName;
            var iRegister=[];
            var gInit=false;
            for(var i = 0; i < response.length ; i++) {
                sParameterName = response[i].split("="); 
                switch(sParameterName[0]) {
                    case("c__source"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.sourcePage", sParameterName[1]);
                        break;
                    case("c__filters"):
                        sParameterName[1] === undefined ? 'Not found' : gInit=true;component.set("v.heritagedFilters",true); component.set("v.heriFilters",JSON.parse(sParameterName[1]));
                        break;
                    case("c__sourcePage"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.sourcePage", sParameterName[1]);
                        break;
                    case("c__iRegister"):
                        sParameterName[1] === undefined ? 'Not found' : iRegister= JSON.parse(sParameterName[1]);
                        break;
                    case("c__firstTAccountCountryList"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.firstTAccountCountryList", JSON.parse(sParameterName[1]));
                        break;
                    case("c__firstAccountCountryList"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.firstAccountCountryList", JSON.parse(sParameterName[1]));
                        break;
                    case("c__consolidationCurrency"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.selectedCurrency", sParameterName[1]);
                        break;
                    case("c__accountGrouping"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.selectedTimeframe", sParameterName[1]);
                        break;
                }
            }
        }
        helper.initData(component, event, helper);
        helper.getUserInfo(component, event, helper);
    },

    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to encrypt data
    History
    <Date>			<Author>		<Description>
    21/05/2020		R. Alexander Cervino     Initial version*/

    encryptInitialData: function (component, helper, data) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        try {
            var result = "null";
            var action = component.get("c.encryptData");

            action.setParams({ str: JSON.stringify(data) });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                } else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                    if (result != 'null' && result != undefined && result != null) {
                        window.localStorage.setItem(userId + '_' + 'balanceGP', result);
                        window.localStorage.setItem(userId + '_' + 'balanceTimestampGP', new Date());
                    }
                }
            });
            $A.enqueueAction(action);
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History
    <Date>			<Author>		<Description>
    21/05/2020		R. Alexander Cervino     Initial version*/

    decryptInitialData: function (component, event, helper, data) {
        try {
            var result = "null";
            var action = component.get("c.decryptData");
            // Call the apex method from the service component
            var params = {
                "iWhen": "oneTrade",
                "iUserId": $A.get("$SObjectType.CurrentUser.Id")
            };


            action.setParams({ str: data });

            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                errors[0].message);
                            component.find("service").callApex2(component, helper, "c.callMulesoft", params, this.setComponentInitialData);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                } else if (state === "SUCCESS") {
                    result = response.getReturnValue();

                    if (result != null && result != undefined && result != 'null') {

                        result = JSON.parse(result);
                        if (result.responseAcc != undefined && result.responseAcc != null) {
                            result = result.responseAcc;
                        }

                        helper.setComponentInitialData(component, helper, result, true);
                    } else {
                        component.find("service").callApex2(component, helper, "c.callMulesoft", params, this.setComponentInitialData);
                    }

                }
            });
            $A.enqueueAction(action);
        } catch (e) {
            console.error(e);
        }
    }
})