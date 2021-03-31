/* Author:       	 Diego Asis
     Company:        Deloitte
     Description:    Function to display only the necessary rows in the tables
     History
     <Date>			<Author>			<Description>
 	 11/02/2020		Diego Asis		     Initial version
*/
({  
    //The following method hides the modal
    btnClose: function (component, event, helper) {
		helper.hideModal(component, helper);
	},
	
    //The following method hides the modal
	btnNo: function (component, event, helper) {
		helper.hideModal(component, helper);
	},
	
    //The following method hides the modal
	btnYes: function (component, event, helper) {
        var eventPending = component.getEvent("authorizationDelete");
        
        eventPending.setParams({
			isYesSelected : true,
			showDeletePopup : false,
            idAuthorization : component.get("v.authorizationId"),
            indexAuthorization : component.get("v.indexAuthorization")
        });
        
        eventPending.fire();
		helper.hideModal(component, helper);
	}
})