import { LightningElement, api, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

// Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

// Import labels
import Bank from "@salesforce/label/c.Bank";
import BICFlow from "@salesforce/label/c.BICFlow";
import Country from "@salesforce/label/c.Country";
import arrivalTime from "@salesforce/label/c.arrivalTime";
import duration from "@salesforce/label/c.duration";
import departureTime from "@salesforce/label/c.departureTime";
import exchangeRate from "@salesforce/label/c.exchangeRate";
import feeApplied from "@salesforce/label/c.feeApplied";

export default class Lwc_iptDetailProgress extends LightningElement {
  label = {
    Bank,
    BICFlow,
    Country,
    arrivalTime,
    duration,
    departureTime,
    exchangeRate,
    feeApplied
  };

  @api iobject;
  @api backfront;
  @api showfee;
  @track stepListArray;
  @track fxLabel = "FX";

  _showfee;

  get showfee() {
    return this._showfee;
  }

  set showfee(showfee) {
    this._showfee = showfee;
  }

  _iobject = {};

  get iobject() {
    return this._iobject;
  }

  set iobject(iobject) {
    if (iobject) {
      this._iobject = this.buildData(iobject);
      console.log("detailProgress stepList: " + this._iobject.stepList.length);
    }
  }

  get class1() {
    var colBankStyle = "";
    if (this.iObjectHasForeignExchange) {
      colBankStyle = "colBankTitle" + this.fxLabel;
    } else {
      colBankStyle = "slds-media__body colBankTitle";
    }
    return colBankStyle;
  }

  get class2() {
    //return 'slds-media__body colCountryTitle' + this.fxLabel;
    var colCountryStyle = "";
    if (this.iObjectHasForeignExchange) {
      colCountryStyle = "colCountryTitle" + this.fxLabel;
    } else {
      colCountryStyle = "slds-media__body colCountryTitle";
    }
    return colCountryStyle;
  }

  get class3() {
    //return 'slds-media__body colArrivalTimeTitle' + this.fxLabel;
    var colArrivalTimeStyle = "";
    if (this.iObjectHasForeignExchange) {
      colArrivalTimeStyle = "colArrivalTimeTitle" + this.fxLabel;
    } else {
      colArrivalTimeStyle = "slds-media__body colArrivalTimeTitle";
    }
    return colArrivalTimeStyle;
  }

  get class4() {
    //return 'slds-media__body colDurationTitle' + this.fxLabel;
    var colDurationStyle = "";
    if (this.iObjectHasForeignExchange) {
      colDurationStyle = "colDurationTitle" + this.fxLabel;
    } else {
      colDurationStyle = "slds-media__body colDurationTitle";
    }
    return colDurationStyle;
  }

  get class5() {
    //return 'slds-media__body colDepartureTimeTitle' + this.fxLabel;
    var colDepartureTimeStyle = "";
    if (this.iObjectHasForeignExchange) {
      colDepartureTimeStyle = "colDepartureTimeTitle" + this.fxLabel;
    } else {
      colDepartureTimeStyle = "slds-media__body colDepartureTimeTitle";
    }
    return colDepartureTimeStyle;
  }

  get iObjectStepListLength() {
    if (this._iobject.stepList) {
      return this._iobject.stepList.length > 0;
    }
  }

  get iObjectStepListLength2() {
    if (this._iobject.stepList) {
      return this._iobject.stepList.length > 2;
    }
  }

  get iObjectStepListLength3() {
    if (this._iobject.stepList) {
      return this._iobject.stepList.length == 2;
    }
  }

  get iObjectHasForeignExchange() {
    return this._iobject.hasForeignExchange;
  }

  get iObjectStepList() {
    return this._iobject.stepList;
  }

  get iObjectStatus() {
    return (
      this._iobject.status != "ACSC" &&
      this._iobject.status != "ACCC" &&
      this._iobject.status != "RJCT"
    );
  }

  get statusCondition1() {
    return this._iobject.status == "ACSC" || this._iobject.status == "ACCC";
  }

  get statusCondition2() {
    return this._iobject.status == "RJCT";
  }

  get statusCondition3() {
    return (
      this._iobject.status == "ACSP" &&
      (this._iobject.reason == "G000" || this._iobject.reason == "G001")
    );
  }

  get statusCondition4() {
    return (
      this._iobject.status == "ACSP" &&
      (this._iobject.reason == "G002" ||
        this._iobject.reason == "G003" ||
        this._iobject.reason == "G004")
    );
  }

  get statusCondition5() {
    return (
      this._iobject.status == "ACSC" ||
      this._iobject.status == "ACCC" ||
      this._iobject.status == "RJCT"
    );
  }

  get statusCondition6() {
    return (
      this._iobject.status != "ACSC" &&
      this._iobject.status != "ACCC" &&
      this._iobject.status != "RJCT"
    );
  }

  get statusCondition7() {
    return (
      this._iobject.reason == "G002" ||
      this._iobject.reason == "G003" ||
      this._iobject.reason == "G004"
    );
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
  }

  buildData(iobject) {
    console.log("iobject::: ", JSON.stringify(iobject));
    var iobjectAux = JSON.parse(JSON.stringify(iobject));
    var steps = iobjectAux.stepList;
    var stepListLength = steps.length;
    var listSteps = [];

    Object.keys(iobject.stepList).forEach((step, index) => {
      var obj = {};
      obj.stepListCondition1 = index == stepListLength - 2;
      obj.stepListCondition2 = index == 1;
      obj.stepListCondition3 = index == stepListLength - 1;

      obj.itemCondition1 =
        !iobject.stepList[step].arrival &&
        iobject.stepList[step].departure &&
        index < stepListLength - 1;
      obj.itemCondition2 =
        iobject.stepList[step].arrival && iobject.stepList[step].departure;
      obj.itemCondition3 =
        index != stepListLength - 1 && index != stepListLength - 2;
      obj.itemCondition4 =
        !iobject.stepList[step].arrival && !iobject.stepList[step].departure;
      obj.itemCondition5 =
        iobject.stepList[step].arrival && !iobject.stepList[step].departure;
      obj.data = iobject.stepList[index];
      obj["isUnique"] = iobject.stepList.length === 1 ? true : false;
      obj["isLast"] = index === iobject.stepList.length - 1 ? true : false;
      listSteps.push(obj);
    });
    this.stepListArray = [...listSteps];
    return iobjectAux;
  }

  get stepListArrayLength() {
    this.stepListArray.length;
  }
}
