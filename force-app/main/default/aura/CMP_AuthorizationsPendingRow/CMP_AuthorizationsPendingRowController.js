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
            showDeletePopup : true,
            idAuthorization : component.get("v.item.autorizacion.idauth"),
            indexAuthorization : component.get("v.itemPosition"),
            nomAuthorization : component.get("v.item.autorizacion.nomelemt"),
            stateAuthorization : component.get("v.item.autorizacion.estapeti"),
            actionAuthorization : component.get("v.item.autorizacion.accio"),
            objAuthorization : component.get("v.item.autorizacion.ctipob")
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
            showDeletePopup : true,
            idAuthorization : component.get("v.item.autorizacion.idauth"),
            indexAuthorization : component.get("v.itemPosition"),
            nomAuthorization : component.get("v.item.autorizacion.nomelemt"),
            stateAuthorization : component.get("v.item.autorizacion.estapeti"),
            actionAuthorization : component.get("v.item.autorizacion.accio"),
            objAuthorization : component.get("v.item.autorizacion.ctipob")
        })
        
        eventPending.fire();
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
            comesFrom = "Authorizations-User";
            goTo = "user-group-profile-summary";
        }else if(authAction == "B" && typeOperation == "gr"){
            //baja perfilado grupo
            comesFrom = "Authorizations-User";
            goTo = "user-group-profile-summary";
        }else if(authAction == "M" && typeOperation == "gr"){
        	//modif perfilado grupo
        	comesFrom = "Authorizations-User";
            goTo = "user-group-profile-summary";
        }else if(authAction == "A" && typeOperation == "up"){
        	//alta perfilado usuario
        	comesFrom = "Authorizations-User";
            goTo = "profile-user";
        }else if(authAction == "B" && typeOperation == "up"){
        	//baja perfilado usuario
        	comesFrom = "Authorizations-User";
            goTo = "profile-user";
        }else if(authAction == "M" && typeOperation == "up"){
        	//modif perfilado usuario
        	comesFrom = "Authorizations-User";
            goTo = "profile-user";
        }else if(authAction == "A" && typeOperation == "us"){
        	//alta usuario
        	comesFrom = "Authorizations-User";
            goTo = "user-details-view-only";
        }else if(authAction == "B" && typeOperation == "us"){
        	//baja usuario
        	comesFrom = "Authorizations-User";
            goTo = "user-details-view-only";
        }else if(authAction == "M" && typeOperation == "us"){
        	//modif usuario
        	comesFrom = "Authorizations-User";
            goTo = "user-details-view-only";
        }

        url = "c__userId="+userId+"&c__userName="+userName+"&c__userRol="+userRole+"&c__userGroup="+userGroup+"&c__comesFrom="+comesFrom;
		console.log(goTo);
        //Redirect helper method
        helper.goTo(component, event, goTo, url);
    }
})