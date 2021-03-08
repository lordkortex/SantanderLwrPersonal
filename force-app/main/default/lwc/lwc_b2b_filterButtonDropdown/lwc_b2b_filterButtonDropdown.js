import { LightningElement, api, track } from 'lwc';

import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

import filterBy from '@salesforce/label/c.filterBy';
import apply from '@salesforce/label/c.apply';
import clearAll from '@salesforce/label/c.clearAll';

export default class Lwc_b2b_filterButtonDropdown extends LightningElement {

    @api filterlist = []      //List of possible filters(name) for the current option.
    @api label=""           //Combobox filter label.
    @api name=""      //Name of the filter.
    @api showdropdown= false //Indicates if the dropdown must be open.
    @api selectedfilters=[] //List of all the selected filters(name) of all options.
    @api selectedlabel=""   //Label of the checkbox if the user has selected only one option.
    @api cleardropdown= false//Indicates if the dropdown must be cleared

    @track listCheckbox;

    Label = {filterBy, apply, clearAll}

    connectedCallback(){
        loadStyle(this, santanderStyle + '/style.css');

        var listAux = JSON.parse(JSON.stringify(this.filterlist));
        Object.keys(listAux).forEach(key => {
            listAux[key].index = this.reservednumber + key;
        });
        this.listCheckbox = listAux;
    }

    get class1(){
        return this.showdropdown == true ? 'icon-arrowUp_small' : 'icon-arrowDown_small';
    }

    get class2(){
        return this.selectedfilters.length > 0 ? 'slds-button buttons filterButton' : 'slds-button buttons';
    }

    get condition1(){
        return this.selectedfilters.length == 1 ? true : false;
    }

    get selectedFiltersnumber(){
        return this.selectedfilters.length;
    }

    handleDropdownButton(){
        if (this.showdropdown == true) {
            this.showdropdown = false;
        } else {
            this.showdropdown = true;
            this.setCheckboxes();
        }
        this.callEventSave(null);
    }

    @api
    setCheckboxes (){
        let selectedFilters = this.selectedfilters;
        let checkboxes = this.getCheckBoxes();
        for (let i = 0; i < selectedFilters.length; i++) {
            for (let j = 0; j < checkboxes.length; j++) {
                let value = checkboxes[j].value;
                let label = checkboxes[j].label;
                if (selectedFilters[i] == value) {
                    checkboxes[j].ischecked = true;
                }
            }
        }
    }

    @api
    getCheckBoxes() {
        let checkboxes = this.template.querySelectorAll('[data-id="checkboxes"]');
        if (checkboxes) {
            if (checkboxes.length) {
                let copia = checkboxes;
                checkboxes = [...checkboxes, copia];
                // checkboxes.push(copia);

            }
        } else {
            checkboxes = [];
        }
        return checkboxes;
    }

    handlerApplyFilters() {
        let selectedFilters = [];
        let currentlySelected = this.getChecked();
        for (let i = 0; i < currentlySelected.length; i++) {
            selectedFilters.push(currentlySelected[i]);
        }
        this.selectedfilters = selectedFilters;
        this.hideDropdown();
        if (selectedFilters.length > 0) {
            this.callEventSave('apply');
        } else {
            this.removeFilters();
        }      
    }

    getChecked() {
        let checkboxes = this.getCheckBoxes();
        let checked = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].ischecked) {
                checked.push(checkboxes[i].value);
            }
        }
        return checked;
    }

    showDropdown() {
        if (this.showdropdown == true) {
            this.showdropdown = false;
        } else {
            this.showdropdown = true;
            this.setCheckboxes();
        }
        this.callEventSave(null);
    }

    hideDropdown() {
        this.showdropdown = false;
    }

    callEventSave(action) {
        const saveFilters = new CustomEvent('savefilters', {
            detail : {
                showDropdown: this.showdropdown,
                name: this.name,
                action: action,
                selectedFilters: this.selectedfilters
            }
        });
        this.dispatchEvent(saveFilters);
    }

    handlerClearFilters() {
        this.removeFilters();
    }

    handleClearDropdown() {
        var clear = this.clearDropdown;
        if(clear){
            this.removeFilters(); 
        } 
    }

    removeFilters() {
        let checkboxes = this.getCheckBoxes();
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].ischecked = false;
        }
        this.selectedFilters = [];
        this.hideDropdown();
        this.setSelectedLabel();
        this.callEventSave('clear');
    }

    handleSetLabel(){
        this.setSelectedLabel();
    }

    setSelectedLabel(){
        var selectedFilters =  this.selectedFilters;
        if(selectedFilters != null && selectedFilters != undefined){
            if(selectedFilters.length == 1){
                var obj = this.getCheckboxObject(selectedFilters[0]);
                if(obj != null){
                    this.selectedLabel = obj.label;
                }else{
                    this.selectedLabel = '';  
                }
            }else{
                this.selectedLabel = '';
            }
        }
    }

    getCheckboxObject(value){
        var filterList = this.filterlist;
        if(filterList != null && filterList != undefined){
           var obj = filterList.find(obj => obj.value == value);
            if(obj != null && obj != undefined){
                return obj;
            }
        }
       return null; 
    }

}