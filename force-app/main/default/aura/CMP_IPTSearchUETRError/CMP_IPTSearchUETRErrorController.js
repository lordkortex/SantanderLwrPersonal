({
	resetSearch : function(component, event, helper) {
		component.set("v.searchValue",'');
		component.set("v.isSearched", false);
		document.getElementById("text-input-id-1").focus();
	}
})