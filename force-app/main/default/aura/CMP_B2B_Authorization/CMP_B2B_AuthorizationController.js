({
    initComponent: function (component, event, helper) {
        new Promise($A.getCallback(function (resolve, reject) {
            let steps = component.get('v.steps');
            steps.shownStep = 1;
            steps.focusStep = 1;
            steps.lastModifiedStep = 1;
            steps.totalSteps = 5;
            component.set('v.steps', steps);
            component.set('v.spinner', true);
            if( $A.get('$Label.c.CNF_mockeoFirmas') != 'ok'){
            	helper.auxCometD(component, event, helper);
            }
            resolve('Ok');
        }), this).then(function (value) {
            return helper.getUserData(component,event, helper);
        }).then(function (value) {
            return helper.getAccountData(component, event, helper);
        }).then(function (value) {
            return helper.getURLParams(component, event, helper);
        }).then($A.getCallback(function (){
            //helper.beginAuthorize(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
    },

    retrievePaymentDetails: function (component, event, helper) {
        helper.getPaymentData(component, event, helper);
    },

    sendToLanding: function (component, event, helper) {
        if (component.get('v.source') != 'landing-payment-details') {
            helper.sendToLanding(component,event, helper,false);
        } else {
            window.history.back();
        }
    },

    sendOTP_Strategic: function (component, event, helper) {
		helper.sendOTP_Strategic(component, event, helper);
    },

	checkOTP: function (component, event, helper) {
		helper.checkOTP(component, event, helper);
    },

	reloadFX: function (component, event, helper) {
		helper.reloadFX(component, event, helper);
    },

    handleConfirm: function (component, event, helper) {
        helper.beginAuthorize(component, event, helper)
	},

	handleAuthorize: function (component, event, helper) {
		component.set('v.reload', false);
		component.set('v.reloadAction', component.get('c.handleAuthorize'));
		if (component.get('v.showOTP') == true) {
            helper.checkOTP(component, event, helper)
		}
    },
      
    onCometdLoaded: function (component, event, helper) {
        var cometd = new org.cometd.CometD();
        component.set('v.cometd', cometd);
        if (component.get('v.sessionId') != null) {
            helper.connectCometd(component);
        }
    }
})