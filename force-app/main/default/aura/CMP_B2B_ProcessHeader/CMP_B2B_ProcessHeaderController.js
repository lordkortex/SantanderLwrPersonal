({
    handleShowDiscard: function (component, event, helper) {
        component.set('v.showCancelModal', true);
    },

    handleCancelPayment: function (component, event, helper) {
        let cancel = event.getParam('cancel');
        if (cancel) {
                helper.cancelPayment(component, helper);
        }
        component.set('v.showCancelModal', false);
    }
})