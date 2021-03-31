({
    initComponent: function (component, event, helper) {
        let paymentDraft = component.get('v.paymentDraft');
        if (!$A.util.isEmpty(paymentDraft.expensesAccount)) {
            component.set('v.checkedYES', true);
        }
    },

    handleCheckContinue: function (component,event, helper) {
        component.set('v.spinner', true);
        let paymentDraft = component.get('v.paymentDraft');
        let checkedYES = component.get('v.checkedYES');
        
        paymentDraft.reference	 = '';
        paymentDraft.purpose	 = '';
        paymentDraft.description	 = '';
        paymentDraft.amountReceive	 = null;
        paymentDraft.amountSend	 = null;

        if ($A.util.isEmpty(paymentDraft.sourceAccount)) {
            let accountList = component.get('v.accountList');
            if (accountList.length <= 6) {
                var title = $A.get('$Label.c.B2B_SourceAccNotSelected');
                var body = $A.get('$Label.c.B2B_SelectAccountContinue');
                helper.showToast(component, title, body, true);
            } else {
                let msg = '';
                let searchedString = component.get('v.searchedString');
                if (!$A.util.isEmpty(searchedString)) {
                    msg = $A.get('$Label.c.B2B_Error_Invalid_Input');
                } else {
                    msg = $A.get('$Label.c.B2B_Error_Enter_Input');
                }
                var msg_parameter = $A.get('$Label.c.B2B_Source_account');
                var full_msg = msg.replace('{0}', msg_parameter);
                component.set('v.errorMSG', full_msg);
            } 
            helper.isEditingStepError(component, event, helper);
            component.set('v.spinner', false);
        } else if (!$A.util.isEmpty(checkedYES) && (checkedYES === true && $A.util.isEmpty(paymentDraft.expensesAccount))) {
            let msg = '';
            let searchedStringExpenses = component.get('v.searchedStringExpenses');
            if (!$A.util.isEmpty(searchedStringExpenses)) {
                msg = $A.get('$Label.c.B2B_Error_Invalid_Input');
            } else {
                msg = $A.get('$Label.c.B2B_Error_Enter_Input');
            }
            var msg_parameter = $A.get('$Label.c.B2B_Source_account');
            var full_msg = msg.replace('{0}', msg_parameter);
            component.set('v.errorMSGExpenses', full_msg);
            helper.isEditingStepError(component, event, helper);
            component.set('v.spinner', false);
        } else {
            component.set('v.errorMSG', '');
            component.set('v.errorMSGExpenses', '');
            helper.validateAccount(component, event, helper)
            .then($A.getCallback(function (value) {
            return helper.getPaymentId(component, helper);
            })).then($A.getCallback(function (value) {
                return helper.upsertPayment(component, helper);
            })).then($A.getCallback(function (value) {
                return helper.completeStep(component, helper);
            })).catch(function (error) {
                helper.isEditingStepError(component, event, helper);
                console.log(error);
            }).finally($A.getCallback(function () {
                console.log('OK');
                component.set('v.spinner', false);
            }));
        }
    },

    handleModified: function (component, event, helper) {
        let isModified = component.get('v.isModified');
        let steps = component.get('v.steps');
        if (isModified) {
            steps.lastModifiedStep = 1;
            steps.focusStep = 1;
            steps.shownStep = 1;
        }
        component.set('v.steps', steps);
    }
})