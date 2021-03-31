import { LightningElement } from "lwc";

// importing Resources
import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import images from "@salesforce/resourceUrl/Images";

// importing Custom Label
import cmpOTVSignGlobalID_1 from "@salesforce/label/c.cmpOTVSignGlobalID_1";
import cmpOTVSignGlobalID_2 from "@salesforce/label/c.cmpOTVSignGlobalID_2";
import cmpOTVSignGlobalID_3 from "@salesforce/label/c.cmpOTVSignGlobalID_3";

export default class CmpOTVSignGlobalID extends LightningElement {
  label = {
    cmpOTVSignGlobalID_1,
    cmpOTVSignGlobalID_2,
    cmpOTVSignGlobalID_3
  };

  showDownload = false;

  // Expose URL of assets included inside an archive file
  showSignature = true;
  logoSymbolRed = images + "/logo_symbol_red.svg";
  id = images + "/i-d.jpg";

  isSigned = true;

  connectedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }

  showDownloadTrue() {
    this.showDownload = true;
  }
  showDownloadFalse() {
    this.showDownload = false;
  }

  resentRequest() {
    //TO DO
    console.log("Signature Process resentRequest CLICK");
  }

  goCompletedSignature() {
    console.log("Signature Process isSigned--> " + this.isSigned);
    if (this.isSigned) {
      console.log("Signature Process isSigned true--> " + this.isSigned);
      const changeStepEvent = new CustomEvent("issigned", {
        detail: { isSigned: this.isSigned }
      });
      this.dispatchEvent(changeStepEvent);
    }
  }
}
