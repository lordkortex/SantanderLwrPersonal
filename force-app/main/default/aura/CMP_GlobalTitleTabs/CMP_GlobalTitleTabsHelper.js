({
    selectTab : function(component, activateTabId, diactivateTabId) {       
        var activateTab = component.find(activateTabId);        
        var diactivateTab = component.find(diactivateTabId);
        //show tab1
        $A.util.addClass(activateTab, "slds-pill__active");

        //hide tab2
        $A.util.removeClass(diactivateTab, "slds-pill__active");     
    }
})