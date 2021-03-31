({
	selectCard: function (component, event, helper) {
        let selected = component.get('v.selected');
        let selectedAccount = component.getEvent('selectedAccount');
        let lessThan6Accounts = component.get('v.lessThan6Accounts');
        if (selected == false) {
            let account = component.get('v.account');
            let selectedCard = component.getEvent('selectedCard');
            if (lessThan6Accounts && !$A.util.isEmpty(account)) {
                component.set('v.selected', true);
                selectedAccount.setParams({
                    'account': account
                });
                selectedAccount.fire();
            } else {
                selectedCard.setParams({
                    'account': account
                });
                selectedCard.fire();
            }
        }
	}
})