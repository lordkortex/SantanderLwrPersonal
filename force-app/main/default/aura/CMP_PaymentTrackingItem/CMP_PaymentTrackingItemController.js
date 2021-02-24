({
    doInit : function(component, event, helper) {
        var aux = component.get("v.item");
        helper.getCountryName(component, event);
    },
    defaultImage : function(component, event, helper){
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
    }
})