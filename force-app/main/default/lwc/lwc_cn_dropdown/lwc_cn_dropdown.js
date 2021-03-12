import { LightningElement, track, api } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle } from'lightning/platformResourceLoader';
import SELECT_ONE from '@salesforce/label/c.selectOne';

export default class Lwc_cn_dropdown extends LightningElement {

    label = {
        SELECT_ONE
    }
 
    @api values = [];
    @api selectedvalue = '';
    @api headerdropdown = '';
    @api helptext;
    @api issimpledropdown;
    
    //MULTISELECT DROPDOWN ATTRIBUTES 
    @api selectedvalues = '';
    @api selectallvalues = 'All';
    @api valueplaceholder = this.label.SELECT_ONE;
    @track valuesingle = 'value selected';
    @track valuemulti = 'values selected';
    @track allvaluesselected = false;
    @api isdisabled = false;
    @api isseparated = false; 
    
    @track listValues = [];

    dinamycClasses = {  colMargin: {true: 'slds-col', false: 'slds-col disableMargin' },
                        dropdownDisabled: {true: 'slds-combobox slds-dropdown-trigger disabled', false: 'slds-combobox slds-dropdown-trigger'},
                        multiDropdownOrder: {true: 'slds-dropdown slds-dropdown_left slds-dropdown_small dropdownOrder__none', false: 'slds-dropdown slds-dropdown_left slds-dropdown_small dropdownOrder'},
                        dropdownOrder: {true: 'slds-dropdown slds-dropdown_left dropdownOrder__none', false: 'slds-dropdown slds-dropdown_left dropdownOrder'}};
    
    _selectedvalue;
    _values;
    //_selectallvalues = 'All';
    // get selectallvalues() {
    //     return this._selectallvalues;
    // }
    // set selectallvalues(selectallvalues) {
    //     if (selectallvalues) {
    //         this._selectallvalues = selectallvalues;
    //     }
    // }
    set selectedValue(selectedvalue) {
        this._selectedvalue = selectedvalue;
        this.handleSelection(selectedvalue);
    }

    get values() {
        return this._values;
    }
    set values(values) {
        if (values) {
            this._values = values;
            this.doInit();
        }
    }
    get isSeparatedClass() {
       return this.dinamycClasses.colMargin[this.isseparated];
    }
    get isDropDownDisabled() {
       return  this.dinamycClasses.dropdownDisabled[this.isdisabled];
    }
    get dropdownOrderClass() {
        return  this.dinamycClasses.dropdownOrder[this.isdisabled];
    }
    get isSelectedValueOne() {
        return (this.selectedvalue === this.label.SELECT_ONE);
    } 
    get isSelectedValueNoOne () {
        return (this.selectedvalue != null && this.selectedvalue !== this.label.SELECT_ONE);
    }
    get isZeroSelectedValue() {
        return (!this.selectedvalues || this.selectedvalues.length === 0);
    }
    get isOneSelectedValue() {
        return (this.selectedvalues && this.selectedvalues.length === 1);
    }
    get isSelectedValueNull() {
        return (!this.selectedvalue);
    }
    get selectedValue() {
        return this._selectedvalue;
    }
    get firstSelectedValue() {
        return (this.selectedvalues ? this.selectedvalues[0] : '');
    }
    
    get isMultipleSelectedValues() {
        return (this.selectedvalues && this.selectedvalues.length > 1);
    }

    get mulitpleSelctedText() {
        return (this.allvaluesselected ? this.selectedvalues.length - 1 : this.selectedvalues.length) + ' ' + this.valuemulti;
    }

