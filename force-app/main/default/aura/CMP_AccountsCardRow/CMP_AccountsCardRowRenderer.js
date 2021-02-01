({
   afterRender: function (component,helper) {
        this.superAfterRender();
        helper.windowClick = $A.getCallback(function(event){
            if(component.isValid()){   
                helper.closeDropdown(component,event);
            }
        });
       document.addEventListener('click',helper.windowClick);   
    },
    unrender: function (component,helper) {
        this.superUnrender();
        document.removeEventListener('click',helper.windowClick);
    }
    
})