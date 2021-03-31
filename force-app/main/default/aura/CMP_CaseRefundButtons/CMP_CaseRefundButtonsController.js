({
    
	//$Label.c.Toast_Success
	//$Label.c.CASE_SuccessUpdate
    //$Label.c.ERROR
    //$Label.c.CASE_ErrorUpdate
	doInit : function(component, event, helper) {
		 Promise.all([
                helper.getCaseData(component, event, helper)  
            ]).then($A.getCallback(function (value) {
             component.set('v.loaded', true);              
            }), this).catch(function (error) {
                console.log('error');
            }).finally($A.getCallback(function() {}));  
	},
    handleReverseOrderingDebit : function(component, event, helper) {
        component.set('v.loaded', false);
        
        Promise.all([
            helper.reverseOrderingDebit(component, event, helper)
        ]).then($A.getCallback(function (value) { 
            if(value == 'OK'){
                component.set('v.loaded', true);
                $A.get('e.force:refreshView').fire();
                var type = "success";
                var title =  $A.get("$Label.c.Toast_Success");
                var message = $A.get("$Label.c.CASE_SuccessUpdate");
                helper.showToast(component, event, helper, type, title, message);
            }else{
               
                component.set('v.loaded', true);
                var type = "error";
                var title =  $A.get("$Label.c.ERROR");
                var message = $A.get("$Label.c.CASE_ErrorUpdate");
                helper.showToast(component, event, helper, type, title, message);
            }         
        }), this).catch(function (error) {
            console.log('error');
            component.set('v.loaded', true);
        }).finally($A.getCallback(function() {
            
        }));  
    },
    
    handleReverseBeneficiaryCredit : function(component, event, helper) {
        
        component.set('v.loaded', false);
        helper.getPaymentDetails(component, event, helper).then($A.getCallback(function (value) {            
            return  helper.reverseBeneficiaryCredit(component, event, helper);////helper.reverseBeneficiaryCredit(component, event, helper);             
        }))/*.then($A.getCallback(function (value) {
            return  helper.reverseFX(component, event, helper);
        }))*/.then($A.getCallback(function (value) {
            if(value == 'OK'){
                $A.get('e.force:refreshView').fire();
                var type = "success";
                var title =  $A.get("$Label.c.Toast_Success");
                var message = $A.get("$Label.c.CASE_SuccessUpdate");
                helper.showToast(component, event, helper, type, title, message);                    
            }
        })).catch(function (error) {
            var type = "error";
            var title =  $A.get("$Label.c.ERROR");
            var message = $A.get("$Label.c.CASE_ErrorUpdate");
            helper.showToast(component, event, helper, type, title, message);
        }).finally($A.getCallback(function () { 
            component.set('v.loaded', true);
        }));
        
      
    }
    
})