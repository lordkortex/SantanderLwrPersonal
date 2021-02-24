({
	showDropdown: function (component, helper) {
        if (component.get('v.showDropdown') == true) {
            component.set('v.showDropdown', false);            
        } else {
            
            component.set('v.showDropdown', true);
            helper.callEventDropdowns(component);
        }
    },

    callEventDropdowns: function (component) {
        var handleDropdown = component.getEvent('handleDropdown');
        handleDropdown.setParams({
            'name': component.get('v.name'),
            'showDropdown': component.get('v.showDropdown')
        });
        handleDropdown.fire();
    }
})