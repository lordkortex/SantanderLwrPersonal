({
	clearInput : function(component, event, helper) {
		let maxChars = component.get('v.charactersMax');
		var steps = component.get('v.steps');
		if ($A.util.isEmpty(steps)) { //for redomodal
			component.set('v.value','');
			component.set('v.isModified', true);
			component.set('v.charactersRemaining', maxChars);
			let textarea = document.getElementById("textareaDescription");	
			if (textarea != null) {
				textarea.value = "";
				
				console.log('textarea.style.height', textarea.style.height);	
				textarea.style.height="88px";
				console.log('textarea.style.height', textarea.style.height);
				component.set('v.charactersRemaining', maxChars);
			}
		} else {
			var focusStep = steps.focusStep;
			var lastModifiedStep = steps.lastModifiedStep;
			/*if (focusStep == 3 && lastModifiedStep == 3) {
	
				component.set('v.value','');
				component.set('v.isModified', true);
				component.set('v.charactersRemaining', maxChars);
			} else {*/
				let textarea = document.getElementById("textareaDescription");	
				if (textarea != null) {
					textarea.value = "";
					
					console.log('textarea.style.height', textarea.style.height);	
					textarea.style.height="88px";
					console.log('textarea.style.height', textarea.style.height);
					component.set('v.charactersRemaining', maxChars);
	
				}
			//}
		}	
	}
})