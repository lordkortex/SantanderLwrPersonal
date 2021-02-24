({
    init: function (component, event, helper) {
        var numberFormat = component.get("v.numberFormat");
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
    },

    handleDropdownButton: function (component, event, helper) {
        helper.showDropdown(component, helper);
    },

    handlerApplyFilters: function (component, event, helper) {
        if(component.get("v.errorAmounts")==false){
            helper.calculateAmountInformed(component, helper);
            helper.hideDropdown(component, helper);
            helper.callEventSave(component, helper, 'apply');
        }
    },

    handlerClearFilters: function (component, event, helper) {
        component.set('v.minimumBalance', '');
        component.set('v.maximumBalance', '');
        component.set('v.formattedValueFrom', '');
        component.set('v.formattedValueTo', '');
        component.set('v.userInputFrom', '');
        component.set('v.userInputTo', '');
        component.set('v.errorAmounts', false);

        helper.calculateAmountInformed(component, helper);
        helper.hideDropdown(component, helper);
        helper.callEventSave(component, helper, 'clear');
    },


    

    handleInputAmount: function (component, event, helper) {
        let locale = component.get('v.locale');
        let thousandsSeparator = component.get('v.thousandsSeparator');
        let decimalSeparator = component.get('v.decimalSeparator');
        let inputValue = event.target.value;
        let inputId = event.target.id;
        let validUserInput = '';
        if (!$A.util.isEmpty(inputValue)) {
            if (!$A.util.isEmpty(inputId)) {
                if(event.target.id == 'from' && validUserInput!=undefined ){
                    validUserInput=component.get("v.userInputFrom");
                }else{
                    validUserInput=component.get("v.userInputTo");
                }

                let validRegExp = new RegExp('^[0-9][0-9' + thousandsSeparator + ']*[' + decimalSeparator + ']?[0-9]{0,2}$');
                let isInputValid = validRegExp.test(inputValue);

                if (isInputValid == true && inputValue.length < 18) {
                    validUserInput = inputValue;
                    if(event.target.id == 'from' && validUserInput!=undefined ){
                        component.set('v.userInputFrom', validUserInput);
                    }else{
                        component.set('v.userInputTo', validUserInput);
                    }
        
                }

                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    input.value = validUserInput;
                }
            }  
            
            
            let thousandsRegExp = new RegExp('['+thousandsSeparator+']','g');
            let valueWithoutThousand = validUserInput.replace(thousandsRegExp, '');
            let valueWithDecimal = valueWithoutThousand.replace(decimalSeparator, '.');

            if(event.target.id == 'from' && parseFloat(valueWithDecimal)!=undefined && Number.isNaN(parseFloat(valueWithDecimal))==false){
                component.set('v.minimumBalance', parseFloat(valueWithDecimal));
            }else{
                component.set('v.maximumBalance', parseFloat(valueWithDecimal));
            }
            

            if(event.target.id == 'from'){
                component.set('v.formattedValueFrom', validUserInput);
            }else{
                component.set('v.formattedValueTo', validUserInput);
            }
        }else{
            if(event.target.id == 'from'){
                component.set('v.minimumBalance', '');
                component.set('v.formattedValueFrom', '');
                component.set('v.userInputFrom', '');

            }else{
                component.set('v.maximumBalance', '');
                component.set('v.formattedValueTo', '');
                component.set('v.userInputTo', '');

            }
        }
        
    },

    handleFocusAmount: function (component, event, helper) {
        let value = '';  
        let inputId = event.target.id;
        if (!$A.util.isEmpty(inputId)) {
            if(inputId == 'from'){
                if(component.get("v.userInputFrom") != undefined && component.get("v.userInputFrom") != null && component.get("v.userInputFrom") != ''){
                    value=component.get("v.userInputFrom");
                }
                component.set('v.showFromMiniLabel', true);
            }else{
                if(component.get("v.userInputTo") != undefined && component.get("v.userInputTo") != null && component.get("v.userInputTo") != ''){
                    value=component.get("v.userInputTo");
                }
                component.set('v.showToMiniLabel', true);            
            }
            let input = document.getElementById(inputId);
            if (input != null && input != undefined) {
                input.value = value
            }
        }
    },

    handleBlurAmount: function (component, event, helper) {
        let formattedValue = '';
        let inputId = event.target.id;
        console.log(inputId);

        if(inputId == 'from') {
            component.set('v.showFromMiniLabel', false);    
            if(component.get("v.formattedValueFrom")!='' && component.get("v.formattedValueFrom")!=null){
                formattedValue = component.get('v.formattedValueFrom');
            }
        }
         
        if(inputId == 'to') {
            component.set('v.showToMiniLabel', false); 
            if(component.get("v.formattedValueTo")!='' && component.get("v.formattedValueTo")!=null){
                formattedValue = component.get('v.formattedValueTo');
            }
        } 

        if (!$A.util.isEmpty(inputId)) {
            let input = document.getElementById(inputId);
            if (input != null && input != undefined) {
                input.value = formattedValue;
            }
        }
    },

    valueChanges: function (component, event, helper) {
        console.log("chage");
        let inputId = '';
        let value = '';
        inputId = event.target.id;
        value = event.target.value; 
        console.log(inputId);
        console.log(value);
        if(inputId == 'from'){
            value=component.get("v.minimumBalance");
        }else{
            value=component.get("v.maximumBalance");
        }
        console.log(value);

        if (!$A.util.isEmpty(value)) {   
                     
            if (!$A.util.isEmpty(inputId)) {
               /* if(inputId == 'from'){
                    component.set('v.minimumBalance', value);
                }else{
                    component.set('v.maximumBalance', value);
                }*/
               
                let locale = component.get('v.locale');
                var formatValue = '';
                formatValue = Intl.NumberFormat(locale).format(value);
                if(inputId == 'from'){
                    component.set('v.formattedValueFrom', formatValue);
                }else{
                    component.set('v.formattedValueTo', formatValue);
                }


                let input = document.getElementById(inputId);
                console.log(formatValue);
                console.log(component.get("v.formattedValueFrom"));
                if (input != null && input != undefined) {
                    input.value = formatValue;
                }

            }
        } else {
            if(inputId == 'from'){
                component.set('v.minimumBalance', '');
                component.set('v.formattedValueFrom', '');
                component.set('v.userInputFrom', '');
            }else{
                component.set('v.maximumBalance', '');
                component.set('v.formattedValueTo', '');
                component.set('v.userInputTo', '');
            }
        }
        helper.validateInput(component, event, helper);       
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Clears balances input to reset filter options
    History
    <Date>			<Author>			<Description>
	15/06/2020		Shahad Naji   		Initial version
    */
    handlerClearBalances : function (component, event, helper){
        var clear = component.get('v.clearBalances');
        if(clear){
            helper.clearBalances(component, event, helper);
        }
    }
   
})