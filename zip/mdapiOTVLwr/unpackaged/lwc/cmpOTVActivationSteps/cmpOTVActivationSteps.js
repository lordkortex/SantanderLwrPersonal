import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import isSubsidiaryProcess from "@salesforce/apex/CNT_OTV_ActivationSteps.isSubsidiaryProcess";
import getEnrollmentValue from "@salesforce/apex/CNT_OTV_ActivationSteps.getEnrollmentValue";
import getUserCountry from "@salesforce/apex/CNT_OTV_ActivationSteps.getUserCountry";

export default class CmpOTVActivationSteps extends NavigationMixin(
  LightningElement
) {
  country;
  step = 1;
  fromStep = 1;
  showStep1 = false;
  showStep2 = false;
  showStep3 = false;
  showStep4 = false;
  showStep5 = false;
  showStep6 = false;
  showStep7 = false;
  showStep8 = false;
  showStep9 = false;
  //@wire (isSubsidiaryProcess)
  subsidiaryProcess = false;

  connectedCallback() {
    console.log("connectedCallback");
    isSubsidiaryProcess()
      .then((results) => {
        this.subsidiaryProcess = results;
      })
      .catch((error) => {
        console.log(error);
      });
    getEnrollmentValue()
      .then((results) => {
        console.log("getEnrollmentValue");
        console.log(results);
        if (results == "Subsidiary Selection Pending") {
          this.showStep1 = false;
          this.enrollment = true;
          this.showStep3 = true;
          this.step = 3;
        } else {
          this.enrollment = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (!this.showStep1 && this.step == 1) {
      getUserCountry()
        .then((results) => {
          this.country = results;
        })
        .finally(() => {
          this.showStep1 = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  renderedCallback() {
    getEnrollmentValue()
      .then((results) => {
        if (results == "Subsidiary Selection Pending") {
          this.showStep1 = false;
          this.enrollment = true;
          this.showStep3 = true;
          this.step = 3;
        } else {
          this.enrollment = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (!this.showStep1 && this.step == 1) {
      getUserCountry()
        .then((results) => {
          this.country = results;
        })
        .finally(() => {
          this.showStep1 = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  changeStep(event) {
    this.step = event.detail.step;
    this.fromStep = event.detail.fromStep;
    //CANCEL PROCESS BUTTON OR BACK BUTTON AT STEP 1.
    if (this.step == 0) {
      this.cancelProcess();
      //TERMS & CONDITIONS
    } else if (this.step == 1) {
      this.showStep1 = true;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = false;
      this.showStep6 = false;
      this.showStep7 = false;
      this.showStep8 = false;
      this.showStep9 = false;
      this.showStep10 = false;
      //TERMS & CONDITIONS COMPLETED
    } else if (this.step == 2) {
      this.showStep1 = false;
      this.showStep2 = true;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = false;
      this.showStep6 = false;
      this.showStep7 = false;
      this.showStep8 = false;
      this.showStep9 = false;
      this.showStep10 = false;
      //SUBSIDIARIES SELECTION
    } else if (this.step == 3) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = true;
      this.showStep4 = false;
      this.showStep5 = false;
      this.showStep6 = false;
      this.showStep7 = false;
      this.showStep8 = false;
      this.showStep9 = false;
      this.showStep10 = false;
      //SUBSIDIARIES SELECTION COMPLETED
    } else if (this.step == 4) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = true;
      this.showStep5 = false;
      this.showStep6 = false;
      this.showStep7 = false;
      this.showStep8 = false;
      this.showStep9 = false;
      this.showStep10 = false;
      //SUBSIDIARIES SELECTION COMPLETED
    } else if (this.step == 5) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = true;
      this.showStep6 = false;
      this.showStep7 = false;
      this.showStep8 = false;
      this.showStep9 = false;
      this.showStep10 = false;
      //SUPPORT CENTER
    } else if (this.step == 6) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = false;
      this.showStep6 = true;
      this.showStep7 = false;
      this.showStep8 = false;
      this.showStep9 = false;
      this.showStep10 = false;
      //TERMS & CONDITIONS COMPLETED BY SUBSIDIARY
    } else if (this.step == 7) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = false;
      this.showStep6 = false;
      this.showStep7 = true;
      this.showStep8 = false;
      this.showStep9 = false;
      this.showStep10 = false;
      //MATRIX USER SELECTION SUBSIDIARY BRAZIL
    } else if (this.step == 8) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = false;
      this.showStep6 = false;
      this.showStep7 = false;
      this.showStep8 = true;
      this.showStep9 = false;
      this.showStep10 = false;
      //MATRIX ACCOUNT SELECTION SUBSIDIARY BRAZIL
    } else if (this.step == 9) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = false;
      this.showStep6 = false;
      this.showStep7 = false;
      this.showStep8 = false;
      this.showStep9 = true;
      this.showStep10 = false;
      //SUBSIDIARIES SELECTION COMPLETED BRAZIL
    } else if (this.step == 10) {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = false;
      this.showStep6 = false;
      this.showStep7 = false;
      this.showStep8 = false;
      this.showStep9 = false;
      this.showStep10 = true;
    }
  }

  cancelProcess() {
    try {
      this[NavigationMixin.Navigate]({
        type: "comm__namedPage",
        attributes: {
          name: "Home"
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
