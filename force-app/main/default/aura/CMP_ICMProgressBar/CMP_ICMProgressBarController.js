({
    changeStage : function(component,event,helper)
    {
		  helper.changeStage(component,event,helper);
    },

    onStepChanged : function(component,event,helper)
    {
      console.log("[CMP_ICMProgressBarController.onStepChanged] Entra en controller");
      helper.updateStep(component,event,helper);
    }
})