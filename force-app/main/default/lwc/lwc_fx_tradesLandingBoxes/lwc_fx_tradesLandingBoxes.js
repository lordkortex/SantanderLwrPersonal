import { LightningElement,api,track } from 'lwc';
import {loadStyle } from 'lightning/platformResourceLoader';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_fx_tradesLandingBoxes extends LightningElement {
    
    @api paymentstatusboxes = []; 	    //description="A collection that contains the number of records of each payment status"
    @api selectedpaymentstatusbox={};   //description="Selected payment status"/>
    @api resetsearch;                	//description="Reset search when the button is clicked." />
    @track filters;

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

    selectPaymentStatus (event) {        
        var clickedPaymentStatus = event.currentTarget.id;
        var paymentStatusBoxes = this.paymentStatusBoxes;
        var selectedPaymentStatusBox = this.selectedpaymentstatusBox;
        if(selectedPaymentStatusBox.isEmpty){
            if(selectedPaymentStatusBox.statusName == clickedPaymentStatus){
                this.selectedpaymentstatusBox = {};
                this.resetsearch = true;
                const reloadAccounts = new CustomEvent('reloadaccounts', {
                    detail: {
                        "reload" : true,
                    }
                });
                this.dispatchEvent(reloadAccounts);
            }else{
                for(var i=0; i<paymentStatusBoxes.length; i++){
                    if(paymentStatusBoxes[i].statusName == clickedPaymentStatus){
                        this.selectedpaymentstatusBox = paymentStatusBoxes[i];                
                    }
                } 
            }
        }else{
            for(var i=0; i<paymentStatusBoxes.length; i++){
                if(paymentStatusBoxes[i].statusName == clickedPaymentStatus){
                    this.selectedpaymentstatusBox = paymentStatusBoxes[i];                
                }
            }		 
        }
        
    }
    boxesFilters (event){
        var clickedBox = event.currentTarget.dataset.id;
        console.log("##clickedBox:" +clickedBox);
        if(clickedBox == 'Pending'){
            this.filters = {"filtersRequired":1,"statusSelected":["Pending To Be Confirmed"]};
        }else if(clickedBox == 'Settled'){
            this.filters = {"filtersRequired":1,"statusSelected":["Settled"]};
        }else if(clickedBox == 'LastMoth'){
            this.filters = {"filtersRequired":1,"statusSelected":["Settled"]};
        }

        const sendFilters = new CustomEvent('boxesfilters',
                    { detail : {filters : this.filters}
                });
                this.dispatchEvent(sendFilters);
    }
}