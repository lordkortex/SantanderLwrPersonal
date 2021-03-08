import { LightningElement, api, track } from 'lwc';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import deactivePain002 from '@salesforce/label/c.deactivePain002';
import confirmationDeactivePain002 from '@salesforce/label/c.confirmationDeactivePain002';
import painDeactivatedCorrectly from '@salesforce/label/c.painDeactivatedCorrectly';
import cancel from '@salesforce/label/c.cancel';
import deactive from '@salesforce/label/c.deactive';
import painNotDeactivatedCorrectly from '@salesforce/label/c.painNotDeactivatedCorrectly';

// Import apex class
import deletePain002Account from '@salesforce/apex/CNT_BackFrontPain002Table.deletePain002Account';

export default class Lwc_backFrontRemovePain002 extends LightningElement {

    label= {
        deactivePain002,
        confirmationDeactivePain002,
        painDeactivatedCorrectly,
        cancel,
        deactive,
        painNotDeactivatedCorrectly
    }

    @api isdelete = false;
    @api todelete = {account : '', bic : ''};

    @track toastType = "success";
    @track showToast = false;
    @track toastMessage;
    @track accountId;

    connectedCallback(){
        loadStyle(this, santanderStyle +'/style.css');
    }

    openModel() {
        // for Display Model,set the "isOpen" attribute to "true"
        this.isdelete = true;
    }
   
    closeModel() {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle" 
        this.isdelete = false;
    }

    doDelete() {
        try {
            if(this.todelete.bic != '' && this.todelete.account != ''){
                deletePain002Account({account: this.todelete.account, bic: this.todelete.bic})
                .then( result => {
                    this.isdelete = false;
                    this.toastType = "success";
                    this.toastMessage = this.label.painDeactivatedCorrectly;
                    this.showToast = true;
                })
                .catch( error => {
                    this.toastType = "error";
                    this.toastMessage = this.label.painNotDeactivatedCorrectly;
                    this.showToast = true;
                    if (error) {
                        console.log("Error message: " + error);
                    } 
                    else {
                        console.log("Unknown error");
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    } 


}