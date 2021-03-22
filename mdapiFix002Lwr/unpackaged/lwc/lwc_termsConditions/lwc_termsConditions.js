import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import Apex method
import updateCheckboxTerms from '@salesforce/apex/CNT_TermsConditions_Controller.updateCheckboxTerms';

//Import labels
import terms1a from '@salesforce/label/c.terms1a';
import terms1b from '@salesforce/label/c.terms1b';
import terms2 from '@salesforce/label/c.terms2';
import terms3 from '@salesforce/label/c.terms3';
import terms4 from '@salesforce/label/c.terms4';
import terms5a from '@salesforce/label/c.terms5a';
import terms5b from '@salesforce/label/c.terms5b';
import terms6a from '@salesforce/label/c.terms6a';
import terms6b from '@salesforce/label/c.terms6b';
import terms7 from '@salesforce/label/c.terms7';
import terms8 from '@salesforce/label/c.terms8';
import terms9 from '@salesforce/label/c.terms9';
import terms10 from '@salesforce/label/c.terms10';
import terms11 from '@salesforce/label/c.terms11';
import terms12 from '@salesforce/label/c.terms12';
import terms13 from '@salesforce/label/c.terms13';
import terms14 from '@salesforce/label/c.terms14';
import termsConditions from '@salesforce/label/c.termsConditions'; 
import termsConditionsUse from '@salesforce/label/c.termsConditionsUse'; 
import webNexus from '@salesforce/label/c.webNexus'; 
import intelectualProperty from '@salesforce/label/c.intelectualProperty'; 
import responsibility from '@salesforce/label/c.responsibility'; 
import modifications from '@salesforce/label/c.modifications'; 
import lawJurisdiction from '@salesforce/label/c.lawJurisdiction'; 
import acceptTerms from '@salesforce/label/c.acceptTerms'; 
import continueLabel from '@salesforce/label/c.continue'; 
import termsNexusTitle1 from '@salesforce/label/c.termsNexusTitle1'; 
import termsNexusTitle2 from '@salesforce/label/c.termsNexusTitle2'; 
import termsNexusTitle3 from '@salesforce/label/c.termsNexusTitle3'; 
import termsNexusTitle4 from '@salesforce/label/c.termsNexusTitle4'; 
import termsNexus1 from '@salesforce/label/c.termsNexus1'; 
import termsNexus2 from '@salesforce/label/c.termsNexus2'; 
import termsNexus3 from '@salesforce/label/c.termsNexus3'; 
import termsNexus4 from '@salesforce/label/c.termsNexus4'; 
import termsNexus5 from '@salesforce/label/c.termsNexus5'; 
import termsNexus6 from '@salesforce/label/c.termsNexus6'; 
import termsNexus7 from '@salesforce/label/c.termsNexus7'; 
import termsNexus8 from '@salesforce/label/c.termsNexus8'; 
import termsNexus9 from '@salesforce/label/c.termsNexus9'; 
import termsNexus10 from '@salesforce/label/c.termsNexus10'; 
import termsNexus11 from '@salesforce/label/c.termsNexus11'; 
import termsNexus12 from '@salesforce/label/c.termsNexus12'; 
import termsNexus13 from '@salesforce/label/c.termsNexus13'; 
import termsNexus14_1 from '@salesforce/label/c.termsNexus14_1'; 
import termsNexus14_2 from '@salesforce/label/c.termsNexus14_2'; 
import termsNexus15 from '@salesforce/label/c.termsNexus15'; 
import termsNexus16 from '@salesforce/label/c.termsNexus16'; 
import termsNexus17 from '@salesforce/label/c.termsNexus17'; 
import termsNexus18 from '@salesforce/label/c.termsNexus18'; 
import termsNexus19 from '@salesforce/label/c.termsNexus19'; 
import termsNexus20_1 from '@salesforce/label/c.termsNexus20_1'; 
import termsNexus20_2 from '@salesforce/label/c.termsNexus20_2'; 
import termsNexus21 from '@salesforce/label/c.termsNexus21';
import thisIsYout from '@salesforce/label/c.thisIsYout';


export default class Lwc_termsConditions extends LightningElement{
    //Labels
    label ={
        terms1a,
        terms1b,
        terms2,
        terms3,
        terms4,
        terms5a,
        terms5b,
        terms6a,
        terms6b,
        terms7,
        terms8,
        terms9,
        terms10,
        terms11,
        terms12,
        terms13,
        terms14,
        termsConditions,
        termsConditionsUse,
        webNexus,
        intelectualProperty,
        responsibility,
        modifications,
        lawJurisdiction,
        acceptTerms,
        continueLabel,
        termsNexusTitle1,
        termsNexusTitle2,
        termsNexusTitle3,
        termsNexusTitle4,
        termsNexus1,
        termsNexus2,
        termsNexus3,
        termsNexus4,
        termsNexus5,
        termsNexus6,
        termsNexus7,
        termsNexus8,
        termsNexus9,
        termsNexus10,
        termsNexus11,
        termsNexus12,
        termsNexus13,
        termsNexus14_1,
        termsNexus14_2,
        termsNexus15,
        termsNexus16,
        termsNexus17,
        termsNexus18,
        termsNexus19,
        termsNexus20_1,
        termsNexus20_2,
        termsNexus21
    }
    //Attributes
    @api showmodal = false;
    @api buttondisabled = false;
    @api ischecked = false;
    @api country = 'GB';

    get isGreatBritain() {
        return this.country == 'GB' ? true : false;
    }

    get isSpain() {
        return this.country == 'ES' ? true : false;
    }

    get isCashNexus() {
        return this.country == 'CN' ? true : false;
    }

    get isChile() {
        return this.country == 'CL' ? true : false;
    }

    get isMexico() {
        return this.country == 'MX' ? true : false;
    }

    get isPoland() {
        return this.country == 'PL' ? true : false;
    }
    
    get isBrazil() {
        return this.country == 'Other' ? true : false;
    }

    //Connected Callback
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }

    change() {
        this.checkbox = this.template.querySelector('[value="checkbox-unique-id-73"]');
        if(this.checkbox.checked == true){
            this.buttonDisabled = false;
            this.isChecked = true;
        } else {
            this.buttonDisabled = true;
            this.isChecked = false;
        }
	}
    
    closeModal() {
        updateCheckboxTerms({selectedCheckbox : this.isChecked})
            .then(result => {
                console.log('Success updating Terms checkbox');
            })
            .catch(error => {
                console.log('Error updating Terms checkbox: ' + error);
        });
        
        const termsconditionsevent = new CustomEvent('termsconditionsevent', {
            isChecked: this.isChecked,
        })
        this.dispatchEvent(termsconditionsevent);
        
        this.showmodal = false;
    }
}