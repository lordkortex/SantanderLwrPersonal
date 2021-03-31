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
    
    manageURL : function (component, event, helper){
        return new Promise($A.getCallback(function (resolve, reject) {
            
            var pageReference = component.get("v.pageReference");
            
            if(!$A.util.isEmpty(pageReference) && !$A.util.isEmpty(pageReference.state) && !$A.util.isEmpty(pageReference.state.c__caseId)){
                component.set("v.editCase", true);
                component.set("v.caseId",pageReference.state.c__caseId);
                if(!$A.util.isEmpty(pageReference.state.c__vamAccount)){
                    component.set("v.VAMAccount",pageReference.state.c__vamAccount);
                }   
               
                helper.getCaseInformation(component, event, helper, pageReference.state.c__caseId);
            }else{
                resolve('ok');
            }
            
            resolve('ok');
        }), this);
    },
    
    getCaseInformation : function (component, event, helper, caseId){
       //component.set('v.reloadAction', component.get('c.getCaseData'));
       //component.set('v.reload', false);
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getCaseData');
            
            action.setParams({
                'CaseId' : caseId
            });
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var caseData = actionResult.getReturnValue();
                    if(!$A.util.isEmpty(caseData)){
                        if(!$A.util.isEmpty(caseData.Priority)){
                           component.set("v.casePriority",caseData.Priority); 
                        }
                        if(!$A.util.isEmpty(caseData.CurrencyISOCode)){
                           component.set("v.caseCurrency",caseData.CurrencyISOCode); 
                        }
                        if(!$A.util.isEmpty(caseData.Subject)){
                           component.set("v.caseSubject",caseData.Subject); 
                        }
                        if(!$A.util.isEmpty(caseData.Description)){
                           component.set("v.caseDescription",caseData.Description); 
                        }
                        if(!$A.util.isEmpty(caseData.CASE_CUR_Amount__c)){
                           component.set("v.caseAmount",caseData.CASE_CUR_Amount__c); 
                        }
                        
                        resolve('ok');
                    
                    }else{
                        reject('ko');
                    }
                    
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                	reject('ko');
                }
            });
            $A.enqueueAction(action);
        }), this);
    },
	   /*
    Author:         R. cervinpo
    Company:        Deloitte
    Description:    Get VAM list
    History:
    <Date>          <Author>            <Description>
    25/01/2021      R. Cervino          Initial version
    */
    getVAMDetail: function (component, event, helper) {
       component.set('v.reloadAction', component.get('c.getVAMDetailController'));
       component.set('v.reload', false);
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getVAMDetail');
            action.setParams({"vamAccount": component.get("v.VAMAccount")});
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    console.log(returnValue);
                    if (returnValue.success == true) {
                        var detail = returnValue.value.virtualAccount.virtualAccountParent.virtualAccountData;
                        component.set("v.VAMDetail", detail);
                        if(!$A.util.isEmpty(detail.balance) && !$A.util.isEmpty(detail.balance.tcurrency)){
                        	component.set("v.caseCurrency", detail.balance.tcurrency);
                        }
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
    },
	   /*
    Author:         R. cervinpo
    Company:        Deloitte
    Description:    Get priorities list
    History:
    <Date>          <Author>            <Description>
    25/01/2021      R. Cervino          Initial version
    */
    getPriorityValues: function (component, event, helper) {
       component.set('v.reloadAction', component.get('c.getPriorityPicklist'));
       component.set('v.reload', false);
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getPriorityPicklist');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    console.log(actionResult.getReturnValue());
                    var returnValue = actionResult.getReturnValue();
                    component.set("v.priorityList", returnValue);
                    resolve('ok');

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
    },
    
    handleBlurAmount: function (component, event, helper) {
    	var detail = component.get("v.VAMDetail");
        var amount = component.get("v.caseAmount");
        
        var balance = '';
        var limitMax = '';
        var limitMin = '';

        if(!$A.util.isEmpty(detail)){
            if(!$A.util.isEmpty(detail.balance) && !$A.util.isEmpty(detail.balance.amount)){

                balance = parseFloat(detail.balance.amount);
            }
            if(!$A.util.isEmpty(detail.tlimit) && !$A.util.isEmpty(detail.tlimit.limitMax) && !$A.util.isEmpty(detail.tlimit.limitMax.amount)){
                limitMax = parseFloat(detail.tlimit.limitMax.amount);
            }
            
            if(!$A.util.isEmpty(detail.tlimit) && !$A.util.isEmpty(detail.tlimit.limitMin) &&  !$A.util.isEmpty(detail.tlimit.limitMin.amount)){
                limitMin = parseFloat(detail.tlimit.limitMin.amount);
            }
        }
        if($A.util.isEmpty(balance) || $A.util.isEmpty(limitMin) || $A.util.isEmpty(limitMax)){
            component.set("v.displayNewCaseButton", true);
        }else{
            if (!$A.util.isEmpty(amount)) {    
                var amountField = component.find("toAmount");
                if(!$A.util.isEmpty(balance) && amount > balance){
                    amountField.setCustomValidity('Surpass the available amount');
                    amountField.reportValidity();
                    component.set("v.displayNewCaseButton", true);
                }else if(!$A.util.isEmpty(balance) && !$A.util.isEmpty(limitMin) && balance-amount < limitMin){
                    amountField.setCustomValidity('Less than the minimum limit');
                    amountField.reportValidity();
                    component.set("v.displayNewCaseButton", false);
                /*}else if(!$A.util.isEmpty(balance) && !$A.util.isEmpty(limitMin) && balance-amount > limitMax){
                    amountField.setCustomValidity('More than the maximum limit');
                    amountField.reportValidity();*/
                }else{
                    amountField.setCustomValidity('');
                    amountField.reportValidity();
                    component.set("v.displayNewCaseButton", false);
                }
            }
        }
        
        
    },
    
    getUserData: function (component, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get('c.getUserData');
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var stateRV = actionResult.getReturnValue();
                    if (stateRV.success) {
                        if (!$A.util.isEmpty(stateRV.value)) {
                            if (!$A.util.isEmpty(stateRV.value.userData)) {
                                component.set('v.userData', stateRV.value.userData);
                                resolve('getUserData_OK');
                            } else {
                    			reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));

                            }
                        } else {
                            reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));

                        }
                    } else {
                    	reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                } else if (actionResult.getState() == 'ERROR') {
                    var errors = actionResult.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                        }
                    }
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                } else {
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },
    handleNewCase: function (component, event, helper) {
       component.set('v.reloadAction', component.get('c.handleNewCase'));
       component.set('v.reload', false);
        var action = component.get('c.createCase');
        
        action.setParams({
            'amount' : component.get("v.caseAmount"),
            'tcurrency' : component.get("v.caseCurrency"),
            'subject' : component.get("v.caseSubject"),
            'description' : component.get("v.caseDescription"),
            'priority' : component.get("v.casePriority"),
            'VAMAccount' : component.get("v.VAMAccount"),
            'beneficiaryName' : component.get("v.VAMDetail").linkedAccountDataDetails.destinationEntityDetails.destinationEntityName,
            'beneficiaryId' :  component.get("v.VAMDetail").linkedAccountDataDetails.destinationAccountId,
            'beneficiaryBic' :  component.get("v.VAMDetail").linkedAccountDataDetails.destinationEntityDetails.destinationEntityBic
        });
        action.setCallback(this, function (actionResult) {
            if (actionResult.getState() == 'SUCCESS') {
                var returnValue = action.getReturnValue();
                if(!$A.util.isEmpty(returnValue)){
                	helper.showToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.CASE_NewCase')+' '+ returnValue, true, 'success');                
               		setTimeout(function(){ helper.closeModal(component, event, helper); helper.goToCase(component, event, helper, returnValue); }, 1500);
                }else{
                    helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
                }
            } else if (actionResult.getState() == 'ERROR') {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
            }
        });
        $A.enqueueAction(action);
    },
    handleEditCase: function (component, event, helper) {
       component.set('v.reloadAction', component.get('c.handleEditCase'));
       component.set('v.reload', false);
       var action = component.get('c.updateCase');
       action.setParams({
            'amount' : component.get("v.caseAmount"),
            'tcurrency' : component.get("v.caseCurrency"),
            'subject' : component.get("v.caseSubject"),
            'description' : component.get("v.caseDescription"),
            'priority' : component.get("v.casePriority"),
            'CaseId' : component.get("v.caseId")
        });
        action.setCallback(this, function (actionResult) {
            if (actionResult.getState() == 'SUCCESS') {
                helper.showToast(component, event, helper, $A.get('$Label.c.success'), $A.get('$Label.c.cmpOTVParentUsersLanding_2'), true, 'success');                
				
                setTimeout(function(){ helper.closeModal(component, event, helper); }, 1500);
                
            } else if (actionResult.getState() == 'ERROR') {
                var errors = actionResult.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log('Error message: ' + errors[0].message);
                    }
                }
                helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false, 'error');
            }
        });
        $A.enqueueAction(action);
    },
    closeModal: function (component, event, helper) {
        if(component.get("v.editCase") == true){
            //helper.closeTab(component, event, helper, true);
            window.location = $A.get('$Label.c.domainBackfront')+'/'+component.get("v.caseId");
        }else{
    		component.set("v.showDetail", false);
        }
    },
    
    closeTab : function (component, event, helper, goToRecord){
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            var focusedTabId = response.tabId;
            if(goToRecord == true){
            	window.location = $A.get('$Label.c.domainBackfront')+'/'+component.get("v.caseId");
            }
            workspaceAPI.closeTab({tabId: focusedTabId});

        })
        .catch(function(error) {
            console.log(error);
        });
    },
        
    goToCase : function (component, event, helper, caseId){
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": caseId
        });
        navEvt.fire();
    }
})