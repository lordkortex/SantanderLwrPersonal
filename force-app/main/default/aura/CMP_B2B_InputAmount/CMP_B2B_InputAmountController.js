({
    initComponent: function (component) {
        var steps = component.get('v.steps');
        var focusStep = steps.focusStep;
        var lastModifiedStep = steps.lastModifiedStep;
        if (focusStep == 2 && lastModifiedStep == 2) {
            component.set('v.value', '');
            component.set('v.formattedValue', '');
            component.set('v.decimalValue', '');
            component.set('v.userInputValue', '');
            component.set('v.isModified', true);
            let inputId = component.get('v.inputId');
            if (!$A.util.isEmpty(inputId)) {
                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    input.value = '';
                }
            }
        } else {
            /*const numberWithSeparators = 1000000.1;
            let locale = $A.get('$Locale.userLocaleLang');
            if ($A.util.isEmpty(locale)) {
                locale = 'en';
            }
            let decimalSeparator = Intl.NumberFormat(locale).formatToParts(numberWithSeparators).find(part => part.type === 'decimal').value;
            if ($A.util.isEmpty(decimalSeparator)) {
                decimalSeparator = '.';
            }
            let thousandsSeparator = Intl.NumberFormat(locale).formatToParts(numberWithSeparators).find(part => part.type === 'group').value;
            if ($A.util.isEmpty(decimalSeparator)) {
                thousandsSeparator = ',';
            }
            component.set('v.locale', locale);
            component.set('v.decimalSeparator', decimalSeparator);
            component.set('v.thousandsSeparator', thousandsSeparator);
            let value = component.get('v.value');
            if (!$A.util.isEmpty(value)){
                let formatValue = Intl.NumberFormat(locale).format(value);
                component.set('v.formattedValue', formatValue);

            }*/

            var numberFormat = component.get("v.numberFormat");
            /*let locale = $A.get('$Locale.userLocaleLang');
            if ($A.util.isEmpty(locale)) {
                locale = 'en';
            }
            let decimalSeparator = Intl.NumberFormat(locale).formatToParts(numberWithSeparators).find(part => part.type === 'decimal').value;
            if ($A.util.isEmpty(decimalSeparator)) {
                decimalSeparator = '.';
            }
            let thousandsSeparator = Intl.NumberFormat(locale).formatToParts(numberWithSeparators).find(part => part.type === 'group').value;
            if ($A.util.isEmpty(decimalSeparator)) {
                thousandsSeparator = ',';
            }*/
            var decimalSeparator = '.';
            var thousandsSeparator = ',';
            if(numberFormat == '###.###.###,##'){
                decimalSeparator = ',';
                thousandsSeparator = '.';
                component.set('v.locale', 'de-DE');
            }else{
                decimalSeparator = '.';
                thousandsSeparator = ',';
                component.set('v.locale', 'en');
            }

            component.set('v.decimalSeparator', decimalSeparator);
            component.set('v.thousandsSeparator', thousandsSeparator);   
        }     
    },

    handleChangeAmount: function (component) {
        console.log("ENTRO");
        
        let decimalValue = component.get('v.decimalValue');
        component.set('v.value', component.get('v.formattedValue'));
        
        let inputId = component.get('v.inputId')
        let change = component.getEvent('changeInputAmount');
        change.setParams({
            inputId: inputId,
            amount: decimalValue
        });
        change.fire();
    },

    handleInputAmount: function (component, event) {
        console.log("input");

        let locale = component.get('v.locale');
        let thousandsSeparator = component.get('v.thousandsSeparator');
        let decimalSeparator = component.get('v.decimalSeparator');
        let inputValue = event.target.value;
        let validUserInput = component.get('v.userInputValue');
        if (!$A.util.isEmpty(inputValue)) {
            component.set('v.errorMSG', '');
            component.set('v.errorMSG_1', '');
            component.set('v.errorMSG_2', '');
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
                console.log('input.value set to: ', input.value);
                //NEW BEA
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
            let thousandsRegExp = new RegExp('['+thousandsSeparator+']','g');
            let valueWithoutThousand = validUserInput.replace(thousandsRegExp, '');
            let valueWithDecimal = valueWithoutThousand.replace(decimalSeparator, '.');
            component.set('v.decimalValue', parseFloat(valueWithDecimal));
            let formatValue = Intl.NumberFormat(locale).format(valueWithDecimal);
            component.set('v.formattedValue', formatValue);

        } else {
            component.set('v.errorMSG', '');
            component.set('v.value', '');
            component.set('v.formattedValue', '');
            component.set('v.userInputValue', '');
            component.set('v.decimalValue', '');
            component.set('v.disableTo', false);
            component.set('v.disableFrom', false);
        }
    
    },

    handleFocusAmount: function (component) {
        console.log("focus");

        component.set('v.showMiniLabel', true);
        let userInputValue = component.get('v.userInputValue');
        console.log('userInputValue '+userInputValue);
        let value = component.get('v.value');  
        let inputId = component.get('v.inputId');
        if (!$A.util.isEmpty(inputId)) {
            let input = document.getElementById(inputId);
            if (input != null && input != undefined) {
                if (!$A.util.isEmpty(userInputValue)) {
                    input.value = userInputValue;
                } else {
                    input.value = component.get("v.formattedValue");
                }                
            }
        }
    },

    handleBlurAmount: function (component) {
        console.log("blur");

        component.set('v.showMiniLabel', false);
        let formattedValue = component.get('v.formattedValue');
        if ($A.util.isEmpty(formattedValue)) {
            formattedValue="";
        }
        let inputId = component.get('v.inputId');
        if (!$A.util.isEmpty(inputId)) {
            let input = document.getElementById(inputId);
            if (input != null && input != undefined) {
                input.value = formattedValue;
            }
        }
    },

    valueChanges: function (component) {
        console.log("changeVAU");
        console.log(component.get('v.value'));
        var errorMSG = component.get('v.errorMSG'); 

        let disabled = component.get('v.disabled');
        if(disabled == true) {
            console.log('field disabled');
        } else {
            if (errorMSG.includes('-')) {
                component.set('v.errorMSG_1', errorMSG.substring(0, errorMSG.indexOf('-')));
                component.set('v.errorMSG_2', errorMSG.substring(errorMSG.indexOf('-')+1, errorMSG.length));
            } else {
                component.set('v.errorMSG_1', errorMSG);
                component.set('v.errorMSG_2', '');
            }
            let inputId = component.get('v.inputId');
            let value = component.get('v.value');
            component.set('v.decimalValue', value);
            component.set('v.userInputValue', value);
            if (!$A.util.isEmpty(value)) {            
                let locale = component.get('v.locale');
                let formatValue = Intl.NumberFormat(locale).format(value);
                component.set('v.formattedValue', formatValue);
                if (!$A.util.isEmpty(inputId)) {
                    let input = document.getElementById(inputId);
                    if (input != null && input != undefined) {
                        input.value = formatValue;
                    }
                }
            } else {
                component.set('v.formattedValue', value);
            }       
        }

        
    },
    
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Function to be invoked by "setInputAmount" method
    History
    <Date>			<Author>			<Description>
    15/10/2020		Shahad Naji   		Initial version
    */
    setInputAmount : function (component, event, helper) {        
        var params = event.getParam('arguments');
        if(params){
            
            component.set('v.value',  params.inputValue);              
            component.set('v.userInputValue',  params.inputValue);
            component.set('v.inputId', params.inputId);
            let inputId = component.get('v.inputId');
            let userInputValue = component.get('v.userInputValue');
            if (!$A.util.isEmpty(inputId)) {
                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    if (!$A.util.isEmpty(userInputValue)) {
                        input.value = userInputValue;
                    } else {
                        input.value = component.get("v.formattedValue");
                    }                
                }
            }
        }
    }
})