import { LightningElement,api } from 'lwc';

export default class CmpOTVFilterAccountsByCountry extends LightningElement {
isshow;
@api country;
@api subsidiary;
@api lstaccounts={};
@api subsidiarieslist;
    renderedCallback(){
        console.log('this.account.country');
        console.log(this.subsidiarieslist);
        if(this.subsidiary.country == this.country){
            this.isshow = true;
        }else{
            this.isshow = false;
        }
    }
    changeaccount(event){
        console.log('CmpOTVFilterAccountsByCountry');
        console.log(event.detail.account);
        const changeAccount = new CustomEvent('changeaccount', {detail: {account : event.detail.account}});
        this.dispatchEvent(changeAccount);
    }
}