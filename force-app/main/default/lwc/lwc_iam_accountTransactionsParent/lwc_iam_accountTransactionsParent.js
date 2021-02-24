import { LightningElement, track , api} from 'lwc';

//labels
import selectOne from '@salesforce/label/c.selectOne';
import TimePeriod from '@salesforce/label/c.TimePeriod';
import limitTransactionSearch from '@salesforce/label/c.limitTransactionSearch';
import limitTransactionSearchNumberOneTrade from '@salesforce/label/c.limitTransactionSearchNumberOneTrade';
import Accounts from '@salesforce/label/c.Accounts';
import Transactions_AccountTransactions from '@salesforce/label/c.Transactions_AccountTransactions';
import noTransactionsFound from '@salesforce/label/c.noTransactionsFound';
import Loading from '@salesforce/label/c.Loading';
import Category from '@salesforce/label/c.Category';
import bookDate from '@salesforce/label/c.bookDate';
import lastDay from '@salesforce/label/c.lastDay';
import last7Days from '@salesforce/label/c.last7Days';
import lastMonth from '@salesforce/label/c.lastMonth';
import amount from '@salesforce/label/c.amount';
import domain from '@salesforce/label/c.domain';
import Ebury from '@salesforce/label/c.Ebury';
import EburyCaps from '@salesforce/label/c.EburyCaps';

//apex
import getPaginatedMovements from '@salesforce/apex/CNT_TransactionSearchController.getPaginatedMovements';
import decryptData from '@salesforce/apex/CNT_TransactionSearchController.decryptData';
import downloadTransactionsOneTrade from '@salesforce/apex/CNT_TransactionSearchController.downloadTransactionsOneTrade';
import removeFile from '@salesforce/apex/CNT_TransactionSearchController.removeFile';

export default class Lwc_iam_accountTransactionsParent extends LightningElement {

    label =  {
        selectOne,
        TimePeriod,
        limitTransactionSearch,
        limitTransactionSearchNumberOneTrade,
        Accounts,
        Transactions_AccountTransactions,
        noTransactionsFound,
        Loading,
        Category,
        bookDate,
        lastDay,
        last7Days,
        lastMonth,
        amount,
        domain,
        Ebury,
        EburyCaps
    }

    // ATTRIBUTES
    @track sourcePage = '';                //" type="String" default="" description="This attribute is to know from which community page a users is accessing this component"/>
    @track loading = true;                        //" type="Boolean" default="true" description="Indicates when the URL params have been parsed, to load the rest of components"/>
    @track accountDetails = {};            //" type="Map" default="{}" description="This attribute stores the data related with the account, when the previous page is Global Balance"/>
    accountData = {};               //" type="Map" default="{}" description="Account data returned by the accounts transaction service"/>
    @track showModal = false;              //"    type="Boolean" default="false"      description="Flag to check if the modal is showing"/>
    @track filters = [];                   //"    type="List"     description="List passed to the CMP_CN_Filters components to populate the filters"/>
    @track accountFilters = [];            //"    type="List"     description="List passed to the CMP_CN_Filters components to populate the filters, they come from the Accounts page"/>
    wholeTransactionResults = {};   //"    type="Map"    description="List of all rows returned by the movements webservice" />
    @track transactionResults = {};        //" type="Map" description="List of rows to show in the table"/>
    @track dates = [];                     //" type="List" description="List containing the selected dates" />
    @track formFilters = {};               //" type="Map" default="{}" description="Map to store some advanced filters from the modal"/>
    @track timePeriods = [];               //" type="List" description="List of options to show in the 'Time Period' dropdown"/>
    @track selectedTimeframe = this.label.selectOne;  //" type="String" default="{!$Label.c.selectOne}" description="Default selected timeframe for the dropdown"/>
    dropdownHeader = this.label.TimePeriod;    //" type="String" default="{!$Label.c.TimePeriod}" description="Title for the dropdown"/>    
    isAccTransactions;              //" type="Boolean" default="true" />
    @track changedTimeFrame = false;       //" type="Boolean" default="false" />
    @track selectedFilters = [];           //"    type="List"     description="List passed to the CMP_CN_Filters components to populate the filters"/>
    userTimezoneOffset;             //" type="Integer" description="User timezone offset in miliseconds"/>
    @track maximumRecords = 0;             //" type="Integer" default="0"/>
    userPreferredDateFormat;        //" type="String" description="User preferred time format"/>
    userPreferredNumberFormat;      //" type="String" description="User preferred number format"/>
    @track numberActiveFilters  = 0;       //" type="Integer" default="0" description="Number of advanced filters currently active"/>
    
