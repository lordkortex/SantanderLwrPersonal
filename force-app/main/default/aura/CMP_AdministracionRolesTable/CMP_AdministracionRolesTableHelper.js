({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to fetch the data from the server
    History
    <Date>			<Author>			<Description>
	26/12/2020		Pablo Tejedor   	Initial version
	03/06/2020		Guillermo Giral   	Add the login info web service response to the browser cache
	*/
	fillTableData : function(component, event, helper) {
		component.find("Service").callApex2(component, helper,"c.getAdministracionRolesData", {userId : $A.get("$SObjectType.CurrentUser.Id")}, this.setResponseData);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to set the table component with the fetched data
    History
    <Date>			<Author>			<Description>
	09/02/2020		Guillermo Giral   	Initial version
	*/
	setResponseData : function(component, event, response){
		if(response){
			component.set("v.tableData", response.rolesList);
			component.find("Service").saveToCache("profileInfo", response.login);
		}
	}
})