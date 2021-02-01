({
	doInit : function(component, event, helper) {
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var storage = window.localStorage.getItem(userId + '_' + 'tab');
        let fireDoInit = false;

		if(storage != null && storage != undefined){
            // Check whether the tab has changed due to the stored value. Only if it has changed, execute the handeDoInit flow
            if((component.get("v.lastUpdateSelected") && storage == 'lastUpdate') || (!component.get("v.lastUpdateSelected") && storage == 'endOfDay')){
                fireDoInit = true;
            }
			if(storage == 'lastUpdate'){
				component.set("v.lastUpdateSelected",true);
			}else{
				component.set("v.lastUpdateSelected",false);
            }
		} else {
            // If the user's cache is empty, the init function must be fired
            fireDoInit = true;
        }
		if(component.get("v.lastUpdateSelected")){
			window.localStorage.setItem(userId + '_' + 'tab', 'lastUpdate');
		}else{
			window.localStorage.setItem(userId + '_' + 'tab', 'endOfDay');
		}

		//helper.checkBrowser(component, event, helper); 
        helper.getIsCashNexus(component, event);
        if(fireDoInit)
		    helper.handleDoInit(component, event, helper);
	},

	updateCurrencies : function(component, event, helper) {
        var newValue = event.getParam('value');
        var oldValue = event.getParam('oldValue');
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );

        if((newValue != oldValue && oldValue != undefined && oldValue != "") || oldValue == undefined){
            helper.updateUserCurrency(component, helper);
        }
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to update the data displayed in
					the screen
    History
    <Date>			<Author>			<Description>
	19/04/2020		Guillermo Giral   	Initial version*/
	
	updateData : function(component, event, helper){
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
		if(component.get("v.lastUpdateSelected")){
			window.localStorage.setItem(userId + '_' + 'tab', 'lastUpdate');
		}else{
			window.localStorage.setItem(userId + '_' + 'tab', 'endOfDay');
		}
		helper.handleUpdateData(component, event, helper);		
	}
})