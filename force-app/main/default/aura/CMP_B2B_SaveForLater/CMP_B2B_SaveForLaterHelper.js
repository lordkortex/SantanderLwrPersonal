({
        cancelPayment: function (component, cancel) {
            var cancelPayment = component.getEvent('cancelPayment');
            cancelPayment.setParams({
                'cancel': cancel
            });
            cancelPayment.fire();
        },
        cancelSelectedPayment: function (component, cancelSelected) {
            var cancelPayment = component.getEvent('cancelSelectedPayment');
            cancelPayment.setParams({
                'cancelSelectedPayment': cancelSelected
            });
            cancelPayment.fire();
        }
    })