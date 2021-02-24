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
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );	
        component.set("v.loading", true);
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        if(sPageURLMain != ""){
            component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);	
        }else{
            var storage = window.localStorage.getItem(userId + '_' + 'tab');
            if(storage != null && storage != undefined){
                if(storage == 'lastUpdate'){
                    component.set("v.endOfDay",false);
                }else{
                    component.set("v.endOfDay",true);
                }
                component.set("v.tabChangedByCache", false);
            }
            if(component.get("v.endOfDay")==true){
                    // Call the get filters data and get data service
                helper.initComponentData(component, "endOfDay", helper, false);
            }else{
                // Call the get filters data and get data service
                helper.initComponentData(component, "lastUpdate", helper, false);
            }
        }
    },
    
	 /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Parses the URL params
    History
    <Date>          <Author>            	<Description>
    04/03/2019      Guillermo Giral        	Initial version
    */
   	handleParams : function (component, helper, response){
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var eod = false;
        var selectedFi = "[]";
		if(response != "") {
            var sParameterName;
            // Set the default filters and call get data service with filters
            component.set("v.setOnlyDefaultFilters", true); // Comes from Transactions Detail
			for(var i = 0; i < response.length ; i++) {
				sParameterName = response[i].split("="); 
				if(sParameterName[0] == "c__filters") {
                    sParameterName[1] === undefined ? 'Not found' : component.set("v.filters", JSON.parse(sParameterName[1]));
				} else if(sParameterName[0] == "c__lastUpdate") {
                    sParameterName[1] === undefined ? 'Not found' : sParameterName[1] == "true" ? eod= false : eod= true;
                }else if (sParameterName[0] === 'c__accountsData') { 
                    sParameterName[1] === "undefined" ? component.set("v.accountsData", []) : component.set("v.accountsData", JSON.parse(sParameterName[1]));	           
                }else if (sParameterName[0] === 'c__accountCodeToInfo') { 
                    sParameterName[1] === "undefined" ? component.set("v.accountCodeToInfo", {}) : component.set("v.accountCodeToInfo", JSON.parse(sParameterName[1]));	           
                }else if (sParameterName[0] === 'c__selectedTimeframe') { 
                    sParameterName[1] === "undefined" ? component.set("v.selectedTimeframe", "") : component.set("v.selectedTimeframe", sParameterName[1]);	           
                }else if (sParameterName[0] === 'c__dates') { 
                    sParameterName[1] === "undefined" ? component.set("v.dates", []) : component.set("v.dates", JSON.parse(sParameterName[1]));	           
                }else if (sParameterName[0] === 'c__selectedFilters') { 
                    selectedFi = sParameterName[1];
                    sParameterName[1] === "undefined" ? component.set("v.selectedFilters", []) : component.set("v.selectedFilters", JSON.parse(sParameterName[1]));	           
                }else if(sParameterName[0] === "c__formFilters"){
                    sParameterName[1] === undefined  || sParameterName[1] == "undefined" ? 'Not found' : component.set("v.formFilters", JSON.parse(sParameterName[1]));
                }else if(sParameterName[0] === "c__accountCodes"){
                    sParameterName[1] === undefined  || sParameterName[1] == "undefined" || sParameterName[1] == "" ? component.set("v.accountCodesToSearch", []) : component.set("v.accountCodesToSearch", JSON.parse(sParameterName[1]));
                }
            }

            var storage = window.localStorage.getItem(userId + '_' + 'tab');
            if(storage != null && storage != undefined){
                //component.set("v.tabChangedByCache", true);
                if(storage == 'lastUpdate'){
                    component.set("v.endOfDay",false);
                }else{
                    component.set("v.endOfDay",true);
                }
                component.set("v.tabChangedByCache", false);
            }else{
                if(eod != null){
                    //component.set("v.tabChangedByCache", true);
                    component.set("v.endOfDay",eod);
                    component.set("v.tabChangedByCache", false);
                }
            }
            
            if(component.get("v.endOfDay")==true){
                // Call the get filters data and get data service
                helper.initComponentData(component, "endOfDay", helper, false);
            }else{
                // Call the get filters data and get data service
                helper.initComponentData(component, "lastUpdate", helper, false);
            }
        } 
    },
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to load the initial data for the component
    History
    <Date>			<Author>			    <Description>
	17/03/2020		Guillermo Giral         Initial version
	*/
    initComponentData : function(component, iWhen, helper){
        let params = {
            "userId" : $A.get("$SObjectType.CurrentUser.Id")
        }
        component.set("v.loading", true);
                
        // Get user preferred date format
        component.find("Service").callApex2(component, helper, "c.getUserPreferredFormat", params, this.setUserDateNumberFormat);
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
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        if(response != null){

            // Get filters data from the webservice
            var iWhen = component.get("v.endOfDay") ? "endOfDay" : "lastUpdate";
            let params = {
                "iWhen" : iWhen,
                "iCurrentUserId" : $A.get("$SObjectType.CurrentUser.Id")
            }
        
            component.set("v.userPreferredDateFormat", response.dateFormat);
            component.set("v.userPreferredNumberFormat", response.numberFormat);

            if(component.get("v.endOfDay")==false){

                var storageBalance = window.localStorage.getItem(userId + '_' + 'balanceGP');
                var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceTimestampGP');

                if(storageBalance != 'null' && storageBalance != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 ){
                    //helper.handleInitialData(component, event, JSON.parse(storageBalance));
                    helper.decryptInitialData(component, event, helper,  storageBalance);
                }else{
                    component.find("Service").callApex2(component, helper,"c.getFiltersData", params, helper.setFiltersData);
                }
            } else {    
                var storageBalanceEOD = window.localStorage.getItem(userId + '_' + 'balanceEODGP');
                var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceEODTimestampGP');
                if(storageBalanceEOD != 'null' && storageBalanceEOD != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 ){
                    //helper.handleInitialData(component, event, JSON.parse(storageBalanceEOD));
                    helper.decryptInitialData(component, event, helper,  storageBalanceEOD);
                } else {
                    component.find("Service").callApex2(component, helper,"c.getFiltersData", params, helper.setFiltersData);
                }
            }		      
        }
    },
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to set the initial data of the component, both filters and table data
    History
    <Date>			<Author>			    <Description>
    17/03/2020		Guillermo Giral         Initial version
    */
    setTableData : function(component, helper, response){
        var isInitialDataLoad = component.get("v.isInitialDataLoad");
        component.set("v.loading", true);
        if(response != '' && response != null   && response != undefined){


            if(response.balances != undefined){
                if(response.balances.transactions.totalRegistros !=undefined ){
                    component.set("v.maximumRecords",response.balances.transactions.totalRegistros);
                }
                if(response.balances.transactions.obtTransacBusqueda.length == 0){
                    component.set("v.loading", false);
                    component.set("v.wholeTransactionResults", null);
                } else {
                    var transactions = response.balances.transactions;
/*
                    //AM - 11/11/2020 - US7687: Campos MT940
                    var objTransactionList;
                    if(transactions.obtTransacBusqueda != undefined){
                        objTransactionList = transactions.obtTransacBusqueda;
                    }else{
                        objTransactionList = transactions.listaObtTransacciones[0];
                    }
                    
                    for(var tran in objTransactionList){
                        //COUNTRY -> BR,KY,LU
                        if(objTransactionList[tran].obtTransacBusqueda.codigoBIC != undefined && objTransactionList[tran].obtTransacBusqueda.codigoBIC != null &&
                            (objTransactionList[tran].obtTransacBusqueda.codigoBIC.paisbic == "BR" || objTransactionList[tran].obtTransacBusqueda.codigoBIC.paisbic == "KY" || objTransactionList[tran].obtTransacBusqueda.codigoBIC.paisbic == "LU")){

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
                    

                    if(transactions.obtTransacBusqueda != undefined){
                        transactions.obtTransacBusqueda = objTransactionList;
                    }else{
                        transactions.listaObtTransacciones[0] = objTransactionList;
                    }

*/
                    component.set("v.transactionResults", transactions);
                    component.set("v.wholeTransactionResults", JSON.parse(JSON.stringify(transactions)));
                    //helper.buildCategoryList(component, transactions);
                }
            } else {
                component.set("v.loading", false);
                component.set("v.wholeTransactionResults", null);
            }
        } else {
            component.set("v.loading", false);
            component.set("v.wholeTransactionResults", null);
        }

        if(isInitialDataLoad  && component.get("v.selectedFilters").length == 0){
            component.find("Service").callApex2(component, helper,"c.getTransactionCategories", {}, helper.getCategoryList);
        } else {
            component.set("v.loading", false);
        }
    },
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Creates the filter list to be passed to CMP_CN_Filters component
    History
    <Date>          <Author>           	   <Description>
    10/03/2019      Guillermo Giral        Initial version
    */
    setFiltersData : function (component, helper, response, decrypt){
        // Set values for the Time Period dropdown
        var timePeriods = [];
        timePeriods.push($A.get("$Label.c.selectOne"));
        timePeriods.push($A.get("$Label.c.lastDay"));
        timePeriods.push($A.get("$Label.c.last7Days"));
        timePeriods.push($A.get("$Label.c.lastMonth"));
        component.set("v.timePeriods", timePeriods);
        component.set("v.selectedTimeframe", timePeriods[0]);

        // Create the filters
        if(response != null){
            if(decrypt!=true){
                helper.encryptInitialData(component, helper, response);
            }
         
            var countryList = new Set();
            var displayedCountryList = new Set();
            var accounts = response.accountList;
            var accCurrencies = new Set();
            for(var i = 0; i< accounts.length ; i++){
                displayedCountryList.add(accounts[i].country +' - '+ accounts[i].countryName);
                countryList.add(accounts[i].country);	
                //AB - 26/11/2020 - INC884
                if(accounts[i].currencyCodeAvailableBalance != undefined){
                	accCurrencies.add(accounts[i].currencyCodeAvailableBalance);
                }
            }
            
            // COUNTRY LIST CREATION
            var countryAux = Array.from(countryList);
            var displayCountryAux = Array.from(displayedCountryList);
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
            // listObject[0].name = 'Country'; 
            listObject[0].name = $A.get("$Label.c.Country"); 
            listObject[0].type = 'checkbox';
            listObject[0].displayFilter = true;
            listObject[0].numberChecked = 0;
            listObject[0].dependsOn = [$A.get("$Label.c.Bank")];

            // BANKS MAP CREATION
            listObject.push({});
            listObject[1].data = [];
            for(var i in response.bankList) {
                var currentBank = response.bankList[i];
                var b = {
                    value : currentBank,
                    displayValue : currentBank,
                    checked : false
                };
                listObject[1].data.push(b);
            
            }
            // listObject[1].name = 'Bank';
            listObject[1].name = $A.get("$Label.c.Bank"); 
            listObject[1].type = 'checkbox';
            listObject[1].displayFilter = true;
            listObject[1].numberChecked = 0;
            listObject[1].dependsOn = [$A.get("$Label.c.Account")];

            // ACCOUNT MAP CREATION
            listObject.push({});
            listObject[2].data = [];
            for(var key in response.accountList){
                //var accountDisplayValue = response.accountList[key].aliasEntidad != undefined ? response.accountList[key].displayNumber + ' - ' + response.accountList[key].aliasEntidad : response.accountList[key].displayNumber;
                var accountDisplayValue = response.accountList[key].displayNumber;
                var currentAccount = {
                    value : response.accountList[key].codigoCuenta,
                    displayValue : accountDisplayValue,
                    checked: false
                };
                listObject[2].data.push(currentAccount);
            }
            // listObject[2].name = 'Account';
            listObject[2].name = $A.get("$Label.c.Account"); 
            listObject[2].type = 'checkbox';
            listObject[2].displayFilter = true;
            listObject[2].numberChecked = 0;
            listObject[2].dependsOn = [$A.get("$Label.c.Bank"),$A.get("$Label.c.Country")];

            // CALENDAR CREATION
            listObject.push({});
            if(component.get("v.dates") != undefined){
                //listObject[3].data = component.get("v.dates");
                listObject[3].data = [component.get("v.fromDate"),component.get("v.toDate")];
            }
            // listObject[3].name = 'Book date';
            listObject[3].name = $A.get("$Label.c.bookDate");
            listObject[3].type = 'dates';
            listObject[3].displayFilter = false;

            // AMOUNT SELECTION
            listObject.push({});
            // listObject[4].name = 'Amount';
            listObject[4].name = $A.get("$Label.c.amount");
            listObject[4].type = 'text';
            listObject[4].displayFilter = false;

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
            // listObject[5].name = 'Currency';
            listObject[5].name = $A.get("$Label.c.currency"); 
            listObject[5].displayFilter = false;
            listObject[5].type = 'checkbox';
            listObject[5].numberChecked = 0;

            // CURRENCY LIST CREATION
            if(component.get("v.categoriesList").length > 0){
                var listCategories = component.get("v.categoriesList");
                listObject.push({});
                listObject[6].data = []
                for(var i in listCategories) {
                    var a = {
                        value : listCategories[i],
                        displayValue : listCategories[i],
                        checked : false
                    };
                    listObject[6].data.push(a);
                
                }
                // listObject[6].name = 'Category'; 
                listObject[6].name = $A.get("$Label.c.Category");
                listObject[6].displayFilter = false;
                listObject[6].type = 'checkbox';
                listObject[6].numberChecked = 0;
            }

            // If the previous screen was Transaction Detail, only the default filters must be set
            var setOnlyDefaultFilters = component.get("v.setOnlyDefaultFilters");
            if(!setOnlyDefaultFilters && component.get("v.selectedFilters").length == 0){
                component.set("v.filters", listObject);
            } else {
                component.set("v.setOnlyDefaultFilters", false);
            }
            component.set("v.defaultFilters", JSON.parse(JSON.stringify(listObject)));
            component.set("v.showAdvancedFilters", true);

            // Once the list of filters has been constructed, we need to call the data service
            var isEndOfDay = component.get("v.endOfDay");
            if(!setOnlyDefaultFilters && component.get("v.selectedFilters").length == 0){
                if(!component.get("v.applyWithoutFilters")){
                    component.set("v.applyWithoutFilters", true);
                    helper.sendDataServiceRequest(component, helper, response, isEndOfDay);
                }
            } else {
                helper.sendDataServiceRequestWithFilters(component, helper, component.get("v.selectedFilters"), isEndOfDay);
            }
        } else {
            component.set("v.loading", false);
            component.set("v.wholeTransactionResults", null);
            component.set("v.setOnlyDefaultFilters", false);
            component.set("v.filters", []);
        }
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Builds the request and calls the server 
                    to fetch the transaction data
    History
    <Date>          <Author>           	   <Description>
    25/03/2019      Guillermo Giral        Initial version
    */
    sendDataServiceRequest : function (component, helper, response, isEndOfDay){
        var params = {};
        var countryList = response.countryList;
        var currencyList = response.currencyList;

        // Creation of account code list and Codigo Bic list
        var accountCodes = [];
        var codigosBic = [];
        var codigoBicMap = {};
        for(var acc in response.accountList){
            accountCodes.push(response.accountList[acc].codigoCuenta);
            var codigoBic = {};
            codigoBic.ENTIDAD_BIC = response.accountList[acc].bic;
            codigoBic.PAIS_BIC = response.accountList[acc].paisbic;
            codigoBic.LOCATOR_BIC = response.accountList[acc].locatorbic;
            codigoBic.BRANCH = response.accountList[acc].branch;
            if(codigoBic.ENTIDAD_BIC != null ||  codigoBic.PAIS_BIC != null || codigoBic.LOCATOR_BIC != null || codigoBic.BRANCH != null){
                codigosBic.push({codigoBic});
            }

            codigoBicMap[response.accountList[acc].bankName] = codigoBic;
        }

        response.bankToCodigoBicMap = codigoBicMap;

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

        var accCodesList = [];
        for(var key in accountCodes){
            var accCode = {};
            accCode.codigoCuenta = accountCodes[key];
            accCodesList.push(accCode);
        }
        params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accCodesList;

        // Create the filtro object and its inner params
        if(isEndOfDay){
            var countryCodesList = [];
            for(var key in countryList){
                var countryCode = {};
                countryCode.codPais = countryList[key];
                countryCodesList.push(countryCode);
            }
            params.obtTransacBusqueda.entrada.filtro.listaPais = countryCodesList;

            var currencyCodesList = [];
            for(var key in currencyList){
                var currencyCode = {};
                currencyCode.codDivisa = currencyList[key];
                currencyCodesList.push(currencyCode);
            }
            params.obtTransacBusqueda.entrada.filtro.listaDivisa = currencyCodesList;
            params.obtTransacBusqueda.entrada.filtro.listaCodigoBic = codigosBic;
            params.obtTransacBusqueda.entrada.filtro.typeBalance = "EOD";
        } else {
            params.obtTransacBusqueda.entrada.filtro.typeBalance = "LU";
        }

        params.obtTransacBusqueda.entrada.filtro.importeDesde = "";
        params.obtTransacBusqueda.entrada.filtro.importeHasta = "";
        params.obtTransacBusqueda.entrada.filtro.listaCodigosTransacciones = [];
        params.obtTransacBusqueda.entrada.filtro.CAMPO_ORDENACION = "bookDate";
        params.obtTransacBusqueda.entrada.filtro.ORDENACION_ASCENDENTE = "N";
        params.obtTransacBusqueda.entrada.filtro.TAM_PAGINA = "1000";
        params.obtTransacBusqueda.entrada.numPagina = "1";

        
        // Loop through all the accounts to create a mapping to banks, currencies and countries
        var accountCodeToInfoMap = {};
        var bankLabel = $A.get("$Label.c.Bank");
        var currencyLabel = $A.get("$Label.c.currency");
        var countryLabel = $A.get("$Label.c.Country");
        for(var acc in response.accountList){
            accountCodeToInfoMap[response.accountList[acc].codigoCuenta] = {
                bankLabel : response.accountList[acc].bankName,
                currencyLabel : response.accountList[acc].currencyCodeAvailableBalance,
                countryLabel : response.accountList[acc].country
            }
        }
        component.set("v.accountCodeToInfo", accountCodeToInfoMap);
        component.set("v.accountCodesToSearch", []);
        component.set("v.numberActiveFilters", 0);

        /*
        if(component.get("v.endOfDay"))
        {
            response.responseForGPEOD.descripcionConversion = null;
        }
        */
        response.exchangeRatesString = null;
		  

        component.set("v.accountsData", response);
		var params_download = JSON.parse(JSON.stringify(params));
        params_download.obtTransacBusqueda.entrada.filtro.limit = 10000;


        component.set("v.downloadParams", params_download);
        /// TEST RENDIMIENTO     
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        var action = component.get("c.getTransactions");
        action.setParams({"requestBody":JSON.stringify(params)});
        
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //->HERE WE CALL THE CALLBACK RATHER PROCESS THE RESPONSE
                helper.setTableData(component, helper, response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.log("INCOMPLETE");
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
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
        var defaultFilters = component.get("v.defaultFilters");
        var categoryList = response;

        // Create the filter object and push it to the list of filters
        var filter = {};
        filter.data = [];
        for(var i in categoryList) {
            var a = {
                value : categoryList[i],
                displayValue : categoryList[i],
                checked : false
            };
            filter.data.push(a);
        }
        // filter.name = 'Category'; 
        var categoryLabel = $A.get("$Label.c.Category");
        filter.name = categoryLabel;
        filter.displayFilter = false;
        filter.type = 'checkbox';
        filter.numberChecked = 0;
        filters = filters.filter(f => f.name != categoryLabel);
        filters.push(filter);
        // Update the initial filter
        defaultFilters = defaultFilters.filter(f => f.name != categoryLabel);
        defaultFilters.push(filter);
        
        component.set("v.categoriesList", categoryList);
        component.set("v.isInitialDataLoad", false);
        component.set("v.filters",  JSON.parse(JSON.stringify(filters)));
        component.set("v.defaultFilters", JSON.parse(JSON.stringify(defaultFilters)));
        component.set("v.loading", false);
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
               var data = component.get("v.transactionResults.obtTransacBusqueda");
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
    */
    sendDataServiceRequestWithFilters : function (component, helper, filters, isEndOfDay){
        // Create the request params with default values
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
        params.obtTransacBusqueda.entrada.filtro.listaPais = [];
        params.obtTransacBusqueda.entrada.filtro.listaDivisa = [];
        params.obtTransacBusqueda.entrada.filtro.listaCodigoBic = [];
        params.obtTransacBusqueda.entrada.filtro.CAMPO_ORDENACION = "bookDate";
        params.obtTransacBusqueda.entrada.filtro.ORDENACION_ASCENDENTE = "N";
        params.obtTransacBusqueda.entrada.filtro.TAM_PAGINA = "10000";
        params.obtTransacBusqueda.entrada.numPagina = "1";

        var accountsData = JSON.parse(JSON.stringify(component.get("v.accountsData")))[0];

        // Creation of account codes, BIC codes , countries and currencies lists
        var accountCodes = [];
        var countryList = [];
        var currencyList = [];
        var codigosBic = [];
        var categories = [];
        for(var f in filters){
            var currentFilter = filters[f];
            // Get the values from the filters
            switch (currentFilter.name){ 
                // case "Account" :
                case $A.get("$Label.c.Account"): 
                    for(var acc in currentFilter.value){
                        var codigoCuenta = {
                            "codigoCuenta" : currentFilter.value[acc].value
                        };
                        accountCodes.push(codigoCuenta);
                    }
                    params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accountCodes;
                break;
                // case "Country" :
                case $A.get("$Label.c.Country"):
                    if(isEndOfDay){
                        for(var ct in currentFilter.value){
                            var codPais = {
                                "codPais" : currentFilter.value[ct].value
                            };
                            countryList.push(codPais);
                        }
                        params.obtTransacBusqueda.entrada.filtro.listaPais = countryList;
                    }
                break;
                // case "Currency" :
                case $A.get("$Label.c.currency"):
                    if(isEndOfDay){
                        for(var cu in currentFilter.value){
                            var codDivisa = {
                                "codDivisa" : currentFilter.value[cu].value
                            };
                            currencyList.push(codDivisa);
                        }
                        params.obtTransacBusqueda.entrada.filtro.listaDivisa = currencyList;
                    }
                break;
                // case "Bank" :
                case $A.get("$Label.c.Bank"):
                    if(isEndOfDay){
                        for(var bank in currentFilter.value){
                            var codigoBic = accountsData.bankToCodigoBicMap[currentFilter.value[bank].value];
                            var codigoBicObject = {
                                "codigoBic" : codigoBic
                            };
                            if(codigoBic.ENTIDAD_BIC != null ||  codigoBic.PAIS_BIC != null || codigoBic.LOCATOR_BIC != null || codigoBic.BRANCH != null){
                                codigosBic.push(codigoBicObject);
                            }
                        }
                        params.obtTransacBusqueda.entrada.filtro.listaCodigoBic = codigosBic;
                    }
                break;
                // case "Category" :
                case $A.get("$Label.c.Category"):
                    for(var cat in currentFilter.value){
                        var codigoTransaccion = {
                            "codigoTransaccion" : currentFilter.value[cat].value
                        }
                        categories.push(codigoTransaccion);
                    }
                    params.obtTransacBusqueda.entrada.filtro.listaCodigosTransacciones = categories;
                break;
                // case "Book date" :
                case $A.get("$Label.c.bookDate"):
                    
                    var timePeriod = component.get("v.selectedTimeframe");    
                    if(timePeriod != $A.get("$Label.c.selectOne")){
                        var toDate = new Date(Date.now());
                        params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = toDate.toISOString();
                        var fromDate = this.getBookDateFromTimePeriod(timePeriod, toDate);
                        params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = fromDate;					
                    }else{
                        if(currentFilter.value.from != undefined && currentFilter.value.from != null){
							
                            params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = currentFilter.value.from;
                        }
                        if(currentFilter.value.to != undefined && currentFilter.value.to != null){
								params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = currentFilter.value.to;
                        }                         
                    }
                    break;
                case $A.get("$Label.c.amount"):
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

        // Once the filters have been looped, the checkbox filters must be checked according to the following criteria:
        //              - EOD: The account codes must be filtered and sent to the webservice. Also (only for downloads) the rest of the filter options must be sent as well.
        //              - LU: The account codes must be filtered and sent to the webservice.

        // Complete the params object with the values needed for download purposes (accounts, banks, currencies and countries)
        let params_download = JSON.parse(JSON.stringify(params));
        if(params.obtTransacBusqueda.entrada.cacheKey.listaCuentas == undefined){

            var accountCodes = component.get("v.accountCodesToSearch");
            if(accountCodes.length == 0){
                var accountCodeToInfoMap = component.get("v.accountCodeToInfo");
                accountCodes = Object.keys(accountCodeToInfoMap);
            }
            var accCodesToSearch = [];
            for(var acc in accountCodes){
                var codigoCuenta = {
                    "codigoCuenta" : accountCodes[acc]
                };
                accCodesToSearch.push(codigoCuenta);
            }
            params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accCodesToSearch;

            params_download.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accCodesToSearch;

            // Add all the accounts for EOD downloads
            if(isEndOfDay){
                var accCodesList = [];
                for(var key in accountsData.accountList){
                    var accCode = {};
                    accCode.codigoCuenta = accountsData.accountList[key].codigoCuenta;
                    accCodesList.push(accCode);
                }
                params_download.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accCodesList;
            }
        }

        // Complete the params object with the values needed for download purposes (banks, currencies and countries)
        if(isEndOfDay){
            // Delete all the unexistent params for EOD
            delete params.obtTransacBusqueda.entrada.filtro.description;
            delete params.obtTransacBusqueda.entrada.filtro.clientReference;
            delete params.obtTransacBusqueda.entrada.filtro.transactionType;

            if(params_download.obtTransacBusqueda.entrada.filtro.listaPais.length == 0){
                var countryCodesList = [];
                for(var key in accountsData.countryList){
                    var countryCode = {};
                    countryCode.codPais = accountsData.countryList[key];
                    countryCodesList.push(countryCode);
                }
                params_download.obtTransacBusqueda.entrada.filtro.listaPais = countryCodesList;
            }
            if(params_download.obtTransacBusqueda.entrada.filtro.listaDivisa.length == 0){
                var currencyCodesList = [];
                for(var key in accountsData.currencyList){
                    var currencyCode = {};
                    currencyCode.codDivisa = accountsData.currencyList[key];
                    currencyCodesList.push(currencyCode);
                }
                params_download.obtTransacBusqueda.entrada.filtro.listaDivisa = currencyCodesList;
            }
            if(params_download.obtTransacBusqueda.entrada.filtro.listaCodigoBic.length == 0){
                var codigosBic = [];
                var banksList = Object.keys(accountsData.bankToCodigoBicMap);
                for(var key in banksList){
                    var bank = banksList[key];
                    var codigoBic = accountsData.bankToCodigoBicMap[bank];
                    if(codigoBic.ENTIDAD_BIC != null ||  codigoBic.PAIS_BIC != null || codigoBic.LOCATOR_BIC != null || codigoBic.BRANCH != null){
                        codigosBic.push({codigoBic});
                    }
                    params_download.obtTransacBusqueda.entrada.filtro.listaCodigoBic = codigosBic;
                }
            }
        }
		   
        // If there is any selected time period dropdown, overwrite the date filter
        if(component.get("v.selectedTimeframe") != $A.get("$Label.c.selectOne")){
            let toDate = new Date(Date.now());
            params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = toDate.toISOString();
            params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta = toDate.toISOString();
            let fromDate = this.getBookDateFromTimePeriod(component.get("v.selectedTimeframe"), toDate);
         	params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = fromDate;	  
            params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde = fromDate;
        }
        //Replacing dates into formatted ones prepared for the download service
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

        // Clear out the filters for country, currency and bank
        params.obtTransacBusqueda.entrada.filtro.listaPais = [];
        params.obtTransacBusqueda.entrada.filtro.listaDivisa = [];
        params.obtTransacBusqueda.entrada.filtro.listaCodigoBic = [];

        // Hide all the filters options
        var allFilters = component.get("v.filters");
        for(var key in allFilters){
            if(allFilters[key].type == "checkbox"){
                allFilters[key].displayOptions = false;
            }
        }
        component.set("v.filters", JSON.parse(JSON.stringify(allFilters)));
        component.set("v.loading", true);

        // Make the callout to the transactions POST web service
        component.find("Service").callApex2(component, helper,"c.getTransactions", {"requestBody":JSON.stringify(params)}, this.setTableData);
        // Recalculate the number of active filters
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
                            
                            component.set("v.msgToast", $a.get("$Label.c.downloadFailed"));
                            component.set("v.typeToast", "error");
                            component.set("v.showToast", true);
                            
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                reject(errors);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }else if (state === "SUCCESS") {
                        if(response.getReturnValue()=='' || response.getReturnValue()=='undefined' || response.getReturnValue()==null){
                            component.set("v.msgToast", $A.get("$Label.c.downloadFailed"));
                            component.set("v.typeToast", "error");
                            component.set("v.showToast", true);
                        }else{
                        	resolve(response.getReturnValue());
                        }
                    }
                });
                $A.enqueueAction(action);
            });

        } catch (e) {
            console.log(e);
        }
    },

    
       /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to encrypt data
    History
    <Date>			<Author>		<Description>
    21/05/2020		R. Alexander Cervino     Initial version*/

    encryptInitialData : function(component, helper,data){
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        try{
            var result="null";
            var action = component.get("c.encryptData");
            action.setParams({ str : JSON.stringify(data )});
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
                        result = response.getReturnValue();
                        if(result!='null' && result!=undefined && result!=null){

                            if(component.get("v.endOfDay")==false){
                                var storageBalance = window.localStorage.getItem(userId + '_' + 'balanceGP');
                                var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceTimestampGP');

                                if(storageBalance == 'null' || storageBalance == undefined ||  ( balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 < new Date() - new Date(Date.parse(balanceTimestampGP))) )   ){
                                    window.localStorage.setItem(userId + '_' + 'balanceGP', result);
                                    window.localStorage.setItem(userId + '_' + 'balanceTimestampGP', new Date());
                                }

                            }else{
                                var storageBalanceEOD = window.localStorage.getItem(userId + '_' + 'balanceEODGP');
                                var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceEODTimestampGP');
                                if(storageBalanceEOD == 'null' || storageBalanceEOD == undefined ||  ( balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 < new Date() - new Date(Date.parse(balanceTimestampGP))) )   ){
                                    window.localStorage.setItem(userId + '_' + 'balanceEODGP', result);
                                    window.localStorage.setItem(userId + '_' + 'balanceEODTimestampGP', new Date());
                                }
                            }		   
                
                        }
                    }
                });
                $A.enqueueAction(action);
        } catch (e) { 
            console.log(e);
        }   
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History
    <Date>			<Author>		<Description>
    21/05/2020		R. Alexander Cervino     Initial version*/

    decryptInitialData : function(component ,event, helper,data){
        try {
            var result="null";
            var action = component.get("c.decryptData");
            var userId = $A.get( "$SObjectType.CurrentUser.Id" );

            action.setParams({ str : data }); 

                action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                        component.find("Service").callApex2(component, helper,"c.getFiltersData", params, helper.setFiltersData);
                                    }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                    if(result!=null && result !=undefined && result!='null'){
                        result = JSON.parse(result); 
                        if(result.responseAcc != undefined && result.responseAcc != null){
                            result = result.responseAcc;                   
                        }
                        helper.setFiltersData(component, helper, result,true);

                        if(component.get("v.endOfDay")==false){
                            var storageBalance = window.localStorage.getItem(userId + '_' + 'balanceGP');
                            var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceTimestampGP');

                            if(storageBalance == 'null' || storageBalance == undefined ||  ( balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 < new Date() - new Date(Date.parse(balanceTimestampGP))) )   ){
                                helper.encryptInitialData(component, helper, result);
                            }

                        }else{
                            var storageBalanceEOD = window.localStorage.getItem(userId + '_' + 'balanceEODGP');
                            var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceEODTimestampGP');
                            if(storageBalanceEOD == 'null' || storageBalanceEOD == undefined ||  ( balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 < new Date() - new Date(Date.parse(balanceTimestampGP))) )   ){
                                helper.encryptInitialData(component, helper, result);
                            }
                        }		   

                    }else{
                        component.find("Service").callApex2(component, helper,"c.getFiltersData", params, helper.setFiltersData);
                    }

                }
                });
                $A.enqueueAction(action);
        } catch(e) {
            console.error(e);
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
        if(!component.get("v.endOfDay")){
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
    }
})