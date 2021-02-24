({
	
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from global balance or transacition detail page.
    History
    <Date>			<Author>			<Description>
	18/02/2020		Pablo Tejedor   	Initial version
	*/
	doInit : function(component, event, helper) {
		helper.getURLParams(component,event,helper);
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function filter the data in the table based on the filters retrieved
    History
    <Date>			<Author>			<Description>
	12/03/2020		Guillermo Giral   	Initial version
	*/
	filterTableData : function(component, event, helper){
		// If the action is triggered by the "Apply filters" event
		if(event){
			var filters = event.getParam("selectedFilters");
			component.set("v.selectedFilters", filters);
            component.set("v.highestPage", 1);
			helper.sendDataServiceRequestWithFilters(component, helper, filters);
		}	
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to filter the data based on a time period,
					rather than on a fixed timeframe
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral   	Initial version
	*/
	filterByTimePeriod : function (component, event, helper){
		var timePeriod = event.getParam("value");
		if(timePeriod != $A.get("$Label.c.selectOne")){
            // Reset the transaction table
            component.set("v.highestPage", 1);
            
            // Create the date filter
			var selection = {};
			var selectedFilters = [];
			selection.value = {};
			
			// Curent date
			var currentDate = new Date();
			var currentMonth = currentDate.getMonth()+1;
			selection.value.to = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDate.getDate();

			component.set("v.changedTimeFrame",true);

			switch(timePeriod){
				case $A.get("$Label.c.lastDay"): 
					var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 1);
					var previousMonth = previousDate.getMonth()+1;
					selection.value.from = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();					
					selection.name = $A.get("$Label.c.bookDate");
					selection.type = "dates";
					selectedFilters.push(selection);
				break;

				case $A.get("$Label.c.last7Days"): 
					var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 7);
					var previousMonth = previousDate.getMonth()+1;
					selection.value.from = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();				
					selection.name = $A.get("$Label.c.bookDate");
					selection.type = "dates";
					selectedFilters.push(selection);
				break;

				case $A.get("$Label.c.lastMonth"): 
					var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 30);
					var previousMonth = previousDate.getMonth()+1;
					selection.value.from = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();					
					selection.name = $A.get("$Label.c.bookDate");
					selection.type = "dates";
					selectedFilters.push(selection);
				break;
			}
            // Remove the Select One value
            var timePeriods = JSON.parse(JSON.stringify(component.get("v.timePeriods")));
            timePeriods = timePeriods.filter(opt => opt != $A.get("$Label.c.selectOne"));
            component.set("v.timePeriods", timePeriods);

			// Pass the filters to the filter method
			component.set("v.loading", true);
            // Update the filters attribute so that the book date is updated
			component.set("v.dates", []);
			helper.sendDataServiceRequestWithFilters(component, helper, selectedFilters);

			
		}
	},

	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get new data on "Search again" click
    History
    <Date>			<Author>			<Description>
	25/03/2020		Guillermo Giral   	Initial version
    16/04/2020		Shahad Naji			Open Advanced filter
	*/
	getUpdatedData : function(component, event, helper){
        component.set("v.showModal", true);
	},

	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to sort the columns of the transactions table.
    History
    <Date>			<Author>			<Description>
	02/03/2020		Pablo Tejedor   	Initial version
	*/
	sortBy : function(component, event, helper) {
		var params = event.getParams();
		if(params){
			var sortItem = params.sortItem;
			var sorted = helper.sortBy(component, sortItem ,helper, params.column);

			if (sorted != undefined && sorted !=null){
                //var aux = component.get("v.transactionResults.listaObtTransacciones");
                //aux[0]=sorted;
                component.set("v.transactionResults.listaObtTransacciones", sorted);
				

				//Update the sort order
				if( component.get(sortItem) == 'asc'){
					component.set(sortItem,'desc');
				}else{
					component.set(sortItem,'asc');
				}
			}
		}
	},
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to navigate to the Accounts page
    History
    <Date>			<Author>			<Description>
	01/04/2020		Guillermo Giral   	Initial version
	*/
	navigateToAccountsPage : function(component, event, helper) {
		// Generate navigation URL and navigate to the Accounts page
		var url = "c__tabs=true";
		if(JSON.stringify(component.get("v.accountFilters"))!='[]'){
			url+="c__filters="+JSON.stringify(component.get("v.accountFilters"));

		}
		component.find("Service").redirect("accounts",url);
	},
	

	/*
	Author:         Guillermo Giral  
    Company:        Deloitte
    Description:    Function to download an .xls file
    				with the transactions data
    History
    <Date>			<Author>						<Description>
    27/04/2020		Guillermo Giral  				Initial version
	*/
    downloadTransactions : function(component, event, helper) { 
		if(component.get("v.maximumRecords") <= $A.get("$Label.c.limitTransactionSearchNumberOneTrade")){
			component.set("v.showLimitTransactionsToast", false);
			helper.downloadFile(component, event, helper);
		} else {
			component.set("v.showLimitTransactionsToast", true);
		}
    },
    
	/*
	Author:         Guillermo Giral  
    Company:        Deloitte
    Description:    Function handle the change of a page
    History
    <Date>			<Author>						<Description>
    27/07/2020		Guillermo Giral  				Initial version
	*/
    pageChanged : function ( component,event,helper)
    {
        helper.handlePageChanged(component,event,helper);
    }
})