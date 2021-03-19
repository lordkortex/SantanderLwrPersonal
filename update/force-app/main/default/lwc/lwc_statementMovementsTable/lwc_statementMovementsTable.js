import { LightningElement, api, track } from "lwc";
//Labels
import Movements from "@salesforce/label/c.Movements";
import MovementHistory_ValueDate from "@salesforce/label/c.MovementHistory_ValueDate";
import MovementHistory_Category from "@salesforce/label/c.MovementHistory_Category";
import MovementHistory_CustomerRef from "@salesforce/label/c.MovementHistory_CustomerRef";
import amount from "@salesforce/label/c.amount";
import actions from "@salesforce/label/c.actions";
import noResultsFound from "@salesforce/label/c.noResultsFound";
import Detail from "@salesforce/label/c.Detail";

//Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

export default class Lwc_statementMovementsTable extends LightningElement {
  label = {
    Movements,
    MovementHistory_ValueDate,
    MovementHistory_Category,
    MovementHistory_CustomerRef,
    amount,
    actions,
    noResultsFound,
    Detail
  };

  //Global information
  @track userInfo = {}; //description="Contains the user info"
  @api accountinfo = {}; //description="Contains the data of the account"
  @track sortbycategory = "desc"; //description="Contains the order of the client ref"
  @track sortbyamount = "desc"; //description="Contains the order of the category"
  //Table data
  @api movementslist; //description="Contains the list of movements"
  _movementslist = [];
  @api totalmovements; //description="Contains the total movements"

  //Pagination attributes
  @track transactionsPerPage = 50; //description="Number of logs to show in each page of the table"
  @track currentPage = 1;
  @track oldPage = 1;
  @track start = 0; //description="Row number of the first displayed row"
  @track end; //description="Row number of the last displayed row"
  @track paginatedTransactions;
  @track toDisplay;

  get movementslist() {
    return this._movementslist;
  }

  set movementslist(movementslist) {
    if (movementslist != undefined) {
      this._movementslist = movementslist;
    }
  }

  get getSortByCategoryDesc() {
    return this.sortbycategory == "desc";
  }

  get getSortByCategoryAsc() {
    return this.sortbycategory == "asc";
  }

  get getSortByAmountDesc() {
    return this.sortbyamount == "desc";
  }

  get getSortByAmountAsc() {
    return this.sortbyamount == "asc";
  }

  get isMovemntsListEmpty() {
    return this.movementslist == "" || this.movementslist == undefined;
  }

  get isMovemntsListEmpty2() {
    return this.movementslist == "";
  }

  get getAccountCurrency() {
    return this.accountinfo.accountCurrency;
  }

  get listaBetweenStartToEnd() {
    var listaAux = this.movementslist.slice(this.start, this.end);
    return listaAux;
  }

  get movementslistNotNull() {
    return (
      this.movementslist == null ||
      this.movementslist === "" ||
      !(this.movementslist.length > 0)
    );
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    this.paginationChange();
  }

  buildTablePage(event) {
    try {
      var json = this.movementslist;
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
        var paginatedValues = [];
        for (var i = this.start; i <= this.end; i++) {
          paginatedValues.push(json[i]);
        }

        this.paginatedTransactions = paginatedValues;
      }
    } catch (e) {
      console.error(e);
    }
  }

  paginationChange() {
    this.buildPagination();
  }

  navigateToDetail(event) {
    var actualMovement = this.movementslist[event.currentTarget.id]
      .obtTransacBusqueda;
    var account = this.accountinfo;
    console.log(JSON.stringify(actualMovement));

    var url =
      "c__acountCode=" +
      account.accountCode +
      "&c__acountName=" +
      account.accountName +
      "&c__bankName=" +
      account.bankName +
      "&c__subsidiaryName=" +
      account.subsidiaryName +
      "&c__accountNumber=" +
      account.accountNumber +
      "&c__accountCurrency=" +
      account.accountCurrency +
      "&c__movementValueDate=" +
      actualMovement.valueDate +
      "&c__movementCategory=" +
      actualMovement.tipoTransaccion +
      "&c__movementClientRef=" +
      actualMovement.refCliente +
      "&c__movementAmount=" +
      actualMovement.importe +
      "&c__movementBookDate=" +
      actualMovement.valueDate +
      "&c__movementBankRef=" +
      actualMovement.refBanco +
      "&c__movementDescription=" +
      actualMovement.descripcion;
    console.log(url);
    // component.find("Service").redirect("movement-detail", url);
    this.template.querySelector("c-lwc_service-component").redirect({
      page: "movement-detail",
      urlParams: url
    });
  }

  sortBy(event) {
    var elementId = event.currentTarget.id.split("-")[0];
    var data = JSON.parse(JSON.stringify(this.movementslist));
    let sort;
    switch (elementId) {
      case "CategoryDesc":
        this.sortbycategory = "asc";
        sort = data.sort((a, b) =>
          ("" + a.obtTransacBusqueda.tipoTransaccion).localeCompare(
            b.obtTransacBusqueda.tipoTransaccion
          )
        );
        break;
      case "CategoryAsc":
        this.sortbycategory = "desc";
        sort = data.sort((a, b) =>
          ("" + b.obtTransacBusqueda.tipoTransaccion).localeCompare(
            a.obtTransacBusqueda.tipoTransaccion
          )
        );
        break;
      case "AmountDesc":
        this.sortbyamount = "asc";
        sort = data.sort(
          (a, b) =>
            parseFloat(b.obtTransacBusqueda.importe) -
            parseFloat(a.obtTransacBusqueda.importe)
        );
        break;
      case "AmountAsc":
        this.sortbyamount = "desc";
        sort = data.sort(
          (a, b) =>
            parseFloat(a.obtTransacBusqueda.importe) -
            parseFloat(b.obtTransacBusqueda.importe)
        );
        break;
    }
    console.log(sort);
    this.movementslist = sort;
  }

  buildPagination() {
    // Build pagination
    var end;
    var response = this.movementslist;

    if (response.length < this.transactionsPerPage) {
      end = response.length;
    } else {
      end = this.transactionsPerPage;
    }

    this.end = end;

    var paginatedValues = [];

    for (var i = this.start; i <= this.end; i++) {
      paginatedValues.push(response[i]);
    }

    this.paginatedTransactions = paginatedValues;

    var toDisplay = [];
    var finish = response.length;

    if (response.length > 1000) {
      //Max logs to retrieve
      finish = 1000;
    }

    for (var i = 0; i < finish; i++) {
      toDisplay.push(response[i]);
    }
    // component.find("pagination").initPagination(toDisplay);
    // this.template.querySelector("c-lwc_cn_pagination").setPagesNumber(toDisplay);
    this.toDisplay = toDisplay.length;
  }
}
