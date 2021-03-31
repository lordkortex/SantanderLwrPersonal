({
	showToast: function (component,event, helper, title, body, noReload, mode) {
        var toast = component.find('toast');
        if (!$A.util.isEmpty(toast)) {
            if (mode == 'error') {
                toast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if (mode == 'success') {
                toast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);
            }
        }
    },
    
    /*
    Author:         R. cervinpo
    Company:        Deloitte
    Description:    Get VAM list
    History:
    <Date>          <Author>            <Description>
    25/01/2021      R. Cervino          Initial version
    */
    getVirtualAccounts: function (component, event, helper) {
       component.set('v.reloadAction', component.get('c.getVirtualAccountsController'));
       component.set('v.reload', false);
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getVirtualAccounts');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    console.log(returnValue);
                    if (returnValue.success == true) {
                        var accounts = returnValue.value.VirtualAccountsList.accountsListResponse.accountsDataList;
                        component.set("v.VAMAccounts", accounts);
                        resolve('ok');
                    } else {
                    	helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    } else {
                        console.log('problem getting list of payments msg2');
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    }
})