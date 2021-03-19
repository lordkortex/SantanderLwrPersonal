import { LightningElement, api } from "lwc";
//Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

export default class Lwc_cn_titleSubtitleGray extends LightningElement {
  @api title; //description = "Title"
  @api subtitle; //description = "Subtitle"

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }
}
