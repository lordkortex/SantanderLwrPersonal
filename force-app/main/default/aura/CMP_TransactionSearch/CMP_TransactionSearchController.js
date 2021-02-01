({
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to launch the initial mehtod 
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    doInit : function(component, event, helper){
        helper.doInit(component, event, helper);
    },
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function 
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    search : function(component, event, helper) {
        var appEvent = $A.get("e.c:EVT_TransactionSearchEvent"); 
        if(appEvent){
            // Store the updated values to the form filters
            var filters = component.get("v.formFilters");
            filters.countries = component.get("v.selectedCountries");
            filters.accounts = component.get("v.selectedAccounts");
            filters.banks = component.get("v.selectedBanks");
            filters.currencies = component.get("v.selectedCurrencies");
            filters.category = component.get("v.selectedCategory");
            var dates = {};
            dates.from = component.get("v.valueDateFrom");
            dates.to = component.get("v.valueDateTo");
            filters.dates = dates;

            
            component.set("v.formFilters", filters);
            component.set("v.showResults", true); 
            component.set("v.hiddeAccountInfo", false);
            // Create the values for the pills   
            helper.setPillsValues(component, filters);

            // Set the params of the event
            appEvent.setParam("searchFilters", filters);
            // Fire the event
            appEvent.fire();
        }
        //component.set("v.comesFromGlobalBalance", true);
        component.set("v.showPills" , true);
        component.set("v.isSearching", false);

    },
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Call clear helper fucntion to clear data in search menu. 
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    clear : function(component, event, helper){
        helper.clearHelper(component, event, helper);

    }, 
    //DO NOT DELETE the following comment lines. They are highly important to access custom labels
    //$Label.c.LastUpdate
    //$Label.c.EndOfDay
    getInformation : function(component, event, helper){
        var balance = event.target.value;
        var option1 = $A.get("$Label.c.LastUpdate");
        var option2 = $A.get("$Label.c.EndOfDay");
        
        var countryList = [];
        var accountList = [];
        var bankList = [];
        var currencyList = [];
        var categoryList = [];
        
        if(balance == option1){
            countryList = component.get("v.formValues").lastUpdateCountries;
            accountList = component.get("v.formValues").lastUpdateAccounts;
            bankList = component.get("v.formValues").lastUpdateBanks;
            currencyList =  component.get("v.formValues").lastUpdateCurrencies;
            categoryList = component.get("v.formValues").transactionCategories;
            component.set("v.countryList", countryList);
            component.set("v.accountList",accountList);
            component.set("v.bankList",bankList);
            component.set("v.currencyList",currencyList);
            component.set("v.categoryList",categoryList);
            
        }
        if(balance == option2){
            countryList = component.get("v.formValues").endOfDayCountries;
            accountList = component.get("v.formValues").endOfDayAccounts;
            bankList = component.get("v.formValues").endOfDayBanks;
            currencyList =  component.get("v.formValues").endOfDayCurrencies;
            categoryList = component.get("v.formValues").transactionCategories;
            component.set("v.countryList",countryList);
            component.set("v.accountList",accountList);
            component.set("v.bankList",bankList);
            component.set("v.currencyList",currencyList);
            component.set("v.categoryList",categoryList);
        }
        
    },
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to load the search data from the searh menu.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    getFormFilters : function(component, event, helper){
        var inputId = event.target.id;
        var value = event.target.value;
        switch (inputId) {
            case "debitInput" :
                component.set("v.formFilters.debit", value);
                break;
            case "creditInput" :
                component.set("v.formFilters.credit", value);
                break;
            case "amountFromInput" :
                component.set("v.formFilters.amountFrom", value);
                break;
            case "amountToInput" :
                component.set("v.formFilters.amountTo", value);
                break;
            case "clientRefInput" :
                component.set("v.formFilters.clientRef", value);
                break;
            case "descriptionInput" :
                component.set("v.formFilters.description", value);
                break;
        }
        
    },
   /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to delete one pill value.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    removeOnePill : function(component, event, helper){
    
        var pillId = event.getParams();
        
        var pillList = component.get("v.pills");
        pillList = pillList.filter(data => data.key != pillId.currentPill);
        component.set("v.pills",pillList);

        if(pillList.length == 0 ){
            component.set("v.showPills" , false);
            component.set("v.isSearching" , true);
            helper.clearHelper(component, event, helper);
        }
       
    },
  /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to delete all pills values.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    removeAllPills : function(component, event, helper){
        component.set("v.pills", '');
        component.set("v.showPills" , false);
        component.set("v.isSearching" , true);
        helper.clearHelper(component, event, helper);
    },


})