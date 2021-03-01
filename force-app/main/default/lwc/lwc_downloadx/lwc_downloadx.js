import {LightningElement, api} from 'lwc';

//Style
import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';


//Labels
import close from '@salesforce/label/c.close';
import downloadSantaderIDApp from '@salesforce/label/c.downloadSantaderIDApp';
import scanQR from '@salesforce/label/c.scanQR';
import SantanderIDisADedicatedApp from '@salesforce/label/c.SantanderIDisADedicatedApp';
import useSantanderIDtoAuthorize from '@salesforce/label/c.useSantanderIDtoAuthorize';
import appStore from '@salesforce/label/c.appStore';
import googlePlay from '@salesforce/label/c.googlePlay';

export default class Lwc_downloadx extends LightningElement {

    //Labels

    // Expose the labels to use in the template.
    label = {
        close,
        downloadSantaderIDApp,
        scanQR,
        SantanderIDisADedicatedApp,
        useSantanderIDtoAuthorize,
        appStore,
        googlePlay
    };

    //Load Icons and Style
    apple_icon_white = Images + '/apple_icon_white.svg';
    googlePlay_icon = Images + '/googlePlay_icon.svg';
    qr = Images + '/qr-code.svg';
    
    renderedCallback() {
        Promise.all([
            loadStyle(this, style + '/style.css') //specified filename
        ]).then(() => {
            //console.log('Files loaded.');
        }).catch(error => {
            console.log("Error " + error.body.message);
        });
    }

    //Visibility variables

    @api show;
    main = true;
    apple = false;
    google = false;

    hideModal(event){
        this.main = true;
        this.apple = false;
        this.google = false;

        //Send event to aura parent
        event.preventDefault();
        const selectEvent = new CustomEvent('hidemodal', {
            detail: { showDownload: false }
        });
        this.dispatchEvent(selectEvent);
    }

    showApple(){
        this.apple = true;
        this.main = false;
        this.google = false;
    }

    showGoogle(){
        this.apple = false;
        this.main = false;
        this.google = true;
    }
}