({
    //DO NOT DELETE the following comment lines. They are highly important to display the available options to order the accounts
    //$Label.c.GlobalBalanceOrderOne
    //$Label.c.GlobalBalanceOrderTwo
    //$Label.c.GlobalBalanceOrderThree
    getSortOptions : function(component, event){
        var lst = [];
        lst.push($A.get("$Label.c.GlobalBalanceOrderOne"));
        lst.push($A.get("$Label.c.GlobalBalanceOrderTwo"));
        lst.push($A.get("$Label.c.GlobalBalanceOrderThree"));
        lst.sort();
        component.set("v.sortList", lst);
    },
    sort : function(component, event, item){   
        component.set("v.sortSelected", item);
        var iEvent = component.getEvent("GlobalBalanceSort");
        iEvent.setParams({
            "displayOrder" : item
        });
        iEvent.fire();
    },
    closeDropdown : function (component, event){
        var changeElement_one = component.find("dropdownOrder");        
        $A.util.toggleClass(changeElement_one, "slds-is-open");
        $A.util.toggleClass(changeElement_one, "slds-is-close");
    },
    showHideAll : function(component, event){
        var tab = component.get("v.itabSelected");
        var icmp = document.querySelectorAll("."+tab+"_iAll");
        
        console.log(">>> TAB: " + tab);
        icmp.forEach(function(el){
            el.classList.toggle("slds-show");
            el.classList.toggle("slds-hide"); 
            
        });
    }
})