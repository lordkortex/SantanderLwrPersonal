import { LightningElement, api, track } from "lwc";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
// Import styles
import santanderStyle from "@salesforce/resourceUrl/Lwc_Santander_Icons";
// Labels
import Country from "@salesforce/label/c.Country";
import GlobalPosition from "@salesforce/label/c.GlobalPosition";
import Accounts from "@salesforce/label/c.Accounts";
import Accounts_Updated from "@salesforce/label/c.Accounts_Updated";
import LastUpdate from "@salesforce/label/c.LastUpdate";
import EndOfDay from "@salesforce/label/c.EndOfDay";
import currency from "@salesforce/label/c.currency";
import selectOne from "@salesforce/label/c.selectOne";
import ConsolidationCurrency from "@salesforce/label/c.ConsolidationCurrency";

// apex
import exchangeCurrency from "@salesforce/apex/CNT_CurrencyExchange.exchangeCurrency";
import getCurrenciesList from "@salesforce/apex/CNT_CurrencyExchange.getCurrenciesList";

export default class Lwc_accountsTitleDropdown extends LightningElement {
  label = {
    Country,
    GlobalPosition,
    Accounts,
    Accounts_Updated,
    LastUpdate,
    EndOfDay,
    currency,
    selectOne,
    ConsolidationCurrency
  };

  @track currencies; //" type="List" default="" description="List of values to populate the dropdown" />
  @api selectedcurrency; //" type="String" description="Selected option from the dropdown" />
  @api helptextdropdown = "Show More"; //" type="String" default="Show More" description="Dropdown help text" />
  @api islastupdate; //" type="Boolean" default="true"/>
  @api accountcurrencies = []; //" type="List" description="A list of the users account currencies"/>
  @track upToDate = "N/A"; //" type="String" default="N/A" description="Updating date of conversion rates in salesforce"/>
  @track upToHour = "N/A"; //" type="String" default="N/A" description="Updating date of conversion rates in salesforce"/>
  @api iscashnexus; //" type="Boolean" default="true" description="True if current user is a Cash Nexus user, else, false"/>
  @track isocodelist; //" type="List" description="A list of available Currency Iso Codes for current logged user"/>
  @track corporateCurrency; //" type="Object" description="Corporate currency"/>
  @track currencyList; //" type="List" description="List of currencies available for current logged user"/>
  @api firenavigationevent = false; //" type="Boolean" default="false" description="Flag to make the component fire an event on breadcrumb click"/>
  @api source; //" type="String" description="Indicates the source screen, to display the breadcrumbs accordingly"/>
  @track iAccount; //" type="Object" description="Account information"/>
  @api thistest; //[{ label: 'EUR', value: 'EUR' },{ label: 'USD', value: 'USD' },{ label: 'BRL', value: 'BRL' }];                                   //" type="List"/>
  @api selectedtimeframe = this.label.Country; //" type="String" default="{!$Label.c.Country}" description="Default selected groupby for the dropdown"/>
  @api accountlastupdate; //" type="String" description="Last update of account list"/>
  @track upToDateAux = "N/A"; //" type="String" default="N/A" description="Updating date of conversion rates in salesforce"/>
  @track upToHourAux = "N/A"; //" type="String" default="N/A" description="Updating date of conversion rates in salesforce"/>
  @api userpreferreddateformat; //" type="String" description="User preferred time format"/>
  @track userPreferredNumberFormat; //" type="String" description="User preferred number format"/>
  @track currentcurrency; //" type="Object" description="Selected currency"/>
  @track exchangeratevalor;
  @track tipodecambiolist;
  @track dropdownEnabled = true;
  @track dropdownDisabled = false;
  _islastupdate;
  _isocodelist;
  _thistest;
  _selectedcurrency;
  _corporateCurrency;
  _currentcurrency;
  _currencyList;

  get mostrarCashNexus() {
    var cn = this.iscashnexus;
    return cn;
  }

  get currencyList() {
    return this._currencyList;
  }

  set currencyList(currencyList) {
    this._currencyList = currencyList;
  }

