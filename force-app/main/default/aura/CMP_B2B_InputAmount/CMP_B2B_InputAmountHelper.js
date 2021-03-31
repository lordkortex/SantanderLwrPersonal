({
	setValueToInput: function (component, helper, value) {
        if (!$A.util.isEmpty(value)) {
            let stringValue = value.toString();
            component.set('v.userInputValue', stringValue);
        }
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
    },
    
    changeAmount: function (component, event, helper) {
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
            component.set('v.decimalValue', valueWithDecimal);
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
    }
})