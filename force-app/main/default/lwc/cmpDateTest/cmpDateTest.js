import { LightningElement, api, wire, track } from 'lwc';
import { getRecord,getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import getUserDateFormat from '@salesforce/apex/Global_Utilities.getUserDateFormat';

import uId from '@salesforce/user/Id';
import USERFORMATDATE from '@salesforce/schema/User.User_DateFormat__c';

export default class cmpDateTest extends LightningElement {
    @wire (getRecord, { recordId: uId, fields: [USERFORMATDATE] }) 
    usuarioDate;

    
    get userFormDate(){
        return getFieldValue(this.usuarioDate.data, USERFORMATDATE);
    }

    
    @track miFormato;

    @api
    get userFormat(){
        return this.miFormato;

    }
    set userFormat(value){
        this.miFormato = value;
    }
 
    connectedCallback(){
        console.log("entro en connected DATE");
        /*Promise.all(this.devolver()).then(() => {
            console.log("entro en Promise");

            this.formatUserDatahelper();
        })
        .catch((error) => {
            console.log("ERROR");
        });*/
        //this.formatUserDatahelper();
        this.buscaFormato();

    }

    buscaFormato(){
        getUserDateFormat({userId: uId}).then((result)=>{
            console.log("result: " + result);
            this.userFormat=result;
        }).catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log('Finally');
        })
    }
    renderedCallback() {
        console.log("entro en rendered DATE");

debugger;
        //this.formatUserDatahelper();
    }

    formatUserDatahelper(){
        console.log("entro en format");
        console.log(this.userFormDate);
        console.log("usuario: ", this.usuarioDate);
        debugger;
        if (this.userFormDate != undefined){
            console.log("ha entrado en el IF userFormDate");
        }
    }

}