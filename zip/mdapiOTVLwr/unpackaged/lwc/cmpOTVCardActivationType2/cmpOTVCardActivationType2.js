import { LightningElement } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";

// importing Custom Label
import cmpOTVActivationCompleted2_1 from "@salesforce/label/c.cmpOTVActivationCompleted2_1";
import cmpOTVActivationCompleted2_2 from "@salesforce/label/c.cmpOTVActivationCompleted2_2";
import cmpOTVActivationCompleted2_3 from "@salesforce/label/c.cmpOTVActivationCompleted2_3";

export default class CmpOTVCardActivationType2 extends LightningElement {
  label = {
    cmpOTVActivationCompleted2_1,
    cmpOTVActivationCompleted2_2,
    cmpOTVActivationCompleted2_3
  };
  showSubsidiaries = false;

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }
  accept(event) {
    this.showSubsidiaries = true;
  }
}
