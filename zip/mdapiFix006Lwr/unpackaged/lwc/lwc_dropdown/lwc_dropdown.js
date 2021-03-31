import { LightningElement, api } from 'lwc';
import all from '@salesforce/label/c.all';
import singleChoice from '@salesforce/label/c.singleChoice';
import option from '@salesforce/label/c.option';
import options from '@salesforce/label/c.options';
import selectOne from '@salesforce/label/c.selectOne';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import {loadStyle} from 'lightning/platformResourceLoader';

export default class Lwc_dropdown extends LightningElement {

    label = { 
        singleChoice, 
        option, 
        options, 
        selectOne,
        all
    }

    @api values;//['Value 1', 'Value 2', 'Value 3'];    //description="List of values to populate the dropdown"/>
    @api selectedvalue = [];                            //MAP description="Selected option from the dropdown"/>
    @api helptext="Show More";                          //description="Dropdown help text"/>
    @api issimpledropdown;                              //description="Flag to switch between simple and multiselect dropdown"/>
    @api ishiddenvaluedropdown=false;                   //description="Flag so that the dropdown can recieve a list of objects with value / displayes value"/>
    //MULTISELECT DROPDOWN ATTRIBUTES -->
    @api selectedvalues= [];                            //description="Multi-select selected values"/>
    @api selectallvalues=this.label.all;                     //description="Option label for all values selection"/>
    @api valueplaceholder=this.label.singleChoice;           //description="Value selected in the dropdown by default"/>
    @api valueSingle=this.label.option;                      //description="Value selected in the dropdown when only one value has been selected"/>
    @api valueMulti=this.label.options;                      //description="Value selected in the dropdown when more than one value has been selected"/>
    @api allvaluesselected=false;                       //description="Flag to indicate whether the 'All Values' option has been selected"/>
    @api isdisabled=false;                              //description="Attribute to indicate if the dropdown is disabled" />
    @api changedValues = [];                            //aura method description="List of values that has been selected/unselected"/> 


    get class1(){
        return this.isdisabled ? 'slds-combobox slds-dropdown-trigger disabled' : 'slds-combobox slds-dropdown-trigger'
    }

    get condition1(){
        //selectedValue == selectOne
        return this.selectedvalue == this.label.selectOne;
    }

    get condition2(){
        //!v.selectedvalue == null
        return this.selectedvalue == null;
    }

    get condition3(){
        //!v.selectedvalues.length == 0
        if (this.selectedvalues) {
            return this.selectedvalues.length == 0;
        }
        else {
            return false;
        }
    }

    get condition4(){
        //!v.selectedvalues.length == 1
        if (this.selectedvalues) {
            return this.selectedvalues.length == 1;
        }
        else {
            return false;
        }
    }

    get condition5(){
        //!and(v.selectedvalues.length > 1, v.allvaluesselected)
        return this.selectedvalue == null;
    }

    get condition6(){
        //!and(v.selectedvalues.length > 1, not(v.allvaluesselected
        return this.selectedvalue == null;
    }

    get selectedValueNotNull(){
        //and(v.selectedValue != null,v.selectedValue != $Label.c.selectOne)
        return this.selectedvalue != null && this.selectedvalue != this.label.selectOne;
    }

    get condition8(){
        //not(v.isHiddenValueDropdown)
        return this.ishiddenvaluedropdown == false;
    }

    get condition7(){
        //and(v.selectedValues.length > 1, v.allValuesSelected)
        if (this.selectedvalues){
            return this.selectedvalues.length > 1 && this.allvaluesselected == true;
        }
        else{
            return false;
        }
    }

    get condition9(){
        //and(v.selectedValues.length > 1, not(v.allValuesSelected))
        if (this.selectedvalues){
            return this.selectedvalues.length > 1 && this.allvaluesselected == false;
        }
        else{
            return false;
        }
    }

    get selectedValues1(){
        return this.selectedvalues[0];    
    }

    get selectedvalues1Display(){
        return this.selectedvalues[0].displayValue;
    }

