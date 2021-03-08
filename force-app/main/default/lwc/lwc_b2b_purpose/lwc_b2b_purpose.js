import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import B2B_PaymentPurpose from '@salesforce/label/c.B2B_PaymentPurpose';
import selectAnOption from '@salesforce/label/c.selectAnOption';

//Import Apex methods
import getPurposes from '@salesforce/apex/CNT_B2B_Purpose.getPurposes';

export default class lwc_b2b_purpose extends LightningElement{

    //Labels
    label = {
        B2B_PaymentPurpose,
        selectAnOption,
    }
    
	@api ismodified //Indicates if the input data has been modified
	@api values = []; //List of values to populate the dropdown
	@api selectedvalue //Selected option from the dropdown
	@track helpTextDropdown = this.label.Show_More; //Dropdown help text 
	@api showminilabel = false; //Show mini label in niput box 
	@api showdropdown //Show dropdown and control up/down arrow icon 
	@api name //Name of the filter
	@api errormsg = ''; //Error message
	@api steps //Data of the steps
	@api isediting = false; //Indicates if the user is editing an existing payment so field should not be reset on initialization

    
    get mainClass(){
        return (this.errormsg ? 'error slds-form-element dropdown' : ' slds-form-element dropdown');
    }

    get showPaymentPurpose(){
        return (this.showminilabel || this.selectedvalue || this.showdropdown);
    }

    get existSelectedValue(){
        return this.selectedvalue ? true : false;
    }

    get notExistSelectedValueNorShowDropdown(){
        return !this.selectedvalue && !this.showdropdown ? true : false;
    }

    get notExistSelectedValueAndShowDropdown(){
        return !this.selectedvalue && this.showdropdown ? true : false;
    }

    get dropdownClass(){
        return (this.showdropdown ? 'button-arrow icon-arrowUp_small' : 'button-arrow icon-arrowDown_small');
    }

    get existErrorMSG(){
        return (this.errormsg ? true : false);
    }


    /*get iteratorClass(){
        return (item == this.selectedvalue ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item');
    }*/
    
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }


    initComponent(event) {
        if(this.steps){
            var steps = this.steps;
            var focusStep = steps.focusStep;
            var lastModifiedStep = steps.lastModifiedStep;
            var isEditing = this.isediting;
            if (isEditing == false) {
                if (focusStep == 3 && lastModifiedStep == 3) {
                    this.selectedvalue = '';
                    this.ismodified = true;
                }
            }
            getPurposes()
            .then( (results) => {
                if (results) {
                    this.values = results.value.picklistValues;								
                }
            })
            .catch( (error) => {
                console.log('### lwc_b2b_purpose ### initComponent ::: Catch error: ' + error);
            })
        }
	}

	handleDropdownButton(event) {
		this.showDropdown();
	}

	handleClick(event) {
		let item = event.currentTarget.id;
		this.selectedvalue = item;
		if (item) {
			this.errormsg = '';
		}
		this.showDropdown();
    }
    
    showDropdown() {
        if (this.showdropdown == true) {
            this.showdropdown = false;            
        } else {            
            this.showdropdown = true;
            this.callEventDropdowns();
        }
    }

    callEventDropdowns() {
        const handledropdown = new CustomEvent('handledropdown', {
            name: this.name,
            showropdown: this.showdropdown
        })
        this.dispatchEvent(handledropdown);
    }
	
}