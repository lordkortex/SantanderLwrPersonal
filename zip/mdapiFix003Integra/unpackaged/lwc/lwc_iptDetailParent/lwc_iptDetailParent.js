import { LightningElement, api, track } from "lwc";

//Import labels
import Loading from "@salesforce/label/c.Loading";
import T_InternationalPaymentsTracker from "@salesforce/label/c.T_InternationalPaymentsTracker";
import trackingDetails from "@salesforce/label/c.trackingDetails";
import ERROR from "@salesforce/label/c.ERROR";
import ERROR_NOT_RETRIEVED from "@salesforce/label/c.ERROR_NOT_RETRIEVED";
import payment_statusOne from "@salesforce/label/c.payment_statusOne";
import payment_statusTwo from "@salesforce/label/c.payment_statusTwo";
import payment_statusThree from "@salesforce/label/c.payment_statusThree";
import payment_statusFour from "@salesforce/label/c.payment_statusFour";
import Full from "@salesforce/label/c.Full";
import Partial from "@salesforce/label/c.Partial";
import shared from "@salesforce/label/c.shared";
import borneByDebitor from "@salesforce/label/c.borneByDebitor";
import borneByCreditor from "@salesforce/label/c.borneByCreditor";

//Import methods
import generateObject from "@salesforce/apex/CNT_IPTDetailParent.generateObject";
import getShowFeeValue from "@salesforce/apex/CNT_IPTDetailParent.getShowFeeValue";
import decryptData from "@salesforce/apex/CNT_IPTDetailParent.decryptData";
import getSteps from "@salesforce/apex/CNT_IPTDetailParent.getSteps";
import getReason from "@salesforce/apex/CNT_IPTDetailParent.getReason";
import getBICList from "@salesforce/apex/CNT_IPTDetailParent.getBICList";

export default class lwc_iptDetailParent extends LightningElement {
  //Labels
  label = {
    Loading,
    T_InternationalPaymentsTracker,
    trackingDetails,
    ERROR,
    ERROR_NOT_RETRIEVED,
    payment_statusOne,
    payment_statusTwo,
    payment_statusThree,
    payment_statusFour,
    Full,
    Partial,
    shared,
    borneByDebitor,
    borneByCreditor
  };

  @api uetr = "N/A";
  @api agent;
  @api currentbank;
  @api totaltransaction;
  @api totalfee;
  @track iobject;
  @api steps;
  @track showspinner = true;
  @track ready = false;
  @track showerror = false;
  @track fakeerror = false;
  @api segment = "";
  @api uetrsearchresult;
  @api comesfromuetrsearch = false; //Indicates if comes from the UETR search page
  @api ispaymentingested; //Indicates whether the payment is ingested or not
  @api comesfromtracker; //flag to check if back button is checked
  @track biclist;
  @track showfee;
  @track statuslabel;
  @track totalelapsedtime;
  @api comesfromsso = false; //Flag to check if comes from SSO with params
  @track spinnerClass;
  @track iobj;

  get isUetrSearchResultNullOrUndefined() {
    console.log(this.uetrsearchresult + "--------");
    return this.uetrsearchresult == undefined || this.uetrsearchresult == null;
  }

  connectedCallback() {
    this.doInit();
  }

  doInit() {
    this.getBicListFull();
    // this.getDataObject();
    this.showspinner = false;
  }

  getStatuses() {
    var status = this.item.paymentDetail.transactionStatus.status;
    var reason = this.item.paymentDetail.transactionStatus.reason;
    if (status == "RJCT") {
      this.statusLabel = this.label.payment_statusOne;
      this.statusClass = "icon-circle__red";
    }
    if (status == "ACSC") {
      this.statusLabel = this.label.payment_statusTwo;
      this.statusClass = "icon-circle__green";
    }
    if (status == "ACSP") {
      if (reason == "G000" || reason == "G001") {
        this.statusLabel = this.label.payment_statusThree;
        this.statusClass = "icon-circle__blue";
      }
      if (reason == "G002" || reason == "G003" || reason == "G004") {
        this.statusLabel = this.label.payment_statusFour;
        this.statusClass = "icon-circle__orange";
      }
    }
  }

