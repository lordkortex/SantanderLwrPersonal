import { LightningElement,api, track } from 'lwc';

import {loadStyle} from 'lightning/platformResourceLoader';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import { NavigationMixin } from 'lightning/navigation';

import encryptData from '@salesforce/apex/CNT_PaymentsLandingTable.encryptData';
import getSignatoryStatus from '@salesforce/apex/CNT_PaymentsLandingTable.getSignatoryStatus';

import Displaying from '@salesforce/label/c.Displaying';
import PAY_payments from '@salesforce/label/c.PAY_payments';
import PAY_accordingTo from '@salesforce/label/c.PAY_accordingTo';
import PAY_selectedFilters from '@salesforce/label/c.PAY_selectedFilters';
import PAY_last from '@salesforce/label/c.PAY_last';
import Show_More from '@salesforce/label/c.Show_More';
import ClientReference from '@salesforce/label/c.ClientReference';
import status from '@salesforce/label/c.status';
import B2B_Source_account from '@salesforce/label/c.B2B_Source_account';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import amount from '@salesforce/label/c.amount';
import currency from '@salesforce/label/c.currency';
import valueDate from '@salesforce/label/c.valueDate';
import Search_NoPaymentsFound from '@salesforce/label/c.Search_NoPaymentsFound';
import PAY_noResultsWithSearchTerm from '@salesforce/label/c.PAY_noResultsWithSearchTerm';
import PAY_noResultsWithFilters from '@salesforce/label/c.PAY_noResultsWithFilters';
import PAY_didNotFindPayments from '@salesforce/label/c.PAY_didNotFindPayments';
import PAY_checkConnectionRefresh from '@salesforce/label/c.PAY_checkConnectionRefresh';
import B2B_Items_displayed from '@salesforce/label/c.B2B_Items_displayed';
import toMinus from '@salesforce/label/c.toMinus';
import of from '@salesforce/label/c.of';
import B2B_Items from '@salesforce/label/c.B2B_Items';
import B2B_PREV from '@salesforce/label/c.B2B_PREV';
import B2B_NEXT from '@salesforce/label/c.B2B_NEXT';
import ERROR_NOT_RETRIEVED from '@salesforce/label/c.ERROR_NOT_RETRIEVED';


export default class Lwc_paymentsLandingTable extends NavigationMixin(LightningElement) {

    label = {
        Displaying,
        PAY_payments,
        PAY_accordingTo,
        PAY_selectedFilters,
        PAY_last,
        Show_More,
        ClientReference,
        status,
        B2B_Source_account,
        beneficiaryAccount,
        amount,
        currency,
        valueDate,
        Search_NoPaymentsFound,
        PAY_noResultsWithSearchTerm,
        PAY_noResultsWithFilters,
        PAY_didNotFindPayments,
        PAY_checkConnectionRefresh,
        B2B_Items_displayed,
        toMinus,
        of,
        B2B_Items,
        B2B_PREV,
        B2B_NEXT,
        ERROR_NOT_RETRIEVED
    }; 

    @api selectedpaymentstatusbox = '';
    @api currentuser;
    @track paymentlist;
    @api hassearched = false;
    @api showfiltermodal = false;
    @track isloading = true;
    @track selectedrows = [];
    @api resetsearch = false;
    @api searchedstring = '';
    @api noservice = false;
    @api selectall = [];

    @api selectedsort = 'valuedate';
    @api clientreferenceorderby = 'asc';
    @api statusorderby = 'asc';
    @api sourceaccountorderby = 'asc';
    @api beneficiaryaccountorderby = 'asc';
    @api amountorderby = 'asc';
    @api currencyorderby = 'asc';
    @api valuedateorderby = 'desc';
    @api isallselected = false;


    @api values = "['10','20','40']";
    @track selectedvalue;
    @api helptextdropdown = this.label.Show_More;
    @track firstitem = "1";
    @track finalitem;
    @track paymentsnumber;
    @api pagesnumbers;
    @api paginationlist;
    @api currentpage;

    @api detailspage = "landing-payment-details";
    @api filtercounter = "0";
    @api filteredpaymentlist = [];
    @track singleselectedpayment = {};
    @track actions = {};
    @api signatorystatus = {};
    @api hasactions = false;

    @track clientreferenceclass = '';
    @track statusclass = '';
    @track sourceaccountclass = '';
    @track beneficiaryaccountclass = '';
    @track amountclass = '';
    @track currencyclass = '';
    @track valuedateclass = '';    

