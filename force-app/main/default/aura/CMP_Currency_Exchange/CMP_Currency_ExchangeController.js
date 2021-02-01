({
    doInit : function(component, event, helper) {
        helper.getInformation(component, event);
    },
    displayCurrencies: function(component, event, helper) {
        var changeElement_one = component.find("dropdownCurrency");
        $A.util.toggleClass(changeElement_one, "slds-is-open");
       
    },
    selectCurrency:function(component, event, helper){
        var whichOne = event.currentTarget.id;
        component.set("v.auxiliar", whichOne);
        helper.selectCurrency(component, event, whichOne);
        var changeElement_one = component.find("dropdownCurrency");
        $A.util.toggleClass(changeElement_one, "slds-is-open");
        $A.util.toggleClass(changeElement_one, "slds-is-close");
    },
    close : function(component, event, helper){
        helper.firstPromise(component, event,helper).then(
            function(res){
                console.log(res);
                var changeElement_one = component.find("dropdownCurrency");
                $A.util.toggleClass(changeElement_one, "slds-is-open");
                $A.util.toggleClass(changeElement_one, "slds-is-close");
                
            }
        );
        
    }
})