({
	afterRender: function (component,helper) {
        this.superAfterRender();
        helper.windowClick = $A.getCallback(function(event){
            if(component.isValid()){
                var isExpandable = $A.util.hasClass(component.find("dropdownOrder"), "slds-is-open");
                if(isExpandable){
                    helper.closeDropdown(component,event);
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