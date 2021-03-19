import { LightningElement, api, track } from "lwc";

import city from "@salesforce/label/c.PAY_City";
import floor from "@salesforce/label/c.PAY_Floor";
import accountalias from "@salesforce/label/c.PAY_AccountAlias";
import biccode from "@salesforce/label/c.PAY_BicCode";
import province from "@salesforce/label/c.PAY_Province";
import streetandnumber from "@salesforce/label/c.PAY_StreetAndNumber";
import beneficiaryiban from "@salesforce/label/c.PAY_BeneficiaryIBAN";
import taxid from "@salesforce/label/c.PAY_TaxId";
import bankname from "@salesforce/label/c.PAY_BankName";
import accountnumber from "@salesforce/label/c.PAY_AccountNumber";
import accountholder from "@salesforce/label/c.PAY_AccountHolder";
import branch from "@salesforce/label/c.PAY_Branch";
import accounttype from "@salesforce/label/c.PAY_AccountType";
import state from "@salesforce/label/c.PAY_State";
import acctype from "@salesforce/label/c.PAY_AccType";
import error from "@salesforce/label/c.B2B_Error_Invalid_Input";
import addinfo from "@salesforce/label/c.PAY_AditionalInformation";
import newbeneficiary from "@salesforce/label/c.PAY_NewBeneficiary";
import beneficiaryaddress from "@salesforce/label/c.PAY_BeneficiaryAddress";
import savebeneficiary from "@salesforce/label/c.PAY_SaveAsBeneficiary";
import iban from "@salesforce/label/c.PAY_IBAN";
import localformat from "@salesforce/label/c.PAY_LocalFormat";
import cleartextinput from "@salesforce/label/c.PAY_ClearTextInput";

export default class CmpPayRegisterBeneficiary extends LightningElement {
  label = {
    city,
    floor,
    accountalias,
    biccode,
    province,
    streetandnumber,
    beneficiaryiban,
    taxid,
    bankname,
    accountnumber,
    accountholder,
    accountalias,
    branch,
    accounttype,
    state,
    acctype,
    addinfo,
    newbeneficiary,
    beneficiaryaddress,
    savebeneficiary,
    iban,
    localformat,
    cleartextinput
  };

  format = " format.";

  accountNumber = accountnumber;

  errorText = error;

  @track iban = "";

  showLabel = false;

  @api draftData;
  @api simpleForm;
  @api accountType = [];
  @api bankName = [];
  @track error = "";
  @api country = "";
  @track countryOld;
  @api ibanLength;

  //@track errorprueba = this.errormsg.replace("Beneficiary account", this.accountNumber);

  @api errormsg;

  @api errormsg2;

  @track showError = true;

  @track condition = true;

  @track data = {
    displayNumber: "",
    subsidiaryName: "",
    codigoBic: "",
    address: {
      province: "",
      streetName: "",
      townName: "",
      floor: "",
      country: ""
    },
    idType: "IBA",
    country: ""
  };

  @track data2 = {
    displayNumber: "",
    subsidiaryName: "",
    creditorDocument: { documentType: "BIC", documentNumber: "" },
    subsidiaryName: "",
    address: {
      state: "",
      streetName: "",
      townName: "",
      floor: "",
      addressAddition: "",
      country: ""
    },
    idType: "IBA",
    country: ""
  };

  @track data3 = {
    displayNumber: "",
    bankName: "",
    subsidiaryName: "",
    branch: "",
    type: "",
    creditorDocument: { documentType: "BIC", documentNumber: "" },
    address: {
      state: "",
      streetName: "",
      townName: "",
      floor: "",
      addressAddition: "",
      country: ""
    },
    idType: "BBA",
    country: ""
  };

  @track value1 = {
    displayNumber: "",
    subsidiaryName: "",
    codigoBic: "",
    address: {
      province: "",
      streetName: "",
      townName: "",
      floor: "",
      country: ""
    },
    idType: "IBA",
    country: ""
  };

