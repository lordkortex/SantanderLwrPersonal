({
    buttonClicked : function(component, event, helper) {
        var id = event.currentTarget.id;
        if(event.currentTarget.id == "ButtonStage1") {
            component.set("v.currentStageNumber", 1);
            
        }
        if(event.currentTarget.id == "ButtonStage2") {
            component.set("v.currentStageNumber", 2);
            component.set("v.stage1Finished", true);
        }
        if(event.currentTarget.id == "ButtonStage3") {
            component.set("v.currentStageNumber", 3);
            component.set("v.stage1Finished", true);
            component.set("v.stage2Finished", true);
        }



    }
})