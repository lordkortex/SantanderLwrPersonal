({
    showDropdown: function (component, helper) {
        if (component.get('v.showDropdown') == true) {
            component.set('v.showDropdown', false);            
        } else {
			component.set('v.showDropdown', true);
			helper.callEventDropdowns(component);
        }
    },

    getPicklistValues: function(component) {
        var action = component.get('c.getComercialCodes');
		action.setCallback(this, function (actionResult) {
			if (actionResult.getState() == 'SUCCESS') {
				var stateRV = actionResult.getReturnValue();
				console.log("comercial code");
				console.log(stateRV.success);
				console.log(stateRV);
				if (stateRV.success) {
					component.set('v.values', stateRV.value.picklistValues);								
				} 
			} else {
				var msg = "problem getting purpose picklist";
				console.log(msg);
			}
		});
		$A.enqueueAction(action);
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