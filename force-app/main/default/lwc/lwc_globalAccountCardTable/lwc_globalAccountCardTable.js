import { LightningElement, api } from 'lwc';
import countryLabel from '@salesforce/label/c.Country';
import { loadStyle } from 'lightning/platformResourceLoader'; 
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_globalAccountCardTable extends LightningElement {
    
    label = {countryLabel};

    @api countrygroupresponse; // todos los nombres en minusculas atributos y parametros
    @api selectedcurrency;
    //@api selectedgrouping = this.label.countryLabel;
    @api selectedgrouping;
    @api lastupdateselected;
    @api userpreferredpumberformat;

    @api isonetrade;

    //Connected Callback

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    @api
    updateCurrencies(){
        if(this.template.querySelector("c-lwc_global-account-single-card") != null) {
            var t = this.template.querySelectorAll("c-lwc_global-account-single-card").length;
            for(var i = 0; i < t; i++){
                this.template.querySelectorAll("c-lwc_global-account-single-card")[i].updateCurrencies();
            }
        }
    }    
    
}