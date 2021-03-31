import { LightningElement,api, track} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

import { NavigationMixin } from 'lightning/navigation';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import imagesPack from '@salesforce/resourceUrl/Images';
import enterADate from '@salesforce/label/c.enterADate';

import Account_Transactions from '@salesforce/label/c.Account_Transactions';
import PaymentsTracker from '@salesforce/label/c.PaymentsTracker';
import History_of_statements from '@salesforce/label/c.History_of_statements';
import Account_details from '@salesforce/label/c.Account_details';
import Account_Number from '@salesforce/label/c.Account_Number';
import tracking from '@salesforce/label/c.tracking';
import MoreOptions from '@salesforce/label/c.MoreOptions';
import Ebury from '@salesforce/label/c.Ebury';
import Account from '@salesforce/label/c.Account';

import encryptData from '@salesforce/apex/CNT_AccountBalance.encryptData';

export default class Lwc_calendar extends NavigationMixin(LightningElement) {
    label = {
        Account_Transactions,
        PaymentsTracker,
        History_of_statements,
        Account_details,
        Account_Number,
        tracking,
        MoreOptions,
        Ebury,
        Account
	};
    @api iaccount;
    @api ikey;
    @api iparentid;
    @api itabselected;
    @api iscashnexus;
    @api cmpid;
    @api isopen;
    @api islastupdate;
    @api filters;
    @api source;
    @api iregister;
    @api firstaccountcountrylist;
    @api firsttaccountcountrylist;
    @api isortselected;
    @api icurrency;
    @api userpreferreddateformat;
    @api userpreferrednumberformat;
    @api isonetrade;
    @api isloading;
   
    @track idoptions;
    @track idoptionsparent;
    @track onetradeandtransall;
    @track onetradeandnottransall;
    @track noonetradeoronetradeandballsall;
    @track noonetradeoronetradeandtransall;
    @track swiftandtab;
    @track swiftandint;
    @track historyclass;
    @track showAccount = true;
    @track updatedHour;
    @track showDetails = 'iElement container slds-hide slds-card__header slds-grid contentAccount';

    
    eburyImage = imagesPack + '/ebury.svg';

