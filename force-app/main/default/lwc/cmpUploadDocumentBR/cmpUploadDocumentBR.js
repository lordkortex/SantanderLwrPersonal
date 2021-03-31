import { LightningElement, api, track } from 'lwc';
 

import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/dragAndDropCSS';
import icons from '@salesforce/resourceUrl/Santander_Icons';

//Labels
import PAY_information from '@salesforce/label/c.PAY_information';
import PAY_documentInfoTitle from '@salesforce/label/c.PAY_documentInfoTitle';
import PAY_documentInfoBody from '@salesforce/label/c.PAY_documentInfoBody';

export default class CmpDropAndDropDocuments extends LightningElement {

    label = {
        PAY_information,
        PAY_documentInfoTitle,
        PAY_documentInfoBody

    };

    @track currentFiles;
    @track paymentId;

    renderedCallback() {
        Promise.all([
            loadStyle(this, style),
            loadStyle(this, icons+'/style.css')
        ]).then(() => {
            //console.log('Files loaded.');
        }).catch(error => {
            console.log("Error " + error.body.message);
        });
    }
    onInformFiles(event){
        if(event.detail.currentFiles != null && event.detail.currentFiles.length>0){
            this.currentFiles = event.detail.currentFiles;
        }
    }
/*
    connectedCallback() {
        this.getRelatedFiles();
    }*/
}