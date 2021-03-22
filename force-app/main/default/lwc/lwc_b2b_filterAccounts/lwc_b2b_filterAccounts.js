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

    Label = {
        clear,
        search,
        filterBy,
        B2B_Country,
        B2B_Corporates,
        B2B_Currency
    }

    @api accountlist = [];
    @api accountsfiltered = [];
    @api numberformat = '###,###,###.##';
    @api resetsearch;
    @api filters = [];

    @track minimumBalance = "";
    @track maximumBalance = "";
    @track corporates = [];
    @track corporatesSelected = [];
    @track countries = [];
    @track countriesSelected = [];
    @track currencies = [];
    @track currenciesSelected = [];
    @track searchedString = "";

    @track _accountlist;

    get accountlist(){
        return this._accountlist;
    }

    set accountlist(accountlist){
        this._accountlist = [... accountlist];
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.init();
    }

    init() {
        let accountlist = [... this._accountlist];
        this.accountsfiltered = accountlist;
        this.setListFilters();
    }

    get inputClass() {
        return 'slds-input' + (!this.searchedString ? ' filledInput' : '') ;
    }

    handleFilter(event) {
        var eventDropdown = event.detail.showDropdown;
        var eventName = event.detail.name;
        var eventAction = event.detail.action;
        if (eventAction) {
            this.applyFilters(eventAction);
        }
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
            return this.filterAccounts(this._accountlist, value);
        }).then((value) => {
            return this.setListFilters();
        }).catch((error) => {
            console.log('Ha ocurrido un error.');
        }).finally(() => {
            const accountsFilteredEvent = new CustomEvent('accountsfiltered',
                { detail : {accountsFiltered : this.accountsfiltered}
            });
            this.dispatchEvent(accountsFilteredEvent);
            console.log('Finalizar filtrado.');
        });
    }

    getFilters() {
        // return new Promise(function (resolve, reject) {
            let filters = {
                filtersRequired: 0
            };

            let corporatesSelected = this.template.querySelectorAll('c-lwc_b2b_filter-button-dropdown')[1].selectedfilters;
            //let corporatesSelected = this.corporatesSelected;
            if (corporatesSelected.length > 0) {
                filters['corporatesSelected'] = corporatesSelected;
                filters['filtersRequired']++;
            }
            let currenciesSelected = this.template.querySelectorAll('c-lwc_b2b_filter-button-dropdown')[2].selectedfilters;
            //let currenciesSelected = this.currenciesSelected;
            if (currenciesSelected.length > 0) {
                filters['currenciesSelected'] = currenciesSelected;
                filters['filtersRequired']++;
            }
            let countriesSelected = this.template.querySelectorAll('c-lwc_b2b_filter-button-dropdown')[0].selectedfilters;
            //let countriesSelected = this.countriesSelected;
            if (countriesSelected.length > 0) {
                filters['countriesSelected'] = countriesSelected;
                filters['filtersRequired']++;
            }
            let minimumBalance = this.template.querySelector('c-lwc_b2b_filter-button-balances').minimumbalance;
            // let minimumBalance = this.minimumBalance;
            if (minimumBalance) {
                filters['minimumBalance'] = minimumBalance;
                filters['filtersRequired']++;
            }
            let maximumBalance = this.template.querySelector('c-lwc_b2b_filter-button-balances').maximumbalance;
            // let maximumBalance = this.maximumBalance;
            if (maximumBalance) {
                filters['maximumBalance'] = maximumBalance;
                filters['filtersRequired']++;
            }
            let searchedString = this.searchedString;
            if (searchedString && searchedString.length >= 4) {
                filters['searchedString'] = searchedString;
                filters['filtersRequired']++;
            }
            this.filters = filters;
            return filters;
            // resolve(filters);
        // }, this);
    }

    filterAccounts(accountlist, filters) {
        return new Promise((resolve, reject) => {
            let accountsfiltered = [];
            if (filters.filtersRequired > 0) {
                
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
                    let minimumBalanceNotNull = minimumBalance != undefined && minimumBalance != null;
                    let maximumBalanceNotNull = maximumBalance != undefined && maximumBalance != null;
                    let amountAvailableBalance = accountlist[i].amountAvailableBalance;
                    if ((minimumBalanceNotNull || maximumBalanceNotNull) && amountAvailableBalance != undefined && amountAvailableBalance != null) {
                        if (minimumBalanceNotNull && maximumBalanceNotNull) {
                            minimumBalance = parseInt(minimumBalance, 10);
                            maximumBalance = parseInt(maximumBalance, 10);
                            amountAvailableBalance = parseInt(amountAvailableBalance, 10);
                            if (amountAvailableBalance >= minimumBalance && amountAvailableBalance <= maximumBalance) {
                                passedFilter+=2;
                            }
                        } else if (minimumBalanceNotNull) {
                            minimumBalance = parseInt(minimumBalance, 10);
                            amountAvailableBalance = parseInt(amountAvailableBalance, 10);
                            if (amountAvailableBalance >= minimumBalance) {
                                passedFilter++;
                            }
                        } else if (maximumBalanceNotNull) {
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
                            displayNumber = displayNumber.toLowerCase();
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
            var filters = {corporates: [], currencies: [], countries: []};

            Object.keys(accountsfiltered).forEach( i => {
                let subsidiaryName = accountsfiltered[i].subsidiaryName;
                filters.corporates = (subsidiaryName && filters.corporates.includes(subsidiaryName)) ? 
                                     filters.corporates : [... filters.corporates, subsidiaryName];
                               
                let currency = accountsfiltered[i].currencyCodeAvailableBalance;
                filters.currencies = (currency && filters.currencies.includes(currency)) ? 
                                     filters.currencies : [... filters.currencies, currency];

                let countryName = accountsfiltered[i].countryName;
                let country = accountsfiltered[i].country;
                // filters.countries = (countryName && country && countriesCode.includes(country)) ? 
                //                      filters.countries : [... filters.countries, {label: countryName, value: country}];
                if (countryName && country) {
                    if (!countriesCode.includes(country)) {
                        countriesCode = [...countriesCode, country];

                        filters.countries = [...filters.countries, {label: countryName, value: country}];
                    }
                }
            });
            // for (let i = 0; i < accountsfiltered.length; i++) {
            //     // Corporates
            //     let subsidiaryName = accountsfiltered[i].subsidiaryName;
            //     if (subsidiaryName) {
            //         if (!corporatesCode.includes(subsidiaryName)) {
            //             corporatesCode = [...corporatesCode, subsidiaryName]
            //             //corporatesCode.push(subsidiaryName);
            //             let corporates_aux = {
            //                 label: subsidiaryName,
            //                 value: subsidiaryName
            //             };
            //             corporates = [...corporates, corporates_aux];
            //             // corporates.push({
            //             //     label: subsidiaryName,
            //             //     value: subsidiaryName
            //             // });
            //         }
            //     }
            //     // Currencies
            //     let currency = accountsfiltered[i].currencyCodeAvailableBalance;
            //     if (currency) {
            //         if (!currenciesCode.includes(currency)) {
            //             currenciesCode = [...currenciesCode, currency];
            //             //currenciesCode.push(currency);
            //             let currencies_aux = {
            //                 label: currency,
            //                 value: currency
            //             };
            //             currencies = [...currencies, currencies_aux]
            //             // currencies.push({
            //             //     label: currency,
            //             //     value: currency
            //             // });
            //         }
            //     }
            //     // Countries
            //     let countryName = accountsfiltered[i].countryName;
            //     let country = accountsfiltered[i].country;
            //     if (countryName && country) {
            //         if (!countriesCode.includes(country)) {
            //             countriesCode = [...countriesCode, country];
            //             //countriesCode.push(country);

            //             let countries_aux = {
            //                 label: countryName,
            //                 value: country
            //             }

            //             countries = [...countries, countries_aux];

            //             // countries.push({
            //             //     'label': countryName,
            //             //     'value': country
            //             // });
            //         }
            //     }
            // }
            this.corporates = filters.corporates.map( corp => {
                return {label: corp, value: corp};
            });
            this.currencies = filters.currencies.map( curr => {
                return {label: curr, value: curr};
            });
            this.countries = filters.countries;
            resolve({
                corporates: filters.corporates,
                currencies: filters.currencies,
                countries: filters.countries
            });
        });
    }
    resetSearch(){
        this.searchedString = '';
        this.applyFilters( 'clear'); 
        this.resetsearch = false;
    }
}