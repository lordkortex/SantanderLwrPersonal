import { LightningElement, api, track } from "lwc";
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

import clear from "@salesforce/label/c.clear";
import SearchPayments from "@salesforce/label/c.SearchPayments";
import filterBy from "@salesforce/label/c.filterBy";
import AllFilters from "@salesforce/label/c.AllFilters";
import download from "@salesforce/label/c.download";
import T_Print from "@salesforce/label/c.T_Print";
import status from "@salesforce/label/c.status";
import currency from "@salesforce/label/c.currency";
import PAY_noPaymentsDownloadPrint from "@salesforce/label/c.PAY_noPaymentsDownloadPrint";
import PAY_checkFilterSearchCriteria from "@salesforce/label/c.PAY_checkFilterSearchCriteria";
import PAY_Status_PendingOne from "@salesforce/label/c.PAY_Status_PendingOne";
import PAY_Status_PendingTwo from "@salesforce/label/c.PAY_Status_PendingTwo";
import PAY_Status_InReviewOne from "@salesforce/label/c.PAY_Status_InReviewOne";
import PAY_Status_ScheduledOne from "@salesforce/label/c.PAY_Status_ScheduledOne";
import PAY_Status_CompletedOne from "@salesforce/label/c.PAY_Status_CompletedOne";
import PAY_Status_RejectedOne from "@salesforce/label/c.PAY_Status_RejectedOne";

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
  @api searchedsourceaccount = ""; //"Search information placed in the source account search input."
  @api selectedsourceaccount = {}; //"Source account selected from dropdown."
  @api reloadaccounts = false; //"Retry the call to retrieve list of accounts."

  @api fromdecimal = ""; //"Search information placed in the From Amount search input."
  @api todecimal = ""; //"Search information placed in the To Amount search input."

  @api dates = "['', '']"; //"List containing the selected dates"

  @api showdownloadmodal = false; //"Boolean to show or hide download modal (CMP_PaymentsLandingDownloadModal)"
  @api showfiltermodal = false; //"Boolean to show or hide advanced filter modat (CMP_PaymentsLandingFilterModal)"
  @api isLoading = false; //"Controls whether the spinner shows when records are loading"
  @api clientreference; //"User input for client reference filter."
  @api searchedstring = ""; //"Search information placed in the account search input."
  @api selectedstatuses = []; //"List of selected statuses."
  @api selectedcurrencies = []; //"List of selected currencies."
  @api pendingofmyauthorization = false; //"True when 'Pending of my authorization' header option is clicked."
  @api isheaderoptionselected = false; // "True when a header option is selected."

  @api selectedpaymentstatusbox = ""; //"Selected payment status"

  @api selectedmethod = ""; //"Payment method selected"
  @api selectedcountry; //"Country selected from dropdown."

  @api resetsearch = false; //"Reset search when the button is clicked."
  @api filtercounter = 0; //"Counts the number of types of filers selected (source account, amount, currency, status, payment method, client reference, destination country, date)"
  @api applyisclicked = false;

  @api numberofpayments = 0; //"Number of payments in the table"
  @api availablestatuses = []; //"List of status-reason pairs visible to front-end user"
  @api statuslist = [];
  @track showdropdown = false;
  //filters = new Object();
  currencypairfilter = [];
  @track statusfilter = [];
  sidefilter = [];
  //currencypairdropdownlist = [];
  currencypairdropdownlist = ["EUR/USD", "USD/GBP", "GBP/EUR"];
  //statuslist = ['Complete', 'Pending To Be Confirmed', 'Settlement Instruction Pending', 'Cancelled', 'Settled', 'Terminated', 'Replaced', 'Settlement Instruction Assigned'];
  sidelist = ["Sell", "Buy"];

  get searchedStringNotEmpty() {
    return (
      this.searchedstring != undefined &&
      this.searchedstring != null &&
      this.searchedstring != ""
    );
  }

  get searchedStringEmptyClass() {
    //'slds-input' + (!empty(v.searchedString) ? ' filledInput' : '')
    var ret = "slds-input";
    if (this.searchedstring) {
      ret = ret + " filledInput";
    }
    return ret;
  }
  get filterCounterGTzeroClass() {
    //((v.filterCounter > 0) ? 'slds-button buttons filterButton' : 'slds-button buttons')
    var ret = "";
    if (this.filtercounter && this.filtercounter > 0) {
      ret = "slds-button buttons filterButton";
    } else {
      ret = "slds-button buttons";
    }
    return ret;
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    /*this.filters.label = 'EUR/USD';
        this.filters.value = 'chk_EURUSD';
        this.currencypairdropdownlist.push(this.filters);*/
    /*this.currencypairdropdownlist.push('USD/GBP');
        console.log(this.currencypairdropdownlist);*/
    this.setFilters();
  }

  openModal() {
    const openDownloadModal = new CustomEvent("buttondownload", {
      detail: true
    });
    this.dispatchEvent(openDownloadModal);
  }

  @api setFilters() {
    var currencypair = this.currencypairdropdownlist;
    var status = this.statuslist;
    var side = this.sidelist;
    for (let index in currencypair) {
      if (currencypair[index] != null || currencypair[index] != undefined) {
        var currencyObj = new Object();
        currencyObj.label = currencypair[index];
        currencyObj.value = "chk_" + currencypair[index];
        //console.log('Objeto ' + currencyObj);
        this.currencypairfilter.push(currencyObj);
      }
    }

    for (let index in status) {
      if (status[index] != null || status[index] != undefined) {
        var statusObj = new Object();
        statusObj.label = status[index];
        var labelwithoutspaces = status[index];
        statusObj.value = "chk_" + labelwithoutspaces.trim();
        this.statusfilter.push(statusObj);
      }
    }

    for (let index in side) {
      if (side[index] != null || side[index] != undefined) {
        var sideObj = new Object();
        sideObj.label = side[index];
        sideObj.value = "chk_" + side[index];
        this.sidefilter.push(sideObj);
      }
    }
  }

  openFilterModal() {
    this.showfiltermodal = true;
  }

  closeFilterModal() {
    this.showfiltermodal = false;
  }

  applyFilters(action) {
    new Promise((resolve, reject) => {
      resolve("Ok");
    })
      .then((value) => {
        return this.getFilters();
      })
      .catch((error) => {
        console.log("Ha ocurrido un error.");
      })
      .finally(() => {
        if (this.filters.statusSelected) {
          if (this.filters.statusSelected.length > 0) {
            for (let index in this.filters.statusSelected) {
              if (this.filters.statusSelected[index].startsWith("chk_")) {
                this.filters.statusSelected[
                  index
                ] = this.filters.statusSelected[index].substring(4);
              }
            }
          }
        }
        if (this.filters.currencyPairSelected) {
          if (this.filters.currencyPairSelected.length > 0) {
            for (let index in this.filters.currencyPairSelected) {
              if (this.filters.currencyPairSelected[index].startsWith("chk_")) {
                this.filters.currencyPairSelected[
                  index
                ] = this.filters.currencyPairSelected[index].substring(4);
              }
            }
          }
        }
        if (this.filters.directionSelected) {
          if (this.filters.directionSelected.length > 0) {
            for (let index in this.filters.directionSelected) {
              if (this.filters.directionSelected[index].startsWith("chk_")) {
                this.filters.directionSelected[
                  index
                ] = this.filters.directionSelected[index].substring(4);
              }
            }
          }
        }
        const sendFilters = new CustomEvent("getfilters", {
          detail: { filters: this.filters }
        });
        this.dispatchEvent(sendFilters);
      });
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

  getFilters() {
    // return new Promise(function (resolve, reject) {
    let filters = {
      filtersRequired: 0
    };

    let statusSelected = this.template.querySelectorAll(
      "c-lwc_b2b_filter-button-dropdown"
    )[0].selectedfilters;
    //let corporatesSelected = this.corporatesSelected;
    if (statusSelected.length > 0) {
      filters["statusSelected"] = statusSelected;
      filters["filtersRequired"]++;
    }
    let currencyPairSelected = this.template.querySelectorAll(
      "c-lwc_b2b_filter-button-dropdown"
    )[1].selectedfilters;
    //let currenciesSelected = this.currenciesSelected;
    if (currencyPairSelected.length > 0) {
      filters["currencyPairSelected"] = currencyPairSelected;
      filters["filtersRequired"]++;
    }
    let directionSelected = this.template.querySelectorAll(
      "c-lwc_b2b_filter-button-dropdown"
    )[2].selectedfilters;
    //let countriesSelected = this.countriesSelected;
    if (directionSelected.length > 0) {
      filters["directionSelected"] = directionSelected;
      filters["filtersRequired"]++;
    }

    let searchedString = this.searchedString;
    if (searchedString && searchedString.length >= 4) {
      filters["searchedString"] = searchedString;
      filters["filtersRequired"]++;
    }
    this.filters = filters;
    return filters;
    // resolve(filters);
    // }, this);
  }

  setListFilters() {
    return new Promise((resolve, reject) => {
      let status = [];
      let statusCode = [];
      let currencyPair = [];
      let currencyPairCodes = [];
      let direction = [];
      let directionCode = [];
      var filters = { status: [], currencyPair: [], direction: [] };

      /*Object.keys(accountsfiltered).forEach( i => {
                let subsidiaryName = accountsfiltered[i].subsidiaryName;
                filters.corporates = (subsidiaryName && filters.corporates.includes(subsidiaryName)) ? 
                                     filters.corporates : [... filters.corporates, subsidiaryName];
                               
                let currency = accountsfiltered[i].currencyCodeAvailableBalance;
                filters.currencies = (currency && filters.currencies.includes(currency)) ? 
                                     filters.currencies : [... filters.currencies, currency];

                let countryName = accountsfiltered[i].countryName;
                let country = accountsfiltered[i].country;
                if (countryName && country) {
                    if (!countriesCode.includes(country)) {
                        countriesCode = [...countriesCode, country];

                        filters.countries = [...filters.countries, {label: countryName, value: country}];
                    }
                }
            });*/
      this.corporates = filters.corporates.map((corp) => {
        return { label: corp, value: corp };
      });
      this.currencies = filters.currencies.map((curr) => {
        return { label: curr, value: curr };
      });
      this.countries = filters.countries;
      resolve({
        corporates: filters.corporates,
        currencies: filters.currencies,
        countries: filters.countries
      });
    });
  }
}
