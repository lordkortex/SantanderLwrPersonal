({
    initComponent : function(component, event, helper) {
		var steps = component.get('v.steps');
		var focusStep = steps.focusStep;
		var lastModifiedStep = steps.lastModifiedStep;
		var isEditing = component.get('v.isEditing');
		if (isEditing == false) {
			if (focusStep == 3 && lastModifiedStep == 3) {
				component.set('v.selectedValue', '');
				component.set('v.selectedValueLabel', '');
				component.set('v.isModified', true);
			}
		}
		helper.getPicklistValues(component);		
	},

	handleDropdownButton : function(component, event, helper) {
		helper.showDropdown(component, helper);
	},

	handleClick : function(component, event, helper) {
		let selected = event.currentTarget.id;
		var objArray = component.get('v.values');
		var obj = objArray.find(obj => obj.value == selected);
		var value = component.get('v.selectedValue');
		if(value !=  null && value != undefined){
			if(value == selected){
				component.set('v.selectedValue',''); 
			}else{
				component.set('v.selectedValue',selected);
				component.set('v.selectedValueLabel', obj.label);
			}
		}
		helper.showDropdown(component, helper);
	}
})