({
    initComponent: function (component, helper) {
        var steps = component.get('v.steps');
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 2 && lastModifiedStep == 2) {
            component.set('v.value', null);
            component.set('v.formattedValue', '');
            component.set('v.decimalValue', null);
            component.set('v.isModified', true);
            let inputId = component.get('v.inputId');
            if (!$A.util.isEmpty(inputId)) {
                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    input.value = '';
                }
            }
        }
        var numberFormat = component.get('v.numberFormat');
        var decimalSeparator = '.';
        var thousandsSeparator = ',';
        var locale = 'en';
        if (numberFormat == '###.###.###,##') {
            decimalSeparator = ',';
            thousandsSeparator = '.';
            locale ='de-DE';
        }
        component.set('v.decimalSeparator', decimalSeparator);
        component.set('v.thousandsSeparator', thousandsSeparator);
        component.set('v.locale', locale);
    },

    handleChangeAmount: function (component) {
        let valueWithoutThousand = '';
        let valueWithDecimal = '';
        let locale = component.get('v.locale');
        let validUserInput = component.get('v.userInputValue');
        let thousandsSeparator = component.get('v.thousandsSeparator');
        let decimalSeparator = component.get('v.decimalSeparator');
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
        if (!$A.util.isEmpty(valueWithDecimal)) {
            valueWithDecimal = parseFloat(valueWithDecimal);
            component.set('v.decimalValue', parseFloat(valueWithDecimal));
            let formatValue = Intl.NumberFormat(locale).format(valueWithDecimal);
            component.set('v.formattedValue', formatValue);
            component.set('v.value', valueWithDecimal);
        } else {
            component.set('v.decimalValue', null);
            component.set('v.formattedValue', '');
            component.set('v.value', null);
        }
        let inputId = component.get('v.inputId');
        let change = component.getEvent('changeInputAmount');
        change.setParams({
            inputId: inputId,
            amount: valueWithDecimal
        });
        change.fire();
    },

    handleInputAmount: function (component, event) {
        let thousandsSeparator = component.get('v.thousandsSeparator');
        let decimalSeparator = component.get('v.decimalSeparator');
        let inputValue = event.target.value;
        let validUserInput = component.get('v.userInputValue');
        if (!$A.util.isEmpty(inputValue)) {
            component.set('v.errorMSG', '');
            let validRegExp = new RegExp('^[0-9][0-9' + thousandsSeparator + ']*[' + decimalSeparator + ']?[0-9]{0,2}$');
            let isInputValid = validRegExp.test(inputValue);
            if (isInputValid == true && inputValue.length < 18) {
                validUserInput = inputValue;
                component.set('v.userInputValue', validUserInput);
            }
            let inputId = component.get('v.inputId');
            if (!$A.util.isEmpty(inputId)) {
                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    input.value = validUserInput;
                    let accountData = component.get('v.accountData');
                    if (!$A.util.isEmpty(accountData.cib)) {
                        if (accountData.cib == true) {
                            if (inputId == 'sourceAmountInput') {
                                component.set('v.disableTo', true);
                            } else if (inputId == 'recipientAmountInput') {
                                component.set('v.disableFrom', true);
                            }
                        }
                    }
                }
            }
        } else {
            component.set('v.value', null);
            component.set('v.formattedValue', '');
            component.set('v.userInputValue', '');
            component.set('v.decimalValue', null);
            component.set('v.disableTo', false);
            component.set('v.disableFrom', false);
        }
    },

    handleFocusAmount: function (component) {
        component.set('v.showMiniLabel', true);
        let userInputValue = component.get('v.userInputValue');
        let value = component.get('v.value');
        let inputId = component.get('v.inputId');
        if (!$A.util.isEmpty(inputId)) {
            let input = document.getElementById(inputId);
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
    },

    handleBlurAmount: function (component) {
        component.set('v.showMiniLabel', false);
        let formattedValue = component.get('v.formattedValue');
        if ($A.util.isEmpty(formattedValue)) {
            formattedValue = '';
        }
        let inputId = component.get('v.inputId');
        if (!$A.util.isEmpty(inputId)) {
            let input = document.getElementById(inputId);
            if (input != null && input != undefined) {
                input.value = formattedValue;
            }
        }
    },

    errorChanges: function (component) {
        let disabled = component.get('v.disabled');
        if (disabled == true) {
            console.log('field disabled');
        } else {
            let errorMSG = component.get('v.errorMSG');
            let error1 = null;
            let error2 = null;
            if (!$A.util.isEmpty(errorMSG)) {
                if (errorMSG.includes('-')) {
                    error1 = errorMSG.substring(0, errorMSG.indexOf('-'));
                    error2 = errorMSG.substring(errorMSG.indexOf('-') + 1, errorMSG.length);
                } else {
                    error1 = errorMSG;
                }
            }
            component.set('v.errorMSG_1', error1);
            component.set('v.errorMSG_2', error2);
        }
    },

    valueChanges: function (component) {
        let disabled = component.get('v.disabled');
        if (disabled == true) {
            console.log('field disabled');
        } else {
            let value = component.get('v.value');
            if (!$A.util.isEmpty(value)) {
                component.set('v.userInputValue', value);
                component.set('v.decimalValue', value);
                let locale = component.get('v.locale');
                let formatValue = Intl.NumberFormat(locale).format(value);
                component.set('v.formattedValue', formatValue);
                let inputId = component.get('v.inputId');
                if (!$A.util.isEmpty(inputId)) {
                    let input = document.getElementById(inputId);
                    if (input != null && input != undefined) {
                        input.value = formatValue;
                    }
                }
            } else {
                component.set('v.userInputValue', '');
                component.set('v.decimalValue', null);
                component.set('v.formattedValue', '');
            }
        }
    },

    /*
    Author:         Shahad Naji
    Company:        Deloitte
    Description:    Function to be invoked by 'setInputAmount' method
    History
    <Date>          <Author>            <Description>
    15/10/2020      Shahad Naji         Initial version
    */
    setInputAmount: function (component, event, helper) {
        var params = event.getParam('arguments');
        if (params) {
            component.set('v.value', params.inputValue);
            component.set('v.userInputValue', params.inputValue);
            component.set('v.inputId', params.inputId);
            let inputId = component.get('v.inputId');
            let userInputValue = component.get('v.userInputValue');
            if (!$A.util.isEmpty(inputId)) {
                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    if (!$A.util.isEmpty(userInputValue)) {
                        input.value = userInputValue;
                    } else {
                        input.value = component.get('v.formattedValue');
                    }
                }
            }
        }
    }
})