import { LightningElement, api } from "lwc";

// importing Resources
import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import images from "@salesforce/resourceUrl/Images";

// importing Custom Label
import cmpOTVContentSteps_1 from "@salesforce/label/c.cmpOTVContentSteps_1";
import cmpOTVContentSteps_2 from "@salesforce/label/c.cmpOTVContentSteps_2";
import cmpOTVContentSteps_3 from "@salesforce/label/c.cmpOTVContentSteps_3";
import cmpOTVContentSteps_4 from "@salesforce/label/c.cmpOTVContentSteps_4";
import cmpOTVContentSteps_5 from "@salesforce/label/c.cmpOTVContentSteps_5";
import cmpOTVContentSteps_6 from "@salesforce/label/c.cmpOTVContentSteps_6";
import cmpOTVContentSteps_7 from "@salesforce/label/c.cmpOTVContentSteps_7";
import cmpOTVContentSteps_8 from "@salesforce/label/c.cmpOTVContentSteps_8";
import cmpOTVContentSteps_9 from "@salesforce/label/c.cmpOTVContentSteps_9";
import cmpOTVContentSteps_10 from "@salesforce/label/c.cmpOTVContentSteps_10";

export default class extends LightningElement {
  label = {
    cmpOTVContentSteps_1,
    cmpOTVContentSteps_2,
    cmpOTVContentSteps_3,
    cmpOTVContentSteps_4,
    cmpOTVContentSteps_5,
    cmpOTVContentSteps_6,
    cmpOTVContentSteps_7,
    cmpOTVContentSteps_8,
    cmpOTVContentSteps_9,
    cmpOTVContentSteps_10
  };
  // Expose URL of assets included inside an archive file
  illustrationStep1 = images + "/illustration-step-1.png";
  illustrationStep2 = images + "/illustration-step-2.png";

  @api type1 = false;
  @api type2 = false;

  showDownload = false;

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }
  showDownloadTrue() {
    this.showDownload = true;
  }
  showDownloadFalse() {
    this.showDownload = false;
  }
}
