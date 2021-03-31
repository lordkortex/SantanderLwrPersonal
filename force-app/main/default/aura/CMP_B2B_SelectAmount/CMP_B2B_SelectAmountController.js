({
    initComponent: function (component, event, helper) {     
        helper.getPaymentDetails(component, event, helper).then($A.getCallback(function (value) {
            return helper.initComponent(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.ServicePaymentLine(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.formatUpdatedDate(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.setShowBalanceInfo(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.showHideComponents(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
            reject('KO');
        }));      
   
    },

    handleCheckContinue: function (component, event, helper) {
      	component.set('v.spinner', true);
        helper.paymentDetailsContinue(component, event, helper)
        .then(function (value) {
            return helper.updatePaymentDetails(component, helper);
		}).then($A.getCallback(function (value) {
            return helper.processPaymentTransferFees(component, event, helper);
        })).then($A.getCallback(function (value) {
            helper.completeStep(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
            reject('KO');
        })).finally($A.getCallback(function () {
            component.set('v.spinner', false);
        }));
    },

    handleEditingProcess: function (component, event, helper) {
        let params = event.getParams().arguments;
        let amountEntered = null;
        let amountEnteredFrom = '';
        if (!$A.util.isEmpty(params.amountEntered)) {
            amountEntered = params.amountEntered;
        }
        if (!$A.util.isEmpty(params.amountEnteredFrom)) {
            amountEnteredFrom = params.amountEnteredFrom;
        }
        helper.showInformation(component, event, helper, amountEntered, amountEnteredFrom)
        .then($A.getCallback(function (value) {
            component.set('v.isEditing', false);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        }));
    },

    handleChange: function (component, event, helper) {
        let params = event.getParams(); 
        var steps = component.get('v.steps');
        steps.lastModifiedStep = 3;
        steps.focusStep = 3;
        steps.shownStep = 3;
        component.set('v.steps', steps);
        var amountEnteredFrom = '';
        if (params.inputId == 'sourceAmountInput') {
            amountEnteredFrom = 'source';
        } else if (params.inputId == 'recipientAmountInput') {
            amountEnteredFrom = 'recipient';
        }
        helper.handleChangeAmount(component, event, helper, params.amount, amountEnteredFrom);
        component.set('v.isEditing', false);
    },
})