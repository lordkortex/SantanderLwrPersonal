import { LightningElement, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

import imagesPack from "@salesforce/resourceUrl/Images";

// Import labels
import Country from "@salesforce/label/c.Country";
import Loading from "@salesforce/label/c.Loading";
import Accounts from "@salesforce/label/c.Accounts";
import accountDetail from "@salesforce/label/c.accountDetail";
import basicDetails from "@salesforce/label/c.basicDetails";
import Bank from "@salesforce/label/c.Bank";
import Account_Number from "@salesforce/label/c.Account_Number";
import currency from "@salesforce/label/c.currency";
import Corporate from "@salesforce/label/c.Corporate";
import bic from "@salesforce/label/c.bic";
import aliasAccount from "@salesforce/label/c.aliasAccount";
import T_Modify from "@salesforce/label/c.T_Modify";
import successAliasAccount from "@salesforce/label/c.successAliasAccount";
import successAliasBank from "@salesforce/label/c.successAliasBank";
import errorAliasAccount from "@salesforce/label/c.errorAliasAccount";
import errorAliasBank from "@salesforce/label/c.errorAliasBank";
import Ebury from "@salesforce/label/c.Ebury";
import Account_Identifier from "@salesforce/label/c.Account_Identifier";
import Account from "@salesforce/label/c.Account";
import BankId from "@salesforce/label/c.BankId";
import AccountName from "@salesforce/label/c.AccountName";
import BankIdType from "@salesforce/label/c.BankIdType";
import AccountAddress from "@salesforce/label/c.AccountAddress";
import AccountNumberType from "@salesforce/label/c.AccountNumberType";

import Id from "@salesforce/user/Id";
import decryptData from "@salesforce/apex/CNT_TransactionSearchController.decryptData";

//Cash Nexus
import basePath from "@salesforce/community/basePath";
import basePathCashNexus from "@salesforce/label/c.basePathCashNexus";
import uId from "@salesforce/user/Id";
import updateAliasAccount from "@salesforce/apex/CNT_AccountDetails.updateAliasAccount";
import getPersonalSettings from "@salesforce/apex/CNT_AccountDetails.getPersonalSettings";

export default class Lwc_iam_accountDetailParent extends LightningElement {
  userId = Id;

  label = {
    Country,
    Loading,
    Accounts,
    accountDetail,
    basicDetails,
    Bank,
    Account_Number,
    currency,
    Corporate,
    bic,
    aliasAccount,
    T_Modify,
    successAliasAccount,
    errorAliasAccount,
    Ebury,
    Account_Identifier,
    Account,
    BankId,
    AccountName,
    BankIdType,
    AccountAddress,
    AccountNumberType,
    basePath,
    basePathCashNexus,
    errorAliasBank,
    successAliasBank
  };

  @track accountDetails;
  @track personalSettings;
  @track source;
  @track editingAliasBank = false;
  @track editingAliasAccount = false;
  @track filters;
  @track iSortSelected = this.label.Country;
  @track iCurrency;
  @track showToast = false;
  @track msgToast;
  @track typeToast;
  @track isLoading = true;

  @track firstTime = false;

  //Comunidad Cash Nexus
  @track lastUpdate = true;
  @track comunidadCashNexus = false;
  comesfromtracker = false;

  eburyImage = imagesPack + "/ebury.svg";

  get loadingTitle() {
    return this.label.Loading + "...";
  }

  get countryEqEbury() {
    return this.accountDetails.country == this.label.Ebury;
  }

  get eburyAccountDetails() {
    return (
      this.accountDetails.country == this.label.Ebury &&
      this.accountDetails.associatedAccountList
    );
  }

  get isComunidadCashNexus() {
    if (this.label.basePath == this.label.basePathCashNexus)
      this.comunidadCashNexus = true;
    return this.comunidadCashNexus;
  }

  renderedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    if (!this.firstTime) {
      if (this.label.basePath == this.label.basePathCashNexus) {
        this.comunidadCashNexus = true;
        this.getPersonalSettingsInfo();
      }
      this.getURLParams();
      this.firstTime = true;
    }
  }

  getPersonalSettingsInfo() {
    var result = "";
    getPersonalSettings()
      .then((value) => {
        result = value;
        this.personalSettings = result.personalsettings;
      })
      .catch((error) => {
        console.log("getPersonalSettings iam_accountDetailParent: " + error);
      });
  }

  getURLParams() {
    /*
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        //sPageURLMain = "params=t50cpJ3TqQkbPfL9HY8dLMXg8R1CEnY4g0/5hrxRy3nl45gdn4BYwWAzGEWc72uTZkQzYPF/TyD2pxS4KvGvQe3WBmMDdbyOUdpLrH1r6joSTzLsbCFQVtjSAvhD8xxdAoeiAauLAqeb8myRYgLPAYtBI/7sue+o1sD36PBZbdZuPgFZVhY0nnLRVC4dgprS2dD6lpBLpXD7YH/RY3ua46YUTwzr9OuWIkrAifpjzmVREAGpQLcL/lGP8Zy3tPmWZVNN5ZKMCXisLU/yqIWlI7KtJO1YJmyEsJilemwsFHiB9NXqlq/+FdyAPGyE0HbTWj1MKm/v1Q8jSAybTpmaE677bR3qWwDE4SXC9UmH+TzHpYkpGxqNvZiJ7GxeooR0GFv7FgcOk41212kKRRV/qdhb8auiJTu6JcSs8gCltc6omcOqanZPhbOkOG/G4QdBrRa+3y0GKNmPN0ib0IHeJTxxZb2aCfq4pmRCPKlmVNvxfdR7xrypMh1ANFS3QRF/MiWH4mXusNsiPkZsSejVIIgDKNaR7SPdQ/Z6Z9mW2hnvqU7wcrXx0+a+n4NMoNxefB1WQIxaArV/ftHV29tvaS2VLDS1ujTPy24uxdv/4wPRXNyRpGEGhxZ0fnNCyfjZcussYsbDMQ/BT0RQYvztOTKehabwwgEqMgQwhnF/aSSYXzRkdEvKRf4nlk6qV4tYTHc4aJORXLjb82NfyAeDdGOHe79WHsOnE1N6BMzHTqc4XaR+et+cNMSTnOh/BZ4k";
        this.template.querySelector("c-lwc_service-component").apexDataDecryption({
            callercomponent:'apex-data-decryption',
            datauri: sPageURLMain,
            callerhelper: '', 
            controllermethod: ''
        });
        */
    var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
    var sURLVariablesMain = sPageURLMain.split("&")[0].split("=");
    if (sURLVariablesMain[0] == "params") {
      this.decrypt(sURLVariablesMain[1]);
    }
  }
  decrypt(data) {
    var result = "";
    decryptData({ str: data })
      .then((value) => {
        result = value;
        this.handleParams(result);
      })
      .catch((error) => {
        console.log("decrypt iam_accountDetailParent: " + error); // TestError
      });
  }

  successcallback(event) {
    var response = event.detail.value;
    //response = ["c__country=AR","c__source=accountTransactions","c__bank=BANCO SANTANDER RIO S.A.","c__accountNumber=0000005000226257ARS","c__bic=BSCH","c__subsidiaryName=Ficticia AR","c__aliasBank=BANCO SANTANDER RIO S.A.","c__mainAmount=99779","c__availableAmount=99879","c__alias=","c__idType=BBA","c__currentCurrency=ARS","c__filters=[{\"data\":[],\"name\":\"Book date\",\"type\":\"dates\",\"displayFilter\":true},{\"name\":\"Amount\",\"type\":\"text\",\"displayFilter\":true,\"displayOptions\":false}]","c__idType=undefined","c__codigoCuenta=undefined","c__codigoBic=BSCHARBAXXX","c__codigoEmisora=undefined","c__aliasEntidad=undefined"];
    if (response) {
      if (event.detail.callercomponent === "apex-data-decryption") {
        this.handleParams(response);
      } else if (event.detail.callercomponent === "on-call-apex") {
        this.setUpdatedAlias(response);
      }
    }
  }

  handleParams(response) {
    response = response.split("&");
    var sParameterName;
    var accountDetails = {};

    for (var i = 0; i < response.length; i++) {
      sParameterName = response[i].split("=");

      if (sParameterName[0] === "c__source") {
        sParameterName[1] === undefined
          ? "Not found"
          : (this.source = sParameterName[1]);
      }
      if (sParameterName[0] === "c__lastUpdate") {
        sParameterName[1] === undefined
          ? "Not found"
          : (this.lastUpdate = sParameterName[1]);
      }
      if (sParameterName[0] === "c__subsidiaryName") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.accountName = sParameterName[1]);
      }
      if (sParameterName[0] === "c__accountNumber") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.accountNumber = sParameterName[1]);
      }
      if (sParameterName[0] === "c__bank") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.bank = sParameterName[1]);
      }
      if (sParameterName[0] === "c__mainAmount") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.bookBalance = sParameterName[1]);
      }
      if (sParameterName[0] === "c__availableAmount") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.availableBalance = sParameterName[1]);
      }
      if (sParameterName[0] === "c__currentCurrency") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.accountCurrency = sParameterName[1]);
      }
      if (sParameterName[0] === "c__alias") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.accountAlias = sParameterName[1]);
      }
      if (sParameterName[0] === "c__country") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.country = sParameterName[1]);
      }
      if (sParameterName[0] === "c__aliasBank") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.bankAlias = sParameterName[1]);
      }
      if (sParameterName[0] === "c__bic") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.bic = sParameterName[1]);
      }
      if (sParameterName[0] === "c__codigoEmisora") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.codigoEmisora = sParameterName[1]);
      }
      if (sParameterName[0] === "c__codigoCuenta") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.codigoCuenta = sParameterName[1]);
      }
      if (sParameterName[0] === "c__filters") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.filters = sParameterName[1]);
      }
      if (sParameterName[0] === "c__tabs") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.tabs = sParameterName[1]);
      }
      if (sParameterName[0] === "c__sourcePage") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.sourcePage = sParameterName[1]);
      }
      if (sParameterName[0] === "c__comesFrom") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.comesFrom = sParameterName[1]);
      }
      if (sParameterName[0] === "c__iRegister") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.iRegister = sParameterName[1]);
      }
      if (sParameterName[0] === "c__firstAccountCountryList") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.firstAccountCountryList = sParameterName[1]);
      }
      if (sParameterName[0] === "c__firstTAccountCountryList") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.firstTAccountCountryList = sParameterName[1]);
      }
      if (sParameterName[0] === "c__idType") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.idType = sParameterName[1]);
      }
      if (sParameterName[0] === "c__codigoBic") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.codigoBic = sParameterName[1]);
      }
      if (sParameterName[0] === "c__accountGrouping") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.iSortSelected = sParameterName[1]);
      }
      if (sParameterName[0] === "c__consolidationCurrency") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.iCurrency = sParameterName[1]);
      }
      if (sParameterName[0] === "c__aliasEntidad") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.aliasEntidad = sParameterName[1]);
      }
      if (sParameterName[0] === "c__codigoCorporate") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.codigoCorporate = sParameterName[1]);
      }
      if (sParameterName[0] === "c__dataProvider") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.dataProvider = sParameterName[1]);
      }
      if (sParameterName[0] === "c__associatedAccountList") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.associatedAccountList = JSON.parse(
              sParameterName[1]
            ));
        let accList = accountDetails.associatedAccountList;
        Object.keys(accList).forEach((key) => {
          accList[key].accountNumber = key;
          accList[key].bankId
            ? (accList[key].isBankIdUndefined = false)
            : (accList[key].isBankIdUndefined = true);
          accList[key].account && accList[key].account.accountId
            ? (accList[key].isAccountUndefined = false)
            : (accList[key].isAccountUndefined = true);
          accList[key].AccountName
            ? (accList[key].isAccountNameUndefined = false)
            : (accList[key].isAccountNameUndefined = true);
          accList[key].bankIdType
            ? (accList[key].isBankIdTypeUndefined = false)
            : (accList[key].isBankIdTypeUndefined = true);
          accList[key].accountAddress
            ? (accList[key].isAccountAddressUndefined = false)
            : (accList[key].isAccountAddressUndefined = true);
          accList[key].account && accList[key].account.accountIdType
            ? (accList[key].isAccountIdTypeUndefined = false)
            : (accList[key].isAccountIdTypeUndefined = true);
          accList[key].AccountName
            ? (accList[key].isAccountNameUndefined = false)
            : (accList[key].isAccountNameUndefined = true);
        });
      }
      if (sParameterName[0] === "c__bookDate") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.bookDate = sParameterName[1]);
      }
      if (sParameterName[0] === "c__valueDate") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.valueDate = sParameterName[1]);
      }
      if (sParameterName[0] === "c__countryName") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.countryName = sParameterName[1]);
      }
      if (sParameterName[0] === "c__codigoCorporate") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.codigoCorporate = sParameterName[1]);
      }
      if (sParameterName[0] === "c__dataProvider") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.dataProvider = sParameterName[1]);
      }
      if (sParameterName[0] === "c__bookDate") {
        sParameterName[1] === undefined
          ? "Not found"
          : (accountDetails.bookDate = sParameterName[1]);
      }
    }

    // Clean undefined values
    for (var key in Object.keys(accountDetails)) {
      if (accountDetails[Object.keys(accountDetails)[key]] == "undefined") {
        accountDetails[Object.keys(accountDetails)[key]] = "";
      }
    }
    this.accountDetails = accountDetails;
    this.isLoading = false;
  }

  navigateback() {
    this.navigateToPreviousScreen();
  }

  navigateToPreviousScreen() {
    var sourcePage = this.source;
    var page;
    if (sourcePage == "globalBalance") {
      var aux = this.source;
      var url =
        "c__source=" +
        aux +
        "&c__filters=" +
        JSON.stringify(this.accountDetails.filters) +
        "&c__tabs=" +
        this.accountDetails.tabs +
        "&c__sourcePage=" +
        this.accountDetails.sourcePage +
        "&c__iRegister=" +
        JSON.stringify(this.accountDetails.iRegister) +
        "&c__firstAccountCountryList=" +
        JSON.stringify(this.accountDetails.firstAccountCountryList) +
        "&c__firstTAccountCountryList=" +
        JSON.stringify(this.accountDetails.firstTAccountCountryList) +
        "&c__accountGrouping=" +
        this.iSortSelected +
        "&c__consolidationCurrency=" +
        this.iCurrency;

      page = "accounts";
    } else if (sourcePage == "accountTransactions") {
      var aux = "globalBalance";
      var accountDetails = this.accountDetails;

      var url =
        "c__source=" +
        aux +
        "&c__subsidiaryName=" +
        accountDetails.accountName +
        "&c__accountNumber=" +
        accountDetails.accountNumber +
        "&c__bank=" +
        accountDetails.bank +
        "&c__mainAmount=" +
        accountDetails.bookBalance +
        "&c__availableAmount=" +
        accountDetails.availableBalance +
        "&c__currentCurrency=" +
        accountDetails.accountCurrency +
        "&c__alias=" +
        accountDetails.accountAlias +
        "&c__lastUpdate=" +
        this.lastUpdate +
        "&c__idType=" +
        accountDetails.idType +
        "&c__country=" +
        accountDetails.country +
        "&c__aliasBank=" +
        accountDetails.bankAlias +
        "&c__bic=" +
        accountDetails.bic +
        "&c__filters=" +
        JSON.stringify(accountDetails.filters) +
        "&c__accountCode=" +
        accountDetails.codigoCuenta +
        "&c__codigoBic=" +
        accountDetails.codigoBic +
        //DA - 18/11/2020 - Account Detail Back Button
        "&c__codigoEmisora=" +
        accountDetails.codigoEmisora +
        "&c__aliasEntidad=" +
        accountDetails.aliasEntidad +
        "&c__codigoCuenta=" +
        accountDetails.codigoCuenta +
        "&c__bookDate=" +
        accountDetails.bookDate +
        "&c__valueDate=" +
        accountDetails.valueDate +
        "&c__countryName=" +
        accountDetails.countryName +
        "&c__tabs=true" +
        "&c__sourcePage=" +
        "&c__comesFrom=accountList" +
        "&c__bookDate=" +
        accountDetails.bookDate;

      //AM - 28/09/2020 - Ebury Accounts
      if (this.accountDetails.codigoCorporate) {
        url =
          url + "&c__codigoCorporate=" + this.accountDetails.codigoCorporate;
      }
      if (this.accountDetails.dataProvider) {
        url = url + "&c__dataProvider=" + this.accountDetails.dataProvider;
      }
      if (this.accountDetails.associatedAccountList) {
        url =
          url +
          "&c__associatedAccountList=" +
          JSON.stringify(this.accountDetails.associatedAccountList);
      }

      page = "account-transactions";
    } else if (sourcePage == "fromIPTParent") {
      var accountDetails = this.accountDetails;
      var url =
        "c__subsidiaryName=" +
        accountDetails.accountName +
        "&c__alias=" +
        accountDetails.accountAlias +
        "&c__bic=" +
        accountDetails.bic +
        "&c__currentCurrency=" +
        accountDetails.accountCurrency +
        "&c__accountNumber=" +
        accountDetails.accountNumber +
        "&c__idType=" +
        accountDetails.iIdType +
        "&c__source=" +
        aux +
        "&c__updateHour=" +
        accountDetails.hourValue +
        "&c__date=" +
        accountDetails.dateValue +
        "&c__bank=" +
        accountDetails.bank +
        "&c__mainAmount=" +
        accountDetails.bookBalance +
        "&c__availableAmount=" +
        accountDetails.availableBalance +
        "&c__lastUpdate=" +
        this.lastUpdate +
        "&c__country=" +
        accountDetails.country +
        "&c__aliasBank=" +
        accountDetails.bankAlias +
        "&c__filters=" +
        this.filters;

      page = "international-payments-tracker";
    }

    this.template.querySelector("c-lwc_service-component").redirect({
      page: page,
      urlParams: url
    });
  }

  editAlias(event) {
    var sourceId = event.currentTarget.id.split("-")[0];
    if (sourceId == "aliasAccount") {
      this.editingAliasAccount = true;
    } else if (sourceId == "aliasBank") {
      this.editingAliasBank = true;
    }
  }

  closeSaveAlias(event) {
    var sourceId = event.currentTarget.id.split("-")[0];
    switch (sourceId) {
      case "saveAliasAccount":
        this.updateAccountAlias(
          this.template.querySelector('[data-id="aliasAccountInput"]').value,
          sourceId
        );
        break;
      case "closeAliasAccount":
        this.editingAliasAccount = false;
        break;
      case "saveAliasBank":
        this.updateBankAlias(
          sourceId,
          this.template.querySelector('[data-id="aliasBankInput"]').value,
          sourceId
        );
        break;
      case "closeAliasBank":
        this.editingAliasBank = false;
        break;
    }
  }

  updateAccountAlias(aliasAccount, sourceId) {
    if (!this.comunidadCashNexus) {
      let accountDetails = this.accountDetails;
      let bankId = accountDetails.codigoBic;
      let idType = accountDetails.idType;
      let accountId = accountDetails.accountNumber;
      let aliasGts = aliasAccount;

      // Create the request body
      let requestBody = {
        aliasData: {
          bankId: bankId,
          account: {
            idType: idType,
            accountId: accountId
          },
          aliasGTS: aliasGts
        }
      };

      // Call the server-side action and make the callout to the update alias service
      let params = {
        actionParameters: JSON.stringify(requestBody),
        newAlias: aliasGts
      };
      this.template.querySelector("c-lwc_service-component").onCallApex({
        callercomponent: "on-call-apex",
        controllermethod: "updateOneTradeAlias",
        actionparameters: params
      });
    } else {
      try {
        var userId = uId;
        this.isLoading = true;
        var codigoCuenta = this.accountDetails.codigoCuenta;
        var nombreUsuario = this.personalSettings.nombreUsuario;
        if (
          codigoCuenta != null &&
          codigoCuenta != undefined &&
          codigoCuenta != "" &&
          nombreUsuario != null &&
          nombreUsuario != undefined &&
          nombreUsuario != ""
        ) {
          var params = {};
          params.uid = ""; //component.get("v.personalSettings.UIDModificacion");
          params.cod_subproducto = "26";
          params.nombre_cdemgr = this.personalSettings.nombreUsuario.trim();
          params.lista_alias_cuenta_perfilada = [];
          var alias_cuenta_perfilada_aux = {};
          alias_cuenta_perfilada_aux.codigo_cuenta = codigoCuenta;
          alias_cuenta_perfilada_aux.alias_cuenta_perfilada_desc = aliasAccount;

          var alias_cuenta_perfilada = {
            alias_cuenta_perfilada: alias_cuenta_perfilada_aux
          };

          params.lista_alias_cuenta_perfilada.push(alias_cuenta_perfilada);

          var result = "";
          updateAliasAccount({ actionParameters: JSON.stringify(params) })
            .then((value) => {
              result = value;
              this.accountDetails.accountAlias = aliasAccount;
              this.editingAliasAccount = false;
              this.isLoading = false;
              window.localStorage.removeItem(userId + "_" + "balanceGP");
              window.localStorage.removeItem(
                userId + "_" + "balanceTimestampGP"
              );
              window.localStorage.removeItem(userId + "_" + "balanceEODGP");
              window.localStorage.removeItem(
                userId + "_" + "balanceEODTimestampGP"
              );
              this.updateSuccessfullNotification(sourceId);
            })
            .catch((error) => {
              console.log("decrypt iam_accountDetailParent: " + error); // TestError
              this.isLoading = false;
              this.updateErrorNotification(sourceId);
            });
        } else {
          console.log("Unknown error");
          this.editingAliasAccount = false;
          this.isLoading = false;
          this.updateErrorNotification(sourceId);
        }
      } catch (e) {
        console.log(
          "IAM_AccountDetailParent Cash Nexus / updateAccountAlias : " + e
        );
        this.editingAliasAccount = false;
        this.isLoading = false;
        this.updateErrorNotification(sourceId);
      }
    }
  }

  setUpdatedAlias(response) {
    let isUpdated = Object.values(response)[0];
    if (isUpdated) {
      let newAlias = Object.keys(response)[0];
      let userId = this.userId;
      this.accountDetails.accountAlias = newAlias;
      window.localStorage.removeItem(userId + "_" + "balanceGP");
      window.localStorage.removeItem(userId + "_" + "balanceTimestampGP");
      this.updateSuccessfullNotification();
    } else {
      this.updateErrorNotification();
    }
    this.editingAliasAccount = false;
    this.isLoading = false;
  }

  updateSuccessfullNotification(sourceId) {
    if (!this.comunidadCashNexus) {
      var msg = this.label.successAliasAccount;
      this.msgToast = msg;
      this.typeToast = "success";
      this.showToast = true;
    } else {
      if (sourceId == "saveAliasAccount") {
        var msg = this.label.successAliasAccount;
        this.msgToast = msg;
        this.typeToast = "success";
        this.showToast = true;
      } else if (sourceId == "saveAliasBank") {
        var msg = this.label.successAliasBank;
        this.msgToast = msg;
        this.typeToast = "success";
        this.showToast = true;
      }
    }
  }

  updateErrorNotification(sourceId) {
    if (!this.comunidadCashNexus) {
      var msg = this.label.errorAliasAccount;
      this.msgToast = msg;
      this.typeToast = "error";
      this.showToast = true;
    } else {
      if (sourceId == "saveAliasAccount") {
        var msg = this.label.errorAliasAccount;
        this.msgToast = msg;
        this.typeToast = "error";
        this.showToast = true;
      } else if (sourceId == "saveAliasBank") {
        var msg = this.label.errorAliasBank;
        this.msgToast = msg;
        this.typeToast = "error";
        this.showToast = true;
      }
    }
  }
}
