({
    completeStep: function (component) {
        var completeStep = component.getEvent('completeStep');
        completeStep.setParams({
            'confirm': true
        });
        completeStep.fire();
        component.set('v.isModified', false);
    },

    showToast: function (component, title, body, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
        }
    },
    
    
    showWarningToast: function (component, title, body, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, title,  body, 'Warning', 'warning', 'warning', noReload);
        }
    },


    getPaymentSignatureStructure: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getSignatureStructure');
            var user = component.get('v.userData');
            var amount = component.get('v.amountChangeData');
            var sourceAccount = component.get('v.sourceAccountData');
            //26/10/2020 - Shahad Naji - ServiceAPILine 
            var isNexus = user.cashNexus || user.multiOneTrade;
            action.setParams({ 
                'isNexus': isNexus,
                'paymentID': component.get('v.paymentId'),
                'service_id': 'add_international_payment_internal',
                'tcurrency': sourceAccount.currencyCodeAvailableBalance,
                'customerId': sourceAccount.codigoCorporate,
                'channel': 'WEB',
                'amount': amount.amountSend
            }); 
            action.setCallback(this, function (actionResult) {
                 if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                    	helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.Problem_Signature_Structure'), true);
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
                        helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.Problem_Signature_Structure'), true);
                    }
                }
            });
            $A.enqueueAction(action);
        }), this);   
    },

    updatePaymentDetails: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var clientReference = null;
            var purpose = null;
            var description = null;
            var paymentId =  null;
            var chargeBearer = null;
            var paymentMethod = null; 
            var comercialCode = null;
            var data = component.get('v.data');
            if (!$A.util.isEmpty(data)) {
                if (!$A.util.isEmpty(data.reference)) {
                    clientReference = data.reference;
                }
                if (!$A.util.isEmpty(data.purpose)) {
                    purpose = data.purpose;
                }
                if (!$A.util.isEmpty(data.description)) {
                    description = data.description;
                }
                if (!$A.util.isEmpty(data.comercialCode)) {
                    comercialCode = data.comercialCode;
                }
            }
            let tPaymentId = component.get('v.paymentId');
            if (!$A.util.isEmpty(tPaymentId)) {
                paymentId = tPaymentId;
            }
            chargeBearer = 'OUR'; // Siempre 'OUR' para Book To Book. Posibles valores 'OUR'-nuestro, 'SHA'-compartido, 'BEN'-recipiente
            paymentMethod = 'book_to_book'; // Pendiente de confirmación del valor, es el método seleccionado por el usuario en las tarjetas en este paso
            var action = component.get('c.updatePaymentInformation');
            action.setParams({
                'paymentId': paymentId,
                'clientReference': clientReference,
                'purpose': purpose,
                'description': description,
                'chargeBearer': chargeBearer,
                'paymentMethod': paymentMethod,
                'commercialCode': comercialCode
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
                        helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Updating_Data'), true);
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
                    helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true);
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    /*
    Author:        	Candido
    Company:        Deloitte
    Description:    Call API to check the FCC Dow Jones
    History:
    <Date>          <Author>            <Description>  
    07/08/2020      Candido             Initial version
    */
    checkFCCDowJones: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var description = null;
            var data = component.get('v.data');
            if (!$A.util.isEmpty(data)) {
                if (!$A.util.isEmpty(data.description)) {
                    description = data.description;
                }
            }
            let paymentId = component.get('v.paymentId');
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.recipientAccountData');
            var action = component.get('c.checkFCCDowJones');
            action.setParams({
                'paymentId': paymentId,
                'description': description,
                'sourceAccountData':sourceAccountData,
                'recipientAccountData':recipientAccountData
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
                        helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Updating_Data'), true);
                    }
                } else if (actionResult.getState() == 'INCOMPLETE' || actionResult.getState() == 'ERROR') {
                    reject({
                        'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                    });
                    helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true);
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
    handleFCCError: function (component, helper) {
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

    /*
    Author:        	R. Cervino
    Company:        Deloitte
    Description:    Encryption for page navigation
    History:
    <Date>          <Author>            <Description>
    18/06/2020      R. Cervino          Initial version - adapted from B2B
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

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Make call to server to update payment status
    History:
    <Date>          <Author>            <Description>  
    07/08/2020      Bea Hill            Initial version
    */
   	updateStatus: function (component, helper, status, reason) {
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
                        helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                    }
                    reject({
                        'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                    });
                } else {
                    var stateRV = actionResult.getReturnValue();
                    console.log(stateRV);
                    if (stateRV == 'OK') {
                        resolve('OK');
                    } else {
                        reject({
                            'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                        });
                        helper.showToast(component, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                    }
                }
            });
            $A.enqueueAction(action);
        }), this);   
    },
      /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Makes call to server to validate limits
    				(Based on getLimits method of CMP_B2B_SelectAmount 
                    lightning component)
    History:
    <Date>          <Author>            <Description>  
    10/12/2020      Shahad Naji            Initial version
    */
    getLimits: function (component, event, helper) {
        return new Promise(function (resolve, reject) {
            var paymentId = component.get('v.paymentId');            
            var data = component.get('v.amountChangeData');            
            var userData = component.get('v.userData');            
            var accountData = component.get('v.accountData');            
            var sourceAccountData = component.get('v.sourceAccountData');
            var recipientAccountData = component.get('v.recipientAccountData');
            var action = component.get('c.getLimits');
            var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            var bodyText =  $A.get('$Label.c.B2B_Error_Check_Connection');
            var label = $A.get('$Label.c.PAY_Error_Amount_Exceeds_Limits');
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
                        if (!$A.util.isEmpty(stateRV.value.limitsResult) && $A.util.isEmpty(stateRV.value.errorMessage)) {
                            limitsResult = stateRV.value.limitsResult;
                            resolve('OK');
                        }       
                        if (limitsResult.toLowerCase().localeCompare('ko') == 0 || !$A.util.isEmpty(stateRV.value.errorMessage)) {
                            helper.showWarningToast(component, notificationTitle, label, true);
                            reject('KO');                          
                        }
                    } else {
                        helper.showToast(component, notificationTitle, bodyText, false);
                        reject(stateRV.msg);
                        
                    }
                } else {
                    helper.showToast(component, notificationTitle, bodyText, false);
                    reject('ERROR: Limits');
                }
            });
            $A.enqueueAction(action);
        }, this);
    }

})