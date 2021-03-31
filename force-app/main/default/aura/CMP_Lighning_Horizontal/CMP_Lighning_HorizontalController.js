({
	doInit : function(component, event, helper) {
		
        var title = $A.get("$Label.c.Userguide_Title");
        var subtitle = $A.get("$Label.c.Userguide_Subtitle");
        
        component.set("v.title", title);
        component.set("v.subtitle", subtitle);
	}
})