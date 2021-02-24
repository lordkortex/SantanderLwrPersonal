import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import payment_titleOne from '@salesforce/label/c.payment_titleOne';
import payment_titleTwo from '@salesforce/label/c.payment_titleTwo';
import payment_titleThree from '@salesforce/label/c.payment_titleThree';
import payment_statusOne from '@salesforce/label/c.payment_statusOne';
import payment_statusTwo from '@salesforce/label/c.payment_statusTwo';
import payment_statusThree from '@salesforce/label/c.payment_statusThree';
import payment_statusFour from '@salesforce/label/c.payment_statusFour';
import reasonNotSpecified from '@salesforce/label/c.reasonNotSpecified';
import statusUpdate from '@salesforce/label/c.statusUpdate';
import creditedAmount from '@salesforce/label/c.creditedAmount';
import orderAmount from '@salesforce/label/c.orderAmount';
import amount from '@salesforce/label/c.amount';
import Fees from '@salesforce/label/c.Fees';

export default class lwc_iptDetailHeader extends LightningElement{
    
    //Labels
    label = {
        payment_titleOne,
        payment_titleTwo,
        payment_titleThree,
        payment_statusOne,
        payment_statusTwo,
        payment_statusThree,
        payment_statusFour,
        reasonNotSpecified,
        statusUpdate,
        creditedAmount,
        orderAmount,
        amount,
        Fees,
    }

    //Attributes
    @api item = [];
    @api showfee;// = '1';
    @api lastupdate;
    @api status;
    @api reason;
    @api amount;
    @api currency;
    @api currentbank;
    @api totaltransaction;
    @api totalfee;
    @api rejectedmsg;
    @api start;
    @api uetrsearchresult;
    index = 0;
    
    _showfee;
    get showfee(){
        return this._showfee;
    }

    set showfee(showfee){
        this._showfee = showfee;
    }

    
    //Connected Callback
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    get isEmptyReason(){
        return this.item.reason == '' || this.item.reason == null;
    }

    get existsReason(){
        return this.item.reason != '' && this.item.reason != null;
    }

    get existsCurrentBank(){
        return this.item.currentBank != undefined && this.item.currentBank != null;
    }

    get isInProgressStatus(){
        return this.item.status == 'ACSP' && (this.item.reason=='G000' || this.item.reason=='G001');
    }

    get isRejectedStatus(){
        return this.item.status == 'RJCT';
    }

    get isCompletedStatus(){
        return this.item.status == 'ACSC' || this.item.status == 'ACCC';
    }

    get isOnHoldStatus() {
        return this.item.status == 'ACSP' && (this.item.reason =='G002'|| this.item.reason =='G003' || this.item.reason=='G004');
    }

    get isNotNullUETRCode(){
        return this.uetrsearchresult != null && this.uetrsearchresult != undefined && this.uetrsearchresult.uetrCode != null && this.uetrsearchresult.uetrCode != undefined;
    }

    get areNotFeesEqualToZero(){
        if (this.item.fees){
            return this.item.fees.length!=0 && this._showfee; 
        }
    }

   /* get isIndexGTZero(){
        //var index = event.target.dataset.index;
        var index = this.template.querySelector('[data-index="index"]');
        return index > 0;
    }*/

    get getAmount(){
        //return this.item.fees[0][1];
        //return this.item[1];
        return this.item.amount;
    }

    get getCurrency(){
        //return this.item.fees[0][0];
        //return this.item[0];
        return this.item.currencyAux;
    }

    get getConfirmedAmount(){
        var amount,tcurrency = '';
        if(this.item != null && this.item != undefined && this.item.confirmedAmount != null && this.item.confirmedAmount != undefined){
            amount = this.item.confirmedAmount.amount;
            tcurrency = this.item.confirmedAmount.tcurrency;
        }
        return {amount,tcurrency};
    }

    get getInstructedAmount(){
        var amount,tcurrency = '';
        if(this.item != null && this.item != undefined && this.item.instructedAmount != null && this.item.instructedAmount != undefined){
            amount = this.item.instructedAmount.amount;
            tcurrency = this.item.instructedAmount.tcurrency;
        }
        return {amount,tcurrency};
    }
}