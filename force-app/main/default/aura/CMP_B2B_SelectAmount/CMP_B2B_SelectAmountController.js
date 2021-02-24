({
   /* initComponent: function (component, event,helper) {
        let steps = component.get('v.steps');
        let focusStep = steps.focusStep;
        let lastModifiedStep = steps.lastModifiedStep;
        let data = component.get('v.data');
        let isEditing = component.get('v.isEditing');
        let amount = data.amountSend;
        new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.spinner', true);
            let data = component.get('v.data');
            if (focusStep == lastModifiedStep && focusStep != 5) {
                data.timestamp = '';
                data.exchangeRate = 0;
                if ($A.util.isEmpty(amount)) {
                    data.amountSend = null;
                    data.amountReceive = null;
                }
            }
            
            helper.handleChangeAmount(component, event, helper, data.amountSend, 'source'); 
            
         	
            component.set('v.data', data);
            component.set('v.convertedAmount', '');
			resolve('Ok');
		}), this).then($A.getCallback(function (value) {
            if (!isEditing) {
                component.set('v.spinner', false);
            }
        })).catch($A.getCallback(function (error) {
            toast().error('', error);
        }));
        component.set('v.steps.lastModifiedStep', 3);
    },*/
    initComponent: function (component, event,helper) {
        var steps = component.get('v.steps');
        steps.lastModifiedStep = 3;
        component.set('v.steps', steps);
        let isEditing = component.get('v.isEditing');
        let data = component.get('v.data');
        new Promise($A.getCallback(function (resolve, reject) {
            let steps = component.get('v.steps');
            let focusStep = steps.focusStep;
            let lastModifiedStep = steps.lastModifiedStep;
            
            let amount = data.amountSend;
            
            if (focusStep == lastModifiedStep && focusStep != 5) {
                data.timestamp = '';
                data.exchangeRate = 0;
                if ($A.util.isEmpty(amount)) {
                    data.amountSend = null;
                    data.amountReceive = null;
                }
            }
            resolve('Ok');
        }), this).then($A.getCallback(function (value) {
            if(!isEditing){
                return helper.handleChangeAmount(component, event, helper, data.amountSend, 'source');  
            }
              if(isEditing){
                component.set('v.spinner', true);
                return helper.showInformation(component, event, helper);
            } 
        })).catch($A.getCallback(function (error) {
            toast().error('', error);
        })).finally($A.getCallback(function () {
            component.set('v.data', data);
            component.set('v.convertedAmount', '');
            component.set('v.spinner', false);
            helper.formatUpdatedDate(component, event, helper);
        }));
    },
    
    handleCheckContinue: function (component, event, helper) {
        let data = component.get('v.data');
        // let amountUnavailable = component.get('v.amountUnavailable');
        let errorMSG = '';
        if (($A.util.isEmpty(data.amountSend) || data.amountSend == 0)) {
            errorMSG = $A.get('$Label.c.B2B_Error_Enter_Input');
            var msg_parameter = $A.get('$Label.c.B2B_Amount_Input_Placeholder');
            errorMSG = errorMSG.replace('{0}', msg_parameter);
            component.set('v.errorMSG', errorMSG);
        } /*else if (amountUnavailable == true) {
            component.set('v.errorMSG', $A.get('$Label.c.B2B_Error_Amount_Exceeds_Balance'));
        }*/ else if (component.get("v.disabledContinue") == true) {
            var notificationTitle =  $A.get('$Label.c.B2B_Error_Problem_Loading');
            var bodyText =  $A.get('$Label.c.B2B_Error_Enter_Amount');
            helper.showToast(component, notificationTitle, bodyText, true);
        } else {
            component.set('v.errorMSG', errorMSG);
            component.set('v.spinner', true);
            var parametros =  helper.getTransferFees(component, event, helper);
            parametros.then($A.getCallback(function (value) {
                return helper.updatePaymentDetails(component, event, helper);
            })).then($A.getCallback(function (value) {
                helper.completeStep(component, event, helper);
            })).catch($A.getCallback(function (error) {
                console.log(error);
            })).finally($A.getCallback(function () {
                component.set('v.spinner', false);
            }));
        }
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
        helper.showInformation(component, event, helper)
        .then($A.getCallback(function (value) {
            component.set('v.isEditing', false);
            helper.handleChangeAmount(component, event, helper, amountEntered, amountEnteredFrom);
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
    }
})