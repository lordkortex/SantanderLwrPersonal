import { LightningElement, track, api } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";

//Labels
import ExtractSearch_BookDate from "@salesforce/label/c.ExtractSearch_BookDate";
import valueDate from "@salesforce/label/c.valueDate";
import MovementHistory_Category from "@salesforce/label/c.MovementHistory_Category";
import MovementHistory_CustomerRef from "@salesforce/label/c.MovementHistory_CustomerRef";
import sortBy from "@salesforce/label/c.sortBy";
import MovementHistory_Amount from "@salesforce/label/c.MovementHistory_Amount";
import Book_Balance from "@salesforce/label/c.Book_Balance";
import Detail from "@salesforce/label/c.Detail";
import accountAndAlias from "@salesforce/label/c.accountAndAlias";
import Account_Transactions from "@salesforce/label/c.Account_Transactions";

export default class Lwc_account_TransactionsTable extends LightningElement {
  label = {
    ExtractSearch_BookDate,
    valueDate,
    MovementHistory_Category,
    MovementHistory_CustomerRef,
    sortBy,
    MovementHistory_Amount,
    Book_Balance,
    Detail,
    accountAndAlias,
    Account_Transactions
  };

  // ATTRIBUTES

  @api transactionresults;
  @api wholetransactionresults;
  @api accountdetails = {};
  @api sourcepage;
  @api loading;
  @api filters;
  @api formfilters;
  @api isendofday;
  @api accountsdata;
  @api accountcodetoinfo;
  @api accountcodestosearch;
  @api selectedtimeframe;
  @api dates;
  @api selectedfilters;
  @api userpreferreddateformat;
  @api userpreferrednumberformat;

  // _transactionresults;

  // ONE TRADE (IAM) ATTRIBUTES
  @api isiam;
  @api currentpagenumber;
  @api isfirstload;

  // PAGINATION ATTRIBUTES
  @track transactionsPerPage = 50;
  @track currentPage = 1;
  @track oldPage = 1;
  @track start = 0;
  @track end;
  @api maximumrecords = 0;
  @api paginatedtransactions;
  @api listofpages;

  // SORT FILTERS ATTRIBUTES
  @api sortbookdate;
  @api sortcategory;
  @api sortamount;

  @track isFirstTime = true;
  @track myVar = false;

  // get transactionresults(){
  //     return this._transactionresults;
  // }

  // set transactionresults(transactionresults){
  //     if(transactionresults){
  //         this._transactionresults = this.transactionresults;
  //         this.buildPagination();
  //     }
  // }

  get sourcePageEqualsGlobalBalance() {
    if (this.sourcepage) {
      return this.sourcepage == "globalBalance";
    } else {
      return false;
    }
  }

  get sortBookDateEqualsDesc() {
    if (this.sortbookdate) {
      return this.sortbookdate == "desc";
    } else {
      return false;
    }
  }

  get sortCategoryEqualsDesc() {
    if (this.sortcategory) {
      return this.sortcategory == "desc";
    } else {
      return false;
    }
  }

  get sortAmountEqualsDesc() {
    if (this.sortamount) {
      return this.sortamount == "desc";
    }
  }

  get transactionResultsLength() {
    return this.transactionresults.length;
  }

  get transactionresultsNotNull() {
    return (
      this.transactionresults == null ||
      this.transactionresults === "" ||
      !(this.transactionresults.length > 0)
    );
  }

  doBuildTablePage(event) {
    this.currentPage = event.detail.currentPage;
    this.buildTablePage(event);
  }

