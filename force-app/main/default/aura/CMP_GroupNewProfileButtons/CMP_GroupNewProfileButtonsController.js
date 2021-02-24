({
    handleClick : function(component, event, helper) {
        if(component.get("v.source") == 'Profile-Group'){
        	window.history.back();
        } else if(component.get("v.source") == 'Profile-User') {
            // TO-DO : Navigate to step 2 with parameters
            window.history.back();
        }
    }
})