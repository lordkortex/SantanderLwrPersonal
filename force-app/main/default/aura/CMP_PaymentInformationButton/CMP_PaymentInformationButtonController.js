({
    //$Label.c.Toast_Success
    //$Label.c.CASE_SuccessUpdate
    //$Label.c.ERROR
    //$Label.c.CASE_ErrorUpdate
    doInit : function(component, event, helper) {
        console.log('Loading Payment Information button'); 
    },
    handleOpenPaymentDetails : function(component, event, helper) {
        
        component.set('v.showSpinner', true);
        helper.getCaseData(component, event, helper).then($A.getCallback(function (value) {            
            return helper.getPaymentDetails(component, event, helper);
        })).then($A.getCallback(function (value) {
            component.set('v.isOpen', true);
        })).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function () { 
            component.set('v.showSpinner', false);
        }));
    }
})