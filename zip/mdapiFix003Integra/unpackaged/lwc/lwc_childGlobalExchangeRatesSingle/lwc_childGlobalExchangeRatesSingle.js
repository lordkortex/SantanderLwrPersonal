import { LightningElement, api } from "lwc";

export default class Lwc_childGlobalExchangeRateSingle extends LightningElement {
  @api item;
  @api selectedcurrency;

  get divisaNEselectedCurrency() {
    return this.item.divisa != this.selectedcurrency;
  }
}
