({
    openModal: function (component, event, helper) {
        let accountId = '';
		var params = event.getParam('arguments');
		if (!$A.util.isEmpty(params) && !$A.util.isEmpty(params.accountId)) {
            accountId = params.accountId;
        }
        if ($A.util.isEmpty(accountId)) {
            component.set('v.labelDone', $A.get('$Label.c.NewAccount') + ' ' + $A.get('$Label.c.Account'));
        } else {
            component.set('v.labelDone', $A.get('$Label.c.edit') + ' ' + $A.get('$Label.c.Account'));
        }
        component.set('v.accountId', accountId);
        helper.initComponent(component, helper, accountId);
        helper.showModal(component);
    },

    btnCancel: function (component, event, helper) {
        helper.closeModalEvent(component, helper, false);
        helper.hideModal(component);
    },

    btnDone: function (component, event, helper) {
        helper.callStratioAndSaveAccount(component, helper);
    },

    handleCountry: function (component, event, helper) {
        helper.validateGetConsentTypeAndManagement(component, helper);
    },

    handleCountryBIC: function (component, event, helper) {
        helper.validateGetConsentTypeAndManagement(component, helper);
    }
})