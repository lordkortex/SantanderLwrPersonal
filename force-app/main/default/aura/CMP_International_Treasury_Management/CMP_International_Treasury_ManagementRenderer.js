({
   
    /*afterRender : function (component,helper) {
        this.superAfterRender();
        console.log("Padre");
        var elements = document.getElementsByClassName("holaMundo");
        console.log("Padre: " + elements.length);
        console.log("button1: ", component.find("dropdownCurrency"));
        var s = document.getElementById("dropdownCurrency");
        console.log("S: ", s);
        
    },
    rerender : function(component, helper){
        this.superRerender();
        console.log("HOLA MUNDO");
     console.log("button1: ", component.find("dropdownCurrency"));
    }*/
    /*afterRender: function (component,helper) {
        this.superAfterRender();
        helper.windowClick = $A.getCallback(function(event){
            if(component.isValid()){                
            	//var x = component.find("optionsDropdown");
                //console.log(x);
               //var el = document.querySelector("div[name='accountBalanceOptions']");
                //console.log(el);
                var dropdown = document.querySelector(".accountBalanceOptions");
                console.log(dropdown);
                if(!Array.isArray(dropdown)){
                    dropdown = [dropdown];
                    console.log("Hola Mundo");
                }

              const element = document.querySelector("#ES_0__0__1_options");
                var isExpandable = element.classList.contains("slds-is-open");
                if(isExpandable){
                    console.log(isExpandable);
                    element.classList.toggle("slds-is-close");
            		element.classList.toggle("slds-is-open");
                }
                 
            }
        });
        document.addEventListener('click',helper.windowClick);      
        
    },
    unrender: function (component,helper) {
        this.superUnrender();
        document.removeEventListener('click',helper.windowClick);        
    }*/
})