import { LightningElement, api } from "lwc";

import { NavigationMixin } from "lightning/navigation";
import isSubsidiaryProcess from "@salesforce/apex/CNT_OTV_AdminSteps.isSubsidiaryProcess";
import isSubsidiaryActivator from "@salesforce/apex/CNT_OTV_AdminSteps.isSubsidiaryActivator";
import getUserCountry from "@salesforce/apex/CNT_OTV_AdminSteps.getUserCountry";

export default class CmpOTVRedirectionProcess extends NavigationMixin(
  LightningElement
) {
  showStep1 = false;
  showStep2 = false;
  showStep3 = false;
  showStep4 = false;
  showStep5 = false;
  subsidiaryProcess = false;
  subsidiaryActivator = false;
  country;
  @api steps;

  connectedCallback() {
    getUserCountry()
      .then((results) => {
        this.country = results;
      })
      .catch((error) => {
        console.log(error);
      });
    isSubsidiaryProcess()
      .then((results) => {
        this.subsidiaryProcess = results;
        console.log("isSubsidiaryProcess");
        console.log(this.subsidiaryProcess);
      })
      .catch((error) => {
        console.log(error);
      });
    isSubsidiaryActivator()
      .then((results) => {
        this.subsidiaryActivator = results;
        console.log("getUserRole" + results);
        console.log(this.subsidiaryActivator);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.conditionProcess();
      });
  }

  conditionProcess() {
    if (!this.subsidiaryProcess) {
      if (this.subsidiaryActivator) {
        this.showStep1 = true;
        this.showStep2 = false;
        this.showStep3 = false;
        this.showStep4 = false;
        this.showStep5 = false;
        console.log("Entra 1");
      } else {
        this.showStep1 = false;
        this.showStep2 = true;
        this.showStep3 = false;
        this.showStep4 = false;
        this.showStep5 = false;
        console.log("Entra 2");
      }
    } else {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = true;
      this.showStep4 = false;
      this.showStep5 = false;
      console.log("Entra 3");
      // this.showStep4 = false;
      // if(subsidiaryActivator){
      //     this.showStep1 = false;
      //     this.showStep2 = false;
      //     this.showStep3 = true;
      //     this.showStep4 = false;
      // }else{
      //     this.showStep1 = false;
      //     this.showStep2 = false;
      //     this.showStep3 = false;
      //     this.showStep4 = true;
      // }
    }
  }
  changestep(event) {
    console.log("llega");
    if (event.detail.step == "1") {
      this.showStep1 = true;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = false;
    } else if (event.detail.step == "5") {
      this.showStep1 = false;
      this.showStep2 = false;
      this.showStep3 = false;
      this.showStep4 = false;
      this.showStep5 = true;
    }
  }
}
