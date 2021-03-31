({
	doInit : function(component, event, helper) {
		var url = window.location.href;
		if(url.includes("public")){
			component.set("v.isPublic", true);
		}
	},

	expand1 : function(component, event, helper) {
		component.set("v.isExpanded1", !component.get("v.isExpanded1"));
	},
    
    expand2 : function(component, event, helper) {
		component.set("v.isExpanded2", !component.get("v.isExpanded2"));
	},
    
    expand3 : function(component, event, helper) {
		component.set("v.isExpanded3", !component.get("v.isExpanded3"));
	},
    
    expand4 : function(component, event, helper) {
		component.set("v.isExpanded4", !component.get("v.isExpanded4"));
	},
    
    expand5 : function(component, event, helper) {
		component.set("v.isExpanded5", !component.get("v.isExpanded5"));
	},
    
    expand6 : function(component, event, helper) {
		component.set("v.isExpanded6", !component.get("v.isExpanded6"));
	},
    
    expand7 : function(component, event, helper) {
		component.set("v.isExpanded7", !component.get("v.isExpanded7"));
	}
})