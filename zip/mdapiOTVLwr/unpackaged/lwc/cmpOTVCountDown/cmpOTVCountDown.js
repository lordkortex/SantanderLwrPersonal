import { LightningElement } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";

// importing Custom Label
import titleFXExpired from "@salesforce/label/c.titleFXExpired";
import subtitleFXExpired from "@salesforce/label/c.subtitleFXExpired";
import ExchangeRateLocked from "@salesforce/label/c.ExchangeRateLocked";
import theExchangeRateExpired from "@salesforce/label/c.theExchangeRateExpired";
import UpdateExchangeRate from "@salesforce/label/c.UpdateExchangeRate";
import cantBeUpdated from "@salesforce/label/c.cantBeUpdated";
import again from "@salesforce/label/c.again";

export default class CmpOTVCountDown extends LightningElement {
  /* <aura:handler name="init"   action="{!c.init}" value="{!this}" />

    <aura:handler name="change" action="{!c.setStartTimeOnUI}" value="{!v.seconds}" />
    <aura:handler name="change" action="{!c.restart}" value="{!v.expiredFX}" />
*/

  minutesInit = 0;
  secondsInit = 0;
  minutes = 0;
  seconds = 0;
  update = false;
  expiredFX = false;
  spinner = false;
  evolution;
  FXAction;

  label = {
    ExchangeRateLocked,
    theExchangeRateExpired,
    UpdateExchangeRate,
    cantBeUpdated,
    again
  };

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }

  connectedCallback() {
    this.minutesInit = this.minutes;
    this.secondsInit = this.seconds;
    setStartTimeOnUIHelper();
  }

  setStartTimeOnUI() {
    if (this.minutes != 0 || this.seconds != 0) {
      setTimeout(
        getCallback(function () {
          setStartTimeOnUIHelper();
        }),
        1000
      );
    }
  }

  restart() {
    if (this.expiredFX == false) {
      this.minutes = this.minutesInit;
      this.seconds = this.secondsInit;
    }
  }

  setStartTimeOnUIHelper() {
    var dt = new Date();
    dt.setMinutes(this.minutes);
    dt.setSeconds(this.seconds);

    var dt2 = new Date(dt.valueOf() - 1000);
    var temp = dt2.toTimeString().split(" ");
    var ts = temp[0].split(":");
    this.minutes = ts[1];
    this.seconds = ts[2];
    checkEvolution();
  }

  checkEvolution() {
    var sum = parseInt(this.minutesInit * 60) + parseInt(this.secondsInit);
    var current = parseInt(this.minutes * 60) + parseInt(this.seconds);
    var diff = Math.floor((1 - current / sum) * 100);
    if (diff >= 25 && diff < 50) {
      this.expiredFX = false;

      this.evolution = "__25";
    }
    if (diff >= 50 && diff < 75) {
      this.evolution = "__50";
    }
    if (diff >= 75 && diff < 100) {
      this.evolution = "__75";
    }
    if (diff == 100) {
      this.expiredFX = true;

      this.evolution = "__100";
      showToast(titleFXExpired, subtitleFXExpired, true, "error");
    }
  }
  showToast(title, body, noReload, mode) {
    var errorToast = component.find("errorToast");
    if (util.isEmpty(errorToast)) {
      //errorToast.showToast(action, static, notificationTitle, bodyText, functionTypeText, functionTypeClass, functionTypeClassIcon, noReload)
      if (mode == "error") {
        errorToast.openToast(
          false,
          false,
          title,
          body,
          "Error",
          "warning",
          "warning",
          noReload
        );
      }
      if (mode == "success") {
        errorToast.openToast(
          true,
          false,
          title,
          body,
          "Success",
          "success",
          "success",
          noReload
        );
      }
    }
  }
}
