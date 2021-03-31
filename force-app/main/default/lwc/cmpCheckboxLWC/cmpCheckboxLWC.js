import { LightningElement, api } from 'lwc';

import { loadScript, loadStyle }from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import custom_css_LWC from '@salesforce/resourceUrl/lwc_option_selection_checkbox';

export default class CmpCheckboxLWC extends LightningElement {
    @api name;
    @api options;
    @api value;

    connectedCallback() {
        loadStyle(this, Santander_Icons + '/style.css'),
        loadStyle(this, custom_css_LWC);
        
    }

    handleChange(e) {
        this.value = e.detail.value;
    }
}