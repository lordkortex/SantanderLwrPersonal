import { LightningElement } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import images from "@salesforce/resourceUrl/Images";

//import updateCheckBox from '@salesforce/apex/CNT_OTV_WelcomePack_Controller.updateCheckboxWelcomePack';
import updateCheckBox from "@salesforce/apex/CNT_OTV_UsersLanding.updateCheckboxWelcomePack";

export default class cmpOTVModalActivationOnboarding extends LightningElement {
  // Expose URL of assets included inside an archive file
  imagesLanding = images + "/slide-01-admin-users-landing.svg";
  imagesConfiguration = images + "/slide-02-admin-users-configuration.svg";
  selectedCheckbox = false;
  showModal = true;

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }

  selectCheckBox(event) {
    this.selectedCheckbox = event.target.checked;
    console.log("Entra");
    updateCheckBox({ selectedCheckbox: this.selectedCheckbox }).catch(
      (error) => {
        this.error = error;
        console.log(error);
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }
}
