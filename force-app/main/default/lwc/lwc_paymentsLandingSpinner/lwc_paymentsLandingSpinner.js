import {LightningElement,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import LoadingPayments from '@salesforce/label/c.LoadingPayments';
import JustASecond from '@salesforce/label/c.JustASecond';


export default class lwc_paymentsLandingParent extends LightningElement{

    //Labels
    label = {
        LoadingPayments,
        JustASecond,
    }

    @track waitString = this.label.JustASecond + '...';

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }
}