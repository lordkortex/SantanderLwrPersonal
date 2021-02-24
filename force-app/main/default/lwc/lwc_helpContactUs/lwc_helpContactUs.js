import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader'; 
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
//import lenguaje from '@salesforce/i18n/lang';
import decryptData from '@salesforce/apex/CNT_termsFooter.decryptData';

import expand from '@salesforce/label/c.Expand';
import collapse from '@salesforce/label/c.Collapse';

import helpHeader from '@salesforce/label/c.HelpHeader';
import helpHeader_es from '@salesforce/label/c.HelpHeader_es';
import helpHeader_br from '@salesforce/label/c.HelpHeader_br';

import helpTitle1 from '@salesforce/label/c.HelpTitle1';
import helpTitle1_es from '@salesforce/label/c.HelpTitle1_es';
import helpTitle1_br from '@salesforce/label/c.HelpTitle1_br';

import helpText1_1 from '@salesforce/label/c.HelpText1_1';
import helpText1_1_br from '@salesforce/label/c.HelpText1_1_br';
import helpText1_1_es from '@salesforce/label/c.HelpText1_1_es';

import helpTextBold1 from '@salesforce/label/c.HelpTextBold1';
import helpTextBold1_br from '@salesforce/label/c.HelpTextBold1_br';
import helpTextBold1_es from '@salesforce/label/c.HelpTextBold1_es';

import helpText1_2  from '@salesforce/label/c.HelpText1_2';
import helpText1_2_br from '@salesforce/label/c.HelpText1_2_br';
import helpText1_2_es from '@salesforce/label/c.HelpText1_2_es';

import helpTitle2 from '@salesforce/label/c.HelpTitle2';
import helpTitle2_br from '@salesforce/label/c.HelpTitle2_br';
import helpTitle2_es from '@salesforce/label/c.HelpTitle2_es';

import helpText2_1 from '@salesforce/label/c.HelpText2_1';
import helpText2_1_br from '@salesforce/label/c.HelpText2_1_br';
import helpText2_1_es from '@salesforce/label/c.HelpText2_1_es';

import helpText2_2 from '@salesforce/label/c.HelpText2_2';
import helpText2_2_br from '@salesforce/label/c.HelpText2_2_br';
import helpText2_2_es from '@salesforce/label/c.HelpText2_2_es';

import helpTextBold2 from '@salesforce/label/c.HelpTextBold2';
import helpTextBold2_br from '@salesforce/label/c.HelpTextBold2_br';
import helpTextBold2_es from '@salesforce/label/c.HelpTextBold2_es';

import helpTitle3 from '@salesforce/label/c.HelpTitle3';
import helpTitle3_br from '@salesforce/label/c.HelpTitle3_br';
import helpTitle3_es from '@salesforce/label/c.HelpTitle3_es';

import helpText3_1 from '@salesforce/label/c.HelpText3_1';
import helpText3_1_br from '@salesforce/label/c.HelpText3_1_br';
import helpText3_1_es from '@salesforce/label/c.HelpText3_1_es';

import helpTextBold3_1 from '@salesforce/label/c.HelpTextBold3_1';
import helpTextBold3_1_br from '@salesforce/label/c.HelpTextBold3_1_br';
import helpTextBold3_1_es from '@salesforce/label/c.HelpTextBold3_1_es';

import helpText3_2 from '@salesforce/label/c.HelpText3_2';
import helpText3_2_br from '@salesforce/label/c.HelpText3_2_br';
import helpText3_2_es from '@salesforce/label/c.HelpText3_2_es';

import helpTextBold3_2 from '@salesforce/label/c.HelpTextBold3_2';

import helpText3_3 from '@salesforce/label/c.HelpText3_3';
import helpText3_3_br from '@salesforce/label/c.HelpText3_3_br';
import helpText3_3_es from '@salesforce/label/c.HelpText3_3_es';

import helpTitle4 from '@salesforce/label/c.HelpTitle4';
import helpTitle4_br from '@salesforce/label/c.HelpTitle4_br';
import helpTitle4_es from '@salesforce/label/c.HelpTitle4_es';

