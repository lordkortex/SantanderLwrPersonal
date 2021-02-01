({
    selectTab : function(component, activateTabId, diactivateTabId) {       
        var activateTab = component.find(activateTabId);        
        var diactivateTab = component.find(diactivateTabId);
        //show tab1
        $A.util.addClass(activateTab, "tabEnabled");
        $A.util.removeClass(activateTab, "tabDisabled");        
        //hide tab2
        $A.util.removeClass(diactivateTab, "tabEnabled");
        $A.util.addClass(diactivateTab, "tabDisabled");        
        var lst = [];
        lst.push(diactivateTabId);
        //fire event
        var tabEvt = component.getEvent("GlobalBalanceTab");
        tabEvt.setParams({
            "activateTabId" : activateTabId,
            "deactivateTabs" : lst
        });
        tabEvt.fire();        
    }
})