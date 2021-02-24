({
    
    afterRender: function (component,helper) {
        this.superAfterRender();
        helper.windowClick = $A.getCallback(function(event){
            //var x = document.activeElement.tagName;
            //console.log(x);
            if(component.isValid()){
                var isExpandable = $A.util.hasClass(component.find("dropdownCurrency"), "slds-is-open");
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
    },
    
    /*
        afterRender : function( component, helper ) {
            this.superAfterRender();
            console.log('INSIDE AFTER RENDERER');
        },
    
        rerender : function( component, helper ) {
            this.superRerender();
            console.log('INSIDE Re-Renderer');
            helper.windowClick= function(event) {
                if(event.target.toString().includes('HTMLDivElement')) {//If its normal div element, close drodown
                   helper.closeDropdown(component);  
                   document.removeEventListener('click',helper.windowClick);
                    //Remove event listner so that it doesn't interfere in other clicks in remaining document
                  } 
                else{
                    console.log("Hola mundo");
                     //do nothing, helper methods will handle click of icon
                }
            }
            document.addEventListener('click',helper.windowClick);
        }*/
    })