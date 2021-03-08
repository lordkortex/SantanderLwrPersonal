import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_trainingParent extends LightningElement {

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }
}