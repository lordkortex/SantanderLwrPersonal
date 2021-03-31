import { LightningElement } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import images from '@salesforce/resourceUrl/Images';

import updateCheckBox from '@salesforce/apex/CNT_OTV_WelcomePack_Controller.updateCheckboxWelcomePack';



export default class CmpNewCase extends LightningElement {


    value = 'subsidiariesIssues';

    get options() {
        return [
            { label: 'Subsidiaries issues', value: 'subsidiariesIssues' },
            { label: 'Test', value: 'test' },
            { label: 'Test 2', value: 'test2' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
        
}