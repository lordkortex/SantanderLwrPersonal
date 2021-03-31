import { LightningElement,api } from 'lwc';

export default class CmpOTVFilterAccountsBySubsidiary extends LightningElement {
isshow;
@api country;
@api subsidiary;
@api account;
@api disabled;
//@api subsidiarieslist;
subsidiarieslist = [];
checked = false;
cuentaSeleccionada;
    renderedCallback(){
        console.log('disabled' + this.disabled);
        if(this.account.status == 'ACTIVE'){
            this.checked = true;
        }else{
            this.checked = false;
        }
        
        if(this.account.country == this.country && this.account.companyName == this.subsidiary.companyName){
            this.isshow = true;
        }else{
            this.isshow = false;
        }
        
    }

    saveAccount(event){
        try {
            //Cuenta Seleccionada
            console.log('Entra saveAccount');
            this.cuentaSeleccionada = event.target.getAttribute("data-item");
            const changeAccount = new CustomEvent('changeaccount', {detail: {account : this.cuentaSeleccionada}});
            this.dispatchEvent(changeAccount);
        } catch (error) {
            console.log(error);
        }
    }

    get checkedEnabled(){
        if(this.checked && !this.disabled){
            console.log('checkedEnabled');
            return true;
        }else{
            return false;
        }
    }
    get UncheckedEnabled(){
        if(!this.checked && !this.disabled){
            console.log('UncheckedEnabled');
            return true;
        }else{
            return false;
        }
    }
}