  connectedCallback() {
    console.log("renderedCallback");
    loadStyle(this, santanderStyle + "/style.css");
    //if(this.isFirstTime){
    //this.transactionresults = [{"obtTransacBusqueda":{"bookDate":"2020-11-12T00:00:00.000+0000","descripcion":"PAGO A PROVEED ACRED SANTANDER RIO","formattedBookDate":"12/11/2020","formattedValueDate":"12/11/2020","importe":-240,"importeDecimal":",00","importeEntero":"-240","importeString":"-240,00","ltcCode":"1858","ltcDescription":"PAGO A PROVEED ACRED SANTANDER RIO","moneda":"ARS","refBanco":"MOV-000000003","refCliente":"2020111206774199","tipoTransaccion":"TRF","transactionBatchReference":"2020111206774199","valueDate":"2020-11-12T00:00:00.000+0000"}},{"obtTransacBusqueda":{"bookDate":"2020-11-11T00:00:00.000+0000","descripcion":"PAGO A PROVEED ACRED SANTANDER RIO","formattedBookDate":"11/11/2020","formattedValueDate":"11/11/2020","importe":-240,"importeDecimal":",00","importeEntero":"-240","importeString":"-240,00","ltcCode":"1858","ltcDescription":"PAGO A PROVEED ACRED SANTANDER RIO","moneda":"ARS","refBanco":"MOV-000000004","refCliente":"2020111106774201","tipoTransaccion":"TRF","transactionBatchReference":"2020111106774201","valueDate":"2020-11-11T00:00:00.000+0000"}},{"obtTransacBusqueda":{"bookDate":"2020-10-28T00:00:00.000+0000","descripcion":"TRANSFERENCIA POR SISTEMA MEP","formattedBookDate":"28/10/2020","formattedValueDate":"28/10/2020","importe":-240,"importeDecimal":",00","importeEntero":"-240","importeString":"-240,00","ltcCode":"0444","ltcDescription":"TRANSFERENCIA POR SISTEMA MEP","moneda":"ARS","refBanco":"MOV-000000002","refCliente":"2020102806773116","tipoTransaccion":"TRF","transactionBatchReference":"2020102806773116","valueDate":"2020-10-28T00:00:00.000+0000"}}];
    this.paginationChange();
    //     this.isFirstTime = false;
    // }
  }

  //buildTablePage(currentPageAux){
  buildTablePage(event) {
    try {
      var json = this.transactionresults;
      //var currentPage = currentPageAux.currentPage;
      var currentPage = event.detail.currentPage;
      var oldPage = this.oldPage;
      var perPage = this.transactionsPerPage;
      var start = this.start;

      if (
        currentPage != null &&
        currentPage != undefined &&
        currentPage != "" &&
        oldPage != currentPage
      ) {
        //Update the index of dataset to display
        if (currentPage > oldPage && currentPage != 1) {
          this.start = perPage * currentPage - perPage;
          if (Math.ceil(json.length / currentPage) >= perPage) {
            this.end = perPage * currentPage;
          } else {
            this.end = json.length;
          }
        } else {
          this.end = start;
          if (currentPage == 1) {
            this.start = 0;
            this.end = perPage;
          } else {
            this.start = start - perPage;
          }
        }
        this.oldPage = currentPage;

        //Update a set of the paginated data
        var paginatedValues = json.slice(this.start, this.end + 1);

        // for(var i = this.start;i<=this.end;i++){
        //     paginatedValues.push(json[i]);
        // }

        this.paginatedtransactions = paginatedValues;
      }
    } catch (e) {
      console.error(e);
    }
  }

  paginationChange() {
    this.buildPagination();
  }

  sortBy(event) {
    try {
      //Retrieve the field to sort by
      if (event.target.dataset.id) {
        //var sortEvent = component.getEvent("sortColumn");
        var sortItem = event.target.dataset.sort;

        const sortevent = new CustomEvent("sortcolumn", {
          detail: {
            column: event.target.dataset.id,
            sortItem: sortItem
          }
        });

        this.dispatchEvent(sortevent);
      }
    } catch (e) {
      console.error(e);
    }
  }

