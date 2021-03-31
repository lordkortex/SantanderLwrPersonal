/*Author:       Diego Asis
    Company:        Deloitte
    Description:    Function to display only the necessary rows in the tables
    History
    <Date>			<Author>			<Description>
	29/01/2020		Diego Asis		     Initial version
	*/

({  
    //The following method hides the modal
    btnClose: function (component, event, helper) {
		helper.hideModal(component, helper);
	},
	
    //The following method hides the modal
	btnNo: function (component, event, helper) {
        console.log(component.find("textarea-id-01").getElement().value);
		helper.hideModal(component, helper);
	},
	
    //The following method hides the modal
	btnYes: function (component, event, helper) {
		var eventPending = component.getEvent("authorizationsPending");
        
        eventPending.setParams({
			isYesSelected : true,
			showDeletePopup : false,
            title : component.get("v.title"),
            idAuthorization : component.get("v.authorizationId"),
            indexAuthorization : component.get("v.indexAuthorization"),
            approvalComments : component.find("textarea-id-01").getElement().value,
            nomAuthorization : component.get("v.nomAuthorization"),
            stateAuthorization : component.get("v.stateAuthorization"),
            actionAuthorization : component.get("v.actionAuthorization"),
            objAuthorization : component.get("v.objAuthorization")       
        });
        
        eventPending.fire();
		helper.hideModal(component, helper);
	}
})