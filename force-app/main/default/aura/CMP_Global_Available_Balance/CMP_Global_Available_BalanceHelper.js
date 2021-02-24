({
    sumBalance : function(component, event){
        var currentCurrency = component.get("v.currentCurrency");    
        var lst = component.get("v.accountList");        
        var action = component.get("c.getSumBalance");
        action.setParams({
            "currentCurrency" : currentCurrency,
            "accountList" : lst
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var conts = response.getReturnValue(); 
                for ( var key in conts ) {
                    
                    if(key == "globalBookBalance"){
                        let num = conts[key];
                        component.set("v.globalBookBalance", num.toFixed(2));
                    }
                    if(key == "globalAvailableBalance"){
                        let num = conts[key];
                        component.set("v.globalAvailableBalance",  num.toFixed(2));
                    }
                }
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
})