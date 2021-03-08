import { LightningElement, api, track} from 'lwc';

import {loadStyle, loadScript } from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import flags from '@salesforce/resourceUrl/Flags';

export default class Lwc_b2b_account_suggestion extends LightningElement {

    @api account //description="Account suggestion."
    @api showmore  // default="true" description="Flag to show more details if its required"

    flagCountry;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.flagCountry = flags + '/' + this.account.country + '.svg'
    }

    handleClick (event) {
        let accountLet = this.account;

        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();

        // Creates the event with the contact ID data.
        const selectedEvent = new CustomEvent('selected', { 
            detail: {account : accountLet} 
        });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    get notEmptyBalance(){
        if(this.account.currencyCodeAvailableBalance != null &&
            this.account.currencyCodeAvailableBalance != ''){
            return true;
        }
        return false;       
    }

}