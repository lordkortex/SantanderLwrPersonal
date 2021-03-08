import {LightningElement,api,track} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import B2B_comercialCode from '@salesforce/label/c.B2B_comercialCode';
import selectAnOption from '@salesforce/label/c.selectAnOption';

//Import Apex methods
import getCommercialCodes from '@salesforce/apex/CNT_B2B_ComercialCode.getCommercialCodes';

export default class lwc_b2b_comercialCode extends LightningElement{

    //Labels
    label = {
        B2B_comercialCode,
        selectAnOption,
    }
    
    @api name; //Name of the filter
    @api selectedvalue; //Selected option from the dropdown
    @api steps; //Data of the steps
    @api showdropdown = false; //Show dropdown and control up/down arrow icon
    @api ismodified; //Indicates if the input data has been modified
    @api isediting = false; //Indicates if the user is editing an existing payment so field should not be reset on initialisation
    
    @track values = []; //List of values to populate the dropdown
    @track showMiniLabel; //Show mini label in niput box
    @track helpTextDropdown = this.label.Show_More; //Dropdown help text

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }

    showPaymentPurpose(){
        return (this.showMiniLabel || this.selectedvalue || this.showdropdown);
    }

    existSelectedValue(){
        return this.selectedvalue ? true : false;
    }

    notExistSelectedValueNorShowDropdown(){
        return !this.selectedvalue && !this.showdropdown ? true : false;
    }

    notExistSelectedValueAndShowDropdown(){
        return !this.selectedvalue && this.showdropdown ? true : false;
    }

    get dropdownClass(){
        return (this.showdropdown ? 'button-arrow icon-arrowUp_small' : 'button-arrow icon-arrowDown_small');
    }

    get iteratorClass(){
        return (item == this.selectedvalue ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item');
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
            this.getPicklistValues();	
        }
	}

	handleDropdownButton(event) {
		this.showDropdown();
	}

	handleClick(event) {
		let item = event.currentTarget.id;
		this.selectedvalue = item;
		this.showDropdown();
    }
    
    showDropdown() {
        if (this.showdropdown) {
            this.showdropdown = false;            
        } else {
			this.showdropdown = true;
			this.callEventDropdowns();
        }
    }

    getPicklistValues() {
        getCommercialCodes()
        .then( (result) => {
            if(result){
                this.values = result.value.picklistValues;	
            }
        })
        .catch( (error) => {
            console.log('### lwc_b2b_commercialCode ### getPicklistValues() ::: Catch error: ' + error);
        })
	}
	
	callEventDropdowns() {
        const handledropdown = new CustomEvent('handledropdown', {
            name: this.name,
            showropdown: this.showdropdown
        })
        this.dispatchEvent(handledropdown);
    }
}