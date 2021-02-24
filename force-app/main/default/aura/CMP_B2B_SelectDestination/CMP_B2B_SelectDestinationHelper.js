({
    completeStep: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var completeStep = component.getEvent('completeStep');
            completeStep.setParams({
                'confirm': true
            });
            completeStep.fire();
            component.set('v.errorMSG', '');
            component.set('v.isModified', false);
            resolve('ok');
        }), this);
    },

    showToast: function (component,event, helper) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, $A.get('$Label.c.B2B_Error_Problem_Loading'),  $A.get('$Label.c.B2B_Error_Check_Connection'), 'Error', 'warning', 'warning', true);
        }
    },

    validateAccount: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let data = component.get('v.data');
            let action = component.get('c.accountValidation');
            action.setParams({
                'data': data
            });
            action.setCallback(this, function (actionResult) {
                let notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
                let bodyText =  $A.get('$Label.c.B2B_Error_Check_Connection');
                if (actionResult.getState() == 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    if (!returnValue.success) {
                        helper.showToast(component, notificationTitle, bodyText, true);
                        reject('ko');
                    } else {
                        if (returnValue.value.statusResult != 'OK') {
                            component.set('v.errorMSG', $A.get('$Label.c.blockedAccount'));
                            reject('ko');
                        } else {
                            resolve('ok');
                        }
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    helper.showToast(component, notificationTitle, bodyText, true);
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);      
                        }
                    }
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
            
           
        }), this);
    },

    getPaymentId : function(component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.data');
            var userData = component.get('v.userData');
            var accountData = component.get('v.accountData');
            var paymentId = component.get('v.paymentId');
            var expensesAccount = null;
            if (!$A.util.isEmpty(component.get('v.expensesAccount'))) {
                expensesAccount = component.get('v.expensesAccount');
            }
            if (!$A.util.isEmpty(paymentId)) {
                resolve('Payment Id was created time ago.');
            } else {
                var action = component.get('c.getPaymentId');
                action.setParams({
                    'sourceAccountData': sourceAccountData,
                    'recipientAccountData': recipientAccountData,
                    'userData': userData,
                    'accountData': accountData,
                    'paymentId': paymentId,
                    'expensesAccount': expensesAccount
                }); 
                action.setCallback(this, function (actionResult) {
                    let notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
                    let bodyText =  $A.get('$Label.c.B2B_Error_Continue_Button');
                    if (actionResult.getState() == 'SUCCESS') {
                        let stateRV = actionResult.getReturnValue();
                        console.log(stateRV);
                        if (stateRV.success) {
                            if (!$A.util.isEmpty(stateRV.value)) {
                                if (!$A.util.isEmpty(stateRV.value.paymentId)) {
                                    component.set('v.paymentId', stateRV.value.paymentId);
                                    resolve('OK');
                                } else {
                                    helper.showToast(component, notificationTitle, bodyText, true);
                                    reject('ERROR: empty stateRV.value.paymentId');
                                }
                            } else {
                                helper.showToast(component, notificationTitle, bodyText, true);
                                reject('ERROR: stateRV.value');
                            }
                        } else {
                            helper.showToast(component, notificationTitle, bodyText, true);
                            reject(stateRV.msg);
                        }
                    } else {
                        helper.showToast(component, notificationTitle, bodyText, true);
                        reject('ERROR: Create Payment Id.');
                    }
                });
                $A.enqueueAction(action);
            }
        }), this);
    },

    showToast: function (component, notificationTitle, bodyText, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false,  notificationTitle, bodyText, 'Error', 'warning', 'warning', noReload);
        }
    },

    compareAccounts: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var recipientData = component.get('v.data');
            var sourceData = component.get('v.sourceAccountData');
            if (!$A.util.isEmpty(recipientData.displayNumber) && !$A.util.isEmpty(sourceData.displayNumber)) {
                if (recipientData.displayNumber != sourceData.displayNumber) {
                    resolve('OK');
                } else {
                    let notificationTitle = 'Same account selected in Step 1'; //$A.get('$Label.c.B2B_Error_Problem_Loading');
                    let bodyText = 'Please select a different account.'; //$A.get('$Label.c.B2B_Error_Continue_Button');
                    helper.showToast(component, notificationTitle, bodyText, true);
                    reject('Source account = recipient account.');
                }
            } else {
                let notificationTitle = $A.get('$Label.c.B2B_Error_Problem_Loading');
                let bodyText = $A.get('$Label.c.B2B_Error_Continue_Button');
                helper.showToast(component, notificationTitle, bodyText, true);
                reject('No account numbers to compare');
            }
        }), this);
    }
})