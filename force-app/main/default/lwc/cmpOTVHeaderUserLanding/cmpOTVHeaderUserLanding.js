import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';

// importing Custom Label
import cmpOTVHeaderUserLanding_1 from '@salesforce/label/c.cmpOTVHeaderUserLanding_1';
import cmpOTVHeaderUserLanding_2 from '@salesforce/label/c.cmpOTVHeaderUserLanding_2';
import cmpOTVHeaderUserLanding_3 from '@salesforce/label/c.cmpOTVHeaderUserLanding_3';

export default class CmpOTVHeaderUserLanding extends LightningElement {

    label = {
        cmpOTVHeaderUserLanding_1,
        cmpOTVHeaderUserLanding_2,
        cmpOTVHeaderUserLanding_3
    }

    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])


    }
    
    selectCheckBox(event) {            
        this.selectedCheckbox = event.target.checked;
        console.log("Entra");
        updateCheckBox({ selectedCheckbox: this.selectedCheckbox})
        .catch(error => {
            this.error = error;
            console.log(error);
        });
    }
}