({
    cancelPayment: function (component, cancel) {
        var cancelPayment = component.getEvent('cancelPayment');
        cancelPayment.setParams({
            'cancel': cancel
        });
        cancelPayment.fire();
    }
})