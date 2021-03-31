import { LightningElement,api } from 'lwc';
import {loadStyle } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_paymentsLandingBoxes extends LightningElement {
    
    @api paymentstatusboxes = []; 	    //description="A collection that contains the number of records of each payment status"
    @api selectedpaymentstatusbox={};   //description="Selected payment status"/>
    @api resetsearch;                	//description="Reset search when the button is clicked." />

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        var paymentstatusboxesAux = JSON.parse(JSON.stringify(this.paymentstatusboxes));
        console.log('Payments status boxes: ' + paymentstatusboxesAux);
        Object.keys(paymentstatusboxesAux).forEach(key => {
            paymentstatusboxesAux[key].class1 = paymentstatusboxesAux[key].statusName == this.selectedpaymentstatusbox.statusName ? 'slds-col slds-button slds-button-active' : 'slds-col slds-button';
            paymentstatusboxesAux[key].line = true;
            if (key+1 == paymentstatusboxesAux.length){
                paymentstatusboxesAux[key].line = false;
            }
        });
        this.paymentstatusboxes = paymentstatusboxesAux;

    }

    @api 
    updatePaymentStatusBoxes(){
        var paymentstatusboxesAux = JSON.parse(JSON.stringify(this.paymentstatusboxes));
        console.log('### Lwc_paymentsLandingBoxes ### updatePaymentStatusBoxes() ::: Payments status boxes: ' + paymentstatusboxesAux);
        Object.keys(paymentstatusboxesAux).forEach(key => {
            paymentstatusboxesAux[key].class1 = paymentstatusboxesAux[key].statusName == this.selectedpaymentstatusbox.statusName ? 'slds-col slds-button slds-button-active' : 'slds-col slds-button';
            paymentstatusboxesAux[key].line = true;
            if (key+1 == paymentstatusboxesAux.length){
                paymentstatusboxesAux[key].line = false;
            }
        });
        this.paymentstatusboxes = paymentstatusboxesAux;

    }

    selectPaymentStatus (event) {
        var clickedPaymentStatus = event.currentTarget.id;
        var paymentStatusBoxes = this.paymentstatusboxes;
        var selectedPaymentStatusBox = this.selectedpaymentstatusbox;
        if(selectedPaymentStatusBox){
            if(clickedPaymentStatus.startsWith(selectedPaymentStatusBox.statusName)){
                this.selectedpaymentstatusbox = {};
                this.resetsearch = true;
                const reloadaccounts = new CustomEvent('reloadaccounts', {
                    detail: {
                        "reload" : true,
                    }
                });
                this.dispatchEvent(reloadaccounts);
            }else{
                for(var key in paymentStatusBoxes){
                    if(clickedPaymentStatus.startsWith(paymentStatusBoxes[key].statusName)){
                        this.selectedpaymentstatusbox = paymentStatusBoxes[key];                
                    }
                } 
            }
        }else{
            for(var key in paymentStatusBoxes){
                if(clickedPaymentStatus.startsWith(paymentStatusBoxes[key].statusName)){
                    this.selectedpaymentstatusbox = paymentStatusBoxes[key];                
                }
            }		 
        }

        /*
        for(var key in this.paymentstatusboxes){
            if(clickedPaymentStatus.startsWith(paymentStatusBoxes[key].statusName)){
                this.selectedpaymentstatusbox = paymentStatusBoxes[key];                
            }
        }
        */
        const changeselectedpaymentstatusbox = new CustomEvent('changeselectedpaymentstatusbox', {
            detail: {
                selectedbox :  this.selectedpaymentstatusbox
            }
        });
        this.dispatchEvent(changeselectedpaymentstatusbox);
        
        
    }
}