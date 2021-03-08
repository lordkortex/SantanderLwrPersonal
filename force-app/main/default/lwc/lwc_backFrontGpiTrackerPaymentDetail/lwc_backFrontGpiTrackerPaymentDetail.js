import { LightningElement } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_backFrontGpiTrackerPaymentDetail extends LightningElement {

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }
}