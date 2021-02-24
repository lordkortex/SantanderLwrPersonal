import { api, LightningElement,track } from 'lwc';

//STYLE
import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';

//labels

import close from '@salesforce/label/c.close';



export default class Modal_Remove extends LightningElement {
  
    logo_symbol_red = Images + '/logo_symbol_red.svg'; 
  
    @api headingMsg;
    @api contentMsg;
    @api primaryBtn;
    @api secondaryBtn;
    @api id;

 


label = {
    close

}; 


/*
    handleChange(event) {
        this.areDetailsVisible = event.target.checked;
    }
*/
  
    renderedCallback() {
        Promise.all([
            loadStyle(this, style + '/style.css'), //specified filename
            
        ]).then(() => {
         
            //console.log('Files loaded.');
        }).catch(error => {
            console.log("Error " + error.body.message);
        });
    }
    saveAction(){
        //custom event
        const passEvent = new CustomEvent('saveaction', {
            detail:{} 
        });
        this.dispatchEvent(passEvent);        
    }
    closeAction(){
        //custom event
        const passEvent = new CustomEvent('closeaction', {
            detail:{} 
        });
        this.dispatchEvent(passEvent);  
    }

}