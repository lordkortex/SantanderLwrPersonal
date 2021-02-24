({
    /*
    Author:         Bea Hill
    Company:        Deloitte
    Description:    Initialize the utility bar, configuring which buttons are available
    History:
    <Date>          <Author>            <Description>
    27/07/2020      Bea Hill            Initial version
    26/11/2020		Shahad Naji			Invoke setReverseLimitsProductId helper method
    */
    doInit: function (component, event, helper) {
        /*  helper.getAccountData(component, event, helper)
        .then($A.getCallback(function (value) {
            helper.getUserData(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log('Error doInit: ' + error);
        }));*/
        
        
        Promise.all([
            helper.getAccountData(component, event, helper),
            helper.getUserData(component, event, helper)
        ]).catch(function (error) {
            console.log('Error doInit: ' + error);
        }).finally($A.getCallback(function () {})); 
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
        
        helper.getPaymentDetails(component, event, helper).then($A.getCallback(function (value) { 
            return helper.reverseLimits(component, event, helper);  
        })).then($A.getCallback(function (value) { 
            return helper.updateStatusEditPayment(component, event, helper);
        })).then($A.getCallback(function (value) { 
            return helper.goToEditPayment(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log('Error edit: ' + error);
        })).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        }));
        
      
    },

   

    reuse: function (component, event, helper) {
        helper.getPaymentDetails(component, event, helper).then($A.getCallback(function (value) { 

            helper.goToReusePayment(component, event, helper);
            
        }));
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
    26/11/2020		Shahad Naji			Removes transaction from transactional counters for accumulated limits according to 
    									the productId of the selected payment 
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
            component.set('v.action','sendToReview');
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
   
   /*
    showCancelPaymentModal: function (component, event, helper) {
        component.set('v.fromUtilityBar', true);
        component.set('v.fromDetail', false);
        component.set('v.showCancelModal', true);
    },
    */

   showCancelPaymentModal : function (component, event, helper) {
        component.set('v.showCancelModal', true);
        return Promise.resolve('OK'); 
    
    },
    handleCancel : function (component, event, helper) {
        let variable= 'cancel';
        component.set('v.showCancelModal', false);
        return helper.cancel(component, event, helper)
        .then($A.getCallback(function (value) {
             helper.sendToLanding(component, event, helper, variable, true);
        })).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function () {
            console.log('OK');
            component.set('v.spinner', false);
        }));
    },
    handleCloseCancel : function (component, event, helper) {
        component.set('v.showCancelModal', false);
    },

    /*
    Author:         Antonio Matachana
    Company:        
    Description:    Execute cancelSelectedPayment if button cancel is pressed
    History:
    <Date>          <Author>                <Description>
    09/11/2020      Antonio Matachana       Initial version
    26/11/2020		Shahad Naji				Get payment details
    26/11/2020		Shahad Naji				Removes transaction from transactional counters for accumulated limits according to 
    										the productId of the selected payment
    */
    handleCancelSelectedPayment: function (component, event, helper) {
        component.set('v.showCancelModal', false);
        var cancel = event.getParam('cancelSelectedPayment');
        if (cancel) {            
            component.set('v.spinner', true);
            helper.getPaymentDetails(component, event, helper).then($A.getCallback(function (value) { 
                return helper.reverseLimits(component, event, helper);                
            })).then($A.getCallback(function (value) { 
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
  },

  
  /*
	Author:        	Julian Hoyos
    Company:        
	Description:    Methods to handle Discard for later actions.
    History:
    <Date>          <Author>            	<Description>   
    29/12/2020		Shahad Naji				Initial version
    */
    handleshowDiscardModal : function (component, event, helper) {
        var formatDate =  component.get('v.currentUser.dateFormat');
        helper.getPaymentDetails(component, event, helper)
        .then($A.getCallback(function (value) { 
            helper.formatUserDate(component, formatDate)
        })).then($A.getCallback(function (value) { 
                component.set('v.showDiscardModal', true);
                 return Promise.resolve('OK'); 
        })).then($A.getCallback(function (value) { 
            component.set('v.showDiscardModal', true);
        })).catch($A.getCallback(function (error) {
            console.log('Error reject: ' + error);
        })).finally($A.getCallback(function() {
           // component.set('v.paymentDetails.draftDate', fecha);
        })); 
    
    },
    handleDiscard : function (component, event, helper) {
        let variable= 'discard';
        component.set('v.showDiscardModal', false);
        return helper.discard(component, event, helper)
        .then($A.getCallback(function (value) {
             helper.sendToLanding(component, event, helper, variable, true);
        })).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function () {
            console.log('OK');
            component.set('v.spinner', false);
        }));
    },
    handleCloseDiscard : function (component, event, helper) {
        component.set('v.showDiscardModal', false);
    }
})