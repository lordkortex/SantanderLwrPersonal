({
    checkTypeAvailable: function (component, helper) {
        let transferTypeParams = component.get('v.transferTypeParams');
        if ($A.util.isEmpty(transferTypeParams)) {
            component.set('v.spinner', true);
            let userData = component.get('v.userData');
            let action = component.get('c.checkTypeAvailable');
            action.setParam({
                'userData': userData
            });
            action.setCallback(this, function (actionResult) {
                let result = actionResult.getReturnValue();
                console.log(result);
                if (actionResult.getState() == 'SUCCESS') {
                    if (result.success) {
                        component.set('v.transferTypeParams', result.value);
                    } else {
                        console.log('checkTypeAvailable_KO');
                    }
                } else if (actionResult.getState() === 'INCOMPLETE') {
                    console.log('checkTypeAvailable_KO');
                } else if (actionResult.getState() == 'ERROR') {
                    console.log('checkTypeAvailable_KO');
                }
                component.set('v.spinner', false);
            });
            $A.enqueueAction(action);
        }
    },

    goToURL: function (component, helper, params, single) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let navService = component.find('navService');
            if (!$A.util.isEmpty(navService)) {
                let page = 'payments-b2b';
                if (single == false) {
                    // TO-DO
                }
                navService.navigate({
                    'type': 'comm__namedPage', 
                    'attributes': {
                        'pageName': page
                    },
                    'state': {
                        'params': params
                    }
                });
                resolve('goToURL_OK');
            } else {
                reject({
                    'description': 'goToURL_KO'
                });
            }
        }));
     } ,

     
    handleAccountsToB2BOrigin: function (component, helper, value) {
        return new Promise($A.getCallback(function (resolve, reject) {
            if (!$A.util.isEmpty(value)) {
                //component.set('v.accountListOrigin', value);
                resolve('handleAccountsToB2BOrigin_OK');
            } else {
                reject({
                    'title': $A.get('$Label.c.B2B_no_Origin_Accounts'),
                    'noReload': true
                });
            }
        }), this);
    },
    
     showToast: function (component,event, helper, title, body, noReload, mode) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            if (mode == 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if (mode == 'success') {
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);
            }
        }
    }

})