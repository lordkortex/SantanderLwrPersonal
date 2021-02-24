/* Author:       	 Diego Asis
     Company:        Deloitte
     Description:    Function to display only the necessary rows in the tables
     History
     <Date>			<Author>			<Description>
 	 06/02/2020		Diego Asis		     Initial version
*/
({
    //The following method passes component attribute values to event attributes to open the delete authorization modal
    modalDelete : function(component, event, helper) {
        var title = $A.get("$Label.c.deleteRecord");
        var firstDescription = component.get("v.item.authorizeAction");
        var secondDescription = $A.get("$Label.c.cancelAuthorizationReq");
        var eventDelete = component.getEvent("authorizationDelete");
        
        eventDelete.setParams({
                title : title,
                firstDescription : firstDescription,
                secondDescription : secondDescription,
                showDeletePopup : true
        })
        
        eventDelete.fire();
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
    },
    
    //The following method navigates to the 'Detail Authoizations'
    goToDetail : function(component, event, helper) {
        var requestDate = component.get("v.item.requestDate");
        var authorizeAction = component.get("v.item.authorizeAction");
        var state = component.get("v.item.state");
        var approver = component.get("v.item.approver");
        var approvalDate = component.get("v.item.approvalDate");
        var comment = component.get("v.item.comment");
        
        var url = "c__requestDate="+requestDate+"&c__authorizeAction="+authorizeAction+"&c__state="+state
        		  +"&c__approver="+approver+"&c__approvalDate="+approvalDate+"&c__comment="+comment;
        
        helper.goTo(component, event,"detail-authorization", url);
    }
})