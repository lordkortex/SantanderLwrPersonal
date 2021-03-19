import { LightningElement, api, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

// Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

// Import labels
import last7Days from "@salesforce/label/c.last7Days";
import limitTransactionSearch from "@salesforce/label/c.limitTransactionSearch";
import limitTransactionSearchNumber from "@salesforce/label/c.limitTransactionSearchNumber";
import Loading from "@salesforce/label/c.Loading";
import SearchTransactions from "@salesforce/label/c.SearchTransactions";
import noTransactionsFound from "@salesforce/label/c.noTransactionsFound";
import selectOne from "@salesforce/label/c.selectOne";
import lastDay from "@salesforce/label/c.lastDay";
import bookDate from "@salesforce/label/c.bookDate";
import lastMonth from "@salesforce/label/c.lastMonth";
import Account from "@salesforce/label/c.Account";
import Bank from "@salesforce/label/c.Bank";
import currency from "@salesforce/label/c.currency";
import Country from "@salesforce/label/c.Country";
import Category from "@salesforce/label/c.Category";
import refreshBalanceCollout from "@salesforce/label/c.refreshBalanceCollout";
import amount from "@salesforce/label/c.amount";
import domainCashNexus from "@salesforce/label/c.domainCashNexus";
import downloadFailed from "@salesforce/label/c.downloadFailed";
import TimePeriod from "@salesforce/label/c.TimePeriod";

// Import apex methods
import getTransactions from "@salesforce/apex/CNT_TransactionSearchController.getTransactions";
import removeFile from "@salesforce/apex/CNT_TransactionSearchController.removeFile";
import downloadFileDoc from "@salesforce/apex/CNT_TransactionSearchController.downloadFileDoc";
import encryptData from "@salesforce/apex/CNT_TransactionSearchController.encryptData";
import decryptData from "@salesforce/apex/CNT_TransactionSearchController.decryptData";
import getUserPreferredFormat from "@salesforce/apex/CNT_TransactionSearchController.getUserPreferredFormat";
import getFiltersData from "@salesforce/apex/CNT_TransactionSearchController.getFiltersData";
import getTransactionCategories from "@salesforce/apex/CNT_TransactionSearchController.getTransactionCategories";

import Id from "@salesforce/user/Id";

export default class Lwc_searchTransactionsParent extends LightningElement {
  label = {
    last7Days,
    limitTransactionSearch,
    limitTransactionSearchNumber,
    Loading,
    SearchTransactions,
    noTransactionsFound,
    selectOne,
    lastDay,
    bookDate,
    lastMonth,
    Account,
    Bank,
    currency,
    Country,
    Category,
    refreshBalanceCollout,
    amount,
    domainCashNexus,
    downloadFailed,
    TimePeriod
  };

  @track endOfDay = false;
  @track loading = true;
  @track isInitialDataLoad = true;
  @track showModal;
  @track filters = [];
  @track defaultFilters = [];
  @track accountsData = [];
  @track accountCodeToInfo;
  @track wholeTransactionResults = [];
  @track transactionResults;
  @track dates = [];
  @track formFilters = {};
  @track timePeriods = [];
  @track numberActiveFilters = 0;
  @track dropdownHeader = this.label.TimePeriod;
  @track showAdvancedFilters;
  @track selectedFilters = [];
  @track accountCodesToSearch = [];
  @track categoriesList = [];
  @track setOnlyDefaultFilters = false;
  @track downloadParams;
  @track userTimezoneOffset;
  @track userPreferredDateFormat;
  @track userPreferredNumberFormat;
  @track tabChangedByCache = true;
  @track applyWithoutFilters = false;

  //  Sorting attributes
  @track sortBookDate = "desc";
  @track sortCategory = "desc";
  @track sortamount = "desc";
  @track fromDate;
  @track toDate;
  @track fromAmount;
  @track toAmount;
  @track maximumRecords = 0;

  //  Toast attributes
  @track showToast;
  @track msgToast;
  @track typeToast;
  @track showLimitTransactionsToast;
  @track clientref;
  @track descrip;

  @track selectedTimeframe = this.label.selectOne;
  // @track _selectedTimeFrame = this.label.selectOne;  //.last7Days

  // @api
  // get selectedTimeframe(){
  //     return this._selectedTimeframe;
  // }

  // set selectedTimeframe(selectedTimeframe){
  //     if(selectedTimeframe){
  //         this._selectedTimeframe  = selectedTimeframe;
  //         this.filterByTimePeriod(this._selectedTimeframe);
  //     }
  // }

  get toastErrorLimit() {
    return (
      this.label.limitTransactionSearch +
      " " +
      this.label.limitTransactionSearchNumber
    );
  }

  get loadingLabel() {
    return this.label.Loading + "...";
  }

  get isTransactionsResultsNull() {
    return (
      this.wholeTransactionResults == null ||
      this.transactionResults.length == 0
    );
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    this.doInit();
  }

  doInit() {
    this.getURLParams();
  }

  filterTableData(event) {
    // If the action is triggered by the "Apply filters" event
    if (event) {
      this.loading = true;
      var filters = event.detail.cmpParams.selectedFilters;
      var isEndOfDay = this.endOfDay;
      this.selectedFilters = filters;
      // Si contiene algun filtro, salvo que sea Amount con los valores from y to vacíos
      if (
        filters.length > 0 &&
        !(
          filters[0].name == this.label.amount &&
          (JSON.stringify(filters[0].value) == JSON.stringify({}) ||
            (filters[0].value.from == undefined &&
              filters[0].value.to == undefined))
        )
      ) {
        this.sendDataServiceRequestWithFilters(filters, isEndOfDay);
      } else {
        this.applyWithoutFilters = true;
        if (this.accountsData.accountList) {
          this.sendDataServiceRequest(this.accountsData, isEndOfDay);
        } else {
          this.sendDataServiceRequest(this.accountsData[0], isEndOfDay);
        }
      }
    }
  }

  getUpdatedData(event) {
    var userId = Id;
    if (event) {
      // If the search again button has been pressed
      // if(event.detail.name == "searchAgain"){
      if (event.currentTarget.nodeName == "C-LWC_RESULTS-NOT-FOUND") {
        this.showModal = true;
      } else if (!this.tabChangedByCache) {
        // If the tab has changed from EOD to LU (or viceversa) and
        var isEndOfDay = this.endOfDay;
        this.applyWithoutFilters = false;
        if (isEndOfDay) {
          window.localStorage.setItem(userId + "_" + "tab", "endOfDay");
          this.initComponentData("endOfDay");
        } else {
          window.localStorage.setItem(userId + "_" + "tab", "lastUpdate");
          this.initComponentData("lastUpdate");
        }
      } else {
        this.tabChangedByCache = false;
      }
    }
  }

  filterByTimePeriod(selectedTimePeriod) {
    var timePeriod = selectedTimePeriod;
    if (timePeriod != this.label.selectOne) {
      var selection = {};
      var selectedFilters = [];
      selection.value = {};

      // Curent date
      var currentDate = new Date();
      var currentMonth = currentDate.getMonth() + 1;
      selection.value.to =
        currentDate.getFullYear() +
        "-" +
        currentMonth +
        "-" +
        currentDate.getDate();

      switch (timePeriod) {
        case this.label.lastDay:
          var previousDate = new Date();
          previousDate.setDate(previousDate.getDate() - 1);
          var previousMonth = previousDate.getMonth() + 1;
          selection.value.from =
            previousDate.getFullYear() +
            "-" +
            previousMonth +
            "-" +
            previousDate.getDate();
          selection.name = this.label.bookDate;
          selection.type = "dates";
          selectedFilters.push(selection);
          break;

        case this.label.last7Days:
          var previousDate = new Date();
          previousDate.setDate(previousDate.getDate() - 7);
          var previousMonth = previousDate.getMonth() + 1;
          selection.value.from =
            previousDate.getFullYear() +
            "-" +
            previousMonth +
            "-" +
            previousDate.getDate();
          selection.name = this.label.bookDate;
          selection.type = "dates";
          selectedFilters.push(selection);
          break;

        case this.label.lastMonth:
          var previousDate = new Date();
          previousDate.setDate(previousDate.getDate() - 30);
          var previousMonth = previousDate.getMonth() + 1;
          selection.value.from =
            previousDate.getFullYear() +
            "-" +
            previousMonth +
            "-" +
            previousDate.getDate();
          selection.name = this.label.bookDate;
          selection.type = "dates";
          selectedFilters.push(selection);
          break;
      }
      // Remove the Select One value
      var timePeriods = JSON.parse(JSON.stringify(this.timePeriods));
      timePeriods = timePeriods.filter((opt) => opt != this.label.selectOne);
      this.timePeriods = timePeriods;

      // Pass the filters to the filter method
      this.loading = true;
      var isEndOfDay = this.endOfDay;

      // Update the filters attribute so that the book date is updated
      this.selectedTimeframe = timePeriod;
      this.dates = [];
      this.sendDataServiceRequestWithFilters(selectedFilters, isEndOfDay);
    }
  }

  sortByEvt(event) {
    var params = event.detail;
    if (params) {
      var sortItem = params.sortItem;
      var sorted = this.sortBy(sortItem, params.column);

      if (sorted != undefined && sorted != null) {
        this.transactionResults.obtTransacBusqueda = sorted;

        //Update the sort order
        if (this.sortItem == "asc") {
          this.sortItem = "desc";
        } else {
          this.sortItem = "asc";
        }
      }
    }
  }

  updateDropdownFilters(event) {
    var defaultFilters = JSON.parse(JSON.stringify(this.defaultFilters));
    // Clear all if the clear all event is captured (from simple or advanced filters)
    if (
      (event.detail.name == "onOptionSelection" &&
        event.detail.source == "clearAll") ||
      event.detail.source == "clearAll" ||
      event.detail.name == "clearAllFilters"
    ) {
      // MIRAR TRAS PONER ESCUCHADOR
      this.filters = JSON.parse(JSON.stringify(defaultFilters));
      this.fromAmount = undefined;
      this.toAmount = undefined;
      this.fromDate = undefined;
      this.toDate = undefined;
      this.descrip = undefined;
      this.clientref = undefined;
      this.selectedFilters = [];
      var isEndOfDay = this.endOfDay;
      var iWhen = "";

      if (isEndOfDay) {
        iWhen = "endOfDay";
      } else {
        iWhen = "lastUpdate";
      }

      this.initComponentData(iWhen);
    } else {
      var params = event.detail;
      var filters = JSON.parse(JSON.stringify(this.filters));
      var accountCodeToInfoMap = JSON.parse(
        JSON.stringify(this.accountCodeToInfo)
      );

      if (params) {
        var filterName = params.filterName;
        var accountLabel = this.label.Account;
        var bankLabel = this.label.Bank;
        var currencyLabel = this.label.currency;
        var countryLabel = this.label.Country;
        var filterLabels = new Array(
          accountLabel,
          bankLabel,
          currencyLabel,
          countryLabel
        );
        var availableAccounts = [];
        var availableBanks = [];
        var availableCountries = [];
        var availableCurrencies = [];
        var recalculateCurrentFilter = false; // Flag activated when the current filter must be recalculated i.e. when one of its options has been unchecked

        var selectedOptionsMap = {};
        var allOptionsMap = {};
        if (filterName != this.label.Category) {
          // Get the checked options from the filters
          for (var key in filters) {
            var selectedOptionsByFilter = [];
            var allOptionsByFilter = [];
            if (filterLabels.includes(filters[key].name)) {
              for (var option in filters[key].data) {
                allOptionsByFilter.push(filters[key].data[option].value);
                if (filters[key].data[option].checked) {
                  selectedOptionsByFilter.push(filters[key].data[option].value);
                }
              }
              selectedOptionsMap[filters[key].name] = selectedOptionsByFilter;
              allOptionsMap[filters[key].name] = allOptionsByFilter;
            }
          }

          // Take the default filters and check the options before continuing
          for (var oFilters in defaultFilters) {
            var filterKeys = Object.keys(selectedOptionsMap);
            for (var key in filterKeys) {
              var currentFilter = selectedOptionsMap[filterKeys[key]];
              if (defaultFilters[oFilters].name == filterKeys[key]) {
                if (defaultFilters[oFilters].name == filterName) {
                  defaultFilters[oFilters].displayOptions = true;
                }
                for (var opt in defaultFilters[oFilters].data) {
                  if (
                    currentFilter.includes(
                      defaultFilters[oFilters].data[opt].value
                    )
                  ) {
                    defaultFilters[oFilters].data[opt].checked = true;
                  } else {
                    if (
                      defaultFilters[oFilters] == filterName &&
                      !currentFilter.includes(
                        defaultFilters[oFilters].data[opt].value
                      )
                    ) {
                      defaultFilters[oFilters].data[opt].checked = false;
                      recalculateCurrentFilter = true;
                    }
                  }
                }
              } else if (
                defaultFilters[oFilters].type == "text" ||
                defaultFilters[oFilters].name == this.label.Category
              ) {
                defaultFilters[oFilters] = JSON.parse(
                  JSON.stringify(filters[oFilters])
                );
              }
            }
          }

          filters = JSON.parse(JSON.stringify(defaultFilters));

          // Get the accounts meeting all the criteria * If one or more accounts are already selected, we need to filter the account codes map before,
          // so only the selected accounts are processed
          var accCodesMapKeys = Object.keys(accountCodeToInfoMap);

          if (
            selectedOptionsMap[accountLabel].length > 0 &&
            filterName != accountLabel
          ) {
            accCodesMapKeys = accCodesMapKeys.filter((accCode) =>
              selectedOptionsMap[accountLabel].includes(accCode)
            );
            var accountCodes = Object.keys(accountCodeToInfoMap);
            var selectedOpts = Object.keys(selectedOptionsMap);
            var bankList = [];
            var currencyList = [];
            var countryList = [];
            for (var opt in selectedOpts) {
              switch (selectedOpts[opt]) {
                case bankLabel:
                  for (var b in selectedOptionsMap[selectedOpts[opt]]) {
                    var selected = selectedOptionsMap[selectedOpts[opt]];
                    bankList.push(selected[b]);
                  }
                  break;
                case countryLabel:
                  for (var c in selectedOptionsMap[selectedOpts[opt]]) {
                    var selected = selectedOptionsMap[selectedOpts[opt]];
                    countryList.push(selected[c]);
                  }
                  break;
                case currencyLabel:
                  for (var c in selectedOptionsMap[selectedOpts[opt]]) {
                    var selected = selectedOptionsMap[selectedOpts[opt]];
                    currencyList.push(selected[c]);
                  }
                  break;
              }
            }
            for (var key in accountCodes) {
              var accCode = accountCodes[key];
              // Add the accounts that meets the new criteria
              if (
                (bankList.includes(accountCodeToInfoMap[accCode].bankLabel) ||
                  bankList.length == 0) &&
                (currencyList.includes(
                  accountCodeToInfoMap[accCode].currencyLabel
                ) ||
                  currencyList.length == 0) &&
                (countryList.includes(
                  accountCodeToInfoMap[accCode].countryLabel
                ) ||
                  countryList.length == 0)
              ) {
                accCodesMapKeys.push(accCode);
              }
            }
          } else if (
            selectedOptionsMap[accountLabel].length > 0 &&
            filterName == accountLabel
          ) {
            accCodesMapKeys = accCodesMapKeys.filter((accCode) =>
              selectedOptionsMap[accountLabel].includes(accCode)
            );
          }

          for (var key in accCodesMapKeys) {
            var currentAccount = accountCodeToInfoMap[accCodesMapKeys[key]];
            if (
              (selectedOptionsMap[bankLabel].includes(
                currentAccount.bankLabel
              ) ||
                selectedOptionsMap[bankLabel].length == 0) &&
              (selectedOptionsMap[currencyLabel].includes(
                currentAccount.currencyLabel
              ) ||
                selectedOptionsMap[currencyLabel].length == 0) &&
              (selectedOptionsMap[countryLabel].includes(
                currentAccount.countryLabel
              ) ||
                selectedOptionsMap[countryLabel].length == 0)
            ) {
              if (filterName != accountLabel) {
                availableAccounts.push(accCodesMapKeys[key]);
              }
              availableBanks.push(currentAccount.bankLabel);
              availableCountries.push(currentAccount.countryLabel);
              availableCurrencies.push(currentAccount.currencyLabel);
            }
          }

          // If the filter selected is Account, we need to check for add the banks, countries and currencies of the selected accounts
          if (filterName == accountLabel) {
            for (var key in selectedOptionsMap[accountLabel]) {
              if (
                !availableAccounts.includes(
                  selectedOptionsMap[accountLabel][key]
                )
              ) {
                var candidateAccountCode =
                  selectedOptionsMap[accountLabel][key];
                availableAccounts.push(candidateAccountCode);
                availableBanks.push(
                  accountCodeToInfoMap[candidateAccountCode].bankLabel
                );
                availableCurrencies.push(
                  accountCodeToInfoMap[candidateAccountCode].currencyLabel
                );
                availableCountries.push(
                  accountCodeToInfoMap[candidateAccountCode].countryLabel
                );
              }
            }
            // WITH ACCOUNT FILTER RECALCULATION
            //recalculateCurrentFilter = true;
          }

          // Create an array of currently selected filters, it's needed to the last step
          // because we need to make sure if only one filter is selected, all its options must be displayed
          var selectedFilters = [];
          var selectedOptions = Object.keys(selectedOptionsMap);
          for (var selectedOpt in selectedOptions) {
            var currentOpt = selectedOptions[selectedOpt];
            if (selectedOptionsMap[currentOpt].length > 0) {
              selectedFilters.push(currentOpt);
            }
          }

          // Filter the options that need to be removed
          for (var f in filters) {
            if (
              filters[f].type == "checkbox" &&
              filterLabels.includes(filters[f].name) &&
              (filters[f].name != filterName || recalculateCurrentFilter)
            ) {
              if (
                selectedFilters.length > 1 ||
                (selectedFilters.length == 1 &&
                  filters[f].name != selectedFilters[0])
              ) {
                switch (filters[f].name) {
                  case accountLabel:
                    filters[f].data = filters[f].data.filter((option) =>
                      availableAccounts.includes(option.value)
                    );
                    break;
                  case bankLabel:
                    filters[f].data = filters[f].data.filter((option) =>
                      availableBanks.includes(option.value)
                    );
                    break;
                  case currencyLabel:
                    filters[f].data = filters[f].data.filter((option) =>
                      availableCurrencies.includes(option.value)
                    );
                    break;
                  case countryLabel:
                    filters[f].data = filters[f].data.filter((option) =>
                      availableCountries.includes(option.value)
                    );
                    break;
                }
              }
            }
            // Set the number of checked options
            if (filters[f].type == "checkbox") {
              filters[f].numberChecked = filters[f].data.filter(
                (option) => option.checked
              ).length;
              // Set the available accounts to send to the LU transaction search
              if (
                filters[f].name == accountLabel &&
                filters[f].numberChecked == 0
              ) {
                this.accountCodesToSearch = availableAccounts;
              } else if (
                filters[f].name == accountLabel &&
                filters[f].numberChecked != 0
              ) {
                this.accountCodesToSearch = selectedOptionsMap[accountLabel];
              }
            }
          }
          if (filterName == bankLabel) {
            this.filters[0] = filters[0];
            this.filters[2] = filters[2];
            this.filters[5] = filters[5];
          } else if (filterName == currencyLabel) {
            this.filters[0] = filters[0];
            this.filters[1] = filters[1];
            this.filters[2] = filters[2];
          } else if (filterName == countryLabel) {
            this.filters[5] = filters[5];
            this.filters[1] = filters[1];
            this.filters[2] = filters[2];
          } else if (filterName == accountLabel) {
            // WITH ACCOUNT RECALCULATION
            this.filters[0] = filters[0];
            this.filters[1] = filters[1];
            //component.set("v.filters[2]", filters[2]);
            this.filters[5] = filters[5];
          }
        }
      }
    }

    // Clear all if necessary

    // if(event.getParams().source == "clearAll"){
    //     var isEndOfDay = component.get("v.endOfDay");
    //     var iWhen = '';

    //     if(isEndOfDay){
    //         iWhen = 'endOfDay';
    //     } else {
    //         iWhen = 'lastUpdate';
    //     }

    //     helper.initComponentData(component, iWhen, helper);
    // }
  }

  clearAllFilters(event) {
    if (event) {
      var filterName = event.detail.filterName;
      var defaultFilters = JSON.parse(JSON.stringify(this.defaultFilters));
      this.accountCodesToSearch = [];

      for (var f in defaultFilters) {
        if (defaultFilters[f].name == filterName) {
          defaultFilters[f].displayOptions = true;
        }
      }

      this.fromDate = undefined;
      this.toDate = undefined;
      this.fromAmount = undefined;
      this.toAmount = undefined;
      this.filters = defaultFilters;
      var isEndOfDay = this.endOfDay;
      var iWhen = "";

      if (isEndOfDay) {
        iWhen = "endOfDay";
      } else {
        iWhen = "lastUpdate";
      }

      this.initComponentData(iWhen);
    }
  }

  downloadTransactions() {
    if (this.maximumRecords < this.label.limitTransactionSearchNumber) {
      this.showLimitTransactionsToast = false;
      this.downloadFile();
    } else {
      this.showLimitTransactionsToast = true;
    }
  }

  getURLParams() {
    var userId = Id;
    this.loading = true;
    var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
    if (sPageURLMain != "") {
      var sURLVariablesMain = sPageURLMain.split("&")[0].split("=");
      if (sURLVariablesMain[0] == "params") {
        var result = "";
        decryptData({ str: sURLVariablesMain[1] })
          .then((value) => {
            result = value;
            this.handleParams(result);
          })
          .catch((error) => {
            console.log(error); // TestError
          });
      }
    } else {
      var storage = window.localStorage.getItem(userId + "_" + "tab");
      if (storage != null && storage != undefined) {
        if (storage == "lastUpdate") {
          this.endOfDay = false;
        } else {
          this.endOfDay = true;
        }
        this.tabChangedByCache = false;
      }
      if (this.endOfDay == true) {
        // Call the get filters data and get data service
        this.initComponentData("endOfDay", false);
      } else {
        // Call the get filters data and get data service
        this.initComponentData("lastUpdate", false);
      }
    }
  }

  handleParams(response) {
    var userId = Id;
    var eod = false;
    var selectedFi = "[]";
    if (response != "") {
      var params = response.split("&");
      var sParameterName;
      // Set the default filters and call get data service with filters
      this.setOnlyDefaultFilters = true; // Comes from Transactions Detail
      for (var i = 0; i < params.length; i++) {
        sParameterName = params[i].split("=");
        if (sParameterName[0] == "c__filters") {
          sParameterName[1] === undefined
            ? "Not found"
            : (this.filters = JSON.parse(sParameterName[1]));
        } else if (sParameterName[0] == "c__lastUpdate") {
          sParameterName[1] === undefined
            ? "Not found"
            : sParameterName[1] == "true"
            ? (eod = false)
            : (eod = true);
        } else if (sParameterName[0] === "c__accountsData") {
          sParameterName[1] === "undefined"
            ? (this.accountsData = [])
            : (this.accountsData = JSON.parse(sParameterName[1]));
        } else if (sParameterName[0] === "c__accountCodeToInfo") {
          sParameterName[1] === "undefined"
            ? (this.accountCodeToInfo = {})
            : (this.accountCodeToInfo = JSON.parse(sParameterName[1]));
        } else if (sParameterName[0] === "c__selectedTimeframe") {
          sParameterName[1] === "undefined"
            ? (this.selectedTimeframe = "")
            : (this.selectedTimeframe = sParameterName[1]);
        } else if (sParameterName[0] === "c__dates") {
          sParameterName[1] === "undefined"
            ? (this.dates = [])
            : (this.dates = JSON.parse(sParameterName[1]));
        } else if (sParameterName[0] === "c__selectedFilters") {
          selectedFi = sParameterName[1];
          sParameterName[1] === "undefined"
            ? (this.selectedFilters = [])
            : (this.selectedFilters = JSON.parse(sParameterName[1]));
        } else if (sParameterName[0] === "c__formFilters") {
          sParameterName[1] === undefined || sParameterName[1] == "undefined"
            ? "Not found"
            : (this.formFilters = JSON.parse(sParameterName[1]));
        } else if (sParameterName[0] === "c__accountCodes") {
          sParameterName[1] === undefined ||
          sParameterName[1] == "undefined" ||
          sParameterName[1] == ""
            ? (this.accountCodesToSearch = [])
            : (this.accountCodesToSearch = JSON.parse(sParameterName[1]));
        }
      }

      var storage = window.localStorage.getItem(userId + "_" + "tab");
      if (storage != null && storage != undefined) {
        //component.set("v.tabChangedByCache", true);
        if (storage == "lastUpdate") {
          this.endOfDay = false;
        } else {
          this.endOfDay = true;
        }
        this.tabChangedByCache = false;
      } else {
        if (eod != null) {
          //component.set("v.tabChangedByCache", true);
          this.endOfDay = eod;
          this.tabChangedByCache = false;
        }
      }

      if (this.endOfDay == true) {
        // Call the get filters data and get data service
        this.initComponentData("endOfDay", false);
      } else {
        // Call the get filters data and get data service
        this.initComponentData("lastUpdate", false);
      }
    }
  }

  initComponentData(iWhen) {
    var userId = Id;
    let params = {
      userId: userId
    };
    this.loading = true;

    // Get user preferred date format
    getUserPreferredFormat(params)
      .then((result) => {
        this.setUserDateNumberFormat(result);
      })
      .catch((error) => {
        console.log("KO: " + error);
      });
  }

  setUserDateNumberFormat(response) {
    var userId = Id;
    if (response != null) {
      // Get filters data from the webservice
      var iWhen = this.endOfDay ? "endOfDay" : "lastUpdate";
      let params = {
        iWhen: iWhen,
        iCurrentUserId: userId
      };

      this.userPreferredDateFormat = response.dateFormat;
      this.userPreferredNumberFormat = response.numberFormat;

      if (this.endOfDay == false) {
        var storageBalance = window.localStorage.getItem(
          userId + "_" + "balanceGP"
        );
        var balanceTimestampGP = window.localStorage.getItem(
          userId + "_" + "balanceTimestampGP"
        );

        if (
          storageBalance != "null" &&
          storageBalance != undefined &&
          balanceTimestampGP != "null" &&
          balanceTimestampGP != undefined &&
          new Date() - new Date(Date.parse(balanceTimestampGP)) <
            parseInt(this.label.refreshBalanceCollout) * 60000
        ) {
          //helper.handleInitialData(component, event, JSON.parse(storageBalance));
          this.decryptInitialData(storageBalance);
        } else {
          getFiltersData(params)
            .then((result) => {
              this.setFiltersData(result);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        var storageBalanceEOD = window.localStorage.getItem(
          userId + "_" + "balanceEODGP"
        );
        var balanceTimestampGP = window.localStorage.getItem(
          userId + "_" + "balanceEODTimestampGP"
        );
        if (
          storageBalanceEOD != "null" &&
          storageBalanceEOD != undefined &&
          balanceTimestampGP != "null" &&
          balanceTimestampGP != undefined &&
          new Date() - new Date(Date.parse(balanceTimestampGP)) <
            parseInt(this.refreshBalanceCollout) * 60000
        ) {
          //helper.handleInitialData(component, event, JSON.parse(storageBalanceEOD));
          this.decryptInitialData(storageBalanceEOD);
        } else {
          getFiltersData(params)
            .then((result) => {
              this.setFiltersData(result);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  }

  setTableData(response) {
    var isInitialDataLoad = this.isInitialDataLoad;
    this.loading = true;
    if (response != "" && response != null && response != undefined) {
      if (response.balances != undefined) {
        if (response.balances.transactions.totalRegistros != undefined) {
          this.maximumRecords = response.balances.transactions.totalRegistros;
        }
        if (response.balances.transactions.obtTransacBusqueda.length == 0) {
          this.loading = false;
          this.wholeTransactionResults = null;
        } else {
          var transactions = response.balances.transactions;

          //AM - 11/11/2020 - US7687: Campos MT940
          var objTransactionList;
          if (transactions.obtTransacBusqueda != undefined) {
            objTransactionList = transactions.obtTransacBusqueda;
          } else {
            objTransactionList = transactions.listaObtTransacciones[0];
          }

          for (var tran in objTransactionList) {
            //COUNTRY -> BR,KY,LU
            if (
              objTransactionList[tran].obtTransacBusqueda.codigoBIC !=
                undefined &&
              objTransactionList[tran].obtTransacBusqueda.codigoBIC != null &&
              (objTransactionList[tran].obtTransacBusqueda.codigoBIC.paisbic ==
                "BR" ||
                objTransactionList[tran].obtTransacBusqueda.codigoBIC.paisbic ==
                  "KY" ||
                objTransactionList[tran].obtTransacBusqueda.codigoBIC.paisbic ==
                  "LU")
            ) {
              //If transactionConsolidated is false means that the transaction comes from the MT940.
              if (
                objTransactionList[tran].obtTransacBusqueda
                  .transactionConsolidated != undefined &&
                objTransactionList[tran].obtTransacBusqueda
                  .transactionConsolidated != null &&
                objTransactionList[tran].obtTransacBusqueda
                  .transactionConsolidated == "false"
              ) {
                if (
                  objTransactionList[tran].obtTransacBusqueda.descripcion !=
                    undefined &&
                  objTransactionList[tran].obtTransacBusqueda.descripcion !=
                    null &&
                  objTransactionList[tran].obtTransacBusqueda.descripcion
                ) {
                  //4 Digits, space, slash, space -> String for LocalCode.
                  if (
                    objTransactionList[tran].obtTransacBusqueda.descripcion
                      .length >= 7
                  ) {
                    var s1 = objTransactionList[
                      tran
                    ].obtTransacBusqueda.descripcion.substring(0, 4);
                    var s2 = objTransactionList[
                      tran
                    ].obtTransacBusqueda.descripcion.substring(4, 7);

                    // /^\d+$/ to check if there are only numbers.
                    if (/^\d+$/.test(s1) && s2 == " - ") {
                      objTransactionList[tran].obtTransacBusqueda.ltcCode = s1;

                      //We delete that part from Description.
                      objTransactionList[
                        tran
                      ].obtTransacBusqueda.descripcion = objTransactionList[
                        tran
                      ].obtTransacBusqueda.descripcion.substring(7);
                    }
                  }

                  //If contains / -> String for Client reference.
                  //Before that, we will save client reference value in batchClientReference and AdditionalInformation.
                  if (
                    objTransactionList[
                      tran
                    ].obtTransacBusqueda.descripcion.includes("/")
                  ) {
                    objTransactionList[
                      tran
                    ].obtTransacBusqueda.transactionBatchReference =
                      objTransactionList[tran].obtTransacBusqueda.refCliente;
                    objTransactionList[
                      tran
                    ].obtTransacBusqueda.aditionalInformation =
                      objTransactionList[tran].obtTransacBusqueda.refCliente;
                    objTransactionList[
                      tran
                    ].obtTransacBusqueda.refCliente = objTransactionList[
                      tran
                    ].obtTransacBusqueda.descripcion.substring(
                      objTransactionList[
                        tran
                      ].obtTransacBusqueda.descripcion.indexOf("/")
                    );

                    //We delete that part from Description.
                    objTransactionList[
                      tran
                    ].obtTransacBusqueda.descripcion = objTransactionList[
                      tran
                    ].obtTransacBusqueda.descripcion.substring(
                      0,
                      objTransactionList[
                        tran
                      ].obtTransacBusqueda.descripcion.indexOf("/")
                    );
                  }
                }
              }
            }
          }

          if (transactions.obtTransacBusqueda != undefined) {
            transactions.obtTransacBusqueda = objTransactionList;
          } else {
            transactions.listaObtTransacciones[0] = objTransactionList;
          }

          this.transactionResults = transactions;
          this.wholeTransactionResults = JSON.parse(
            JSON.stringify(transactions)
          );
          //helper.buildCategoryList(component, transactions);
        }
      } else {
        this.loading = false;
        this.wholeTransactionResults = null;
      }
    } else {
      this.loading = false;
      this.wholeTransactionResults = null;
    }

    if (isInitialDataLoad && this.selectedFilters.length == 0) {
      getTransactionCategories({})
        .then((result) => {
          this.getCategoryList(result);
        })
        .catch((error) => {
          console.log(error);
        });
      // this.template.querySelector("c-lwc_service-component").onCallApex({
      //     controllermethod: "getTransactionCategories",
      //     actionparameters: {},
      //     callercomponent: "setTableData"
      // });
    } else {
      this.loading = false;
    }
  }

  setFiltersData(response, decrypt) {
    // Set values for the Time Period dropdown
    var timePeriods = [];
    timePeriods.push(this.label.selectOne);
    timePeriods.push(this.label.lastDay);
    timePeriods.push(this.label.last7Days);
    timePeriods.push(this.label.lastMonth);
    this.timePeriods = timePeriods;
    this.selectedTimeframe = timePeriods[0];

    // Create the filters
    if (response != null) {
      if (decrypt != true) {
        this.encryptInitialData(response);
      }

      var countryList = new Set();
      var displayedCountryList = new Set();
      var accounts = response.accountList;
      var accCurrencies = new Set();
      for (var i = 0; i < accounts.length; i++) {
        displayedCountryList.add(
          accounts[i].country + " - " + accounts[i].countryName
        );
        countryList.add(accounts[i].country);
        //AB - 26/11/2020 - INC884
        if (accounts[i].currencyCodeAvailableBalance != undefined) {
          accCurrencies.add(accounts[i].currencyCodeAvailableBalance);
        }
      }

      // COUNTRY LIST CREATION
      var countryAux = Array.from(countryList);
      var displayCountryAux = Array.from(displayedCountryList);
      var listObject = [];
      listObject.push({});
      listObject[0].data = [];
      for (var i in countryAux) {
        var a = {
          value: countryAux[i],
          displayValue: displayCountryAux[i],
          checked: false
        };
        listObject[0].data.push(a);
      }
      // listObject[0].name = 'Country';
      listObject[0].name = this.label.Country;
      listObject[0].type = "checkbox";
      listObject[0].displayFilter = true;
      listObject[0].numberChecked = 0;
      listObject[0].dependsOn = [this.label.Bank];

      // BANKS MAP CREATION
      listObject.push({});
      listObject[1].data = [];
      for (var i in response.bankList) {
        var currentBank = response.bankList[i];
        var b = {
          value: currentBank,
          displayValue: currentBank,
          checked: false
        };
        listObject[1].data.push(b);
      }
      // listObject[1].name = 'Bank';
      listObject[1].name = this.label.Bank;
      listObject[1].type = "checkbox";
      listObject[1].displayFilter = true;
      listObject[1].numberChecked = 0;
      listObject[1].dependsOn = [this.label.Account];

      // ACCOUNT MAP CREATION
      listObject.push({});
      listObject[2].data = [];
      for (var key in response.accountList) {
        //var accountDisplayValue = response.accountList[key].aliasEntidad != undefined ? response.accountList[key].displayNumber + ' - ' + response.accountList[key].aliasEntidad : response.accountList[key].displayNumber;
        var accountDisplayValue = response.accountList[key].displayNumber;
        var currentAccount = {
          value: response.accountList[key].codigoCuenta,
          displayValue: accountDisplayValue,
          checked: false
        };
        listObject[2].data.push(currentAccount);
      }
      // listObject[2].name = 'Account';
      listObject[2].name = this.label.Account;
      listObject[2].type = "checkbox";
      listObject[2].displayFilter = true;
      listObject[2].numberChecked = 0;
      listObject[2].dependsOn = [this.label.Bank, this.label.Country];

      // CALENDAR CREATION
      listObject.push({});
      if (this.dates != undefined) {
        //listObject[3].data = component.get("v.dates");
        listObject[3].data = [this.fromDate, this.toDate];
      }
      // listObject[3].name = 'Book date';
      listObject[3].name = this.label.bookDate;
      listObject[3].type = "dates";
      listObject[3].displayFilter = false;

      // AMOUNT SELECTION
      listObject.push({});
      // listObject[4].name = 'Amount';
      listObject[4].name = this.label.amount;
      listObject[4].type = "text";
      listObject[4].displayFilter = false;

      // CURRENCY LIST CREATION
      var listCurrencies = Array.from(accCurrencies);
      listObject.push({});
      listObject[5].data = [];
      for (var i in listCurrencies) {
        var a = {
          value: listCurrencies[i],
          displayValue: listCurrencies[i],
          checked: false
        };
        listObject[5].data.push(a);
      }
      // listObject[5].name = 'Currency';
      listObject[5].name = this.label.currency;
      listObject[5].displayFilter = false;
      listObject[5].type = "checkbox";
      listObject[5].numberChecked = 0;

      // CURRENCY LIST CREATION
      if (this.categoriesList.length > 0) {
        var listCategories = this.categoriesList;
        listObject.push({});
        listObject[6].data = [];
        for (var i in listCategories) {
          var a = {
            value: listCategories[i],
            displayValue: listCategories[i],
            checked: false
          };
          listObject[6].data.push(a);
        }
        // listObject[6].name = 'Category';
        listObject[6].name = this.label.Category;
        listObject[6].displayFilter = false;
        listObject[6].type = "checkbox";
        listObject[6].numberChecked = 0;
      }

      // If the previous screen was Transaction Detail, only the default filters must be set
      var setOnlyDefaultFilters = this.setOnlyDefaultFilters;
      if (!setOnlyDefaultFilters && this.selectedFilters.length == 0) {
        this.filters = listObject;
      } else {
        this.setOnlyDefaultFilters = false;
      }
      this.defaultFilters = JSON.parse(JSON.stringify(listObject));
      this.showAdvancedFilters = true;

      // Once the list of filters has been constructed, we need to call the data service
      var isEndOfDay = this.endOfDay;
      if (!setOnlyDefaultFilters && this.selectedFilters.length == 0) {
        if (!this.applyWithoutFilters) {
          this.applyWithoutFilters = true;
          this.sendDataServiceRequest(response, isEndOfDay);
        }
      } else {
        this.sendDataServiceRequestWithFilters(
          this.selectedFilters,
          isEndOfDay
        );
      }
    } else {
      this.loading = false;
      this.wholeTransactionResults = null;
      this.setOnlyDefaultFilters = false;
      this.filters = [];
    }
  }

  sendDataServiceRequest(response, isEndOfDay) {
    var params = {};
    var countryList = response.countryList;
    var currencyList = response.currencyList;

    // Creation of account code list and Codigo Bic list
    var accountCodes = [];
    var codigosBic = [];
    var codigoBicMap = {};
    for (var acc in response.accountList) {
      accountCodes.push(response.accountList[acc].codigoCuenta);
      var codigoBic = {};
      codigoBic.ENTIDAD_BIC = response.accountList[acc].bic;
      codigoBic.PAIS_BIC = response.accountList[acc].paisbic;
      codigoBic.LOCATOR_BIC = response.accountList[acc].locatorbic;
      codigoBic.BRANCH = response.accountList[acc].branch;
      if (
        codigoBic.ENTIDAD_BIC != null ||
        codigoBic.PAIS_BIC != null ||
        codigoBic.LOCATOR_BIC != null ||
        codigoBic.BRANCH != null
      ) {
        codigosBic.push({ codigoBic });
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
    for (var key in accountCodes) {
      var accCode = {};
      accCode.codigoCuenta = accountCodes[key];
      accCodesList.push(accCode);
    }
    params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accCodesList;

    // Create the filtro object and its inner params
    if (isEndOfDay) {
      var countryCodesList = [];
      for (var key in countryList) {
        var countryCode = {};
        countryCode.codPais = countryList[key];
        countryCodesList.push(countryCode);
      }
      params.obtTransacBusqueda.entrada.filtro.listaPais = countryCodesList;

      var currencyCodesList = [];
      for (var key in currencyList) {
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
    var bankLabel = this.label.Bank;
    var currencyLabel = this.label.currency;
    var countryLabel = this.label.Country;
    for (var acc in response.accountList) {
      accountCodeToInfoMap[response.accountList[acc].codigoCuenta] = {
        bankLabel: response.accountList[acc].bankName,
        currencyLabel: response.accountList[acc].currencyCodeAvailableBalance,
        countryLabel: response.accountList[acc].country
      };
    }
    this.accountCodeToInfo = accountCodeToInfoMap;
    this.accountCodesToSearch = [];
    this.numberActiveFilters = 0;

    /*
        if(component.get("v.endOfDay"))
        {
            response.responseForGPEOD.descripcionConversion = null;
        }
        */
    response.exchangeRatesString = null;

    this.accountsData = response;
    var params_download = JSON.parse(JSON.stringify(params));
    params_download.obtTransacBusqueda.entrada.filtro.limit = 10000;

    this.downloadParams = params_download;

    getTransactions({ requestBody: JSON.stringify(params) })
      .then((result) => {
        //->HERE WE CALL THE CALLBACK RATHER PROCESS THE RESPONSE
        this.setTableData(result);
      })
      .catch((error) => {
        if (error) {
          console.log("Error message: " + error);
        } else {
          console.log("Unknown error");
        }
      });
  }

  getCategoryList(response) {
    // CATEGORY LIST CREATION
    var filters = this.filters;
    var defaultFilters = this.defaultFilters;
    var categoryList = response;

    // Create the filter object and push it to the list of filters
    var filter = {};
    filter.data = [];
    for (var i in categoryList) {
      var a = {
        value: categoryList[i],
        displayValue: categoryList[i],
        checked: false
      };
      filter.data.push(a);
    }
    // filter.name = 'Category';
    var categoryLabel = this.label.Category;
    filter.name = categoryLabel;
    filter.displayFilter = false;
    filter.type = "checkbox";
    filter.numberChecked = 0;
    filters = filters.filter((f) => f.name != categoryLabel);
    filters.push(filter);
    // Update the initial filter
    defaultFilters = defaultFilters.filter((f) => f.name != categoryLabel);
    defaultFilters.push(filter);

    this.categoriesList = categoryList;
    this.isInitialDataLoad = false;
    this.filters = JSON.parse(JSON.stringify(filters));
    this.defaultFilters = JSON.parse(JSON.stringify(defaultFilters));
    if (this.template.querySelector("c-lwc_cn_filters")) {
      this.template
        .querySelector("c-lwc_cn_filters")
        .setFilterAux(this.filters);
    }
    this.loading = false;
  }

  sortBy(sortItem, sortBy) {
    try {
      var order = sortItem;
      if (order != "" && order != null && order != undefined) {
        var data = this.transactionResults.obtTransacBusqueda;
        if (data != null && data != undefined) {
          var sort;
          //SORT by DESC
          if (order == "desc") {
            //For sort by bookDate colum
            if (sortBy == "BookDate") {
              sort = data.sort(
                (a, b) =>
                  new Date(b.obtTransacBusqueda.bookDate) -
                  new Date(a.obtTransacBusqueda.bookDate)
              );
              this.sortBookDate = "asc";
            } //For sort by categorry colum
            else if (sortBy == "Category") {
              sort = data.sort((a, b) =>
                a.obtTransacBusqueda.tipoTransaccion >
                b.obtTransacBusqueda.tipoTransaccion
                  ? 1
                  : b.obtTransacBusqueda.tipoTransaccion >
                    a.obtTransacBusqueda.tipoTransaccion
                  ? -1
                  : 0
              );
              this.sortCategory = "asc";
            } //For sort by amount colum
            else if (sortBy == "amount") {
              sort = data.sort(
                (a, b) =>
                  parseFloat(a.obtTransacBusqueda.importe) -
                  parseFloat(b.obtTransacBusqueda.importe)
              );
              this.sortamount = "asc";
            }
          } //SORT by ASC
          else {
            //For sort by bookDate colum
            if (sortBy == "BookDate") {
              sort = data.sort(
                (a, b) =>
                  new Date(a.obtTransacBusqueda.bookDate) -
                  new Date(b.obtTransacBusqueda.bookDate)
              );
              this.sortBookDate = "desc";
            } //For sort by categorry colum
            else if (sortBy == "Category") {
              sort = data.sort((a, b) =>
                a.obtTransacBusqueda.tipoTransaccion <
                b.obtTransacBusqueda.tipoTransaccion
                  ? 1
                  : b.obtTransacBusqueda.tipoTransaccion <
                    a.obtTransacBusqueda.tipoTransaccion
                  ? -1
                  : 0
              );
              this.sortCategory = "desc";
            } //For sort by amount colum
            else if (sortBy == "amount") {
              sort = data.sort(
                (a, b) =>
                  parseFloat(b.obtTransacBusqueda.importe) -
                  parseFloat(a.obtTransacBusqueda.importe)
              );
              this.sortamount = "desc";
            }
          }
          return sort;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  sendDataServiceRequestWithFilters(filters, isEndOfDay) {
    // Create the request params with default values
    var params = {};
    params.obtTransacBusqueda = {};
    params.obtTransacBusqueda.entrada = {};
    params.obtTransacBusqueda.entrada.cacheKey = {};
    params.obtTransacBusqueda.entrada.filtro = {};
    params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = "";
    params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = "";
    if (isEndOfDay) {
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

    var accountsData = JSON.parse(JSON.stringify(this.accountsData));

    // Creation of account codes, BIC codes , countries and currencies lists
    var accountCodes = [];
    var countryList = [];
    var currencyList = [];
    var codigosBic = [];
    var categories = [];
    for (var f in filters) {
      var currentFilter = filters[f];
      // Get the values from the filters
      switch (currentFilter.name) {
        // case "Account" :
        case this.label.Account:
          for (var acc in currentFilter.value) {
            var codigoCuenta = {
              codigoCuenta: currentFilter.value[acc].value
            };
            accountCodes.push(codigoCuenta);
          }
          params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accountCodes;
          break;
        // case "Country" :
        case this.label.Country:
          if (isEndOfDay) {
            for (var ct in currentFilter.value) {
              var codPais = {
                codPais: currentFilter.value[ct].value
              };
              countryList.push(codPais);
            }
            params.obtTransacBusqueda.entrada.filtro.listaPais = countryList;
          }
          break;
        // case "Currency" :
        case this.label.currency:
          if (isEndOfDay) {
            for (var cu in currentFilter.value) {
              var codDivisa = {
                codDivisa: currentFilter.value[cu].value
              };
              currencyList.push(codDivisa);
            }
            params.obtTransacBusqueda.entrada.filtro.listaDivisa = currencyList;
          }
          break;
        // case "Bank" :
        case this.label.Bank:
          if (isEndOfDay) {
            for (var bank in currentFilter.value) {
              var codigoBic =
                accountsData.bankToCodigoBicMap[
                  currentFilter.value[bank].value
                ];
              var codigoBicObject = {
                codigoBic: codigoBic
              };
              if (
                codigoBic.ENTIDAD_BIC != null ||
                codigoBic.PAIS_BIC != null ||
                codigoBic.LOCATOR_BIC != null ||
                codigoBic.BRANCH != null
              ) {
                codigosBic.push(codigoBicObject);
              }
            }
            params.obtTransacBusqueda.entrada.filtro.listaCodigoBic = codigosBic;
          }
          break;
        // case "Category" :
        case this.label.Category:
          for (var cat in currentFilter.value) {
            var codigoTransaccion = {
              codigoTransaccion: currentFilter.value[cat].value
            };
            categories.push(codigoTransaccion);
          }
          params.obtTransacBusqueda.entrada.filtro.listaCodigosTransacciones = categories;
          break;
        // case "Book date" :
        case this.label.bookDate:
          var timePeriod = this.selectedTimeframe;
          if (timePeriod != this.label.selectOne) {
            var toDate = new Date(Date.now());
            params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = toDate.toISOString();
            var fromDate = this.getBookDateFromTimePeriod(timePeriod, toDate);
            params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = fromDate;
          } else {
            if (
              currentFilter.value.from != undefined &&
              currentFilter.value.from != null
            ) {
              params.obtTransacBusqueda.entrada.cacheKey.fechaDesde =
                currentFilter.value.from;
            }
            if (
              currentFilter.value.to != undefined &&
              currentFilter.value.to != null
            ) {
              params.obtTransacBusqueda.entrada.cacheKey.fechaHasta =
                currentFilter.value.to;
            }
          }
          break;
        case this.label.amount:
          if (
            currentFilter.value.from != undefined &&
            currentFilter.value.from != null &&
            currentFilter.value.from != ""
          ) {
            params.obtTransacBusqueda.entrada.filtro.importeDesde =
              currentFilter.value.from;
            if (
              currentFilter.value.to == undefined ||
              currentFilter.value.to == "" ||
              currentFilter.value.to == null
            ) {
              params.obtTransacBusqueda.entrada.filtro.importeHasta =
                "99999999999999999";
            }
          }
          if (
            currentFilter.value.to != undefined &&
            currentFilter.value.to != null &&
            currentFilter.value.to != ""
          ) {
            if (
              currentFilter.value.from == undefined ||
              currentFilter.value.from == "" ||
              currentFilter.value.from == null
            ) {
              params.obtTransacBusqueda.entrada.filtro.importeDesde = "0";
            }
            params.obtTransacBusqueda.entrada.filtro.importeHasta =
              currentFilter.value.to;
          }
          break;
        case "debit":
          if (currentFilter.value) {
            params.obtTransacBusqueda.entrada.filtro.transactionType = "debit";
          }
          break;
        case "credit":
          if (currentFilter.value) {
            params.obtTransacBusqueda.entrada.filtro.transactionType = "credit";
          }
          break;
        case "clientRef":
          params.obtTransacBusqueda.entrada.filtro.clientReference =
            currentFilter.value;
          this.clientref = currentFilter.value;
          break;
        case "description":
          params.obtTransacBusqueda.entrada.filtro.description =
            currentFilter.value;
          this.descrip = currentFilter.value;
          break;
      }
    }

    // Once the filters have been looped, the checkbox filters must be checked according to the following criteria:
    //              - EOD: The account codes must be filtered and sent to the webservice. Also (only for downloads) the rest of the filter options must be sent as well.
    //              - LU: The account codes must be filtered and sent to the webservice.

    // Complete the params object with the values needed for download purposes (accounts, banks, currencies and countries)
    let params_download = JSON.parse(JSON.stringify(params));
    if (params.obtTransacBusqueda.entrada.cacheKey.listaCuentas == undefined) {
      var accountCodes = this.accountCodesToSearch;
      if (accountCodes.length == 0) {
        var accountCodeToInfoMap = this.accountCodeToInfo;
        accountCodes = Object.keys(accountCodeToInfoMap);
      }
      var accCodesToSearch = [];
      for (var acc in accountCodes) {
        var codigoCuenta = {
          codigoCuenta: accountCodes[acc]
        };
        accCodesToSearch.push(codigoCuenta);
      }
      params.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accCodesToSearch;

      params_download.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accCodesToSearch;

      // Add all the accounts for EOD downloads
      if (isEndOfDay) {
        var accCodesList = [];
        for (var key in accountsData.accountList) {
          var accCode = {};
          accCode.codigoCuenta = accountsData.accountList[key].codigoCuenta;
          accCodesList.push(accCode);
        }
        params_download.obtTransacBusqueda.entrada.cacheKey.listaCuentas = accCodesList;
      }
    }

    // Complete the params object with the values needed for download purposes (banks, currencies and countries)
    if (isEndOfDay) {
      // Delete all the unexistent params for EOD
      delete params.obtTransacBusqueda.entrada.filtro.description;
      delete params.obtTransacBusqueda.entrada.filtro.clientReference;
      delete params.obtTransacBusqueda.entrada.filtro.transactionType;

      if (
        params_download.obtTransacBusqueda.entrada.filtro.listaPais.length == 0
      ) {
        var countryCodesList = [];
        for (var key in accountsData.countryList) {
          var countryCode = {};
          countryCode.codPais = accountsData.countryList[key];
          countryCodesList.push(countryCode);
        }
        params_download.obtTransacBusqueda.entrada.filtro.listaPais = countryCodesList;
      }
      if (
        params_download.obtTransacBusqueda.entrada.filtro.listaDivisa.length ==
        0
      ) {
        var currencyCodesList = [];
        for (var key in accountsData.currencyList) {
          var currencyCode = {};
          currencyCode.codDivisa = accountsData.currencyList[key];
          currencyCodesList.push(currencyCode);
        }
        params_download.obtTransacBusqueda.entrada.filtro.listaDivisa = currencyCodesList;
      }
      if (
        params_download.obtTransacBusqueda.entrada.filtro.listaCodigoBic
          .length == 0
      ) {
        var codigosBic = [];
        var banksList = Object.keys(accountsData.bankToCodigoBicMap);
        for (var key in banksList) {
          var bank = banksList[key];
          var codigoBic = accountsData.bankToCodigoBicMap[bank];
          if (
            codigoBic.ENTIDAD_BIC != null ||
            codigoBic.PAIS_BIC != null ||
            codigoBic.LOCATOR_BIC != null ||
            codigoBic.BRANCH != null
          ) {
            codigosBic.push({ codigoBic });
          }
          params_download.obtTransacBusqueda.entrada.filtro.listaCodigoBic = codigosBic;
        }
      }
    }

    // If there is any selected time period dropdown, overwrite the date filter
    if (this.selectedTimeframe != this.label.selectOne) {
      let toDate = new Date(Date.now());
      params.obtTransacBusqueda.entrada.cacheKey.fechaHasta = toDate.toISOString();
      params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta = toDate.toISOString();
      let fromDate = this.getBookDateFromTimePeriod(
        this.selectedTimeframe,
        toDate
      );
      params.obtTransacBusqueda.entrada.cacheKey.fechaDesde = fromDate;
      params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde = fromDate;
    }
    //Replacing dates into formatted ones prepared for the download service
    const regExp = /[:-]/g;

    if (
      params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde != "" &&
      params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde !=
        undefined
    ) {
      params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde = params_download.obtTransacBusqueda.entrada.cacheKey.fechaDesde.replace(
        "Z",
        "+0000"
      );
    }

    if (
      params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta != "" &&
      params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta !=
        undefined
    ) {
      params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta = params_download.obtTransacBusqueda.entrada.cacheKey.fechaHasta.replace(
        "Z",
        "+0000"
      );
    }

    params_download.obtTransacBusqueda.entrada.filtro.limit = 10000;

    this.downloadParams = params_download;

    // Clear out the filters for country, currency and bank
    params.obtTransacBusqueda.entrada.filtro.listaPais = [];
    params.obtTransacBusqueda.entrada.filtro.listaDivisa = [];
    params.obtTransacBusqueda.entrada.filtro.listaCodigoBic = [];

    // Hide all the filters options
    var allFilters = this.filters;
    for (var key in allFilters) {
      if (allFilters[key].type == "checkbox") {
        allFilters[key].displayOptions = false;
      }
    }
    this.filters = JSON.parse(JSON.stringify(allFilters));
    this.loading = true;

    // Make the callout to the transactions POST web service
    this.template.querySelector("c-lwc_service-component").onCallApex({
      controllermethod: "getTransactions",
      actionparameters: { requestBody: JSON.stringify(params) },
      callercomponent: "sendDataServiceRequestWithFilters"
    });

    // Recalculate the number of active filters
    this.calculateNumberActiveFilters();
  }

  getBookDateFromTimePeriod(timePeriod, referenceDate) {
    var bookDate = "";
    var previousDate = referenceDate;
    if (timePeriod != this.label.selectOne) {
      switch (timePeriod) {
        case this.label.lastDay:
          previousDate.setDate(previousDate.getDate() - 1);
          bookDate = previousDate.toISOString();
          break;

        case this.label.last7Days:
          previousDate.setDate(previousDate.getDate() - 7);
          bookDate = previousDate.toISOString();
          break;

        case this.label.lastMonth:
          previousDate.setDate(previousDate.getDate() - 30);
          bookDate = previousDate.toISOString();
          break;
      }
    }
    return bookDate;
  }

  downloadFile() {
    //First retrieve the doc and the remove it
    try {
      this.retrieveFile().then((results) => {
        if (results != "" && results != undefined && results != null) {
          var domain = this.label.domainCashNexus;

          window.location.href =
            domain +
            "/sfc/servlet.shepherd/document/download/" +
            results +
            "?operationContext=S1";

          setTimeout(() => {
            this.removeFile(results);
          }, 100);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  removeFile(ID) {
    try {
      //Send the payment ID
      action.setParams({ id: ID });
      removeFile({
        id: ID
      })
        .then((result) => {})
        .catch((error) => {
          if (error) {
            console.log("Error message: " + error);
          } else {
            console.log("Unknown error");
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  retrieveFile() {
    try {
      var params = this.downloadParams;

      return new Promise((resolve, reject) => {
        downloadFileDoc({
          params: JSON.stringify(params)
        })
          .then((result) => {
            if (result == "" || result == undefined || result == null) {
              this.msgToast = this.label.downloadFailed;
              this.typeToast = "error";
              this.showToast = true;
            } else {
              resolve(result);
            }
          })
          .catch((error) => {
            if (error) {
              this.msgToast = this.label.downloadFailed;
              this.typeToast = "error";
              this.showToast = true;

              console.log("Error message: " + error);
              reject(errors);
            } else {
              console.log("Unknown error");
            }
          });
      });
    } catch (e) {
      console.log(e);
    }
  }

  encryptInitialData(data) {
    var userId = Id;
    try {
      var result = "null";
      encryptData({ str: JSON.stringify(data) })
        .then((res) => {
          result = res;
          if (result != "null" && result != undefined && result != null) {
            if (this.endOfDay == false) {
              var storageBalance = window.localStorage.getItem(
                userId + "_" + "balanceGP"
              );
              var balanceTimestampGP = window.localStorage.getItem(
                userId + "_" + "balanceTimestampGP"
              );

              if (
                storageBalance == "null" ||
                storageBalance == undefined ||
                (balanceTimestampGP != "null" &&
                  balanceTimestampGP != undefined &&
                  parseInt(this.label.refreshBalanceCollout) * 60000 <
                    new Date() - new Date(Date.parse(balanceTimestampGP)))
              ) {
                window.localStorage.setItem(userId + "_" + "balanceGP", result);
                window.localStorage.setItem(
                  userId + "_" + "balanceTimestampGP",
                  new Date()
                );
              }
            } else {
              var storageBalanceEOD = window.localStorage.getItem(
                userId + "_" + "balanceEODGP"
              );
              var balanceTimestampGP = window.localStorage.getItem(
                userId + "_" + "balanceEODTimestampGP"
              );
              if (
                storageBalanceEOD == "null" ||
                storageBalanceEOD == undefined ||
                (balanceTimestampGP != "null" &&
                  balanceTimestampGP != undefined &&
                  parseInt(this.label.refreshBalanceCollout) * 60000 <
                    new Date() - new Date(Date.parse(balanceTimestampGP)))
              ) {
                window.localStorage.setItem(
                  userId + "_" + "balanceEODGP",
                  result
                );
                window.localStorage.setItem(
                  userId + "_" + "balanceEODTimestampGP",
                  new Date()
                );
              }
            }
          }
        })
        .catch((error) => {
          if (error) {
            console.log("Error message: " + error);
          } else {
            console.log("Unknown error");
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  decryptInitialData(data) {
    try {
      var result = "null";
      var userId = Id;

      decryptData({ str: data })
        .then((res) => {
          result = res;
          if (result != null && result != undefined && result != "null") {
            result = JSON.parse(result);
            if (result.responseAcc != undefined && result.responseAcc != null) {
              result = result.responseAcc;
            }
            this.setFiltersData(result, true);

            if (this.endOfDay == false) {
              var storageBalance = window.localStorage.getItem(
                userId + "_" + "balanceGP"
              );
              var balanceTimestampGP = window.localStorage.getItem(
                userId + "_" + "balanceTimestampGP"
              );

              if (
                storageBalance == "null" ||
                storageBalance == undefined ||
                (balanceTimestampGP != "null" &&
                  balanceTimestampGP != undefined &&
                  parseInt(this.label.refreshBalanceCollout) * 60000 <
                    new Date() - new Date(Date.parse(balanceTimestampGP)))
              ) {
                this.encryptInitialData(result);
              }
            } else {
              var storageBalanceEOD = window.localStorage.getItem(
                userId + "_" + "balanceEODGP"
              );
              var balanceTimestampGP = window.localStorage.getItem(
                userId + "_" + "balanceEODTimestampGP"
              );
              if (
                storageBalanceEOD == "null" ||
                storageBalanceEOD == undefined ||
                (balanceTimestampGP != "null" &&
                  balanceTimestampGP != undefined &&
                  parseInt(this.label.refreshBalanceCollout) * 60000 <
                    new Date() - new Date(Date.parse(balanceTimestampGP)))
              ) {
                this.encryptInitialData(result);
              }
            }
          } else {
            this.template.querySelector("c-lwc_service-component").onCallApex({
              controllermethod: "getFiltersData",
              actionparameters: params,
              callercomponent: "decryptInitialData"
            });
          }
        })
        .catch((error) => {
          if (error) {
            console.log("Error message: " + error);
            this.template.querySelector("c-lwc_service-component").onCallApex({
              controllermethod: "getFiltersData",
              actionparameters: params,
              callercomponent: "decryptInitialData"
            });
          } else {
            console.log("Unknown error");
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  calculateNumberActiveFilters() {
    var filters = this.selectedFilters;
    var formFilters = this.formFilters;
    var filterCount = 0;

    // Loop through all the form filters and start counting
    if (this.endOfDay) {
      for (var key in Object.keys(formFilters)) {
        var filterName = Object.keys(formFilters)[key];
        if (
          ((filterName == "debit" || filterName == "credit") &&
            formFilters[filterName]) ||
          ((filterName == "clientRef" || filterName == "description") &&
            formFilters[filterName])
        ) {
          filterCount++;
        }
      }
    }

    // Loop through all the filters and keep counting
    for (var key in filters) {
      if (filters[key].type == "checkbox") {
        filterCount =
          filters[key].value.filter((option) => option.checked).length > 0
            ? filterCount + 1
            : filterCount;
      } else if (filters[key].type == "text") {
        if (
          filters[key].value != undefined &&
          ((filters[key].value.from != undefined &&
            filters[key].value.from != "") ||
            (filters[key].value.to != undefined && filters[key].value.to != ""))
        ) {
          filterCount++;
          this.fromAmount = filters[key].value.from;
          this.toAmount = filters[key].value.to;
        }
      } else if (filters[key].type == "dates") {
        if (filters[key].value.from != undefined) {
          filterCount++;
          this.fromDate = filters[key].value.from;
          this.toDate = filters[key].value.to;
        } else if (
          (this.fromDate != null && this.fromDate != undefined) ||
          (this.toDate != null && this.toDate != undefined)
        ) {
          filterCount++;
        } else if (
          (this.dates[0] != null && this.dates[0] != undefined) ||
          (this.dates[1] != null && this.dates[1] != undefined)
        ) {
          filterCount++;
          this.fromDate = this.dates[0];
          this.toDate = this.dates[1];
        }
      }
      // if(filters[key].type == "checkbox"){
      //     filterCount = filters[key].data.filter(option => option.checked).length > 0 ? filterCount+1 : filterCount;
      // } else if(filters[key].type == "text"){
      //     filterCount = filters[key].selectedFilters != undefined &&
      //                 ((filters[key].selectedFilters.from != undefined && filters[key].selectedFilters.from != "") || (filters[key].selectedFilters.to != undefined && filters[key].selectedFilters.to != "")) ? filterCount+1 : filterCount;
      // } else if(filters[key].type == "dates"){
      //     if(filters[key].data.length > 0 &&
      //         ((filters[key].data[0] != null && filters[key].data[0] != undefined) || (filters[key].data[1] != null && filters[key].data[1] != undefined))){
      //             filterCount++;
      //             this.fromDate = filters[key].value.from;
      //             this.toDate = filters[key].value.to;
      //     } else if((this.fromDate != null && this.fromDate != undefined) || (this.toDate != null && this.toDate != undefined)){
      //         filterCount++;
      //     } else if((this.dates[0] != null && this.dates[0] != undefined) || (this.dates[1] != null && this.dates[1] != undefined)){
      //         filterCount++;
      //         this.fromDate = this.dates[0];
      //         this.toDate = this.dates[1];
      //     }
      // }
    }

    if (this.descrip != undefined) filterCount++;
    if (this.clientref != undefined) filterCount++;

    this.numberActiveFilters = filterCount;
  }

  handleSuccessCallback(event) {
    if (event.detail.callercomponent == "setUserDateNumberFormat") {
      this.setFiltersData(event.detail.value);
    } else if (event.detail.callercomponent == "setTableData") {
      this.getCategoryList(event.detail.value);
    } else if (
      event.detail.callercomponent == "sendDataServiceRequestWithFilters"
    ) {
      this.setTableData(event.detail.value);
    } else if (event.detail.callercomponent == "decryptInitialData") {
      this.setFiltersData(event.detail.value);
    }
  }

  handleOpenModal(event) {
    this.showModal = event.detail.openModal;
  }

  handleChangeEndOfDay(event) {
    if (this.endOfDay != event.detail.endOfDay) {
      this.endOfDay = event.detail.endOfDay;
      var param = { currentTarget: { endOfDay: this.endOfDay } };
      this.getUpdatedData(param);
    }
  }

  handleTimeFrameSelected(event) {
    this.selectedTimeframe = event.detail;
    this.filterByTimePeriod(event.detail);
  }

  handleCloseModal(event) {
    this.showModal = false;
  }

  handleUpdateDropdownFilters(event) {
    if (event.detail.filters) {
      this.filters = event.detail.filters;
    }
    if (event.detail.name && event.detail.name == "onOptionSelection") {
      this.template
        .querySelector("c-lwc_cn_filters")
        .setFilterAux(this.filters);
    }

    this.updateDropdownFilters(event);
  }
}
