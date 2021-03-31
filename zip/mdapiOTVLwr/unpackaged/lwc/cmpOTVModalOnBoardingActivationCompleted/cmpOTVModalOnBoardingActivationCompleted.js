import { LightningElement } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import images from "@salesforce/resourceUrl/Images";

export default class CmpOTVModalOnBoardingActivationCompleted extends LightningElement {
  // Expose URL of assets included inside an archive file
  logoSymbolRed = images + "/logo_symbol_red.svg";

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }
}
