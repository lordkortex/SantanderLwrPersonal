import { LightningElement }     from 'lwc';

import { loadStyle }            from 'lightning/platformResourceLoader';
import Santander_Icons          from '@salesforce/resourceUrl/Santander_Icons';
import images                   from '@salesforce/resourceUrl/Images';
import { NavigationMixin }      from 'lightning/navigation';

// importing Custom Label
import cmpOTVSubsidiaryParent_1 from '@salesforce/label/c.cmpOTVSubsidiaryParent_1';
import cmpOTVSubsidiaryParent_2 from '@salesforce/label/c.cmpOTVSubsidiaryParent_2';
import cmpOTVSubsidiaryParent_3 from '@salesforce/label/c.cmpOTVSubsidiaryParent_3';

export default class CmpOTVSubsidiaryParent extends NavigationMixin(LightningElement) {

    label = {
        cmpOTVSubsidiaryParent_1,
        cmpOTVSubsidiaryParent_2,
        cmpOTVSubsidiaryParent_3
    }
    // Expose URL of assets included inside an archive file
    logoOneTrade = images + '/logo-santander-one-trade.png';
    cynths
    welcomeOnBoarding = images + '/onboarding-welcome-banner02@3x.png';
 
    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    } 

    goToDeclineInvitation(){ 
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "One_Trade_View_Decline_Invitation__c"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

}