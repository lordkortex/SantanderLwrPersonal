({
    showToast: function (component, event, helper, title, body, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, title, body, 'Error', 'warning', 'warning', noReload, false);
        }
    },

    checkLastModified: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let steps = component.get('v.steps');
            if (steps.lastModifiedStep < steps.shownStep && steps.focusStep == steps.lastModifiedStep) {
                steps.shownStep = steps.lastModifiedStep;
            }
            component.set('v.steps', steps);
            resolve('ok');
        }),this);
    },

    nextStep: function (component, helper) {
        let steps = component.get('v.steps');
        let shownStep = steps.shownStep;
        let focusStep = steps.focusStep;
        let lastModifiedStep = steps.lastModifiedStep;
        let totalSteps = steps.totalSteps;
        if (focusStep < totalSteps) {
            if (shownStep == focusStep && shownStep == 5) {
                editPayment = true;
            }
            if (shownStep == focusStep) {
                shownStep++;
            } else if (lastModifiedStep > focusStep) {
                focusStep = lastModifiedStep;
                shownStep++;
                lastModifiedStep++;
            }
            focusStep++;
            helper.processStep(component, shownStep, focusStep, false)
            .then($A.getCallback(function (value) {
                var stepComponent = document.getElementById('step-' + focusStep);
                if (stepComponent != null) {
                    stepComponent.scrollIntoView({ behavior: 'smooth' });
                } else {
                    setTimeout(function () {
                        stepComponent = document.getElementById('step-' + focusStep);
                        if (stepComponent != null) {
                            stepComponent.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 10);
                }
            })).catch(function (error) {
                console.log(error);
            }).finally($A.getCallback(function () {
                console.log('OK');
            }));
        }
    },

    processStep: function (component, shownStep, focusStep, editPayment) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.steps.shownStep', shownStep);
            if (!editPayment) {
                component.set('v.steps.focusStep', focusStep);
            }
            component.set('v.steps.lastModifiedStep', focusStep);
            resolve('Ok');
        }), this);
    },

    previousStep: function (component, helper) {
        let steps = component.get('v.steps');
        let shownStep = steps.shownStep;
        let focusStep = steps.focusStep;
        let totalSteps = steps.totalSteps;
        let editPayment = false;
        if (focusStep > 1) {
            if (shownStep == focusStep && shownStep == 5) {
                editPayment = true;
            }
            console.log(component.get('v.steps.focusStep'));
            if (totalSteps == focusStep) {
                shownStep -= 1;
            }
            focusStep -= 1;
            var parametros = helper.processStep(component, shownStep, focusStep, editPayment);
            parametros.then($A.getCallback(function (value) {
                if (editPayment) {
                    component.set('v.steps.focusStep', focusStep);
                }
                if (focusStep < totalSteps) {
                    var stepComponent = document.getElementById('step-' + focusStep);
                    if (stepComponent != null) {
                        stepComponent.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        setTimeout(function () {
                            stepComponent = document.getElementById('step-' + focusStep);
                            if (stepComponent != null) {
                                stepComponent.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 10);
                    }
                }
            })).catch(function (error) {
                console.log(error);
            }).finally($A.getCallback(function () {
                console.log('end scrollIntoView');
            }));
        }
    },

    handleAccountsToB2BOrigin: function (component, helper, value) {
        return new Promise($A.getCallback(function (resolve, reject) {
            if (!$A.util.isEmpty(value)) {
                component.set('v.accountListOrigin', value);
                resolve('handleAccountsToB2BOrigin_OK');
            } else {
                reject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Problem_accounts'),
                    'noReload': false
                });
            }
        }), this);
    },

    getBeneficiaryAccounts: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let focusStep = component.get('v.steps.lastModifiedStep');
            if (focusStep == 1) {
                component.set('v.spinner', true);
                helper.getAccountsToB2BDestination(component, helper, component.get('v.userData'))
                .then($A.getCallback(function (value) {
                    return helper.handleAccountsToB2BDestination(component, helper, value);
                })).then($A.getCallback(function (value) {
                    resolve('getBeneficiaryAccounts_OK');
                })).catch($A.getCallback(function (error) {
                    component.set('v.spinner', false);
                    helper.showToast(component, event, helper, error.title, error.body, error.noReload);
                    reject('getBeneficiaryAccounts_KO');
                })).finally($A.getCallback(function () {
                    component.set('v.spinner', false);
                }));
            } else {
                resolve('getBeneficiaryAccounts_OK');
            }
        }));
    },

    handleAccountsToB2BDestination: function (component, helper, value) {
        return new Promise($A.getCallback(function (resolve, reject) {
            if (!$A.util.isEmpty(value)) {
                let accountListDestination = helper.removeAccountFromList(value, component.get('v.dataSelectOrigin'));
                if (!$A.util.isEmpty(accountListDestination)) {   
                    component.set('v.accountListDestination', accountListDestination);           
                    resolve('handleAccountsToB2BDestination_OK');
                } else {
                    reject({
                        'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                        'body': $A.get('$Label.c.B2B_Problem_accounts'),
                        'noReload': false
                    });
                }
            } else {
                reject({
                    'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                    'body': $A.get('$Label.c.B2B_Problem_accounts'),
                    'noReload': false
                });
            }
        }), this);
    },

    removeAccountFromList: function (listToCheck, accountToDelete) {
        let newList = [];
        for (let i = 0; i < listToCheck.length; i++) {
            if (listToCheck[i].displayNumber.localeCompare(accountToDelete.displayNumber) != 0) {
                newList.push(listToCheck[i]);
            }
        }
        return newList;
    },

    getURLParams: function (component, helper) {
        try {
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split('=');
            var sParameterName;
            var sPageURL;
            if (sURLVariablesMain[0] == 'params') {
                if (sURLVariablesMain[1] != '' && sURLVariablesMain[1] != undefined && sURLVariablesMain[1] != null) {
                    helper.decrypt(component, sURLVariablesMain[1]).then($A.getCallback(function (results) {
                        sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                        var sURLVariables = sPageURL.split('&');
                        var paymentId = '';
                        var source = '';
                        var paymentDetails = {};
                        for (var i = 0; i < sURLVariables.length; i++) {
                            sParameterName = sURLVariables[i].split('=');
                            if (sParameterName[0] === 'c__paymentId') {
                                sParameterName[1] === undefined ? 'Not found' : paymentId = sParameterName[1]; component.set('v.paymentId', sParameterName[1]);
                            }
                            if (sParameterName[0] === 'c__source') {
                                sParameterName[1] === undefined ? 'Not found' : source = sParameterName[1];
                            }
                            if (sParameterName[0] === 'c__paymentDetails') {
                                sParameterName[1] === undefined ? 'Not found' : paymentDetails = JSON.parse(sParameterName[1]);
                            }
                        }
                        if (paymentId != null && paymentId != '') {
                            if (source != null && source != '') {
                                if (source == 'landing-payment-details') {
                                    component.set('v.isEditing', true);
                                    if (!$A.util.isEmpty(paymentDetails)) {
                                        var dataSelectAmount = component.get('v.dataSelectAmount');
                                        dataSelectAmount.amountSend = paymentDetails.amount;
                                        dataSelectAmount.transactionFee = paymentDetails.fees;
                                        if (!$A.util.isEmpty(paymentDetails.operationNominalFxDetails)) {
                                            if (!$A.util.isEmpty(paymentDetails.operationNominalFxDetails.ccyCountervalue)) {
                                                if (!$A.util.isEmpty(paymentDetails.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount)) {
                                                    dataSelectAmount.amountReceive = paymentDetails.operationNominalFxDetails.ccyCountervalue.ccyCountervalueAmount;
                                                } else {
                                                    dataSelectAmount.amountReceive = null;
                                                }
                                            } else {
                                               dataSelectAmount.amountReceive = null; 
                                            }
                                        } else {
                                            dataSelectAmount.amountReceive = null;
                                        }
                                        var dataPaymentInformation = component.get('v.dataPaymentInformation');
                                        dataPaymentInformation.reference = paymentDetails.clientReference;
                                        dataPaymentInformation.purpose = paymentDetails.purpose;
                                        dataPaymentInformation.description = paymentDetails.paymentReference;
                                        dataPaymentInformation.paymentReason = paymentDetails.paymentReason;
                                        dataPaymentInformation.paymentStatus = paymentDetails.paymentStatus;
                                        var originList = component.get('v.accountListOrigin');
                                        console.log(originList);
                                        console.log(originList.length);
                                        let exitOrigin = false;
                                        let i = 0;
                                        while (exitOrigin == false && i < originList.length) {
                                            console.log(originList[i]);
                                            if (originList[i].displayNumber == paymentDetails.sourceAccount.trim()) {
                                                console.log('ok');
                                                console.log(originList[i]);
                                                component.set('v.dataSelectOrigin', originList[i]);
                                                exitOrigin = true;
                                            }
                                            i++;
                                        }
                                        var destinationList = component.get('v.accountListDestination');
                                        let exitDestination = false;
                                        let j = 0;
                                        while (exitDestination == false && j < destinationList.length) {
                                            if (destinationList[j].displayNumber == paymentDetails.beneficiaryAccount.trim()) {
                                                component.set('v.dataSelectDestination', destinationList[j]);
                                                exitDestination = true;
                                            }
                                            j++;
                                        }
                                        component.set('v.dataSelectAmount', dataSelectAmount);
                                        component.set('v.dataPaymentInformation', dataPaymentInformation);
                                        var steps = component.get('v.steps');
                                        if (!$A.util.isEmpty(steps)) {
                                            steps.shownStep = 4;
                                            steps.focusStep = 1;
                                            steps.lastModifiedStep = 4;
                                            steps.totalSteps = 5;
                                            component.set('v.steps', steps);
                                        }
                                    }
                                }
                            }
                        }
                    }));
                } else {
                    component.set('v.steps.shownStep', 1);
                }
            } else {
                component.set('v.steps.shownStep', 1);
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History:
    <Date>          <Author>                    <Description>
    19/11/2019      R. Alexander Cervino        Initial version
    */
    decrypt: function (component, data) {
        return new Promise(function (resolve, reject) {
            var action = component.get('c.decryptData');
            action.setParams({
                'str': data
            });
            action.setCallback(this, function (response) {
                var result = 'null';
                var state = response.getState();
                if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                } else if (state === 'SUCCESS') {
                    result = response.getReturnValue();
                }
                resolve(result);
            });
            $A.enqueueAction(action);
        });
    },

    getAccountData: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getAccountData');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var accountData = {};
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.cib)) {
                            accountData.cib = stateRV.value.cib;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.cib = false; // Añadir un error
                        }
                        if (!$A.util.isEmpty(stateRV.value.documentType)) {
                            accountData.documentType = stateRV.value.documentType;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.documentType = 'tax_id'; // Añadir un error
                        }
                        if (!$A.util.isEmpty(stateRV.value.documentNumber)) {
                            accountData.documentNumber = stateRV.value.documentNumber;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.documentNumber = 'B86561412'; // Añadir un error
                        }
                        if (!$A.util.isEmpty(stateRV.value.companyId)) {
                            accountData.companyId = stateRV.value.companyId;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.companyId = '2119'; // Añadir un error
                        }
                    }
                    component.set('v.accountData', accountData);
                    resolve('getAccountData_OK');
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject({
                        'title': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                        'body': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                        'noReload': true
                    });
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    getUserData: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getUserData');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value)) {
                            if (!$A.util.isEmpty(stateRV.value.userData)) {
                                component.set('v.userData', stateRV.value.userData);
                                resolve('getUserData_OK');
                            } else {
                                reject({
                                    'title': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                                    'body': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                                    'noReload': true
                                });
                            }
                        } else {
                            reject({
                                'title': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                                'body': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                                'noReload': true
                            });
                        }
                    } else {
                        reject({
                            'title': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                            'body': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                            'noReload': true
                        });
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject({
                        'title': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                        'body': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                        'noReload': true
                    });
                } else {
                    reject({
                        'title': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                        'body': $A.get('$Label.c.ERROR_NOT_RETRIEVED'),
                        'noReload': true
                    });
                }
            });
            $A.enqueueAction(action);
        }), this);
    }

  
})