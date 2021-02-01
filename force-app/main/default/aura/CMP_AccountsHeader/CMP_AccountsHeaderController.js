({
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
    collapse : function(component, event, helper){
        var iExpand = document.getElementById("thisExpand");
        if(iExpand!=null){
        
            if(iExpand.classList.contains("slds-hide")){
                iExpand.classList.add("slds-show");
                iExpand.classList.remove("slds-hide");
            }
            
            var iCollapse = document.getElementById("thisCollapse");
            if(iCollapse.classList.contains("slds-show")){
                iCollapse.classList.remove("slds-show");
                iCollapse.classList.add("slds-hide");
            }
        }
        
    }
    
})