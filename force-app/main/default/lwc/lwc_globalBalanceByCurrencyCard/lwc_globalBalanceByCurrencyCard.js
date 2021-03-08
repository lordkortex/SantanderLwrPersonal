import { LightningElement, api,track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import View from '@salesforce/label/c.View';
import Account from '@salesforce/label/c.Account';
import Accounts from '@salesforce/label/c.Accounts';
import currency from '@salesforce/label/c.currency';


export default class Lwc_globalBalanceByCurrencyCard extends LightningElement {
    label = {
        View,
        Account,
        Accounts,
        currency
    };
    
    @api currenciesexchange;
    @api clonedCurrenciesexchange;
    @api selectedcurrency;
    @api lastupdateselected;
    @api cardgrouping;
    @api userpreferrednumberformat;
    @api start;
    @api end;

    @track aux;
    @track name;
    @track url;
    @track selection;
  

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');

        this.clonedCurrenciesexchange = Array.from(JSON.parse(JSON.stringify(this.currenciesexchange)));

        this.clonedCurrenciesexchange.splice(0,(this.start-1));
        this.clonedCurrenciesexchange.splice((this.end-this.start + 1),(this.currenciesexchange.length - (this.end-this.start)));
        //this.clonedCurrenciesexchange.splice(this.clonedCurrenciesexchange.length,(this.currenciesexchange.length - this.end));

        for (var i=0; i<this.clonedCurrenciesexchange.length; i++){
            if(this.clonedCurrenciesexchange[i].tipoDeCambio.accountNumber == 1){
                this.clonedCurrenciesexchange[i].tipoDeCambio.label = this.label.Account;
            }else{
                this.clonedCurrenciesexchange[i].tipoDeCambio.label = this.label.Accounts;
            }
        }
    }

    navigateToAccounts(event) {
        event.preventDefault();
        this.aux = "GlobalPosition";
        this.name = this.label.currency;
        this.url="c__tabs="+this.lastupdateselected;
        this.selection = '{"value":"'+event.currentTarget.dataset.id+'","name": "'+this.name+'", "type":"checkbox"}';
        this.url+="&c__filters="+this.selection+"&c__consolidationCurrency="+this.selectedcurrency;
        this.url+="&c__accountGrouping="+this.cardgrouping;
        this.url+="&c__source="+this.aux;
        
        //this.template.querySelector("c-lwc_service-component").onRedirect({page:'accounts',urlParams:this.url});
        this.template.querySelector("c-lwc_service-component").redirect({page:'accounts',urlParams:this.url});
    }
}