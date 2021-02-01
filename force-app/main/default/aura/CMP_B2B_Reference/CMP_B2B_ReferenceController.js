({
	init : function(component, event, helper) {
		if (component.get('v.isEditing') == false) {
			helper.handleClear(component, event, helper);
		}
	},
	
	handleClear : function(component, event, helper) {
		helper.handleClear(component, event, helper);
	},

	handleFocus: function (component, event, helper) { 
        component.set('v.showMiniLabel', true);
    },

	handleBlur: function (component, event, helper) { 
		component.set('v.showMiniLabel', false);
	},
	
	handleInput: function (component, event, helper) { 
		let input = component.get('v.value');
		if (event.target.value != undefined) {
			let value = event.target.value;
			let regExp = new RegExp('^[0-9a-zA-Z\s]{0,16}$');
			let isInputValid = regExp.test(value);
			if (isInputValid == true) {
				input = value;
			}
			if (!$A.util.isEmpty(input)) {
				component.set('v.errorMSG', "");
			}
		}
		event.target.value = input;
		component.set('v.value', input);			
		
	}
})