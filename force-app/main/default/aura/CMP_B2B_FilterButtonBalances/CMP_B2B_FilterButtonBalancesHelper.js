({
    showDropdown: function (component, helper) {
        if (component.get('v.showDropdown') == true) {
            component.set('v.showDropdown', false);
        } else {
            component.set('v.showDropdown', true);
        }
        helper.callEventSave(component, helper, null);
    },

    hideDropdown: function (component, helper) {        
        component.set('v.showDropdown', false);
    },

    calculateAmountInformed: function (component, helper) {
        let amountInformed = 0;
        let minimumBalance = component.get('v.minimumBalance');
        let maximumBalance = component.get('v.maximumBalance');
        if (!$A.util.isEmpty(minimumBalance)) {
            amountInformed++;
        }
        if (!$A.util.isEmpty(maximumBalance)) {
            amountInformed++;
        }
        component.set('v.amountInformed', amountInformed);
    },

    callEventSave: function (component, helper, action) {
        var saveFilters = component.getEvent('saveFilters');
        saveFilters.setParams({
            'showDropdown': component.get('v.showDropdown'),
            'name': component.get('v.name'),
            'action': action
        });
        saveFilters.fire();
    },

    validateInput: function (component, event, helper) {
        console.log(component.get("v.minimumBalance"));
        console.log(component.get("v.maximumBalance"))
        if(component.get("v.minimumBalance")!='' && component.get("v.minimumBalance")!=null && component.get("v.maximumBalance")!='' && component.get("v.maximumBalance")!=null){
            if(component.get("v.minimumBalance")>component.get("v.maximumBalance")){                
                component.set("v.errorAmounts",true);
                $A.util.addClass(component.find("from"), 'error');                    
                $A.util.removeClass(component.find("to"), 'error');
                
            }else{
                component.set("v.errorAmounts",false);
                $A.util.removeClass(component.find("from"), 'error');
                $A.util.removeClass(component.find("to"), 'error');
            }
        }else{
            component.set("v.errorAmounts",false);
            $A.util.removeClass(component.find("from"), 'error');
            $A.util.removeClass(component.find("to"), 'error');
        }
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Clears balances input to reset filter options
    History
    <Date>			<Author>			<Description>
	15/06/2020		Shahad Naji   		Initial version
    */
    clearBalances : function (component, event, helper){
        component.set('v.minimumBalance', '');
        component.set('v.maximumBalance', '');
        component.set('v.formattedValueFrom', '');
        component.set('v.formattedValueTo', '');
        component.set('v.userInputFrom', '');
        component.set('v.userInputTo', '');
        component.set('v.errorAmounts', false);
        
        
        helper.calculateAmountInformed(component, helper);
        helper.hideDropdown(component, helper);
        helper.callEventSave(component, helper, 'clear');
    } 
})