({
    initComponent: function (component, event, helper) {
        var steps = component.get('v.steps');
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 1 && lastModifiedStep == 1) {
            helper.clearInput(component, helper, false);
        }
        let canCreateBeneficiaries = component.get('v.canCreateBeneficiaries');
        if (canCreateBeneficiaries === true) {
            component.set('v.charactersBeforeSuggestions', 4);
            component.set('v.registeredMarker', true);
            component.set('v.showAccountsBeforeSearch', true);
        }
    },

    handleSelectedAccount: function (component, event, helper) {
        helper.selectedAccount(component, event.getParam('account'));
    },

    handleInputSearch: function (component, event, helper) {
        helper.activateDropdown(component, helper, event.target.value);
    },

    handleFocusSearch: function (component, event, helper) {
        component.set('v.showMiniLabel', true);
        helper.activateDropdown(component, helper, event.target.value);
    },

    handleBlurSearch: function (component, event, helper) {
        component.set('v.showMiniLabel', false);
        setTimeout($A.getCallback(function () {
            component.set('v.showDropdown', false);
        }), 250);
    },

    handleClearInput: function (component, event, helper) {
        helper.clearInput(component, helper, false);
    },

    handleSearchAccounts: function (component, event, helper) {
        helper.openSearchAccounts(component, helper);
    },

    handleClickSuggestion: function (component, event, helper) {
        helper.selectedAccount(component, event.getParam('account'));
        component.set('v.showDropdown', false);
    }
})