
import getPaymentDetail from '@salesforce/apex/CNT_B2B_Authorization.getPaymentDetail';
import getUserData from '@salesforce/apex/CNT_B2B_Authorization.getUserData';
import decryptData from '@salesforce/apex/CNT_B2B_Authorization.decryptData';
import executePayment from '@salesforce/apex/CNT_B2B_Authorization.decryptData';
import authorizePayment from '@salesforce/apex/CNT_B2B_Authorization.authorizePayment';
import getOTP from '@salesforce/apex/CNT_B2B_Authorization.getOTP';
import getOTP_Strategic from '@salesforce/apex/CNT_B2B_Authorization.getOTP_Strategic';
import getExchangeRate from '@salesforce/apex/CNT_B2B_Authorization.getExchangeRate';
import removeSignature from '@salesforce/apex/CNT_B2B_Authorization.removeSignature';
import encryptData from '@salesforce/apex/CNT_B2B_Authorization.encryptData';
import getSessionId from '@salesforce/apex/CNT_B2B_Authorization.getSessionId';
import sendNotification from '@salesforce/apex/CNT_B2B_Authorization.sendNotification';
import getAccountData from '@salesforce/apex/CNT_B2B_Authorization.getAccountData';

import OTPWrongCheckSMS from '@salesforce/label/c.OTPWrongCheckSMS';


