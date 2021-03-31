import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import close from '@salesforce/label/c.close';
import welcomeHeader1 from '@salesforce/label/c.welcomeHeader1';
import welcomeDes1 from '@salesforce/label/c.welcomeDes1';
import welcomeHeader2 from '@salesforce/label/c.welcomeHeader2';
import welcomeDes2 from '@salesforce/label/c.welcomeDes2';
import welcomeHeader3 from '@salesforce/label/c.welcomeHeader3';
import welcomeDes3 from '@salesforce/label/c.welcomeDes3';
import welcomeHeader4 from '@salesforce/label/c.welcomeHeader4';
import welcomeDes4 from '@salesforce/label/c.welcomeDes4';
import welcomeHeader5 from '@salesforce/label/c.welcomeHeader5';
import welcomeDes5 from '@salesforce/label/c.welcomeDes5';
import welcomeCheckbox from '@salesforce/label/c.welcomeCheckbox';

//Import methods
import updateCheckboxWelcomePack from '@salesforce/apex/CNT_WelcomePack_Controller.updateCheckboxWelcomePack'

//Import images
import imageWelcomePack from '@salesforce/resourceUrl/Images';

export default class Lwc_WelcomePackCarousel extends LightningElement{
    //Labels
    label = {
        close,
        welcomeHeader1,
        welcomeDes1,
        welcomeHeader2,
        welcomeDes2,
        welcomeHeader3,
        welcomeDes3,
        welcomeHeader4,
        welcomeDes4,
        welcomeHeader5,
        welcomeDes5,
        welcomeCheckbox,
    };

    //Attributes
    @api showmodal = false;
    
    //Vars
    @track selectedcheckbox = false;
    @track checkbox = false;

    //Images
    welcomePackSlide001 = imageWelcomePack + '/Welcome-pack-slide-001.svg';
    welcomePackSlide002 = imageWelcomePack + '/Welcome-pack-slide-002.svg';
    welcomePackSlide003 = imageWelcomePack + '/Welcome-pack-slide-003.svg';
    welcomePackSlide004 = imageWelcomePack + '/Welcome-pack-slide-004.svg';
    welcomePackSlide005 = imageWelcomePack + '/Welcome-pack-slide-005.svg';

    //Connected Callback
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    closeModal() {
        this.checkbox = this.template.querySelector('[value="checkbox-unique-id-73"]');
        if(this.checkbox.checked == true){
            this.selectedcheckbox = true;
        }
        updateCheckboxWelcomePack({selectedCheckbox : this.selectedcheckbox})
            .then(result => {
                console.log('Success updating checkbox');
                this.showmodal = false;
            })
            .catch(error => {
                console.log('Error updating checkbox: ' + error);
        });
    }
}