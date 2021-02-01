/* Author:       	 Diego Asis
     Company:        Deloitte
     Description:    Function to display only the necessary rows in the tables
     History
     <Date>			<Author>			<Description>
 	 05/02/2020		Diego Asis		     Initial version
*/
({
    //The following method initializes component
	doInit : function(component, event, helper) {
        helper.getURLParams(component,event,helper);
	},
    
    //The following method takes you to previous visited screen
    goBack : function(component, event, helper) {
        window.history.back();
    }
})