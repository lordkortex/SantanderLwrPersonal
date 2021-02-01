({
    
    init : function(component,event, helper) {
        component.set("v.minutesInit",component.get("v.minutes"));
        component.set("v.secondsInit",component.get("v.seconds"));
        helper.setStartTimeOnUI(component);
    },
    setStartTimeOnUI : function(component,event, helper) {
        if(component.get("v.minutes")!=0 || component.get("v.seconds")!=0){
            setTimeout($A.getCallback(function () {
                helper.setStartTimeOnUI(component);
            }), 1000);
        }
    },
    restart : function(component,event, helper) {
        if(component.get("v.expiredFX")==false){
            component.set("v.minutes",component.get("v.minutesInit"));
            component.set("v.seconds",component.get("v.secondsInit"));
        }
    }
})