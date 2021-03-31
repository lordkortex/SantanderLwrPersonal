import { LightningElement, api } from "lwc";

import getLstUsers from "@salesforce/apex/CNT_OTV_UserSelection.getLstMatrixUsersBR";

// importing Resources
import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import images from "@salesforce/resourceUrl/Images";
import flags from "@salesforce/resourceUrl/Flags";

// importing Custom Label
import back from "@salesforce/label/c.back";
import Activation from "@salesforce/label/c.Activation";
import cancelProcess from "@salesforce/label/c.cancelProcess";
import cmpOTVTermsConditions_16 from "@salesforce/label/c.cmpOTVTermsConditions_16";
import cmpOTVSubsidiariesSelection_1 from "@salesforce/label/c.cmpOTVSubsidiariesSelection_1";
import cmpOTVSubsidiariesSelection_2 from "@salesforce/label/c.cmpOTVSubsidiariesSelection_2";
import cmpOTVSubsidiariesSelection_3 from "@salesforce/label/c.cmpOTVSubsidiariesSelection_3";
import cmpOTVActivationCompleted2_3 from "@salesforce/label/c.cmpOTVActivationCompleted2_3";
import cmpOTVUsersSelection_1 from "@salesforce/label/c.cmpOTVUsersSelection_1";
import cmpOTVUsersSelection_2 from "@salesforce/label/c.cmpOTVUsersSelection_2";

export default class CmpOTVUsersSelectionBR extends LightningElement {
  label = {
    back,
    Activation,
    cancelProcess,
    cmpOTVTermsConditions_16,
    cmpOTVSubsidiariesSelection_1,
    cmpOTVSubsidiariesSelection_2,
    cmpOTVSubsidiariesSelection_3,
    cmpOTVActivationCompleted2_3,
    cmpOTVUsersSelection_1,
    cmpOTVUsersSelection_2
  };
  // Expose URL of assets included inside an archive file
  logoSymbolRed = images + "/logo_symbol_red.svg";
  ES = flags + "/ES.svg";
  loading = true;
  userList = [];
  @api lstusers = [];
  @api step;

  connectedCallback() {
    getLstUsers()
      .then((results) => {
        this.lstusers = results;
      })
      .finally(() => {
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }

  goToOneTrade() {
    //TODO Marcar el check de enrollment en la relacion.
    const changeStepEvent = new CustomEvent("changestep", {
      detail: { step: 9 }
    });
    this.dispatchEvent(changeStepEvent);
  }

  usrSelected(event) {
    try {
      console.log(event.currentTarget.getAttribute("data-item"));
      console.log(event.target.getAttribute("data-item"));
      //Usuario seleccionado
      if (
        event.currentTarget.className == "cardUsers slds-card card-selected"
      ) {
        event.currentTarget.className = "cardUsers slds-card";
        this.userList = this.userList.filter(
          (value) => value !== event.currentTarget.getAttribute("data-item")
        );
      } else {
        event.currentTarget.className = "cardUsers slds-card card-selected";
        this.userList.push(event.currentTarget.getAttribute("data-item"));
      }

      console.log(this.userList);
    } catch (error) {
      console.log(error);
    }
  }

  cancelProcess() {
    const changeStepEvent = new CustomEvent("changestep", {
      detail: { step: 0 }
    });
    this.dispatchEvent(changeStepEvent);
  }

  goBack() {
    const changeStepEvent = new CustomEvent("changestep", {
      detail: { step: 1 }
    });
    this.dispatchEvent(changeStepEvent);
  }

  goSupportCenter() {
    console.log(this.fromStep);
    const changeStepEvent = new CustomEvent("changestep", {
      detail: { step: 6, fromStep: this.step }
    });
    this.dispatchEvent(changeStepEvent);
  }
}
