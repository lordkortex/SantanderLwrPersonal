({
	/*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    When a row button is clicked, this method is triggerd
    History
    <Date>          <Author>            <Description>
    22/01/2019      Joaquin Vera        Initial version
    */
    handleButtonClick : function(component, event, helper) {
		var whichButton = event.currentTarget.id;

		var profileButtonClicked = whichButton == "profileButton";
		var modifyButtonClicked = whichButton == "modifyButton";
        var viewButtonClicked = whichButton == "viewButton";
        var regeneratePasswordButtonClicked = whichButton == "regeneratePasswordButton";
		var deleteButtonClicked = whichButton == "deleteButton";

        var buttonClickedEvent = component.getEvent("ListClickedEvent");
		if(buttonClickedEvent){
			buttonClickedEvent.setParams({
											"profileButtonClicked" : profileButtonClicked,
											"modifyButtonClicked" : modifyButtonClicked,
                                            "viewButtonClicked" : viewButtonClicked,
                                            "regeneratePasswordButtonClicked" : regeneratePasswordButtonClicked,
											"deleteButtonClicked" : deleteButtonClicked,
											"userInteraction" : component.get("v.data")
										});
			buttonClickedEvent.fire();
		}
	}

})