import { LightningElement,api}      from 'lwc';

import getLstAccounts               from '@salesforce/apex/CNT_OTV_SubsidiariesSelection.getLstAccounts';
import updateSubsidiaryStatus       from '@salesforce/apex/CNT_OTV_SubsidiariesSelection.updateSubsidiaryStatus';
import updateMatrixStatus           from '@salesforce/apex/CNT_OTV_SubsidiariesSelection.updateMatrixStatus';

// importing Resources
import { loadStyle }                    from 'lightning/platformResourceLoader';
import Santander_Icons                  from '@salesforce/resourceUrl/Santander_Icons';
import images                           from '@salesforce/resourceUrl/Images';


// importing Custom Label
import back                             from '@salesforce/label/c.back';
import Activation                       from '@salesforce/label/c.Activation';
import cancelProcess                    from '@salesforce/label/c.cancelProcess';
import cmpOTVTermsConditions_16         from '@salesforce/label/c.cmpOTVTermsConditions_16';
import cmpOTVSubsidiariesSelection_1    from '@salesforce/label/c.cmpOTVSubsidiariesSelection_1';
import cmpOTVSubsidiariesSelection_2    from '@salesforce/label/c.cmpOTVSubsidiariesSelection_2';
import cmpOTVSubsidiariesSelection_3    from '@salesforce/label/c.cmpOTVSubsidiariesSelection_3';
import cmpOTVActivationCompleted2_3     from '@salesforce/label/c.cmpOTVActivationCompleted2_3';


export default class CmpOTVSubsidiariesSelection extends LightningElement {
    label = {
        back,
        Activation,
        cancelProcess,
        cmpOTVTermsConditions_16,
        cmpOTVSubsidiariesSelection_1,
        cmpOTVSubsidiariesSelection_2,
        cmpOTVSubsidiariesSelection_3,
        cmpOTVActivationCompleted2_3
    };
    // Expose URL of assets included inside an archive file
    logoSymbolRed = images + '/logo_symbol_red.svg';

    @api subsidiarias = [];
    @api filas = [];
    @api step;
    loading = true;
    subsidiariesList = [];
    arrayFilas = [];
    numeroFilas;
    auxiliar1=0;
    auxiliar2=2;
    cont=0;

    connectedCallback(){
        getLstAccounts().then((results)=>{
            this.subsidiarias = results;
            if(results.length%2 != 0 ){
                this.numeroFilas = results.length/2 + 1;
            }else{
                this.numeroFilas = results.length/2;
            }
            for(let i= 0;i<this.numeroFilas;i++){ 
                this.arrayFilas.push(i);
            }
            this.filas = this.arrayFilas;
        }).finally(() => {
            this.loading = false;
         })
    }
    renderedCallback() {
        Promise.all([
            loadStyle(this, Santander_Icons + '/style.css'),
        ])
    }

    cancelProcess(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 0}});
        this.dispatchEvent(changeStepEvent);
    }
    
    goBack(){
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 2}});
        this.dispatchEvent(changeStepEvent);
    }

    enrollmentAcct(event) {
        try {
            if(event.currentTarget.className == 'cardBeneficiary slds-card card-selected'){
                event.currentTarget.className = 'cardBeneficiary slds-card';
                this.subsidiariesList = this.subsidiariesList.filter(value => value !== event.target.getAttribute("data-item"));
            }else{
                event.currentTarget.className = 'cardBeneficiary slds-card card-selected';
                this.subsidiariesList.push(event.target.getAttribute("data-item"));
            }
        } catch (error) {
            console.log(error);
        }
    }

    continueProcess(event) {
        updateSubsidiaryStatus({updateStr : JSON.stringify(this.subsidiariesList)}).catch(error => {
            console.log(error);
        });
        updateMatrixStatus().catch(error => {
            console.log(error);
        });
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 4}});
        this.dispatchEvent(changeStepEvent);
    }
    goCompletedTerms(){
        if(this.subsidiaryProcess){
            const changeStepEvent = new CustomEvent('changestep', {detail: {step : 5}});
            this.dispatchEvent(changeStepEvent);
        }else{
            const changeStepEvent = new CustomEvent('changestep', {detail: {step : 2}});
            this.dispatchEvent(changeStepEvent);
        }
    }

    showSupport(e){
        e.currentTarget.style.visibility = "hidden";
        var span = this.template.querySelector(".slds-button primary.quickButton_icon_text");
        span.visibility= visible;
    }
    showIcon(e){
        e.currentTarget.style.visibility = "visible";
        var span = this.template.querySelector(".slds-button primary.quickButton_icon");
        span.visibility = hidden;
    }

    @api
    get condition(){
        if(this.cont==this.subsidiarias.length){
            this.auxiliar1 = 0;
            this.auxiliar2 = this.auxiliar2 + 2;
            this.cont = 1;
        }else{
            this.cont=this.cont+1;
        }
        if(this.auxiliar1 == this.auxiliar2){
            return false;
        }else if( this.auxiliar2 - this.auxiliar1 > 2){
            this.auxiliar1 = this.auxiliar1 + 1;
            return false;
        }else{
            this.auxiliar1 = this.auxiliar1 + 1;
            return true;
        }
    }
    goSupportCenter(){
        console.log(this.fromStep);
        const changeStepEvent = new CustomEvent('changestep', {detail: {step : 6,fromStep : this.step}});
        this.dispatchEvent(changeStepEvent);
    }
}