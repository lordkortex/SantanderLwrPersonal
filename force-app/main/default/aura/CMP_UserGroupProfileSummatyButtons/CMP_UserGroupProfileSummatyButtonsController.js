({
	backStep : function(component, event, helper) {
        
		let comesFrom = component.get("v.comesFrom");
		console.log(comesFrom);
		if(comesFrom != null && comesFrom != undefined) {
			var url;
			console.log("viene de: " + comesFrom);
			switch(comesFrom){
				
				//If comes from groups list
				case "Groups":
					helper.handleRedirection(component,event,helper,"groups", "");
					break;

				//If comes from users list
				case "Users":
					url = 
					"c__userId="+component.get("v.userId")+
					"&c__userName="+component.get("v.userName")+
					"&c__userRol="+component.get("v.userRol")+
					"&c__userGroup="+component.get("v.userGroup");
					helper.handleRedirection(component,event,helper,"users",url);
					break;

				//If comes from user profiling
				case "Profile-User":
					url =
					"c__userId="+component.get("v.userId")+
					"&c__userName="+component.get("v.userName")+
					"&c__selectedValueRol="+component.get("v.selectedValueRol")+
					"&c__selectedValueGroup="+component.get("v.selectedValueGroup")+
					"&c__currentStep="+"2"+
					"&c__isStage1Finished="+"true";
					
					helper.handleRedirection(component,event,helper,"profile-user",url);
					break;

				//If comes from group profiling
				case "Profile-Group":
					url = 
					"c__groupName="+component.get("v.selectedValueGroup")+
					"&c__hasData="+component.get("v.hasData");
					helper.handleRedirection(component,event,helper,"new-group",url);
					break;
                    
                    //If comes from authorizations user
				case "Authorizations-User":
					helper.handleRedirection(component,event,helper,"authorizations", "");
					break;
                    
                    //If comes from authorizations group
                case "Authorizations-Group":
					helper.handleRedirection(component,event,helper,"authorizations", "");
					break;
			}
		}
	}
})