    //Online pagination attributes
    @track highestPage = 1;                //" type="Integer" default="1" description="Contains the highest page of the pagination" />
    @track maxPage = 1;                    //" type="Integer" default="1" description="Contains the maximum number of pages, based on the total transactions number" />
    @track listOfPages = [];               //" type="List" description="List of pages containing all the retrieved transactiones"/>
    @track currentPage = 1;                //" type="Integer" default="1" description="Current transaction page"/>

    // Limit search of transactions 
    @track showLimitTransactionsToast = false;     //" type="Boolean" default="false" description="Show error message when more than 10000 are to be downloaded"/>

    // Sorting attributes 
    @track sortBookDate = 'desc';          //" type="String" default='desc' description="Attributte to sort the Book date column"/>
    @track sortCategory = 'desc';          //" type="String" default='desc' description="Attributte to sort the Category column"/>
    @track sortamount = 'desc';            //" type="String" default='desc' description="Attributte to sort the Category column"/>
    @track downloadParams = {};            //" type="Map" description="Map of request parameters to send to the download service"/>

    @track fromDate;                       //" type="String"/>
    @track toDate;                         //" type="String"/>    
    paramsUrl;
    desencriptadoUrl;

    @api iam; //type= "Boolean" default="true" description="Flag that indicates if the login is from Portal User or Cash Nexus"
    firenavigationevent = true;
    _selectedTimeframe;
    @track isopen = true;
    @track isconvertdatestousertimezone = false;
    @track isaccounttransactions = true;
    @track endofday = false;

    @track fromamount;
    @track toamount;
    /*
    _accountDetails;
    get accountDetails(){
        return this.accountDetails;
    }

    set accountDetails(accountDetails){
        this.accountDetails = accountDetails;
    }*/

    get selectedTimeframe(){
        return this._selectedTimeframe;
    }
    set selectedTimeframe(selectedTimeframe){
        this._selectedTimeframe = selectedTimeframe;
    }

    get mensajeToast(){
        return this.label.limitTransactionSearch + ' ' + this.label.limitTransactionSearchNumberOneTrade;
    }

    get tableContent(){
        //return this.transactionResults.length == 0 || this.transactionResults == null;
        return this.transactionResults == null || this.transactionResults.length == 0;
    }

    get isNotEbury(){
        return this.accountDetails.country != this.label.Ebury;
    }

    connectedCallback(){
        this.doInit();       
    }

    doInit(){
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
        if (sURLVariablesMain[0] == 'params') {
            this.decrypt(sURLVariablesMain[1]);
        }
     }
    
