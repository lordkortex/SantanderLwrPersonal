({
    // DO NOT DELETE the following comment lines. They are highly important to get custom labels values
    // $Label.c.PTT_instant_transfer
    // $Label.c.PTT_international_transfer_single
    // $Label.c.Standard
    // $Label.c.PAY_Efficient
    // $Label.c.BookTobook
    // $Label.c.instantTransfer
    // $Label.c.Immediate
    // $Label.c.PAY_ProcessDate

    completeStep: function (component) {
        var completeStep = component.getEvent('completeStep');
        completeStep.setParams({
            'confirm': true
        });
        completeStep.fire();
        component.set('v.isModified', false);
    },

    showToast: function (component, functionTypeText, title, body, noReload) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            errorToast.openToast(false, false, title,  body, functionTypeText, 'warning', 'warning', noReload);
        }
    },

    getPaymentSignatureStructure: function (component, helper) {
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
                        helper.showToast(component, 'Error' ,$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.Problem_Signature_Structure'), true);
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
                        helper.showToast(component,'Error' ,$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.Problem_Signature_Structure'), true);
                    }
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    //	14/01/2021	Shahad Naji		Update payment with baseAmount and baseCurrency pieces of information
    updatePaymentDetails: function (component, helper) {
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
                        helper.showToast(component, 'Error',$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Updating_Data'), true);
                    }
                } else if (actionResult.getState() == 'INCOMPLETE' || actionResult.getState() == 'ERROR') {
                    reject({
                        'message': $A.get('$Label.c.ERROR_NOT_RETRIEVED')
                    });
                    helper.showToast(component, 'Error',$A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true);
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
            let paymentDraft = componetn.get('v.paymentDraft');
            var action = component.get('c.updateStatus');
            action.setParams({
                'paymentId': paymentDraft.paymentId,
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
                        helper.showToast(component, 'Error', $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
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
                        helper.showToast(component, 'Error', $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                    }
                }
            });
            $A.enqueueAction(action);
        }), this);
    },



    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Makes a call to server to validate limits (Based on getLimits method of CMP_B2B_SelectAmount lightning component)
    History:
    <Date>          <Author>            <Description>
    10/12/2020      Shahad Naji         Initial version
    14/01/2021		Shahad Naji 		Save baseAmount and baseCurrency to update payment with their information
    */
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
                            helper.showToast(component, 'Error',notificationTitle, bodyText, false);
                            reject('KO');
                        }
                        if (limitsResult.toLowerCase().localeCompare('ko') == 0 || !$A.util.isEmpty(stateRV.value.errorMessage)) {
                            helper.showToast(component, 'Warning', notificationTitle, label, true);
                            reject('KO');
                        }
                    } else {
                        helper.showToast(component, 'Error',notificationTitle, bodyText, false);
                        reject(stateRV.msg);

                    }
                } else {
                    helper.showToast(component, 'Error',notificationTitle, bodyText, false);
                    reject('ERROR: Limits');
                }
            });
            $A.enqueueAction(action);
        }, this);
    },

    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Set date
    History:
    <Date>          <Author>            <Description>
    28/12/2020      Shahad Naji         Initial version
    */
    setDate : function (component, event, helper) {
        return new Promise(function (resolve, reject) {
            try {
                let transferType = component.get('v.transferType');
                if (!$A.util.isEmpty(transferType)) {
                    let PTT_international_transfer_single = $A.get('$Label.c.PTT_international_transfer_single');
                    if (transferType == PTT_international_transfer_single) {
                        let today = new Date();
                        component.set('v.processDate', today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
                        component.set('v.isCalendarDisabled', true);
                        component.set('v.calendarPlaceholder', $A.get('$Label.c.PAY_ProcessDate'));
                        resolve('ok');
                    } else {
                        resolve('ok');
                    }
                } else {
                    resolve('ok');
                }
            } catch (e) {
                console.error(e);
                console.error('e.name => ' + e.name );
                console.error('e.message => ' + e.message );
                console.error('e.stack => ' + e.stack );
                reject('ko');
            }
        }, this);
    },

    /*
    Author:        Andrea Martin
    Company:        Deloitte
    Description:    Method to show/hide components
    History:
    <Date>          <Author>            <Description>
    28/12/2020      Andrea Martin         Initial version
    */
    //DEPRECATED_MA TO BE DELETED
   /* showHideComponents : function (component, event, helper) {
        return new Promise(function (resolve, reject) {
            try {
                let transferType = component.get('v.transferType');
                let paymentDraft = component.get('v.paymentDraft');
                let sourceAccount = paymentDraft.sourceAccount;
                if(!$A.util.isEmpty(transferType)){
                    let PTT_international_transfer_single = $A.get('$Label.c.PTT_international_transfer_single');
                    if (transferType == PTT_international_transfer_single) {
                        component.set('v.showClientReferenceFistColumn', false);
                        component.set('v.showClientReferenceSecondColumn', true);
                        component.set('v.showProcessDate', true);
                        component.set('v.showPurposeDropdown', false);
                    } else {
                        component.set('v.showClientReferenceFistColumn', true);
                        component.set('v.showClientReferenceSecondColumn', false);
                        component.set('v.showProcessDate', false);
                        component.set('v.showPurposeDropdown', true);
                    }
                } else {
                    component.set('v.showClientReferenceFistColumn', true);
                    component.set('v.showClientReferenceSecondColumn', false);
                    component.set('v.showProcessDate', false);
                    component.set('v.showPurposeDropdown', true);
                }
                if (!$A.util.isEmpty(sourceAccount)) {
                    if (!$A.util.isEmpty(sourceAccount.country)) {
                        if (sourceAccount.country == 'PL') {
                            component.set('v.showComercialCode', false);
                        } else if(sourceAccount.country == 'CL') {
                            component.set('v.showComercialCode', true);
                        } else {
                            component.set('v.showComercialCode', false);
                        }
                    } else {
                        component.set('v.showComercialCode', false);
                    }
                } else {
                    component.set('v.showComercialCode', false);
                }
                resolve('ok');
            } catch(e) {
                console.error(e);
                console.error('e.name => ' + e.name );
                console.error('e.message => ' + e.message );
                console.error('e.stack => ' + e.stack );
                reject('ko');
            }
        }, this);
    },*/

        /*
    Author:        Shahad Naji
    Company:        Deloitte
    Description:    Method to simulate or validate Fraud in a transaction
    History:
    <Date>          <Author>            <Description>
    30/12/2020      Shahad Naji         Initial version
    */
    postFraud: function (component, event, helper) {
        return new Promise(function (resolve, reject) {
            try {
                var action = component.get('c.postFraud');
                var userData = component.get('v.userData');
                var navigatorInfo = component.get('v.navigatorInfo');
                var paymentDraft = component.get('v.paymentDraft');
                action.setParams({
                    userData : userData,
                    navigatorInfo : navigatorInfo,
                    paymentDraft :paymentDraft
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
    /*showHideComponents : function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            try {
                var action = component.get('c.showHideComponents');
                var paymentDraft = component.get('v.paymentDraft');
                var productId;
                var recipientAccountData;
                if(!$A.util.isEmpty(paymentDraft.productId)){
                    productId = paymentDraft.productId;
                }
                
                if(!$A.util.isEmpty(paymentDraft.destinationAccount)){
                    recipientAccountData = paymentDraft.destinationAccount;
                }
                action.setParams({
                    'productId': productId,
                    'recipientAccountData' : recipientAccountData
                });
                action.setCallback(this, function (actionResult) {
                    if (actionResult.getState() == 'ERROR') {
                        var errors = actionResult.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log('Error message: ' + errors[0].message);
                            }
                        } 
                        reject('ko');
                    } else {
                        var stateRV = actionResult.getReturnValue();
                        if (stateRV.success) {                        
                            component.set('v.step3field', stateRV.value.output);
                            if(stateRV.value.paymentPurposeValues != null){
                                let purposeList = [];
                                for (let i = 0; i < stateRV.value.paymentPurposeValues.length; i++) {
                                    let purpose = stateRV.value.paymentPurposeValues[i];
                                    purposeList.push({
                                        'label': purpose,
                                        'value': purpose
                                    })
                                }
                                //helper.createListfunction(component, helper,purposeList,stateRV.value.paymentPurposeValues)
                                component.set('v.paymentPurpose', purposeList);
                            }
                            if(stateRV.value.chargesValues){
                                let chargesList = [];
                                for (let i = 0; i < stateRV.value.chargesValues.length; i++) {
                                    let charges = stateRV.value.chargesValues[i];
                                    chargesList.push({
                                        'label': charges,
                                        'value': charges
                                    })
                                component.set('v.charges', chargesList);
                            	}
                            }
                            resolve('ok');
                        } else {
                            reject('ko');                        
                        }
                    }
                });
                $A.enqueueAction(action);
            } catch(e) {
                console.error(e);
                console.error('e.name => ' + e.name );
                console.error('e.message => ' + e.message );
                console.error('e.stack => ' + e.stack );
                reject('ko');
            }
        }), this);
    },*/
    createListfunction : function(component,helper,list,listValue){
		for (let i = 0; i < listValue.length; i++) {
            let label = listValue[i];
            list.push({
                'label': label,
                'value': label
            })
        }
	},
    setValuePaymentDraft : function(component,event,helper){
		let paymentDraft = component.get('v.paymentDraft');
        paymentDraft.purpose = $A.util.isEmpty(paymentDraft.purpose)  ? '' : paymentDraft.purpose;
    	paymentDraft.reference = $A.util.isEmpty(paymentDraft.reference)  ? '' : paymentDraft.reference;
        paymentDraft.chargeBearer = $A.util.isEmpty(paymentDraft.chargeBearer)  ? '' : paymentDraft.chargeBearer;
        //if(paymentDraft.purpose != '')
		//paymentDraft.purpose = '';
    		//if( paymentDraft.reference != '')
            	//paymentDraft.reference = '';
    		//if( paymentDraft.chargeBearer != '')
            	//paymentDraft.chargeBearer = '';
         component.set('v.paymentDraft', paymentDraft);
	}
})