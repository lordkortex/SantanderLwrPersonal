({
    activateDropdown: function (component, helper, inputLookupValue) {
        let showDropdown = false;
        let account = component.get('v.account');
        let disabled = component.get('v.disabled');
        if (disabled == false && $A.util.isEmpty(account)) {
            if (!$A.util.isEmpty(inputLookupValue)) {
                if (inputLookupValue.length >= 4) {
                    helper.searchAccounts(component, helper, inputLookupValue);
                    showDropdown = true;
                }
            }
            component.set('v.searchedSourceAccount', inputLookupValue);
        }
        component.set('v.showDropdown', showDropdown);
    },

    searchAccounts: function (component, helper, searchedString) {
        let accountList = component.get('v.accountList');
        let accountSuggestions = [];
        
        if (!$A.util.isEmpty(accountList) && !$A.util.isEmpty(searchedString)) {
            searchedString = searchedString.toLowerCase();
            for (let i = 0; i < accountList.length && accountSuggestions.length < 5; i++) {
                let coincidencia = false;
                let account = accountList[i];
                let displayNumber = account.displayNumber;
                let alias = account.alias;
                if (!$A.util.isEmpty(displayNumber)) {
                    displayNumber = displayNumber.toLowerCase();
                    if (displayNumber.includes(searchedString)) {
                        coincidencia = true;
                    }
                }
                if (!$A.util.isEmpty(alias)) {
                    alias = alias.toLowerCase();
                    if (alias.includes(searchedString)) {
                        coincidencia = true;
                    }
                }
                if (coincidencia == true) {
                    accountSuggestions.push(account);
                }
            }
        }
        component.set('v.accountSuggestions', accountSuggestions);
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    User selects an account from suggestions dropdown
    History
    <Date>			<Author>			<Description>
    15/06/2020		Shahad Naji   		Initial version
    */
    selectedAccount: function (component, helper, account) {
        if (!$A.util.isEmpty(account)) {
            component.set('v.account', account);
        }
    },
    
    clearInput : function(component, event, helper) {
        component.set('v.showDropdown', false);
        component.set('v.account', {});
        component.set('v.accountSuggestions', []);
        component.set('v.searchedSourceAccount', '');
        component.set('v.errorMSG', '');
        component.set('v.isModified', true);
        component.set('v.errorDate', false);
        component.set('v.fromDateFormat', false); 
        component.set('v.toDateFormat', false); 
        component.set('v.errorAmount', false);
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to clear all filter elements
    History
    <Date>			<Author>			<Description>
	04/06/2020		Shahad Naji   		Initial version
    */
    clearFilterModal : function(component, event, helper) {           
        var emptyLst = [];
        //Accounts
        component.set('v.searchedSourceAccount', '');
        component.set('v.searchedDestinationAccount', '');
        component.set('v.account', {});
        helper.clearInput(component, event, helper);
        
        //Amount       
        helper.clearAmountFrom(component, event, helper);          
        helper.clearAmountTo(component, event, helper);          

        //Currency
        component.set('v.clearCurrencyDropdown', true);
        
        //Payment status
        component.set('v.clearStatusDropdown', true);
        component.set('v.selectedPaymentStatusBox', '');

        //Payment method
        component.set('v.clearMethodDropdown', true);

        //Client reference
        helper.clearClientReference(component, event, helper);  

        //Dates
        helper.clearDateFrom(component, event, helper); 
        helper.clearDateTo(component, event, helper); 

        //Country
        component.set('v.clearCountryDropdown', true);
    },

    initNumberFormat: function (component, event, helper) {
        var currentUser = component.get("v.currentUser");
        var numberFormat = currentUser.numberFormat;
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

    validateInput: function (component, event, helper) {

        if(component.get("v.fromDecimal")!='' && component.get("v.fromDecimal")!=null && component.get("v.toDecimal")!='' && component.get("v.toDecimal")!=null){
            if(component.get("v.fromDecimal")>component.get("v.toDecimal")){                
                component.set("v.errorAmount",true);                
            }else{
                component.set("v.errorAmount",false);
            }
        }else{
            component.set("v.errorAmount",false);

        }
    },
   
    //$Label.c.PAY_Status_PendingOne
    //$Label.c.PAY_Status_PendingTwo
    //$Label.c.PAY_Status_InReviewOne
    //$Label.c.PAY_Status_ScheduledOne
    //$Label.c.PAY_Status_CompletedOne
    //$Label.c.PAY_Status_RejectedOne
    setFilter : function (component, event, helper) {
        var selectedBox = component.get('v.selectedPaymentStatusBox');
        var selectedStatus = [];
        var statusList = component.get('v.statusDropdownList');
        if(!$A.util.isEmpty(selectedBox)){
            if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_PendingOne")){
                var aux = '';
                if(!$A.util.isEmpty(selectedBox.statusName)){
                    if(selectedBox.statusName.includes('true_')){
                        aux = selectedBox.statusName.split('_');
                    }
                    
                    var obj = statusList.find(obj => obj.value == 'chk_'+aux[1]);
                    selectedStatus.push(obj.value);
                    component.set('v.selectedStatuses',selectedStatus); 
                }

            }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_PendingTwo")){
                var aux = '';
                if(!$A.util.isEmpty(selectedBox.statusName)){ 
                     if(selectedBox.statusName.includes('false_')){
                        aux = selectedBox.statusName.split('_');
                    }
                    var obj = statusList.find(obj => obj.value == 'chk_'+aux[1]);
                    selectedStatus.push(obj.value);
                    component.set('v.selectedStatuses',selectedStatus);
                }
             

            }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_InReviewOne")){
          
                var obj = statusList.find(obj => obj.value == 'chk_'+selectedBox.statusName);
                selectedStatus.push(obj.value);
                component.set('v.selectedStatuses',selectedStatus);


            }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_ScheduledOne")){
      
                var obj = statusList.find(obj => obj.value == 'chk_'+selectedBox.statusName);
                selectedStatus.push(obj.value);
                component.set('v.selectedStatuses',selectedStatus);

                var d = [];
                // Curent date
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth()+1;
                currentMonth = ("0" + currentMonth).slice(-2);

                var currentDay = currentDate.getDate();
                currentDay = ("0" + currentDay).slice(-2);

                var iToday = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
                d.push(iToday);
                var toDate = new Date();
                toDate.setDate(toDate.getDate() + 7);

                var toDay = toDate.getDate();
                toDay = ("0" + toDay).slice(-2);

                var toMonth = toDate.getMonth()+1;
                toMonth = ("0" + toMonth).slice(-2);

                var nextWeek = toDate.getFullYear() + "-" + toMonth + "-" + toDate.getDate();	
                d.push(nextWeek);
              	
                component.set('v.dates', d);		

            }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_CompletedOne")){
              
                var obj = statusList.find(obj => obj.value == 'chk_'+selectedBox.statusName);
                selectedStatus.push(obj.value);
                component.set('v.selectedStatuses',selectedStatus);

                var d = [];
                // Curent date
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth()+1;
                currentMonth = ("0" + currentMonth).slice(-2);

                var currentDay = currentDate.getDate();
                currentDay = ("0" + currentDay).slice(-2);

                var iToday = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
                
                var toDate = new Date();
                toDate.setDate(toDate.getDate() - 7);

                var toDay = toDate.getDate();
                toDay = ("0" + toDay).slice(-2);

                var toMonth = toDate.getMonth()+1;
                toMonth = ("0" + toMonth).slice(-2);

                var nextWeek = toDate.getFullYear() + "-" + toMonth + "-" + toDay;	
                d.push(nextWeek);
              	d.push(iToday);
                component.set('v.dates', d);


            }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_RejectedOne")){
              
                var obj = statusList.find(obj => obj.value == 'chk_'+selectedBox.statusName);
                selectedStatus.push(obj.value);
                component.set('v.selectedStatuses',selectedStatus);
                var d = [];
                // Curent date
                var currentDate = new Date();
                var currentMonth = currentDate.getMonth()+1;
                currentMonth = ("0" + currentMonth).slice(-2);

                var currentDay = currentDate.getDate();
                currentDay = ("0" + currentDay).slice(-2);

                var iToday = currentDate.getFullYear() + "-" + currentMonth + "-" + currentDay;
                
                var toDate = new Date();
                toDate.setDate(toDate.getDate() - 7);

                var toDay = toDate.getDate();
                toDay = ("0" + toDay).slice(-2);

                var toMonth = toDate.getMonth()+1;
                toMonth = ("0" + toMonth).slice(-2);

                var nextWeek = toDate.getFullYear() + "-" + toMonth + "-" + toDay;	
                d.push(nextWeek);
                d.push(iToday);
                component.set('v.dates', d);

            }
            component.find('statusDropdownModal').setSelectedValues(component.get('v.selectedStatuses'));
        }else{
            var selectedCurrencies = component.get('v.selectedCurrencies');
            if(!$A.util.isEmpty(selectedCurrencies)){
                component.find('currencyDropdownModal').setSelectedValues(component.get('v.selectedCurrencies'));
            }
            var selectedStatuses = component.get('v.selectedStatuses');
             if(!$A.util.isEmpty(selectedStatuses)){
                component.find('statusDropdownModal').setSelectedValues(component.get('v.selectedStatuses'));
            }
            
            var selectedCountry = component.get('v.selectedCountry');
            if(!$A.util.isEmpty(selectedCountry)){                
                var items = [];
                items.push(selectedCountry);
                component.find('countryDropdownModal').setSelectedValues(items);
            } 
            var selectedMethod = component.get('v.selectedMethod');
            if(!$A.util.isEmpty(selectedMethod)){                
                var items = [];
                items.push(selectedMethod);
                component.find('methodDropdownModal').setSelectedValues(items);
            } 
            var fromDecimal = component.get('v.fromDecimal');
            if(!$A.util.isEmpty(fromDecimal)){
                helper.setValue(component, event, helper, fromDecimal, 'fromAmount');
            }
            var toDecimal = component.get('v.toDecimal');
            if(!$A.util.isEmpty(toDecimal)){
                helper.setValue(component, event, helper, toDecimal, 'toAmount');
            }


        }
        helper.setAppliedFilters(component, event, helper);
        
    },
