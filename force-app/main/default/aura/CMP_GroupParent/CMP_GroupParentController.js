({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method that launches when component is loaded
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    doInit : function(component, event, helper) {
        //helper.handleDoIniCache(component, event, helper)
        component.find("Service").retrieveFromCache(component, helper,"profileInfo", helper.handleDoInitCache);
        // if(window.localStorage.getItem("profileInfo") != undefined){
        //     component.find("Service").retrieveFromCache(component, helper,"profileInfo", helper.handleDoInitCache);
        // } else {
        //     component.find("Service").callApex2(component, helper,"c.getUserLoginData", helper.handleDoInit);
        // }
    },
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to navigate to another page
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    handleComponentEvent : function(component, event, helper) {
        if(event.getParam("addClicked") == true) {
            var url = "";

            helper.encrypt(component, url).then(function(results){
                let navService = component.find("navService");
    
                let pageReference = {
                    type: "comm__namedPage",
                    attributes: {
                        pageName: "new-group"
                    },
                    state: {
                        params : results
                    }
                }
    
                component.set("v.pageReference", pageReference);
                navService.navigate(pageReference); 
            });
        }else{
        }

    },

    deleteGroup : function(component, event, helper) {
        var params= event.getParams();
        if(params.showDeletePopup == true){
            component.set("v.modalInfo.title", params.titleDelete);
            component.set("v.modalInfo.groupName", params.firstDescriptionDelete);
            component.set("v.modalInfo.description", params.secondDescriptionDelete);
            component.set("v.modalInfo.showModal", params.showDeletePopup);
            
        
        }
    }
})