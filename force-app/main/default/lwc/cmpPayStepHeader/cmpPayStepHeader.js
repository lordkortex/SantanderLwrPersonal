import { api, LightningElement } from 'lwc';

//STYLE
import { loadStyle } from 'lightning/platformResourceLoader';
import style from '@salesforce/resourceUrl/Santander_Icons';
import Images from '@salesforce/resourceUrl/Images';

export default class CmpPayStepHeader extends LightningElement {

    // ATTRIBUTES
    @api stepNumber;
    @api stepTitle;
}