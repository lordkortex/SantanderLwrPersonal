import { LightningElement, api } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

import { NavigationMixin } from "lightning/navigation";
import encryptData from "@salesforce/apex/Global_Utilities.encryptData";
// Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
//mport NavigationMixin from 'lightning/navigation'

export default class Lwc_cn_titleSubtitle extends NavigationMixin(
  LightningElement
) {
  @api title;
  @api subtitle;
  @api firenavigationevent; // = false;

  @api fullaccountlist;
  @api comesfromtracker;
  @api filters;

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }

  //24/02/2021 OLD NUESTRO
  /*goBack(){
      if(this.firenavigationevent){
        const navigatebackevent = new CustomEvent('navigateback')
        this.dispatchEvent(navigatebackevent)
      } else {
          window.history.back();
      }
    }*/

  //24/02/2021 NUEVO
  goBack() {
    if (this.comesfromtracker == false) {
      var fireNavigationEvent = this.firenavigationevent;
      if (fireNavigationEvent) {
        const navigatebackevent = new CustomEvent("navigateback");
        this.dispatchEvent(navigatebackevent);
      } else {
        window.history.back();
      }
    } else {
      var filters = this.filters;
      var url =
        "c__filters=" +
        filters +
        "&c__fromDetail=true" +
        "&c__allAccounts=" +
        this.fullaccountlist;

      this.goTo("international-payments-tracker", url);
    }
  }

  goTo(page, url) {
    try {
      this.encrypt(page, url);
    } catch (e) {
      console.log(e);
    }
  }

  encrypt(page, urlAddress) {
    var result = "";
    try {
      encryptData({
        str: urlAddress
      })
        .then((value) => {
          result = value;
          this[NavigationMixin.Navigate]({
            type: "comm__namedPage",
            attributes: {
              pageName: page
            },
            state: {
              params: result
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }
}
