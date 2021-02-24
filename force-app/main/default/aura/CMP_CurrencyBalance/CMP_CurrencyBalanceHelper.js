({
    //DO NOT DELETE the following comment lines. They are highly important to display the available options to order the accounts
    //$Label.c.GlobalBalanceOrderOne
    //$Label.c.	GlobalBalanceOrderTwo
    //$Label.c.GlobalBalanceOrderThree
    getCmpId : function(component, event) {
        try{
        
            var iKey = component.get("v.iRegister.key");
            if(iKey!=undefined){
                iKey = iKey.replace(/\s/g,"");
                var iParentId = component.get("v.iParentId");
                var aux = iParentId.concat("_", iKey); 
                component.set("v.cmpId", "SecondLayer_"+aux);
            }      
        }catch(e){
            console.error(e);            
        }       
    },
    toggleDropdown : function (component, event, whichOne){
        try{
            var iComponent = document.querySelectorAll("#"+whichOne); 
            iComponent.forEach(function(element) {             
                element.classList.toggle("slds-show");
                element.classList.toggle("slds-hide");
            }); 
        }catch(e){
            console.error(e); 
        }            
    },
    getBookBalance : function(component,event) {
  
        try{
            var lst = component.get("v.iRegister").value;           
            var sum = 0.0;
            lst.forEach(function(element) {
                sum += element.amountMainBalance;
            });
            var rounded_number = sum.toFixed(2);
            component.set("v.bookBalance", rounded_number);
        }catch(e){
            console.error(e); 
        }
  
    },
    getCountryName: function(component,event){
        try{
            var sortSelected = component.get("v.iSortSelected");
            if(sortSelected == $A.get("$Label.c.GlobalBalanceOrderThree")){
                var action = component.get("c.getCountryName");
                action.setParams({
                    "ISOCode" : component.get("v.iRegister.key")
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set("v.countryName", response.getReturnValue());
                    }
                    else{
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }
                });
                $A.enqueueAction(action);    
            } 
        }catch(e){
            console.error(e);
        }        
    }
})