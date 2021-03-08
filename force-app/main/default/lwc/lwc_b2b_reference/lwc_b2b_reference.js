import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import B2B_Reference from '@salesforce/label/c.B2B_Reference';
import clearTheTextArea from '@salesforce/label/c.clearTheTextArea';


export default class lwc_b2b_reference extends LightningElement{

    //Labels
    label = {
        B2B_Reference,
        clearTheTextArea,
    }
    
	@api ismodified //Indicates if the input data has been modified
	@api resetdata //Indicates if the input data has been changed
	@track showMiniLabel = false; //Control to show mini label
	@api value = ''; //Value of input
	@api errormsg = ''; //Error message
	//@api data = {}; //Data of the transaction
	@api steps //Data of the steps
	@api isediting = false; //Indicates if the user is editing an existing payment so field should not be reset on initialisation

   

    get isNotEmptyValue(){
        return (this.value ? true : false);
    }

    get isNotEmptyErrorMessage(){
         return (this.errormsg ? true : false);
    }

    get showMinilabelOrNotEmptyValue(){
        return ((this.value || this.showMiniLabel) ? true : false);
    }

    get mainClass(){
        return (this.errormsg ? 'error slds-form-element input' : ' slds-form-element input');
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        if (!this.isediting) {
			this.handleClear(event);
		}
    }
	
	handleClear(event) {
		this.handleClear(event);
	}

	handleFocus(event) { 
        this.showMiniLabel = true;
    }

	handleBlur(event) { 
		this.showMiniLabel = false;
	}
	
	handleInput(event) { 
		let input = this.value;
		if (event.target.value != undefined) {
			let value = event.target.value;
			let regExp = new RegExp('^[0-9a-zA-Z\s]{0,16}$');
			let isInputValid = regExp.test(value);
			if (isInputValid == true) {
				input = value;
			}
			if (input) {
				this.errormsg = '';
			}
		}
		event.target.value = input;
		this.value = input;			
		
	}

    handleClear(event) {
        if(this.steps){
            var steps = this.steps;
            var focusStep = steps.focusStep;
            var lastModifiedStep = steps.lastModifiedStep;
            if (focusStep == 3 && lastModifiedStep == 3) {
                this.value = '';
                this.ismodified = true;
            } else {
                let textinput = this.template.querySelector('[data-id="reference-input"]');	
                if (textinput != null) {
                    textinput.value = '';
                }
                if(this.value != null){
                    this.value = '';
                }	
            }
        }
	}
}