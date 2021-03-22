import { LightningElement, api, track } from 'lwc';

import error from '@salesforce/label/c.B2B_Error_Enter_Input';

export default class CmpTextInput extends LightningElement {
    showLabel = false;

    /*label = {
        error
    }*/

    errorText = error;


    @api label;
    @api placeholder;

    @api value;

    @api required;

    @track error = "";

    //booleanClear = false;


    handleClearInput(){
        this.template.querySelector("input").value = "";
        this.showLabel = false;
        this.template.querySelector('div.icon-close_filledCircle').style.display = "none";
        this.template.querySelector('div.errorText').style.display = "none";
        
        if(this.showLabel == false){
            this.template.querySelector('button').style.display = "none";
        }
    }

    handleFocus(event){
        this.showLabel = true;
        this.template.querySelector('button').style.display = "block";
        this.template.querySelector('div.icon-close_filledCircle').style.display = "block";
    }

    handleBlur(event){
        var value = event.target.value;

        

        if(value == ""){
            this.showLabel = false;
            this.template.querySelector('div.errorText').style.display = "block";
            this.template.querySelector('button').style.display = "none";
            if(this.required == "true" && this.error == ""){
                var msg = this.errorText;
                var fullmsg = msg.replace("{0}", this.label);
                this.error = fullmsg;
            }
        }else{
            this.showLabel = true;
            this.template.querySelector('div.icon-close_filledCircle').style.display = "none";
        }
        
    }

    handleInput(event){
        var value = event.target.value;

        if(value != ""){
            this.template.querySelector('div.errorText').style.display = "none";
        }
    }

    handleChange(event){
        this.value = event.target.value;


        const selectedEvent = new CustomEvent('data', {
            detail: this.value
        });

        this.dispatchEvent(selectedEvent);
    }

}