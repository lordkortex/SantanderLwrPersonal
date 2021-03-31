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
        let transferType = component.get('v.transferType');
        let showExtendedDropdown = false;
        if ($A.util.isEmpty(account)) {
            if(transferType == 'instant_transfer'){//FLOWER_POWER JH REVISAR LITERALES
                if (!$A.util.isEmpty(inputLookupValue)) {
                    if (inputLookupValue.length >= 4) {
                        helper.searchAccounts(component, inputLookupValue);
                        showDropdown = true;
                    }
                }
                component.set('v.searchedString', inputLookupValue);
                component.set('v.showDropdown', showDropdown);
            } else if(transferType == 'international_transfer_single'){
                showExtendedDropdown = true;
            }
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
    
    validateInternationalIBAN: function (component, account) {
        if (!$A.util.isEmpty(account)){
            var accIban = account.displayNumber;
            if(accIban != null){
                if((accIban.includes('ES') || accIban.includes('GB')) && accIban.length === 24){
                    component.set("v.isNewBeneficiary", true);
                    if(accIban.includes('ES')){
                        component.set("v.selectedCountry", 'Spain');
                    }
                    else if(accIban.includes('GB')){
                        component.set("v.selectedCountry", 'United Kingdom');
                    }
                }
                else{
                    component.set("v.showValidationIBANError", true);
                }
            }
            else{
                component.set("v.showValidationIBANError", true);
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
    getBeneficiaryAccountsFees: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let focusStep = component.get('v.steps.lastModifiedStep');
            let transferType = component.get('v.transferType');
            if (focusStep == 1) {
                component.set('v.spinner', true);
                helper.handleAccountsToB2BDestination(component, helper, value)
             .then($A.getCallback(function (value) {
                    resolve('getBeneficiaryAccounts_OK');
                })).catch($A.getCallback(function (error) {
                    component.set('v.spinner', false);
                    helper.showToast(component, event, helper, error.title, error.body, error.noReload);
                    reject('getBeneficiaryAccounts_KO');
                })).finally($A.getCallback(function () {
                    component.set('v.spinner', false);
                }));
            } else {
                resolve('getBeneficiaryAccounts_OK');
            }
        }));
    },

    handleAccountsToB2BDestination: function (component, helper, value) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let transferType = component.get('v.transferType');
            let PTT_instant_transfer = $A.get('$Label.c.PTT_instant_transfer');
            let PTT_international_transfer_single = $A.get('$Label.c.PTT_international_transfer_single')
            let accountListDestination = helper.removeAccountFromList(value, component.get('v.dataSelectOrigin'));
            if (transferType == PTT_instant_transfer) {
                if (!$A.util.isEmpty(accountListDestination)) {
                    component.set('v.accountListDestination', accountListDestination);
                    resolve('handleAccountsToB2BDestination_OK');
                } else {
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Problem_accounts'),
                        'noReload': false
                    });
                }
            } else if (transferType == PTT_international_transfer_single) {
                component.set('v.accountListDestination', accountListDestination);
                resolve('handleAccountsToB2BDestination_OK');
            } else {
                reject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Problem_accounts'),
                    'noReload': false
                });
            }
        }), this);
    },

    removeAccountFromList: function (listToCheck, accountToDelete) {
        let newList = [];
        if (!$A.util.isEmpty(listToCheck)) {
            for (let i = 0; i < listToCheck.length; i++) {
                if (listToCheck[i].displayNumber.localeCompare(accountToDelete.displayNumber) != 0) {
                    newList.push(listToCheck[i]);
                }
            }
        }
        return newList;
    },
})