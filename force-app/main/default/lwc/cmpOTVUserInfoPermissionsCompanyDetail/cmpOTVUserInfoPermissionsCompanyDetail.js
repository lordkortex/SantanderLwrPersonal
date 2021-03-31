import { LightningElement, api, track } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import flags from "@salesforce/resourceUrl/Flags";
import images from "@salesforce/resourceUrl/Images";

// importing Custom Label
import cmpOTVUserInfoPermissions_Clear from "@salesforce/label/c.cmpOTVUserInfoPermissions_Clear";
import cmpOTVUserInfoPermissions_Error from "@salesforce/label/c.cmpOTVUserInfoPermissions_Error";
import cmpOTVUserInfoPermissions_AB from "@salesforce/label/c.cmpOTVUserInfoPermissions";
import cmpOTVUserInfoPermissions_1 from "@salesforce/label/c.cmpOTVUserInfoPermissions_1";
import cmpOTVUserInfoPermissions_2 from "@salesforce/label/c.cmpOTVUserInfoPermissions_2";
import cmpOTVUserInfoPermissions_3 from "@salesforce/label/c.cmpOTVUserInfoPermissions_3";
import cmpOTVUserInfoPermissions_4 from "@salesforce/label/c.cmpOTVUserInfoPermissions_4";
import cmpOTVUserInfoPermissions_5 from "@salesforce/label/c.cmpOTVUserInfoPermissions_5";
import cmpOTVUserInfoPermissions_6 from "@salesforce/label/c.cmpOTVUserInfoPermissions_6";
import cmpOTVUserInfoPermissions_7 from "@salesforce/label/c.cmpOTVUserInfoPermissions_7";
import cmpOTVUserInfoPermissions_8 from "@salesforce/label/c.cmpOTVUserInfoPermissions_8";
import cmpOTVUserInfoPermissions_9 from "@salesforce/label/c.cmpOTVUserInfoPermissions_9";
import cmpOTVUserInfoPermissions_10 from "@salesforce/label/c.cmpOTVUserInfoPermissions_10";
import cmpOTVUserInfoPermissions_11 from "@salesforce/label/c.cmpOTVUserInfoPermissions_11";
import cmpOTVUserInfoPermissions_12 from "@salesforce/label/c.cmpOTVUserInfoPermissions_12";
import cmpOTVUserInfoPermissions_13 from "@salesforce/label/c.cmpOTVUserInfoPermissions_13";

export default class CmpOTVUserInfoPermissionsCompanyDetail extends LightningElement {
  label = {
    cmpOTVUserInfoPermissions_Clear,
    cmpOTVUserInfoPermissions_Error,
    cmpOTVUserInfoPermissions_AB,
    cmpOTVUserInfoPermissions_1,
    cmpOTVUserInfoPermissions_2,
    cmpOTVUserInfoPermissions_3,
    cmpOTVUserInfoPermissions_4,
    cmpOTVUserInfoPermissions_5,
    cmpOTVUserInfoPermissions_6,
    cmpOTVUserInfoPermissions_7,
    cmpOTVUserInfoPermissions_8,
    cmpOTVUserInfoPermissions_9,
    cmpOTVUserInfoPermissions_10,
    cmpOTVUserInfoPermissions_11,
    cmpOTVUserInfoPermissions_12,
    cmpOTVUserInfoPermissions_13
  };

  // DROPDOWN ATTRIBUTES
  // values =['Administrator','Operator'];
  dropdownRole = [
    { label: "Administrator", value: "administrator" },
    { label: "Operator", value: "operator" }
  ];
  @api lstaccounts = {};
  @api lstcountries = {};
  @api lstsubsidiaries = {};
  lstsubsidiariesaux = [];
  lstsubsidiaries = {};
  selectedValue;
  helpTextDropdown = "Show More";
  selectedClass;
  @api userselected;
  @api isClicked;
  subsidiarieslistNew = [];
  lstUpdatedAccounts = [];
  cuentaSeleccionada;
  statusButton = false;
  @track showtoast = false;
  @track showtoastError = false;
  @track msgtoast;
  @track typetoast;
  @track tobehiddentoast;
  countriesloaded = false;
  // Expose URL of assets included inside an archive file
  logoOneTrade = images + "/logo-santander-one-trade.svg";
  flagES = flags + "/ES.svg";
  selectedRole;

  renderedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }

  closeUserInfo() {
    const closeUserInfo = new CustomEvent("closeuserinfo", {
      detail: { isClicked: false, showtoast: false }
    });
    this.dispatchEvent(closeUserInfo);
  }
}
