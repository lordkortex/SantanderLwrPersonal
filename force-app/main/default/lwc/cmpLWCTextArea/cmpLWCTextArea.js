import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import lwc_textarea from '@salesforce/resourceUrl/lwc_textarea';

export default class CmpLWCTextArea extends LightningElement {
    connectedCallback() {
        loadStyle(this, Santander_Icons + '/style.css'),
        loadStyle(this, lwc_textarea);
        
    }

    handleChange(event){
        const changeDescription = new CustomEvent('changedescription', {detail: {description : event.target.value}});
        this.dispatchEvent(changeDescription);
    }
}