  navigateToExtractDetail(event) {
    // This component is accessible from the "Account Transactions" screen
    // and the "Transaction Search" screen. Hence we need to adapt the url depending
    // on the source screen
    var transactionRow = this.transactionresults[
      event.currentTarget.dataset.id
    ];

    if (this.sourcepage == "globalBalance") {
      var url =
        "c__accountNumber=" +
        this.accountdetails.accountNumber +
        "&c__valueDate=" +
        transactionRow.obtTransacBusqueda.formattedValueDate +
        "&c__clientRef=" +
        transactionRow.obtTransacBusqueda.refCliente +
        "&c__bankRef=" +
        transactionRow.obtTransacBusqueda.refBanco +
        "&c__bookDate=" +
        transactionRow.obtTransacBusqueda.formattedBookDate +
        "&c__category=" +
        transactionRow.obtTransacBusqueda.tipoTransaccion +
        "&c__amount=" +
        transactionRow.obtTransacBusqueda.importe +
        "&c__bank=" +
        this.accountdetails.bank +
        "&c__alias=" +
        transactionRow.obtTransacBusqueda.aliasCuentaPerfilado +
        "&c__description=" +
        transactionRow.obtTransacBusqueda.descripcion +
        "&c__accountCode=" +
        this.accountdetails.accountCode +
        "&c__source=" +
        this.sourcepage +
        "&c__lastUpdate=" +
        !this.isendofday +
        "&c__subsidiaryName=" +
        this.accountdetails.accountName +
        "&c__mainAmount=" +
        this.accountdetails.bookBalance +
        "&c__availableAmount=" +
        this.accountdetails.availableBalance +
        "&c__currentCurrency=" +
        transactionRow.obtTransacBusqueda.moneda +
        "&c__country=" +
        this.accountdetails.country +
        "&c__countryName=" +
        this.accountdetails.countryName +
        "&c__aliasBank=" +
        transactionRow.obtTransacBusqueda.aliasEntidad +
        "&c__accountsData=" +
        JSON.stringify(this.accountsdata) +
        "&c__codigoBic=" +
        this.accountdetails.finalCodigoBic +
        "&c__selectedFilters=" +
        JSON.stringify(this.selectedfilters) +
        "&c__isIAM=" +
        this.isiam +
        "&c__accountStatus=" +
        this.accountdetails.status +
        "&c__localTransactionCode=" +
        transactionRow.obtTransacBusqueda.ltcCode +
        "&c__localTransactionDescription=" +
        transactionRow.obtTransacBusqueda.ltcDescription +
        "&c__transactionBatchReference=" +
        transactionRow.obtTransacBusqueda.transactionBatchReference +
        "&c__dates=" +
        JSON.stringify(this.dates) +
        "&c__bic=" +
        this.accountdetails.bic;
    } else {
      var url =
        "c__accountNumber=" +
        transactionRow.obtTransacBusqueda.cuentaExtracto +
        "&c__valueDate=" +
        transactionRow.obtTransacBusqueda.formattedValueDate +
        "&c__clientRef=" +
        transactionRow.obtTransacBusqueda.refCliente +
        "&c__bankRef=" +
        transactionRow.obtTransacBusqueda.refBanco +
        "&c__bookDate=" +
        transactionRow.obtTransacBusqueda.formattedBookDate +
        "&c__category=" +
        transactionRow.obtTransacBusqueda.tipoTransaccion +
        "&c__amount=" +
        transactionRow.obtTransacBusqueda.importe +
        "&c__currentCurrency=" +
        transactionRow.obtTransacBusqueda.moneda +
        "&c__bank=" +
        transactionRow.obtTransacBusqueda.nombreEntidad +
        "&c__alias=" +
        transactionRow.obtTransacBusqueda.aliasCuentaPerfilado +
        "&c__description=" +
        transactionRow.obtTransacBusqueda.descripcion +
        "&c__source=" +
        this.sourcepage +
        "&c__lastUpdate=" +
        !this.isendofday +
        "&c__accountsData=" +
        JSON.stringify(this.accountsdata) +
        "&c__accountCodeToInfo=" +
        JSON.stringify(this.accountcodetoinfo) +
        "&c__selectedTimeframe=" +
        this.selectedtimeframe +
        "&c__dates=" +
        JSON.stringify(this.dates) +
        "&c__selectedFilters=" +
        JSON.stringify(this.selectedfilters) +
        "&c__accountCodes=" +
        JSON.stringify(this.accountcodestosearch) +
        "&c__accountStatus=" +
        this.accountdetails.status +
        "&c__localTransactionCode=" +
        transactionRow.obtTransacBusqueda.ltcCode +
        "&c__localTransactionDescription=" +
        transactionRow.obtTransacBusqueda.ltcDescription +
        "&c__transactionBatchReference=" +
        transactionRow.obtTransacBusqueda.transactionBatchReference;

      let accountList = this.accountsdata.accountList;
      for (var acc in accountList) {
        if (
          accountList[acc].displayNumber.trim() ==
          transactionRow.obtTransacBusqueda.cuentaExtracto
        ) {
          url += "&c__accountStatus=" + accountList[acc].status;
          break;
        }
      }
    }

    url += "&c__filters=" + JSON.stringify(this.filters);
    url += "&c__formFilters=" + JSON.stringify(this.formfilters);

    //this.template.querySelector("c-lwc_service-component").redirect("transaction-detail-view",url);
    this.template.querySelector("c-lwc_service-component").redirect({
      page: "transaction-detail-view",
      urlParams: url
    });
  }

