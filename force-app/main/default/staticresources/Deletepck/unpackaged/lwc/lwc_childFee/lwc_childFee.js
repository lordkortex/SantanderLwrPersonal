import { LightningElement, api } from 'lwc';

export default class Lwc_childFee extends LightningElement {

    @api index;
    @api itemfees;

    get isIndexGTZero(){
        //var index = event.target.dataset.index;
        //var index = this.template.querySelector('[data-index="index"]');
        return this.index > 0;
    }

    get getAmount()
    {
        return this.itemfees[1];
        
    }

    get getCurrency(){
        return this.itemfees[0];
    }

}