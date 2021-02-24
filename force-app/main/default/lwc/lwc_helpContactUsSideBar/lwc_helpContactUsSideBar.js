import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader'; 
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import decryptData from '@salesforce/apex/CNT_termsFooter.decryptData';

import sendUsEmail from '@salesforce/label/c.sendUsEmail';
import attentionByMail from '@salesforce/label/c.attentionByMail';
import callUs from '@salesforce/label/c.callUs';
import customerService from '@salesforce/label/c.customerService';

import sendUsEmail_es from '@salesforce/label/c.sendUsEmail_es';
import sendUsEmail_br from '@salesforce/label/c.sendUsEmail_br';
import attentionByMail_es from '@salesforce/label/c.attentionByMail_es';
import attentionByMail_br from '@salesforce/label/c.attentionByMail_br';
import callUs_es from '@salesforce/label/c.callUs_es';
import callUs_br from '@salesforce/label/c.callUs_br';
import customerService_es from '@salesforce/label/c.customerService_es';
import customerService_br from '@salesforce/label/c.customerService_br';

export default class Lwc_helpContactUsSideBar extends LightningElement {

    label = {
        sendUsEmail,sendUsEmail_es,sendUsEmail_br,
        attentionByMail,attentionByMail_es,attentionByMail_br,
        callUs,callUs_es,callUs_br,
        customerService,customerService_es,customerService_br
    };
        
    @api country = 'GB';

    get isBrazil() {
        return this.country == 'Other' ? true : false; 
    }

    get isSpain() {
        return this.country == 'ES' ? true : false;
    }
    
    get isGreatBritain() {
        return this.country == 'GB' ? true : false;
    }
    //Connected Callback
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');

        // capturamos la url y desencriptamos para obtener el pais y el idioma
        /*
        var miUrl = window.location.href;        
        let newURL = new URL(miUrl).searchParams;
        this.paramsUrl = newURL.get('params');
        this.decrypt(this.paramsUrl);*/
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
            }
            
            })
        .catch((error) => {
            console.log(error);
        });
    return result;
    }
}