({
	handleSelectPage : function(component, event, helper) {
		var pagination = component.get('v.number');
		component.set('v.currentPage', pagination);
    }
})