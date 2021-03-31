({
    initComponent: function (component, event, helper) {
        var steps = component.get('v.steps');
        steps.lastModifiedStep = 4;
        component.set('v.steps', steps);
    },

    handleCheckContinue: function (component, event, helper) {
        let reference = component.get('v.data.reference');
        let purpose = component.get('v.data.purpose');
        let description = component.get('v.data.description');
        let maxCharacters = 140;
        var sourceAccountData = component.get("v.sourceAccountData");

        if ($A.util.isEmpty(reference) || (sourceAccountData.mandatoryPurpose == true && $A.util.isEmpty(purpose))  || description.length > maxCharacters) {
            let msgRef = "";
            let msgPurpose = "";
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
    }
})