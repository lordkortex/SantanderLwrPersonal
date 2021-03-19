import { LightningElement, api, track } from "lwc";

import error from "@salesforce/label/c.B2B_Error_Enter_Input";

export default class CmpDropdown extends LightningElement {
  showLabel = false;
  showError = true;

  @api label;
  @api placeholder;

  errorText = error;

  @api valuelist = [];

  @track error = "";

  @api errormsg;

  @api value = "";

  selectedValue = "";
  selectedClass = "slds-dropdown__item";

  connectedCallback() {
    if (this.value == "") {
      this.value = this.placeholder;
    } else {
      this.showLabel = true;
    }
  }

  conditions(event) {
    this.selectedClass = "slds-dropdown__item slds-is-selected";
    this.selectedValue = event.target.getAttribute("data-item");

    if (this.selectedValue != "") {
      this.value = this.selectedValue;
      this.showLabel = true;
      this.showError = false;

      const selectedEvent = new CustomEvent("data", {
        detail: this.selectedValue
      });

      this.dispatchEvent(selectedEvent);
    } else {
      this.showError = true;
    }
  }
}
