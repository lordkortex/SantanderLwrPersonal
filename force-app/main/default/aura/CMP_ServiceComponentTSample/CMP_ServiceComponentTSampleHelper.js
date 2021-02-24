({
	doInit : function(component, helper) {
        console.log('this1 ' + this);
    //var c = component.get('c.successFunction');
        component.set("v.contextThis", this);
        component.find("service").callApex(component, "c.doNothing", {}, component.get("v.contextThis").successFunction);
        //$A.enqueueAction(a);
        
	},
    
    successFunction : function(component, response, helper){
        //console.log(context);
        console.log("uuuuuu");
        console.log(this);
        //var c = component.get('c.successChildFunction');
        component.find("service").callApex(component, "c.doNothingAgain", {},  component.get("v.contextThis").successChildFunction);
        
    },
    
    successChildFunction : function(component, response){
        console.log("HOLA :)");
    }
})