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
            helper.clearInput(component, helper);
            // helper.findAccount(component, helper, false);
        }
        
    },

    handleRadioYESChecked: function (component, event, helper) {
        component.set('v.checkedYES', true);
        component.set('v.isModified', true);
        helper.removeAccountFromList(component.get('v.account'), component.get('v.accountList'), (newList) => {
            component.set('v.expensesAccountList', newList);
        });
    },

    handleRadioNOChecked: function (component, event, helper) {
        component.set('v.checkedYES', false);
        component.set('v.isModified', true);
        component.set('v.expensesAccountList', []);
        component.set('v.expensesAccount', {});
        component.set('v.searchedStringExpenses', '');
    },

    /*
    handleSearchAccountsForExpenses: function (component, event,helper) {
        component.set('v.isForExpenses', true);
        helper.openSearchAccounts(component, helper);
    },

    handleClearInputExpenses: function (component, event,helper) {
        helper.clearInput(component, helper);
    }
    */
    
    /*
    Author:         Candido
    Company:        Deloitte
    Description:    Method executed when the main account is changed
    History:
    <Date>          <Author>            <Description>
    05/10/2020      Candido             Initial version
    */
    changeAccount: function (component, event, helper) {
        let canSelectExpenses = component.get('v.canSelectExpenses');
        if (canSelectExpenses === true) {
            let newAccount = component.get('v.account');
            let enableExpensesSelect = false;
            if (!$A.util.isEmpty(newAccount) && !$A.util.isEmpty(newAccount.country)) {
                const CNF_EXPENSESCOUNTRIES = $A.get('$Label.c.CNF_ExpensesCountries');
                let arrCountries = [];
                if (!$A.util.isEmpty(CNF_EXPENSESCOUNTRIES)) {
                    arrCountries = CNF_EXPENSESCOUNTRIES.split(';');
                }
                if (arrCountries.includes(newAccount.country)) {
                    enableExpensesSelect = true;
                }
            }
            if (enableExpensesSelect == false) {
                component.set('v.checkedYES', false);
                component.set('v.expensesAccountList', []);
                component.set('v.expensesAccount', {});
                component.set('v.searchedStringExpenses', '');
            } else {
                let accountList = component.get('v.accountList');
                helper.removeAccountFromList(newAccount, accountList, (newList) => {
                    component.set('v.expensesAccountList', newList);
                    component.set('v.expensesAccount', {});
                    component.set('v.searchedStringExpenses', '');
                });
            }
            component.set('v.enableExpensesSelect', enableExpensesSelect);   
        }
    }
})