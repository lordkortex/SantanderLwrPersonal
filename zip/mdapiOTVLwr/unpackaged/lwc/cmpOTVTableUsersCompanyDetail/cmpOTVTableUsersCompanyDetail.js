import { LightningElement, api, track } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import Images from "@salesforce/resourceUrl/Images";

import calloutGetUsersAccounts from "@salesforce/apex/CNT_OTV_UsersLanding.calloutGetUserAccounts";
import getLstCountriesUser from "@salesforce/apex/CNT_OTV_UsersLanding.getLstCountriesUser";
import getLstSubsidiaries from "@salesforce/apex/CNT_OTV_UsersLanding.calloutGetAccountSubsidiaries";

// importing Custom Label
import cmpOTVTableUsersLanding_1 from "@salesforce/label/c.cmpOTVTableUsersLanding_1";
import cmpOTVTableUsersLanding_2 from "@salesforce/label/c.cmpOTVTableUsersLanding_2";
import cmpOTVTableUsersLanding_3 from "@salesforce/label/c.cmpOTVTableUsersLanding_3";
import cmpOTVTableUsersLanding_4 from "@salesforce/label/c.cmpOTVTableUsersLanding_4";
import cmpOTVTableUsersLanding_5 from "@salesforce/label/c.cmpOTVTableUsersLanding_5";
import cmpOTVTableUsersLanding_6 from "@salesforce/label/c.cmpOTVTableUsersLanding_6";
import cmpOTVTableUsersLanding_7 from "@salesforce/label/c.cmpOTVTableUsersLanding_7";

export default class CmpOTVTableUsersCompanyDetail extends LightningElement {
  selectedUser;

  label = {
    cmpOTVTableUsersLanding_1,
    cmpOTVTableUsersLanding_2,
    cmpOTVTableUsersLanding_3,
    cmpOTVTableUsersLanding_4,
    cmpOTVTableUsersLanding_5,
    cmpOTVTableUsersLanding_6,
    cmpOTVTableUsersLanding_7
  };

  @api lstusers;
  @api items;
  @api isClicked = false;
  @api showtoast = false;
  @api filters;
  @track showtoastError = false;
  @track showtoast = false;
  @track msgtoast;
  @track typetoast;
  @track tobehiddentoast;
  colors = ["blue", "green", "pink", "lightpink", "cream", "gray"];
  image = Images + "/03-with-image@3x.jpg";
  user;
  lstAccounts = {};
  lstCountriesAux = {};
  lstCountries = {};
  lstSubsidiaries = {};
  loading = false;
  arraySize;

  connectedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
  }

  renderedCallback() {
    console.log("this.lstusers");
    console.log(this.lstusers);
    console.log("this.lstusers.length");
    console.log(this.lstusers.length);
    this.arraySize = this.lstusers.length;
  }

  handleUserClick(event) {
    this.loading = true;
    const selectedUserGlobalId = event.currentTarget.dataset.whichrow;
    console.log("value GlobalId: " + selectedUserGlobalId);

    this.selectedUser = this.lstusers.find(
      (user) => user.globalId === selectedUserGlobalId
    );

    console.log("this.selectedUser");
    console.log(this.selectedUser);
    if (this.selectedUser != null) {
      calloutGetUsersAccounts({
        companyId: "1588401980",
        userId: "5431ac57-96e3-4d45-8a4c-2c92aea767b9"
      })
        .then((result) => {
          this.lstAccounts = result;
          for (var i = 0; i < this.lstAccounts.length; i++) {
            this.lstCountriesAux[i] = this.lstAccounts[i].country;
          }
          console.log(this.lstAccounts);
          this.lstCountries = this.lstCountriesAux;
          this.loading = false;
        })
        .finally(() => {
          getLstCountriesUser({
            jsonCountries: JSON.stringify(this.lstCountries)
          }).then((result) => {
            console.log("getLstCountriesUser");
            console.log(result);
            this.lstCountries = result;
          });
          getLstSubsidiaries({
            lstAccounts: JSON.stringify(this.lstAccounts)
          }).then((result) => {
            console.log("getLstSubsidiaries");
            console.log(result);
            this.lstSubsidiaries = result;
          });
        })
        .finally(() => {
          this.isClicked = true;
        });
    }
  }
  get isOneTrade() {
    if (this.isClicked && !this.loading) {
      return true;
    } else {
      return false;
    }
  }
}
