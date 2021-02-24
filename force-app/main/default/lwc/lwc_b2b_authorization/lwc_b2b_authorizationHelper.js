
import getPaymentDetail from '@salesforce/apex/CNT_B2B_Authorization.getPaymentDetail';
import getUserData from '@salesforce/apex/CNT_B2B_Authorization.getUserData';
import decryptData from '@salesforce/apex/CNT_B2B_Authorization.decryptData';
import executePayment from '@salesforce/apex/CNT_B2B_Authorization.decryptData';
import authorizePayment from '@salesforce/apex/CNT_B2B_Authorization.authorizePayment';
import getOTP from '@salesforce/apex/CNT_B2B_Authorization.getOTP';
import getOTP_Strategic from '@salesforce/apex/CNT_B2B_Authorization.getOTP_Strategic';








export const helper = {

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    getPaymentData  (event,paymentID) {
        return new Promise( (resolve, reject)  => {
            getPaymentDetail({ 
                paymentId : paymentID
            })
            .then(actionResult => {
                    var returnValue = actionResult;
                    console.log(returnValue);
                    if (returnValue.success) {
                        console.log(returnValue.value.paymentDetail);
                        resolve({ paymentDetailAttribute: returnValue.value.paymentDetail, messageAttribute: 'ok' });
                    } else {
                        reject('ko');
                    }
            }).catch(errors => {
                console.log('Error message: ' + errors);
                reject('ko');
            });
        }, this);
    },

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    getURLParams() {
            return new Promise((resolve, reject) => {
                try {
                    var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
                    var sURLVariablesMain = sPageURLMain.split('&')[0].split('='); 
                    var sParameterName;
                    var sPageURL;
                    if (sURLVariablesMain[0] == 'params') {
                        if (sURLVariablesMain[1] != '' && sURLVariablesMain[1] != undefined && sURLVariablesMain[1] != null) {
                            this.decrypt(sURLVariablesMain[1])
                            .then( (results) => {
                                sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                                var sURLVariables = sPageURL.split('&');
                                var paymentId = '';
                                var source = '';
                                var paymentDetails = {};
                                for (var i = 0; i < sURLVariables.length; i++) {
                                    sParameterName = sURLVariables[i].split('=');
                                    if (sParameterName[0] === 'c__paymentId') { 
                                        sParameterName[1] === undefined ? 'Not found' : paymentId = this.paymentId = sParameterName[1];
                                    }
                                    if (sParameterName[0] === 'c__source') {
                                        sParameterName[1] === undefined ? 'Not found' : source = this.source = sParameterName[1];
                                    }
                                    if (sParameterName[0] === 'c__paymentDetails') {
                                        console.log(sParameterName[1]);
                                        sParameterName[1] === undefined ? 'Not found' : paymentDetails = JSON.parse(sParameterName[1]);
                                    }
                                    if (sParameterName[0] === 'c__signatoryDetails') {
                                        sParameterName[1] === undefined ? 'Not found' : this.signLevel = JSON.parse(sParameterName[1]);
                                    }
                                }
                                if (paymentDetails === undefined || paymentDetails === null) {
                                    helper.getPaymentData(paymentId)
                                    .then((returnValue) => {
                                        resolve({ paymentDetailAttribute: returnValue, messageAttribute: 'ok' });
                                    });
                                } else {
                                    /*paymentDetails.sourceCurrency='GBP';
                                    paymentDetails.FXDateTime = null;
                                    paymentDetails.FXoutput = null;
                                    paymentDetails.FXFeesOutput = null;*/
                                    resolve({ paymentDetailAttribute: paymentDetails, messageAttribute: 'ok' });
                                    
                                }
                            });
                        }
                    }
                } catch (e) {
                    console.log(e);
                    reject('ko');
                }
            }, this); 
    },
    
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    decrypt(data) {
        try {
            var result = "null"; 
            return new Promise((resolve, reject) => {
                decryptData({ 
                    str : data 
                })
                .then(response => {
                        resolve(response);
                }).catch(errors => {
                    console.log('Error message: ' + errors);
                    reject(errors);
                });
                });            
            } catch (e) {
                console.error(e);
            }
        },

    
     /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    getCurrentUserData (event) {
        return new Promise((resolve, reject) => {
            getUserData()
            .then(actionResult => {
                    var userData = {};
                    var stateRV = actionResult;
                    if (stateRV.success) {
                        if (stateRV.value != undefined) {
                            userData = stateRV.value.userData;
                        }
                        if (stateRV.value != undefined && stateRV.value.userId != undefined ) {
                            userData.userId = stateRV.value.userId;
                        } 
                        if (stateRV.value != undefined && stateRV.value.isNexus != undefined) {
                            userData.isNexus = stateRV.value.isNexus;
                        } else {
                            userData.isNexus = false; // Añadir un error PARCHE MINIGO
                        }
                        if (stateRV.value != undefined && stateRV.value.numberFormat != undefined) {
                            userData.numberFormat = stateRV.value.numberFormat;
                        }
                        if (stateRV.value != undefined && stateRV.value.globalId != undefined) {
                            userData.globalId = stateRV.value.globalId;
                        } 
                        if (stateRV.value != undefined && stateRV.value.MobilePhone != undefined) {
                            userData.MobilePhone = stateRV.value.MobilePhone;
                        } 
                        
                    }
                    resolve({ userDataAttribute: userData, messageAttribute: 'ok' });
                }).catch(errors => {
                    console.log('Error message: ' + errors);
                    reject('ko');
                });
            }, this);  
    },




    /*
        Author:        	Bea Hill
        Company:        Deloitte
        Description:    Get payment details
        History:
        <Date>          <Author>            <Description>
        30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    getAccountData (event) {
        return new Promise( (resolve, reject) => {
            getAccountData()
            .then(actionResult => {
                    var accountData = {};
                    var stateRV = actionResult;
                    if (stateRV.success && stateRV.value != undefined ) {
                        if (stateRV.value.cib != null) {
                            accountData.CIB = stateRV.value.cib;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.CIB = false;
                        }
                        if (stateRV.value.documentType != null) {
                            accountData.documentType = stateRV.value.documentType;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.documentType = 'tax_id';
                        }
                        if (stateRV.value.documentNumber != null) {
                            accountData.documentNumber = stateRV.value.documentNumber;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.documentNumber = 'B86561412';
                        }
                        if (stateRV.value.documentNumber != null) {
                            accountData.companyId = stateRV.value.companyId;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.companyId = '2119';
                        }
                    }
                    resolve({ accountDataAttribute: accountData, messageAttribute: 'getAccountData_OK' });
                }).catch(errors => {
                    console.log('Error message: ' + errors);
                    reject('getAccountData_KO');
                });
                
            }, this);  
    },


    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    handleExecutePayment(){
            return new Promise((resolve, reject) => {
                var paymentId = this.paymentId;
                var paymentData = this.paymentData;
                let FXTimer = (paymentData.FXDateTime != undefined && paymentData.FXDateTime != null) ? null : paymentData.FXDateTime;
                let FXData = (paymentData.FXoutput != undefined && paymentData.FXoutput != null) ? null : paymentData.FXoutput;
                let feesData = (paymentData.FXFeesOutput != undefined && paymentData.FXFeesOutput != null) ? null : paymentData.FXFeesOutput;
                executePayment({ 
                    paymentId: paymentId,
                    paymentDetail: paymentData,
                    FXTimer: FXTimer,
                    FXData: FXData,
                    feesData: feesData
                })
                .then((actionResult) => {
                        var returnValue = actionResult;
                        if (returnValue.success === true && returnValue.value != undefined) {
                            var orchestationOutput = returnValue.value.OrchestationOutput;
                            if ((orchestationOutput != undefined && orchestationOutput != null) || 
                                (orchestationOutput.level != undefined && orchestationOutput.level != null && orchestationOutput.level != 'OK'))
                             {
                                //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                                helper.updateStatus('999','003');
                                reject('ko');
                            } else {
                                resolve('ok');
                            }
                        } else {
                            helper.updateStatus('999','003');
                            reject('ko');
                        }
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    helper.updateStatus('999','003');
                    reject('ko');
                });

            }, this);
    },
    

    
    /*
    Author:        	R. cervinpo
    Company:        Deloitte
    Description:    authorize payment
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
    signPayment: function (paymentId,finalAuthorizer,scaUid) {
            return new Promise( (resolve, reject) => {
                authorizePayment({
                    paymentId: paymentId, 
                    finalAuthorizer:finalAuthorizer, 
                    scaUid:scaUid})
                .then((actionResult) => {
                        var returnValue = actionResult;
                        if (!returnValue.success) {
                            //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                            reject('problem authorizing the payment');
                        }
                        resolve('ok');
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    console.log('problem authorizing the payment');
                    //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                    reject('ko');
                });
            }, this);
    },

    
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    sendOTP(paymentData,paymentId) {
            return new Promise($A.getCallback(function (resolve, reject) {
                //component.set('v.reload', false);
                //component.set('v.reloadAction', component.get('c.getOTP'));
                var sourceCountry = '';
                var sourceBIC = '';
                var payment = paymentData;
                if (payment != undefined && payment != null) {
                    if (payment.sourceCountry != undefined && payment.sourceCountry != null) {
                        sourceCountry = payment.sourceCountry;
                    }
                    if (payment.sourceSwiftCode != undefined && payment.sourceSwiftCode != null) {
                        sourceBIC = payment.sourceSwiftCode;
                    }
                }
                getOTP({
                    paymentId: paymentId,
                    sourceCountry: sourceCountry,
                    sourceBIC: sourceBIC
                })
                .then( (actionResult) => {
                        var returnValue = actionResult;
                        console.log(returnValue);
                        if (!returnValue.success) {
                            //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), false, 'error');
                        } else {
                            //component.set('v.showOTP', true);
                        }
                        resolve(true);
                        //component.set('v.spinnerVerificationCode', false);
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.errorObtainingOTP'), false, 'error');
                    //component.set('v.spinnerVerificationCode', false);
                    reject('ko');
                });
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
    sendOTP_Strategic(paymentData,paymentId,debitAmountString,feesString,exchangeRateString,paymentAmountString,labelCNF_mockeoFirmas) {
            return new Promise((resolve, reject) => {
                //component.set('v.reload', false);
                //component.set('v.reloadAction', component.get('c.sendOTP_Strategic'));
                //component.set('v.spinnerVerificationCode', true);
                var beneficiaryName = '';
                if(paymentData.beneficiaryAccountHolder != undefined){
                    beneficiaryName = paymentData.beneficiaryAccountHolder;
                }
                getOTP_Strategic({
                    paymentId: paymentId,
                    beneficiaryName: beneficiaryName,
                    beneficiaryAccount: paymentData.beneficiaryAccount,
                    debitAmount: debitAmountString,
                    fees: feesString,
                    exchangeRate: exchangeRateString,
                    paymentAmount: paymentAmountString
                })
                .then((actionResult) => {
                        var returnValue = actionResult;
                        console.log(returnValue);
                        if (!returnValue.success) {
                            resolve({ 
                                errorSignAttribute: true, 
                                errorOTPAttribute: true,
                                spinnerVerificationCodeAttribute: false, 
                                messageAttribute: 'ko' });
                        } else {
                            if( labelCNF_mockeoFirmas === 'ok'){
                                helper.checkOTP();
                            }
                            resolve({ 
                                scaUidAttribute : returnValue.value.initiateOTP.scaUid , 
                                errorSignAttribute: false, 
                                errorOTPAttribute: false,
                                spinnerVerificationCodeAttribute: false, 
                                messageAttribute: 'ok' });

                        }
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    resolve({ 
                        errorSignAttribute: true, 
                        errorOTPAttribute: true,
                        spinnerVerificationCodeAttribute: false, 
                        messageAttribute: 'ko' });
                          
                });
            }, this);
        },
    
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */        
    checkOTP: function (component, event, helper) {
            //component.set('v.spinnerVerificationCode', true);
            var action = component.get('c.validateOTP');
            var sourceCountry = '';
            var sourceBIC = '';
            var payment = component.get('v.paymentData');
            if(!$A.util.isEmpty(payment)) {
                if(!$A.util.isEmpty(payment.sourceCountry)) {
                    sourceCountry = payment.sourceCountry;
                }
                if(!$A.util.isEmpty(payment.sourceSwiftCode)) {
                    sourceBIC = payment.sourceSwiftCode;
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
                        //component.set('v.spinnerVerificationCode', false);
                        helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                    } else {
                        if (returnValue.value.validateOTP.validateResult != 'ko' && returnValue.value.validateOTP.validateResult != 'KO') {
                            component.set('v.OTPErrorMessage','');
                            let signature = component.get('v.signLevel');
                            if (signature.lastSign == 'true') {
                                helper.signPayment(component, event, helper,true)
                                .then($A.getCallback(function (value) {
                                    return helper.handleExecutePayment(component, event, helper);
                                })).then($A.getCallback(function (value) {
                                    return helper.deleteSignatureRecord(component, event, helper);
                                })).then($A.getCallback(function (value) {
                                    return helper.sendNotification(component, event, helper);
                                })).then($A.getCallback(function (value) {
                                    // helper.showToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.authorizeSuccess'), true, 'success');
                                    helper.sendToLanding(component, event, helper, true);
                                })).catch(function (error) {
                                    console.log(error);
                                }).finally($A.getCallback(function (value){
                                    //component.set('v.spinnerVerificationCode', false);
                                }));
                            } else {
                                helper.signPayment(component, event, helper,false).then($A.getCallback(function (value) {
                                    // helper.showToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.authorizeSuccess'), true, 'success');
                                    helper.sendToLanding(component, event, helper,true);
                                })).catch($A.getCallback(function (error) {
                                    //component.set('v.spinnerVerificationCode', false);
                                    console.log(error);
                                }));
                            }
                        }else{
                            //component.set('v.spinnerVerificationCode', false);
                            component.set('v.OTPErrorMessage', $A.get('$Label.c.OTPWrongCheckSMS'));
                            // helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                        }
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                }
            });
            $A.enqueueAction(action);
    },
    
    /*
        Author:        	R. cervinpo
        Company:        Deloitte
        Description:    Get payment sign level
        History:
        <Date>          <Author>            <Description>
        30/07/2020      R. Cervino          Initial version
        07/08/2020      Bea Hill            Separate functions to control status update
    */
    beginAuthorize(signLevel,paymentData,paymentId,debitAmountString,feesString,exchangeRateString,paymentAmountString,labelCNF_mockeoFirmas){
        return new Promise((resolve, reject) => {
                let signature = signLevel;
                console.log(signature);
                if (signature.signatory === 'true' && signature.signed === 'false') {
                    if (signature.lastSign === 'true') {
                        helper.sendOTP_Strategic(paymentData,paymentId,debitAmountString,feesString,exchangeRateString,paymentAmountString,labelCNF_mockeoFirmas)
                        .then((value) => {
                            resolve({ 
                                scaUidAttribute : value.scaUidAttribute,
                                errorSignAttribute: value.errorSignAttribute, 
                                errorOTPAttribute: value.errorOTPAttribute,
                                spinnerVerificationCodeAttribute: value.spinnerVerificationCodeAttribute, 

                                messageAttribute: value.messageAttribute ,
                                showOTPAttribute: true 
                            });
                        }).catch((error) => {
                            console.log(error);
                            reject({ 
                                errorSignAttribute: value.errorSignAttribute, 
                                errorOTPAttribute: value.errorOTPAttribute,
                                spinnerVerificationCodeAttribute: value.spinnerVerificationCodeAttribute, 

                                messageAttribute: value.messageAttribute 
                            });
                        }).finally(() => {
                        });
                    } else {
                        helper.sendOTP_Strategic(paymentData,paymentId,debitAmountString,feesString,exchangeRateString,paymentAmountString,labelCNF_mockeoFirmas)
                        .then((value) => {
                            resolve({ 
                                scaUidAttribute : value.scaUidAttribute,
                                errorSignAttribute: value.errorSignAttribute, 
                                errorOTPAttribute: value.errorOTPAttribute,
                                spinnerVerificationCodeAttribute: value.spinnerVerificationCodeAttribute, 

                                messageAttribute: value.messageAttribute ,
                                showOTPAttribute: true 
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            reject({
                                    scaUidAttribute : value.scaUidAttribute,
                                    errorSignAttribute: value.errorSignAttribute, 
                                    errorOTPAttribute: value.errorOTPAttribute,
                                    spinnerVerificationCodeAttribute: value.spinnerVerificationCodeAttribute, 

                                    messageAttribute: value.messageAttribute ,
                                    showOTPAttribute: true 
                                    });
                        }).finally(() => {
                        });
                    }
                } 
            }, this);  
    },
    
    /*
        Author:        	Bea Hill
        Company:        Deloitte
        Description:    Make call to server to update payment status
        History:
        <Date>          <Author>            <Description>  
        07/08/2020      Bea Hill            Initial version
        12/11/2020      Antonio Matachana   send userdata
    */
    updateStatus: function (component, event, helper, status, reason) {
            return new Promise($A.getCallback(function (resolve, reject) {
                let paymentId = component.get('v.paymentId');
                var action = component.get('c.updateStatus');
                var userData = component.get('v.userData');
                action.setParams({
                    'paymentId': paymentId,
                    'status': status,
                    'reason': reason,
                    'userdata': userData
                });
                action.setCallback(this, function (actionResult) {
                    if (actionResult.getState() == 'ERROR') {
                        var errors = actionResult.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log('Error message: ' + errors[0].message);
                            }
                        } else {
                            helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                        }
                        reject('ko');
                    } else {
                        var stateRV = actionResult.getReturnValue();
                        console.log(stateRV);
                        if (stateRV == 'OK') {
                            resolve('ok');
                        } else {
                            reject('ko');
                            helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                        }
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
    reloadFX: function (component, event,  helper) {
            new Promise($A.getCallback(function (resolve, reject) {
                component.set('v.reloadAction', component.get('c.reloadFX'));
                component.set("v.scaUid",'');
                component.set('v.reload', false);
                component.set('v.errorSign', true);
                component.set('v.spinnerCountDown', true);
                resolve('ok');
            })).then($A.getCallback(function (value) {
                return helper.reloadFXValue(component,event, helper, false);
            })).then($A.getCallback(function (value) {
                return helper.reloadFXValue(component, event, helper, true);
            })).catch($A.getCallback(function (error) {
                console.log(error);
            })).finally($A.getCallback(function () {
                
                component.set('v.spinnerCountDown', false);
            }));
        },
    
    
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    reloadFXValue: function (component, event,  helper, feesBoolean) {
            return new Promise($A.getCallback(function (resolve, reject) {
                let payment = component.get('v.paymentData');
                let paymentFees = ($A.util.isEmpty(payment.fees) ? '' : payment.fees);
                let paymentCurrency = ($A.util.isEmpty(payment.paymentCurrency) ? '' : payment.paymentCurrency);
                let feesCurrency = ($A.util.isEmpty(payment.feesCurrency) ? '' : payment.feesCurrency);
                if (feesBoolean == true && (($A.util.isEmpty(paymentFees) || $A.util.isEmpty(feesCurrency)) || (!$A.util.isEmpty(paymentFees) && (paymentCurrency == feesCurrency)))) {
                    resolve('ok');
                }else if (feesBoolean == false && payment.sourceCurrency == payment.beneficiaryCurrency) {
                    resolve('ok');
                } else {
                    let paymentId = component.get('v.paymentId');
                    let accountData = component.get('v.accountData');
                    let action = component.get('c.getExchangeRate');
                    action.setParams({
                        'paymentId': paymentId,
                        'accountData': accountData,
                        'payment': payment,
                        'feesBoolean': feesBoolean
                    });
                    action.setCallback(this, function (actionResult) {
                        if (actionResult.getState() == 'SUCCESS') {
                            let stateRV = actionResult.getReturnValue();
                            console.log(stateRV);
                            console.log(payment.amountSend);
                            if (stateRV.success) {
                                if (feesBoolean == true){
                                    if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                                        payment.fees = stateRV.value.convertedAmount;
                                        if (payment.convertedAmount != null && payment.convertedAmount != undefined && payment.addFees == true) {
                                            
                                            payment.totalAmount =  parseFloat(stateRV.value.convertedAmount) + parseFloat(payment.amountSend);
                                        }
                                    }
                                    if (!$A.util.isEmpty(stateRV.value.output)) {
                                        payment.FXFeesOutput = stateRV.value.output;
                                    }          
                                    payment.feesFXDateTime = helper.getCurrentDateTime(component, event, helper);
                                } else {
                                    if (!$A.util.isEmpty(stateRV.value.exchangeRate)) {
                                        payment.tradeAmount = stateRV.value.exchangeRate;
                                        payment.operationNominalFxDetails.customerExchangeRate = stateRV.value.exchangeRate;
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
                                        payment.convertedAmount = stateRV.value.convertedAmount;
    
                                        payment.amountOperative = stateRV.value.convertedAmount;
                                        if ($A.util.isEmpty(paymentFees) == false && payment.addFees == true) {
                                            payment.totalAmount =  parseFloat(payment.amountSend) + parseFloat(paymentFees);
                                        }
                                        
                                    }
                                    if (!$A.util.isEmpty(stateRV.value.output)) {
                                        payment.FXoutput = stateRV.value.output;
                                    }                               
                                    payment.FXDateTime = helper.getCurrentDateTime(component, event, helper);
                                }
                                component.set('v.paymentData', payment);
                                component.set('v.expiredFX', false);
                                resolve('ok');
                            } else {
                                reject('ko');
                                helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), component.get('v.showOTP'), 'error');
                            }
                        } else {
                            reject('ko');
                            helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), component.get('v.showOTP'), 'error');
                        }
                    });
                    $A.enqueueAction(action);
                }
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
        
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
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
    
    /*
        Author:         R. Cervino
        Company:        Deloitte
        Description:    Encryption for page navigation
        History:
        <Date>          <Author>            <Description>
        18/06/2020      R. Cervino          Initial version - adapted from B2B
    */
    encrypt: function (component, data) {
            var result = 'null';
            var action = component.get('c.encryptData');
            action.setParams({
                'str': data
            });
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
        
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
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
    
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
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
                        if(component.get("v.expiredFX")==false && component.get("v.errorOTP")==false){
                            
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
                                                return helper.sendNotification(component, event, helper);
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
                                            })).catch($A.getCallback(function (error) {
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
        
     /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
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
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    sendNotification: function (component, event, helper){
            return new Promise($A.getCallback(function (resolve, reject) {
                var action = component.get('c.sendNotification');
                action.setParams({
                    'paymentId': component.get('v.paymentData.paymentId')
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
    }
}