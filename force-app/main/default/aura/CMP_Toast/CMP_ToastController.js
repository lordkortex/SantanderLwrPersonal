({
    hide : function(component, event, helper) {
        component.set("v.show",false);
    },

    closeAfter : function(component, event, helper) {
        console.log("entro");
        var show = component.get("v.show");
        var closeToast = component.get("v.toBeHidden");
        console.log(show);
        if (show) {
            setTimeout($A.getCallback(function() {
                component.set("v.openClass", 'is-open');
            }), 10);
        } else {
            setTimeout($A.getCallback(function() {
                component.set("v.openClass", '');
            }), 10);          
        }
        if(closeToast){
            if(show==true){
                setTimeout(function(){
                    component.set("v.show",false);
                }, 5000);
            }
        } 
    }
})