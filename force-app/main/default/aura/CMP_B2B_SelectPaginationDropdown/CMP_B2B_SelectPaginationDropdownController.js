({
	handleSelectPagination : function(component, event, helper) {
		var pagination = component.get('v.item');
		component.set('v.paginationSelection', pagination);
    }
})