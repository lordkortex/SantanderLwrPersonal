import { LightningElement } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";

export default class CmpOTVHeaderCompanyDetail extends LightningElement {
  connectedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }
}
