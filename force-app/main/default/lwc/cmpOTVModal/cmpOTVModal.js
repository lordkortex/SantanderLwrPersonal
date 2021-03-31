import { LightningElement } from 'lwc';

// importing Resources
import { loadStyle } from 'lightning/platformResourceLoader';
import Santander_Icons from '@salesforce/resourceUrl/Santander_Icons';
import images from '@salesforce/resourceUrl/Images';
import lwc_modal_welcome from '@salesforce/resourceUrl/lwc_modal_welcome';

// importing Custom Label
import cmpOTVModal_1 from '@salesforce/label/c.cmpOTVModal_1';
import cmpOTVModal_2 from '@salesforce/label/c.cmpOTVModal_2';

// importing Custom Controller
//import updateCheckBox from '@salesforce/apex/CNT_OTV_WelcomePack_Controller.updateCheckboxWelcomePack';
import updateCheckBox from '@salesforce/apex/CNT_OTV_UsersLanding.updateCheckboxWelcomePack';



export default class CmpOTVModal extends LightningElement {

    label = {
        cmpOTVModal_1,
        cmpOTVModal_2
    };
    // Expose URL of assets included inside an archive file
    imagesLanding = images + '/Welcome-pack-slide-001.svg';
    imagesConfiguration = images + '/Welcome-pack-slide-002.svg';
    selectedCheckbox = false;
    showModal = true;

    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
            loadStyle(this,lwc_modal_welcome)
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

    closeModal(){
        this.showModal = false;
    }
        
}