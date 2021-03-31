({
    handleShowSaveLater: function (component, event, helper) {
        component.set('v.showSFLModal', true);
    },

    handleCancelPayment: function (component, event, helper) {
        let cancel = event.getParam('cancel');
        if (cancel) {
                helper.cancelPayment(component, helper);
        }
        component.set('v.showSFLModal', false);
    },
    handleCancelYES: function (component, event, helper) {
        helper.cancelPayment(component, true);
        var fromUtilityBar = component.get('v.fromUtilityBar');
		var fromDetail = component.get('v.fromDetail');
        if(fromUtilityBar || fromDetail){
            helper.cancelSelectedPayment(component, true);
        } 
    },

    handleCancelNO: function (component, event, helper) {
        helper.cancelPayment(component, false);
        var fromUtilityBar = component.get('v.fromUtilityBar');
		var fromDetail = component.get('v.fromDetail');
            if(fromUtilityBar || fromDetail){
            helper.cancelSelectedPayment(component, false);
        }
    }
})