import {LightningElement,api} from 'lwc';

//Import labels
import T_Close from '@salesforce/label/c.T_Close';
import Toast_Success from '@salesforce/label/c.Toast_Success';


export default class lwc_successToast extends LightningElement{

    label = {
        T_Close,
        Toast_Success
    }

    @api showtoast = false; //Checks if the toast is showing
    @api messagetext = ''; //Text of the message

    clearToast(){
        this.showtoast = false;
    }
}