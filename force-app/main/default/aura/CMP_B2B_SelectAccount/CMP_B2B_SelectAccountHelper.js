({
    /*loadAccountData: function (component,event, helper) {
        return new Promise(function (resolve, reject) {
            let account = component.get('v.account');
            if (!$A.util.isEmpty(account)) {
                helper.selectedAccount(component, account);
            }
            resolve('OK');
        }, this);
    },*/

    /*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Clear the data in this step.
    History
    <Date>			<Author>		       <Description>
    13/10/2020      Bea Hill               Initital version
    ----------------------------------------------------------------------------------*/
    clearInput : function (component, helper, isForExpenses) {
        if (!isForExpenses) {
            component.set('v.account', {});
            component.set('v.searchedString', '');
            component.set('v.showDropdown', false);
            component.set('v.checkedYES', false);
        }
        component.set('v.expensesAccount', {});
        component.set('v.expensesSearchedString', '');
        component.set('v.showDropdownExpenses', false);
        component.set('v.errorMSG', '');
        component.set('v.isModified', true);
    },
/*
    activateDropdown: function (component, helper, inputLookupValue) {
        let isForExpenses = component.get('v.isForExpenses');
        let showDropdown = false;
        let account;
        if (isForExpenses) {
            account = component.get('v.expensesAccount');
        } else {
            account = component.get('v.account');
        }
        if ($A.util.isEmpty(account)) {
            if (!$A.util.isEmpty(inputLookupValue)) {
                if (inputLookupValue.length >= 4) {
                    helper.searchAccounts(component, inputLookupValue);
                    showDropdown = true;
                }
            }
            if (isForExpenses) {
                component.set('v.expensesSearchedString', inputLookupValue);
                component.set('v.showDropdownExpenses', showDropdown);
            } else {
                component.set('v.searchedString', inputLookupValue);
                component.set('v.showDropdown', showDropdown);
            }
        }
    },

    searchAccounts: function (component, searchedString) {
        let accountList = component.get('v.accountList');
        let accountSuggestions = [];
        if (!$A.util.isEmpty(accountList) && !$A.util.isEmpty(searchedString)) {
            searchedString = searchedString.toLowerCase();
            for (let i = 0; i < accountList.length && accountSuggestions.length < 5; i++) {
                let coincidencia = false;
                let account = accountList[i];
                let displayNumber = account.displayNumber;
                let alias = account.alias;
                if (!$A.util.isEmpty(displayNumber)) {
                    displayNumber = displayNumber.toLowerCase();
                    if (displayNumber.includes(searchedString)) {
                        coincidencia = true;
                    }
                }
                if (!$A.util.isEmpty(alias)) {
                    alias = alias.toLowerCase();
                    if (alias.includes(searchedString)) {
                        coincidencia = true;
                    }
                }
                if (coincidencia == true) {
                    accountSuggestions.push(account);
                }
            }
        }
        component.set('v.accountSuggestions', accountSuggestions);
    },

    openSearchAccounts: function (component, helper) {
        var searchAccounts = component.find('searchAccounts');
        if (!$A.util.isEmpty(searchAccounts)) {
            searchAccounts.openModal();
        }
    },

    selectedAccount: function (component, account) {
        var isForExpenses = component.get('v.isForExpenses');
        //isForExpenses = false;
        var accountList = component.get('v.accountList');
        if (!$A.util.isEmpty(account)) {
            component.set('v.errorMSG', '');  
            if (isForExpenses) {
                component.set('v.expensesAccount', account);
                component.set('v.expensesSearchedString', account.displayNumber);
            } else {
                component.set('v.account', account);
                component.set('v.searchedString', account.displayNumber);

                if(accountList.length <= 6) {
                    let shownCards = component.find('shownCards');
                    if (typeof shownCards != "undefined" && shownCards != null) {
                        for (let i = 0; i < shownCards.length; i++) {
                            if (shownCards[i].get('v.account').displayNumber.localeCompare(account.displayNumber) == 0) {
                                shownCards[i].set('v.selected', true);
                            } else {
                                shownCards[i].set('v.selected', false);
                            }
                        }
                    }
                }
            }    
        } else {
            component.set('v.error', true);
            var msg = $A.get("$Label.c.B2B_Not_informed_account");
            toast().error('', msg);
        }
    }
    */
})