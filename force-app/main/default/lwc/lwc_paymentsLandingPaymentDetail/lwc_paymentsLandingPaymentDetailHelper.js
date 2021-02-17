// appHelper.js


//import getPaymentDetail from '@salesforce/apex/CNT_PaymentTemporal.getPaymentDetailTempMain';
import getPaymentDetail from '@salesforce/apex/CNT_PaymentsPaymentDetail.getPaymentDetail';
import decryptData from '@salesforce/apex/CNT_PaymentsPaymentDetail.decryptData';
import encryptData from '@salesforce/apex/CNT_PaymentsPaymentDetail.encryptData';
import getSignLevel from '@salesforce/apex/CNT_PaymentsPaymentDetail.getSignLevel';
import getUserData from '@salesforce/apex/CNT_PaymentsPaymentDetail.getUserData';
import getAccountData from '@salesforce/apex/CNT_PaymentsPaymentDetail.getAccountData';
import updatePaymentStatusReason from '@salesforce/apex/CNT_PaymentsPaymentDetail.updatePaymentStatusReason';
import getExchangeRate from '@salesforce/apex/CNT_PaymentsPaymentDetail.getExchangeRate';
import validateAccount from '@salesforce/apex/CNT_PaymentsPaymentDetail.validateAccount';
import reverseLimits from '@salesforce/apex/CNT_PaymentsPaymentDetail.reverseLimits';