    @track backgroundimage = true;
    @track showresetbutton = false;

    get hasPaymentList(){
        //!and(v.isLoading == false, not(empty(v.paymentList)))
        return (!this.isloading &&  this.paymentlist);
    }
    get emptyPaymentList(){
        //!and(empty(v.paymentList), v.isLoading == false)
        return (!this.isloading && (this.paymentlist == null || this.paymentlist == undefined));
    }
    get isSearchedString(){
        //!or(v.filterCounter != 0, not(empty(v.searchedString)))
        return (this.filtercounter != 0 || this.searchedstring);
    }
    get isNotSearchedString(){
        //!and(v.filterCounter == 0, empty(v.searchedString))
        return (this.filtercounter == 0 && (this.searchedstring == null || this.searchedstring == undefined));
    }
    get isSearchedStringGTZ(){
        //!or(v.filterCounter > 0, not(empty(v.searchedString)))
        return (this.filtercounter > 0 || this.searchedstring);
    }
    
   /* get isClientReferenceOrderDesc(){
        //!and(v.selectedSort == 'clientReference', v.clientReferenceOrderBy == 'desc')
        return (this.selectedsort == 'clientReference' && this.clientreferenceorderby  == 'desc');
    }
    get isClientReferenceOrderAsc(){
        //!and(v.selectedSort == 'clientReference', v.clientReferenceOrderBy == 'asc')
        return (this.selectedsort == 'clientReference' && this.clientreferenceorderby  == 'asc');
    }
    get isNotClientReference(){
        // !v.selectedSort != 'clientReference'
        return (this.selectedsort != 'clientReference');
    }*/

    /*get isStatusOrderDesc(){
        // !and(v.selectedSort == 'status', v.statusOrderBy  == 'desc')
        return (this.selectedsort == 'status' && this.statusorderby == 'desc');
    }
    get isStatusOrderAsc(){
        // !and(v.selectedSort == 'status', v.statusOrderBy  == 'asc')
        return (this.selectedsort == 'status' && this.statusorderby == 'asc');
    }
    get isNotStatus(){
        // !v.selectedSort != 'status'
        return (this.selectedsort != 'status');
    }*/
    /*
    get isSourceAccountDesc(){
        // !and(v.selectedSort == 'sourceAccount', v.sourceAccountOrderBy == 'desc')
        return (this.selectedsort == 'sourceAccount' && this.sourceaccountorderby == 'desc');
    }
    get isSourceAccountAsc(){
        // !and(v.selectedSort == 'sourceAccount', v.sourceAccountOrderBy == 'asc')
        return (this.selectedsort == 'sourceAccount' && this.sourceaccountorderby == 'asc');
    }
    get isNotSourceAccount(){
        // !v.selectedSort != 'sourceAccount'
        return (this.selectedsort != 'sourceAccount');
    }
    */
   /*
    get isBeneficiaryAccountDesc(){
        // !and(v.selectedSort == 'beneficiaryAccount', v.beneficiaryAccountOrderBy == 'desc')
        return (this.selectedsort == 'beneficiaryAccount' && this.beneficiaryaccountorderby == 'desc');
    }
    get isBeneficiaryAccountAsc(){
        // !and(v.selectedSort == 'beneficiaryAccount', v.beneficiaryAccountOrderBy == 'asc')
        return (this.selectedsort == 'beneficiaryAccount' && this.beneficiaryaccountorderby == 'asc');
    }
    get isNotBeneficiaryAccount(){
        // !v.selectedSort != 'beneficiaryAccount'
        return (this.selectedsort != 'beneficiaryAccount');
    }
    */
   /*
    get isAmountDesc(){
        // !and(v.selectedSort == 'amount', v.amountOrderBy == 'desc')
        return (this.selectedsort == 'amount' && this.amountorderby == 'desc');
    }
    get isAmountAsc(){
        // !and(v.selectedSort == 'amount', v.amountOrderBy == 'asc')
        return (this.selectedsort == 'amount' && this.amountorderby == 'asc');
    }
    get isNotAmount(){
        // !v.selectedSort != 'amount'
        return (this.selectedsort != 'amount');
    }
    */
   /*
    get isCurrencyDesc(){
        // !and(v.selectedSort == 'currency', v.currencyOrderBy == 'desc')
        return (this.selectedsort == 'currency' && this.currencyorderby == 'desc');
    }
    get isCurrencyAsc(){
        // !and(v.selectedSort == 'currency', v.currencyOrderBy == 'asc')
        return (this.selectedsort == 'currency' && this.currencyorderby == 'asc');
    }
    get isNotCurrency(){
        // !v.selectedSort != 'currency'
        return (this.selectedsort != 'currency');
    }
    */
   /*
    get isValueDateDesc(){
        // !and(v.selectedSort == 'valueDate', v.valueDateOrderBy == 'desc')
        return (this.selectedsort == 'valueDate' && this.valuedateorderby == 'desc');
    }
    get isValueDateAsc(){
        // !and(v.selectedSort == 'valueDate', v.valueDateOrderBy == 'asc')
        return (this.selectedsort == 'valueDate' && this.valuedateorderby == 'asc');
    }
    get isNotValueDate(){
        // !v.selectedSort != 'valueDate'
        return (this.selectedsort != 'valueDate');
    }
    */
    get isSearchedStringNotEmpty(){
        return (this.searchedstring ?  this.label.PAY_noResultsWithSearchTerm : this.label.PAY_noResultsWithFilters);
    }  

