({
    doInit : function(component, event, helper) {
        helper.getDummyData(component, event, helper)
    },
    filterByCountry: function(component, event, helper) {
        console.log("asdassdasdasdasdasdasd");
        helper.filterByCountry(component, event, helper) 
    },
    CheckChanged: function(component, event, helper) {
        helper.CheckChanged(component,event,helper);
    },
    previousStep: function(component, event, helper) {
        helper.previousSteptepHelper(component,event,helper);
    },
    nextStep: function(component, event, helper) {
        helper.nextStepHelper(component,event,helper);
    },
    onstepChange: function(component, event, helper){
        helper.changeStepByBar(component, event, helper);
    }

})