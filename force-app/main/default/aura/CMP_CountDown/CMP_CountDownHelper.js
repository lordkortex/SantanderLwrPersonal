({
    setStartTimeOnUI : function(component) {
        var dt = new Date();
        dt.setMinutes(component.get("v.minutes"));
        dt.setSeconds(component.get("v.seconds"));
        
        var dt2 = new Date(dt.valueOf() - 1000);
        var temp = dt2.toTimeString().split(" ");
        var ts = temp[0].split(":");
        component.set("v.minutes",ts[1]);
        component.set("v.seconds",ts[2]);
        this.checkEvolution(component);
    },

    checkEvolution : function (component){

        var sum = parseInt(component.get("v.minutesInit")*60) + parseInt(component.get("v.secondsInit"));
        var current = parseInt(component.get("v.minutes")*60) + parseInt(component.get("v.seconds"));
        var diff =Math.floor((1-current/sum)*100);
        if(diff>=25 && diff <50){
            component.set("v.expiredFX",false);

            component.set("v.evolution",'__25');
        }
        if(diff>=50 && diff <75){
            component.set("v.evolution",'__50');
        }
        if(diff>=75 && diff <100){
            component.set("v.evolution",'__75');
        }
        if(diff==100){
            component.set("v.expiredFX",true);

            component.set("v.evolution",'__100');
            helper.showToast(component, event, helper, $A.get('$Label.c.titleFXExpired'), $A.get("$Label.c.subtitleFXExpired"), true,'error');

        }
    },
    showToast: function (component,event, helper, title, body, noReload, mode) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            //errorToast.showToast(action, static, notificationTitle, bodyText, functionTypeText, functionTypeClass, functionTypeClassIcon, noReload)
            if(mode == 'error'){
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if(mode =='success'){
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);

            }
        }
    }
})