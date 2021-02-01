({
    applyFilters: function (component, helper, action) {
        new Promise($A.getCallback(function (resolve, reject) {
            console.log('Iniciar filtrado.');
            resolve('Ok');
        }), this).then($A.getCallback(function (value) {
            return helper.getFilters(component, helper);
        }), this).then($A.getCallback(function (value) {
            /* if (action == 'apply') {
                return helper.filterAccounts(component, helper, component.get('v.accountsFiltered'), value);
            } else { */
                return helper.filterAccounts(component, helper, component.get('v.accountList'), value);
            //}
        })).then($A.getCallback(function (value) {
            return helper.setListFilters(component, helper);
        })).catch(function (error) {
            console.log('Ha ocurrido un error.');
        }).finally($A.getCallback(function () {
            console.log('Finalizar filtrado.');
        }));
    },
    getFilters: function (component, helper) {
        return new Promise(function (resolve, reject) {
            let filters = {
                filtersRequired: 0
            };
            let corporatesSelected = component.get('v.corporatesSelected');
            if (!$A.util.isEmpty(corporatesSelected)) {
                filters['corporatesSelected'] = corporatesSelected;
                filters['filtersRequired']++;
            }
            let currenciesSelected = component.get('v.currenciesSelected');
            if (!$A.util.isEmpty(currenciesSelected)) {
                filters['currenciesSelected'] = currenciesSelected;
                filters['filtersRequired']++;
            }
            let countriesSelected = component.get('v.countriesSelected');
            if (!$A.util.isEmpty(countriesSelected)) {
                filters['countriesSelected'] = countriesSelected;
                filters['filtersRequired']++;
            }
            let minimumBalance = component.get('v.minimumBalance');
            if (!$A.util.isEmpty(minimumBalance)) {
                filters['minimumBalance'] = minimumBalance;
                filters['filtersRequired']++;
            }
            let maximumBalance = component.get('v.maximumBalance');
            if (!$A.util.isEmpty(maximumBalance)) {
                filters['maximumBalance'] = maximumBalance;
                filters['filtersRequired']++;
            }
            let searchedString = component.get('v.searchedString');
            if (!$A.util.isEmpty(searchedString) && searchedString.length >= 4) {
                filters['searchedString'] = searchedString;
                filters['filtersRequired']++;
            }
            component.set("v.filters",filters);
            resolve(filters);
        }, this);
    },

    filterAccounts: function (component, helper, accountList, filters) {
        return new Promise(function (resolve, reject) {
            let accountsFiltered = [];
            if (!$A.util.isEmpty(filters)) {
                
                for (let i = 0; i < accountList.length; i++) {
                    let passedFilter = 0;
                    let corporatesSelected = filters.corporatesSelected;
                    let subsidiaryName = accountList[i].subsidiaryName;
                    if (!$A.util.isEmpty(corporatesSelected) && !$A.util.isEmpty(subsidiaryName)) {
                        if (corporatesSelected.includes(subsidiaryName)) {
                            passedFilter++;
                        }
                    }
                    let currenciesSelected = filters.currenciesSelected;
                    let currency = accountList[i].currencyCodeAvailableBalance;
                    if (!$A.util.isEmpty(currenciesSelected) && !$A.util.isEmpty(currency)) {
                        if (currenciesSelected.includes(currency)) {
                            passedFilter++;
                        }
                    }
                    let countriesSelected = filters.countriesSelected;
                    let country = accountList[i].country;
                    if (!$A.util.isEmpty(countriesSelected) && !$A.util.isEmpty(country)) {
                        if (countriesSelected.includes(country)) {
                            passedFilter++;
                        }
                    }
                    let minimumBalance = filters.minimumBalance;
                    let maximumBalance = filters.maximumBalance;
                    let amountAvailableBalance = accountList[i].amountAvailableBalance;
                    if ((!$A.util.isEmpty(minimumBalance) || !$A.util.isEmpty(maximumBalance)) && !$A.util.isEmpty(amountAvailableBalance)) {
                        if (!$A.util.isEmpty(minimumBalance) && !$A.util.isEmpty(maximumBalance)) {
                            minimumBalance = parseInt(minimumBalance, 10);
                            maximumBalance = parseInt(maximumBalance, 10);
                            amountAvailableBalance = parseInt(amountAvailableBalance, 10);
                            if (amountAvailableBalance >= minimumBalance && amountAvailableBalance <= maximumBalance) {
                                passedFilter+=2;
                            }
                        } else if (!$A.util.isEmpty(minimumBalance)) {
                            minimumBalance = parseInt(minimumBalance, 10);
                            amountAvailableBalance = parseInt(amountAvailableBalance, 10);
                            if (amountAvailableBalance >= minimumBalance) {
                                passedFilter++;
                            }
                        } else if (!$A.util.isEmpty(maximumBalance)) {
                            maximumBalance = parseInt(maximumBalance, 10);
                            amountAvailableBalance = parseInt(amountAvailableBalance, 10);
                            if (amountAvailableBalance <= maximumBalance) {
                                passedFilter++;
                            }
                        }
                    }
                    let searchedString = filters.searchedString;
                    if (!$A.util.isEmpty(searchedString)) {
                        searchedString = searchedString.toLowerCase();
                        let hasString = false;
                        // Filter by IBAN
                        let displayNumber = accountList[i].displayNumber;
                        if (!$A.util.isEmpty(displayNumber)) {
                            
                            if (displayNumber.includes(searchedString)) {
                                hasString = true;
                            }
                        }
                        // Filter by Alias
                        let alias = accountList[i].alias;
                        if (!$A.util.isEmpty(alias)) {
                            alias = alias.toLowerCase();
                            if (alias.includes(searchedString)) {
                                hasString = true;
                            }
                        }
                        if (hasString == true) {
                            passedFilter++;
                        }
                    }
                    console.log(accountList[i].amountAvailableBalance);
                    console.log(filters.filtersRequired);
                    console.log(passedFilter);
                    if (filters.filtersRequired == passedFilter) {
                        accountsFiltered.push(accountList[i]);
                    }
                }
            } else {
                accountsFiltered = accountList;
            }
            component.set('v.accountsFiltered', accountsFiltered);
            resolve(accountsFiltered);
        }, this);
    },

    /* filterAccountsBySearch: function (component, helper, searchString) {
        let accountsFiltered = component.get('v.accountsFiltered');
        if (!$A.util.isEmpty(searchString) && searchString.length >= 4) {
            searchString = searchString.toLowerCase();
            let filteredByString = [];
            for (let i = 0; i < accountsFiltered.length; i++) {
                let hasString = false;
                // Filter by IBAN
                let displayNumber = accountsFiltered[i].displayNumber;
                if (!$A.util.isEmpty(displayNumber)) {
                    displayNumber = displayNumber.toLowerCase();
                    if (displayNumber.includes(searchString)) {
                        hasString = true;
                    }
                }
                // Filter by Alias
                let alias = accountsFiltered[i].alias;
                if (!$A.util.isEmpty(accountsFiltered[i].alias)) {
                    alias = alias.toLowerCase();
                    if (alias.includes(searchString)) {
                        hasString = true;
                    }
                }
                if (hasString == true) {
                    filteredByString.push(accountsFiltered[i]);
                }
            }
            component.set('v.accountsFullyFiltered', filteredByString);
        } else {
            component.set('v.accountsFullyFiltered', accountsFiltered);
        }
    }, */

    setListFilters: function (component, helper) {
        return new Promise(function (resolve, reject) {
            let corporates = [];
            let corporatesCode = [];
            let currencies = [];
            let currenciesCode = [];
            let countries = [];
            let countriesCode = [];
            let accountsFiltered = component.get('v.accountsFiltered');
            for (let i = 0; i < accountsFiltered.length; i++) {
                // Corporates
                let subsidiaryName = accountsFiltered[i].subsidiaryName;
                if (!$A.util.isEmpty(subsidiaryName)) {
                    if (!corporatesCode.includes(subsidiaryName)) {
                        corporatesCode.push(subsidiaryName);
                        corporates.push({
                            'label': subsidiaryName,
                            'value': subsidiaryName
                        });
                    }
                }
                // Currencies
                let currency = accountsFiltered[i].currencyCodeAvailableBalance;
                if (!$A.util.isEmpty(currency)) {
                    if (!currenciesCode.includes(currency)) {
                        currenciesCode.push(currency);
                        currencies.push({
                            'label': currency,
                            'value': currency
                        });
                    }
                }
                // Countries
                let countryName = accountsFiltered[i].countryName;
                let country = accountsFiltered[i].country;
                if (!$A.util.isEmpty(countryName) && !$A.util.isEmpty(country)) {
                    if (!countriesCode.includes(country)) {
                        countriesCode.push(country);
                        countries.push({
                            'label': countryName,
                            'value': country
                        });
                    }
                }
            }
            component.set('v.corporates', corporates);
            component.set('v.currencies', currencies);
            component.set('v.countries', countries);
            resolve({
                'corporates': corporates,
                'currencies': currencies,
                'countries': countries
            });
        }, this);
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Reset filter options
    History
    <Date>			<Author>			<Description>
	15/06/2020		Shahad Naji   		Initial version
    */
    resetSearch : function(component, event, helper){
        component.set('v.searchedString', '');
        helper.applyFilters(component, helper, 'clear'); 
        component.set('v.resetSearch', false);
    }
})