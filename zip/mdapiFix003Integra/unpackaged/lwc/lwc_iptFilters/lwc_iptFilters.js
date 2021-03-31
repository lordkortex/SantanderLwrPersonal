import OutgoingPayments from "@salesforce/label/c.OutgoingPayments";
import IncomingPayments from "@salesforce/label/c.IncomingPayments";
import Account from "@salesforce/label/c.Account";
import filterBy from "@salesforce/label/c.filterBy";
import currency from "@salesforce/label/c.currency";
import singleChoice from "@salesforce/label/c.singleChoice";
import amount from "@salesforce/label/c.amount";
import advancedFilters from "@salesforce/label/c.advancedFilters";
import download from "@salesforce/label/c.download";
import domain from "@salesforce/label/c.domain";
import domainCashNexus from "@salesforce/label/c.domainCashNexus";
import domainBackfront from "@salesforce/label/c.domainBackfront";
// Import apex methods
import removeFile from "@salesforce/apex/CNT_MRTrackerSearch.removeFile";
import downloadAll from "@salesforce/apex/CNT_MRTrackerSearch.downloadAll";
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { LightningElement, api, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

export default class Lwc_iptFilters extends LightningElement {
  @api filters;
  @api isaccountfilter = false;
  @api fromcashnexus = false;
  @api isonetrade = false;
  @api isopen = false;
  @api currencylist = ["EUR", "GBP", "USD", "BRL", "MXN"];
  @api accountlist = ["1", "2", "3"];

  @track accountListToDisplay;
  @track accountFilter;
  @track selectedAccounts;
  @track selectedPaymentType = "OUT";
  @track count = 0;
  @track settledFrom;
  @track currency;
  @track settledTo;
  @track ready = false;

  Label = {
    OutgoingPayments,
    IncomingPayments,
    filterBy,
    Account,
    currency,
    singleChoice,
    amount,
    advancedFilters,
    download,
    domain,
    domainCashNexus,
    domainBackfront
  };

  get selectedPaymentOutClass() {
    return this.selectedPaymentType == "OUT"
      ? "slds-button slds-button_neutral selected"
      : "slds-button slds-button_neutral";
  }

  get selectedPaymentInClass() {
    return this.selectedPaymentType == "IN"
      ? "slds-button slds-button_neutral selected"
      : "slds-button slds-button_neutral";
  }
  get getCount() {
    return this.count == 0;
  }
  getDaysFilter(diference) {
    var datePrevius = new Date();
    var fechString = "";
    if (diference) {
      datePrevius.setDate(datePrevius.getDate() - diference);
    }
    var dd = String(datePrevius.getDate()).padStart(2, "0");
    var mm = String(datePrevius.getMonth() + 1).padStart(2, "0"); //As January is 0.
    var yyyy = datePrevius.getFullYear();
    fechString = yyyy + "-" + mm + "-" + dd;
    return fechString;
  }
  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    console.log("entraConnectedCallback");
    try {
      var accountlist = this.accountlist;
      if (accountlist.length > 0) {
        var filter = '{"searchData":{';
        var filterAccount = '"originatorAccountList":[';
        var accountsToDisplay = [];
        filter += '"valueDateFrom":"' + this.getDaysFilter(15) + '",';
        filter += '"valueDateTo":"' + this.getDaysFilter() + '",';
        for (var i in accountlist) {
          accountsToDisplay.push({
            label: accountlist[i].account,
            value: accountlist[i].account
          });
          filterAccount +=
            '{"bankId":"' +
            accountlist[i].bic +
            '","account":{"idType":"' +
            accountlist[i].id_type +
            '","accountId":"' +
            accountlist[i].account +
            '"}},';
        }
        this.accountListToDisplay = accountsToDisplay;
        //this.accountListToDisplay = [{label:"label1", value:"value1"}, {label:"label2", value:"value2"}, {label:"label3", value:"value3"}];
        this.ready = true;
        console.log(
          "ALV this.accountListToDisplay: " +
            JSON.stringify(this.accountListToDisplay)
        );

        filterAccount = filterAccount.slice(0, -1) + "]";
        this.accountFilter = filterAccount;

        // Cambiar "latestPaymentsFlag": "NO" a YES cuando se configuren las búsquedas con account
        //filter+=filterAccount+',"latestPaymentsFlag": "YES","_offset": "0","_limit": "1000", "inOutIndicator": "OUT"}}';
        filter +=
          filterAccount +
          ',"latestPaymentsFlag": "NO","_offset": "0","_limit": "1000", "inOutIndicator": "OUT"}}';
        //filter+='"latestPaymentsFlag": "NO","_offset": "0","_limit": "1000", "inOutIndicator": "OUT"}}';

        this.filters = filter;
        const getfilterparentevent = new CustomEvent("getfilterparent", {
          detail: { filters: filter }
        });
        this.dispatchEvent(getfilterparentevent);
      }
    } catch (e) {
      console.log(e);
    }
    /* if(datefrom != null && datefrom != "" && datefrom != this.label.from && (dateto == null || dateto == "" || dateto == this.label.to)){

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth()+1).padStart(2, '0'); //As January is 0.
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;

            filter+= '"valueDateFrom":"' + datefrom + '",';
            filter+= '"valueDateTo":"' + today + '",';
            count+= 1;

        }*/
  }

  updatePaymentsType(event) {
    try {
      var originalFilter = JSON.parse(this.filters);
      var newFilters = { searchData: {} };
      console.log(event.currentTarget);
      if (
        (event.currentTarget.dataset.name == "inPayments" &&
          this.selectedPaymentType != "IN") ||
        (event.currentTarget.dataset.name == "outPayments" &&
          this.selectedPaymentType != "OUT")
      ) {
        var auxOriginator = originalFilter.searchData.originatorAccountList;
        var auxBeneficiary = originalFilter.searchData.beneficiaryAccountList;
        originalFilter.searchData.originatorAccountList = auxBeneficiary;
        originalFilter.searchData.beneficiaryAccountList = auxOriginator;

        if (event.currentTarget.dataset.name == "inPayments") {
          this.selectedPaymentType = "IN";
          originalFilter.searchData.inOutIndicator = "IN";
        } else if (event.currentTarget.dataset.name == "outPayments") {
          this.selectedPaymentType = "OUT";
          originalFilter.searchData.inOutIndicator = "OUT";
        }

        this.filters = JSON.stringify(originalFilter);
      }
      //IF IS IN PAYMENTS
      console.log("[IPTFiltersController.updatePaymentsType]");
      console.log(JSON.stringify(originalFilter));
      const getFilterParent = new CustomEvent("getfilterparent", {
        detail: { filters: this.filters }
      });
      this.dispatchEvent(getFilterParent);
    } catch (e) {
      console.log(e);
    }
  }

  @api
  showAdvancedFilters() {
    let advancedFilters = this.template.querySelector(
      "c-lwc_ipt-advanced-filters"
    );
    advancedFilters.openModal();
    console.log("Entra a showAdvancedFilters");
  }

  download(event) {
    event.preventDefault();
    try {
      var f = this.filters;
      var domain = this.Label.domain;
      if (this.isonetrade == false) {
        if (this.fromcashnexus == true) {
          domain = this.Label.domainCashNexus;
        }
        if (this.backfront == true) {
          domain = this.Label.domainBackfront;
        }
      }
      downloadAll({ body: f })
        .then((result) => {
          console.log(result);
          if (result != null && result != "" && result != undefined) {
            window.location.href =
              domain +
              "/sfc/servlet.shepherd/document/download/" +
              result +
              "?operationContext=S1";
            setTimeout(function () {
              this.removeFile(result);
            }, 80000);
          }
        })
        .catch((error) => {
          console.log(error); // TestError
        });
    } catch (e) {
      console.log(e);
    }
  }
  setAccountSelected(accList) {
    if (accList) {
      this.selectedAccounts = accList.map((accItr) => accItr.account.accountId);
    } else {
      this.selectedAccounts = [];
    }
  }
  @api
  filterData(params) {
    try {
      var filtersAux = params.detail.filters;
      var countAux = params.detail.count;
      console.log("COUNT");
      console.log(filtersAux);
      console.log(countAux);
      this.filters = filtersAux;
      this.count = countAux;
      var aux = new Object();
      aux.detail = new Object();
      aux.detail.filters = filtersAux;
      aux.detail.count = countAux;
      try {
        let filterObject = JSON.parse(filtersAux);
        if (!params.detail.noAccountSelected) {
          this.setAccountSelected(
            filterObject.searchData.originatorAccountList
          );
        }
        this.currency = filterObject.searchData.currency
          ? filterObject.searchData.currency
          : "";
      } catch (e) {
        // no llega ninguno de estos valores en el filtro
      }
      if (this.filters != null && this.filters != undefined) {
        const getFilterParent = new CustomEvent("getfilterparent", {
          detail: { filters: this.filters }
        });
        this.dispatchEvent(getFilterParent);
      }
    } catch (e) {
      console.log(e);
    }
  }

  @api
  updateFilterData(event) {
    var filterAux = "";
    var valueAux = "";
    if (Array.isArray(event.detail)) {
      var valueAuxF = "";
      var valueAuxT = "";
      for (var i in event.detail) {
        filterAux = event.detail[i].filter;
        valueAux = event.detail[i].value;
        if (filterAux == "settledFrom") {
          if (this.settledFrom != valueAux) {
            this.settledFrom = valueAux;
            valueAuxF = valueAux;
          }
        } else if (filterAux == "settledTo") {
          if (this.settledTo != valueAux) {
            this.settledTo = valueAux;
            valueAuxT = valueAux;
          }
        }
      }
      this.template
        .querySelector("c-lwc_ipt-advanced-filters")
        .setSettledFromComponent(valueAuxF, valueAuxT);
    } else {
      filterAux = event.detail.filter;
      valueAux = event.detail.value;
    }
    try {
      if (filterAux != "") {
        if (filterAux == this.Label.currency) {
          if (JSON.stringify(this.currency) != JSON.stringify(valueAux)) {
            this.currency = valueAux;
            this.template
              .querySelector("c-lwc_ipt-advanced-filters")
              .setCurrencyFromComponent(valueAux);
          }
        } else if (filterAux == this.Label.Account) {
          if (
            JSON.stringify(this.selectedAccounts) != JSON.stringify(valueAux)
          ) {
            this.selectedAccounts = valueAux;
            this.template
              .querySelector("c-lwc_ipt-advanced-filters")
              .setAccountFromComponent(valueAux);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  @api
  updateFiltering(filterAux, valueAux) {
    // this.template.querySelector("c-lwc_ipt-advanced-filters").updateFilterDropdown(filterAux, valueAux, true);
  }

  removeFile(id) {
    try {
      removeFile({ id: id })
        .then((value) => {
          // result = value;
        })
        .catch((error) => {
          console.log(error); // TestError
        });
    } catch (e) {
      console.log(e);
    }
  }

  retrieveList() {
    try {
      var f = this.filters;
      return new Promise(function (resolve, reject) {
        downloadAll({ body: f })
          .then((value) => {
            console.log(value);
            return value;
          })
          .catch((error) => {
            console.log(error); // TestError
          });
      });
    } catch (e) {
      console.log(e);
    }
  }

  @api
  setDataNexus(accountlist) {
    console.log("setDataNexus");
    try {
      if (accountlist.length > 0) {
        var filter = '{"searchData":{';
        var filterAccount = '"originatorAccountList":[';
        var accountsToDisplay = [];
        filter += '"valueDateFrom":"' + this.getDaysFilter(15) + '",';
        filter += '"valueDateTo":"' + this.getDaysFilter() + '",';
        for (var i in accountlist) {
          accountsToDisplay.push({
            label: accountlist[i].account,
            value: accountlist[i].account
          });
          filterAccount +=
            '{"bankId":"' +
            accountlist[i].bic +
            '","account":{"idType":"' +
            accountlist[i].id_type +
            '","accountId":"' +
            accountlist[i].account +
            '"}},';
        }
        this.accountListToDisplay = accountsToDisplay;
        //this.accountListToDisplay = [{label:"label1", value:"value1"}, {label:"label2", value:"value2"}, {label:"label3", value:"value3"}];
        this.ready = true;
        console.log(
          "ALV this.accountListToDisplay: " +
            JSON.stringify(this.accountListToDisplay)
        );

        filterAccount = filterAccount.slice(0, -1) + "]";
        this.accountFilter = filterAccount;

        // Cambiar "latestPaymentsFlag": "NO" a YES cuando se configuren las búsquedas con account
        //filter+=filterAccount+',"latestPaymentsFlag": "YES","_offset": "0","_limit": "1000", "inOutIndicator": "OUT"}}';
        filter +=
          filterAccount +
          ',"latestPaymentsFlag": "NO","_offset": "0","_limit": "1000", "inOutIndicator": "OUT"}}';
        //filter+='"latestPaymentsFlag": "NO","_offset": "0","_limit": "1000", "inOutIndicator": "OUT"}}';

        this.filters = filter;
        const getfilterparentevent = new CustomEvent("getfilterparent", {
          detail: { filters: filter }
        });
        this.dispatchEvent(getfilterparentevent);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
