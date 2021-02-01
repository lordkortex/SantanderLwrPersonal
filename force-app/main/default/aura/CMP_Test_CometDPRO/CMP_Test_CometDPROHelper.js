({
    auxCometD: function (component, event, helper) {
        component.set('v.cometdSubscriptions', []);
        window.addEventListener('unload', function (event) {
            helper.disconnectCometd(component);
        });
        var action = component.get('c.getSessionId');
        action.setCallback(this, function (response) {
            if (component.isValid() && response.getState() === 'SUCCESS') {
                if (!$A.util.isEmpty(response.getReturnValue())) {
                    component.set('v.sessionId', response.getReturnValue());
                    if (component.get('v.cometd') != null) {
                        helper.connectCometd(component, event, helper);
                    } 
                }
            } else {
                console.error(response);
            }
        });
        $A.enqueueAction(action);
    },

    connectCometd: function (component, event, helper) {
        var helper = this;
        var cometdUrl = $A.get('$Label.c.domain') + '/cometd/40.0/'; // Option 1
        // var cometdUrl = $A.get('$Label.c.domainBackfront') + 'cometd/40.0/'; // Option 2
        var cometd = component.get('v.cometd');
        cometd.configure({
            'url': cometdUrl,
            'requestHeaders': {
                'Authorization': 'OAuth '+ component.get('v.sessionId')
            },
            'appendMessageTypeToURL' : false
        });
        cometd.websocketEnabled = false;
        // Establish CometD connection
        console.log('Connecting to CometD: ' + cometdUrl);
        cometd.handshake(function (handshakeReply) {
            if (handshakeReply.successful) {
                console.log('Connected to CometD.');
                // Subscribe to platform event
                var newSubscription = cometd.subscribe('/event/OTPValidation__e', function (platformEvent) {
                    window.alert('Estamos: ' + platformEvent);
                });
                // Save subscription for later
                var subscriptions = component.get('v.cometdSubscriptions');
                subscriptions.push(newSubscription);
                component.set('v.cometdSubscriptions', subscriptions);
            } else {
                console.error('Failed to connected to CometD.');
            }
        });
    },
    
    disconnectCometd: function (component) {
        var cometd = component.get('v.cometd');
        cometd.batch(function () {
            console.log('Disconnecting...');
            var subscriptions = component.get('v.cometdSubscriptions');
                subscriptions.forEach(function (subscription) {
                    cometd.unsubscribe(subscription);
                    console.log('Disconnected: ' + subscription);
                });
            });
        component.set('v.cometdSubscriptions', []);
        cometd.disconnect();
        console.log('CometD disconnected.');
    }
})