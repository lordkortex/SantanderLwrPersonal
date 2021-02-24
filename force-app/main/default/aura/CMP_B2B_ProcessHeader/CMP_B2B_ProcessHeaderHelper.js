({
    cancelPayment: function (component, helper) {
        component.set('v.spinner', true);
        helper.updateStatus(component).then($A.getCallback(function (value) {
                return helper.goToLanding(component);
        })).catch(function (error) {
                console.log(error);
        }).finally($A.getCallback(function () {
                console.log('OK');
                component.set('v.spinner', false);
        }));
    },

    goToLanding: function(component) {
        return new Promise($A.getCallback(function (resolve, reject) {
                var url ="";
                let navService = component.find("navService");

                if(url!=''){
                        helper.encrypt(component, url).then($A.getCallback(function (value) {
                                let pageReference = {
                                        type: "comm__namedPage", 
                                        attributes: {
                                        pageName: component.get("v.handleCancel")
                                        },
                                        state: {
                                        params : value
                                        }
                                }
                                navService.navigate(pageReference);
                        }));
                } else {
                        let pageReference = {
                                type: "comm__namedPage", 
                                attributes: {
                                        pageName: component.get("v.handleCancel")
                                },
                                state: {
                                        params : ''
                                }
                        }
                        navService.navigate(pageReference); 
                }
                resolve('ok');
        }), this);
    },

    updateStatus: function (component) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let paymentId = component.get('v.paymentId');
            if (!$A.util.isEmpty(paymentId)) {
                var action = component.get('c.updateStatus');
                action.setParams({
                    "paymentId": paymentId,
                    "status": '990',
                    "reason": '001'
                });
                action.setCallback(this, function (actionResult) {
                    if (actionResult.getState() == "ERROR") {
                        var errors = actionResult.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " +
                                    errors[0].message);
                            }
                        } else {
                            helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get("$Label.c.B2B_Error_Check_Connection"), false);
                        }
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    } else {
        
                        var stateRV = actionResult.getReturnValue();
                        console.log(stateRV);
                        if (stateRV != 'OK') {
                            helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get("$Label.c.B2B_Error_Check_Connection"), false);
                            reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                        } else {
                                resolve('ok');
                        }
                    }
                });
            } else {
                resolve('ok');
            }
            $A.enqueueAction(action);
        }), this);   
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