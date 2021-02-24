({
    doInit : function(component, event, helper) {
        helper.getCmpId(component, event);
        helper.getCountryName(component, event);
        helper.getBookBalance(component, event);
        
    },
    //Show/Hide Country components
    showAction : function(component, event, helper){
        var whichOne = component.get("v.cmpId");
        helper.toggleDropdown(component, event, whichOne);
    }
})