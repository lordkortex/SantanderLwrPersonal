import { LightningElement, api, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';

//Import styles
import santanderStyle from '@salesforce/resourceUrl/Lwc_Santander_Icons';

//Import labels
import B2B_Amount_Input_Placeholder from '@salesforce/label/c.B2B_Amount_Input_Placeholder';

export default class lwc_b2b_inputAmount extends LightningElement {
    label = {
        B2B_Amount_Input_Placeholder,
    };

    @api numberformat //User number format
    @api acccurrency //currency to be displayed in input box
    @api value 
    @api inputid = 'inputid';
    @api errormsg = ''; //Indicates the errors when clicked on continue.
    @api handlechange //Action in SelectAmount to process amount in put by user.
    @api steps //Data of the steps.
    @api ismodified //Indicates if the input data has been modified.
    @api disablefrom = false; //Disable the From field for CIB user when they input a value in the To field.
    @api disableto = false; //Disable the To field for CIB user when they input a value in the From field.
    @api disabled = false; //Input box is disabled
    @api accountdata //Account data.

    @track inputType //In which input field was the amount entered source or recipient?
    @track formattedValue = ''; 
    @track decimalValue = ''; 
    @track userInputValue = ''; 
    @track showMiniLabel //Control to show mini label.
    @track locale 
    @track decimalSeparator = '.';
    @track thousandsSeparat = ',';
    @track errorMSG_1 = ''; //Indicates the error when clicked on continue.
    @track errorMSG_2 = ''; //Indicates the error when clicked on continue (if there are two errors).
    @track inputValue 

    connectedCallback() {
        loadStyle(this, santanderStyle + '/style.css');
    }

    get mainClass(){
        return (this.errormsg ? 'slds-form-element input error' : 'slds-form-element input');
    }

    isDisabledAndShowMiniLabelOrFormatedValue(){
        return !this.disabled && (this.showMiniLabel || this.formattedValue.length>0);
    }
    
    existsErrorMSG(){
        return this.errormsg ? true : false;
    }

    existsErrorMSG2(){
        return this.errorMSG_2 ? true : false;
    }
    
    initComponent() {
        var steps = this.steps;
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 2 && lastModifiedStep == 2) {
            this.value = null;
            this.formattedValue = '';
            this.decimalValue = null;
            this.isModified = true;
            let inputId = this.inputId;
            if (inputId) {
                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    input.value = '';
                }
            }
        }
        var numberFormat = this.numberFormat;
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
    }

    handleChangeAmount() {
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
        if (valueWithDecimal) {
            valueWithDecimal = parseFloat(valueWithDecimal);
            this.decimalValue, parseFloat(valueWithDecimal);
            let formatValue = Intl.NumberFormat(locale).format(valueWithDecimal);
            this.formattedValue, formatValue;
            this.value, valueWithDecimal;
        } else {
            this.decimalValue = null;
            this.formattedValue = '';
            this.value = null;
        }
        let inputId = this.inputId;
        const changeinputamount = new CustomEvent('changeinputamount', {
            inputId : inputId,
            amount : valueWithDecimal
        })
        this.dispatchEvent(changeinputamount);
    }

    handleInputAmount(event) {
        let thousandsSeparator = this.thousandsSeparator;
        let decimalSeparator = this.decimalSeparator;
        let inputValue = event.target.value;
        let validUserInput = this.userInputValue;
        if (inputValue) {
            this.errorMSG = '';
            let validRegExp = new RegExp('^[0-9][0-9' + thousandsSeparator + ']*[' + decimalSeparator + ']?[0-9]{0,2}$');
            let isInputValid = validRegExp.test(inputValue);
            if (isInputValid == true && inputValue.length < 18) {
                validUserInput = inputValue;
                this.userInputValue = validUserInput;
            }
            let inputId = this.inputId;
            if (inputId) {
                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    input.value = validUserInput;
                    let accountData = this.accountData;
                    if (accountData.cib) {
                        if (accountData.cib == true) {
                            if (inputId == 'sourceAmountInput') {
                                this.disableTo = true;
                            } else if (inputId == 'recipientAmountInput') {
                                this.disableFrom = true;
                            }
                        }
                    }
                }
            }
        } else {
            this.value = null;
            this.formattedValue = '';
            this.userInputValue = '';
            this.decimalValue = null;
            this.disableTo = false;
            this.disableFrom = false;
        }
    }

    handleFocusAmount() {
        this.showMiniLabel = true;
        let inputId = this.inputId;
        if (inputId) {
            let input = document.getElementById(inputId);
            if (input != null && input != undefined) {
                input.value = formattedValue;
            }
        }
    }

    handleBlurAmount() {
        this.showMiniLabel = false;
        let formattedValue = this.formattedValue;
        if (!(formattedValue)) {
            formattedValue = '';
        }
        let inputId = this.inputId;
        if (inputId) {
            let input = document.getElementById(inputId);
            if (input != null && input != undefined) {
                input.value = formattedValue;
            }
        }
    }

    errorChanges() {
        let disabled = this.disabled;
        if (disabled == true) {
            console.log('field disabled');
        } else {
            let errorMSG = this.errorMSG;
            let error1 = null;
            let error2 = null;
            if (errorMSG) {
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
        if (disabled == true) {
            console.log('field disabled');
        } else {
            let value = this.value;
            if (value) {
                this.userInputValue = value;
                this.decimalValue = value;
                let locale = this.locale;
                let formatValue = Intl.NumberFormat(locale).format(value);
                this.formattedValue = formatValue;
                let inputId = this.inputId;
                if (inputId) {
                    let input = document.getElementById(inputId);
                    if (input != null && input != undefined) {
                        input.value = formatValue;
                    }
                }
            } else {
                this.userInputValue = '';
                this.decimalValue = null;
                this.formattedValue = '';
            }
        }
    }
    
    setInputAmount(event) {
        var params = event.getParam('arguments');
        if (params) {
            this.value = params.inputValue;
            this.userInputValue = params.inputValue;
            this.inputId = params.inputId;
            let inputId = this.inputId;
            let userInputValue = this.userInputValue;
            if (inputId) {
                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    if (userInputValue) {
                        input.value = userInputValue;
                    } else {
                        input.value = this.formattedValue;
                    }
                }
            }
        }
    }


}