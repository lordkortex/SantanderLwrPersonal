import { LightningElement, api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

// Import labels
import singleChoice from '@salesforce/label/c.singleChoice';
import multipleChoice from '@salesforce/label/c.multipleChoice';
import advancedFilters from '@salesforce/label/c.advancedFilters';
import close from '@salesforce/label/c.close';
import originAccount from '@salesforce/label/c.originAccount';
import beneficiaryAccount from '@salesforce/label/c.beneficiaryAccount';
import currency from '@salesforce/label/c.currency';
import from from '@salesforce/label/c.from';
import amount from '@salesforce/label/c.amount';
import to from '@salesforce/label/c.to';
import status from '@salesforce/label/c.status';
import writeAnAccountNumber from '@salesforce/label/c.writeAnAccountNumber';
import beneficiaryCountry from '@salesforce/label/c.beneficiaryCountry';
import valueDate from '@salesforce/label/c.valueDate';
import writeAWord from '@salesforce/label/c.writeAWord';
import thatContains from '@salesforce/label/c.thatContains';
import clearAll from '@salesforce/label/c.clearAll';
import apply from '@salesforce/label/c.apply';
import payment_statusOne from '@salesforce/label/c.payment_statusOne';
import payment_statusTwo from '@salesforce/label/c.payment_statusTwo';
import payment_statusThree from '@salesforce/label/c.payment_statusThree';
import payment_statusFour from '@salesforce/label/c.payment_statusFour';
import toAmountLowerThanFrom from '@salesforce/label/c.toAmountLowerThanFrom';
import filterBy from '@salesforce/label/c.filterBy';

// Import apex methods
import getStatus from '@salesforce/apex/CNT_MRTrackerSearch.getStatus';
import getISO2Values from '@salesforce/apex/CNT_MRTrackerSearch.getISO2Values';
import getCurrencies from '@salesforce/apex/CNT_MRTrackerSearch.getCurrencies';


export default class Lwc_b2b_filterButtonDropdownCalendar extends LightningElement {
    @api filterlist = []      //List of possible filters(name) for the current option.
    @api label=""           //Combobox filter label.
    @api name=""      //Name of the filter.
    @api showdropdown= false //Indicates if the dropdown must be open.
    @api selectedfilters=[] //List of all the selected filters(name) of all options.
    @api selectedlabel=""   //Label of the checkbox if the user has selected only one option.
    @api cleardropdown= false//Indicates if the dropdown must be cleared

    @track listCheckbox;

    dateFrom;
    dateTo;

    Label = {
        singleChoice,
        multipleChoice,
        advancedFilters,
        close,
        originAccount,
        beneficiaryAccount,
        currency,
        from,
        amount,
        to,
        status,
        writeAnAccountNumber,
        beneficiaryCountry,
        valueDate,
        writeAWord,
        thatContains,
        clearAll,
        apply,
        payment_statusOne,
        payment_statusTwo,
        payment_statusThree,
        payment_statusFour,
        toAmountLowerThanFrom,
        filterBy
    };

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

    changedatefromhandler(event) {
        try {
            this.dateFrom = new Date(event.detail).toISOString().split('T')[0];
            console.log('changedatefromhandler executed: '+event.detail);
            console.log('this.dateFrom '+this.dateFrom);
            this.dateFrom
        } catch(e) {
            this.dateFrom = '';
        }
    }

    changedatetohandler(event) {
        try {
            this.dateTo = new Date(event.detail).toISOString().split('T')[0];
            console.log('changedatefromhandler executed: '+event.detail);
            console.log('this.dateTo '+this.dateTo);
        } catch(e) {
            this.dateTo = '';
        }
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
        this.dateFrom = '';
        this.dateTo = '';
        this.hideDropdown();
        // this.setSelectedLabel();
        // this.callEventSave('clear');
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