({
    /*
    Author:       Pablo Tejedor 
    Company:        Deloitte
    Description:    Function to display only the necessary rows in the table page
    History
    <Date>			<Author>			<Description>
	02/03/2020		Pablo Tejedor     Initial version
	*/
	buildPagination : function(component, event, helper){
		// Build pagination
		var end;
		var response = component.get("v.statementsList");
		
		if(response.length<component.get("v.transactionsPerPage")){
			end=response.length;
		}else{
			end=component.get("v.transactionsPerPage");
		}

		component.set("v.end",end);

		var paginatedValues=[];

		for(var i= component.get("v.start");i<=component.get("v.end");i++){
			paginatedValues.push(response[i]);
		}

		component.set("v.paginatedTransactions",paginatedValues);

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
	}

})