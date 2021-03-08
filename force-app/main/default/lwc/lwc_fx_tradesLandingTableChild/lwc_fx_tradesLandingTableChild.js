import { LightningElement,api, track } from 'lwc';

export default class Lwc_fx_tradesLandingTableChild extends LightningElement {
    
    @api item;
    @api currentuser = {};

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
        return (this.item.status == '001');
    }
    get itemPaymentStatus002(){
        return (this.item.status == '002');
    }
    get itemPaymentStatus003(){
        return (this.item.status == '003');
    }
    get itemPaymentStatus997(){
        return (this.item.status == '997');
    }
    get itemPaymentStatus101(){
        return (this.item.status == '101');
    }
    get itemPaymentStatus201(){
        return (this.item.status == '201');
    }
    get itemPaymentStatus998(){
        return (this.item.status == '998');
    }
    get itemPaymentStatus202(){
        return (this.item.status == '202');
    }
    get itemPaymentStatus999(){
        return (this.item.status == '999');
    }
    get itemPaymentStatus102(){
        return (this.item.status == '102');
    }
    get itemPaymentStatus801(){
        return (this.item.status == '801');
    }
    get itemPaymentStatus800(){
        return (this.item.status == '800');
    }
    get itemPaymentStatus103(){
        return (this.item.status == '103');
    }

    get typeStatus(){
        console.log('status// ' + this.item.type)
        return (this.item.type == 'status');
    }
    get typeStandard(){
        return (this.item.type == 'standard');
    }
    get typeDate(){
        return (this.item.type == 'date');
    }
    get typeAmount(){
        return (this.item.type == 'amount');
    }
    get typeCounterAmount(){
        return (this.item.type == 'counter');
    }
}