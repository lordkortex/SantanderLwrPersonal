/* Author:       	 Diego Asis
     Company:        Deloitte
     Description:    Function to display only the necessary rows in the tables
     History
     <Date>			<Author>			<Description>
 	 11/02/2020		Diego Asis		     Initial version
*/

({
    //The following method passes component attribute values to event attributes to open the accept authorization modal
    openModalAccept : function(component, event, helper) {
        var title = $A.get("$Label.c.approveAction");
        var question = $A.get("$Label.c.approveModification");
        var eventPending = component.getEvent("authorizationsPending");
        
        eventPending.setParams({
            title : title,
            question : question,
            showDeletePopup : true
        })
        
        eventPending.fire();
    },
    
    //The following method passes component attribute values to event attributes to open the accept authorization modal
    openModalReject : function(component, event, helper) {
        var title = $A.get("$Label.c.rejectAction");
        var question = $A.get("$Label.c.rejectModification");
        var eventPending = component.getEvent("authorizationsPending");
        
        eventPending.setParams({
            title : title,
            question : question,
            showDeletePopup : true
        })
        
        eventPending.fire();
    },
    
    //The following method navigates to the 'View Authoizations' and 'User Group Profile Summary' components
    goToView : function(component, event, helper) {
        var userId = "SAL6729085";
        var userName = "María Yolanda del Valle Redondo"; 
        var userRole = "Administrator"
        var userGroup = "Group 1"
        var comesFrom = "";
        var action = component.get("v.item.action");
        
        if(action == "Delete User group" || action == "Creation User group" || action == "Delete User group") {
            comesFrom = "Authorizations-Group";
        } 
        if(action == "Delete User" || action == "Creation User profile" || action == "Delete User profile") {
            comesFrom = "Authorizations-User";
        }
        
        var url = "c__userId="+userId+"&c__userName="+userName+"&c__userRol="+userRole+"&c__userGroup="+userGroup+"&c__comesFrom="+comesFrom;

        if(action == "Modify User" || action == "Creation User") {
            helper.goTo(component, event,"view-authorizations", url);
        } else {
            helper.goTo(component, event,"user-group-profile-summary", url);
        }	
    }
})