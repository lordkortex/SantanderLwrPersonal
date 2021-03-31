({
    doInit : function(component, event, helper) {
        helper.getCmpId(component, event);
        helper.getBookBalance(component, event);
    },
    showHideAction : function(component, event, helper) {
        var whichOne = event.currentTarget.id;
        console.log(whichOne);
        helper.showHideAction(component,event,whichOne); 
    }
})