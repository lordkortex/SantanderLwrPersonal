({
    /*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to switch steps
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    */
    changeStep : function(component, event, helper) {
        var nombre = event.currentTarget.id;
        if(nombre === "ButtonStage2") {
            component.set("v.currentStageNumber" , 2 );
            component.set("v.stage1Finished", true);
        } else if(nombre === "ButtonStage1") {
            component.set("v.currentStageNumber" , 1 );
        }
    }
})