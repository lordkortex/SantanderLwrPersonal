({
    initComponent: function (component,event, helper) {
        
        console.log(helper);
        var steps = component.get('v.steps');
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        var isEditing = component.get('v.isEditing');
        
        if (focusStep == 1 && lastModifiedStep == 1) {
            helper.clearInput(component, helper, false);
        } else {
            helper.loadAccountData(component, event, helper);
        }
        alert(component.get("v.transferType"));
    },
    
    handleSelectedAccount: function (component, event, helper) {
        helper.selectedAccount(component, event.getParam('account'));
    },
    
    handleInputSearch: function (component, event, helper) {
        var account = component.get('v.account');
        helper.activateDropdown(component, helper, event.target.value);
    },

    handleFocusSearch: function (component, event, helper) {
        component.set('v.showMiniLabel', true);
        var account = component.get('v.account');
        helper.activateDropdown(component, helper, event.target.value);
    },

    handleBlurSearch: function (component,event, helper) {
        component.set('v.showMiniLabel', false);
        setTimeout($A.getCallback(function () {
            component.set('v.showDropdown', false);
        }), 250);
    },

    handleClearInput: function (component, event, helper) {
        helper.clearInput(component, helper, false);
    },

    handleSearchAccounts: function (component, event,helper) {
        helper.openSearchAccounts(component, helper);
    },
    
    handleRecNewBeneficiary: function (component, event,helper) {
        helper.validateInternationalIBAN(component, event.getParam('account'));    	
    },

    handleClickSuggestion: function (component, event, helper) {
        helper.selectedAccount(component, event.getParam('account'));
        component.set('v.showDropdown', false);
    },
    excludeAccount: function (component, event, helper) {
		var params = event.getParam('arguments');
		if (params) component.set('v.account', params.map);
        if (params) component.set('v.accountData', params.map);

        helper.getBeneficiaryAccountsFees(component, event, helper);
    },
    handleListOfAccount : function (component, event, helper, value){

        let newListOfAccounts = helper.removeAccountFromList(valuecomponent.get('v.accountList'), component.get('v.dataSelectOrigin'));

    },

})