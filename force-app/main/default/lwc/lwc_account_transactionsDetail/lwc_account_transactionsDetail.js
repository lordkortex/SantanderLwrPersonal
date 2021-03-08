import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';


import MovementHistory_BookDate from '@salesforce/label/c.MovementHistory_BookDate';
import MovementHistory_Category from '@salesforce/label/c.MovementHistory_Category';
import ClientReference from '@salesforce/label/c.ClientReference';
import MovementHistory_BankReference from '@salesforce/label/c.MovementHistory_BankReference';
import MovementHistory_Description from '@salesforce/label/c.MovementHistory_Description';
import localTransactionCode from '@salesforce/label/c.localTransactionCode';
import localTransactionDescription from '@salesforce/label/c.localTransactionDescription';
import Ebury from '@salesforce/label/c.Ebury';
import transactionBatchReference from '@salesforce/label/c.transactionBatchReference';
import T_Copy from '@salesforce/label/c.T_Copy';
import basicDetails from '@salesforce/label/c.basicDetails';
import AdditionalInformation from '@salesforce/label/c.AdditionalInformation';
import valueDate from '@salesforce/label/c.valueDate';
import TypeOfTransacction from '@salesforce/label/c.TypeOfTransacction';
import DebitTransactionDetail from '@salesforce/label/c.DebitTransactionDetail';
import CreditTransactionDetail from '@salesforce/label/c.CreditTransactionDetail';
import CreditorAccount from '@salesforce/label/c.CreditorAccount';
import DebtorAccount from '@salesforce/label/c.DebtorAccount';
import status from '@salesforce/label/c.status';
import CreditorBank from '@salesforce/label/c.CreditorBank';
import DebtorBank from '@salesforce/label/c.DebtorBank';
import DebtorSwift from '@salesforce/label/c.DebtorSwift';
import CreditorSwift from '@salesforce/label/c.CreditorSwift';
import CreditorAccountIBAN from '@salesforce/label/c.CreditorAccountIBAN';
import DebtorAccountIBAN from '@salesforce/label/c.DebtorAccountIBAN';
import CreditorBankCode from '@salesforce/label/c.CreditorBankCode';
import DebtorBankCode from '@salesforce/label/c.DebtorBankCode';


