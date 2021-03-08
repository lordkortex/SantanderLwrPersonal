import { LightningElement, api, track } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

export default class Lwc_icmProgressBar extends LightningElement {

    @api currentstagenumber;
    @api numberofsteps;
    @api originvalue;
    @api destinationvalue;
    @api amount;

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
    }

    get amountNotNull(){
        return this.amount != "";
    }
    get originvalueAlias(){
        if(this.originvalue){
            return this.originvalue.value.alias;
        }
    }
    get destinationvalueAlias(){
        if(this.destinationvalue){
            return this.destinationvalue.value.alias;
        }
    }

    onStepChanged(event)
    {
         this.updateStep(event);
    }

    @api
    changeStage(stageNumber) {
	
        //########## VARIABLES DEFINITION ##########//

        //Get the current stage number
        this.currentstagenumber = stageNumber;

        var curStage = this.currentstagenumber;
        
        //variables for the components
        var stringCompLi = "";
        var stringCompTextLi = "";
        var stringCompBt = "";
        
        //Constants for the ids
        // const STRINGLI = '[data-id="LiStage"]';
        // const STRINGLITEXT ='[data-id="LiStringStage"]';
        // const STRINGBUTTON = '[data-id="ButtonStage"]';

        //STYLES FOR THE LI
        const LINOTSTARTED = "slds-progress__item step";
        const LIISACTIVE = "slds-progress__item slds-is-active step";
        const LIISCOMPLETED = "slds-progress__item slds-is-completed step"; 

        //STYLE FOR THE LI TEXT
        const LITEXTACTIVE = "textStep__active";
        const LITEXTINACTIVE = "textStep";

        //STYLES FOR THE BUTTON
        const BUTTONFINISHED = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__completed";
        const BUTTONINPROGRESS = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__active";
        const BUTTONDISABLED = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__disabled";
        
        //Constants for progress bar
        const IDPROGRESSBAR = '[data-id="ProgressBar"]';
        console.log("[CMP_ICMProgressBarthis.changeStage] Button element " + this.template.querySelector('[data-id="ButtonStage1"]'));
        //const BUTTONRELATIVEWIDTH = this.template.querySelector(STRINGBUTTON+"1").offsetWidth / 1184*100; // Relative width of the buttons in %
        var progressBar = this.template.querySelector(IDPROGRESSBAR);
        //var progress = (curStage-1)*27.8+9;
        var progress = (curStage - 1) * 22 + 17;

        // Limit maximum width to 100%
        progress > 100 ? 100 : progress;
        // 10 - 37 - 66 - 92

        //Changing the progress bar progress

        progressBar.style="width : "+ progress + "%";
        //this.template.querySelector(IDPROGRESSBAR).style.width =  progress;

        var i;

        //STARTING THE LOOP
        for (i = 1; i <= 4; i++) 
        {
            stringCompLi = '[data-id="LiStage'+i+'"]';
            stringCompTextLi = '[data-id="LiStringStage'+i+'"]';
            stringCompBt = '[data-id="ButtonStage'+i+'"]';

            if(curStage < i)
            {
                
                this.template.querySelector(stringCompLi).className = LINOTSTARTED;
                this.template.querySelector(stringCompTextLi).className = LITEXTINACTIVE;
                this.template.querySelector(stringCompBt).className = BUTTONDISABLED;
            }
            if(curStage == i)
            {
                this.template.querySelector(stringCompLi).className = LIISACTIVE;
                this.template.querySelector(stringCompTextLi).className = LITEXTACTIVE;
                this.template.querySelector(stringCompBt).className = BUTTONINPROGRESS;
            }
            if((curStage > i))
            {
                this.template.querySelector(stringCompLi).className = LIISCOMPLETED;
                this.template.querySelector(stringCompTextLi).className = LITEXTINACTIVE;
                this.template.querySelector(stringCompBt).className = BUTTONFINISHED;

            }
        }
    }
    
    updateStep(event) {
        const BUTTONFINISHED = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__completed";
        const BUTTONINPROGRESS = "slds-button slds-button_icon slds-progress__marker slds-progress__marker_icon button button__active";
        var pressedButton = event.currentTarget.dataset.id;
        console.log("[CMP_ICMProgressBarthis.updateStep] Completed step: " + this.template.querySelector('[data-id="'+pressedButton+'"]').className);
        var activeStep = (this.template.querySelector('[data-id="'+pressedButton+'"]').className == BUTTONFINISHED) || (this.template.querySelector('[data-id="'+pressedButton+'"]').className == BUTTONINPROGRESS);
        console.log("[CMP_ICMProgressBarthis.updateStep] El botón pulsado es " + pressedButton);
        if(activeStep){
            if(pressedButton == "ButtonStage1"){
                this.currentstagenumber =  1;
            } else if(pressedButton == "ButtonStage2"){
                this.currentstagenumber =  2;
            } else if (pressedButton == "ButtonStage3"){
                this.currentstagenumber =  3;
            } else if(pressedButton == "ButtonStage4"){
                this.currentstagenumber =  4;
            }
            const stageNumberUpdate = new CustomEvent('stagenumberupdate',{
            detail : {stage : this.currentstagenumber}});
            this.dispatchEvent(stageNumberUpdate);
        }
    }
     
}