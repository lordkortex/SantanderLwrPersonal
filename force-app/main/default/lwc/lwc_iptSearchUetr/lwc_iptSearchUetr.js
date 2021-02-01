import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import images
import imageMessage from '@salesforce/resourceUrl/Images';

// Import custom labels
import paymentByUETRTitle from '@salesforce/label/c.paymentByUETRTitle';
import paymentByUETRSub from '@salesforce/label/c.paymentByUETRSub';

export default class Lwc_iptSearchUetr extends LightningElement {

    label = {
        paymentByUETRTitle,
        paymentByUETRSub
    }

    get resourceImage(){
        return imageMessage + '/message.svg'
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }
}