({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to call getDataExtract from the apex controller
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	getExtractDataTable : function(component, event, helper) {
		var dateTo = component.get("v.dates[0]");
		var dateToParams = dateTo.split('/')[2] +'/'+ dateTo.split('/')[1] +'/'+ dateTo.split('/')[0] ;

		var params = {
			"accountNumber" : component.get("v.accountNumberAndEntity"),
			"dateTo" : dateToParams	
		};
		
		component.find("Service").callApex2(component, helper,"c.getExtractIntegrationData", params, this.getDataTable);
	},

	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the response to the call from the apex controller
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	getDataTable: function(component, helper, response){
		console.log('Entramos en getDataTable');
		if(response != null){
		//console.log(response);
		//console.log("Extract table data: " + JSON.stringify(response));
		var returnList = response;
		
		var temp;
		var responseListAux = response.movements;

		for(var i = 0; i < responseListAux.length ; i++){
			temp = responseListAux[i].amount;
			responseListAux[i]['amountwithoutCurrency'] = temp;

		}
	
			component.set("v.debitNumber",returnList.debtNumber);
			component.set("v.creditNumber", returnList.creditNumber);
			var debitAux = returnList.debtAmount;
			component.set("v.debit", debitAux.replace(',','.'));
			var debitAux = returnList.creditAmount;
			component.set("v.credit",  debitAux.replace(',','.'));
			

			component.set("v.finalBalance",  returnList.finalBookBalance);
			component.set("v.IntialBalance",  returnList.initialBalance);
			
			
			component.set("v.showSpinner", true);
		    component.set("v.jsonArray", response);
			component.set("v.dataExtract", returnList.movements);
			component.set("v.displayDownloadIcon", true);
	
		helper.buildPagination(component, helper, responseListAux);
		}else{
			component.getEvent("noResultsFound").fire();
		}
		
	},

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to sort the columns of the extract table.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	sortBy : function(component,sortItem, helper, sortBy){
        try {
            var order = component.get(sortItem);
            if(order !='' && order != null && order !=undefined){
				var data = component.get("v.dataExtract");
                if(data != null && data != undefined){
					var sort;
					//SORT by DESC
                    if(order=='desc'){
						//For sort by bookDate colum
                        if(sortBy == 'BookDate'){				 
							sort = data.sort((a, b) => new Date(helper.formatDate(b.bookDate)).getTime() - new Date(helper.formatDate(a.bookDate)).getTime());
						}//For sort by categorry colum
						else if(sortBy == 'valuetype'){
							sort = data.sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
						}//For sort by amount colum
						else if(sortBy == 'valueAmount'){
							sort = data.sort((a, b) => parseFloat(a.amountwithoutCurrency) - parseFloat(b.amountwithoutCurrency));
                        }
					}//SORT by ASC
					else{
						//For sort by bookDate colum
                        if(sortBy == 'BookDate'){
							sort = data.sort((a, b) => new Date(helper.formatDate(a.bookDate)).getTime() - new Date(helper.formatDate(b.bookDate)).getTime());
						}//For sort by categorry colum
						else if(sortBy == 'valuetype'){
							sort = data.sort((a,b) => (a.category < b.category) ? 1 : ((b.category < a.category) ? -1 : 0));	
						}//For sort by amount colum
						else if(sortBy == 'valueAmount'){
							sort = data.sort((a, b) => parseFloat(b.amountwithoutCurrency) - parseFloat(a.amountwithoutCurrency));
                        }
                    }
                    return sort;
                }
            }
        } catch(e) {
            console.error(e);
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
			var res= date.slice(6,10)+"/"+date.slice(3,5)+"/"+date.slice(0,2);
			return res;
        }
	},

	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function use in the pagination for the extract table.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	buildPagination : function(component, helper, responseListAux){
		// Build pagination
		var end;
		
		if(responseListAux.length<component.get("v.paymentsPerPage")){
			end=responseListAux.length;
		}else{
			end=component.get("v.paymentsPerPage");
		}

		component.set("v.end",end);

		var paginatedValues=[];

		for(var i= component.get("v.start");i<=component.get("v.end");i++){
			paginatedValues.push(responseListAux[i]);
		}

		component.set("v.paginatedHistoryExtract",paginatedValues);

		var toDisplay=[];
		var finish=responseListAux.length;

		if(responseListAux.length>1000){
			//Max logs to retrieve
			finish=1000;
		}

		for(var i= 0;i<finish;i++){
			toDisplay.push(responseListAux[i]);
		}
		component.find("pagination").initPagination(toDisplay);

		//$A.util.addClass(component.find("spinner"), "slds-hide");   		
	},
	
	  /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to refresh the data of the table
                    when a new search is performed
    History
    <Date>			<Author>			<Description>
	31/12/2019		Pablo Tejedor   	Initial version
	*/
	refreshTableData : function(component, params, helper){
		console.log('refreshTableData');
		var dateParam = component.get("v.dates[0]");
		component.set("v.dates[0]",dateParam.split('-')[2] +'/'+dateParam.split('-')[1] +'/'+dateParam.split('-')[0]);
		component.find("Service").callApex2(component, helper,"c.getExtractIntegrationData", params, this.getDataTable);
	}

})