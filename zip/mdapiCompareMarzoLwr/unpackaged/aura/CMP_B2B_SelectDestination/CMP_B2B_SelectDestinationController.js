({
    initComponent: function (component,event, helper) {
        let steps = component.get('v.steps');
        steps.lastModifiedStep = 2;
        component.set('v.steps', steps);
    },
    
    handleCheckContinue: function (component,event, helper) {
        component.set('v.spinner', true);
        let data = component.get('v.data');
        let searchedString = component.get('v.searchedString');
        var msg = '';
        if ($A.util.isEmpty(data)) {
            if (!$A.util.isEmpty(searchedString)) {
                msg = $A.get('$Label.c.B2B_Error_Invalid_Input');
            } else {
                msg = $A.get('$Label.c.B2B_Error_Enter_Input');
            }
            var msg_parameter = $A.get('$Label.c.B2B_Recipient_account');
            var full_msg = msg.replace('{0}', msg_parameter);
            component.set('v.errorMSG', full_msg);
            component.set('v.spinner', false);
        } else {
            component.set('v.errorMSG', '');
            helper.compareAccounts(component, event, helper)
            .then($A.getCallback(function (value) {
                return helper.validateAccount(component, event, helper);
            })).then($A.getCallback(function (value) {
                return helper.getPaymentId(component, helper);
            })).then($A.getCallback(function (value) {
                return helper.completeStep(component, helper);
            })).catch(function (error) {
                console.log(error);
            }).finally($A.getCallback(function () {
                component.set('v.spinner', false);
            }));
        }
    },

    handleModified: function (component,event, helper) {
        let isModified = component.get('v.isModified');
        let steps = component.get('v.steps');
        if (isModified) {
            steps.lastModifiedStep = 2;
            steps.focusStep = 2;
            steps.shownStep = 2;
        }
        component.set('v.steps', steps);
    }
})