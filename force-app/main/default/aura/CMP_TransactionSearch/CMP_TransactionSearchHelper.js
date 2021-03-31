({
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to charge the initial picklist values.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    doInit : function(component, event,  helper) {
        try{
            var action = component.get("c.initClass");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") { 
                    var iReturn = response.getReturnValue();
                    component.set("v.formValues", iReturn);
                    
                    var countryList = [];
                    var accountList = [];
                    var bankList = [];
                    var currencyList = [];
                    var categoryList = [];
                    
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
                else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +  errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action); 
        }catch(e){
            console.log(e);
        }
    },
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to set the pills values.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    setPillsValues : function(component, filters){
        var pills = [];
        for(const [key,value] of Object.entries(filters)){
            switch (key) {
                case "debit" :
              console.log(component.get("v.formFilters.debit"));
                if(component.get("v.formFilters.debit") != undefined &&  component.get("v.formFilters.debit") != 'Debit'  &&  component.get("v.formFilters.debit") != false){
                    pills.push({
                        key: 'debit',
                        value : $A.get("{!$Label.c.Debit}")
                    });
                    break;
                }
                case "credit" :
                console.log(component.get("v.formFilters.credit"))
               if(component.get("v.formFilters.credit") != undefined  &&  component.get("v.formFilters.credit") != 'Credit' &&  component.get("v.formFilters.credit") != false){
                    pills.push({
                        key: 'credit',
                        value : $A.get("{!$Label.c.MovementHistory_Credit}")
                    });
                    }
                    break;

                case "amountFrom" :
                  var description = component.get("v.formFilters.amountFrom");
                if(description != null && description != undefined && description != ' ' ) {
                    pills.push({
                        key: 'amountFrom',
                        value :  component.get("v.formFilters.amountFrom")
                    });
                    }
                    break;

                case "amountTo" :
                var description = component.get("v.formFilters.amountTo");
                if(description != null && description != undefined && description != ' ' ) {
                    pills.push({
                        key: 'amountTo',
                        value : component.get("v.formFilters.amountTo")
                    }); 
                    }
                    break;

                case "clientRef" :
                var description = component.get("v.formFilters.clientRef");
                if(description != null && description != undefined && description != ' ' ) {
                    pills.push({
                        key: 'clientRef',
                        value : component.get("v.formFilters.clientRef")
                    });
                     } 
                    break;

                case "description" :
                    var description = component.get("v.formFilters.description");
                   if(description != null && description != undefined && description != ' ' ) {
                    pills.push({
                        key: 'description',
                        value : component.get("v.formFilters.description")
                    }); 
                }
                    break;

                case "countries" :
                var filterCountries = component.get("v.selectedCountries");
                filterCountries = filterCountries.filter(pill => pill != $A.get("{!$Label.c.SelectAllCountries}"));
                filterCountries =filterCountries.filter(pill => pill != null);
                filterCountries =filterCountries.filter(pill => pill != $A.get("{!$Label.c.multipleChoice}"));
                    if(filterCountries.length > 2){
                        pills.push({
                            key: 'countries',
                            value :filterCountries.length  + " " + $A.get("{!$Label.c.Countries}")
                        }); 
                    } else {
                          for(var i=0; i<filterCountries.length ; i++){
                            pills.push({
                                key: 'countries'+i,
                                value :filterCountries[i].split('-')[0]
                            });
                        }
                    }
                    break;

                case "accounts" :
                var filterAcc = component.get("v.selectedAccounts");
                filterAcc = filterAcc.filter(pill => pill != $A.get("{!$Label.c.AllAccounts}"));
                filterAcc =filterAcc.filter(pill => pill != null);
                filterAcc =filterAcc.filter(pill => pill != $A.get("{!$Label.c.multipleChoice}"));
                    if(filterAcc.length > 2){
                        pills.push({
                            key: 'accounts',
                            value : filterAcc.length  + " " + $A.get("{!$Label.c.Accounts}")
                        }); 
                    } else {
                          for(var i=0; i < filterAcc.length ; i++){
					        pills.push({
                                key: 'accounts'+i,
                                value : filterAcc[i].split('-')[1]
                            });
					  }
                    }
                    break;

                case "banks" :            
                var filterBanks = component.get("v.selectedBanks");
                filterBanks = filterBanks.filter(pill => pill != $A.get("{!$Label.c.AllBanks}"));
                filterBanks =filterBanks.filter(pill => pill != null);
                filterBanks =filterBanks.filter(pill => pill != $A.get("{!$Label.c.multipleChoice}"));

                    if(filterBanks.length > 2){
                      
                        pills.push({
                            key: 'banks',
                            value : filterBanks.length  + " " + $A.get("{!$Label.c.Banks}")
                        }); 
                     
                    } else {
                          for(var i=0; i<filterBanks.length ; i++){
                                if (filterBanks[i] != $A.get("{!$Label.c.AllBanks}")){ 
                                pills.push({
                                    key: 'banks'+i,
                                    value : filterBanks[i]
                                });
                            }
                        }
                    }
                    break;

                case "currencies" :
                var filterCurrency = component.get("v.selectedCurrencies");
                filterCurrency = filterCurrency.filter(pill => pill != $A.get("{!$Label.c.AllCurrencies}"));
                filterCurrency =filterCurrency.filter(pill => pill != null);
                filterCurrency =filterCurrency.filter(pill => pill != $A.get("{!$Label.c.multipleChoice}"));

                    if(filterCurrency.length > 2){
                        pills.push({
                            key: 'currencies',
                            value : filterCurrency.length  + " " + $A.get("{!$Label.c.Currencies}")
                        }); 
                    } else {
                          for(var i=0; i<filterCurrency.length ; i++){
					        pills.push({
                                key: 'currencies'+i,
                                value : filterCurrency[i].split('-')[1]
                            });
                        }
                    }
                    break;
                
                case "dates" :
                var dateFrom;
                var dateTo;
                if(component.get("v.valueDateFrom") != undefined){
                     dateFrom = component.get("v.valueDateFrom").split('-')[2] +'/'+component.get("v.valueDateFrom").split('-')[1] +'/'+component.get("v.valueDateFrom").split('-')[0];
                }
                if(component.get("v.valueDateTo") != undefined){
                    dateTo = component.get("v.valueDateTo").split('-')[2] +'/'+component.get("v.valueDateTo").split('-')[1] +'/'+component.get("v.valueDateTo").split('-')[0];
                }
                if((dateFrom != null &&  dateFrom != undefined) && (dateTo == null|| dateTo == undefined)){
                    pills.push({
                        key: 'dates',
                        value : dateFrom
                    }); 
                }else if((dateTo != null &&  dateTo != undefined) && (dateFrom == null|| dateFrom == undefined)){
                    pills.push({
                        key: 'dates',
                        value :dateTo
                    }); 
                } else if ((dateTo != null &&  dateTo != undefined) && (dateFrom != null && dateFrom != undefined)){
                    pills.push({
                        key: 'dates',
                        value : dateFrom + " - " + dateTo
                    }); 
                }else{
                    break;
                }
              
                    break;

                case "category" :
                console.log('category');
                console.log(component.get("v.selectedCategory"));
                    if(component.get("v.selectedCategory") != undefined && component.get("v.selectedCategory") != $A.get("$Label.c.selectOne")){
                        pills.push({
                            key: 'category',
                            value : component.get("v.selectedCategory")
                        }); 
                    
                    }
                    break;
            }
        }
        component.set("v.pills", pills);

        
    },
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to clear the search values.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
    clearHelper : function (component, event, helper){
        var countrySave = component.get("v.countryList");
        component.set("v.countryList",'');
        component.set("v.countryList",countrySave);
        //component.set("v.selectedCountries", $A.get("$Label.c.multipleChoice"));
        var emptyArray =[];
        component.set("v.selectedCountries", emptyArray);
        
    

     
        var accSave = component.get("v.accountList");
        component.set("v.accountList",'')
        component.set("v.accountList",accSave);
        //component.set("v.selectedAccounts", $A.get("$Label.c.multipleChoice"));
        var emptyArray =[];
        component.set("v.selectedAccounts", emptyArray);

        var bankSave = component.get("v.bankList");
        component.set("v.bankList",'')
        component.set("v.bankList",bankSave);
        //component.set("v.selectedBanks", $A.get("$Label.c.multipleChoice"));
        var emptyArray =[];
        component.set("v.selectedBanks", emptyArray);

        var curSave = component.get("v.currencyList");
        component.set("v.currencyList",'')
        component.set("v.currencyList",curSave);
       // component.set("v.selectedCurrencies", $A.get("$Label.c.multipleChoice"));
        var emptyArray =[];
        component.set("v.selectedCurrencies", emptyArray);
        

 
        component.set("v.selectedCategory",$A.get("$Label.c.selectOne"));
        component.set("v.formFilters.amountFrom",null);
        component.set("v.formFilters.amountTo",null);
        component.set("v.formFilters.description",null);
        component.set("v.formFilters.clientRef",null);
        component.set("v.formFilters.debit",false);
        component.set("v.formFilters.credit",false);
        component.set("v.valueDateFrom", null);
        component.set("v.valueDateTo", null);

      

        if(component.get("v.pills").length > 0){
            component.set("v.pills", '');
            
        }
    }
  
})