    // metodo para desencriptar
    decrypt(data) {
        var result = '';
        decryptData({str : data})
        .then(value => {
            result = value;
            //this.desencriptadoUrl = result;
            var sURLVariables = result.split('&');
            var sParameterName;     
            var accountDetails = {};

            for ( var i = 0; i < sURLVariables.length; i++ ) {
                sParameterName = sURLVariables[i].split('=');  
                
                if (sParameterName[0] === 'c__source') { 
                    sParameterName[1] === undefined ? 'Not found' : this.sourcePage = sParameterName[1];
                }
                if (sParameterName[0] === 'c__subsidiaryName') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.accountName = sParameterName[1];
                }
                if (sParameterName[0] === 'c__accountNumber') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.accountNumber = sParameterName[1];
                }
                if (sParameterName[0] === 'c__accountStatus') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.status = sParameterName[1];
                }
                if (sParameterName[0] === 'c__accountCode') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.accountCode = sParameterName[1];
                }
                if (sParameterName[0] === 'c__bank') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.bank = sParameterName[1];
                }
                if (sParameterName[0] === 'c__mainAmount') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.bookBalance = sParameterName[1];
                }
                if (sParameterName[0] === 'c__availableAmount') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.availableBalance = sParameterName[1];
                }
                if (sParameterName[0] === 'c__currentCurrency') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.accountCurrency = sParameterName[1];
                }
                if (sParameterName[0] === 'c__alias') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.accountAlias = sParameterName[1];
                }
                if (sParameterName[0] === 'c__idType') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.idType = sParameterName[1];
                }
                if (sParameterName[0] === 'c__country') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.country = sParameterName[1];
                }
                if (sParameterName[0] === 'c__countryName') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.countryName = sParameterName[1];
                }
                if (sParameterName[0] === 'c__aliasBank') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.bankAlias = sParameterName[1];
                }
                if (sParameterName[0] === 'c__bic') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.bic = sParameterName[1];
                }
                if (sParameterName[0] === 'c__bookDate') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.bookDate = sParameterName[1];
                }
                if (sParameterName[0] === 'c__valueDate') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.valueDate = sParameterName[1];
                }
                if (sParameterName[0] === 'c__filters') { 
                    sParameterName[1] === undefined ? 'Not found' : this.filters = JSON.parse(sParameterName[1]);
                }
                if (sParameterName[0] === 'c__formFilters') { 
                    sParameterName[1] === undefined || sParameterName[1] == 'undefined' ? 'Not found' : this.formFilters = JSON.parse(sParameterName[1]);
                }
                if (sParameterName[0] === 'c__selectedFilters') { 
                    sParameterName[1] === undefined ? 'Not found' : this.selectedFilters = JSON.parse(sParameterName[1]);
                }
                if (sParameterName[0] === 'c__dates') { 
                    sParameterName[1] === undefined ? 'Not found' : this.dates = JSON.parse(sParameterName[1]);
                }
                if (sParameterName[0] === 'c__accountsFilters') { 
                    // en el aura se seteaba accountsFilters (con la s entre la t y la F), pero ese atributo no lo encontre
                    sParameterName[1] === undefined ? 'Not found' : this.accountFilters = sParameterName[1];
                }
                if (sParameterName[0] === 'c__codigoBic') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoBic = sParameterName[1];
                }
                if (sParameterName[0] === 'c__codigoEmisora') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoEmisora = sParameterName[1];
                }
                if (sParameterName[0] === 'c__aliasEntidad') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.aliasEntidad = sParameterName[1];
                }
                if (sParameterName[0] === 'c__codigoCuenta') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoCuenta = sParameterName[1];
                }

                if (sParameterName[0] === 'c__codigoCorporate') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoCorporate = sParameterName[1];
                }
                if (sParameterName[0] === 'c__dataProvider') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.dataProvider = sParameterName[1];
                }
                if (sParameterName[0] === 'c__associatedAccountList') { 
                    sParameterName[1] === undefined ? 'Not found' : accountDetails.associatedAccountList = JSON.parse(sParameterName[1]);
                }

            }

            accountDetails.finalCodigoBic = accountDetails.codigoBic;
            this.accountDetails = accountDetails;
            
            //Get the body params
            let bodyParams;
            if(this.selectedFilters.length == 0){
                bodyParams = this.setBodyParams(accountDetails, 1);
            }else{
                bodyParams = thids.setBodyParamsWithFilters(accountDetails, 1, this.selectedFilters);
            }
          
           //Call apex to retrieve the movements from apex
            getPaginatedMovements({
                bodyParams : JSON.stringify(bodyParams)
            }).then(result =>{
                this.setTableData(result);
            }).catch((error) => {
                console.log('getPaginatedMovements IAM_TransactionsParent: '+JSON.stringify(error)); // TestError
                
            });

            //verificar este loading aqui
           //this.loading = false;
            
            
        }).catch((error) => {
            console.log('decrypt IAM_TransactionsParent: '+error); // TestError
        });
    return result;
    }

    setBodyParams(accountInfo, newPage)
    {
        const DEFAULT_SORTING = '+date';
        const MOVEMENTS_PER_PAGINATION = 200;
		let bodyRequest;

		//AM - 28/09/2020 - Ebury Accounts
		if(accountInfo.country == this.label.Ebury){
			bodyRequest = {
				search_data : {
					accountList : [
						{
							country: 'EB',
							currency: accountInfo.accountCurrency,
							account: {
								idType : '',
								accountId: accountInfo.accountNumber
							}
						}
					],
					customerId: accountInfo.codigoCorporate,
					dataProvider: this.label.EburyCaps,
					latestMovementsFlag: false,
					allTransactionsFlag: true,
					_sort: DEFAULT_SORTING,
					_offset: newPage > 1 ? newPage/4 : 0,
					_limit: MOVEMENTS_PER_PAGINATION
				}
		    }	
		}else{

			bodyRequest = {
				search_data : {
					accountList : [
						{
							country: accountInfo.country,
							currency: accountInfo.accountCurrency,
							account: {
								idType : '',
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
			}
		}
		this.downloadParams = bodyRequest;
        return bodyRequest;
    }
    
    setBodyParamsWithFilters(accountInfo, newPage, filters)
    {
		// Get the default request
		let bodyParams = this.setBodyParams(this.accountDetails, newPage);
		
		// Create the request params with default values
		var accountData = this.accountDetails;

		// Creation of all the selected filters
		var categories = [];
        
        for(var f in filters){
			var currentFilter = filters[f];            
            if(currentFilter.name == this.label.Category){
                for(var cat in currentFilter.value){
                    var codigoTransaccion = {
                        'swiftCode' : currentFilter.value[cat].value
                    }
                    categories.push(codigoTransaccion);
                }
                bodyParams.search_data.swiftCodeList = categories;
            }
            if(currentFilter.name == this.label.bookDate){
                var timePeriod = this._selectedTimeframe;
                const regExp = /[:-]/g;
                //if(timePeriod != this.label.selectOne && this.dates.length == 0){
                if(timePeriod != this.label.selectOne && timePeriod != undefined && this.dates.length == 0){

                    var toDate = new Date(Date.now());
                    toDate.setSeconds(0,0);
                    if(this.accountDetails.country != this.label.Ebury){
                        bodyParams.search_data.toProcessedDate = toDate.toISOString().replace('Z','+0000');
                    }
                    else{
                        bodyParams.search_data.toAccountingDate = toDate.toISOString().replace('Z','+0000');
                    }                    
                    var fromDate = this.getBookDateFromTimePeriod(timePeriod, toDate);
                    
                    if(this.accountDetails.country != this.label.Ebury) {
                        bodyParams.search_data.fromProcessedDate = fromDate.replace('Z','+0000');
                    } else {
                        bodyParams.search_data.fromAccountingDate = fromDate.replace('Z','+0000');
                    }
                    
                    if(this.dates.length != 0){
                        this.changedTimeFrame = false;
                    }								
                }else{
                    if(timePeriod != this.label.selectOne){  
                        if(this.dates.length != 0){
                            this.changedTimeFrame = false;
                        }		
                    }
                    if(currentFilter.value.from != undefined && currentFilter.value.from != null){
                        if(this.sourcePage == 'accountTransactions' || this.sourcePage == 'globalBalance'){
                            //bodyParams.search_data.fromProcessedDate = currentFilter.value.from.replace("Z","+0000");  
                            if(this.accountDetails.country != this.label.Ebury) {
                                bodyParams.search_data.fromProcessedDate = currentFilter.value.from.replace('Z','+0000');
                            } else {
                                bodyParams.search_data.fromAccountingDate = currentFilter.value.from.replace('Z','+0000');
                            }
                        }else{
                            //bodyParams.search_data.fromProcessedDate = this.fromDate.replace("Z","+0000");
                            if(this.accountDetails.country != this.label.Ebury) {
                                bodyParams.search_data.fromProcessedDate = this.fromDate.replace('Z','+0000');
                            } else {
                                bodyParams.search_data.fromAccountingDate = this.fromDate.replace('Z','+0000');
                            }
                        }
                    }
                    if(currentFilter.value.to != undefined && currentFilter.value.to != null){
                        if(this.sourcePage == 'accountTransactions' || this.sourcePage == 'globalBalance'){
                            //bodyParams.search_data.toProcessedDate = currentFilter.value.to.replace("Z","+0000");
                            if(this.accountDetails.country != this.label.Ebury) {
                                bodyParams.search_data.toProcessedDate = currentFilter.value.to.replace('Z','+0000');      
                            } else {
                                bodyParams.search_data.toAccountingDate = currentFilter.value.to.replace('Z','+0000');
                            }
                        }else{
                            //bodyParams.search_data.toProcessedDate = component.get("v.toDate").replace("Z","+0000");
                            if(this.accountDetails.country != this.label.Ebury) {
                                bodyParams.search_data.toProcessedDate = this.toDate.replace('Z','+0000');
                            } else {
                                bodyParams.search_data.toAccountingDate = this.toDate.replace('Z','+0000');
                            }
                        }
                    }                        
                }
            }
            if(currentFilter.name == this.label.amount){
                if(currentFilter.value.from != undefined && currentFilter.value.from != null && currentFilter.value.from != ''){
                    bodyParams.search_data.fromAmount = parseFloat(currentFilter.value.from);
                    if(currentFilter.value.to == undefined || currentFilter.value.to == '' || currentFilter.value.to == null ){
                        bodyParams.search_data.toAmount = 99999999999999999.0;
                    }
                }
                if(currentFilter.value.to != undefined && currentFilter.value.to != null && currentFilter.value.to != ''){
                    if(currentFilter.value.from == undefined || currentFilter.value.from == '' || currentFilter.value.from == null){
                        bodyParams.search_data.fromAmount = 0.0;
                    }
                    bodyParams.search_data.toAmount = parseFloat(currentFilter.value.to);
                }                
            }
            if(currentFilter.name == 'debit'){
                if(currentFilter.value){
                    bodyParams.search_data.transactionType = 'debit';
                }
            }    
            if(currentFilter.name == 'credit'){
                if(currentFilter.value){
                    bodyParams.search_data.transactionType = 'credit';
                }
            }
            if(currentFilter.name == 'clientRef'){
                if(currentFilter.value){
                    bodyParams.search_data.clientReference = currentFilter.value;
                }
            }
            if(currentFilter.name == 'description'){
                if(currentFilter.value){
                    bodyParams.search_data.description = currentFilter.value; 
                }
            }
		}
		this.downloadParams = bodyParams;
        return bodyParams;
    }

    getBookDateFromTimePeriod(timePeriod, referenceDate){
        var bookDate = '';
        var previousDate = referenceDate;
        if(timePeriod != this.label.selectOne){
            
			if(timePeriod == this.label.lastDay){
                previousDate.setDate(previousDate.getDate() - 1);
			    bookDate = previousDate.toISOString();
            }
            if(timePeriod == this.label.last7Days){
                previousDate.setDate(previousDate.getDate() - 7);
				bookDate = previousDate.toISOString();
            }
            if(timePeriod == this.label.lastMonth){
                previousDate.setDate(previousDate.getDate() - 30);
				bookDate = previousDate.toISOString();
            }

			
        }
        return bookDate;
    }

    setTableData(response){
		if(response != '' && response != null   && response != undefined && Object.keys(response).length > 0){
			if(this.highestPage == 1){
				let transactions = response.balances.transactions;
				if(response.balances.transactions.totalRegistros !=undefined && response.balances.transactions.totalRegistros > 0){
					this.maximumRecords = response.balances.transactions.totalRegistros;
                    this.maxPage = Math.ceil(response.balances.transactions.totalRegistros / 50);
                    this.transactionResults = transactions;
                } else {
                    this.transactionResults = null;
                }
			} else {
				let transactions = this.transactionResults;
				transactions.listaObtTransacciones.push(...response.balances.transactions.listaObtTransacciones);
				this.transactionResults = transactions;
            }
            
		} else {
            this.transactionResults = null;
		}

        // Get the latest date and hour of update from the transactions
        this.getLatestTimestampFromTransactions();
        
        // Get the account last update datetime
        this.getLastUpdateDateTime();
        
		// When the previous page is Accounts, the filters must be received from the balances web service
		var timePeriods = [];

		if(this.sourcePage != 'accountTransactions'){
			this.setFiltersData();

				if(this._selectedTimeframe != this.label.selectOne && this.dates.length != 0){
					timePeriods.push(this.label.selectOne);
					this._selectedTimeframe = timePeriods[0];
				}
				timePeriods.push(this.label.lastDay);
				timePeriods.push(this.label.last7Days);
				timePeriods.push(this.label.lastMonth);
				
				this.timePeriods = timePeriods;
		}
		this.loading = false;
    }
    
    getLatestTimestampFromTransactions(){
		var transactions = this.transactionResults;
		var transactionsData = [];
		if(transactions != undefined){
			if(transactions.listaObtTransacciones != undefined && transactions.listaObtTransacciones[0].length > 0 && transactions.listaObtTransacciones != null){
				transactionsData = transactions.listaObtTransacciones[0];
			} else if(transactions.obtTransacBusqueda != undefined && transactions.obtTransacBusqueda.length > 0 && transactions.obtTransacBusqueda != null){
				transactionsData = transactions.obtTransacBusqueda;
			} else if(transactions.listaObtTransacciones != undefined && transactions.listaObtTransacciones.length > 0 && transactions.listaObtTransacciones[0].obtTransacBusqueda != null){
				transactionsData = transactions.listaObtTransacciones[0].obtTransacBusqueda;
			} else {
				this.accountDetails.dateValue = 'N/A';
				this.accountDetails.hourValue = 'N/A';
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
					var latestHour = localizationService.formatTime(latestTimeStamp, 'HH:mm');
					this.accountDetails.dateValue = latestTimeStamp;
					this.accountDetails.hourValue = latestHour;
				} else {
					this.accountDetails.dateValue = 'N/A';
					this.accountDetails.hourValue = 'N/A';
				}
			}
		} else {
			this.accountDetails.dateValue = 'N/A';
			this.accountDetails.hourValue = 'N/A';
		}
    }
    
    getLastUpdateDateTime()
    {
        var account = this.accountDetails;
        if(account.bookDate != 'Not found' && account.bookDate.includes(' ')){
            var updateHour = account.bookDate.split(' ')[1];
            this.accountDetails.updatedHour = updateHour.split(':')[0] +':'+ updateHour.split(':')[1];
        }
    }

    setFiltersData(){
		// Set values for the Time Period dropdown
		var timePeriods = [];
        timePeriods.push(this.label.selectOne);
		timePeriods.push(this.label.lastDay);
		timePeriods.push(this.label.last7Days);
		timePeriods.push(this.label.lastMonth);
		this.timePeriods = timePeriods;
        
		// FILTER LIST CREATION
		var listObject = [];
		listObject.push({});
        listObject[0].data = []
		
       if(this.dates != undefined){
        listObject[0].data = this.dates;
       }
       listObject[0].name = this.label.bookDate;
       listObject[0].type = 'dates';
       listObject[0].displayFilter = true;

        //AM - 28/09/2020 - Ebury Accounts
		if(this.accountDetails.country != this.label.Ebury){
			// AMOUNT SELECTION
            listObject.push({});
            listObject[1].selectedFilters = []
			//AM - 20/10/2020 - Fix filtros OT Transactions
            if(JSON.stringify(this.filters) != '[]' && this.filters.length > 0){ 
                if(this.filters[1].selectedFilters.from != undefined){
                    listObject[1].selectedFilters.from = this.filters[1].selectedFilters.from;				
                }
                if(this.filters[1].selectedFilters.to != undefined){
                    listObject[1].selectedFilters.to = this.filters[1].selectedFilters.to;
                }
            }
			listObject[1].name = this.label.amount;
			listObject[1].type = 'text';
			listObject[1].displayFilter = true;
            listObject[1].displayOptions = false;

        }
		this.filters = listObject;
    }
    
    sendDataServiceRequestWithFilters(filters){    
 
        //Get the body params
        var bodyParams = this.setBodyParamsWithFilters(this.accountDetails, 1, filters);
        
        //Call apex to retrieve the movements from apex
        getPaginatedMovements({
            bodyParams : JSON.stringify(bodyParams)
        }).then(result =>{
            this.loading = false;
            if(this._selectedTimeframe != this.label.selectOne){
                this.fromDate = undefined;
                this.toDate = undefined;
            }
            this.setTableData(result);
        }).catch((error) => {
            console.log('getPaginatedMovements IAM_TransactionsParent: '+ JSON.stringify(error)); // TestError
        });
      
        
		this.calculateNumberActiveFilters();
        // por que lo pone a null?
        //this.transactionResults = null;
    }
    
    calculateNumberActiveFilters() {
		var filters = this.selectedFilters;//this.filters;
		var formFilters = this.formFilters;
		var filterCount = 0;
		
        // Loop through all the form filters and start counting
        for(var key in Object.keys(formFilters)){
            var filterName = Object.keys(formFilters)[key];
            if(((filterName == 'debit' || filterName == 'credit') && formFilters[filterName]) || ((filterName == 'clientRef' || filterName == 'description') && formFilters[filterName])){
                filterCount++;
            }
        }

		// Loop through all the filters and keep counting
		for(var key in filters){
			if(filters[key].type == 'checkbox'){
				filterCount = filters[key].data.filter(option => option.checked).length > 0 ? filterCount+1 : filterCount;
			} else if(filters[key].type == 'text'){
                if(filters[key].value.from != undefined){
                    filterCount++;
                    
                    this.fromamount = filters[key].value.from;
                    this.toamount = filters[key].value.to;

                }
                /*
				filterCount = filters[key].selectedFilters != undefined && 
                            ((filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != '') || (filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != '')) ? filterCount+1 : filterCount; 
                */            

			} else if(filters[key].type == 'dates'){
                if(filters[key].value.from != undefined){
                    filterCount++;
                    this.fromDate = filters[key].value.from;
                    this.toDate = filters[key].value.to;
                }
                else if((this.fromDate != null && this.fromDate != undefined) || (this.toDate != null && this.toDate != undefined)){
                    filterCount++;
                }
                else if((this.dates[0] != null && this.dates[0] != undefined) || (this.dates[1] != null && this.dates[1] != undefined)){
                    filterCount++;
                    this.fromDate = this.dates[0];
                    this.toDate = this.dates[1];
                }
                /*
                if(filters[key].data.length > 0 && 
                    ((filters[key].data[0] != null && filters[key].data[0] != undefined) || (filters[key].data[1] != null && filters[key].data[1] != undefined))){
                        filterCount++;
                } else if((this.fromDate != null && this.fromDate != undefined) || (this.toDate != null && this.toDate != undefined)){
                    filterCount++;
                } else if((this.dates[0] != null && this.dates[0] != undefined) || (this.dates[1] != null && this.dates[1] != undefined)){
                    filterCount++;
                }*/
			}
        }
               

		this.numberActiveFilters = filterCount;
        this.showModal = false;
    }
    
    
    //EVENTOS HIJOS
    clearallfilters(){
        this.showModal = false;
        this.fromDate = undefined;
        this.toDate = undefined;
        this.fromamount = undefined;
        this.toamount = undefined;
    }

    closemodalfilters(){
        this.showModal = false;
    }

    filterByTimePeriod(event){
        var timePeriod = event.detail; //event.getParam("value"); VER COMO ME LLEGA EL DETALLE

        this._selectedTimeframe = timePeriod; // 11/02/2021
        this.selectedTimeframe = timePeriod;

        if(timePeriod != this.label.selectOne){
            // Reset the transaction table
            this.highestPage = 1;            
            // Create the date filter
            var selection = {};
            var selectedFilters = [];
            selection.value = {};
            
            // Curent date
            var currentDate = new Date();
            var currentMonth = currentDate.getMonth()+1;
            selection.value.to = currentDate.getFullYear() + '-' + currentMonth + '-' + currentDate.getDate();

            this.changedTimeFrame = true;

            if(timePeriod == this.label.lastDay){
                var previousDate = new Date();
                previousDate.setDate(previousDate.getDate() - 1);
                var previousMonth = previousDate.getMonth()+1;
                selection.value.from = previousDate.getFullYear() + '-' + previousMonth + '-' + previousDate.getDate();					
                selection.name = this.label.bookDate;
                selection.type = 'dates';
                selectedFilters.push(selection);
            }

            if(timePeriod == this.label.last7Days){
                var previousDate = new Date();
                previousDate.setDate(previousDate.getDate() - 7);
                var previousMonth = previousDate.getMonth()+1;
                selection.value.from = previousDate.getFullYear() + '-' + previousMonth + '-' + previousDate.getDate();				
                selection.name = this.label.bookDate;
                selection.type = 'dates';
                selectedFilters.push(selection);
            }
            if(timePeriod == this.label.lastMonth){
                var previousDate = new Date();
                previousDate.setDate(previousDate.getDate() - 30);
                var previousMonth = previousDate.getMonth()+1;
                selection.value.from = previousDate.getFullYear() + '-' + previousMonth + '-' + previousDate.getDate();					
                selection.name = this.label.bookDate;
                selection.type = 'dates';
                selectedFilters.push(selection);
            }

            // Remove the Select One value
            var timePeriods = JSON.parse(JSON.stringify(this.timePeriods));
            timePeriods = timePeriods.filter(opt => opt != this.label.selectOne);
            this.timePeriods = timePeriods;

            // Pass the filters to the filter method
            this.loading = true;
            // Update the filters attribute so that the book date is updated
            this.dates = [];
            this.sendDataServiceRequestWithFilters(selectedFilters);			
        }
    }

    clearfilters(){
        this.loading = true;
        this.fromDate = undefined;
        this.toDate = undefined;
        this.fromamount = undefined;
        this.toamount = undefined;
        
    }
    //advanced filter
    filterTableData(event){
		// If the action is triggered by the "Apply filters" event
		if(event){
            this.loading = true;
            //var filters = event.selectedFilters;//event.detail.cmpParams.selectedFilters; // 
            var filters = event.detail.cmpParams.selectedFilters;//event.detail;     
            
            if(filters[0] != undefined && filters[0].value != undefined && filters[0].name != undefined && filters[0].name == "Book date" && filters[0].value.from != undefined && filters[0].value.to != undefined){
                this._selectedTimeframe = this.label.selectOne; //to reset time period filter to allow refilter by bookdate
                this.selectedTimeframe = this.label.selectOne;
            }
            if(filters[1] != undefined && filters[1].value != undefined && filters[1].name != undefined && filters[1].name == "Book date" && filters[1].value.from != undefined && filters[1].value.to != undefined){
                this._selectedTimeframe = this.label.selectOne; //to reset time period filter to allow refilter by bookdate
                this.selectedTimeframe = this.label.selectOne;
            }
            

			this.selectedFilters = filters;
            this.highestPage = 1;
			this.sendDataServiceRequestWithFilters(filters);
		}	
    }

    /*
    dropdowndays(event){
        if(event){
			var filters = event.detail; // event.getParam("selectedFilters"); VER COMO ME LLEGA EL DETALLE
			//this.selectedFilters = filters;
            this.highestPage = 1;
			this.filterByTimePeriod(filters);
		}
    }*/
    
    getUpdatedData(event){
        this.showModal = true;
    }
    
    sortBy(event) {
		var params = event.detail;
		if(params){
			var sortItem = params.sortItem;
			var sorted = this.sortByHelper(sortItem,params.column);

			if (sorted != undefined && sorted !=null){
                //var aux = component.get("v.transactionResults.listaObtTransacciones");
                //aux[0]=sorted;
                this.transactionResults.listaObtTransacciones = sorted;				

				//Update the sort order
				if( sortItem == 'asc'){
					sortItem = 'asc';
				}else{
					sortItem = 'asc';
				}
			}
		}
    }
    
    sortByHelper(sortItem,sortBy){
        try {
            var order = sortItem;
            if(order !='' && order != null && order !=undefined){
             var data = this.transactionResults.listaObtTransacciones;
                if(data != null && data != undefined){
                    var sort;
                 //SORT by DESC
                 if(order=='desc'){
                     //For sort by bookDate colum
                     if(sortBy == 'BookDate'){				 
                         sort = data.sort((a, b) => new Date(b.obtTransacBusqueda.bookDate) - new Date(a.obtTransacBusqueda.bookDate));
                         //pedro
                         this.sortBookDate = 'asc';
                         //hasta aqui
                     }//For sort by categorry colum
                     else if(sortBy == 'Category'){
                        sort = data.sort((a,b) => (a.obtTransacBusqueda.tipoTransaccion > b.obtTransacBusqueda.tipoTransaccion) ? 1 : ((b.obtTransacBusqueda.tipoTransaccion > a.obtTransacBusqueda.tipoTransaccion) ? -1 : 0));
                        this.sortCategory = 'asc';
                     }//For sort by amount colum
                     else if(sortBy == 'amount'){
                         sort = data.sort((a, b) => parseFloat(a.obtTransacBusqueda.importe) - parseFloat(b.obtTransacBusqueda.importe));
                         this.sortamount = 'asc';
                     }
                 }//SORT by ASC
                 else{
                     //For sort by bookDate colum
                     if(sortBy == 'BookDate'){
                         sort = data.sort((a, b) => new Date(a.obtTransacBusqueda.bookDate) - new Date(b.obtTransacBusqueda.bookDate));
                         //pedro
                         this.sortBookDate = 'desc';
                         //hasta aqui
                     }//For sort by categorry colum
                     else if(sortBy == 'Category'){
                         sort = data.sort((a,b) => (a.obtTransacBusqueda.tipoTransaccion < b.obtTransacBusqueda.tipoTransaccion) ? 1 : ((b.obtTransacBusqueda.tipoTransaccion < a.obtTransacBusqueda.tipoTransaccion) ? -1 : 0));	
                         this.sortCategory = 'desc';
                     }//For sort by amount colum
                     else if(sortBy == 'amount'){
                         sort = data.sort((a, b) => parseFloat(b.obtTransacBusqueda.importe) - parseFloat(a.obtTransacBusqueda.importe));
                         this.sortamount = 'desc';
                     }
                 }                 
                    return sort;
               }
            }
        } catch(e) {
            console.error('Error en el sort de IAM_AccountTransactionParent: ' + e);
        }
    }

    navigateToAccountsPage(event) {
		// Generate navigation URL and navigate to the Accounts page
		var url = 'c__tabs=true';
		if(JSON.stringify(this.accountFilters)!='[]'){
			url+="c__filters="+JSON.stringify(this.accountFilters);
		}        
        this.template.querySelector("c-lwc_service-component").redirect({
            page: 'accounts', 
            urlParams: url
        });
    }
    
    downloadTransactions(event) { 
		if(this.maximumRecords <= this.label.limitTransactionSearchNumberOneTrade){
			this.showLimitTransactionsToast = false;
			this.downloadFile(event);
		} else {
			this.showLimitTransactionsToast = true;
		}
    }

    downloadFile(event){
        try{    
            var params = this.downloadParams;
            var domain=this.label.domain;        
            downloadTransactionsOneTrade({
                params : JSON.stringify(params)
            }).then((result) => {
                if(result!=null && result!='' && result!=undefined){
                    window.location.href = domain+'/sfc/servlet.shepherd/document/download/'+result+'?operationContext=S1';
                    setTimeout(function(){
                        this.removeFile(result);
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error); // TestError
            })
        } catch(e) {
            console.log(e);
        }
    }

    removeFile(id){
        try{
            removeFile({id:id})
            .then((value) => {
               // result = value;
             })
             .catch((error) => {
                console.log(error); // TestError
             })
        } catch (e) {
            console.log(e);
        }
    }

    pageChanged(event)
    {
        this.highestPage = this.listOfPages.length;
		this.currentPage = event.detail;
        if(this.currentPage == this.highestPage && this.currentPage < this.maxPage)
        {
			// Check whether the data is currently being filtered or not
			let isFiltering = this.selectedFilters.length > 0;
            let bodyParams;
            if(isFiltering){
                bodyParams = this.setBodyParamsWithFilters(this.accountDetails, event.detail, this.selectedFilters);
            } else {
            	bodyParams = this.setBodyParams(this.accountDetails, event.detail);    
            }
            
            getPaginatedMovements({
                bodyParams : JSON.stringify(bodyParams)
            }).then(result =>{
                this.setTableData(result);
            }).catch((error) => {
                console.log('getPaginatedMovements IAM_TransactionsParent: '+ JSON.stringify(error)); // TestError
            });

            this.loading = false;
        }
    }

    navigateBack(){
        var url = "&c__consolidationCurrency=" + this.accountDetails.accountCurrency;// this.selectedcurrency;
        this.template.querySelector("c-lwc_service-component").redirect({
            page: "accounts",
            urlParams: url
          });



    }

}