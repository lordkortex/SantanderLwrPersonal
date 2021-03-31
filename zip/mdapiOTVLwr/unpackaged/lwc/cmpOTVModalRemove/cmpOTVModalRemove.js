import { LightningElement,api } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
// importing Custom Label
import cmpOTVModalRemove_1 from '@salesforce/label/c.cmpOTVModalRemove_1';
import cmpOTVModalRemove_2 from '@salesforce/label/c.cmpOTVModalRemove_2';
import cmpOTVModalRemove_3 from '@salesforce/label/c.cmpOTVModalRemove_3';
import cmpOTVModalRemove_4 from '@salesforce/label/c.cmpOTVModalRemove_4';
import cmpOTVModalRemove_5 from '@salesforce/label/c.cmpOTVModalRemove_5';
import cmpOTVModalRemove_6 from '@salesforce/label/c.cmpOTVModalRemove_6';
import cmpOTVModalRemove_7 from '@salesforce/label/c.cmpOTVModalRemove_7';
import cmpOTVModalRemove_8 from '@salesforce/label/c.cmpOTVModalRemove_8';
import cmpOTVModalRemove_9 from '@salesforce/label/c.cmpOTVModalRemove_9';
import cmpOTVModalRemove_10 from '@salesforce/label/c.cmpOTVModalRemove_10';
import cancel               from '@salesforce/label/c.cancel';

export default class CmpOTVModalRemove extends LightningElement {

    label = {
        cmpOTVModalRemove_1,
        cmpOTVModalRemove_2,
        cmpOTVModalRemove_3,
        cmpOTVModalRemove_4,
        cmpOTVModalRemove_5,
        cmpOTVModalRemove_6,
        cmpOTVModalRemove_7,
        cmpOTVModalRemove_8,
        cmpOTVModalRemove_9,
        cmpOTVModalRemove_10,
        cancel
    }

    @api type1 = false;
    @api type2 = false;
    @api giveaccess = false;
    @api name;
    connectedCallback(){
        //this.resetActivePage();
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }
    renderedCallback(){
        console.log('Nombre: ' + this.name);
    }
    goBack(event){
        var goBack;
        if(this.type1){
            goBack = new CustomEvent('goterms', {detail: {cancelTerms : false}});
        }else{
            console.log('llega2?');
            goBack = new CustomEvent('cancelservice', {detail: {cancelAccess : false}});
        }
        this.type1 = false;
        this.type2 = false;
        this.giveaccess = false;
        this.dispatchEvent(goBack);

    }
    cancelProcess(event){
        var goCancel;
        if(this.type1){
            goCancel = new CustomEvent('goterms', {detail: {cancelTerms : true}});
        }else{
            goCancel = new CustomEvent('cancelservice', {detail: {cancelAccess : true}});
        }
        this.type1 = false;
        this.type2 = false;
        this.giveaccess = false;
        this.dispatchEvent(goCancel);

    }
    get conditionCancel(){
        if(!this.giveaccess && this.type2){
            console.log('entra 1');
            return true;
        }else{
            console.log('entra 2');
            return false;
        }
    }
    get conditionGive(){
        if(this.giveaccess && this.type2){
            console.log('entra 3');
            return true;
        }else{
            console.log('entra 4');
            return false;
        }
    }

}