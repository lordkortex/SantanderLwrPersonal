import { LightningElement, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";

import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

// Import labels
import Loading from "@salesforce/label/c.Loading";
import History_of_statements from "@salesforce/label/c.History_of_statements";

// Import apex methods
import getCurrentUserTimezoneOffSetInMiliseconds from "@salesforce/apex/CNT_StatementHistoryController.getCurrentUserTimezoneOffSetInMiliseconds";
import searchExtracts from "@salesforce/apex/CNT_StatementHistoryController.searchExtracts";
import decryptData from "@salesforce/apex/CNT_TransactionSearchController.decryptData";
import Id from "@salesforce/user/Id";

export default class Lwc_historyOfStatements extends LightningElement {
  label = {
    Loading,
    History_of_statements
  };

  @track loading = true;
  @track accountsList;
  @track accountsListString;
  @track comesFrom = "None";
  @track accountName;
  @track accountCurrency;
  @track accountNumber;
  @track bankName;
  @track accountCode;
  @track subsidiaryName;
  @track tableData;
  @track selectedAccount;
  @track selectedAccountObject;
  @track dates;
  @track filters = ["Book Date"];
  @track userDateFormat;
  @track userNumberFormat;
  @track divisaPrincipal;
  @track hasSearched;
  @track isFirstTime = true;
  comesfromtracker = false;
  firenavigationevent = false;

  get isLoading() {
    return this.label.Loading + "...";
  }

  get comesFromNone() {
    return this.comesFrom == "None";
  }

  get comesFromAccounts() {
    return this.comesFrom == "Accounts";
  }

  renderedCallback() {
    if (this.isFirstTime) {
      loadStyle(this, santanderStyle + "/style.css");
      this.doInit();
      this.isFirstTime = false;
    }
  }

  doInit() {
    var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
    if (sPageURLMain == "" || !sPageURLMain.includes("params")) {
      // this.populateServiceProfiling(true);
      this.template
        .querySelector("c-lwc_service-component")
        .retrieveFromCache({
          key: "balanceEODGP",
          callercomponent: "retrieveFromCache"
        });
    } else {
      /*this.template.querySelector("c-lwc_service-component").apexDataDecryption(
                {datauri: sPageURLMain, callercomponent:"apexDataDecryption"}
            );*/
      var sURLVariablesMain = sPageURLMain.split("&")[0].split("=");
      if (sURLVariablesMain[0] == "params") {
        this.decrypt(sURLVariablesMain[1]);
      }
    }
  }

  decrypt(data) {
    var result = "";
    decryptData({ str: data })
      .then((value) => {
        result = value;
        //this.desencriptadoUrl = result;
        var sURLVariables = result.split("&");
        var sParameterName;
        var accountDetails = [];
        for (var i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split("=");

          switch (sParameterName[0]) {
            case "c__comesFrom":
              sParameterName[1] === undefined
                ? "Not found"
                : (this.comesFrom = sParameterName[1]);
              var listObject = [];
              listObject.push({});
              if (this.dates != undefined) {
                listObject[0].data = this.dates;
              }
              listObject[0].name = "Book date";
              listObject[0].type = "dates";
              listObject[0].displayFilter = true;
              this.filters = listObject;

              break;
            case "c__accountName":
              sParameterName[1] === undefined
                ? "Not found"
                : (this.accountName = sParameterName[1]);
              break;
            case "c__currentCurrency":
              sParameterName[1] === undefined
                ? "Not found"
                : (this.accountCurrency = sParameterName[1]);
              break;
            case "c__accountNumber":
              sParameterName[1] === undefined
                ? "Not found"
                : (this.accountNumber = sParameterName[1]);
              break;
            case "c__bankName":
              sParameterName[1] === undefined
                ? (this.bankName = "")
                : (this.bankName = sParameterName[1]);
              break;
            case "c__accountCode":
              sParameterName[1] === undefined
                ? "Not found"
                : (this.accountCode = sParameterName[1]);
              break;
            case "c__subsidiaryName":
              sParameterName[1] === undefined
                ? (this.subsidiaryName = "")
                : (this.subsidiaryName = sParameterName[1]);
              break;
          }
        }

        if (this.comesFrom == "Accounts") {
          accountDetails[0] = new Object();
          accountDetails[0].codigoCuenta = this.accountCode;
          accountDetails[0].alias = this.accountName;
          accountDetails[0].bankName = this.bankName;
          accountDetails[0].subsidiaryName = this.subsidiaryName;
          accountDetails[0].displayNumber = this.accountNumber;
          accountDetails[0].currencyCodeAvailableBalance = this.accountCurrency;
          this.selectedAccountObject = accountDetails;
          var dates = this.checkDates();
          this.getISOStringFromDateString(dates, this.accountCode);
        }
      })
      .catch((error) => {
        console.log("decrypt IAM_TransactionsParent: " + error); // TestError
      });
    return result;
  }

  populateServiceProfiling(response) {
    var responseParsed;
    if (response) {
      responseParsed = JSON.parse(response);
    } else {
      var userId = Id;
      this.template
        .querySelector("c-lwc_service-component")
        .onCallApex({
          controllermethod: "retrieveInitialData",
          actionparameters: { userId: userId },
          callercomponent: "retrieveInitialData"
        });
    }

    if (responseParsed != undefined) {
      var codes = responseParsed.responseAcc.accountList.map((item) => {
        if (item["currencyCodeAvailableBalance"] != undefined) {
          return (
            item["currencyCodeAvailableBalance"] + " - " + item["displayNumber"]
          );
        } else {
          return item["displayNumber"];
        }
      });

      this.accountsListString = codes;
      this.accountsList = responseParsed.responseAcc.accountList;
      this.tableData = responseParsed.responseAcc.accountList;
      this.userDateFormat = responseParsed.mapUserFormats.dateFormat;
      this.userNumberFormat = responseParsed.mapUserFormats.numberFormat;
      this.loading = false;
    }
  }

  handleParams(response) {
    if (response != "") {
      var sParameterName;
      var accountDetails = [];
      for (var i = 0; i < response.length; i++) {
        sParameterName = response[i].split("=");

        switch (sParameterName[0]) {
          case "c__comesFrom":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.comesFrom = sParameterName[1]);
            var listObject = [];
            listObject.push({});
            if (this.dates != undefined) {
              listObject[0].data = this.dates;
            }
            listObject[0].name = "Book date";
            listObject[0].type = "dates";
            listObject[0].displayFilter = true;
            this.filters = listObject;

            break;
          case "c__accountName":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.accountName = sParameterName[1]);
            break;
          case "c__currentCurrency":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.accountCurrency = sParameterName[1]);
            break;
          case "c__accountNumber":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.accountNumber = sParameterName[1]);
            break;
          case "c__bankName":
            sParameterName[1] === undefined
              ? (this.bankName = "")
              : (this.bankName = sParameterName[1]);
            break;
          case "c__accountCode":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.accountCode = sParameterName[1]);
            break;
          case "c__subsidiaryName":
            sParameterName[1] === undefined
              ? (this.subsidiaryName = "")
              : (this.subsidiaryName = sParameterName[1]);
            break;
        }
      }
    }
    if (this.comesFrom == "Accounts") {
      accountDetails[0] = new Object();
      accountDetails[0].codigoCuenta = this.accountCode;
      accountDetails[0].alias = this.accountName;
      accountDetails[0].bankName = this.bankName;
      accountDetails[0].subsidiaryName = this.subsidiaryName;
      accountDetails[0].displayNumber = this.accountNumber;
      accountDetails[0].currencyCodeAvailableBalance = this.accountCurrency;
      this.selectedAccountObject = accountDetails;
      var dates = this.checkDates();
      this.getISOStringFromDateString(dates, this.accountCode);
    }
  }

  checkDates() {
    var dates = this.dates;
    // Only To date is filled, then fill From with -25 months
    if (dates) {
      if (dates[0] == undefined && dates[1] != undefined) {
        var toDate = new Date(Date.parse(dates[1]));
        var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));
        var finalDate = "";
        var aux = toDate.getMonth() + 1;
        finalDate =
          fromDate.getFullYear() + "-" + aux + "-" + fromDate.getDate();
        dates[0] = finalDate;
        this.dates = dates;
        // Only From date is filled, then fill until today
      }
      if (
        (dates[1] == undefined && dates[0] != undefined) ||
        dates[0] > dates[1]
      ) {
        var toDate = new Date(Date.now());
        var fromDate = new Date(Date.parse(dates[0]));
        var finalDate = "";
        if (fromDate >= toDate) {
          toDate.setMonth(fromDate.getMonth() + 25);
        }
        var aux = toDate.getMonth() + 1;
        finalDate =
          toDate.getFullYear() + "-" + aux + "-" + (toDate.getDate() - 1);
        dates[1] = finalDate;
        this.dates = dates;
      }
      if (dates[0] == undefined && dates[1] == undefined) {
        var toDate = new Date(Date.now());
        toDate.setDate(toDate.getDate() - 1);

        var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

        var toDate2 = new Date(Date.now());
        toDate2.setDate(toDate2.getDate() - 1);

        var toDateFinal =
          toDate2.getFullYear() +
          "-" +
          (toDate2.getMonth() + 1) +
          "-" +
          toDate2.getDate();
        var fromDateFinal =
          fromDate.getFullYear() +
          "-" +
          (fromDate.getMonth() + 1) +
          "-" +
          fromDate.getDate();

        dates[0] = fromDateFinal;
        dates[1] = toDateFinal;
        //component.set("v.dates", dates);
        this.dates = [];
      }
    } else {
      var toDate = new Date(Date.now());
      toDate.setDate(toDate.getDate() - 1);

      var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

      var toDate2 = new Date(Date.now());
      toDate2.setDate(toDate2.getDate() - 1);

      var toDateFinal =
        toDate2.getFullYear() +
        "-" +
        (toDate2.getMonth() + 1) +
        "-" +
        toDate2.getDate();
      var fromDateFinal =
        fromDate.getFullYear() +
        "-" +
        (fromDate.getMonth() + 1) +
        "-" +
        fromDate.getDate();

      dates = [];
      dates[0] = fromDateFinal;
      dates[1] = toDateFinal;
      //component.set("v.dates", dates);
      this.dates = [];
    }

    return dates;
  }

  getISOStringFromDateString(dateString, codCuenta) {
    getCurrentUserTimezoneOffSetInMiliseconds({
      dateInput: [dateString[0], dateString[1]]
    })
      .then((response) => {
        var res = response;
        if (res != null && res != undefined && res != "") {
          var from = this.formatDateGMT(
            dateString[0],
            res[dateString[0]],
            true
          );
          var to = this.formatDateGMT(dateString[1], res[dateString[1]], false);
          var dates = [];
          dates[0] = from;
          dates[1] = to;
          //this.dates = dates;
          searchExtracts({
            accountCode: codCuenta,
            dateFrom: dates[0],
            dateTo: dates[1]
          })
            .then((result) => {
              this.setHistoryList(result);
            })
            .catch((error) => {
              console.log(error);
            });

          // this.template.querySelector("c-lwc_service-component").onCallApex(
          //     {controllermethod: "searchExtracts",
          //     actionparameters: {
          //         accountCode: codCuenta,
          //         dateFrom : dates[0],
          //         dateTo : dates[1]
          //     },
          //     callercomponent: "searchExtracts"}
          // );
        }
      })
      .catch((error) => {
        var errors = error.getError();
        if (errors) {
          this.errorAccount = true;

          if (errors[0] && errors[0].message) {
            console.log("Error message: " + errors[0].message);
          }
        } else {
          console.log("Unknown error");
        }
      });
  }

  formatDateGMT(dateString, res, beginningOfDay) {
    var timeZoneOffsetInMs = res;
    var MS_PER_HOUR = 3600000;
    var MS_PER_MIN = 60000;
    // Get the date and format it in a proper way
    var dateChunks = dateString.split("-");
    var monthChunk = dateChunks[1];
    var dayChunk = dateChunks[2];
    if (dateChunks[1].length < 2) {
      monthChunk = "0" + dateChunks[1];
    }
    if (dateChunks[2].length < 2) {
      dayChunk = "0" + dateChunks[2];
    }
    dateString = dateChunks[0] + "-" + monthChunk + "-" + dayChunk;
    // We have the user's locale timezone from Salesforce and a date created with the browser's timezone
    // So first we need to adapt both values
    var timezoneOffsetDate = new Date();

    var localTimezoneOffSet =
      timezoneOffsetDate.getTimezoneOffset() * MS_PER_MIN;
    //GET DATESTRING NO GMT

    var x = new Date(Date.parse(dateString));

    const getUTC = x.getTime();
    const offset = x.getTimezoneOffset() * 60000;
    var xx = new Date(getUTC + offset).toString();
    var newDate;
    newDate = new Date(Date.parse(xx) - timeZoneOffsetInMs);

    if (!beginningOfDay) {
      newDate.setTime(newDate.getTime() + MS_PER_HOUR * 24);
      newDate.setTime(newDate.getTime() - 1);
    }
    var month = parseInt(newDate.getMonth()) + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = newDate.getDate();
    var hour = newDate.getHours();

    var mins = newDate.getMinutes();
    var secs = newDate.getSeconds();
    var msecs = newDate.getMilliseconds();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (day < 10) {
      day = "0" + day;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    if (msecs > 9 && msecs < 100) {
      msecs = "0" + msecs;
    } else if (msecs < 10) {
      msecs = "00" + msecs;
    }
    var finalDate =
      newDate.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hour +
      ":" +
      mins +
      ":" +
      secs +
      "." +
      msecs +
      "Z";
    if (beginningOfDay) {
      this.fromDate = finalDate;
    } else {
      this.toDate = finalDate;
    }

    return finalDate;
  }

  setData(response) {
    var codes = response.responseAcc.accountList.map((item) => {
      if (item["currencyCodeAvailableBalance"] != undefined) {
        return (
          item["currencyCodeAvailableBalance"] + " - " + item["displayNumber"]
        );
      } else {
        return item["displayNumber"];
      }
    });

    this.accountsListString = codes;
    this.accountsList = response.responseAcc.accountList;
    this.tableData = response.responseAcc.accountList;
    this.userDateFormat = response.mapUserFormats.dateFormat;
    this.userNumberFormat = response.mapUserFormats.numberFormat;
    this.loading = false;

    this.template
      .querySelector("c-lwc_service-component")
      .saveToCache({ key: "balanceEODGP", data: response });
  }

  setHistoryList(response) {
    //response = {"listaSaldos":[{"saldo":{"bookBalance":223322.01,"bookBalance_Formatted":"223.322,01","bookDate":"2020-01-24","bookDate_Formatted":"2020-01-24","valueBalance":223322.02,"valueBalance_Formatted":"223.322,02","valueDate":"2020-01-24","valueDate_Formatted":"2020-01-24"}},{"saldo":{"bookBalance":102212.01,"bookBalance_Formatted":"102.212,01","bookDate":"2020-01-23","bookDate_Formatted":"2020-01-23","valueBalance":102212.02,"valueBalance_Formatted":"102.212,02","valueDate":"2020-01-23","valueDate_Formatted":"2020-01-23"}}]};
    if (response == null) {
      this.tableData = [];
      this.loading = false;
    } else {
      this.tableData = response.listaSaldos;
      this.loading = false;
    }
    this.hasSearched = true;
  }

  handleSearch(event) {
    this.dates = event.detail.dates;
    this.loading = true;
    if (this.comesFrom != "Accounts") {
      var selectedAccount = this.selectedAccount.includes("-")
        ? this.selectedAccount.split("- ")[1]
        : this.selectedAccount;

      var matchingAccount = this.accountsList.filter(
        (data) => data["displayNumber"] == selectedAccount
      );
      this.selectedAccountObject = matchingAccount;
      var dates = this.dates;

      this.accountCurrency = this.selectedAccount.includes("-")
        ? this.selectedAccount.split("- ")[0]
        : "";
      this.getISOStringFromDateString(dates, matchingAccount[0].codigoCuenta);
    } else {
      var datesOK = this.validateDates();
      if (datesOK) {
        var dates = this.checkDates();

        var selectedAccount = this.accountNumber;
        if (
          this.selectedAccountObject == null ||
          this.selectedAccountObject == undefined
        ) {
          var selectedAccountObject = {};
          selectedAccountObject.accountCode = this.accountCode;
          selectedAccountObject.accountNumber = selectedAccount;
          selectedAccountObject.bankName = this.bankName;
          selectedAccountObject.subsidiaryName = this.subsidiaryName;
          selectedAccountObject.accountCurrency = this.accountCurrency;
          this.selectedAccountObject = selectedAccountObject;
        }
        this.getISOStringFromDateString(dates, this.accountCode);
      } else {
        this.loading = false;
      }
    }
  }

  validateDates() {
    var datesOK = true;
    var dates = this.dates;
    if (dates[0] != undefined && dates[1] != undefined) {
      var dateFromCheck = new Date(dates[0] + "T00:00:00.000Z");
      var dateToCheck = new Date(dates[1] + "T00:00:00.000Z");

      var toDate = new Date(Date.now());
      toDate.setDate(toDate.getDate() - 2);

      var fromDate = new Date(toDate.setMonth(toDate.getMonth() - 25));

      var toDate2 = new Date(Date.now());
      toDate2.setDate(toDate2.getDate() - 1);

      if (dateFromCheck.getTime() > dateToCheck.getTime()) {
        this.errorMessageTo = "From date cannot be higher than to date";
        datesOK = false;
      }
    }
    return datesOK;
  }

  handleSuccessCallback(event) {
    if (event.detail.callercomponent == "retrieveFromCache") {
      this.populateServiceProfiling(event.detail.value);
    } else if (event.detail.callercomponent == "apexDataDecryption") {
      this.handleParams(event.detail.value);
    } else if (event.detail.callercomponent == "retrieveInitialData") {
      this.setData(event.detail.value);
    }
    // else if(event.detail.callercomponent == "searchExtracts"){
    //     this.setHistoryList(event.detail.value);
    // }
  }

  handleDropdownValueSelected(event) {
    this.selectedAccount = event.detail;
  }
}
