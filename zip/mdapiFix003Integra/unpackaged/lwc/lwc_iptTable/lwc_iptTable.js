import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { loadStyle } from "lightning/platformResourceLoader";

//Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

//Import Apex method
import getFilteredData from "@salesforce/apex/CNT_SwiftPaymentTable.getFilteredData";
import downloadMT103Doc from "@salesforce/apex/CNT_SwiftPaymentTable.downloadMT103Doc";
import getDateAndTime from "@salesforce/apex/CNT_SwiftPaymentTable.getDateAndTime";
import encryptData from "@salesforce/apex/Global_Utilities.encryptData";
import removeMT103 from "@salesforce/apex/CNT_SwiftPaymentTable.removeMT103";

//Import labels
import noPayments15Days from "@salesforce/label/c.noPayments15Days";
import search from "@salesforce/label/c.search";
import Loading from "@salesforce/label/c.Loading";
import status from "@salesforce/label/c.status";
import originAccount from "@salesforce/label/c.originAccount";
import beneficiaryAccount from "@salesforce/label/c.beneficiaryAccount";
import AdminRoles_Order from "@salesforce/label/c.AdminRoles_Order";
import T_ReverseOrder from "@salesforce/label/c.T_ReverseOrder";
import settledAmount from "@salesforce/label/c.settledAmount";
import actions from "@salesforce/label/c.actions";
import tracking from "@salesforce/label/c.tracking";
import downloadMT103 from "@salesforce/label/c.downloadMT103";
import noResultsFound from "@salesforce/label/c.noResultsFound";
import valueDate from "@salesforce/label/c.valueDate";
import domain from "@salesforce/label/c.domain";
import domainCashNexus from "@salesforce/label/c.domainCashNexus";
import payment_statusOne from "@salesforce/label/c.payment_statusOne";
import payment_statusTwo from "@salesforce/label/c.payment_statusTwo";
import payment_statusThree from "@salesforce/label/c.payment_statusThree";
import payment_statusFour from "@salesforce/label/c.payment_statusFour";
import NoResultsSearch from "@salesforce/label/c.NoResultsSearch";
import SearchAgain from "@salesforce/label/c.SearchAgain";

export default class lwc_IPTTable extends NavigationMixin(LightningElement) {
  //Labels
  label = {
    noPayments15Days,
    search,
    Loading,
    status,
    originAccount,
    beneficiaryAccount,
    AdminRoles_Order,
    T_ReverseOrder,
    settledAmount,
    actions,
    tracking,
    downloadMT103,
    noResultsFound,
    valueDate,
    domain,
    domainCashNexus,
    payment_statusOne,
    payment_statusTwo,
    payment_statusThree,
    payment_statusFour,
    NoResultsSearch,
    SearchAgain
  };

  //Attributes
  @track paymentsPerPage = 50;
  //@api paymentsPerPage = 50;
  @track currentPage = 1;
  @track oldPage = 1;
  @track start = 0;
  @track receivedList = [];
  @track end;
  @track paginationReceivedList = [];
  @track jsonArray = [];
  @track agent;
  @track auxNN = 0;
  //@api agent;
  @track sortsettledAmount = "desc";
  @track sortvalueDate = "desc";
  @api filters;
  @track searchDone = 0;
  //@api noResultsLabel = noPayments15Days;
  @track noResultsLabel = noPayments15Days;
  //@api searchLabel = search;
  @track searchLabel = search;
  @api fromcashnexus = false;
  @api isonetrade = false;
  @track hidespinner = false;

  //Row attributes
  @track statusClass = "circle icon-circle__red";
  @track statusLabel = payment_statusOne;

  //Connected Callback
  connectedCallback() {
    console.log("en callback table");
    loadStyle(this, santanderStyle + "/style.css");
  }

  get isvisible() {
    return false;
  }

  get isSortValueDateDesc() {
    return this.sortvalueDate == "desc" ? true : false;
  }

  get isSortSettledAmountDesc() {
    return this.sortsettledAmount == "desc" ? true : false;
  }

  get isJsonArrayGreatherZero() {
    return this.jsonArray.length > 0;
  }

