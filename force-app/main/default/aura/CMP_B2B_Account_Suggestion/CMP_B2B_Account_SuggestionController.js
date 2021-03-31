({
	handleClick: function (component, event, helper) {
        let account = component.get('v.account');
        let onclick = component.getEvent('onclick');
        onclick.setParams({
            'account': account
        });
        onclick.fire();
	}
})