({
	doInit : function(component, event, helper) {
        helper.setCountry(component, event, helper); 
	},
        
    handleClearInput: function (component, event, helper) {
        helper.clearInput(component, event, helper);
    },
    
    handleFocus: function (component, event, helper) { 
        component.set('v.showMiniLabel', true);
    },

	handleBlur: function (component, event, helper) { 
        component.set('v.showMiniLabel', false);
        let accountMap = component.get('v.account');
        let accHolder = component.get('v.accHolder');
        if ($A.util.isEmpty(accHolder)) {
            let errorMsg = $A.get('$Label.c.B2B_Error_Enter_Input')
            let fieldName = $A.get('$Label.c.Account_Holder');
            errorMsg = errorMsg.replace('{0}', fieldName);
            component.set('v.accHolderError', errorMsg);
        }
        accountMap.subsidiaryName = accHolder;
        component.set('v.account', accountMap);
	},
	
	handleInput: function (component, event, helper) { 
        let input = event.target.value;
        if (!$A.util.isEmpty(input)) {
            component.set('v.accHolderError', '');
        }
        component.set('v.accHolder', input);		
	}
})