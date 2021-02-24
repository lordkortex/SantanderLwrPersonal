({
    completeStep: function (component) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var completeStep = component.getEvent('completeStep');
            completeStep.setParams({
                'confirm': true
            });
            completeStep.fire();
            component.set('v.errorMSG', '');
            component.set('v.isModified', false);
            if ($A.util.isEmpty(component.get('v.expensesAccount')) || component.get('v.expensesAccount') == component.get('v.data')) {
                component.set('v.checkedYES', false);
            }
            resolve('ok');
        }), this);
    },

    showToast: function (component, notificationTitle, bodyText, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, notificationTitle,  bodyText, 'Error', 'warning', 'warning', noReload);
        }
    },

    validateAccount: function (component, event,helper) {
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
                            let accountList = component.get('v.accountList');
                            if (accountList.length <= 6) {
                                let title = $A.get('$Label.c.B2B_SelectedBlockedAccount');
                                let body = $A.get('$Label.c.B2B_SelectDifferentAccount');
                                helper.showToast(component, title, body, true);
                            } else {
                                component.set('v.errorMSG', $A.get('$Label.c.blockedAccount'));
                            }
                            reject('ko');
                        } else {
                            resolve('ok');
                        }
                    }
                } else if (actionResult.getState() === 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);      
                        }
                    }
                    helper.showToast(component, notificationTitle, bodyText, true);
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    }
})