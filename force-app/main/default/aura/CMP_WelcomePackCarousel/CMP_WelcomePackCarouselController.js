({
    closeModal : function(component, event, helper) {
        var action = component.get("c.updateCheckboxWelcomePack");        
        var selectedCheckbox = false;
        
        if(document.getElementById("checkbox-unique-id-73").checked == true) {
            selectedCheckbox = true;
        }
        
        action.setParams({selectedCheckbox : selectedCheckbox});
        $A.enqueueAction(action);
        
        component.set('v.showModal', false);
    }
})