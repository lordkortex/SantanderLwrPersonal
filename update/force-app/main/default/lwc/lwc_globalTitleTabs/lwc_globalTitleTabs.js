import { LightningElement, track, api } from "lwc";

import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { loadStyle } from "lightning/platformResourceLoader";
import ACCOUNTS_UPDATED from "@salesforce/label/c.Accounts_Updated";
import INFORMATION_AT from "@salesforce/label/c.InformationAt";
import LAST_UPDATE from "@salesforce/label/c.LastUpdate";
import END_OF_DAY from "@salesforce/label/c.EndOfDay";

import dateTimeFormat from "@salesforce/i18n/dateTime.shortDateTimeFormat";
import locale from "@salesforce/i18n/locale";

export default class Lwc_globalTitleTabs extends LightningElement {
  label = {
    ACCOUNTS_UPDATED,
    INFORMATION_AT,
    LAST_UPDATE,
    END_OF_DAY
  };
  @api lastupdateselected;
  @api lastinfodate;
  @api title;
  @api showonlylastupdate;
  @api showdateinfo;
  @api userpreferreddateformat;

  @track lastInfoHour;

  _dinamicClasses = {
    lastUpdated: { true: "slds-pill slds-pill__active", false: "slds-pill" },
    endOfDay: { true: "slds-pill", false: "slds-pill slds-pill__active" }
  };
  _lastinfodate;

  get lastinfodate() {
    return this._lastinfodate;
  }
  set lastinfodate(lastinfodate) {
    this._lastinfodate = lastinfodate;
    if (this._lastinfodate) {
      this.lastInfoChanged(lastinfodate);
    }
  }

  get lastUpdateClass() {
    return this._dinamicClasses.lastUpdated[this.lastupdateselected];
  }

  get endOfDayClass() {
    return this._dinamicClasses.endOfDay[this.lastupdateselected];
  }
  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }

  lastInfoChanged(lastinfodate) {
    let o = new Intl.DateTimeFormat(locale, { timeStyle: "short" });
    console.log(o.format(new Date(lastinfodate).getTime()));
    this.lastInfoHour = o.format(new Date(lastinfodate).getTime());
  }
  lastUpdateTab() {
    this.lastupdateselected = true;
    const evt = new CustomEvent("lastupdateselected", {
      detail: this.lastupdateselected
    });
    this.dispatchEvent(evt);
  }
  endOfDayTab() {
    this.lastupdateselected = false;
    const evt = new CustomEvent("lastupdateselected", {
      detail: this.lastupdateselected
    });
    this.dispatchEvent(evt);
  }
}
