({
	initComponent: function (component, helper, accountId) {
        helper.showSpinner(component);
        component.set('v.account', {});
        component.set('v.listCountries', []);
        component.set('v.listTypes', []);
        component.set('v.listManagement', []);
        component.set('v.requiredDates', false);
        var action = component.get('c.initComponent');
        action.setParams({
            'accountId': accountId
        });
        action.setCallback(this, function (actionResult) {
        	if (actionResult.getState() == 'SUCCESS') {
        		var stateRV = actionResult.getReturnValue();
                if (stateRV.success) {
                    component.set('v.account', stateRV.value.account);
                    component.set('v.listCountries', stateRV.value.listCountries);
                    component.set('v.listTypes', stateRV.value.listTypes);
                    component.set('v.listManagement', stateRV.value.listManagement);
                } else {
                	toast().error('', stateRV.msg);
                }
        	} else {
        		toast().error('', 'Error al consultar el account.');
        	}
        	helper.hideSpinner(component);
        });
        $A.enqueueAction(action);
	},

    validateGetConsentTypeAndManagement: function (component, helper) {
        let account = component.get('v.account');
        if (!$A.util.isEmpty(account.ACC_PCK_Country__c) && !$A.util.isEmpty(account.ACC_TXT_BIC__c)) {
            let BICLength = account.ACC_TXT_BIC__c.length;
            if (BICLength == 11) {
                helper.getConsentTypeAndManagement(component, helper);
            }
        }
        
	},

	getConsentTypeAndManagement: function (component, helper, country, countryBIC) {
        
        helper.showSpinner(component);
        let account = component.get('v.account');
        account.ACC_PCK_Type__c = '';
        account.ACC_PCK_Management__c = '';
        component.set('v.account', account);
        var action = component.get('c.getConsentTypeAndManagement');
        action.setParams({
            'country': account.ACC_PCK_Country__c,
            'countryBIC': account.ACC_TXT_BIC__c
        });
        action.setCallback(this, function (actionResult) {
        	if (actionResult.getState() == 'SUCCESS') {
        		var stateRV = actionResult.getReturnValue();
                if (stateRV.success) {
                    let account = component.get('v.account');
                    if (!$A.util.isEmpty(stateRV.value.consentType)) {
                        account.ACC_PCK_Type__c = stateRV.value.consentType;
                    }
                    if (!$A.util.isEmpty(stateRV.value.consentManagement)) {
                        account.ACC_PCK_Management__c = stateRV.value.consentManagement;
                    }
                    component.set('v.account', account);
                } else {
                	toast().error('', stateRV.msg);
                }
        	} else {
        		toast().error('', 'Error al consultar el tipo de consentimiento y gestión por país.');
        	}
        	helper.hideSpinner(component);
        });
        $A.enqueueAction(action);
        
	},

	callStratioAndSaveAccount: function (component, helper) {
        helper.showSpinner(component);
        let account = component.get('v.account');
        console.log('Cuenta: '+ account);
        var action = component.get('c.callStratioAndSaveAccount');
        action.setParams({
            'account': account
        });
        action.setCallback(this, function (actionResult) {
        	if (actionResult.getState() == 'SUCCESS') {
        		var stateRV = actionResult.getReturnValue();
                if (stateRV.success) {
                    helper.closeModalEvent(component, helper, true);
                    helper.hideModal(component);
                } else {
                    toast().error('', stateRV.msg);
                }
        	} else {
                toast().error('', 'Error al guardar los datos.');
            }
            helper.hideSpinner(component);

        });
        $A.enqueueAction(action);
	},

    closeModalEvent: function (component, helper, accepted) {
        let closeModal = component.getEvent('closeModal');
        closeModal.setParams({
            'accepted': accepted
        });
        closeModal.fire();
	}, 

	showSpinner: function (component, value) {
		component.set('v.spinner', true);
	},

	hideSpinner: function (component, value) {
		component.set('v.spinner', false);
	},

	showModal: function (component) {
		component.set('v.showModal', true);
	},

	hideModal: function (component) {
		component.set('v.showModal', false);
	}
})