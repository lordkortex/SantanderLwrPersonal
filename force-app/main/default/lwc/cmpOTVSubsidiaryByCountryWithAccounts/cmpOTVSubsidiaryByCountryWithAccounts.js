import { LightningElement, api } from 'lwc';

export default class CmpOTVSubsidiaryByCountryWithAccounts extends LightningElement {

isshow;
@api country;
@api subsidiary;
@api lstaccounts={};

    renderedCallback(){
        if(this.subsidiary.country == this.country){
            this.isshow = true;
        }else{
            this.isshow = false;
        }
    }
}