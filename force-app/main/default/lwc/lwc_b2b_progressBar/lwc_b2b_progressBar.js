import { LightningElement,api, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import B2B_Progress from '@salesforce/label/c.B2B_Progress';


export default class Lwc_b2b_progressBar extends LightningElement {

    @api steps = {focusStep : 20, 
                totalSteps : 20,
                lastModifiedStep : 20};

    @track total = 50;
    @track widthStyle = 'width';
    @track valueNow;

    Label={
        B2B_Progress
    }

    connectedCallback() {
		loadStyle(this, santanderStyle + '/style.css');
        this.valueNow = (this.steps.focusStep == this.steps.totalSteps ? (this.steps.focusStep / this.steps.totalSteps * 100) : (this.steps.lastModifiedStep / this.steps.totalSteps * 100));

        if(this.template.querySelector('[data-id="variableWidth"]')){
            this.template.querySelector('[data-id="variableWidth"]').style="width:" + (this.steps.focusStep == this.steps.totalSteps ? (this.steps.focusStep / this.steps.totalSteps * 100) : (this.steps.lastModifiedStep / this.steps.totalSteps * 100)) + "%";
        }
    }
    
    get stepsAndTotalNotZero(){
        
        return this.steps.shownStep != 0 && this.total!=0;
    }

    get totalEqualsZero(){
                
        return this.total == 0;
    }

    get stepDivideTotal(){
                
        return (this.steps / this.total * 100) + '%';
    }
}