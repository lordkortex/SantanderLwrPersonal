({
    handleExecutePayment: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let paymentDraft = component.get('v.paymentDraft');
            let urgencyIndicator = component.get('v.urgencyIndicator');
            let action = component.get('c.executePayment');
            action.setParams({
                'paymentDraft': paymentDraft,
                'urgencyIndicator': urgencyIndicator
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    if (returnValue.success == true) {
                       let orchestationOutput = returnValue.value.OrchestationOutput;
                        //let orchestationOutput;

                       if ($A.util.isEmpty(orchestationOutput) || $A.util.isEmpty(orchestationOutput.level) || (!$A.util.isEmpty(orchestationOutput.level) && orchestationOutput.level != 'OK')) {
                           // helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error'); codigo previo a modificaciones
                           helper.sendToLanding(component, event, helper, false, true);
                           //helper.showToast(component, event, helper, $A.get('$Label.c.PAY_ServiceTemporalyDown'), null, true, 'error');// JHM Pendiente de revisar para el urlParam, posterior a modificaciones
                            reject('ko');
                       } else {
                            resolve('ok'); 
                        }
                    } else {
                        helper.sendToLanding(component, event, helper, false, true);
                       // helper.showToast(component, event, helper, $A.get('$Label.c.PAY_ServiceTemporalyDown'), null, true, 'error');// JHM Pendiente de revisar para el urlparam, posterior a modificaciones
                        reject('ko');
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    auxCometD: function (component, event, helper) {
        component.set('v.cometdSubscriptions', []);
        component.set('v.notifications', []);
        // Disconnect CometD when leaving page
        window.addEventListener('unload', function (event) {
            helper.disconnectCometd(component);
        });
        // Retrieve session id
        let action = component.get('c.getSessionId');
        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                component.set('v.sessionId', response.getReturnValue());
                if (component.get('v.cometd') != null) {
                    helper.connectCometd(component, event, helper);
                }
            } else {
                console.error(response);
            }
        });
        $A.enqueueAction(action);
    },

    // METHODS TO CONNECT WITH THE WS_OTPVALIDATION SERVICE
    connectCometd: function (component, event, helper) {
        helper = this;
        // Configure CometD
        let cometdUrl = window.location.protocol + '//' + window.location.hostname + '/cometd/40.0/';
        let cometd = component.get('v.cometd');
        cometd.configure({
            'url': cometdUrl,
            'requestHeaders': {
                'Authorization': 'OAuth '+ component.get('v.sessionId')
            },
            'appendMessageTypeToURL' : false
        });
        cometd.websocketEnabled = false;
        // Establish CometD connection
        console.log('Connecting to CometD: '+ cometdUrl);
        cometd.handshake(function (handshakeReply) {
            if (handshakeReply.successful) {
                console.log('Connected to CometD.');
                // Subscribe to platform event
                let newSubscription = cometd.subscribe('/event/OTPValidation__e', function (platformEvent) {
                    if (component.get('v.expiredFX')==false  && component.get('v.errorOTP') == false) {
                        let scaUid = component.get('v.scaUid');
                        if (platformEvent.data.payload.scaUid__c == scaUid) {
                            let win = component.get('v.localWindow');
                            if (!$A.util.isEmpty(win)) {
                                win.close();
                            }
                            if (platformEvent.data.payload.status__c == 'KO' || platformEvent.data.payload.status__c == 'ko') {
                                component.set('v.errorSign',true);
                            } else {
                                component.set('v.spinnerVerificationCode', true);
                                let signature = component.get('v.signLevel');
                                if (signature.lastSign == 'true') {
                                    helper.signPayment(component, event, helper,true).then($A.getCallback(function (value) {
                                        return helper.handleExecutePayment(component, event, helper);
                                    })).then($A.getCallback(function (value) {
                                        return helper.deleteSignatureRecord(component, event, helper);
                                    })).then($A.getCallback(function (value) {
                                        helper.sendToLanding(component, event, helper, 'last', false);
                                    })).catch($A.getCallback(function (error) {
                                        component.set('v.errorOTP',true);
                                        component.set('v.errorSign',true);
                                    })).finally($A.getCallback(function (){
                                        component.set('v.spinnerVerificationCode', false);
                                    }));
                                } else {
                                    helper.signPayment(component, event, helper,false).then($A.getCallback(function (value) {
                                        helper.sendToLanding(component, event, helper,'nolast', false);
                                    })).catch($A.getCallback(function (error){
                                        component.set('v.errorOTP',true);
                                        component.set('v.errorSign',true);
                                    })).finally($A.getCallback(function (){
                                        component.set('v.spinnerVerificationCode', false);
                                    }));
                                }
                            }
                        }
                    }
                });
                // Save subscription for later
                let subscriptions = component.get('v.cometdSubscriptions');
                subscriptions.push(newSubscription);
                component.set('v.cometdSubscriptions', subscriptions);
            } else {
                console.error('Failed to connected to CometD.');
            }
        });
    },

    disconnectCometd: function (component) {
        let cometd = component.get('v.cometd');
        // Unsuscribe all CometD subscriptions
        cometd.batch(function () {
            let subscriptions = component.get('v.cometdSubscriptions');
            subscriptions.forEach(function (subscription) {
                cometd.unsubscribe(subscription);
            });
        });
        component.set('v.cometdSubscriptions', []);
        // Disconnect CometD
        cometd.disconnect();
        console.log('CometD disconnected.');
    },

    /*
    Author:         R. cervinpo
    Company:        Deloitte
    Description:    Get payment sign level
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
    getSignatureLevel: function (component, event, helper) {
        component.set('v.reloadAction', component.get('c.initComponent'));
        component.set('v.reload', false);
        return new Promise($A.getCallback(function (resolve, reject) {
            let paymentDraft = component.get('v.paymentDraft');
            let paymentId = paymentDraft.paymentId;
            let action = component.get('c.getSignLevel');
            action.setParam('paymentId', paymentId);
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    if (!$A.util.isEmpty(returnValue)) {
                        console.log(returnValue);
                        component.set('v.signLevel', returnValue);
                    }
                    resolve('La ejecucion ha sido correcta.');
                } else if (actionResult.getState() == 'ERROR') {
                    let errors = actionResult.getError();
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

    /*
    Author:         R. cervinpo
    Company:        Deloitte
    Description:    Authorize payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
    signPayment: function (component, event, helper,finalAuthorizer) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let action = component.get('c.authorizePayment');
            let paymentDraft = component.get('v.paymentDraft');
            let paymentId = paymentDraft.paymentId;
            let scaUid = component.get('v.scaUid');
            action.setParams({
                'paymentId': paymentId,
                'finalAuthorizer': finalAuthorizer,
                'scaUid': scaUid
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() === 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    if (!returnValue.success) {
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                        reject('problem authorizing the payment');
                    } else {
                        resolve('La ejecucion ha sido correcta.');
                    }
                } else if (actionResult.getState() === 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('problem authorizing the payment');
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    sendToLanding: function (component, event, helper, signed, error) {
        let navService = component.find('navService');
        let url = '';
         url = 'c__signed=' + signed;
        
        if (error == true){
         url = 'c__error=' + error; 
        }
        helper.encrypt(component, url)
        .then($A.getCallback(function (results) {
            let pageReference = {
                'type': 'comm__namedPage',
                'attributes': {
                    'pageName': component.get('v.onwardPage')
                },
                'state': {
                    'params': results
                }
            }
            navService.navigate(pageReference);
        }));
    },

    /*
    Author:        	R. Cervino
    Company:        Deloitte
    Description:    Encryption for page navigation
    History:
    < Date>         <Author>            <Description>
    18/06/2020      R. Cervino          Initial version - adapted from B2B
    */
    encrypt: function (component, data) {
        let result = 'null';
        let action = component.get('c.encryptData');
        action.setParams({
            'str': data
        });
        return new Promise(function (resolve, reject) {
            action.setCallback(this, function (response) {
                let state = response.getState();
                if (state === 'ERROR') {
                    let errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                            reject('Error message: ' + errors[0].message);
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

    //OTP
    //SNJ - 07/10/2020 - adding country and bic or ordering account as an input parameters to get send OTP
    sendOTP: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.reload', false);
            component.set('v.reloadAction', component.get('c.sendOTP'));
            component.set('v.spinnerVerificationCode', true);
            let action = component.get('c.getOTP');
            let sourceCountry = '';
            let sourceBIC = '';
            let paymentDraft = component.get('v.paymentDraft');
            let paymentId = paymentDraft.paymentId;
            let sourceAccount = paymentDraft.sourceAccount;
            if (!$A.util.isEmpty(sourceAccount)) {
                if (!$A.util.isEmpty(sourceAccount.country)) {
                    sourceCountry = sourceAccount.country;
                }
                if (!$A.util.isEmpty(sourceAccount.codigoBic)) {
                    sourceBIC = sourceAccount.codigoBic;
                }
            }
            action.setParams({
                'paymentId': paymentId,
                'sourceCountry': sourceCountry,
                'sourceBIC': sourceBIC
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    if (!returnValue.success) {
                        reject('ko');
                    } else {
                        resolve('ok');
                    }
                    component.set('v.spinnerVerificationCode', false);
                } else if (actionResult.getState() == 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    component.set('v.spinnerVerificationCode', false);
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    checkOTP: function (component, event, helper) {
        component.set('v.spinnerVerificationCode', true);
        let action = component.get('c.validateOTP');
        let sourceCountry = '';
        let sourceBIC = '';
        let paymentDraft = component.get('v.paymentDraft');
        let sourceAccount = paymentDraft.sourceAccount;
        let paymentId = paymentDraft.paymentId;
        let metaData = component.get('v.OTP');
        if (!$A.util.isEmpty(sourceAccount)) {
            if (!$A.util.isEmpty(sourceAccount.country)) {
                sourceCountry = sourceAccount.country;
            }
            if (!$A.util.isEmpty(sourceAccount.codigoBic)) {
                sourceBIC = sourceAccount.codigoBic;
            }
        }
        action.setParams({
            'paymentId': paymentId,
            'metaData': metaData,
            'sourceCountry': sourceCountry,
            'sourceBIC': sourceBIC
        });
        action.setCallback(this, function (actionResult) {
            if (actionResult.getState() == 'SUCCESS') {
                let returnValue = actionResult.getReturnValue();
                console.log(returnValue);
                if (!returnValue.success) {
                    component.set('v.spinnerVerificationCode', false);
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                } else {
                    if(returnValue.value.validateOTP.validateResult != 'ko' && returnValue.value.validateOTP.validateResult != 'KO') {
                        component.set('v.OTPErrorMessage', '');
                        let signature = component.get('v.signLevel');
                        if (signature.lastSign == 'true') {
                            helper.signPayment(component, event, helper,true)
                            .then($A.getCallback(function (value) {
                                return helper.handleExecutePayment(component, event, helper);
                            })).then($A.getCallback(function (value) {
                                return helper.deleteSignatureRecord(component, event, helper);
                            })).then($A.getCallback(function (value) {
                                return helper.sendNotification(component, event, helper, 'Completed');
                            })).then($A.getCallback(function (value) {
                                helper.sendToLanding(component, event, helper, 'last', false);
                            })).catch($A.getCallback(function (error) {
                                console.log(error);
                            })).finally($A.getCallback(function () {
                                component.set('v.spinnerVerificationCode', false);
                            }));
                        } else {
                            helper.signPayment(component, event, helper, false).then($A.getCallback(function (value) {
                                helper.sendToLanding(component, event, helper, 'nolast', false);
                            })).catch($A.getCallback(function (error) {
                                console.log(error);
                            })).finally($A.getCallback(function () {
                                component.set('v.spinnerVerificationCode', false);
                            }));
                        }
                    } else {
                        component.set('v.spinnerVerificationCode', false);
                        component.set('v.OTPErrorMessage', $A.get('$Label.c.OTPWrongCheckSMS'));
                    }
                }
            } else if (actionResult.getState() === 'ERROR') {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
            }
        });
        $A.enqueueAction(action);
    },

    /*
    Author:        	R. Cervino
    Company:        Deloitte
    Description:    Get payment sign level
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    07/08/2020      Bea Hill            Separate functions to control status update
    */
    beginAuthorize: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let signature = component.get('v.signLevel');
            component.set('v.spinner', true);
            component.set('v.totalAmountLabel', $A.get('$Label.c.AmountToAuth'));
            if (component.get('v.showOTP') == false) {
                if (signature.signatory == 'true' && signature.signed == 'false') {
                    if (signature.lastSign == 'true' ) {
                        helper.reloadFXValue(component, event, helper, false)
                        .then($A.getCallback(function (value) {
                            return helper.reloadFXValue(component, event, helper, true);
                        })).then($A.getCallback(function (value) {
                            helper.sendOTP_Strategic(component, event, helper);
                        })).catch($A.getCallback(function (error) {
                            console.log(error);
                        })).finally($A.getCallback(function () {
                            component.set('v.spinner', false);
                        }));
                    } else {
                        helper.sendOTP_Strategic(component, event, helper)
                        .then($A.getCallback(function (value) {
                            component.set('v.showOTP', true);
                        })).catch($A.getCallback(function (error) {
                            console.log(error);
                        })).finally($A.getCallback(function () {
                            component.set('v.spinner', false);
                        }));
                    }
                } else {
                    helper.sendToLanding(component, event, helper,  false, false);
                    component.set('v.spinner', false);
                }
            }
            resolve('OK');
        }), this);

    },

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Make call to server to update payment status
    History
    < Date>         <Author>            <Description>
    07/08/2020      Bea Hill            Initial version
    */
    updateStatus: function (component, event, helper, status, reason) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let paymentDraft = component.get('v.paymentDraft');
            let paymentId = paymentDraft.paymentId;
            let action = component.get('c.updateStatus');
            action.setParams({
                'paymentId': paymentId,
                'status': status,
                'reason': reason
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                    }
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                } else {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV == 'OK') {
                        resolve('OK');
                    } else {
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                    }
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    showToast: function (component,event, helper, title, body, noReload, mode) {
        let errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            if (mode == 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if (mode == 'success') {
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);
            }
        }
    },

    reloadFX: function (component, event,  helper) {
        new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.reloadAction', component.get('c.reloadFX'));
            component.set('v.reload', false);
            component.set('v.errorSign', true);
            component.set('v.spinnerCountDown', true);
            resolve('Ok');
        }), this).then($A.getCallback(function (value) {
            return helper.reloadFXValue(component,event, helper, false);
        })).then($A.getCallback(function (value) {
            return helper.reloadFXValue(component, event, helper, true);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        })).finally($A.getCallback(function () {
            component.set('v.spinnerCountDown', false);
        }));
    },

    reloadFXValue: function (component, event,  helper, feesBoolean) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let paymentDraft = component.get('v.paymentDraft');
            let currencyCodeAvailableBalanceOrigin = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
            let currencyCodeAvailableBalanceDestination = paymentDraft.destinationAccount.currencyCodeAvailableBalance;
            if (feesBoolean == true && $A.util.isEmpty(paymentDraft.convertedTransactionFee)) {
                resolve('ok');
            } else if (feesBoolean == false &&  currencyCodeAvailableBalanceOrigin ==  currencyCodeAvailableBalanceDestination) {
                resolve('ok');
            } else {
                let action = component.get('c.getExchangeRate');
                action.setParams({
                    'feesBoolean': feesBoolean,
                    'paymentDraft': paymentDraft
                });
                action.setCallback(this, function (actionResult) {
                    if (actionResult.getState() == 'SUCCESS') {
                        var stateRV = actionResult.getReturnValue();
                        console.log(stateRV);
                        if (stateRV.success) {
                            if (feesBoolean == true) {
                                if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                                    paymentDraft.convertedTransactionFee = stateRV.value.convertedAmount;
                                }
                                if (!$A.util.isEmpty(stateRV.value.output)) {
                                    paymentDraft.convertedTransactionFeeServiceResponse = stateRV.value.output;
                                }
                            } else {
                                component.set('v.exchangeRateLabel', $A.get('$Label.c.exchangeRate'));
                                if (!$A.util.isEmpty(stateRV.value.exchangeRate)) {
                                    paymentDraft.exchangeRate = stateRV.value.exchangeRate;
                                }
                                if (!$A.util.isEmpty(stateRV.value.timestamp)) {
                                    paymentDraft.timestamp = stateRV.value.timestamp;
                                }
                                if (!$A.util.isEmpty(stateRV.value.fxTimer)) {
                                    paymentDraft.fXTimer = stateRV.value.fxTimer;
                                }
                                if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                                    if (stateRV.value.amountObtained == 'send') {
                                        paymentDraft.amountSend = stateRV.value.convertedAmount;
                                    }
                                    if (stateRV.value.amountObtained == 'received') {
                                        paymentDraft.amountReceive = stateRV.value.convertedAmount;
                                    }
                                }
                                if (!$A.util.isEmpty(stateRV.value.output)) {
                                    paymentDraft.exchangeRateServiceResponse = stateRV.value.output;
                                }
                            }
                            component.set('v.paymentDraft', paymentDraft);
                            component.set('v.expiredFX', false);
                            helper.getTotalAmount(component, event, helper);
                            resolve('ok');
                        } else {
                            helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), component.get('v.showOTP'), 'error');
                            reject('ko');
                        }
                    } else {
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), component.get('v.showOTP'), 'error');
                        reject('ko');
                    }
                });
                $A.enqueueAction(action);
            }
        }), this);
    },

    getTotalAmount: function (component, event, helper) {
        let paymentDraft = component.get('v.paymentDraft');
        let amountSend = paymentDraft.amountSend;
        let convertedFee = paymentDraft.convertedTransactionFee;
        let convertedFeeCurrency = paymentDraft.convertedTransactionFeeCurrency;
        let currencyCodeAvailableBalance = paymentDraft.sourceAccount.currencyCodeAvailableBalance;
        let fee = paymentDraft.transactionFee;
        let total = 0;
        if (!$A.util.isEmpty(convertedFee) && !$A.util.isEmpty(convertedFeeCurrency)) {
            if (convertedFeeCurrency == currencyCodeAvailableBalance) {
                total = parseFloat(amountSend) + parseFloat(convertedFee);
            }
        } else if (!$A.util.isEmpty(fee)) {
            total = parseFloat(amountSend) + parseFloat(fee);
        }
        component.set('v.total', total);
    },

    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Makes the callout to validate if a transaction can be executed on behalf of a customer/user according to the transactional limits that person has.
                    If assessment is successful, it automatically is posted against accumulated limits.
    History:
    <Date>          <Author>        <Description>
    14/09/2020      Shahad Naji     Inicial version
    */
    updateLimits : function (component, event, helper){
        return new Promise($A.getCallback(function (resolve, reject) {
            let action = component.get('c.updateLimits');
            let paymentDraft = component.get ('v.paymentDraft');
            action.setParams({
                'paymentDraft': paymentDraft
            });
            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === 'SUCCESS') {
                    let returnValue = response.getReturnValue();
                    if (!returnValue.success) {
                        reject('ko');
                    } else {
                        resolve('ok');
                    }
                } else if (state === 'INCOMPLETE') {
                    reject('ko');
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
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    deleteSignatureRecord: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let action = component.get('c.removeSignature');
            let paymentDraft = component.get('v.paymentDraft');
            let paymentId = paymentDraft.paymentId;
            action.setParams({
                'paymentId': paymentId
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    console.log(returnValue);
                    if (!returnValue.success) {
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                        reject('ko');
                    } else {
                        resolve('ok');
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    sendNotification: function (component, event, helper, notificationType) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.sendNotification');
            var paymentDraft = component.get('v.paymentDraft');
            var paymentId= paymentDraft.paymentId;
            action.setParams({
                'paymentId': paymentId,
                'notificationType' : notificationType
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    resolve('ok');
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    resolve('ok');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    sendOTP_Strategic: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.reload', false);
            component.set('v.showOTP', true);
            component.set('v.reloadAction', component.get('c.sendOTP_Strategic'));
            component.set('v.spinnerVerificationCode', true);
            let action = component.get('c.getOTP_Strategic');
            let debitAmount = component.get('v.debitAmountString');
            let fees = component.get('v.feesString');
            let exchangeRate = component.get('v.exchangeRateString');
            let paymentDraft = component.get('v.paymentDraft');
            let paymentAmount = component.get('v.paymentAmountString');
            let navigatorInfo = component.get('v.navigatorInfo');
            action.setParams({
                'debitAmount': debitAmount,
                'fees': fees,
                'exchangeRate': exchangeRate,
                'paymentAmount': paymentAmount,
                'paymentDraft': paymentDraft,
                'navigatorInfo': navigatorInfo
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    if (!returnValue.success) {
                        component.set('v.errorSign', true);
                        component.set('v.errorOTP', true);
                        component.set('v.spinnerVerificationCode', false);
                        reject('ko');
                    } else {
                        if ($A.util.isEmpty(returnValue.value.initiateOTP.localSigningUrl)) {
                            component.set('v.scaUid', returnValue.value.initiateOTP.scaUid);
                        } else {
                            component.set('v.scaUid', returnValue.value.initiateOTP.signId);
                            let win = window.open(returnValue.value.initiateOTP.localSigningUrl, '_blank');
                            component.set('v.localWindow', win);
                            win.focus();
                        }
                        component.set('v.errorSign', false);
                        component.set('v.errorOTP', false);
                        component.set('v.spinnerVerificationCode', false);
                        if( $A.get('$Label.c.CNF_mockeoFirmas') == 'ok'){
                            helper.checkOTP(component, event, helper);
                        }
                        resolve('ok');
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    component.set('v.errorSign', true);
                    component.set('v.errorOTP', true);
                    component.set('v.spinnerVerificationCode', false);
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    getNavigatorInfo: function (component, event,  helper) {
        new Promise($A.getCallback(function (resolve, reject) {
            let navigatorInfo = component.get('v.navigatorInfo');
            navigatorInfo.userAgent = navigator.userAgent;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        navigatorInfo.latitude = position.coords.latitude;
                        navigatorInfo.longitude = position.coords.longitude;
                        component.set('v.navigatorInfo', navigatorInfo);
                        resolve('ok');
                    },
                    function () {
                        component.set('v.navigatorInfo', navigatorInfo);
                        resolve('ok');
                    }
                );
            } else {
                component.set('v.navigatorInfo', navigatorInfo);
                resolve('ok');
            }
        })).catch($A.getCallback(function (error) {
            console.log(error);
        }));
    },
    
    upsertPayment: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let paymentDraft = component.get('v.paymentDraft');
            if ($A.util.isEmpty(paymentDraft.paymentId) || $A.util.isEmpty(paymentDraft.reference)) { 
                reject('KO');
            } else {
                let action = component.get('c.upsertPayment');
                action.setParams({
                    'paymentDraft': paymentDraft
                }); 
                action.setCallback(this, function (actionResult) {
                    if (actionResult.getState() == 'SUCCESS') {
                        let stateRV = actionResult.getReturnValue();
                        console.log(stateRV);
                        if (stateRV.success) {
                        	resolve('OK');
                        } else {
                            helper.showToast(component, notificationTitle, bodyText, true);
                            reject(stateRV.msg);
                        }
                    } else {
                        helper.showToast(component, notificationTitle, bodyText, true);
                        reject('ERROR: Upsert Payment.');
                    }
                });
                $A.enqueueAction(action);
            }
        }), this);
    },
    
    recordNewBeneficiary: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            let notificationTitle = $A.get('$Label.c.B2B_Error_Problem_Loading');
            let bodyText = $A.get('$Label.c.B2B_Error_Check_Connection');
            
            let paymentDraft = component.get('v.paymentDraft');
            let action = component.get('c.registerNewBeneficiary');
            if(paymentDraft.registerNewBeneficiary){
                action.setParams({
                    'newAccount': paymentDraft.destinationAccount,
                    'sourceAccount': paymentDraft.sourceAccount
                });
                action.setCallback(this, function (response) {
                    let state = response.getState();
                    if (state === 'SUCCESS') {
                        let result = response.getReturnValue();
                        if (result.success == true) {
                            paymentDraft.registerNewBeneficiary = false;
                            component.set('v.paymentDraft',paymentDraft);
                            resolve('OK');
                        } else {
                            //component.set('v.errorMSG', result.msg);
                            helper.showToast(component, notificationTitle, bodyText, true);
                            reject('Cannot create new beneficiary');
                        }
                    } else {
                        helper.showToast(component, notificationTitle, bodyText, true);
                        reject('Can not create new beneficiary');
                    }
                });
                $A.enqueueAction(action);
            }else{
                resolve('OK');
            }
            
        }), this);
    }
})