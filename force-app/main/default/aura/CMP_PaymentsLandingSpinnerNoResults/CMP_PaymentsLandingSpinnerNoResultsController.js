({
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Reset filter options
    History
    <Date>			<Author>			<Description>
    15/06/2020		Shahad Naji   		Initial version
	17/06/2020		Bea Hill   		    Adapted from B2B Spinner
    */
	handleClick : function(component, event, helper) {
        component.set('v.resetSearch', true);
        var reloadAccounts = component.getEvent('reloadAccounts');
        reloadAccounts.setParams({
            'reload': true,
            "landing" : true
        });
        reloadAccounts.fire();
    }
    
})