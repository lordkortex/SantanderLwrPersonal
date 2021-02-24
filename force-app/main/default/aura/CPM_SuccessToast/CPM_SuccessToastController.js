({
    /*
	Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to clear the toast messsage
    History
    <Date>			<Author>			<Description>
	21/01/2020		Joaquin Vera   	Initial version
	*/
    clearToast : function(component, event, helper){
        component.set("v.showToast", false);
    }
})