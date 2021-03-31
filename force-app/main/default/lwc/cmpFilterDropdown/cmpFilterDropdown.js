import { LightningElement, api, track } from 'lwc';

import clearAll from '@salesforce/label/c.clearAll';
import appli from '@salesforce/label/c.apply';

export default class CmpFilterDropdown extends LightningElement {

    @api values = ['Value 1', 'Value 2', 'Value 3'];
    @api selectedValue;
    @api helpText = 'Show More';
    @api isSimpleDropdown;
    @api placeHolder = '{!v.valuePlaceholder}';
    @api bodyClass = 'accountCombobox';
    @api selectedValues;
    @api selectAllValues = 'All';
    @api valuePlaceholder = 'Select one';
    @api valueSingle = 'value selected';
    @api valueMulti = 'values selected';
    @api allValuesSelected = false;
    @api isDisabled = false;

    @track simple;
    number;
    
    clearAll = clearAll;
    appli = appli;
    

    condition1(){
        if(this.selectedValues.length>0)
            return true;
        else
            return false;
    }

    condition2(){
        if(this.selectedValue != '' && this.selectedValue != this.valueSingle)
            return true;
        else
            return false;
    }

    condition3(){
        if(this.selectedValue == this.values)
            return true;
        else   
            return false;
    }

    clase1(){
        return this.bodyClass + ' slds-popover slds-popover_full-width slds-dropdown';
    }

    connectedCallback() {
        if (this.isSimpleDropdown == "false") {
            this.simple = this.isSimpleDropdown;
            var values = this.values;
            var res = [];
            for (var i in values) {
                res.push({ label: values[i], value: values[i] });
            }
            this.values = res;
        }else{
            this.simple = this.isSimpleDropdown;
        }
    }

    clear() {
        this.selectedValues = [];
        this.selectedValue = '';
        this.selectOptionhelper(true);
    }

    selectOption(event){
        this.selectOptionhelper(false, event);
    }

    apply(){
        var event = new CustomEvent("update",{
            detail:{
                filter,
                count,
                value
            }
        });

        if(this.isSimpleDropdown == "true"){
            var cmpEvent = event.detail;

            cmpEvent.setParams({filter: this.valuePlaceholder, value:this.selectedValue});
            cmpEvent.fire();
        }else{
            var cmpEvent = event.detail;
            cmpEvent.setParams({filter: this.valuePlaceholder, value:this.selectedValues});
            cmpEvent.fire();
        }
    }

    selectOptionhelper(clear, event){
        if(this.isSimpleDropdown == "true"){
            if(clear==false){
                if(event.target.id !=this.selectedValue){
                    this.selectedValue = event.target.id;
                    
                    console.log("SelectedValue", this.selectedValue)
                    this.number += 1;
                }
            }else{
                i--;
                this.number = "("+i+")";
            }
        }
    }

}