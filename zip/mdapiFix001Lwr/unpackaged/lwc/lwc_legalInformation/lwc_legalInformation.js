import { LightningElement, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader'; 
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import decryptData from '@salesforce/apex/CNT_termsFooter.decryptData';

import legalInformation from '@salesforce/label/c.legalInformation';
import legalNotice from '@salesforce/label/c.legalNotice';
import legalNexus1 from '@salesforce/label/c.legalNexus1';
import legalNexus2 from '@salesforce/label/c.legalNexus2';
import legalPoland1 from '@salesforce/label/c.legalPoland1';
import legalPoland2 from '@salesforce/label/c.legalPoland2';

import legalInformation_br from '@salesforce/label/c.legalInformation_br';
import legalNotice_es from '@salesforce/label/c.legalNotice_es';
import legalNexus1_es from '@salesforce/label/c.legalNexus1_es';
import legalNexus2_es from '@salesforce/label/c.legalNexus2_es';
import legalPoland2_pl from '@salesforce/label/c.legalPoland2_pl';

export default class Lwc_legalInformation extends LightningElement {

    currentPageReference = null; 
    urlStateParameters = null;
 
    /* Params from Url */
    paramsUrl;
    @track desencriptadoUrl;
    @track country = 'Other';
    @track language = 'english';
 
    label = {
        legalInformation,legalNotice,legalNexus1,legalNexus2,legalPoland1,legalPoland2,
        legalInformation_br,legalNotice_es,legalNexus1_es,legalNexus2_es,legalPoland2_pl
    };
    
    // control carga de textos por pais e idioma
    get isBrazil() {
        return this.country == 'Other' ? true : false; 
    }

    get isCashNexus() {
        return this.country == 'CN' ? true : false; 
   }

   get isSpain() {
    return this.country == 'ES' ? true : false;
    }

    get isGreatBritain() {
        return this.country == 'GB' ? true : false;
    }

    get isChile() {
        return this.country == 'CL' ? true : false;
    }

    get isPoland() {
        return this.country == 'PL' ? true : false;
    }

    get isLanguagePoland() {
        return this.language == 'polish' ? true : false;
    }

    get isNotLanguagePoland() {
        return this.language != 'polish' ? true : false;
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
         
        // capturamos la url y desencriptamos para obtener el pais y el idioma
        var miUrl = window.location.href;        
        let newURL = new URL(miUrl).searchParams;
        this.paramsUrl = newURL.get('params');
        this.decrypt(this.paramsUrl);
        
    }

    // metodo para desencriptar
    decrypt (data) {
        var result = '';
        decryptData({str : data})
        .then((value) => {
            result = value;
            this.desencriptadoUrl = result;
            var sURLVariables = this.desencriptadoUrl.split('&');
            var sParameterName;     
            
            console.log('sURLVariables: ' + sURLVariables);

            for ( var i = 0; i < sURLVariables.length; i++ ) {
                sParameterName = sURLVariables[i].split('=');  
                if (sParameterName[0] === 'c__country') { 
                    sParameterName[1] === undefined ? 'Not found' : this.country = sParameterName[1];
                    console.log('c__country: ' + this.country);
                }
                if (sParameterName[0] === 'c__language') { 
                    sParameterName[1] === undefined ? 'Not found' : this.language = sParameterName[1];
                    console.log('c__language: ' + this.language);
                }
            }
            
            })
        .catch((error) => {
            console.log('c__country: ' + this.country);
            console.log('c__language: ' + this.language);
            console.log(error); // TestError
        });
    return result;
    }
    
}