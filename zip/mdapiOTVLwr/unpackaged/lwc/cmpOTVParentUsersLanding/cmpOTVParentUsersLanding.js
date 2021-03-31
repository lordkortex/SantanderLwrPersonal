import { LightningElement, api, track } from "lwc";

//import getUsers from '@salesforce/apex/CNT_OTV_UsersLanding.getUsers';
import getUsers from "@salesforce/apex/CNT_OTV_UsersLanding.calloutGetUserList";
//import getCheckBox from '@salesforce/apex/CNT_OTV_WelcomePack_Controller.getCheckboxWelcomePack';
import getCheckBox from "@salesforce/apex/CNT_OTV_UsersLanding.getCheckboxWelcomePack";

import { loadStyle } from "lightning/platformResourceLoader";
import Santander_Icons from "@salesforce/resourceUrl/Santander_Icons";

// importing Custom Label
import cmpOTVParentUsersLanding_1 from "@salesforce/label/c.cmpOTVParentUsersLanding_1";
import cmpOTVParentUsersLanding_2 from "@salesforce/label/c.cmpOTVParentUsersLanding_2";
import cmpOTVParentUsersLanding_3 from "@salesforce/label/c.cmpOTVParentUsersLanding_3";
import cmpOTVParentUsersLanding_4 from "@salesforce/label/c.cmpOTVParentUsersLanding_4";

export default class CmpOTVParentUsersLanding extends LightningElement {
  label = {
    cmpOTVParentUsersLanding_1,
    cmpOTVParentUsersLanding_2,
    cmpOTVParentUsersLanding_3,
    cmpOTVParentUsersLanding_4
  };
  @api lstUsers = [];
  @api lstUsersAux = [];
  @api numPages = [];
  @api selectedPage = 1;
  @api selectedValue = 10;
  @api lastpage;
  @api filters = null;
  @api items;
  @api checkboxWelcomePack = false;
  @api isBackfront = false;
  @api showtoast = false;
  @track showtoast = false;
  @track showtoastError = false;
  @track msgtoast;
  @track typetoast;
  @track tobehiddentoast;
  displayedList = [];
  lstUsersFilters = [];
  paginaActual = 1;
  showFilters = false;
  posInicial;
  posFinal;
  busqueda;
  loading = true;

