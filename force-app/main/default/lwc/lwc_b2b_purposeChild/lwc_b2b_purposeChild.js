import { LightningElement,api } from 'lwc';

export default class Lwc_b2b_purposeChild extends LightningElement {

    @api selectedvalue;
    @api item;
    @api name;
    
    get iteratorClass(){
        return (this.item == this.selectedvalue ? 'slds-dropdown__item slds-is-selected' : 'slds-dropdown__item');
    }

    handleClick(event) {
		let item = event.currentTarget.id.split('-')[0];
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
            "name": this.name,
            "showdropdown": this.showdropdown
        })
        this.dispatchEvent(handledropdown);
    }
}