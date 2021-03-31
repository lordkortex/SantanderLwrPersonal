({
    changeSpinner : function(component, event, helper){
        if(component.get("v.paymentData").amount != undefined){
            component.set("v.spinner",false);
        }
    }
})