import { LightningElement, api } from "lwc";

import accounts from "@salesforce/label/c.Accounts";
import of from "@salesforce/label/c.of";

export default class CmpOTVFilterAccountsByCountry extends LightningElement {
  label = {
    accounts,
    of
  };

  isshow;
  @api country;
  @api subsidiary;
  @api lstaccounts = {};
  @api subsidiarieslist;
  @api disabled;
  activeAccounts;
  totalAccounts;

  renderedCallback() {
    if (this.subsidiary.country == this.country) {
      this.isshow = true;
    } else {
      this.isshow = false;
    }

    var activeAccountsaux = 0;
    var subsidiaryAccounts = JSON.parse(
      JSON.stringify(
        this.lstaccounts.filter(
          (value) => value.companyName == this.subsidiary.companyName
        )
      )
    );
    for (var i = 0; i < subsidiaryAccounts.length; i++) {
      if (subsidiaryAccounts[i].status == "ACTIVE") {
        activeAccountsaux++;
      }
    }
    this.totalAccounts = subsidiaryAccounts.length;
    this.activeAccounts = activeAccountsaux;
  }
  changeaccount(event) {
    console.log("CmpOTVFilterAccountsByCountry");
    console.log(event.detail.account);
    const changeAccount = new CustomEvent("changeaccount", {
      detail: { account: event.detail.account }
    });
    this.dispatchEvent(changeAccount);
  }
}
