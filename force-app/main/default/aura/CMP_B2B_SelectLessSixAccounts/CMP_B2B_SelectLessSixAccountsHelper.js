({
    selectedAccount: function (component, account) {
        if (!$A.util.isEmpty(account)) {
            component.set('v.account', account);
            let shownCards = component.find('shownCards');
            if (!$A.util.isEmpty(shownCards)) {
                for (let i = 0; i < shownCards.length; i++) {
                    if (shownCards[i].get('v.account').displayNumber.localeCompare(account.displayNumber) == 0) {
                        shownCards[i].set('v.selected', true);
                    } else {
                        shownCards[i].set('v.selected', false);
                    }
                }
            }
        } else {
            var msg = $A.get("$Label.c.B2B_Not_informed_account");
            toast().error('', msg);
        }
    }
})