    get isNotLastPage(){
         return (this.currentpage != this.pagesnumbers.length);
    } 
    get isNotFirstPage(){
        return (this.currentpage != 1);
    }
    get selectedValueLEpaymentsNumber(){
         return (this.selectedvalue <= this.paymentsnumber);
     }
    get paymentsNumberGTvaluesZero(){
         return (this.paymentsnumber > this.values[0]);
    } 
    get oneRowAndActions(){
         return (this.selectedrows.length == 1 && this.hasactions);
    }  

    connectedCallback(event){
        loadStyle(this, santanderStyle + '/style.css');
        this.calculateCSSclass();
        this.isloading = true;
        var params = event.getParam("arguments");
        if(params){
            if(params.paymentList != "[]" && params.paymentList != null && params.paymentList != undefined){
                let paymentList = params.paymentList;
                for (let i = 0; i<paymentList.length;  i++) {
                    let payment = paymentList[i];
                    payment.checked = false;
                    payment.sourceAccountEncripted = this.encryptAccountNumber(payment.sourceAccount);
                    payment.beneficiaryAccountEncripted = this.encryptAccountNumber(payment.beneficiaryAccount);

                }
                this.paymentlist = paymentList;
            }else{
                this.paymentlist = [];
            }
           
        }
        this.selectedrows = [];
        this.singleselectedpayment = {};
        this.actions = {};

        /// REVISAR 
        var aux = this.setPaginations();
        /*var aux = helper.setPaginations(component, event, helper); 
        aux.catch(function (error) {
            console.log('error');
        }).finally($A.getCallback(function() {
            this.isloading = false;

        }));*/
        aux.catch(function (error) {
            console.log('error');
        }).finally((function() {
            this.isloading = false;

        }));
    }

