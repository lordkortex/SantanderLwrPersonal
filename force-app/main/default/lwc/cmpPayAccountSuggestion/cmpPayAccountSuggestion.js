import { LightningElement, api } from 'lwc';

//Style
import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';

//Labels 
import Registered from '@salesforce/label/c.Registered';


export default class CmpPayAccountSuggestion extends LightningElement {


label= {
    Registered
}    

    //Load Icons and Style
    PT = Images + '/PT.svg';
    MX = Images + '/MX.svg';

    @api account;
    key;

    renderedCallback() {
        Promise.all([
            loadStyle(this, style + '/style.css') //specified filename
        ]).then(() => {
            //console.log('Files loaded.');
        }).catch(error => {
            console.log("Error " + error.body.message);
        });
    }

    goToLanding(event){
        event.preventDefault();
        const selectEvent = new CustomEvent('goToLanding');
        this.dispatchEvent(selectEvent);
    }
}