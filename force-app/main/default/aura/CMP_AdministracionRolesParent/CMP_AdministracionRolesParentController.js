({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to save the data to the server
    History
    <Date>			<Author>			<Description>
	09/02/2020		Guillermo Giral   	Initial version
	*/
    sendRoleData : function(component, event, helper){
        console.log("Saved data: " + JSON.stringify(component.get("v.data")));
        component.set("v.dataSaveSuccess", true);
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to clear the toast messsage
    History
    <Date>			<Author>			<Description>
	09/02/2020		Guillermo Giral   	Initial version
	*/
    clearToast : function(component, event, helper){
        component.set("v.dataSaveSuccess", false);
    },
    
    /*
	Author:         Diego Asis
    Company:        Deloitte
    Description:    Function to reset the values on the page
    History
    <Date>			<Author>			<Description>
	16/01/2020		Diego Asis		   	Initial version
	*/
    
    resetValues : function(component, event, helper){
        component.find("rolesTable").refreshTable();
    }
})