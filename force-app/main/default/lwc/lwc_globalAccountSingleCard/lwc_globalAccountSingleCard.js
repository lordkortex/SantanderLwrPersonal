import {LightningElement,api,track} from 'lwc';

//Import labels
import Country from '@salesforce/label/c.Country';
import Corporate from '@salesforce/label/c.Corporate';
import seeMyAccounts from '@salesforce/label/c.seeMyAccounts';
import Account from '@salesforce/label/c.Account';
import Accounts from '@salesforce/label/c.Accounts';
import Available_Balance from '@salesforce/label/c.Available_Balance';
import Book_Balance from '@salesforce/label/c.Book_Balance';
import Ebury from '@salesforce/label/c.Ebury';

// Import images
import imageFlag from '@salesforce/resourceUrl/Flags';
import eburyImg from '@salesforce/resourceUrl/Images';
import { loadStyle } from 'lightning/platformResourceLoader';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons'
//Import methods
//import getAccountData from '@salesforce/apex/CNT_MovementHistoryExtracController.getAccountData';
//import decryptData from '@salesforce/apex/CNT_MovementHistoryExtracController.decryptData';

export default class lwc_globalAccountSingleCard extends LightningElement{

    //Labels
    label = {
        Country,
        Corporate,
        seeMyAccounts,
        Account,
        Accounts,
        Available_Balance,
        Book_Balance,
        imageFlag,
        Ebury,
        seeMyAccounts
    }

    //Attributes
    @api cardinfo; // Contains the data of the card
    @api selectedcurrency; // Contains the selected
    @api userpreferrednumberformat; // User preferred number format
    @track dataisloaded = false; // Flag to check if data is loaded
    @api selectedgrouping;// = this.label.Country; 
    @track lastupdateselected = false;// Check if 'Last update' button is selected 

    @track _cardInfo;
    @track imgCardInfoCountryCode;
    @track imgCardEbury;
    @api isonetrade;
    @track accountcount = "0";

    set cardinfo(cardinfo) {
        if (cardinfo) {
            this._cardinfo = cardinfo;
            //this.doInit();
            //var imgCardInfoCountryCode = imageFlag + '/' + this.cardinfo.countryCode + '.svg';
            //var defaultImage = imageFlag + '/Default.svg';
            this.setSvgCountry(cardinfo);
        }
    }
    
    get cardinfo() {
        return this._cardinfo;
    }

    setSvgCountry(cardinfo) {
        var country = 'Default';

        if (this._cardinfo.countryFullName == this.label.Ebury){
            this.imgCardEbury = eburyImg +'/ebury.svg';
        }else if (this._cardinfo.countryCode) {
            country = this._cardinfo.countryCode;
            this.imgCardInfoCountryCode = imageFlag + '/' + country + '.svg';
        }else{
            this.imgCardInfoCountryCode = imageFlag + '/' + country + '.svg';
        }
       
    }

    get isCountrySelectedGrouping(){
        return this.selectedgrouping == this.label.Country;
    }

    get isCorporateSelectedGrouping() {
        return this.selectedgrouping == this.label.Corporate;
    }

    get countAccount() {
        //return this.cardInfo.accountCount == 1 ? this.label.Account : this.label.Accounts;
        return this.cardinfo.accountCount == 1 ? this.label.Account : this.label.Accounts;
    }

    get isNotCardInfoUndefined() {
        return this.cardinfo != undefined;
    }

    get isCountryFullNameEbury(){
        return this.cardinfo.countryFullName == this.label.Ebury;
    }

    get accountcountNotZero(){
        return this.accountcount != 0;
    }

    get accountCountLabel(){
        return this.accountcount == 1 ? this.label.Account : this.label.Accounts
    } 

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
              
        console.log("THIS IS ACCONTS:" + JSON.stringify(this._cardinfo, null, 4));
        
        if(this.isonetrade == true) {
            var canSeeBalance = 0;
            for(var i = 0; i < this._cardinfo.listaCuentas.length; i++) {
                if(this._cardinfo.listaCuentas[i].balanceAllowed == true) {
                    canSeeBalance++;
                }
            }
            this.accountcount = canSeeBalance;
        } else {
            this.accountcount = this._cardinfo.accountCount;
        }

    }

    navigateToAccounts(event) {
        event.preventDefault();
        var aux = "GlobalPosition";
        var url = "c__tabs=" + this.lastupdateselected;
        var selection = '';

        if(this.selectedgrouping == this.label.Country) {
            selection = '{"value":"' + this.cardinfo.countryCode + '","name":"' + this.label.Country + '", "type":"checkbox"}';
        }else{
            selection = '{"value":"' + this.cardinfo.corporateName + '","name":"' + this.label.Corporate + '", "type":"checkbox"}';

        }
        url+="&c__filters="+selection+"&c__consolidationCurrency="+this.selectedcurrency;
        url+="&c__accountGrouping="+this.selectedgrouping;
        url+="&c__source="+aux;
        this.template.querySelector("c-lwc_service-component").redirect({
            page: 'accounts', 
            urlParams: url
        });
    }
    @api
    updateCurrencies() {
        /*
        component.find("currency1").formatNumber(component.get(this.userpreferrednumberformat));
        component.find("currency2").formatNumber(component.get(this.userpreferrednumberformat));
        */
        this.template.querySelectorAll("c-lwc_display-amount")[0].formatNumber(this.userpreferrednumberformat);
        this.template.querySelectorAll("c-lwc_display-amount")[1].formatNumber(this.userpreferrednumberformat);
    }

    /*
    //Display default image when the country flag is unavailable
    defaultImage() {
        var profUrl = imageFlag + '/Default.svg';
        event.target.src = profUrl;
    }
    */
    
}