import helpTextBold4_1 from '@salesforce/label/c.HelpTextBold4_1';
import helpTextBold4_1_br from '@salesforce/label/c.HelpTextBold4_1_br';
import helpTextBold4_1_es from '@salesforce/label/c.HelpTextBold4_1_es';

import helpText4_1 from '@salesforce/label/c.HelpText4_1';
import helpText4_1_br from '@salesforce/label/c.HelpText4_1_br';
import helpText4_1_es from '@salesforce/label/c.HelpText4_1_es';

import helpTextBold4_2 from '@salesforce/label/c.HelpTextBold4_2';
import helpTextBold4_2_br from '@salesforce/label/c.HelpTextBold4_2_br';
import helpTextBold4_2_es from '@salesforce/label/c.HelpTextBold4_2_es';

import helpText4_2 from '@salesforce/label/c.HelpText4_2';
import helpText4_2_br from '@salesforce/label/c.HelpText4_2_br';
import helpText4_2_es from '@salesforce/label/c.HelpText4_2_es';

import helpTextBold4_3 from '@salesforce/label/c.HelpTextBold4_3';
import helpTextBold4_3_br from '@salesforce/label/c.HelpTextBold4_3_br';
import helpTextBold4_3_es from '@salesforce/label/c.HelpTextBold4_3_es';

import helpText4_3 from '@salesforce/label/c.HelpText4_3';
import helpText4_3_br from '@salesforce/label/c.HelpText4_3_br';
import helpText4_3_es from '@salesforce/label/c.HelpText4_3_es';

import helpTextBold4_4 from '@salesforce/label/c.HelpTextBold4_4';
import helpTextBold4_4_br from '@salesforce/label/c.HelpTextBold4_4_br';
import helpTextBold4_4_es from '@salesforce/label/c.HelpTextBold4_4_es';

import helpText4_4 from '@salesforce/label/c.HelpText4_4';
import helpText4_4_br from '@salesforce/label/c.HelpText4_4_br';
import helpText4_4_es from '@salesforce/label/c.HelpText4_4_es';

import helpTitle5 from '@salesforce/label/c.HelpTitle5';
import helpTitle5_br from '@salesforce/label/c.HelpTitle5_br';
import helpTitle5_es from '@salesforce/label/c.HelpTitle5_es';

import helpText5 from '@salesforce/label/c.HelpText5';
import helpText5_br from '@salesforce/label/c.HelpText5_br';
import helpText5_es from '@salesforce/label/c.HelpText5_es';

import helpTitle6 from '@salesforce/label/c.HelpTitle6';
import helpTitle6_br from '@salesforce/label/c.HelpTitle6_br';
import helpTitle6_es from '@salesforce/label/c.HelpTitle6_es';

import helpText6_1 from '@salesforce/label/c.HelpText6_1';
import helpText6_1_br from '@salesforce/label/c.HelpText6_1_br';
import helpText6_1_es from '@salesforce/label/c.HelpText6_1_es';

import helpTextBold6 from '@salesforce/label/c.HelpTextBold6';
import helpTextBold6_br from '@salesforce/label/c.HelpTextBold6_br';
import helpTextBold6_es from '@salesforce/label/c.HelpTextBold6_es';

import helpText6_2 from '@salesforce/label/c.HelpText6_2';
import helpText6_2_br from '@salesforce/label/c.HelpText6_2_br';
import helpText6_2_es from '@salesforce/label/c.HelpText6_2_es';

import helpTitle7 from '@salesforce/label/c.HelpTitle7';
import helpTitle7_br from '@salesforce/label/c.HelpTitle7_br';
import helpTitle7_es from '@salesforce/label/c.HelpTitle7_es';

import helpText7 from '@salesforce/label/c.HelpText7';
import helpText7_br from '@salesforce/label/c.HelpText7_br';
import helpText7_es from '@salesforce/label/c.HelpText7_es';

export default class Lwc_helpContactUs extends LightningElement {

