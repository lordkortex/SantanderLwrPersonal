({
    //Initialize component
    doInit : function(component, event, helper){
        helper.getCmpId(component, event);
       	helper.getCountryName(component, event);
        helper.getInformation(component, event);
    },
    //Display default image when the country flag is unavaible
    defaultImage : function(component, event, helper){
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
    },
    //Show/Hide Country components
    showAction : function(component, event, helper){
        var whichOne = component.get("v.cmpId");
       	helper.toggleDropdown(component, event, whichOne);
    },
   updateCurrency: function(component, event, helper) {
        helper.sumBalance(component, event);   
    },
    updateSort : function(component, event, helper){
         helper.getCmpId(component, event);
    }
})