import { LightningElement,api } from 'lwc';

// importing Resources
import { loadStyle }        from 'lightning/platformResourceLoader';
import Santander_Icons      from '@salesforce/resourceUrl/Santander_Icons';
import images               from '@salesforce/resourceUrl/Images';
import lwc_parent_otv       from '@salesforce/resourceUrl/lwc_parent_otv';
import { NavigationMixin }  from 'lightning/navigation';

import getUserInfo          from '@salesforce/apex/CNT_OTV_TalkWithAnExpert.getUserInfo';
// importing Custom Label
import cmpOTVParent_1       from '@salesforce/label/c.cmpOTVParent_1';
import cmpOTVParent_2       from '@salesforce/label/c.cmpOTVParent_2';
import cmpOTVParent_3       from '@salesforce/label/c.cmpOTVParent_3';
import cmpOTVParent_4       from '@salesforce/label/c.cmpOTVParent_4';
import cmpOTVParent_5       from '@salesforce/label/c.cmpOTVParent_5';
import cmpOTVParent_6       from '@salesforce/label/c.cmpOTVParent_6';

export default class CmpOTVParent extends NavigationMixin(LightningElement) {
    label = {
        cmpOTVParent_1,
        cmpOTVParent_2,
        cmpOTVParent_3,
        cmpOTVParent_4,
        cmpOTVParent_5,
        cmpOTVParent_6
    }
    // Expose URL of assets included inside an archive file
    OTVLogo = images + '/logo-santander-one-trade.png';
    heroReference = images + '/hero_reference_01.svg';

    @api user;
    step1Complete;

    connectedCallback() {
            loadStyle(this, Santander_Icons + '/style.css'),
            loadStyle(this,lwc_parent_otv)
            getUserInfo().then((results)=>{
                this.user = results;
            }).catch(error => {
                console.log(error);
            });
    }
    
    goToSteps(){ 
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "One_Trade_View_Steps__c"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    goToTalkWithAnExpert(){ 
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "One_Trade_View_Talk_With_An_Expert__c"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

}