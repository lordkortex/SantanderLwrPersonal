import { LightningElement,api, track} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

import { NavigationMixin } from 'lightning/navigation';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import enterADate from '@salesforce/label/c.enterADate';

import Account_Transactions from '@salesforce/label/c.Account_Transactions';
import PaymentsTracker from '@salesforce/label/c.PaymentsTracker';
import History_of_statements from '@salesforce/label/c.History_of_statements';
import Account_details from '@salesforce/label/c.Account_details';
import Account_Number from '@salesforce/label/c.Account_Number';
import tracking from '@salesforce/label/c.tracking';
import MoreOptions from '@salesforce/label/c.MoreOptions';

export default class Lwc_calendar extends NavigationMixin(LightningElement) {
    label = {
        Account_Transactions,
        PaymentsTracker,
        History_of_statements,
        Account_details,
        Account_Number,
        tracking,
        MoreOptions
	};
    @api iaccount;
    @api ikey;
    @api iparentid;
    @api itabselected;
    @api iscashnexus;
    @api cmpid;
    @api isopen;
    @api updatedhour;
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
   
    @track iaccountT;
    @track idoptions;
    @track idoptionsparent;
    @track onetradeandtransall;
    @track swiftandtab;
    @track swiftandint;
    @track historyclass;
    
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        var account = this.iaccount;
        //SNJ - 15/04/2020
        if(account.lastUpdateAvailableBalance != null && account.lastUpdateAvailableBalance != '' && account.lastUpdateAvailableBalance != undefined && typeof account.lastUpdateAvailableBalance != 'undefined'){
            account.lastUpdateAvailableBalanceDate = account.lastUpdateAvailableBalance.split(',')[0];
            account.lastUpdateAvailableBalanceTime = account.lastUpdateAvailableBalance.split(',')[1];
            if(account.lastUpdateAvailableBalance.includes(" ")){
                var updateHour = account.lastUpdateAvailableBalance.split(' ')[1];
                this.updatedHour = updateHour.split(':')[0] +':'+ updateHour.split(':')[1];
            }
            this.iaccountT = account;
        }
        this.idoptionsparent = !this.ikey + this.iparentid + '_options';
        this.idoptions = !this.ikey + '_options';
        this.onetradeandtransall = this.onetrade && this.iaccount.transactionsallowed;
        this.noonetradeoronetradeandtransall = !this.onetrade || (this.onetrade && this.iaccount.transactionsallowed);
        this.noonetradeoronetradeandballsall = !this.onetrade || (this.onetrade && this.iaccount.balanceallowed);
        this.swiftandtab = this.iaccount.hasswiftpayments=='YES' && this.itabselected != 'EndOfDayTab';
        this.swiftandint = this.iaccount.hasswiftpayments == 'true' && this.iaccount.internationalpaymentsallowed == true;
        if (this.iscashnexus == 'False' || this.itabselected == 'LastUpdateTab') { 
            this.historyclass = 'slds-dropdown__item slds-hide'
        } else {
            this.historyclass = 'slds-dropdown__item slds-show';
        } 
    }
    displayOptions() {
        try{ 
            var iKey = this.ikey; 
            var iParentId = this.iParentId; 
            if(iKey!=undefined){
                var iOptionsId = iKey + iParentId + "_options"; 
                var elementSelect = this.template.querySelector('#'+iOptionsId);
                if(elementSelect.classList.contains('showDialogs') == false){
                    var elements = this.template.querySelectorAll(".showDialogs");
                    elements.forEach(function(element) {             
                         element.classList.remove("showDialogs");
                    });
                	elementSelect.classList.add("showDialogs"); 
                }else{
                     elementSelect.classList.remove("showDialogs"); 
                } 
                //SNJ
               event.stopPropagation();                
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
        "&c__subsidiaryName="+this.iAccount.subsidiaryName+
        "&c__accountNumber="+this.iAccount.displayNumber+
        "&c__bank="+this.iAccount.bankName+
        "&c__mainAmount="+this.iAccount.amountMainBalance+
        "&c__availableAmount="+this.iAccount.amountAvailableBalance+
        "&c__currentCurrency="+this.iAccount.currencyCodeAvailableBalance+
        "&c__alias="+this.iAccount.alias+
        "&c__idType="+this.iAccount.idType+
        "&c__lastUpdate="+this.isLastUpdate+
        "&c__country="+this.iAccount.country+
        "&c__aliasBank="+this.iAccount.bankName+
        "&c__bic="+this.iAccount.bic+
        "&c__accountCode="+this.iAccount.codigoCuenta+
        "&c__bookDate="+this.iAccount.lastUpdateAvailableBalance+
        "&c_valueDate="+this.iAccount.valueDate+
        "&c__codigoBic="+this.iAccount.codigoBic+
        "&c__codigoEmisora="+this.iAccount.codigoEmisora+
        "&c__aliasEntidad="+this.iAccount.aliasEntidad+
        "&c__codigoCuenta="+this.iAccount.codigoCuenta+
        "&c__countryName="+this.iAccount.countryName
        +"&c__accountsFilters="+JSON.stringify(this.filters)
        +"&c__tabs="+this.isLastUpdate
        +"&c__sourcePage="+this.sourcePage
        +"&c__comesFrom=accountList"
        +"&c__iRegister="+JSON.stringify(this.iRegister)
        +"&c__firstAccountCountryList="+JSON.stringify(this.firstAccountCountryList)
        +"&c__firstTAccountCountryList="+JSON.stringify(this.firstTAccountCountryList)
        +"&c__accountGrouping="+this.iSortSelected
        +"&c__consolidationCurrency="+this.iCurrency
        +"&c__accountStatus="+this.iAccount.status;

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
        "c__subsidiaryName="+this.iAccount.subsidiaryName+
        "&c__alias="+this.iAccount.alias+
        "&c__bic="+this.iAccount.bic+this.iAccount.paisbic+this.iAccount.locatorbic+this.iAccount.branch+
        "&c__currentCurrency="+this.iAccount.currencyCodeAvailableBalance+
        "&c__accountNumber="+this.iAccount.displayNumber+
        "&c__idType="+this.iAccount.c__idType+
        "&c__updateHour="+this.updatedHour+
        "&c__date="+this.iAccount.lastUpdateAvailableBalanceDate+
        "&c__bank="+this.iAccount.bankName+
        "&c__mainAmount="+this.iAccount.amountMainBalance+
        "&c__availableAmount="+this.iAccount.amountAvailableBalance+
        "&c__lastUpdate="+this.isLastUpdate+
        "&c__country="+this.iAccount.countryName+
        "&c__aliasBank="+this.iAccount.bankName+
        "&c__codigoBic="+this.iAccount.codigoBic+
		"&c__isOneTrade="+this.isOneTrade+
        "&c__source=fromAccount"+
        "&c__showFilters=false";
        this.goTo("international-payments-tracker", url); 
    }
     goToAccountDetails() {
        var url = "c__source=globalBalance"
        +"&c__subsidiaryName="+this.iAccount.subsidiaryName
        +"&c__accountNumber="+this.iAccount.displayNumber
        +"&c__idType="+this.iAccount.idType
        +"&c__bank="+this.iAccount.bankName
        +"&c__mainAmount="+this.iAccount.amountMainBalance
        +"&c__availableAmount="+this.iAccount.amountAvailableBalance
        +"&c__currentCurrency="+this.iAccount.currencyCodeAvailableBalance
        +"&c__alias="+this.iAccount.alias
        +"&c__lastUpdate="+this.isLastUpdate
        +"&c__country="+this.iAccount.countryName
        +"&c__aliasBank="+this.iAccount.bankName
        +"&c__bic="+this.iAccount.bic
        +"&c__codigoEmisora="+this.iAccount.codigoEmisora
        +"&c__codigoCuenta="+this.iAccount.codigoCuenta
        +"&c__filters="+JSON.stringify(this.filters)
        +"&c__tabs="+this.isLastUpdate
        +"&c__sourcePage="+this.sourcePage
        +"&c__codigoBic="+this.iAccount.codigoBic
        +"&c__comesFrom=accountList"
        +"&c__iRegister="+JSON.stringify(this.iRegister)
        +"&c__firstAccountCountryList="+JSON.stringify(this.firstAccountCountryList)
        +"&c__firstTAccountCountryList="+JSON.stringify(this.firstTAccountCountryList)
        +"&c__accountGrouping="+this.iSortSelected
        +"&c__consolidationCurrency="+this.iCurrency
        +"&c__aliasEntidad="+this.iAccount.aliasEntidad;
        this.goTo("account-detail-transaction", url);
    }
    goToHistoryOfExtracts() {

        var url = "c__comesFrom=Accounts"
        +"&c__accountNumber="+this.iAccount.displayNumber
        +"&c__bankName="+this.iAccount.bankName
        +"&c__subsidiaryName="+this.iAccount.subsidiaryName
        +"&c__accountName="+this.iAccount.alias
        +"&c__currentCurrency="+this.iAccount.currencyCodeAvailableBalance
        +"&c__accountCode="+this.iAccount.codigoCuenta;
        this.goTo("history-of-statements", url);
    }
}