  get getShowError() {
    return this.showerror;
  }

  getDataEvent() {
    //Código comentado: this.totalElapsedTime = event.getParam('elapsed');
  }

  getDataObject() {
    try {
      var params = ""; //this.sendobject; //GAA y este  atributo de dónde sale???
      generateObject({ url: params })
        .then((result) => {
          console.log(result);
          var iReturn = result;
          this.iobject = iReturn;
          if (iReturn.stepList) {
            var lgt = iReturn.stepList.length;
            var i = 0;
            var ok = false;
            if (iReturn.status != "ACCC") {
              while (i < lgt && !ok) {
                if (iReturn.stepList[i].departureDate == "") {
                  ok = true;
                  this.iobject.currentBank = iReturn.stepList[i].bank;
                }
                i++;
              }
            } else {
              this.currentbank = iReturn.stepList[lgt - 1].bank;
            }
          } else {
            console.log(
              "### lwc_iptDetailParent ### getDataObject() ::: response.stepList: undefined"
            );
          }
        })
        .catch((error) => {
          console.log(
            "### lwc_iptDetailParent ### getDataObject() ::: Try Error: " +
              error
          );
          this.dispatchErrorLoadEvent();
          this.showerror = true;
        });
    } catch (e) {
      this.showerror = true;
      this.dispatchErrorLoadEvent();
      console.log(
        "### lwc_iptDetailParent ### getDataObject() ::: Catch Error: " + e
      );
    }
  }
  dispatchErrorLoadEvent() {
    const errorOnLoadEvent = new CustomEvent("erroronload", {
      detail: { error: true }
    });
    this.dispatchEvent(errorOnLoadEvent);
  }
  setiObj(UETRSearchResult, isIngested) {
    console.log("setiObj");
    try {
      if (!this.iobject) {
        this.iobject = {};
      }
      if (isIngested) {
        if (this.comesfromtracker == true) {
          /*if (!this.iobject){
                        this.iobject= {};
                    }*/
          UETRSearchResult.paymentDetail.paymentId === undefined
            ? "Not found"
            : (this.iobject.uetr = UETRSearchResult.paymentDetail.paymentId);
          UETRSearchResult.paymentDetail.transactionStatus.reason === undefined
            ? "Not found"
            : (this.iobject.reason =
                UETRSearchResult.paymentDetail.transactionStatus.reason);
          UETRSearchResult.paymentDetail.transactionStatus.status === undefined
            ? "Not found"
            : (this.iobject.status =
                UETRSearchResult.paymentDetail.transactionStatus.status);
          UETRSearchResult.paymentDetail.originatorData.originatorAccount
            .accountId === undefined
            ? "Not found"
            : (this.iobject.originAccountNumber =
                UETRSearchResult.paymentDetail.originatorData.originatorAccount.accountId);
          UETRSearchResult.paymentDetail.originatorData.originatorName ===
          undefined
            ? "Not found"
            : (this.iobject.originAccountName =
                UETRSearchResult.paymentDetail.originatorData.originatorName);
          UETRSearchResult.paymentDetail.originatorAgent.agentName === undefined
            ? "Not found"
            : (this.iobject.originAccountBank =
                UETRSearchResult.paymentDetail.originatorAgent.agentName);
          UETRSearchResult.paymentDetail.originatorAgent.agentCode === undefined
            ? "Not found"
            : (this.iobject.originAccountBic =
                UETRSearchResult.paymentDetail.originatorAgent.agentCode);
          UETRSearchResult.paymentDetail.beneficiaryData.creditorCreditAccount
            .accountId === undefined
            ? "Not found"
            : (this.iobject.beneficiaryAccountNumber =
                UETRSearchResult.paymentDetail.beneficiaryData.creditorCreditAccount.accountId);
          UETRSearchResult.paymentDetail.beneficiaryData.beneficiaryName ===
          undefined
            ? "Not found"
            : (this.iobject.beneficiaryAccountName =
                UETRSearchResult.paymentDetail.beneficiaryData.beneficiaryName);
          UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent
            .agentName === undefined
            ? "Not found"
            : (this.iobject.beneficiaryAccountBank =
                UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentName);
          UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent
            .agentCode === undefined
            ? "Not found"
            : (this.iobject.beneficiaryAccountBic =
                UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentCode);
          UETRSearchResult.paymentDetail.paymentAmount.tcurrency === undefined
            ? "Not found"
            : (this.iobject.currencyAux =
                UETRSearchResult.paymentDetail.paymentAmount.tcurrency);
          UETRSearchResult.paymentDetail.valueDate === undefined
            ? "Not found"
            : (this.iobject.valueDate =
                UETRSearchResult.paymentDetail.valueDate);
          UETRSearchResult.paymentDetail.paymentAmount.amount === undefined
            ? "Not found"
            : (this.iobject.amount =
                UETRSearchResult.paymentDetail.paymentAmount.amount);
          UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent
            .agentLocation === undefined
            ? "Not found"
            : (this.iobject.beneficiaryCity =
                UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentLocation);
          UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent
            .agentCountry === undefined
            ? "Not found"
            : (this.iobject.beneficiaryCountry =
                UETRSearchResult.paymentDetail.beneficiaryData.creditorAgent.agentCountry);
        } else {
          UETRSearchResult.paymentId === undefined
            ? "Not found"
            : (this.iobject.uetr = UETRSearchResult.paymentId);
          UETRSearchResult.transactionStatus.reason === undefined
            ? "Not found"
            : (this.iobject.reason = UETRSearchResult.transactionStatus.reason);
          UETRSearchResult.transactionStatus.status === undefined
            ? "Not found"
            : (this.iobject.status = UETRSearchResult.transactionStatus.status);
          UETRSearchResult.debtorAgent.agentName === undefined
            ? "Not found"
            : (this.iobject.originAccountBank =
                UETRSearchResult.debtorAgent.agentName);
          UETRSearchResult.debtorAgent.agentCode === undefined
            ? "Not found"
            : (this.iobject.originAccountBic =
                UETRSearchResult.debtorAgent.agentCode);
          UETRSearchResult.creditorAgent.agentName === undefined
            ? "Not found"
            : (this.iobject.beneficiaryAccountBank =
                UETRSearchResult.creditorAgent.agentName);
          UETRSearchResult.creditorAgent.agentCode === undefined
            ? "Not found"
            : (this.iobject.beneficiaryAccountBic =
                UETRSearchResult.creditorAgent.agentCode);
          UETRSearchResult.paymentEventsArray[
            UETRSearchResult.paymentEventsArray.length - 1
          ].instructedAmount.tcurrency === undefined
            ? "Not found"
            : (this.iobject.currencyAux =
                UETRSearchResult.paymentEventsArray[
                  UETRSearchResult.paymentEventsArray.length - 1
                ].instructedAmount.tcurrency);
          UETRSearchResult.paymentEventsArray[
            UETRSearchResult.paymentEventsArray.length - 1
          ].instructedAmount.amount === undefined
            ? "Not found"
            : (this.iobject.amount =
                UETRSearchResult.paymentEventsArray[
                  UETRSearchResult.paymentEventsArray.length - 1
                ].instructedAmount.amount);
          UETRSearchResult.initiationTime === undefined
            ? "Not found"
            : this.iobject.valueDate,
            UETRSearchResult.initiationTime;
          UETRSearchResult.creditorAgent.agentLocation === undefined
            ? "Not found"
            : (this.iobject.beneficiaryCity =
                UETRSearchResult.creditorAgent.agentLocation);
          UETRSearchResult.creditorAgent.agentCountry === undefined
            ? "Not found"
            : (this.iobject.beneficiaryCountry =
                UETRSearchResult.creditorAgent.agentCountry);
        }

        if (
          this.iobject.originAccountBic != null &&
          this.iobject.originAccountBic != undefined &&
          this.iobject.originAccountBic != ""
        ) {
          for (var i in this.biclist) {
            if (this.biclist[i][0] == this.iobject.originAccountBic) {
              //AM - 05/11/2020 - Portugal SSO Tracker
              if (this.comesfromsso) {
                this.getShowFee(i);
                break;
              } else {
                //For UETR Search will always show Partial Bics, showing only the total Amount and Fee.
                this.showfee = "1";
                break;
              }
            }
          }
        }
      } else {
        this.iobject.uetr = UETRSearchResult.uetrCode;
      }
      this.getDataSteps();
    } catch (e) {
      setTimeout(() => {
        //GAA
        //$A.util.addClass(component.find("spinnerCreate"), "slds-hide");
        //this.template.querySelector('div').classList.add('slds-hide');
        //this.template.querySelector('[data-id="spinnerCreate"]').toggle('slds-hide');
        this.spinnerClass = "slds-hide";
        this.dispatchErrorLoadEvent();
        this.fakeerror = true;
      }, 3000);
    }
  }

