import { LightningElement,api, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Santander_Icons';

import B2B_Progress from '@salesforce/label/c.B2B_Progress';


export default class Lwc_b2b_progressBar extends LightningElement {

    @api steps;
    @track total = 50;
    @track widthStyle = 'width';
    @track valueNow;
    @track bar;

    _steps;

    get steps(){
        return this._steps;
    }

    set steps(steps){
        if(steps){
            this._steps = steps;
            this.changeWidth();
        }        
    }

    Label={
        B2B_Progress
    }

    connectedCallback() {
		loadStyle(this, santanderStyle + '/style.css');
    }
    
    get stepsAndTotalNotZero(){
        
        return this._steps.shownStep != 0 && this.total!=0;
    }

    get totalEqualsZero(){
                
        return this.total == 0;
    }

    get stepDivideTotal(){
                
        return (this._steps / this.total * 100) + '%';
    }

    changeWidth(){
       
        this.valueNow = (this._steps.focusStep == this._steps.totalSteps ? (this._steps.focusStep / this._steps.totalSteps * 100) : (this._steps.lastModifiedStep / this._steps.totalSteps * 100));

        if(this.valueNow == 25) this.bar = 'slds-progress-bar__value st25';
        if(this.valueNow == 50) this.bar = 'slds-progress-bar__value st50';
        if(this.valueNow == 75) this.bar = 'slds-progress-bar__value st75';
        if(this.valueNow == 100) this.bar = 'slds-progress-bar__value st100';

        /*
        if(this.template.querySelector('[data-id="variableWidth"]')){
            this.template.querySelector('[data-id="variableWidth"]').style="width:" + this.valueNow + "%";
        }
        */
    }

    @api
    changeWidthSteps(steps){
       
        this.valueNow = (steps.focusStep == steps.totalSteps ? (steps.focusStep / steps.totalSteps * 100) : (steps.lastModifiedStep / steps.totalSteps * 100));
        if(this.valueNow == 25) this.bar = 'slds-progress-bar__value st25';
        if(this.valueNow == 50) this.bar = 'slds-progress-bar__value st50';
        if(this.valueNow == 75) this.bar = 'slds-progress-bar__value st75';
        if(this.valueNow == 100) this.bar = 'slds-progress-bar__value st100';

    }

    
}