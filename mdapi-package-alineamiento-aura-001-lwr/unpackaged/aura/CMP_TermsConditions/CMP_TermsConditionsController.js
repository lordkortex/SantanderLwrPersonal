({
	change : function(component, event, helper) {
        
        if(document.getElementById("checkbox-unique-id-73").checked == true) {
            component.set("v.buttonDisabled", false);
            component.set("v.isChecked", true);
        } else {
            component.set("v.buttonDisabled", true);
            component.set("v.isChecked", false);
        }
	},
    
    closeModal : function(component, event, helper) {
        var action = component.get("c.updateCheckboxTerms");
        var selectedCheckbox = component.get("v.isChecked");
        
        action.setParams({selectedCheckbox : selectedCheckbox});
        $A.enqueueAction(action);
        
       	var iEvt = component.getEvent("termsConditionsEvent");
        
        iEvt.setParams({
            "isChecked" : selectedCheckbox
        });
        
        iEvt.fire();
        
        component.set('v.showModal', false);
    }
})