import { LightningElement, api, track } from 'lwc';

//Labels
import MovementHistory_Amount from '@salesforce/label/c.MovementHistory_Amount';
import Ebury from '@salesforce/label/c.Ebury';
import ResultingBalance from '@salesforce/label/c.ResultingBalance';
import Account from '@salesforce/label/c.Account';
//Resource
import imagesPack from '@salesforce/resourceUrl/Images';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class Lwc_cn_title_subtitle_amount extends LightningElement {

    label = {MovementHistory_Amount,
            Ebury,
            ResultingBalance,
            Account};

    @api accountbank;
    @api accountnumber;
    @api accountalias;
    _accountalias;
    @api currencyacc;
    @api amount;
    @api resultingamount = '';
    @api country;
    @track dataProvider;
    eburyImage = imagesPack + '/ebury.svg';
    
    get accountlias(){
        return this.accountalias;
    }

    set accountlias (accountlias){
        if(this.accountlias){
            this._accountlias = accountlias;
        }
    }

    get bankaccountinfo(){
        var bankaccountinfoaux = this.accountbank + ' - ' + this.currencyacc + ' ' + this.accountnumber;
        return (bankaccountinfoaux);
    }

    get bankaccountinfoebury(){
        var bankaccountinfoeburyaux = this.accountbank + ' - ' + label.Ebury + ' ' + this.currencyacc + ' ' + label.account;
        return (bankaccountinfoeburyaux);
    }

    get getContryEbury(){
        return this.country == label.Ebury;
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }
}