({
    initComponent: function (component, event, helper) {
        component.set('v.stepBy', 1);
        component.set('v.activeBy', 1);
        component.set('v.dataSelectOrigin', {});
        component.set('v.dataSelectDestination', {});
        component.set('v.dataSelectAmount', {});
        component.set('v.dataPaymentInformation', {});

        new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.spinner', true);
			resolve('Ok');
		}), this).then($A.getCallback(function (value) {
            helper.getUserNumberFormat(component, event, helper);
            helper.getOriginAccounts(component, event, helper);
            helper.getDestinationAccounts(component, event, helper);
        })).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
        

    },

    handleCompleteStep: function (component, event, helper) {
        let confirm = event.getParam('confirm');
        if (confirm == true) {
            helper.nextStep(component, helper);
        }
    },

    handleBack: function (component, event, helper) {
        helper.previousStep(component, helper);
    },

    handleCancel: function (component, event, helper) {
        alert('Cancelar.');
    },

    handleContinue: function (component, event, helper) {
        let activeBy = component.get('v.activeBy');
        if (activeBy == 1) {
            let selectOrigin = component.find('selectOrigin');
            selectOrigin.checkContinue(1);
        } else if (activeBy == 2) {
            let selectDestination = component.find('selectDestination');
            selectDestination.checkContinue(2);
        } else if (activeBy == 3) {
            let selectAmount = component.find('selectAmount');
            selectAmount.checkContinue(3);
        } else if (activeBy == 4) {
            let paymentInformation = component.find('paymentInformation');
            paymentInformation.checkContinue(4);
        }
    }
})