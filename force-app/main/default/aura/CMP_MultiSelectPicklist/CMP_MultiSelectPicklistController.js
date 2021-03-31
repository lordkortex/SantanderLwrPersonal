({
	onValueSelected : function(component, event) {
		var itemId = event.currentTarget.id;
		if(itemId){
			var valuesLeft = component.get("v.valuesLeft");
			var valuesRight = component.get("v.valuesRight");
			let values = valuesLeft.concat(valuesRight);
			let countryCode = values.filter(v => v.value == itemId)[0].countryCode;
			component.set("v.selectedValue", {"value" : itemId, "displayValue" : event.currentTarget.name, "countryCode" : countryCode});
		}
	},

	onArrowClick : function(component,event){
		var whichArrow = event.currentTarget.id;
		var valuesLeft = component.get("v.valuesLeft");
		var valuesRight = component.get("v.valuesRight");
		var sValue = component.get("v.selectedValue");

		var evt = component.getEvent("valueMoved");

		if(sValue != null){
			let valuesLeftList = [];
			component.get("v.valuesLeft").forEach(v => {
				valuesLeftList.push(v.value);
			});
			let valuesRightList = [];
			component.get("v.valuesRight").forEach(v => {
				valuesRightList.push(v.value);
			});
			if(whichArrow == "arrowRight" && valuesLeftList.includes(sValue.value)){
				//valuesLeft.splice(valuesLeft.indexOf(selectedValue),1);
				valuesLeft = valuesLeft.filter(v => v.value != sValue.value);
				valuesRight.push(sValue);
				valuesRight.sort();

				evt.setParams({
					"valueObj" : sValue,
					"selected" : true
				});
			} else if (whichArrow == "arrowLeft" && valuesRightList.includes(sValue.value)){
				//valuesRight.splice(valuesRight.indexOf(selectedValue),1);
				valuesRight = valuesRight.filter(v => v.value != sValue.value);
				valuesLeft.push(sValue);
				valuesLeft.sort();

				evt.setParams({
					"valueObj" : sValue,
					"selected" : false
				});
			}
			component.set("v.valuesRight", valuesRight);
			component.set("v.valuesLeft", valuesLeft);
			component.set("v.selectedValue", {});

			evt.fire();
		}
	}
})