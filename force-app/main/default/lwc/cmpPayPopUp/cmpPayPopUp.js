import { api, LightningElement } from 'lwc';

//STYLE
import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';

//labels

import close from '@salesforce/label/c.close';



export default class CmpPayPopUp extends LightningElement {
  
    logo_symbol_red = Images + '/logo_symbol_red.svg';
  
    saveForLater = true;   
    @api headingMsg;
    @api contentMsg;
    @api primaryBtn;
    @api secondaryBtn;



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
            loadStyle(this, style + '/modal_System_Error.css'), //specified filename
            
        ]).then(() => {
         
            //console.log('Files loaded.');
        }).catch(error => {
            console.log("Error " + error.body.message);
        });
    }
    saveAction(event){
        event.preventDefault();
        const selectEvent = new CustomEvent('saveAction');
        this.dispatchEvent(selectEvent);
    }
    closeAction(event){
        event.preventDefault();
        const selectEvent = new CustomEvent('closeAction');
        this.dispatchEvent(selectEvent);
    }

}