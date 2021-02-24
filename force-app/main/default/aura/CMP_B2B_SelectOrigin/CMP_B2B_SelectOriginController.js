({
    initComponent: function (component, event, helper) {
        if (!$A.util.isEmpty(component.get('v.expensesAccount'))) {
            component.set('v.checkedYES', true);
        }
    },

    handleCheckContinue: function (component,event, helper) {
        component.set('v.spinner', true);
        let data = component.get('v.data');
        let searchedString = component.get('v.searchedString');
        var msg = '';
        let accountList = component.get('v.accountList');
        
        if ($A.util.isEmpty(data)) {
            if(accountList.length <= 6){
                var title = $A.get('$Label.c.B2B_SourceAccNotSelected');
                var body = $A.get('$Label.c.B2B_SelectAccountContinue');
                helper.showToast(component, title, body, true);
            } else {
                if (!$A.util.isEmpty(searchedString)) {
                    msg = $A.get('$Label.c.B2B_Error_Invalid_Input');
                } else {
                    msg = $A.get('$Label.c.B2B_Error_Enter_Input');
                }
                var msg_parameter = $A.get('$Label.c.B2B_Source_account');
                var full_msg = msg.replace('{0}', msg_parameter);
                component.set('v.errorMSG', full_msg);
            } 
            component.set('v.spinner', false);
        } else {
            component.set('v.errorMSG', '');
            helper.validateAccount(component, event, helper)
            .then($A.getCallback(function (value) {
                return helper.completeStep(component, helper);
            })).catch(function (error) {
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