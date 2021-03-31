({
    initComponent: function (component, event, helper) {
        helper.getFunctionTypeClass(component, event, helper);
    },

    openToast: function (component, event, helper) {
		var params = event.getParam('arguments');
		if (params) component.set('v.action', params.action);
        if (params) component.set('v.static', params.static);
        if (params) component.set('v.notificationTitle', params.notificationTitle);
        if (params) component.set('v.bodyText', params.bodyText);
        if (params) component.set('v.functionTypeText', params.functionTypeText);
        if (params) component.set('v.functionTypeClass', params.functionTypeClass);
        if (params) component.set('v.functionTypeClassIcon', params.functionTypeClassIcon);
        if (params) component.set('v.noReload', params.noReload);
        if (params) component.set('v.landing', params.landing);
        
        if (params) component.set('v.method', params.method);
        if (params) component.set('v.payment', params.payment);

        helper.getFunctionTypeClass(component, event, helper);
		helper.showToast(component, event, helper);
	},
    
    handleCloseToast: function (component, event, helper) {
        helper.hideToast(component, event, helper);
    },

    /* 
    16/11/2020      Bea Hill      Add the call to the event to go to the payment detail page
    24/11/2020      Bea Hill      If noReload == false, fire the reload event.
    */
    handleActionToast: function (component, event, helper) {
        helper.hideToast(component, event, helper);
        if (component.get('v.reload') == true) {
            var reloadAccounts = component.getEvent('reloadAccounts');
            reloadAccounts.setParams({
                'reload': true,
                'landing': component.get('v.landing')
            });
            reloadAccounts.fire();
        } else if (component.get('v.noReload') == false) {
            var reloadAccounts = component.getEvent('reloadAccounts');
            reloadAccounts.setParams({
                'reload': true,
                'landing': component.get('v.landing')
            });
            reloadAccounts.fire();
        } else if (component.get('v.method') == 'goToPaymentDetail') {
            var goToPaymentDetail = component.getEvent('goToPaymentDetail');
            goToPaymentDetail.fire();
        }
        
    }
})