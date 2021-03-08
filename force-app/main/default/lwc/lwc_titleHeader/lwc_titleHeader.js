import { LightningElement, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_titleHeader extends LightningElement {

    @api title;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }
}