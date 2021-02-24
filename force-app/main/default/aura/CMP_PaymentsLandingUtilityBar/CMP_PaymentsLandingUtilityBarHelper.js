({
    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Get details of selected payment to pass to edit payment screen
    History:
    <Date>          <Author>            <Description>
    28/07/2020      Bea Hill            Initial version
    */
    getPaymentDetails: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var paymentId = component.get('v.paymentDetails.paymentId')
            var action = component.get('c.getPaymentDetail');
            action.setParam('paymentId', paymentId);
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    if (returnValue.success) {
                    	component.set('v.paymentDetails', returnValue.value.paymentDetail);
                    	resolve('payment details OK');
                    } else {
                        helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
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
                    helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
					reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Pass payment details to the CMP_B2B_Process
    History
    <Date>          <Author>            <Description>
    28/07/2020      Bea Hill            Initial version
    */
    goToEditPayment: function (component, event, helper) {
        try {
            var payment = component.get('v.paymentDetails');
            var page = 'payments-b2b';
            var url = '';
            var source = 'landing-payment-details';
            var paymentId = payment.paymentId;
            if (!$A.util.isEmpty(paymentId)) {
                url = 'c__source=' + source +
                    '&c__paymentId=' + paymentId +
                    '&c__paymentDetails=' + JSON.stringify(payment);
            }
            helper.goTo(component, event, page, url);
        } catch (e) {
            console.log(e);
        }
    },

    /*
    Author:        	Adrian Munio
    Company:        Deloitte
    Description:    Makes the callout to ancel a previously validated transaction, 
                    which removes it from transactional counters for accumulated limits
    History:
    <Date>          <Author>            <Description>	    
    16/09/2020      Adrian Munio        Initial version
    */    
    reverseLimits: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            resolve('ok');
            /* var action = component.get('c.reverseLimits');
            action.setParams({ 
                'operationId': component.get('v.paymentDetails').paymentId,
                'serviceId': 'add_international_payment_internal',
                'paymentData': component.get('v.paymentDetails')
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var  output = response.getReturnValue();
                    if (output.success) {
                        resolve('ok');
                    } else {
                        reject('ko');
                    }
                } else if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' +  errors[0].message);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                    reject('ko');
                }else{
                    console.log('Another error');
                    reject('ko');
                }
            });       
            $A.enqueueAction(action); */
        }), this);
    },

    /*
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Send the status change to the service
    History:
    <Date>          <Author>            <Description>
    15/09/2020      Adrian Munio        Initial version
    23/11/2020		Shahad Naji			Changes status code from '998' value to '990' value
    */
    handleDiscardPayment: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.action', 'Discard');
            var action = component.get('c.sendToService');
            action.setParams({ 
                'paymentId': component.get('v.paymentDetails').paymentId,
                'status': '990',
                'reason': '001'
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var output = response.getReturnValue();
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
    Author:         Antonio Matachana
    Company:        
    Description:    Send the status change to the service and refresh page
    History:
    <Date>          <Author>                <Description>
    09/11/2020      Antonio Matachana       Initial version
    23/11/2020		Shahad Naji				TBD
    */
    cancelSelectedPayment: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.action', 'Cancel');
            var payment = component.get('v.paymentDetails');
            var action = component.get('c.sendToService');
            action.setParams({ 
                'paymentId': payment.paymentId,
                'status': '998',
                'reason': '003'
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var  output = response.getReturnValue();
                    if (output.success) {
                        
                        var msg = $A.get('$Label.c.PAY_ThePaymentHasBeenCanceled');
                        var clientReference = payment.clientReference;
                        msg = msg.replace('{0}', clientReference);
                        helper.showToastMode(component, event, helper, msg, '', false, 'success');
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
        var payment = component.get('v.paymentDetails');
        var action = component.get('c.sendToService');
        action.setParams({ 
            'paymentId': payment.paymentId,
            'status': '001',
            'reason': '000'
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var  output = response.getReturnValue();
                if (output.success) {               
                    
                    payment.paymentStatus = '001';
                    payment.paymentReason = '000';
                    component.set('v.paymentDetails', payment);
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
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Pass payment details to the CMP_B2B_Process
    History:
    <Date>          <Author>            <Description>
    25/08/2020      Adrian Munio        Initial version
    */
    goToReusePayment: function (component, event, helper) {
        try {
            var page = 'payments-b2b';
            var url = '';
            var source = 'landing-payment-details';
            var action = 'Reuse';
            var paymentId = component.get('v.paymentDetails').paymentId;
            url = 'c__source=' + source +
                '&c__paymentId=' + paymentId +
                '&c__action=' + action +
                '&c__paymentDetails=' + JSON.stringify(component.get('v.paymentDetails'));
            helper.goTo(component, event, page, url);
        } catch (e) {
            console.log(e);
        }
    },

    /*
    Author:        	Bea Hill
    Company:        Deloitte
    Description:    Go to page with lightning navigation
    History:
    <Date>          <Author>            <Description>
    28/07/2020      Bea Hill            Adapted from CMP_AccountsCardRow
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
	28/07/2020      Bea Hill            Initial version
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

    reloadFX: function (component, event,  helper, feesBoolean) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var payment = component.get('v.paymentDetails');
            let feesAmount = ($A.util.isEmpty(payment.fees) ? '' : payment.fees);
            let feesCurrency = ($A.util.isEmpty(payment.feesCurrency) ? '' : payment.feesCurrency);
            if (feesBoolean == true && (($A.util.isEmpty(feesAmount) || $A.util.isEmpty(feesCurrency)) || (!$A.util.isEmpty(feesAmount) && (payment.sourceCurrency == feesCurrency)))) {
                resolve('ok');
            } else if (feesBoolean == false && payment.sourceCurrency == payment.beneficiaryCurrency) {
                resolve('ok');
            } else {
                var paymentId = payment.paymentId;
                var accountData = component.get('v.accountData');
                var action = component.get('c.getExchangeRate');
                action.setParams({
                    'paymentId': paymentId,
                    'payment': payment,
                    'accountData': accountData,
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
                            component.set('v.paymentDetails', payment);
                            resolve('ok');
                        } else {
                            helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
                            reject('ko');
                        }
                    } else {
                        helper.showToastMode(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), true, 'error');
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

    getUserData: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getUserData');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var userData = {};
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value.userId)) {
                            userData.userId = stateRV.value.userId;
                        } 
                        if (!$A.util.isEmpty(stateRV.value.isNexus)) {
                            userData.isNexus = stateRV.value.isNexus;
                        } else {
                            userData.isNexus = false; // Añadir un error FLOWERPOWER_PARCHE_MINIGO
                        }
                        if (!$A.util.isEmpty(stateRV.value.numberFormat)) {
                            userData.numberFormat = stateRV.value.numberFormat;
                        }
                        if (!$A.util.isEmpty(stateRV.value.globalId)) {
                            userData.globalId = stateRV.value.globalId;
                        } 
                    }
                    component.set('v.userData', userData);
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
                        } else {
                            accountData.CIB = false;
                        }
                        if (!$A.util.isEmpty(stateRV.value.documentType)) {
                            accountData.documentType = stateRV.value.documentType;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
                            accountData.documentType = 'tax_id';
                        }
                        if (!$A.util.isEmpty(stateRV.value.documentNumber)) {
                            accountData.documentNumber = stateRV.value.documentNumber;
                        } else { // FLOWERPOWER_PARCHE_MINIGO
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
            let payment = component.get('v.paymentDetails');
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
                    helper.showToastMode(component, event, helper, errorProblemLoading, errorCheckConnection, true, 'error');
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    showToastMode: function (component, event, helper, title, body, noReload, mode) {
        var errorToast = component.find('errorToast');
        if (!$A.util.isEmpty(errorToast)) {
            if (mode == 'error') {
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if (mode =='success') {
                //errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', false, false, 'goToPaymentDetail');
            }
        }
    },
    
    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Set showRedo attribute to True to dispaly CMP_B2B_REDOModal
    History:
    <Date>          <Author>            <Description>
    16/09/2020      Shahad Naji         Initial version
    */
    showREDOModal: function (component, event, helper) {
        component.set('v.showRedo', true);
    },

    /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Encryption for page navigation
    History
    <Date>			<Author>			<Description>
    18/11/2020      Beatrice Hill       Adapted from CMP_AccountsCardRow
    */

    goTo: function (component, event, page, url) {
        let navService = component.find("navService");

        if (url != '') {

            this.encrypt(component, url).then(function (results) {

                let pageReference = {
                    type: "comm__namedPage",
                    attributes: {
                        pageName: page
                    },
                    state: {
                        params: results
                    }
                }
                navService.navigate(pageReference);
            });
        } else {
            let pageReference = {
                type: "comm__namedPage",
                attributes: {
                    pageName: page
                },
                state: {
                    params: ''
                }
            }
            navService.navigate(pageReference);

        }

    },

    /*
    Author:        	Beatrice Hill
    Company:        Deloitte
    Description:    Encryption for page navigation
    History
    <Date>			<Author>			<Description>
    18/11/2020      Beatrice Hill       Initial version
    */

    encrypt : function(component, data){  
        var result="null";
        var action = component.get("c.encryptData");
        action.setParams({ str : data });
        return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                reject(response.getError()[0]);
                        }
                        } else {
                        console.log("Unknown error");
                        }
                }else if (state === "SUCCESS") {
                        result = response.getReturnValue();
                }
                        resolve(result);
                });
                $A.enqueueAction(action);
        });
    
    }
 
})