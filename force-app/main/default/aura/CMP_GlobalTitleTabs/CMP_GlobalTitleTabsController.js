({
    lastInfoChanged : function(component, event, helper){
        console.log('entra');
        component.set("v.lastInfoHour", $A.localizationService.formatTime(component.get("v.lastInfoDate")));
        console.log(component.get("v.lastInfoHour"));
    },

    LastUpdateTab : function(component, event, helper){
        //helper.selectTab(component, "LastUpdateTab", "EndOfDayTab");
        component.set("v.lastUpdateSelected", true);
    },

    EndOfDayTab : function(component, event, helper){            
        //helper.selectTab(component, "EndOfDayTab", "LastUpdateTab");
        component.set("v.lastUpdateSelected", false);
    }
})