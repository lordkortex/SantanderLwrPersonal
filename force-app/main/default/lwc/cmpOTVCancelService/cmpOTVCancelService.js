import { LightningElement } from "lwc";

import back from "@salesforce/label/c.back";
import cmpOTVCancelService_1 from "@salesforce/label/c.cmpOTVCancelService_1";
import cmpOTVCancelService_2 from "@salesforce/label/c.cmpOTVCancelService_2";
import cmpOTVCancelService_3 from "@salesforce/label/c.cmpOTVCancelService_3";
import cmpOTVCancelService_4 from "@salesforce/label/c.cmpOTVCancelService_4";
import cmpOTVCancelService_5 from "@salesforce/label/c.cmpOTVCancelService_5";
import cmpOTVCancelService_6 from "@salesforce/label/c.cmpOTVCancelService_6";
import cmpOTVCancelService_7 from "@salesforce/label/c.cmpOTVCancelService_7";
import cmpOTVCancelService_8 from "@salesforce/label/c.cmpOTVCancelService_8";
import cmpOTVCancelService_9 from "@salesforce/label/c.cmpOTVCancelService_9";
import cmpOTVCancelService_10 from "@salesforce/label/c.cmpOTVCancelService_10";
import cmpOTVCancelService_11 from "@salesforce/label/c.cmpOTVCancelService_11";
import cmpOTVCancelService_12 from "@salesforce/label/c.cmpOTVCancelService_12";
import cmpOTVCancelService_13 from "@salesforce/label/c.cmpOTVCancelService_13";
import cmpOTVCancelService_14 from "@salesforce/label/c.cmpOTVCancelService_14";
import cmpOTVCancelService_15 from "@salesforce/label/c.cmpOTVCancelService_15";
import cmpOTVCancelService_16 from "@salesforce/label/c.cmpOTVCancelService_16";
import cmpOTVCancelService_17 from "@salesforce/label/c.cmpOTVCancelService_17";
import cmpOTVCancelService_18 from "@salesforce/label/c.cmpOTVCancelService_18";
import cmpOTVContactUsActivation_11 from "@salesforce/label/c.cmpOTVContactUsActivation_11";

import declineOTVInvitation from "@salesforce/apex/CNT_OTV_CancelService.declineOTVInvitation";
import createCancelServiceCase from "@salesforce/apex/CNT_OTV_CancelService.createCancelServiceCase";
import getUserName from "@salesforce/apex/CNT_OTV_CancelService.getUserName";

export default class CmpOTVCancelService extends LightningElement {
  label = {
    back,
    cmpOTVCancelService_1,
    cmpOTVCancelService_2,
    cmpOTVCancelService_3,
    cmpOTVCancelService_4,
    cmpOTVCancelService_5,
    cmpOTVCancelService_6,
    cmpOTVCancelService_7,
    cmpOTVCancelService_8,
    cmpOTVCancelService_9,
    cmpOTVCancelService_10,
    cmpOTVCancelService_11,
    cmpOTVCancelService_12,
    cmpOTVCancelService_13,
    cmpOTVCancelService_14,
    cmpOTVCancelService_15,
    cmpOTVCancelService_16,
    cmpOTVCancelService_17,
    cmpOTVCancelService_18,
    cmpOTVContactUsActivation_11
  };

  arrayOptions = [
    {
      label: this.label.cmpOTVCancelService_15,
      value: this.label.cmpOTVCancelService_15
    },
    {
      label: this.label.cmpOTVCancelService_16,
      value: this.label.cmpOTVCancelService_16
    },
    {
      label: this.label.cmpOTVCancelService_17,
      value: this.label.cmpOTVCancelService_17
    },
    {
      label: this.label.cmpOTVCancelService_18,
      value: this.label.cmpOTVCancelService_18
    }
  ];
  reason = "Reason";
  termsAccepted = false;
  title;
  reasonText;
  description;
  name;
  showInput = false;
  loading = false;
  variant = "label-hidden";

  connectedCallback() {
    getUserName()
      .then((results) => {
        this.name = results;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  cancelService(event) {
    this.loading = true;
    console.log("termsAccepted" + this.termsAccepted);
    console.log("reasonText:" + this.reasonText);
    console.log("description" + this.description);
    this.checkInputs();
    if (
      this.reasonText != null &&
      this.description != null &&
      this.termsAccepted
    ) {
      createCancelServiceCase({
        Reason: this.reasonText,
        Description: this.description
      }).finally(() => {
        declineOTVInvitation({ reason: "", details: "", status: "Cancelled" })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
            this.goBack();
          });
      });
    } else {
      this.loading = false;
    }
  }

  goBack(event) {
    const changeStepEvent = new CustomEvent("changestep", {
      detail: { step: 1 }
    });
    this.dispatchEvent(changeStepEvent);
  }

  acceptTerms(event) {
    if (this.termsAccepted) {
      this.termsAccepted = false;
    } else {
      this.termsAccepted = true;
    }
  }
  changeOption(event) {
    this.title = "Reason";
    this.variant = null;
    this.showInput = true;
    this.reasonText = event.detail.selectedValue;
    this.checkInputs();
  }
  changeDescription(event) {
    this.description = event.target.value;
    this.checkInputs();
  }

  checkInputs() {
    //REASON
    this.template.querySelectorAll("[data-id =reason]").forEach((element) => {
      if (this.reasonText == null || this.reasonText == "") {
        element.className = "dropdown_single small sky error";
      } else {
        element.className = "dropdown_single small sky";
      }
    });
    //DESCRIPTION
    this.template
      .querySelectorAll("[data-id =description]")
      .forEach((element) => {
        if (this.description == null || this.description == "") {
          element.className = "textarea sky slds-form-element error";
        } else {
          element.className = "textarea sky slds-form-element";
        }
      });
    //CHECKBOX

    this.template.querySelectorAll("[data-id =checkbox]").forEach((element) => {
      if (
        this.reasonText != null &&
        this.reasonText != "" &&
        this.description != null &&
        this.description != ""
      ) {
        console.log("entra false");
        element.disabled = false;
      } else {
        console.log("entra true");
        element.disabled = true;
        element.checked = false;
        this.termsAccepted = false;
      }
    });
  }
}
