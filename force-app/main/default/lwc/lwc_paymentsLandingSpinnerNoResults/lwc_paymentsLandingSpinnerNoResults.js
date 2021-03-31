import {LightningElement,track,api} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import B2B_ResetSearch from '@salesforce/label/c.B2B_ResetSearch';


export default class lwc_paymentsLandingParent extends LightningElement{

    //Labels
    label = {
        B2B_ResetSearch
    }

    @track showfiltermodal = false; //Controls whether the All Filters modal shows or not
    @api title = ''; //Title
    @api subtitle = ''; //Subtitle
    @api resetsearch = false;//Reset search when the button is clicked
    @api backgroundimage = false; //Sets background image in the CSS
    @api showresetbutton; //Show reset button
    @api landing = false; 

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.doInit();
    }
    
    doInit(){
        this.showresetbutton = true;
    }

    handleClick(event) {
        this.resetsearch = true;
        const cmpEvent = new CustomEvent('reloadaccounts', {
            reload : true,
            landing : true
        });
        this.dispatchEvent(cmpEvent);
    }

    get backgroundClass(){
        this.backgroundimage ? 'table-background':'no-background';
    }
}