  get isJsonArrayEmpty() {
    return (
      this.jsonArray.length == 0 ||
      this.jsonArray == null ||
      this.jsonArray == undefined
    );
  }
  @api
  getData() {
    console.log("Retrieve Data");
    this.auxNN = this.auxNN + 1;
    try {
      var entered = this.searchDone;
      if (entered > 1) {
        this.noResultsLabel = this.label.NoResultsSearch;
        this.searchLabel = this.label.SearchAgain;
      }
      this.searchDone = entered + 1;
      this.hidespinner = false;
      var filters = this.filters;
      try {
        getFilteredData({
          filters: this.filters
        })
          .then((result) => {
            this.initTable(result);
          })
          .catch((error) => {
            console.log(
              "### lwc_iptTable ### getData() ::: Catch (1): " + error
            );
            this.jsonArray = [];
            this.hidespinner = true;
          });
      } catch (e) {
        console.log("### lwc_iptTable ### getData() ::: Catch (2): " + e);
      }

      this.currentPage = 1;
    } catch (e) {
      console.log(e);
    }
  }

  buildData(event) {
    try {
      console.log("En build data");
      var json = this.jsonArray;
      var currentPage = event.detail.currentPage;
      var oldPage = this.oldPage;
      var perPage = this.paymentsPerPage;
      var start = event.detail.start;
      var end = event.detail.end;
      currentPage = event.detail.currentPage;

      if (
        currentPage != null &&
        currentPage != undefined &&
        currentPage != "" &&
        oldPage != currentPage
      ) {
        //Update the index of dataset to display
        if (currentPage > oldPage && currentPage != 1) {
          this.start = perPage * currentPage - perPage;
          if (Math.ceil(json.length / currentPage) >= perPage) {
            this.end = perPage * currentPage;
          } else {
            this.end = json.length;
          }
        } else {
          this.end = perPage * currentPage;
          this.start = perPage * currentPage - perPage;
          if (currentPage == 1) {
            this.start = 0;
            this.end = perPage;
          }
        }
        this.oldPage = currentPage;
        for (var i = 0; i < json.length; i++) {
          if (i >= this.start && i < this.end) {
            json[i].isvisible = true;
          } else {
            json[i].isvisible = false;
          }
        }
        this.jsonArray = json;
      }
    } catch (e) {
      console.error(e);
    }
  }

  @api
  initTable(params) {
    console.log("initTable");
    if (params) {
      this.initTableHelper(params, true);
    }
  }

  initTableHelper(res, hideSpinner) {
    if (res != null && res != undefined && Object.keys(res).length > 0) {
      var parseJSON = res.paymentsList;
      if (parseJSON == undefined) {
        parseJSON = res.paymentList;
      }
      this.start = 0;
      // Set the status and icon for the payments
      parseJSON = JSON.parse(JSON.stringify(this.setPaymentStatus(parseJSON)));
      if (parseJSON.length < this.paymentsPerPage) {
        this.end = parseJSON.length;
      } else {
        this.end = this.paymentsPerPage;
      }
      for (var i = 0; i < parseJSON.length; i++) {
        if (i >= this.start && i < this.end) {
          parseJSON[i].isvisible = true;
        } else {
          parseJSON[i].isvisible = false;
        }
      }
      this.jsonArray = parseJSON;
      this.template.querySelector("c-lwc_ipt-pagination").setPagesNumber({
        allDataReceivedAux: parseJSON
      });
    } else {
      this.jsonArray = [];
    }
    if (!this.hidespinner) this.hidespinner = true;
  }

