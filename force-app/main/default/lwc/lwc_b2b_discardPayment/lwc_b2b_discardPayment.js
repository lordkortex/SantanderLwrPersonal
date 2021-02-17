import { LightningElement, api, track} from 'lwc';

import {loadStyle, loadScript } from 'lightning/platformResourceLoader';
//import santanderSheetJS from '@salesforce/resourceUrl/SheetJS';
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';

// DESCOMENTAR LAS LABELS UNA VEZ ESTÉN EN EL ENTORNO
import close from '@salesforce/label/c.close';
import B2B_DiscardPayment from '@salesforce/label/c.B2B_DiscardPayment';
import B2B_CancelPayment from '@salesforce/label/c.B2B_CancelPayment';
import B2B_DiscardPayment_YES from '@salesforce/label/c.B2B_DiscardPayment_YES';
import B2B_DiscardPayment_NO from '@salesforce/label/c.B2B_DiscardPayment_NO';
import B2B_CancelPayment_YES from '@salesforce/label/c.B2B_CancelPayment_YES';
import B2B_CancelPayment_NO from '@salesforce/label/c.B2B_CancelPayment_NO';

export default class Lwc_b2b_discardPayment extends LightningElement {

    label = {
        close,
        B2B_DiscardPayment,
        B2B_CancelPayment,
        B2B_DiscardPayment_YES,
        B2B_DiscardPayment_NO,
        B2B_CancelPayment_YES,
        B2B_CancelPayment_NO
    }

    @api fromutilitybar;
    @api fromdetail;

    get fromDetailOrUtilityBar(){
        return this.fromutilitybar || this.fromdetail;
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    handleCancelYES() {
        this.cancelPayment(true);
        var fromUtilityBar = this.fromutilitybar;
		var fromDetail = this.fromdetail;
        if(fromUtilityBar || fromDetail){
            this.cancelSelectedPayment(true);
        } 
    }

    handleCancelNO() {
        this.cancelPayment(false);
        var fromUtilityBar = this.fromutilitybar;
		var fromDetail = this.fromdetail;
        if(fromUtilityBar || fromDetail){
            this.cancelSelectedPayment(false);
        }
    }

    cancelPayment(cancel) {
        const cancelpayment = new CustomEvent('cancelpayment', {
            detail: {
                "cancel" : cancel,
            }
        });
        this.dispatchEvent(cancelpayment);
    }

    cancelSelectedPayment(cancelSelected) {
        const cancelselectedpayment = new CustomEvent('cancelselectedpayment', {
            detail: {
                "cancelSelectedPayment" : cancelSelected
            }
        });
        this.dispatchEvent(cancelselectedpayment);
    }
}