  connectedCallback() {
    Promise.all([loadStyle(this, Santander_Icons + "/style.css")]);
    getCheckBox()
      .then((result) => {
        this.checkboxWelcomePack = result;
      })
      .finally(() => {
        getUsers({ companyId: this.filters })
          .then((results) => {
            console.log(results);
            this.lstUsers = results;
            for (let i = 0; i < results.length; i++) {
              this.lstUsers[i].lastName =
                this.lstUsers[i].name.substring(0, 1) +
                this.lstUsers[i].lastName.substring(0, 1);
            }
            this.displayedList = [];
            this.lstUsersAux = [];
            for (let i = 0; i < this.selectedValue; i++) {
              if (this.lstUsers[i] != null) {
                this.displayedList[i] = this.lstUsers[i];
              }
            }
            this.lstUsersAux = this.displayedList;

            //List Pages
            for (var i = 0; i < results.length / this.selectedValue; i++) {
              this.numPages[i] = i + 1;
              this.lastpage = i + 1;
            }
            this.items = results.length;
          })
          .finally(() => {
            console.log("Entra");
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  returnValues(event) {
    var numAux = 0;
    this.displayedList = [];
    this.lstUsersAux = [];
    this.selectedPage = event.detail.selectedPage;
    this.selectedValue = event.detail.selectedValue;
    if (!this.lstUsersFilters.length == 0) {
      for (let i = 0; i < this.selectedValue; i++) {
        if (this.lstUsersFilters[i] != null) {
          this.displayedList[numAux] = this.lstUsersFilters[i];
          numAux++;
        }
      }
    } else {
      for (let i = 0; i < this.selectedValue; i++) {
        if (this.lstUsers[i] != null) {
          this.displayedList[numAux] = this.lstUsers[i];
          numAux++;
        }
      }
    }
    this.lstUsersAux = this.displayedList;
    this.calculatePagination();
  }
  returnPage(event) {
    var numArray = 0;
    this.posFinal = this.selectedValue * event.detail.actualpage;
    this.posInicial = this.posFinal - this.selectedValue;
    this.displayedList = [];
    this.lstUsersAux = [];
    if (!this.lstUsersFilters.length == 0) {
      for (var i = this.posInicial; i < this.posFinal; i++) {
        if (this.lstUsersFilters[i] != null) {
          this.displayedList[numArray] = this.lstUsersFilters[i];
          numArray++;
        }
      }
    } else {
      for (var i = this.posInicial; i < this.posFinal; i++) {
        if (this.lstUsers[i] != null) {
          this.displayedList[numArray] = this.lstUsers[i];
          numArray++;
        }
      }
    }

    this.lstUsersAux = this.displayedList;
  }
  returnFiltros(event) {
    var numArray = 0;
    var isBusqueda = false;
    var isSelectedRole = false;
    var isSelectedStatus = false;
    this.displayedList = [];
    this.lstUsersAux = [];
    this.lstUsersFilters = [];
    if (
      event.detail.busqueda != null ||
      event.detail.selectedRole != null ||
      event.detail.selectedStatus != null
    ) {
      this.busqueda = event.detail.busqueda;

      for (var i = 0; i < this.lstUsers.length; i++) {
        isBusqueda = false;
        isSelectedRole = false;
        isSelectedStatus = false;
        if (
          (event.detail.busqueda != null &&
            this.lstUsers[i].name.includes(this.busqueda)) ||
          event.detail.busqueda == null
        ) {
          isBusqueda = true;
        }
        if (
          (event.detail.selectedRole != null &&
            this.lstUsers[i].role == event.detail.selectedRole) ||
          event.detail.selectedRole == null
        ) {
          isSelectedRole = true;
        }

        if (
          (event.detail.selectedStatus != null &&
            this.lstUsers[i].active == event.detail.selectedStatus) ||
          event.detail.selectedStatus == null
        ) {
          isSelectedStatus = true;
        }
        if (isBusqueda && isSelectedRole && isSelectedStatus) {
          this.lstUsersFilters[numArray] = this.lstUsers[i];
          numArray++;
        }
      }
      numArray = 0;
      if (!this.lstUsersFilters.length == 0) {
        for (var i = 0; i < this.selectedValue; i++) {
          if (this.lstUsersFilters[i] != null) {
            this.displayedList[numArray] = this.lstUsersFilters[i];
            numArray++;
          }
        }
      }
    } else {
      for (var i = 0; i < this.selectedValue; i++) {
        if (this.lstUsers[i] != null) {
          this.displayedList[numArray] = this.lstUsers[i];
          numArray++;
        }
      }
    }
    this.items = numArray;
    this.paginaActual = 1;
    this.paginaInicial = 1;
    this.lstUsersAux = this.displayedList;
    this.calculatePagination();
  }

  closeToast() {
    this.showtoast = false;
  }

  calculatePagination() {
    this.numPages = [];
    var pages;
    console.log(this.lstUsersAux.length);
    if (this.lstUsersAux.length == 0) {
      pages = 1;
    } else {
      if (!this.lstUsersFilters.length == 0) {
        pages = this.lstUsersFilters.length / this.selectedValue;
      } else {
        pages = this.lstUsers.length / this.selectedValue;
      }
    }

    for (var i = 0; i < pages; i++) {
      this.numPages[i] = i + 1;
      this.lastpage = i + 1;
    }
  }
  saveuserinfo(event) {
    this.showtoast = event.detail.showtoast;
    this.showtoastError = event.detail.showtoastError;
    this.msgtoast = event.detail.msgtoast;
    this.typetoast = event.detail.typetoast;
    this.tobehiddentoast = event.detail.tobehiddentoast;
    console.log(this.showtoast);
  }
  get checkWelcomeModal() {
    console.log(this.checkboxWelcomePack);
    if (this.checkboxWelcomePack == false && this.loading == false) {
      return false;
    } else {
      return true;
    }
  }

  goBack() {
    location.reload();
  }
}
