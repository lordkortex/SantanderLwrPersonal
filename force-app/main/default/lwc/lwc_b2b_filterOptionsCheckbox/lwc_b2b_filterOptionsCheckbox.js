import { LightningElement, api} from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class Lwc_b2c_filteroptionscheckbox extends LightningElement {

    @api label;
    @api iden;
    @api ischecked = false;
    @api value ;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    handleCheckbox(event){
        var evcheck = event.target.checked;
        if(evcheck){
            this.ischecked = evcheck;
        }
    }
    
}