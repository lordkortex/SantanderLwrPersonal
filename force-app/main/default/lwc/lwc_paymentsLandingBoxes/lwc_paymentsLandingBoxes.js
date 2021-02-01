import { LightningElement,api } from 'lwc';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';

export default class Lwc_paymentsLandingBoxes extends LightningElement {
    
    @api paymentstatusboxes = []; 	    //description="A collection that contains the number of records of each payment status"
    @api selectedpaymentstatusbox={};   //description="Selected payment status"/>
    @api resetsearch;                	//description="Reset search when the button is clicked." />

    //<aura:registerEvent name="reloadAccounts" type="c:EVT_B2B_ReloadGetData" />

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        var paymentstatusboxesAux = JSON.parse(JSON.stringify(this.paymentstatusboxes));
        Object.keys(paymentstatusboxesAux).forEach(key => {
            paymentstatusboxesAux[key].class1 = paymentstatusboxesAux[key].statusName == this.selectedpaymentstatusbox.statusName ? 'slds-col slds-button slds-button-active' : 'slds-col slds-button';
            paymentstatusboxesAux[key].line = true;
            if (key+1 == paymentstatusboxesAux.length){
                paymentstatusboxesAux[key].line = false;
            }
        });
        this.paymentstatusboxes = paymentstatusboxesAux;

    }

    selectPaymentStatus (component, event, helper) {        
        var clickedPaymentStatus = event.currentTarget.id;
        var paymentStatusBoxes = this.paymentStatusBoxes;
        var selectedPaymentStatusBox = this.selectedpaymentstatusBox;
        if(!selectedPaymentStatusBox.isEmpty() ){
            if(selectedPaymentStatusBox.statusName == clickedPaymentStatus){
                this.selectedpaymentstatusBox = {};
                this.resetsearch = true;
                const reloadAccounts = new CustomEvent('reloadAccounts', {
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
}