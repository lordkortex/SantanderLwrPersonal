({
    /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the data from the server
    History
    <Date>			<Author>			<Description>
	17/01/2020		Guillermo Giral     Initial version
	*/
    
    //The following method retrieves data from apex controller
    getAuthorizationsData : function(component, event, helper) {
        component.find("service").callApex2(component, helper,"c.getAuthorizations", {}, this.populateAuthorizationsTables);
    },
    
    /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the tables with the data fetched from the server (pending + request auths)
    History
    <Date>			<Author>			<Description>
	17/01/2020		Guillermo Giral     Initial version
	*/
    
    //The following method populates the authorization tables with the data coming from the apex controller
    populateAuthorizationsTables : function(component,helper,response){
        if(response){
            // Set data
            component.set("v.pendingAuthorizations", response.pendingAuthorizations);
            component.set("v.requestAuthorizations", response.requestAuthorizations);
            
            if("v.isExpandedPending"){
                helper.buildPagination(component, helper, response.pendingAuthorizations);
            }
            
            if("v.isExpandedRequest"){
                helper.buildPagination(component, helper, response.requestAuthorizations);
            }
        }
    }
})