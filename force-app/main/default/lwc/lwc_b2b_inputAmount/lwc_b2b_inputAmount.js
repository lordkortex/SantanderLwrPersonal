import { LightningElement, api, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import B2B_Amount_Input_Placeholder from '@salesforce/label/c.B2B_Amount_Input_Placeholder';
import B2B_Available_Balance from '@salesforce/label/c.B2B_Available_Balance';
import PAY_NotCurrentlyAvailable from '@salesforce/label/c.PAY_NotCurrentlyAvailable';
import PAY_UpdatedAt from '@salesforce/label/c.PAY_UpdatedAt';

export default class lwc_b2b_inputAmount extends LightningElement {

    label = {
        B2B_Amount_Input_Placeholder,
        B2B_Available_Balance,
        PAY_NotCurrentlyAvailable,
        PAY_UpdatedAt
    };

    @api elementlabel = "";
    @api numberformat
    @api acccurrency
    @api value
    @api inputid
    @api errormsg = "";
    @api steps
    @api ismodified
    @api disablefrom
    @api disableto
    @api disabled
    @api iscib
    @api showbalanceinfo
    @api balancevalue = "";
    @api balancecurrency = "";
    @api datetext = "";
    @api timetext = "";
    @api showbothamountinput
    @api dateformat = "";
    @api showmoreinfotext;
    @api moreinfolabel = "";
    @api moreinfovalue = "";

    @track inputType
    @track formattedValue = "";
    @track decimalValue
    @track userInputValue = "";
    @track showMiniLabel
    @track locale = "en";
    @track decimalSeparator = ".";
    @track thousandsSeparator = ",";
    @track errorMSG_1 = "";
    @track errorMSG_2 = "";
    // @api handleChange
    

    @track _value;
    @track errormsg

    get value(){
        return this._value;
    }

    set value(value){
        this._value = value;
        this.valueChanges();
    }

    get errormsg(){
        return this._errormsg;
    }

    set errormsg(errormsg){
        this._errormsg = errormsg;
        this.errorChanges();
    }

    get errorClass(){
        return 'slds-form-element' + (this.errormsg ? ' error' : '');
    }

    get balanceValueNotEmpty(){
        return !this.isEmpty(this.balancevalue);
    }

    get errorMSGnotEmpty(){
        return !this.isEmpty(this.errormsg);
    }

    isEmpty(element){
        return element == "" || JSON.stringify(element) == JSON.stringify({}) || element == [] || element == undefined;
    }

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
        this.initComponent();
    }

    initComponent() {
        var steps = this.steps;
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 2 && lastModifiedStep == 2) {
            this._value = null;
            this.formattedValue = '';
            this.decimalValue = null;
            this.isModified = true;
            let inputId = this.inputid;
            if (!this.isEmpty(inputId)) {
                var element = "[data-id='" + inputId + "']";
                let input = this.template.querySelector(element);
                if (input != null && input != undefined) {
                    input.value = '';
                }
            }
        }
        var numberFormat = this.numberformat;
        var decimalSeparator = '.';
        var thousandsSeparator = ',';
        var locale = 'en';
        if (numberFormat == '###.###.###,##') {
            decimalSeparator = ',';
            thousandsSeparator = '.';
            locale ='de-DE';
        }
        this.decimalSeparator = decimalSeparator;
        this.thousandsSeparator = thousandsSeparator;
        this.locale = locale;
        let value = this._value;
        if (!this.isEmpty(value)) {
            this.setValueToInput(value);
        }
    }

    changeAmount() {
        let valueWithoutThousand = '';
        let valueWithDecimal = '';
        let locale = this.locale;
        let validUserInput = this.userInputValue;
        let thousandsSeparator = this.thousandsSeparator;
        let decimalSeparator = this.decimalSeparator;
        if (validUserInput.includes(thousandsSeparator)) {
            valueWithoutThousand = validUserInput.replaceAll(thousandsSeparator, '');
        } else {
            valueWithoutThousand = validUserInput;
        }
        if (valueWithoutThousand.includes(decimalSeparator)) {
            valueWithDecimal = valueWithoutThousand.replace(decimalSeparator, '.');
        } else {
            valueWithDecimal = valueWithoutThousand;
        }
        if (!this.isEmpty(valueWithDecimal)) {
            valueWithDecimal = parseFloat(valueWithDecimal);
            this.decimalValue = valueWithDecimal;
            let formatValue = Intl.NumberFormat(locale).format(valueWithDecimal);
            this.formattedValue = formatValue;
            this._value = valueWithDecimal;
        } else {
            this.decimalValue = null;
            this.formattedValue = '';
            this._value = null;
        }
        let inputId = this.inputid;
        const changeAmountEvent = new CustomEvent('changeinputamount', {
            detail: {inputId: inputId, amount: valueWithDecimal}
        });
        this.dispatchEvent(changeAmountEvent);
    }

    handleInputAmount(event) {
        let thousandsSeparator = this.thousandsSeparator;
        let decimalSeparator = this.decimalSeparator;
        let inputValue = event.currentTarget.value;
        let validUserInput = this.userInputValue;
        if (!this.isEmpty(inputValue)) {
            this.errormsg  = '';
            let validRegExp = new RegExp('^[0-9][0-9' + thousandsSeparator + ']*[' + decimalSeparator + ']?[0-9]{0,2}$');
            let isInputValid = validRegExp.test(inputValue);
            if (isInputValid && inputValue.length < 18) {
                validUserInput = inputValue;
                this.userInputValue = validUserInput;
            }
            let inputId = this.inputid;
            if (!this.isEmpty(inputId)) {
                var element = "[data-id='" + inputId + "']";
                let input = this.template.querySelector(element);
                if (input != null && input != undefined) {
                    input.value = validUserInput;
                    let isCib = this.iscib;
                    if (isCib) {
                        if (inputId == 'sourceAmountInput') {
                            this.disableto = true;
                        } else if (inputId == 'recipientAmountInput') {
                            this.disablefrom = true;
                        }
                    }
                }
            }
        } else {
            this._value = null;
            this.userInputValue = '';
            this.decimalValue = null;
            this.formattedValue = '';
            this.disableto = false;
            this.disablefrom = false;
        }
    }

    handleFocusAmount() {
        this.showMiniLabel = true;
        let userInputValue = this.userInputValue;
        let value = this._value;
        let inputId = this.inputid;
        if (!this.isEmpty(inputId)) {
            var element = "[data-id='" + inputId + "']";
            let input = this.template.querySelector(element);
            if (input != null && input != undefined) {
                // AMR 25/11/2020
                input.value = formattedValue;
                /* if (!$A.util.isEmpty(userInputValue)) {
                    input.value = userInputValue;
                } else {
                    input.value = component.get('v.formattedValue');
                } */
            }
        }
    }

    handleBlurAmount() {
        this.showMiniLabel = false;
        let formattedValue = this.formattedValue;
        if (this.isEmpty(formattedValue)) {
            formattedValue = '';
        }
        let inputId = this.inputid;
        if (!this.isEmpty(inputId)) {
            var element = "[data-id='" + inputId + "']";
            let input = this.template.querySelector(element);
            if (input != null && input != undefined) {
                input.value = formattedValue;
            }
        }
    }

    errorChanges() {
        let disabled = this.disabled;
        if (disabled) {
            console.log('field disabled');
        } else {
            let errorMSG = this.errormsg;
            let error1 = null;
            let error2 = null;
            if (!this.isEmpty(errorMSG)) {
                if (errorMSG.includes('-')) {
                    error1 = errorMSG.substring(0, errorMSG.indexOf('-'));
                    error2 = errorMSG.substring(errorMSG.indexOf('-') + 1, errorMSG.length);
                } else {
                    error1 = errorMSG;
                }
            }
            this.errorMSG_1 = error1;
            this.errorMSG_2 = error2;
        }
    }

    valueChanges() {
        let disabled = this.disabled;
        if (disabled) {
            console.log('field disabled');
        } else {
            let value = this._value;
            if (!this.isEmpty(value)) {
                this.setValueToInput(value);
            } else {
                this.userInputValue = '';
                this.decimalValue = null;
                this.formattedValue = '';
            }
        }
    }

    @api
    setInputAmount(event) {
        var params = event.detail.arguments;
        if (params) {
            let value = params.inputValue;
            this._value = value;
            if (!this.isEmpty(value)) {
                let stringValue = value.toString();
                this.userInputValue = stringValue;
            }
            this.inputId = params.inputId;
            let inputId = this.inputid;
            let userInputValue = this.userInputValue;
            if (!this.isEmpty(inputId)) {
                var element = "[data-id='" + inputId + "']";
                let input = this.template.querySelector(element);
                if (input != null && input != undefined) {
                    if (!this.isEmpty(userInputValue)) {
                        input.value = userInputValue;
                    } else {
                        input.value = this.formattedValue;
                    }
                }
            }
        }
    }

    handleKeyUp(event) {
        let inputValue = event.currentTarget.value;
        let key = event.key;
        let keyCode = event.keyCode;
        if(key == 'Enter' && keyCode == 13){
            this.changeAmount();
        }
    }

    setValueToInput(value) {
        if (!this.isEmpty(value)) {
            let stringValue = value.toString();
            this.userInputValue = stringValue;
        }
        this.decimalValue = value;
        let locale = this.locale;
        let formatValue = Intl.NumberFormat(locale).format(value);
        this.formattedValue = formatValue;
        let inputId = this.inputid;
        if (!this.isEmpty(inputId)) {
            var element = "[data-id='" + inputId + "']";
            let input = this.template.querySelector(element);
            if (input != null && input != undefined) {
                input.value = formatValue;
            }
        }
    }
}