  buildPagination() {
    // Build pagination
    var end;
    var response = this.transactionresults;

    if (response.length < this.transactionsPerPage) {
      end = response.length;
    } else {
      end = this.transactionsPerPage;
    }

    this.end = end;

    var paginatedValues = response.slice(this.start, this.end + 1);

    // for(var i= this.start;i<=this.end;i++){
    // 	paginatedValues[i-this.start] = response[i];
    // }

    this.paginatedtransactions = paginatedValues;

    var toDisplay = [];
    var finish = response.length;

    if (response.length > 1000) {
      //Max logs to retrieve
      finish = 1000;
    }

    // for(var i= 0;i<finish;i++){
    // 	toDisplay[i] = response[i];
    // }
    //component.find("pagination").initPagination(toDisplay);
    //Se llama a init y a su vez esta en LWC llama a setPagesNumber
    //this.template.querySelector("c-lwc_cn_pagination").setPagesNumber(toDisplay);
  }

  get iterationTransactionResults() {
    if (this.transactionresults) {
      /*var retaux = this.pageList.slice(this.currentPageInt-1,this.end + 1);
            var ret = [retaux[0],retaux[1],retaux[2],'...',retaux[this.end-1]];
            return ret;*/
      /*Desarrollo original pre-migración*/
      var items = new Array();
      var aux = JSON.parse(
        JSON.stringify(this.transactionresults.slice(this.start, this.end + 1))
      );
      for (var i = 0; i < aux.length; i++) {
        var item = new Object();
        aux[i].obtTransacBusqueda.importeDecimalMoneda =
          aux[i].obtTransacBusqueda.importeDecimal +
          " " +
          aux[i].obtTransacBusqueda.moneda;
        item.value = aux[i];
        item.id = i;
        item.index = (this.currentPage - 1) * this.transactionsPerPage + i;
        item.showfirstpoints = false;
        item.showlastpoints = false;
        if (i == this.start) {
          item.show = true;
        } else if (i == this.end - 1) {
          item.show = true;
        } else if (i == this.start + 1 && this.currentPage == this.start + 2) {
          item.show = true;
        } else if (i >= this.end - 3 && this.currentPage >= this.end - 3) {
          if (i == this.end - 3 && this.currentPage > this.end - 3) {
            item.showfirstpoints = true;
            item.showlastpoints = false;
          }
          item.show = true;
        } else if (i >= this.currentPage - 1 && i <= this.currentPage + 1) {
          item.show = true;
          if (i == this.currentPage - 1 && this.currentPage <= this.end - 3) {
            item.showfirstpoints = true;
          } else if (i == this.currentPageInt + 1) {
            item.showlastpoints = true;
          }
        }
        if (i === this.currentPage - 1) {
          item.iscurrerntpage = true;
        } else {
          item.iscurrerntpage = false;
        }
        items.push(item);
      }
      return items;
    }
  }
}
