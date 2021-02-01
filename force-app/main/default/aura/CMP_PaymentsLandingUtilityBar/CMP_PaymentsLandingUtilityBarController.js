({
    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Initialize the utility bar, configuring which buttons are available
    History:
    <Date>          <Author>            <Description>
    27/07/2020      Bea Hill            Initial version
    */
    doInit: function (component, event, helper) {
        helper.getAccountData(component, event, helper)
        .then($A.getCallback(function (value) {
            helper.getUserData(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log('Error doInit: ' + error);
        }));
    },

    showSubmenu: function (component, event, helper) {
        let isOpen = component.get('v.showSubmenu');
        if (isOpen == true) {
            component.set('v.showSubmenu', false);
        } else {
            component.set('v.showSubmenu', true);
        }
    },

    closeSubmenu: function (component, event, helper) {        
        component.set('v.showSubmenu', false);
    },

    clearSelection: function (component, event, helper) {   
        var clearSelectionEvent = component.getEvent('clearSelection');
        clearSelectionEvent.fire();
    },

    goToRedo: function (component, event, helper) {
        component.set('v.showRedo', true);
    },

    edit: function (component, event, helper) {
        component.set('v.spinner', true);
        var promise_aux = new Promise(function(resolve){
            resolve('OK');
        });
        helper.getPaymentDetails(component, event, helper)
        .then($A.getCallback(function (value) { 
            return helper.updateStatusEditPayment(component, event, helper);
        })).then($A.getCallback(function (value) {
            let paymentObj = component.get('v.paymentDetails');
            if(!$A.util.isEmpty(paymentObj)){
                let paymentId = paymentObj.productId;
                if(!$A.util.isEmpty(paymentId)){
                    if(paymentId == 'international_instant_payment'){
                        return helper.reverseLimits(component, event, helper); 
                    }else{
                        return promise_aux;
                    }                    
                }
               
            }
        	
        })).then($A.getCallback(function (value) { 
            return helper.goToEditPayment(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log('Error edit: ' + error);
        })).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        }));
        
        /*helper.getPaymentDetails(component, event, helper)
        .then($A.getCallback(function (value) { 
            return helper.goToEditPayment(component, event, helper)
        })).catch($A.getCallback(function (error) {
            console.log('Error edit: ' + error);
        })).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        }));*/
    },

    /*
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    method to discard a payment, calling the payment details, reverse limits and then changing the status and reason.
    History:
    <Date>          <Author>            <Description>
    18/09/2020      Adrian Munio        Initial version
    */
    discard: function (component, event, helper) {
        //PARCHE_FLOWERPOWER_SNJ
        component.set('v.spinner', true);
        helper.getPaymentDetails(component, event, helper)
        .then($A.getCallback(function (value) { 
            return helper.reverseLimits(component, event, helper);
        })).then($A.getCallback(function (value) { 
            return helper.handleDiscardPayment(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log('Error discard: ' + error);
        })).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        }));
    },

    reuse: function (component, event, helper) {
        /*TO-DO
        component.set('v.spinner', true);
        helper.getPaymentDetails(component, event, helper)  
        .then($A.getCallback(function (value) { 
            return helper.goToReusePayment(component, event, helper);               
        }), this).catch(function (error) {
            console.log('error');
        }).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        }));
        */
    },

    addToTemplate: function (component, event, helper) {
    },

    authorize: function (component, event, helper) {
        component.set('v.spinner', true);
        helper.getPaymentDetails(component, event, helper)
        .then($A.getCallback(function (value) {
            let signature = component.get('v.signatoryStatus');
            if (signature.lastSign == 'true') {
                helper.reloadFX(component, event, helper, false)
                .then($A.getCallback(function (value) {
                    return helper.reloadFX(component, event, helper, true);              
                })).then($A.getCallback(function (value) {
                    return helper.checkAccounts(component, event, helper);
                })).then($A.getCallback(function (value) {
                    var page = 'authorizationfinal'; 
                    var url = '';
                    var source = 'landingpayment';
                    var paymentId = component.get('v.paymentDetails').paymentId;
                    var paymentDraft = component.get('v.paymentDetails');
                    var payment = component.get('v.paymentDetails');
                    if (!$A.util.isEmpty(paymentDraft.feesDRAFT)) {
                        payment.fees = paymentDraft.feesDRAFT;
                    }
                    if (!$A.util.isEmpty(paymentDraft.FXFeesOutputDRAFT)) {
                    	payment.FXFeesOutput = paymentDraft.FXFeesOutputDRAFT;
                    }
                    if (!$A.util.isEmpty(paymentDraft.feesFXDateTimeDRAFT)) {
                    	payment.feesFXDateTime = paymentDraft.feesFXDateTimeDRAFT;
                    }
                    if (payment.sourceCurrency != payment.beneficiaryCurrency) {
                    	payment.tradeAmount = paymentDraft.tradeAmountDRAFT;
                    	payment.operationNominalFxDetails.customerExchangeRate = paymentDraft.operationNominalFxDetails.customerExchangeRateDRAFT;
                    	payment.timestamp = paymentDraft.timestampDRAFT;
                        payment.convertedAmount = paymentDraft.convertedAmountDRAFT;
                    	payment.amountOperative = paymentDraft.amountOperativeDRAFT;
	                    payment.FXoutput = paymentDraft.FXoutputDRAFT;
                    	payment.FXDateTime = paymentDraft.FXDateTimeDRAFT;
                        if (!$A.util.isEmpty(paymentDraft.amountSendDRAFT)) {
                            payment.amountSend = paymentDraft.amountSendDRAFT;
                        }
                        if (!$A.util.isEmpty(paymentDraft.amountReceiveDRAFT)) {
                            payment.amountReceive = paymentDraft.amountReceiveDRAFT;
                    	}
                    }
                    
                    var total = 0;
                    if (!$A.util.isEmpty(payment.fees)) {
                        total = parseFloat(payment.amountSend) + parseFloat(payment.fees);
                    }else{
                        total = parseFloat(payment.amountSend)
                    }
                    payment.totalAmount = total;
                
                    component.set('v.paymentDetails', payment);
                    if (!$A.util.isEmpty(paymentId)) {
                        url = 
                            'c__source=' + source +
                            '&c__paymentId=' + paymentId +
                            '&c__signatoryDetails=' + JSON.stringify(signature) +
                            '&c__paymentDetails=' + JSON.stringify(component.get('v.paymentDetails'));
                    }
                    return helper.goTo(component, event, page, url);
                })).catch($A.getCallback(function (error) {
                    console.log(error);
                })).finally($A.getCallback(function() {
                    component.set('v.spinner', false);
                }));
            } else {
                var page = 'authorizationfinal'; 
                var url = '';
                var source = 'landingpayment';
                var paymentId = component.get('v.paymentDetails').paymentId;
                if (!$A.util.isEmpty(paymentId)) {
                    url = 
                    'c__source=' + source +
                    '&c__paymentId=' + paymentId +
                    '&c__signatoryDetails=' + JSON.stringify(signature) +
                    '&c__paymentDetails=' + JSON.stringify(component.get('v.paymentDetails'));
                }
                component.set('v.spinner', false);
                return helper.goTo(component, event, page, url);
            }
        })).catch($A.getCallback(function (error) {
            console.log(error);
            component.set('v.spinner', false);
        })).finally($A.getCallback(function() {
        }));
    },
    
    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Reject payment method
    History:
    <Date>          <Author>            <Description>
    15/09/2020      Shahad Naji         Initial version
    */
    reject: function (component, event, helper) {
        component.set('v.action', 'Reject');
        component.set('v.spinner', true);
        helper.getPaymentDetails(component, event, helper)
        .then($A.getCallback(function (value) { 
            return helper.showREDOModal(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log('Error reject: ' + error);
        })).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        })); 
    },

    /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Send to review payment method
    History:
    <Date>          <Author>            <Description>
    15/09/2020      Shahad Naji         Initial version
    */
    sendToReview: function (component, event, helper) {
        component.set('v.spinner', true);
        helper.getPaymentDetails(component, event, helper)  
        .then($A.getCallback(function (value) { 
            return helper.showREDOModal(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log('Error sendToReview: ' + error);
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
    },
    
    /*
	Author:        	Antonio Matachana
    Company:        
	Description:    Show modal when cancel button is pressed
    History:
    <Date>          <Author>            <Description>
    09/11/2020      Antonio Matachana       Initial version
    */
    showCancelPaymentModal: function (component, event, helper) {
        component.set('v.fromUtilityBar', true);
        component.set('v.fromDetail', false);
        component.set('v.showCancelModal', true);
    },

    /*
    Author:         Antonio Matachana
    Company:        
    Description:    Execute cancelSelectedPayment if button cancel is pressed
    History:
    <Date>          <Author>                <Description>
    09/11/2020      Antonio Matachana       Initial version
    */
    handleCancelSelectedPayment: function (component, event, helper) {
        component.set('v.showCancelModal', false);
        var cancel = event.getParam('cancelSelectedPayment');
        if (cancel) {
            component.set('v.spinner', true);
            helper.reverseLimits(component, event, helper).then($A.getCallback(function (value) {
                return helper.cancelSelectedPayment(component, helper);
            })).catch($A.getCallback(function (error) {
                console.log('Error handleCancelSelectedPayment: ' + error);
            })).finally($A.getCallback(function() {
                component.set('v.spinner', false);
                $A.get('e.force:refreshView').fire();
            }));
        }
    },

     /*
	Author:        	Beatrice Hill
    Company:        Deloitte
	Description:    Navigate to Payment Details page
    History
    <Date>			<Author>			<Description>
    18/11/2020      Beatrice Hill       Initial version
    */
   goToPaymentDetail: function(component, event, helper){
    var payment =  component.get('v.paymentDetails');
    var paymentID = payment.paymentId;
    var url =  "c__currentUser="+JSON.stringify(component.get("v.currentUser")) +"&c__paymentID="+paymentID;
    var page = 'landing-payment-details';
    helper.goTo(component, event, page, url);
  }

})