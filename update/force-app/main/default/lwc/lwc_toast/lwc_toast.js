import { LightningElement, api, track } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

export default class Lwc_toast extends LightningElement {
  @api message;
  @api type;
  @api toBeHidden = false;
  @api show = "test";
  //openClass = 'is-open';

  @track claseDiv;
  _show = "test";
  _toBeHidden = false;

  get show() {
    return this._show;
  }
  set show(show) {
    this._show = show;
    this.closeAfter();
  }

  get toBeHidden() {
    return this._toBeHidden;
  }

  set toBeHidden(toBeHidden) {
    this._toBeHidden = toBeHidden;
  }

  get isSuccess() {
    return this.type == "success" ? true : false;
  }

  get isWarning() {
    return this.type == "warning" ? true : false;
  }

  get isError() {
    return this.type == "error" ? true : false;
  }

  hide() {
    this.show = false;
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }

  closeAfter() {
    //console.log('entro: ');
    var show = this._show;
    var closeToast = this._toBeHidden;
    console.log(show);
    if (show) {
      setTimeout(() => {
        //this.openClass = 'is-open';
        this.claseDiv =
          "demo-only modal_container slds-align_absolute-center is-open";
      }, 10);
    } else {
      setTimeout(() => {
        //this.openClass = '';
        this.claseDiv = "demo-only modal_container slds-align_absolute-center";
      }, 10);
    }
    if (closeToast) {
      console.log("cerrar mensaje");
      if (show == true) {
        console.log("cerrar mensaje true");
        setTimeout(() => {
          this.show = false;
        }, 5000);
      }
    }
  }
}
