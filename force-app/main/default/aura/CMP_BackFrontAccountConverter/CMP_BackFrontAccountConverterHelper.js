({
	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to obtain the currency list.
    <Date>			<Author>		<Description>
	08/07/2020		Adrian Muñio    Initial version*/
	getCurrency : function(component, event, helper){
        try {
            var action = component.get("c.getCurrencies");
            action.setCallback(this, function(response){
                var state = response.getState();
                if(state === "SUCCESS"){
                    var res =response.getReturnValue();
                    if(res!=null && res!=undefined && res!=""){
                        component.set("v.currencyList",res);
                    }
                }else if(state === "ERROR"){
                    var errors = response.getError();
                    if(errors){
                        if(errors[0] && errors[0].message){
                            console.log("Error message: " + errors[0].message);
                        }
                    }else{
                    	console.log("Unknown error");
                    }
                }
            });
			$A.enqueueAction(action);
			
        } catch (e) {
            console.log(e);
        }
	},
	
	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to clear the fields.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    clear : function(component, event, helper) {
		
		//Clean fields values.
		helper.saveValues(component, event, helper);
		component.set("v.cashNexusIdValue","");
		component.set("v.bicValue","");
		component.set("v.localIdValue" ,"");
		component.set("v.currencyValue","");

		//Unblocking fields in case they were blocked.
		helper.unblockFields(component, event, helper);

		//Clean messages.
		helper.showHideMessage(component, helper, 'errorText', null);
		helper.showHideMessage(component, helper, 'successText', null);

		//Back to first button combo.
		helper.showHideButtons('1');
	},
	
	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to save the fields.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    saveValues : function(component, event, helper) {
		component.set("v.cashNexusIdValue", document.getElementById("cashNexusIdField").value);
		component.set("v.bicValue" , 		document.getElementById("bicField").value);
		component.set("v.localIdValue" , 	document.getElementById("localIdField").value);
		//component.set("v.currencyValue", 	document.getElementById("currencyField").selectedValue);
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to show/hide the buttons.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	showHideButtons : function(comboToShow) {
		if(comboToShow != undefined && comboToShow != null){
			
			//First Screen Button combo.
			if(comboToShow == '1'){
				document.getElementById("searchB").style.display = "block";
				document.getElementById("createB").style.display = "none";
				document.getElementById("updateB").style.display = "none";
				document.getElementById("deleteB").style.display = "none";
			
			//Screen Button combo after a search without results.
			}else if(comboToShow == '2'){
				document.getElementById("searchB").style.display = "none";
				document.getElementById("createB").style.display = "block";
				document.getElementById("updateB").style.display = "none";
				document.getElementById("deleteB").style.display = "none";

			//Screen Button combo after a search with results or a creation.
			}else if(comboToShow == '3'){
				document.getElementById("searchB").style.display = "none";
				document.getElementById("createB").style.display = "none";
				document.getElementById("updateB").style.display = "block";
				document.getElementById("deleteB").style.display = "block";
			}
		}
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to show different messages.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	showHideMessage : function(component, helper, type, message){
		if(message != null){
			component.set("v.message", message);
			$A.util.removeClass(component.find(type), 'slds-hide');
		}else{
			$A.util.addClass(component.find(type), 'slds-hide');
		}
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to show the update & delete buttons.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	blockFields : function(component, event, helper) {
		document.getElementById("cashNexusIdField").setAttribute("disabled","disabled");
		document.getElementById("bicField").setAttribute("disabled","disabled");
		//document.getElementById("currencyField").setAttribute("disabled","disabled");
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to show the update & delete buttons.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	unblockFields : function(component, event, helper) {
		document.getElementById("cashNexusIdField").removeAttribute("disabled");
		document.getElementById("bicField").removeAttribute("disabled");
		//document.getElementById("currencyField").removeAttribute("disabled");
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to check if all required fields are filled.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	validateValues : function(component, event, helper, isCreation) {
		var valid = true;

		//CASHNEXUSID FIELD NOT FILLED.
		if(component.get("v.cashNexusIdValue") == undefined || component.get("v.cashNexusIdValue") == null || component.get("v.cashNexusIdValue") == ""){
			$A.util.removeClass(component.find("requiredText1"), 'slds-hide');
			valid = false;
		}else{
			$A.util.addClass(component.find("requiredText1"), 'slds-hide');
		}

		//BIC FIELD NOT FILLED.
		if(component.get("v.bicValue") == undefined || component.get("v.bicValue") == null || component.get("v.bicValue") == ""){			
			$A.util.removeClass(component.find("requiredText2"), 'slds-hide');	
			valid = false;
		}else{
			$A.util.addClass(component.find("requiredText2"), 'slds-hide');
		}
		
		if(isCreation){
			//BANKID FIELD NOT FILLED.
			if(component.get("v.localIdValue") == undefined || component.get("v.localIdValue") == null || component.get("v.localIdValue") == ""){
				$A.util.removeClass(component.find("requiredText3"), 'slds-hide');
				valid = false;	
			}else{
				$A.util.addClass(component.find("requiredText3"), 'slds-hide');
			}
		}

		component.set("v.validValues", valid);
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to generate the params for the service's call.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	generateParams : function(component, operation) {
		let params = {
			"operation"			: operation,
			"cashNexusId" 		: component.get("v.cashNexusIdValue"),
			"bic" 				: component.get("v.bicValue"),
			"localId" 			: component.get("v.localIdValue"),
			"accountCurrency" 	: component.get("v.currencyValue")
		}
		component.set("v.params", params);
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to call the service and search an existing conversion.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    search : function(component, event, helper) {
		try{
			//CALL SERVICE
			helper.generateParams(component, 'search');
			component.find("Service").callApex2(component, helper,"c.callAccountServices", component.get("v.params"), helper.mapResult);

		}catch(e){
			console.log(e);
			helper.showHideMessage(component, helper, 'errorText', $A.get("$Label.c.accountConverterSearchError"));
		}
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to call the service and create a new conversion.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    create : function(component, event, helper) {
		try{
			//CALL SERVICE
			helper.generateParams(component, 'create');
			component.find("Service").callApex2(component, helper,"c.callAccountServices", component.get("v.params"), helper.checkResponse);

		}catch(e){
			console.log(e);
			helper.showHideMessage(component, helper, 'errorText', $A.get("$Label.c.accountConverterCreateError"));
		}
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to call the service and update an existing conversion.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    update : function(component, event, helper) {
		try{
			//CALL SERVICE
			helper.generateParams(component, 'update');
			component.find("Service").callApex2(component, helper,"c.callAccountServices", component.get("v.params"), helper.checkResponse);

		}catch(e){
			console.log(e);
			helper.showHideMessage(component, helper, 'errorText', $A.get("$Label.c.accountConverterUpdateError"));
		}
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to call the service and delete an existing conversion.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
    delete : function(component, event, helper) {
		try{
			//CALL SERVICE
			helper.generateParams(component, 'delete');
			component.find("Service").callApex2(component, helper,"c.callAccountServices", component.get("v.params"), helper.checkResponse);

		}catch(e){
			console.log(e);
			helper.showHideMessage(component, helper, 'errorText', $A.get("$Label.c.accountConverterDeleteError"));
		}
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to check the service's response.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	checkResponse : function(component, helper, response) {
		if(response != undefined && response != null){
			if(response == 'CREATEOK'){
				helper.showHideButtons('3');
				helper.blockFields(component, event, helper);
				helper.showHideMessage(component, helper, 'successText', $A.get("$Label.c.accountConverterCreateSuccess"));

			} else if(response == 'CREATEKO'){
				helper.showHideMessage(component, helper, 'errorText', $A.get("$Label.c.accountConverterCreateError"));

			} else if(response == 'UPDATEOK'){
				helper.showHideMessage(component, helper, 'successText', $A.get("$Label.c.accountConverterUpdateSuccess"));

			} else if(response == 'UPDATEKO'){
				helper.showHideMessage(component, helper, 'errorText', $A.get("$Label.c.accountConverterUpdateError"));

			} else if(response == 'DELETEOK'){
				helper.clear(component, null, helper);
				helper.showHideMessage(component, helper, 'successText', $A.get("$Label.c.accountConverterDeleteSuccess"));
			
			} else if(response == 'DELETEKO'){
				helper.showHideMessage(component, helper, 'errorText', $A.get("$Label.c.accountConverterDeleteError"));
			}
		}
	},

	/*Author:       Adrian Muñio
    Company:        Deloitte
    Description:    Method to fill the values recivied from the service's search.
    <Date>			<Author>		<Description>
	26/06/2020		Adrian Muñio    Initial version*/
	mapResult : function(component, helper, response) {
		//RESULTS
		if(response != undefined && response != null && response.accounts != undefined){
			//MAP THE FIELDS
			component.set("v.cashNexusIdValue", response.accounts[0].accountId);
			component.set("v.bicValue", response.accounts[0].bankId);
			component.set("v.currencyValue", response.accounts[0].accountCurrency);
			for(var i in response.accounts[0].listIds){
				if(response.accounts[0].listIds[i].idType == "BBA"){
					component.set("v.localIdValue", response.accounts[0].listIds[i].accountId);
					break;
				}
				component.set("v.localIdValue", response.accounts[0].listIds[i].accountId);
			}
		
			helper.showHideButtons('3');
			helper.blockFields(component, event, helper);
			helper.showHideMessage(component, helper, 'successText', $A.get("$Label.c.accountConverterSearchSuccess"));
			
		//NO RESULTS
		}else{
			helper.showHideButtons('2');
			helper.showHideMessage(component, helper, 'errorText', $A.get("$Label.c.accountConverterSearchError"));
		}
	}
})