export const helper = {

  
    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Get payment details
    History:
    <Date>          <Author>            <Description>
    30/07/2020      Bea Hill            Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
    */
    getURLParams(event) {
        return new Promise((resolve, reject) => {
            try {
                var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
                var sURLVariablesMain = sPageURLMain.split('&')[0].split("=");
                var sParameterName;
                var sPageURL;

                var currentUserValue;
                var paymentIDValue;

                if (sURLVariablesMain[0] == 'params') {
                    if (sURLVariablesMain[1] != '' && sURLVariablesMain[1] != undefined && sURLVariablesMain[1] != null) {
                        this.decrypt(sURLVariablesMain[1]).then( (results) => {    
                            sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                            var sURLVariables = sPageURL.split('&');
                            
                            for (var i = 0; i < sURLVariables.length; i++) {
                                sParameterName = sURLVariables[i].split('=');

                                console.log('sParameterName[0] :' +  sParameterName[0]);
                                console.log('sParameterName[1] :' +  sParameterName[1]);

                                switch (sParameterName[0]) {
                                    case ('c__currentUser'):
                                        sParameterName[1] === undefined ? 'Not found' : currentUserValue = JSON.parse(sParameterName[1]);
                                        break;
                                    case ('c__paymentID'):
                                        sParameterName[1] === undefined ? 'Not found' : paymentIDValue = sParameterName[1];
                                        break;
                                }
                            }
                            resolve({ currentUserAttribute: currentUserValue, paymentIDAttribute: paymentIDValue, messageAttribute: 'La ejecucion ha sido correcta.' });
                            //resolve('La ejecucion ha sido correcta.');
                        });
                    }
                }
            } catch (e) {
                console.log(e);
                reject(e);
                //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                //reject(label.ERROR_NOT_RETRIEVED);
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
    getPaymentDetails  (event,paymentID) {
        return new Promise( (resolve, reject)  => {
            getPaymentDetail({ //getPaymentDetail({ 
                paymentId : paymentID
            })
            .then(actionResult => {
                    var returnValue = actionResult;
                    console.log(returnValue);
                    if (returnValue.success) {
                        console.log(returnValue.value.paymentDetail);
                        //this.payment = returnValue.value.paymentDetail;
                        //resolve('La ejecucion ha sido correcta.');
                        resolve({ paymentDetailAttribute: returnValue.value.paymentDetail, messageAttribute: 'La ejecucion ha sido correcta.' });
                    } else {
                        //helper.showToast(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, false);
                        reject(label.ERROR_NOT_RETRIEVED);
                    }
            }).catch(errors => {
                console.log('Error message: ' + errors);
                reject(errors);
                //helper.showToast(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, false);
                //reject(label.ERROR_NOT_RETRIEVED);
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
    encrypt(data) {
        try {
            var result = "null"; 
            return new Promise((resolve, reject) => {
                encryptData({ 
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
    Description:    Sets attribute to control which buttons are enabled
    History:
    <Date>          <Author>            <Description>
    27/07/2020      Bea Hill            Initial version 
    15/09/2020      Shahad Naji         Changes buttons matrix
    */
   configureButtons (event, paymentDetails, currentUser,signLevel) {
        return new Promise( (resolve, reject) => {
            let status = paymentDetails.paymentStatus;
            let reason = ''
            //if (!$A.util.isEmpty(paymentDetails.paymentReason)) {
            if (paymentDetails.paymentReason != undefined) {
                reason = paymentDetails.paymentReason;
            }
            let currentUserGlobalId = currentUser.globalId;
            let creatorUserId = '';
            //if (!$A.util.isEmpty(paymentDetails.userGlobalId)) {
            if (paymentDetails.userGlobalId != undefined) {
                    creatorUserId = paymentDetails.userGlobalId;
            }
            //let signature = component.get('v.signLevel'); // Need to get this list of authorizers from payment details service
            let signature = signLevel; // Need to get this list of authorizers from payment details service
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
                    //no aparece para usuarios front
                } else if (reason == '103') {
                    // 999-103 ha cambiado a 999-002
                }
            }
            resolve({ actionsAttribute: actions, messageAttribute: 'La ejecucion ha sido correcta.' });

        }, this);
    },


    /*
    Author:        	R. cervinpo
    Company:        Deloitte
    Description:    Get payment sign level
    History:
    <Date>          <Author>            <Description>
    30/07/2020      R. Cervino          Initial version
    */
   getSignatureLevel (event,paymentID) {
        return new Promise((resolve, reject) => {
            getSignLevel({ 
                paymentId : paymentID 
            })
            .then(actionResult => {
                var returnValue = actionResult;
                if(!returnValue === undefined){
                    console.log(returnValue); 
                }
                resolve({ signLevelAttribute: actionResult, messageAttribute: 'La ejecucion ha sido correcta.' });
            }).catch(errors => {
                console.log('Error message: ' + errors);
                reject(errors);

            });
        });
    },


    /*showToastMode (event, helper, title, body, noReload, mode) {
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
    },*/
	

    /*
    Author:         R. cervinpo
    Company:        Deloitte
    Description:    Check if the account is blocked and if it has enough available money
    History:
    <Date>          <Author>            <Description>
    12/08/2020      R. Cervino          Initial version
    01/11/2020      Candido             Refactor and add accountIdType to WS
    */
   checkAccounts (event,payment) {
        return new Promise((resolve, reject) => {
            //let payment = component.get('v.payment');
            let amount = 0;
            if (payment.amount != undefined) {
                amount = parseFloat(payment.amount);
            }
            if (payment.amountOperativeDRAFT != undefined) {
                amount = parseFloat(payment.amountOperativeDRAFT);
            }
            let fees = 0;
            if (payment.fees != undefined) {
                fees = parseFloat(payment.fees);
            }
            if (payment.feesDRAFT != undefined) {
                fees = parseFloat(payment.feesDRAFT);
            }
            var totalAmount = amount + fees;

            validateAccount({ 
                payment : payment,
                amount : totalAmount
            })
            .then( actionResult => {
                    //let errorProblemLoading = $A.get('$Label.c.B2B_Error_Problem_Loading');
                    //let errorCheckConnection = $A.get('$Label.c.B2B_Error_Check_Connection');
                    //let contactSupport = $A.get('$Label.c.B2B_Error_Contact_Support');

                    let returnValue = actionResult;
                    if (!returnValue.success) {
                        //helper.showToastMode(component, event, helper, errorProblemLoading, errorCheckConnection, false, 'error');
                        reject('ko');
                    } else {
                        if (returnValue.value.statusResult != 'OK') {
                            //helper.showToastMode(component, event, helper, errorProblemLoading, contactSupport, true, 'error');
                            reject('ko');
                        } else if (returnValue.value.amountResult != 'OK') {
                            //helper.showToastMode(component, event, helper, errorProblemLoading, contactSupport, true, 'error');
                            reject('ko');
                        } else {
                            resolve('La ejecucion ha sido correcta.');
                        }
                    }
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    reject(errors);
                    //helper.showToast(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, false);
                    //reject(label.ERROR_NOT_RETRIEVED);
                });
        }, this);
    },


    /*
    Author:         Antonio Matachana
    Company:        
    Description:    Send the status change to the service when edit payment from pending status
    History:
    <Date>          <Author>                <Description>
    20/11/2020      Antonio Matachana       Initial version
    */
   reloadFX (event, feesBoolean, paymentIDInput, paymentInput, accountDataInput) {
        return new Promise( (resolve, reject) => {
            let paymentIdVar = paymentIDInput;
            let feesAmount = (paymentInput.fees != undefined ? '' : paymentInput.fees);
            let feesCurrency = ( paymentInput.feesCurrency != undefined  ? '' : paymentInput.feesCurrency);
            if (feesBoolean == true && (feesAmount != undefined || feesCurrency  != undefined || ( feesAmount  != undefined   && (paymentInput.sourceCurrency == feesCurrency)))) {
                resolve('ok');
            } else if (feesBoolean == false && paymentInput.sourceCurrency == paymentInput.beneficiaryCurrency) {
                resolve('ok');
            } else {
                getExchangeRate({ 
                    paymentId : paymentIdVar,
                    accountData : accountDataInput,
                    payment : paymentInput,
                    feesBoolean : feesBoolean
                })
                .then( actionResult => {
                        let stateRV = actionResult;//.getReturnValue();
                        if (stateRV.success != undefined && stateRV.success) {
                            if (feesBoolean == true) {
                                if (stateRV.value.convertedAmount != undefined && stateRV.value.convertedAmount != null ) {
                                    paymentInput.feesDRAFT = stateRV.value.convertedAmount;
                                }
                                if (stateRV.value.output != undefined && stateRV.value.output != null) {
                                    paymentInput.FXFeesOutputDRAFT = stateRV.value.output;
                                }
                                if (stateRV.value.fxTimer != undefined && stateRV.value.fxTimer != null) {
                                    paymentInput.feesFXDateTimeDRAFT = this.getCurrentDateTime(event);
                                }
                            } else {
                                if (stateRV.value.exchangeRate != undefined && stateRV.value.exchangeRate != null ) {
                                    paymentInput.tradeAmountDRAFT = stateRV.value.exchangeRate;
                                    paymentInput.operationNominalFxDetails.customerExchangeRateDRAFT = stateRV.value.exchangeRate;
                                }  
                                if (stateRV.value.timestamp != undefined && stateRV.value.timestamp != null) {
                                    paymentInput.timestampDRAFT = stateRV.value.timestamp;
                                }  
                                if (stateRV.value.convertedAmount != undefined && stateRV.value.convertedAmount != null) {
                                    paymentInput.convertedAmountDRAFT = stateRV.value.convertedAmount;
                                    paymentInput.amountOperativeDRAFT = stateRV.value.convertedAmount;
                                    
                                    if(stateRV.value.amountObtained == 'send'){
                                        paymentInput.amountSendDRAFT = stateRV.value.convertedAmount;
                                    }
                                    if(stateRV.value.amountObtained == 'received'){
                                        paymentInput.amountReceiveDRAFT = stateRV.value.convertedAmount;
                                    }
                                }
                                if (stateRV.value.output != undefined && stateRV.value.output != null ) {
                                    paymentInput.FXoutputDRAFT = stateRV.value.output;
                                }
                                
                                
                                if (stateRV.value.fxTimer != undefined && stateRV.value.fxTimer != null) {
                                    paymentInput.FXDateTimeDRAFT = stateRV.value.fxTimer;
                                }
                            }
                            //component.set('v.payment', payment);
                            resolve({ paymentAttribute: paymentInput, messageAttribute: 'ok' });
                        } else {
                            //helper.showToastMode(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, true, 'error');
                            reject('ko');
                        }
                })
                .catch(errors => {
                    console.log('Error message: ' + errors);
                    reject(errors);
                    //helper.showToastMode(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, true, 'error');
                    //reject('ko');
                });   
            }
        }, this);
    },


    /*
    Author:         Antonio Matachana
    Company:        
    Description:    Send the status change to the service when edit payment from pending status
    History:
    <Date>          <Author>                <Description>
    20/11/2020      Antonio Matachana       Initial version
    */
   getCurrentDateTime (event) {
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
                    }
                    resolve({ userDataAttribute: userData, messageAttribute: 'La ejecucion ha sido correcta.' });
            }).catch(errors => {
                console.log('Error message: ' + errors);
                reject(errors);
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
                    if (stateRV.success) {
                        if ( stateRV.value.cib != undefined ) {
                            accountData.CIB = stateRV.value.cib;
                        } else { // FLOWERPOWER_PARCHE_CPC
                            accountData.CIB = false;
                        }
                        if ( stateRV.value.documentType != undefined ) {
                            accountData.documentType = stateRV.value.documentType;
                        } else { // FLOWERPOWER_PARCHE_CPC
                            accountData.documentType = 'tax_id';
                        }
                        if ( stateRV.value.documentNumber != undefined ) {
                            accountData.documentNumber = stateRV.value.documentNumber;
                        } else { // FLOWERPOWER_PARCHE_CPC
                            accountData.documentNumber = 'B86561412';
                        }
                    }
                    resolve({ accountDataAttribute: accountData, messageAttribute: 'La ejecucion ha sido correcta.' });
            }).catch(errors => {
                console.log('Error message: ' + errors);
                reject(errors);
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
    notificationSent(event) {
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
   reverseLimits (event,payment){
        return new Promise((resolve, reject) => {
            reverseLimits({ 
                paymentData : payment
            })
            .then(response => {
                var  output = response;
                if (output != undefined  && output != null && output.success) {
                    let ok = 'ok';
                    if(output.value != undefined && output.value != null && output.value != ''){
                        if (output.value.limitsResult.toLowerCase() != ok.toLowerCase()) { 
                            resolve('ok'); 
                        }else{
                            //helper.showToastMode(event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, true, 'error');
                            reject('ko');
                        }
                    }else{
                        resolve('ok'); 
                    }     
                } else {
                    //helper.showToastMode(event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, true, 'error');
                    reject('ko');
                }
            }).catch(errors => {
                //helper.showToast(event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, false);
                console.log('Error message: ' + errors);
                reject('ko');
            });          
        }, this);
    },
    


    /*
    Author:        	Adrian Munio
    Company:        Deloitte
    Description:    Send the status change to the service
    History:
    <Date>          <Author>            <Description>
    15/09/2020      Adrian Munio        Initial version
    */
   handleDiscardPayment (event,payment) {
        return new Promise((resolve, reject) => {
            updatePaymentStatusReason({ 
                paymentId : payment.paymentId,
                status : '990',
                reason : '001'
            })
            .then(response => {
                var  output = response;
                if (output.success) {
                    resolve('ok');
                } else {
                    //helper.showToastMode(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, true, 'error');
                    reject('ko');
                }
            }).catch(errors => {
                console.log('Error message: ' + errors);
                reject(errors);

                //helper.showToast(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, false);
                //reject('ko');
            });     
        }, this);
    },


    /*
    Author:        	Antonio Matachana
    Company:        
    Description:    Send the status change to the service and refresh page
    History:
    <Date>          <Author>            <Description>
    09/11/2020      Antonio Matachana      
    */
    cancelSelectedPayment (event,payment) {
        return new Promise( (resolve, reject) => {
            //component.set('v.action', 'Cancel');
            updatePaymentStatusReason({ 
                paymentId : payment.paymentId,
                status : '998',
                reason : '003'
            })
            .then(response => {
                var  output = response;
                if (output.success) {
                    /* 
                        var msg = $A.get('$Label.c.PAY_ThePaymentHasBeenCanceled');
                        var clientReference = payment.clientReference;
                        msg = msg.replace('{0}', clientReference);
                        helper.showToastMode(component, event, helper, msg, '', true, 'success');
                    */
                      
                    resolve('ok');
					//$A.get('e.force:refreshView').fire();
                } else {
                    //helper.showToastMode(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, true, 'error');
                    reject('ko');
                }
            }).catch(errors => {
                console.log('Error message: ' + errors);
                reject(errors);

                //helper.showToast(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, false);
                //reject('ko');

            });          
        }, this);
    },


    /*
    Author:         Antonio Matachana
    Company:        
    Description:    Send the status change to the service when edit payment from pending status
    History:
    <Date>          <Author>                <Description>
    20/11/2020      Antonio Matachana       Initial version
    */
    updateStatusEditPayment(event,paymentIDparam) {
        return new Promise( (resolve, reject) => {
            //component.set('v.action', 'Cancel');
            //var payment = component.get('v.paymentDetails'); // Esto ha estado comentado siempre
            var paymentID = paymentIDparam;

            updatePaymentStatusReason({ 
                paymentId : paymentID,
                status : '001',
                reason : '000'
            })
            .then( response => {
                    var  output = response;
                    if (output.success) {
                        /*payment.paymentStatus = '001';
                        payment.paymentReason = '000';
                        component.set('v.payment', payment);*/
                        resolve('ok');
                    } else {
                        //helper.showToastMode(component, event, helper, label.B2B_Error_Problem_Loading, label.c.B2B_Error_Check_Connection, true, 'error');
                        reject('ko');
                    }
            })
            .catch(errors => {
                console.log('Error message: ' + errors);
                reject(errors);

                //helper.showToast(component, event, helper, label.B2B_Error_Problem_Loading, label.B2B_Error_Check_Connection, false);
                //reject('ko');

            });          
            
        }, this);
    },


    /*
    Author:        	Adrian Munio
    Company:        Deloitte
    Description:    Go to Discard page on clicking 'Discard' button
    History:
    <Date>          <Author>            <Description>
    14/09/2020      Adrian Munio        Initial version
    */
   goToDiscard(event,payment) {
        //PARCHE_FLOWERPOWER JHM DESCARTAR PAGO DESDE DETALLE DEL PAGO Y RECARGAR PAGINA ACTUAL SIN SALIR DEL DETALLE DEL PAGO
        return new Promise( (resolve, reject) => {   
            //this.spinner = true;    
            return this.reverseLimits(event,payment)
            .then( value => { 
                return this.handleDiscardPayment(event,payment);
            })
            .catch( error => {
                console.log('Error discard: ' + error);
                reject('ko');
            })
            .finally( () => {
                //this.spinner = false;
                resolve('ok');
            });
        }, this); 
    
    }


   

}