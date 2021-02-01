({
    
    /*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Initializes the step, clearing the fields if a previous step has been modified.
    History
    <Date>			<Author>		       <Description>
    13/10/2020      Bea Hill               Initital version
    ----------------------------------------------------------------------------------*/
    initComponent: function (component,event, helper) {
        var steps = component.get('v.steps');
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 1 && lastModifiedStep == 1) {
            helper.clearInput(component, helper, false);
        }
    },
    /*
    initComponent: function (component,event, helper) {
        console.log(helper);
        var steps = component.get('v.steps');
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        var isEditing = component.get('v.isEditing');
        
        if (focusStep == 1 && lastModifiedStep == 1) {
            // if (isEditing == false) {               
                // console.log('not in isEditing mode ');
                helper.clearInput(component, helper, false);
            // }
        } else {
            helper.loadAccountData(component, event, helper);
        }
    },

    controlIsModified: function (component, event, helper) {
        let isEditing = component.get('v.isEditing');
        if (isEditing == true) {
            component.set('v.isModified', false);
        }
        
    },

    handleInputSearch: function (component, event, helper) {
        var account = component.get('v.account');
        var isForExpenses = false;
        if (!$A.util.isEmpty(account)) {
            isForExpenses = true;
        } 
        component.set('v.isForExpenses', isForExpenses);
        helper.activateDropdown(component, helper, event.target.value);
    },
    

    handleFocusSearch: function (component, event, helper) {
        component.set('v.showMiniLabel', true);
        var account = component.get('v.account');
        var isForExpenses = false;
        if (!$A.util.isEmpty(account)) {
            isForExpenses = true;
        } 
        component.set('v.isForExpenses', isForExpenses);
        helper.activateDropdown(component, helper, event.target.value);
    },

    handleBlurSearch: function (component,event, helper) {
        component.set('v.showMiniLabel', false);
        setTimeout($A.getCallback(function () {
            component.set('v.showDropdown', false);
            component.set('v.showDropdownExpenses', false);
        }), 250);
    },

    handleClearInput: function (component, event, helper) {
        helper.clearInput(component, helper, false);
    },

    handleSelectedAccount: function (component, event, helper) {
        component.set('v.isForExpenses', event.getParam('isForExpenses'));
        helper.selectedAccount(component, event.getParam('account'));
    },

    handleSearchAccounts: function (component, event,helper) {
        component.set('v.isForExpenses', false);
        helper.openSearchAccounts(component, helper);
    },

    handleClickSuggestion: function (component, event, helper) {
        helper.selectedAccount(component, event.getParam('account'));
        component.set('v.showDropdown', false);
        component.set('v.showDropdownExpenses', false);
    },
    */

    handleRadioYESChecked: function (component, event, helper) {
        component.set('v.checkedYES', true);
        component.set('v.isModified', true);
    },

    handleRadioNOChecked: function (component, event, helper) {
        //helper.clearInput(component, helper, true);
        component.set('v.checkedYES', false);
        component.set('v.expensesAccount', {});
        component.set('v.searchedStringExpenses', '');
        component.set('v.isModified', true);
    },

    /*
    handleSearchAccountsForExpenses: function (component, event,helper) {
        component.set('v.isForExpenses', true);
        helper.openSearchAccounts(component, helper);
    },

    handleClearInputExpenses: function (component, event,helper) {
        helper.clearInput(component, helper, true);
    }
    */
    
    
     /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to be executed when an account is selected from CMP_B2B_Card_Account 
    History
    <Date>			<Author>			<Description>
	05/10/2020		Shahad Naji   		Initial version based on CMP_B2B_SelectIndividualAccount.handleSelectedAccount
    13/10/2020		Bea Hill			Set isModified to true when selecting account
    */
    //$Label.c.B2B_Not_informed_account
    handleSelectedAccount : function (component, event, helper){
        var accountList = component.get('v.accountList');
        if(!$A.util.isEmpty(accountList)){
            if(accountList.length <= 6){
                component.set('v.errorMSG', '');
                var selectedAccount = event.getParam('account');
                if(!$A.util.isEmpty(selectedAccount)){                    
                    component.set('v.account', selectedAccount);
                    component.set('v.searchedString', selectedAccount.displayNumber);
                    component.set('v.isModified', true);
                    let shownCards = component.find('shownCards');
                    if (typeof shownCards != "undefined" && shownCards != null) {                        
                        for (let i = 0; i < shownCards.length; i++) {
                            if (shownCards[i].get('v.account').displayNumber.localeCompare(selectedAccount.displayNumber) == 0) {
                                shownCards[i].set('v.selected', true);
                            } else {
                                shownCards[i].set('v.selected', false);
                            }
                        }
                    }
                }else{
                    component.set('v.error', true);
                    var msg = $A.get("$Label.c.B2B_Not_informed_account");
                }
            }   
        }
    }
})