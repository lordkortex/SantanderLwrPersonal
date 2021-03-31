({
    showDropdown: function (component, helper) {
        if (component.get('v.showDropdown') == true) {
            component.set('v.showDropdown', false);            
        } else {
			component.set('v.showDropdown', true);
			helper.callEventDropdowns(component);
        }
    },

    // getPicklistValues: function(component) {
    //     var action = component.get('c.getComercialCodes');
	// 	action.setCallback(this, function (actionResult) {
	// 		if (actionResult.getState() == 'SUCCESS') {
	// 			var stateRV = actionResult.getReturnValue();
	// 			console.log("comercial code");
	// 			console.log(stateRV.success);
	// 			console.log(stateRV);
	// 			if (stateRV.success) {
	// 				component.set('v.values', stateRV.value.picklistValues);								
	// 			} 
	// 		} else {
	// 			var msg = "problem getting purpose picklist";
	// 			console.log(msg);
	// 		}
	// 	});
	// 	$A.enqueueAction(action);
	// },

	getPicklistValues: function(component) {
		var action = component.get('c.getCommercialCodes');
		
		action.setCallback(this, function (actionResult) {
			if (actionResult.getState() == 'SUCCESS') {
				var stateRV = actionResult.getReturnValue();
				if (stateRV.success) {
					if (!$A.util.isEmpty(stateRV.value)) {
						if (!$A.util.isEmpty(stateRV.value.commercialCodeList)) {
							var resultList = stateRV.value.commercialCodeList;
							var auxList = [];
							var comCodeList = [];
							for(let i=0; i < resultList.length; i++){
								let comCode = resultList[i].commercialCode;
								if(!$A.util.isEmpty(comCode)){
									if(!auxList.includes(comCode)){
										auxList.push(comCode);
										comCodeList.push({
											'label' : resultList[i].parsedCommercialCode,
											'value' : comCode
										});
									}
								}
							}
							component.set('v.values', comCodeList);
						} else {
							var msg = "problem getting conmmercial code picklist";
							console.log(msg);
						}
					} else {
						var msg = "problem getting conmmercial code picklist";
						console.log(msg);
					}
				} else {
					var msg = "problem getting conmmercial code picklist";
					console.log(msg);
				}
			} else {
				var msg = "problem getting commercial code picklist";
				console.log(msg);
			}
		});
		$A.enqueueAction(action);
	},
	
	callEventDropdowns: function (component) {
        var handleDropdown = component.getEvent('handleDropdown');
        handleDropdown.setParams({
            'name': component.get('v.name'),
            'showDropdown': component.get('v.showDropdown')
        });
        handleDropdown.fire();
    }
})