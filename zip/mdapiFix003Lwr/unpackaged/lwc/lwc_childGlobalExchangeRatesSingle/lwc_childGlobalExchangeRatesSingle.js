import { LightningElement, api } from "lwc";

export default class Lwc_childGlobalExchangeRateSingle extends LightningElement {
  @api item;
  @api selectedcurrency;
  @api numberformat;

  get divisaNEselectedCurrency() {
    return this.item.divisa != this.selectedcurrency;
  }

  @api formatNumber() {
    if (
      this.template.querySelector("c-lwc_display-amount") != undefined &&
      this.template.querySelector("c-lwc_display-amount") != null
    ) {
      this.template.querySelector("c-lwc_display-amount").formatNumber();
    }
  }
}
