({
	doInit : function(component, event, helper) {
		helper.getURLParams(component,event,helper);
	},
	populateProfilingTable : function(component, event, helper) {
        if(component.get("v.currentStageNumber") == 2 && component.get("v.profilingTableInnerData").length == 0 && component.get("v.hasProfile")){
            helper.getProfileData(component, event, helper);
        }else if(!component.get("v.hasProfile")){
			component.set("v.profilingTableInnerData", []);
		}
	},
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to handle the modal event and
					return to the group list screen if needed
    History
    <Date>			<Author>			<Description>
	03/02/2020		Guillermo Giral   	Initial version
	*/
	returnToGroupList : function(component, event, helper) {

		var evt = event.getParam("ConfirmAccepted");
		if(evt){
			let navService = component.find("navService");

			let pageReference = 
			{
				type: "comm__namedPage",
				attributes: 
				{
					pageName: "groups"
				},
				state: 
				{
					params : ""
				}
			}

			component.set("v.pageReference", pageReference);
			navService.navigate(pageReference); 
		} else {
			component.set("v.showModal", false);
		}
	},

	
	deleteService : function(component, event, helper) {
        var params= event.getParams();
        if(params.showDeletePopup == true){
            component.set("v.modalDeleteInfo.title", params.titleDelete);
            component.set("v.modalDeleteInfo.groupName", params.firstDescriptionDelete);
            component.set("v.modalDeleteInfo.description", params.secondDescriptionDelete);
            component.set("v.modalDeleteInfo.showDeleteModal", params.showDeletePopup);
            
        
        }
    }
})