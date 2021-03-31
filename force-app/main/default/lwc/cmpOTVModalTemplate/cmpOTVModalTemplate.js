import { LightningElement,api } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
// importing Custom Label
import cmpOTVModalRemove_1 from '@salesforce/label/c.cmpOTVModalRemove_1';
import cmpOTVModalTemplateDeclination_1 from '@salesforce/label/c.cmpOTVModalTemplateDeclination_1';
import cmpOTVModalTemplateDeclination_2 from '@salesforce/label/c.cmpOTVModalTemplateDeclination_2';
import cmpOTVModalTemplateDeclination_3 from '@salesforce/label/c.cmpOTVModalTemplateDeclination_3';
import cmpOTVModalTemplateDeclination_4 from '@salesforce/label/c.cmpOTVModalTemplateDeclination_4';
import cmpOTVModalRemove_6 from '@salesforce/label/c.cmpOTVModalRemove_6';
import cmpOTVModalRemove_7 from '@salesforce/label/c.cmpOTVModalRemove_7';
import cmpOTVModalRemove_8 from '@salesforce/label/c.cmpOTVModalRemove_8';


export default class CmpOTVModalTemplate extends LightningElement {

    label = {
        cmpOTVModalRemove_1,
        cmpOTVModalTemplateDeclination_1,
        cmpOTVModalTemplateDeclination_2,
        cmpOTVModalTemplateDeclination_3,
        cmpOTVModalTemplateDeclination_4
    }

    @api showmodal = false;
    connectedCallback(){
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }
    goBack(event){
        var evento;
        if(this.showmodal){
            evento = new CustomEvent('cancelservice', {detail: {cancelAccess : false}});
        }
        this.showmodal = false;
        this.dispatchEvent(evento);
    }

    cancelProcess(event){
        var evento;
        if(this.showmodal){
            evento = new CustomEvent('cancelservice', {detail: {cancelAccess : true}});
        }
        this.showmodal = false;
        this.dispatchEvent(evento);
    }

}