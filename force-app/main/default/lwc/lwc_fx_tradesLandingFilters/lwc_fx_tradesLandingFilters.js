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


export default class lwc_fx_tradesLandingFilters extends LightningElement {
   
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

    @api currentuser; //"Current user data"
    @api currencydropdownlist = []; //"List of currencies that are displayed in the dropdown"
    @api statusdropdownlist = []; //"List of statuses that are displayed in the dropdown"
    @api paymentmethoddropdownlist = []; //"List of payment methods that are displayed in the dropdown"
    @api countrydropdownlist = []; // "List of countries that are displayed in the dropdown"
    @api accounts = []; //"List of accounts"
    @api searchedsourceaccount = '';  //"Search information placed in the source account search input."
    @api selectedsourceaccount = {}; //"Source account selected from dropdown."
    @api reloadaccounts = false;  //"Retry the call to retrieve list of accounts."

    @api fromdecimal = '';  //"Search information placed in the From Amount search input."
    @api todecimal = ''; //"Search information placed in the To Amount search input."

    @api dates = "['', '']";  //"List containing the selected dates"

    @api showdownloadmodal = false;  //"Boolean to show or hide download modal (CMP_PaymentsLandingDownloadModal)"
    @api showfiltermodal = false;  //"Boolean to show or hide advanced filter modat (CMP_PaymentsLandingFilterModal)"
    @api isLoading = false; //"Controls whether the spinner shows when records are loading"
    @api clientreference;  //"User input for client reference filter."
    @api searchedstring = '';  //"Search information placed in the account search input."
    @api selectedstatuses = [];  //"List of selected statuses." 
    @api selectedcurrencies = [];  //"List of selected currencies."
    @api pendingofmyauthorization = false;  //"True when 'Pending of my authorization' header option is clicked."
    @api isheaderoptionselected = false;  // "True when a header option is selected."

    @api selectedpaymentstatusbox = ''; //"Selected payment status"

    @api selectedmethod = ''; //"Payment method selected"
    @api selectedcountry;  //"Country selected from dropdown."

    @api resetsearch = false;  //"Reset search when the button is clicked."
    @api filtercounter = 0;  //"Counts the number of types of filers selected (source account, amount, currency, status, payment method, client reference, destination country, date)"
    @api applyisclicked = false; 

    @api numberofpayments = 0; //"Number of payments in the table"
    @api availablestatuses = []; //"List of status-reason pairs visible to front-end user"

    @track showdropdown = false;
    //filters = new Object();
    currencypairfilter = [];
    statusfilter = [];
    sidefilter = [];
    //currencypairdropdownlist = [];
    currencypairdropdownlist = ['EUR/USD', 'USD/GBP', 'GBP/EUR'];
    statuslist = ['Complete', 'Pending To Be Confirmed', 'Settlement Instruction Pending', 'Cancelled', 'Settled', 'Terminated', 'Replaced', 'Settlement Instruction Assigned'];
    sidelist = ['Sell', 'Buy'];
    
    get searchedStringNotEmpty(){
        return (this.searchedstring != undefined && this.searchedstring != null && this.searchedstring != '');
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
        /*this.filters.label = 'EUR/USD';
        this.filters.value = 'chk_EURUSD';
        this.currencypairdropdownlist.push(this.filters);*/
        /*this.currencypairdropdownlist.push('USD/GBP');
        console.log(this.currencypairdropdownlist);*/
        this.setFilters();
    }

    openModal() {
            const openDownloadModal = new CustomEvent('buttondownload',{detail: true});
            this.dispatchEvent(openDownloadModal);
    }

    setFilters(){
        var currencypair = this.currencypairdropdownlist;
        var status = this.statuslist;
        var side = this.sidelist;
        for(let index in currencypair){
            if(currencypair[index] != null ||
               currencypair[index] != undefined){
                var currencyObj = new Object();
                currencyObj.label = currencypair[index];
                currencyObj.value = 'chk_' + currencypair[index];
                console.log('Objeto ' + currencyObj);
                this.currencypairfilter.push(currencyObj);
            }
        }

        for(let index in status){
            if(status[index] != null ||
                status[index] != undefined){
                var statusObj = new Object();
                statusObj.label = status[index];
                statusObj.value = 'chk_' + currencypair[index];
                //console.log('Objeto ' + statusObj);
                this.statusfilter.push(statusObj);
            }
        }

        for(let index in side){
            if(side[index] != null ||
                side[index] != undefined){
                var sideObj = new Object();
                sideObj.label = side[index];
                sideObj.value = 'chk_' + side[index];
                //console.log('Objeto ' + statusObj);
                this.sidefilter.push(sideObj);
            }
        }
    }
}