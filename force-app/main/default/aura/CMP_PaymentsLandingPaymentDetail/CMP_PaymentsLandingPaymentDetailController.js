({
    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Get user info, set mock data for demo, and get params from URL
    History:
    <Date>          <Author>            <Description>
	19/06/2020      Bea Hill            Initial version
    */
    doInit: function (component, event, helper) {
        helper.getUrlParams(component, event, helper)
        .then($A.getCallback(function (value) { 
            return helper.getPaymentDetails(component, event, helper);
        }), this).then($A.getCallback(function (value) { 
            return helper.getSignatureLevel(component, event, helper);
        }), this).then($A.getCallback(function (value) { 
            return helper.configureButtons(component, event, helper, component.get('v.payment'), component.get('v.currentUser'));
        }), this).then($A.getCallback(function (value) { 
            return helper.getUserData(component, event, helper);
        }), this).then($A.getCallback(function (value) { 
            return helper.getAccountData(component, event, helper);
        }), this).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function() {
            component.set('v.isLoading', false);
        }));
    },

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Navigate to landing page
    History:
    <Date>          <Author>            <Description>
	18/06/2020      Bea Hill            Initial version - adapted from B2B
    */
    handleBack: function (component, event, helper) {
        var url = '';
        var page = component.get('v.landingPage');
        helper.goTo(component, event, page, url);
    }, 

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Prints what is shown on the screen
    History:
    <Date>          <Author>            <Description>
    28/05/2020      Shahad Naji         Initial version
    18/06/2020      Bea Hill            Adapted from CMP_PaymentsLandingFilters
    */
    printScreen: function (component, event, helper) {
        window.print();
    },

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Show additional payment details
    History:
    <Date>          <Author>            <Description>
	18/06/2020      Bea Hill            Initial version
    */
    moreDetail: function (component, event, helper) {
        component.set('v.showMoreDetail', true);
    },
 
    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Hide additional payment details
    History:
    <Date>          <Author>            <Description>
	18/06/2020      Bea Hill            Initial version
    */
    lessDetail: function (component, event, helper) {
        component.set('v.showMoreDetail', false);
    },

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Go to Redo page on clicking 'Send to review' button
    History:
    <Date>          <Author>            <Description>
	23/06/2020      Bea Hill            Initial version
    26/06/2020      Shahad Naji         Hide page scroll
    */
    goToRedo: function (component, event, helper) {
		document.querySelector('.comm-page-custom-landing-payment-details').style.overflow = 'hidden';
        component.set('v.action', 'Review');
        component.set('v.showRedo', true);
    },

    /*
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Go to Reject page on clicking 'Reject' button
    History:
    <Date>          <Author>            <Description>
	23/06/2020      Adrian Munio        Initial version
    */
    goToReject: function (component, event, helper) {
		document.querySelector('.comm-page-custom-landing-payment-details').style.overflow = 'hidden';
        component.set('v.action', 'Reject');
        component.set('v.showRedo', true);
    },

    /*
    Author:        	Adrian Munio
    Company:        Deloitte
    Description:    Go to Discard page on clicking 'Discard' button
    History:
    <Date>          <Author>            <Description>
    14/09/2020      Adrian Munio        Initial version
    */
    goToDiscard: function (component, event, helper) {
        component.set('v.spinner', true);
        //PARCHE_FLOWERPOWER_SNJ
        /*helper.reverseLimits(component, event, helper)  
        .then($A.getCallback(function (value) { 
            return helper.handleDiscardPayment(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log('error');
        })).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        }));*/
        helper.handleDiscardPayment(component, event, helper).catch($A.getCallback(function (error) {
            console.log('error');
        })).finally($A.getCallback(function() {
            component.set('v.spinner', false);
        }));
    },

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Handle clicking 'Edit payment' button; prepare data to send and navigate to payment process
    History:
    <Date>          <Author>            <Description>
	23/06/2020      Bea Hill            Initial version
    */
    handleEdit: function (component, event, helper) {
	    /* var page = 'payments-b2b';	
        var url ='';	
        var source= 'landing-payment-details';	
        var paymentId = component.get('v.paymentID');	
        if (!$A.util.isEmpty(paymentId)) {	
            url = 	
            'c__source=' + source +	
            '&c__paymentId=' + paymentId +	
            '&c__paymentDetails=' + JSON.stringify(component.get('v.payment'));	
        }	
        helper.goTo(component, event, page, url); */	
        return helper.updateStatusEditPayment(component, event, helper)	
        .then($A.getCallback(function (value) { 	
            var page = 'payments-b2b';	
            var url ='';	
            var source= 'landing-payment-details';	
            var paymentId = component.get('v.paymentID');	
            if (!$A.util.isEmpty(paymentId)) {	
                url = 	
                'c__source=' + source +	
                '&c__paymentId=' + paymentId +	
                '&c__paymentDetails=' + JSON.stringify(component.get('v.payment'));	
            }	
            helper.goTo(component, event, page, url);	
        })).catch($A.getCallback(function (error) {	
            console.log('Error edit: ' + error);	
        })).finally($A.getCallback(function() {	
            component.set('v.spinner', false);	
        }));
    },
    
    /*
	Author:        	Adrian Munio
    Company:        Deloitte
	Description:    Handle clicking 'Reuse payment' button; prepare data to send and navigate to payment process
    History:
    <Date>          <Author>            <Description>
	25/08/2020      Adrian Munio        Initial version
    */
    handleReuse: function (component, event, helper) {
        helper.createNewPayment(component, event, helper);
    },

    handleAuthorize: function (component, event, helper) {
		let signature = component.get('v.signLevel');
        if (signature.lastSign == 'true') {
            component.set('v.isLoading', true);
            helper.reloadFX(component, event, helper, false)
            .then($A.getCallback(function (value) {
                return helper.reloadFX(component, event, helper, true);
            })).then($A.getCallback(function (value) {
                return helper.checkAccounts(component, event, helper);
            })).then($A.getCallback(function (value) {
                var page = 'authorizationfinal'; 
                var url = '';
                var source = 'landing-payment-details';
                var paymentId = component.get('v.paymentID');
                var paymentDraft = component.get('v.payment');
                var payment = component.get('v.payment');
                console.log(payment.fees);
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
                
                component.set('v.payment', payment);
                
                if (!$A.util.isEmpty(paymentId)) {
                    url = 
                        'c__source=' + source +
                        '&c__paymentId=' + paymentId +
                        '&c__paymentDetails=' + JSON.stringify(component.get('v.payment')) +
                        '&c__signatoryDetails=' + JSON.stringify(signature);
                }
                helper.goTo(component, event, page, url);
            })).catch($A.getCallback(function (error) {
                console.log(error);
            })).finally($A.getCallback(function() {
                component.set('v.isLoading', false);
            }));
        } else {
            var page = 'authorizationfinal'; 
            var url = '';
            var source = 'landing-payment-details';
            var paymentId = component.get('v.paymentID');
            if (!$A.util.isEmpty(paymentId)) {
                url = 
                'c__source=' + source +
                '&c__paymentId=' + paymentId +
                '&c__paymentDetails=' + JSON.stringify(component.get('v.payment')) +
                '&c__signatoryDetails=' + JSON.stringify(signature);
            }
            return helper.goTo(component, event, page, url);
        }
    },
    
    /*
	Author:        	Antonio Duarte
    Company:        Deloitte
	Description:    Handle Authorization
    History:
    <Date>          <Author>            <Description>
    24/08/2020      Antonio Duarte      Notifications demo version
    */
    handleReject: function (component, event, helper) {
        component.find('Service').callApex2(component, helper,'c.sendNotification', {'notifType' : 'reject'}, helper.notificationSent);
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
        component.set('v.fromUtilityBar', false);
        component.set('v.fromDetail', true);
        component.set('v.showCancelModal', true);
    },
    /*
	Author:        	Antonio Matachana
    Company:        
	Description:    Execute cancelSelectedPayment if button cancel is pressed
    History:
    <Date>          <Author>            <Description>
    09/11/2020      Antonio Matachana       Initial version
    */
    handleCancelSelectedPayment: function (component, event, helper) {
        component.set('v.showCancelModal', false);
        let cancel = event.getParam('cancelSelectedPayment');
        if (cancel) {
                helper.cancelSelectedPayment(component, helper);
        }
    }
})