({
    doInit : function(component, event, helper) {
        var dates = component.get("v.dates");

        // Only To date is filled, then fill From with -25 months
        if(dates != undefined && dates.length>0){
            if(dates[1] != undefined ){
                if(dates[1].length>10){
                    dates[1]=dates[1].split('T')[0];
                } 
            }

            if(dates[0] != undefined ){

                if(dates[0].length>10){
                    dates[0]=dates[1].split('T')[0];
                } 
            }
            component.set("v.dates",dates);

        }

        component.set("v.datesBis",component.get("v.dates"));
    },

    updateDatesBis : function(component, event, helper) {
        component.set("v.datesBis",component.get("v.dates"));
    },

    closeModal : function(component, event, helper) {
        /*
		var numberActiveFilters = helper.calculateNumberActiveFilters(component);
		component.set("v.numberActiveFilters", numberActiveFilters);
		*/
        component.set("v.showModal", false);
    },
    showDropdown : function(component, event, helper){
        var buttonClicked = event.currentTarget.id;
        var close = component.get("v.closeDropdown");
        
        if(buttonClicked ==  $A.get("$Label.c.Country")){	
            component.set("v.showDropdowns", $A.get("$Label.c.Country"));	
        }else if(buttonClicked ==  $A.get("$Label.c.Bank")){
            component.set("v.showDropdowns", $A.get("$Label.c.Bank"));
        }else if(buttonClicked ==  $A.get("$Label.c.Account")){
            component.set("v.showDropdowns", $A.get("$Label.c.Account"));
        }else if(buttonClicked ==  $A.get("$Label.c.Category")){
            component.set("v.showDropdowns", $A.get("$Label.c.Category"));
        }else if(buttonClicked ==  $A.get("$Label.c.currency")){
            component.set("v.showDropdowns", $A.get("$Label.c.currency"));
            
        }
    },
    
    hideDropdown : function(component, event, helper){
        component.set("v.showDropdowns",'');
    },
    checkAccounts :function(component, event, helper) {
        var id = event.currentTarget.id
        var checked = event.currentTarget.checked;
        var accounts = component.get("v.mapFilter[2].data");
        var matchingAccount = accounts.filter(data=> data.name == id);
        matchingAccount.isChecked = checked;
        component.set("v.mapFilter[2].data", accounts);
        
    },
    chekOptions :function(component, event, helper) {
        var optionId = event.currentTarget.id;
        var optionName = event.currentTarget.name;
        var checked = event.currentTarget.checked;
        
        var filters = component.get("v.filters");
        var selectedOptions = [];
        
        // Loop through the filters to find the checked / unchecked option and fire the selected options
        for(var key in filters){
            if(filters[key].name == optionName && filters[key].type == "checkbox"){
                filters[key].data[optionId].checked = checked;
                filters[key].numberChecked = filters[key].data.filter(option => option.checked).length;
                var selectedFilter = filters[key].name;
                if(checked){
                    selectedOptions.push(filters[key].data[optionId].value);
                }
            }
        }
        // Fire the option selection event so that the other dropdowns can be updated
        component.set("v.filters", filters);
        var evt = component.getEvent("onOptionSelection");
        if(evt){
            evt.setParams({
                "filterName" : selectedFilter,
                "selectedOptions" : selectedOptions
            });
            evt.fire();
        }
    },
    saveData: function(component, event, helper) {
        var idButton = event.currentTarget.id;
        if(idButton){
            var filters = component.get("v.filters");
            for(var key in filters){
                if(filters[key].name == $A.get("$Label.c.amount") && idButton == "AmountFrom"){
                    //Remove error
                    component.set("v.showAmountError", false);
                    component.set("v.showFormatError", false);
                    // component.find('AmountFrom').setCustomValidity('');
                    if(filters[key].selectedFilters == undefined){
                        filters[key].selectedFilters = {};
                        filters[key].selectedFilters.from = event.currentTarget.value;
                    } else if((parseInt(event.currentTarget.value) > parseInt(filters[key].selectedFilters.to)) 
                              && filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != ""){
                        filters[key].selectedFilters.from = event.currentTarget.value;
                        // event.currentTarget.value = undefined;
                        //Show error
                        component.set("v.showAmountError", true);
                    }
                    else if(parseInt(event.currentTarget.value) < 0 || isNaN(event.currentTarget.value)){
						component.set("v.showFormatError", true);
						filters[key].selectedFilters.from = event.currentTarget.value;
					} else {
                        filters[key].selectedFilters.from = event.currentTarget.value;
                    }					
                } else if(filters[key].name == $A.get("$Label.c.amount") && idButton == "AmountTo"){
                    
                    //Remove error
                    component.set("v.showAmountError", false);
                    component.set("v.showFormatError", false);
                    
                    if(filters[key].selectedFilters == undefined){
                        filters[key].selectedFilters = {};
                        filters[key].selectedFilters.to = event.currentTarget.value;
                    } else if((parseInt(event.currentTarget.value) < parseInt(filters[key].selectedFilters.from)) 
                              && filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != ""){
                        filters[key].selectedFilters.to = event.currentTarget.value;
                        // event.currentTarget.value = undefined;
                        //Show error
                        component.set("v.showAmountError", true);
                    } 
                    else if(parseInt(event.currentTarget.value) < 0 || isNaN(event.currentTarget.value)){
						component.set("v.showFormatError", true);
						filters[key].selectedFilters.to = event.currentTarget.value;
					}
                    else {
                        filters[key].selectedFilters.to = event.currentTarget.value;
                    }
                }
            }
            component.set("v.filters", filters);
        }
    },
    getFormFilters : function(component, event, helper){
        var inputId = event.target.id;
        var value = event.target.value;
        var check = event.target.checked;
        if(inputId){
            switch (inputId) {
                case "debitInput" :
                    if(component.get("v.formFilters.debit")==undefined || component.get("v.formFilters.debit")==false){
                        component.set("v.formFilters.debit", check);
                        component.set("v.formFilters.credit", !check);
                    }else{
                        component.set("v.formFilters.debit", false);
                    }
                break;
                    case "creditInput" :
                        if(component.get("v.formFilters.credit")==undefined || component.get("v.formFilters.credit")==false){
                            component.set("v.formFilters.credit", check);
                            component.set("v.formFilters.debit", !check);
                        }else{
                            component.set("v.formFilters.credit", false);
                        }
                break;
                case "clientRefInput" :
                    component.set("v.formFilters.clientRef", value);
                    break;
                case "descriptionInput" :
                    component.set("v.formFilters.description", value);
                    break;
            }
        }
    },
    clearAll : function(component, event, helper){
        // Clear all filter values
        var filters = component.get("v.filters");
        for(var key in filters){
            if(filters[key].type == "checkbox"){
                for(var option in filters[key].data){
                    filters[key].data[option].checked = false;
                    filters[key].numberChecked = 0;
                }
            } else if(filters[key].type == "text"){
                filters[key].selectedFilters = {"from" : '', "to" : ''};
                component.set("v.showAmountError", false);
                component.set("v.showFormatError", false);
            } else if(filters[key].type == "dates"){
                
                //Remove error
                component.find('dateFromInput').setCustomValidity('');
                component.find('dateFromInput').reportValidity();
                
                component.find('dateToInput').setCustomValidity('');
                component.find('dateToInput').reportValidity();
                component.set("v.dates", []);

                component.set("v.datesBis",[]);
                component.set("v.fromDate", undefined);
                component.set("v.toDate", undefined);
                filters[key].data = [];

            }
        }
        component.set("v.filters", filters);
        
        // Clear advanced filters values
        var formFilters = component.get("v.formFilters");
        var options = Object.keys(formFilters);
        for(var key in options){
            if(options[key] == "debit" || options[key] == "credit"){
                formFilters[options[key]] = false;
            } else if(options[key] == "clientRef" || options[key] == "description"){
                formFilters[options[key]] = '';
            }
        }
        component.set("v.formFilters", formFilters);
		component.set("v.numberActiveFilters", 0);
		
		// Fire the event so the filters return to their initial status
		var clearAllEvt = component.getEvent("clearAllFilters");
		if(clearAllEvt){
			clearAllEvt.fire();
        }
        helper.applySearch(component, event, helper);
    },
    applySearch : function(component, event, helper){ 
        helper.applySearch(component, event, helper);
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Validates that the To date is greater
					than the From date
    History
    <Date>			<Author>			<Description>
	07/04/2020		Guillermo Giral   	Initial version
	*/
    validateDate : function(component, event, helper){
        var dates = component.get("v.dates");
		helper.checkDates(component, helper);

        //Remove error
        component.find('dateFromInput').setCustomValidity('');
        
        component.find('dateToInput').setCustomValidity('');
        
        if(dates[1] < dates[0]){
            if(event.getSource().getLocalId() == "dateFromInput"){
                // dates[0] = undefined;
                //Show error
                component.find('dateFromInput').setCustomValidity($A.get("$Label.c.validationDate"));
                component.find('dateFromInput').reportValidity();
            } else if(event.getSource().getLocalId() == "dateToInput"){
                // dates[1] = undefined;
                //Show error
                component.find('dateToInput').setCustomValidity($A.get("$Label.c.validationDate"));
                component.find('dateToInput').reportValidity();
            }		
            component.set("v.dates", dates);
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method exposed by the component to calculate
                    the number of active filters
    History
    <Date>			<Author>			<Description>
	26/05/2020		Guillermo Giral   	Initial version
	*/
    calculateActiveFilters : function(component, event, helper){
        helper.calculateNumberActiveFilters(component);
    }
})