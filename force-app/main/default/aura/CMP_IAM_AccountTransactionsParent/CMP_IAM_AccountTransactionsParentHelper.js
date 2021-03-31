({
	/*
    Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Decodes and parses the URL params
    History
    <Date>          <Author>            	<Description>
    03/03/2020      Guillermo Giral       Initial version
    */
	getURLParams : function(component, event, helper) {		
        //Get the URL params
		var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
		component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);	
	},

	/*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Parses the URL params
    History
    <Date>          <Author>            	<Description>
    04/03/2019      Guillermo Giral        	Initial version
    06/05/2020		Shahad Naji				Adding c__codigoEmisora, c__aliasEntidad, and c__codigoCuenta
    */
   	handleParams : function (component, helper, response){
		var userId = $A.get( "$SObjectType.CurrentUser.Id" );
		if(response != "") {
			component.set("v.loading", true);
			var sParameterName;
			var accountDetails = {};
			var filtering = false;
			for(var i = 0; i < response.length ; i++) {
				sParameterName = response[i].split("="); 
				switch(sParameterName[0]) {
					case("c__source"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.sourcePage", sParameterName[1]);
						break;
					case("c__subsidiaryName"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.accountName = sParameterName[1];
						break;
					case("c__accountNumber"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.accountNumber = sParameterName[1];
						break;
					case("c__accountStatus"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.status = sParameterName[1];
						break;
					case("c__accountCode"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.accountCode = sParameterName[1];
						break;
					case("c__bank"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.bank = sParameterName[1];
						break;
					case("c__mainAmount"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.bookBalance = sParameterName[1];
						break;
					case("c__availableAmount"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.availableBalance = sParameterName[1];
						break;
					case("c__currentCurrency"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.accountCurrency = sParameterName[1];
						break;
					case("c__alias"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.accountAlias = sParameterName[1];
						break;
					case("c__idType"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.idType = sParameterName[1];
						break;
					case("c__country"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.country = sParameterName[1];
						break;
					case("c__countryName"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.countryName = sParameterName[1];
						break;
					case("c__aliasBank"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.bankAlias = sParameterName[1];
						break;
					case("c__bic"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.bic = sParameterName[1];
						break;
					case("c__bookDate"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.bookDate = sParameterName[1];
						break;
					case("c__valueDate"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.valueDate = sParameterName[1];
						break;
					case("c__filters"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.filters", JSON.parse(sParameterName[1]));
						break;
					case("c__formFilters"):
						sParameterName[1] === undefined  || sParameterName[1] == "undefined" ? 'Not found' : component.set("v.formFilters", JSON.parse(sParameterName[1]));
						break;
					case("c__selectedFilters"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.selectedFilters", JSON.parse(sParameterName[1]));
						break;
					case("c__dates"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.dates", JSON.parse(sParameterName[1]));
						break;
					// Filters from the Account page
					case("c__accountsFilters"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.accountsFilters", sParameterName[1]);
                        break;
                        //SNJ - 27/04/2020 - codigo bic
                    case("c__codigoBic"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoBic = sParameterName[1];
                        break;
                    case("c__codigoEmisora"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoEmisora = sParameterName[1];
                        break;
                    case("c__aliasEntidad"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.aliasEntidad = sParameterName[1];
                        break; 
					case("c__codigoCuenta"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoCuenta = sParameterName[1];
						break; 
					//AM - 28/09/2020 - Ebury Accounts
					case("c__codigoCorporate"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoCorporate = sParameterName[1];
						break;
					case("c__dataProvider"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.dataProvider = sParameterName[1];
						break;
					case("c__associatedAccountList"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.associatedAccountList = JSON.parse(sParameterName[1]);
						break;
				}
			}

			accountDetails.finalCodigoBic = accountDetails.codigoBic;
			component.set("v.accountDetails", accountDetails);

            //Get the body params
            let bodyParams;
            if(component.get("v.selectedFilters").length == 0){
                bodyParams = helper.setBodyParams(component, helper, accountDetails, 1);
            }else{
                bodyParams = helper.setBodyParamsWithFilters(component, helper, accountDetails, 1, component.get("v.selectedFilters"));
            }
            
            //Call apex to retrieve the movements from apex
			component.find("Service").callApex2(
				component, 
				helper, 
				"c.getPaginatedMovements",
				{
					"bodyParams" : JSON.stringify(bodyParams)
				},
				helper.setTableData
			);
            component.set("v.loading", true);
		}		
	},

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to set the initial data of the component, both filters and table data
    History
    <Date>			<Author>			    <Description>
    17/03/2020		Guillermo Giral         Initial version
    16/04/2020		Shahad Naji				Missing data handling
    */
   	setTableData : function(component,helper,response){
		if(response != '' && response != null   && response != undefined && Object.keys(response).length > 0){
			if(component.get("v.highestPage") == 1){
				let transactions = response.balances.transactions;
				if(response.balances.transactions.totalRegistros !=undefined && response.balances.transactions.totalRegistros > 0){
					component.set("v.maximumRecords", response.balances.transactions.totalRegistros);
                    component.set("v.maxPage", Math.ceil(response.balances.transactions.totalRegistros / 50));
                    component.set("v.transactionResults", transactions);
                } else {
                    component.set("v.transactionResults", null);
                }
			} else {
				let transactions = component.get("v.transactionResults");
				transactions.listaObtTransacciones.push(...response.balances.transactions.listaObtTransacciones);
				component.set("v.transactionResults", transactions);
			}


		} else {
            component.set("v.transactionResults", null);
		}

        // Get the latest date and hour of update from the transactions
        helper.getLatestTimestampFromTransactions(component);
        
        // Get the account last update datetime
        helper.getLastUpdateDateTime(component);
        
		// When the previous page is Accounts, the filters must be received from the balances web service
		var timePeriods = [];

		if(component.get("v.sourcePage") != "accountTransactions"){
			//AM - 20/10/2020 - Fix filtros OT Transactions
			//if(component.get("v.sourcePage") != "globalBalance" && response != undefined && response != null && response != ''){
			helper.setFiltersData(component, helper);
			//}else{
				if(/*!component.get("v.changedTimeFrame") &&*/ component.get("v.selectedTimeframe") != $A.get("$Label.c.selectOne") && component.get("v.dates").length != 0){
					timePeriods.push($A.get("$Label.c.selectOne"));
					component.set("v.selectedTimeframe", timePeriods[0]);
				}
				timePeriods.push($A.get("$Label.c.lastDay"));
				timePeriods.push($A.get("$Label.c.last7Days"));
				timePeriods.push($A.get("$Label.c.lastMonth"));
				
				component.set("v.timePeriods", timePeriods);
			//}
		}
		component.set("v.loading", false);
	},

	/*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Creates the filter list to be passed to CMP_CN_Filters component
    History
    <Date>          <Author>           	   <Description>
    10/03/2019      Guillermo Giral        Initial version
    */
	setFiltersData : function (component, helper){
		// Set values for the Time Period dropdown
		var timePeriods = [];
        timePeriods.push($A.get("$Label.c.selectOne"));
		timePeriods.push($A.get("$Label.c.lastDay"));
		timePeriods.push($A.get("$Label.c.last7Days"));
		timePeriods.push($A.get("$Label.c.lastMonth"));
		component.set("v.timePeriods", timePeriods);
		//AM - 20/10/2020 - Fix filtros OT Transactions
        //component.set("v.selectedTimeframe", timePeriods[0]);

		// FILTER LIST CREATION
		var listObject = [];
		
		// CALENDAR CREATION
		listObject.push({});
		if(component.get("v.dates") != undefined){
			listObject[0].data = component.get("v.dates");
		}
		listObject[0].name = $A.get("$Label.c.bookDate");
		listObject[0].type = 'dates';
		listObject[0].displayFilter = true;

		//AM - 28/09/2020 - Ebury Accounts
		if(component.get("v.accountDetails.country") != $A.get("$Label.c.Ebury")){
			// AMOUNT SELECTION
			listObject.push({});
			//AM - 20/10/2020 - Fix filtros OT Transactions
			listObject[1].selectedFilters = [];
			if(component.get("v.filters[1].selectedFilters.from") != undefined){
				listObject[1].selectedFilters.from = component.get("v.filters[1].selectedFilters.from");
				
			}
			if(component.get("v.filters[1].selectedFilters.to") != undefined){
				listObject[1].selectedFilters.to = component.get("v.filters[1].selectedFilters.to");
			}
			
			listObject[1].name = $A.get("$Label.c.amount");
			listObject[1].type = 'text';
			listObject[1].displayFilter = true;
			listObject[1].displayOptions = false;
		}
		component.set("v.filters", listObject);

		/*
		//AM - 20/10/2020 - Fix filtros OT Transactions
		var selectedFilters = [];
		var formFilters = component.get("v.formFilters");
		var options = Object.keys(formFilters);
		for(var key in options){
			var selection = {};
			selection.name = options[key];
			selection.value = formFilters[options[key]];
			selectedFilters.push(selection);
		}
		component.set("selectedFilters", selectedFilters);*/
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
				var data = component.get("v.transactionResults.listaObtTransacciones");
               	if(data != null && data != undefined){
                   	var sort;
					//SORT by DESC
					if(order=='desc'){
						//For sort by bookDate colum
						if(sortBy == 'BookDate'){				 
							sort = data.sort((a, b) => new Date(b.obtTransacBusqueda.bookDate) - new Date(a.obtTransacBusqueda.bookDate));
						}//For sort by categorry colum
						else if(sortBy == 'Category'){
						sort = data.sort((a,b) => (a.obtTransacBusqueda.tipoTransaccion > b.obtTransacBusqueda.tipoTransaccion) ? 1 : ((b.obtTransacBusqueda.tipoTransaccion > a.obtTransacBusqueda.tipoTransaccion) ? -1 : 0));
						}//For sort by amount colum
						else if(sortBy == 'amount'){
							sort = data.sort((a, b) => parseFloat(a.obtTransacBusqueda.importe) - parseFloat(b.obtTransacBusqueda.importe));
						}
					}//SORT by ASC
					else{
						//For sort by bookDate colum
						if(sortBy == 'BookDate'){
							sort = data.sort((a, b) => new Date(a.obtTransacBusqueda.bookDate) - new Date(b.obtTransacBusqueda.bookDate));
						}//For sort by categorry colum
						else if(sortBy == 'Category'){
							sort = data.sort((a,b) => (a.obtTransacBusqueda.tipoTransaccion < b.obtTransacBusqueda.tipoTransaccion) ? 1 : ((b.obtTransacBusqueda.tipoTransaccion < a.obtTransacBusqueda.tipoTransaccion) ? -1 : 0));	
						}//For sort by amount colum
						else if(sortBy == 'amount'){
							sort = data.sort((a, b) => parseFloat(b.obtTransacBusqueda.importe) - parseFloat(a.obtTransacBusqueda.importe));
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
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Builds the data in the table when a filtered response
                    is requested to the web service
    History
    <Date>          <Author>           	   <Description>
    02/04/2020      Guillermo Giral        Initial version
    16/04/2020		Shahad Naji				Set value for undefined amounts and concate filters
    */
    //$Label.c.selectOne
   	sendDataServiceRequestWithFilters : function (component, helper, filters){        
        //Get the body params
        var bodyParams = helper.setBodyParamsWithFilters(component, helper,component.get("v.accountDetails"), 1, filters);
        
        //Call apex to retrieve the movements from apex
        component.find("Service").callApex2(
            component, 
            helper, 
            "c.getPaginatedMovements",
            {
                "bodyParams" : JSON.stringify(bodyParams)
            },
            helper.setTableData
        );
		component.set("v.loading", true);
		helper.calculateNumberActiveFilters(component);
        component.set("v.transactionResults", null);
	},
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Builds the data in the table when a filtered response
                    is requested to the web service
    History
    <Date>          <Author>           	   <Description>
    02/04/2020      Guillermo Giral        Initial version
    */
    getBookDateFromTimePeriod : function (timePeriod, referenceDate){
        var bookDate = "";
        var previousDate = referenceDate;
        if(timePeriod != $A.get("$Label.c.selectOne")){
			switch(timePeriod){
				case $A.get("$Label.c.lastDay"): 
					previousDate.setDate(previousDate.getDate() - 1);
					bookDate = previousDate.toISOString();
				break;

				case $A.get("$Label.c.last7Days"): 
					previousDate.setDate(previousDate.getDate() - 7);
					bookDate = previousDate.toISOString();
				break;

				case $A.get("$Label.c.lastMonth"): 
					previousDate.setDate(previousDate.getDate() - 30);
					bookDate = previousDate.toISOString();
				break;
			}
        }
        return bookDate;
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to convert an string date (2019-04-15 or 2019-4-15)
                    to ISO date (2019-04-15T00:00:00.000Z) from the user's timezone
                    to GMT 0
    History
    <Date>          <Author>           	   <Description>
    18/04/2020      Guillermo Giral        Initial version
    22/04/2020      R. Cervino             Fix
    27/04/2020      Guillermo Giral        Rework of funnctionality so the user's
                                           timezone is taken into account
    */
    getISOStringFromDateString : function (component, dateString, beginningOfDay){

		var action = component.get("c.getUserTimezoneOffSetInMiliseconds");
		action.setParams({ dateInput : dateString }); 

		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				var res =response.getReturnValue();
				
				if(res!=null && res!=undefined && res!=""){

					
					var timeZoneOffsetInMs = res;
					var MS_PER_HOUR = 3600000;
					var MS_PER_MIN = 60000;
					// Get the date and format it in a proper way
					var dateChunks = dateString.split('-');
					var monthChunk = dateChunks[1];
					var dayChunk = dateChunks[2];
					if(dateChunks[1].length < 2){
						monthChunk = "0" + dateChunks[1];
					}
					if(dateChunks[2].length < 2){
						dayChunk = "0" + dateChunks[2];
					}
					dateString = dateChunks[0] + '-' + monthChunk + '-' + dayChunk;
					// We have the user's locale timezone from Salesforce and a date created with the browser's timezone
					// So first we need to adapt both values
					var timezoneOffsetDate = new Date();

					var localTimezoneOffSet = timezoneOffsetDate.getTimezoneOffset()*MS_PER_MIN;
					//GET DATESTRING NO GMT

					var x = new Date(Date.parse(dateString));

					const getUTC = x.getTime();
					const offset = x.getTimezoneOffset() * 60000;
					var xx = new Date(getUTC+offset).toString();
					var newDate; 
					newDate = new Date(Date.parse(xx) - timeZoneOffsetInMs );


					if(!beginningOfDay){
						newDate.setTime(newDate.getTime() +  (MS_PER_HOUR*24));
					}
					var month = parseInt(newDate.getMonth())+1;
					if(month < 10){
						month = '0' + month;
					}
					var day = newDate.getDate();
					var hour=newDate.getHours();					
					var mins = newDate.getMinutes();
					var secs = newDate.getSeconds();
					var msecs = newDate.getMilliseconds();

					if(hour < 10){
						hour = '0' + hour;
					}
					if(mins < 10){
						mins = '0' + mins;
					}
					if(secs < 10){
						secs = '0' + secs;
					}
					if(msecs > 9 && msecs < 100){
						msecs = '0' + msecs;
					} else if(msecs < 10){
						msecs = '00' + msecs;
					}
					var finalDate = newDate.getFullYear() + '-' + month + '-' + day +'T' + hour + ':' + mins + ':' + secs + '.' + msecs + 'Z';
					return finalDate;
				}else{
					return null;
				}
			}
			else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
					component.set("v.errorAccount",true);

					if (errors[0] && errors[0].message) {
						console.log("Error message: " + 
								errors[0].message);
					}
				} else {
					console.log("Unknown error");
				}
			}
		});

		$A.enqueueAction(action);
    },

	/*
    Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to get the latest transaction from 
					the results
    History
    <Date>          <Author>           	   <Description>
    20/04/2020      Guillermo Giral        Initial version
    */
	getLatestTimestampFromTransactions : function(component){
		var transactions = component.get("v.transactionResults");
		var transactionsData = [];
		if(transactions != undefined){
			if(transactions.listaObtTransacciones != undefined && transactions.listaObtTransacciones[0].length > 0 && transactions.listaObtTransacciones != null){
				transactionsData = transactions.listaObtTransacciones[0];
			} else if(transactions.obtTransacBusqueda != undefined && transactions.obtTransacBusqueda.length > 0 && transactions.obtTransacBusqueda != null){
				transactionsData = transactions.obtTransacBusqueda;
			} else if(transactions.listaObtTransacciones != undefined && transactions.listaObtTransacciones.length > 0 && transactions.listaObtTransacciones[0].obtTransacBusqueda != null){
				transactionsData = transactions.listaObtTransacciones[0].obtTransacBusqueda;
			} else {
				component.set("v.accountDetails.dateValue", "N/A");
				component.set("v.accountDetails.hourValue", "N/A");
			}
	
			// Get the latest timestamp
			if(transactionsData.length > 0){
				var timeStampArray = [];
				for(var t in transactionsData){
                    if(transactionsData[t].obtTransacBusqueda.bookDate != undefined && !isNaN(Date.parse(transactionsData[t].obtTransacBusqueda.bookDate))){
                        timeStampArray.push(Date.parse(transactionsData[t].obtTransacBusqueda.bookDate));
                    } else if(transactionsData[t].obtTransacBusqueda.valueDate != undefined && !isNaN(Date.parse(transactionsData[t].obtTransacBusqueda.valueDate))){
                        timeStampArray.push(Date.parse(transactionsData[t].obtTransacBusqueda.valueDate));
                    }
				}
				if(timeStampArray.length > 0){
					timeStampArray.sort((a,b) => b - a);
					var latestTimeStamp = new Date(timeStampArray[0]).toISOString();
					//var latestHour = new Date(timeStampArray[0]).toISOString().split('T')[1].substring(0,5);
					var latestHour = $A.localizationService.formatTime(latestTimeStamp, "HH:mm");
					component.set("v.accountDetails.dateValue", latestTimeStamp);
					component.set("v.accountDetails.hourValue", latestHour);
				} else {
					component.set("v.accountDetails.dateValue", "N/A");
					component.set("v.accountDetails.hourValue", "N/A");
				}
			}
		} else {
			component.set("v.accountDetails.dateValue", "N/A");
			component.set("v.accountDetails.hourValue", "N/A");;
		}
	},
	/*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to download an excel file
    History
    <Date>			<Author>		    <Description>
    27/04/2020		Guillermo Giral     Initial version
    */

    downloadFile : function(component, event, helper){
	//First retrieve the doc and the remove it
		try{            
			this.retrieveFile(component, event, helper).then(function(results){
				if(results!=''&& results!=undefined && results!=null){
					var domain=$A.get('$Label.c.domain');

					window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';

					setTimeout(function(){
						helper.removeFile(component, event, helper, results);
					}, 3000);
				}
			});

		} catch (e) {
			console.log(e);
		}
	},

    /*
    Author:         Guillermo Giral 
    Company:        Deloitte
    Description:    Method to remove the downloaded file
    History
    <Date>			<Author>		<Description>
    27/04/2020		Guillermo Giral     Initial version
    */
    removeFile : function(component, event, helper, ID){

        try{
            var action = component.get("c.removeFile");
            //Send the payment ID
            action.setParams({id:ID});
            action.setCallback(this, function(response) {
                var state = response.getState();

                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                }
            });
            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    },

    /*
    Author:         Guillermo Giral 
    Company:        Deloitte
    Description:    Method to retieve the file
    History
    <Date>			<Author>		        <Description>
    27/04/2020		Guillermo Giral         Initial version
    */

    retrieveFile : function(component, event, helper){
        try{

            var action = component.get("c.downloadTransactionsOneTrade");
			var params = component.get("v.downloadParams");
			
            //Send the service params
            action.setParams({
                                params : JSON.stringify(params)
                            });
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
					var state = response.getState();
                    if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }else if (state === "SUCCESS") {
                        resolve(response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
            });

        } catch (e) {
            console.log(e);
        }
	},
	
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Calculates the number of active filters
    History
    <Date>			<Author>			<Description>
	25/05/2020		Guillermo Giral   	Initial version
	*/
	calculateNumberActiveFilters : function(component) {
		var filters = component.get("v.filters");
		var formFilters = component.get("v.formFilters");
		var filterCount = 0;
		
        // Loop through all the form filters and start counting
        for(var key in Object.keys(formFilters)){
            var filterName = Object.keys(formFilters)[key];
            if(((filterName == "debit" || filterName == "credit") && formFilters[filterName]) || ((filterName == "clientRef" || filterName == "description") && formFilters[filterName])){
                filterCount++;
            }
        }

		// Loop through all the filters and keep counting
		for(var key in filters){
			if(filters[key].type == "checkbox"){
				filterCount = filters[key].data.filter(option => option.checked).length > 0 ? filterCount+1 : filterCount;
			} else if(filters[key].type == "text"){
				filterCount = filters[key].selectedFilters != undefined && 
							((filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != "") || (filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != "")) ? filterCount+1 : filterCount; 
			} else if(filters[key].type == "dates"){
				if(filters[key].data.length > 0 && 
                    ((filters[key].data[0] != null && filters[key].data[0] != undefined) || (filters[key].data[1] != null && filters[key].data[1] != undefined))){
                        filterCount++;
                } else if((component.get("v.fromDate") != null && component.get("v.fromDate") != undefined) || (component.get("v.toDate") != null && component.get("v.toDate") != undefined)){
                    filterCount++;
                } else if((component.get("v.dates")[0] != null && component.get("v.dates")[0] != undefined) || (component.get("v.dates")[1] != null && component.get("v.dates")[1] != undefined)){
                    filterCount++;
                }
			}
		}
		component.set("v.numberActiveFilters", filterCount);
		component.set("v.showModal", false);
	},

	/*
	Author:         Joaquín Vera
    Company:        Deloitte
	Description:    Creates the body request to load every
					page of transactions
    History
    <Date>			<Author>			<Description>
	10/08/2020		Joaquín Vera   		Initial version
	28/09/2020		Adrian Munio		Added fiels CodigoCorporate and DataProvider.
	*/
	setBodyParams : function ( component, helper, accountInfo, newPage)
    {
        const DEFAULT_SORTING = "+date";
        const MOVEMENTS_PER_PAGINATION = 200;
		let bodyRequest;

		//AM - 28/09/2020 - Ebury Accounts
		if(accountInfo.country == $A.get("$Label.c.Ebury")){
			bodyRequest = {
				search_data : {
					accountList : [
						{
							country: "EB",
							currency: accountInfo.accountCurrency,
							account: {
								idType : "",
								accountId: accountInfo.accountNumber
							}
						}
					],
					customerId: accountInfo.codigoCorporate,
					dataProvider: $A.get("$Label.c.EburyCaps"),
					latestMovementsFlag: false,
					allTransactionsFlag: true,
					_sort: DEFAULT_SORTING,
					_offset: newPage > 1 ? newPage/4 : 0,
					_limit: MOVEMENTS_PER_PAGINATION
				}
			};	
		}else{

			bodyRequest = {
				search_data : {
					accountList : [
						{
							country: accountInfo.country,
							currency: accountInfo.accountCurrency,
							account: {
								idType : "",
								accountId: accountInfo.accountNumber
							}
						}
					],
					latestMovementsFlag: false,
					allTransactionsFlag: true,
					_sort: DEFAULT_SORTING,
					_offset: newPage > 1 ? newPage/4 : 0,
					_limit: MOVEMENTS_PER_PAGINATION
				}
			};
		}
		component.set("v.downloadParams", bodyRequest);

        return bodyRequest;
	},
	
	/*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Creates the body request to load every
					page of filtered transactions
    History
    <Date>			<Author>			<Description>
	25/08/2020		Guillermo Giral   		Initial version
	*/
	setBodyParamsWithFilters : function ( component, helper, accountInfo, newPage, filters)
    {
		// Get the default request
		let bodyParams = helper.setBodyParams(component, helper, component.get("v.accountDetails"), newPage);
		//let bodyParams = helper.setBodyParams(component, helper, component.get("v.accountDetails"), 1);

		// Create the request params with default values
		var accountData = component.get("v.accountDetails");

		// Creation of all the selected filters
		var categories = [];
		for(var f in filters){
			var currentFilter = filters[f];
			switch (currentFilter.name){ 
				case $A.get("$Label.c.Category") :
					for(var cat in currentFilter.value){
						var codigoTransaccion = {
							"swiftCode" : currentFilter.value[cat].value
						}
						categories.push(codigoTransaccion);
					}
					bodyParams.search_data.swiftCodeList = categories;
				break;
                case $A.get("$Label.c.bookDate") :
					var timePeriod = component.get("v.selectedTimeframe");
					const regExp = /[:-]/g;
                     if(timePeriod != $A.get("$Label.c.selectOne") && component.get("v.dates").length == 0){
							var toDate = new Date(Date.now());
							toDate.setSeconds(0,0);
                            //bodyParams.search_data.toProcessedDate = toDate.toISOString().replace(regExp, "").replace("Z","+0000").replace(".","");
                            
                        if(component.get("v.accountDetails.country") != $A.get("$Label.c.Ebury")) {
                            bodyParams.search_data.toProcessedDate = toDate.toISOString().replace("Z","+0000");
                        } else{
                            bodyParams.search_data.toAccountingDate = toDate.toISOString().replace("Z","+0000");
                        }
                                               
							var fromDate = this.getBookDateFromTimePeriod(timePeriod, toDate);
							//bodyParams.search_data.fromProcessedDate = fromDate.replace(regExp, "").replace("Z","+0000").replace(".","");
							
                        if(component.get("v.accountDetails.country") != $A.get("$Label.c.Ebury")) {
                            bodyParams.search_data.fromProcessedDate = fromDate.replace("Z","+0000");
                        } else {
                            bodyParams.search_data.fromAccountingDate = fromDate.replace("Z","+0000");
                        }
							
							if(component.get("v.dates").length != 0){
								component.set("v.changedTimeFrame",false);
							}								
                    }else{
						if(timePeriod != $A.get("$Label.c.selectOne")){  
							if(component.get("v.dates").length != 0){
								component.set("v.changedTimeFrame",false);
							}		
						}
						// DA - 07/11/2020 - Ebury accounts
                        if(currentFilter.value.from != undefined && currentFilter.value.from != null){
							if(component.get("v.sourcePage")=='accountTransactions' || component.get("v.sourcePage")=='globalBalance'){
								//bodyParams.search_data.fromProcessedDate = currentFilter.value.from.replace(regExp, "").replace("Z","+0000").replace(".","");
								if(component.get("v.accountDetails.country") != $A.get("$Label.c.Ebury")) {
									bodyParams.search_data.fromProcessedDate = currentFilter.value.from.replace("Z","+0000");
								} else {
									bodyParams.search_data.fromAccountingDate = currentFilter.value.from.replace("Z","+0000");
								}
							}else{
								//bodyParams.search_data.fromProcessedDate = component.get("v.fromDate").replace(regExp, "").replace("Z","+0000").replace(".","");
								if(component.get("v.accountDetails.country") != $A.get("$Label.c.Ebury")) {
									bodyParams.search_data.fromProcessedDate = component.get("v.fromDate").replace("Z","+0000");
								} else {
									bodyParams.search_data.fromAccountingDate = component.get("v.fromDate").replace("Z","+0000");
								}
							}
                        }
                        if(currentFilter.value.to != undefined && currentFilter.value.to != null){
							if(component.get("v.sourcePage")=='accountTransactions' || component.get("v.sourcePage")=='globalBalance'){
								//bodyParams.search_data.toProcessedDate = currentFilter.value.to.replace(regExp, "").replace("Z","+0000").replace(".","");
								if(component.get("v.accountDetails.country") != $A.get("$Label.c.Ebury")) {
									bodyParams.search_data.toProcessedDate = currentFilter.value.to.replace("Z","+0000");
								} else {
									bodyParams.search_data.toAccountingDate = currentFilter.value.to.replace("Z","+0000");
								}
							}else{
								//bodyParams.search_data.toProcessedDate = component.get("v.toDate").replace(regExp, "").replace("Z","+0000").replace(".","");
								if(component.get("v.accountDetails.country") != $A.get("$Label.c.Ebury")) {
									bodyParams.search_data.toProcessedDate = component.get("v.toDate").replace("Z","+0000");
								} else {
									bodyParams.search_data.toAccountingDate = component.get("v.toDate").replace("Z","+0000");
								}
			
							}
						}                        
					}
					
				break;
				case $A.get("$Label.c.amount") :
					if(currentFilter.value.from != undefined && currentFilter.value.from != null && currentFilter.value.from != ""){
						bodyParams.search_data.fromAmount = parseFloat(currentFilter.value.from);
                        if(currentFilter.value.to == undefined || currentFilter.value.to == "" || currentFilter.value.to == null ){
                            bodyParams.search_data.toAmount = 99999999999999999.0;
                        }
					}
					if(currentFilter.value.to != undefined && currentFilter.value.to != null && currentFilter.value.to != ""){
                        if(currentFilter.value.from == undefined || currentFilter.value.from == "" || currentFilter.value.from == null){
                            bodyParams.search_data.fromAmount = 0.0;
                        }
						bodyParams.search_data.toAmount = parseFloat(currentFilter.value.to);
					}
				break;
				case "debit" :
                    if(currentFilter.value){
                        bodyParams.search_data.transactionType = "debit";
                    }
                break;
                case "credit" :
                    if(currentFilter.value){
                        bodyParams.search_data.transactionType = "credit";
                    }
                break;
				case "clientRef" :
					bodyParams.search_data.clientReference = currentFilter.value; 
				break;
				case "description" :
					bodyParams.search_data.description = currentFilter.value; 
				break;
			}
		}
		component.set("v.downloadParams", bodyParams);

        return bodyParams;
    },

	/*
	Author:         Joaquín Vera
    Company:        Deloitte
	Description:    Handles the pagination change to retrieve
					more transactions from the server
    History
    <Date>			<Author>			<Description>
	10/08/2020		Joaquín Vera   		Initial version
	*/
    handlePageChanged : function ( component,event,helper)
    {
		component.set("v.highestPage", component.get("v.listOfPages").length);
		component.set("v.currentPage", event.getParam("currentPage"));
        if(component.get("v.currentPage") == component.get("v.highestPage") && component.get("v.currentPage") < component.get("v.maxPage"))
        {
			//component.set("v.highestPage", event.getParam("currentPage"));
			// Check whether the data is currently being filtered or not
			let isFiltering = component.get("v.selectedFilters").length > 0;
            let bodyParams;
            if(isFiltering){
                bodyParams = helper.setBodyParamsWithFilters(component, helper, component.get("v.accountDetails"), event.getParam("currentPage"), component.get("v.selectedFilters"));
            } else {
            	bodyParams = helper.setBodyParams(component, helper, component.get("v.accountDetails"), event.getParam("currentPage"));    
            }
                			
            component.find("Service").callApex2(
                component, 
                helper, 
                "c.getPaginatedMovements",
                {
                    bodyParams : JSON.stringify(bodyParams)
                },
				//helper.setMovementList
				helper.setTableData
            );
        }
    },
    
    /*
	Author:         Antonio Duarte
    Company:        Deloitte
	Description:    Gets the account lastupdate time
    History
    <Date>			<Author>			<Description>
	13/10/2020		Antonio Duarte   	Initial version
	*/
    getLastUpdateDateTime : function(component)
    {
        var account = component.get("v.accountDetails");
        if(account.bookDate != 'Not found' && account.bookDate.includes(" ")){
            var updateHour = account.bookDate.split(' ')[1];
            component.set("v.accountDetails.updatedHour", updateHour.split(':')[0] +':'+ updateHour.split(':')[1]);
        }
    }
})