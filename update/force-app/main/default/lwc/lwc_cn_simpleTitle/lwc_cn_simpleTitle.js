import { LightningElement, api } from "lwc";

//Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

// Import labels
import LastUpdate from "@salesforce/label/c.LastUpdate";
import EndOfDay from "@salesforce/label/c.EndOfDay";

export default class Lwc_cn_simpleTitle extends LightningElement {
  label = {
    LastUpdate,
    EndOfDay
  };

  @api title;
  @api endofday;

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }

  get lastUpdatePillClass() {
    return this.endofday ? "slds-pill" : "slds-pill slds-pill__active";
  }

  get endOfDayPillClass() {
    return this.endofday ? "slds-pill slds-pill__active" : "slds-pill";
  }

  togglePills(event) {
    var isEndOfDay = this.endofday;
    if (event.currentTarget.dataset.id == "lastUpdatePill" && isEndOfDay) {
      this.endofday = false;
    } else if (
      event.currentTarget.dataset.id == "endOfDayPill" &&
      !isEndOfDay
    ) {
      this.endofday = true;
    }

    const endOfDayEvent = new CustomEvent("endofdayselected", {
      detail: { endOfDay: this.endofday }
    });
    this.dispatchEvent(endOfDayEvent);
  }
}
