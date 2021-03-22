import { LightningElement, api, track } from 'lwc';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import { loadStyle } from'lightning/platformResourceLoader';

import B2B_Available_Balance from '@salesforce/label/c.B2B_Available_Balance';
import Recipient_details from '@salesforce/label/c.Recipient_details';
import Account_Holder from '@salesforce/label/c.Account_Holder';
import Account_Type from '@salesforce/label/c.Account_Type';
import B2B_Recipient_bank from '@salesforce/label/c.B2B_Recipient_bank';
import RUT from '@salesforce/label/c.RUT';
import B2B_Swift_code from '@salesforce/label/c.B2B_Swift_code';
import imageFlag from '@salesforce/resourceUrl/Flags';
export default class Lwc_b2b_card_account extends LightningElement {

    label = {
        B2B_Available_Balance, 
        Recipient_details,
        Account_Holder,
        Account_Type,
        B2B_Recipient_bank,
        RUT,
        B2B_Swift_code
    }

    @api account;
    @api selected;
    @api beneficiarydetails;
    @api userdata;
    @api accountdata;
    @api lessthan6accounts = false;
    imgSource;
    

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.imgSource = imageFlag + '/' + this.account.country + '.svg'
    }

    get contentAccountClass(){
        return this.beneficiarydetails == true ? 'content_account' : '';
    }

    get articleClass(){
        return 'cardAccount slds-card' + (this.selected == true ? ' card-selected' : '') + (this.beneficiarydetails ==  true ? ' card-alternative' : '');
    }
    
    get amountAvailableBalanceNotEmpty(){
        if(this.userdata){
            return this.account.amountAvailableBalance != null;
        }
        
    }

    get accountCountryIsCL(){
        return this.account.country == 'CL';
    }

    get accountTypeNotEmpty(){
        return this.account.type != null;
    }

    get accountBankNameNotEmpty(){
        return this.account.bankName != null;
    }

    get accountCountryNotCLGB(){
        return this.account.country != 'CL' && this.account.country != 'GB';
    }

    get accountDataDocNumber(){
        return this.accountdata.documentNumber != null;
    }

    get codigoBicNotEmpty(){
        return this.account.codigoBic != null;
    }
 
    selectCard(){
        let selected = this.selected;
        let lessThan6Accounts = this.lessthan6accounts;
        if (!selected) {
            let account = this.account;
            if (lessThan6Accounts && account) {
                const selectedaccountevent = new CustomEvent('selectedaccount', {detail : {account: account}});
                this.dispatchEvent(selectedaccountevent);
                this.selected = true;
            } else {
                const selectedcardevent = new CustomEvent('selectedcard', {detail : {account: account}});
                this.dispatchEvent(selectedcardevent);
            }
        }
    }

}