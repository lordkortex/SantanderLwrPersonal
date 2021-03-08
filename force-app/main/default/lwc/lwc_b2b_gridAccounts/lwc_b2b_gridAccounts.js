import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import B2B_Grid_Allmyaccounts from '@salesforce/label/c.B2B_Grid_Allmyaccounts';
import B2B_No_results from '@salesforce/label/c.B2B_No_results';
import CheckSpellingSearch from '@salesforce/label/c.CheckSpellingSearch';
import B2B_NoAccountsFound from '@salesforce/label/c.B2B_NoAccountsFound';
import PAY_checkFilters from '@salesforce/label/c.PAY_checkFilters';
import Displaying from '@salesforce/label/c.Displaying';
import PAY_payments from '@salesforce/label/c.PAY_payments';
import PAY_accordingTo from '@salesforce/label/c.PAY_accordingTo';
import PAY_selectedFilters from '@salesforce/label/c.PAY_selectedFilters';
import Show_More from '@salesforce/label/c.Show_More';
import B2B_Items_displayed from '@salesforce/label/c.B2B_Items_displayed';
import B2B_PREV from '@salesforce/label/c.B2B_PREV';
import B2B_NEXT from '@salesforce/label/c.B2B_NEXT';
import of from '@salesforce/label/c.of';
import toMinus from '@salesforce/label/c.toMinus';
import B2B_Items from '@salesforce/label/c.B2B_Items';

export default class Lwc_b2b_grid_accounts extends LightningElement {

    Label = {
        B2B_Grid_Allmyaccounts,
        B2B_No_results,
        CheckSpellingSearch,
        B2B_NoAccountsFound,
        PAY_checkFilters,
        Displaying,
        PAY_payments,
        PAY_accordingTo,
        PAY_selectedFilters,
        B2B_Grid_Allmyaccounts,
        Show_More,
        B2B_Items_displayed,
        B2B_PREV,
        B2B_NEXT,
        of,
        toMinus,
        B2B_Items
    }

    @api accountsfiltered = [];
    @api userdata;
    @api resetsearch = false;
    @api filters = [];

    @track selectedValue;
    @track paginationList;
    @track accountsNumber;
    @track firstItem = "1";
    @track finalItem;
    @track pagesNumbers;
    @track values = ['9','30','60'];
    @track currentPage;
    @track selected = false;
    @track beneficiarydetails = false;
    
    @track _accountsfiltered;
    
    get accountsfiltered(){
        return this._accountsfiltered;
    }

    set accountsfiltered(accountsfiltered){
        this._accountsfiltered = accountsfiltered;
        if(accountsfiltered.length > 0){
            this.setPaginations();
        }
    }


    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.init();
    }

    init() {
        this.setPaginations();
    }

    get filtersNotZero(){
        return this.filters.length != 0;
    }
    get accountsNumberGTValues(){
        return this.accountsNumber > this.values[0];
    }
    get selectedValueLEAccounts(){
        return this.selectedValue <= this.accountsNumber;
    }
    get firstItemLabel(){
        return this.firstItem + ' ' + this.Label.toMinus;
    }
    get finalItemLabel(){
        return ' ' + this.finalItem + ' ' + this.Label.of;
    }
    get accountsNumberLabel(){
        return  this.accountsNumber + ' ' + this.Label.B2B_Items;
    }
    get currentPageNotOne(){
        return this.currentPage != 1;
    }
    get currentPageNotLength(){
        return this.currentPage != this.pagesNumbers.length;
    }



    handlePreviousPage() {
        var currentPage = this.currentPage;
        if (currentPage > 1) {
            this.previousPage();
        }
    }

    handleNextPage() {
        var currentPage = this.currentPage;
        var pages = this.pagesNumbers;
        var lastPage = pages[pages.length - 1];
        if (currentPage < lastPage) {
            this.nextPage();
        }
    }

    changePagination(event) {
        if(event.detail){
            this.selectedValue = event.detail.pagination;
        }
        this.setPaginations();
    }

    changePage() {
        this.selectPage();
    }

    setPaginations() {
        var paginationsList = this.values;
        var itemsXpage = this.selectedValue;
        if (!itemsXpage) {
            itemsXpage = paginationsList[0];
            this.selectedValue = itemsXpage;
        }

        //this.accountsfiltered = [{subsidiaryName: "Hola"}];

        var items = this._accountsfiltered;
        var numberItems = items.length;
        var numberPages = Math.ceil(numberItems / itemsXpage);
        var lastItemPage = 0;
        var pagesList = [];
        var listItems = [];
        for (let i = 0; i < numberPages; i++) {
            pagesList.push(i + 1);
        }
        for (let i = 0; i < itemsXpage; i++) {
            if (numberItems > i) {
                listItems.push(items[i]);
                lastItemPage++;
            }
        }
        this.accountsNumber = numberItems;
        this.finalItem = lastItemPage;
        this.firstItem = 1;
        this.pagesNumbers = pagesList;
        this.paginationList = listItems;
        this.currentPage = 1;
    }

    nextPage() {
        var itemsXpage = this.selectedValue;
        var items = this._accountsfiltered;
        var finalItem = this.finalItem;
        var firstItem = finalItem + 1;
        var currentPage = this.currentPage;
        var listItems = [];
        var count = 0;
        for (let i = finalItem; i < parseInt(finalItem) + parseInt(itemsXpage); i++) {
            if (items.length > i) {
                listItems.push(items[i]);
                count++;
            }
        }
        this.currentPage = currentPage + 1;
        this.firstItem = firstItem;
        this.finalItem = finalItem + count;
        this.paginationList = listItems;
    }

    previousPage() {
        var itemsXpage = this.selectedValue;
        var items = this._accountsfiltered;
        var firstItem = this.firstItem;
        var finalItem = firstItem - 1;
        var currentPage = this.currentPage;
        var listItems = [];
        for (let i = parseInt(finalItem) - parseInt(itemsXpage); i < firstItem - 1; i++) {
            listItems.push(items[i]);
        }
        this.currentPage = currentPage - 1;
        this.firstItem = parseInt(finalItem) - parseInt(itemsXpage) + 1;
        this.finalItem = finalItem;
        this.paginationList = listItems;
    }

    selectPage() {
        var selectedPage = this.currentPage;
        var items = this._accountsfiltered;
        var itemsXpage = this.selectedValue;
        var firstItem = (selectedPage - 1) * itemsXpage;
        var finalItem = firstItem;
        var listItems = [];
        var count = 0;
        for (let i = firstItem; i < parseInt(finalItem) + parseInt(itemsXpage); i++) {
            if (items.length > i) {
                listItems.push(items[i]);
                count++;
            }
        }
        this.firstItem = firstItem + 1;
        this.finalItem = finalItem + count;
        this.paginationList = listItems;
    }

    handleSelectedCard(event){
        const selectedcardevent = new CustomEvent('selectedcard', {detail : event.detail});
        this.dispatchEvent(selectedcardevent);
    }

    handleSelectedAccount(event){
        const selectedaccountevent = new CustomEvent('selectedaccount', {detail : event.detail});
        this.dispatchEvent(selectedaccountevent);
    }
}