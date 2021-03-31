({
	doInit: function (component, event, helper) {
        
        new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.showSpinner', true);
            resolve('Ok');
        })).then($A.getCallback(function (value) {
            return helper.getVirtualAccounts(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        })).finally($A.getCallback(function () {
            component.set('v.showSpinner', false);
        }));      
    },
    
    getVirtualAccountsController: function (component, event, helper) {
    	helper.getVirtualAccounts(component, event, helper);
    }
})