    get countryNameEqEbury(){
        return this.iaccount.countryName == this.label.Ebury;
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        var account = JSON.parse(JSON.stringify(this.iaccount));
        //SNJ - 15/04/2020
        if(account.lastUpdateAvailableBalance != null && account.lastUpdateAvailableBalance != '' && account.lastUpdateAvailableBalance != undefined && typeof account.lastUpdateAvailableBalance != 'undefined'){
            account.lastUpdateAvailableBalanceDate = account.lastUpdateAvailableBalance.split(',')[0];
            account.lastUpdateAvailableBalanceTime = account.lastUpdateAvailableBalance.split(',')[1];
            if(account.lastUpdateAvailableBalance.includes(" ")){
                var updateHour = account.lastUpdateAvailableBalance.split(' ')[1];
                this.updatedHour = updateHour.split(':')[0] +':'+ updateHour.split(':')[1];
            }
            this.iaccount = account;
        }

        // DA - 06/11/2020 - Permisos
        this.showAccountBalanceAllowed = true;
        if(this.isonetrade){
            if(!account.balanceAllowed) {
                this.showAccountBalanceAllowed = false;
            }
        }
        this.idoptionsparent = this.ikey + this.iparentid + '_options';
        this.idoptions = this.ikey + '_options';
        this.onetradeandtransall = this.isonetrade && this.iaccount.transactionsAllowed;
        this.onetradeandnottransall = this.isonetrade && !this.iaccount.transactionsAllowed;
        this.noonetradeoronetradeandtransall = !this.isonetrade || (this.isonetrade && this.iaccount.transactionsAllowed);
        this.noonetradeoronetradeandballsall = !this.isonetrade || (this.isonetrade && this.iaccount.balanceAllowed);
        this.swiftandtab = this.iaccount.hasSwiftPayments=='YES' && this.itabselected != 'EndOfDayTab';
        this.swiftandint = this.iaccount.hasSwiftPayments == 'true' && this.iaccount.internationalPaymentsAllowed == true;
        if (this.iscashnexus == 'False' || this.itabselected == 'LastUpdateTab') { 
            this.historyclass = 'slds-dropdown__item slds-hide'
        } else {
            this.historyclass = 'slds-dropdown__item slds-show';
        } 
    }
    displayOptions() {
        try{ 
            var iKey = this.ikey; 
            var iParentId = this.iparentid; 
            if(iKey!=undefined){
                var iOptionsId = iKey + iParentId + "_options"; 
                var elementToFind = "[data-id='" + iOptionsId+ "']";
                var elementSelect = this.template.querySelector(elementToFind);
                if(elementSelect.classList.contains('showDialogs') == false){
                    var elements = this.template.querySelectorAll(".showDialogs");
                    elements.forEach(function(element) {             
                         element.classList.remove("showDialogs");
                    });
                	elementSelect.classList.add("showDialogs"); 
                }else{
                     elementSelect.classList.remove("showDialogs"); 
                }       
            }
        }catch(e){
            console.error(e);    
        }
    }
    /*SNJ - 06/05/2020 adding aliasEntidad, codigoEmisora & codigoCuenta*/ 
    goToAccountTransactions() {
        var aux = "globalBalance";
        //OLD
        //var url = "c__source="+aux+"&c__subsidiaryName="+this.iAccount.subsidiaryName")+"&c__accountNumber="+this.iAccount.displayNumber")+"&c__bank="+this.iAccount.bankName")+"&c__mainAmount="+this.iAccount.amountMainBalance")+"&c__availableAmount="+this.iAccount.amountAvailableBalance")+"&c__currentCurrency="+this.iAccount.currencyCodeAvailableBalance") + "&c__alias="+this.iAccount.alias") + "&c__lastUpdate="+this.isLastUpdate")+"&c__country="+this.iAccount.country")+"&c__countryName="+this.iAccount.countryName")+"&c__aliasBank="+this.iAccount.bankName")+"&c__bic="+this.iAccount.bic")+"&c__accountCode="+this.iAccount.codigoCuenta")+"&c__bookDate="+this.iAccount.lastUpdateAvailableBalance")+"&c_valueDate="+this.iAccount.valueDate");
        var url = 
        "c__source="+aux+
        "&c__subsidiaryName="+this.iaccount.subsidiaryName+
        "&c__accountNumber="+this.iaccount.displayNumber+
        "&c__bank="+this.iaccount.bankName+
        "&c__mainAmount="+this.iaccount.amountMainBalance+
        "&c__availableAmount="+this.iaccount.amountAvailableBalance+
        "&c__currentCurrency="+this.iaccount.currencyCodeAvailableBalance+
        "&c__alias="+this.iaccount.alias+
        "&c__idType="+this.iaccount.idType+
        "&c__lastUpdate="+this.islastupdate+
        "&c__country="+this.iaccount.country+
        "&c__aliasBank="+this.iaccount.bankName+
        "&c__bic="+this.iaccount.bic+
        "&c__accountCode="+this.iaccount.codigoCuenta+
        "&c__bookDate="+this.iaccount.lastUpdateAvailableBalance+
        "&c__valueDate="+this.iaccount.valueDate+
        "&c__codigoBic="+this.iaccount.codigoBic+
        "&c__codigoEmisora="+this.iaccount.codigoEmisora+
        "&c__aliasEntidad="+this.iaccount.aliasEntidad+
        "&c__codigoCuenta="+this.iaccount.codigoCuenta+
        "&c__countryName="+this.iaccount.countryName
        +"&c__accountsFilters="+JSON.stringify(this.filters)
        +"&c__tabs="+this.islastupdate
        +"&c__sourcePage="+this.sourcePage
        +"&c__comesFrom=accountList"
        +"&c__iRegister="+JSON.stringify(this.iRegister)
        //+"&c__firstAccountCountryList="+JSON.stringify(this.firstaccountcountrylist)
        +"&c__firstAccountCountryList="+ this.firstaccountcountrylist
        //+"&c__firstTAccountCountryList="+JSON.stringify(this.firsttaccountcountrylist)
        +"&c__firstTAccountCountryList=" + this.firsttaccountcountrylist
        +"&c__accountGrouping="+this.iSortSelected
        +"&c__consolidationCurrency="+this.iCurrency
        +"&c__accountStatus="+this.iaccount.status;

        //AM - 28/09/2020 - Ebury Accounts
        if(this.iaccount.codigoCorporate){
            url = url + "&c__codigoCorporate="+this.iaccount.codigoCorporate;
        }
        if(this.iaccount.dataProvider){
            url = url + "&c__dataProvider="+this.iaccount.dataProvider;
        }
        if(this.iaccount.associatedAccountList){
            url = url + "&c__associatedAccountList="+JSON.stringify(this.iaccount.associatedAccountList);
        }

        this.goTo("account-transactions", url);
    }
     goTo(page, url){
        try{
            this.encrypt(page,url);
        } catch (e) {
            console.log(e);
        }
    }
    
