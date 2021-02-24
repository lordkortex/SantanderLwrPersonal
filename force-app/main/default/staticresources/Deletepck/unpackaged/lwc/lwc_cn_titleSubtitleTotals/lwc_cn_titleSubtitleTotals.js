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
    @track isAccountTransactions;
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

    get isAccountAliasNotUndefined(){
        return this.accountDetails.accountAlias != 'undefined';
    }

    get isAccountNameNotUndefined(){
        return this.accountDetails.accountName != 'undefined';
    }
    get isAccountNameUndefined(){
        return this.accountDetails.accountName == 'undefined';
    }

    get isNotAccountTransactions(){
        return this.isAccountTransactions == false;
    }

    get bookDateNotNull(){
        return (this.accountDetails.bookDate != null && (this.accountDetails.dateValue != 'N/A' || (this.accountDetails.dateValue == 'N/A' && this.accountDetails.bookBalance != '0')));
    }

    get showAccountPaymentFromCashNexus(){
        return this.fromcashnexus && this.showaccountpayment;
    }

    recalculateAmounts(){
        if(this.showtotals == true){
            //this.template.querySelector("c-lwc_display-amount").formatNumber();
            //this.template.querySelector("c-lwc_display-amount").formatNumber();
        }
    }

    copy(){
        var dummy = document.createElement('input');
        var text = this.accounttocopy; 
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
		
		var accountDetails = this.accountDetails;
        //SNJ - 06/05/2020 - Adding other parameters to the url: c__codigoEmisora and c__aliasEntidad
        var url =
            "c__country="+ this.accountDetails.country+
            "&c__source="+ this.aux+
            "&c__bank="+ this.accountDetails.bank+
            "&c__accountNumber="+ this.accountDetails.accountNumber+
            "&c__bic="+ this.accountDetails.bic+
            "&c__subsidiaryName="+ this.accountDetails.accountName+
            "&c__aliasBank="+ this.accountDetails.bankAlias+
            "&c__mainAmount="+ this.accountDetails.bookBalance+
            "&c__availableAmount="+ this.accountDetails.availableBalance+
            "&c__alias="+ this.accountDetails.accountAlias+
            "&c__idType="+ this.accountDetails.idType+
            "&c__currentCurrency="+ this.accountDetails.accountCurrency+
            "&c__filters="+ JSON.stringify(this.filters)+
            "&c__idType="+ this.accountDetails.iIdType+
            "&c__codigoCuenta=" + this.accountDetails.accountCode+
            "&c__codigoBic="+ this.accountDetails.finalCodigoBic+
            "&c__codigoEmisora="+ this.accountDetails.codigoEmisora+
            "&c__aliasEntidad="+ this.accountDetails.aliasEntidad;
           this.template.querySelector("c-lwc_service-component").redirect("account-detail-transaction",url);
    } 
    
}