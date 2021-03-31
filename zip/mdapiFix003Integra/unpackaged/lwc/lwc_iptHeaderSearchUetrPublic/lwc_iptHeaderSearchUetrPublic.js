import { LightningElement, track, api } from "lwc";

import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { loadStyle } from "lightning/platformResourceLoader";

import BACK from "@salesforce/label/c.back";
import TRACK_PAYMENT_BY_UETR from "@salesforce/label/c.trackPaymentByUETR";
import HELP from "@salesforce/label/c.help";
import TRACK_BY_UETR from "@salesforce/label/c.TrackByUETR";
import TRACK_UETR_HELP_DETAILS from "@salesforce/label/c.TrackUETRHelpDetails";
import CLEAR from "@salesforce/label/c.clear";
import UETR_ERROR from "@salesforce/label/c.uetrError";
import searchUETR from "@salesforce/label/c.searchUETR";

export default class Lwc_ipt_headerSearchUetrPublic extends LightningElement {
  @api searchvalue;
  @track noResults = false;
  @track isSearched = false;
  @track result;
  @api comesfromtracker;
  isIngested = false;
  @track classError = "slds-hide textHelp errorText";

  label = {
    TRACK_UETR_HELP_DETAILS,
    TRACK_PAYMENT_BY_UETR,
    TRACK_BY_UETR,
    UETR_ERROR,
    CLEAR,
    HELP,
    BACK,
    searchUETR
  };

  _searchvalue;
  timeoutUetrSearch = null;

  get searchValueNotEmpty() {
    if (this.searchvalue) {
      if (this.searchvalue.length > 0) {
        return true;
      }
    }
  }

  get searchInputClass() {
    var searchInputClass = "";
    if (this.searchvalue) {
      searchInputClass =
        "slds-input " + (this.searchvalue.length > 0 ? "filledInput" : "");
    } else {
      searchInputClass = "slds-input";
    }
    return searchInputClass;
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    if (!this.searchvalue) {
      this.searchvalue = "";
    }
  }

  goBack() {
    window.history.back();
  }
  handleClear() {
    this.issearched = false;
    this.searchvalue = "";
    this.template.querySelector(`[data-id="text-input-id-1"]`).focus();

    var detail = { issearched: false, searchvalue: this.searchvalue };
    this.sendResultsEvent(detail);
  }
  setInputOnBlur(event) {
    let inputValue = event.target.value;
    var valid;
    if (inputValue == undefined || inputValue == null || inputValue == "") {
      this.classError = "slds-hide textHelp errorText";
      valid = false;
    } else {
      //CAMBIO UETR DE MAYUSCULAS A MINUSCULAS 30/07/2020 INCIDENCIA
      inputValue = inputValue.toLowerCase();
      let re =
        "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
      let found = inputValue.match(re);
      if (inputValue.length == 36 && found != null) {
        this.classError = "slds-hide textHelp errorText";
        valid = true;
      } else {
        this.classError = "textHelp errorText";
        valid = false;
      }
    }

    //if(inputValue != this._searchvalue && valid && (inputValue.length > 0)){
    if (inputValue != this.searchvalue && valid && inputValue.length > 0) {
      //this._searchvalue = inputValue;
      this.searchvalue = inputValue;
      try {
        //getData(component, event, helper, inputValue);
        var filter =
          '{"searchData": {"latestPaymentsFlag": "NO", "inOutIndicator": "OUT", "_limit":"1000","_offset":"0","paymentId":"' +
          inputValue +
          '"}}';
        this.template.querySelector("c-lwc_service-component").onCallApex({
          callercomponent: "lwc_ipt-header-search-uetr-public",
          controllermethod: "getFilteredData",
          actionparameters: { filters: filter }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  setInputOnKeyDown(event) {
    let inputValue = event.target.value;
    let key = event.key;
    let keyCode = event.keyCode;

    if (key == "Enter" && keyCode == 13) {
      var valid;
      if (inputValue == undefined || inputValue == null || inputValue == "") {
        this.classError = "slds-hide textHelp errorText";
        valid = false;
      } else {
        //CAMBIO UETR DE MAYUSCULAS A MINUSCULAS 30/07/2020 INCIDENCIA
        inputValue = inputValue.toLowerCase();
        let re =
          "^([a-f0-9]{8})-([a-f0-9]{4})-4([a-f0-9]{3})-([89ab])([a-f0-9]{3})-([a-f0-9]{12})$";
        let found = inputValue.match(re);
        if (inputValue.length == 36 && found != null) {
          this.classError = "slds-hide textHelp errorText";
          valid = true;
        } else {
          this.classError = "textHelp errorText";
          valid = false;
        }
      }

      //if (inputValue != this._searchvalue && valid && (inputValue.length>0)) {
      if (inputValue != this.searchvalue && valid && inputValue.length > 0) {
        //this._searchvalue = inputValue;
        this.searchvalue = inputValue;
        try {
          // getData(inputValue);
          var filter =
            '{"searchData": {"latestPaymentsFlag": "NO", "inOutIndicator": "OUT", "_limit":"1000","_offset":"0","paymentId":"' +
            inputValue +
            '"}}';
          this.template
            .querySelector("c-lwc_service-component")
            .onCallApex({
              callercomponent: "lwc_ipt-header-search-uetr-public",
              controllermethod: "getFilteredData",
              actionparameters: { filters: filter }
            });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  /* getData (codeValue) {
        try {
            var filter = codeValue;
            this.template.querySelector('c-lwc_service-component').
            component.find("Service").callApex2(component, helper, "c.getUETR", {uetr: filter}, this.setData);   
         } catch (e) {
             console.log(e);
         }
    }*/

  successcallback(event) {
    console.log("OK successcallback");
    if (event.detail.callercomponent === "lwc_ipt-header-search-uetr-public") {
      //console.log('Event details: ' + JSON.stringify(event.detail));
      this.setData(event.detail.value);
    }
  }

  setData(response) {
    this.issearched = false;
    console.log("Llega la respuesta:");
    console.log(response);
    if (
      response != undefined &&
      response != null &&
      Array.isArray(response.paymentList) &&
      response.paymentList.length
    ) {
      this.result = response.paymentList[0];
      this.noresults = false;
      this.isingested = true;
      this.issearched = true;

      var detail = {
        resultnotnull: true,
        noresults: false,
        issearched: true,
        result: this.result,
        searchvalue: this.searchvalue,
        isingested: true
      };
      this.sendResultsEvent(detail);
    } else {
      console.log("No encuentra");
      this.isingested = false;

      var result = {};
      //AM - 16/11/2020 - Fix UETR Pagos No Ingestados
      //result.uetrCode = this._searchvalue;
      result.uetrCode = this.searchvalue;
      this.result = result;
      this.issearched = true;

      var detail = {
        noresults: true,
        issearched: true,
        result: this.result,
        isingested: false
      };
      this.sendResultsEvent(detail);
    }
  }

  sendResultsEvent(detail) {
    const resultsEvent = new CustomEvent("results", {
      detail: detail
    });
    this.dispatchEvent(resultsEvent);
  }
}
