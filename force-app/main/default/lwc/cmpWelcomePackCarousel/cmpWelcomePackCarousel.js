import { LightningElement, api, wire } from 'lwc';

import updateCheckboxWelcomePack from '@salesforce/apex/CNT_WelcomePack_Controller.updateCheckboxWelcomePack';

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

import image from '@salesforce/resourceUrl/Images';

export default class CmpWelcomePackCarousel extends LightningElement {

    @api showModal;
    @api selectedCheckbox;

    image1 = image + "/Welcome-pack-slide-001.svg";
    image2 = image + "/Welcome-pack-slide-002.svg";
    image3 = image + "/Welcome-pack-slide-003.svg";
    image4 = image + "/Welcome-pack-slide-004.svg";
    image5 = image + "/Welcome-pack-slide-005.svg";

    welcomeHeader1 = welcomeHeader1;
    welcomeDes1 = welcomeDes1;
    welcomeHeader2 = welcomeHeader2;
    welcomeDes2 = welcomeDes2;
    welcomeHeader3 = welcomeHeader3;
    welcomeDes3 = welcomeDes3;
    welcomeHeader4 = welcomeHeader4;
    welcomeDes4 = welcomeDes4;
    welcomeHeader5 = welcomeHeader5;
    welcomeDes5 = welcomeDes5;
    welcomeCheckbox = welcomeCheckbox;

    /*label = {
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
        welcomeCheckbox
    };*/


    closeModal(){

        var selectedCheckbox = false;
        
        console.log("Out")
        if(this.template.querySelector('[data-id="checkbox-unique-id-73"]').checked == true){
            console.log("Ha entrado en el if");
            selectedCheckbox = true;
        }

        updateCheckboxWelcomePack({selectedCheckbox: selectedCheckbox})
        .then(()=>{
        }).catch((error) =>{
            console.log(error);
        }).finally(()=>{
            console.log('Finally');
        })

        this.showModal = false;
    }
}