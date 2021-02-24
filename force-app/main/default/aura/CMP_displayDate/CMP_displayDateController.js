({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to format the date based on the User's date format settings
    History
    <Date>			<Author>			<Description>
	16/03/2019		Guillermo Giral   	Initial version
	*/
	formatDate : function(component, event, helper) {
        if(component.get("v.userDateFormat") != undefined){
            helper.formatUserDate(component, component.get("v.userDateFormat"));
        } else {
            component.find("Service").callApex(component, "c.getUserDateFormat", {userId: $A.get("$SObjectType.CurrentUser.Id")}, helper.formatUserDate);
        }
	}
})