({
    handleCancelYES: function (component) {
        helper.cancelPayment(component, true);
    },

    handleCancelNO: function (component) {
        helper.cancelPayment(component, false);
    }
})