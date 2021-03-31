({
	/*Author:       Pablo Tejedor
    Company:        Deloitte
    Description:    Init method to calculate the from and to dates attributes
    History
    <Date>			<Author>		<Description>
    18/12/2019		Pablo Tejedor     Initial version*/
	updateSearchDates : function(component,event,helper) 
	{
		if(component.get("v.doneRenderingParent")){
			console.log("SOurce: " + component.get("v.source"));
			if(component.get("v.source") == 'globalBalance'){
				helper.datesCalculator(component,event,helper);
			}
		}
	},
	/*Author:       Joaquin Vera Vallés
    Company:        Deloitte
    Description:    Method that triggers when the clear button is clicked, just empties the data attributes.
    History
    <Date>			<Author>		<Description>
    18/12/2019		Joaquin Vera Vallés     Initial version*/
	clearButtonClicked : function(component,event,helper) 
	{
		helper.handleClearButton(component,event,helper);
		component.set("v.startDate", null);
		component.set("v.endDate", null);
	},

	/*Author:       Joaquin Vera Vallés
    Company:        Deloitte
    Description:    Method that triggers when search button is clicked.
    History
    <Date>			<Author>		<Description>
    18/12/2019		Joaquin Vera Vallés     Initial version*/
	searchButtonClicked : function(component,event,helper) 
	{
		helper.handleSearchButton(component,event,helper);
	}

})