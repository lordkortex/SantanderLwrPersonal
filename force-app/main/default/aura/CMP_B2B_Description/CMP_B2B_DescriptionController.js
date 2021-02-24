({
	init : function(component, event, helper) {	
		// var steps = component.get('v.steps');
		// if(!$A.util.isEmpty(steps)){
		// 	var focusStep = steps.focusStep;
		// 	var lastModifiedStep = steps.lastModifiedStep;
		// 	if (focusStep == 3 || lastModifiedStep == 3) {
				var isEditing = component.get('v.isEditing');
				if (isEditing == false) {
					helper.clearInput(component, event, helper);
				// }				
			} else {
				let chars = component.get('v.charactersMax');
				let input = component.get('v.value');
				let regexp = new RegExp('\n');
				let value = "";
				if(input != undefined) {
					input = input.replace(regexp, '');
					let length = input.length;
					chars = chars - length;
					value = input;			
				}
				component.set('v.value', value);
				component.set('v.charactersRemaining', chars);
			}		
		// } else {
		// 	let chars = component.get('v.charactersMax');
		// 		let input = component.get('v.value');
		// 		let regexp = new RegExp('\n');
		// 		let value = "";
		// 		if(input != undefined) {
		// 			input = input.replace(regexp, '');
		// 			let length = input.length;
		// 			chars = chars - length;
		// 			value = input;			
		// 		}
		// 		component.set('v.value', value);
		// 		component.set('v.charactersRemaining', chars);
		// }
	},

	handleInput : function(component, event, helper) {	
		let chars = component.get('v.charactersMax');
		let input = component.get('v.value');
		if (event.target.value != undefined) {
			input = event.target.value;
			let regexp = new RegExp('\n');
			input = input.replace(regexp, '');
			event.target.value = input;
			let length = input.length;
			chars = chars - length;
            //SNJ - 29/06/2020 - contar caracteres e mas
            if(chars > -1){
                component.set('v.errorMSG', '');
            }else{
                var substraction = chars * -1;
                var msg = $A.get("$Label.c.PAY_ErrorCharacters");
                if(msg != undefined && msg != null){
                    msg  = msg.replace("{0}", substraction);
                }
                component.set('v.errorMSG', msg);
            }
			

		}
		component.set('v.charactersRemaining', chars);
		component.set('v.value', input);

		if(component.get("v.grow")==true){
			if (event.target.value.length != 0) {
				event.target.style.height="auto";
				event.target.style.height= event.target.scrollHeight+"px";
				console.log('event.target.style.height', event.target.style.height);
			} else {
				event.target.style.height="auto";
			}
			
		}
	},

	handleFocus: function (component, event, helper) { 
        component.set('v.showMiniLabel', true);
    },

	handleBlur: function (component, event, helper) { 
		component.set('v.showMiniLabel', false);
	},
	handleClear : function(component, event, helper) {
		var resetData = component.get('v.resetData');
		let chars = component.get('v.charactersMax');

		component.set('v.charactersRemaining', chars);
		component.set('v.value','');	
		component.set('v.errorMSG', '');
        if (resetData==true) {
			component.set('v.isModified', true);
			
        } else {
			let textinput = document.getElementById("textareaDescription");	
			textinput.value = "";
			textinput.style.height="88px"; //Bea Hill 09/07/2020
		}
	}
	
})