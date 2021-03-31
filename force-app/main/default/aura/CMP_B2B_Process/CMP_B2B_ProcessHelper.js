({
    showToast: function (component, event, helper, title, body, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, title, body, 'Error', 'warning', 'warning', noReload, false);
        }
    },

    showSuccessToast: function (component, event, helper, title, body, method) {
        var toast = component.find('toast');
        if (!$A.util.isEmpty(toast)) {
            toast.openToast(true, false, title, body, 'Success', 'success', 'success', false, false, method);
        }
    },

    showWarningToast: function (component, event, helper, title, body, noReload) {
        var toast = component.find('errorToast');
        if (!$A.util.isEmpty(toast)) {
            toast.openToast(true, false, title, body, 'Warning', 'warning', 'warning', noReload, false);
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
        }), this);
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
                    return new Promise($A.getCallback((resolve, reject) => {
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
                        resolve('OK');
                    }));
                })).then($A.getCallback(function (value) {
                    return helper.loadingEditingProcess(component, helper);
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

    /**01/12/2020       Bea Hill        Add transferType */
    getBeneficiaryAccounts: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let focusStep = component.get('v.steps.lastModifiedStep');
            let transferType = component.get('v.transferType');
            if ($A.util.isEmpty(transferType)) {
                transferType = 'instant_transfer'; // FLOWERPOWER_PARCHE_BH para controlar el caso de editar
            }
            if (focusStep == 1) {
                component.set('v.spinner', true);
                let userData = component.get('v.userData');
                let paymentDraft = component.get('v.paymentDraft');
                return helper.getAccountsToB2BDestination(component, helper, userData, transferType, paymentDraft.sourceAccount)
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
            let transferType = component.get('v.transferType');
            let PTT_instant_transfer = $A.get('$Label.c.PTT_instant_transfer');
            let PTT_international_transfer_single = $A.get('$Label.c.PTT_international_transfer_single');
            let paymentDraft = component.get('v.paymentDraft');
            let accountListDestination = helper.removeAccountFromList(value, paymentDraft.sourceAccount);
            if (transferType == PTT_instant_transfer) {
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
            } else if (transferType == PTT_international_transfer_single) {
                component.set('v.accountListDestination', accountListDestination);
                resolve('handleAccountsToB2BDestination_OK');
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
        if (!$A.util.isEmpty(listToCheck)) {
            for (let i = 0; i < listToCheck.length; i++) {
                if (listToCheck[i].displayNumber.localeCompare(accountToDelete.displayNumber) != 0) {
                    newList.push(listToCheck[i]);
                }
            }
        }
        return newList;
    },

    getURLParams: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.paymentId', '');
            component.set('v.paymentDetails', {});
            component.set('v.transferType', '');
            let sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            let sURLVariablesMain = sPageURLMain.split('&')[0].split('=');
            if (sURLVariablesMain[0] == 'params' && !$A.util.isEmpty(sURLVariablesMain[1])) {
                helper.decrypt(component, sURLVariablesMain[1])
                    .then($A.getCallback(function (results) {
                        let paymentId = '';
                        let paymentDetails = {};
                        let reuse = false;
                        let transferType = '';
                        let header = '';
                        if (!$A.util.isEmpty(results)) {
                            let sURLVariables = results.split('&');
                            for (var i = 0; i < sURLVariables.length; i++) {
                                let sParameterName = sURLVariables[i].split('=');
                                if (sParameterName[0] === 'c__paymentId') {
                                    paymentId = sParameterName[1];
                                    component.set('v.paymentId', paymentId);
                                }
                                if (sParameterName[0] === 'c__paymentDetails') {
                                    if (!$A.util.isEmpty(sParameterName[1])) {
                                        paymentDetails = JSON.parse(sParameterName[1]);
                                        component.set('v.paymentDetails', paymentDetails);
                                    }
                                }
                                if (sParameterName[0] === 'c__reuse') {
                                    if (!$A.util.isEmpty(sParameterName[1])) {
                                        reuse = JSON.parse(sParameterName[1]);
                                        component.set('v.isReuse', reuse);
                                    }
                                }
                                if (sParameterName[0] === $A.get('$Label.c.PARAM_transferType')) {
                                    if (!$A.util.isEmpty(sParameterName[1])) {
                                        transferType = sParameterName[1];
                                        component.set('v.transferType', transferType);
                                    }
                                }
                                if (sParameterName[0] === $A.get('$Label.c.PARAM_paymentMethod')) {
                                    console.log(sParameterName[1])
                                    if (!$A.util.isEmpty(sParameterName[1])) {
                                        let paymentDraft = component.get('v.paymentDraft');
                                        paymentDraft.paymentMethod = sParameterName[1];
                                        component.set('v.paymentDraft', paymentDraft);
                                    }
                                }
                                if (sParameterName[0] === $A.get('$Label.c.PARAM_parsedPaymentMethod')) {
                                    if (!$A.util.isEmpty(sParameterName[1])) {
                                        let paymentDraft = component.get('v.paymentDraft');
                                        paymentDraft.parsedPaymentMethod = sParameterName[1];
                                        component.set('v.paymentDraft', paymentDraft);
                                    }
                                }
                            }
                        }
                        if (!$A.util.isEmpty(paymentDetails) && $A.util.isEmpty(transferType)) {
                            var b2bprodId = $A.get('$Label.c.CNF_payment_productId_001');
                            var IIPprodId = $A.get('$Label.c.CNF_payment_productId_002');
                            var serviceIdIIT = 'add_inter_paym_int_cust_diff_group';
                            var serviceIdB2B = 'add_international_payment_internal';

                            if (!$A.util.isEmpty(paymentDetails.productId) && 
                            (paymentDetails.productId === b2bprodId || paymentDetails.productId === IIPprodId)) {
                                if (paymentDetails.productId === b2bprodId) {
                                    transferType = $A.get('$Label.c.PTT_instant_transfer');
                                } else if (paymentDetails.productId === IIPprodId){
                                    transferType = $A.get('$Label.c.PTT_international_transfer_single');
                                }
                            }
                            else{
                                if (paymentDetails.serviceId === serviceIdB2B) {
                                    transferType = $A.get('$Label.c.PTT_instant_transfer');
                                } else if (paymentDetails.serviceId === serviceIdIIT){
                                    transferType = $A.get('$Label.c.PTT_international_transfer_single');
                                }
                            }
                             component.set('v.transferType', transferType);
                        }
                        if (transferType == $A.get('$Label.c.PTT_instant_transfer') || transferType == 'instant_transfer') {
                            header = $A.get('$Label.c.instantTransfer');
                        } else if (transferType == $A.get('$Label.c.PTT_international_transfer_single') || transferType == 'international_transfer_single') {
                            header = $A.get('$Label.c.PAY_InternationalTransfer');
                        }
                        component.set('v.headerLabel', header);
                        resolve('getURLParams_OK');
                    })).catch($A.getCallback(function (error) {
                        reject({
                            'title': $A.get('$Label.c.B2B_Error_Problem_Loading'),
                            'body': $A.get('$Label.c.B2B_Error_Check_Connection'),
                            'noReload': false
                        });
                    }));
            } else {
                resolve('getURLParams_OK');
            }
        }));
    },

    initReusingProcess: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let reuse = component.get('v.isReuse');
            let paymentDetails = component.get('v.paymentDetails');
            let paymentDraft = component.get('v.paymentDraft');
            if (reuse && !$A.util.isEmpty(paymentDetails)) {
                paymentDraft.paymentId = "";
                component.set('v.paymentDraft', paymentDraft);
                component.set('v.isEditingProcess', true);
                component.set('v.isEditing', true);
                helper.loadingEditingProcess(component, helper);
            }
            resolve('initReusingProcess');
        }));
    },

    initEditingProcess: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let paymentDetails = component.get('v.paymentDetails');
            let paymentId = paymentDetails.paymentId;
            if (!$A.util.isEmpty(paymentId) && !$A.util.isEmpty(paymentDetails)) {
                component.set('v.isEditingProcess', true);
                component.set('v.isEditing', true);
                helper.loadingEditingProcess(component, helper);
            }
            resolve('initEditingProcess_OK');
        }));
    },

    loadingEditingProcess: function (component, helper) {
        return new Promise($A.getCallback((resolve, reject) => {
            let isEditingProcess = component.get('v.isEditingProcess');
            let isReuseProcess = component.get('v.isReuse');
            if (isEditingProcess == true) {
                let paymentDetails = component.get('v.paymentDetails');
                let steps = component.get('v.steps');
                let focusStep = steps.lastModifiedStep;
                if (focusStep == 1) {
                    let sourceAccount = null;
                    var originList = component.get('v.accountListOrigin');
                    if (!$A.util.isEmpty(originList)) {
                        for (let i = 0; i < originList.length && sourceAccount == null; i++) {
                            if (originList[i].displayNumber == paymentDetails.sourceAccount.trim()) {
                                sourceAccount = originList[i];
                            }
                        }
                    }
                    if (!$A.util.isEmpty(sourceAccount)) {
                        let paymentDraft = component.get('v.paymentDraft');
                        if(!isReuseProcess && !$A.util.isEmpty(paymentDetails.paymentId)){
                            paymentDraft.paymentId = paymentDetails.paymentId;
                        }
                        paymentDraft.sourceAccount = sourceAccount;
                        component.set('v.paymentDraft', paymentDraft);
                        let selectOrigin = component.find('selectOrigin');
                        selectOrigin.checkContinue(1);
                    }
                } else if (focusStep == 2) {
                    let destinationAccount = null;
                    var destinationList = component.get('v.accountListDestination');
                    if (!$A.util.isEmpty(destinationList)) {
                        for (let i = 0; i < destinationList.length && destinationAccount == null; i++) {
                            if (destinationList[i].displayNumber == paymentDetails.beneficiaryAccount.trim()) {
                                destinationAccount = destinationList[i];
                            }
                        }
                    }
                    if (!$A.util.isEmpty(destinationAccount)) {
                        let paymentDraft = component.get('v.paymentDraft');
                        paymentDraft.destinationAccount = destinationAccount;
                        component.set('v.paymentDraft', paymentDraft);
                        let selectDestination = component.find('selectDestination');
                        selectDestination.checkContinue(2);
                    }
                } else if (focusStep == 3) {
                    let amountReceive = null;
                    let amountSend = null;
                    let amountEntered = null;
                    let amountEnteredFrom = '';
                    if (!$A.util.isEmpty(paymentDetails.operationAmount) && !$A.util.isEmpty(paymentDetails.operationAmount.amount)) {
                        if (!$A.util.isEmpty(paymentDetails.operationNominalFxDetails) && !$A.util.isEmpty(paymentDetails.operationNominalFxDetails.customerExchangeRate)) {
                            amountReceive = paymentDetails.operationAmount.amount;
                            amountEntered = paymentDetails.operationAmount.amount;
                            amountEnteredFrom = 'recipient';
                        } else {
                            amountSend = paymentDetails.operationAmount.amount;
                            amountEntered = paymentDetails.operationAmount.amount;
                            amountEnteredFrom = 'source';
                        }
                    } else if (!$A.util.isEmpty(paymentDetails.counterValueOperationAmount) && !$A.util.isEmpty(paymentDetails.counterValueOperationAmount.amount)) {
                        amountSend = paymentDetails.counterValueOperationAmount.amount;
                        amountEntered = paymentDetails.counterValueOperationAmount.amount;
                        amountEnteredFrom = 'source';
                    }
                    let paymentDraft = component.get('v.paymentDraft');
                    paymentDraft.amountReceive = amountReceive;
                    paymentDraft.amountSend = amountSend;
                    paymentDraft.amountEnteredFrom = amountEnteredFrom;

                    paymentDraft.reference = paymentDetails.clientReference;
                    paymentDraft.description = paymentDetails.subject;
                    paymentDraft.purpose = paymentDetails.purpose;

                    component.set('v.paymentDraft', paymentDraft);
                    let selectAmount = component.find('selectAmount');
                    selectAmount.editingProcess(amountEntered, amountEnteredFrom);
                    component.set('v.isEditingProcess', false);
                    component.set('v.paymentDetails', {});
                } else {
                    component.set('v.isEditingProcess', false);
                    component.set('v.paymentDetails', {});
                }
            }
            resolve('initEditingProcess_OK');
        }));
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
        
    /*
    Author:        	H. Estivalis
    Company:        Deloitte
    Description:    Encryption for page navigation
    History:
    <Date>          <Author>            <Description>
    18/06/2020      H. Estivalis        Initial version - adapted from B2B
    */
    encrypt: function (component, data) {
        return new Promise(function (resolve, reject) {
            let action = component.get('c.encryptData');
            action.setParams({
                'str': data
            });
            action.setCallback(this, function (response) {
                let result = 'null';
                let state = response.getState();
                if (state === 'ERROR') {
                    let errors = response.getError();
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
    },


    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Makes the callout to cancel a previously validated transaction, 
    which removes it from transactional counters for accumulated limits
    History:
    <Date>          <Author>            <Description>	    
    18/01/2021      Shahad Naji         Initial version 
    */
    reverseLimits: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let paymentDraft = component.get('v.paymentDraft');
            let action = component.get('c.reverseLimits');
            action.setParams({
                'paymentDraft': paymentDraft
            });
            action.setCallback(this, function (response) {
                let state = response.getState();
                let notificationTitle = $A.get('$Label.c.B2B_Error_Problem_Loading');
                let subtitle = null;
                let ok = 'ok';
                if (state === 'SUCCESS') {
                    let output = response.getReturnValue();
                    if (output.success) {
                        if (!$A.util.isEmpty(output.value)) {
                            if (returnValue.value.limitsResult.toLowerCase() != ok.toLowerCase()) {
                                resolve('ok');
                            } else {
                                helper.showToast(component, event, helper, notificationTitle, subtitle, false);
                                reject('ko');
                            }
                        } else {
                            resolve('ok');
                        }
                    } else {
                        helper.showToast(component, event, helper, notificationTitle, subtitle, false);
                        reject('ko');
                    }
                } else if (state === 'ERROR') {
                    let errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    reject('ko');
                } else {
                    console.log('Another error');
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },
        
    postFraud: function (component, event, helper, callTypeParam) {
        return new Promise(function (resolve, reject) {
            try {
                var action = component.get('c.postFraud');
                var userData = component.get('v.userData');
                var navigatorInfo = component.get('v.navigatorInfo');
                var paymentDraft = component.get('v.paymentDraft');
                action.setParams({
                    userData : userData,
                    navigatorInfo : navigatorInfo,
                    paymentDraft :paymentDraft,
                    callType : callTypeParam
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === 'SUCCESS') {
                        var stateRV = response.getReturnValue();
                        if (stateRV.success) {
                            resolve('ok');
                        }else{
                            reject('ko');
                        }
                    } else if (state === 'INCOMPLETE') {
                        reject('ko');
                    } else if (state === 'ERROR') {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log('Error message: ' + errors[0].message);
                            }
                        } else {
                            console.log('Unknown error');
                        }
                        reject('ko');
                    } else {
                      reject('ko');
                    }
                });
                $A.enqueueAction(action);
            } catch(e) {
                console.error(e);
                console.error('e.name => ' + e.name);
                console.error('e.message => ' + e.message);
                console.error('e.stack => ' + e.stack);
                reject('ko');
            }
        }, this);
    },
     getPaymentSignatureStructure: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getSignatureStructure');
            var paymentDraft = component.get('v.paymentDraft');
            action.setParams({
                'channel': 'WEB',
                'navigatorInfo' : component.get('v.navigatorInfo'),
                'paymentDraft': paymentDraft
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.Problem_Signature_Structure'), true);
                    }
                    reject({
                        'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                    });
                } else {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        resolve('OK');
                    } else {
                        reject({
                            'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                        });
                        helper.showToast(component,event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.Problem_Signature_Structure'), true);
                    }
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    //	14/01/2021	Shahad Naji		Update payment with baseAmount and baseCurrency pieces of information
    /*updatePaymentDetails: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let clientReference = null;
            let purpose = null;
            let description = null;
            let paymentId =  null;
            let chargeBearer = null;
            let paymentMethod = null;
            let comercialCode = null;
            let baseAmount = null;
            let baseCurrency = null;
            let processDate = null;
            let paymentDraft = component.get('v.paymentDraft');
            if (!$A.util.isEmpty(paymentDraft)) {
                if (!$A.util.isEmpty(paymentDraft.reference)) {
                    clientReference = paymentDraft.reference;
                }
                if (!$A.util.isEmpty(paymentDraft.purpose)) {
                    purpose = paymentDraft.purpose;
                }
                if (!$A.util.isEmpty(paymentDraft.description)) {
                    description = paymentDraft.description;
                }
                if (!$A.util.isEmpty(paymentDraft.comercialCode)) {
                    comercialCode = paymentDraft.comercialCode;
                }
                if (!$A.util.isEmpty(paymentDraft.baseAmount)) {
                    baseAmount = paymentDraft.baseAmount;
                }
                if (!$A.util.isEmpty(paymentDraft.baseCurrency)) {
                    baseCurrency = paymentDraft.baseCurrency;
                }
                if (!$A.util.isEmpty(paymentDraft.paymentId)) {
                    paymentId = paymentDraft.paymentId;
                }
                chargeBearer = 'OUR';
                paymentMethod = 'book_to_book';
            }
            paymentDraft.chargeBearer = chargeBearer; // Siempre 'OUR' para Book To Book. Posibles valores 'OUR'-nuestro, 'SHA'-compartido, 'BEN'-recipiente
            paymentDraft.paymentMethod = paymentMethod; // Pendiente de confirmación del valor, es el método seleccionado por el usuario en las tarjetas en este paso
            component.set('v.paymentDraft', paymentDraft);
            let action = component.get('c.updatePaymentInformation');
            action.setParams({
                'paymentId': paymentId,
                'clientReference': clientReference,
                'purpose': purpose,
                'description': description,
                'chargeBearer': chargeBearer,
                'paymentMethod': paymentMethod,
                'commercialCode': comercialCode,
                'baseAmount': baseAmount,
                'baseCurrency' : baseCurrency
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        resolve('OK');
                    } else {
                        reject({
                            'message': stateRV.msg
                        });
                        helper.showToast(component, 'Error',$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Updating_Data'), true);
                    }
                } else if (actionResult.getState() == 'INCOMPLETE' || actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('problem updating payment details.');
                    }
                    reject({
                        'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                    });
                    helper.showToast(component, 'Error',$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true);
                }
            });
            $A.enqueueAction(action);
        }), this);
    },*/

    /*
    Author:        	Candido
    Company:        Deloitte
    Description:    Call API to check the FCC Dow Jones
    History:
    <Date>          <Author>            <Description>
    07/08/2020      Candido             Initial version
    */
    checkFCCDowJones: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var paymentDraft = component.get('v.paymentDraft');
            var action = component.get('c.checkFCCDowJones');
            action.setParams({
                'paymentDraft': paymentDraft
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.passValidation) && stateRV.value.passValidation == true) {
                            resolve('OK');
                        } else {
                            reject({
                                'FCCError': true,
                                'message': stateRV.msg
                            });
                        }
                    } else {
                        reject({
                            'message': stateRV.msg
                        });
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Updating_Data'), true);
                    }
                } else if (actionResult.getState() == 'INCOMPLETE' || actionResult.getState() == 'ERROR') {
                    reject({
                        'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                    });
                    helper.showToast(component, event, helper ,$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true);
                }
            });
            $A.enqueueAction(action);
        }), this);
    },
        /*
    Author:        	Candido
    Company:        Deloitte
    Description:    Handle when 'checkFCCDowJones' return unsuccessful
    History:
    <Date>          <Author>            <Description>
    07/08/2020      Candido             Initial version
    */
    handleFCCError: function (component, event, helper) {
        var url = 'c__FFCError=true';
        helper.encrypt(component, url)
        .then($A.getCallback(function (results) {
            let navService = component.find('navService');
            let pageReference = {
                'type': 'comm__namedPage',
                'attributes': {
                    'pageName': 'landing-payments'
                },
                'state': {
                    'params': results
                }
            }
            navService.navigate(pageReference);
        }));
    },
        
	continuePaymentInformation :function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let focusStep = component.get('v.steps.lastModifiedStep');
            let transferType = component.get('v.transferType');
            if (focusStep == 3) {
                component.set('v.spinner', true);
                helper.getLimits(component, event, helper).then($A.getCallback(function (value) { 
                    /*return helper.updatePaymentDetails(component, event, helper);
                })).then($A.getCallback(function (value) {*/ 
                    return helper.checkFCCDowJones(component, event, helper);
                })).then($A.getCallback(function (value) { 
                    return helper.getPaymentSignatureStructure(component, event, helper);
                })).then($A.getCallback(function (value) { 
                    return helper.postFraud(component, event, helper, '04');
                })).catch($A.getCallback(function (value) {
                    if (!$A.util.isEmpty(value.FCCError) && value.FCCError == true) {
                        helper.handleFCCError(component, event, helper);
                    }
                    console.log(value.message);
                    reject('KO');
                })).finally($A.getCallback(function () {
                    component.set('v.spinner', false);
                    resolve('OK');
                }));
            } else {
                resolve('OK');
            }
        }));
	},
        
    getNavigatorInfo: function (component, event,  helper) {
        new Promise($A.getCallback(function (resolve, reject) {
            let navigatorInfo = component.get('v.navigatorInfo');
            navigatorInfo.userAgent = navigator.userAgent;
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function (position) {
                    navigatorInfo.latitude = position.coords.latitude;
                    navigatorInfo.longitude = position.coords.longitude;
                    console.log(navigatorInfo.latitude);
                    console.log(navigatorInfo.longitude);
                    console.log(navigatorInfo.userAgent);
                    component.set('v.navigatorInfo', navigatorInfo);
                    resolve('ok');
                }, function () {
                    component.set('v.navigatorInfo', navigatorInfo);
                    resolve('ok');
                });
            } else {
                component.set('v.navigatorInfo', navigatorInfo);
                resolve('ok');
            }
        })).catch($A.getCallback(function (error) {
            console.log(error);
        }));
    },
     getLimits: function (component, event, helper) {
        return new Promise(function (resolve, reject) {
            let userData  = component.get('v.userData');
            let paymentDraft = component.get('v.paymentDraft');
            let action = component.get('c.getLimits');
            let notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            let bodyText =  $A.get('$Label.c.B2B_Error_Check_Connection');
            let label = $A.get('$Label.c.PAY_Error_Amount_Exceeds_Limits');
            let limitsResult = '';
            action.setParams({
                'userData': userData,
                'paymentDraft': paymentDraft
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    let stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.limitsResult) && $A.util.isEmpty(stateRV.value.errorMessage)) {
                            let paymentDraft = component.get('v.paymentDraft');
                            if (!$A.util.isEmpty(stateRV.value.baseAmount)) {
                                paymentDraft.baseAmount = stateRV.value.baseAmount;
                            }
                            if (!$A.util.isEmpty(stateRV.value.baseCurrency)) {
                                paymentDraft.baseCurrency = stateRV.value.baseCurrency;
                            }
                            component.set('v.paymentDraft', paymentDraft);
                            resolve('OK');
                        } else {
                            helper.showToast(component, event, helper, notificationTitle, bodyText, false);
                            reject('KO');
                        }
                        if (limitsResult.toLowerCase().localeCompare('ko') == 0 || !$A.util.isEmpty(stateRV.value.errorMessage)) {
                            helper.showWarningToast(component, event, helper, notificationTitle, label, true);
                            reject('KO');
                        }
                    } else {
                        helper.showToast(component, event, helper, notificationTitle, bodyText, false);
                        reject(stateRV.msg);

                    }
                } else {
                    helper.showToast(component, event, helper, notificationTitle, bodyText, false);
                    reject('ERROR: Limits');
                }
            });
            $A.enqueueAction(action);
        }, this);
    },

})