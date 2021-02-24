({
    changeIsFrom : function(component, event, helper) {
        console.log("Data: " + component.get("v.userId"));
        console.log("Data: " + component.get("v.userName"));
        console.log("Data: " + component.get("v.userRol"));
        console.log("Data: " + component.get("v.userGroup"));
        if(component.get("v.isGroup")) {
            component.set("v.isUsers", false);
        } 
    }
})