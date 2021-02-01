import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';

import clear from '@salesforce/label/c.clear';
import filterBy from '@salesforce/label/c.filterBy';
import search from '@salesforce/label/c.search';
import B2B_Country from '@salesforce/label/c.B2B_Country';
import B2B_Corporates from '@salesforce/label/c.B2B_Corporates';
import B2B_Currency from '@salesforce/label/c.B2B_Currency';


export default class Lwc_b2b_filterAccounts extends LightningElement {


    @api accountlist = "[]";
    @api accountsfiltered = "[]";
    @api numberformat = '###,###,###.##';
    @api resetsearch = "false";
    @api filters = "[]";

    @track minimumBalance = "";
    @track maximumBalance = "";
    @track corporates = "[]";
    @track corporatesSelected = "[]";
    @track countries = "[]";
    @track countriesSelected = "[]";
    @track currencies = "[]";
    @track currenciesSelected = "[]";
    @track searchedString = "";
    

    Label = {
        clear,
        search,
        filterBy,
        B2B_Country,
        B2B_Corporates,
        B2B_Currency
    }


    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.init();
    }


    init() {
        let accountlist = this.accountlist;
        this.accountsfiltered = accountlist;
        this.setListFilters();
    }

    get inputClass() {
        return 'slds-input' + (!this.searchedString ? ' filledInput' : '') ;
    }

    handleFilter(event) {
        var eventDropdown = event.getParam('showDropdown');
        var eventName = event.getParam('name');
        var eventAction = event.getParam('action');
        if (eventAction) {
            this.applyFilters(eventAction);
        }
        if (eventDropdown) {
            let filters = component.find('filter');
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].get('v.name') == eventName) {
                    filters[i].set('v.showDropdown', true);
                } else {
                    filters[i].set('v.showDropdown', false);
                }
            }
        }
    }

    handleInputSearch(event) {
        let inputValue = event.target.value;
        let searchedString = this.searchedString;
        if (searchedString == null || searchedString == undefined) {
            searchedString = '';
        }
        if (inputValue) {
            this.searchedString = inputValue;
            if (inputValue.length >= 4) {
                if (inputValue.length > searchedString.length) {
                    this.applyFilters( 'apply');
                } else {
                    this.applyFilters( 'clear');
                }
            } else if (inputValue.length == 3 && searchedString.length == 4) {
                this.applyFilters( 'clear');
            }
        } else {
            this.searchedString = '';
            this.applyFilters( 'clear');
        }
    }

    handleClearInput() {
        this.searchedString = '';
        this.applyFilters('clear');
    }
   
    handleResetsearch(){
        console.log("Shahad estas aqui");
        var clear = this.resetsearch;
        if(clear){
			this.resetSearch();
        }

    }

    applyFilters(action) {
        new Promise((resolve, reject) => {
            console.log('Iniciar filtrado.');
            resolve('Ok');
        }).then((value) => {
            return this.getFilters();
        }).then((value) => {
            
                return this.filterAccounts(this.accountlist, value);
            
        }).then((value) => {
            return this.setListFilters();
        }).catch((error) => {
            console.log('Ha ocurrido un error.');
        }).finally(() => {
            console.log('Finalizar filtrado.');
        });
    }

    getFilters() {
        return new Promise(function (resolve, reject) {
            let filters = {
                filtersRequired: 0
            };
            let corporatesSelected = this.corporatesSelected;
            if (corporatesSelected) {
                filters['corporatesSelected'] = corporatesSelected;
                filters['filtersRequired']++;
            }
            let currenciesSelected = this.currenciesSelected;
            if (currenciesSelected) {
                filters['currenciesSelected'] = currenciesSelected;
                filters['filtersRequired']++;
            }
            let countriesSelected = this.countriesSelected;
            if (countriesSelected) {
                filters['countriesSelected'] = countriesSelected;
                filters['filtersRequired']++;
            }
            let minimumBalance = this.minimumBalance;
            if (minimumBalance) {
                filters['minimumBalance'] = minimumBalance;
                filters['filtersRequired']++;
            }
            let maximumBalance = this.maximumBalance;
            if (maximumBalance) {
                filters['maximumBalance'] = maximumBalance;
                filters['filtersRequired']++;
            }
            let searchedString = this.searchedString;
            if (searchedString && searchedString.length >= 4) {
                filters['searchedString'] = searchedString;
                filters['filtersRequired']++;
            }
            component.set("v.filters",filters);
            resolve(filters);
        }, this);
    }

    filterAccounts(accountlist, filters) {
        return new Promise((resolve, reject) => {
            let accountsfiltered = [];
            if (filters) {
                
                for (let i = 0; i < accountlist.length; i++) {
                    let passedFilter = 0;
                    let corporatesSelected = filters.corporatesSelected;
                    let subsidiaryName = accountlist[i].subsidiaryName;
                    if (corporatesSelected && subsidiaryName) {
                        if (corporatesSelected.includes(subsidiaryName)) {
                            passedFilter++;
                        }
                    }
                    let currenciesSelected = filters.currenciesSelected;
                    let currency = accountlist[i].currencyCodeAvailableBalance;
                    if (currenciesSelected && currency) {
                        if (currenciesSelected.includes(currency)) {
                            passedFilter++;
                        }
                    }
                    let countriesSelected = filters.countriesSelected;
                    let country = accountlist[i].country;
                    if (countriesSelected && country) {
                        if (countriesSelected.includes(country)) {
                            passedFilter++;
                        }
                    }
                    let minimumBalance = filters.minimumBalance;
                    let maximumBalance = filters.maximumBalance;
                    let amountAvailableBalance = accountlist[i].amountAvailableBalance;
                    if ((minimumBalance || maximumBalance) && amountAvailableBalance) {
                        if (minimumBalance && maximumBalance) {
                            minimumBalance = parseInt(minimumBalance, 10);
                            maximumBalance = parseInt(maximumBalance, 10);
                            amountAvailableBalance = parseInt(amountAvailableBalance, 10);
                            if (amountAvailableBalance >= minimumBalance && amountAvailableBalance <= maximumBalance) {
                                passedFilter+=2;
                            }
                        } else if (minimumBalance) {
                            minimumBalance = parseInt(minimumBalance, 10);
                            amountAvailableBalance = parseInt(amountAvailableBalance, 10);
                            if (amountAvailableBalance >= minimumBalance) {
                                passedFilter++;
                            }
                        } else if (maximumBalance) {
                            maximumBalance = parseInt(maximumBalance, 10);
                            amountAvailableBalance = parseInt(amountAvailableBalance, 10);
                            if (amountAvailableBalance <= maximumBalance) {
                                passedFilter++;
                            }
                        }
                    }
                    let searchedString = filters.searchedString;
                    if (searchedString) {
                        searchedString = searchedString.toLowerCase();
                        let hasString = false;
                        // Filter by IBAN
                        let displayNumber = accountlist[i].displayNumber;
                        if (displayNumber) {
                            if (displayNumber.includes(searchedString)) {
                                hasString = true;
                            }
                        }
                        // Filter by Alias
                        let alias = accountlist[i].alias;
                        if (alias) {
                            alias = alias.toLowerCase();
                            if (alias.includes(searchedString)) {
                                hasString = true;
                            }
                        }
                        if (hasString == true) {
                            passedFilter++;
                        }
                    }
                    console.log(accountlist[i].amountAvailableBalance);
                    console.log(filters.filtersRequired);
                    console.log(passedFilter);
                    if (filters.filtersRequired == passedFilter) {
                        accountsfiltered.push(accountlist[i]);
                    }
                }
            } else {
                accountsfiltered = accountlist;
            }
            this.accountsfiltered = accountsfiltered;
            resolve(accountsfiltered);
        });
    }

    /* filterAccountsBySearch( searchString) {
        let accountsfiltered = this.accountsfiltered');
        if (searchString) && searchString.length >= 4) {
            searchString = searchString.toLowerCase();
            let filteredByString = [];
            for (let i = 0; i < accountsfiltered.length; i++) {
                let hasString = false;
                // Filter by IBAN
                let displayNumber = accountsfiltered[i].displayNumber;
                if (displayNumber)) {
                    displayNumber = displayNumber.toLowerCase();
                    if (displayNumber.includes(searchString)) {
                        hasString = true;
                    }
                }
                // Filter by Alias
                let alias = accountsfiltered[i].alias;
                if (accountsfiltered[i].alias)) {
                    alias = alias.toLowerCase();
                    if (alias.includes(searchString)) {
                        hasString = true;
                    }
                }
                if (hasString == true) {
                    filteredByString.push(accountsfiltered[i]);
                }
            }
            this.accountsFullyFiltered', filteredByString);
        } else {
            this.accountsFullyFiltered', accountsfiltered);
        }
    }, */

    setListFilters() {
        return new Promise((resolve, reject) => {
            let corporates = [];
            let corporatesCode = [];
            let currencies = [];
            let currenciesCode = [];
            let countries = [];
            let countriesCode = [];
            let accountsfiltered = this.accountsfiltered;
            for (let i = 0; i < accountsfiltered.length; i++) {
                // Corporates
                let subsidiaryName = accountsfiltered[i].subsidiaryName;
                if (subsidiaryName) {
                    if (!corporatesCode.includes(subsidiaryName)) {
                        corporatesCode.push(subsidiaryName);
                        corporates.push({
                            'label': subsidiaryName,
                            'value': subsidiaryName
                        });
                    }
                }
                // Currencies
                let currency = accountsfiltered[i].currencyCodeAvailableBalance;
                if (currency) {
                    if (!currenciesCode.includes(currency)) {
                        currenciesCode.push(currency);
                        currencies.push({
                            'label': currency,
                            'value': currency
                        });
                    }
                }
                // Countries
                let countryName = accountsfiltered[i].countryName;
                let country = accountsfiltered[i].country;
                if (countryName && country) {
                    if (!countriesCode.includes(country)) {
                        countriesCode.push(country);
                        countries.push({
                            'label': countryName,
                            'value': country
                        });
                    }
                }
            }
            this.corporates = corporates;
            this.currencies = currencies;
            this.countries = countries;
            resolve({
                'corporates': corporates,
                'currencies': currencies,
                'countries': countries
            });
        });
    }
    resetSearch(){
        this.searchedString = '';
        this.applyFilters( 'clear'); 
        this.resetsearch = false;
    }
}