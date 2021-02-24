({
 /*
	Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to load table if it's comes from transaction details
    History
    <Date>			<Author>			<Description>
	17/02/2020		Guillermo Giral     Initial version
	*/
	globalBalanceInit : function(component, event, helper) {	
		console.log('doinitTable');
		console.log(component.get("v.backTodetail"));
		if(component.get("v.sourcePage")=='globalBalance' && component.get("v.accountName") != null &&  component.get("v.accountName") != undefined
		&& component.get("v.accountNumber") != null && component.get("v.accountNumber") !=undefined ){
			// Añadir a concidion if cuando este y pasar parametros book balance y account number al metodo cuando este implementado el servicio
			component.find("service").callApex2(component, helper,"c.getExtractIntegrationData", {}, this.populateTransactionTable);
			 
		}else if(component.get("v.backTodetail") == 'launchmethod' ){
			console.log('entra por else if');
			component.find("service").callApex2(component, helper,"c.getExtractIntegrationData", {}, this.populateTransactionTable);
		}
	},
	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the data from the server,
    History
    <Date>			<Author>			<Description>
	17/02/2020		Guillermo Giral     Initial version
	*/
	
	getTransactionData : function(component, helper, searchData) {
		console.log('getTransactionData');
		component.find("service").callApex2(component, helper,"c.getExtractIntegrationData", {}, this.populateTransactionTable);


		
		//component.find("service").callApex2(component, helper,"c.getDataExtract", {}, this.populateTransactionTable);
	},

	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the table with the data fetched from the server
    History
    <Date>			<Author>			<Description>
	17/02/2020		Guillermo Giral     Initial version
	*/
	
	populateTransactionTable : function(component,helper,response){
		console.log('entra en rellenar tabla');
		if(response){
			component.set("v.displayDownloadIcon", true);
			console.log(component.get("v.displayDownloadIcon}"));
			console.log(response);
			// Set data
			component.set("v.transactionResults", response);
			component.set("v.displayData", true);
			component.set("v.isSpinner", false);
			var responseListAux = response.movements;

			helper.buildPagination(component, helper, responseListAux);
		}
	},
	
	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to display only the necessary rows in the table page
    History
    <Date>			<Author>			<Description>
	17/02/2020		Guillermo Giral     Initial version
	*/
	buildPagination : function(component, helper, responseListAux){
		// Build pagination
		var end;
		
		if(responseListAux.length<component.get("v.transactionsPerPage")){
			end=responseListAux.length;
		}else{
			end=component.get("v.transactionsPerPage");
		}

		component.set("v.end",end);

		var paginatedValues=[];

		for(var i= component.get("v.start");i<=component.get("v.end");i++){
			paginatedValues.push(responseListAux[i]);
		}

		component.set("v.paginatedTransactions",paginatedValues);

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
    Description:    Function to sort the columns of the extract table.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	sortBy : function(component,sortItem, helper, sortBy){
        try {
            var order = component.get(sortItem);
            if(order !='' && order != null && order !=undefined){
				var data = component.get("v.transactionResults.movements");
                if(data != null && data != undefined){
					var sort;
					//SORT by DESC
                    if(order=='desc'){
						//For sort by bookDate colum
                        if(sortBy == 'bookDate'){				 
							sort = data.sort((a, b) => new Date(helper.formatDate(b.bookDate)).getTime() - new Date(helper.formatDate(a.bookDate)).getTime());
						}//For sort by categorry colum
						else if(sortBy == 'category'){
							sort = data.sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0));
						}//For sort by amount colum
						else if(sortBy == 'amount'){
							sort = data.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
                        }
					}//SORT by ASC
					else{
						//For sort by bookDate colum
                        if(sortBy == 'bookDate'){
							sort = data.sort((a, b) => new Date(helper.formatDate(a.bookDate)).getTime() - new Date(helper.formatDate(b.bookDate)).getTime());
						}//For sort by categorry colum
						else if(sortBy == 'category'){
							sort = data.sort((a,b) => (a.category < b.category) ? 1 : ((b.category < a.category) ? -1 : 0));	
						}//For sort by amount colum
						else if(sortBy == 'amount'){
							sort = data.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
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
})