    encrypt(page,urlAddress){
        var result='';
        try{
            encryptData({
                str : urlAddress
            })
            .then((value) => {
                result = value;
                this[NavigationMixin.Navigate]({
                    type: "comm__namedPage", 
                    attributes: {
                        pageName: page
                    }, 
                    state: {
                        params : result
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (e) { 
            console.log(e);
        }  
    }
    goToSwiftTracking(){
        //var url = "c__subsidiaryName="+this.iAccount.subsidiaryName")+"&c__accountNumber="+this.iAccount.displayNumber")+"&c__bank="+this.iAccount.bankName")+"&c__mainAmount="+this.iAccount.amountMainBalance")+"&c__availableAmount="+this.iAccount.amountAvailableBalance")+"&c__currentCurrency="+this.iAccount.currencyCodeAvailableBalance")+"&c__agent="+this.iAccount.bic");
        //helper.goTo(component, event,"payment-details", url);
        var url = 
        "c__subsidiaryName="+this.iaccount.subsidiaryName+
        "&c__alias="+this.iaccount.alias+
        "&c__bic="+this.iaccount.bic+this.iaccount.paisbic+this.iaccount.locatorbic+this.iaccount.branch+
        "&c__currentCurrency="+this.iaccount.currencyCodeAvailableBalance+
        "&c__accountNumber="+this.iaccount.displayNumber+
        "&c__idType="+this.iaccount.idType+
        "&c__updateHour="+this.updatedHour+
        "&c__date="+this.iaccount.lastUpdateAvailableBalanceDate+
        "&c__bank="+this.iaccount.bankName+
        "&c__mainAmount="+this.iaccount.amountMainBalance+
        "&c__availableAmount="+this.iaccount.amountAvailableBalance+
        "&c__lastUpdate="+this.islastupdate+
        "&c__country="+this.iaccount.countryName+
        "&c__aliasBank="+this.iaccount.bankName+
        "&c__codigoBic="+this.iaccount.codigoBic+
		"&c__isOneTrade="+this.isonetrade+
        "&c__source=fromAccount"+
        "&c__showFilters=false";
        this.goTo("international-payments-tracker", url); 
    }
     goToAccountDetails() {
        var url = "c__source=globalBalance"
        +"&c__subsidiaryName="+this.iaccount.subsidiaryName
        +"&c__accountNumber="+this.iaccount.displayNumber
        +"&c__idType="+this.iaccount.idType
        +"&c__bank="+this.iaccount.bankName
        +"&c__mainAmount="+this.iaccount.amountMainBalance
        +"&c__availableAmount="+this.iaccount.amountAvailableBalance
        +"&c__currentCurrency="+this.iaccount.currencyCodeAvailableBalance
        +"&c__alias="+this.iaccount.alias
        +"&c__lastUpdate="+this.islastupdate
        +"&c__country="+this.iaccount.countryName
        +"&c__aliasBank="+this.iaccount.bankName
        +"&c__bic="+this.iaccount.bic
        +"&c__codigoEmisora="+this.iaccount.codigoEmisora
        +"&c__codigoCuenta="+this.iaccount.codigoCuenta
        +"&c__filters="+JSON.stringify(this.filters)
        +"&c__tabs="+this.islastupdate
        +"&c__sourcePage="+this.sourcePage
        +"&c__codigoBic="+this.iaccount.codigoBic
        +"&c__comesFrom=accountList"
        +"&c__iRegister="+JSON.stringify(this.iRegister)
        //+"&c__firstAccountCountryList="+JSON.stringify(this.firstaccountcountrylist)
        +"&c__firstAccountCountryList="+ this.firstaccountcountrylist
        //+"&c__firstTAccountCountryList="+JSON.stringify(this.firsttaccountcountrylist)
        +"&c__firstTAccountCountryList="+ this.firsttaccountcountrylist
        +"&c__accountGrouping="+this.iSortSelected
        +"&c__consolidationCurrency="+this.iCurrency
        +"&c__aliasEntidad="+this.iaccount.aliasEntidad;

        //AM - 28/09/2020 - Ebury Accounts
        if(this.iaccount.codigoCorporate){
            url = url + "&c__codigoCorporate="+this.iaccount.codigoCorporate;
        }
        if(this.iaccount.dataProvider){
            url = url + "&c__dataProvider="+this.iaccount.dataProvider;
        }
        if(this.iaccount.associatedAccountList){
            url = url + "&c__associatedAccountList="+JSON.stringify(this.iaccount.associatedAccountList);
        }

        this.goTo("account-detail-transaction", url);
    }
    goToHistoryOfExtracts() {

        var url = "c__comesFrom=Accounts"
        +"&c__accountNumber="+this.iaccount.displayNumber
        +"&c__bankName="+this.iaccount.bankName
        +"&c__subsidiaryName="+this.iaccount.subsidiaryName
        +"&c__accountName="+this.iaccount.alias
        +"&c__currentCurrency="+this.iaccount.currencyCodeAvailableBalance
        +"&c__accountCode="+this.iaccount.codigoCuenta;
        this.goTo("history-of-statements", url);
    }

    @api
    doExpand(){
        if(this.showAccountBalanceAllowed){
            this.showAccount = true;
            this.showDetails = 'iElement container slds-card__header slds-grid contentAccount';
        }
    }

    @api
    doCollapse(){
        this.showAccount = false;
        this.showDetails = 'iElement container slds-hide slds-card__header slds-grid contentAccount';
    }

    collapse (){
        this.showDetails = 'iElement container slds-hide slds-card__header slds-grid contentAccount';
    }


}