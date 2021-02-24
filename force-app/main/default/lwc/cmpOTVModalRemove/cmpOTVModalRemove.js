import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
// importing Custom Label
import cmpOTVModalRemove_1 from '@salesforce/label/c.cmpOTVModalRemove_1';
import cmpOTVModalRemove_2 from '@salesforce/label/c.cmpOTVModalRemove_2';
import cmpOTVModalRemove_3 from '@salesforce/label/c.cmpOTVModalRemove_3';
import cmpOTVModalRemove_4 from '@salesforce/label/c.cmpOTVModalRemove_4';
import cmpOTVModalRemove_5 from '@salesforce/label/c.cmpOTVModalRemove_5';


export default class CmpOTVPaginationUsersLanding extends LightningElement {

    label = {
        cmpOTVModalRemove_1,
        cmpOTVModalRemove_2,
        cmpOTVModalRemove_3,
        cmpOTVModalRemove_4,
        cmpOTVModalRemove_5
    }

    connectedCallback(){
        this.resetActivePage();
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }

}