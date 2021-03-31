({
    handleSelectedAccount: function (component, event, helper) {
        helper.selectedAccount(component, event.getParam('account'));
        component.set('v.isModified', true);
    }
})