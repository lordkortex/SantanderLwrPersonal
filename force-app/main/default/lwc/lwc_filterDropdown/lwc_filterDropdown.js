import { LightningElement,api,track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

import clearAll from '@salesforce/label/c.clearAll';
import apply from '@salesforce/label/c.apply';

export default class Lwc_filterDropdown extends LightningElement {
	// Attributes
	@api valueplaceholder = 'Select one';
	@api values = [{ label: 'value1', value: 'value1' },{ label: 'value2', value: 'value2' },{ label: 'value3', value: 'value3' }];
	@api selectedvalue = '';
	@api valuesingle = 'value selected';
	@api issimpledropdown = false;
	@api bodyclass = '';
	@api selectedvalues;

	
	// local vars
	@track helptext = '';
	@track placeholder = '';
	@track selectallvalues = 'All';
	@track valuemulti = 'value selected';
	@track allValuesselected = false;
	@track isdisabled = false;
	@track selectedvaluesLengthMoreThan0 = false;
	@track selectedvaluesLength = 0;
	@track selectedvalueValid = false;
	@track classcheckbox = 'hideCheckbox selectedOption';
	@track isvisible = false;
	@track selectedCurrentValue ='';

	_selectedvalues = [];
	get selectedvalues() {
		return this._selectedvalues;
	}
	set selectedvalues(selectedvalues) {
		if (selectedvalues && selectedvalues.length > 0) {
			this._selectedvalues = selectedvalues;
			this.selectedvaluesLength = selectedvalues.length;
			this.selectedvaluesLengthMoreThan0 = true;
		} else {
			this.selectedvaluesLengthMoreThan0 = false;
			this.selectedvaluesLength = 0;
		}
	}
	get selectedvalue() {
		return this.selectedCurrentValue;
	}
	set selectedvalue(selectecValue) {
		if (selectecValue) {
			this.selectedCurrentValue = selectecValue;
			this.selectedvalueValid = true;
		} else {
			this.selectedvalueValid = false;
		}
	}
	label = {
		clearAll,
		apply,
	}
	connectedCallback() {
		loadStyle(this, santanderStyle + '/style.css');

		this.bodyclass = this.bodyclass + ' slds-popover slds-popover_full-width slds-dropdown';
	}
	clear() {
		this._selectedvalues = [];
		this.selectedCurrentValue = '';
		this.selectedvalueValid = false;
		this.selectoption(true);
	}
	apply() {
		if(this.issimpledropdown){
			const updatefilterdropdownevent = new CustomEvent('updatefilterdropdownsimple', {
                detail: { filter : this.valueplaceholder,  value : this.selectedCurrentValue},
            });
            // Fire the custom event
            this.dispatchEvent(updatefilterdropdownevent)
        }else{
			console.log('this._selectedvalues: '+this._selectedvalues);
			const updatefilterdropdownevent = new CustomEvent('updatefilterdropdownmulti', {
                detail: { filter : this.valueplaceholder,  value : this._selectedvalues},
            });
            // Fire the custom event
            this.dispatchEvent(updatefilterdropdownevent);
        }
	}
	selectoptionhtml(event) {
		console.log('selectoptionhtml');
		this.selectoption(false,event);
	}
	selectoption(clearvar,event) {
		console.log('selectoption');
		if(clearvar==false){
			if(this.issimpledropdown){
				try {
					this.selectedCurrentValue=event.currentTarget.value;
					//this.template.querySelector(event.currentTarget.id).className=this.template.querySelector(event.currentTarget.id).className+' selected';
				} catch (e) {
					console.log(e);
				}  
				//console.log('this.selectedvalue: '+this.selectedvalue);

				if (this.selectedCurrentValue !== '' && this.selectedCurrentValue !== this.valueSingle){
					this.selectedvalueValid = true;
				} else {
					this.selectedCurrentValue = '';
				}
			} else {
				console.log('this.selectedvalues: '+event.detail.value);
				this._selectedvalues = event.detail.value;
				console.log('this.selectedvalues: '+this._selectedvalues);

				if(this._selectedvalues.length>0){
					this.selectedvaluesLengthMoreThan0 = true;
					this.selectedvaluesLength = this._selectedvalues.length;
				}
			}
			
        }
	}

	get optionsO() {
        return this.values;
	}
	
	get valueV() {
        return this._selectedvalues;
	}

}