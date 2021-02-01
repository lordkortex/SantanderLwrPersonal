({
	initComponent : function(component, event, helper) {
		var steps = component.get('v.steps');
		var focusStep = steps.focusStep;
		var lastModifiedStep = steps.lastModifiedStep;
		var isEditing = component.get('v.isEditing');
		if (isEditing == false) {
			if (focusStep == 3 && lastModifiedStep == 3) {
				component.set('v.selectedValue', '');
				component.set('v.isModified', true);
			}
		}
		var action = component.get('c.getPurposes');
		action.setCallback(this, function (actionResult) {
			if (actionResult.getState() == 'SUCCESS') {
				var stateRV = actionResult.getReturnValue();
				console.log("purporse");
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

	handleDropdownButton : function(component, event, helper) {
		helper.showDropdown(component, helper);
	},

	handleClick : function(component, event, helper) {
		let item = event.currentTarget.id;
		component.set('v.selectedValue', item);
		if (!$A.util.isEmpty(item)) {
			component.set('v.errorMSG', "");
		}
		helper.showDropdown(component, helper);
	}
})