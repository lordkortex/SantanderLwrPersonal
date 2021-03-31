import { LightningElement, api, track } from 'lwc';

import error from '@salesforce/label/c.B2B_Error_Enter_Input';

export default class CmpTextInput extends LightningElement {
    showLabel = false;

    showError = true;

    format = " format.";

    errorFormat = false;

    errorText = error;


    @api label;
    @api placeholder;

    @api value = "";

    @api required;

    @track error = "";

    @api get errormsg(){
        return this.error;
    }

    set errormsg(value){
        this.error = value;
    }

    @api errormsg2;

    
    connectedCallback(){
        if(this.value){
            this.showLabel = true;
        }else{
            this.showLabel = false;
        }
    }


    handleClearInput(){
        this.template.querySelector("input").value = "";
        this.showLabel = false;
        this.template.querySelector('div.icon-close_filledCircle').style.display = "none";
        //this.template.querySelector('div.errorText').style.display = "none";

        this.value = "";
        //this.errormsg = "";
        this.showError = false;
        
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
            //this.template.querySelector('div.errorText').style.display = "block";
            this.template.querySelector('button').style.display = "none";

            this.showError = true;
            this.errorFormat = false;
            /*if(this.required == "true" && this.error == ""){
                var msg = this.errorText;
                var fullmsg = msg.replace("{0}", this.label);
                this.error = fullmsg;
            }*/
        }else{
            this.showLabel = true;
            this.template.querySelector('div.icon-close_filledCircle').style.display = "none";
        }

        
        
    }

    handleInput(event){
        var value = event.target.value;

        if(value != ""){
            //this.errormsg = "";
            this.showError = false;
            //this.template.querySelector('div.errorText').style.display = "none";
        }
    }

    handleChange(event){
        this.value = event.target.value;
        var value = event.target.value;

        const selectedEvent = new CustomEvent('data', {
            detail: this.value
        });

        this.dispatchEvent(selectedEvent);

        this.validationNumber(value);
    }

    validationNumber(value){
        var letras="abcdefghyjklmnñopqrstuvwxyz";
        var i = 0;
        if(this.label == "Tax ID"){
            value = value.toLowerCase();
            for(i = 0; i<value.length; i++){
                if(letras.indexOf(value.charAt(i),0) != -1){
                    this.showError = true;
                    this.errorFormat = true;
                }
            }
        }

        if(this.label == "Branch"){
            value = value.toLowerCase();
            for(i = 0; i<value.length; i++){
                if(letras.indexOf(value.charAt(i),0) != -1){
                    this.showError = true;
                    this.errorFormat = true;
                }
            }
        }

        if(this.label == "Account number"){
            value = value.toLowerCase();
            for(i = 0; i<value.length; i++){
                if(letras.indexOf(value.charAt(i),0) != -1){
                    this.showError = true;
                    this.errorFormat = true;
                }
            }
        }
    }

}