  get currentcurrency() {
    return this._currentcurrency;
  }

  set currentcurrency(currentcurrency) {
    this._currentcurrency = currentcurrency;
  }

  get isocodelist() {
    return this._isocodelist;
  }

  set isocodelist(isocodelist) {
    this._isocodelist = isocodelist;
  }

  get corporateCurrency() {
    return this._corporateCurrency;
  }

  set corporateCurrency(corporateCurrency) {
    this._corporateCurrency = corporateCurrency;
  }

  get selectedcurrency() {
    return this._selectedcurrency;
  }

  set selectedcurrency(selectedcurrency) {
    this._selectedcurrency = selectedcurrency;
  }

  get thistest() {
    return this._thistest;
  }

  set thistest(thistest) {
    this._thistest = thistest;
  }
  get islastupdate() {
    return this._islastupdate;
  }

  set islastupdate(islastupdate) {
    this._islastupdate = islastupdate;
  }

  get isHome() {
    return this.source == "home";
  }

  get class1() {
    return this.islastupdate ? "slds-pill slds-pill__active" : "slds-pill";
  }

  get class2() {
    return this.islastupdate ? "slds-pill" : "slds-pill slds-pill__active";
  }

  get isSelectedTime() {
    return (
      this.selectedtimeframe == this.label.currency ||
      this.accountcurrencies == ""
    );
  }

  connectedCallback() {
    loadStyle(this, santanderStyle + "/style.css");
    var userCurrency = this.selectedcurrency;
    var accountCurrency = this.accountcurrencies;
    this._isocodelist = accountCurrency;
    this._thistest = accountCurrency;
    this._selectedcurrency = userCurrency;
    this.dropdownEnabled = true;
    this.dropdownDisabled = false;
  }

  @api
  setTimeframe(p) {
    console.log("llamando lwc_cn_dropdown: " + p);
    var a = [];
    a.push(p);
    console.log("llamando lwc_cn_dropdown: " + a);
    this.template.querySelector("c-lwc_cn_dropdown").handleSelection(a);
  }
  goBack() {
    window.history.back();
  }

  selectCurrencyDropDown(event) {
    if (event.detail != "") {
      this._currentcurrency = event.detail[0];
      this.selectCurrencyHelp(this._currentcurrency);
    }
  }

  // Metodo para devolver la moneda selecciona en el desplegable lwc_cn_dropdown
  selectCurrencyHelp(iCurrency) {
    if (iCurrency != "") {
      const curExEvent = new CustomEvent("currencyexchanger", {
        detail: iCurrency
      });
      this.dispatchEvent(curExEvent);
    }
  }

  /* selectCurrency(event){   
        if(event){
            if(event.getName() == "dropdownExchangeCurrency"){
                var aux = event.getParam("selectedValues");       
     	        this.selectCurrencyHelp(aux[0]);
            } else {
                var aux = event.getParam("arguments");
                this.selectCurrencyHelp(aux.currencyIsoCode);
            }
        }
    }*/

  //Este metodo no se usa en este componente, devuelve un mapa con , creo, moneda y tipo de cambio
  exchangeCurrency(currentCurrency, currencyList) {
    exchangeCurrency({
      currencyList: currencyList,
      selectedCurrency: currentCurrency
    })
      .then((response) => {
        var iReturn = response;
        var mapa = new Map();
        for (var key in iReturn) {
          if (key == this._currentcurrency) {
            this.exchangeratevalor = iReturn[key];
          }
          mapa.set(key, iReturn[key]);
        }

        this.tipodecambiolist = mapa;
      })
      .catch((error) => {
        if (error) {
          console.log(
            "AccountTitleDropDown exchangeCurrency Error message: " + error
          );
        } else {
          console.log("AccountTitleDropDown exchangeCurrency Unknown error");
        }
      });

    if (this.exchangeratevalor != "") {
      const exval = new CustomEvent("exchangeCurrency", {
        detail: this.tipodecambiolist
      });
      this.dispatchEvent(exval);
    }
  }

