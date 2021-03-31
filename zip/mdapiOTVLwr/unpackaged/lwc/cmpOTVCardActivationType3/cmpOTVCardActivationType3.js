import { LightningElement } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";

// importing Custom Label
import cmpOTVActivationCompleted3_1 from "@salesforce/label/c.cmpOTVActivationCompleted3_1";
import cmpOTVActivationCompleted3_2 from "@salesforce/label/c.cmpOTVActivationCompleted3_2";

export default class CmpOTVCardActivationType3 extends LightningElement {
  label = {
    cmpOTVActivationCompleted3_1,
    cmpOTVActivationCompleted3_2
  };

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }
}
