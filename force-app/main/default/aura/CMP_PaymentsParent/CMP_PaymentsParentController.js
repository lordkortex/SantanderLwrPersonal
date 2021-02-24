({
    doInit: function (component, event, helper) {
        component.set('v.showSpinner', true);
        Promise.all([
            helper.getCurrentUserInfo(component, event, helper),  
            helper.getCurrency(component, event, helper),
            helper.getStatus(component, event, helper),
            helper.getStatusReasonList(component, event, helper),
            helper.getPaymentMethod(component, event, helper),
            helper.getCountry(component, event, helper)
        ]).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function () {
            component.set('v.showSpinner', false);
        }));        
    },
            
    handleReset: function (component, event, helper) { 
        component.set('v.showSpinner', true);
        Promise.all([
            helper.reset(component, event, helper),
            helper.resetSort(component, event, helper),
            helper.resetPagination(component, event, helper)
        ]).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function() {
            component.set('v.showSpinner', false);
        }));  
	}, 

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to search payments
    History
    <Date>		<Author>		<Description>
	06/08/2020	Shahad Naji     Initial version
    */
    handleSearch: function (component, event, helper) {
        component.set('v.showSpinner', true);
      
        Promise.all([
            helper.search(component, event, helper),
            helper.resetSort(component, event, helper),
            helper.resetPagination(component, event, helper)
        ]).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function() {
            component.set('v.showSpinner', false);
        }));  
    },

    sortPaymentReference: function (component, event, helper) {        
        component.set('v.selectedTabsoft', 'paymentReference');
        helper.sortHelper(component, event, helper, 'paymentReference');
    },

    sortPaymentStatus: function (component, event, helper) {
        component.set('v.selectedTabsoft', 'paymentStatus');
        helper.sortHelper(component, event, helper, 'paymentStatus');
    },

    sortSourceAccount: function (component, event, helper) {
        component.set('v.selectedTabsoft', 'sourceAccount');
        helper.sortHelper(component, event, helper, 'sourceAccount');
    },

    sortBeneficiaryAccount: function (component, event, helper) {
        component.set('v.selectedTabsoft', 'beneficiaryAccount');
        helper.sortHelper(component, event, helper, 'beneficiaryAccount');
    },

    sortPaymentMethod : function (component, event, helper) {
        component.set('v.selectedTabsoft', 'paymentMethod');
        helper.sortHelper(component, event, helper, 'paymentMethod');
    },

    sortValueDate : function (component, event, helper) {
        component.set('v.selectedTabsoft', 'valueDate');
        helper.sortHelper(component, event, helper, 'valueDate');
    },

    sortFX: function (component, event, helper) {
        component.set('v.selectedTabsoft', 'FX');
        helper.sortHelper(component, event, helper, 'FX');
    },

    sortPaymentCurrency: function (component, event, helper) {
        component.set('v.selectedTabsoft', 'paymentCurrency');
        helper.sortHelper(component, event, helper, 'paymentCurrency');
    },

    sortPaymentAmount: function (component, event, helper) {
        component.set('v.selectedTabsoft', 'paymentAmount');
        helper.sortHelper(component, event, helper, 'paymentAmount');
    },

    goToPayment: function (component, event, helper) {
        component.set('v.showSpinner', true);
        var id = event.currentTarget.id;        
        var lst = component.get('v.paymentList');        
        var obj = lst.find(element => element.paymentId == id);        
        component.set('v.paymentObj', obj);
        Promise.all([
            helper.getPaymentDetails(component, event, helper)
        ])/*.then($A.getCallback(function (value) { 
        	helper.setTime(component, event, helper);
        }))*/.then($A.getCallback(function (value) { 
            if(value == 'ok'){
                component.set('v.isOpen', true);
            }else{
                component.set('v.showSpinner', false);
                helper.showErrorToast(component, event, helper);
            }
            
        })).catch(function (error) {
            console.log(error);
        }).finally($A.getCallback(function() {
            component.set('v.showSpinner', false);
        }));
        
        
        
    },
    
    handlePreviousPage: function (component, event, helper) {
        var currentPage = component.get('v.currentPage');
        if (currentPage > 1) {
            helper.previousPage(component, helper);
        }
    },
    
    handleNextPage: function (component, event, helper) {
        var currentPage = component.get('v.currentPage');
        var pages = component.get('v.pagesNumbers');
        var lastPage = pages[pages.length - 1];
        if (currentPage < lastPage) {
            helper.nextPage(component, event, helper);
        }
    },

    onChangeSelect: function (component, event, helper) {
        component.set('v.selectedValue', component.find('select').get('v.value'));
        helper.setPaginations(component, event, helper);
    },

    handleBlurOrderingAccount: function (component, event, helper) {

        var orderingAccountNumber = component.get('v.selectedSourceValue');
        var orderingAccountType = component.get('v.selectedAccountTypeValue');
        var PAY_ERROR_AccountType = $A.get("$Label.c.PAY_ERROR_AccountType");
        var PAY_ERROR_AccountNumber = $A.get("$Label.c.PAY_ERROR_AccountNumber");
        if (!$A.util.isEmpty(orderingAccountNumber) && $A.util.isEmpty(orderingAccountType)) {           
            component.find("orderingAccount").setCustomValidity(PAY_ERROR_AccountType);
            component.find("orderingAccount").reportValidity();
        }
        if ($A.util.isEmpty(orderingAccountNumber) && !$A.util.isEmpty(orderingAccountType)) {
            component.find("orderingAccountType").setCustomValidity(PAY_ERROR_AccountNumber);
            component.find("orderingAccountType").reportValidity();
        }
        if ((!$A.util.isEmpty(orderingAccountNumber) && !$A.util.isEmpty(orderingAccountType)) || ($A.util.isEmpty(orderingAccountNumber) && $A.util.isEmpty(orderingAccountType))) {
            component.find("orderingAccount").setCustomValidity('');
            component.find("orderingAccount").reportValidity();
            component.find("orderingAccountType").setCustomValidity('');
            component.find("orderingAccountType").reportValidity();
        }        
    },

    handleBlurAmount: function (component, event, helper) {
        var fromError = $A.get("$Label.c.PAY_ErrorFromAmount");
        var toError = $A.get("$Label.c.PAY_ErrorToAmount");
        helper.validateRanges(component, event, helper, "fromAmount", "toAmount", fromError, toError, "lightning", "amount");
    },

    handleBlurValueDate: function (component, event, helper) {
        var fromError = $A.get("$Label.c.PAY_ErrorFromDate");
        var toError = $A.get("$Label.c.PAY_ErrorToDate");
        var fieldFrom = component.find('valueDateFrom');
        var fieldTo = component.find('valueDateTo');
        helper.validateRanges(component, event, helper, "valueDateFrom", "valueDateTo", fromError, toError, "lightning", "date");
    },

    handleBlurExecutionDate: function (component, event, helper) {
        var fromError = $A.get("$Label.c.PAY_ErrorFromDate");
        var toError = $A.get("$Label.c.PAY_ErrorToDate");
        helper.validateRanges(component, event, helper, "executionDateFrom", "executionDateTo", fromError, toError, "lightning", "date");
    },
})