    calculateCSSclass(){
        // Replace 3 html template if 
        if (this.selectedsort == 'clientReference' && this.clientreferenceorderby  == 'desc'){
            this.clientreferenceclass = 'orderActive slds-truncate';
        }else if(this.selectedsort == 'clientReference' && this.clientreferenceorderby  == 'asc'){
            this.clientreferenceclass =  'orderActive orderReverse slds-truncate';
        }else if (this.selectedsort != 'clientReference'){
            this.clientreferenceclass = 'slds-truncate';
        }

        if (this.selectedsort == 'status' && this.statusorderby == 'desc'){
            this.statusclass = 'orderActive slds-truncate';
        }else if (this.selectedsort == 'status' && this.statusorderby == 'asc') {
            this.statusclass = 'orderActive orderReverse slds-truncate';
        }else if (this.selectedsort != 'status'){
            this.statusclass = 'slds-truncate';
        }

        if (this.selectedsort == 'sourceAccount' && this.sourceaccountorderby == 'desc'){
            this.sourceaccountclass = 'orderActive slds-truncate';
        }else if (this.selectedsort == 'sourceAccount' && this.sourceaccountorderby == 'asc') {
            this.sourceaccountclass = 'orderActive orderReverse slds-truncate';
        }else if (this.selectedsort != 'sourceAccount'){
            this.sourceaccountclass = 'slds-truncate';
        }

        if (this.selectedsort == 'beneficiaryAccount' && this.beneficiaryaccountorderby == 'desc'){
            this.beneficiaryaccountclass = 'orderActive slds-truncate';
        }else if (this.selectedsort == 'beneficiaryAccount' && this.beneficiaryaccountorderby == 'asc') {
            this.beneficiaryaccountclass = 'orderActive orderReverse slds-truncate';
        }else if (this.selectedsort != 'beneficiaryAccount'){
            this.beneficiaryaccountclass = 'slds-truncate';
        }

        if (this.selectedsort == 'amount' && this.amountorderby == 'desc'){
            this.amountclass = 'orderActive slds-truncate';
        }else if (this.selectedsort == 'amount' && this.amountorderby == 'asc') {
            this.amountclass = 'orderActive orderReverse slds-truncate';
        }else if (this.selectedsort != 'amount'){
            this.amountclass = 'slds-truncate';
        }

        if (this.selectedsort == 'currency' && this.currencyorderby == 'desc'){
            this.currencyclass = 'orderActive slds-truncate';
        }else if (this.selectedsort == 'currency' && this.currencyorderby == 'asc') {
            this.currencyclass = 'orderActive orderReverse slds-truncate';
        }else if (this.selectedsort != 'currency'){
            this.currencyclass = 'slds-truncate';
        }

        if (this.selectedsort == 'valueDate' && this.valuedateorderby == 'desc'){
            this.valuedateclass = 'orderActive';
        }else if (this.selectedsort == 'valueDate' && this.valuedateorderby == 'asc') {
            this.valuedateclass = 'orderActive orderReverse';
        }else if (this.selectedsort != 'valueDate'){
            this.valuedateclass = '';
        }

    }

    encryptAccountNumber(accountNumber){
        var res = '';
        if(accountNumber){
            var first = accountNumber.substring(0,4) + '****' ; 
            var second = accountNumber.substring(accountNumber.length - 8);
            var secondWithBlack = second.substring(0,4)  +  ' ' + second.substring(4);
            res = first + secondWithBlack ;
        }else{
            res = '';
        }
        return res;

    }

    setPaginations() {
        return new Promise(function (resolve, reject) {
            var paginationsList = this.values;
            var itemsXpage = this.selectedvalue;
            let selectAll = this.selectall;
            if (itemsXpage == null || itemsXpage == undefined) {
                itemsXpage = paginationsList[0];
                this.selectedvalue = itemsXpage;
            }
            var items = this.paymentList;
            if(items != null && items != undefined){
                var numberItems = items.length;
                var numberPages = Math.ceil(numberItems / itemsXpage);
                var lastItemPage = 0;
                var pagesList = [];
                var listItems = [];
                var checked = false;
                for (let i = 0; i < numberPages; i++) {
                    pagesList.push(i + 1);
                    selectAll.push(checked);
                }
                for (let i = 0; i < itemsXpage; i++) {
                    if (numberItems > i) {
                        listItems.push(items[i]);
                        lastItemPage++;
                    }
                }
                
                this.paymentsnumber = numberItems;
                this.finalitem =  lastItemPage;
                this.firstitem = 1;
                this.pagesnumbers = pagesList;
                this.paginationlist = listItems;
                this.currentpage = 1;
                this.selectall = selectAll;
            }

            resolve('Ok');
        }.bind(this)); 
        
    }

    changePagination() {
        this.setPaginations();
    }

    changePage() {
        this.selectPage();
    }

    selectPage() {
        var selectedPage = this.currentpage;
        var items = this.paymentlist;
        var itemsXpage = this.selectedvalue;
        var firstItem = (parseInt(selectedPage) - 1) * parseInt(itemsXpage);
        var finalItem = parseInt(firstItem)  + parseInt(itemsXpage);
        var listItems = [];
        var count = 0;
        for (let i = firstItem; i < parseInt(firstItem) + parseInt(itemsXpage); i++) {
            if (items.length > i) {
                listItems.push(items[i]);
                count++;
            }
        }
        this.firstitem = firstItem + 1;
        this.finalitem = finalItem;
        this.paginationlist = listItems;
        var index = selectedPage - 1;
        var selectAll = this.selectall;
        var thisPageSelected = selectAll[index];
        if (thisPageSelected != undefined && thisPageSelected != null) {
            this.isallselected = thisPageSelected;
            var selectAllCheckbox = this.template.querySelector('#selectAllPayments');//document.getElementById('selectAllPayments');
            if(selectAllCheckbox != null && selectAllCheckbox != undefined){
                selectAllCheckbox.checked = thisPageSelected;
            }
        }  
    }

