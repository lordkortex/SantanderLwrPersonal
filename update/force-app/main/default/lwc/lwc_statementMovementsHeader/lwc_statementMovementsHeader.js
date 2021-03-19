import { LightningElement, api } from "lwc";
//Labels
import TotalBookBalance from "@salesforce/label/c.TotalBookBalance";
import TotalAvailableBalance from "@salesforce/label/c.TotalAvailableBalance";
import StatementOf from "@salesforce/label/c.StatementOf";

//Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

export default class Lwc_statementMovementsHeader extends LightningElement {
  label = {
    TotalBookBalance,
    TotalAvailableBalance,
    StatementOf
  };

  //Global information
  @api userinfo = {}; //description="Contains the user info"

  //Account and header attributes
  @api accountinfo = {}; //description="Contains the data of the account"
  @api closeringbalance_formatted = "0.0"; //description="Contains the closing balance"
  @api closeringbalancedecimals_formatted = "0.0"; //description="Contains the closing balance decimals"
  @api openingbalance_formatted = "0.0"; //description="Contains the opening balance"
  @api openingbalancedecimals_formatted = "0.0"; //description="Contains the opening balance decimals"

  @api extractdate; //description="Contains the date of the extract"

  get getAccountName() {
    return this.accountinfo.accountName;
  }

  get getAccountCurrency() {
    return this.accountinfo.accountCurrency;
  }

  get getSubsidiaryName() {
    return this.accountinfo.subsidiaryName;
  }

  get getAccountNumber() {
    return this.accountinfo.accountNumber;
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }
}