  @track value2 = {
    displayNumber: "",
    subsidiaryName: "",
    creditorDocument: { documentType: "BIC", documentNumber: "" },
    subsidiaryName: "",
    address: {
      state: "",
      streetName: "",
      townName: "",
      floor: "",
      addressAddition: "",
      country: ""
    },
    idType: "IBA",
    country: ""
  };

  @track value3 = {
    displayNumber: "",
    bankName: "",
    subsidiaryName: "",
    branch: "",
    type: "",
    creditorDocument: { documentType: "BIC", documentNumber: "" },
    address: {
      state: "",
      streetName: "",
      townName: "",
      floor: "",
      addressAddition: "",
      country: ""
    },
    idType: "BBA",
    country: ""
  };

  selectedClass = "slds-accordion__section";

  //simpleForm = true;

  show = true;
  showF = false;

  showclick(event) {
    var id = event.target.value;

    if (id == "iban") {
      this.show = true;
    } else {
      this.show = false;
      //this.error = "";
    }
  }

  showForm() {
    this.countryOld = this.country;
    if (this.country != "") {
      console.log("Country no está vacío");

      if (this.showF == true) {
        this.selectedClass = "slds-accordion__section";
        this.showF = false;
        this.showLabel = false;

        if (this.value1.displayNumber || this.value2.displayNumber) {
          this.showLabel = true;
        } else {
          this.showLabel = false;
        }
        //this.error = "";
      } else {
        this.selectedClass = "slds-accordion__section slds-is-open";
        this.showF = true;
      }

      const selectedEvent = new CustomEvent("alert", {
        detail: { emptyCountryError: false, formOpen: this.showF }
      });

      console.log(selectedEvent);
      this.dispatchEvent(selectedEvent);
    } else {
      console.log("Country está vacío");

      const selectedEvent = new CustomEvent("alert", {
        detail: { emptyCountryError: true, formOpen: false }
      });

      console.log(selectedEvent);
      this.dispatchEvent(selectedEvent);
    }
  }

  handleClearInput() {
    this.template.querySelector('[data-id="input"]').value = "";
    this.showLabel = false;
    this.data.displayNumber = "";
    this.data2.displayNumber = "";
    //this.errormsg2 = "";
    this.showError = false;
    this.template.querySelector('[data-id="clear"]').style.display = "none";
  }

  handleFocus(event) {
    this.showLabel = true;
    this.template.querySelector('[data-id="clear"]').style.display = "block";
    this.template.querySelector("div.icon-close_filledCircle").style.display =
      "block";
    this.showError = false;
  }

  handleBlur(event) {
    var iban = event.target.value;
    this.iban = iban;

    console.log("IBAN", iban);

    if (iban == "") {
      this.showLabel = false;
      this.showError = true;
      this.condition = true;
    } else {
      this.condition = false;
      this.template.querySelector("div.icon-close_filledCircle").style.display =
        "none";
      console.log("ibanlength", this.ibanLength);
      console.log("country", this.country);
      if (
        iban.length == this.ibanLength &&
        iban.substring(0, 2) == this.country
      ) {
        this.showError = false;
      } else {
        this.showError = true;
      }
    }

    if (this.showLabel == false) {
      this.template.querySelector('[data-id="clear"]').style.display = "none";
    }
  }

  handleInput(event) {
    var value = event.target.value;

    if (value != "") {
      //this.showError = false;
    }
  }

  validateInternationalIBAN(iban) {
    console.log("ibanlength", this.ibanLength);
    console.log("country", this.country);

    if (iban != "") {
      //this.error = "";
      if (
        iban.length == this.ibanLength &&
        iban.substring(0, 2) == this.country
      ) {
        this.showError = false;
      } else {
        this.showError = true;
      }
    }
  }