    get multiDropdownClass() {
        return this.dinamycClasses.multiDropdownOrder[this.isseparated];
    }
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }

    @api doInit (){
        if (this.issimpledropdown != undefined && this._values && this._values.length > 0) {
            let baseClass = (this.issimpledropdown ? 'slds-dropdown__item' : 'button-selected icon-check');
            if (!this.issimpledropdown && this.selectallvalues != null && this._values != null){
                var valuesall = JSON.parse(JSON.stringify(this._values));
                if(valuesall.indexOf(this.selectallvalues) == -1){
                    valuesall.unshift(this.selectallvalues);
                    this._values = valuesall;
                }
            }

            this.listValues = [... this._values.map((value, index) => {
                return {
                    val: value,
                    key: value,
                    class: baseClass + (this.selectedvalue === value ? ' slds-is-selected' : ''),
                    selected: (this.selectedvalue === value )
                };
            })];
        } else {
            this.listValues = [];
        }
    }

    selectOption (evt){
        let item = evt.currentTarget.dataset.item;
        if(item !== this.selectedvalue){
            let items = [item];
            this.handleSelection(items);
        }
    }

    @api
    handleSelection (items){  
        let selectedValues = [];
        let listValAux = this.listValues;
        if(this.issimpledropdown) {
            this.selectedvalue = items[0];
            let valPreviuSelected = listValAux.find(value => value.selected);
            let newValSelected = listValAux.find(value => value.key == items[0]);
            selectedValues.push(items[0]);
            if (valPreviuSelected) {
                valPreviuSelected.selected = false;
                valPreviuSelected.class = 'slds-dropdown__item';
            }
            if (newValSelected) {
                newValSelected.selected = true;
                newValSelected.class = 'slds-dropdown__item slds-is-selected';
            } 
            this.listValues = [... listValAux];
        //Multiple selecction
        } else {
            if (this.selectedvalues == undefined){
                this.selectedvalues = [];
            }
            var selectedValuesList = JSON.parse(JSON.stringify(this.selectedvalues));
            let itemClicked =  listValAux.find(value => value.key == items[0]);
            var itemClickedAux = JSON.parse(JSON.stringify(itemClicked.key));
            //Select All item
            if (itemClickedAux.includes(this.selectallvalues)){
                var allOptions = this._values;
                var element = '[data-item="'+ itemClickedAux  +'"]';
                if (this.template.querySelector(element).classList.contains("slds-is-selected")){
                    this.allvaluesselected = false;
                    for(var key in allOptions){
                        var element = '[data-item="'+ allOptions[key]  +'"]';
                        this.template.querySelector(element).classList.remove("slds-is-selected");
                        selectedValues.splice(selectedValues.indexOf(allOptions[key]),1);
                    }
                } else {
                    this.allvaluesselected = true;
                    for(var key in allOptions){
                        var element = '[data-item="'+ allOptions[key]  +'"]';
                        this.template.querySelector(element).classList.add("slds-is-selected");
                        if(selectedValues.indexOf(allOptions[key]) == -1){
                            selectedValues.push(allOptions[key]);
                        }
                    }
                }
            //Select one item
            }else{
                var element = '[data-item="'+ itemClickedAux  +'"]';
                if(this.template.querySelector(element).classList.contains("slds-is-selected")){
                    this.template.querySelector(element).classList.remove("slds-is-selected");
                    // Remove the value from the list if it's still there
                    if(selectedValuesList.indexOf(items[0]) != -1){
                        selectedValuesList.splice(selectedValuesList.indexOf(items[0]),1);
                    }
                    // Remove 'All' if it's selected
                    if(selectedValuesList.indexOf(this.selectallvalues) != -1){
                        var element = '[data-item="'+ this.selectallvalues  +'"]';
                        this.template.querySelector(element).classList.remove("slds-is-selected");
                        selectedValuesList.splice(selectedValuesList.indexOf(this.selectallvalues),1);
                    }
                    selectedValues = selectedValuesList;
                } else {
                    element = '[data-item="'+ itemClickedAux  +'"]';
                    this.template.querySelector(element).classList.add("slds-is-selected");
                    selectedValuesList.push(items[0]);
                    selectedValues = selectedValuesList;
                }
                this.allvaluesselected = false;
            }
        }
        console.log("event generated");
        const selectedEvent = new CustomEvent('dropdownvalueselected', {detail: selectedValues});
        this.dispatchEvent(selectedEvent);
      
    }

    @api
    updateSelection(args){
        if(args){
            var items = args;
            this.handleSelection(items);
        }
    }

    @api
    keepSelection (args) {
        if(args){
            var element = '[data-item="'+ args  +'"]';
            this.template.querySelector(element).classList.add("slds-is-selected");
        }
    }
}