({
	handleCheckbox : function(component, event, helper) {
		component.set('v.isChecked', event.target.checked);
     
        var evt = component.getEvent('selectValue');
        evt.setParams({
            'selectedValue' : event.currentTarget.id,
            'isChecked' : event.target.checked
        });
        evt.fire();
	}
})