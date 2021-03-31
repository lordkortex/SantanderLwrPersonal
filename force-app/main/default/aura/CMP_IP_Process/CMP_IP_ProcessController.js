({
    initComponent: function (component, event, helper) {
        component.set('v.stepBy', 1);
        component.set('v.activeBy', 1);
        component.set('v.dataSelectOrigin', {});
        component.set('v.dataSelectDestination', {});
        component.set('v.dataSelectAmount', {});
        component.set('v.dataPaymentInformation', {});
        component.set('v.spinner', false);
    },

    handleBack: function (component, event, helper) {
        //helper.previousStep(component, helper);
    },

    handleCancel: function (component, event, helper) {
        alert('Cancelar.');
    },  

    handleContinue:function(component,event,helper){
        
    }
})