    handlePreviousPage() {
        var currentPage = this.currentpage;
        var prevPage = parseInt(currentPage) - 1;
        this.currentpage = prevPage;
    }

    handleNextPage() {
        var currentPage = this.currentpage;
        var nextPage = parseInt(currentPage) +1;
        this.currentpage = nextPage;
    }

    sortBy(event) {
        var columnId = event.target.id;
        if(columnId == null || columnId == '' || columnId == undefined){
            if (event.target.parentNode&&event.target.parentNode.id){
                let parentId = event.target.parentNode.id;
                if(parentId != null && parentId != '' && parentId != undefined){
                    columnId = parentId;
                }
            }
        }
        if(columnId != null && columnId != '' && columnId != undefined){
            var sorted = this.sortByColumnId(columnId);
            if(sorted != null && sorted != undefined){
                this.paymentlist = sorted;
                //var orderBy = component.get('v.'+columnId+'OrderBy');
    
                var orderBy = this.getOrderByName(columnId);

                var oldSelectedSort = this.selectedsort;
                if(oldSelectedSort == columnId){
                    if(orderBy == 'asc'){
                        
                        this.orderByDesc(columnId);
                        this.calculateCSSclass();
                        //component.set('v.'+columnId+'OrderBy', 'desc');
                    }else{
                        //component.set('v.'+columnId+'OrderBy', 'asc');
                        this.orderByAsc(columnId);
                        this.calculateCSSclass();
                    }
                }
                else{
                    if(oldSelectedSort != null && oldSelectedSort != '' && oldSelectedSort != undefined){
                        //component.set('v.'+oldSelectedSort+'OrderBy', 'desc');
                        this.orderByDesc(oldSelectedSort);
                        this.calculateCSSclass();
                    }
                    //component.set('v.selectedSort', columnId);
                    this.selectedsort = columnId;
                    if(orderBy == 'asc'){
                        //component.set('v.'+columnId+'OrderBy', 'desc');
                        this.orderByAsc(columnId);
                        this.calculateCSSclass();
                    }else{
                        //component.set('v.'+columnId+'OrderBy', 'asc');
                        this.orderByDesc(columnId);
                        this.calculateCSSclass();
                    }
                }   
                
                this.selectPage();
                this.selectAll(false);
            }
        }
    }

    getOrderByName(columnId){
        var orderBy;

        if(columnId == clientreference){
            orderBy = this.clientreferenceorderby;
        }else if(columnId == status){
            orderBy = this.statusorderby;
        }else if(columnId == sourceaccount ){
            orderBy = this.sourceaccountorderby;
        }else if(columnId == beneficiaryaccount){
            orderBy = this.beneficiaryaccountorderby;
        }else if(columnId == amount){
            orderBy = this.amountorderby;
        }else if(columnId == beneficiaryaccount){
            orderBy = this.beneficiaryaccountorderby;
        }else if(columnId == currency){
            orderBy = this.currencyorderby;
        }

        return orderBy;
    }

    orderByDesc(columnId){

        if(columnId == clientreference){
            this.clientreferenceorderby = 'desc';
        }else if(columnId == status){
            this.statusorderby = 'desc';
        }else if(columnId == sourceaccount ){
            this.sourceaccountorderby = 'desc';
        }else if(columnId == beneficiaryaccount){
            this.beneficiaryaccountorderby = 'desc';
        }else if(columnId == amount){
            this.amountorderby = 'desc';
        }else if(columnId == beneficiaryaccount){
            this.beneficiaryaccountorderby = 'desc';
        }else if(columnId == currency){
            this.currencyorderby = 'desc';
        }

    }

    orderByAsc(columnId){
        if(columnId == clientreference){
            this.clientreferenceorderby = 'asc';
        }else if(columnId == status){
            this.statusorderby = 'asc';
        }else if(columnId == sourceaccount ){
            this.sourceaccountorderby = 'asc';
        }else if(columnId == beneficiaryaccount){
            this.beneficiaryaccountorderby = 'asc';
        }else if(columnId == amount){
            this.amountorderby = 'asc';
        }else if(columnId == beneficiaryaccount){
            this.beneficiaryaccountorderby = 'asc';
        }else if(columnId == currency){
            this.currencyorderby = 'asc';
        }
    }

