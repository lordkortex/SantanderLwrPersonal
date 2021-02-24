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
        var orderByLabel = component.get("v.selectedTimeframe");
        
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
        var newValue = event.getParam("value"); 
        var IsoCode = newValue;       
        var oldValue = event.getParam("oldValue");

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
    Description:    This method downloads Global Balance content 
    History
    <Date>			<Author>			<Description>
	20/01/2020		Shahad Naji     	Initial version
	*/
    download : function(component, event, helper){
        var isDownload = event.getParam("isDownload");
        if(isDownload){
            helper.download(component, event);
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
			helper.initData(component, event, helper);
		}
	},
    
    filterSearch : function(component, event, helper) {
        if(event){
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
        var currentCurrency = "";
        var globalBalanceInfo = component.get("v.rGlobalBalance");
        //currentCurrency = component.get("v.rCurrentUserCurrency");
        
        currentCurrency = $A.get("$Locale.currencyCode");
        // Set the global balance amounts
        
        if(currentCurrency != ""){
            var globalBalanceInfo = component.get("v.rGlobalBalance");
            //currentCurrency = component.get("v.rCurrentUserCurrency");
            
            currentCurrency = $A.get("$Locale.currencyCode");
            // Set the global balance amounts
            
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
                //JVV -Testing pending //
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
            // OLD
            //component.set("v.globalBookBalance", globalBalanceInfo.currencyGlobalBalance[currentCurrency][0]);            
            //component.set("v.globalAvailableBalance", globalBalanceInfo.currencyGlobalBalance[currentCurrency][1]);  
        }
    }    
})