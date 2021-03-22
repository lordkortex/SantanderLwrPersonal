import { LightningElement,api,track } from 'lwc';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';

import clear from '@salesforce/label/c.clear';
import SearchPayments from '@salesforce/label/c.SearchPayments';
import filterBy from '@salesforce/label/c.filterBy';
import AllFilters from '@salesforce/label/c.AllFilters';
import download from '@salesforce/label/c.download';
import T_Print from '@salesforce/label/c.T_Print';
import status from '@salesforce/label/c.status';
import currency from '@salesforce/label/c.currency';
import PAY_noPaymentsDownloadPrint from '@salesforce/label/c.PAY_noPaymentsDownloadPrint';
import PAY_checkFilterSearchCriteria from '@salesforce/label/c.PAY_checkFilterSearchCriteria';
import PAY_Status_PendingOne from '@salesforce/label/c.PAY_Status_PendingOne';
import PAY_Status_PendingTwo from '@salesforce/label/c.PAY_Status_PendingTwo';
import PAY_Status_InReviewOne from '@salesforce/label/c.PAY_Status_InReviewOne';
import PAY_Status_ScheduledOne from '@salesforce/label/c.PAY_Status_ScheduledOne';
import PAY_Status_CompletedOne from '@salesforce/label/c.PAY_Status_CompletedOne';
import PAY_Status_RejectedOne from '@salesforce/label/c.PAY_Status_RejectedOne';


export default class Lwc_paymentsLandingFilters extends LightningElement {
   
    label = {
        clear,
        SearchPayments,
        filterBy,
        AllFilters,
        download,
        T_Print,
        status,
        currency,
        PAY_noPaymentsDownloadPrint,
        PAY_checkFilterSearchCriteria,
        PAY_Status_PendingOne,
        PAY_Status_PendingTwo,
        PAY_Status_InReviewOne,
        PAY_Status_ScheduledOne,
        PAY_Status_CompletedOne,
        PAY_Status_RejectedOne
    };

    @api showdownloadmodal = false;  //"Boolean to show or hide download modal (CMP_PaymentsLandingDownloadModal)"
    @api showfiltermodal = false;  //"Boolean to show or hide advanced filter modat (CMP_PaymentsLandingFilterModal)"
    @api isloading = false; //"Controls whether the spinner shows when records are loading"
    @api currentuser = {}; //"Current user data"
    @api searchedstring = '';  //"Search information placed in the account search input."
    @api selectedstatuses = [];  //"List of selected statuses." 
    @api selectedpaymentstatusbox = ''; //"Selected payment status"
    @api statusdropdownlist = []; //"List of statuses that are displayed in the dropdown"
    @api selectedcurrencies = [];  //"List of selected currencies."
    @api currencydropdownlist = []; //"List of currencies that are displayed in the dropdown"
    @api paymentmethoddropdownlist = []; //"List of payment methods that are displayed in the dropdown"
    @api countrydropdownlist = []; // "List of countries that are displayed in the dropdown"
    @api accounts = []; //"List of accounts"
    @api resetsearch = false;  //"Reset search when the button is clicked."
    @api filtercounter = 0;  //"Counts the number of types of filers selected (source account, amount, currency, status, payment method, client reference, destination country, date)"
    @api pendingofmyauthorization = false;  //"True when 'Pending of my authorization' header option is clicked."
    @api isheaderoptionselected = false;  // "True when a header option is selected."
    @api reloadaccounts = false;  //"Retry the call to retrieve list of accounts."
    @api numberofpayments = 0; //"Number of payments in the table"
    @api availablestatuses = []; //"List of status-reason pairs visible to front-end user"
    
    @track searchedsourceaccount = '';  //"Search information placed in the source account search input."
    @track selectedsourceaccount = {}; //"Source account selected from dropdown."
    @track fromdecimal = '';  //"Search information placed in the From Amount search input."
    @track todecimal = ''; //"Search information placed in the To Amount search input."
    @track dates;// = "['', '']";  //"List containing the selected dates"
    @track clientreference;  //"User input for client reference filter."
    @track selectedmethod = ''; //"Payment method selected"
    @track selectedcountry;  //"Country selected from dropdown."
    @track applyisclicked = false; 
    @track showdropdown = false;

