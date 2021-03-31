import { LightningElement, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

export default class Lwc_backFrontPain002 extends LightningElement {
  @track filters;
  @track showTable = false;
  @track tabApp;
  @track isBackfront = true;

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    this.doInit();
    this.isBackfront = true;
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
      this.showTable = true;
    } else {
      this.showTable = true;
    }
  }

  doInit() {
    var url = window.location.href;
    var lastBar = url.lastIndexOf("/");
    this.tabApp = url.substring(lastBar + 1);
    console.log(this.tabApp);
  }

  get isFiltersEmpty() {
    return this.filters != "";
  }

  get isPain0021() {
    return this.tabApp === "Pain0021";
  }
}
