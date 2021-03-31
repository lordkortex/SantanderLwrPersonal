({
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method is to populate the component data on its initialization
    History
    <Date>			<Author>			<Description>
	28/10/2019		Shahad Naji     	Initial version
	*/
    doInit : function(component, event, helper) {        
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );	
        var tabLabel = "";
        var storage = window.localStorage.getItem(userId + '_' + 'tab');
        if(storage != null && storage != undefined){
            if(storage == 'lastUpdate'){
                component.set("v.isLastUpdate",true);
            }else{
                component.set("v.isLastUpdate",false);
            }
        }
        
        if(component.get("v.isLastUpdate") == false){
            tabLabel = 'EndOfDayTab';
            window.localStorage.setItem(userId + '_' + 'tab', 'endOfDay');
        }else{
            window.localStorage.setItem(userId + '_' + 'tab', 'lastUpdate');
        }
        
        helper.getParametersUrl(component, event, helper);       
        
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method is to populate the component data on its initialization
    History
    <Date>			<Author>			<Description>
	28/10/2019		Shahad Naji     	Initial version
	*/
    getURLParams : function(component, event, helper) {        
        if(component.get("v.heritagedFilters")==false)
        {
            helper.getParametersUrl(component, event, helper);
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
    orderCards : function(component, event, helper) { 
        var tabs = component.get("v.isLastUpdate")
        var orderByLabel = component.get("v.selectedTimeframe");
        if(tabs == true){
            if(orderByLabel ==  $A.get("$Label.c.Country")){
                component.set("v.sortSelected",  $A.get("$Label.c.Country"));
                helper.filterGroupBy(component, event, helper);
            }else if(orderByLabel ==  $A.get("$Label.c.currency")){
                component.set("v.sortSelected",  $A.get("$Label.c.currency"));
                helper.filterGroupBy(component, event, helper);
            }else {
                component.set("v.sortSelected",  $A.get("$Label.c.Corporate"));
                helper.filterGroupBy(component, event, helper);
            }
        }else{
            if(orderByLabel ==  $A.get("$Label.c.Country")){
                component.set("v.sortSelected",  $A.get("$Label.c.Country"));
                helper.filterGroupBy(component, event, helper);
            }else if(orderByLabel ==  $A.get("$Label.c.currency")){
                component.set("v.sortSelected",  $A.get("$Label.c.currency"));
                helper.filterGroupBy(component, event, helper);
            }else {
                component.set("v.sortSelected",  $A.get("$Label.c.Corporate"));
                helper.filterGroupBy(component, event, helper);
            }
        }
        
        
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    Currency Exchanger
    History
    <Date>			<Author>			<Description>
    28/10/2019		Shahad Naji     	Initial version
    21/05/2020      Shahad Naji         Store updated currency change
	*/
    exchangeCurrency : function(component, event, helper) {
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var newValue = event.getParam("value"); 
        var IsoCode = newValue;       
        var oldValue = event.getParam("oldValue");
        
        // if((newValue != oldValue) && oldValue != undefined && oldValue != ""){
        //     // window.localStorage.setItem(userId + '_' + 'selectedCurrency', newValue);
        //     // window.localStorage.setItem(userId + '_' + 'isUserCurrencyUpdated', true); 
        
        
        //     // var tabScreenMapItem = JSON.parse(window.localStorage.getItem(userId + '_' + 'tabScreenMap'));
        //     // var currentTab = component.get("v.isLastUpdate");
        //     // var tabScreenMap = {};
        //     // if(currentTab){                
        //     //     tabScreenMap.balanceGP = tabScreenMapItem.balanceGP;
        //     //     tabScreenMap.balanceEODGP = tabScreenMapItem.balanceEODGP;
        //     //     tabScreenMap.balance = true;
        //     //     tabScreenMap.balanceEOD = tabScreenMapItem.balanceEOD;
        //     //     if(tabScreenMapItem.balanceGP == true && tabScreenMapItem.balanceEODGP == true && tabScreenMapItem.balanceEOD == true){
        //     //         window.localStorage.setItem(userId + '_' + 'isUserCurrencyUpdated', false);
        //     //     }
        //     // }else{
        //     //     tabScreenMap.balanceGP = tabScreenMapItem.balanceGP;
        //     //     tabScreenMap.balanceEODGP = tabScreenMapItem.balanceGP;
        //     //     tabScreenMap.balance = tabScreenMapItem.balance;
        //     //     tabScreenMap.balanceEOD = true; 
        //     //     if(tabScreenMapItem.balanceGP == true && tabScreenMapItem.balanceEODGP == true && tabScreenMapItem.balance == true){
        //     //         window.localStorage.setItem(userId + '_' + 'isUserCurrencyUpdated', false);
        //     //     }
        //     // }
        //     // window.localStorage.setItem(userId + '_' + 'tabScreenMap', JSON.stringify(tabScreenMap));
        
        
        
        //     helper.exchangeCurrency(component, helper,IsoCode);        
        // }
        // if(oldValue == undefined){
        //     // var tabScreenMapItem = JSON.parse(window.localStorage.getItem(userId + '_' + 'tabScreenMap'));
        //     // if(tabScreenMapItem == null){
        //     //     //window.localStorage.setItem('isUserCurrencyUpdated', false);
        //     //     var tabScreenMap = {};
        //     //     tabScreenMap.balanceGP = false;
        //     //     tabScreenMap.balanceEODGP = false;
        //     //     tabScreenMap.balance = false;
        //     //     tabScreenMap.balanceEOD = false;
        //     //     window.localStorage.setItem(userId + '_' + 'tabScreenMap', JSON.stringify(tabScreenMap));
        //     // }else{
        
        //     //     var currentTab = component.get("v.isLastUpdate");
        //     //     var tabScreenMap = {};
        //     //     if(currentTab){                
        //     //         tabScreenMap.balanceGP = tabScreenMapItem.balanceGP;
        //     //         tabScreenMap.balanceEODGP = tabScreenMapItem.balanceEODGP;
        //     //         tabScreenMap.balance = true;
        //     //         tabScreenMap.balanceEOD = tabScreenMapItem.balanceEOD;
        //     //         if(tabScreenMapItem.balanceGP == true && tabScreenMapItem.balanceEODGP == true && tabScreenMapItem.balanceEOD == true){
        //     //             window.localStorage.setItem(userId + '_' + 'isUserCurrencyUpdated', false);
        //     //         }
        //     //     }else{
        //     //         tabScreenMap.balanceGP = tabScreenMapItem.balanceGP;
        //     //         tabScreenMap.balanceEODGP = tabScreenMapItem.balanceGP;
        //     //         tabScreenMap.balance = tabScreenMapItem.balance;
        //     //         tabScreenMap.balanceEOD = true; 
        //     //         if(tabScreenMapItem.balanceGP == true && tabScreenMapItem.balanceEODGP == true && tabScreenMapItem.balance == true){
        //     //             window.localStorage.setItem(userId + '_' + 'isUserCurrencyUpdated', false);
        //     //         }
        //     //     }
        //     //     window.localStorage.setItem(userId + '_' + 'tabScreenMap', JSON.stringify(tabScreenMap));
        //     // }
        
        //     //window.localStorage.setItem('isUserCurrencyUpdated', false);
        //     helper.exchangeCurrency(component, helper,IsoCode);        
        // }
        if((newValue != oldValue && oldValue != undefined && oldValue != "") || oldValue == undefined){
            helper.exchangeCurrency(component, helper,IsoCode); 
        }
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method changes the displaying order of the accounts
    History
    <Date>			<Author>			<Description>
	28/10/2019		Shahad Naji     	Initial version
	*/
    doSort : function(component, event, helper){
        helper.sortAccount(component, event);       
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method expands or collapses the different sections
    History
    <Date>			<Author>			<Description>
	20/01/2020		Shahad Naji     	Initial version
	*/
    showHideContent : function(component, event, helper){       
        $A.util.removeClass(component.find("spinner"), "slds-hide");
        $A.util.addClass(component.find("spinner"), "slds-show");
        var oldSelectedTab = component.get("v.tabSelected");
        var newSelectedTab = event.getParam("activateTabId");
        var deactivateTabs = event.getParam("deactivateTabs");
        
        if(oldSelectedTab != newSelectedTab){
            component.set("v.tabSelected", newSelectedTab);
            var activeTabContent = component.find(newSelectedTab+"Content");            
            $A.util.addClass(activeTabContent, 'slds-show');
            $A.util.removeClass(activeTabContent, 'slds-hide');            
            for(var i in deactivateTabs){
                var deactivateTabContent = component.find(deactivateTabs[i]+"Content");
                $A.util.removeClass(deactivateTabContent, 'slds-show');
                $A.util.addClass(deactivateTabContent, 'slds-hide');
            }
            
            if(newSelectedTab == "EndOfDayTab"){
                var tGlobalBalance = component.get("v.tGlobalBalance");
                if(tGlobalBalance == null){
                    helper.initData(component, event, "EndOfDayTab");
                } else{
                    helper.initData(component, event, "EndOfDayTab");
                    $A.util.addClass(component.find("spinner"), "slds-hide");
                    $A.util.removeClass(component.find("spinner"), "slds-show");
                }               
            }
            else{
                helper.initData(component, event, "LastUpdateTab"); 
            }       
            
        }
        else{
            $A.util.addClass(component.find("spinner"), "slds-hide");
            $A.util.removeClass(component.find("spinner"), "slds-show");
        }
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method downloads Global Balance content 
    History
    <Date>			<Author>			<Description>
	20/01/2020		Shahad Naji     	Initial version
	*/
    download : function(component, event, helper){
        console.log("pasa");
        var isDownload = event.getParam("isDownload");
        if(isDownload){
            helper.download(component, event);
        }
    },
    
    ischangeTab : function(component, event, helper){
        component.set("v.isLoading" , true);        
        var selectTab = event.getParam("activateTab");
        var tab;        
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        if (selectTab == $A.get("$Label.c.LastUpdate")) {
            tab = 'LastUpdateTab';
            window.localStorage.setItem(userId + '_' + 'tab', 'lastUpdate');
            component.set("v.isLastUpdate", true);
            var emptyList=[];
            component.set("v.heritagedFilters", true);
            component.set("v.heriFilters", component.get("v.filters"));
            component.set("v.filters", emptyList);
            //component.set("v.selectedCurrency","");
            helper.initData(component, event, helper, tab);
            helper.getUserInfo(component, event, helper);
            
        } else {
            tab = 'EndOfDayTab';
            window.localStorage.setItem(userId + '_' + 'tab', 'endOfDay');
            component.set("v.isLastUpdate", false);
            var emptyList=[];
            component.set("v.heritagedFilters", true);
            component.set("v.heriFilters", component.get("v.filters"));
            component.set("v.filters", emptyList);
            //component.set("v.selectedCurrency","");
            helper.initData(component, event, helper, tab);       
            helper.getUserInfo(component, event, helper);
            console.log(component.get("v.filters"));
        }
        
    },
    
    /*
	Author:         R. Cervino
    Company:        Deloitte
	Description:    Function to clear all the filters and set them by default
    History
    <Date>			<Author>			<Description>
	27/04/2020		R. Cervino   	Initial version
	*/
    clearAllFilters : function(component, event,helper) {
        if(event){
            var isEndOfDay = component.get("v.tabSelected");
            
            helper.initData(component, event, helper,isEndOfDay);
        }
    },
    
    filterSearch : function(component, event, helper) {
        if(event){
            if(component.get("v.isLastUpdate") == true){
                if(component.get("v.sortSelected") == $A.get("$Label.c.Country")){
                    var filters = event.getParam("selectedFilters");
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountCountryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,event.getParam("filterName"));
                    component.set("v.accountCountryList", filteredData);
                }else if(component.get("v.sortSelected") == $A.get("$Label.c.currency")){
                    var filters = event.getParam("selectedFilters");
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountCurrencyList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,event.getParam("filterName"));
                    component.set("v.accountCurrencyList", filteredData);
                }else{
                    var filters = event.getParam("selectedFilters");
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountSubsidiaryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,event.getParam("filterName"));
                    component.set("v.accountSubsidiaryList", filteredData);
                }
            }else{                
                if(component.get("v.sortSelected") == $A.get("$Label.c.Country")){
                    var filters = event.getParam("selectedFilters");
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountCountryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,event.getParam("filterName"));
                    component.set("v.tAccountCountryList", filteredData);
                    
                }else if(component.get("v.sortSelected") == $A.get("$Label.c.currency")){
                    var filters = event.getParam("selectedFilters");
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountCurrencyList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,event.getParam("filterName"));
                    component.set("v.tAccountCurrencyList", filteredData);
                }else{
                    var filters = event.getParam("selectedFilters");
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountSubsidiaryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component,event.getParam("filterName"));
                    component.set("v.tAccountSubsidiaryList", filteredData);
                }
            } 
            // Check how many options are checked after filtering them and update the displayed value
            let filterObject = component.get("v.filters");
            for(var key in filterObject){
                if(filterObject[key].type == "checkbox"){
                    filterObject[key].numberChecked = filterObject[key].data.filter(row => row.checked).length;
                }
            }
            component.set("v.filters", filterObject);
        }
    },
    getChangeCurrencies : function (component, event, helper) {
        helper.getCurrenciesMap(component, event);
    },
    
    fillToastAttributes: function (component, event, helper) {
        var params = event.getParams();
        component.set("v.show",params.show );
        component.set("v.type",params.type );
        component.set("v.message",params.message );
        component.set("v.toBeHiddenToast", true);
        
    },
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to navigate to the previous screen
                    sending the necessary parameters
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral  	Initial version
	*/
    navigateToPreviousScreen : function(component, event, helper) {     
        component.find("service").redirect("home", "");
    },
    
    /*
	Author:         Pablo Tejedor & Teresa Santos
    Company:        Deloitte
    Description:    Function to download an .xml file
    				with the balance tree
    History
    <Date>			<Author>						<Description>
	23/04/2020		Pablo Tejedor & Teresa Santos  	Initial version
    04/04/2020		Guillermo Giral  				Change separator type
	*/
    fileToDonwload : function(component, event, helper) { 
        component.find("downloadAccounts").downloadAccountsExcel();
        //var LUorEOD = component.get("v.isLastUpdate");
        // if(LUorEOD)
        //{
        //}
        /* else
        {

        
            var sorted = component.get("v.sortSelected");
            var accList =[];
            
            if(LUorEOD == true){
                if(sorted == $A.get("$Label.c.Country")){
                    accList = component.get("v.accountCountryList");
                    
                }else if(sorted == $A.get("$Label.c.currency")){
                    accList = component.get("v.accountCurrencyList");
                }else{
                    accList = component.get("v.accountSubsidiaryList");
                }
                
            }else
                if(sorted == $A.get("$Label.c.Country")){
                    accList = component.get("v.tAccountCountryList");
                }else if(sorted == $A.get("$Label.c.currency")){
                    accList = component.get("v.tAccountCurrencyList");
                }else{
                    accList = component.get("v.tAccountSubsidiaryList");
                }
            var listaux =[]
            var listOfAccounts =[]
            for(var i = 0; i < accList.length; i++){
                listaux.push(accList[i].value);
                for(var j=0; j<accList[i].value.length; j++){
                    listOfAccounts.push(accList[i].value[j]);
                    
                }
            }
            var listAccCodes = [];
            for(var i=0; i<listOfAccounts.length; i++){
                listAccCodes.push(listOfAccounts[i].codigoCuenta);
            }
            listAccCodes= listAccCodes.toString().replace(/,/g, '.');
            helper.downloadFile(component, event, helper,listAccCodes,LUorEOD );
        }*/
        
    },
    
    /*
	Author:         Pablo Tejedor & Teresa Santos
    Company:        Deloitte
    Description:    Function to download an .xml file
    				with the balance tree
    History
    <Date>			<Author>						<Description>
    22/04/2020		Guillermo Giral  				Change separator type
    11/05/2020		Shahad Naji						Set userCurrency
	*/
    updateGlobalBalance : function(component, event, helper) { 
        var isLastUpdate = component.get("v.isLastUpdate");
        var currentCurrency = $A.get("$Locale.currencyCode");
        // Set the global balance amounts
        if(isLastUpdate){
            var globalBalanceInfo = component.get("v.rGlobalBalance");
            
            
        } else {
            var globalBalanceInfo = component.get("v.tGlobalBalance");
            currentCurrency = $A.get("$Locale.currencyCode");
            if(currentCurrency != ""){
                component.set("v.globalBookBalance", globalBalanceInfo.currencyGlobalBalance[currentCurrency][0]);  
                
                component.set("v.globalAvailableBalance", globalBalanceInfo.currencyGlobalBalance[currentCurrency][1]);      
            }
            
        }
        
        
        
        if(currentCurrency != ""){
            var actualCurrency;
            if(component.get("v.selectedCurrency") == undefined)
            {
                component.set("v.globalBookBalance", globalBalanceInfo.currencyGlobalBalance[currentCurrency][0]);
                component.set("v.globalAvailableBalance", globalBalanceInfo.currencyGlobalBalance[currentCurrency][1]); 
                
                actualCurrency = currentCurrency;
            }
            else 
            {
                component.set("v.globalBookBalance", globalBalanceInfo.currencyGlobalBalance[component.get("v.selectedCurrency")][0]);
                component.set("v.globalAvailableBalance", globalBalanceInfo.currencyGlobalBalance[component.get("v.selectedCurrency")][1]); 
                actualCurrency = component.get("v.selectedCurrency");
            }
            var auxTipoDeCambio = new Map();
            var exchangeRatesAux = "";
            globalBalanceInfo.tipoDeCambioList.forEach(element => auxTipoDeCambio.get(element.divisa) == null ? auxTipoDeCambio.set(element.divisa, element) : '');
            if(auxTipoDeCambio.has(actualCurrency))
            {
                for(let [key, value]of auxTipoDeCambio) {
                    if(key != actualCurrency)
                    {
                        exchangeRatesAux += (key + '=' + (auxTipoDeCambio.get(key).importeDecimal / auxTipoDeCambio.get(actualCurrency).importeDecimal).toFixed(6)+ ' ' + (auxTipoDeCambio.get(key).fecha != undefined ? auxTipoDeCambio.get(key).fecha.split("T")[0] : ''));
                        exchangeRatesAux += "; ";
                    }
                    
                    
                }
            }
            else{
                for(let [key, value]of auxTipoDeCambio) {
                    if(key != actualCurrency)
                        
                        exchangeRatesAux += (key + '=' + (auxTipoDeCambio.get(key).importeDecimal)+' '+(auxTipoDeCambio.get(key).fecha != undefined ? auxTipoDeCambio.get(key).fecha.split("T")[0] : ''));
                    exchangeRatesAux += "; ";
                }
            }
            component.set("v.exchangeRatesString", exchangeRatesAux);
            
        }
    },
    
    /*
	Author:         Joaquin Vera
    Company:        Deloitte
	Description:    Function to dinamically apply filters on check
    History
    <Date>			<Author>			<Description>
	16/10/2020		Joaquin Vera   	Initial version
	*/
    filterChanged : function(component, event, helper)
    {
        
        if(event){ 
            var adaptedFilterAux = event.getParams();
            var finalFilterAdapted = {};
            finalFilterAdapted.button = "filter";
            finalFilterAdapted.filterName= event.getParam("filterName");
            finalFilterAdapted.selectedFilters = event.getParam("selectedOptions");
            
            
            
            if(component.get("v.isLastUpdate") == true){
                if(component.get("v.sortSelected") == $A.get("$Label.c.Country")){
                    var filters = finalFilterAdapted.selectedFilters;
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountCountryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component, finalFilterAdapted.filterName); 
                }else if(component.get("v.sortSelected") == $A.get("$Label.c.currency")){
                    var filters = finalFilterAdapted.selectedFilters;
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountCurrencyList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component, finalFilterAdapted.filterName); 
                }else{
                    var filters = finalFilterAdapted.selectedFilters;
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstAccountSubsidiaryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component, finalFilterAdapted.filterName); 
                }
            }else{                
                if(component.get("v.sortSelected") == $A.get("$Label.c.Country")){
                    var filters = finalFilterAdapted.selectedFilters;
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountCountryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component, finalFilterAdapted.filterName); 
                    
                }else if(component.get("v.sortSelected") == $A.get("$Label.c.currency")){
                    var filters = finalFilterAdapted.selectedFilters;
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountCurrencyList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component, finalFilterAdapted.filterName); 
                }else{
                    var filters =finalFilterAdapted.selectedFilters;
                    component.set("v.filterParams", filters);
                    var initialDataCards = JSON.parse(JSON.stringify(component.get("v.firstTAccountSubsidiaryList")));
                    var filteredData = helper.filterData(initialDataCards, filters,component, finalFilterAdapted.filterName); 
                }
            } 
            // Check how many options are checked after filtering them and update the displayed value
            let filterObject = component.get("v.filters");
            for(var key in filterObject){
                if(filterObject[key].type == "checkbox"){
                    filterObject[key].numberChecked = filterObject[key].data.filter(row => row.checked).length;
                }
            }
            component.set("v.filters", filterObject);
        } 
        
        
    }       
    
    
})