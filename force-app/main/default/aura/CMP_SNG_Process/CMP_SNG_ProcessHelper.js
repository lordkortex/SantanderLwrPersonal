({
    nextStep: function (component, helper) {
        let stepBy = component.get('v.stepBy');
        let activeBy = component.get('v.activeBy');
        let totalSteps = component.get('v.totalSteps');
        if (activeBy < totalSteps) {
            if (stepBy == activeBy) {
                stepBy++;
            }
            activeBy++;
            var parametros = helper.processStep(component, stepBy, activeBy);
            parametros.then($A.getCallback(function (value) {
               // document.getElementById('endPage').focus();
                 document.getElementById('step-' + activeBy).scrollIntoView(); 
            })).catch(function (error) {
                console.log(error);
            }).finally($A.getCallback(function() {
                console.log('OK');
            }));
        }
    },

    processStep: function (component, futureStep, currentStep) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.activeBy', currentStep);
            component.set('v.stepBy', futureStep);
            resolve('Ok');
        }), this);
    },

    previousStep: function (component, helper) {
        let stepBy = component.get('v.stepBy');
        let activeBy = component.get('v.activeBy');
        if (activeBy > 1) {
            var parametros = helper.processStep(component, stepBy, --activeBy);
            parametros.then($A.getCallback(function (value) {
                //document.getElementById('step-' + activeBy).focus();
                document.getElementById('step-' + activeBy).scrollIntoView(); 
            })).catch(function (error) {
                console.log(error);
            }).finally($A.getCallback(function() {
                console.log('OK scrollIntoView');
            }));
        }
    },

    getOriginAccounts: function (component, helper) {
        let accountList = component.get('v.accountListOrigin');
        let currencyGlobalBalance = component.get('v.currencyGlobalBalance');
        if ($A.util.isEmpty(accountList) || $A.util.isEmpty(currencyGlobalBalance)) {
            var action = component.get('c.getAccounts');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        component.set('v.accountListOrigin', stateRV.value.accountList);
                        component.set('v.currencyGlobalBalance', stateRV.value.currencyGlobalBalance);
                    }else{
                        console.log($A.get("$Label.c.B2B_Problem_accounts"));
                    }
                } else if (actionResult.getState() == "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            
                        }
                    } else {
                        console.log($A.get("$Label.c.B2B_Problem_accounts"));
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },

    getDestinationAccounts: function (component, helper) {
        let accountList = component.get('v.accountListDestination');
        let currencyGlobalBalance = component.get('v.currencyGlobalBalance');
        if ($A.util.isEmpty(accountList) || $A.util.isEmpty(currencyGlobalBalance)) {
            var action = component.get('c.getAccounts');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        component.set('v.accountListDestination', stateRV.value.accountList);
                        component.set('v.currencyGlobalBalance', stateRV.value.currencyGlobalBalance);
                    }else{
                        console.log($A.get("$Label.c.B2B_Problem_accounts"));
                    }
                } else if (actionResult.getState() == "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            
                        }
                    } else {
                        console.log($A.get("$Label.c.B2B_Problem_accounts"));
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },

    getUserNumberFormat: function (component, event, helper) {
        var action = component.get('c.getUserFormatString');
        action.setCallback(this, function (actionResult) {
            if (actionResult.getState() == 'SUCCESS') {
                var res = actionResult.getReturnValue();
                component.set('v.numberFormat', res);
            } else if (actionResult.getState() == "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                        
                    }
                }
            }
        });
        $A.enqueueAction(action);
    }
    

})