import { LightningElement, api } from 'lwc';

import singleChoice from '@salesforce/label/c.singleChoice';
import option from '@salesforce/label/c.option';
import options from '@salesforce/label/c.options';

export default class CmpNewDropdown extends LightningElement {

    @api values = ['Value 1', 'Value 2', 'Value 3'];
    @api selectedValue;
    @api helpText = 'Show More';
    @api valuesObject = ['Value 1', 'Value 2', 'Value 3'];
    @api isSimpleDropdown;
    @api selectedValues;
    @api valuePlaceholder = this.singleChoice;
    @api valueSingle = this.option;
    @api valueMulti = this.options;
    @api allValuesSelected = false;
    @api isDisabled = false;

    @api changedValues = [];

    singleChoice = singleChoice;
    option = option;
    options = options;

    /*label = {
        singleChoice,
        option,
        options
    };*/

    disabled1(){
        return this.isDisabled ==  true ? true : false;
    }


    //contenidos
    contenido1(){
        return this.selectedValues[0];
    }

    contenido2(){
        return this.selectedValues.length-1 + ' ' + this.valueMulti;
    }

    contenido3(){
        return this.selectedValues.length + ' ' + this.valueMulti;
    }

    //condition
    condition1(){
        if(this.selectedValue == this.singleChoice)
            return true;
        else
            return false;
    }
    condition2(){
        if(this.selectedValue != null && this.selectedValue != this.singleChoice)
            return true;
        else
            return false;
    }

    condition3(){
        if(this.selectedValue == null)
            return true;
        else
            return false;
    }

    condition4(){
        if(this.selectedValues.length == 0)
            return true;
        else
            return false;
    }

    condition5(){
        if(this.selectedValues.length == 1)
            return true;
        else
            return false;
    }

    condition6(){
        if(this.selectedValues.length > 1 && this.allValuesSelected)
            return true;
        else
            return false;
    }

    condition7(){
        if(this.selectedValues.length > 1 && !this.allValuesSelected)
            return true;
        else
            return false;
    }

    //clases
    clase1(){
        return this.isDisabled ? 'slds-combobox slds-dropdown-trigger disabled' : 'slds-combobox slds-dropdown-trigger';
    }

    clase2(){
        return this.isDisabled == true ? 'slds-dropdown slds-dropdown_left slds-dropdown_small dropdownOrder__none' : 'slds-dropdown slds-dropdown_left slds-dropdown_small dropdownOrder';
    }

    clase3(){
        return item == this.selectedValue ? 'slds-dropdown__item slds-is-selected selectedOption' : 'slds-dropdown__item'
    }

    connectedCallback() {
        if (this.isSimpleDropdown == "false") {
            var values = this.values;
            var res = [];
            for (var i in values) {
                res.push({ label: values[i], value: values[i] });
            }
            this.valuesObject = res;
        }
    }

    selectOption(event) {
        var item;
        if (this.isSimpleDropdown == "true") {
            item = event.currentTarget.id;
            if (item) {
                var items = [];
                items.push(item);
                this.handleSelectionhelper(items);
            }
        } else {
            item = event.target.value;
            if (item) {
                var items = [];
                items.push(item);
                this.handleSelectionhelper(items);
            }
        }
    }

    onSelectionUpdate() {
        var args = this.changedValues;
        console.log(args);
        if (args) {
            var items = args;
            this.handleSelectionhelper(items);
        }
    }

    handleSelectionhelper(items){
        this.selectedValues = items[0];
        var selectedValues = [];

        if(this.isSimpleDropdown = "true") {
            selectedValues.push(items[0]);
        } else {
            var selectedValuesList = this.selectedValues;
            var item_aux=[]

            for(var item in items){
                item_aux.push(items[item]);
            }

            // If the element selected is All, then select / deselect all options
            // If the element selected is All, then select / deselect all options
            for(var item in item_aux){
                if(item_aux.includes(this.selectAllValues)){
                    var allOptions = this.values;
                    if(document.getElementById(item_aux[item]).classList.contains("slds-is-selected")){
                        for(var key in allOptions){
                            document.getElementById(allOptions[key]).classList.remove("slds-is-selected");
                            selectedValuesList.splice(selectedValuesList.indexOf(allOptions[key]),1);
                        }
                        this.allValuesSelected = false;
                    } else {
                        for(var key in allOptions){
                            document.getElementById(allOptions[key]).classList.add("slds-is-selected");
                            if(selectedValuesList.indexOf(allOptions[key]) == -1){
                                selectedValuesList.push(allOptions[key]);
                            }
                        }
                        this.allValuesSelected = true;
                    }
                } else {
                    // If the element is selected, then unselect the option. Otherwise select the option.
                    if(document.getElementById(item_aux[item]).classList.contains("slds-is-selected")){
                        document.getElementById(item_aux[item]).classList.remove("slds-is-selected");
                        // Remove the value from the list if it's still there
                        if(selectedValuesList.indexOf(item_aux[item]) != -1){
                            selectedValuesList.splice(selectedValuesList.indexOf(item_aux[item]),1);
                        }
                        // Remove 'All' if it's selected
                        if(selectedValuesList.indexOf(this.selectAllValues) != -1){
                            document.getElementById(this.selectAllValues).classList.remove("slds-is-selected");
                            selectedValuesList.splice(selectedValuesList.indexOf(this.selectAllValues),1);
                        }
                    }else{
                        document.getElementById(item_aux[item]).classList.add("slds-is-selected");
                        selectedValuesList.push(item_aux[item]);
                    }
                    this.allValuesSelected = false;
                }
            }

            this.selectedValues = selectedValuesList;
            selectedValues = selectedValuesList;        
        }

        const filter = this.selectedValues;

        var event = new CustomEvent("selected",{
            detail:{
                selectedValues : filter
            }
        });

        this.dispatchEvent(event);
        
    }

}