import { LightningElement, api, track } from "lwc";

import { loadStyle, loadScript } from "lightning/platformResourceLoader";
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
//import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

import uId from "@salesforce/user/Id";
import localeCurrency from "@salesforce/i18n/currency";

import Loading from "@salesforce/label/c.Loading";
import GroupBy from "@salesforce/label/c.GroupBy";
import Country from "@salesforce/label/c.Country";
import LastUpdate from "@salesforce/label/c.LastUpdate";
import currency from "@salesforce/label/c.currency";
import Corporate from "@salesforce/label/c.Corporate";
import refreshBalanceCollout from "@salesforce/label/c.refreshBalanceCollout";
import ERROR_NOT_RETRIEVED from "@salesforce/label/c.ERROR_NOT_RETRIEVED";
import ERROR from "@salesforce/label/c.ERROR";

import setUserCurrencyString from "@salesforce/apex/CNT_International_Treasury_Management.setUserCurrencyString";
import decryptData from "@salesforce/apex/CNT_International_Treasury_Management.decryptData";
import encryptData from "@salesforce/apex/CNT_International_Treasury_Management.encryptData";
import setUserCurrency from "@salesforce/apex/CNT_International_Treasury_Management.setUserCurrency";
import callMulesoft from "@salesforce/apex/CNT_International_Treasury_Management.callMulesoft";
import getUserInfo from "@salesforce/apex/CNT_International_Treasury_Management.getUserInfo";
import orderByCountry from "@salesforce/apex/CNT_International_Treasury_Management.orderByCountry";
import orderByCurrency from "@salesforce/apex/CNT_International_Treasury_Management.orderByCurrency";
import orderBySubsidiary from "@salesforce/apex/CNT_International_Treasury_Management.orderBySubsidiary";

//Comunidad Cash Nexus
import basePath from "@salesforce/community/basePath";
import basePathCashNexus from "@salesforce/label/c.basePathCashNexus";

export default class Lwc_iam_accountsParent extends LightningElement {
  label = {
    Loading,
    GroupBy,
    Country,
    LastUpdate,
    currency,
    Corporate,
    refreshBalanceCollout,
    ERROR_NOT_RETRIEVED,
    ERROR,
    basePath,
    basePathCashNexus
  };
  //api vs track ?
  @track currencies = ["BRA", "DEU", "IND", "MEX", "PHL", "Value 6"];
  @track selectedcurrency;
  @track helptextdropdown = "Show More"; //label??
  @api thistest;
  @track dropdownheader = this.label.GroupBy;
  @api globalbookbalance = "0.0";
  @api globalAvailableBalance = "0.0";

  @api firstaccountcountrylist;
  @api firstaccountcountrylistjson;
  @api accountcountrylist;
  @api firstaccountcurrencylist;
  @api accountcurrencylist;
  @api firstaccountsubsidiarylist;
  @api accountsubsidiarylist;
  @api accountlastupdate;

  @track selectedtimeframe = this.label.Country;

  @track currentusercurrency = "EUR";
  @track rcurrentusercurrency = "";
  @api currentuserlanguage = "N/A";
  @track sortselected = this.label.Country;
  @track tabselected = "LastUpdateTab";
  @track tablabel = this.label.LastUpdate;
  @track filters;
  @api initialfilters;
  @track timeperiods;
  @api sourcepage = "";
  @api filterparams;
  @api source;
  @api heritagedfilters = false;
  @api herifilters;
  @api countrymap;
  @api seedcountrymap;

  @api tabschange = false;
  @api backfront = false;
  @api userpreferreddateformat;
  @api userpreferrednumberformat;

  @api message;
  @api type;
  @api show;
  @api toBeHiddenToast;

  @track isloading = true;

  @api rcurrencylist;
  @api exchangeratesstring;

  @api islastupdate;
  @track rGlobalBalance;

  @track userId;
  @track firstTime = false;
  @track isCashNexus;
  @track spinnerclass;

  @track showError403 = false;

  //Comunidad Cash Nexus
  @track comunidadCashNexus = false;
  @track isLastUpdateCN = true; //v.isLastUpdate del CMP de CN
  @track tGlobalBalance; //Yesterday Global Balance Information
  @track tcurrentusercurrency = "";
  @api firsttaccountcountrylist;
  @api firsttaccountcountrylistjson;
  @api firsttaccountcurrencylist;
  @api firsttaccountsubsidiarylist;
  @api tcurrencylist;
  @api taccountcountrylist;
  @api taccountcurrencylist;
  @api taccountsubsidiarylist;

  @track uno = "";

  hasparams = false;
  showadvancedfiltersaux = false;
  isonetradeaux = true;
  isnoonetradeaux = false;
  handleagain = false;
  handledata;
  _isLastUpdateCN;

  get isLastUpdateCN() {
    return this._isLastUpdateCN;
  }
  set isLastUpdateCN(isLastUpdateCN) {
    this._isLastUpdateCN = isLastUpdateCN;
  }
  get isComunidadCashNexus() {
    if (this.label.basePath == this.label.basePathCashNexus)
      this.comunidadCashNexus = true;
    return this.comunidadCashNexus;
  }

  get rGlobalBalanceCurrencyListNotEmptyisLastUpdateCN() {
    return (
      this.rGlobalBalance != null &&
      this.rGlobalBalance.currencyList.length != 0 &&
      this._isLastUpdateCN
    );
  }
  get rGlobalBalanceCurrencyListEmptyisLastUpdateCN() {
    return (
      (this.rGlobalBalance == null ||
        (this.rGlobalBalance != null &&
          this.rGlobalBalance.currencyList.length == 0)) &&
      this._isLastUpdateCN
    );
  }
  get tGlobalBalanceCurrencyListNotEmptyNoisLastUpdateCN() {
    return (
      this.tGlobalBalance != null &&
      this.tGlobalBalance.currencyList.length != 0 &&
      !this._isLastUpdateCN
    );
  }
  get tGlobalBalanceCurrencyListEmptyNoisLastUpdateCN() {
    return (
      (this.tGlobalBalance == null ||
        (this.tGlobalBalance != null &&
          this.tGlobalBalance.currencyList.length == 0)) &&
      !this._isLastUpdateCN
    );
  }

  get dropdowndisabledCN() {
    if (this.rGlobalBalance && this.tGlobalBalance) {
      return (
        (this.rGlobalBalance.accountList == "" && this._isLastUpdateCN) ||
        (this.tGlobalBalance.accountList == "" && !this._isLastUpdateCN)
      );
    } else if (this.rGlobalBalance) {
      return this.rGlobalBalance.accountList == "" && this._isLastUpdateCN;
    }
  }

  get spinnerText() {
    return this.label.Loading + "...";
  }

  get rGlobalBalanceCurrencyListNotEmpty() {
    return (
      this.rGlobalBalance != null &&
      this.rGlobalBalance.currencyList.length != 0
    );
    /* if(this.rGlobalBalance){
            return (this.rGlobalBalance != "" && this.rGlobalBalance.value.currencyList != "" );
        }*/
  }

  get dropdowndisabled() {
    if (this.rGlobalBalance) {
      return this.rGlobalBalance.accountList == "" && this.islastupdate;
    }
  }

  get sortSelectedCountry() {
    return this.label.Country == this.sortselected;
  }

  get sortSelectedCurrency() {
    return this.label.currency == this.sortselected;
  }

  get sortSelectedCorporate() {
    return this.label.Corporate == this.sortselected;
  }

  connectedCallback() {
    if (!this.firstTime) {
      this.sortselected = this.label.Country;

      loadStyle(this, santanderStyle + "/style.css");
      if (this.label.basePath == this.label.basePathCashNexus)
        this.comunidadCashNexus = true;

      if (this.comunidadCashNexus) {
        //Comunidad Cash Nexus
        this.userId = uId;
        var tabLabel = "";
        var storage = window.localStorage.getItem(this.userId + "_" + "tab");
        if (storage != null && storage != undefined) {
          if (storage == "lastUpdate") {
            this._isLastUpdateCN = true;
          } else {
            this._isLastUpdateCN = false;
          }
        }
        if (this._isLastUpdateCN == false) {
          tabLabel = "EndOfDayTab";
          window.localStorage.setItem(this.userId + "_" + "tab", "endOfDay");
        } else {
          window.localStorage.setItem(this.userId + "_" + "tab", "lastUpdate");
        }

        this.getParametersUrl();
      } else {
        this.getParametersUrl();
      }

      this.firstTime = true;
    }
  }

  getParametersUrl() {
    var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
    if (sPageURLMain.includes("params=")) {
      //component.find("service").dataDecryption(component,helper, sPageURLMain, this.handleParams);
      //if(this.template.querySelector("c-lwc_service-component") != null){
      //this.template.querySelector("c-lwc_service-component").apexDataDecryption({callercomponent: "lwc_iam_accounts-parentURL", callerhelper: "", datauri:sPageURLMain, controllermethod: ""});
      //this.template.querySelector("c-lwc_service-component").onCallApex({callercomponent:'lwc_iam_accounts-parentURL',controllermethod:'decryptData',actionparameters:{str:sPageURLMain.split('=')[1]}});
      this.hasparams = true;
      this.uno = "home";
      decryptData({ str: sPageURLMain.split("=")[1] })
        .then((result) => {
          console.log("OK");
          var e = {};
          var detail = {};
          e.detail = detail;
          e.detail.callercomponent = "lwc_iam_accounts-parentURL";
          e.detail.value = result;
          this.successcallback(e);
        })
        .catch((error) => {
          console.log("KO " + error);
        });

      //}
    } else {
      if (this.comunidadCashNexus) {
        //Comunidad Cash Nexus

        var storage = window.localStorage.getItem(this.userId + "_" + "tab");
        if (storage != null && storage != undefined) {
          if (storage == "lastUpdate") {
            this.initData("LastUpdateTab");
          } else {
            this.initData("EndOfDayTab");
          }
        } else {
          this.initData("LastUpdateTab");
        }

        this.getUserInfo();
      } else {
        this.initData();
        this.getUserInfo();
      }
    }
  }

