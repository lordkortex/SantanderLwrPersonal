({
    buttonClicked : function(component, event, helper) {
        component.set("v.isShowing", false);
        var idButton = event.currentTarget.id;
        var curExEvent = component.getEvent("DeleteUserEvent");
        if(idButton == "buttonYes"){
            curExEvent.setParams({
                isDeleting : true
            });
    }
    else{
        curExEvent.setParams({
            isDeleting : false
        });  
    }
    curExEvent.fire();
    }   
})