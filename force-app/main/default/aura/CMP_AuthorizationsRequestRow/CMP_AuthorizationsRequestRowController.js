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
            	idAuthorization : component.get("v.item.autorizacion.idauth"),
            	indexAuthorization : component.get("v.itemPosition"),
                showDeletePopup : true
        })
        eventDelete.fire();
	},
    
    //The following method navigates to the 'View Authoizations' and 'User Group Profile Summary' components
    goToView : function(component, event, helper) {
        
        var userId = component.get("v.item.autorizacion.nomelemt");
        var userName = "María Yolanda del Valle Redondo"; 
        var userRole = "Administrator";
        var userGroup = "Group 1";
        var comesFrom;

        var authAction = component.get("v.item.autorizacion.accio");
        var typeOperation = component.get("v.item.autorizacion.ctipob");
        var goTo;
        var url;
        
        //Switch to determinate what action it is, where it has to redirect and with what params.
        if(authAction == "A" && typeOperation == "gr"){
            //alta perfilado grupo
            comesFrom = "authorizations";
            goTo = "user-group-profile-summary";
        }else if(authAction == "B" && typeOperation == "gr"){
            //baja perfilado grupo
            comesFrom = "authorizations";
            goTo = "user-group-profile-summary";
        }else if(authAction == "M" && typeOperation == "gr"){
        	//modif perfilado grupo
        	comesFrom = "authorizations";
            goTo = "user-group-profile-summary";
        }else if(authAction == "A" && typeOperation == "up"){
        	//alta perfilado usuario
        	comesFrom = "authorizations";
            goTo = "profile-user";
        }else if(authAction == "B" && typeOperation == "up"){
        	//baja perfilado usuario
        	comesFrom = "authorizations";
            goTo = "profile-user";
        }else if(authAction == "M" && typeOperation == "up"){
        	//modif perfilado usuario
        	comesFrom = "authorizations";
            goTo = "profile-user";
        }else if(authAction == "A" && typeOperation == "us"){
        	//alta usuario
        	comesFrom = "authorizations";
            goTo = "user-details-view-only";
        }else if(authAction == "B" && typeOperation == "us"){
        	//baja usuario
        	comesFrom = "authorizations";
            goTo = "user-details-view-only";
        }else if(authAction == "M" && typeOperation == "us"){
        	//modif usuario
        	comesFrom = "authorizations";
            goTo = "user-details-view-only";
        }

        url = "c__userId="+userId+"&c__userName="+userName+"&c__userRol="+userRole+"&c__userGroup="+userGroup+"&c__comesFrom="+comesFrom;
		console.log(goTo);
        //Redirect helper method
        helper.goTo(component, event, goTo, url);

    },
    
    //The following method navigates to the 'Detail Authoizations'
    goToDetail : function(component, event, helper) {
        var requestDate = component.get("v.item.autorizacion.fecPett");
        var authorizeAction = component.get("v.item.autorizacion.accio");
        var state = component.get("v.item.autorizacion.estapeti");
        var approver = component.get("v.item.autorizacion.nombusua");
        var approvalDate = component.get("v.item.autorizacion.fapro");
        var comment = component.get("v.item.autorizacion.comenta5");
        
        var url = "c__requestDate="+requestDate+"&c__authorizeAction="+authorizeAction+"&c__state="+state
        		  +"&c__approver="+approver+"&c__approvalDate="+approvalDate+"&c__comment="+comment;
        
        helper.goTo(component, event,"detail-authorization", url);
    },
    
    //The following method navigates to the 'Edit page'
    goToEdit : function(component, event, helper) {
        var userId = component.get("v.item.autorizacion.nomelemt");
        var userName = "María Yolanda del Valle Redondo"; 
        var userRole = "Administrator";
        var userGroup = "Group 1";
        var comesFrom;

        var authAction = component.get("v.item.autorizacion.accio");
        var typeOperation = component.get("v.item.autorizacion.ctipob");
        var goTo;
        var url;
        
        //Switch to determinate what action it is, where it has to redirect and with what params.
        if(typeOperation == "gr"){
            comesFrom = "authorizations";
            goTo = "user-group-profile-summary";
        }else if(typeOperation == "up"){
        	comesFrom = "authorizations";
            goTo = "profile-user";
        }else if(typeOperation == "us"){
        	comesFrom = "authorizations";
            goTo = "new-user";
        }
        url = "c__userId="+userId+"&c__userName="+userName+"&c__userRol="+userRole+"&c__userGroup="+userGroup+"&c__comesFrom="+comesFrom;
		console.log(goTo);
        //Redirect helper method
        helper.goTo(component, event, goTo, url);
    }
})