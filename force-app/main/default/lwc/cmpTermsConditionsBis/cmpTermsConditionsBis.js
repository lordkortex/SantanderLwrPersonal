import { LightningElement, api, wire, track} from 'lwc';

import updateCheckboxTerms from '@salesforce/apex/CNT_TermsConditions_Controller.updateCheckboxTerms';    
import termsConditions from '@salesforce/label/c.termsConditions';
import termsConditionsUse from '@salesforce/label/c.termsConditionsUse';
import terms1a from '@salesforce/label/c.terms1a';
import webNexus from '@salesforce/label/c.webNexus';
import terms1b from '@salesforce/label/c.terms1b';
import terms2 from '@salesforce/label/c.terms2';
import intelectualProperty from '@salesforce/label/c.intelectualProperty';
import terms3 from '@salesforce/label/c.terms3';
import terms4 from '@salesforce/label/c.terms4';
import responsibility from '@salesforce/label/c.responsibility';
import terms5a from '@salesforce/label/c.terms5a';
import terms5b from '@salesforce/label/c.terms5b';
import terms6a from '@salesforce/label/c.terms6a';
import terms6b from '@salesforce/label/c.terms6b';
import terms7 from '@salesforce/label/c.terms7';
import terms8 from '@salesforce/label/c.terms8';
import terms9 from '@salesforce/label/c.terms9';
import terms10 from '@salesforce/label/c.terms10';
import terms11 from '@salesforce/label/c.terms11';
import modifications from '@salesforce/label/c.modifications';
import terms12 from '@salesforce/label/c.terms12';
import lawJurisdiction from '@salesforce/label/c.lawJurisdiction';
import terms13 from '@salesforce/label/c.terms13';
import terms14 from '@salesforce/label/c.terms14';
import acceptTerms from '@salesforce/label/c.acceptTerms';
import continues from '@salesforce/label/c.continue';
import termsNexus1 from '@salesforce/label/c.termsNexus1';
import termsNexus2 from '@salesforce/label/c.termsNexus2';
import termsNexusTitle1 from '@salesforce/label/c.termsNexusTitle1';
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
import termsNexusTitle2 from '@salesforce/label/c.termsNexusTitle2';
import termsNexus13 from '@salesforce/label/c.termsNexus13';
import termsNexus14_1 from '@salesforce/label/c.termsNexus14_1';
import termsNexus14_2 from '@salesforce/label/c.termsNexus14_2';
import termsNexus15 from '@salesforce/label/c.termsNexus15';
import termsNexus16 from '@salesforce/label/c.termsNexus16';
import termsNexus17 from '@salesforce/label/c.termsNexus17';
import termsNexus18 from '@salesforce/label/c.termsNexus18';
import termsNexus19 from '@salesforce/label/c.termsNexus19';
import termsNexusTitle3 from '@salesforce/label/c.termsNexusTitle3';
import termsNexus20_1 from '@salesforce/label/c.termsNexus20_1';
import termsNexus20_2 from '@salesforce/label/c.termsNexus20_2';
import termsNexusTitle4 from '@salesforce/label/c.termsNexusTitle4';
import termsNexus21 from '@salesforce/label/c.termsNexus21';        

export default class cmpTermsConditionsBis extends LightningElement {

    @api showModal ='showModal';
    @track buttonDisabled = true;
    @track isChecked = false;
    @api country = 'GB';

    @track show;

//Labels

    termsConditions=termsConditions;
    termsConditionsUse=termsConditionsUse;
    terms1a=terms1a;
    webNexus=webNexus;
    terms1b=terms1b;
    terms2=terms2;
    intelectualProperty=intelectualProperty;
    terms3=terms3;
    terms4=terms4;
    responsibility=responsibility;
    terms5a=terms5a;
    terms5b=terms5b;
    terms6a=terms6a;
    terms6b=terms6b;
    terms7=terms7;
    terms8=terms8;
    terms9=terms9;
    terms10=terms10;
    terms11=terms11;
    modifications=modifications;
    terms12=terms12;
    lawJurisdiction=lawJurisdiction;
    terms13=terms13;
    terms14=terms14;
    acceptTerms=acceptTerms;
    continues=continues;
    termsNexus1=termsNexus1;
    termsNexus2=termsNexus2;
    termsNexusTitle1=termsNexusTitle1;
    termsNexus3=termsNexus3;
    termsNexus4=termsNexus4;
    termsNexus5=termsNexus5;
    termsNexus6=termsNexus6;
    termsNexus7=termsNexus7;
    termsNexus8=termsNexus8;
    termsNexus9=termsNexus9;
    termsNexus10=termsNexus10;
    termsNexus11=termsNexus11;
    termsNexus12=termsNexus12;
    termsNexusTitle2=termsNexusTitle2;
    termsNexus13=termsNexus13;
    termsNexus14_1=termsNexus14_1;
    termsNexus14_2=termsNexus14_2;
    termsNexus15=termsNexus15;
    termsNexus16=termsNexus16;
    termsNexus17=termsNexus17;
    termsNexus18=termsNexus18;
    termsNexus19=termsNexus19;
    termsNexusTitle3=termsNexusTitle3;
    termsNexus20_1=termsNexus20_1;
    termsNexus20_2=termsNexus20_2;
    termsNexusTitle4=termsNexusTitle4;
    termsNexus21=termsNexus21;
        
    connectedCallback(){
        console.log("ConnectedCallBack")
        if(this.showModal == "true"){
            console.log("dentro")
            this.show = true;
        }else{
            this.show = false;
        }
    }
        
    change () {

        this.buttonDisabled = false;
        this.isChecked = true;

    }
            
    get gb(){
        if(this.country == 'GB'){
            return true;}else{
                return false;
            }} 
    
    get spain(){
        if(this.country == 'ES'){
            return true}else{
                return false;
            }};
    
           
    get other(){
        if(this.country == 'Other'){
            return true}else{
                return false;
            }};
    
    get cashnexus(){
        if(this.country == 'CN'){
            return true}else{
                return false;
            }};
    
    get chile(){
        if(this.country == 'CL'){
            return true}else{
                return false;
            }};
    
    get polonia(){
        if(this.country == 'PL'){
            return true}else{
                return false;
            }};

    
    get mexico(){
        if(this.country == 'MX'){
            return true}else{
                return false;
                    }};


    closeModal () {
        
        var selectedCheckbox = this.isChecked;

        this.show = false;
        
        updateCheckboxTerms({selectedCheckbox : selectedCheckbox})
        .then(()=>{
            
        }).catch((error) =>{
            console.log(error);
        }).finally(()=>{
            console.log('Finally');
        })

        
        
        /*var iEvt = this.dispatchEvent(new CustomEvent("isChecked")); //forma provisional de migrar el registerevent
        iEvt.setParams({
                    "isChecked" : selectedCheckbox
                });*/
                
                
        
    }
}