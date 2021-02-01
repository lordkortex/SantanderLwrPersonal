({

	showToast : function(component,event){
        component.set("v.message",event.getParam("message"));
        component.set("v.type",event.getParam("type"));
        component.set("v.show",event.getParam("show"));

    }
})