export const helper = {

   
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    getPaymentData (event,paymentID) {
        return new Promise( (resolve, reject) => {
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
            })
            .catch(errors => {
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
                                    this.getPaymentData(paymentId)
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
                        resolve({ userDataAttribute: userData, messageAttribute: 'ok' });
                    }else{
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
                                (orchestationOutput.level != undefined && orchestationOutput.level != null && orchestationOutput.level != 'OK')) {
                                //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                                //helper.updateStatus(component,event, helper,'101','001');
                                //helper.updateStatus(component,event, helper,'999','003');
                                reject('ko');
                            } else {
                                resolve('ok');
                            }
                        } else {
                            //helper.updateStatus(component,event, helper,'101','001');
                            //helper.updateStatus(component,event, helper,'999','003');
                            reject('ko');
                        }
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    //helper.updateStatus(component,event, helper,'101','001');
                    //helper.updateStatus(component,event, helper,'999','003');
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
            return new Promise((resolve, reject) => {
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
    sendOTP_Strategic(paymentData,paymentId,debitAmountString,
                    feesString,exchangeRateString,paymentAmountString,
                    labelCNF_mockeoFirmas,validateOTP,OTP,signLevel,OTPWrongCheckSMS,navigatorInfo) {

            var win;

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
                    paymentAmount: paymentAmountString,
                    paymentDetail: paymentData,
                    service_id : 'international_payment',
                    navigatorInfo : navigatorInfo
                })
                .then((actionResult) => {
                        var returnValue = actionResult;
                        console.log(returnValue);
                        if (!returnValue.success) {
                            reject({ 
                                errorSignAttribute: true, 
                                errorOTPAttribute: true,
                                spinnerVerificationCodeAttribute: false, 
                                messageAttribute: 'ko' });
                        } else {
                            var scaUidVar;
                            if(returnValue.value.initiateOTP.localSigningUrl === null || returnValue.value.initiateOTP.localSigningUrl === undefined ){
                                scaUidVar = returnValue.value.initiateOTP.scaUid;
                            }else{
                                scaUidVar = returnValue.value.initiateOTP.signId;
                                win = window.open(returnValue.value.initiateOTP.localSigningUrl, '_blank');
                                //component.set("v.localWindow", win);
                                win.focus();
                            }
                           
                            if( labelCNF_mockeoFirmas === 'ok'){
                                this.checkOTP(validateOTP,paymentData,paymentId,OTP,signLevel,OTPWrongCheckSMS);
                            }
                            resolve({ 
                                winAttribute : win, 
                                scaUidAttribute : scaUidVar, 
                                errorSignAttribute: false, 
                                errorOTPAttribute: false,
                                spinnerVerificationCodeAttribute: false, 
                                messageAttribute: 'ok' });

                        }
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    reject({ 
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
    checkOTP(validateOTP,paymentData,paymentId,OTP,signLevel,OTPWrongCheckSMS) {
        return new Promise((resolve, reject) => {
            //component.set('v.spinnerVerificationCode', true);
            var sourceCountry = '';
            var sourceBIC = '';
            var payment = paymentData;
            if(payment != undefined && payment != null) {
                if(payment.sourceCountry != undefined && payment.sourceCountry != null) {
                    sourceCountry = payment.sourceCountry;
                }
                if(payment.sourceSwiftCode != undefined && payment.sourceSwiftCode != null) {
                    sourceBIC = payment.sourceSwiftCode;
                }
            }

            validateOTP({  
                paymentId : paymentId,
                metaData: OTP,
                sourceCountry: sourceCountry,
                sourceBIC: sourceBIC
            })
            .then((actionResult) => {
                    var returnValue = actionResult;
                    console.log(returnValue);
                    if (!returnValue.success) {
                        resolve({ OTPErrorMessageAttribute : '' })
                        //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                    } else {
                        if (returnValue.value.validateOTP.validateResult != 'ko' && returnValue.value.validateOTP.validateResult != 'KO') {
                            let signature = signLevel;
                            if (signature.lastSign ==='true') {
                                this.signPayment(true)
                                .then((value) => {
                                    return this.handleExecutePayment();
                                }).then((value)  => {
                                    return this.deleteSignatureRecord();
                                }).then((value)  => {
                                    return this.sendNotification();
                                }).then((value)  => {
                                    this.sendToLanding( true);
                                }).catch(function (error) {
                                    console.log(error);
                                }).finally( (value)  => {
                                    //component.set('v.spinnerVerificationCode', false);
                                });
                            } else {
                                this.signPayment(false)
                                .then((value) => {
                                    this.sendToLanding(true);
                                }).catch( (error) =>{
                                    console.log(error);
                                });
                            }
                            resolve({ OTPErrorMessageAttribute : '' })
                        }else{
                            resolve({ OTPErrorMessageAttribute : OTPWrongCheckSMS })
                        }
                    }
                
            })
            .catch(errors => {
                console.log('Error message: ' + errors);
                reject({ errorSignAttribute: true });
                //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
            });
        }, this);  
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
                        this.sendOTP_Strategic(paymentData,paymentId,debitAmountString,
                            feesString,exchangeRateString,paymentAmountString,labelCNF_mockeoFirmas,
                            validateOTP,OTP,signLevel,OTPWrongCheckSMS,navigatorInfo)
                        .then((value) => {
                            resolve({ 
                                winAttribute : value.winAttribute,
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
                        this.sendOTP_Strategic(paymentData,paymentId,debitAmountString,feesString,exchangeRateString,
                                                paymentAmountString,labelCNF_mockeoFirmas,
                                                validateOTP,OTP,signLevel,OTPWrongCheckSMS,navigatorInfo)
                        .then((value) => {
                            resolve({ 
                                winAttribute : value.winAttribute,
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
                        })
                        .finally(() => {
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
    updateStatus(status, reason, paymentId, userData) {
            return new Promise((resolve, reject) => {
                let paymentId = paymentId;
                var userData = userData;
                updateStatus({
                    paymentId: paymentId,
                    status: status,
                    reason: reason,
                    userdata: userData
                });
                then((actionResult) => {
                        var stateRV = actionResult;
                        console.log(stateRV);
                        if (stateRV == 'OK') {
                            resolve('ok');
                        } else {
                            reject('ko');
                            //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                        }
                })
                .catch((error) => {
                    console.log(error);
                    //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false,'error');
                    reject('ko');
                })
              
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
    reloadFX(paymentData,paymentId,accountData){
            new Promise( (resolve, reject) => {
                resolve('ok');
            }).then((value) => {
                return this.reloadFXValue(false,paymentData,paymentId,accountData);
            }).then((value) => {
                return this.reloadFXValue(true,paymentData,paymentId,accountData);
            }).catch( (error)  =>{
                console.log(error);
            })
    },
    
    
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    reloadFXValue: function (feesBoolean,paymentData,paymentId,accountData) {
            return new Promise( (resolve, reject) => {
                let payment = paymentData;
                let paymentFees = ((payment.fees == undefined || payment.fees != undefined) ? '' : payment.fees);
                let paymentCurrency = ((payment.paymentCurrency == undefined || payment.paymentCurrency != undefined)   ? '' : payment.paymentCurrency);
                let feesCurrency = ((payment.feesCurrency == undefined || payment.feesCurrency != undefined)  ? '' : payment.feesCurrency);
                if (feesBoolean == true && ((paymentFees === '' || feesCurrency === '' || (paymentFees === '' &&  (paymentCurrency === feesCurrency))))) {
                    resolve('ok');
                }else if (feesBoolean == false && payment.sourceCurrency === payment.beneficiaryCurrency) {
                    resolve('ok');
                } else {
                    let paymentId = paymentId;
                    let accountData = accountData;
                    getExchangeRate({
                        paymentId: paymentId,
                        accountData: accountData,
                        payment: payment,
                        feesBoolean : feesBoolean
                    })
                    .then(this, function (actionResult) {
                            let stateRV = actionResult;
                            console.log(stateRV);
                            console.log(payment.amountSend);
                            if (stateRV.success) {
                                if (feesBoolean === true){
                                    if (stateRV.value.convertedAmount != undefined && stateRV.value.convertedAmount != null) {
                                        payment.fees = stateRV.value.convertedAmount;
                                        if (payment.convertedAmount != null && payment.convertedAmount != undefined && payment.addFees == true) {
                                            payment.totalAmount =  parseFloat(stateRV.value.convertedAmount) + parseFloat(payment.amountSend);
                                        }
                                    }
                                    if (stateRV.value.output != undefined && stateRV.value.output != null) {
                                        payment.FXFeesOutput = stateRV.value.output;
                                    }          
                                } else {
                                    if (stateRV.value.exchangeRate != null && stateRV.value.exchangeRate != undefined) {
                                        payment.tradeAmount = stateRV.value.exchangeRate;
                                        payment.operationNominalFxDetails.customerExchangeRate = stateRV.value.exchangeRate;
                                    } 
                                    if (stateRV.value.timestamp != undefined && stateRV.value.timestamp != null) {
                                        payment.timestamp = stateRV.value.timestamp;
                                    }
                                    if (stateRV.value.fxTimer != undefined && stateRV.value.fxTimer != null) {
                                        payment.FXDateTime = stateRV.value.fxTimer;
                                    }
                                    if (stateRV.value.convertedAmount != undefined && stateRV.value.convertedAmount != null) {
                                        if(stateRV.value.amountObtained == 'send'){
                                            payment.amountSend = stateRV.value.convertedAmount;
                                        }
                                        if(stateRV.value.amountObtained == 'received'){
                                            payment.amountReceive = stateRV.value.convertedAmount;
                                        }
                                        payment.convertedAmount = stateRV.value.convertedAmount;
    
                                        payment.amountOperative = stateRV.value.convertedAmount;
                                        if ( paymentFees != ''  && payment.addFees === true) {
                                            payment.totalAmount =  parseFloat(payment.amountSend) + parseFloat(paymentFees);
                                        }
                                        
                                    }
                                    if (stateRV.value.output != undefined && stateRV.value.output != null) {
                                        payment.FXoutput = stateRV.value.output;
                                    }                               
                                }
                                resolve({
                                        paymentDataAttribte : paymentData,
                                        expiredFX : false,
                                        messageAttribte : 'ok',
                                });
                            } else {
                                reject('ko');
                                //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), component.get('v.showOTP'), 'error');
                            }
                        
                    })
                    .catch( (error)  =>{
                        reject('ko');
                        //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), component.get('v.showOTP'), 'error');
                    })
                    .finally(() => {
                        console.log(error);
                    });
                   
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
    getCurrentDateTime() {
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
    deleteSignatureRecord(paymentId){
            return new Promise( (resolve, reject) => {
                removeSignature({
                    paymentId: paymentId
                })
                .then((actionResult) => {
                        var returnValue = actionResult;
                        console.log(returnValue);
                        if (!returnValue.success) {
                            //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                            reject('ko');
                        } else {
                            resolve('ok');
                        }
                })
                .catch( (error)  =>{
                    //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), component.get('v.showOTP'), 'error');
                    reject('ko');
                })
                .finally(() => {
                    console.log(error);
                });
                
            }, this);
        },
    
    /*
        Author:         R. Cervino
        Company:        Deloitte
        Description:    Encryption for page navigation
        History:
        <Date>          <Author>            <Description>
        18/06/2020      R. Cervino          Initial version - adapted from B2B
    */

      /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
   encrypt(data) {
        try {
            var result = "null"; 
            return new Promise((resolve, reject) => {
                encryptData({ 
                    str : data 
                })
                .then(response => {
                        resolve(response);
                })
                .catch(errors => {
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
    auxCometD (cometd,expiredFX,errorOTP,scaUid,errorSign,signLevel,cometdSubscriptions,localWindow){
            //component.set('v.cometdSubscriptions', []);
            //component.set('v.notifications', []);
            // Disconnect CometD when leaving page
            window.addEventListener('unload', function (event) {
                this.disconnectCometd(cometd,cometdSubscriptions);
            });
            // Retrieve session id
            getSessionId()
            .then((response)  => {
                    //component.set('v.sessionId', response.getReturnValue());
                    if (cometd != null) {
                        var sessionId = response;
                        this.connectCometd(cometd,sessionId,expiredFX,errorOTP,scaUid,
                                                errorSign,signLevel,cometdSubscriptions,localWindow);
                    }
            })
            .catch(errors => {
                console.log('Error message: ' + errors);
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
    // METHODS TO CONNECT WITH THE WS_OTPVALIDATION SERVICE
    connectCometd (cometd,sessionId,expiredFX,errorOTP,scaUid,
                    errorSign,signLevel,cometdSubscriptions,localWindow) {
        return new Promise( (resolve, reject) => {
            //var helper = this;
            // Configure CometD
            var cometdUrl = window.location.protocol + '//' + window.location.hostname + '/cometd/40.0/';
            cometd.configure({
                'url': cometdUrl,
                'requestHeaders': {
                    'Authorization': 'OAuth '+ sessionId
                },
                'appendMessageTypeToURL' : false
            });
            cometd.websocketEnabled = false;
            // Establish CometD connection
            console.log('Connecting to CometD: '+ cometdUrl);
            cometd.handshake((handshakeReply) => {
                if (handshakeReply.successful) {
                    console.log('Connected to CometD.');
                    // Subscribe to platform event
                    var newSubscription = cometd.subscribe('/event/OTPValidation__e', function (platformEvent) {
                        if(expiredFX === false && errorOTP === false){
                            if(platformEvent.data.payload.scaUid__c === scaUid){
                                var win = localWindow;
                                if(win != undefined && win != null){
                                    win.close();
                                }
                                if (platformEvent.data.payload.status__c == 'KO' || platformEvent.data.payload.status__c == 'ko') {
                                   this.errorSign =true;
                                } else {
                                    this.spinnerVerificationCode = true;
                                        let signature = signLevel;
                                        if (signature.lastSign == 'true') {
                                            this.signPayment(true).then((value) => {
                                                return this.handleExecutePayment();
                                            }).then((value) => {
                                                return this.deleteSignatureRecord();
                                            }).then((value) => {
                                                return this.sendNotification();
                                            }).then((value) => {
                                                this.sendToLanding( true);
                                            }).catch( (error)  =>{
                                                this.errorOTP = true;
                                                this.errorSign = true;
                                            }).finally(() => {
                                                this.spinnerVerificationCode = false;
                                            });
                                        } else {
                                            this.signPayment(false).then((value) => {
                                                this.sendToLanding(true);
                                            }).catch( (error)  =>{
                                                this.errorOTP = true;
                                                this.errorSign = true;
                                            }).finally(() => {
                                                this.spinnerVerificationCode = false;
                                            });
                                        }
                                        
                                }
                            }
                        }
                    });
                    // Save subscription for later
                    if(cometdSubscriptions != undefined){
                        var subscriptions = cometdSubscriptions;
                        subscriptions.push(newSubscription);
                        this.cometdSubscriptions = subscriptions;
                    }
                } else {
                    console.error('Failed to connected to CometD.');
                }
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
    disconnectCometd(cometd,cometdSubscriptions){
            // Unsuscribe all CometD subscriptions
            cometd.batch(function () {
              var subscriptions = cometdSubscriptions;
              subscriptions.forEach(function (subscription) {
                cometd.unsubscribe(subscription);
              });
            });
            this.cometdSubscriptions = [];
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
    sendNotification(paymentData){
            return new Promise( (resolve, reject) => {
                sendNotification({
                    paymentId : paymentData.paymentId
                })
                .then((response)  => {
                    resolve('ok');
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    resolve('ko');
                });
            }, this);
    },


    getNavigatorInfo: function (navigatorInfoInput) {
        return  new Promise((resolve, reject) => {
            let navigatorInfo = navigatorInfoInput;
            if(navigatorInfo != undefined && navigator != undefined){
                navigatorInfo.userAgent = navigator.userAgent;
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition((position) => {
                    navigatorInfo.latitude = position.coords.latitude;
                    navigatorInfo.longitude = position.coords.longitude;
                    console.log(navigatorInfo.latitude);
                    console.log(navigatorInfo.longitude);
                    console.log(navigatorInfo.userAgent);
                    resolve({ 
                        navigatorInfoAttribute : navigatorInfo,
                        messageAttribute: 'ok'
                    });
        
                    }, () => {
                        resolve({ 
                            navigatorInfoAttribute : navigatorInfo,
                            messageAttribute: 'ok'
                        });
                    });
                }else{
                    resolve({ 
                        navigatorInfoAttribute : navigatorInfo,
                        messageAttribute: 'ok'
                    });
                }
            }else{
                resolve('ok');
            }
        }).catch((error) => {
            console.log(error);
            resolve('ok');
        });
    }
}