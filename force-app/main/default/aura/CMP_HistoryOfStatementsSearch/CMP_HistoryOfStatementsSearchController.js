({
    doInit : function(component, event, helper) {
        helper.handleDoInit(component, event, helper);
    },
    
    clearButtonClicked : function(component, event, helper) {
        component.set("v.dates[0]", undefined);
        component.set("v.dates[1]", undefined);
        component.set("v.selectedAccount", undefined);
    },
    
    searchButtonClicked : function(component, event, helper) {
        if(component.get("v.selectedAccount") != '' && component.get("v.selectedAccount") != undefined)
        {
            var datesOK = helper.checkDates(component,helper);
        
            if(datesOK)
            {

             var buttonClickedEvent = component.getEvent("buttonClickedEvent");
             buttonClickedEvent.fire();
            }   
        }
        else{
            component.set("v.show", true);
        }
          
    }
})