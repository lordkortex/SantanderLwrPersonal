({
    /*
    Author:        	Beatrice Hill
    Company:        Deloitte
    Description:    Go to page with lightning navigation
    History:
    <Date>          <Author>            <Description>
    23/06/2020      Beatrice Hill       Adapted from CMP_AccountsCardRow
    */
    goTo: function (component, event, page, url) {
        let navService = component.find('navService');
        if (url != '') {
            this.encrypt(component, url)
            .then($A.getCallback(function (results) {
                let pageReference = {
                    'type': 'comm__namedPage',
                    'attributes': {
                        'pageName': page
                    },
                    'state': {
                        'params': results
                    }
                }
                navService.navigate(pageReference);
            }));
        } else {
            let pageReference = {
                'type': 'comm__namedPage',
                'attributes': {
                    'pageName': page
                },
                'state': {
                    'params': ''
                }
            }
            navService.navigate(pageReference);
        }
    },

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Encryption for page navigation
    History:
    <Date>          <Author>            <Description>
    18/06/2020      Bea Hill            Initial version - adapted from B2B
    */
    encrypt: function (component, data) {
        var result = 'null';
        var action = component.get('c.encryptData');
        action.setParams({
            'str': data
        });
        return new Promise($A.getCallback(function (resolve, reject) {
            action.setCallback(this, function (response) {
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
        }));
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Decodes and parses the URL params
    History:
    <Date>          <Author>                <Description>
    03/03/2020      Guillermo Giral         Initial version - CMP_Account_Transactions_ParentHelper
    23/06/2020      Bea Hill                Adapted for CMP_PaymentsLandingPaymentDetails
    */
    getUrlParams: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
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
                            for (var i = 0; i < sURLVariables.length; i++) {
                                sParameterName = sURLVariables[i].split('=');
                                switch (sParameterName[0]) {
                                    case ('c__currentUser'):
                                        sParameterName[1] === undefined ? 'Not found' : component.set('v.currentUser', JSON.parse(sParameterName[1]));
                                        break;
                                    case ('c__paymentID'):
                                        sParameterName[1] === undefined ? 'Not found' : component.set('v.paymentID', sParameterName[1]);
                                        break;
                                }
                            }
                            resolve('La ejecucion ha sido correcta.');
                        }));
                    }
                }
            } catch (e) {
                console.log(e);
                helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
            }
        }), this);
    },

    /*
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to generate a new payment Id.
    History
    <Date>          <Author>        <Description>
    31/08/2020      Adrian Munio    Initial version
    */
    createNewPayment: function (component, event, helper) {
        return new Promise($A.getCallback(function (resultCreate) {
            var action = component.get('c.createPayment');
            action.setParams({
                'payment': component.get('payment'),
                // 'sourceAccountData': sourceAccount,
                // 'recipientAccountData': beneficiaryAccount,
                'userData': component.get('v.currentUser'),
                'accountData': component.get('v.accountData')
            });
            action.setCallback(this, function (actionResult) {
                if(actionResult.getState() == 'SUCCESS'){
                    var returnValue = actionResult.getReturnValue();
                    if (!$A.util.isEmpty(returnValue)) {
                        resultCreate(returnValue);
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('There is a problem generating the new payment.');
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                    resultCreate($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    getPaymentDetails: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var currentUser = component.get('v.currentUser');
            var action = component.get('c.getPaymentDetail');
            action.setParam('paymentId', component.get('v.paymentID'));
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    console.log(returnValue);
                    if (returnValue.success) {
                        console.log(returnValue.value.paymentDetail);
                        component.set('v.payment', returnValue.value.paymentDetail);
                        resolve('La ejecucion ha sido correcta.');
                    } else {
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('problem getting list of payments msg2');
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
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
        try {
            var result = 'null';
            var action = component.get('c.decryptData');
            action.setParams({
                'str': data
            });
            return new Promise($A.getCallback(function (resolve, reject) {
                action.setCallback(this, function (response) {
                    var state = response.getState();
                    console.log(state);
                    console.log(response.getReturnValue());
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
            }), this);
        } catch (e) {
            console.error(e);
        }
    },

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Sets attribute to control which buttons are enabled
    History:
    <Date>          <Author>            <Description>
    27/07/2020      Bea Hill            Initial version 
    15/09/2020      Shahad Naji         Changes buttons matrix
    */
    configureButtons: function (component, event, helper, paymentDetails, currentUser) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let status = paymentDetails.paymentStatus;
            let reason = ''
            if (!$A.util.isEmpty(paymentDetails.paymentReason)) {
                reason = paymentDetails.paymentReason;
            }
            let currentUserGlobalId = currentUser.globalId;
            let creatorUserId = '';
            if (!$A.util.isEmpty(paymentDetails.userGlobalId)) {
                creatorUserId = paymentDetails.userGlobalId;
            }
            let signature = component.get('v.signLevel'); // Need to get this list of authorizers from payment details service
            var signatory = false;
            if (signature != null) {
                if (signature.signatory == 'true' && signature.signed == 'false') {
                    signatory = true;
                }
            }
            let isCreator = false;
            if (currentUserGlobalId == creatorUserId) {
                isCreator = true;
            }
            let actions = {
                'edit': false,
                'discard': false,
                'reuse': false,
                'addToTemplate': false,
                'trySaveAgain': false, //saveForLater
                'authorize': false,
                'reject': false,
                'sendToReview': false,
                'gpiTracker': false,
                'cancel':false
            }
            if (status == '001' || status == 'Draft') {
                if (reason == '000') {
                    actions.edit = isCreator;
                    actions.discard = isCreator;
                } else if (reason == '001') {
                    actions.discard = isCreator;
                    actons.trySaveAgain = isCreator;
                } else if (reason == '002') {
                    actions.discard = isCreator;
                    actons.trySaveAgain = isCreator;
                    actions.edit = isCreator;
                }
            }
            if (status == '002' || status == 'Pending') {
                if (reason == '001') {
                    actions.edit = isCreator;
                    actions.cancel = isCreator;
                    actions.authorize = signatory;
                    actions.reject = signatory;
                    actions.sendToReview = signatory;           
                } else if (reason == '002') {
                    actions.cancel = isCreator;
                    actions.authorize = signatory;
                    actions.reject = signatory;
                    actions.sendToReview = signatory;
                }
            }
            if (status == '003' || status == 'In review') {
                if (reason == '001') {
                    actions.cancel = isCreator;
                    actions.edit = isCreator;           
                }
            }
            if (status == '101' || status == 'Authorized') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '102' || status == 'Processed') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '103' || status == 'Completed') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                    actions.gpiTracker = (isCreator || signatory);
                }
            }
            if (status == '201' || status == 'Scheduled') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '202' || status == 'Released') {
                if (reason == '001') {
                    actions.gpiTracker = (isCreator || signatory);
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                } else if (reason == '002') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '800' || status == 'On hold') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '801' || status == 'Delayed') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '997' || status == 'Not authorized') {
                if (reason == '001') {
                   actions.reuse = isCreator;
                }
            }
            if (status == '998' || status == 'Canceled') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                } else if (reason == '002') {
                    actions.reuse = isCreator;
                } else if (reason == '003') {
                    actions.reuse = isCreator;
                }
            }
            if (status == '999' || status == 'Rejected') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                } else if (reason == '002') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                } else if (reason == '003') {
                    actions.reuse = isCreator;
                } else if (reason == '004') {
                    //no tiene acciones
                }
            }
            component.set('v.actions', actions);
            resolve('La ejecucion ha sido correcta.');
        }), this);
    },

    /*
    Author:        	R. cervinpo
    Company:        Deloitte
    Description:    Get payment sign level
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
    getSignatureLevel: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getSignLevel');
            action.setParam('paymentId', component.get('v.paymentID'));
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    if (!$A.util.isEmpty(returnValue)) {
                        console.log(returnValue);
                        component.set('v.signLevel', returnValue);
                    }
                    resolve('La ejecucion ha sido correcta.');
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('problem getting list of payments msg2');
                    }
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    showToastMode: function (component,event, helper, title, body, noReload, mode) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            if (mode == 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if (mode =='success') {
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);
            }
        }
    },

    showToast: function (component, event, helper, title, body, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, title, body, 'Error', 'warning', 'warning', noReload);
        }
    },

    /*
    Author:         R. cervinpo
    Company:        Deloitte
    Description:    Check if the account is blocked and if it has enough available money
    History:
    <Date>          <Author>            <Description>
    12/08/2020      R. Cervino          Initial version
    01/11/2020      Candido             Refactor and add accountIdType to WS
    */
    checkAccounts: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let payment = component.get('v.payment');
            let amount = 0;
            if (!$A.util.isEmpty(payment.amount)) {
                amount = parseFloat(payment.amount);
            }
            if (!$A.util.isEmpty(payment.amountOperativeDRAFT)) {
                amount = parseFloat(payment.amountOperativeDRAFT);
            }
            let fees = 0;
            if (!$A.util.isEmpty(payment.fees)) {
                fees = parseFloat(payment.fees);
            }
            if (!$A.util.isEmpty(payment.feesDRAFT)) {
                fees = parseFloat(payment.feesDRAFT);
            }
            var totalAmount = amount + fees;
            let action = component.get('c.validateAccount');
            action.setParams({
                'payment': payment,
                'amount': totalAmount
            });
            action.setCallback(this, function (actionResult) {
                let errorProblemLoading = $A.get('$Label.c.B2B_Error_Problem_Loading');
                let errorCheckConnection = $A.get('$Label.c.B2B_Error_Check_Connection');
                let contactSupport = $A.get('$Label.c.B2B_Error_Contact_Support');
                if (actionResult.getState() == 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    if (!returnValue.success) {
                        helper.showToastMode(component, event, helper, errorProblemLoading, errorCheckConnection, false, 'error');
                        reject('ko');
                    } else {
                        if (returnValue.value.statusResult != 'OK') {
                            helper.showToastMode(component, event, helper, errorProblemLoading, contactSupport, true, 'error');
                            reject('ko');
                        } else if (returnValue.value.amountResult != 'OK') {
                            helper.showToastMode(component, event, helper, errorProblemLoading, contactSupport, true, 'error');
                            reject('ko');
                        } else {
                            resolve('La ejecucion ha sido correcta.');
                        }
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('ko');
                    }
                    helper.showToast(component, event, helper, errorProblemLoading, errorCheckConnection, false);
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    reloadFX: function (component, event,  helper, feesBoolean) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var paymentId = component.get('v.paymentID');
            var payment = component.get('v.payment');
            let feesAmount = ($A.util.isEmpty(payment.fees) ? '' : payment.fees);
            let feesCurrency = ($A.util.isEmpty(payment.feesCurrency) ? '' : payment.feesCurrency);
            if (feesBoolean == true && (($A.util.isEmpty(feesAmount) || $A.util.isEmpty(feesCurrency)) || (!$A.util.isEmpty(feesAmount) && (payment.sourceCurrency == feesCurrency)))) {
                resolve('ok');
            } else if (feesBoolean == false && payment.sourceCurrency == payment.beneficiaryCurrency) {
                resolve('ok');
            } else {
                var accountData = component.get('v.accountData');
                var action = component.get('c.getExchangeRate');
                action.setParams({
                    'paymentId': paymentId,
                    'accountData': accountData,
                    'payment': payment,
                    'feesBoolean': feesBoolean
                }); 
                action.setCallback(this, function (actionResult) {
                    if (actionResult.getState() == 'SUCCESS') {
                        var stateRV = actionResult.getReturnValue();
                        if (stateRV.success) {
                            if (feesBoolean == true) {
                                if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                                    payment.feesDRAFT = stateRV.value.convertedAmount;
                                }
                                if (!$A.util.isEmpty(stateRV.value.output)) {
                                    payment.FXFeesOutputDRAFT = stateRV.value.output;
                                }
								payment.feesFXDateTimeDRAFT = helper.getCurrentDateTime(component, event, helper);
                            } else {
                                if (!$A.util.isEmpty(stateRV.value.exchangeRate)) {
                                    payment.tradeAmountDRAFT = stateRV.value.exchangeRate;
                                    payment.operationNominalFxDetails.customerExchangeRateDRAFT = stateRV.value.exchangeRate;
                                }  
                                if (!$A.util.isEmpty(stateRV.value.timestamp)) {
                                    payment.timestampDRAFT = stateRV.value.timestamp;
                                }  
                                if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                                    payment.convertedAmountDRAFT = stateRV.value.convertedAmount;
                                    payment.amountOperativeDRAFT = stateRV.value.convertedAmount;
                                    
                                    if(stateRV.value.amountObtained == 'send'){
                                    	payment.amountSendDRAFT = stateRV.value.convertedAmount;
                                    }
                                    if(stateRV.value.amountObtained == 'received'){
                                    	payment.amountReceiveDRAFT = stateRV.value.convertedAmount;
                                    }
                                }
                                if (!$A.util.isEmpty(stateRV.value.output)) {
                                    payment.FXoutputDRAFT = stateRV.value.output;
                                }
                                
                                
                                payment.FXDateTimeDRAFT = helper.getCurrentDateTime(component, event, helper);
                            }
                            component.set('v.payment', payment);
                            resolve('ok');
                        } else {
                            reject('ko');
                            helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                        }
                    } else {
                        reject('ko');
                        helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    }
                });
                $A.enqueueAction(action);
            }
        }), this);
    },

    getCurrentDateTime: function (component, event, helper) {
        var today = new Date();
        var month = today.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = today.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var date = today.getFullYear() + '-' + month + '-' + day;
        var hours = today.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        var minutes = today.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var seconds = today.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        var dateTime = date + 'T' + time;       
        return dateTime; 
    },
    
    getUserData: function (component, event,helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getUserData');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var userData = {};
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        /*
                        if (!$A.util.isEmpty(stateRV.value.userId)) {
                            userData.userId = stateRV.value.userId;
                        } 
                        if (!$A.util.isEmpty(stateRV.value.isNexus)) {
                            userData.isNexus = stateRV.value.isNexus;
                        } else { // FLOWERPOWER_PARCHE_CPC
                            userData.isNexus = false;
                        }
                        if (!$A.util.isEmpty(stateRV.value.numberFormat)) {
                            userData.numberFormat = stateRV.value.numberFormat;
                        }
                        if (!$A.util.isEmpty(stateRV.value.globalId)) {
                            userData.globalId = stateRV.value.globalId;
                        } 
                        */
                        if (!$A.util.isEmpty(stateRV.value)) {
                            userData = stateRV.value.userData;
                        }
                    }
                    component.set('v.currentUser', userData);
                    resolve('La ejecucion ha sido correcta.');    
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);  
    },

    getAccountData: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getAccountData');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var accountData = {};
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.cib)) {
                            accountData.CIB = stateRV.value.cib;
                        } else { // FLOWERPOWER_PARCHE_CPC
                            accountData.CIB = false;
                        }
                        if (!$A.util.isEmpty(stateRV.value.documentType)) {
                            accountData.documentType = stateRV.value.documentType;
                        } else { // FLOWERPOWER_PARCHE_CPC
                            accountData.documentType = 'tax_id';
                        }
                        if (!$A.util.isEmpty(stateRV.value.documentNumber)) {
                            accountData.documentNumber = stateRV.value.documentNumber;
                        } else { // FLOWERPOWER_PARCHE_CPC
                            accountData.documentNumber = 'B86561412';
                        }
                    }
                    component.set('v.accountData', accountData);
                    resolve('La ejecucion ha sido correcta.');    
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);  
    },

    notificationSent: function (component, helper, response) {
        console.log('notification sent');
    },

    /*
    Author:        	Adrian Munio
    Company:        Deloitte
    Description:    Makes the callout to ancel a previously validated transaction, 
                    which removes it from transactional counters for accumulated limits
    History:
    <Date>          <Author>                <Description>	    
    16/09/2020      Adrian Munio            Initial version
    */    
    reverseLimits : function (component, event, helper){
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.reverseLimits');
            action.setParams({ 
                'operationId': component.get('v.payment').paymentId,
                'serviceId': 'add_international_payment_internal',
                'paymentData': component.get('v.payment')
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var  output = response.getReturnValue();
                    if(output.success){
                        resolve('ok');
                    } else {
                        reject('ko');
                    }
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
                    console.log('Another error');
                    reject('ko');
                }
            });       
            $A.enqueueAction(action);
        }), this);
    },

    /*
    Author:        	Adrian Munio
    Company:        Deloitte
    Description:    Send the status change to the service
    History:
    <Date>          <Author>            <Description>
    15/09/2020      Adrian Munio        Initial version
    */
    handleDiscardPayment: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.action', 'Discard');
            var action = component.get('c.updatePaymentStatusReason');
            action.setParams({ 
                'paymentId' : component.get('v.payment').paymentId,
                'status' : '990',
                'reason' : '001'
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var  output = response.getReturnValue();
                    if (output.success) {
                        resolve('ok');
                    } else {
                        helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                        reject('ko');
                    }
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    reject('ko');
                } else {
                    console.log('Another error');
                    helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    reject('ko');
                }
            });       
            $A.enqueueAction(action);
        }), this);
    },
    
     /*
    Author:        	Antonio Matachana
    Company:        
    Description:    Send the status change to the service and refresh page
    History:
    <Date>          <Author>            <Description>
    09/11/2020      Antonio Matachana      
    */
   cancelSelectedPayment: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.action', 'Cancel');
            var action = component.get('c.updatePaymentStatusReason');
            action.setParams({ 
                'paymentId' : component.get('v.payment').paymentId,
                'status' : '998',
                'reason' : '003'
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var  output = response.getReturnValue();
                    if (output.success) {
                        resolve('ok');
                        $A.get('e.force:refreshView').fire();
                    } else {
                        helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                        reject('ko');
                    }
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    reject('ko');
                } else {
                    console.log('Another error');
                    helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    reject('ko');
                }
            });       
            $A.enqueueAction(action);
        }), this);
    },
      /*
    Author:         Antonio Matachana
    Company:        
    Description:    Send the status change to the service when edit payment from pending status
    History:
    <Date>          <Author>                <Description>
    20/11/2020      Antonio Matachana       Initial version
    */
   updateStatusEditPayment: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.action', 'Cancel');
            //var payment = component.get('v.paymentDetails');
            var paymentID = component.get('v.paymentID');
            var payment = component.get('v.payment');
            var action = component.get('c.updatePaymentStatusReason');
            action.setParams({ 
                //'paymentId': payment.paymentId,
                'paymentId': paymentID,
                'status': '001',
                'reason': '000'
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var  output = response.getReturnValue();
                    if (output.success) {
                        resolve('ok');
                        payment.paymentStatus = '001';
                        payment.paymentReason = '000';
                        component.set('v.payment', payment);
                    } else {
                        helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                        reject('ko');
                    }
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    reject('ko');
                } else {
                    console.log('Another error');
                    helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    reject('ko');
                }
            });       
            $A.enqueueAction(action);
        }), this);
    }
})