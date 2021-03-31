import { LightningElement, api, wire, track } from "lwc";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import COUNTRY_FIELD from "@salesforce/schema/Account.ACC_PCK_Country__c";

import getAccounts from "@salesforce/apex/AccountTree.getAccounts";

export default class TreeEx3 extends LightningElement {
  //@wire(getAccounts) accounts;
  accounts = {};
  isSelected = false;

  @track value;
  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  objectInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: COUNTRY_FIELD
  })
  CountryPicklistValues;

  handleChange(event) {
    this.value = event.detail.value;

    getAccounts({ country: this.value }).then((results) => {
      this.isSelected = true;
      this.accounts = results;
      console.log("Result: " + results);
    });
    console.log("Country values: " + this.value);
  }
}
