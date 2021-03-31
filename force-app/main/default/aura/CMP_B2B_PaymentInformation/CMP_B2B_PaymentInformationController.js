({
    initComponent: function (component, event, helper) {
        new Promise($A.getCallback(function (resolve, reject) {
            helper.setValuePaymentDraft(component, event, helper);
            resolve('Ok');
        })).then($A.getCallback(function (value) {
            return helper.setDate(component, event, helper);
        })).then($A.getCallback(function (value) {
            return helper.getNavigatorInfo(component, event, helper);
        })).catch($A.getCallback(function (error) {
            console.log(error);
        }));
    },

    handleCheckContinue: function (component, event, helper) {
        let paymentDraft = component.get('v.paymentDraft');
        let reference = paymentDraft.reference;
        let purpose = paymentDraft.purpose;
        let description = paymentDraft.description;
        var sourceAccountData = paymentDraft.sourceAccount;
        let maxCharacters = 140;
        let transferType = $A.util.isEmpty(component.get('v.transferType')) ? '' : component.get('v.transferType');
        let PTT_international_transfer_single = $A.get('$Label.c.PTT_international_transfer_single');
        if ($A.util.isEmpty(reference) || (sourceAccountData.mandatoryPurpose == true && $A.util.isEmpty(purpose) && transferType != PTT_international_transfer_single)  || description.length > maxCharacters) {
            let msgRef = '';
            let msgPurpose = '';
            if ($A.util.isEmpty(reference)) {
                msgRef = $A.get('$Label.c.B2B_Error_Enter_Input');
                let paramRef = $A.get('$Label.c.B2B_Reference');
                msgRef = msgRef.replace('{0}', paramRef);
            }
            if (sourceAccountData.mandatoryPurpose == true && $A.util.isEmpty(purpose)) {
                msgPurpose = $A.get('$Label.c.B2B_Error_Enter_Input');
                let paramPurpose = $A.get('$Label.c.B2B_PaymentPurpose');
                msgPurpose = msgPurpose.replace('{0}', paramPurpose);
            }
            component.set('v.errorRef', msgRef);
            component.set('v.errorPurpose', msgPurpose);    
        } else {
            component.set('v.spinner', true);
            helper.getLimits(component, event, helper).then($A.getCallback(function (value) { 
                return helper.updatePaymentDetails(component, helper);
            })).then($A.getCallback(function (value) { 
                return helper.checkFCCDowJones(component, helper);
            })).then($A.getCallback(function (value) { 
                return helper.getPaymentSignatureStructure(component, helper);
             })).then($A.getCallback(function (value) { 
               return helper.postFraud(component, event, helper);
            })).then($A.getCallback(function (value) {
                return helper.completeStep(component, helper);
            })).catch($A.getCallback(function (value) {
                if (!$A.util.isEmpty(value.FCCError) && value.FCCError == true) {
                    helper.handleFCCError(component, helper);
                }
                console.log(value.message);
            })).finally($A.getCallback(function () {
                component.set('v.spinner', false);
            }));
        }
    },

    handleDropdowns: function (component, event, helper) {
        var eventName = event.getParam('name');
        var eventDropdown = event.getParam('showDropdown');
        if (eventDropdown) {
            let dropdown = component.find('dropdown');
            for (let i = 0; i < dropdown.length; i++) {
                if (dropdown[i].get('v.name') == eventName) {
                    dropdown[i].set('v.showDropdown', true);
                } else {
                    dropdown[i].set('v.showDropdown', false);
                }
            }
        }
    },

    handleModified: function (component, event, helper) {
        let isModified = component.get('v.isModified');
        let steps = component.get('v.steps');
        if (isModified) {
            steps.lastModifiedStep = 4;
            steps.focusStep = 4;
            steps.shownStep = 4;
        }
        component.set('v.steps', steps);
    },
    
    updateFiles: function (component, event, helper) {
        let paymentDraft = component.get('v.paymentDraft');
        if(event != null && event != undefined){
            if(event.detail.currentFiles != null && event.detail.currentFiles.length>0){
            	paymentDraft.documents = event.detail.currentFiles;
        	}
        }
        component.set('v.paymentDraft', paymentDraft);
    }
})