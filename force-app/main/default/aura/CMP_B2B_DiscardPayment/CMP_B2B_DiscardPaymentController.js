({
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