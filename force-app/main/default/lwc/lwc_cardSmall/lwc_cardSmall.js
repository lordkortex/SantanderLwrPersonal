import { LightningElement,api } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle} from 'lightning/platformResourceLoader';

import T_Copy from '@salesforce/label/c.T_Copy';
import T_Download from '@salesforce/label/c.T_Download';

export default class Lwc_cardSmall extends LightningElement {
    label = {
        T_Copy,
        T_Download
    }
    @api title;

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }
}