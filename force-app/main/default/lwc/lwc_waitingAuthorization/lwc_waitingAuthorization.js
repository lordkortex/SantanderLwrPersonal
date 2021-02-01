import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';
import imagePack from '@salesforce/resourceUrl/Images';

import { NavigationMixin } from 'lightning/navigation';

import WaitingAuthorizationExpired from '@salesforce/label/c.WaitingAuthorizationExpired';
import errorGetOTP_Strategic from '@salesforce/label/c.errorGetOTP_Strategic';
import WaitingAuthorization2 from '@salesforce/label/c.WaitingAuthorization2';
import WaitingAuthorizationfail1 from '@salesforce/label/c.WaitingAuthorizationfail1';
import WaitingAuthorization1 from '@salesforce/label/c.WaitingAuthorization1';
import WaitingAuthorizationResend from '@salesforce/label/c.WaitingAuthorizationResend';
import WaitingAuthorizationResendHelp1 from '@salesforce/label/c.WaitingAuthorizationResendHelp1';

export default class Lwc_waitingAuthorization extends LightningElement {

    @api expired = false;
    @api error = false;
    @api errorOTP = false;
    @api spinner = false;
    
    @track showDownload = false;

    @track imageAlert = imagePack + '/alert.svg';
    @track imageApp = imagePack + '/app-santander.svg';

    Label={
        WaitingAuthorizationExpired,
        errorGetOTP_Strategic,
        WaitingAuthorization2,
        WaitingAuthorizationfail1,
        WaitingAuthorization1,
        WaitingAuthorizationResend,
        WaitingAuthorizationResendHelp1
    }

    connectedCallback() {
		loadStyle(this, santanderStyle + '/style.css');

    }

    get spinnerEqualsTrue(){
        return this.spinner == true;
    }
    get footerExpired(){
        return (this.error || this.errorOTP) && this.expired;
    }
    

    handleResend() {
        this.dispatchEvent(new CustomEvent('resendaction'));
    } 

    goToSupport() {
        this.goTo('contactsupport','');
	}

	showDownload() {
        this.showDownload = true;
	}

	setShowDownload(event) {
        this.showDownload = event.getParam('showDownload');
    }
    
    goTo(page, url) {
        let navService = component.find('navService');
        if (url != '') {
            this.encrypt( url)
            .then((result) => {

                this[NavigationMixin.Navigate]({
                    type: "comm__namedPage", 
                    attributes: {
                        pageName: page
                    },
                    state: {
                        params : result
                    }
                });

                
            });
        } else {

            this[NavigationMixin.Navigate]({
                type: "comm__namedPage", 
                attributes: {
                    pageName: page
                },
                state: {
                    params : ''
                }
            });
            
        }
    }
}