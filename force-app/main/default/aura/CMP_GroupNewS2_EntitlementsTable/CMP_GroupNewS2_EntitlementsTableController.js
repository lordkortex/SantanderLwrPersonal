({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to remove the only row in the table
    History
    <Date>			<Author>			<Description>
	13/02/2020		Guillermo Giral   	Initial version
	*/
    removeRow : function(component, event, helper) {
        if(event.currentTarget != undefined || (event.currentTarget == undefined && event.getParam("removeAllData"))){
            component.set("v.entitlementName", component.get("v.entitlementName").filter(row => row != $A.get("$Label.c.ServiceProfiling_DowRepSicContingency")));
        }
    }
})