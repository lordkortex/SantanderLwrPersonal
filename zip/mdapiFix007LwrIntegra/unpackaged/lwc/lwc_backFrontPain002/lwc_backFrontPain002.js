import { LightningElement, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

export default class Lwc_backFrontPain002 extends LightningElement {
  @track filters;
  @track showTable = false;

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }

  getFilters(event) {
    var filters = event.detail.filters;
    this.filters = filters;
    if (filters == undefined || filters == "") {
      this.template.querySelector("[data-id='table']").classList.add("hidden");
    } else {
      this.template
        .querySelector("[data-id='table']")
        .classList.remove("hidden");
    }

    if (
      this.template
        .querySelector("[data-id='table']")
        .classList.contains("hidden")
    ) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }
  }
}
