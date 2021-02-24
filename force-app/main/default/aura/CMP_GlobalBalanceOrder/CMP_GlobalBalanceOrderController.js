({
    doInit :  function(component, event, helper){
        helper.getSortOptions(component, event);
       /* var expand = component.find("GBExpand");
        $A.util.removeClass(expand, 'slds-hide');
        $A.util.addClass(expand, 'slds-show');
        
        var collapse = component.find("GBCollapse");
        $A.util.removeClass(collapse, 'slds-show');
        $A.util.addClass(collapse, 'slds-hide');*/
       
    }, 
    displayOrder: function(component, event, helper) {
        var changeElement_one = component.find("dropdownOrder");
        $A.util.toggleClass(changeElement_one, "slds-is-close");
        $A.util.toggleClass(changeElement_one, "slds-is-open");       
        event.stopPropagation();
        
    },
    selectSort : function(component, event, helper){
        var item = event.currentTarget.id;
        helper.sort(component, event, item);
    },
    expandAll : function(component, event, helper){        
        helper.showHideAll(component, event);
        var iComponent = document.querySelectorAll(".iElement");
        iComponent.forEach(function(element) {             
            if(element.classList.contains("slds-hide") && element.classList.contains("container")){
                element.classList.remove("slds-hide");
                element.classList.add("slds-show");
            }          
            if(element.classList.contains("icon") && element.classList.contains("expand") && element.classList.contains("slds-show")){
                element.classList.remove("slds-show");
                element.classList.add("slds-hide"); 
            }
            if(element.classList.contains("icon") && element.classList.contains("collapse") && element.classList.contains("slds-hide")){                
                element.classList.remove("slds-hide");
                element.classList.add("slds-show"); 
            }
        });
    },
    collapseAll : function(component, event, helper){
        helper.showHideAll(component, event);        
        var iComponent = document.querySelectorAll(".iElement");
        iComponent.forEach(function(element) {           
            if (element.classList.contains("slds-show") && element.classList.contains("container")){                       
                element.classList.remove("slds-show");
                element.classList.add("slds-hide");
            }
            if(element.classList.contains("icon") && element.classList.contains("expand") && element.classList.contains("slds-hide")){
                element.classList.add("slds-show");
                element.classList.remove("slds-hide"); 
            }
            if(element.classList.contains("icon") && element.classList.contains("collapse") && element.classList.contains("slds-show")){               
                element.classList.add("slds-hide");
                element.classList.remove("slds-show"); 
            }        
        });
    },
    download : function(component, event, helper){
        var iEvent = component.getEvent("GlobalBalanceDownload");
        iEvent.setParams({
            "isDownload" : true
        });
        iEvent.fire();
    }
})