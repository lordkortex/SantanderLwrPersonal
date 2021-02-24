({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the component data on its initialization
    History
    <Date>			<Author>			<Description>
	17/01/2020		Guillermo Giral   	Initial version
	*/
    
    //The following method initializes the component
	doInit : function(component, event, helper) {
		helper.getAuthorizationsData(component, event, helper);
	},
    
    //The following method collapses and expands the pending table
    collapsePending : function(component, event, helper) {
		component.set("v.isExpandedPending", !component.get("v.isExpandedPending"));
        helper.getAuthorizationsData(component, event, helper);
	},
    
    //The following method collapses and expands the request table
    collapseRequest : function(component, event, helper) {
		component.set("v.isExpandedRequest", !component.get("v.isExpandedRequest"));
        helper.getAuthorizationsData(component, event, helper);
	}

})