    get selectedValuesLengthm1(){
        return this.selectedvalues.length - 1 + ' ' + this.valueMulti;
    }

    get selectedValuesLength(){
        return this.selectedvalues.length + ' ' + this.valueMulti;  
    }

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');
        console.log('values: '+this.values);
/*
        this.selectedValues1 = this.selectedvalues[0];
        this.selectedvalues1Display = this.selectedValues1.displayValue;
        this.selectedValuesLengthm1 = this.selectedvalues.length - 1 + valueMulti;
        this.selectedValuesLength = this.selectedvalues.length + valueMulti;*/
    }

    selectOption(event){
        var item = event.currentTarget.dataset.id;
        if(item){
            var items = [];
            let isObject = this.ishiddenvaluedropdown;
            item = isObject ? {"value" : item, "displayValue" : event.currentTarget.name} : item;
            items.push(item); 
            this.handleSelection(items);
        }
    }

    onSelectionUpdate(event){
        var args = event.detail.arguments;
        if(args){
            var items = args.changedValues;
            this.handleSelection(items);
        }
    }

    handleSelection(items){  
        this.selectedvalue = items[0];
        var selectedValues = [];

        if(this.issimpledropdown) {
            //selectedValues.push(items[0]);
            this.selectedvalues.push(this.selectedvalue);
        } else {
            var selectedValuesList = JSON.parse(JSON.stringify(this.selectedvalues));
            console.log("[CMP_DropdownHelper.handleUpdateSelection] Selected Values: " + selectedValuesList);

            var item_aux=[]

            for(var item in items){
                item_aux.push(items[item]);
            }

            var element;
            // If the element selected is All, then select / deselect all options
            for(var item in item_aux){
                element = '[data-id="' + item_aux[item] + '"]';
                if(item_aux.includes(this.selectallvalues)){
                    var allOptions = this.values;
                    if(this.template.querySelector(element).classList.contains("slds-is-selected")){
                        for(var key in allOptions){
                            this.template.querySelector(allOptions[key]).classList.remove("slds-is-selected");
                            selectedValuesList.splice(selectedValuesList.indexOf(allOptions[key]),1);
                        }
                        this.allvaluesselected = false;
                    } else {
                        for(var key in allOptions){
                            this.template.querySelector(element).classList.add("slds-is-selected");
                            if(selectedValuesList.indexOf(allOptions[key]) == -1){
                                selectedValuesList.push(allOptions[key]);
                            }
                        }
                        this.allvaluesselected = true;
                    }
                } else {
                    // If the element is selected, then unselect the option. Otherwise select the option.
                    if(this.template.querySelector(element).classList.contains("slds-is-selected")){
                        this.template.querySelector(element).classList.remove("slds-is-selected");
                        // Remove the value from the list if it's still there
                        if(selectedValuesList.indexOf(item_aux[item]) != -1){
                            selectedValuesList.splice(selectedValuesList.indexOf(item_aux[item]),1);
                        }
                        // Remove 'All' if it's selected
                        if(selectedValuesList.indexOf(this.selectallvalues) != -1){
                            this.template.querySelector(element).classList.remove("slds-is-selected");
                            selectedValuesList.splice(selectedValuesList.indexOf(this.selectallvalues),1);
                        }
                    }else{
                        this.template.querySelector(element).classList.add("slds-is-selected");
                        selectedValuesList.push(item_aux[item]);
                    }
                    this.allvaluesselected = false;
                }
            }

            this.selectedvalues = selectedValuesList;
            selectedValues = selectedValuesList;        
        }
        
        // Fire event with the selected values info
        const dEvent = new CustomEvent('dropdownvalueselected', {
            detail: {selectedvalues: this.selectedvalues}
        });
        this.dispatchEvent(dEvent);

        // const cEvent = new CustomEvent('dropdownxxchangecurrency', {
        //     detail: {selectedvalues: this.selectedvalues}
        // });
        // this.dispatchEvent(cEvent);
    }

}