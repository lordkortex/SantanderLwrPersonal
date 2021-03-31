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
    initData :  function (component, event, helper, tab){
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var tabLabel = "";
        if(tab == "EndOfDayTab"){
            //tabLabel = $A.get("$Label.c.EndOfDay");
            tabLabel = "endOfDay";
            component.set("v.isLastUpdate", false);
            component.set("v.tabSelected", 'EndOfDayTab');
        }
        else{
            //tabLabel = $A.get("$Label.c.LastUpdate");
            tabLabel = "lastUpdate";
            component.set("v.isLastUpdate", true);
            component.set("v.tabSelected", 'LastUpdateTab');
        }
        
        // Call the apex method from the service component
        var params = {
            "iWhen" : tabLabel,
            "iUserId" : $A.get("$SObjectType.CurrentUser.Id")      
        };
        
        component.set("v.tabLabel", tabLabel);
        component.set("v.isLoading" , true);

        
        if(tab != "EndOfDayTab"){

            var storageBalance = window.localStorage.getItem(userId + '_' + 'balanceGP');
            var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceTimestampGP');
            if(storageBalance != 'null' && storageBalance != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 ){
                helper.decryptInitialData(component, event, helper,  storageBalance); 
            }else{
                component.find("service").callApex2(component, helper, "c.callMulesoft", params , this.setComponentInitialData);        
            }
        }else{
 
            var storageBalanceEOD = window.localStorage.getItem(userId + '_' + 'balanceEODGP');
            var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceEODTimestampGP');
            if(storageBalanceEOD != 'null' && storageBalanceEOD != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 ){
                helper.decryptInitialData(component, event, helper,  storageBalanceEOD);
            }else{
                component.find("service").callApex2(component, helper, "c.callMulesoft", params , this.setComponentInitialData);        
            }
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
            if(component.get("v.isLastUpdate") == true){
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
            }else{
                if(component.get("v.sortSelected") == $A.get("$Label.c.Country")){
                    var filters = component.get("v.filterParams");
                    
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountCountryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,'');
                    component.set("v.tAccountCountryList", filteredData);
                }else if(component.get("v.sortSelected") == $A.get("$Label.c.currency")){
                    var filters = component.get("v.filterParams");
                    
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountCurrencyList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,'');
                    component.set("v.tAccountCurrencyList", filteredData);
                }else{
                    var filters = component.get("v.filterParams");
                    
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountSubsidiaryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,'');
                    component.set("v.tAccountSubsidiaryList", filteredData);
                }
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
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        //component.set("v.isLoading" , true);
        if(iReturn != null){

            if(decrypt!=true){
                helper.encryptInitialData(component, helper, iReturn);
            }

            // Set the preferred user date and number
            component.set("v.userPreferredDateFormat", (iReturn.mapUserFormats.dateFormat != '' || iReturn.mapUserFormats.dateFormat != undefined) ? iReturn.mapUserFormats.dateFormat : "dd/MM/yyyy");
            component.set("v.userPreferredNumberFormat", (iReturn.mapUserFormats.numberFormat != '' || iReturn.mapUserFormats.numberFormat != undefined) ? iReturn.mapUserFormats.numberFormat : "###.###.###,##");
            
            
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
 
            
        },
        
    setComponentInitialDataUpdate : function(component, helper, iReturn, divisa){
  
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var tabLabel = component.get("v.tabLabel");
        var currentCurrency = "";
        if(iReturn.currencyList.includes(divisa)){
            var userCurrency = divisa;
        }
        
        
        if(tabLabel == "endOfDay"){
            component.set("v.tGlobalBalance", iReturn);                          
            component.set("v.currentUserCurrency", userCurrency);
            component.set("v.tCurrentUserCurrency",iReturn.divisaPrincipal);
            component.set("v.tCurrentUserCurrency",userCurrency);
            component.set("v.tCurrencyList", iReturn.tipoDeCambioList);
            currentCurrency = component.get("v.tCurrentUserCurrency");
            component.set("v.selectedCurrency",userCurrency );           
            component.set("v.accountLastUpdate", iReturn.headerLastModifiedDate);
            if(iReturn.accountList != undefined){
                component.find("accountTitleDropdown_two").calculateLastUpdated(false, iReturn.accountList, iReturn.headerLastModifiedDate, iReturn.headerLastModifiedDateMain); 
            }
            
        }else{
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
            
        }
        component.set("v.tabsChange", !component.get("v.tabsChange")); 
        
        helper.orderByCountry(component, event, helper, tabLabel);
        helper.orderByCurrency(component, event, helper, tabLabel);
        helper.orderBySubsidiary(component, event, helper, tabLabel);
        
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
            
            if(tabLabel == "endOfDay"){
                component.find("accountTitleDropdown_two").selectCurrency(sCurrency);
            } else {
                component.find("accountTitleDropdown_one").selectCurrency(sCurrency);
            }
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
    orderByCountry : function(component, event, helper, tabLabel){
        var iAccountList;
        var iCountries;
        
        //if(tabLabel == $A.get("$Label.c.LastUpdate")){
        if(tabLabel == "lastUpdate"){
            iAccountList = component.get("v.rGlobalBalance").accountList;
            iCountries = component.get("v.rGlobalBalance").countryList; 
        }
        //if(tabLabel == $A.get("$Label.c.EndOfDay")){
        if(tabLabel == "endOfDay"){  
            iAccountList = component.get("v.tGlobalBalance").accountList;
            iCountries = component.get("v.tGlobalBalance").countryList;
        }
        
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
        var tabLabel = component.get("v.tabLabel");               
        for(var key in iReturn){
            var account = iReturn[key];
            custs.push({value:account, key:key});
            
        }
        if(tabLabel == "lastUpdate"){
            component.set("v.accountCountryList", custs); 
            component.set("v.firstAccountCountryList", custs);
        }
        if(tabLabel == "endOfDay"){
            component.set("v.tAccountCountryList", custs); 
            component.set("v.firstTAccountCountryList", custs);
        }
        
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
    orderByCurrency : function(component, event, helper, tabLabel) {
        
        var iAccountList;
        var iCurrencies;
        
        if(tabLabel == "lastUpdate"){
            iAccountList = component.get("v.rGlobalBalance").accountList;
            iCurrencies = component.get("v.rGlobalBalance").currencyList; 
        }
        if(tabLabel == "endOfDay"){
            iAccountList = component.get("v.tGlobalBalance").accountList;
            iCurrencies = component.get("v.tGlobalBalance").currencyList;
        }
        
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
        var tabLabel = component.get("v.tabLabel");              
        for(var key in iReturn){
            var account = iReturn[key];
            custs.push({value:account, key:key});
        }
        if(tabLabel == "lastUpdate"){
            component.set("v.accountCurrencyList", custs);
            component.set("v.firstAccountCurrencyList", custs);
        }
        if(tabLabel == "endOfDay"){
            component.set("v.tAccountCurrencyList", custs);
            component.set("v.firstTAccountCurrencyList", custs);
        }
        
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
    orderBySubsidiary : function(component, event, helper, tabLabel) {
        var iAccountList;
        var iSubsidiaries;
        
        if(tabLabel == "lastUpdate"){
            iAccountList = component.get("v.rGlobalBalance").accountList;
            iSubsidiaries = component.get("v.rGlobalBalance").subsidiaryList; 
        }
        if(tabLabel == "endOfDay"){
            iAccountList = component.get("v.tGlobalBalance").accountList;
            iSubsidiaries = component.get("v.tGlobalBalance").subsidiaryList;
        }
        
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
        
        var tabLabel = component.get("v.tabLabel");
        var custs = [];                
        for(var key in iReturn){
            var account = iReturn[key];
            custs.push({value:account, key:key});
        }
        
        if(tabLabel == "lastUpdate"){
            component.set("v.accountSubsidiaryList", custs);    
            component.set("v.firstAccountSubsidiaryList", custs);    
        }
        if(tabLabel == "endOfDay"){
            component.set("v.tAccountSubsidiaryList", custs);  
            component.set("v.firstTAccountSubsidiaryList", custs);      
        } 
        
        if(component.get("v.heritagedFilters")==true){
            console.log(component.find("filtering"));
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
                    var res = response.getReturnValue();  
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
            
            var storage = window.localStorage.getItem(userId + '_' + 'tab');
            if(storage != null && storage != undefined){
                if(storage == 'lastUpdate'){
                    helper.initData(component, event, helper, 'LastUpdateTab');
                }else{
                    helper.initData(component, event, helper, 'EndOfDayTab');
                }
            }else{
                helper.initData(component, event, helper, 'LastUpdateTab');
            }
            //helper.initData(component, event, helper, 'LastUpdateTab');
            
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
                    case("c__tabs"):
                        sParameterName[1] === undefined ? 'Not found' : gInit=true;component.set("v.isLastUpdate", sParameterName[1]);
                        var tabLabel = "LastUpdate";
                        if(sParameterName[1] == 'false'){
                            tabLabel = 'EndOfDayTab';
                        }
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
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var storage = window.localStorage.getItem(userId + '_' + 'tab');
        if(storage != null && storage != undefined){
            if(storage == 'lastUpdate'){
                helper.initData(component, event, helper, 'LastUpdateTab');
            }else{
                helper.initData(component, event, helper, 'EndOfDayTab');
            }
        }else{
            helper.initData(component, event, helper, tabLabel);
        }
        helper.getUserInfo(component, event, helper);
    },
    
    /*Author:       Teresa Santos y Pablo Tejedor
    Company:        Deloitte
    Description:    Method to download the file
    History
    <Date>			<Author>		<Description>
    12/12/2019		Teresa Santos y Pablo Tejedor     Initial version*/
    
    downloadFile : function(component, event, helper,listAccCodes,LUorEOD){
        //First retrieve the doc and the remove it
        try{            
            this.retrieveFile(component, event, helper,listAccCodes,LUorEOD).then(function(results){
                if(results!=''&& results!=undefined && results!=null){
                    var domain=$A.get('$Label.c.domainCashNexus');
                    
                    window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';
                    
                    setTimeout(function(){
                        helper.removeFile(component, event, helper, results);
                    }, 80000);
                }
            });
            
        } catch (e) {
            console.log(e);
        }
    },
    
    /*Author:       Teresa Santos y Pablo Tejedor
    Company:        Deloitte
    Description:    Method to remove the downloaded file
    History
    <Date>			<Author>		<Description>
    17/12/2019		Teresa Santos y Pablo Tejedor     Initial version*/
    
    removeFile : function(component, event, helper, ID){
        
        try{
            var action = component.get("c.removeFile");
            //Send the payment ID
            action.setParams({id:ID});
            action.setCallback(this, function(response) {
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
                }else if (state === "SUCCESS") {
                }
            });
            $A.enqueueAction(action);
            
        } catch (e) {
            console.log(e);
        }
    },
    
    /*Author:       Teresa Santos y Pablo Tejedor
    Company:        Deloitte
    Description:    Method to retieve the file
    History
    <Date>			<Author>		<Description>
    16/12/2019		Teresa Santos y Pablo Tejedor     Initial version*/
    
    retrieveFile : function(component, event, helper,listAccCodes,LUorEOD){
        try{
            var action = component.get("c.downloadFileDoc");
            var groupBy = component.get("v.selectedTimeframe");
            var orderCode = "";
            if(groupBy == $A.get("$Label.c.currency")){
                orderCode = "1";
            } else if(groupBy == $A.get("$Label.c.Country")){
                orderCode = "0";
            } else if(groupBy == $A.get("$Label.c.Corporate")){
                orderCode ="2";
            }
            //Send the service params
            
            action.setParams({
                isLastUpdate: LUorEOD,
                accCode : listAccCodes,
                order : orderCode,
                currencyX : component.get("v.tCurrentUserCurrency"),
                bookBalance : component.get("v.globalBookBalance"),
                valueBalance : component.get("v.globalAvailableBalance")
            });
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }else if (state === "SUCCESS") {
                        resolve(response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            });
            
        } catch (e) {
            console.log(e);
        }
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
            var tab = component.get("v.tabLabel");

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

                        if (tab != "endOfDay") {
                            window.localStorage.setItem(userId + '_' + 'balanceGP', result);
                            window.localStorage.setItem(userId + '_' + 'balanceTimestampGP', new Date());
                        } else {
                            window.localStorage.setItem(userId + '_' + 'balanceEODGP', result);
                            window.localStorage.setItem(userId + '_' + 'balanceEODTimestampGP', new Date());
                        }

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
            var tab = component.get("v.tabLabel");
            var userId = $A.get("$SObjectType.CurrentUser.Id");
            // Call the apex method from the service component
            var params = {
                "iWhen": tab,
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