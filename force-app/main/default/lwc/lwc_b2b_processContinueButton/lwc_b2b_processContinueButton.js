import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import B2B_Button_Continue from '@salesforce/label/c.B2B_Button_Continue';

export default class Lwc_b2b_processContinueButton extends LightningElement {

    label = {
        B2B_Button_Continue
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    handleContinue(){
        const handlecontinueevent = new CustomEvent('handlecontinue')
        this.dispatchEvent(handlecontinueevent);
    }
}