import { LightningElement, api, track } from 'lwc';

import error from '@salesforce/label/c.B2B_Error_Enter_Input';

export default class CmpDropdown extends LightningElement {
    showLabel = false;

    @api label;
    @api placeholder;

    errorText = error;

    @api valuelist = [];

    @track error = "";

    selectedValue = '';
    selectedClass = 'slds-dropdown__item';

    conditions(event){
        this.selectedClass = 'slds-dropdown__item slds-is-selected';
        this.selectedValue =  event.target.getAttribute("data-item");

        if(this.selectedValue != ''){
            this.template.querySelector('div.errorText').style.display = "none";
            this.placeholder = this.selectedValue;
            this.showLabel = true;

            const selectedEvent = new CustomEvent('data', {
                detail: this.selectedValue
            });
    
            this.dispatchEvent(selectedEvent);
        }else{
            this.template.querySelector('div.errorText').style.display = "block";
            if(this.required == "true" && this.error == ""){
                var msg = this.errorText;
                var fullmsg = msg.replace("{0}", this.label);
                this.error = fullmsg;
            }
        }

        
    }
}