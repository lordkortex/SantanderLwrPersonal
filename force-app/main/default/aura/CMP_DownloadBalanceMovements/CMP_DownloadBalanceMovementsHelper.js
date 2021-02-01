({
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to fetch all the component data from Mulesoft
    History
    <Date>			<Author>			<Description>
	18/12/2019		Guillermo Giral   	Initial version
	*/
	getComponentData : function(component, helper) {
		component.find("service").callApex2(component, helper,"c.getBalanceMovementsData", {}, this.populateComponentData);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to populate all data with the values fetched from getComponentData()
    History
    <Date>			<Author>			<Description>
	18/12/2019		Guillermo Giral   	Initial version
	*/
	populateComponentData : function(component,helper,response){
		component.set("v.countries", response.countries);
		component.set("v.accounts", response.accounts);
		component.set("v.fileFormatList", response.fileFormats);

		// Get country names from the map an populate the corresponding attribute 
		var countryMap = response.countries;
		var countryList = [];
		for(var key in countryMap){
			countryList.push(key);
		}
		component.set("v.countryNameList", countryList);
	},

	/*Author:       Pablo Tejedor
    Company:        Deloitte
    Description:    Just empties start date and end date data attributes.
    History
    <Date>			<Author>		<Description>
    18/12/2019		Pablo Tejedor     Initial version*/
	handleClearButton : function(component, event, helper) 
	{
		component.set("v.fileFormat", null);
		component.set("v.dates", null);
		component.set("v.singleDate", null);
		component.set("v.selectedAccounts", null);
	},
})