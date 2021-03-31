({
    initComponent: function (component, event, helper) {
        console.log('init Summary');
        new Promise($A.getCallback(function (resolve, reject) {
            helper.getTotalAmount(component, event, helper);
            component.set('v.FXDateTime', helper.getCurrentDateTime(component, event, helper));
            let exchangeRate = component.get('v.dataSelectAmount.exchangeRate');
            component.set('v.spinner', true);
            if( $A.get('$Label.c.CNF_mockeoFirmas') != 'ok'){
            	helper.auxCometD(component, event, helper);
            }
            resolve('Ok');
        })).then($A.getCallback(function (value) {
            return helper.getSignatureLevel(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
    },

    handleConfirm: function (component, event, helper) {       
        helper.updateStatus(component, event, helper, '002', '001')
        .then($A.getCallback(function (value) {
            helper.sendNotification(component, event, helper, 'Pending');
        })).then($A.getCallback(function (value) {
            helper.beginAuthorize(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        }));
    },

    handleAuthorize: function (component, event, helper) {
        component.set('v.reload', false);
        component.set('v.reloadAction', component.get('c.handleAuthorize'));
        if (component.get('v.showOTP') == true) {
            helper.checkOTP(component, event, helper)
        }
    },

    sendOTP: function (component, event, helper) {
        helper.sendOTP(component, event, helper);
    },

    checkOTP: function (component, event, helper) {
        helper.checkOTP(component, event, helper);
    },

    reloadFX: function (component, event, helper) {
        helper.reloadFX(component, event, helper);
    },
    onCometdLoaded: function (component, event, helper) {
        var cometd = new org.cometd.CometD();
        component.set('v.cometd', cometd);
        if (component.get('v.sessionId') != null) {
            helper.connectCometd(component);
        }
      },
    sendOTP_Strategic: function (component, event, helper) {
		helper.sendOTP_Strategic(component, event, helper);
    }
})