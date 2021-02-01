({
    doInit : function(component, event, helper) {
        helper.getInformation(component, event);
    },

      /*
	Author:         Shahad
    Company:        Deloitte
    Description:    Update selected currency
    History
    <Date>			<Author>			<Description>
	23/12/2019		Shahad Naji     	Initial version
	*/
    selectCurrency:function(component, event, helper){
         
        if(event){
            if(event.getName() == "dropdownExchangeCurrency"){
                var aux = event.getParam("selectedValues");       
     	        helper.selectCurrency(component, event, aux[0]);
            } else {
                var aux = event.getParam("arguments");
                helper.selectCurrency(component, event, aux.currencyIsoCode);
            }
        }
    },

        /*
    Author:         Shahad
    Company:        Deloitte
    Description:    This method is to select "LastUpdateTab" tab
    History
    <Date>			<Author>			<Description>
    21/05/2020		Shahad Naji     	Set inicial currency
    */
    initSelectedCurrency : function(component, event, helper){
        if(event){
            if(event.getName() == "dropdownExchangeCurrency"){
                var aux = event.getParam("selectedValues");       
                var iSurrency = aux[0];
                 if(iCurrency != ''){
                    component.set("v.currentCurrency", iCurrency);
                }
            } else {
                var aux = event.getParam("arguments");
                var iCurrency =  aux.currencyIsoCode;
                if(iCurrency != ''){
                    component.set("v.currentCurrency", iCurrency);
                }
            }
        }
    },
    
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method is to select "LastUpdateTab" tab
    History
    <Date>			<Author>			<Description>
	23/12/2019		Shahad Naji     	Initial version
	*/
    LastUpdateTab : function(component, event, helper){
        if(!component.get("v.isLastUpdate")){  
            component.set("v.isLastUpdate", true);
            var tabevent= component.getEvent("AccountsTab");
            tabevent.setParams({
                "activateTab" : $A.get("$Label.c.LastUpdate")
            })
            tabevent.fire();
            //helper.selectTab(component, "LastUpdateTab", "EndOfDayTab");
        }
    },

    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    This method is to select "EndOfDayTab" tab
    History
    <Date>			<Author>			<Description>
	23/12/2019		Shahad Naji     	Initial version
	*/
    EndOfDayTab : function(component, event, helper){
        if(component.get("v.isLastUpdate")){  
            component.set("v.isLastUpdate", false);
            var tabevent= component.getEvent("AccountsTab");
            tabevent.setParams({
                "activateTab" : $A.get("$Label.c.EndOfDay")
            })
            tabevent.fire();
            //helper.selectTab(component, "EndOfDayTab", "LastUpdateTab"); 
        }
    },
    
    displayCurrencies: function(component, event, helper) {
        var changeElement_one = component.find("dropdownCurrency");
        $A.util.toggleClass(changeElement_one, "slds-is-open");
        $A.util.toggleClass(changeElement_one, "slds-is-close");       
        event.stopPropagation();
    },

    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    Method to go back
    History
    <Date>			<Author>			<Description>
    27/02/2020		Shahad Naji     	Initial version
    25/03/2020      Guillermo Giral     Added the firing of an event to handle the navigation from the parent
	*/
    goBack : function(component, event, helper) {
        var fireNavigationEvent = component.get("v.fireNavigationEvent");
        if(fireNavigationEvent){
            var evt = component.getEvent("navigateBack");
            if(evt){
                evt.fire();
            }
        } else {
            window.history.back();
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Calculates the latest date displayed on the screen
    History
    <Date>			<Author>			<Description>
    08/04/2020      Guillermo Giral     Initial version
	*/
    calculateLatestDate : function(component, event, helper) {
        var params = event.getParam("arguments");
        if(params){
            var accountsInfo = params.accountsInfo;
            var isLastUpdate = params.isLastUpdate;
            var theDate = params.theUpdate;
            var theDateMain = params.theUpdateMain;
            var iDates = [];
            for(var acc in accountsInfo){
                if(accountsInfo[acc].lastUpdateAvailableBalance != undefined && accountsInfo[acc].lastUpdateAvailableBalance != ""){
                    iDates.push(accountsInfo[acc].lastUpdateAvailableBalance);
                }
            }
            if(iDates.length > 0){
               
                helper.getDateOfUpdate(component, iDates, isLastUpdate, theDate, theDateMain);
            }
        }
    }
})