  sortBy(event) {
    try {
      //Retrieve the field to sort by
      var desc = this.template
        .querySelector("#" + event.target.id)
        .getAttribute("data-value");
      if (desc != null && desc != "" && desc != undefined) {
        var targetItem = desc.includes("valueDate")
          ? "valueDate"
          : "settledAmount";
        var sortItem = desc.includes("valueDate")
          ? this.sortvalueDate
          : this.sortsettledAmount; // GAA Quiero que sortItem sea el valor del attributo llamado sort+targetItem, no el string en sí

        var sorted = this.sortByHelper(sortItem, targetItem);

        if (sorted != undefined && sorted != null) {
          for (var i = 0; i < sorted.length; i++) {
            if (i >= this.start && i < this.end) {
              sorted[i].isvisible = true;
            } else {
              sorted[i].isvisible = false;
            }
          }
          this.jsonArray = sorted;

          if (targetItem.includes("valueDate")) {
            this.sortvalueDate = this.sortvalueDate == "desc" ? "asc" : "desc";
          } else if (targetItem.includes("settledAmount")) {
            this.sortsettledAmount =
              this.sortsettledAmount == "desc" ? "asc" : "desc";
          }
          this.currentPage = 1;

          /*this.template.querySelector("c-lwc_ipt-pagination").buildData({
                        currentPageAux: 1
                    });*/
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  sortByHelper(sortItem, sortBy) {
    try {
      var order = sortItem;
      if (order != "" && order != null && order != undefined) {
        var data = this.jsonArray;
        if (data != null && data != undefined) {
          let sort;
          if (order == "desc") {
            if (sortBy == "settledAmount") {
              //
              sort = data.sort(
                (a, b) =>
                  parseFloat(b.paymentDetail.paymentAmount.amount) -
                  parseFloat(a.paymentDetail.paymentAmount.amount)
              );
            } else if (sortBy == "valueDate") {
              sort = data.sort(
                (a, b) =>
                  new Date(
                    this.formatDate(b.paymentDetail.valueDate)
                  ).getTime() -
                  new Date(this.formatDate(a.paymentDetail.valueDate)).getTime()
              );
            }
          } else {
            if (sortBy == "settledAmount") {
              sort = data.sort(
                (a, b) =>
                  parseFloat(a.paymentDetail.paymentAmount.amount) -
                  parseFloat(b.paymentDetail.paymentAmount.amount)
              );
            } else if (sortBy == "valueDate") {
              sort = data.sort(
                (a, b) =>
                  new Date(
                    this.formatDate(a.paymentDetail.valueDate)
                  ).getTime() -
                  new Date(this.formatDate(b.paymentDetail.valueDate)).getTime()
              );
            }
          }
          return sort;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  formatDate(date) {
    if (date != "" && date.length == 10) {
      var res =
        date.slice(6, 10) + "/" + date.slice(3, 5) + "/" + date.slice(0, 2);
      return res;
    }
  }

  openSearch() {
    try {
      const openadvancedfilters = new CustomEvent("openadvancedfilters", {
        openModal: true
      });
      this.dispatchEvent(openadvancedfilters);
    } catch (e) {
      console.log(e);
    }
  }

  /*findId(item){
        return item.paymentDetail.paymentId = this.paymentRow;
    }*/

  openPaymentDetails(event) {
    var paymentRow = event.currentTarget.getAttribute("data-value");
    //const item = this.jsonArray.find(findId);
    const item = this.jsonArray.find(function (item) {
      return item.paymentDetail.paymentId == paymentRow;
    });
    var url =
      "c__paymentId=" +
      item.paymentDetail.paymentId +
      "&c__valueDate=" +
      item.paymentDetail.valueDate +
      "&c__reason=" +
      item.paymentDetail.transactionStatus.reason +
      "&c__status=" +
      item.paymentDetail.transactionStatus.status +
      "&c__orderingAccount=" +
      item.paymentDetail.originatorData.originatorAccount.accountId +
      "&c__orderingBIC=" +
      item.paymentDetail.originatorAgent.agentCode +
      "&c__orderingBank=" +
      item.paymentDetail.originatorAgent.agentName +
      "&c__orderingName=" +
      item.paymentDetail.originatorData.originatorName +
      "&c__beneficiaryAccount=" +
      item.paymentDetail.beneficiaryData.creditorCreditAccount.accountId +
      "&c__beneficiaryName=" +
      item.paymentDetail.beneficiaryData.beneficiaryName +
      "&c__beneficiaryBank=" +
      item.paymentDetail.beneficiaryData.creditorAgent.agentName +
      "&c__beneficiaryBIC=" +
      item.paymentDetail.beneficiaryData.creditorAgent.agentCode +
      "&c__amount=" +
      item.paymentDetail.paymentAmount.amount +
      "&c__currency=" +
      item.paymentDetail.paymentAmount.currency_X +
      "&c__beneficiaryCity=" +
      item.paymentDetail.beneficiaryData.creditorAgent.agentLocation +
      "&c__beneficiaryCountry=" +
      item.paymentDetail.beneficiaryData.creditorAgent.agentCountry;
    this.goTo("payment-details", url);
  }

  downloadMT103(event) {
    var id = event.currentTarget.getAttribute("data-value");
    try {
      downloadMT103Doc({
        str: id
      })
        .then((results) => {
          if (results != null && results != "" && results != undefined) {
            var domain = this.label.domain;
            if (this.isonetrade == false) {
              if (this.fromcashnexus == true) {
                domain = this.label.domainCashNexus;
              }
            }
            window.location.href =
              domain +
              "/sfc/servlet.shepherd/document/download/" +
              results +
              "?operationContext=S1";
            setTimeout(function () {
              this.removeMT103(results);
            }, 80000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  doInit() {
    var status = item.paymentDetail.transactionStatus.status;
    var reason = item.paymentDetail.transactionStatus.reason;
    if (status == "RJCT") {
      this.statusLabel = this.label.payment_statusOne;
      this.statusClass = "circle icon-circle__red";
    }
    if (status == "ACSC" || status == "ACCC") {
      this.statusLabel = this.label.payment_statusTwo;
      this.statusClass = "circle icon-circle__green";
    }
    if (status == "ACSP") {
      if (
        reason == "G000" ||
        reason == "G001" ||
        reason == null ||
        reason == "null"
      ) {
        this.statusLabel = this.label.payment_statusThree;
        this.statusClass = "circle icon-circle__blue";
      }
      if (reason == "G002" || reason == "G003" || reason == "G004") {
        this.statusLabel = this.label.payment_statusFour;
        this.statusClass = "circle icon-circle__orange";
      }
    }
  }

  setPaymentStatus(payments) {
    for (var key in payments) {
      var status = payments[key].paymentDetail.transactionStatus.status;
      var reason = payments[key].paymentDetail.transactionStatus.reason;
      if (status == "RJCT") {
        payments[key].paymentDetail.statusLabel = this.label.payment_statusOne;
        payments[key].paymentDetail.statusClass = "circle icon-circle__red";
      }
      if (status == "ACSC" || status == "ACCC") {
        payments[key].paymentDetail.statusLabel = this.label.payment_statusTwo;
        payments[key].paymentDetail.statusClass = "circle icon-circle__green";
      }
      if (status == "ACSP") {
        if (
          reason == "G000" ||
          reason == "G001" ||
          reason == null ||
          reason == "null"
        ) {
          payments[
            key
          ].paymentDetail.statusLabel = this.label.payment_statusThree;
          payments[key].paymentDetail.statusClass = "circle icon-circle__blue";
        }
        if (reason == "G002" || reason == "G003" || reason == "G004") {
          payments[
            key
          ].paymentDetail.statusLabel = this.label.payment_statusFour;
          payments[key].paymentDetail.statusClass =
            "circle icon-circle__orange";
        }
      }
    }
    return payments;
  }

  getDateTime() {
    try {
      if (item.paymentDetail.statusDate != undefined) {
        getDateAndTime({
          date: item.paymentDetail.statusDate
        })
          .then((result) => {
            var results =
              res.substring(8, 10) +
              "/" +
              result.substring(5, 7) +
              "/" +
              result.substring(0, 4) +
              " | " +
              result.substring(11);
            item.paymentDetail.statusDate = results;
          })
          .catch((error) => {
            console.log("### lwc_iptTable / getDateTime ### " + error);
            this.jsonArray = [];
          });
      }
    } catch (e) {
      console.log("### lwc_iptTable / getDateTime ### " + e);
    }
  }

  goTo(page, url) {
    try {
      this.encrypt(page, url);
    } catch (e) {
      console.log(e);
    }
  }

  encrypt(page, urlAddress) {
    var result = "";
    try {
      encryptData({
        str: urlAddress
      })
        .then((value) => {
          result = value;
          this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
              pageName: page
            },
            state: {
              params: result
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  removeMT103(data) {
    try {
      removeMT103({
        id: data
      })
        .then((result) => {})
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }
  @api
  setFilters(e) {
    this.filters = e;
  }
}