  sendFormData(event) {
    var value = event.detail;
    var id = event.target.id.split("-", 1)[0];
    var iban = event.target.value;

    if (this.simpleForm == true) {
      if (id == "1" && this.showError == false) {
        this.data.displayNumber = iban;
      } else if (id == "2") {
        this.data.subsidiaryName = value;
      } else if (id == "3") {
        this.data.codigoBic = value;
      } else if (id == "4") {
        this.data.address.province = value;
      } else if (id == "5") {
        this.data.address.streetName = value;
      } else if (id == "6") {
        this.data.address.townName = value;
      } else if (id == "7") {
        this.data.address.floor = value;
      }

      if (
        this.data.displayNumber != "" &&
        this.data.subsidiaryName != "" &&
        this.data.codigoBic != "" &&
        this.data.address.province != "" &&
        this.data.address.streetName != "" &&
        this.data.address.townName != ""
      ) {
        this.data.country = this.country;
        this.data.address.country = this.country;

        console.log("draftData", this.data);
        console.log("Dentro del evento!");
        const selectedEvent = new CustomEvent("draftdata", {
          detail: { data: this.data }
        });

        this.dispatchEvent(selectedEvent);
      }
    } else {
      if (this.show == true) {
        if (id == "8") {
          this.data2.subsidiaryName = value;
        } else if (id == "9") {
          this.data2.creditorDocument.documentNumber = value;
        } else if (id == "10" && this.showError == false) {
          this.data2.displayNumber = iban;
        } else if (id == "11") {
          this.data2.address.state = value;
        } else if (id == "12") {
          this.data2.address.streetName = value;
        } else if (id == "13") {
          this.data2.address.townName = value;
        } else if (id == "14") {
          this.data2.address.floor = value;
        } else if (id == "15") {
          this.data2.address.addressAddition = value;
        }

        if (
          this.data2.displayNumber != "" &&
          this.data2.subsidiaryName != "" &&
          this.data2.creditorDocument.documentNumber != "" &&
          this.data2.address.state != "" &&
          this.data2.address.streetName != "" &&
          this.data2.address.townName != ""
        ) {
          this.data2.country = this.country;
          this.data2.address.country = this.country;

          console.log("draftData", this.data2);
          console.log("Dentro del evento!");
          const selectedEvent = new CustomEvent("draftdata", {
            detail: { data: this.data2 }
          });

          this.dispatchEvent(selectedEvent);
        }
      } else {
        if (id == "16") {
          this.data3.subsidiaryName = value;
        } else if (id == "17") {
          this.data3.creditorDocument.documentNumber = value;
        } else if (id == "18") {
          this.data3.bankName = value;
        } else if (id == "19") {
          this.data3.displayNumber = value;
        } else if (id == "20") {
          this.data3.type = value;
        } else if (id == "21") {
          this.data3.branch = value;
        } else if (id == "22") {
          this.data3.address.state = value;
        } else if (id == "23") {
          this.data3.address.streetName = value;
        } else if (id == "24") {
          this.data3.address.townName = value;
        } else if (id == "25") {
          this.data3.address.floor = value;
        } else if (id == "26") {
          this.data3.address.addressAddition = value;
        }

        if (
          this.data3.bankName != "" &&
          this.data3.displayNumber != "" &&
          this.data3.subsidiaryName != "" &&
          this.data3.branch != "" &&
          this.data3.type != "" &&
          this.data3.creditorDocument.documentNumber != "" &&
          this.data3.address.state != "" &&
          this.data3.address.streetName != "" &&
          this.data3.address.townName != ""
        ) {
          this.data3.country = this.country;
          this.data3.address.country = this.country;

          console.log("draftData", this.data3);
          console.log("Dentro del evento!");
          const selectedEvent = new CustomEvent("draftdata", {
            detail: { data: this.data3 }
          });

          this.dispatchEvent(selectedEvent);
        }
      }
    }

    this.value1 = this.data;
    this.value2 = this.data2;
    this.value3 = this.data3;
  }
  /*saveFormData(){
        const selectedEvent = new CustomEvent('draftData', {
            detail: this.data
        });

        this.dispatchEvent(selectedEvent);

        return this.data;
    }*/
}