    get searchedStringNotEmpty(){
        return (this.searchedstring ? true : false);
    }

    get searchedStringEmptyClass(){
        //'slds-input' + (!empty(v.searchedString) ? ' filledInput' : '')
        var ret = 'slds-input';
        if (this.searchedstring){
            ret = ret+' filledInput';
        }
        return ret;
    }
    get filterCounterGTzeroClass(){
        //((v.filterCounter > 0) ? 'slds-button buttons filterButton' : 'slds-button buttons')
        var ret = '';
        if (this.filtercounter && this.filtercounter > 0){
            ret = 'slds-button buttons filterButton';
        }else{
            ret = 'slds-button buttons';
        }
        return ret;
    }


    
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.setFilters();
    }
    

    //pedro
    @api 
    statusFilters(status,currency){
        this.statusdropdownlist = status;
        this.currencydropdownlist = currency;
        //this.setFilters();
        this.template.querySelectorAll('[data-id="filter"]')[0].setlista(this.statusdropdownlist);
        this.template.querySelectorAll('[data-id="filter"]')[1].setlista(this.currencydropdownlist);

        
    }


    @api
    setFilters() {
		let rPayemntMethodList = this.paymentmethoddropdownlist;
        let rCurrencyList = this.currencydropdownlist;
        let rStatusList = this.statusdropdownlist;
        let rCountryList = this.countrydropdownlist;
        
        let currencyList = [];
        let currencyListAux = [];
        let statusList = [];
        let statusListAux = [];
        let methodList = [];
        let methodListAux = [];
        let countryList = [];
        let countryListAux = [];

        
        for(let i=0; i < rCurrencyList.length; i++){
            //currency
            let currency = rCurrencyList[i].currencyName;
            if(currency){
                if(!currencyListAux.includes(currency)){
                    currencyListAux.push(currency);
                    currencyList.push({
                        'label' : rCurrencyList[i].parsedCurrencyName,
                        'value' : 'chk_' + currency
                    });
                }
            }
        }
        for(let i=0; i < rStatusList.length; i++){
            //Status
            let status = rStatusList[i].statusName;
            if(status){
                if(!statusListAux.includes(status)){
                    statusListAux.push(status);
                    statusList.push({
                        'label' : rStatusList[i].parsedStatusName,
                        'value' : 'chk_' + status
                    });
                }
            }
        }
        
        for(let i=0; i < rPayemntMethodList.length; i++){
            //Payment method
            let method = rPayemntMethodList[i].paymentTypeName;
            if(method){
                if(!methodListAux.includes(method)){
                    methodListAux.push(method);
                    methodList.push({
                        'label' : rPayemntMethodList[i].parsedPaymentTypeName,
                        'value' : 'chk_' + method
                    });
                }
            }
        }
 
        for(let i=0; i < rCountryList.length; i++){
            //Country
            let country = rCountryList[i].countryName;
            if(country){
                if(!countryListAux.includes(country)){
                    countryListAux.push(country);
                    countryList.push({
                        'label' : rCountryList[i].parsedCountryName,
                        'value' : 'chk_' + country
                    });
                }
            }
        }

        var sortCurrencyList = this.sortList(currencyList);
        var sortStatusList = this.sortList(statusList);
        var sortMethodList = this.sortList(methodList);
        var sortCountryList = this.sortList(countryList);
        this.currencydropdownlist = sortCurrencyList;
        this.statusdropdownlist = sortStatusList;
        this.paymentmethoddropdownlist = sortMethodList;
        this.countrydropdownlist = sortCountryList;
    }
    
    printScreen() {
        var length = this.numberofpayments;
        if (!length) {
            this.showToast(this.label.PAY_noPaymentsDownloadPrint, this.label.PAY_checkFilterSearchCriteria, 'Error', 'error', true);
        } else {
            window.print();
        }
    }

    showToast(title, body, functionType, functionClass, noReload) {
        var myEvent = {
            detail: {
                action: false, 
                static: false, 
                notificationTitle: title,
                bodyText: body, 
                functionTypeText: functionType, 
                functionTypeClass: functionClass, 
                functionTypeClassIcon: functionClass, 
                noReload: noReload
            }
        }
        this.template.querySelector('[data-id="toast"]').openToast(myEvent);
    }

    openDownloadModal() {
        var length = this.numberofpayments;
        if (length == 0) {
            this.showToast(this.label.PAY_noPaymentsDownloadPrint, this.label.PAY_checkFilterSearchCriteria, 'Error', 'error', true);
        } else {
            this.showdownloadmodal = true;
            const opendownloadmodal = new CustomEvent('opendownloadmodal');
            this.dispatchEvent(opendownloadmodal);          
        }
    }

    openFilterModal() {
        this.showfiltermodal = true;
        //this.template.querySelector('c-lwc_payments-landing-filter-modal').setCurrentUser(this.currentuser);
        //this.template.querySelector('c-lwc_payments-landing-filter-modal').doInit();
    }

    clearInput() {
        //var clientReference = this.searchedstring; //no se usa ??
              
        this.searchedstring = '';
        this.applyisclicked = true;
        this.countFilters();
    }

    countFilters() {
    
        var count = 0;
        this.filtercounter = count;
        
        var source = this.selectedsourceaccount;
        
        // var source = component.get('v.searchedSourceAccount');
        // var destination = component.get('v.searchedDestinationAccount');
        
        if(source){
            count = count + 1;
            console.log('>>> Source account: '+ source);
        }
        
        var fromDecimal = this.fromdecimal;
        var toDecimal = this.todecimal;
        
        if(fromDecimal || toDecimal){
            count = count + 1;
            console.log('>>> From decimal: '+ fromDecimal);
            console.log('>>> To decimal: '+ toDecimal);
        }
        
        var selectedCurrencies = this.selectedcurrencies;
        
        if(selectedCurrencies){
            count = count + 1;
            console.log('>>> Currencies: '+ selectedCurrencies);
        }
        
        var selectedStatuses = this.selectedstatuses;
        
        if(selectedStatuses){
            count = count + 1;
            console.log('>>> Status: '+ selectedStatuses);
        }
        
        
        var selectedMethod = this.selectedmethod;
        
        if(selectedMethod){
            count = count + 1;
            console.log('>>> Method: '+ selectedMethod);
        }
        
        // var clientReference = component.get('v.clientReference');
        var searchedString = this.searchedstring;
        
        if(searchedString){
            count = count + 1;
            console.log('>>> Client reference: '+ clientReference);
        }
        
        var selectedCountry = this.selectedcountry;
        
        if(selectedCountry){
            count = count + 1;
            console.log('>>> Country: '+ selectedCountry);
        }

        var dates = this.dates;
        if(dates){
            if(dates[0] || dates[1]){
                count = count + 1;
                console.log('>>> from date: '+ dates[0]);
                console.log('>>> to date: '+ dates[1]);
            }            
        }
        this.filtercounter = count;
    }

    setInputOnKeyDown(event) {
        let inputValue = event.target.value;
        let key = event.key;
        let keyCode = event.keyCode;        
        let searchedString = this.searchedstring;
        if (searchedString == null || searchedString == undefined) {
            searchedString = '';
        }
        if(key == 'Enter' && keyCode == 13){            
            if (inputValue) {
                this.clearSelectedPaymentStatusBox();
                this.searchedstring = inputValue;	                
            }else{
                this.searchedstring = '';
                
			
            }
            this.applyisclicked = true;
            this.countFilters();
            this.clearSelectedPaymentStatusBox();
        }  
    }

    clearSelectedPaymentStatusBox(){
        this.selectedpaymentstatusbox = '';
    }

    setInputOnBlur(event) {        
        let inputValue = event.target.value;     
        this.clearSelectedPaymentStatusBox();
        this.searchedstring = inputValue;
    }

    handleFilter(event) {
        var eventDropdown = event.detail.showDropdown;
        var eventName = event.detail.name;
        var eventAction = event.detail.action;
        if (eventDropdown) {
            let filters = this.template.querySelectorAll('[data-id="filter"]');
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].name == eventName) {
                    filters[i].showdropdown = true;
                } else {
                    filters[i].showdropdown = false;
                }
            }
        }
        if (eventAction && eventName) {
            
            //Status
            if(eventName == 'status' && eventAction == 'clear'){
                this.clearSelectedPaymentStatusBox();
                this.selectedstatuses = [];
            }else if(eventName == 'status' && eventAction == 'apply'){
                this.selectedstatuses = event.detail.selectedFilters;
                if (this.selectedstatuses){ //empty  in cmp
                }   
            }
            
            //Currency
            if(eventName == 'currency' && eventAction == 'clear'){
                this.selectedcurrencies = [];
            }else if(eventName == 'currency' && eventAction == 'apply'){
                this.selectedcurrencies = event.detail.selectedFilters;
                if (this.selectedcurrencies){//empty  in cmp
                }
            }

            this.applyisclicked = true;
            this.handleApplySearch();
            this.clearSelectedPaymentStatusBox();
        }
        
    }

    handleResetSearch(){
        var clear = this.resetsearch;
        if(clear){
            this.resetSearch();
            this.selectedpaymentstatusbox = '';
        }
    }

    resetSearch(){
        
        var emptyLst = [];
        //Account
        this.searchedsourceaccount = '';
        this.selectedsourceaccount = {};
        
        //Amount       
        this.fromdecimal = ''; 
        this.todecimal = '';            

        //Payment method
        this.selectedmethod = '';

        //Client reference
        this.searchedstring = '';  

        //Dates
        this.dates = ['',''];

        //Country   
        this.selectedcountry = '';   
        
        // General
        this.resetsearch = false; 
        this.filtercounter = 0;
    }

    @api
    changeSelectedStatusBox(selectedPaymentStatusBox){    
        console.log('lwc_paymentsLandingFilter changeSelectedStatusBox: ' + JSON.stringify(selectedPaymentStatusBox));
        this.selectedpaymentstatusbox = selectedPaymentStatusBox;
        this.statusAction();
        this.handleApplySearch();
    }

    statusAction(){
        var statusBox = this.selectedpaymentstatusbox;
        if(statusBox){
            this.resetSearch();
            this.applyisclicked = true;
            this.setFilterCounter();
        }
    }

    setFilterCounter(){
        var selectedBox = this.selectedpaymentstatusbox;
        if(selectedBox){
            if(selectedBox.parsedStatusDescription == this.label.PAY_Status_PendingOne){
                this.filtercounter = 1;
            } else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_PendingTwo){
                this.filtercounter = 1;
            }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_InReviewOne){
                this.filtercounter = 1;
            }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_ScheduledOne){
                this.filtercounter = 2;
            }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_CompletedOne){
                this.filtercounter = 2;
            } else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_RejectedOne){
                this.filtercounter = 2;
            }
        }
    }

    handleApplySearch(){
        var applyIsClicked = this.applyisclicked;
        if (applyIsClicked) {
			this.countFilters();            
            this.applySearch();            
        }                
    }

    applySearch(){

        if(this.applyisclicked){            
            var globalUserId = null;   
            var pendingAuthorization = null;
            var latestOperationsFlag = false;
            var sourceAccountList = null;  
            var bankId = null;
            var alias = null;
            var idType = null;
            var accountId = null;
            var destinationCountry = null;
            var amountFrom = null;
            var amountTo = null;
            var currencyList = null;
            var paymentMethod = null;
            var statusList = null;
            var clientReference = null;
            var valueDateFrom = null;
            var valueDateTo = null;
            
            
            var isHeaderOptionSelected = this.isheaderoptionselected;
            var isPendingAuthorization = this.pendingofmyauthorization;
            if(isHeaderOptionSelected){             
                
                var selectedBox = this.selectedpaymentstatusbox;
                if(selectedBox){
                    if(selectedBox.parsedStatusDescription == this.label.PAY_Status_PendingOne){
                        pendingAuthorization = isPendingAuthorization;
                        if(this.currentuser.globalId){
                            globalUserId = this.currentuser.globalId;
                        }
                    } else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_PendingTwo){
                        pendingAuthorization = isPendingAuthorization;
                        if(this.currentuser.globalId){
                            globalUserId = this.currentuser.globalId;
                        }
                    }else if(selectedBox.parsedStatusDescription == this.label.PAY_Status_InReviewOne){
                        console.log('In review');
                    }
                    
                    if(selectedBox.parsedStatusDescription == this.label.PAY_Status_ScheduledOne){
                        var d = [];
                        var aux_date = '';
                        var aux_month = '';
                        // Curent date
                        var currentDate = new Date();                        
                        var currentMonth = currentDate.getMonth()+1;                        
                        if(currentMonth < 10){
                            aux_month = '0'+String(currentMonth);
                        }else{
                            aux_month = String(currentMonth);
                        }
                        
                        if(currentDate.getDate() < 10){
                            aux_date = '0'+String(currentDate.getDate());
                        }else{
                            aux_date = String(currentDate.getDate());
                        }
                        
                        var iToday = currentDate.getFullYear() + "-" + aux_month + "-" + aux_date;
                        d.push(iToday);
                        var toDate = new Date();
                        toDate.setDate(toDate.getDate() + 7);
                        var toMonth = toDate.getMonth()+1;
                        
                        if(toMonth < 10 ){
                            aux_month = '0'+String(toMonth);
                        }else{
                            aux_month = String(toMonth);
                        }
                        
                        if(toDate.getDate() < 10){
                            aux_date = '0'+String(toDate.getDate());
                        }else{
                            aux_date = String(toDate.getDate());
                        }
                        var nextWeek = toDate.getFullYear() + "-" + aux_month + "-" + aux_date;	
                        d.push(nextWeek);
                        
                        this.dates = d;
                    }else if((selectedBox.parsedStatusDescription == this.label.PAY_Status_CompletedOne) || (selectedBox.parsedStatusDescription == this.label.PAY_Status_RejectedOne)){
                        var d = [];
                        var aux_date = '';
                        var aux_month = '';
                        // Curent date
                        var currentDate = new Date();
                        var currentMonth = currentDate.getMonth()+1;
                        if(currentMonth < 10){
                            aux_month = '0'+String(currentMonth);
                        }else{
                            aux_month = String(currentMonth);
                        }
                        
                        if(currentDate.getDate() < 10){
                            aux_date = '0'+String(currentDate.getDate());
                        }else{
                            aux_date = String(currentDate.getDate());
                        }
                        
                        var iToday = currentDate.getFullYear() + "-" + aux_month + "-" + aux_date;
                        
                        var toDate = new Date();
                        toDate.setDate(toDate.getDate() - 7);
                        var toMonth = toDate.getMonth()+1;
                        
                        if(toMonth < 10 ){
                            aux_month = '0'+String(toMonth);
                        }else{
                            aux_month = String(toMonth);
                        }
                        
                        if(toDate.getDate() < 10){
                            aux_date = '0'+String(toDate.getDate());
                        }else{
                            aux_date = String(toDate.getDate());
                        }
                        var nextWeek = toDate.getFullYear() + "-" + aux_month + "-" + aux_date;	
                        d.push(nextWeek);
                        d.push(iToday);
                        this.dates = d;
                    } 
                }
            }
           
        
            if(this.searchedstring){
               
                clientReference =  this.searchedstring;
            }
            if(this.selectedsourceaccount) {
            
                if(this.selectedsourceaccount) {
                    console.log('selected source account: ' + JSON.stringify(this.selectedsourceaccount)); 
                } else {
                    console.log('no selected source account'); 
                }
                
                var account = this.selectedsourceaccount;
                
                sourceAccountList = [];
                bankId = account.codigoBic;
                alias = account.alias;
                idType = account.idType;
                accountId = account.displayNumber;  
                if(idType == undefined || idType == null){
                    idType = 'BBA';
                }
                if(accountId && idType){
                    sourceAccountList.push({
                        "sourceAccount" : {"accountId" : accountId, "accountType" : idType}
                    });
                    
                } 
            }
            if(this.fromdecimal){
             
              amountFrom = this.fromdecimal;
            }
            if(this.todecimal){
              
                amountTo = this.todecimal;
            }
            if(this.selectedcurrencies){
               
                var currencyArray = this.selectedcurrencies;
                currencyList = [];
                var i;
                for (i = 0; i < currencyArray.length; i++) {
                    
                    var item = currencyArray[i];
                    var includesLowBar = item.includes("_");
                    if(includesLowBar){
                        var res = item.split("_");
                        if(res.length == 2){
                            currencyList.push({
                                "tcurrency" : res[1]
                            });
                        }
                    }
                }
            }

            if(this.selectedstatuses){
                var statusArray = this.selectedstatuses;
                var availableStatuses = this.availablestatuses;
                statusList = [];
                var i;
                for (i = 0; i < statusArray.length; i++) {                    
                    var item = statusArray[i];
                    var includesLowBar = item.includes("_");
                    if(includesLowBar){
                        var res = item.split("_");
                        if(res.length == 2){
                            var statusCode = res[1];
                            var j;
                            for (j = 0; j < availableStatuses.length; j++) {
                                if (availableStatuses[j].status == statusCode) {
                                    statusList.push(availableStatuses[j]);
                                }
                            }
                        }
                    }
                }
            }
            if(this.selectedmethod){
               
                var method = this.selectedmethod;
                var includesLowBar = method.includes("_");
                if(includesLowBar){
                    var res = method.split("_");
                    if(res.length == 2){
                        paymentMethod = res[1]; 
                    }
                }
            }
            if(this.selectedcountry){
               
                var country =  this.selectedcountry;
                var includesLowBar = country.includes("_");
                if(includesLowBar){
                    var res = country.split("_");
                    if(res.length == 2){
                        destinationCountry = res[1]; 
                    }
                }
            }
            
            var dateLst = this.dates;
            if(dateLst != null){
                if(dateLst[0] != null && dateLst[0] != '' ){
                    valueDateFrom = dateLst[0];
                }
                
                if(dateLst[1] != null && dateLst[1] != ''){
                    valueDateTo = dateLst[1];
                }
            }
            this.pendingofmyauthorization = false;
            this.isheaderoptionselected = false;
            this.applyisclicked = false;
            // var filterCounter = component.get('v.filterCounter');
            // if (filterCounter == 0) {
            //     component.set('v.resetSearch', true);
            // }

            var params = {
                globalUserId : globalUserId,
                pendingAuthorization : pendingAuthorization,
                latestOperationsFlag : latestOperationsFlag,
                sourceAccountList : sourceAccountList,
                destinationCountry : destinationCountry,                
                statusList : statusList,
                amountFrom : amountFrom,
                amountTo : amountTo,
                currencyList :  currencyList,
                paymentMethod : paymentMethod,
                clientReference : clientReference,
                valueDateFrom : valueDateFrom,
                valueDateTo : valueDateTo
            }

            const evt = new CustomEvent('searchoperationslistfired',{detail : params});
            this.dispatchEvent(evt);  
        }
        
        
    }

    sortList(list) {
        var sort;
        var data = list;
       	sort = data.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        return sort;
    }

    @api
    setCurrentUser(currentuser){
        this.currentuser = currentuser;
        //this.template.querySelector('c-lwc_payments-landing-filter-modal').setCurrentUser(this.currentuser);
        //this.template.querySelector('c-lwc_payments-landing-filter-modal').doInit();
    }

    onCloseModal(){
        this.showfiltermodal = false;
        this.setFilters();
    }

    @api
    updateAccounts(accounts){
        this.accounts = accounts;
        this.setFilters();
    }
}