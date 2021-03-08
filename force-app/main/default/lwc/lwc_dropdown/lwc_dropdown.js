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
    @api selectedvalue;                                 //MAP description="Selected option from the dropdown"/>
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
        return this.selectedvalue.length == 0;
    }

    get condition4(){
        //!v.selectedvalues.length == 1
        return this.selectedvalue.length == 1;
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

    get condition8(){
        //and(v.selectedValues.length > 1, v.allValuesSelected)
        return this.selectedvalues.length > 1 && this.allvaluesselected == true;
    }

    get condition9(){
        //and(v.selectedValues.length > 1, not(v.allValuesSelected))
        return this.selectedvalues.length > 1 && this.allvaluesselected == false;
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
            selectedValues.push(items[0]);
        } else {
            var selectedValuesList = this.selectedvalues;
            console.log("[CMP_DropdownHelper.handleUpdateSelection] Selected Values: " + selectedValuesList);

            var item_aux=[]

            for(var item in items){
                item_aux.push(items[item]);
            }

            // If the element selected is All, then select / deselect all options
            for(var item in item_aux){
                if(item_aux.includes(selectAllValues)){
                    var allOptions = this.values;
                    if(document.getElementById(item_aux[item]).classList.contains("slds-is-selected")){
                        for(var key in allOptions){
                            document.getElementById(allOptions[key]).classList.remove("slds-is-selected");
                            selectedValuesList.splice(selectedValuesList.indexOf(allOptions[key]),1);
                        }
                        this.allvaluesselected = false;
                    } else {
                        for(var key in allOptions){
                            document.getElementById(allOptions[key]).classList.add("slds-is-selected");
                            if(selectedValuesList.indexOf(allOptions[key]) == -1){
                                selectedValuesList.push(allOptions[key]);
                            }
                        }
                        this.allvaluesselected = true;
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
                    this.allvaluesselected = false;
                }
            }

            this.selectedValues = selectedValuesList;
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