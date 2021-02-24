({
    initComponent: function (component, event, helper) {
        helper.auxCometD(component, event, helper);
    },

    onCometdLoaded: function (component, event, helper) {
        var cometd = new org.cometd.CometD();
        component.set('v.cometd', cometd);
        if (component.get('v.sessionId') != null) {
            helper.connectCometd(component);
        }
    }
})