import { LightningElement, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_icmParent extends LightningElement {

    @track numberOfSteps = 4;
    @track maxWidth = 1184;
    @track currentStageNumber = 1;
    @track currentStagePercent = 0;
    @track originValue
    @track destinationValue
    @track Amount
    @track Concept
    @track Date

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        if(this.template.querySelector('[data-id="componentStyle"]')){
            this.template.querySelector('[data-id="componentStyle"]').style='width:' + this.maxWidth + 'px;';
        }
    }

    get stageNumberEq1or2(){
        return this.currentStageNumber == 1 || this.currentStageNumber == 2;
    }
    get stageNumberEq3(){
        return this.currentStageNumber == 3;
    }
    get stageNumberEq4(){
        return this.currentStageNumber == 4; 
    }

    previousStep() 
    {
        var actualStep = this.currentStageNumber;
        console.log("vuelve un paso" + actualStep);
        actualStep = actualStep - 1;
        this.currentStagePercent = (actualStep-1)*33+5;
        this.currentStageNumber = actualStep;

        var progressBar = this.template.querySelector('[data-id="barraProgreso"]');
        progressBar.changeStage(this.currentStageNumber);
    }

    nextStep(event) 
    {
        if(event.detail && event.detail.step == 2){
            this.destinationValue = event.detail.destinationvalue;
            this.originValue = event.detail.originvalue;
        }
        if(event.detail && event.detail.step == 3){
            this.Amount = event.detail.amount;
            this.Concept = event.detail.concept;
        }

        var actualStep = this.currentStageNumber;
        console.log("pasa un paso" + actualStep);
        actualStep = actualStep + 1;
        this.currentStagePercent = (actualStep+1)*33+5;
        this.currentStageNumber = actualStep;
        console.log(this.destinationData);
        var progressBar = this.template.querySelector('[data-id="barraProgreso"]');
        progressBar.changeStage(this.currentStageNumber);
    }

    handleUpdateStage(event){
        this.currentStageNumber = event.detail.stage;
    }

}