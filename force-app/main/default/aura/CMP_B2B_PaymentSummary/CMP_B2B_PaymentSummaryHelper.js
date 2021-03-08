({
    completeStep: function (component, helper) {
        var completeStep = component.getEvent('completeStep');
        completeStep.setParams({
            'confirm': true
        });
        completeStep.fire();
    },

    handleExecutePayment: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            // For releasing the payment
            var amount = component.get('v.dataSelectAmount');
            var paymentId = component.get('v.paymentId');
            var sourceAccountData = component.get('v.dataSelectOrigin');
            var recipientAccountData = component.get('v.dataSelectDestination');
            var action = component.get('c.executePayment');
            action.setParams({
                'amountData': amount,
                'sourceAccount': sourceAccountData,
                'destinationAccount': recipientAccountData,
                'paymentId': paymentId,
                'FXTimer': component.get('v.FXDateTime'),
                'description': component.get('v.dataPaymentInformation').description,
                'clientReference': component.get('v.dataPaymentInformation').reference
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    if (returnValue.success == true) {
                        var orchestationOutput = returnValue.value.OrchestationOutput;
                        if ($A.util.isEmpty(orchestationOutput) || $A.util.isEmpty(orchestationOutput.level) || (!$A.util.isEmpty(orchestationOutput.level) && orchestationOutput.level != 'OK')) {
                            helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                            //helper.updateStatus(component,event, helper,'101','001');
                            reject('ko');
                        } else {
                            resolve('ok');
                        }
                    } else {
                        //helper.updateStatus(component,event, helper,'101','001');
                        reject('ko');
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                    //helper.updateStatus(component,event, helper,'101','001');
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
        var action = component.get('c.getSessionId');
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
        var helper = this;
        // Configure CometD
        var cometdUrl = window.location.protocol + '//' + window.location.hostname + '/cometd/40.0/';
        var cometd = component.get('v.cometd');
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
                var newSubscription = cometd.subscribe('/event/OTPValidation__e', function (platformEvent) {
                    if(component.get("v.expiredFX")==false  && component.get("v.errorOTP")==false ){
                        var scaUid = component.get("v.scaUid");
                        if(platformEvent.data.payload.scaUid__c == scaUid){
                            if (platformEvent.data.payload.status__c == 'KO' || platformEvent.data.payload.status__c == 'ko') {
                                component.set("v.errorSign",true);
                            } else {
                                component.set('v.spinnerVerificationCode', true);
        
                                //helper.handleExecutePayment(component, event, helper);
        
                                    let signature = component.get('v.signLevel');
                                    if (signature.lastSign == 'true') {
                                        helper.signPayment(component, event, helper,true).then($A.getCallback(function (value) {
                                            return helper.handleExecutePayment(component, event, helper);
                                        })).then($A.getCallback(function (value) {
                                            return helper.deleteSignatureRecord(component, event, helper);
                                        })).then($A.getCallback(function (value) {
                                            helper.sendToLanding(component, event, helper, true);
                                        })).catch($A.getCallback(function (error) {
                                            component.set("v.errorOTP",true);
                                            component.set("v.errorSign",true);
                                        })).finally($A.getCallback(function (){
                                            component.set('v.spinnerVerificationCode', false);
                                        }));
                                    } else {
                                        helper.signPayment(component, event, helper,false).then($A.getCallback(function (value) {
                                            helper.sendToLanding(component, event, helper,true);
                                        })).catch($A.getCallback(function (error){
                                            component.set("v.errorOTP",true);
                                            component.set("v.errorSign",true);
                                        })).finally($A.getCallback(function (){
                                            component.set('v.spinnerVerificationCode', false);
                                        }));
                                    }
                                    
                                }
                        }
                    }
                });
                // Save subscription for later
                var subscriptions = component.get('v.cometdSubscriptions');
                subscriptions.push(newSubscription);
                component.set('v.cometdSubscriptions', subscriptions);
            } else {
                console.error('Failed to connected to CometD.');
            }
        });
    },
    
    disconnectCometd: function (component) {
        var cometd = component.get('v.cometd');
        // Unsuscribe all CometD subscriptions
        cometd.batch(function () {
          var subscriptions = component.get('v.cometdSubscriptions');
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
            var action = component.get('c.getSignLevel');
            action.setParam('paymentId', component.get('v.paymentId'));
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
            var action = component.get('c.authorizePayment');
            action.setParams({'paymentId': component.get('v.paymentId'), 'finalAuthorizer':finalAuthorizer, 'scaUid':component.get("v.scaUid")});
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() === 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    if (!returnValue.success) {
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                        reject('problem authorizing the payment');
                    } else {
                        resolve('La ejecucion ha sido correcta.');
                    }
                } else if (actionResult.getState() === 'ERROR') {
                    var errors = actionResult.getError();
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

    sendToLanding: function (component, event, helper, signed) {
        let navService = component.find('navService');
        var url = 'c__signed=' + signed;
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
        var result = 'null';
        var action = component.get('c.encryptData');
        action.setParams({ str: data });
        return new Promise(function (resolve, reject) {
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
        });
    },

    //OTP
    //SNJ - 07/10/2020 - adding country and bic or ordering account as an input parameters to get send OTP
    sendOTP: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.reload', false);
            component.set('v.reloadAction', component.get('c.sendOTP'));
            component.set('v.spinnerVerificationCode', true);
            var action = component.get('c.getOTP');
            var sourceCountry = '';
            var sourceBIC = '';
            var dataSelectOrigin = component.get('v.dataSelectOrigin');
            if (!$A.util.isEmpty(dataSelectOrigin)) {
                if (!$A.util.isEmpty(dataSelectOrigin.country)) {
                    sourceCountry = dataSelectOrigin.country;
                }
                if (!$A.util.isEmpty(dataSelectOrigin.codigoBic)) {
                    sourceBIC = dataSelectOrigin.codigoBic;
                }
            }
            action.setParams({
                'paymentId': component.get('v.paymentId'),
                'sourceCountry': sourceCountry,
                'sourceBIC': sourceBIC
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    console.log(returnValue);
                    if (!returnValue.success) {
                        //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), false, 'error');
                           reject('ko');
                    } else {
                        resolve('ok');
                    }
                    component.set('v.spinnerVerificationCode', false);
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), false, 'error');
                    component.set('v.spinnerVerificationCode', false);
                    reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    //SNJ - 07/10/2020 - adding country and bic or ordering account as an input parameters to get send OTP
    checkOTP: function (component, event, helper) {
        component.set('v.spinnerVerificationCode', true);
        var action = component.get('c.validateOTP');
        var sourceCountry = '';
        var sourceBIC = '';
        var dataSelectOrigin = component.get('v.dataSelectOrigin');
        if (!$A.util.isEmpty(dataSelectOrigin)) {
            if (!$A.util.isEmpty(dataSelectOrigin.country)) {
                sourceCountry = dataSelectOrigin.country;
            }
            if (!$A.util.isEmpty(dataSelectOrigin.codigoBic)) {
                sourceBIC = dataSelectOrigin.codigoBic;
            }
        }
        action.setParams({
            'paymentId': component.get('v.paymentId'),
            'metaData': component.get('v.OTP'),
            'sourceCountry': sourceCountry,
            'sourceBIC': sourceBIC
        });
        action.setCallback(this, function (actionResult) {
            if (actionResult.getState() == 'SUCCESS') {
                var returnValue = actionResult.getReturnValue();
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
                                helper.sendToLanding(component, event, helper, true);
                            })).catch($A.getCallback(function (error) {
                                console.log(error);
                            })).finally($A.getCallback(function () {
                                component.set('v.spinnerVerificationCode', false);
                            }));
                        } else {
                            helper.signPayment(component, event, helper, false).then($A.getCallback(function (value) {
                                // helper.showToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.authorizeSuccess'), true, 'success');
                                helper.sendToLanding(component, event, helper, true);
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
        let signature = component.get('v.signLevel');
        component.set('v.spinner', true);
        if (component.get('v.showOTP') == false) {
            if (signature.signatory == 'true' && signature.signed == 'false') {
                if (signature.lastSign == 'true' ) {
                    helper.reloadFXValue(component, event, helper, false)
                    .then($A.getCallback(function (resolve, reject) {            
                        return helper.reloadFXValue(component, event, helper, true);
                    })).then($A.getCallback(function (resolve, reject) {
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
                helper.sendToLanding(component, event, helper,  false);
                component.set('v.spinner', false);
            }
        }
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
            let paymentId = component.get('v.paymentId');
            var action = component.get('c.updateStatus');
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
                    console.log(stateRV);
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
        var errorToast = component.find('errorToast');
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
            component.set("v.scaUid",'');
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
            var paymentId = component.get('v.paymentId');
            var payment = component.get('v.dataSelectAmount');
            var accountData = component.get('v.accountData');
            var sourceAccountData = component.get('v.dataSelectOrigin');
            var recipientAccountData = component.get('v.dataSelectDestination');
            var action = component.get('c.getExchangeRate');
            if (feesBoolean == true && $A.util.isEmpty(payment.convertedTransactionFee)) {
                resolve('ok');
                
            }else if (feesBoolean == false && component.get("v.dataSelectOrigin").currencyCodeAvailableBalance == component.get("v.dataSelectDestination").currencyCodeAvailableBalance) {
                resolve('ok');                
            } else {
                var action = component.get('c.getExchangeRate');
                action.setParams({
                    'paymentId': paymentId,
                    'paymentData': payment,
                    'accountData': accountData,
                    'sourceAccountData': sourceAccountData,
                    'recipientAccountData': recipientAccountData,
                    'feesBoolean': feesBoolean
                });
                action.setCallback(this, function (actionResult) {
                    if (actionResult.getState() == 'SUCCESS') {
                        var stateRV = actionResult.getReturnValue();
                        console.log(stateRV);
                        if (stateRV.success) {
                            if(feesBoolean == true){
                                if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                                    payment.convertedTransactionFee = stateRV.value.convertedAmount;
                                }
                                if (!$A.util.isEmpty(stateRV.value.output)) {
                                    payment.convertedTransactionFeeServiceResponse = stateRV.value.output;
                                }          
                            } else {
                                component.set("v.exchangeRateLabel", $A.get("$Label.c.exchangeRate"));
                                if (!$A.util.isEmpty(stateRV.value.exchangeRate)) {
                                    payment.exchangeRate = stateRV.value.exchangeRate;
                                }  
                                if (!$A.util.isEmpty(stateRV.value.timestamp)) {
                                    payment.timestamp = stateRV.value.timestamp;
                                }  
                                if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                                    if(stateRV.value.amountObtained == 'send'){
                                    	payment.amountSend = stateRV.value.convertedAmount;
                                    }
                                    if(stateRV.value.amountObtained == 'received'){
                                    	payment.amountReceive = stateRV.value.convertedAmount;
                                    }
                                    payment.amountOperative = stateRV.value.convertedAmount;
                                }
                                if (!$A.util.isEmpty(stateRV.value.output)) {
                                    payment.exchangeRateServiceResponse = stateRV.value.output;
                                }          
                            }
                            component.set('v.dataSelectAmount', payment);
                            component.set('v.expiredFX', false);
                            component.set('v.FXDateTime', helper.getCurrentDateTime(component, event, helper));
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

    getTotalAmount: function (component, event, helper) {
        let amountSend = component.get('v.dataSelectAmount').amountSend;
        let convertedFee = component.get('v.dataSelectAmount').convertedTransactionFee;
        let convertedFeeCurrency = component.get('v.dataSelectAmount').convertedTransactionFeeCurrency;
        let fee = component.get('v.dataSelectAmount').transactionFee;
        var total = 0;
        if (!$A.util.isEmpty(convertedFee) && !$A.util.isEmpty(convertedFeeCurrency)) {
            if (convertedFeeCurrency == component.get('v.dataSelectOrigin').currencyCodeAvailableBalance) {
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
            var action = component.get('c.updateLimits');
            action.setParams({ 
                'operationId': component.get('v.paymentId'),
                'serviceId': 'add_international_payment_internal',
                'paymentData': component.get('v.dataSelectAmount'),
                'sourceAccountData': component.get('v.dataSelectOrigin')
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var returnValue = response.getReturnValue();
                    if (!returnValue.success) {
                        reject('ko');
                    } else {
                        resolve('ok');
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
        }), this);
    },

    deleteSignatureRecord: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.removeSignature');
            action.setParams({
                'paymentId': component.get('v.paymentId')
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    console.log(returnValue);
                    if (!returnValue.success) {
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                        reject('ko');
                    } else {
                        resolve('ok');
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
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
            action.setParams({
                'paymentId': component.get('v.paymentId'),
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
            var action = component.get('c.getOTP_Strategic');
            
            var beneficiaryName = '';
            if(component.get("v.dataSelectDestination").subsidiaryName != undefined){
                beneficiaryName = component.get("v.dataSelectDestination").subsidiaryName;
            }

            action.setParams({
                'paymentId': component.get('v.paymentId'),
                'beneficiaryName': beneficiaryName,
                'beneficiaryAccount':component.get("v.dataSelectDestination").displayNumber,
                'debitAmount': component.get('v.debitAmountString'),
                'fees': component.get('v.feesString'),
                'exchangeRate': component.get('v.exchangeRateString'),
                'paymentAmount': component.get('v.paymentAmountString')
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    console.log(returnValue);
                    if (!returnValue.success) {
                        //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), true, 'error');
                    	component.set('v.errorSign', true);
                    	component.set('v.errorOTP', true);
                   		component.set('v.spinnerVerificationCode', false);
                        reject('ko');

                    } else {
                        if(returnValue.value.initiateOTP.localSigningUrl == null ||returnValue.value.initiateOTP.localSigningUrl == undefined ){
                            component.set("v.scaUid",returnValue.value.initiateOTP.scaUid );
                        }else{
                            component.set("v.scaUid",returnValue.value.initiateOTP.signId );
                            var win = window.open(returnValue.value.initiateOTP.localSigningUrl, '_blank');
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
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), true, 'error');
                    component.set('v.errorSign', true);
                    component.set('v.errorOTP', true);
                    component.set('v.spinnerVerificationCode', false);
                    reject('ko');
                    
                }
            });
            $A.enqueueAction(action);
        }), this);
    }
})