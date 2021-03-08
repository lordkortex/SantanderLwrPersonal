import { LightningElement, api, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import titleFXExpired from '@salesforce/label/c.titleFXExpired';
import subtitleFXExpired from '@salesforce/label/c.subtitleFXExpired';
import ExchangeRateLocked from '@salesforce/label/c.ExchangeRateLocked';
import minutes from '@salesforce/label/c.minutes';
import theExchangeRateExpired from '@salesforce/label/c.theExchangeRateExpired';
import UpdateExchangeRate from '@salesforce/label/c.UpdateExchangeRate';
import ExchangeRateExpired from '@salesforce/label/c.ExchangeRateExpired';
import cantBeUpdated from '@salesforce/label/c.cantBeUpdated';
import again from '@salesforce/label/c.again';


export default class Lwc_countDown extends LightningElement {

    @api minutes = 0;
    @api update = false;
    @api expiredFX = false;
    @api spinner = false;
    @api FXAction;

    @track evolution = '';
    @track seconds = 0;
    @track minutesInit = 0;
    @track secondsInit = 0;

    Label={
        titleFXExpired,
        subtitleFXExpired,
        ExchangeRateLocked,
        minutes,
        theExchangeRateExpired,
        UpdateExchangeRate,
        ExchangeRateExpired,
        cantBeUpdated,
        again
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.minutesInit = this.minutes;
        this.secondsInit = this.seconds;
        this.setStartTimeOnUI();
    }

    get expiredFXEqualsFalse(){
        return this.expiredFX == false;
    }
    get spinnerEqualsTrue(){
        return this.spinner == true;
    }
    get progressClass(){
        return "slds-progress-ring__progress slds-progress-ring__progress" + this.evolution;
    }


    setStartTimeOnUI() {
        if(this.minutes !=0 || this.seconds !=0){
            setTimeout((function () {
                this.setStartTimeOnUI();
            }), 1000);
        }
    }
    restart() {
        if(this.expiredFX == false){
            this.minutes = this.minutesInit;
            this.seconds = this.secondsInit;
        }
    }

    setStartTimeOnUI() {
        var dt = new Date();
        dt.setMinutes(this.minutes);
        dt.setSeconds(this.seconds);
        
        var dt2 = new Date(dt.valueOf() - 1000);
        var temp = dt2.toTimeString().split(" ");
        var ts = temp[0].split(":");
        this.minutes = ts[1];
        this.seconds = ts[2];
        this.checkEvolution();
    }

    checkEvolution(){

        var sum = parseInt(this.minutesInit)*60 + parseInt(this.secondsInit);
        var current = parseInt(this.minutes)*60 + parseInt(this.seconds);
        var diff =Math.floor((1-current/sum)*100);
        if(diff>=25 && diff <50){
            this.expiredFX = false;

            this.evolution = '__25';
        }
        if(diff>=50 && diff <75){
            this.evolution = '__50';
        }
        if(diff>=75 && diff <100){
            this.evolution = '__75';
        }
        if(diff==100){
            this.expiredFX = true;

            this.evolution = '__100';
            this.showToast(Label.titleFXExpired, Label.subtitleFXExpired, true,'error');

        }
    }
    showToast(title, body, noReload, mode) {
        var errorToast = component.find('errorToast');
        if (errorToast) {
            //errorToast.showToast(action, static, notificationTitle, bodyText, functionTypeText, functionTypeClass, functionTypeClassIcon, noReload)
            if(mode == 'error'){
                errorToast.openToast(false, false, title,  body, 'Error', 'warning', 'warning', noReload);
            }
            if(mode =='success'){
                errorToast.openToast(true, false, title,  body,  'Success', 'success', 'success', noReload);

            }
        }
    }
}