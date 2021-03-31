({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to call the getDataMovementHistory apex method from the apex controller.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	getTableDataHelper : function(component, event, helper) {
		//MOCK DATA: 
		//component.find("Service").callApex2(component, helper,"c.getDataMovementHistory", {}, this.getInitialData);


		var params = {
			"accountNumber" : component.get("v.accountNumberAndEntity"),
			"dateTo" : component.get("v.dateTo"),
			"dateFrom" : component.get("v.dateFrom")
			
		};


		component.find("Service").callApex2(component, helper,"c.getMovementHistoryData", params, this.getInitialData);
	},
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the response from the the getDataMovementHistory apex method from the apex controller.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	getInitialData: function(component,helper,response){
		//console.log("MULESOFT RESPONSE: " + JSON.stringify(response));
		if(response != null){
			var returnList = response;
			//returnList = returnList.sort((a, b) => new Date(helper.formatDate(b.bookDate)).getTime() - new Date(helper.formatDate(a.bookDate)).getTime());
			returnList = returnList.sort((a, b) => new Date(b.bookDate) - new Date(a.bookDate));

			for(var row in returnList){
				returnList[row].availableDate = helper.formatDate(returnList[row].availableDate);
				returnList[row].bookDate = helper.formatDate(returnList[row].bookDate);
			}
            component.set("v.dataMovementHistory", returnList);
            component.set("v.lastHistoryFinalBalance",returnList[0]);
			component.set("v.lastHistoryFinalBalanceAux",returnList[0].bookBalance);
			component.set("v.displayDownloadIcon", true);
            
            //component.find("pagination").initPagination(returnList);
			helper.getData(component,helper);
			
        } else {
			//component.set("v.showSpinner", true);
			component.getEvent("noResultsFound").fire();
			component.set("v.displayDownloadIcon", false);
			
		}
	},
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to format the date, it's use in the sortby function for the bookDate colum.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	formatDate : function(date){
        if(date!='' && date.length==10){
			//var res= date.slice(6,10)+"/"+date.slice(3,5)+"/"+date.slice(0,2);
			var res= date.slice(8,10)+"/"+date.slice(5,7)+"/"+date.slice(0,4);
			return res;
        }
	},
	
	/*Author:       Joaquín Vera Vallés
    Company:        Deloitte
    Description:    Get data (filtered or not)
    History
    <Date>			<Author>		<Description>
    18/12/2019		Joaquín Vera Vallés     Initial version*/

    getData : function(component, helper) {
        try{			
            component.set("v.currentPage",1);
			//component.find("pagination").buildData(component.get("v.currentPage")); 
			var response = component.get("v.dataMovementHistory");
			component.set("v.showSpinner", true);
			helper.buildPagination(component, helper, response);
        } catch (e) {
			component.set("v.showSpinner", true);
            console.log(e);
        }

	},
	
	/*Author:       Pablo Tejedor
    Company:        Deloitte
    Description:    Function to display only the necessary rows in the table page
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor       Initial version
	*/
	buildPagination : function(component, helper, response){
		// Build pagination
		var end;
		
		if(response.length<component.get("v.paymentsPerPage")){
			end=response.length;
		}else{
			end=component.get("v.paymentsPerPage");
		}

		component.set("v.end",end);

		var paginatedValues=[];

		for(var i= component.get("v.start");i<=component.get("v.end");i++){
			paginatedValues.push(response[i]);
		}

		component.set("v.paginatedHistory",paginatedValues);

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
	},

	 /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to refresh the data of the table
                    when a new search is performed
    History
    <Date>			<Author>			<Description>
	31/12/2019		Guillermo Giral   	Initial version
	*/

	refreshTableData : function(component, params, helper){
		console.log('refreshTableData');
		var dateParam = component.get("v.dateTo");;
		component.set("v.dateParam",dateParam.split('-')[2] +'/'+dateParam.split('-')[1] +'/'+dateParam.split('-')[0]);

		component.find("Service").callApex2(component, helper,"c.getMovementHistoryData", params, this.getInitialData);
	}
	
})