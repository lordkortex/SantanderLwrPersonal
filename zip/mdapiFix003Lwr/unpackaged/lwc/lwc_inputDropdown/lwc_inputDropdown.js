import { LightningElement, api, track } from "lwc";
// Import Labels
import from from "@salesforce/label/c.from";
import to from "@salesforce/label/c.to";
import clearAll from "@salesforce/label/c.clearAll";
import apply from "@salesforce/label/c.apply";
import toAmountLowerThanFrom from "@salesforce/label/c.toAmountLowerThanFrom";
import amount from "@salesforce/label/c.amount";

import lang from "@salesforce/i18n/lang";
import numberFormat from "@salesforce/i18n/number.numberFormat";
import locale from "@salesforce/i18n/locale";

export default class Lwc_inputDropdown extends LightningElement {
  // Expose the labels to use in the template.
  label = {
    from,
    to,
    clearAll,
    apply,
    toAmountLowerThanFrom,
    amount
  };
  // Attributes
  @api valueplaceholder = "Select one";
  @api settledfrom;
  @api settledto;
  @api settlederrorfrom;
  @api settlederrorto;

  @track error;
  // @track numberFormat = numberFormat;
  @track classSettleFrom = "slds-input inputShadow lwc_input";
  @track classSettleTo = "slds-input inputShadow lwc_input";
  @track mensajeError = "textHelp";

  settledfromChange(event) {
    this.settledfrom = event.target.value;
    //24/02/2021
    this.updatePlaceHolder();
  }
  settledtoChange(event) {
    this.settledto = event.target.value;
    //24/02/2021
    this.updatePlaceHolder();
  }

  clear() {
    this.settledfrom = "";
    this.settledto = "";
    this.valueplaceholder = this.label.amount;
    this.refreshInput();

    this.settlederrorto = "";
  }

  show() {
    this.template
      .querySelector('[data-id="button"]')
      .classList.toggle("slds-hide");
  }

  apply() {
    this.validateSettled();
  }

  validateSettled() {
    try {
      this.error = false;
      if (
        this.settledfrom != null &&
        this.settledfrom != undefined &&
        this.settledfrom != ""
      ) {
        if (parseInt(this.settledfrom) < 0) {
          this.settledfrom = "";
        }
      }

      if (
        this.settledto != null &&
        this.settledto != undefined &&
        this.settledto != ""
      ) {
        if (parseInt(this.settledto) < 0) {
          this.settledto = "";
        }
      }

      if (
        this.settledto != null &&
        this.settledto != undefined &&
        this.settledto != "" &&
        this.settledfrom != null &&
        this.settledfrom != undefined &&
        this.settledfrom != ""
      ) {
        if (parseInt(this.settledto) < parseInt(this.settledfrom)) {
          // this.error=true;
          this.settlederrorto = this.label.toAmountLowerThanFrom;
        } else {
          this.settlederrorto = "";
        }
      } else {
        this.settlederrorto = "";
      }

      if (this.error == false) {
        this.updatePlaceHolder();
        this.refreshInput();
      } else {
        this.valueplaceholder = this.label.amount;
      }
    } catch (e) {
      console.log(e);
    }
  }

  updatePlaceHolder() {
    this.valueplaceholder = this.label.amount;
    if (
      this.settledfrom != "" &&
      this.settledfrom != null &&
      this.settledfrom != undefined &&
      (this.settledto == "" ||
        this.settledto == null ||
        this.settledto == undefined)
    ) {
      this.settledfrom = this.settledfrom.toLocaleString(lang);
      this.valueplaceholder =
        amount +
        " (" +
        Intl.NumberFormat(locale).format(this.settledfrom) +
        " - Max)";
    }
    if (
      this.settledto != "" &&
      this.settledto != null &&
      this.settledto != undefined &&
      (this.settledfrom == "" ||
        this.settledfrom == null ||
        this.settledfrom == undefined)
    ) {
      this.settledto = this.settledto.toLocaleString(lang);
      this.valueplaceholder =
        this.label.amount +
        " (Min - " +
        Intl.NumberFormat(locale).format(this.settledto) +
        ")";
    }
    if (
      this.settledto != null &&
      this.settledto != undefined &&
      this.settledto != "" &&
      this.settledfrom != null &&
      this.settledfrom != undefined &&
      this.settledfrom != ""
    ) {
      this.settledfrom = this.settledfrom.toLocaleString(lang);
      this.settledto = this.settledto.toLocaleString(lang);
      this.valueplaceholder =
        this.label.amount +
        " (" +
        Intl.NumberFormat(locale).format(this.settledfrom) +
        " - " +
        Intl.NumberFormat(locale).format(this.settledto) +
        ")";
    }
  }

  refreshInput() {
    const updatefilterdropdowninput = new CustomEvent(
      "updatefilterdropdowninput",
      {
        detail: [
          { filter: "settledTo", value: this.settledto },
          { filter: "settledFrom", value: this.settledfrom }
        ]
      }
    );
    // Fire the custom event
    this.dispatchEvent(updatefilterdropdowninput);
  }
}
