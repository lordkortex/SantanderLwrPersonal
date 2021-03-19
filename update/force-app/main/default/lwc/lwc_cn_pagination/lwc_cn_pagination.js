import { LightningElement, api, track } from "lwc";

//Labels
import Account_Transactions from "@salesforce/label/c.Account_Transactions";
import Movements from "@salesforce/label/c.Movements";
import viewing from "@salesforce/label/c.viewing";
import toMinus from "@salesforce/label/c.toMinus";
import of from "@salesforce/label/c.of";
import more_than from "@salesforce/label/c.more_than";
import nextPage from "@salesforce/label/c.nextPage";

//Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

export default class Lwc_cn_pagination extends LightningElement {
  label = {
    Account_Transactions,
    Movements,
    viewing,
    toMinus,
    of,
    more_than,
    nextPage
  };

  @api alldata; //Quitar inicialización tras pruebas
  @api paymentsperpage; //Quitar tras pruebas
  @api namelisttodisplay; //Quitar inicialización tras pruebas
  @api pagelist = ["1"]; //Dejar el '1' tras las pruebas
  @api maximumrecords = 0; //Dejar 0 tras pruebas
  @api isiam = false;
  @api todisplay;

  currentPage = "1"; //Cambiar a 1 tras tras pruebas
  _currentPage;

  @track currentPageInt = 1;
  @track isFirstLoad = true;
  @track start = 0;
  @track end; //Quitar tras pruebas
  @track pagesToShow = 3;
  @track totalRetrieved = 0; //Dejar inicializado a 0
  @track retrievedSeen;
  @track setCurrentPageNumber = false;
  dropdownCurrentPage = 1;
  _dropdownCurrentPage;

  get dropdownCurrentPage() {
    return this._dropdownCurrentPage;
  }

