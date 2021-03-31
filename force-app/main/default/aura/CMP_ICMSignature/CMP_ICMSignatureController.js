({
    defaultImage : function(component, event, helper){
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
    },
    previousStep : function (component, event, helper) {
        helper.previousStep(component, event, helper);
    },
    doInit : function(component,event,helper) {
        helper.handleInit(component,event,helper);
    },
    sendToMuleSoft : function(component,event,helper) {
        helper.sendToMuleSofthelper(component,event,helper);
    }   
})