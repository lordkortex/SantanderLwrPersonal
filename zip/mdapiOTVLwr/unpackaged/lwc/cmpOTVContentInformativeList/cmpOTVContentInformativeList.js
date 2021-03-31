import { LightningElement } from "lwc";

// importing Resources
import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import images from "@salesforce/resourceUrl/Images";

// importing Custom Label
import cmpOTVContentInformativeList_1 from "@salesforce/label/c.cmpOTVContentInformativeList_1";
import cmpOTVContentInformativeList_2 from "@salesforce/label/c.cmpOTVContentInformativeList_2";
import cmpOTVContentInformativeList_3 from "@salesforce/label/c.cmpOTVContentInformativeList_3";
import cmpOTVContentInformativeList_4 from "@salesforce/label/c.cmpOTVContentInformativeList_4";
import cmpOTVContentInformativeList_5 from "@salesforce/label/c.cmpOTVContentInformativeList_5";
import cmpOTVContentInformativeList_6 from "@salesforce/label/c.cmpOTVContentInformativeList_6";

export default class CmpOTVContentInformativeList extends LightningElement {
  label = {
    cmpOTVContentInformativeList_1,
    cmpOTVContentInformativeList_2,
    cmpOTVContentInformativeList_3,
    cmpOTVContentInformativeList_4,
    cmpOTVContentInformativeList_5,
    cmpOTVContentInformativeList_6
  };

  b1Selected = true;
  b2Selected = false;
  b3Selected = false;
  b4Selected = false;

  // Expose URL of assets included inside an archive file
  contentInforIlustration_1 =
    images + "/content-info-list-illustration-1@2x.png";
  contentInforIlustration_2 =
    images + "/content-info-list-illustration-2@2x.png";
  contentInforIlustration_3 =
    images + "/content-info-list-illustration-3@2x.png";
  contentInforIlustration_4 =
    images + "/content-info-list-illustration-4@2x.png";

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }

  selectContent(event) {
    let divs = this.template.querySelector(".slds-item.selected");
    if (divs != undefined && divs != null) {
      divs.className = "slds-item";
    }
    event.currentTarget.className = "slds-item selected";

    var idSelected = event.currentTarget.dataset.id;
    if (idSelected != undefined && idSelected != null) {
      if (idSelected == "b1") {
        this.b1Selected = true;
        this.b2Selected = false;
        this.b3Selected = false;
        this.b4Selected = false;
      } else if (idSelected == "b2") {
        this.b1Selected = false;
        this.b2Selected = true;
        this.b3Selected = false;
        this.b4Selected = false;
      } else if (idSelected == "b3") {
        this.b1Selected = false;
        this.b2Selected = false;
        this.b3Selected = true;
        this.b4Selected = false;
      } else if (idSelected == "b4") {
        this.b1Selected = false;
        this.b2Selected = false;
        this.b3Selected = false;
        this.b4Selected = true;
      }
    }
  }
}
