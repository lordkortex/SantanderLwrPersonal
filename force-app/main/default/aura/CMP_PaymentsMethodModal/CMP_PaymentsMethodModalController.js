({
    /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Method to set country dropdown values
    History
    <Date>			<Author>			<Description>
	16/06/2020		Beatrice Hill       Initial version
    */
    doInit : function(component, event, helper) {
        helper.setDropdownList(component, event, helper);
    },
    /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Method to close payment methods modal (CMP_PaymentsMethodModal)
    History
    <Date>			<Author>			<Description>
	15/06/2020		Beatrice Hill       Initial version
    */
   
    closeMethodModal : function(component, event, helper) {
        helper.closeModal(component, event, helper);
    },
    
    openWebsite : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": 'https://www.google.com'
        });
        urlEvent.fire();
    }
})