  getURLParams() {
    //Only if it comes from CMP_IPTTrackUETRParent will has the attribute filled.
    if (this.comesfromuetrsearch) {
      var UETRSearchResult = this.uetrsearchresult;
      this.uetrsearchresult = true;
      var isIngested = this.ispaymentingested;
      this.setiObj(UETRSearchResult, isIngested);
    } else {
      var sPageURLMain = decodeURIComponent(
        window.location.search.substring(1)
      );
      var sURLVariablesMain = sPageURLMain.split("&")[0].split("=");
      var sParameterName = "";
      var sPageURL = "";
      var results = "";
      var caseTabId = this.casetabid;

      if (!this.iobject) {
        this.iobject = {};
      }

      if (
        sURLVariablesMain[0] == "params" ||
        sURLVariablesMain[0] == "c__params"
      ) {
        this.decrypt(sURLVariablesMain[1]).then((results) => {
          sURLVariablesMain[1] === undefined
            ? "Not found"
            : (sPageURL = results);

          var sURLVariables = sPageURL.split("&");

          for (var i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] === "c__paymentId") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.uetr = sParameterName[1]);
            }
            if (sParameterName[0] === "c__reason") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.reason = sParameterName[1]);
            }
            if (sParameterName[0] === "c__status") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.status = sParameterName[1]);
            }
            if (sParameterName[0] === "c__orderingAccount") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.originAccountNumber = sParameterName[1]);
            }
            if (sParameterName[0] === "c__orderingName") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.originAccountName = sParameterName[1]);
            }
            if (sParameterName[0] === "c__orderingBank") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.originAccountBank = sParameterName[1]);
            }
            if (sParameterName[0] === "c__orderingBIC") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.originAccountBic = sParameterName[1]);
            }
            if (sParameterName[0] === "c__beneficiaryAccount") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.beneficiaryAccountNumber = sParameterName[1]);
            }
            if (sParameterName[0] === "c__beneficiaryName") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.beneficiaryAccountName = sParameterName[1]);
            }
            if (sParameterName[0] === "c__beneficiaryBank") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.beneficiaryAccountBank = sParameterName[1]);
            }
            if (sParameterName[0] === "c__beneficiaryBIC") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.beneficiaryAccountBic = sParameterName[1]);
            }
            if (sParameterName[0] === "c__totalAmount") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.totalAmount = sParameterName[1]);
            }
            if (sParameterName[0] === "c__currency") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.currencyAux = sParameterName[1]);
            }
            if (sParameterName[0] === "c__valueDate") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.valueDate = sParameterName[1]);
            }
            if (sParameterName[0] === "c__amount") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.amount = sParameterName[1]);
            }
            if (sParameterName[0] === "c__beneficiaryCity") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.beneficiaryCity = sParameterName[1]);
            }
            if (sParameterName[0] === "c__beneficiaryCountry") {
              sParameterName[1] === undefined
                ? "Not found"
                : (this.iobject.beneficiaryCountry = sParameterName[1]);
            }
          }

          if (
            this.iobject.originAccountBic != null &&
            this.iobject.originAccountBic != undefined &&
            this.iobject.originAccountBic != ""
          ) {
            for (var i in this.biclist) {
              if (this.biclist[i][0] == this.iobject.originAccountBic) {
                this.getShowFee(i);
                break;
              }
            }
          }

          this.getDataSteps();
        });
      } else {
      }
    }
  }

  getShowFee(i) {
    try {
      var params = this.iobject.originAccountBic;
      getShowFeeValue({
        bic: params
      })
        .then((result) => {
          var showFee = result;
          if (showFee != undefined && showFee != null) {
            if (showFee == this.label.Full) {
              showFee = "2";
            } else if (showFee == this.label.Partial) {
              showFee = "1";
            } else {
              showFee = "0";
            }
            this.showfee = showFee;
          } else {
            this.showfee = this.biclist[i][1];
          }
        })
        .catch((error) => {
          console.log(
            "### lwc_iptDetailParent ### getShowFee(i) ::: Try error: " + error
          );
          this.showerror = true;
          this.dispatchErrorLoadEvent();
        });
    } catch (e) {
      this.showerror = true;
      this.dispatchErrorLoadEvent();
      console.log(
        "### lwc_iptDetailParent ### getShowFee(i) ::: Catch error: " + e
      );
    }
  }

  getBicListFull() {
    try {
      this.getBICS();
      getBICList()
        .then((result) => {
          this.getURLParams();
        })
        .catch((error) => {
          console.log(
            "### lwc_iptDetailParent ### getBicListFull() ::: Try error: " +
              error
          );
        });
    } catch (e) {
      console.log(
        "### lwc_iptDetailParent ### getBicListFull() ::: Catch error: " + e
      );
    }
  }

  decrypt(data) {
    try {
      var result = "";
      return new Promise(function (resolve, reject) {
        decryptData({
          str: data
        })
          .then((res) => {
            if (res != "null" && res != undefined && res != null) {
              result = res;
            }
            resolve(result);
          })
          .catch((error) => {
            console.log(
              "### lwc_iptDetailParent ### decrypt() ::: Try Error: " + error
            );
            reject(error);
            this.showerror = true;
            this.dispatchErrorLoadEvent();
          });
      });
    } catch (e) {
      console.error(
        "### lwc_iptDetailParent ### decrypt() ::: Catch Error: " + e
      );
    }
  }

  getBICS() {
    try {
      var result = "";
      getBICList()
        .then((response) => {
          result = response;
          if (result != null && result != undefined) {
            var bics = [];
            for (var i in result) {
              var format = "1";
              if (result[i].Fee_format__c == this.label.Full) {
                format = "2";
              } else if (result[i].Fee_format__c == this.label.Partial) {
                format = "1";
              } else {
                format = "0";
              }

              bics.push([result[i].Label, format]);
            }
            this.biclist = bics;
            console.log(JSON.stringify(bics));
          }
          return;
        })
        .catch((error) => {
          console.log(
            "### lwc_iptDetailParent ### getBICS() ::: Try Error: " + error
          );
        });
    } catch (e) {
      console.error(
        "### lwc_iptDetailParent ### getBICS() ::: Catch error: " + e
      );
    }
  }

  getDataSteps() {
    this.ready = false;
    try {
      getSteps({
        str: this.iobject.uetr
      })
        .then((result) => {
          var res = result;
          if (res != "" && res != undefined && res != null) {
            var iobj = this.iobject;
            this.iobject.lastUpdate = res.lastUpdateTime;
            this.iobject.hasForeignExchange = res.hasForeignExchange;
            this.iobject.instructedAmount = res.instructedAmount;
            this.iobject.confirmedAmount = res.confirmedAmount;

            console.log("InstructedAmount en steps");
            var tempLog = this.iobject;
            console.log(tempLog);

            this.iobject.lastUpdateTime = res.lastUpdateTime;
            this.iobject.reason = res.transactionStatus.reason;
            this.iobject.status = res.transactionStatus.status;
            this.totalelapsedtime = res.totalElapsedTime;

            if (
              this.comesfromuetrsearch &&
              !this.ispaymentingested &&
              res.creditorAgent != null
            ) {
              iobj.beneficiaryAccountBic = res.creditorAgent.agentCode;
              iobj.beneficiaryCountry = res.creditorAgent.agentCountry;
              iobj.beneficiaryCountryName = res.creditorAgent.agentCountryName;
              iobj.beneficiaryAccountBank = res.creditorAgent.agentName;
              iobj.beneficiaryCity = res.creditorAgent.agentLocation;
              /*  this.iobject.beneficiaryAccountBic = res.creditorAgent.agentCode;
                        this.iobject.beneficiaryCountry = res.creditorAgent.agentCountry;
                        this.iobject.beneficiaryCountryName = res.creditorAgent.agentCountryName;
                        this.iobject.beneficiaryAccountBank = res.creditorAgent.agentName;
                        this.iobject.beneficiaryCity = res.creditorAgent.agentLocation;*/
            }
            var stepList = [];
            var steps = res.paymentEventsArray;

            if (steps.length > 0) {
              var fees = [];
              var currencies = [];
              for (var i in steps) {
                var step = [];
                step.bank = steps[i].toAgent.agentName;
                step.bic = steps[i].toAgent.agentCode;
                step.country = steps[i].toAgent.agentCountry;
                step.countryName = steps[i].toAgent.agentCountryName;
                step.city = steps[i].toAgent.agentLocation;
                step.arrival = steps[i].receivedDate;
                step.departure = steps[i].senderAcknowledgementReceipt;
                step.foreignExchangeDetails = steps[i].foreignExchangeDetails;
                this.iobject.currentBank = step.bank;

                if (steps[i].chargeAmountSingle != undefined) {
                  if (
                    steps[i].chargeAmountSingle.amount != null &&
                    steps[i].chargeAmountSingle.amount != 0.0
                  ) {
                    step.feeApplied = true;
                    step.stepFee = steps[i].chargeAmountSingle.amount;
                    step.stepFeeCurrency =
                      steps[i].chargeAmountSingle.tcurrency;
                    if (
                      !currencies.includes(
                        steps[i].chargeAmountSingle.tcurrency
                      )
                    ) {
                      currencies.push(steps[i].chargeAmountSingle.tcurrency);
                    }
                    fees.push([
                      steps[i].chargeAmountSingle.tcurrency,
                      steps[i].chargeAmountSingle.amount
                    ]);
                    step.feeApplied = true;
                  } else {
                    step.feeApplied = false;
                  }
                }
                if (steps[i].chargeBearer == "SHAR") {
                  step.charges = this.label.shared;
                  iobj.charges = this.label.shared;
                  //this.iobject.charges = this.label.shared;
                }
                if (steps[i].chargeBearer == "DEBT") {
                  step.charges = this.label.borneByDebitor;
                  iobj.charges = this.label.borneByDebitor;
                  //this.iobject.charges = this.label.borneByDebitor;
                }
                if (steps[i].chargeBearer == "CRED") {
                  step.charges = this.label.borneByCreditor;
                  iobj.charges = this.label.borneByCreditor;
                  //this.iobject.charges = this.label.borneByCreditor;
                }
                stepList.push(step);
              }

              if (
                (iobj.status == "ACSP" || iobj.status == "RJCT") &&
                iobj.beneficiaryAccountBic != stepList[stepList.length - 1].bic
              ) {
                // if((this.iobject.status=='ACSP' || this.iobject.status=='RJCT') && this.iobject.beneficiaryAccountBic != stepList[stepList.length-1].bic){
                var step = [];
                step.bank = iobj.beneficiaryAccountBank;
                step.bic = iobj.beneficiaryAccountBic;
                step.country = iobj.beneficiaryCountry;
                step.countryName = iobj.beneficiaryCountryName;
                step.city = iobj.beneficiaryCity;
                /*   step.bank = this.iobject.beneficiaryAccountBank;
                            step.bic = this.iobject.beneficiaryAccountBic;
                            step.country = this.iobject.beneficiaryCountry
                            step.countryName = this.iobject.beneficiaryCountryName;
                            step.city = this.iobject.beneficiaryCity;*/
                step.arrival = "";
                step.departure = "";
                if (iobj.status == "RJCT") {
                  //if(this.iobject.status == 'RJCT'){
                  stepList[stepList.length - 1].lastStep = true;
                  step.lastStep2 = true;
                }
                stepList.push(step);
              } else if (
                iobj.status == "ACSP" &&
                iobj.beneficiaryAccountBic ==
                  stepList[stepList.length - 1].bic &&
                stepList[stepList.length - 1].arrival != null
              ) {
                //}else if(this.iobject.status=='ACSP' && this.iobject.beneficiaryAccountBic==stepList[stepList.length-1].bic  && stepList[stepList.length-1].arrival!=null){
                if (stepList.length > 1) {
                  stepList[stepList.length - 2].lastStep = true;
                  stepList[stepList.length - 1].lastStep2 = true;
                }
              }

              if (fees.length > 0) {
                var auxFees = [];
                for (var c in currencies) {
                  var amount = 0;
                  for (var f in fees) {
                    console.log(f);
                    if (fees[f][0] == currencies[c]) {
                      amount += fees[f][1];
                    }
                  }
                  auxFees.push([currencies[c], amount]);
                }
                fees = auxFees;
              }

              iobj.stepList = stepList;
              iobj.fees = fees;
              //this.iobject.stepList=stepList;
              //this.iobject.fees=fees
              //console.log(this.iobject.fees);
            }
          } else {
            console.log("Recibimos lista vacia");
          }
          console.log("lista final");
          console.log(iobj.stepList);
          console.log(this.iobject);
          this.ready = true;
          //GAA
          //$A.util.addClass(component.find("spinnerCreate"), "slds-hide");
          this.spinnerClass = "slds-hide";
          this.template.querySelector("div").classList.add("slds-hide");
        })
        .catch((error) => {
          console.log(
            "### lwc_iptDetailParent ### getDataStepsTry() ::: Error: " + error
          );
          this.showerror = true;
          this.dispatchErrorLoadEvent();
          console.log(this.iobject);
          this.ready = true;
          //GAA
          //$A.util.addClass(component.find("spinnerCreate"), "slds-hide");
          this.spinnerClass = "slds-hide";
          this.template.querySelector("div").classList.add("slds-hide");
        });
      this.getReason();
    } catch (e) {
      this.showerror = true;
      this.dispatchErrorLoadEvent();
      console.error(
        "### lwc_iptDetailParent ### getDataStepsCatch() ::: Error: " + e
      );
    }
  }

  getReason() {
    try {
      if (this.iobject.status == "RJCT") {
        getReason({
          iReason: this.iobject.reason
        })
          .then((result) => {
            this.iobject.reason2 = result;
          })
          .catch((error) => {
            console.log(
              "### lwc_iptDetailParent ### getReasonTry error: " + error
            );
          });
      }
    } catch (e) {
      console.log("### lwc_iptDetailParent ### getReasonCatch error: " + e);
    }
  }
}
