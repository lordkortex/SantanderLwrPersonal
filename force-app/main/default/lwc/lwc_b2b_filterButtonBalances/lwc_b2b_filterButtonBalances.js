import { LightningElement, track, api } from 'lwc';

import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
// Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';


import B2B_Balance from '@salesforce/label/c.B2B_Balance';
import filterBy from '@salesforce/label/c.filterBy';
import from2 from '@salesforce/label/c.from';
import to from '@salesforce/label/c.to';
import PAY_ErrorToAmount from '@salesforce/label/c.PAY_ErrorToAmount';
import apply from '@salesforce/label/c.apply';
import clearAll from '@salesforce/label/c.clearAll';


export default class Lwc_b2b_filterButtonBalances extends LightningElement {

    Label = {
        B2B_Balance,
        filterBy,
        from2,
        to,
        PAY_ErrorToAmount,
        apply,
        clearAll
    }

    @api showdropdown = false;
    @api minimumbalance = "";
    @api maximumbalance = "";
    @api clearbalances = false;
    @api numberformat = '###,###,###.##';

    @track amountInformed = "";
    @track locale;
    @track decimalSeparator;
    @track thousandsSeparator;
    @track formattedValueFrom = "";
    @track formattedValueTo = "";
    @track userInputFrom;
    @track userInputTo;
    @track errorMSG = this.Label.toAmountLowerThanFrom;
    @track errorAmounts = false;
    @track showFromMiniLabel;
    @track showToMiniLabel;
    

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.init();
    }

    get buttonClass(){
        return 'slds-button buttons' + (this.amountInformed > 0 ? ' filterButton' : '');
    }
    get showdropdownClass(){
        return this.showdropdown == true ? 'icon-arrowUp_small' : 'icon-arrowDown_small';
    }
    get divInputClass(){
        return 'slds-form-element input' + (this.errorAmounts == true ? ' error':'');
    }
    get inputOneEqTrue(){
        return this.showFromMiniLabel == true || this.userInputFrom;
    }
    get inputClass(){
        return 'slds-input balances '+ (this.errorAmounts == true ? 'error' : '');
    }
    get errorAmountsEqualsTrue(){
        return this.errorAmounts == true;
    }
    get inputTwoEqTrue(){
        return this.showToMiniLabel == true || this.userInputTo;
    }
    get showDropdownEqualsTrue(){
        return this.showdropdown == true;
    }
    get inputClass(){
        return this.showdropdown == true ? 'icon-arrowUp_small' : 'icon-arrowDown_small';
    }



    init() {
        var numberformat = this.numberformat;
        var decimalSeparator = '.';
        var thousandsSeparator = ',';
        if (numberformat == '###.###.###,##') {
            decimalSeparator = ',';
            thousandsSeparator = '.';
            this.locale = 'de-DE';
        } else {
            decimalSeparator = '.';
            thousandsSeparator = ',';
            this.locale = 'en';
        }
        this.decimalSeparator = decimalSeparator;
        this.thousandsSeparator = thousandsSeparator;
    }


    handleDropdownButton() {
        this.showDropdown();
    }

    handlerApplyFilters() {
        if (this.errorAmounts == false) {
            this.calculateAmountInformed();
            this.hideDropdown();
            this.callEventSave('apply');
        }
    }

    handlerClearFilters() {
        this.minimumbalance = '';
        this.maximumbalance = '';
        this.formattedValueFrom = '';
        this.formattedValueTo = '';
        this.userInputFrom = '';
        this.userInputTo = '';
        this.errorAmounts = false;

        this.calculateAmountInformed();
        this.hideDropdown();
        this.callEventSave('clear');
    }
    
    handleInputAmount(event) {
        let locale = this.locale;
        let thousandsSeparator = this.thousandsSeparator;
        let decimalSeparator = this.decimalSeparator;
        let inputValue = event.target.value;
        let inputId = event.target.dataset.id;
        let validUserInput = '';
        if (inputValue) {
            if (inputId) {
                if (inputId == 'from' && validUserInput != undefined) {
                    validUserInput = this.userInputFrom;
                } else {
                    validUserInput = this.userInputTo;
                }

                let validRegExp = new RegExp('^[0-9][0-9' + thousandsSeparator + ']*[' + decimalSeparator + ']?[0-9]{0,2}$');
                let isInputValid = validRegExp.test(inputValue);

                if (isInputValid == true && inputValue.length < 18) {
                    validUserInput = inputValue;
                    if (inputId == 'from' && validUserInput != undefined) {
                        this.userInputFrom = validUserInput;
                    } else {
                        this.userInputTo = validUserInput;
                    }

                }

                let element = '[data-id="' + inputId + '"]';
                let input = this.template.querySelector(element);
                if (input != null && input != undefined) {
                    input.value = validUserInput;
                }
            }


            let thousandsRegExp = new RegExp('[' + thousandsSeparator + ']', 'g');
            let valueWithoutThousand = validUserInput.replace(thousandsRegExp, '');
            let valueWithDecimal = valueWithoutThousand.replace(decimalSeparator, '.');

            if (inputId == 'from' && parseFloat(valueWithDecimal) != undefined && Number.isNaN(parseFloat(valueWithDecimal)) == false) {
                this.minimumbalance = parseFloat(valueWithDecimal);
            } else {
                this.maximumbalance = parseFloat(valueWithDecimal);
            }


            if (inputId == 'from') {
                this.formattedValueFrom = validUserInput;
            } else {
                this.formattedValueTo = validUserInput;
            }
        } else {
            if (inputId == 'from') {
                this.minimumbalance = '';
                this.formattedValueFrom = '';
                this.userInputFrom = '';

            } else {
                this.maximumbalance = '';
                this.formattedValueTo = '';
                this.userInputTo = '';

            }
        }

    }

    handleFocusAmount(event) {
        let value = '';
        let inputId = event.target.dataset.id;
        if (inputId) {
            if (inputId == 'from') {
                if (this.userInputFrom != undefined && this.userInputFrom != null && this.userInputFrom != '') {
                    value = this.userInputFrom;
                }
                this.showFromMiniLabel = true;
            } else {
                if (this.userInputTo != undefined && this.userInputTo != null && this.userInputTo != '') {
                    value = this.userInputTo;
                }
                this.showToMiniLabel = true;
            }

            let element = '[data-id="' + inputId + '"]';
            let input = this.template.querySelector(element);
            
            if (input != null && input != undefined) {
                input.value = value
            }
        }
    }

    handleBlurAmount(event) {
        let formattedValue = '';
        let inputId = event.target.dataset.id;
        console.log(inputId);

        if (inputId == 'from') {
            this.showFromMiniLabel = false;
            if (this.formattedValueFrom != '' && this.formattedValueFrom != null) {
                formattedValue = this.formattedValueFrom;
            }
        }

        if (inputId == 'to') {
            this.showToMiniLabel = false;
            if (this.formattedValueTo != '' && this.formattedValueTo != null) {
                formattedValue = this.formattedValueTo;
            }
        }

        if (inputId) {
            let element = '[data-id="' + inputId + '"]';
            let input = this.template.querySelector(element);
            if (input != null && input != undefined) {
                input.value = formattedValue;
            }
        }
    }

    valueChanges(event) {
        console.log("chage");
        let inputId = '';
        let value = '';
        inputId = event.target.dataset.id;
        value = event.target.value;
        console.log(inputId);
        console.log(value);
        if (inputId == 'from') {
            value = this.minimumbalance;
        } else {
            value = this.maximumbalance;
        }
        console.log(value);

        if (value) {

            if (inputId) {

                let locale = this.locale;
                var formatValue = '';
                formatValue = Intl.NumberFormat(locale).format(value);
                if (inputId == 'from') {
                    this.formattedValueFrom = formatValue;
                } else {
                    this.formattedValueTo = formatValue;
                }

                let element = '[data-id="' + inputId + '"]';
                let input = this.template.querySelector(element);
                console.log(formatValue);
                console.log(this.formattedValueFrom);
                if (input != null && input != undefined) {
                    input.value = formatValue;
                }

            }
        } else {
            if (inputId == 'from') {
                this.minimumbalance = '';
                this.formattedValueFrom = '';
                this.userInputFrom = '';
            } else {
                this.maximumbalance = '';
                this.formattedValueTo = '';
                this.userInputTo = '';
            }
        }
        this.validateInput();
    }

    handlerclearbalances() {
        var clear = this.clearbalances;
        if (clear) {
            this.clearBalances();
        }
    }

    showDropdown() {
        if (this.showdropdown == true) {
            this.showdropdown = false;
        } else {
            this.showdropdown = true;
        }
        this.callEventSave(null);
    }

    hideDropdown() {
        this.showdropdown = false;
    }

    calculateAmountInformed() {
        let amountInformed = 0;
        let minimumbalance = this.minimumbalance;
        let maximumbalance = this.maximumbalance;
        if (minimumbalance) {
            amountInformed++;
        }
        if (maximumbalance) {
            amountInformed++;
        }
        this.amountInformed = amountInformed;
    }

    callEventSave(action) {
        const saveFilters = new CustomEvent('savefilters', {
            detail: { showDropdown: this.showdropdown,
                    name: this.name,
                    action: action},
        });
        this.dispatchEvent(saveFilters);
    }


    validateInput() {
        console.log(this.minimumbalance);
        console.log(this.maximumbalance)
        if (this.minimumbalance != '' && this.minimumbalance != null && this.maximumbalance != '' && this.maximumbalance != null) {
            if (this.minimumbalance > this.maximumbalance) {
                this.errorAmounts = true;
                this.template.querySelector('[data-id="from"]').classList.add('error');
                this.template.querySelector('[data-id="to"]').classList.remove('error');
            } else {
                this.errorAmounts = false;
                this.template.querySelector('[data-id="from"]').classList.remove('error');
                this.template.querySelector('[data-id="to"]').classList.remove('error');
            }
        } else {
            this.errorAmounts = false;
            this.template.querySelector('[data-id="from"]').classList.remove('error');
            this.template.querySelector('[data-id="to"]').classList.remove('error');
        }
    }

    clearBalances() {
        this.minimumbalance = '';
        this.maximumbalance = '';
        this.formattedValueFrom = '';
        this.formattedValueTo = '';
        this.userInputFrom = '';
        this.userInputTo = '';
        this.errorAmounts = false;


        this.calculateAmountInformed();
        this.hideDropdown();
        this.callEventSave('clear');
    }
}