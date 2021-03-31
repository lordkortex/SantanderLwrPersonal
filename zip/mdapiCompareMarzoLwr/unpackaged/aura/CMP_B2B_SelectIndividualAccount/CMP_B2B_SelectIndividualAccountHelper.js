({
    clearInput : function (component, helper, isForExpenses) {
        component.set('v.searchedString', '');
        component.set('v.showDropdown', false);
        component.set('v.account', {});
        component.set('v.accountSuggestions', []);
        component.set('v.errorMSG', '');
        component.set('v.isModified', true);
        //BEA 21/07/2020
        component.set('v.isEditing', false);
    },

    activateDropdown: function (component, helper, inputLookupValue) {
        let showDropdown = false;
        let account = component.get('v.account');
        if ($A.util.isEmpty(account)) {
            if (!$A.util.isEmpty(inputLookupValue)) {
                if (inputLookupValue.length >= 4) {
                    helper.searchAccounts(component, inputLookupValue);
                    showDropdown = true;
                }
            }
            component.set('v.searchedString', inputLookupValue);
            component.set('v.showDropdown', showDropdown);
        }
    },

    openSearchAccounts: function (component, helper) {
        var searchAccounts = component.find('searchAccounts');
        if (!$A.util.isEmpty(searchAccounts)) {
            searchAccounts.openModal();
        }
    },

    selectedAccount: function (component, account) {
        var accountList = component.get('v.accountList');
        if (!$A.util.isEmpty(account)) {
            component.set('v.errorMSG', '');  
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
        } else {
            component.set('v.error', true);
            var msg = $A.get("$Label.c.B2B_Not_informed_account");
            toast().error('', msg);
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
})