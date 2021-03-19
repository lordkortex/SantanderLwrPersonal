import { LightningElement, api } from "lwc";

export default class Lwc_accountsCardRowChild extends LightningElement {
  //@api key;
  @api item;
  @api iparentid;
  @api ikey;
  @api iaccount;
  @api itabselected;
  @api islastupdate;
  @api filters;
  @api source;
  @api firstaccountcountrylist;
  @api firsttaccountcountrylist;
  @api iregister;
  @api isortselected;
  @api icurrency;
  @api isloading;
  @api userpreferreddateformat;
  @api userpreferrednumberformat;
  @api isonetrade;

  get linea() {
    return this.key + 1 > this.iregister.value.length;
  }

  @api
  handleExpand() {
    this.template
      .querySelectorAll("c-lwc_accounts-card-row")
      .forEach((child) => {
        child.doExpand();
      });
  }

  @api
  handleCollapse() {
    this.template
      .querySelectorAll("c-lwc_accounts-card-row")
      .forEach((child) => {
        child.doCollapse();
      });
  }
}