    label = {
        helpHeader,helpHeader_es,helpHeader_br,
        helpTitle1,helpTitle1_es,helpTitle1_br,
        expand,
        collapse,
        helpText1_1,helpText1_1_es,helpText1_1_br,
        helpTextBold1,helpTextBold1_br,helpTextBold1_es,
        helpText1_2,helpText1_2_br,helpText1_2_es,
        helpTitle2,helpTitle2_br,helpTitle2_es,
        helpText2_1,helpText2_1_br,helpText2_1_es,
        helpText2_2,helpText2_2_br,helpText2_2_es,
        helpTextBold2,helpTextBold2_br,helpTextBold2_es,
        helpTitle3,helpTitle3_br,helpTitle3_es,
        helpText3_1,helpText3_1_br,helpText3_1_es,
        helpTextBold3_1,helpTextBold3_1_br,helpTextBold3_1_es,
        helpText3_2,helpText3_2_br,helpText3_2_es,
        helpTextBold3_2,
        helpText3_3,helpText3_3_br,helpText3_3_es,
        helpTitle4,helpTitle4_br,helpTitle4_es,
        helpTextBold4_1,helpTextBold4_1_br,helpTextBold4_1_es,
        helpText4_1,helpText4_1_br,helpText4_1_es,
        helpTextBold4_2,helpTextBold4_2_br,helpTextBold4_2_es,
        helpText4_2,helpText4_2_br,helpText4_2_es,
        helpTextBold4_3,helpTextBold4_3_br,helpTextBold4_3_es,
        helpText4_3,helpText4_3_br,helpText4_3_es,
        helpTextBold4_4,helpTextBold4_4_br,helpTextBold4_4_es,
        helpText4_4,helpText4_4_br,helpText4_4_es,
        helpTitle5,helpTitle5_br,helpTitle5_es,
        helpText5,helpText5_br,helpText5_es,
        helpTitle6,helpTitle6_br,helpTitle6_es,
        helpText6_1,helpText6_1_br,helpText6_1_es,
        helpTextBold6,helpTextBold6_br,helpTextBold6_es,
        helpText6_2,helpText6_2_br,helpText6_2_es,
        helpTitle7,helpTitle7_br,helpTitle7_es,
        helpText7,helpText7_br,helpText7_es
        
    };

    isexpanded1 = false;
    isexpanded2 = false;
    isexpanded3 = false;
    isexpanded4 = false;
    isexpanded5 = false;
    isexpanded6 = false;
    isexpanded7 = false;
    lang = false;
    ispublic = false;
    paramsUrl;
    @api country = 'GB';
    @api language = 'english';

    get isBrazil() {
        return this.country == 'Other' ? true : false; 
    }

    get isSpain() {
        return this.country == 'ES' ? true : false;
    }
    
    get isGreatBritain() {
        return this.country == 'GB' ? true : false;
    }
      
      // funciones para expandir y colapsar 
    expand1(){
        if (this.isexpanded1 == false) this.isexpanded1 = true;
        else this.isexpanded1 = false;  
    }
    
    expand2(){
        if (this.isexpanded2 == false) this.isexpanded2 = true;
        else this.isexpanded2 = false;        
    }

    expand3(){
        if (this.isexpanded3 == false) this.isexpanded3 = true;
        else this.isexpanded3 = false;     
        // si el idioma es distinto de Portugues mostramos el texto helpText3_1
       if(this.label.lenguaje != 'pl') this.lang = true;
    }

    expand4(){
        if (this.isexpanded4 == false) this.isexpanded4 = true;
        else this.isexpanded4 = false;        
    }

    expand5(){
        if (this.isexpanded5 == false) this.isexpanded5 = true;
        else this.isexpanded5 = false;        
    }

    expand6(){
        if (this.isexpanded6 == false) this.isexpanded6 = true;
        else this.isexpanded6 = false;        
    }

    expand7(){
        if (this.isexpanded7 == false) this.isexpanded7 = true;
        else this.isexpanded7 = false;        
    }
 
    
    //Connected Callback
    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        
        // si la url es publica mostramos la caja 6
        var url = window.location.href;
        console.log("url" + url);
		if(url.includes("public")){
			this.ispublic = true;
        }

         // capturamos la url y desencriptamos para obtener el pais y el idioma
         /*var miUrl = window.location.href;        
         let newURL = new URL(miUrl).searchParams;
         this.paramsUrl = newURL.get('params');
         this.decrypt(this.paramsUrl);
        */
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
            console.log(error);
        });
    return result;
    }
}