import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_account_transactionsDetail extends LightningElement {

    @track transactionDetails = {bookDate: '11-01-2021'};
    @track source = 'accountTransactions';
    @track doneLoadingScreen = true;
    @track filters;
    @track formFilters;
    @track accountsData;
    @track accountCodesToSearch;
    @track accountCodeToInfo;
    @track selectedTimeframe;
    @track dates;
    @track selectedFilters;
    @track accountCodigoBic;
    @track isIAM;
    @track accountCodigoCorporate;
    @track dataProvider;

    label={
        MovementHistory_BookDate,
        MovementHistory_Category,
        ClientReference,
        MovementHistory_BankReference,
        MovementHistory_Description,
        localTransactionCode,
        localTransactionDescription,
        transactionBatchReference,
        T_Copy,
        status,
        Ebury,
        basicDetails,
        TypeOfTransacction,
        AdditionalInformation,
        valueDate,
        DebitTransactionDetail,
        CreditTransactionDetail,
        CreditorName,
        DebtorName,
        CreditorAccount,
        DebtorAccount,
        CreditorBank,
        DebtorBank,
        DebtorSwift,
        CreditorSwift,
        CreditorAccountIBAN,
        DebtorAccountIBAN,
        CreditorBankCode,
        DebtorBankCode
    };

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    get sourceEqualsAccountTrans(){
        if(this.source){
            return this.source == 'accountTransactions';
        }
    }

    get notCreditType(){
         return this.transactionDetails.transactionType != 'credit';  
     }
    
    get detailsIsEbury(){
          return this.transactionDetails.country == label.Ebury;
    }

    get accountDetailsNotNull(){
         return (this.transactionDetails.accountDetails != null && this.transactionDetails.accountDetails != undefined);
    }

    get isNotIAM(){
          return this.isIAM || this.isIAM == 'false';
    }    

   


    getTransactionDetails(){
        this.getURLParams();
    }

 	gobackPage(){
        // Generate common URL 
        var url = "c__accountNumber="+ this.transactionDetails.account+
          "&c__accountCode="+ this.accountCode+
          "&c__accountCodes="+ this.accountCodesToSearch+
          "&c__valueDate="+ this.transactionDetails.valueDate+
          "&c__clientRef="+ this.transactionDetails.clientRef+
          "&c__bankRef="+ this.transactionDetails.bankRef+
          "&c__bookDate="+ this.transactionDetails.bookDate+		
          "&c__category="+ this.transactionDetails.category+
          "&c__currentCurrency="+ this.transactionDetails.currency+
          "&c__amount="+ this.transactionDetails.amount+
          "&c__description="+ this.transactionDetails.description+
          "&c__bank="+ this.transactionDetails.bank+
          "&c__aliasBank="+ this.transactionDetails.aliasBank+
          "&c__alias="+ this.transactionDetails.alias+
          "&c__lastUpdate="+ this.transactionDetails.lastUpdate+
          "&c__subsidiaryName="+ this.transactionDetails.corporate+
          "&c__mainAmount="+ this.transactionDetails.bookBalance+
          "&c__availableAmount="+ this.transactionDetails.availableBalance+
          "&c__country="+ this.transactionDetails.country+
          "&c__countryName="+ this.transactionDetails.countryName+
          "&c__bic="+ this.transactionDetails.bic+
          "&c__filters="+ JSON.stringify(this.filters)+
          "&c__formFilters="+ JSON.stringify(this.formFilters)+
          "&c__accountsData="+ JSON.stringify(this.accountsData)+
          "&c__accountCodeToInfo="+ JSON.stringify(this.accountCodeToInfo)+
          "&c__selectedTimeframe="+ this.selectedTimeframe +
          "&c__selectedFilters="+ JSON.stringify(this.selectedFilters)+
          "&c__codigoBic="+ this.accountCodigoBic+
          "&c__dates="+ JSON.stringify(this.dates)+
          "&c__accountStatus="+ this.transactionDetails.accountStatus;

        if(this.source == "globalBalance"){  
            // Add the source parameter and redirect to the page
            var source = "globalBalance";
            url += "&c__source="+source;
            this.template.querySelector("c-lwc_service-component").redirect("account-transactions", url);          
        } else {
            // Add the source parameter and redirect to the page
            url += "&c__source=";
            this.template.querySelector("c-lwc_service-component").redirect("transaction-search", url); 
        }
    }

 	copy(){
        console.log('copy method 1' + location.href);
        var dummy = document.createElement('input'),
        //text = window.location.href;
        text = this.transactionDetails.description; 
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    }

    getURLParams() {
        try{
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var  sParameterName;
            var sPageURL;

            if (sURLVariablesMain[0] == 'params') {
                this.decrypt(sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;

                    var sURLVariables=sPageURL.split('&');
                    console.log("Received data: " + sURLVariables);
                    
                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                         sParameterName = sURLVariables[i].split('=');      
                        if( sParameterName[0] === 'c__source') {
                             sParameterName[1] === "undefined" ? this.source = "" : this.source = sParameterName[1];
                        }else if ( sParameterName[0] === 'c__accountNumber') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.account = "" : this.transactionDetails.account = sParameterName[1];
                        }else if ( sParameterName[0] === 'c__accountCode') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.accountCode = "" : this.transactionDetails.accountCode = sParameterName[1];
                        }else if ( sParameterName[0] === 'c__valueDate') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.valueDate = "" : this.transactionDetails.valueDate = sParameterName[1];
                        }else if ( sParameterName[0] === 'c__clientRef') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.clientRef = "" : this.transactionDetails.clientRef = sParameterName[1];
                        }else if ( sParameterName[0] === 'c__bankRef') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.bankRef = "" : this.transactionDetails.bankRef = sParameterName[1];
                        }else if ( sParameterName[0] === 'c__bookDate') {
                             sParameterName[1] === "undefined" ? this.transactionDetails.bookDate = "" : this.transactionDetails.bookDate = sParameterName[1];
                        }else if( sParameterName[0] === 'c__category'){
                             sParameterName[1] === "undefined" ? this.transactionDetails.category = "" : this.transactionDetails.category = sParameterName[1];                             
                             sParameterName[1] === undefined ? 'Not found' : this.availableBalanceParam = sParameterName[1];
                        }else if( sParameterName[0] === 'c__currentCurrency'){
                             sParameterName[1] === "undefined" ? this.transactionDetails.currency = "" : this.transactionDetails.currency = sParameterName[1];                             
                             sParameterName[1] === undefined ? 'Not found' : this.availableBalanceParam = sParameterName[1];
                        }else if ( sParameterName[0] === 'c__amount') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.amount = "" : this.transactionDetails.amount = sParameterName[1];
                        } else if( sParameterName[0] === 'c__description') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.description = "" : this.transactionDetails.description = sParameterName[1];
                        }else if( sParameterName[0] === 'c__bank') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.bank = "" : this.transactionDetails.bank = sParameterName[1];
                        }else if( sParameterName[0] === 'c__aliasBank') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.aliasBank = "" : this.transactionDetails.aliasBank = sParameterName[1];
                        }else if( sParameterName[0] === 'c__alias') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.alias = "" : this.transactionDetails.alias = sParameterName[1];
                        }else if( sParameterName[0] === 'c__lastUpdate') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.lastUpdate = "" : this.transactionDetails.lastUpdate = sParameterName[1];
                        }else if( sParameterName[0] === 'c__subsidiaryName') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.corporate = "" : this.transactionDetails.corporate = sParameterName[1];
                        }else if( sParameterName[0] === 'c__mainAmount') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.bookBalance = "" : this.transactionDetails.bookBalance = sParameterName[1];
                        }else if( sParameterName[0] === 'c__availableAmount') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.availableBalance = "" : this.transactionDetails.availableBalance = sParameterName[1];
                        }else if( sParameterName[0] === 'c__country') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.country = "" : this.transactionDetails.country = sParameterName[1];
                        }else if( sParameterName[0] === 'c__countryName') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.countryName = "" : this.transactionDetails.countryName = sParameterName[1];
                        }else if( sParameterName[0] === 'c__bic') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.bic = "" : this.transactionDetails.bic = sParameterName[1];
                        }else if ( sParameterName[0] === 'c__filters') { 
                             sParameterName[1] === "undefined" ? this.filters = [] : this.filters = JSON.parse( sParameterName[1]);	           
                        }else if ( sParameterName[0] === 'c__formFilters') { 
                             sParameterName[1] === "undefined" ? this.formFilters = [] : this.formFilters = JSON.parse( sParameterName[1]);	           
                        }else if ( sParameterName[0] === 'c__accountsData') { 
                             sParameterName[1] === "undefined" ? this.accountsData = [] : this.accountsData = JSON.parse( sParameterName[1]);	           
                        }else if ( sParameterName[0] === 'c__accountCodeToInfo') { 
                             sParameterName[1] === "undefined" ? this.accountCodeToInfo = {} : this.accountCodeToInfo = JSON.parse( sParameterName[1]);	           
                        }else if ( sParameterName[0] === 'c__selectedTimeframe') { 
                             sParameterName[1] === "undefined" ? this.selectedTimeframe = "" : this.selectedTimeframe =  sParameterName[1];	           
                        }else if ( sParameterName[0] === 'c__dates') { 
                             sParameterName[1] === "undefined" ? this.dates = [] : this.dates = JSON.parse( sParameterName[1]);	           
                        }else if ( sParameterName[0] === 'c__selectedFilters') { 
                             sParameterName[1] === "undefined" ? this.selectedFilters = [] : this.selectedFilters = JSON.parse( sParameterName[1]);	           
                        }else if ( sParameterName[0] === 'c__codigoBic') { 
                             sParameterName[1] === "undefined" ? this.accountCodigoBic = {} : this.accountCodigoBic =  sParameterName[1];	           
                        }else if ( sParameterName[0] === 'c__isIAM') { 
                             sParameterName[1] === "undefined" ? this.isIAM = false : this.isIAM =  sParameterName[1];	           
                        }else if ( sParameterName[0] === 'c__accountStatus') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.accountStatus = "" : this.transactionDetails.accountStatus =  sParameterName[1];	           
                        }else if ( sParameterName[0] === 'c__localTransactionCode') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.localTransactionCode = "" : this.transactionDetails.localTransactionCode =  sParameterName[1];	           
                        }else if ( sParameterName[0] === 'c__localTransactionDescription') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.localTransactionDescription = "" : this.transactionDetails.localTransactionDescription =  sParameterName[1];	           
                        }else if ( sParameterName[0] === 'c__transactionBatchReference') { 
                             sParameterName[1] === "undefined" ? this.transactionDetails.transactionBatchReferenc = "" : this.transactionDetails.transactionBatchReference =  sParameterName[1];	           
                        }
                    }
                    this.doneLoadingScreen = true;
                });
            }

 
        } catch (e) {
            console.log(e);
        }
    
    }

    decrypt(data){
        try {
            var result="null";


            return new Promise(function (resolve,reject){
                decryptData({str : data}).then(value => {
                    if(value!='null' && res!=undefined && value!=null){
                         result = value;
                    }
                    resolve(result);
                })
                .catch(error => {
                    if(error){
                        if(error && error.message){
                            console.log("Error message: " + 
                            error.message);
                            reject(error);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                })
            });

        } catch(e) {
            console.error(e);
        }
    }


}