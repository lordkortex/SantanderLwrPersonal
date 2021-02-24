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

        helper.getFunctionTypeClass(component, event, helper);
		helper.showToast(component, event, helper);
	},
    
    handleCloseToast: function (component, event, helper) {
        helper.hideToast(component, event, helper);
    },

    handleActionToast: function (component, event, helper) {
        helper.hideToast(component, event, helper);
        var reloadAccounts = component.getEvent('reloadAccounts');
        reloadAccounts.setParams({
            'reload': true,
            'landing': component.get('v.landing')
        });
        reloadAccounts.fire();
    }
})