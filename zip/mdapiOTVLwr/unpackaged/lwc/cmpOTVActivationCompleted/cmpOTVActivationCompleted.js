import { LightningElement, api}         from 'lwc';

import { loadStyle }                    from 'lightning/platformResourceLoader';
import Santander_Icons                  from '@salesforce/resourceUrl/Santander_Icons';
import images                           from '@salesforce/resourceUrl/Images';
import { NavigationMixin }              from 'lightning/navigation';

// importing Custom Label
import back                             from '@salesforce/label/c.back';
import cancelProcess                    from '@salesforce/label/c.cancelProcess';
import cmpOTVActivationCompleted_1      from '@salesforce/label/c.cmpOTVActivationCompleted_1';
import cmpOTVActivationCompleted_2      from '@salesforce/label/c.cmpOTVActivationCompleted_2';
import cmpOTVActivationCompleted1_1     from '@salesforce/label/c.cmpOTVActivationCompleted1_1';
import cmpOTVActivationCompleted1_2     from '@salesforce/label/c.cmpOTVActivationCompleted1_2';
import cmpOTVActivationCompleted1_3     from '@salesforce/label/c.cmpOTVActivationCompleted1_3';
import cmpOTVActivationCompleted1_4     from '@salesforce/label/c.cmpOTVActivationCompleted1_4';
import cmpOTVActivationCompleted1_5     from '@salesforce/label/c.cmpOTVActivationCompleted1_5';
import cmpOTVActivationCompleted2_1     from '@salesforce/label/c.cmpOTVActivationCompleted2_1';
import cmpOTVActivationCompleted2_2     from '@salesforce/label/c.cmpOTVActivationCompleted2_2';
import cmpOTVActivationCompleted2_3     from '@salesforce/label/c.cmpOTVActivationCompleted2_3';
import cmpOTVActivationCompleted3_1     from '@salesforce/label/c.cmpOTVActivationCompleted3_1';
import cmpOTVActivationCompleted3_2     from '@salesforce/label/c.cmpOTVActivationCompleted3_2';
import cmpOTVActivationCompleted4_1     from '@salesforce/label/c.cmpOTVActivationCompleted4_1';
import cmpOTVActivationCompleted4_2     from '@salesforce/label/c.cmpOTVActivationCompleted4_2';

export default class CmpOTVActivationCompleted extends NavigationMixin(LightningElement) {

    label = {
        back,
        cancelProcess,
        cmpOTVActivationCompleted_1,
        cmpOTVActivationCompleted_2,
        cmpOTVActivationCompleted1_1,
        cmpOTVActivationCompleted1_2,
        cmpOTVActivationCompleted1_3,
        cmpOTVActivationCompleted1_4,
        cmpOTVActivationCompleted1_5,
        cmpOTVActivationCompleted2_1,
        cmpOTVActivationCompleted2_2,
        cmpOTVActivationCompleted2_3,
        cmpOTVActivationCompleted3_1,
        cmpOTVActivationCompleted3_2,
        cmpOTVActivationCompleted4_1,
        cmpOTVActivationCompleted4_2
    }

    // Expose URL of assets included inside an archive file
    logoSymbolRed = images + '/logo_symbol_red.svg';
    @api type1 = false;
    @api type2 = false;
    @api type3 = false;
    @api type4 = false;
    @api country;

    renderedCallback() {
        console.log('Activation Step Type: ' + (this.type1 ? '1' : this.type2 ? '2' : this.type3 ? '3' : this.type4 ? '4' : 'Error - No Activation Step Type.'));
        console.log('conditionBR');
        console.log(this.type1);
        console.log(this.type2);
        console.log(this.type3);
        console.log(this.type4);
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
        
    }   

    continueProcess(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 3}});
        this.dispatchEvent(changeStepEvent);
    }

    continueProcessSubsidiary(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 8}});
        this.dispatchEvent(changeStepEvent);
    }
    
    goToOneTrade(){
        //TODO Marcar el check de enrollment en la relacion.
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 0}});
        this.dispatchEvent(changeStepEvent);
    }

    goToUsers() {
        try {
            this[NavigationMixin.Navigate]({
                type: 'comm__namedPage',
                attributes: {
                    name: "One_Trade_View_Admin__c"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    cancelProcess(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 0}});
        this.dispatchEvent(changeStepEvent);
    }
    
    goBack(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 1}});
        this.dispatchEvent(changeStepEvent);
    }

    get type3NotBR(){
        console.log('Entra?');
        console.log(this.country);
        if(this.country != 'BR' && this.type3){
            return true;
        }else{
            return false;
        }
    }
    get type3BR(){
        console.log('EntraBR?');
        console.log(this.country);
        if(this.country == 'BR' && this.type3){
            return true;
        }else{
            return false;
        }
    }
}