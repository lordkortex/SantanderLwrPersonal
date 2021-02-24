import { LightningElement, api, track} from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import copy from '@salesforce/label/c.copy';
import Accounts_Updated from '@salesforce/label/c.Accounts_Updated';
import Account_details from '@salesforce/label/c.Account_details';
import TrackByUETR from '@salesforce/label/c.TrackByUETR';
import last7Days from '@salesforce/label/c.last7Days';
import TotalBookBalance from '@salesforce/label/c.TotalBookBalance';
import TotalAvailableBalance from '@salesforce/label/c.TotalAvailableBalance';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
export default class Lwc_cn_titleSubtitleTotals extends LightningElement {
    
    @api accountdetails;
    @api source;
    @api lastupdate;
    @api showaccountdetaillink;
    @api showlatestinformationtimestamp;
    @api accounttocopy;

    @track filters;
    @track selectedTimeframe;
    //@track isaccounttransactions;
    @api isaccounttransactions = false;
    @api showtotals;
    @api fromcashnexus;
    @api showaccountpayment;

    Label={
        copy,
        Account_details,
        Accounts_Updated,
        TrackByUETR,
        TotalBookBalance,
        TotalAvailableBalance,
        last7Days
	};

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    
    get getDateValue(){
        if(this.accountDetails) return this.Label.Accounts_Updated + ' ' + this.accountDetails.dateValue;
        else return this.Label.Accounts_Updated + ' ' + 'N/A';
    }

    get isAccountAliasNotUndefined(){
        return this.accountdetails.accountAlias != 'undefined';
    }

    get isAccountNameNotUndefined(){
        return this.accountdetails.accountName != 'undefined';
    }
    get isAccountNameUndefined(){
        return this.accountdetails.accountName == 'undefined';
    }

    get isNotAccountTransactions(){
        return !this.isaccounttransactions;// == false;
    }

    get bookDateNotNull(){
        return (this.accountdetails.bookDate != null && (this.accountdetails.dateValue != 'N/A' || (this.accountdetails.dateValue == 'N/A' && this.accountdetails.bookBalance != '0')));
    }

    get showAccountPaymentFromCashNexus(){
        return this.fromcashnexus && this.showaccountpayment;
    }

    get getAccountDetails(){
        return this.accountdetails.accountName + ' - ' + this.accountdetails.accountCurrency + ' ' + this.accountdetails.accountNumber;
    }

    get getAccountNumber(){
        return this.accountdetails.currency + ' ' + this.accountdetails.accountNumber;
    }

    recalculateAmounts(){
        if(this.showtotals == true){
            //this.template.querySelector("c-lwc_display-amount").formatNumber();
            //this.template.querySelector("c-lwc_display-amount").formatNumber();
        }
    }

    copy(){
        var dummy = document.createElement('input');
        var text = this.accountdetails.accountNumber;//this.accounttocopy; 
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    }

    openPaymentUETRTrack(){
        this.template.querySelector("c-lwc_service-component").redirect("payment-uetr-track", "");
    }

    
    navigateToAccountDetails(){
        // Creación de la URL para navegar a la página de 
		// detalles del extracto
		var aux;
        // SNJ 02/04/2020
        if(this.source == "fromIPTParent"){
            aux = "fromIPTParent";
        }else{
            aux = "accountTransactions";  
        }
		
		var accountDetails = this.accountdetails;
        //SNJ - 06/05/2020 - Adding other parameters to the url: c__codigoEmisora and c__aliasEntidad
        var url =
            "c__country="+ this.accountdetails.country+
            "&c__source="+ aux+
            "&c__bank="+ this.accountdetails.bank+
            "&c__accountNumber="+ this.accountdetails.accountNumber+
            "&c__bic="+ this.accountdetails.bic+
            "&c__subsidiaryName="+ this.accountdetails.accountName+
            "&c__aliasBank="+ this.accountdetails.bankAlias+
            "&c__mainAmount="+ this.accountdetails.bookBalance+
            "&c__availableAmount="+ this.accountdetails.availableBalance+
            "&c__alias="+ this.accountdetails.accountAlias+
            "&c__idType="+ this.accountdetails.idType+
            "&c__currentCurrency="+ this.accountdetails.accountCurrency+
            "&c__filters="+ JSON.stringify(this.filters)+
            //"&c__idType="+ this.accountdetails.iIdType+
            "&c__codigoCuenta=" + this.accountdetails.accountCode+
            "&c__codigoBic="+ this.accountdetails.finalCodigoBic+
            "&c__codigoEmisora="+ this.accountdetails.codigoEmisora+
            "&c__aliasEntidad="+ this.accountdetails.aliasEntidad+
            "&c__bookDate="+this.accountdetails.bookDate;
           this.template.querySelector("c-lwc_service-component").redirect({page: "account-detail-transaction",urlParams: url});//;redirect("account-detail-transaction",url);
    } 
    
}