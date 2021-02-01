({
    buttonClicked : function(component, event, helper) {
        
        component.set("v.isShowing", false);
        var id = event.currentTarget.id;
        var compEvent = component.getEvent("modalEvent");

        if(compEvent) {
            if(id == "buttonYes") {
                compEvent.setParam("ConfirmAccepted", true);
            } else { 
                compEvent.setParam("ConfirmAccepted", false);
            }
        }
        
        
        compEvent.fire();

    }
})