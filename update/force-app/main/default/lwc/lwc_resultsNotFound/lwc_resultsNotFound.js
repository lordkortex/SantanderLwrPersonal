import { LightningElement, api } from "lwc";

import { loadStyle, loadScript } from "lightning/platformResourceLoader";
// Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

import NoFoundResults from "@salesforce/label/c.NoFoundResults";
import NoFoundResultsDescription from "@salesforce/label/c.NoFoundResultsDescription";
import SearchAgain from "@salesforce/label/c.SearchAgain";

export default class Lwc_resultsNotFound extends LightningElement {
  label = {
    NoFoundResults,
    NoFoundResultsDescription,
    SearchAgain
  };

  @api selectedaccount;
  @api datefrom = "";
  @api dateto = "";
  @api msg;
  @api showsearchagain = false;

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");

    if (!this.showsearchagain) {
      this.showsearchagain = true;
    } else {
      this.showsearchagain = false;
    }
  }

  searchAgain() {
    console.log("entra en searchAgain");
    this.dateFrom = "";
    this.dateTo = "";
    this.selectedaccount = null;

    const searchagainevent = new CustomEvent("searchagain", {});
    this.dispatchEvent(searchagainevent);
  }
}
