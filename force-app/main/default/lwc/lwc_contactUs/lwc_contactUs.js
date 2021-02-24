import { LightningElement,api, track } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader'; 
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import contactUs from '@salesforce/label/c.contactUs';
import callUs from '@salesforce/label/c.callUs';
import callUsText from '@salesforce/label/c.callUsText';
import sendUsEmail from '@salesforce/label/c.sendUsEmail';
import sendUsEmailText from '@salesforce/label/c.sendUsEmailText';
import phone from '@salesforce/label/c.phone';
import Mail from '@salesforce/label/c.Mail';

export default class Lwc_contactUS extends LightningElement {

    label = {
        contactUs,
        callUs,
        callUsText,
        Mail,
        sendUsEmail,
        sendUsEmailText,
        phone
    };

    @api phonecontactus;  //"Phone to use in contact us phone" 
    @api mailcontactus;   //"Mail to use in contact us phone"
    @track isFirstTime = false;

    get telephoneHref(){
        //'tel:'+ v.phoneContactUs
        var ret = 'tel:';
        if(this.phonecontactus){
            ret = ('tel:'+ this.phonecontactus);
        }
        return ret;
    } 

    get mailHref(){
        //'mailto:'+ v.mailContactUs
        var ret = 'mailto:';
        if(this.mailcontactus){
            ret = ('mailto:'+ this.mailcontactus);
        }
        return ret;
    }

    renderedCallback(){
        if(!this.isFirstTime){
            this.isFirstTime = true;
            loadStyle(this, santanderStyle + '/style.css');
            console.log('renderedCallback contactUs');
            this.getDataCS();
        }
    }

    getDataCS() {
        //component.find("Service").callApex2(component, helper, "c.getDataContacUs", {}, this.getDataCustomSeting);
        this.template.querySelector("c-lwc_service-component").onCallApex({
            callercomponent:'contactUs', 
            controllermethod: 'getDataContacUs', 
            actionparameters: {}
        });
    }
    
    successcallback(event){
										  
        if(event.detail.callercomponent === 'contactUs'){
            console.log('Event details: ' + event.detail);
            this.getDataCustomSeting(event.detail.value);
        }
    }

    getDataCustomSeting(response) {
		if(response != null){
			this.phonecontactus = response.phoneNumberContacUs__c;
			this.mailcontactus = response.contactUsMail__c;
		}
	}
}