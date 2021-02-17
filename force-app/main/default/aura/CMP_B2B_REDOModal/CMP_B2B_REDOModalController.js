({
    //$Label.c.CNF_payment_productId_002
    initComponent : function(component, event, helper) {
        component.set('v.subject', '');
        component.set('v.description', '');
        component.set('v.errorSubject', '');
        component.set('v.action', '');
        component.set('v.charactersRemainingSubject', component.get('v.charactersMaxSubject'));
        
        let clientReference = component.get('v.clientReference');
        var msg;
        
        if(component.get('v.action') == 'Reject'){
            //msg = 'You are requesting that "{0}" has to be rejected';
            msg = $A.get('$Label.c.PAY_hasToBeRejected');           
        }else{
            //msg = 'You are requesting that "{0}" has to be reviewed';
            msg = $A.get('$Label.c.PAY_hasToBeReviewed');
        }

        if (!$A.util.isEmpty(clientReference)){
            msg = msg.replace('{0}', clientReference);
        }
        component.set('v.headlineMessage', msg); 
    },



    goBack : function (component, event, helper) {
        component.set('v.subject', '');
        component.set('v.description', '');
        component.set('v.errorSubject', '');
        component.set('v.charactersRemainingSubject', component.get('v.charactersMaxSubject'));
        component.set('v.charactersRemaining', component.get('v.charactersMax'));
        console.log(JSON.parse(JSON.stringify(component.get('v.payment'))));
        console.log(component.get('v.action'));
		helper.closeModal(component, event, helper);
      
    },
    initValues : function (component, event, helper) {
        component.set("v.subject","");  
        component.set('v.errorSubject', '');
        
        let clientReference = component.get('v.clientReference');
        var msg;

        if(component.get('v.action') == 'Reject'){
            //msg = 'You are requesting that "{0}" has to be rejected';
            msg = $A.get('$Label.c.PAY_hasToBeRejected');
        }else{
            //msg = 'You are requesting that "{0}" has to be reviewed';
            msg = $A.get('$Label.c.PAY_hasToBeReviewed');
        }

        if (!$A.util.isEmpty(clientReference)){
            msg = msg.replace('{0}', clientReference);
        }
        component.set('v.headlineMessage', msg); 

    },

    handleClear : function(component, event, helper) {
        component.set('v.subject', '');  
        let textinput = document.getElementById("subject-input");	
        if (textinput != null) {
            textinput.value = "";
            component.set('v.subject','');
        }	
        let chars = component.get('v.charactersMaxSubject');
		component.set('v.charactersRemainingSubject', chars);	
		component.set('v.errorSubject', '');
		
    },
    handleFocus: function (component, event, helper) { 
        component.set('v.showMiniLabel', true);
    },

	handleBlur: function (component, event, helper) { 
		component.set('v.showMiniLabel', false);
	},
	
	handleInput: function (component, event, helper) { 
		let input = component.get('v.subject');
		let chars = component.get('v.charactersMaxSubject');
		if (event.target.value != undefined) {
			input = event.target.value;
			let regexp = new RegExp('\n');
			input = input.replace(regexp, '');
			event.target.value = input;
			let length = input.length;
			chars = chars - length;
            //SNJ - 29/06/2020 - contar caracteres e mas
            if(chars > -1){
                component.set('v.errorSubject', '');
            }else{
                var substraction = chars * -1;
                var msg = $A.get("$Label.c.PAY_ErrorCharacters");
                if(msg != undefined && msg != null){
                    msg  = msg.replace("{0}", substraction);
                }
                component.set('v.errorSubject', msg);
            }
			

		}
		component.set('v.charactersRemainingSubject', chars);
		component.set('v.subject', input);
	
		
	},

      /*
    Author:        	Shahad Naji
    Company:        Deloitte
    Description:    Send to review
    History
    <Date>			<Author>			<Description>
    16/09/2020		Shahad Naji		    Initial version
    12/11/2020      Julian Hoyos        Se ha añadido un nuevo promise para cubrir las acciones de reject
                                        y review.
    23/11/2020		Shahad Naji			Call reverseLimit method when the paymentId is about to be rejected and its paymentId value equals to 'international_instant_payment'
    */
    sendProcess: function (component, event, helper) {
        var action = component.get("v.action");
        var variable = 'review';
        new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.spinner', true);
            resolve('Ok');
        })).then($A.getCallback(function (value) {
            return helper.validateInput(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.updatePaymentData(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.sendNotification(component, event, helper);
        })).then($A.getCallback(function (value) {
            helper.sendToLanding(component, event, helper, variable, true);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        })).finally($A.getCallback(function () {
            console.log('OK');
            component.set('v.spinner', false);
        }));
        /*
        var action = component.get("v.action");
        
        new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.spinner', true);
            resolve('Ok');
        })).then($A.getCallback(function (value) {
            return helper.validateInput(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.updatePaymentData(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.sendNotification(component, event, helper);
        })).then($A.getCallback(function (value) {
            helper.closeModal(component, helper, null);
            var msg = '';
            if(action == "Reject"){
                 msg = $A.get('$Label.c.PAY_sendRejected');

            } else{
                 msg = $A.get('$Label.c.PAY_sendReview');
            }
            var utilityBar = component.get('v.fromUtilityBar');
            var method = '';
            if (!$A.util.isEmpty(utilityBar)) {
                if(utilityBar == true) {
                    method = 'goToPaymentDetail';
                }
            } 
            var body = '';
            helper.showSuccessToast(component, event, helper, msg, body, method);
            $A.get('e.force:refreshView').fire();
        })).catch($A.getCallback(function (error) {
            console.log(error);
            if (error.title != null) {
                helper.showToast(component, event, helper, error.title, error.body, error.noReload);
            }
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
        */
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
      var payment =  component.get('v.payment');
      var paymentID = payment.paymentId;
      var url =  "c__currentUser="+JSON.stringify(component.get("v.currentUser")) +"&c__paymentID="+paymentID;
      var page = 'landing-payment-details';
      helper.goTo(component, event, page, url);
    },
    //$Label.c.PAY_sendRejected
    handleReject : function(component, event, helper){
        var variable = 'reject';
        new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.spinner', true);
            resolve('Ok');
        })).then($A.getCallback(function (value) {
            return  helper.validateInput(component, event, helper);
        })).then($A.getCallback(function (value) {            
            return helper.reverseLimits(component, event, helper);             
        })).then($A.getCallback(function (value) {
            return helper.updatePaymentData(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.sendNotification(component, event, helper);
        })).then($A.getCallback(function (value) {
            helper.sendToLanding(component, event, helper, variable, true);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        })).finally($A.getCallback(function () {
            console.log('OK');
            component.set('v.spinner', false);
        }));
       /* helper.validateInput(component, event, helper).then($A.getCallback(function (value) {            
            return helper.reverseLimits(component, event, helper);             
        })).then($A.getCallback(function (value) {
            return helper.updatePaymentData(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.sendNotification(component, event, helper);
        })).then($A.getCallback(function (value) {
            helper.closeModal(component, helper, null);
            var msg = $A.get('$Label.c.PAY_sendRejected');
            var body = '';
            var utilityBar = component.get('v.fromUtilityBar');
            var method = '';
            if (!$A.util.isEmpty(utilityBar)) {
                if(utilityBar == true) {
                    method = 'goToPaymentDetail';
                }
            } 
            helper.showSuccessToast(component, event, helper, msg, body, method);
            $A.get('e.force:refreshView').fire();
        })).catch($A.getCallback(function (error) {
            console.log(error);
            if (error.title != null) {
                helper.showToast(component, event, helper, error.title, error.body, error.noReload);
            }
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
        */
    }
    

})