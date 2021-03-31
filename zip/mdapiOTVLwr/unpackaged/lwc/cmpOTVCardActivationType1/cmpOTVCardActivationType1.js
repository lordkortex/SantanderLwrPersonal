import { LightningElement } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";

// importing Custom Label
import cmpOTVActivationCompleted1_1 from "@salesforce/label/c.cmpOTVActivationCompleted1_1";
import cmpOTVActivationCompleted1_2 from "@salesforce/label/c.cmpOTVActivationCompleted1_2";
import cmpOTVActivationCompleted1_3 from "@salesforce/label/c.cmpOTVActivationCompleted1_3";
import cmpOTVActivationCompleted1_4 from "@salesforce/label/c.cmpOTVActivationCompleted1_4";
import cmpOTVActivationCompleted1_5 from "@salesforce/label/c.cmpOTVActivationCompleted1_5";

export default class CmpOTVModalOnBoardingActivationCompleted extends LightningElement {
  label = {
    cmpOTVActivationCompleted1_1,
    cmpOTVActivationCompleted1_2,
    cmpOTVActivationCompleted1_3,
    cmpOTVActivationCompleted1_4,
    cmpOTVActivationCompleted1_5
  };
  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }
}
