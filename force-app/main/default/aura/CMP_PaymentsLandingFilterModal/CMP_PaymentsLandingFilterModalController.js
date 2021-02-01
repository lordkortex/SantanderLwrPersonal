({
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Initialize CMP_PaymentsLandingFilters component
    History
    <Date>			<Author>			<Description>
	04/06/2020		Shahad Naji   		Initial version
    11/06/2020		Shahad Naji 		Set filters previously selected
    26/06/2020		Shahad Naji			Hide page scroll
    02/06/2020      Bea Hill            Set showToast attribute
    */
    doInit : function(component, event, helper) {
        helper.initNumberFormat(component, event, helper);
        helper.setFilter(component, event, helper);
        var isOpen = component.get('v.showFilterModal');
        if(isOpen){
            document.querySelector(".comm-page-custom-landing-payments").style.overflow = 'hidden';
            helper.handleChangeDates(component, event, helper);

        }
       
        let accountList = component.get('v.accountList');
        if ($A.util.isEmpty(accountList)) {
            component.set('v.showToast', true);
        }
        console.log('current user:', JSON.stringify(component.get('v.currentUser')));

    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to hide download modal (CMP_PaymentsLandingFilterModal)
    History
    <Date>			<Author>			<Description>
    03/06/2020		Shahad Naji   		Initial version
    30/06/2020      Bea Hill            Added functionality that erroneous values are not saved
    */
	closeFilterModal : function(component, event, helper) {
        helper.revertAppliedFilters(component, event, helper);
		helper.closeModal(component, event, helper);
	},
    
    clearAll : function(component, event, helper) {
        helper.clearFilterModal(component, event, helper);
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to apply all filter elements
    History
    <Date>			<Author>			<Description>
    04/06/2020		Shahad Naji   		Initial version
    17/06/2020      Bea Hill            Added noResults attribute control
    */
    applyFilterModal : function(component, event, helper) {
        helper.checkValidDates(component, event, helper);
        helper.validateInput(component, event, helper);
        helper.checkValidAccount(component, event, helper);
        let errorDate = component.get('v.errorDate');
        let errorFromDateFormat = component.get('v.fromDateFormat');
        let errorToDateFormat = component.get('v.toDateFormat');
        let errorAmount= component.get('v.errorAmount');
        let errorAccount= component.get('v.errorMSG');
        if (errorDate != true && errorToDateFormat!= true && errorFromDateFormat != true && errorAmount != true && errorAccount == '') {
            helper.clearSelectedPaymentStatusBox(component, event, helper);
            helper.closeModal(component, event, helper);
            component.set('v.applyIsClicked', true);
        }        
	},
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to set Client reference
    History
    <Date>			<Author>			<Description>
    04/06/2020		Shahad Naji   		Initial version
    03/07/2020      Bea Hill            Only allow input of up to 16 alphanumeric characters
    31/07/2020      Bea Hill            Remove validation so user can search any characters
    */
    setClientReference : function(component, event, helper){        
        var isDisabled = component.get('v.isClientReferenceDisabled');
        if(!isDisabled){
            component.set('v.showClientReferenceMiniLabel', true);
            let clientRef = component.get('v.clientReference');
            if (event.target.value != undefined) {
                var value = event.target.value;
                let regExp = new RegExp('^[0-9a-zA-Z\s]{0,16}$');
                let isInputValid = regExp.test(value);
                if (isInputValid == true) {
                    clientRef = value;
                }
            }
            event.target.value = clientRef;
            component.set('v.clientReference', clientRef);
        }        
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to show Client reference label onfocus event
    History
    <Date>			<Author>			<Description>
	04/06/2020		Shahad Naji   		Initial version
    */
    handleFocusClientReference : function(component, event, helper){
        component.set('v.showClientReferenceMiniLabel', true);  
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to hide Client reference label onblur event
    History
    <Date>			<Author>			<Description>
	04/06/2020		Shahad Naji   		Initial version
    */
    handleBlurClientReference : function(component, event, helper){
        component.set('v.showClientReferenceMiniLabel', false);  
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to set Destination Country (destinationCountryString)
    History
    <Date>			<Author>			<Description>
	04/06/2020		Shahad Naji   		Initial version
    */
    setDestinationCountry : function(component, event, helper){        
        var isDisabled = component.get('v.isDestinationCountryDisabled');
        if(!isDisabled){
            component.set('v.showDestinationMiniLabel', true);
            var value = event.currentTarget.value;
            component.set('v.destinationCountryString', value);
        }        
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to show destination country label onfocus event
    History
    <Date>			<Author>			<Description>
	04/06/2020		Shahad Naji   		Initial version
    */
    handleFocusDestinationCountry : function(component, event, helper){
        component.set('v.showDestinationMiniLabel', true);  
    },
     /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to hide destination country label onblur event
    History
    <Date>			<Author>			<Description>
	04/06/2020		Shahad Naji   		Initial version
    */
    handleBlurDestinationCountry: function(component, event, helper){
        component.set('v.showDestinationMiniLabel', false);  
    },

     /*
	Author:        	Maria Iñigo
    Company:        Deloitte
	Description:    Method to hide destination country label onblur event
    History
    <Date>			<Author>			<Description>
	05/06/2020		Maria Iñigo   		Initial version
    */
    handleSourceInputSearch: function (component, event, helper) {
        helper.activateDropdown(component, helper, event.target.value);
    },

    handleSourceFocusSearch: function (component, event, helper) {
        component.set('v.showSourceAccountMiniLabel', true);
        helper.activateDropdown(component, helper, event.target.value);
    },

    handleSourceBlurSearch: function (component, event, helper) {
        component.set('v.showSourceAccountMiniLabel', false);
        setTimeout($A.getCallback(function () {
            component.set('v.showDropdown', false);
        }), 250);
    },
    handleClearInput : function (component, event, helper) {
        helper.clearInput(component, event, helper);
    },
    handleClickSuggestion : function (component, event, helper) {
        helper.selectedAccount(component, helper, event.getParam('account'));
        component.set('v.showDropdown', false);
        
    },
    handleSelectedAccount : function (component, event, helper) {
        helper.selectedAccount(component, helper, event.getParam('account'));
    },

    handleSourceClickSuggestion: function (component, event, helper) {
        helper.selectedAccount(component, helper, event.getParam('account'));
        component.set('v.showDropdown', false);
    },

    handleDestinationInputSearch: function (component, event, helper) {
        component.set('v.searchedDestinationAccount', event.target.value);
        component.set('v.showDestinationAccountMiniLabel', true);
    },

    handleDestinationFocusSearch: function (component, event, helper) {
        component.set('v.showDestinationAccountMiniLabel', true);
        helper.activateDropdown(component, helper, event.target.value);
    },

    handleDestinationBlurSearch: function (component, event, helper) {
        component.set('v.showDestinationAccountMiniLabel', false);       
    },

    handleDestinationClickSuggestion: function (component, event, helper) {
        helper.selectedAccount(component, helper, event.getParam('account'));
        component.set('v.showDropdown', false);
    },

    handleFocusFromDate: function(component, event, helper){
        component.set('v.dateFromMiniLabel', true);  
    },

    handleBlurFromDate: function(component, event, helper){
        component.set('v.dateFromMiniLabel', false);  
    },

    handleChangeDate: function(component, event, helper){
        helper.checkValidDates(component, event, helper);
    },

    handleFocusToDate: function(component, event, helper){
        component.set('v.dateToMiniLabel', true);  
    },

    handleBlurToDate: function(component, event, helper){
        component.set('v.dateToMiniLabel', false);  
    },
 
    handleInputAmount: function (component, event, helper) {
        let thousandsSeparator = component.get('v.thousandsSeparator');
        let decimalSeparator = component.get('v.decimalSeparator');
        let inputValue = event.currentTarget.value;
        let inputId = event.currentTarget.id;
        let validUserInput = '';
        if (!$A.util.isEmpty(inputValue)) {
            if (!$A.util.isEmpty(inputId)) {
                if(validUserInput!=undefined ){
                    if(inputId == 'fromAmount'){
                        validUserInput=component.get("v.userInputFrom");
                    }
                    if(inputId == 'toAmount'){
                        validUserInput=component.get("v.userInputTo");
                    }
                }

                let validRegExp = new RegExp('^[0-9][0-9' + thousandsSeparator + ']*[' + decimalSeparator + ']?[0-9]{0,2}$');
                let isInputValid = validRegExp.test(inputValue);

                if (isInputValid == true && inputValue.length < 18) {
                    validUserInput = inputValue;
                    if(validUserInput!=undefined ){
                        if(event.currentTarget.id == 'fromAmount'){
                            component.set('v.userInputFrom', validUserInput);
                        }
                        if(event.currentTarget.id == 'toAmount'){
                            component.set('v.userInputTo', validUserInput);
                        }
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

            if(parseFloat(valueWithDecimal)!=undefined && Number.isNaN(parseFloat(valueWithDecimal))==false){
                if(event.currentTarget.id == 'fromAmount'){
                    component.set('v.fromDecimal', parseFloat(valueWithDecimal));
                }
                if(event.currentTarget.id == 'toAmount'){
                    component.set('v.toDecimal', parseFloat(valueWithDecimal));
                }
            }

            if(event.currentTarget.id == 'fromAmount'){
                component.set('v.formattedValueFrom', validUserInput);
            }
            if(event.currentTarget.id == 'toAmount'){
                component.set('v.formattedValueTo', validUserInput);
            }
        }else{
            if(event.currentTarget.id == 'fromAmount'){
                component.set('v.fromDecimal', '');
                component.set('v.formattedValueFrom', '');
                component.set('v.userInputFrom', '');

            }
            if(event.currentTarget.id == 'toAmount'){
                component.set('v.toDecimal', '');
                component.set('v.formattedValueTo', '');
                component.set('v.userInputTo', '');

            }
        }
        
    },

    handleFocusAmount: function (component, event, helper) {
        let value = '';  
        let inputId = event.currentTarget.id;
        if (!$A.util.isEmpty(inputId)) {
            if(inputId == 'fromAmount'){
                if(component.get("v.userInputFrom") != undefined && component.get("v.userInputFrom") != null && component.get("v.userInputFrom") != ''){
                    value=component.get("v.userInputFrom");
                }
                component.set('v.showFromMiniLabel', true);
            }
            if(inputId == 'toAmount'){
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
        let inputId = event.currentTarget.id;

        if(inputId == 'fromAmount') {
            component.set('v.showFromMiniLabel', false);    
            if(component.get("v.formattedValueFrom")!='' && component.get("v.formattedValueFrom")!=null){
                formattedValue = component.get('v.formattedValueFrom');
            }
        }
         
        if(inputId == 'toAmount') {
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
        let inputId = '';
        let value = '';
        inputId = event.currentTarget.id;
        value = event.currentTarget.value; 

        if(inputId == 'fromAmount'){
            value=component.get("v.fromDecimal");
        }
        if(inputId == 'toAmount'){ 
            value=component.get("v.toDecimal");
        }

        if (!$A.util.isEmpty(value)) {   
                     
            if (!$A.util.isEmpty(inputId)) {
                let locale = component.get('v.locale');
                var formatValue = '';
                formatValue = Intl.NumberFormat(locale).format(value);
                if(inputId == 'fromAmount'){
                    component.set('v.formattedValueFrom', formatValue);
                }
                if(inputId == 'toAmount'){
                    component.set('v.formattedValueTo', formatValue);
                }


                let input = document.getElementById(inputId);
                if (input != null && input != undefined) {
                    input.value = formatValue;
                }

            }
        } else {
            if(inputId == 'fromAmount'){
                component.set('v.fromDecimal', '');
                component.set('v.formattedValueFrom', '');
                component.set('v.userInputFrom', '');
            }
            if(inputId == 'toAmount'){
                component.set('v.toDecimal', '');
                component.set('v.formattedValueTo', '');
                component.set('v.userInputTo', '');
            }
        }       
        helper.validateInput(component, event, helper);
    },
    
    handleClearClientReference: function(component, event, helper) {
        helper.clearClientReference(component, event, helper);       
    },
    handleClearAmountFrom: function(component, event, helper) {
        helper.clearAmountFrom(component, event, helper);          
    },
    handleClearAmountTo: function(component, event, helper) {
        helper.clearAmountTo(component, event, helper);          
    },
    handleClearDateFrom: function(component, event, helper) {
        helper.clearDateFrom(component, event, helper);           
    },
    handleClearDateTo: function(component, event, helper) {
        helper.clearDateTo(component, event, helper);       
    },

    handleChangeDates : function(component, event, helper) {
        helper.handleChangeDates(component, event, helper);
    },

    handleChangeDatesInternal : function(component, event, helper) {
        helper.handleChangeDatesInternal(component, event, helper); 
    },
})