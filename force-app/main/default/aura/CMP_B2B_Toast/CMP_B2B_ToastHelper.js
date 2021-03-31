({
    getFunctionTypeClass: function (component, event, helper) {
        var functionTypeText = component.get('v.functionTypeText');
        console.log(functionTypeText.localeCompare('Information'));
        var functionTypeClass = functionTypeText.toLowerCase();
        component.set('v.functionTypeClass', functionTypeClass);
        var iconClass=functionTypeClass;
        if (functionTypeText.localeCompare('Information') == 0) {
            component.set('v.functionTypeClass', 'info');
        }
        if (functionTypeText.localeCompare('Warning') == 0) {
            iconClass='caution';
        }
        if (functionTypeText.localeCompare('Error') == 0) {
            iconClass='close_emptyCircle';
        }
        if (functionTypeText.localeCompare('Success') == 0) {
            iconClass='check_circle';
        }
        component.set('v.functionTypeClassIcon', iconClass);

    },

    showToast : function (component, event, helper) {
        component.set('v.showToast', true);
    },

    hideToast : function (component, event, helper) {
        component.set('v.showToast', false);
    }
})