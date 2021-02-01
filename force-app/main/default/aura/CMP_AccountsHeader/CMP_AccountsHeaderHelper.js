({
    showHideAll : function(component, event){
        var tab = component.get("v.itabSelected");
        var icmp = document.querySelectorAll("."+tab+"_iAll");        
        icmp.forEach(function(el){
            el.classList.toggle("slds-show");
            el.classList.toggle("slds-hide"); 
            
        });
    },
    /*
	Author:         Shahad
    Company:        Deloitte
    Description:    show hide icon-collapse and icon-expand when all components are opened or closed
    History
    <Date>			<Author>			<Description>
	05/05/2020		Shahad Naji     	Initial version
	*/
    showHideIcons : function(component, event, iElements){
        var nElements = iElements.length/2;
        var nExpanded = 0;
        var nCollaped = 0;
        iElements.forEach(function(element) {
            if(element.classList.contains("icon") && element.classList.contains("expand") && element.classList.contains("slds-show")){
                nCollaped++;
            }
            if(element.classList.contains("icon") && element.classList.contains("collapse") && element.classList.contains("slds-show")){
                nExpanded++;
            }

        });
        var tab = component.get("v.itabSelected");
        var icmp = document.querySelectorAll("."+tab+"_iAll");
        if(nExpanded == nElements){
            
            icmp.forEach(function(element){
                if(element.classList.contains("icon-expand") && element.classList.contains("slds-show")){
                    element.classList.remove("slds-show");
                    element.classList.add("slds-hide"); 
                } 
                if(element.classList.contains("icon-collapse") && element.classList.contains("slds-hide")){
                    element.classList.add("slds-show");
                    element.classList.remove("slds-hide")
                } 
            });
            
        }
        if(nCollaped == nElements){
            icmp.forEach(function(element){
                if(element.classList.contains("icon-collapse") && element.classList.contains("slds-show")){
                    element.classList.remove("slds-show");
                    element.classList.add("slds-hide"); 
                }  
                if(element.classList.contains("icon-expand") && element.classList.contains("slds-hide")){
                    element.classList.add("slds-show");
                    element.classList.remove("slds-hide"); 
                }
            });
        }
    }
})