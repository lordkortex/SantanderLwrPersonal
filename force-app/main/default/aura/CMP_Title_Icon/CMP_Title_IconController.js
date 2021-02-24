({
	openSearchForm : function(component, event, helper) {
      
        var iFire = component.getEvent("displayTransactionForm");
        iFire.setParams({
            "openForm" : "True"
        });
        iFire.fire();
    },
    
    onButtonClick : function(component, event, helper) {
		var whichButton = event.currentTarget.id;

		var downloadClicked = whichButton == "downloadIcon";
		var searchClicked = whichButton == "searchIcon";
		var addClicked = whichButton == "addIcon";

		var buttonClickedEvent = component.getEvent("buttonClickedEvent");
		if(buttonClickedEvent){
			buttonClickedEvent.setParams({
											"downloadClicked" : downloadClicked,
											"searchClicked" : searchClicked,
											"addClicked" : addClicked
										});
			buttonClickedEvent.fire();
		}
	}
})