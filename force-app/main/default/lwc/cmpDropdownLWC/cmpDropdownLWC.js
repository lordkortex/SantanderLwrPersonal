import { LightningElement, api } from "lwc";

import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import Icons from "@salesforce/resourceUrl/Santander_Icons";
import Tokens from "@salesforce/resourceUrl/DesignSystem";
import dropdown_LWC from "@salesforce/resourceUrl/dropdown_LWC";

export default class CmpDropdownLWC extends LightningElement {
  @api arrayoptions;
  @api title;
  @api placeholder;
  @api value;
  @api variant;

  connectedCallback() {
    loadStyle(this, Icons + "/style.css"),
      loadStyle(this, Tokens),
      loadStyle(this, dropdown_LWC);
  }
  renderedCallback() {
    console.log("Countries List renderedCallback");
  }

  handleChange(event) {
    const changeOption = new CustomEvent("changeoption", {
      detail: { selectedValue: event.target.value }
    });
    this.dispatchEvent(changeOption);
  }
}
