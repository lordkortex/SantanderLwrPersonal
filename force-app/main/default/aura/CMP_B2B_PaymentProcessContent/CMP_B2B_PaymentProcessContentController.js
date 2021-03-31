({
    btnUpdateProgress: function (component, event, helper) {
        var value = component.get('v.progress');
        value += 1;
        component.set('v.progress', value);
        helper.updateProgressEvent(component, helper, value);
    }
})