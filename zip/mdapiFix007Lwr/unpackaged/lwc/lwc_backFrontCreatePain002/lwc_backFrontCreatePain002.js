import { LightningElement, api, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

// Import labels
import painActivatedCorrectly from "@salesforce/label/c.painActivatedCorrectly";
import activePIN002 from "@salesforce/label/c.activePIN002";
import Loading from "@salesforce/label/c.Loading";
import Account from "@salesforce/label/c.Account";
import periodicity from "@salesforce/label/c.periodicity";
import daily from "@salesforce/label/c.daily";
import channel from "@salesforce/label/c.channel";
import allPain002Activated from "@salesforce/label/c.allPain002Activated";
import add from "@salesforce/label/c.add";
import fillAllFields from "@salesforce/label/c.fillAllFields";
import painNotActivatedCorrectly from "@salesforce/label/c.painNotActivatedCorrectly";
import cancel from "@salesforce/label/c.cancel";

// Import apex class
import getDeactivatedPain002 from "@salesforce/apex/CNT_BackFrontPain002Table.getDeactivatedPain002";
import activePain002 from "@salesforce/apex/CNT_BackFrontPain002Table.activePain002";

export default class Lwc_backFrontCreatePain002 extends LightningElement {
  label = {
    painActivatedCorrectly,
    activePIN002,
    Loading,
    Account,
    periodicity,
    daily,
    channel,
    allPain002Activated,
    add,
    fillAllFields,
    painNotActivatedCorrectly,
    cancel
  };

  @api isopen;
  @api entity;

  @track channelList = [
    "SwiftNet",
    "Editran",
    "SFTP",
    "H2H",
    "EBICS",
    "Others"
  ];
  @track selectedChannel;
  @track selectedAccount;
  @track accountList;
  @track toastType = "success";
  @track error;
  @track showToast;
  @track toastMessage;
  @track accountListToDisplay;
  @track isLoading = true;

  @track selectedAccountCurrency;

  _isopen;
  _entity;

  get isopen() {
    return this._isopen;
  }

  set isopen(isopen) {
    if (isopen) {
      this._isopen = isopen;
      this.doInit();
    }
  }

  get entity() {
    return this._entity;
  }

  set entity(entity) {
    if (entity) {
      this._entity = entity;
      this.doInit();
    }
  }

  get loadingLabel() {
    return this.label.Loading + "...";
  }

  get accountListNotEmpty() {
    return this.accountList.length > 0;
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }

  openModel() {
    // for Display Model,set the "isOpen" attribute to "true"
    this._isopen = true;
  }

  closeModel() {
    // for Hide/Close Model,set the "isOpen" attribute to "Fasle"
    this._isopen = false;

    const createPainEvent = new CustomEvent("createpainevent", {
      detail: { isOpen: this._isopen }
    });
    this.dispatchEvent(createPainEvent);
  }

  doInit() {
    if (this._isopen) {
      this.selectedChannel = "";
      this.error = "";

      this.selectedAccount = "";
      this.getAccounts();
    }
  }

  doAdd() {
    console.log("create");
    if (this.selectedAccount == "" || this.selectedChannel == "") {
      console.log("entro");
      this.error = this.label.fillAllFields;
    } else {
      this.error = "";
      this.add();
    }
  }

  getAccounts() {
    try {
      this.accountList = [];

      getDeactivatedPain002({ filters: this._entity })
        .then((result) => {
          var res = result;
          console.log(res);
          if (res != undefined && res != "" && res != [] && res != '""') {
            console.log(res);
            var resJSON = JSON.parse(res).accountListResponse;

            var accounts = [];
            var accountListToDisplay = [];
            for (var i in resJSON) {
              accountListToDisplay.push(resJSON[i].iban);

              accounts.push({
                account: resJSON[i].iban,
                bic: resJSON[i].agent,
                currency: resJSON[i].currencyCodeMainBalance
              });
            }
            console.log(accountListToDisplay);
            this.accountListToDisplay = accountListToDisplay;
            this.accountList = accounts;
            this.ready = true;
          }
        })
        .catch((error) => {
          if (error) {
            console.log("Error message: " + error);
          } else {
            console.log("Unknown error");
          }
        })
        .finally(() => {
          this.isLoading = false;
          if (this.template.querySelector("[data-id='spinnerCreate']")) {
            this.template
              .querySelector("[data-id='spinnerCreate']")
              .classList.add("slds-hide");
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  add() {
    try {
      if (this.selectedAccount != "" && this.selectedChannel != "") {
        var bic = "";
        var currency = "";
        var accountList = this.accountList;
        if (accountList.length > 0) {
          for (var i in accountList) {
            if (accountList[i].account == this.selectedAccount) {
              bic = accountList[i].bic;
              currency = accountList[i].currency;
            }
          }
        }
        if (currency == null) {
          currency = "";
        }
        var body =
          '{"accountPain002Insert": {"currencyCode": "' +
          currency +
          '","companyGlobalId": "' +
          component.get("v.entity") +
          '","accountId": "' +
          component.get("v.selectedAccount") +
          '","bankId": "' +
          bic +
          '","channel": "' +
          component.get("v.selectedChannel") +
          '","periodicity": "daily"}}';

        activePain002({ body: body })
          .then((result) => {
            this._isopen = false;
            this.toastType = "success";
            this.toastMessage = this.label.painActivatedCorrectly;
            this.showToast = true;
          })
          .catch((error) => {
            this.toastType = "error";
            this.toastMessage = this.label.painNotActivatedCorrectly;
            this.showToast = true;
            if (error) {
              console.log("Error message: " + error);
            } else {
              console.log("Unknown error");
            }
          });
      }
    } catch (e) {
      console.log(e);
    }
  }

  accountSelected(event) {
    //var eventId = event.currentTarget.dataset.uniqueId;
    var currency = "";
    var accountList = this.accountList;
    if (accountList.length > 0) {
      for (var i in accountList) {
        if (accountList[i].account === this.selectedAccount) {
          currency = accountList[i].currency;
        }
      }
    }
    this.selectedAccountCurrency = currency;
  }
}
