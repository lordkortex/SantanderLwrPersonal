import { LightningElement, api } from "lwc";

//Import styles
import { loadStyle } from "lightning/platformResourceLoader";
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

//Import labels
import close from "@salesforce/label/c.close";
import MySettings_EditUserInfo from "@salesforce/label/c.MySettings_EditUserInfo";
import LogAdmin_SelectOne from "@salesforce/label/c.LogAdmin_SelectOne";
import language from "@salesforce/label/c.language";
import timeZone from "@salesforce/label/c.timeZone";
import currency from "@salesforce/label/c.currency";
import dateFormat from "@salesforce/label/c.dateFormat";
import numberFormat from "@salesforce/label/c.numberFormat";
import AdminRoles_Cancel from "@salesforce/label/c.AdminRoles_Cancel";
import AdminRoles_Save from "@salesforce/label/c.AdminRoles_Save";

//Calls Apex
import UserInfoEditApex from "@salesforce/apex/CNT_UserSettingsController.saveData";

export default class Lwc_mySettingsEdit extends LightningElement {
  //Labels
  Label = {
    close,
    MySettings_EditUserInfo,
    LogAdmin_SelectOne,
    language,
    timeZone,
    currency,
    dateFormat,
    numberFormat,
    AdminRoles_Cancel,
    AdminRoles_Save
  };

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    console.log("listas: " + this.userinfoedit);
    console.log("listas: " + this.userpicklistvalues.numbersListLabel);
  }

  @api userinfoedit = {}; //description="Contains the running user info" />
  @api userpicklistvalues; //description="Contains the edit Picklist data" />
  @api isediting; //description="flag to check if is editing the user" />
  _userinfoedit = {};
  get userinfoedit() {
    return this._userinfoedit;
  }
  set userinfoedit(userinfoedit) {
    this._userinfoedit = userinfoedit;
  }

  saveEditClicked() {
    this.handleSave();
  }
  cancelEditClicked() {
    this.handleCancel();
  }
  handleSave() {
    console.log("update userinfo" + JSON.stringify(this._userinfoedit));
    //component.find('Service').callApex2(component, helper, "c.saveData", {'userInfoCmp' : this.UserInfoEdit }, helper.getCachedInfo);
    UserInfoEditApex({ userInfoCmp: this._userinfoedit }).then((response) => {
      if (response) {
        this.getCachedInfo(response);
        this.handleCancel(true);
      }
    });
  }
  getCachedInfo() {
    this.template
      .querySelector("c-lwc_service-component")
      .retrieveFromCache("balanceEODGP", this.saveDataToCacheEOD);
    this.template
      .querySelector("c-lwc_service-component")
      .retrieveFromCache("balanceGP", this.saveDataToCacheLU);
  }
  saveDataToCacheEOD() {
    console.log(this.userinfoedit.DateFormat);
    console.log(this.userinfoedit.NumberFormat);

    var parsedResponse;
    if (response != null) {
      parsedResponse = JSON.parse(response);
      console.log(parsedResponse);
      if (parsedResponse != null && parsedResponse.mapUserFormats != null) {
        parsedResponse.mapUserFormats.dateFormat = this.userinfoedit.DateFormat;
        parsedResponse.mapUserFormats.numberFormat = this.userinfoedit.NumberFormat;

        //AB - 20/11/2020 - INC773
        if (
          parsedResponse.responseGP != null &&
          parsedResponse.responseGP.mapUserFormats != null
        ) {
          parsedResponse.responseGP.mapUserFormats.dateFormat = this.userinfoedit.DateFormat;
          parsedResponse.responseGP.mapUserFormats.numberFormat = this.userinfoedit.NumberFormat;
        }
        if (
          parsedResponse.responseAcc != null &&
          parsedResponse.responseAcc.mapUserFormats != null
        ) {
          parsedResponse.responseAcc.mapUserFormats.dateFormat = this.userinfoedit.DateFormat;
          parsedResponse.responseAcc.mapUserFormats.numberFormat = this.userinfoedit.NumberFormat;
        }

        this.template
          .querySelector("c-lwc_service-component")
          .saveToCache("balanceEODGP", parsedResponse);
      }
    }

    setTimeout(function () {
      this.handleCancel(true);
    }, 1000);
  }
  saveDataToCacheLU() {
    console.log(this.userinfoedit.DateFormat);
    console.log(this.userinfoedit.NumberFormat);

    var parsedResponse;
    if (response != null) {
      parsedResponse = JSON.parse(response);
      console.log(parsedResponse);

      if (parsedResponse != null && parsedResponse.mapUserFormats != null) {
        parsedResponse.mapUserFormats.dateFormat = this.userinfoedit.DateFormat;
        parsedResponse.mapUserFormats.numberFormat = this.userinfoedit.NumberFormat;

        //AB - 20/11/2020 - INC773
        if (
          parsedResponse.responseGP != null &&
          parsedResponse.responseGP.mapUserFormats != null
        ) {
          parsedResponse.responseGP.mapUserFormats.dateFormat = this.userinfoedit.DateFormat;
          parsedResponse.responseGP.mapUserFormats.numberFormat = this.userinfoedit.NumberFormat;
        }
        if (
          parsedResponse.responseAcc != null &&
          parsedResponse.responseAcc.mapUserFormats != null
        ) {
          parsedResponse.responseAcc.mapUserFormats.dateFormat = this.userinfoedit.DateFormat;
          parsedResponse.responseAcc.mapUserFormats.numberFormat = this.userinfoedit.NumberFormat;
        }

        this.template
          .querySelector("c-lwc_service-component")
          .saveToCache("balanceGP", parsedResponse);
      }
    }

    setTimeout(function () {
      this.handleCancel(true);
    }, 1000);
  }
  handleCancel(response) {
    const buttonCancel = new CustomEvent("buttoncancel");
    this.dispatchEvent(buttonCancel);

    //this._isediting=false;
    if (response != null);
    if (response == true) {
      location.reload();
    }
  }
  /*handledropdownvalueselected(evt){
        var s = evt.detail;
        const e = new CustomEvent("dropdownvalueselected",{
            detail: s
        });
        this.dispatchEvent(e);
    }*/
  selectLenguageDropdown(event) {
    if (event.detail != "") {
      console.log("event recived: " + event.detail);
      var aux = JSON.parse(JSON.stringify(this._userinfoedit));
      aux.Language = event.detail[0];
      this._userinfoedit = aux;
    }
  }
  selectTimeZoneDropdown(event) {
    if (event.detail != "") {
      console.log("event recived: " + event.detail);
      var aux = JSON.parse(JSON.stringify(this._userinfoedit));
      aux.TimeZone = event.detail[0];
      this._userinfoedit = aux;
    }
  }
  selectDateFormatDropdown(event) {
    if (event.detail != "") {
      console.log("event recived: " + event.detail);
      var aux = JSON.parse(JSON.stringify(this._userinfoedit));
      aux.DateFormat = event.detail[0];
      this._userinfoedit = aux;
    }
  }
  selectNumberFormatDropdown(event) {
    if (event.detail != "") {
      console.log("event recived: " + event.detail);
      var aux = JSON.parse(JSON.stringify(this._userinfoedit));
      aux.NumberFormat = event.detail[0];
      this._userinfoedit = aux;
    }
  }
  /*selectCcyPairs1Dropdown(event){
        if(event.detail!=''){
            console.log("event recived: "+event.detail);
            var aux = JSON.parse(JSON.stringify(this._userinfoedit));
            aux.ccyPairs1 = event.detail[0];
            this._userinfoedit = aux;
        }
    }
    selectCcyPairs2Dropdown(event){
        if(event.detail!=''){
            console.log("event recived: "+event.detail);
            var aux = JSON.parse(JSON.stringify(this._userinfoedit));
            aux.ccyPairs2 = event.detail[0];
            this._userinfoedit = aux;
        }
    }
    selectCcyPairs3Dropdown(event){
        if(event.detail!=''){
            console.log("event recived: "+event.detail);
            var aux = JSON.parse(JSON.stringify(this._userinfoedit));
            aux.ccyPairs3 = event.detail[0];
            this._userinfoedit = aux;
        }
    }*/
}
