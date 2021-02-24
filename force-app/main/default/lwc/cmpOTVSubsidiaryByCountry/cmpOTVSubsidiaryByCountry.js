import { LightningElement,api } from 'lwc';

export default class CmpOTVSubsidiaryByCountry extends LightningElement {

isshow;
@api country;
@api subsidiary;

    renderedCallback(){
        if(this.subsidiary.companyCountry == this.country){
            this.isshow = true;
        }else{
            this.isshow = false;
        }
    }
    
}