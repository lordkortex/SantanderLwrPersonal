import { LightningElement, api, track } from 'lwc';

import getLstAccounts from '@salesforce/apex/testABR.getLstAccounts';
import setLstAccounts from '@salesforce/apex/testABR.setLstAccounts';


export default class Test extends LightningElement {

    @api accounts = [];
     itemList = [];
    connectedCallback(){
        
       getLstAccounts().then((results)=>{
            this.accounts = results;
            console.log('Results: ' + this.accounts);

        })
    }
 
    enrollmentAcct(event) {
        try {
            this.itemList.push(event.target.getAttribute("data-item"));
        } catch (error) {
            console.log(error);
        }
        
        console.log(event.target.getAttribute("data-item"));
        console.log(this.itemList);

    }

    aceptar(event) {
        console.log('Llega2');
        console.log(JSON.stringify(this.itemList));
        setLstAccounts({ updateStr:this.itemList})
        .then(result => {
            //this.contacts = result;   
            window.console.log(JSON.stringify(result));
        })
        .catch(error => {
            this.error = error;
        });

        
    }
    
}