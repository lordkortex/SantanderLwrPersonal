({

	/*
	Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to populate the component data on its initialization
    History
    <Date>			<Author>			<Description>
	22/04/2020		Joaquin Vera   	Initial version
	*/
    handleDoInit : function(component,event,helper)
    {
        component.find("service").callApex2(component, helper, "c.getActions", {userId : $A.get("$SObjectType.CurrentUser.Id")}, helper.fillData);
	},
	
	    /*
	Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Function to fill the data
    History
    <Date>			<Author>			<Description>
	22/04/2020		Joaquin Vera   	Initial version
	*/
    fillData : function(component,helper,response)
    {
        component.set("v.typeLogs", response);
    },

	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the data from the server
    History
    <Date>			<Author>			<Description>
	26/12/2019		Guillermo Giral     Initial version
	*/
	
	getLogsData : function(component, helper, searchData) {
		console.log(JSON.stringify(searchData));
		component.find("service").callApex2(component, helper,"c.getLogs", {filters : searchData}, this.populateLogResultsTable);
	},

	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the table with the data fetched from the server
    History
    <Date>			<Author>			<Description>
	26/12/2019		Guillermo Giral     Initial version
	*/
	
	populateLogResultsTable : function(component,helper,response){
		if(response){
			// Set data
			component.set("v.tableData", response);
			component.set("v.displayData", true);
			console.log(JSON.stringify(response));
			console.log(response.length);

			helper.buildPagination(component, helper, response);
		}
	},
	
	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to display only the necessary rows in the table page
    History
    <Date>			<Author>			<Description>
	26/12/2019		Guillermo Giral     Initial version
	*/
	buildPagination : function(component, helper, response){
		// Build pagination
		var end;
		
		if(response.length<component.get("v.logsPerPage")){
			end=response.length;
		}else{
			end=component.get("v.logsPerPage");
		}

		component.set("v.end",end);

		var paginatedValues=[];

		for(var i= component.get("v.start");i<=component.get("v.end");i++){
			console.log(response[i]);
			paginatedValues.push(response[i]);
		}

		component.set("v.paginatedLogs",paginatedValues);

		var toDisplay=[];
		var finish=response.length;

		if(response.length>1000){
			//Max logs to retrieve
			finish=1000;
		}

		for(var i= 0;i<finish;i++){
			toDisplay.push(response[i]);
		}
		component.find("pagination").initPagination(toDisplay);

		//$A.util.addClass(component.find("spinner"), "slds-hide");   		
	}
})