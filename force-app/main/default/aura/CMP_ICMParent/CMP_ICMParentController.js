({
    previousStep : function(component, event, helper) 
    {
        var actualStep = component.get("v.currentStageNumber");
        console.log("vuelve un paso" + actualStep);
        actualStep = actualStep - 1;
        component.set("v.currentStagePercent", (actualStep-1)*33+5);
        component.set("v.currentStageNumber", actualStep);

        var progressBar = component.find("barraProgreso");
        progressBar.changeStage();
    },

    nextStep : function(component, event, helper) 
    {
        var actualStep = component.get("v.currentStageNumber");
        console.log("pasa un paso" + actualStep);
        actualStep = actualStep + 1;
        component.set("v.currentStagePercent", (actualStep+1)*33+5);
        component.set("v.currentStageNumber", actualStep);
        console.log(component.get("v.destinationData"));
        var progressBar = component.find("barraProgreso");
        progressBar.changeStage();
    }

})