import { LightningElement,api } from 'lwc';

import { NavigationMixin }          from 'lightning/navigation';
import { loadScript, loadStyle }    from 'lightning/platformResourceLoader';
import Santander_Icons              from '@salesforce/resourceUrl/Santander_Icons';
import custom_css_LWC               from '@salesforce/resourceUrl/lwc_header_description';

export default class CmpOTVHeaderDescription extends NavigationMixin(LightningElement) {
    @api title;
    @api subtitle;   

    connectedCallback() {
        loadStyle(this, Santander_Icons + '/style.css'),
        loadStyle(this, custom_css_LWC);
    }

    goBack(){
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "Home"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}