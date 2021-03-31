({
    /*
	Author:        	Antonio Duarte
    Company:        Deloitte
	Description:    Redirects to the corresponding community page
    History
    <Date>			<Author>			    <Description>	    
    14/09/2020		Antonio Duarte			Initial version
    09/12/2020		Héctor Estivalis		REDO
    */
	doInit : function(component, event, helper) {
        helper.getCurrentUserData(component, helper)
        .then($A.getCallback(function (value) {
        	return helper.doRedirect(component, event, helper);
        }));
	}   
})