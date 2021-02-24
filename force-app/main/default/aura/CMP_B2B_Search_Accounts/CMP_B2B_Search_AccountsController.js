({
    openModal: function(component, event, helper) {
        let accountList = component.get('v.accountList');
        component.set('v.accountsFullyFiltered', accountList);
        helper.showModal(component, helper);
    },

    handleBack: function (component, event, helper) {
        helper.hideModal(component, helper);
    },

    handleCancel: function (component, event, helper) {
        alert('Cancelar.');
    },

    handleSelectedCard: function (component, event, helper) {
        let account = event.getParam('account');
        let isForExpenses = component.get('v.isForExpenses');
        if (!$A.util.isEmpty(account)) {
            helper.hideModal(component, helper);
            let selectedAccount = component.getEvent('selectedAccount');
            selectedAccount.setParams({
                'account': account,
                'isForExpenses': isForExpenses
            });
            selectedAccount.fire();
        }
    }
})