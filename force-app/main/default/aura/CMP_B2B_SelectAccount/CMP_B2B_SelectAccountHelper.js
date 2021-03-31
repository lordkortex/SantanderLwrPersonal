({
    clearInput: function (component, helper, isForExpenses) {
        component.set('v.account', {});
        component.set('v.searchedString', '');
        component.set('v.showDropdown', false);
        component.set('v.checkedYES', false);
        component.set('v.expensesAccount', {});
        component.set('v.searchedStringExpenses', '');
        component.set('v.errorMSG', '');
        component.set('v.errorMSGExpenses', '');
        component.set('v.isModified', true);
    },

    removeAccountFromList: function (account, accountList, callback) {
        let newList = [];
        if (!$A.util.isEmpty(accountList)) {
            if (!$A.util.isEmpty(account) && !$A.util.isEmpty(account.displayNumber)) {
                for (let i = 0; i < accountList.length; i++) {
                    if (accountList[i].displayNumber.localeCompare(account.displayNumber) != 0) {
                        newList.push(accountList[i]);
                    }
                }
            } else {
                newList.push(...accountList);
            }
        }
        if (!$A.util.isEmpty(callback)) {
            callback(newList);
        }
    }
})