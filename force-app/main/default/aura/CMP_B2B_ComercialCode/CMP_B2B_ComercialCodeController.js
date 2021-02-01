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
		helper.getPicklistValues(component);		
	},

	handleDropdownButton : function(component, event, helper) {
		helper.showDropdown(component, helper);
	},

	handleClick : function(component, event, helper) {
		let item = event.currentTarget.id;
		component.set('v.selectedValue', item);
		helper.showDropdown(component, helper);
	}
})