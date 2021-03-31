({
    updateProgressEvent : function (component, helper, value) {
        let updateProgress = component.getEvent('updateProgress');
        updateProgress.setParams({
            'progress': value
        });
        updateProgress.fire();
	}
})