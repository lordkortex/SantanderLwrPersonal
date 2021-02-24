({
    /*
	Author:        	Antonio Duarte
    Company:        Deloitte
	Description:    Redirects to the corresponding community page
    History
    <Date>			<Author>			    <Description>	    
    14/09/2020		Antonio Duarte			Initial version
    */
	doInit : function(component, event, helper) {
        if(event.getParams().changeType == "LOADED"){
            var urlParams = component.get("v.notificationRecord.URLParams__c");
            var page = component.get("v.notificationRecord.Page_Name__c");
            if(page != null && urlParams!=null){
                component.find("service").redirect(page,urlParams);
            }
        }else if (event.getParams().changeType == "ERROR"){
            let navService = component.find("navService");

            let pageReference = 
            {
                type: "comm__namedPage",
                attributes: 
                {
                    pageName: "contact-us"
                },
                state: 
                {
                    params : ""
                }
            }

            navService.navigate(pageReference);
        }
	}   
})