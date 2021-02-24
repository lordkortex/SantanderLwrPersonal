({
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to hide download modal (CMP_PaymentsLandingDownloadModal)
    History
    <Date>			<Author>			<Description>
	02/06/2020		Shahad Naji   		Initial version
    */
	closeDownloadModal : function(component, event, helper) {
		component.set('v.showDownloadModal', false);	
	},
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to download the selected items information
    History
    <Date>			<Author>			<Description>
	05/06/2020		Shahad Naji   		Initial version
    */
    handleApply : function(component, event, helper) {
        var selectedFormat = component.get('v.selectedValue');
        if (!$A.util.isEmpty(selectedFormat)){
            component.set('v.showDownloadModal', false);
            component.set('v.isError', false);
            var event = component.getEvent('applyDownload');
            event.setParams({
                "format" : selectedFormat
            });
            event.fire();
        } else {
            component.set('v.isError', true);
        }
	},
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to clear component
    History
    <Date>			<Author>			<Description>
	05/06/2020		Shahad Naji   		Initial version
    */
    handleClearAll : function(component, event, helper) {
		component.set('v.selectedValue', '');	
	},
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to select option
    History
    <Date>			<Author>			<Description>
	05/06/2020		Shahad Naji   		Initial version
    */
    selectOption : function(component, event, helper) {
        component.set('v.selectedValue', event.currentTarget.id);
        component.set('v.isError', false);
    }
    
    
})