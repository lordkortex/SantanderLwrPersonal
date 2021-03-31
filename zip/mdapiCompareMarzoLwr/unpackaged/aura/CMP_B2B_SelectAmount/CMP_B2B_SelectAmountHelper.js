({
    completeStep: function (component, event,helper) {
        var completeStep = component.getEvent('completeStep');
        completeStep.setParams({
            'confirm': true
        });
        completeStep.fire();
    },

    /*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Handles amount change and makes call to currency conversion based on which input field the user usede to change the amount
    History
    <Date>          <Author>            <Description>
    2020            Bea Hill            Initial version
    09/11/2020      Bea Hill            Set the attribute amountEnteredFrom
    ----------------------------------------------------------------------------------*/

    handleChangeAmount: function (component, event, helper, amount, amountEnteredFrom) {
        
        var isEditing = component.get('v.isEditing');
        var sourceAccountData = component.get('v.sourceAccountData');
        var recipientAccountData = component.get('v.recipientAccountData');
        if (!$A.util.isEmpty(amount)) {
            new Promise($A.getCallback(function (resolve, reject) {
                component.set('v.disabledContinue', false);
                component.set('v.spinner', true);
                component.set('v.errorMSG', '');
                component.set('v.convertedAmount', '');
                let data = component.get('v.data');
                data.timestamp = '';
                data.exchangeRate = 0;                
                if (amountEnteredFrom.localeCompare('source') == 0) {
                    component.set('v.amountEnteredFrom', amountEnteredFrom);
                    data.amountSend = amount;
                    data.fromOrigin = true;
                    if(!isEditing) {
                        data.amountReceive = null;
                    }
                } else if(amountEnteredFrom.localeCompare('recipient') == 0) {
                    component.set('v.amountEnteredFrom', amountEnteredFrom);
                    data.amountSend = null;
                    data.fromOrigin = false;
                    if(!isEditing) {
                        data.amountReceive = amount;
                    }
                }
                component.set('v.data', data);
                resolve('Ok');
            }), this).then($A.getCallback(function (value) {
                
                if (sourceAccountData.currencyCodeAvailableBalance.localeCompare(recipientAccountData.currencyCodeAvailableBalance) != 0) {
                    return helper.getExchangeRate(component, helper, 'I');
                }else{
                    return 'OK';
                }
                
                
            })).then($A.getCallback(function (value) {
                if(amountEnteredFrom.localeCompare('recipient') == 0){
                    if (sourceAccountData.currencyCodeAvailableBalance.localeCompare(recipientAccountData.currencyCodeAvailableBalance) != 0) {
                        var convertedAmount = component.get('v.convertedAmount');
                        if(!$A.util.isEmpty(convertedAmount)){
                            let data = component.get('v.data');
                         	data.amountSend = convertedAmount; 
                            component.set('v.data', data);
                        }
                    }
                }
                return helper.validateAccount(component, event, helper);
            })).then($A.getCallback(function (value) {                
                return helper.getLimits(component, helper);
            })).catch($A.getCallback(function (error) {
                console.log(error);
                component.set("v.disabledContinue", true);
            })).finally($A.getCallback(function () {
                let data = component.get('v.data');
                let converted = component.get('v.convertedAmount');
                if (!$A.util.isEmpty(converted)) {
                    if (amountEnteredFrom.localeCompare('source') == 0) {
                        data.amountReceive = converted;
                    } else if(amountEnteredFrom.localeCompare('recipient') == 0) {
                        data.amountSend = converted;
                    }
                }
                component.set('v.data', data);
                // helper.checkBalance(component, helper); // FLOWERPOWER_PARCHE_CPC: SE HACE LA COMPROBACION DEL VALIDATEACCOUNTS.
                component.set('v.spinner', false);
            })); 
        }
    },

    getExchangeRate: function (component, helper, requestType) {
        return new Promise(function (resolve, reject) {
            var paymentId = component.get('v.paymentId');
            var paymentData = component.get('v.data');
            var accountData = component.get('v.accountData');
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.recipientAccountData');
            var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            var bodyText =  $A.get('$Label.c.B2B_Error_Enter_Amount');
            var action = component.get('c.getExchangeRate');
            action.setParams({
                'paymentId': paymentId,
                'requestType': requestType,
                'paymentData': paymentData,
                'accountData': accountData,
                'sourceAccountData': sourceAccountData,
                'recipientAccountData': recipientAccountData
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    console.log(stateRV);
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.exchangeRate)) {
                            paymentData.exchangeRate = stateRV.value.exchangeRate;
                            var num = stateRV.value.exchangeRate;
                            num = num.toString(); //If it's not already a String
                            num = num.slice(0, (num.indexOf("."))+5); 
                            paymentData.exchangeRateToShow = num;
                        }  
                        if (!$A.util.isEmpty(stateRV.value.timestamp)) {
                            paymentData.timestamp = stateRV.value.timestamp;
                        }  
                        if (!$A.util.isEmpty(stateRV.value.convertedAmount)) {
                            component.set('v.convertedAmount', stateRV.value.convertedAmount);
                        } 
                        if (!$A.util.isEmpty(stateRV.value.output)) {
                            paymentData.exchangeRateServiceResponse = stateRV.value.output;
                        }      
                        component.set('v.data', paymentData);
                        resolve('OK');
                    } else {
                        reject(stateRV.msg);
                        helper.showToast(component, notificationTitle, bodyText, true);
                    }
                } else {
                    reject('ERROR: FX');
                    helper.showToast(component, notificationTitle, bodyText, true);
                }
            });
            $A.enqueueAction(action);
        }, this);
    },

    getTransferFees: function (component, event, helper) {
        return new Promise(function (resolve, reject) {
            var paymentId = component.get('v.paymentId');
            var data = component.get('v.data');
            var userData = component.get('v.userData');
            var accountData = component.get('v.accountData');
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.recipientAccountData');
            var action = component.get('c.getTransferFees');
            var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            var bodyText =  $A.get('$Label.c.B2B_Error_Continue_Button');
            action.setParams({
                'paymentId': paymentId,
                'paymentData': data,
                'userData': userData,
                'accountData': accountData,
                'sourceAccountData': sourceAccountData,
                'recipientAccountData': recipientAccountData
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.originalTransactionFee)) {
                            data.transactionFee = stateRV.value.originalTransactionFee;
                            data.transactionFeeCurrency = stateRV.value.originalTransactionFeeCurrency;
                            data.transactionFeeServiceResponse = stateRV.value.transactionFeeServiceResponse;
                            data.convertedTransactionFee = stateRV.value.convertedTransactionFee;
                            data.convertedTransactionFeeCurrency = stateRV.value.convertedTransactionFeeCurrency;
                            data.convertedTransactionFeeServiceResponse = stateRV.value.exchangeRateServiceResponse;
                        }
                        component.set('v.data', data);
                        resolve('OK');
                    } else {
                        reject(stateRV.msg);
                        component.set('v.spinner', false);
                        helper.showToast(component, notificationTitle, bodyText, true);
                    }
                } else {
                    reject('ERROR: Special Prices');
                    component.set('v.spinner', false);
                    helper.showToast(component, notificationTitle, bodyText, true);
                }
            });
            $A.enqueueAction(action);
        }, this);
    },

    getLimits: function (component, helper) {
        return new Promise(function (resolve, reject) {
            var paymentId = component.get('v.paymentId');
            var data = component.get('v.data');
            var userData = component.get('v.userData');
            var accountData = component.get('v.accountData');
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.recipientAccountData');
            var action = component.get('c.getLimits');
            var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            var bodyText =  $A.get('$Label.c.B2B_Error_Enter_Amount');
            var label = $A.get('$Label.c.B2B_Error_Amount_Exceeds_Limits');
            var limitsResult = '';
            action.setParams({
                'paymentId': paymentId,
                'paymentData': data,
                'userData': userData,
                'accountData': accountData,
                'sourceAccountData': sourceAccountData,
                'recipientAccountData': recipientAccountData
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.limitsResult)) {
                            limitsResult = stateRV.value.limitsResult;
                        }       
                        if (limitsResult.toLowerCase().localeCompare('ko') == 0 || !$A.util.isEmpty(stateRV.value.errorMessage)) {
                            var error = component.get('v.errorMSG');
                            if (!error.includes(label)) {
                                if($A.util.isEmpty(error)) {
                                    component.set('v.errorMSG', label);
                                } else {
                                    component.set('v.errorMSG', error + '-' + label);
                                }
                            }
                        }
                		// component.set("v.disabledContinue", false);
                        resolve('OK');
                    } else {
                        reject(stateRV.msg);
                        component.set('v.spinner', false);
                        helper.showToast(component, notificationTitle, bodyText, true);
                    }
                } else {
                    reject('ERROR: Limits');
                    component.set('v.spinner', false);
                    helper.showToast(component, notificationTitle, bodyText, true);
                }
            });
            $A.enqueueAction(action);
        }, this);
    },

    /* checkBalance: function (component, helper) {
        let amountUnavailable = false;
        var label = $A.get('$Label.c.B2B_Error_Amount_Exceeds_Balance');
        let availableBalance = component.get('v.sourceAccountData.amountAvailableBalance');
        let requestedAmount = component.get('v.data.amountSend');
        if (!$A.util.isEmpty(availableBalance)) {
            if (availableBalance < requestedAmount) {
                amountUnavailable = true;
            }
        } else {
            amountUnavailable = false;
            var error = component.get('v.errorMSG');
            if (!error.includes(label)) {
                if($A.util.isEmpty(error)) {
                    component.set('v.errorMSG', label);
                } else {
                    component.set('v.errorMSG', error + '-' + label);
                }
            } 
        }
        component.set('v.amountUnavailable', amountUnavailable);
    }, */

    showToast: function (component, notificationTitle, bodyText, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, notificationTitle, bodyText, 'Error', 'warning', 'warning', noReload);
        }
    },

    validateAccount: function (component, event,helper) {
        return new Promise(function (resolve, reject) {
            let sourceAccount = component.get('v.sourceAccountData');
            let data = component.get('v.data');
            let label = $A.get('$Label.c.B2B_Error_Amount_Exceeds_Balance');
            let action = component.get('c.accountValidation');
            action.setParams({
                'sourceAccount': sourceAccount,
                'amount': data.amountSend
            });
            action.setCallback(this, function (actionResult) {
                let notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
                let bodyText =  $A.get('$Label.c.B2B_Error_Check_Connection');
                if (actionResult.getState() == 'SUCCESS') {
                    let returnValue = actionResult.getReturnValue();
                    if (!returnValue.success) {
                        helper.showToast(component, notificationTitle, bodyText, true);
                    } else {
                		// component.set("v.disabledContinue", false);
                        if (returnValue.value.amountResult != 'OK') {
                            let error = component.get('v.errorMSG');
                            if (!error.includes(label)) {
                                if($A.util.isEmpty(error)) {
                                    component.set('v.errorMSG', label);
                                } else {
                                    component.set('v.errorMSG', error + '-' + label);
                                }
                            } 
                        }
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    helper.showToast(component, notificationTitle, bodyText, true);
                    let errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                }
                resolve('ok');
            });
            $A.enqueueAction(action);
        }, this);
    },

    /*----------------------------------------------------------------------------------
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Sends the details of this step to be saved to the payment
    History
    <Date>          <Author>            <Description>
    07/08/2020      Bea Hill            Initial version for CMP_B2B_PaymentInformation
    12/08/2020      Bea Hill            Adapted for CMP_B2B_SelectAmount
    09/11/2020      Bea Hill            Send recipient account data and amountEnteredFrom to indicate the field (FROM or TO) in which the user defined the amount.
    ----------------------------------------------------------------------------------*/
    updatePaymentDetails : function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var paymentId = component.get('v.paymentId');
            var accountData = component.get('v.accountData');
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.recipientAccountData');
            var userInputField = component.get('v.amountEnteredFrom');
            var paymentData = component.get('v.data');
            var action = component.get('c.updateSelectAmount');
            action.setParams({
                'paymentId': paymentId,
                'accountData': accountData,
                'paymentData': paymentData,
                'sourceAccountData': sourceAccountData,
                'recipientAccountData': recipientAccountData,
                'userInputField': userInputField
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        resolve('OK');
                    } else {
                        var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
                        var bodyText =  $A.get('$Label.c.B2B_Error_Updating_Data');
                        helper.showToast(component, notificationTitle, bodyText, true);
                        reject(stateRV.msg);
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('problem updating step 3 payment details');
                    }
                    helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true);
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                } else {
                    helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true);
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },
    
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Function to call by "setInputAmount" method of "sourceAmountInput" and "recipientAmountInput" children components
    History
    <Date>			<Author>			<Description>
    15/10/2020		Shahad Naji   		Initial version
    */
    showInformation : function (component, event, helper) { 
        return new Promise($A.getCallback(function (resolve, reject) {
            var data = component.get('v.data');
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.recipientAccountData');
            var CMP_amountSend = component.find('sourceAmountInput');
            if(CMP_amountSend != null && CMP_amountSend != undefined){
                CMP_amountSend.setInputAmount('sourceAmountInput', data.amountSend);
                
            }
            if(!$A.util.isEmpty(sourceAccountData) && !$A.util.isEmpty(recipientAccountData)){
                if(!$A.util.isEmpty(sourceAccountData.currencyCodeAvailableBalance) && !$A.util.isEmpty(recipientAccountData.currencyCodeAvailableBalance)){
                    if(sourceAccountData.currencyCodeAvailableBalance != recipientAccountData.currencyCodeAvailableBalance){
                        var CMP_amountReceive = component.find('recipientAmountInput');
                        if(CMP_amountReceive != null && CMP_amountReceive != undefined){               
                            CMP_amountReceive.setInputAmount('recipientAmountInput', data.amountReceive);
                        }
                    }
                }                
            }
            resolve('OK');
        }), this);
    },
    
    /*
	Author:        	Antonio Matachana
    Company:        
	Description:    Format sourceAccountData.lastUpdateAvailableBalance and recipientAccountData.lastUpdateAvailableBalance
    History
    <Date>			<Author>			<Description>
    06/11/2020		Antonio Matachana   		Initial version
    */
    formatUpdatedDate : function (component, event, helper) {
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.recipientAccountData');
            var timeSourceBalance = component.get('v.timeSourceBalance');
            var timeRecipientBalance = component.get('v.timeRecipientBalance');

            if(!$A.util.isEmpty(sourceAccountData) && !$A.util.isEmpty(recipientAccountData)){
                var issueTimeSource = $A.localizationService.formatTime(sourceAccountData.lastUpdateAvailableBalance, 'HH:mm');
                component.set('v.timeSourceBalance',  issueTimeSource);  
                var issueTimeRecipient = $A.localizationService.formatTime(recipientAccountData.lastUpdateAvailableBalance, 'HH:mm');
                component.set('v.timeRecipientBalance',  issueTimeRecipient);  
            }
         
     }
})