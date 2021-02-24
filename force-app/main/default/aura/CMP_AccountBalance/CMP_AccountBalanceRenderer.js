({
   afterRender: function (component,helper) {
        this.superAfterRender();
        helper.windowClick = $A.getCallback(function(event){
            if(component.isValid()){                
                var iCmpId = component.get("v.cmpId");
                if(iCmpId!=undefined || iCmpId !='N/A'){
                    var iOptionsId = iCmpId + "_options";
                    const element = document.querySelector("#"+iOptionsId);
                    var isExpandable = element.classList.contains("slds-is-open"); 
                    var x = document.activeElement.tagName;
                    if(isExpandable && x != 'A'){
                        helper.closeDropdown(component,event);
                    }  
                }
            }
        });
       document.addEventListener('click',helper.windowClick);   
    },
    unrender: function (component,helper) {
        this.superUnrender();
        document.removeEventListener('click',helper.windowClick);
    }
    
})