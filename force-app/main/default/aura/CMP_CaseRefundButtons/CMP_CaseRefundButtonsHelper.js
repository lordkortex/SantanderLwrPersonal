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
                    }else{
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
            });        
            $A.enqueueAction(action); 
        }), this); 
    },
    
    reverseOrderingDebit : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get("c.reverseOrderingDebit");
            var caseId = component.get('v.recordId');
            var book_to_book_id =  component.get('v.currentCase.CASE_TXT_PaymentId__c');//
            action.setParams({ 
                "caseId" : caseId,
                "book_to_book_id" : book_to_book_id
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var result = response.getReturnValue();
                    if (result.success) {
                        resolve('OK');
                    }else{
                        resolve('KO');
                        // reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));                       
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
                        else{
                           reject($A.get('$Label.c.ERROR_NOT_RETRIEVED')); 
                        }
            });        
            $A.enqueueAction(action); 
        }), this); 
    },
    reverseBeneficiaryCredit : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get("c.reverseBeneficiaryCredit");
            var caseId = component.get('v.recordId');
            var operation_id = component.get('v.currentCase.CASE_TXT_PaymentId__c');
            action.setParams({ 
                "caseId" : caseId,
                "operation_id" : operation_id
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var result = response.getReturnValue();
                    
                    if (result.success) {
                        
                        resolve('OK');
                        
                    }else{
                        resolve('KO');
                        //reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));                       
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
                        else{
                            reject($A.get('$Label.c.ERROR_NOT_RETRIEVED')); 
                        }
            });        
            $A.enqueueAction(action); 
        }), this); 
    },
    
    reverseFX  : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var paymentData =  component.get("v.paymentDetails");
            if(!$A.util.isEmpty(paymentData)){
                if(!$A.util.isEmpty(paymentData.beneficiaryCurrency) && !$A.util.isEmpty(paymentData.sourceCurrency)){
                    if(paymentData.beneficiaryCurrency.localeCompare(paymentData.sourceCurrency) != 0){
                        
                        var action = component.get("c.reverseFX");                        
                        var caseId = component.get('v.recordId');
                        
                        action.setParams({ 
                            "caseId" : caseId,
                            "paymentData" : paymentData              
                        });
                        action.setCallback(this, function(response) {
                            var state = response.getState();
                            if (state === "SUCCESS") {
                                var result = response.getReturnValue();
                                
                                if (result.success) {
                                    resolve('OK');
                                }else{
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
                                }else{
                                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));  
                                }
                        });        
                        $A.enqueueAction(action); 
                        
                    }else{
                        resolve('OK'); 
                    }
                    
                }else{
                    resolve('OK');
                }
            }else{
                resolve('OK');
            }
        }), this); 
    },
    
    showToast :  function (component, event, helper, type, title, message){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type" : type
        });
        toastEvent.fire();
    },
    
    getPaymentDetails: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            
            var paymentId = component.get('v.currentCase.CASE_TXT_PaymentId__c');             
            var action = component.get('c.getPaymentDetail');            
            action.setParam("paymentId", paymentId);
            
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    
                    if (returnValue.success) {
                        component.set("v.paymentDetails", returnValue.value.paymentDetail);
                        resolve('ok');
                    } else {                        
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                    
                } else if (actionResult.getState() == "ERROR") {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                        errors[0].message);
                            
                        }
                    } else {
                        console.log('problem getting list of payments msg2');
                    }
                    
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
                    else{
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
            });
            $A.enqueueAction(action);
        }), this);
    }
    
})