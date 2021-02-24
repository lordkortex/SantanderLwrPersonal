({
	goToSupport : function(component, event, helper) {
        helper.goTo(component, event, 'contactsupport','');
	},

	showDownload : function(component, event, helper) {
        component.set("v.showDownload", true);
	},

	setShowDownload : function(component, event, helper) {
        component.set('v.showDownload', event.getParam('showDownload'));
	}
})