  handleParams(response) {
    if (response != "") {
      var sParameterName;
      var iRegister = [];
      var gInit = false;
      var urlParams = response.split("&");
      for (var i = 0; i < urlParams.length; i++) {
        sParameterName = urlParams[i].split("=");
        switch (sParameterName[0]) {
          case "c__source":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.sourcepage = sParameterName[1]);
            break;
          case "c__filters":
            sParameterName[1] === undefined ? "Not found" : (gInit = true);
            this.heritagedfilters = true;
            this.herifilters = JSON.parse(sParameterName[1]);
            break;
          case "c__sourcePage":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.sourcepage = sParameterName[1]);
            break;
          case "c__iRegister":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.iregister = JSON.parse(sParameterName[1]));
            break;
          case "c__firstTAccountCountryList":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.firsttaccountcountrylist = JSON.parse(sParameterName[1]));
            sParameterName[1] === undefined
              ? "Not found"
              : (this.firsttaccountcountrylistjson = sParameterName[1]);
            break;
          case "c__firstAccountCountryList":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.firstaccountcountrylist = JSON.parse(sParameterName[1]));
            sParameterName[1] === undefined
              ? "Not found"
              : (this.firstaccountcountrylistjson = sParameterName[1]);
            break;
          case "c__consolidationCurrency":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.selectedcurrency = sParameterName[1]);
            break;
          case "c__accountGrouping":
            sParameterName[1] === undefined
              ? "Not found"
              : (this.selectedtimeframe = sParameterName[1]);
            break;
          case "c__tabs":
            sParameterName[1] === undefined ? "Not found" : (gInit = true);
            this._isLastUpdateCN = sParameterName[1];
            var tabLabel = "LastUpdate";
            if (sParameterName[1] == "false") {
              tabLabel = "EndOfDayTab";
            }
            break;
        }
      }
    }

    if (this.comunidadCashNexus) {
      //Comunidad Cash Nexus

      var userId = uId;
      var storage = window.localStorage.getItem(userId + "_" + "tab");
      if (storage != null && storage != undefined) {
        if (storage == "lastUpdate") {
          this.initData("LastUpdateTab");
        } else {
          this.initData("EndOfDayTab");
        }
      } else {
        this.initData(this.tabLabel);
      }
      this.getUserInfo();
    } else {
      this.initData();
      this.getUserInfo();
    }
    if (!this.herifilters) {
      this.isloading = false;
    }
  }

  accountsab(event) {
    //last day o end of day cash nexus comunidad
    var tab = event.detail;

    if (!this.firstaccountcountrylist || !this.firsttaccountcountrylist) {
      if (!this.firstaccountcountrylist) {
        this.initData(tab);
      }
      if (!this.firsttaccountcountrylist) {
        this.initData(tab);
      }
    }

    if (this.handledata) {
      if (tab == "EndOfDayTab") {
        this._isLastUpdateCN = false;
        this.tabselected = "EndOfDayTab";
      } else {
        this._isLastUpdateCN = true;
        this.tabselected = "LastUpdateTab";
      }
      this.handlefirefilter(this.handledata);
    } else this.initData(tab);
  }

  initData(tab) {
    this.userId = uId;

    if (this.comunidadCashNexus) {
      //Comunidad Cash Nexu
      var tabLabel = "";
      if (tab == "EndOfDayTab") {
        tabLabel = "endOfDay";
        this._isLastUpdateCN = false;
        this.tabselected = "EndOfDayTab";
      } else {
        tabLabel = "lastUpdate";
        this._isLastUpdateCN = true;
        this.tabselected = "LastUpdateTab";
      }

      // Call the apex method from the service component
      var params = {
        iWhen: tabLabel,
        iUserId: this.userId
      };
      this.tablabel = tabLabel;
      this.isloading = true;

      if (tab != "EndOfDayTab") {
        var storageBalance = window.localStorage.getItem(
          this.userId + "_" + "balanceGP"
        );
        var balanceTimestampGP = window.localStorage.getItem(
          this.userId + "_" + "balanceTimestampGP"
        );
        if (
          storageBalance != "null" &&
          storageBalance != undefined &&
          balanceTimestampGP != "null" &&
          balanceTimestampGP != undefined &&
          new Date() - new Date(Date.parse(balanceTimestampGP)) <
            parseInt(this.label.refreshBalanceCollout) * 60000
        ) {
          this.decryptInitialData(storageBalance);
        } else {
          if (this.template.querySelector("c-lwc_service-component")) {
            this.template
              .querySelector("c-lwc_service-component")
              .onCallApex({
                callercomponent: "lwc_iam_accountsParent",
                controllermethod: "callMulesoft",
                actionparameters: params
              });
          }
        }
      } else {
        var storageBalanceEOD = window.localStorage.getItem(
          this.userId + "_" + "balanceEODGP"
        );
        var balanceTimestampGP = window.localStorage.getItem(
          this.userId + "_" + "balanceEODTimestampGP"
        );
        if (
          storageBalanceEOD != "null" &&
          storageBalanceEOD != undefined &&
          balanceTimestampGP != "null" &&
          balanceTimestampGP != undefined &&
          new Date() - new Date(Date.parse(balanceTimestampGP)) <
            parseInt(this.label.refreshBalanceCollout) * 60000
        ) {
          this.decryptInitialData(storageBalanceEOD);
        } else {
          if (this.template.querySelector("c-lwc_service-component")) {
            this.template
              .querySelector("c-lwc_service-component")
              .onCallApex({
                callercomponent: "lwc_iam_accountsParent",
                controllermethod: "callMulesoft",
                actionparameters: params
              });
          }
        }
      }
    } else {
      // Call the apex method from the service component
      var params = {
        iWhen: "oneTrade",
        iUserId: this.userId
      };

      this.isloading = true;

      // Fetch the data from the cache if available. Otherwise get the data from the accounts web service
      var storageBalance = window.localStorage.getItem(
        this.userId + "_" + "balanceGP"
      );
      var balanceTimestampGP = window.localStorage.getItem(
        this.userId + "_" + "balanceTimestampGP"
      );
      if (
        storageBalance != "null" &&
        storageBalance != undefined &&
        balanceTimestampGP != "null" &&
        balanceTimestampGP != undefined &&
        new Date() - new Date(Date.parse(balanceTimestampGP)) <
          parseInt(this.label.refreshBalanceCollout) * 60000
      ) {
        this.decryptInitialData(storageBalance);
      } else {
        //component.find("service").callApex2(component, helper, "c.callMulesoft", params , this.setComponentInitialData);
        if (this.template.querySelector("c-lwc_service-component")) {
          this.template
            .querySelector("c-lwc_service-component")
            .onCallApex({
              callercomponent: "lwc_iam_accountsParent",
              controllermethod: "callMulesoft",
              actionparameters: params
            });
        }
      }
    }
  }

  successcallback(event) {
    if (event.detail.callercomponent === "lwc_iam_accounts-parentURL") {
      console.log("Event details: " + event.detail);
      this.handleParams(event.detail.value); //parameters?
    }
    if (event.detail.callercomponent === "lwc_iam_accountsParent") {
      console.log("Event details: " + event.detail);
      this.setComponentInitialData(event.detail.value, false); //true parameters?
    }
    if (event.detail.callercomponent === "lwc_iam_accountsParentUserInfo") {
      console.log("Event details: " + event.detail);
      this.setUserInfo(event.detail.value);
    }
    if (event.detail.callercomponent === "lwc_iam_accountsParentOrderCountry") {
      console.log("Event details: " + event.detail);
      this.setAccountsByCountry(event.detail.value);
    }
    if (
      event.detail.callercomponent === "lwc_iam_accountsParentOrderCurrency"
    ) {
      console.log("Event details: " + event.detail);
      this.setAccountsByCurrency(event.detail.value);
    }
    if (event.detail.callercomponent === "lwc_iam_accountsParentOrderSubs") {
      console.log("Event details: " + event.detail);
      this.setAccountsBySubsidiary(event.detail.value);
    }
    //ordenacion cambio tabs

    if (this.handledata) {
      this.handlefirefilter(this.handledata);
      //this.template.querySelector("c-lwc_cn_filters").setFilterAux(this.filters);
    }
  }

  setComponentInitialData(iReturn, decrypt) {
    if (this.comunidadCashNexus) {
      if (iReturn != null) {
        this.setComponentInitialDataComun(iReturn, decrypt, true);
      }
    } else {
      if (iReturn != null && iReturn.is403Error) {
        this.showError403 = true;
        this.isloading = false;
      } else {
        this.setComponentInitialDataComun(iReturn, decrypt, false);
      }
    }
  }
  setComponentInitialDataComun(iReturn, decrypt, comCN) {
    this.userId = uId;

    if (!comCN) {
      //No comunidad Cash Nexus
      window.localStorage.setItem(
        this.userId + "_hasPaymentsTrackerAccess",
        iReturn.canUserSeePaymentsTracker
      );
      window.localStorage.setItem(
        this.userId + "_hasGlobalPositionAccess",
        iReturn.canUserSeeGP
      );
      window.sessionStorage.setItem(this.userId + "_firstAccess", false);
    }
    if (iReturn != null) {
      if (decrypt != true) {
        this.encryptInitialData(iReturn);
      }

      // Set the preferred user date and number
      this.userpreferreddateformat =
        iReturn.mapUserFormats.dateFormat != ""
          ? iReturn.mapUserFormats.dateFormat
          : "dd/MM/yyyy";
      this.userpreferrednumberformat =
        iReturn.mapUserFormats.numberFormat != ""
          ? iReturn.mapUserFormats.numberFormat
          : "###.###.###,##";

      //AM - 28/10/2020 - FIX INC726
      var userCurrency = window.localStorage.getItem(
        this.userId + "_actualCurrencyChange"
      );
      if (userCurrency == undefined || userCurrency == null) {
        userCurrency = localeCurrency;
      }

      if (iReturn.accountList.length > 0) {
        if (iReturn.currencyList.length > 0) {
          if (!iReturn.currencyList.includes(userCurrency)) {
            userCurrency = "EUR";
            return new Promise(
              function (resolve, reject) {
                setUserCurrencyString({ currencyStr: userCurrency })
                  .then((res) => {
                    //res = response.getReturnValue();
                    this.setComponentInitialDataUpdate(iReturn, res);
                    resolve(res);
                  })
                  .catch((error) => {
                    if (error) {
                      console.log("Error message: " + JSON.stringify(error));
                    } else {
                      console.log("Unknown error");
                    }
                    reject(result);
                  });
              }.bind(this)
            );
          } else {
            this.setComponentInitialDataUpdate(iReturn, userCurrency);
          }
        }
      } else {
        this.isloading = false;
        var msg = this.label.ERROR_NOT_RETRIEVED;
        this.show = true;
        this.message = msg;
        this.type = error;
        this.tobehiddentoast = false;
      }
    } else {
      this.isloading = false;
      var msg = this.label.ERROR_NOT_RETRIEVED;
      this.show = true;
      this.message = msg;
      this.type = error;
      this.tobehiddentoast = false;
    }
  }

  setComponentInitialDataUpdate(iReturn, divisa) {
    var currentCurrency = "";
    var tabLabel = this.tablabel;
    if (iReturn.currencyList.includes(divisa)) {
      var userCurrency = divisa;
    }

    if (this.comunidadCashNexus && tabLabel == "endOfDay") {
      this.tGlobalBalance = iReturn;
      this.currentusercurrency = userCurrency;
      this.tcurrentusercurrency = userCurrency;
      this.tcurrencylist = iReturn.tipoDeCambioList;
      //this.rcurrencylist = iReturn.tipoDeCambioList;////////
      currentCurrency = this.tcurrentusercurrency;
      this.selectedcurrency = userCurrency;
      this.accountlastupdate = iReturn.headerLastModifiedDate;
      if (iReturn.accountList != undefined) {
        //component.find("accountTitleDropdown_two").calculateLastUpdated(false, iReturn.accountList, iReturn.headerLastModifiedDate, iReturn.headerLastModifiedDateMain);
        this.template
          .querySelector("c-lwc_accounts-title-dropdown")
          .calculateLatestDate(
            false,
            iReturn.accountList,
            iReturn.headerLastModifiedDate,
            iReturn.headerLastModifiedDateMain
          );
      }
    } else {
      this.rGlobalBalance = iReturn;
      this.currentusercurrency = userCurrency;
      this.rcurrentusercurrency = userCurrency;
      this.rcurrencylist = iReturn.tipoDeCambioList;
      //this.tcurrencylist = iReturn.tipoDeCambioList;////////
      currentCurrency = this.rcurrentusercurrency;
      this.selectedcurrency = userCurrency;
      this.accountlastupdate = iReturn.headerLastModifiedDate;
      if (iReturn.accountList != undefined) {
        if (
          this.template.querySelector("c-lwc_accounts-title-dropdown") != null
        ) {
          //NO descomentar estas lineas. Att: Jhon Cortes
          //component.find("accountTitleDropdown_one").calculateLastUpdated(true, iReturn.accountList, iReturn.headerLastModifiedDate, iReturn.headerLastModifiedDateMain);
          this.template
            .querySelector("c-lwc_accounts-title-dropdown")
            .calculateLatestDate(
              true,
              iReturn.accountList,
              iReturn.headerLastModifiedDate,
              iReturn.headerLastModifiedDateMain
            );
        }
      }
    }

    this.tabsChange = !this.tabsChange;

    if (this.comunidadCashNexus) {
      this.orderByCountry(tabLabel);
      this.orderByCurrency(tabLabel);
      this.orderBySubsidiary(tabLabel);
    } else {
      this.orderByCountry();
      this.orderByCurrency();
      this.orderBySubsidiary();
    }

    // Set the global balance amounts
    this.globalbookbalance = iReturn.currencyGlobalBalance[currentCurrency][0];
    this.globalavailablebalance =
      iReturn.currencyGlobalBalance[currentCurrency][1];

    if (this.heritagedfilters == false) {
      this.listOfFilters(iReturn);
    } else {
      this.updateFilter(this.herifilters, iReturn);
    }
    this.template.querySelector("c-lwc_cn_filters").setFilterAux(this.filters);
    // Set the selected currency to the one currently selected in the dropdown
    if (this.selectedcurrency != undefined) {
      var sCurrency = this.selectedcurrency;

      //REVISAR Comunidad Cash Nexus
      /*
            if(tabLabel == "endOfDay"){
                component.find("accountTitleDropdown_two").selectCurrency(sCurrency);
            } else {
                component.find("accountTitleDropdown_one").selectCurrency(sCurrency);
            }
            */
      //REVISAR
      //component.find("accountTitleDropdown_one").selectCurrency(sCurrency);
      /*if(this.template.querySelector("c-lwc_accounts-title-dropdown") != null){
                this.template.querySelector("c-lwc_accounts-title-dropdown").selectCurrency(sCurrency);
            }*/
    }
    //this.isloading = false;
  }

  decryptInitialData(data) {
    try {
      var result = "null";
      var tab = this.tablabel;
      if (this.comunidadCashNexus) {
        var params = {
          iWhen: tab,
          iUserId: this.userId
        };
      } else {
        var params = {
          iWhen: "oneTrade",
          iUserId: this.userId
        };
      }
      return new Promise(
        function (resolve, reject) {
          decryptData({ str: data })
            .then((result) => {
              //result = response.getReturnValue();
              if (result != null && result != undefined && result != "null") {
                result = JSON.parse(result);
                if (
                  result.responseAcc != undefined &&
                  result.responseAcc != null
                ) {
                  result = result.responseAcc;
                }
                this.setComponentInitialData(result, true);
                resolve(result);
              } else {
                //component.find("service").callApex2(component, helper, "c.callMulesoft", params, this.setComponentInitialData);
                if (
                  this.template.querySelector("c-lwc_service-component") != null
                ) {
                  this.template
                    .querySelector("c-lwc_service-component")
                    .onCallApex({
                      callercomponent: "lwc_iam_accountsParent",
                      controllermethod: "callMulesoft",
                      actionparameters: params
                    });
                }
              }
            })
            .catch((error) => {
              console.log(
                "### lwc_iam_accountsParent ### decrypt() ::: Try Error: " +
                  JSON.stringify(error)
              );
              this.template
                .querySelector("c-lwc_service-component")
                .onCallApex({
                  callercomponent: "lwc_iam_accountsParent",
                  controllermethod: "callMulesoft",
                  actionparameters: params
                });
              //reject(result);
            });
        }.bind(this)
      );
    } catch (e) {
      console.error(e);
    }
  }

  getUserInfo() {
    // Call the apex method from the service component
    //component.find("service").callApex2(component, helper, "c.getUserInfo", {}, this.setUserInfo);
    if (this.template.querySelector("c-lwc_service-component") != null) {
      this.template
        .querySelector("c-lwc_service-component")
        .onCallApex({
          callercomponent: "lwc_iam_accountsParentUserInfo",
          controllermethod: "getUserInfo",
          actionparameters: {}
        });
    }
  }

  setUserInfo(conts) {
    for (var key in conts) {
      if (key == "getLanguage") {
        this.currentuserlanguage = conts[key];
      }
      if (key == "isCashNexusUser") {
        this.isCashNexus = conts[key];
      }
    }
  }

  encryptInitialData(data) {
    try {
      var result = "null";
      var tab = this.tablabel;
      var thisp = this;
      return new Promise(
        function (resolve, reject) {
          encryptData({ str: JSON.stringify(data) })
            .then((value) => {
              result = value;
              if (result != "null" && result != undefined && result != null) {
                thisp.userId = uId;
                if (thisp.comunidadCashNexus) {
                  if (tab != "endOfDay") {
                    window.localStorage.setItem(
                      thisp.userId + "_" + "balanceGP",
                      result
                    );
                    window.localStorage.setItem(
                      thisp.userId + "_" + "balanceTimestampGP",
                      new Date()
                    );
                  } else {
                    window.localStorage.setItem(
                      thisp.userId + "_" + "balanceEODGP",
                      result
                    );
                    window.localStorage.setItem(
                      thisp.userId + "_" + "balanceEODTimestampGP",
                      new Date()
                    );
                  }
                } else {
                  window.localStorage.setItem(
                    thisp.userId + "_" + "balanceGP",
                    result
                  );
                  window.localStorage.setItem(
                    thisp.userId + "_" + "balanceTimestampGP",
                    new Date()
                  );
                }
              }
              resolve(result);
            })
            .catch((error) => {
              console.log(error); // TestError
              reject(error);
            });
        }.bind(this)
      );
    } catch (e) {
      console.log(e);
    }
  }

  orderByCountry(tabLabel) {
    var iAccountList;
    var iCountries;

    if (this.comunidadCashNexus) {
      if (tabLabel == "lastUpdate") {
        iAccountList = this.rGlobalBalance.accountList;
        iCountries = this.rGlobalBalance.countryList;
      }
      //if(tabLabel == $A.get("$Label.c.EndOfDay")){
      if (tabLabel == "endOfDay") {
        iAccountList = this.tGlobalBalance.accountList;
        iCountries = this.tGlobalBalance.countryList;
      }
    } else {
      iAccountList = this.rGlobalBalance.accountList;
      iCountries = this.rGlobalBalance.countryList;
    }
    // Call the apex method from the service component
    var params = {
      iCountries: iCountries,
      iAccountList: iAccountList
    };
    //component.find("service").callApex2(component, helper, "c.orderByCountry", params, this.setAccountsByCountry);
    if (this.template.querySelector("c-lwc_service-component") != null) {
      this.template
        .querySelector("c-lwc_service-component")
        .onCallApex({
          callercomponent: "lwc_iam_accountsParentOrderCountry",
          controllermethod: "orderByCountry",
          actionparameters: params
        });
    }
  }

  setAccountsByCountry(iReturn) {
    var custs = [];
    var tabLabel = this.tablabel;
    var counter = 0;
    for (var key in iReturn) {
      var account = iReturn[key];
      custs.push({ value: account, key: key, index: counter });
      counter = counter + 1;
    }
    if (this.comunidadCashNexus) {
      if (tabLabel == "lastUpdate") {
        this.accountcountrylist = custs;
        this.firstaccountcountrylist = custs;
        this.firstaccountcountrylistjson = JSON.stringify(custs);
      }
      if (tabLabel == "endOfDay") {
        this.taccountcountrylist = custs;
        this.firsttaccountcountrylist = custs;
        this.firsttaccountcountrylistjson = JSON.stringify(custs);
      }
    } else {
      this.accountcountrylist = custs;
      this.firstaccountcountrylist = custs;
      this.firstaccountcountrylistjson = JSON.stringify(custs);
    }

    if (this.handleagain) {
      this.handlefirefilter(this.handledata);
    }
    //$A.util.addClass(component.find("spinner"), "slds-hide");
    //$A.util.removeClass(component.find("spinner"), "slds-show");
    this.spinnerclass = "slds-hide";
  }

  orderByCurrency(tabLabel) {
    var iAccountList;
    var iCurrencies;
    if (this.comunidadCashNexus) {
      if (tabLabel == "lastUpdate") {
        iAccountList = this.rGlobalBalance.accountList;
        iCurrencies = this.rGlobalBalance.currencyList;
      }
      //if(tabLabel == $A.get("$Label.c.EndOfDay")){
      if (tabLabel == "endOfDay") {
        iAccountList = this.tGlobalBalance.accountList;
        iCurrencies = this.tGlobalBalance.currencyList;
      }
    } else {
      iAccountList = this.rGlobalBalance.accountList;
      iCurrencies = this.rGlobalBalance.currencyList;
    }
    // Call the apex method from the service component
    var params = {
      iCurrencies: iCurrencies,
      iAccountList: iAccountList
    };
    //component.find("service").callApex2(component, helper, "c.orderByCurrency", params, this.setAccountsByCurrency);
    if (this.template.querySelector("c-lwc_service-component") != null) {
      this.template
        .querySelector("c-lwc_service-component")
        .onCallApex({
          callercomponent: "lwc_iam_accountsParentOrderCurrency",
          controllermethod: "orderByCurrency",
          actionparameters: params
        });
    }
  }

  setAccountsByCurrency(iReturn) {
    var custs = [];
    var tabLabel = this.tablabel;
    var counter = 0;
    for (var key in iReturn) {
      var account = iReturn[key];
      custs.push({ value: account, key: key, index: counter });
      counter = counter + 1;
    }

    if (this.comunidadCashNexus) {
      if (tabLabel == "lastUpdate") {
        this.accountcurrencylist = custs;
        this.firstaccountcurrencylist = custs;
      }
      if (tabLabel == "endOfDay") {
        this.taccountcurrencylist = custs;
        this.firsttaccountcurrencylist = custs;
      }
    } else {
      this.accountcurrencylist = custs;
      this.firstaccountcurrencylist = custs;
    }

    if (!this.hasparams && !this.comunidadCashNexus) {
      this.isloading = false;
    }
    //$A.util.addClass(component.find("spinner"), "slds-hide");
    //$A.util.removeClass(component.find("spinner"), "slds-show");
    this.spinnerclass = "slds-hide";
  }

  orderBySubsidiary(tabLabel) {
    var iAccountList;
    var iSubsidiaries;

    if (this.comunidadCashNexus) {
      if (tabLabel == "lastUpdate") {
        iAccountList = this.rGlobalBalance.accountList;
        iSubsidiaries = this.rGlobalBalance.subsidiaryList;
      }
      //if(tabLabel == $A.get("$Label.c.EndOfDay")){
      if (tabLabel == "endOfDay") {
        iAccountList = this.tGlobalBalance.accountList;
        iSubsidiaries = this.tGlobalBalance.subsidiaryList;
      }
    } else {
      iAccountList = this.rGlobalBalance.accountList;
      iSubsidiaries = this.rGlobalBalance.subsidiaryList;
    }
    // Call the apex method from the service component
    var params = {
      iSubsidiaries: iSubsidiaries,
      iAccountList: iAccountList
    };

    //component.find("service").callApex2(component, helper, "c.orderBySubsidiary", params, this.setAccountsBySubsidiary);
    if (this.template.querySelector("c-lwc_service-component") != null) {
      this.template
        .querySelector("c-lwc_service-component")
        .onCallApex({
          callercomponent: "lwc_iam_accountsParentOrderSubs",
          controllermethod: "orderBySubsidiary",
          actionparameters: params
        });
    }
  }

  setAccountsBySubsidiary(iReturn) {
    var custs = [];
    var tabLabel = this.tablabel;
    var counter = 0;
    for (var key in iReturn) {
      var account = iReturn[key];
      custs.push({ value: account, key: key, index: counter });
      counter += 1;
    }

    if (this.comunidadCashNexus) {
      if (tabLabel == "lastUpdate") {
        this.accountsubsidiarylist = custs;
        this.firstaccountsubsidiarylist = custs;
      }
      if (tabLabel == "endOfDay") {
        this.taccountsubsidiarylist = custs;
        this.firsttaccountsubsidiarylist = custs;
      }
      this.isloading = false;
    } else {
      this.accountsubsidiarylist = custs;
      this.firstaccountsubsidiarylist = custs;
    }

    console.log("filters: " + this.filters);
    if (this.heritagedfilters == true) {
      var e = null;
      if (this.template.querySelector("c-lwc_cn_filters")) {
        this.template.querySelector("c-lwc_cn_filters").applyFilters(e);
      }
    }
    this.spinnerclass = "slds-hide";
  }

  listOfFilters(iReturn) {
    var timePeriods = [];
    timePeriods.push(this.label.Country);
    timePeriods.push(this.label.currency);
    timePeriods.push(this.label.Corporate);
    this.timeperiods = timePeriods;
    var comesFromGlobalPosition = this.sourcepage == "globalBalance";

    if (iReturn != null) {
      // if(iReturn != null && component.get("v.filters").length == 0 ){
      var countryList = new Set();
      var displayedCountryList = new Set();
      var accounts = iReturn.accountList;
      var accCurrencies = new Set();
      var corpoList = new Set();

      for (var i = 0; i < accounts.length; i++) {
        displayedCountryList.add(
          accounts[i].country + " - " + accounts[i].countryName
        );
        countryList.add(accounts[i].country);
        if (
          accounts[i].currencyCodeAvailableBalance != "" &&
          accounts[i].currencyCodeAvailableBalance != undefined &&
          accounts[i].currencyCodeAvailableBalance != null
        ) {
          accCurrencies.add(accounts[i].currencyCodeAvailableBalance);
        }
        if (
          accounts[i].subsidiaryName != "" &&
          accounts[i].subsidiaryName != undefined &&
          accounts[i].subsidiaryName != null
        ) {
          corpoList.add(accounts[i].subsidiaryName);
        }
      }

      // COUNTRY LIST CREATION
      var countryAux = Array.from(countryList);
      var displayCountryAux = Array.from(displayedCountryList);
      this.countryMap = displayCountryAux;
      this.seedcountrymap = JSON.parse(JSON.stringify(displayCountryAux));

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

      listObject[0].name = this.label.Country;
      listObject[0].type = "checkbox";
      listObject[0].numberChecked = 0;
      listObject[0].displayFilter = !comesFromGlobalPosition;
      //listObject[0].dependsOn = [$A.get("$Label.c.currency"),$A.get("$Label.c.Corporate")];

      // CURRENCY LIST CREATION
      var listCurrencies = Array.from(accCurrencies);
      listObject.push({});
      listObject[1].data = [];
      for (var i in listCurrencies) {
        var a = {
          value: listCurrencies[i],
          displayValue: listCurrencies[i],
          checked: false
        };
        listObject[1].data.push(a);
      }
      listObject[1].name = this.label.currency;
      listObject[1].displayFilter = false;
      listObject[1].type = "checkbox";
      listObject[1].numberChecked = 0;
      listObject[1].displayFilter = !comesFromGlobalPosition;
      //listObject[1].dependsOn = [$A.get("$Label.c.Country"),$A.get("$Label.c.Corporate")];

      // COUNTRY LIST CREATION
      var listCorpo = Array.from(corpoList);
      listObject.push({});
      listObject[2].data = [];
      for (var i in listCorpo) {
        var a = {
          value: listCorpo[i],
          displayValue: listCorpo[i],
          checked: false
        };
        listObject[2].data.push(a);
      }
      listObject[2].name = this.label.Corporate;
      listObject[2].displayFilter = false;
      listObject[2].type = "checkbox";
      listObject[2].numberChecked = 0;
      listObject[2].displayFilter = !comesFromGlobalPosition;
      //listObject[2].dependsOn = [$A.get("$Label.c.currency"),$A.get("$Label.c.Country")];

      this.filters = listObject;
      this.initialfilters = JSON.parse(JSON.stringify(listObject));
      //this.isloading = false;
    }
    //this.isloading = false;

    //helper.filterGroupBy(component, event, helper);
  }

  updateFilter(filter, iReturn) {
    this.listOfFilters(iReturn);
    var initFilters = this.filters;

    if (filter != undefined && filter != null) {
      var sourcePage = this.sourcepage;
      if (sourcePage != "GlobalPosition") {
        this.filters = filter;
        this.heritagedfilters = true;
      } else {
        for (var i = 0; i < initFilters.length; i++) {
          // if(initFilters[i].name==filter[0].name){
          if (initFilters[i].name == filter.name) {
            var count = 0;
            for (var j = 0; j < initFilters[i].data.length; j++) {
              //if(initFilters[i].data[j].value==filter[0].value){
              if (initFilters[i].data[j].value == filter.value) {
                count++;
                initFilters[i].numberChecked = count;
                initFilters[i].data[j].checked = true;
              }
            }
          }
        }
        this.filters = initFilters;

        this.heritagedfilters = true;
        this.sourcepage = "Account";
      }
    }
  }

  /* el metodo getCurrenciesMap no existe en el helper del cmp aura
    getChangeCurrencies() {
        this.getCurrenciesMap();
    }
    */
  doSort(event) {
    this.sortAccount(event);
  }

  sortAccount(event) {
    var s = event.getParam("displayOrder");
    this.sortselected = s;
  }
  download(event) {
    var isDownload = event.getParam("isDownload");
    if (isDownload) {
      // this.download(event); -->este metodo no existe en el helper del cmp aura
    }
  }

  filterSearch(event) {
    if (event) {
      if (this.comunidadCashNexus) {
        if (this._isLastUpdateCN) {
          if (this.sortselected == this.label.Country) {
            // var filters = event.getParam("selectedFilters");
            var filters = event.detail.cmpParams.selectedFilters;
            this.filterparams = filters;
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firstaccountcountrylist)
            );
            // var filteredData = this.filterData(initialDataCards, filters, event.getParam("filterName"));
            var filteredData = this.filterData(
              initialDataCards,
              filters,
              event.detail.cmpParams.filterName
            );
            this.accountcountrylist = filteredData;
          } else if (this.sortselected == this.label.currency) {
            // var filters = event.getParam("selectedFilters");
            var filters = event.detail.cmpParams.selectedFilters;
            this.filterparams = filters;
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firstaccountcurrencylist)
            );
            //var filteredData = this.filterData(initialDataCards, filters,event.getParam("filterName"));
            var filteredData = this.filterData(
              initialDataCards,
              filters,
              event.detail.cmpParams.filterName
            );
            this.accountcurrencylist = filteredData;
          } else {
            var filters = event.detail.cmpParams.selectedFilters;
            this.filterparams = filters;
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firstaccountsubsidiarylist)
            );
            //var filteredData = this.filterData(initialDataCards, filters,event.getParam("filterName"));
            var filteredData = this.filterData(
              initialDataCards,
              filters,
              event.detail.cmpParams.filterName
            );
            this.accountsubsidiarylist = filteredData;
          }
        } else {
          if (this.sortselected == this.label.Country) {
            // var filters = event.getParam("selectedFilters");
            var filters = event.detail.cmpParams.selectedFilters;
            this.filterparams = filters;
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firsttaccountcountrylist)
            );
            // var filteredData = this.filterData(initialDataCards, filters, event.getParam("filterName"));
            var filteredData = this.filterData(
              initialDataCards,
              filters,
              event.detail.cmpParams.filterName
            );
            this.taccountcountrylist = filteredData;
          } else if (this.sortselected == this.label.currency) {
            // var filters = event.getParam("selectedFilters");
            var filters = event.detail.cmpParams.selectedFilters;
            this.filterparams = filters;
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firsttaccountcurrencylist)
            );
            //var filteredData = this.filterData(initialDataCards, filters,event.getParam("filterName"));
            var filteredData = this.filterData(
              initialDataCards,
              filters,
              event.detail.cmpParams.filterName
            );
            this.taccountcurrencylist = filteredData;
          } else {
            var filters = event.detail.cmpParams.selectedFilters;
            this.filterparams = filters;
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firsttaccountsubsidiarylist)
            );
            //var filteredData = this.filterData(initialDataCards, filters,event.getParam("filterName"));
            var filteredData = this.filterData(
              initialDataCards,
              filters,
              event.detail.cmpParams.filterName
            );
            this.taccountsubsidiarylist = filteredData;
          }
        }
      } else {
        if (this.sortselected == this.label.Country) {
          // var filters = event.getParam("selectedFilters");
          var filters = event.detail.cmpParams.selectedFilters;
          this.filterparams = filters;
          var initialDataCards = JSON.parse(
            JSON.stringify(this.firstaccountcountrylist)
          );
          // var filteredData = this.filterData(initialDataCards, filters, event.getParam("filterName"));
          var filteredData = this.filterData(
            initialDataCards,
            filters,
            event.detail.cmpParams.filterName
          );
          this.accountcountrylist = filteredData;
        } else if (this.sortselected == this.label.currency) {
          // var filters = event.getParam("selectedFilters");
          var filters = event.detail.cmpParams.selectedFilters;
          this.filterparams = filters;
          var initialDataCards = JSON.parse(
            JSON.stringify(this.firstaccountcurrencylist)
          );
          //var filteredData = this.filterData(initialDataCards, filters,event.getParam("filterName"));
          var filteredData = this.filterData(
            initialDataCards,
            filters,
            event.detail.cmpParams.filterName
          );
          this.accountcurrencylist = filteredData;
        } else {
          var filters = event.detail.cmpParams.selectedFilters;
          this.filterparams = filters;
          var initialDataCards = JSON.parse(
            JSON.stringify(this.firstaccountsubsidiarylist)
          );
          //var filteredData = this.filterData(initialDataCards, filters,event.getParam("filterName"));
          var filteredData = this.filterData(
            initialDataCards,
            filters,
            event.detail.cmpParams.filterName
          );
          this.accountsubsidiarylist = filteredData;
        }
      }
      // Check how many options are checked after filtering them and update the displayed value
      let filterObject = this.filters;
      for (var key in filterObject) {
        if (filterObject[key].type == "checkbox") {
          filterObject[key].numberChecked = filterObject[key].data.filter(
            (row) => row.checked
          ).length;
        }
      }
      this.filters = filterObject;
    }
  }

  filterData(data, filters, selectedFilter) {
    var originalData = data;
    if (filters.length > 0 && data != null && data != undefined) {
      for (var filter in filters) {
        var filterName = filters[filter].name;
        if (filters[filter].value != undefined) {
          var selectedFilters = filters[filter].value;
          if (selectedFilters != undefined) {
            if (
              filterName == this.label.Country ||
              filterName == this.label.currency ||
              filterName == this.label.Corporate
            ) {
              data = this.filterOptions(
                data,
                selectedFilters,
                filterName,
                originalData,
                selectedFilter
              );
            }
          }
        }
      }
      //return data;
    } else {
      this.filters = JSON.parse(JSON.stringify(this.initialfilters));
      //return data;
    }
    return data;
  }

  filterOptions(data, filters, filterName, originalData, selectedFilter) {
    var filteredData = JSON.parse(JSON.stringify(data));
    var filterValues = [];
    var filterOfFilters = JSON.parse(JSON.stringify(this.filters));
    var listaux = [];
    var listOfAccounts = [];
    var listOfCurrencies = new Set();
    var listOfCountries = new Set();
    var listOfCorpos = new Set();

    for (var i = 0; i < originalData.length; i++) {
      listaux.push(originalData[i].value);
      for (var j = 0; j < originalData[i].value.length; j++) {
        listOfAccounts.push(originalData[i].value[j]);
      }
    }

    for (var key in filters) {
      filterValues.push(filters[key].value);
    }

    if (filterValues.length > 0) {
      switch (filterName) {
        case this.label.Country:
          for (var key in data) {
            filteredData[key].value = data[key].value.filter((row) =>
              filterValues.includes(row.country)
            );
          }

          filteredData = filteredData.filter(
            (countryRow) => countryRow.value.length > 0
          );

          for (var i = 0; i < listOfAccounts.length; i++) {
            if (filterValues.includes(listOfAccounts[i].country)) {
              listOfCurrencies.add(
                listOfAccounts[i].currencyCodeAvailableBalance
              );
            }
          }

          if (selectedFilter.split("-")[0] != this.label.currency) {
            var listAuxCurrency = [];
            for (var i = 0; i < filterOfFilters.length; i++) {
              if (filterOfFilters[i].name == this.label.currency) {
                filterOfFilters[i].data = filterOfFilters[
                  i
                ].data.filter((row) =>
                  Array.from(listOfCurrencies).includes(row.value)
                );
                for (var j = 0; j < filterOfFilters[i].data.length; j++) {
                  listAuxCurrency.push(filterOfFilters[i].data[j].value);
                }
              }
            }
            var listAuxOfCurrencies = Array.from(listOfCurrencies);
            var listToAdd = [];

            for (var i = 0; i < listAuxOfCurrencies.length; i++) {
              if (listAuxCurrency.includes(listAuxOfCurrencies[i]) == false) {
                listToAdd.push(listAuxOfCurrencies[i]);
              }
            }
            if (listToAdd.length > 0) {
              for (var i = 0; i < listToAdd.length; i++) {
                var optionChecked = false;
                if (filterValues.includes(listToAdd[i])) {
                  optionChecked = true;
                }
                filterOfFilters[1].data.push({
                  value: listToAdd[i],
                  displayValue: listToAdd[i],
                  checked: optionChecked
                });
              }
            }
          }

          // FILTER CORPORATE

          if (selectedFilter.split("-")[0] != this.label.Corporate) {
            for (var i = 0; i < listOfAccounts.length; i++) {
              if (filterValues.includes(listOfAccounts[i].country)) {
                listOfCorpos.add(listOfAccounts[i].subsidiaryName);
              }
            }
            var listOfCorporationAux = [];

            for (var i = 0; i < filterOfFilters.length; i++) {
              if (filterOfFilters[i].name == this.label.Corporate) {
                filterOfFilters[i].data = filterOfFilters[
                  i
                ].data.filter((row) =>
                  Array.from(listOfCorpos).includes(row.value)
                );
                for (var j = 0; j < filterOfFilters[i].data.length; j++) {
                  listOfCorporationAux.push(filterOfFilters[i].data[j].value);
                }
              }
            }
            var listOfCorposAux = Array.from(listOfCorpos);
            var listToAddCorpo = [];

            for (var i = 0; i < listOfCorposAux.length; i++) {
              if (listOfCorporationAux.includes(listOfCorposAux[i]) == false) {
                listToAddCorpo.push(listOfCorposAux[i]);
              }
            }
            if (listToAddCorpo.length > 0) {
              for (var i = 0; i < listToAddCorpo.length; i++) {
                var optionChecked = false;
                if (filterValues.includes(listToAddCorpo[i])) {
                  optionChecked = true;
                }
                filterOfFilters[2].data.push({
                  value: listToAddCorpo[i],
                  displayValue: listToAddCorpo[i],
                  checked: optionChecked
                });
              }
            }
          }
          break;

        case this.label.Corporate:
          for (var key in data) {
            filteredData[key].value = data[key].value.filter((row) =>
              filterValues.includes(row.subsidiaryName)
            );
          }

          filteredData = filteredData.filter(
            (countryRow) => countryRow.value.length > 0
          );

          //FILTER CURRENCY
          if (selectedFilter.split("-")[0] != this.label.currency) {
            for (var i = 0; i < listOfAccounts.length; i++) {
              if (filterValues.includes(listOfAccounts[i].subsidiaryName)) {
                listOfCurrencies.add(
                  listOfAccounts[i].currencyCodeAvailableBalance
                );
              }
            }
            var listAuxCurrency = [];

            for (var i = 0; i < filterOfFilters.length; i++) {
              if (filterOfFilters[i].name == this.label.currency) {
                filterOfFilters[i].data = filterOfFilters[
                  i
                ].data.filter((row) =>
                  Array.from(listOfCurrencies).includes(row.value)
                );
                for (var j = 0; j < filterOfFilters[i].data.length; j++) {
                  listAuxCurrency.push(filterOfFilters[i].data[j].value);
                }
              }
            }
            var listAuxOfCurrencies = Array.from(listOfCurrencies);
            var listToAdd = [];

            for (var i = 0; i < listAuxOfCurrencies.length; i++) {
              if (listAuxCurrency.includes(listAuxOfCurrencies[i]) == false) {
                listToAdd.push(listAuxOfCurrencies[i]);
              }
            }
            if (listToAdd.length > 0) {
              for (var i = 0; i < listToAdd.length; i++) {
                var optionChecked = false;
                if (filterValues.includes(listToAdd[i])) {
                  optionChecked = true;
                }
                filterOfFilters[1].data.push({
                  value: listToAdd[i],
                  displayValue: listToAdd[i],
                  checked: optionChecked
                });
              }
            }
          }
          // FILTER COUNTRY
          if (selectedFilter.split("-")[0] != this.label.Country) {
            for (var i = 0; i < listOfAccounts.length; i++) {
              if (filterValues.includes(listOfAccounts[i].subsidiaryName)) {
                listOfCountries.add(listOfAccounts[i].country);
              }
            }
            var listAuxCountry = [];

            for (var i = 0; i < filterOfFilters.length; i++) {
              if (filterOfFilters[i].name == this.label.Country) {
                filterOfFilters[i].data = filterOfFilters[
                  i
                ].data.filter((row) =>
                  Array.from(listOfCountries).includes(row.value)
                );
                for (var j = 0; j < filterOfFilters[i].data.length; j++) {
                  listAuxCountry.push(filterOfFilters[i].data[j].value);
                }
              }
            }
            var listAuxOfCountries = Array.from(listOfCountries);
            var listToAdd = [];

            for (var i = 0; i < listAuxOfCountries.length; i++) {
              if (listAuxCountry.includes(listAuxOfCountries[i]) == false) {
                listToAdd.push(listAuxOfCountries[i]);
              }
            }

            var countryDisplayName = new Set();

            for (var i = 0; i < listOfAccounts.length; i++) {
              if (listToAdd.includes(listOfAccounts[i].country)) {
                countryDisplayName.add({
                  isoName: listOfAccounts[i].country,
                  countryName: listOfAccounts[i].countryName
                });
              }
            }

            var countriesToAdd = Array.from(countryDisplayName);
            const countriesToShow2 = Array.from(
              new Set(countriesToAdd.map((a) => a.isoName))
            ).map((isoName) => {
              return countriesToAdd.find((a) => a.isoName === isoName);
            });

            if (countriesToShow2.length > 0) {
              for (var i = 0; i < countriesToShow2.length; i++) {
                var optionChecked = false;
                if (filterValues.includes(countriesToShow2[i])) {
                  optionChecked = true;
                }
                filterOfFilters[0].data.push({
                  value: countriesToShow2[i].isoName,
                  displayValue:
                    countriesToShow2[i].isoName +
                    " - " +
                    countriesToShow2[i].countryName,
                  checked: optionChecked
                });
              }
            }
          }

          break;

        case this.label.currency:
          for (var key in data) {
            filteredData[key].value = data[key].value.filter((row) =>
              filterValues.includes(row.currencyCodeAvailableBalance)
            );
          }
          filteredData = filteredData.filter(
            (countryRow) => countryRow.value.length > 0
          );

          // FILTER CORPORATE
          if (selectedFilter.split("-")[0] != this.label.Corporate) {
            for (var i = 0; i < listOfAccounts.length; i++) {
              if (
                filterValues.includes(
                  listOfAccounts[i].currencyCodeAvailableBalance
                )
              ) {
                listOfCorpos.add(listOfAccounts[i].subsidiaryName);
              }
            }

            var listOfCorporationAux = [];

            for (var i = 0; i < filterOfFilters.length; i++) {
              if (filterOfFilters[i].name == this.label.Corporate) {
                filterOfFilters[i].data = filterOfFilters[
                  i
                ].data.filter((row) =>
                  Array.from(listOfCorpos).includes(row.value)
                );
                for (var j = 0; j < filterOfFilters[i].data.length; j++) {
                  listOfCorporationAux.push(filterOfFilters[i].data[j].value);
                }
              }
            }
            var listOfCorposAux = Array.from(listOfCorpos);
            var listToAddCorpo = [];

            for (var i = 0; i < listOfCorposAux.length; i++) {
              if (listOfCorporationAux.includes(listOfCorposAux[i]) == false) {
                listToAddCorpo.push(listOfCorposAux[i]);
              }
            }
            if (listToAddCorpo.length > 0) {
              for (var i = 0; i < listToAddCorpo.length; i++) {
                var optionChecked = false;
                if (filterValues.includes(listToAddCorpo[i])) {
                  optionChecked = true;
                }
                filterOfFilters[2].data.push({
                  value: listToAddCorpo[i],
                  displayValue: listToAddCorpo[i],
                  checked: optionChecked
                });
              }
            }
          }

          // FILTER COUNTRY
          if (selectedFilter.split("-")[0] != this.label.Country) {
            for (var i = 0; i < listOfAccounts.length; i++) {
              if (
                filterValues.includes(
                  listOfAccounts[i].currencyCodeAvailableBalance
                )
              ) {
                //COUNTRY a INCLUIR
                listOfCountries.add(listOfAccounts[i].country);
              }
            }

            var listAuxCountry = [];

            for (var i = 0; i < filterOfFilters.length; i++) {
              if (filterOfFilters[i].name == this.label.Country) {
                filterOfFilters[i].data = filterOfFilters[
                  i
                ].data.filter((row) =>
                  Array.from(listOfCountries).includes(row.value)
                );

                for (var j = 0; j < filterOfFilters[i].data.length; j++) {
                  listAuxCountry.push(filterOfFilters[i].data[j].value);
                }
              }
            }

            var listAuxOfCountries = Array.from(listOfCountries);
            var listToAdd = [];

            for (var i = 0; i < listAuxOfCountries.length; i++) {
              if (listAuxCountry.includes(listAuxOfCountries[i]) == false) {
                listToAdd.push(listAuxOfCountries[i]);
              }
            }

            var countryDisplayName = new Set();

            for (var i = 0; i < listOfAccounts.length; i++) {
              if (listToAdd.includes(listOfAccounts[i].country)) {
                countryDisplayName.add({
                  isoName: listOfAccounts[i].country,
                  countryName: listOfAccounts[i].countryName
                });
              }
            }

            var countriesToAdd = Array.from(countryDisplayName);
            const countriesToShow = Array.from(
              new Set(countriesToAdd.map((a) => a.isoName))
            ).map((isoName) => {
              return countriesToAdd.find((a) => a.isoName === isoName);
            });

            if (countriesToShow.length > 0) {
              for (var i = 0; i < countriesToShow.length; i++) {
                var optionChecked = false;
                if (filterValues.includes(countriesToShow[i])) {
                  optionChecked = true;
                }
                filterOfFilters[0].data.push({
                  value: countriesToShow[i].isoName,
                  displayValue:
                    countriesToShow[i].isoName +
                    " - " +
                    countriesToShow[i].countryName,
                  checked: optionChecked
                });
              }
            }
          }

          break;
      }
    }

    this.filters = filterOfFilters;

    return filteredData;
  }

  orderCards(event) {
    var orderByLabel = this.selectedtimeframe;
    console.log("orderByLabel: " + orderByLabel);
    if (orderByLabel == this.label.Country) {
      this.sortselected = this.label.Country;
      this.filterGroupBy(event);
    } else if (orderByLabel == this.label.currency) {
      this.sortselected = this.label.currency;
      this.filterGroupBy(event);
    } else {
      this.sortselected = this.label.Corporate;
      this.filterGroupBy(event);
    }
  }

  filterGroupBy() {
    if (this.filters.length > 0) {
      var filters = [];
      if (this.filterparams) {
        filters = this.filterparams;
      }
      if (this.comunidadCashNexus) {
        if (this._isLastUpdateCN == true) {
          if (this.sortselected == this.label.Country) {
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firstaccountcountrylist)
            );
            var filteredData = this.filterData(initialDataCards, filters, "");
            this.accountcountrylist = filteredData;
          } else if (this.sortselected == this.label.currency) {
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firstaccountcurrencylist)
            );
            var filteredData = this.filterData(initialDataCards, filters, "");
            this.accountcurrencylist = filteredData;
          } else {
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firstaccountsubsidiarylist)
            );
            var filteredData = this.filterData(initialDataCards, filters, "");
            this.accountsubsidiarylist = filteredData;
          }
        } else {
          if (this.sortselected == this.label.Country) {
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firsttaccountcountrylist)
            );
            var filteredData = this.filterData(initialDataCards, filters, "");
            this.taccountcountrylist = filteredData;
          } else if (this.sortselected == this.label.currency) {
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firsttaccountcurrencylist)
            );
            var filteredData = this.filterData(initialDataCards, filters, "");
            this.taccountcurrencylist = filteredData;
          } else {
            var initialDataCards = JSON.parse(
              JSON.stringify(this.firsttaccountsubsidiarylist)
            );
            var filteredData = this.filterData(initialDataCards, filters, "");
            this.taccountsubsidiarylist = filteredData;
          }
        }
      } else {
        if (this.sortselected == this.label.Country) {
          var initialDataCards = JSON.parse(
            JSON.stringify(this.firstaccountcountrylist)
          );
          var filteredData = this.filterData(initialDataCards, filters, "");
          this.accountcountrylist = filteredData;
        } else if (this.sortselected == this.label.currency) {
          var initialDataCards = JSON.parse(
            JSON.stringify(this.firstaccountcurrencylist)
          );
          var filteredData = this.filterData(initialDataCards, filters, "");
          this.accountcurrencylist = filteredData;
        } else {
          var initialDataCards = JSON.parse(
            JSON.stringify(this.firstaccountsubsidiarylist)
          );
          var filteredData = this.filterData(initialDataCards, filters, "");
          this.accountsubsidiarylist = filteredData;
        }
      }
    }
  }

  updateGlobalBalance() {
    var currentCurrency = "";
    if (!this.comunidadCashNexus) {
      var globalBalanceInfo = this.rGlobalBalance;
      //currentCurrency = component.get("v.rCurrentUserCurrency");

      currentCurrency = localeCurrency;
      // Set the global balance amounts

      if (currentCurrency != "") {
        var globalBalanceInfo = this.rGlobalBalance;
        //currentCurrency = component.get("v.rCurrentUserCurrency");

        currentCurrency = localeCurrency;
        // Set the global balance amounts

        if (currentCurrency != "") {
          var actualCurrency;
          if (this.selectedcurrency == undefined) {
            this.globalbookbalance =
              globalBalanceInfo.currencyGlobalBalance[currentCurrency][0];
            this.globalavailablebalance =
              globalBalanceInfo.currencyGlobalBalance[currentCurrency][1];
            actualCurrency = currentCurrency;
          } else {
            this.globalbookbalance =
              globalBalanceInfo.currencyGlobalBalance[this.selectedcurrency][0];
            this.globalavailablebalance =
              globalBalanceInfo.currencyGlobalBalance[this.selectedcurrency][1];
            actualCurrency = this.selectedcurrency;
          }
          //JVV -Testing pending //
          var auxTipoDeCambio = new Map();
          var exchangeRatesAux = "";
          globalBalanceInfo.tipoDeCambioList.forEach((element) =>
            auxTipoDeCambio.get(element.divisa) == null
              ? auxTipoDeCambio.set(element.divisa, element)
              : ""
          );
          if (auxTipoDeCambio.has(actualCurrency)) {
            for (let [key, value] of auxTipoDeCambio) {
              if (key != actualCurrency) {
                exchangeRatesAux +=
                  key +
                  "=" +
                  (
                    auxTipoDeCambio.get(key).importeDecimal /
                    auxTipoDeCambio.get(actualCurrency).importeDecimal
                  ).toFixed(6) +
                  " " +
                  (auxTipoDeCambio.get(key).fecha != undefined
                    ? auxTipoDeCambio.get(key).fecha.split("T")[0]
                    : "");
                exchangeRatesAux += "; ";
              }
            }
          } else {
            for (let [key, value] of auxTipoDeCambio) {
              if (key != actualCurrency)
                exchangeRatesAux +=
                  key +
                  "=" +
                  auxTipoDeCambio.get(key).importeDecimal +
                  " " +
                  (auxTipoDeCambio.get(key).fecha != undefined
                    ? auxTipoDeCambio.get(key).fecha.split("T")[0]
                    : "");
              exchangeRatesAux += "; ";
            }
          }
          this.exchangeratesstring = exchangeRatesAux;
        }
        // OLD
        //component.set("v.globalBookBalance", globalBalanceInfo.currencyGlobalBalance[currentCurrency][0]);
        //component.set("v.globalAvailableBalance", globalBalanceInfo.currencyGlobalBalance[currentCurrency][1]);
      }
    } else {
      var globalBalanceInfo; // = this.rGlobalBalance;
      if (this._isLastUpdateCN) {
        globalBalanceInfo = this.rGlobalBalance;
        //var globalBalanceInfo = this.rGlobalBalance;
        currentCurrency = localeCurrency;
        if (currentCurrency != "") {
          var actualCurrency;
          if (this.selectedcurrency == undefined) {
            this.globalbookbalance =
              globalBalanceInfo.currencyGlobalBalance[currentCurrency][0];
            this.globalavailablebalance =
              globalBalanceInfo.currencyGlobalBalance[currentCurrency][1];
            actualCurrency = currentCurrency;
          } else {
            this.globalbookbalance =
              globalBalanceInfo.currencyGlobalBalance[this.selectedcurrency][0];
            this.globalavailablebalance =
              globalBalanceInfo.currencyGlobalBalance[this.selectedcurrency][1];
            actualCurrency = this.selectedcurrency;
          }
          //JVV -Testing pending //
          var auxTipoDeCambio = new Map();
          var exchangeRatesAux = "";
          globalBalanceInfo.tipoDeCambioList.forEach((element) =>
            auxTipoDeCambio.get(element.divisa) == null
              ? auxTipoDeCambio.set(element.divisa, element)
              : ""
          );
          if (auxTipoDeCambio.has(actualCurrency)) {
            for (let [key, value] of auxTipoDeCambio) {
              if (key != actualCurrency) {
                exchangeRatesAux +=
                  key +
                  "=" +
                  (
                    auxTipoDeCambio.get(key).importeDecimal /
                    auxTipoDeCambio.get(actualCurrency).importeDecimal
                  ).toFixed(6) +
                  " " +
                  (auxTipoDeCambio.get(key).fecha != undefined
                    ? auxTipoDeCambio.get(key).fecha.split("T")[0]
                    : "");
                exchangeRatesAux += "; ";
              }
            }
          } else {
            for (let [key, value] of auxTipoDeCambio) {
              if (key != actualCurrency)
                exchangeRatesAux +=
                  key +
                  "=" +
                  auxTipoDeCambio.get(key).importeDecimal +
                  " " +
                  (auxTipoDeCambio.get(key).fecha != undefined
                    ? auxTipoDeCambio.get(key).fecha.split("T")[0]
                    : "");
              exchangeRatesAux += "; ";
            }
          }
          this.exchangeratesstring = exchangeRatesAux;
        }
      } else {
        globalBalanceInfo = this.tGlobalBalance;
        currentCurrency = localeCurrency;
        // Set the global balance amounts
        /*if(currentCurrency != ''){
                    this.globalbookbalance = globalBalanceInfo.currencyGlobalBalance[currentCurrency][0];
                    this.globalavailablebalance = globalBalanceInfo.currencyGlobalBalance[currentCurrency][1]; 
                }*/
        if (currentCurrency != "") {
          //var globalBalanceInfo = this.rGlobalBalance;
          currentCurrency = localeCurrency;
          if (currentCurrency != "") {
            var actualCurrency;
            if (this.selectedcurrency == undefined) {
              this.globalbookbalance =
                globalBalanceInfo.currencyGlobalBalance[currentCurrency][0];
              this.globalavailablebalance =
                globalBalanceInfo.currencyGlobalBalance[currentCurrency][1];
              actualCurrency = currentCurrency;
            } else {
              this.globalbookbalance =
                globalBalanceInfo.currencyGlobalBalance[
                  this.selectedcurrency
                ][0];
              this.globalavailablebalance =
                globalBalanceInfo.currencyGlobalBalance[
                  this.selectedcurrency
                ][1];
              actualCurrency = this.selectedcurrency;
            }
            //JVV -Testing pending //
            var auxTipoDeCambio = new Map();
            var exchangeRatesAux = "";
            globalBalanceInfo.tipoDeCambioList.forEach((element) =>
              auxTipoDeCambio.get(element.divisa) == null
                ? auxTipoDeCambio.set(element.divisa, element)
                : ""
            );
            if (auxTipoDeCambio.has(actualCurrency)) {
              for (let [key, value] of auxTipoDeCambio) {
                if (key != actualCurrency) {
                  exchangeRatesAux +=
                    key +
                    "=" +
                    (
                      auxTipoDeCambio.get(key).importeDecimal /
                      auxTipoDeCambio.get(actualCurrency).importeDecimal
                    ).toFixed(6) +
                    " " +
                    (auxTipoDeCambio.get(key).fecha != undefined
                      ? auxTipoDeCambio.get(key).fecha.split("T")[0]
                      : "");
                  exchangeRatesAux += "; ";
                }
              }
            } else {
              for (let [key, value] of auxTipoDeCambio) {
                if (key != actualCurrency)
                  exchangeRatesAux +=
                    key +
                    "=" +
                    auxTipoDeCambio.get(key).importeDecimal +
                    " " +
                    (auxTipoDeCambio.get(key).fecha != undefined
                      ? auxTipoDeCambio.get(key).fecha.split("T")[0]
                      : "");
                exchangeRatesAux += "; ";
              }
            }
            this.exchangeratesstring = exchangeRatesAux;
          }
        }
      }
    }
  }

  clearAllFilters(event) {
    if (event) {
      if (this.comunidadCashNexus) {
        var isEndOfDay = this.tabselected;
        this.initData(isEndOfDay);
      } else this.initData();
    }
  }

  exchangeCurrency(event) {
    var newValue = event.getParam("value");
    var IsoCode = newValue;
    var oldValue = event.getParam("oldValue");

    if (
      (newValue != oldValue && oldValue != undefined && oldValue != "") ||
      oldValue == undefined
    ) {
      this.exchangeCurrencyIsoCode(IsoCode);
    }
  }

  exchangeCurrencyIsoCode(IsoCode) {
    try {
      var result = "null";
      return new Promise(
        function (resolve, reject) {
          setUserCurrency({ currencyStr: IsoCode })
            .then((value) => {
              result = value; //apex returns true if user has been updated

              this.rcurrentusercurrency = IsoCode;
              this.tcurrentusercurrency = IsoCode;
              this.currentusercurrency = IsoCode;

              //AM - 28/10/2020 - FIX INC726
              this.userId = uId;
              window.localStorage.setItem(
                this.userId + "_actualCurrencyChange",
                IsoCode
              );
              resolve(result);
            })
            .catch((error) => {
              console.log(error); // TestError
              reject(error);
            });
        }.bind(this)
      );
    } catch (e) {
      console.log(
        "CMP_AccountsParent / exchangeCurrency : " + JSON.stringify(e)
      );
    }
  }

  fillToastAttributes(event) {
    var params = event.getParams();
    this.show = params.show;
    this.type = params.type;
    this.message = params.message;
    this.tobehiddentoast = true;
  }

  navigateToPreviousScreen() {
    //component.find("service").redirect("home", "");
    if (this.template.querySelector("c-lwc_service-component")) {
      this.template
        .querySelector("c-lwc_service-component")
        .redirect("home", "");
    }
  }

  fileToDonwload() {
    //component.find("downloadAccounts").downloadAccountsExcel();
    if (this.template.querySelector("c-lwc_download-accounts-lu") != null) {
      this.template
        .querySelector("c-lwc_download-accounts-lu")
        .downloadAccounts();
    }
  }

  getURLParams() {
    if (this.heritagedfilters == false) {
      this.getParametersUrl();
    }
  }

  /*
    recoverselected(){
        this.template.querySelector('c-lwc_child-accounts-list').setDropDown(this.selectedtimeframe);
    }
    */

  handledropdownvalueselected(evt) {
    try {
      console.log(
        "Entra a handledropdownvalueselected en globalPositionParent: " +
          evt.detail
      );
      //testPEdro
      //this.template.querySelector('c-lwc_child-accounts-list').setDropDown(evt.detail);
      //fintest

      // this.dropdownselectedvalue = evt.detail;
      this.selectedtimeframe = evt.detail;
      this.handleCollapse();
      this.template.querySelector("c-lwc_accounts-header").showHide();
      this.orderCards(evt);
    } catch (e) {
      console.error(e);
    }
  }

  handleExpand() {
    this.template
      .querySelectorAll("c-lwc_child-accounts-list")
      .forEach((child) => {
        child.handleExpand();
      });
  }

  handleCollapse() {
    this.template
      .querySelectorAll("c-lwc_child-accounts-list")
      .forEach((child) => {
        child.handleCollapse();
      });
  }

  handlefirefilter(event) {
    try {
      if (!this.firstaccountcountrylist && !this.firsttaccountcountrylist) {
        this.handleagain = true;
        this.handledata = event;
      } else {
        //
        this.handledata = event;
        //
        this.filterSearch(event);
        this.handleCollapse();
        this.orderCards(null);
        this.isloading = false;
      }
    } catch (e) {
      console.error("AccountParent handlefirefilter: " + JSON.stringify(e));
    }
  }

  /*  selectCurrencyDropDown(evt){
        try {
            console.log("Entra a handledropdownvalueselected en globalPositionParent: " +  evt.detail);
        // this.dropdownselectedvalue = evt.detail;
            this.selectedcurrency =  evt.detail;
            this.doSort(evt);
        } catch(e) {
            console.error(e);
        }

    }*/

  changercurrentusercurrencyhandler(event) {
    try {
      //event.detail;
      console.log(
        "changercurrentusercurrencyhandler executed: " + event.detail
      );
      this.rcurrentusercurrency = event.detail;
      this.tcurrentusercurrency = event.detail;
      window.localStorage.setItem(
        this.userId + "_actualCurrencyChange",
        event.detail
      );
      this.updateGlobalBalance();
    } catch (e) {
      console.error(e);
    }
  }

  /* changeselectedimeframehandler(event) {
        try {
            //event.detail;
            console.log('changeselectedimeframehandler executed: '+event.detail);
            this.orderCards(event);
        } catch(e) {
            console.error(e);
        }
    }*/

  /* EVENT HANDLERS: REVISAR 
    globalbalancesorthandler(event) {
        try {
            //event.detail;
            console.log('globalbalancesorthandler executed: '+event.detail);
            this.doSort(event);
        } catch(e) {
            console.error(e);
        }
    }

    globalbalancedownloadhandler(event) {
        try {
            //event.detail;
            console.log('globalbalancedownloadhandler executed: '+event.detail);
            this.download(event);
        } catch(e) {
            console.error(e);
        }
    }
    
    firefilterhandler(event) {
        try {
            //event.detail;
            console.log('firefilterhandler executed: '+event.detail);
            this.filterSearch(event);
        } catch(e) {
            console.error(e);
        }
    }

    changercurrentusercurrencyhandler(event) {
        try {
            //event.detail;
            console.log('changercurrentusercurrencyhandler executed: '+event.detail);
            this.updateGlobalBalance();
        } catch(e) {
            console.error(e);
        }
    }
    
    changeselectedcurrencyhandler(event) {
        try {
            //event.detail;
            console.log('changeselectedcurrencyhandler executed: '+event.detail);
            this.exchangeCurrency(event);
        } catch(e) {
            console.error(e);
        }
    }    

    clearallfiltershandler(event) {
        try {
            //event.detail;
            console.log('clearallfiltershandler executed: '+event.detail);
            this.updateGlobalBalance();
        } catch(e) {
            console.error(e);
        }
    }

    launchtoasthandler(event) {
        try {
            //event.detail;
            console.log('launchtoasthandler executed: '+event.detail);
            this.fillToastAttributes(event);
        } catch(e) {
            console.error(e);
        }
    }

    navigatebackhandler(event) {
        try {
            //event.detail;
            console.log('navigatebackhandler executed: '+event.detail);
            this.navigateToPreviousScreen();
        } catch(e) {
            console.error(e);
        }
    }

    launchdonwloadhandler(event) {
        try {
            //event.detail;
            console.log('launchdonwloadhandler executed: '+event.detail);
            this.fileToDonwload();
        } catch(e) {
            console.error(e);
        }
    }

    */
}
