import { LightningElement, api } from "lwc";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";
import getUsers from "@salesforce/apex/CNT_OTV_CompanyDetail.calloutGetUserList";
import declineOTVInvitation from "@salesforce/apex/CNT_OTV_CompanyDetail.declineOTVInvitation";
import getCompanyDetails from "@salesforce/apex/CNT_OTV_CompanyDetail.getCompanyDetails";

// importing Custom Label
import back from "@salesforce/label/c.back";
import cmpOTVCompanyDetail_1 from "@salesforce/label/c.cmpOTVCompanyDetail_1";
import cmpOTVCompanyDetail_2 from "@salesforce/label/c.cmpOTVCompanyDetail_2";
import cmpOTVCompanyDetail_3 from "@salesforce/label/c.cmpOTVCompanyDetail_3";
import cmpOTVCompanyDetail_4 from "@salesforce/label/c.cmpOTVCompanyDetail_4";
import cmpOTVCompanyDetail_5 from "@salesforce/label/c.cmpOTVCompanyDetail_5";
import cmpOTVCompanyDetail_6 from "@salesforce/label/c.cmpOTVCompanyDetail_6";
import cmpOTVCompanyDetail_7 from "@salesforce/label/c.cmpOTVCompanyDetail_7";
import cmpOTVCompanyDetail_8 from "@salesforce/label/c.cmpOTVCompanyDetail_8";
import cmpOTVCompanyDetail_9 from "@salesforce/label/c.cmpOTVCompanyDetail_9";
import cmpOTVCompanyDetail_10 from "@salesforce/label/c.cmpOTVCompanyDetail_10";

export default class CmpOTVParentCompanyDetail extends LightningElement {
  label = {
    back,
    cmpOTVCompanyDetail_1,
    cmpOTVCompanyDetail_2,
    cmpOTVCompanyDetail_3,
    cmpOTVCompanyDetail_4,
    cmpOTVCompanyDetail_5,
    cmpOTVCompanyDetail_6,
    cmpOTVCompanyDetail_7,
    cmpOTVCompanyDetail_8,
    cmpOTVCompanyDetail_9,
    cmpOTVCompanyDetail_10
  };
  country = "BR";
  lstUsers = [];
  lstUsersAux = [];
  @api companyDetail;
  displayedList = [];
  loading = true;
  isCancelled = false; // Get Status
  showCancelModal = false;
  showToast = false;
  giveAccess = false;

  connectedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);

    //Company detail provisional
    getCompanyDetails()
      .then((results) => {
        console.log("Company Details Result: " + results);
        this.companyDetail = results;
      })
      .finally(() => {
        if (this.country == "BR") {
          console.log("llega22");
          getUsers({ companyId: null })
            .then((results) => {
              console.log(results);
              this.lstUsers = results;
              for (let i = 0; i < results.length; i++) {
                this.lstUsers[i].lastName =
                  this.lstUsers[i].name.substring(0, 1) +
                  this.lstUsers[i].lastName.substring(0, 1);
              }
              //Items displayed
              this.displayedList = [];
              this.lstUsersAux = [];
              for (let i = 0; i < this.lstUsers.length; i++) {
                if (this.lstUsers[i] != null) {
                  this.displayedList[i] = this.lstUsers[i];
                }
              }
              this.lstUsersAux = this.displayedList;
              // this.items = results.length;
            })
            .finally(() => {
              console.log("Entra");
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
  }

  get countryBR() {
    console.log(this.country);
    if (this.country == "BR") {
      return true;
    } else {
      return false;
    }
  }

  cancelServiceModal(event) {
    this.showCancelModal = true;
    if (this.isCancelled) {
      this.giveAccess = true;
    } else {
      this.giveAccess = false;
    }
  }

  cancelService(event) {
    this.showCancelModal = false;
    console.log("llega");
    if (event.detail.cancelAccess) {
      this.loading = true;
      if (this.isCancelled) {
        declineOTVInvitation({ reason: "", details: "", status: "Enrolled" });
      } else {
        declineOTVInvitation({ reason: "", details: "", status: "Cancelled" });
      }
      this.isCancelled = !this.isCancelled;
      this.template.querySelectorAll(".paymentStatus").forEach((element) => {
        if (element.className == "paymentStatus") {
          element.className = "paymentStatus inactive";
        } else if (element.className == "paymentStatus inactive") {
          element.className = "paymentStatus";
        }
        console.log(element);
      });
      this.showToast = true;
      console.log("se recupera" + this.isCancelled);
      this.loading = false;
    }
  }
  closeToast(event) {
    console.log("Entra?");
    this.showToast = false;
  }
}
