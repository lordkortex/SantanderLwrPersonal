import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import paymentByUETRErrorTitle from '@salesforce/label/c.paymentByUETRErrorTitle';
import paymentByUETRErrorSub from '@salesforce/label/c.paymentByUETRErrorSub';
import resetSearch from '@salesforce/label/c.resetSearch';

export default class lwc_WelcomePackCarousel extends LightningElement{
    //Labels
    label = {
        paymentByUETRErrorTitle,
        paymentByUETRErrorSub,
        resetSearch,
    };

    //Attributes
    @api issearched = false;
    @api searchvalue = false;

    //Vars
    @track checkbox = false;

    //Connected Callback
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    resetSearch() {
		this.searchvalue = '';
        this.issearched = false;
        /*
        this.template.querySelector('text-input-id-1').focus();
        this.template.querySelector('[data-id="text-input-id-1"]').focus();
        this.template.querySelector("lightning-input[data-id=text-input-id-1]").focus();
        */
        const resetSearchEvent = new CustomEvent('resetsearch', {
            detail:  {searchvalue:this.searchvalue, issearched: this.issearched}
        });
            this.dispatchEvent(resetSearchEvent);
	}
}