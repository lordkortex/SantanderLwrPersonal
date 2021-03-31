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
		var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
		component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);	
	},

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Decodes and parses the URL params
    History
    <Date>          <Author>            	<Description>
    03/03/2020      Guillermo Giral       Initial version
    
   	setTimezoneOffset : function(component, helper, response) {	
		component.set("v.userTimezoneOffset", response);
	},*/

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
					case("c__lastUpdate"):
						sParameterName[1] === undefined ? 'Not found' : 
							sParameterName[1] == "true" ? component.set("v.lastUpdate", true) : component.set("v.lastUpdate", false);
						break;
					case("c__subsidiaryName"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.accountName = sParameterName[1];
						break;
					case("c__accountNumber"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.accountNumber = sParameterName[1];
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
						sParameterName[1] === undefined ? 'Not found' : filtering = true;component.set("v.selectedFilters", JSON.parse(sParameterName[1]));
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
                     //JVV - Status navigation
                     case("c__accountStatus"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.status = sParameterName[1];
                        break;   
                      
											 
																												  
							   
				}
			}

			accountDetails.finalCodigoBic = accountDetails.codigoBic;
			component.set("v.accountDetails", accountDetails);
			 
			var isEndOfDay = !component.get("v.lastUpdate");

			var storage = window.localStorage.getItem(userId + '_' + 'tab');
            if(storage != null && storage != undefined){
                if(storage == 'lastUpdate'){
					isEndOfDay=false;
					component.set("v.lastUpdate",true);
                }else{
					isEndOfDay= true;
					component.set("v.lastUpdate",false);

                }
            }

			if(filtering == false  || component.get("v.selectedFilters").length==0){
			//Get params

				var params = {};

				// Create the list of accounts and cache key param
				params.obtTransacBusqueda = {};
				params.obtTransacBusqueda.entrada = {};
				params.obtTransacBusqueda.entrada.cacheKey = {};
				params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = "";
				params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = "";
				params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = [];
				params.obtTransacBusqueda.entrada.filtro = {};
				params.obtTransacBusqueda.entrada.filtro.listaPais = [];
				params.obtTransacBusqueda.entrada.filtro.listaDivisa = [];
				params.obtTransacBusqueda.entrada.filtro.listaCodigoBic = [];
				params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = [{'codigoCuenta':accountDetails.accountCode}];
				if(component.get("v.lastUpdate")==false){
					params.obtTransacBusqueda.entrada.filtro.typeBalance = "EOD";

				}else{
					params.obtTransacBusqueda.entrada.filtro.typeBalance = "LU";

				}

				params.obtTransacBusqueda.entrada.filtro.importeDesde = "";
				params.obtTransacBusqueda.entrada.filtro.importeHasta = "";
				params.obtTransacBusqueda.entrada.filtro.listaCodigosTransacciones = [];
				params.obtTransacBusqueda.entrada.filtro.CAMPO_ORDENACION = "bookDate";
				params.obtTransacBusqueda.entrada.filtro.ORDENACION_ASCENDENTE = "N";
				params.obtTransacBusqueda.entrada.filtro.TAM_PAGINA = "1000";
				params.obtTransacBusqueda.entrada.numPagina = "1";

				// Update the params object for the downloads
				let params_download = JSON.parse(JSON.stringify(params));
				params_download.obtTransacBusqueda.entrada.filtro.listaPais = [{'codPais':accountDetails.country}];				
				params_download.obtTransacBusqueda.entrada.filtro.listaDivisa = [{'codDivisa':accountDetails.accountCurrency}];
				params_download.obtTransacBusqueda.entrada.filtro.listaCodigoBic = [{'codigoBic':{'ENTIDAD_BIC':accountDetails.finalCodigoBic.substring(0,4),'PAIS_BIC':accountDetails.finalCodigoBic.substring(4,6),'LOCATOR_BIC':accountDetails.finalCodigoBic.substring(6,8),'BRANCH':accountDetails.finalCodigoBic.substring(8)}}];

				const regExp = /[:-]/g;
				if(params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde != "" && params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde != undefined)
				{
					params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde = params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde.replace("Z", "+0000");
				}
		
				
				if(params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta != "" && params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta != undefined)
				{
					params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta = params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta.replace("Z", "+0000");
				}
		
				params_download.obtTransacBusqueda.entrada.filtro.limit = 10000;
		
				component.set("v.downloadParams", params_download);




				component.set("v.downloadParams", params_download);
		
				// Call the server side function to populate the data and the category list
				// var isEndOfDay = component.get("v.lastUpdate") == "false";
				var isEndOfDay = !component.get("v.lastUpdate");
				component.set("v.isAdvancedSearch", false);
				
				//AM - 14/10/2020 - Fix Recieve format number from Cache.
				if(isEndOfDay){
					component.find("Service").retrieveFromCache(component, helper, 'balanceEODGP', helper.setUserNumberFormat);
				}else{
					component.find("Service").retrieveFromCache(component, helper, 'balanceGP', helper.setUserNumberFormat);
				}
			}else{
				helper.sendDataServiceRequestWithFilters(component, helper, component.get("v.selectedFilters"),isEndOfDay);
			}
		}		
	},

	/*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function retrieve the user date and number format
    History
    <Date>			<Author>			    <Description>
    04/05/2020		Guillermo Giral         Initial version
    */
   	setUserDateNumberFormat : function(component, helper, response){
		if(response != null){
			component.set("v.userPreferredDateFormat", response.dateFormat);
			//AM - 14/10/2020 - Fix Recieve format number from Cache.
			if(component.get("v.userPreferredNumberFormat") == undefined || component.get("v.userPreferredNumberFormat") == null){
				component.set("v.userPreferredNumberFormat", response.numberFormat);
			}
			
			var isEndOfDay = !component.get("v.lastUpdate");
			var accountDetails = component.get("v.accountDetails");
			let params = {
				"isEndOfDay" : isEndOfDay,
				"accountCode" : accountDetails.accountCode,
				"bookDateTime" : accountDetails.bookDate
			}
	         /*		
            // Get the account last update datetime
            if(component.get("v.lastUpdate")){
                helper.getLastUpdateDateTime(component);
            }*/
			component.find("Service").callApex2(component, helper,"c.getTransactionsByAccount", params, helper.setTableData);
		}
	},

	/*
    Author:         Adrian Muñio
    Company:        Deloitte
    Description:    Function retrieve the user number format
    History
    <Date>			<Author>			    <Description>
    14/10/2020		Adrian Muñio         	Initial version
    */
   	setUserNumberFormat : function(component, helper, response){
		if(response != null){
			var parsedResponse = JSON.parse(response);
			if(parsedResponse != null && parsedResponse.mapUserFormats != null){
				component.set("v.userPreferredNumberFormat", parsedResponse.mapUserFormats.numberFormat);
			}
		}
		// Get user preferred date format
		let params_aux = {
			"userId" : $A.get("$SObjectType.CurrentUser.Id")
		}					
		component.find("Service").callApex2(component, helper, "c.getUserPreferredFormat", params_aux, helper.setUserDateNumberFormat);
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
		if(response != '' && response != null   && response != undefined){
			var transactions = response.balances.transactions;
			if(transactions.obtTransacBusqueda != undefined){
				component.set("v.isAdvancedSearch", true);
			}
			if(response.balances.transactions.totalRegistros !=undefined ){
				component.set("v.maximumRecords",response.balances.transactions.totalRegistros);
            } else {
                component.set("v.maximumRecords", 0);
			}
			
			//AM - 11/11/2020 - US7687: Campos MT940
			var objTransactionList;
			if(component.get("v.isAdvancedSearch")){
				objTransactionList = transactions.obtTransacBusqueda;
			}else{
				objTransactionList = transactions.listaObtTransacciones[0];
			}

			//COUNTRY -> BR,KY,LU
			if(component.get("v.accountDetails.country") == "BR" || component.get("v.accountDetails.country") == "KY" || component.get("v.accountDetails.country") == "LU"){
			
				for(var tran in objTransactionList){
					
					//If transactionConsolidated is false means that the transaction comes from the MT940.
					if(objTransactionList[tran].obtTransacBusqueda.transactionConsolidated != undefined && 
					   objTransactionList[tran].obtTransacBusqueda.transactionConsolidated != null && 
					   objTransactionList[tran].obtTransacBusqueda.transactionConsolidated == "false"){

						if(objTransactionList[tran].obtTransacBusqueda.descripcion != undefined && 
						   objTransactionList[tran].obtTransacBusqueda.descripcion != null && 
						   objTransactionList[tran].obtTransacBusqueda.descripcion){
							
							//4 Digits, space, slash, space -> String for LocalCode.
							if(objTransactionList[tran].obtTransacBusqueda.descripcion.length >= 7){
								var s1 = objTransactionList[tran].obtTransacBusqueda.descripcion.substring(0,4);
								var s2 = objTransactionList[tran].obtTransacBusqueda.descripcion.substring(4,7);
								
								// /^\d+$/ to check if there are only numbers.
								if(/^\d+$/.test(s1) && s2 == " - "){
									objTransactionList[tran].obtTransacBusqueda.ltcCode = s1;

									//We delete that part from Description.
									objTransactionList[tran].obtTransacBusqueda.descripcion = objTransactionList[tran].obtTransacBusqueda.descripcion.substring(7);
								}
							}
							
							//If contains / -> String for Client reference.
							//Before that, we will save client reference value in batchClientReference and AdditionalInformation.
							if(objTransactionList[tran].obtTransacBusqueda.descripcion.includes("/")){
								objTransactionList[tran].obtTransacBusqueda.transactionBatchReference  = objTransactionList[tran].obtTransacBusqueda.refCliente;
								objTransactionList[tran].obtTransacBusqueda.aditionalInformation 	   = objTransactionList[tran].obtTransacBusqueda.refCliente;
								objTransactionList[tran].obtTransacBusqueda.refCliente 	= objTransactionList[tran].obtTransacBusqueda.descripcion.substring(objTransactionList[tran].obtTransacBusqueda.descripcion.indexOf("/"));
								
								//We delete that part from Description.
								objTransactionList[tran].obtTransacBusqueda.descripcion = objTransactionList[tran].obtTransacBusqueda.descripcion.substring(0, objTransactionList[tran].obtTransacBusqueda.descripcion.indexOf("/"));
							}
						}
					}
				}
			}

			if(component.get("v.isAdvancedSearch")){
				transactions.obtTransacBusqueda = objTransactionList;
			}else{
				transactions.listaObtTransacciones[0] = objTransactionList;
			}
			

			component.set("v.transactionResults", transactions);
			component.set("v.wholeTransactionResults", JSON.parse(JSON.stringify(transactions)));

			if(component.get("v.isInitialLoad") && !component.get("v.isAdvancedSearch") && response.balances.transactions.listaObtTransacciones.length != 0){
				// Save the account data returned by the service
                if(response.balances.transactions.listaObtTransacciones[0][0] !=  undefined || response.balances.transactions.listaObtTransacciones[0].length > 0){
                   component.set("v.accountDetails.codigoBic", response.balances.transactions.listaObtTransacciones[0][0].obtTransacBusqueda.codigoBIC); 
                }else {                    
                    component.set("v.wholeTransactionResults", null);
                }
				
				component.set("v.isInitialLoad", false);
			}
			// Get the latest date and hour of update from the transactions
			helper.getLatestTimestampFromTransactions(component);
            
            // Get the account last update datetime
            helper.getLastUpdateDateTime(component);
		} else {
			component.set("v.wholeTransactionResults", null);
            component.set("v.transactionResults", null);
            component.set("v.maximumRecords", 0);
		}

		// When the previous page is Accounts, the filters must be received from the balances web service
		var timePeriods = [];

		if(component.get("v.sourcePage") != "accountTransactions"){
			if(!component.get("v.isAdvancedSearch") && (response != '' && response != null   && response != undefined)){

					helper.setFiltersData(component, helper);
			}else{
				//SNJ - 16/04/2020 adding "Select One" option
				if(!component.get("v.changedTimeFrame")){
					timePeriods.push($A.get("$Label.c.selectOne"));
					component.set("v.selectedTimeframe", timePeriods[0]);
				}
				timePeriods.push($A.get("$Label.c.lastDay"));
				timePeriods.push($A.get("$Label.c.last7Days"));
				timePeriods.push($A.get("$Label.c.lastMonth"));
				
				component.set("v.timePeriods", timePeriods);
			}
		// If the previous page was Account Transactions Detail, it means the filters must be applied as they come from the URL
		} else {
			if(JSON.stringify(component.get("v.selectedFilters"))== []){

				component.find("Service").callApex2(component, helper,"c.getTransactionCategories", {}, helper.getCategoryList);
			}
		}
		component.set("v.loading", false);
	},

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Populates the list of categories based on the
                    Transaction Category Global Picklist
    History
    <Date>          <Author>           	   <Description>
    19/04/2020      Guillermo Giral        Initial version
    */
    getCategoryList : function (component, helper, response){
        // CATEGORY LIST CREATION
        var filters = component.get("v.filters");

        // Create the filter object and push it to the list of filters
        var filter = {};
        filter.data = [];
        var categoryList = response;
        for(var i in categoryList) {
            var a = {
                value : categoryList[i],
                displayValue : categoryList[i],
                checked : false
            };
            filter.data.push(a);
        
        }
        filter.name = $A.get("$Label.c.Category"); 
        filter.displayFilter = false;
        filter.type = 'checkbox';
        filter.numberChecked = 0;
        filters = filters.filter(f => f.name != $A.get("$Label.c.Category"));
        filters.push(filter);
        // Also update the initial filter
        component.set("v.filters",  filters);
        component.set("v.loading", false);
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Populates the list of categories based on the
                    transactions returned by the service
    History
    <Date>          <Author>           	   <Description>
    25/03/2019      Guillermo Giral        Initial version
    */
    buildCategoryList : function (component, transactions, isAdvancedSearch){
        // CATEGORY LIST CREATION
        var filters = component.get("v.filters");
		var categorySet = new Set();
		if(!isAdvancedSearch){
			for(var tran in transactions.listaObtTransacciones[0]){
				categorySet.add(transactions.listaObtTransacciones[0][tran].obtTransacBusqueda.tipoTransaccion);
			}
		} else {
			for(var tran in transactions.obtTransacBusqueda){
				categorySet.add(transactions.obtTransacBusqueda[tran].obtTransacBusqueda.tipoTransaccion);
			}
		}

        // Create the filter object and push it to the list of filters
		var filter = {};
		var categoryList = Array.from(categorySet);
        filter.data = [];
        for(var i in categoryList) {
            var a = {
                value : categoryList[i],
                displayValue : categoryList[i],
                checked : false
            };
            filter.data.push(a);
        
        }
        filter.name = $A.get("$Label.c.Category"); 
        filter.displayFilter = false;
        filter.type = 'checkbox';
        filter.numberChecked = 0;
        filters.push(filter);
        component.set("v.filters", filters);
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
        //SNJ - 16/04/2020 adding "Select One" option
        timePeriods.push($A.get("$Label.c.selectOne"));
		timePeriods.push($A.get("$Label.c.lastDay"));
		timePeriods.push($A.get("$Label.c.last7Days"));
		timePeriods.push($A.get("$Label.c.lastMonth"));
		component.set("v.timePeriods", timePeriods);
        component.set("v.selectedTimeframe", timePeriods[0]);

		var accountDetails = component.get("v.accountDetails");

		// Create the initial values for the filters
		var countryList = new Set();
		var displayedCountryList = new Set();
		var accCurrencies = new Set();
		var bankList = [];
		var accountList = [];

		displayedCountryList.add(accountDetails.countryName);
		countryList.add(accountDetails.country);	
		accCurrencies.add(accountDetails.accountCurrency);
		
		// COUNTRY LIST CREATION
		var countryAux = Array.from(countryList);
		var displayCountryAux = Array.from(countryList);
		var listObject = [];
		listObject.push({});
		listObject[0].data = []
		for(var i in countryAux) {
			var a = {
				value : countryAux[i],
				displayValue : displayCountryAux[i],
				checked : false
			};
			listObject[0].data.push(a);
		
		}
		listObject[0].name = $A.get("$Label.c.Country"); 
		listObject[0].type = 'checkbox';
		listObject[0].displayFilter = false;
		listObject[0].numberChecked = 0;
		
		// BANKS MAP CREATION
		listObject.push({});
		listObject[1].data = [];
		bankList.push(accountDetails.bank);
		for(var i in bankList) {
			var currentBank = bankList[i];
			var b = {
				value : currentBank,
				displayValue : currentBank,
				checked : false
			};
			listObject[1].data.push(b);
		
		}
		listObject[1].name = $A.get("$Label.c.Bank");
		listObject[1].type = 'checkbox';
		listObject[1].displayFilter = false;
		listObject[1].numberChecked = 0;

		// ACCOUNT MAP CREATION
		accountList.push(accountDetails.accountNumber);
		listObject.push({});
		listObject[2].data = [];
		for(var key in accountList){
			//var accountDisplayValue = accountDetails.accountAlias  + " - " + accountList[key];
			var accountDisplayValue = accountList[key];
			var currentAccount = {
				value : accountList[key],
				displayValue : accountDisplayValue,
				checked: false
			};
			listObject[2].data.push(currentAccount);
		}
		listObject[2].name = $A.get("$Label.c.Account");
		listObject[2].type = 'checkbox';
		listObject[2].displayFilter = false;
		listObject[2].numberChecked = 0;
		
		// CALENDAR CREATION
		listObject.push({});
		if(component.get("v.dates") != undefined){
			listObject[3].data = component.get("v.dates");
		}
		listObject[3].name = $A.get("$Label.c.bookDate");
		listObject[3].type = 'dates';
		listObject[3].displayFilter = true;

		// AMOUNT SELECTION
		listObject.push({});
		listObject[4].name = $A.get("$Label.c.amount");
		listObject[4].type = 'text';
		listObject[4].displayFilter = true;
		listObject[4].displayOptions = false;

		// CURRENCY LIST CREATION
		var listCurrencies = Array.from(accCurrencies);
		listObject.push({});
		listObject[5].data = []
		for(var i in listCurrencies) {
			var a = {
				value : listCurrencies[i],
				displayValue : listCurrencies[i],
				checked : false
			};
			listObject[5].data.push(a);
		
		}
		listObject[5].name = $A.get("$Label.c.currency"); 
		listObject[5].displayFilter = false;
		listObject[5].type = 'checkbox';
		listObject[5].numberChecked = 0;

		component.set("v.filters", listObject);

		// let transactions = component.get("v.transactionResults");
		// helper.buildCategoryList(component, transactions);
		component.find("Service").callApex2(component, helper,"c.getTransactionCategories", {}, helper.getCategoryList);
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
				var data;
				if(!component.get("v.isAdvancedSearch")){
			   		data = component.get("v.transactionResults.listaObtTransacciones")[0];
			   	} else{
					data = component.get("v.transactionResults.obtTransacBusqueda");
				}
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
   	sendDataServiceRequestWithFilters : function (component, helper, filters, isEndOfDay){
		// Create the request params with default values
		//var accountData = component.get("v.accountData");
		var accountData = component.get("v.accountDetails");
		var params = {};
		params.obtTransacBusqueda = {};
		params.obtTransacBusqueda.entrada = {};
		params.obtTransacBusqueda.entrada.cacheKey = {};
		params.obtTransacBusqueda.entrada.filtro = {};
		params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = "";
		params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = "";
		if(isEndOfDay){
			params.obtTransacBusqueda.entrada.filtro.typeBalance = "EOD";
		} else {
			params.obtTransacBusqueda.entrada.filtro.typeBalance = "LU";
		}
		params.obtTransacBusqueda.entrada.filtro.importeDesde = "";
		params.obtTransacBusqueda.entrada.filtro.importeHasta = "";
		params.obtTransacBusqueda.entrada.filtro.listaCodigosTransacciones = [];
		params.obtTransacBusqueda.entrada.filtro.listaCodigoBic = [];
		params.obtTransacBusqueda.entrada.filtro.listaDivisa = [];
		params.obtTransacBusqueda.entrada.filtro.listaPais = [];
		params.obtTransacBusqueda.entrada.filtro.CAMPO_ORDENACION = "bookDate";
		params.obtTransacBusqueda.entrada.filtro.ORDENACION_ASCENDENTE = "N";
		params.obtTransacBusqueda.entrada.filtro.TAM_PAGINA = "1000";
		params.obtTransacBusqueda.entrada.numPagina = "1";

		// Creation of account codes, BIC codes , countries and currencies lists
		var categories = [];
		for(var f in filters){
			var currentFilter = filters[f];
			switch (currentFilter.name){ 
				case $A.get("$Label.c.Category") :
					for(var cat in currentFilter.value){
						var codigoTransaccion = {
							"codigoTransaccion" : currentFilter.value[cat].value
						}
						categories.push(codigoTransaccion);
					}
					params.obtTransacBusqueda.entrada.filtro.listaCodigosTransacciones = categories;
				break;
                case $A.get("$Label.c.bookDate") :
                    var timePeriod = component.get("v.selectedTimeframe");
                    if(timePeriod != $A.get("$Label.c.selectOne") && component.get("v.dates").length == 0){
							var toDate = new Date(Date.now());
                            params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = toDate.toISOString();
							var fromDate = this.getBookDateFromTimePeriod(timePeriod, toDate);
							params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = fromDate;
							if(component.get("v.dates").length != 0){
								component.set("v.changedTimeFrame",false);
							}								
                    }else{
						
						/*if(timePeriod != $A.get("$Label.c.selectOne")){
                               
							if(component.get("v.dates").length != 0){
								component.set("v.changedTimeFrame",false);
							}		
                        }*/
                        component.set("v.selectedTimeframe", $A.get("$Label.c.selectOne"));

                        if(currentFilter.value.from != undefined && currentFilter.value.from != null){
							if(component.get("v.sourcePage")=='accountTransactions' || component.get("v.sourcePage")=='globalBalance'){
								params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = currentFilter.value.from; 
								//component.set("v.dates",[currentFilter.value.from,currentFilter.value.to])

							}else{
								params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = component.get("v.fromDate"); 

							}
                        }
                        if(currentFilter.value.to != undefined && currentFilter.value.to != null){
							if(component.get("v.sourcePage")=='accountTransactions' || component.get("v.sourcePage")=='globalBalance'){
								params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = currentFilter.value.to;

							}else{
								params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = component.get("v.toDate");
			
							}
                        }                         
					}
					
				break;
				case $A.get("$Label.c.amount") :
					if(currentFilter.value.from != undefined && currentFilter.value.from != null && currentFilter.value.from != ""){
						params.obtTransacBusqueda.entrada.filtro.importeDesde = currentFilter.value.from;
                        if(currentFilter.value.to == undefined || currentFilter.value.to == "" || currentFilter.value.to == null ){
                            params.obtTransacBusqueda.entrada.filtro.importeHasta = "99999999999999999";
                        }
					}
					if(currentFilter.value.to != undefined && currentFilter.value.to != null && currentFilter.value.to != ""){
                        if(currentFilter.value.from == undefined || currentFilter.value.from == "" || currentFilter.value.from == null){
                            params.obtTransacBusqueda.entrada.filtro.importeDesde = "0";
                        }
						params.obtTransacBusqueda.entrada.filtro.importeHasta = currentFilter.value.to;
					}
				break;
				case "debit" :
                    if(currentFilter.value){
                        params.obtTransacBusqueda.entrada.filtro.transactionType = "debit";
                    }
                break;
                case "credit" :
                    if(currentFilter.value){
                        params.obtTransacBusqueda.entrada.filtro.transactionType = "credit";
                    }
                break;
				case "clientRef" :
					params.obtTransacBusqueda.entrada.filtro.clientReference = currentFilter.value; 
				break;
				case "description" :
					params.obtTransacBusqueda.entrada.filtro.description = currentFilter.value; 
				break;
			}
		}

		// Fill the blocked fields data -> Account + Coutnry + Currency + Bank
		var accountCodes = [];
		var countryList = [];
		var currencyList = [];
		var codigosBic = [];
		// ACCOUNT

		var codigoCuenta = {
			"codigoCuenta" : accountData.accountCode
		};
		accountCodes.push(codigoCuenta);
		params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accountCodes;
		if(isEndOfDay){
			// COUNTRY
			var codPais = {
				"codPais" : accountData.country
			};
			countryList.push(codPais);
			
			// CURRENCY
			var codDivisa = {
				"codDivisa" : accountData.accountCurrency
			};
			currencyList.push(codDivisa);

			// BIC CODE
			var codigoBicObject = {};
			if(accountData.codigoBic.ENTIDAD_BIC == 'undefined'){
				codigoBicObject = {
					"codigoBic" : {
						"ENTIDAD_BIC": accountData.codigoBic.ENTIDAD_BIC,
						"PAIS_BIC": accountData.codigoBic.PAIS_BIC,
						"LOCATOR_BIC": accountData.codigoBic.LOCATOR_BIC,
						"BRANCH": accountData.codigoBic.branch
					}
				};
			}else{
				codigoBicObject = {
					"codigoBic" : {
						'ENTIDAD_BIC':accountData.finalCodigoBic.substring(0,4),
						'PAIS_BIC':accountData.finalCodigoBic.substring(4,6),
						'LOCATOR_BIC':accountData.finalCodigoBic.substring(6,8),
						'BRANCH':accountData.finalCodigoBic.substring(8)
						}
					};
			}

			codigosBic.push(codigoBicObject);

			// Complete the params object for the transactions download
			var params_download = JSON.parse(JSON.stringify(params));

			
			params_download.obtTransacBusqueda.entrada.filtro.listaPais = countryList;
			params_download.obtTransacBusqueda.entrada.filtro.listaDivisa = currencyList;
			params_download.obtTransacBusqueda.entrada.filtro.listaCodigoBic = codigosBic;
		}

		component.set("v.loading", true);
        
		// If there is any selected time period dropdown, overwrite the date filter
        if(component.get("v.selectedTimeframe") != $A.get("$Label.c.selectOne")){
            let toDate = new Date(Date.now());
            params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = toDate.toISOString();
            let fromDate = this.getBookDateFromTimePeriod(component.get("v.selectedTimeframe"), toDate);
         	params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = fromDate;	  
            if(component.get("v.dates").length != 0){
                component.set("v.changedTimeFrame",false);
            }	
        }
        
        // Set download params values
		var params_download = JSON.parse(JSON.stringify(params));
		const regExp = /[:-]/g;
		if(params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde != "" && params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde != undefined)
        {
            params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde = params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde.replace("Z", "+0000");
        }

        
        if(params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta != "" && params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta != undefined)
        {
            params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta = params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta.replace("Z", "+0000");
        }

		params_download.obtTransacBusqueda.entrada.filtro.limit = 10000;

		component.set("v.downloadParams", params_download);
		// Call the server-side method to get the transactions with filters
		component.find("Service").callApex2(component, helper,"c.getTransactions", {"requestBody":JSON.stringify(params)}, helper.setTableData);
		helper.calculateNumberActiveFilters(component);
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
					//var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 1);
                    /*
                    previousDate = previousDate.toString().length == 1 ? "0" + previousDate : previousDate;
					var previousMonth = previousDate.getMonth()+1;
                    previousMonth = previousMonth.toString().length == 1 ? "0" + previousMonth : previousMonth;*/
					//bookDate = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();
					bookDate = previousDate.toISOString();
				break;

				case $A.get("$Label.c.last7Days"): 
					//var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 7);
                    /*
                    previousDate = previousDate.toString().length == 1 ? "0" + previousDate : previousDate;
					var previousMonth = previousDate.getMonth()+1;
                    previousMonth = previousMonth.toString().length == 1 ? "0" + previousMonth : previousMonth;
					//bookDate = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();*/
					bookDate = previousDate.toISOString();
				break;

				case $A.get("$Label.c.lastMonth"): 
					//var previousDate = new Date();
					previousDate.setDate(previousDate.getDate() - 30);
                    /*
                    previousDate = previousDate.toString().length == 1 ? "0" + previousDate : previousDate;
					var previousMonth = previousDate.getMonth()+1;
                    previousMonth = previousMonth.toString().length == 1 ? "0" + previousMonth : previousMonth;
					//bookDate = previousDate.getFullYear() + "-" + previousMonth + "-" + previousDate.getDate();*/
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

					/*if(timeZoneOffsetInMs!=0){
						if(Math.abs(timeZoneOffsetInMs) > Math.abs(localTimezoneOffSet)){
							newDate = new Date(Date.parse(xx) - timeZoneOffsetInMs);

						}else if(Math.abs(timeZoneOffsetInMs) < Math.abs(localTimezoneOffSet)){
							newDate = new Date(Date.parse(xx) -timeZoneOffsetInMs);

						}else					
						{
							newDate = new Date(Date.parse(xx) - timeZoneOffsetInMs );
						}
					}else{
						newDate=new Date(getUTC+offset);
					}*/
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
			if(transactions.listaObtTransacciones != undefined && transactions.listaObtTransacciones[0].length > 0){
				transactionsData = transactions.listaObtTransacciones[0];
			} else if(transactions.obtTransacBusqueda != undefined && transactions.obtTransacBusqueda.length > 0){
				transactionsData = transactions.obtTransacBusqueda;
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
				timeStampArray.sort((a,b) => b - a);
				var latestTimeStamp = new Date(timeStampArray[0]).toISOString();
				//var latestHour = new Date(timeStampArray[0]).toISOString().split('T')[1].substring(0,5);
				var latestHour = $A.localizationService.formatTime(latestTimeStamp, "HH:mm");
				component.set("v.accountDetails.dateValue", latestTimeStamp);
				component.set("v.accountDetails.hourValue", latestHour);
			}
		} else {
			component.set("v.accountDetails.dateValue", "N/A");
			component.set("v.accountDetails.hourValue", "N/A");
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
					var domain=$A.get('$Label.c.domainCashNexus');

					window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+results+'?operationContext=S1';

					setTimeout(function(){
						helper.removeFile(component, event, helper, results);
                    }, 100);
	 
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

			var action = component.get("c.downloadFileDoc");
			
			var params = component.get("v.downloadParams");
			console.log('params 2:');
			console.log(params);
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
        if(component.get("v.lastUpdate")){
            for(var key in Object.keys(formFilters)){
                var filterName = Object.keys(formFilters)[key];
                if(((filterName == "debit" || filterName == "credit") && formFilters[filterName]) || ((filterName == "clientRef" || filterName == "description") && formFilters[filterName])){
                    filterCount++;
                }
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