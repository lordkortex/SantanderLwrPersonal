({
    doInit : function(component, event, helper) {
   		helper.getCmpId(component, event);
        helper.getCountryName(component, event);
        helper.getInformation(component, event);
    },
    exchangeCurrency: function(component, event, helper) {
        helper.sumBalance(component, event);   
    },
    refresh: function(component, event, helper){
        alert('No Information not provided');   
    },
    showHideAction : function(component, event, helper) {
        var whichOne = event.currentTarget.id;
        helper.showHideAction(component,event,whichOne); 
    },
    defaultImage : function(component, event, helper){
        var profUrl = $A.get('$Resource.Flags') + '/Default.svg';
        event.target.src = profUrl;
    }
    
})