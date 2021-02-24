({
	searchAgain : function(component, event, helper) {
		console.log('entra en searchAgain');
		component.set("v.dateFrom", '');
		component.set("v.dateTo", '');
		component.set("v.SelectedAccount",null);
		var evt = component.getEvent("searchAgain");
		if(evt){
			evt.fire();
		}
	}
})