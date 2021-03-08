import { LightningElement, api } from 'lwc';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_customLookupResult extends LightningElement {

    @api orecord;
    @api iconname;

    connectedCallback(){
        loadStyle(this, santanderStyle +'/style.css');
    }

    selectRecord(){      
        var getSelectRecord = this.orecord;

        const oSelectedRecordEvent = new CustomEvent("oselectedrecordevent", {
            detail: {recordByEvent: getSelectRecord}
        });
        this.dispatchEvent(oSelectedRecordEvent);
    }
}