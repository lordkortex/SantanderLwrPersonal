({
		getCaseData : function(component, event, helper) {
		  return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get("c.getCaseData");
              var caseId = component.get('v.recordId');
              action.setParams({ "caseId" : caseId });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var result = response.getReturnValue();
                    
                    if (result.success) {
                        component.set('v.currentCase', result.value.output); 
                        resolve('ok');
                   
                    }else{
                        console.log('ko'); 
                         reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));                       
                    }
                     
                }
                else if (state === "INCOMPLETE") {
                    // do something
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                   

                }
                    else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
            });        
            $A.enqueueAction(action); 
        }), this); 
	},
        /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Get payment details
    History
    < Date>		<Author>		<Description>
	30/07/2020	Bea Hill        Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
	07/08/2020	Shahad Naji 	Adapted from CMP_PaymentsLandingPaymentDetail
    */
    getPaymentDetails: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var currentUser = component.get('v.currentUser');
            var action = component.get('c.getPaymentDetail');
            var paymentObj = component.get("v.paymentObj");
            action.setParam("paymentId", component.get('v.currentCase.CASE_TXT_PaymentId__c'));
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    if (!$A.util.isEmpty(returnValue)) {                       
                    	//returnValue.value.paymentDetail.clientReference = paymentObj.clientReference;
                        component.set('v.paymentObj', returnValue.value.paymentDetail);
                    }
                    resolve('La ejecucion ha sido correcta.');
                } else if (actionResult.getState() == "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log('problem getting list of payments msg2');
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },
})