  LastUpdateTab() {
    if (!this._islastupdate) {
      this._islastupdate = true;
      const tabevent = new CustomEvent("accountsab", {
        //detail : this.label.LastUpdate
        detail: "LastUpdateTab"
      });
      this.dispatchEvent(tabevent);
    }
  }

  EndOfDayTab() {
    if (this._islastupdate) {
      this._islastupdate = false;
      const tabevent = new CustomEvent("accountsab", {
        //detail : this.label.EndOfDay
        detail: "EndOfDayTab"
      });
      this.dispatchEvent(tabevent);
    }
  }

  // método que se invoca desde el padre de todos
  @api
  calculateLatestDate(isLastUpdate, accountsInfo, theUpdate, theUpdateMain) {
    if (isLastUpdate) {
      var accountsInfo = accountsInfo;
      var isLastUpdate = isLastUpdate;
      var theDate = theUpdate;
      var theDateMain = theUpdateMain;
      var iDates = [];
      for (var acc in accountsInfo) {
        if (
          accountsInfo[acc].lastUpdateAvailableBalance != undefined &&
          accountsInfo[acc].lastUpdateAvailableBalance != ""
        ) {
          iDates.push(accountsInfo[acc].lastUpdateAvailableBalance);
        }
      }
      if (iDates.length > 0) {
        this.getDateOfUpdate(iDates, isLastUpdate, theDate, theDateMain);
      }
    }
  }

  getDateOfUpdate(iDates, isLastUpdate, theUpdate, theUpdateMain) {
    if (
      theUpdate == null &&
      theUpdate == "" &&
      theUpdate == undefined &&
      theUpdateMain == null &&
      theUpdateMain == "" &&
      theUpdateMain == undefined
    ) {
      var datesArray = [];
      for (var d in iDates) {
        datesArray.push(Date.parse(iDates[d]));
      }

      var maximumDate = new Date(
        Math.max.apply(null, datesArray)
      ).toISOString();
      this.upToDate = maximumDate;
      if (isLastUpdate) {
        this.upToHour = maximumDate.split("T")[1].substring(0, 5);
      } else {
        this.upToHour = "";
      }
    } else {
      this.upToDate = theUpdateMain;
      if (isLastUpdate) {
        this.upToHour = theUpdate.split(" ")[1].substring(0, 5);
      } else {
        this.upToHour = "";
      }
    }
  }

  getCurrencyList(currentCurrency) {
    var currencyList = this._isocodelist;
    var iCurrentCurrency = currentCurrency.iIsoCode;
    getCurrenciesList({
      userCurrency: iCurrentCurrency,
      currencyList: currencyList
    })
      .then((response) => {
        var iReturn = response.getReturnValue();
        var iDates = [];
        var accCurrencies = [];
        var iCorporateCurrency = "";
        var thisTest = [];
        var showToast;
        var failCurrencies = [];

        for (var i = 0; i < iReturn.length; i++) {
          iDates.push(new Date(iReturn[i].iLastModifiedDate));
          accCurrencies.push(iReturn[i].iIsoCode);
          if (iReturn[i].iIsCorporate == true) {
            this._corporateCurrency = iReturn[i];
            iCorporateCurrency = iReturn[i].iIsoCode;
          }
          thisTest.push(iReturn[i].iIsoCode);
        }

        var aux = currentCurrency;

        aux.iConversionRate = 1;
        this._currentcurrency = aux;

        if (iCurrentCurrency != iCorporateCurrency) {
          this.exchangeCurrency(aux.iIsoCode, iReturn);
        } else {
          this._currencyList = iReturn;
          this._thistest = thisTest;
        }
        for (var i = 0; i < currencyList.length; i++) {
          if (accCurrencies.includes(currencyList[i]) == false) {
            showToast = true;
            failCurrencies.push(currencyList[i]);
          }
        }
      })
      .catch((error) => {
        if (error) {
          console.log(
            "AccountTitleDropDown getCurrencyList Error message: " + error
          );
        } else {
          console.log("AccountTitleDropDown getCurrencyList Unknown error");
        }
      });
  }
}
