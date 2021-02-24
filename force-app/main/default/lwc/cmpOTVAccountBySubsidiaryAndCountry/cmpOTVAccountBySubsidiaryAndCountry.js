import { LightningElement, api } from 'lwc';

export default class CmpOTVAccountBySubsidiaryAndCountry extends LightningElement {

isshow;
@api country;
@api subsidiary;
@api account;

    renderedCallback(){
        if(this.account.country == this.country && this.account.companyName == this.subsidiary.companyName){
            this.isshow = true;
        }else{
            this.isshow = false;
        }
    }
}