  set dropdownCurrentPage(dropdownCurrentPage) {
    if (dropdownCurrentPage) {
      this._dropdownCurrentPage = this.dropdownCurrentPage;
      this.selectedCurrentPage();
    }
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(currentPage) {
    if (currentPage) {
      this._currentPage = this.currentPage;
      this.buildData(this._currentPage);
    }
  }

  get pageListLength() {
    if (this.pagelist) {
      return this.currentPage < this.pagelist.length;
    }
  }

  get getpageListLength() {
    if (this.pagelist) {
      return this.pagelist.length;
    }
  }

  get lastPage() {
    if (this.pagelist) {
      return (
        this.pagelist.length - 2 >= this.currentPage &&
        this.pagelist.length - 2 >= this.end
      );
    }
  }

  get currentPageGreater4() {
    return this.currentPage > 4;
  }

  get currentPageGreater1() {
    return this.currentPage > 1;
  }

  /*
   */
  get currentPageGreater2() {
    return this.currentPage > 2;
  }

  /*
   */
  get getPage() {
    if (this.pagelist) {
      return (
        (this.pagelist.length > this.currentPage + this.pagesToShow - 1 ||
          this.currentPage == this.end) &&
        this.currentPage != this.pagelist.length
      );
    }
  }

  get pageListLengthGreaterThan() {
    if (this.pagelist) {
      return (
        this.pagelist.length > this.pagesToShow &&
        this.currentPage > 1 &&
        this.start != 0
      );
    }
  }

  get retrievedGreater100000() {
    return (
      (this.namelisttodisplay == this.label.Account_Transactions ||
        this.namelisttodisplay == this.label.Movements) &&
      this.totalRetrieved > 10000
    );
  }

  get getTotalRetrieved() {
    return this.currentPage * this.paymentsperpage > this.totalRetrieved;
  }

  get getCurrentPageminusbyPayments() {
    return 1 + (this.currentPage - 1) * this.paymentsperpage;
  }

  get getCurrentPagebyPayments() {
    return this.currentPage * this.paymentsperpage;
  }

  // get getcheckAllData(){
  //     return (this.alldata == null || this.alldata === '' || !(this.alldata.length > 0));
  // }

  get iterationPageList() {
    if (this.pagelist) {
      /*var retaux = this.pageList.slice(this.currentPageInt-1,this.end + 1);
            var ret = [retaux[0],retaux[1],retaux[2],'...',retaux[this.end-1]];
            return ret;*/
      /*Desarrollo original pre-migración*/
      var items = new Array();
      var aux = this.pagelist.slice(this.start, this.end + 1);
      for (var i = 0; i < aux.length; i++) {
        var item = new Object();
        item.value = aux[i];
        item.showfirstpoints = false;
        item.showlastpoints = false;
        if (i == this.start) {
          item.show = true;
        } else if (i == this.end - 1) {
          item.show = true;
        } else if (
          i == this.start + 1 &&
          this.currentPageInt == this.start + 2
        ) {
          item.show = true;
        } else if (i >= this.end - 3 && this.currentPageInt >= this.end - 3) {
          if (i == this.end - 3 && this.currentPageInt > this.end - 3) {
            item.showfirstpoints = true;
            item.showlastpoints = false;
          }
          item.show = true;
        } else if (
          i >= this.currentPageInt - 1 &&
          i <= this.currentPageInt + 1
        ) {
          item.show = true;
          if (
            i == this.currentPageInt - 1 &&
            this.currentPageInt <= this.end - 3
          ) {
            item.showfirstpoints = true;
          } else if (i == this.currentPageInt + 1) {
            item.showlastpoints = true;
          }
        }
        if (i === this.currentPageInt - 1) {
          item.iscurrerntpage = true;
        } else {
          item.iscurrerntpage = false;
        }
        items.push(item);
      }
      return items;
    }
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    console.log("connectdCallback");
    this.setPagesNumber(this.todisplay);
  }

  @api
  buildData(currentPageAux) {
    var currentPage;
    try {
      if (currentPageAux != undefined) {
        currentPage = currentPageAux.currentPageAux;
        this.currentPage = currentPage.toString();
        this.currentPageInt = currentPageAux.currentPageAux;
      } else {
        currentPage = this.currentPage;
      }

      this.currentPageInt = parseInt(this.currentPage);

      //Configure the number of records displayed per page
      if (this.totalRetrieved <= this.paymentsperpage) {
        this.retrievedSeen = this.totalRetrieved;
      } else if (parseInt(this.currentPage) != this.pagelist.length) {
        this.retrievedSeen = this.paymentsperpage;
      } else {
        this.retrievedSeen =
          (this.totalRetrieved - this.paymentsperpage) * (this.currentPage - 1);
      }

      //Call the event to send the current page number to the SwiftPaymentTable CMP
      const getpageevent = new CustomEvent("getpageevent", {
        detail: { filter: this.currentPage }
      });
      this.dispatchEvent(getpageevent);
    } catch (e) {
      console.error(e);
    }
  }

  @api
  reInitPagination(currentPageAux) {
    try {
      var currentPage = this.currentPage;
      var currentPageInitial = this.currentPage;

      if (currentPageAux != undefined) {
        currentPage = currentPageAux;
      }
      this.currentPage = currentPage;
    } catch (e) {
      console.error(e);
    }
  }

  previousPage() {
    try {
      var currentPage = parseInt(this.currentPage);
      var pages = this.pagelist.length;

      if (this.pagesToShow != pages) {
        var start = this.start;
        var end = this.end;
        if (start > 0) {
          this.start = start - 1;
          this.end = end - 1;
        }
      }

      if (currentPage > 1) {
        this.currentPage = (currentPage - 1).toString();
      }
      this.currentPageInt = parseInt(this.currentPage);
      //Call the event to send the current page number to the SwiftPaymentTable CMP
      const currentpage = new CustomEvent("currentpage", {
        detail: {
          start: this.start,
          end: this.end,
          currentPage: this.currentPage
        }
      });
      this.dispatchEvent(currentpage);
    } catch (e) {
      console.error(e);
    }
  }

  nextPage() {
    try {
      let currentPage = parseInt(this.currentPage);
      let pages = this.pagelist.length;

      if (this.pagesToShow != pages) {
        var start = this.start;
        var end = this.end;
        if (end != pages) {
          this.start = start + 1;
          this.end = end + 1;
        }
      }

      //Set the new pages index
      if (currentPage < pages) {
        this.currentPage = (currentPage + 1).toString();
      }

      var start = this.start;
      var end = this.end;
      this.currentPageInt = parseInt(this.currentPage);
      //Call the event to send the current page number to the SwiftPaymentTable CMP
      const currentpage = new CustomEvent("currentpage", {
        detail: {
          start: this.start,
          end: this.end,
          currentPage: this.currentPage
        }
      });
      this.dispatchEvent(currentpage);
    } catch (e) {
      console.error(e);
    }
  }

  selectedCurrentPage() {
    try {
      var recId = this._dropdownCurrentPage;
      if (recId != undefined) {
        currentPage = this.recId;
        let pages = this.pagelist.length;

        if (this.pagesToShow != pages) {
          if (parseInt(recId) != pages) {
            if (parseInt(recId) >= pages - this.pagesToShow + 1) {
              this.start = pages - this.pagesToShow + 1 - 1;
              this.end = pages;
            } else {
              this.start = parseInt(recId) - 1;
              this.end = parseInt(recId) + 2;
            }
          } else {
            this.start = parseInt(recId) - this.pagesToShow;
            this.end = parseInt(recId);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  @api
  setPagesNumber(inputData) {
    try {
      var totalPages = inputData;
      var oldCurrentPage = this.currentPage;
      var oldCurrentPageInt = this.currentPageInt;

      if (totalPages != null && totalPages != "" && totalPages != undefined) {
        if (this.maximumrecords == 0) {
          this.totalRetrieved = totalPages; //.length;
        } else {
          this.totalRetrieved = this.maximumrecords;
        }
        var pagelist = [];
        var pages = Math.ceil(totalPages / this.paymentsperpage);
        if (pages > 1) {
          for (var i = 1; i <= pages; i++) {
            pagelist.push(i.toString());
          }
        } else {
          pagelist.push("1");
        }
        //Obtain the number of pages
        this.pagelist = pagelist;

        //Set the index of pages to display
        if (pages <= this.pagesToShow) {
          this.end = this.pagesToShow;
        } else {
          this.end = pages;
        }

        //Configure the number of records displayed per page
        if (this.totalRetrieved <= this.paymentsperpage) {
          this.retrievedSeen = this.totalRetrieved;
        } else if (parseInt(this.currentPage != this.pagelist.length)) {
          this.retrievedSeen = this.paymentsperpage;
        } else {
          this.retrievedSeen =
            this.totalRetrieved -
            this.paymentsperpage * (parseInt(this.currentPage) - 1);
        }

        if (this.isiam) {
          if (this.isFirstLoad) {
            this.currentPage = "1";
            this.currentPageInt = 1;
            this.isFirstLoad = false;
          } else {
            if (oldCurrentPageInt <= pages) {
              this.dropdownCurrentPage = (oldCurrentPageInt - 1).toString();
              this.currentPage = null;
              this.currentPage = (oldCurrentPageInt - 1).toString();
              this.currentPageInt = oldCurrentPageInt - 1;
              this.nextPage();
            }
          }
        } else {
          if (!this.setCurrentPageNumber) {
            this.currentPage = "1";
            this.currentPageInt = 1;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
