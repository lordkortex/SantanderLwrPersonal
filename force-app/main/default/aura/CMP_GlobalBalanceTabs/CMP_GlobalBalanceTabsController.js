({
    LastUpdateTab : function(component, event, helper){
        helper.selectTab(component, "LastUpdateTab", "EndOfDayTab");
    },
    EndOfDayTab : function(component, event, helper){            
        helper.selectTab(component, "EndOfDayTab", "LastUpdateTab");  
    }
})