({
	saveData : function(component, event, helper)
	{
		var thisData = component.get("v.data");
		console.log(thisData);
		component.find("Service").callApex2(component,helper, "c.saveData", {data: thisData}, this.dataSent);
	},

	dataSent : function (component,helper,response)
	{

	}
})