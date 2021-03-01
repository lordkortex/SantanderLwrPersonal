import { LightningElement,api, track } from 'lwc';

export default class Lwc_paymentsLandingTableChild extends LightningElement {
    
    @api item;
    @api currentuser;

    @track checkedClass = 'slds-hint-parent';

    get isCheckedClass(){
        //!'slds-hint-parent'+ (item.checked == true ? ' selected' : '')
        if (this.item.checked){
            this.checkedClass = this.checkedClass + ' selected';
        }
        return this.checkedClass;
    }
    get trId(){
        //!'ROW_' +item.paymentId
        return ('ROW_'+ this.item.paymentId);
    }
    get itemPaymentStatus001(){
        return (this.item.paymentStatus == '001');
    }
    get itemPaymentStatus002(){
        return (this.item.paymentStatus == '002');
    }
    get itemPaymentStatus003(){
        return (this.item.paymentStatus == '003');
    }
    get itemPaymentStatus997(){
        return (this.item.paymentStatus == '997');
    }
    get itemPaymentStatus101(){
        return (this.item.paymentStatus == '101');
    }
    get itemPaymentStatus201(){
        return (this.item.paymentStatus == '201');
    }
    get itemPaymentStatus998(){
        return (this.item.paymentStatus == '998');
    }
    get itemPaymentStatus202(){
        return (this.item.paymentStatus == '202');
    }
    get itemPaymentStatus999(){
        return (this.item.paymentStatus == '999');
    }
    get itemPaymentStatus102(){
        return (this.item.paymentStatus == '102');
    }
    get itemPaymentStatus801(){
        return (this.item.paymentStatus == '801');
    }
    get itemPaymentStatus800(){
        return (this.item.paymentStatus == '800');
    }
    get itemPaymentStatus103(){
        return (this.item.paymentStatus == '103');
    }
}