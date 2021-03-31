({
    delete : function(component, event, helper) {
        try {
            if(component.get("v.toDelete.bic")!='' && component.get("v.toDelete.account")!=''){
                var action = component.get("c.deletePain002Account");
                action.setParams({account:component.get("v.toDelete.account"), bic:component.get("v.toDelete.bic")});;
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        component.set("v.isDelete",false);
                        component.set("v.toastType","success");
                        component.set("v.toastMessage",$A.get("$Label.c.painDeactivatedCorrectly"));
                        component.set("v.showToast",true);                    
                    }
                    else if (state === "ERROR") {
                        component.set("v.toastType","error");
                        component.set("v.toastMessage",$A.get("$Label.c.painNotDeactivatedCorrectly"));
                        component.set("v.showToast",true);
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

        } catch (e) {
            console.log(e);
        }
    }
    })