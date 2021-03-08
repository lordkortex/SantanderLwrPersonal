import { LightningElement, api, track } from 'lwc';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import selectOne from '@salesforce/label/c.selectOne';

export default class Lwc_backFronPain002TableRow extends LightningElement {

    label = {
        selectOne
    }

    @api item;
    @api itemposition;
    @api isdelete;
    @api todelete = {account : '', bic : ''};

    @track paymentId;
    @track account;
    @track isModify;

    connectedCallback(){
        loadStyle(this, santanderStyle +'/style.css');
    }

    modify() {
        if(this.isModify == true){
            this.isModify = false;
        }else{
            this.isModify = true;
        }
    }

    doDelete() {
        this.isDelete = true;
        this.toDelete.account = this.item.accountId;
        this.toDelete.bic = this.item.agentId;

        const deletePainEvent = new CustomEvent("deletepain", {
            detail: {toDelete: this.todelete}
        });
        this.dispatchEvent(deletePainEvent);
    }

    save() {
        if(this.selectedPeriodicity != null && this.selectedPeriodicity != undefined && this.selectedPeriodicity != this.label.selectOne){
            this.periodicity = this.selectedPeriodicity;
            this.isModify = false;
        }
    }
}