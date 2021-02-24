import { LightningElement, track, api } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle } from'lightning/platformResourceLoader';
import SELECT_ONE from '@salesforce/label/c.selectOne';

export default class Lwc_cn_dropdown extends LightningElement {
 
    @api values = [];
    @api selectedvalue = '';
    @api headerdropdown = '';
    @api helptext;
    @api issimpledropdown = false;
    
    //MULTISELECT DROPDOWN ATTRIBUTES 
    @api selectedvalues;
    @api selectallvalues = 'All';
    @api valueplaceholder = SELECT_ONE;
    @api valuesingle = 'value selected';
    @api valuemulti = 'values selected';
    @api allvaluesselected = false;
    @api isdisabled = false;
    @api isseparated = false; //revisar, no deja iniciarlizarlo a true
    
    @track listValues = [];

    dinamycClasses = {  colMargin: {true: 'slds-col', false: 'slds-col disableMargin' },
                        dropdownDisabled: {true: 'slds-combobox slds-dropdown-trigger disabled', false: 'slds-combobox slds-dropdown-trigger'},
                        multiDropdownOrder: {true: 'slds-dropdown slds-dropdown_left slds-dropdown_small dropdownOrder__none', false: 'slds-dropdown slds-dropdown_left slds-dropdown_small dropdownOrder'},
                        dropdownOrder: {true: 'slds-dropdown slds-dropdown_left dropdownOrder__none', false: 'slds-dropdown slds-dropdown_left dropdownOrder'}};
    label = {
        SELECT_ONE
    }
    _selectedvalue;
    _values;
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
    get selectedValues() {
        return this._selectedvalues;
    }
    set selectedValues(selectedvalues) {
        this._selectedvalues = selectedvalues;
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
        return (this.selectedvalue !== null && this.selectedvalue !== this.label.SELECT_ONE);
    }
    get isZeroSelectedValue() {
        return (!this._selectedvalues || this._selectedvalues.length === 0);
    }
    get isOneSelectedValue() {
        return (this._selectedvalues && this._selectedvalues.length === 1);
    }
    get isSelectedValueNull() {
        return (!this.selectedvalue);
    }
    get selectedValue() {
        return this._selectedvalue;
    }
    get firstSelectedValue() {
        return (this._selectedvalues ? this._selectedvalues[0] : '');
    }
    
    get isMultipleSelectedValues() {
        return (this._selectedvalues && this._selectedvalues.length > 1);
    }

    get mulitpleSelctedText() {
        return (this.allvaluesselected ? this.selectedvalues.length - 1 : this.selectedvalues.length - 1 ) + '' + this.valuemulti;
    }

    get multiDropdownClass() {
        return this.dinamycClasses.multiDropdownOrder[this.isseparated];
    }
    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        console.log('ENTRA DROPDOWN: ' + this.values + this.selectedvalue + this.headerdropdown);
    }
    doInit (){
        if (this._values.length > 0) {
            let baseClass = (this.issimpledropdown ? 'slds-dropdown__item' : 'button-selected icon-check');
            this.listValues = [... this._values.map((value, index) => {
                return {
                    val: value,
                    key: value,
                    //key: index,
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
        //if(!isNaN(item) && item !== this.selectedvalue){
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
        } else {
            let itemClicked =  listValAux.find(value => value.key == items[0]);
            itemClicked.selected = !itemClicked.selected;
            itemClicked.class = (itemClicked.selected ? 'button-selected icon-check slds-is-selected' : 'button-selected icon-check');
            this.listValues = [... listValAux];
            selectedValues = this.listValues.filter(value => value.selected);
            if (selectedValues) {
                selectedValues = selectedValues.map(value => value.val);
            }
        }
        console.log("event generated");
        const selectedEvent = new CustomEvent('dropdownvalueselected', {detail: selectedValues});
        this.dispatchEvent(selectedEvent);
      
    }

    onSelectionUpdate(event){
        var args = event.getParam("arguments");
        if(args){
            var items = args.changedValues;
            this.handleSelection(items);
        }
    }
}