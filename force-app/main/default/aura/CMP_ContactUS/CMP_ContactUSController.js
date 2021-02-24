({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get custom seting values from the apex controller to the component  on its initialization
    History
    <Date>			<Author>			<Description>
	17/02/2020		Pablo Tejedor   	Initial version
	*/
	doInit : function(component, event, helper) {
		helper.getDataCS(component, event, helper);
	}
})