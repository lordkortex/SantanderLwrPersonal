import { LightningElement,api } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle} from 'lightning/platformResourceLoader';

export default class Lwc_title_horizontal extends LightningElement {

    @api title;
    @api subtitle;

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }
}