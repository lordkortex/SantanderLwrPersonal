({
	onValueSelected : function(component, event) {
		var itemId = event.currentTarget.id;
		if(itemId){
			component.set("v.selectedValue", itemId);
		}
	},

	onArrowClick : function(component,event){
		var whichArrow = event.currentTarget.id;
		var valuesLeft = component.get("v.valuesLeft");
		var valuesRight = component.get("v.valuesRight");
		var selectedValue = component.get("v.selectedValue");

		var evt = component.getEvent("valueMoved");

		if(selectedValue != null){
			if(whichArrow == "arrowRight" && valuesLeft.includes(selectedValue)){
				valuesLeft.splice(valuesLeft.indexOf(selectedValue),1);
				valuesRight.push(selectedValue);
				valuesRight.sort();

				evt.setParams({
					"value" : selectedValue,
					"selected" : true
				});
			} else if (whichArrow == "arrowLeft" && valuesRight.includes(selectedValue)){
				valuesRight.splice(valuesRight.indexOf(selectedValue),1);
				valuesLeft.push(selectedValue);
				valuesRight.sort();

				evt.setParams({
					"value" : selectedValue,
					"selected" : false
				});
			}
			component.set("v.valuesRight", valuesRight);
			component.set("v.valuesLeft", valuesLeft);
			component.set("v.selectedValue", null);

			evt.fire();
		}
	}
})