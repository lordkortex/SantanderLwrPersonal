import { LightningElement, api } from 'lwc';

import legalInformation from '@salesforce/label/c.legalInformation';
import privacy from '@salesforce/label/c.privacy';
import termsConditions from '@salesforce/label/c.termsConditions';

import encryptData from '@salesforce/apex/CNT_Footer.encryptData';
import getIsCashNexus from '@salesforce/apex/CNT_Footer.getIsCashNexus';

import { NavigationMixin } from 'lightning/navigation';

export default class Lwc_footer extends NavigationMixin(LightningElement) {
    label = {
        legalInformation,
        privacy,
        termsConditions
    };

    @api iscashnexus = false;
    @api isgb = false;
    @api ises = false;
    @api ispl = false;
    @api iscl = false;
    @api ismx = false;
    @api isother = false;
    @api country;
    @api language = 'english';
    @api countrycondition = false;

    connectedCallback() {
       
       getIsCashNexus()
           .then((result) => {
                var iReturn = result;
                for ( var key in iReturn ) {
                    if(key == "isCashNexusUser"){
                        this.iscashnexus = iReturn[key];
                    }
                    if(key == "BIC"){
                    this.isBIC = iReturn[key];
                    }
                    if(key == "ES"){
                        this.ises = iReturn[key];
                    }
                    if(key == "GB"){
                        this.isgb = iReturn[key];
                    }
                    if(key == "PL"){
                        this.ispl = iReturn[key];
                    }
                    if(key == "CL"){
                        this.iscl = iReturn[key];
                    }
                    if(key == "MX"){
                        this.ismx = iReturn[key];
                    }
                    if(key == "Other"){
                        this.isother = iReturn[key];
                    }
                    if(key == "polish"){
                        if(iReturn[key] == true){
                            this.language = "polish";
                        }
                    }
                }
                                
                if(this.isgb == true) {
                    this.country = "GB";
                }
                if(this.ises == true) {
                    this.country = "ES";
                }
                if(this.ispl == true) {
                    this.country = "PL";
                }
                if(this.iscl == true) {
                    this.country = "CL";
                }
                if(this.ismx == true) {
                    this.country = "MX";
                }
                if(this.isother == true) {
                    this.country = "Other";
                }
                if(this.iscashnexus == true) {
                    this.country = "CN";
                }
                //html condition
                if (this.country != 'ES'){
                    this.countrycondition = true;
                }

            })
            .catch(error => {
                this.error = error;
            });

    }
    
    goToLegalInformation() {

        var url = "c__country="+this.country+"&c__language="+this.language;
        this.goTo("legal-information", url);
    }

    goToPrivacy() {

        var url = "c__country="+this.country;
        this.goTo("privacy", url);
    }

    goToTerms() {

        var url = "c__country="+this.country+"&c__language="+this.language;
        this.goTo("terms-and-conditions", url);
    }
    
    goTo(page, url) {
        var results = this.encrypt(url);
        this[NavigationMixin.Navigate]({type: "comm__namedPage", attributes: {pageName: page}, state: {params : results}});
    }
        
    encrypt (data) {  
		var result = ''
        encryptData({str : data})
			.then((value) => {
				result = value;
				})
			.catch((error) => {
				console.log(error); // TestError
			});
		return result;
	}

}