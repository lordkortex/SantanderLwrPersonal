import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
//import  from '@salesforce/label/c.';

export default class lwc_title extends LightningElement{

    @api title = 'N/A'; //A sentence provided by parent component to display as a page title
    @api subtitle //A sentence provided by parent component to display as a page subtitle
    @api displaydownloadicon = false; //Flag to display the download icon
    @api displaysearchicon = false; //Flag to display the search icon
    @api displayaddicon = false; //Flag to display the add icon
    @api issearching = false; //Attribute to check if the search icon is activated
    @api isshowingtoast = false; //Attribute if the toast is showing
    @api toasttext  	

    get isNotNullSubtitle(){
        return this.subtitle ? true : false;
    }

    get displayAnyIcon(){
        return (this.displayaddicon || this.displaydownloadicon || this.displaysearchicon);
    }
    
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }
  

    onButtonClick(event) {
        var whichButton = event.currentTarget.id;

        var downloadClicked = whichButton == "downloadIcon";
        var searchClicked = whichButton == "searchIcon";
        var addClicked = whichButton == "addIcon";

        const buttonclickedevent = new CustomEvent('buttonclickedevent', {
            downloadClicked : downloadClicked,
            searchClicked : searchClicked,
            addClicked : addClicked
        })
        this.dispatchEvent(buttonclickedevent);
    }
}