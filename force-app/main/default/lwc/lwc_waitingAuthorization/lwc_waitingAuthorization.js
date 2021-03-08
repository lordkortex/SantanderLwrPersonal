import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import imagePack from '@salesforce/resourceUrl/Images';

import { NavigationMixin } from 'lightning/navigation';

import WaitingAuthorizationExpired from '@salesforce/label/c.WaitingAuthorizationExpired';
import errorGetOTP_Strategic from '@salesforce/label/c.errorGetOTP_Strategic';
import WaitingAuthorization2 from '@salesforce/label/c.WaitingAuthorization2';
import WaitingAuthorizationfail1 from '@salesforce/label/c.WaitingAuthorizationfail1';
import WaitingAuthorization1 from '@salesforce/label/c.WaitingAuthorization1';
import WaitingAuthorizationResend from '@salesforce/label/c.WaitingAuthorizationResend';
import WaitingAuthorizationResendHelp1 from '@salesforce/label/c.WaitingAuthorizationResendHelp1';
import WaitingAuthorizationResendHelp2 from '@salesforce/label/c.WaitingAuthorizationResendHelp2';
import apologiesElectronicSignature from '@salesforce/label/c.apologiesElectronicSignature';
import please from '@salesforce/label/c.please';
import WaitingAuthorizationfail2 from '@salesforce/label/c.WaitingAuthorizationfail2';
import apologiesSantaderId from '@salesforce/label/c.apologiesSantaderId';
import waitingForAuthorizationLocalBank from '@salesforce/label/c.waitingForAuthorizationLocalBank';
import WaitingAuthorization3 from '@salesforce/label/c.WaitingAuthorization3';

export default class Lwc_waitingAuthorization extends NavigationMixin(LightningElement)  {

    Label={
        WaitingAuthorizationExpired,
        errorGetOTP_Strategic,
        WaitingAuthorization2,
        WaitingAuthorizationfail1,
        WaitingAuthorization1,
        WaitingAuthorizationResend,
        WaitingAuthorizationResendHelp1,
        WaitingAuthorizationResendHelp2,
        apologiesElectronicSignature,
        please,
        WaitingAuthorizationfail2,
        apologiesSantaderId,
        waitingForAuthorizationLocalBank,
        WaitingAuthorization3
    }

    @api expired = false;
    @track error = false;
    @api errorOTP = false;
    @api spinner = false;
    @track localuser = false;
    
    @track isShowDownload = false;
    @track showDownloadInitial = false;

    @track imageAlert = imagePack + '/alert.svg';
    @track imageId = imagePack + '/i-d.jpg';

    @api setError(value){
        this.error = value;
    }

    @api setLocaluser(value){
        this.localuser = value;
    }
    
    @api setSpinner(value){
        this.spinner = value;
    } 

    get cardClass(){
        return 'cardAuthorization ' + (this.error ? ' errorClass ' : '') + 'card_s slds-card card_buttons';
    }

    get spinnerEqualsTrue(){
        return this.spinner == true;
    }

    get showDivisionLine(){
        return !this.error && !this.errorOTP && !this.expired;
    }

    get footerExpired(){
        return (((!this.error && !this.errorOTP) || (this.error && !this.errorOTP)) && !this.expired);
    }

    connectedCallback() {
		loadStyle(this, santanderStyle + '/style.css');
        this.showDownloadInitial = true;

    }    

    handleResend() {
        this.dispatchEvent(new CustomEvent('resendaction'));
    } 

    goToSupport() {
        this.goTo('contactsupport','');
	}

	showDownload() {
        this.isShowDownload = true;
	}

	setShowDownload(event) {
        //this.isShowDownload = event.getParam('showDownload');
        this.isShowDownload  = event.detail.showDownload;
    }
    
    goTo(page, url) {
        //let navService = component.find('navService');
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