    sortByColumnId(sortBy) {
		var sort;
        //var orderBy = component.get('v.'+sortBy+'OrderBy');
        var orderBy = this.getOrderByName(sortBy);
        if(orderBy != null && orderBy != '' && orderBy != undefined){
            var data = this.paymentlist;
            // var data = component.get('v.filteredPaymentList');
            if(orderBy == 'desc'){
                if(sortBy == 'clientReference'){                   
                    sort = data.sort((a,b) => (a.clientReference > b.clientReference) ? 1 : ((b.clientReference > a.clientReference) ? -1 : 0));
                }else if(sortBy == 'status'){
                    sort = data.sort((a,b) => (a.parsedPaymentStatus > b.parsedPaymentStatus) ? 1 : ((b.parsedPaymentStatus > a.parsedPaymentStatus) ? -1 : 0));
                }else if(sortBy == 'sourceAccount'){
                    sort = data.sort((a,b) => (a.sourceAccount > b.sourceAccount) ? 1 : ((b.sourceAccount > a.sourceAccount) ? -1 : 0));
                }else if(sortBy == 'beneficiaryAccount'){
                    sort = data.sort((a,b) => (a.beneficiaryAccount > b.beneficiaryAccount) ? 1 : ((b.beneficiaryAccount > a.beneficiaryAccount) ? -1 : 0));
                }else if(sortBy == 'amount'){                    
                    sort = data.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
                }else if(sortBy == 'currency'){
                    sort = data.sort((a,b) => (a.paymentCurrency > b.paymentCurrency) ? 1 : ((b.paymentCurrency > a.paymentCurrency) ? -1 : 0));
                }else if(sortBy == 'valueDate'){
                    sort = data.sort((a, b) => new Date(a.valueDate) - new Date(b.valueDate));
                }
                
            }else{
                if(sortBy == 'clientReference'){
                    sort = data.sort((a,b) => (a.clientReference < b.clientReference) ? 1 : ((b.clientReference < a.clientReference) ? -1 : 0));
                }else if(sortBy == 'status'){
                    sort = data.sort((a,b) => (a.parsedPaymentStatus < b.parsedPaymentStatus) ? 1 : ((b.parsedPaymentStatus < a.parsedPaymentStatus) ? -1 : 0));
                }else if(sortBy == 'sourceAccount'){
                    sort = data.sort((a,b) => (a.sourceAccount < b.sourceAccount) ? 1 : ((b.sourceAccount < a.sourceAccount) ? -1 : 0));
                }else if(sortBy == 'beneficiaryAccount'){
                    sort = data.sort((a,b) => (a.beneficiaryAccount < b.beneficiaryAccount) ? 1 : ((b.beneficiaryAccount < a.beneficiaryAccount) ? -1 : 0));
                }else if(sortBy == 'amount'){                    
                    sort = data.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
                }else if(sortBy == 'currency'){
                    sort = data.sort((a,b) => (a.paymentCurrency < b.paymentCurrency) ? 1 : ((b.paymentCurrency < a.paymentCurrency) ? -1 : 0));
                }else if(sortBy == 'valueDate'){                    
                     sort = data.sort((a, b) => new Date(b.valueDate) - new Date(a.valueDate));
                }
            }
            
        }
        return sort;
    }
    
    selectAll(checked){
        var currentPage = this.currentpage;
        var selectAll = this.selectall;
        if(checked){
            this.isallselected = true;           
            selectAll[currentPage-1] = true;    
        }else{
            this.isallselected = false;
            selectAll[currentPage-1] = false;
        }
        
        var paginationList = this.paginationlist;
        if(paginationList.length > 0){
            for(let i=0; i<paginationList.length;i++){
                var item = paginationList[i].paymentId;
                //var row = document.getElementById(item);
                var row = this.template.querySelector('#'+item);
                if(row != null && row != undefined){
                    row.checked = this.isallselected; 
                    this.selectRow(item, row.checked); 
                }

            }
        }
    }

