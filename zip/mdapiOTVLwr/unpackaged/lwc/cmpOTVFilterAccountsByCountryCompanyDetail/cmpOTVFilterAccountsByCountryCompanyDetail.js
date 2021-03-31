import { LightningElement, api } from "lwc";

import accounts from "@salesforce/label/c.Accounts";
import of from "@salesforce/label/c.of";

export default class CmpOTVFilterAccountsByCountryCompanyDetail extends LightningElement {
  label = {
    accounts,
    of
  };

  isshow;
  @api country;
  @api subsidiary;
  @api lstaccounts = {};
  @api subsidiarieslist;
  activeAccounts;
  totalAccounts;

  renderedCallback() {
    if (this.subsidiary.country == this.country) {
      this.isshow = true;
    } else {
      this.isshow = false;
    }
    var subsidiaryAccounts = JSON.parse(
      JSON.stringify(
        this.lstaccounts.filter(
          (value) => value.companyName == this.subsidiary.companyName
        )
      )
    );
    this.totalAccounts = subsidiaryAccounts.length;
  }
}
