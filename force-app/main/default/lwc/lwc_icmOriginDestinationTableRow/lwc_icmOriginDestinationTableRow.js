import { LightningElement, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import imageFlag from '@salesforce/resourceUrl/Flags';

export default class Lwc_icmOriginDestinationTableRow extends LightningElement {

    @api cmpdata;
    @api currentstagenumber;
    @api checked;

    imgSource;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        this.imgSource = imageFlag + '/' + this.cmpdata.value.countryCode + '.svg';
    }

    get stageNumberEq1(){
        return this.currentstagenumber == 1;
    }

    buttonSelected(event){
        //console.log("asdpjasdpasdjpoasdjasdpjoasdasdjoasdjasdpo ");

        const compEvent = new CustomEvent("checkchanged", {
            detail : {
                data : this.cmpdata,
                checked : event.currentTarget.checked
            }
        });

        this.dispatchEvent(compEvent)

    }
}