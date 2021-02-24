({
    getCmpId : function (component, event){
        try{
            var iKey = component.get("v.iAccount.displayNumber");
            if(iKey!=undefined){
                iKey = iKey.replace(/\s/g,"");
                var iParentId = component.get("v.iParentId");
                var aux = iParentId.concat("_", iKey); 
                component.set("v.cmpId", "thirdLayer_" + aux);
            }      
        }catch(e){
            console.error(e);            
        }       
    },
    closeDropdown : function (component, event){
       try{
            var iCmpId = component.get("v.cmpId");
            if(iCmpId!=undefined){
                var iOptionsId = iCmpId + "_options";
                var elements = document.querySelectorAll("#"+iOptionsId);
                elements.forEach(function(element) {             
                    element.classList.toggle("slds-is-close");
                    element.classList.toggle("slds-is-open");
                });
            }
        }catch(e){
            console.error(e);
        }
    },
    formatDate : function (component, event){
        var currentTab = component.get("v.iTabSelected");
        console.log(currentTab);
        if(currentTab == "EndOfDayTab"){
            var str = component.get("v.iAccount").lastUpdateAvailableBalance;
            var array = str.split(", ");
            component.set("v.parsedDate", array[0]);
        }
    },
    formatAmount : function(component, event){
        let iAvailbale = component.get("v.iAccount.amountAvailableBalance");
       
        let iBook = component.get("v.iAccount.amountMainBalance");
        component.set("v.parsedAvailableBalance", iAvailbale.toFixed(2));
        component.set("v.parsedBookBalance", iBook.toFixed(2));
        
    },
    goTo : function (component, event, page, url){
        this.encrypt(component, url).then(function(results){
            let navService = component.find("navService");
            let pageReference = {
                type: "comm__namedPage", 
                attributes: {
                    pageName: page
                },
                state: {
                    params : results
                }
            }
            navService.navigate(pageReference); 
        });
    },
    
    encrypt : function(component, data){  
        var result="null";
        var action = component.get("c.encryptData");
        action.setParams({ str : data });
        // Create a callback that is executed after 
        // the server-side action returns
        return new Promise(function (resolve, reject) {
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                }
                resolve(result);
            });
            $A.enqueueAction(action);
        });
    }

})