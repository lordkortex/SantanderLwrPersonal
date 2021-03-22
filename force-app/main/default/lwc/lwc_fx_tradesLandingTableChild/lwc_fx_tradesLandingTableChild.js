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
        return (this.item.value == 'SETTLEMENT INSTRUCTIONS PENDING');
    }
    get itemPaymentStatus002(){
        // return (this.item.value == '002');
        return (this.item.value == 'PENDING TO BE CONFIRMED');
    }
    get itemPaymentStatus003(){
        //return (this.item.value == '003');
        return (this.item.value == 'SETTLEMENT INSTRUCTIONS ASSIGNED');
    }
    get itemPaymentStatus997(){
        return (this.item.value == '997');
    }
    get itemPaymentStatus101(){
        return (this.item.value == '101');
    }
    get itemPaymentStatus201(){
        return (this.item.value == 'SETTLED');
    }
    get itemPaymentStatus998(){
        // return (this.item.value == '998');
        return (this.item.value == 'CANCELLED');
    }
    get itemPaymentStatus202(){
        return (this.item.value == 'TERMINATED');
    }
    get itemPaymentStatus999(){
        return (this.item.value == '999');
    }
    get itemPaymentStatus102(){
        return (this.item.value == 'CONFIRMED');
    }
    get itemPaymentStatus801(){
        return (this.item.value == 'REPLACED');
    }
    get itemPaymentStatus800(){
        return (this.item.value == '800');
    }
    get itemPaymentStatus103(){
        //return (this.item.value == '103');
        return (this.item.value == 'COMPLETE');
    }

    // get itemPaymentStatusIsNotNumber(){
    //     return isNaN(this.item.value);
    // }

    get typeStatus(){
        return (this.item.type == 'status');
    }
    get typeStandard(){
        return (this.item.type == 'text');
    }
    get typeDate(){
        return (this.item.type == 'date');
    }
    get typeCurrency(){
        return (this.item.type == 'currency');
    }
}