    selectRow(item, checked){
        let selectedRows = this.selectedrows;
        this.singleselectedpayment = {};
        this.actions = {};
        this.signatorystatus = {};
        this.hasactions = false;

        if(item != '' && item != null && item != undefined){
            //var element = document.getElementById('ROW_'+item);
            var element = this.template.querySelector('#ROW_'+item);
            let paymentList = this.paymentlist;
            console.log(this.paymentlist);
            let paymentIndex = paymentList.findIndex(payment => payment.paymentId == item);
            if(element != null && element != undefined){
                if(checked){
                    paymentList[paymentIndex].checked = true;
                    element.classList.add('selected');
                    if(!selectedRows.includes(item)){
                        selectedRows.push(item);
                    }
                    if (selectedRows.length == 1) {
                        let selectedId = selectedRows[0];
                        let payment = paymentList.find(payment => payment.paymentId == selectedId)
                        this.singleselectedpayment = payment;
                        this.setActions();
                                            } 
                }else{
                    paymentList[paymentIndex].checked = false;
                    element.classList.remove('selected');
                    if(selectedRows.includes(item)){
                        let itemIndex = selectedRows.indexOf(item);
                        selectedRows.splice(itemIndex, 1);
                    }
                    if (selectedRows.length == 1) {
                        let selectedId = selectedRows[0];
                        let paymentList = this.paymentlist;
                        let payment = paymentList.find(payment => payment.paymentId == selectedId)
                        this.singleselectedpayment = payment;
                        this.setActions();
                    } 
                }
                
                this.paymentlist = paymentList;    
            } else {

            }
        }
        this.selectedrows = selectedRows;
    }

    setActions() {
        let paymentDetails =this.singleselectedpayment;
        let currentUser = this.currentuser;
        Promise.all([
            this.getSignatoryStatus(paymentDetails.paymentId) 
        ]).then((function (value) { 
            return this.configureButtons(paymentDetails, currentUser);
        }), this).catch(function (error) {
            console.log('error');
        }).finally((function() {
            let actions = this.actions;
            if (actions != undefined && actions != null) {
                if (actions.edit == true ||
                    actions.discard == true ||
                    actions.reuse == true ||
                    actions.addToTemplate == true ||
                    actions.trySaveAgain == true ||
                    actions.authorize == true ||
                    actions.reject == true ||
                    actions.sendToReview == true ||
                    actions.gpiTracker == true
                   || actions.cancel == true) {
                        this.hasactions = true;
                    } else {
                        this.hasactions = false;
                    }
            } else {
                this.hasactions = false;
            }
        }));
    }

    getSignatoryStatus(paymentId) {
        return new Promise(function (resolve, reject) {
            getSignatoryStatus({ 
                "paymentId" : paymentId 
            })
            .then(actionResult => {
                if(actionResult){
                    this.signatorystatus = actionResult;
                    console.log('sig status: ', JSON.stringify(actionResult));
                    resolve('La ejecucion ha sido correcta.');
                }
            })
            .catch(error => {
                console.log('### lwc_paymentsLandingTable ### getSignatoryStatus() ::: Catch Error: ' + JSON.stringify(error));
                reject(this.label.ERROR_NOT_RETRIEVED);
            }); 
        }.bind(this));        
    }

