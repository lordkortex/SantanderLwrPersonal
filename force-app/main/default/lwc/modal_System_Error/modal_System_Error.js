import { LightningElement } from 'lwc';

//Style
import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';


//Labels
import close from '@salesforce/label/c.close';
import instantTransfer from '@salesforce/label/c.instantTransfer';
import serviceDown from '@salesforce/label/c.serviceDown';
import workingYet from '@salesforce/label/c.workingYet';
import ERROR from '@salesforce/label/c.ERROR';
import errorCode000 from '@salesforce/label/c.errorCode000';
import WaitingAuthorizationResendHelp1 from '@salesforce/label/c.WaitingAuthorizationResendHelp1';
import WaitingAuthorizationResendHelp2 from '@salesforce/label/c.WaitingAuthorizationResendHelp2';
import progress25 from '@salesforce/label/c.progress25';
import cancelProcess from '@salesforce/label/c.cancelProcess';
import B2B_Button_Back from '@salesforce/label/c.B2B_Button_Back';
import backToPayments from '@salesforce/label/c.backToPayments';



export default class Modal_System_Error extends LightningElement {

    logo_symbol_red = Images + '/logo_symbol_red.svg';

    // Expose the labels to use in the template.
    label = {
        close,
        instantTransfer,
        serviceDown,
        workingYet,
        ERROR,
        errorCode000,
        WaitingAuthorizationResendHelp1,
        WaitingAuthorizationResendHelp2,
        progress25,
        B2B_Button_Back,
        cancelProcess,
        backToPayments
    };

    renderedCallback() {
        Promise.all([
            loadStyle(this, style + '/modal_System_Error.css') //specified filename
        ]).then(() => {
            //console.log('Files loaded.');
        }).catch(error => {
            console.log("Error " + error.body.message);
        });
    }



}