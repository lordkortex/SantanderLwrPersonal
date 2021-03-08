import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader'; 

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class lwc_logAdminSearchRow extends LightningElement {  

    @api rowdata = {};

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }
}