/*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Store the applied filters before user makes changes in case the user decides to close the modal without applying changes. 
    History
    <Date>			<Author>			<Description>
	03/07/2020      Bea Hill            Initial version
    */

    setAppliedFilters: function(component, event, helper){
        var sourceAccount = component.get('v.account');
        if (!$A.util.isEmpty(sourceAccount)) {
            component.set('v.appliedSourceAccount', component.get('v.account'));
        } else {
            component.set('v.appliedSourceAccount', {});
        }
        component.set('v.appliedFormattedValueFrom', component.get('v.formattedValueFrom'));
        component.set('v.appliedFormattedValueTo', component.get('v.formattedValueTo'));
        component.set('v.appliedFromDecimal', component.get('v.fromDecimal'));
        component.set('v.appliedToDecimal', component.get('v.toDecimal'));
        component.set('v.appliedUserInputFrom', component.get('v.userInputFrom'));
        component.set('v.appliedUserInputTo', component.get('v.userInputTo'));
        component.set('v.appliedSelectedCurrencies', component.get('v.selectedCurrencies'));
        component.set('v.appliedSelectedStatuses', component.get('v.selectedStatuses'));        
        component.set('v.appliedSelectedMethod', component.get('v.selectedMethod'));
        component.set('v.appliedClientReference', component.get('v.clientReference'));
        component.set('v.appliedSelectedCountry', component.get('v.selectedCountry'));

        component.set('v.appliedDates', component.get('v.dates'));
    },

    setValue : function(component, event, helper, value, inputId){
        
        if (!$A.util.isEmpty(value)) {   
                     
            if (!$A.util.isEmpty(inputId)) {            
               
                let locale = component.get('v.locale');
                var formatValue = '';
                formatValue = Intl.NumberFormat(locale).format(value);
                if(inputId == 'fromAmount'){
                    component.set('v.formattedValueFrom', formatValue);
                    component.set('v.userInputFrom', formatValue);
                }
                if(inputId == 'toAmount'){
                    component.set('v.formattedValueTo', formatValue);
                    component.set('v.userInputTo', formatValue);
                }
            }
        }
        // helper.validateInput(component, event, helper);
    },
     clearSelectedPaymentStatusBox : function(component, event, helper){
        component.set('v.selectedPaymentStatusBox', '');
        
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Close modal and show page scroll again
    History
    <Date>			<Author>			<Description>
	26/06/2020		Shahad Naji   		Initial version
    */
    closeModal : function (component, event, helper){
        component.set('v.showFilterModal', false);
        document.querySelector(".comm-page-custom-landing-payments").style.overflow = 'auto';        
    },
    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Revert unapplied filter values to the values that have been applied.
    History
    <Date>			<Author>			<Description>
	03/07/2020		Bea Hill       		Initial version
    */
    revertAppliedFilters: function (component, event, helper){
        component.set('v.searchedSourceAccount', '');
        component.set('v.account', component.get('v.appliedSourceAccount'));
        component.set('v.formattedValueFrom', component.get('v.appliedFormattedValueFrom'));
        component.set('v.formattedValueTo', component.get('v.appliedFormattedValueTo'));    
        component.set('v.fromDecimal', component.get('v.appliedFromDecimal'));
        component.set('v.toDecimal', component.get('v.appliedToDecimal'));
        component.set('v.userInputFrom', component.get('v.appliedUserInputFrom'));
        component.set('v.userInputTo', component.get('v.appliedUserInputTo'));
        component.set('v.selectedCurrencies', component.get('v.appliedSelectedCurrencies'));
        component.set('v.selectedStatuses', component.get('v.appliedSelectedStatuses'));
        component.set('v.selectedMethod', component.get('v.appliedSelectedMethod'));
        component.set('v.clientReference', component.get('v.appliedClientReference'));
        component.set('v.selectedCountry', component.get('v.appliedSelectedCountry'));

        component.set('v.dates', component.get('v.appliedDates'));
    },


    checkValidDates: function(component, event, helper){
        var from = component.get('v.dates[0]');
        var to = component.get('v.dates[1]');
        if(!$A.util.isEmpty(from) && !$A.util.isEmpty(to)){
            if(from > to){
                component.set('v.errorDate', true);
            }
            if(from <= to){
                component.set('v.errorDate', false);
            }
        }else{
            component.set('v.errorDate', false);
        }   
    },

    clearClientReference: function(component, event, helper) {
        component.set('v.clientReference', '');        
    },
    clearAmountFrom: function(component, event, helper) {
        component.set('v.fromDecimal', '');
        component.set('v.formattedValueFrom', '');
        component.set('v.userInputFrom', '');
        component.set('v.errorAmount', false);        
    },
    clearAmountTo: function(component, event, helper) {
        component.set('v.toDecimal', '');
        component.set('v.formattedValueTo', '');
        component.set('v.userInputTo', '');
        component.set('v.errorAmount', false);        
    },
    clearDateFrom: function(component, event, helper) {
        let dates = component.get('v.dates');
        dates[0] = '';
        component.set('v.dates', dates);
        let placeholders = component.get('v.datesPlaceholders');
        placeholders[0] = $A.get("$Label.c.valueDateFrom");
        component.set('v.datesPlaceholders', placeholders);
        component.set('v.errorDate', false);
        component.set('v.fromDateFormat', false);
    },
    clearDateTo: function(component, event, helper) {
        let dates = component.get('v.dates');
        dates[1] = '';
        component.set('v.dates', dates);
        let placeholders = component.get('v.datesPlaceholders');
        placeholders[1] = $A.get("$Label.c.valueDateTo");
        component.set('v.datesPlaceholders', placeholders);
        component.set('v.errorDate', false);   
        component.set('v.toDateFormat', false);   
    },

    /*
	Author:        	Maria Íñigo
    Company:        Deloitte
	Description:    Control toast on searching for accounts
    History
    <Date>			<Author>			<Description>
	02/07/2020		Bea Hill   		    Adapted from CMP_B2B_SelectOrigin
    */
    showToast: function (component, helper) {
        var errorToast = component.find('accountsErrorToast');
        if (!$A.util.isEmpty(errorToast)) {
            //errorToast.showToast(action, static, notificationTitle, bodyText, functionTypeText, functionTypeClass, functionTypeClassIcon, noReload)
            errorToast.showToast(false, false, $A.get('$Label.c.B2B_Error_Problem_Loading'),  $A.get('$Label.c.B2B_Error_Check_Connection'), 'Error', 'Warning', 'Warning', false);
        }
    },
/*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Validate account selected when applying filters
    History
    <Date>			<Author>			<Description>
	04/08/2020		Bea Hill   		    Check user has selected an account from dropdown in case of filtering by account
    */
    checkValidAccount : function(component, event, helper) {
        var searchedAccount = component.get('v.searchedSourceAccount');
        var selectedAccount = component.get('v.account');
        if (!$A.util.isEmpty(searchedAccount)) {
            if ($A.util.isEmpty(selectedAccount)) {
                var msg = $A.get('$Label.c.B2B_Error_Invalid_Input');
                var msg_parameter = $A.get('$Label.c.B2B_Source_account');
                var full_msg = msg.replace('{0}', msg_parameter);
                component.set('v.errorMSG', full_msg);
            } else {
                component.set('v.errorMSG', '');
            }
        } else {
            component.set('v.errorMSG', '');
        }
    },

    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Control the values shown in the date fields (because ui:inputDate does not have placeholder attribute) together with handleChangeDatesPlaceholders
    History
    <Date>			<Author>			<Description>
	16/09/2020		Bea Hill   		   Initial version
    */
    handleChangeDates : function(component, event, helper) {
        let hasChanged = false;
        let dates = component.get('v.dates');
        let placeholders = component.get('v.datesPlaceholders');
        var auxPlaceholders = component.get('v.datesPlaceholders');
        let fromPlaceholder = $A.get("$Label.c.valueDateFrom");
        let toPlaceholder = $A.get("$Label.c.valueDateTo");
        if ($A.util.isEmpty(dates[0])) {
            if (placeholders[0] != fromPlaceholder){
                placeholders[0] = fromPlaceholder;
                hasChanged = true;
            }
        } else {
            if (placeholders[0] != dates[0]){
                placeholders[0] = dates[0];
                hasChanged = true;
            }
        }
        if ($A.util.isEmpty(dates[1])) {
            if (placeholders[1] != toPlaceholder){
                placeholders[1] = toPlaceholder;
                hasChanged = true;
            }
        } else {
            if (placeholders[1] != dates[1]){
                placeholders[1] = dates[1];
                hasChanged = true;
            }
        }
        if (hasChanged) {
            component.set('v.datesPlaceholders', placeholders);
        }
    },
/*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Control the values shown in the date fields (because ui:inputDate does not have placeholder attribute) together with handleChangeDates
    History
    <Date>			<Author>			<Description>
	16/09/2020		Bea Hill   		   Initial version
    */
    handleChangeDatesInternal : function(component, event, helper) {
        let hasChanged = false;
        let dates = component.get('v.dates');
        let placeholders = component.get('v.datesPlaceholders');
        let fromPlaceholder = $A.get("$Label.c.valueDateFrom");
        let toPlaceholder = $A.get("$Label.c.valueDateTo");
        if (placeholders[0] == fromPlaceholder) {
            component.set('v.fromDateFormat', false);
            if (dates[0] != ''){
                dates[0] = '';
                hasChanged = true;
            }
        } else {
            if (helper.checkDateFormat(component, placeholders[0])) { //has valid format
                component.set('v.fromDateFormat', false);
                if (dates[0] != placeholders[0]){
                    dates[0] = placeholders[0];
                    hasChanged = true;
                }
            } else {
                component.set('v.fromDateFormat', true);
            } 
            
        }
        if (placeholders[1] == toPlaceholder) {
            component.set('v.toDateFormat', false);
            if (dates[1] != ''){
                dates[1] = '';
                hasChanged = true;
            }
        } else {
            if (helper.checkDateFormat(component, placeholders[1])) {
                component.set('v.toDateFormat', false);
                if (dates[1] != placeholders[1]){
                    dates[1] = placeholders[1];
                    hasChanged = true;
                }
            } else {
                component.set('v.toDateFormat', true);
            }  
        }
        if (hasChanged) {
            component.set('v.dates', dates);
            helper.checkValidDates(component, event, helper);
        }
    },

    checkDateFormat: function(component, inputDate) {
        var isValid = false;

        let validRegExp = new RegExp('^(19|20)[0-9][0-9][-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$');
            isValid = validRegExp.test(inputDate);

        // var user = component.get('v.currentUser');
        // var format = user.dateFormat;
        // if (format = "dd/MM/yyyy") {
        //     let validRegExp = new RegExp('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$');
        //     isValid = validRegExp.test(inputDate);

        // } else if (format = "MM/dd/yyyy") {
        //     let validRegExp = new RegExp('^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d$');
        //     isValid = validRegExp.test(inputDate);
        // }

        return isValid;

    }
})