    configureButtons(paymentDetails, currentUser) {
        try {
    
            let status = paymentDetails.paymentStatus;
    
            let reason = ''
            if (paymentDetails.paymentReason != undefined && paymentDetails.paymentReason != null) {
                reason = paymentDetails.paymentReason;
            }
    
            let currentUserGlobalId = currentUser.globalId;
    
            let creatorUserId = '';
            if (paymentDetails.userGlobalId != undefined && paymentDetails.userGlobalId != null) {
                creatorUserId = paymentDetails.userGlobalId;
            }
    
            let signatory = false;
            let signatoryStatus = this.signatorystatus;
            if (signatoryStatus != null) {
                if (signatoryStatus.signatory == "true" && signatoryStatus.signed == "false") {
                    signatory = true;
                }
            }
            let isCreator = false;
            if (currentUserGlobalId == creatorUserId) {
                isCreator = true;
            }
    
            let actions = {
                    'edit': false,
                    'discard': false,
                    'reuse': false,
                    'addToTemplate': false,
                    'trySaveAgain': false, //saveForLater
                    'authorize': false,
                    'reject': false,
                    'sendToReview': false,
                    'gpiTracker': false,
                    'cancel':false
                }
            if (status == '001' || status == 'Draft') {
                if (reason == '000') {
                    actions.edit = isCreator;
                    actions.discard = isCreator;
                } else if (reason == '001') {
                    actions.discard = isCreator;
                    actons.trySaveAgain = isCreator;
                } else if (reason == '002') {
                    actions.discard = isCreator;
                    actons.trySaveAgain = isCreator;
                    actions.edit = isCreator;
                }
            }
            if (status == '002' || status == 'Pending') {
                if (reason == '001') {
                    actions.edit = isCreator;
                    actions.cancel = isCreator;
                    actions.authorize = signatory;
                    actions.reject = signatory;
                    actions.sendToReview = signatory;           
                } else if (reason == '002') {
                    actions.cancel = isCreator;
                    actions.authorize = signatory;
                    actions.reject = signatory;
                    actions.sendToReview = signatory;
                }
            }
            if (status == '003' || status == 'In review') {
                if (reason == '001') {
                    actions.cancel = isCreator;
                    actions.edit = isCreator;           
                }
            }
            if (status == '101' || status == 'Authorized') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '102' || status == 'Processed') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '103' || status == 'Completed') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                    actions.gpiTracker = (isCreator || signatory);
                }
            }
            if (status == '201' || status == 'Scheduled') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '202' || status == 'Released') {
                if (reason == '001') {
                    actions.gpiTracker = (isCreator || signatory);
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                } else if (reason == '002') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '800' || status == 'On hold') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '801' || status == 'Delayed') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                }
            }
            if (status == '997' || status == 'Not authorized') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                }
            }
            if (status == '998' || status == 'Canceled') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                } else if (reason == '002') {
                    actions.reuse = isCreator;
                } else if (reason == '003') {
                    actions.reuse = isCreator;
                }
            }
            if (status == '999' || status == 'Rejected') {
                if (reason == '001') {
                    actions.reuse = isCreator;
                } else if (reason == '002') {
                    actions.reuse = isCreator;
                    actions.addToTemplate = isCreator;
                } else if (reason == '003') {
                    actions.reuse = isCreator;
                } else if (reason == '004') {
                    //no tiene acciones
                }
            }
            this.actions = actions;
        } catch (e) {
            console.log(e);
        }
    }

    handleSelectedRow(event) {
        var item = event.currentTarget.id;
        var checked = event.target.checked;
        console.log('item in handleSelectedRow: ', item )
   		this.selectRow(item, checked);
    }

    handleSelectAll(event) {
        var checked = event.target.checked;
		this.selectAll(checked);
       
    }

    handleClearSelection(event) {
        this.uncheckSelected();
    }

    uncheckSelected(){
        this.isallselected = false;
        //var selectAllCheckbox = document.getElementById('selectAllPayments');
        var selectAllCheckbox = this.template.querySelector('#selectAllPayments');
        if(selectAllCheckbox != null && selectAllCheckbox != undefined){
            selectAllCheckbox.checked = false;
        }
        this.selectAll(false);
    }

    handleClickRow(event) {
        var page = this.detailspage;
        var payment = event.currentTarget.parentElement.id;

        if (payment != null && payment != undefined && payment != '') {
            if (payment.includes("_")) {
                var paymentAux = payment.split("_");
                var paymentID = paymentAux[1];
                var url = 
                "c__currentUser="+JSON.stringify(this.currentuser)
                +"&c__paymentID="+paymentID;
        
                this.goTo(page, url);
            }  
        }
    }

    goTo(page, url){
        try{
            if(url!=''){ 
                this.encrypt(url)
                    .then((result) => {
                        console.log('lwc_paymentsLandingTable encrypt result: ',result);
                        this[NavigationMixin.Navigate]({
                            type: "comm__namedPage", 
                            attributes: {
                                pageName: this.detailspage
                            },
                            state: {
                                params : result
                            }
                        });
                    })
            }else{
                console.log('pagename: ', this.detailspage);

                this[NavigationMixin.Navigate]({
                    type: "comm__namedPage", 
                    attributes: {
                        pageName: this.detailspage
                    },
                    state: {
                        params : ''
                    }
                });

            }
        }catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    encrypt (data){
        try{
            var result="null";
            return new Promise(function (resolve, reject) {
                encryptData({str : data})
                .then((value) => {
                    result = value;
                    resolve(result);
                    })
                    .catch((error) => {
                    console.log(error); // TestError
                    reject(error);
                    })
            });
        } catch (e) { 
            console.log(e);
        }   
    }


}