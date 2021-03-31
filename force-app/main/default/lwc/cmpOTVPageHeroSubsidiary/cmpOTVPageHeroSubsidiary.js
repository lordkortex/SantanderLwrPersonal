import { LightningElement, api}         from 'lwc';

import { loadStyle }                from 'lightning/platformResourceLoader';
import Santander_Icons              from '@salesforce/resourceUrl/Santander_Icons';
import images                       from '@salesforce/resourceUrl/Images';
import { NavigationMixin }          from 'lightning/navigation';
import getMatrixOwnerName           from '@salesforce/apex/CNT_OTV_PageHeroSubsidiary.getMatrixOwnerName';

// importing Custom Label
import cmpOTVPageHeroSubsidiary_1   from '@salesforce/label/c.cmpOTVPageHeroSubsidiary_1';
import cmpOTVPageHeroSubsidiary_2   from '@salesforce/label/c.cmpOTVPageHeroSubsidiary_2';
import cmpOTVPageHeroSubsidiary_3   from '@salesforce/label/c.cmpOTVPageHeroSubsidiary_3';

export default class CmpOTVPageHeroSubsidiary extends NavigationMixin(LightningElement) {

    label = {
        cmpOTVPageHeroSubsidiary_1,
        cmpOTVPageHeroSubsidiary_2,
        cmpOTVPageHeroSubsidiary_3
    }

    // Expose URL of assets included inside an archive file
    heroReference = images + '/hero_reference_01.svg';

    @api matrixOwnerName = null;

    connectedCallback() {
        getMatrixOwnerName().then((results)=>{
            this.matrixOwnerName = results;
            console.log('MatrixOwnerName: ' + this.matrixOwnerName);
        })
    }
 
    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
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

    goToUsers() {
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "One_Trade_View_Users__c"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
        
}