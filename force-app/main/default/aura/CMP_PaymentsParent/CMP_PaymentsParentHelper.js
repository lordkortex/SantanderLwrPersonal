({
        /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to get current user information
    History
    <Date>		<Author>		<Description>
	15/07/2020	Shahad Naji     Initial version
    */
    
    getCurrentUserInfo : function(component, event, helper) {
      return new Promise($A.getCallback(function (resolve, reject) {
            var action = component.get("c.getCurrentUserInfo");       
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var result = response.getReturnValue();
                  	//component.set('v.currentUser', result);
                          if (result.success) {
                        if(!$A.util.isEmpty(result.value)){
                            if(!$A.util.isEmpty(result.value.userData)){
                                component.set('v.currentUser', result.value.userData);
                                resolve('getCurrentUserInfo_OK');
                            }else{
                               reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                            }
                        }else{
                           reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                        }                       
                        
                    } else {
                       reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                    
                }
                else if (state === "INCOMPLETE") {
                    // do something
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
                    else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
            });        
            $A.enqueueAction(action); 
        }), this);       
    },
   


    
    getCurrency : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {             
            var action = component.get("c.getCurrencyList");       
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var result = response.getReturnValue();
                    var arrayMapKeysA = [];            
                    if(!$A.util.isEmpty(result)){
                        for(let i=0; i<result.length; i++){                       
                            arrayMapKeysA.push({
                                'label' : result[i].parsedCurrencyName,
                                'value' : result[i].currencyName
                            });
                        }
                    }
                    component.set('v.currencyOptions', arrayMapKeysA);              
                    resolve('La ejecucion ha sido correcta.'); 
                }
                else if (state === "INCOMPLETE") {
                    // do something
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
                    else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
            });        
            $A.enqueueAction(action);
        }), this);  
    },


    
    getStatus : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
              
        var action = component.get("c.getStatusList");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var arrayMapKeys = [];
                let statusListAux = [];
                if(!$A.util.isEmpty(result)){
                    for(let i=0; i< result.length; i++){   
                        if(!statusListAux.includes(result[i].statusName)){
                            statusListAux.push(result[i].statusName);
                            arrayMapKeys.push({
                                'label' : result[i].parsedStatusName,
                                'value' : result[i].statusName
                            }); 
                        }
                    }
                }
           
                arrayMapKeys = helper.sortDropdown(component, event, helper, arrayMapKeys);
                component.set('v.statusOptions', arrayMapKeys);
                 resolve('La ejecucion ha sido correcta.'); 
            }
            else if (state === "INCOMPLETE") {
                reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
        });        
        $A.enqueueAction(action);
        }), this);  
    },
    
    
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to get payment status-reason list
    History
    <Date>		<Author>		<Description>
	06/11/2020	Shahad Naji     Initial version
    */
    getStatusReasonList : function (component, event, helper){        
        return new Promise($A.getCallback(function (resolve, reject) {
            
            var action = component.get("c.getPaymentStatusReasonList");       
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var result = response.getReturnValue();
                  	component.set('v.paymentStatusList', result);
                    resolve('La ejecucion ha sido correcta.'); 
                }
                else if (state === "INCOMPLETE") {
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    // do something
                }
                    else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
            });        
            $A.enqueueAction(action);
        }), this);  
    },
    
    getPaymentMethod : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            
        var action = component.get("c.getPaymentMethodList");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var arrayMapKeys = [];
                let methodListAux = [];
                if(!$A.util.isEmpty(result)){
                    for(let i=0; i<result.length;i++){
                        if(!methodListAux.includes(result[i].paymentMethodName)){
                            methodListAux.push(result[i].paymentMethodName);
                            arrayMapKeys.push({
                                'label' : result[i].parsedPaymentMethodName,
                                'value' : result[i].paymentMethodName
                            });
                        }
                    }
                }
                
                arrayMapKeys = helper.sortDropdown(component, event, helper, arrayMapKeys);
                component.set('v.methodOptions', arrayMapKeys);
                resolve('La ejecucion ha sido correcta.'); 
            }
            else if (state === "INCOMPLETE") {
                 reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                     reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
        });        
        $A.enqueueAction(action);
            }), this); 
    },
    
    getCountry : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
        //var action = component.get("c.getCountryMap");       
          var action = component.get("c.getCountryList");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                                
                var arrayMapKeysA = [];
                let countryListAux = [];
                
                if(!$A.util.isEmpty(result)){
                    for(let i = 0; i < result.length; i++){
                        if(!countryListAux.includes(result[i].countryName)){
                            countryListAux.push(result[i].countryName);
                            arrayMapKeysA.push({
                                'label' : result[i].parsedCountryName,
                                'value' : result[i].countryName
                            });
                           
                        }
                    }
                }
                
              
                arrayMapKeysA = helper.sortDropdown(component, event, helper, arrayMapKeysA);
         
                component.set('v.countryOptions', arrayMapKeysA);
                resolve('La ejecucion ha sido correcta.'); 
            }
            else if (state === "INCOMPLETE") {
                reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
        });        
        $A.enqueueAction(action);
            }), this); 
    },
    
    /*-----------------------------------------------
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Reset filters
    History
    <Date>		<Author>		<Description>
    06/08/2020	Shahad Naji     Initial version
    24/08/2020  Bea Hill        Add source bank and source company
------------------------------------------------*/
    reset : function(component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {    
            component.set('v.showSpinner', true);
            
            //Clear ORDERING ACCOUNT
            component.set('v.selectedSourceValue', '');
            component.find('orderingAccount').setCustomValidity('');
            component.find('orderingAccount').reportValidity();
            //Clear ordering account type
            component.set('v.selectedAccountTypeValue', '');
            
            component.find('orderingAccountType').setCustomValidity('');
            component.find('orderingAccountType').reportValidity();
            //Clear SOURCE BANK
            component.set('v.sourceBank', '');
            
            //Clear SOURCE COMPANY NAME
            component.set('v.sourceCompany', '');
            //Clear FROM AMOUNT
            component.set('v.fromAmount', null);
            component.find('fromAmount').setCustomValidity('');
            component.find('fromAmount').reportValidity();
            //Clear TO AMOUNT
            component.set('v.toAmount', null);
            component.find('toAmount').setCustomValidity('');
            component.find('toAmount').reportValidity();
            //Clear PAYMENT CURRENCY
            component.set('v.selectedCurrencyValues', []); // controlado en el CMP_MultiSelectCombobox
            component.set('v.clearCurrency', true);
            //Clear CLIENT REFERENCE
            component.set('v.clientReference', '');
            //Clear PAYMENT STATUS
            component.set('v.selectedStatusValues', []); // controlado en el CMP_MultiSelectCombobox
            component.set('v.clearStatus', true);
            //Clear PAYMENT METHOD
            component.set('v.selectedMethodValue', ''); // controlado en el CMP_MultiSelectCombobox
            component.set('v.clearMethod', true);
            //Clear VALUE DATE FROM
            component.set('v.fromDate', {});
            component.find('valueDateFrom').setCustomValidity('');
            component.find('valueDateFrom').reportValidity();
            //Clear VALUE DATE TO
            component.set('v.toDate', {});
            component.find('valueDateTo').setCustomValidity('');
            component.find('valueDateTo').reportValidity();
            component.set('v.selectedCountryValue', "");
            component.set('v.clearCountry', true);        
            component.set('v.paymentList', []);
            component.set('v.paginationList', []);
            
            
            //Clear BENEFICIARY BANK
            component.set('v.beneficiaryBank', '');
            
            //Clear BENEFICIARY COMPANY NAME
            component.set('v.beneficiaryCompany', '');
            
            
            
            //Clear UNIQUE GTS PAYMENT REFERENCE
            component.set('v.paymentReference', '');
           /* 
            setTimeout(function () {
                component.set('v.showSpinner', false);
            }, 5000);*/
            resolve('ok');    
        }), this);
    },

    setPaginations: function (component, event, helper) {
        var paginationsList = component.get('v.values');
        var itemsXpage = component.get('v.selectedValue');
        if ($A.util.isEmpty(itemsXpage)) {
            itemsXpage = paginationsList[0];
            component.set('v.selectedValue', itemsXpage);
        }
        var items = component.get('v.paymentList');
        var numberItems = items.length;
        var numberPages = Math.ceil(numberItems / itemsXpage);
        var lastItemPage = 0;
        var pagesList = [];
        var listItems = [];
        for (let i = 0; i < numberPages; i++) {
            pagesList.push(i + 1);
        }
        for (let i = 0; i < itemsXpage; i++) {
            if (numberItems > i) {
                listItems.push(items[i]);
                lastItemPage++;
            }
        }
        component.set('v.paymentsNumber', numberItems);
        component.set('v.finalItem', lastItemPage);
        component.set('v.firstItem', 1);
        component.set('v.pagesNumbers', pagesList);
        component.set('v.paginationList', listItems);
        component.set('v.currentPage', 1);
    },

    previousPage: function (component, event, helper) {
        var itemsXpage = component.get('v.selectedValue');
        var items = component.get('v.paymentList');
        var firstItem = component.get('v.firstItem');
        var finalItem = firstItem - 1;
        var currentPage = component.get('v.currentPage');
        var listItems = [];
        for (let i = parseInt(finalItem) - parseInt(itemsXpage); i < firstItem - 1; i++) {
            listItems.push(items[i]);
        }
        component.set('v.currentPage', currentPage - 1);
        component.set('v.firstItem', parseInt(finalItem) - parseInt(itemsXpage) + 1);
        component.set('v.finalItem', finalItem);
        component.set('v.paginationList', listItems);
    },

    nextPage: function (component, event, helper) {
        var itemsXpage = component.get('v.selectedValue');
        var items = component.get('v.paymentList');
        var finalItem = component.get('v.finalItem');
        var firstItem = finalItem + 1;
        var currentPage = component.get('v.currentPage');
        var listItems = [];
        var count = 0;
        for (let i = finalItem; i < parseInt(finalItem) + parseInt(itemsXpage); i++) {
            if (items.length > i) {
                listItems.push(items[i]);
                count++;
            }
        }
        component.set('v.currentPage', currentPage + 1);
        component.set('v.firstItem', firstItem);
        component.set('v.finalItem', finalItem + count);
        component.set('v.paginationList', listItems);
    },

    selectPage: function (component, event, helper) {
        var selectedPage = component.get('v.currentPage');
        var items = component.get('v.paymentList'); //was: v.paymentList'
        var itemsXpage = component.get('v.selectedValue');
        var firstItem = (selectedPage - 1) * itemsXpage;
        var finalItem = firstItem;
        var listItems = [];
        var count = 0;
        for (let i = firstItem; i < parseInt(finalItem) + parseInt(itemsXpage); i++) {
            if (items.length > i) {
                listItems.push(items[i]);
                count++;
            }
        }
        component.set('v.firstItem', firstItem + 1);
        component.set('v.finalItem', finalItem + count);
        component.set('v.paginationList', listItems);
      	//helper.uncheckAllSelected(component, event, helper);
    },

    sortHelper: function (component, event, helper, sortFieldName){
        var currentDir = component.get('v.arrowDirection');
        if (currentDir == 'arrowdown') {
            component.set('v.arrowDirection', 'arrowup');
            component.set('v.isAsc', true);
        } else {
            component.set('v.arrowDirection', 'arrowdown');
            component.set('v.isAsc', false);
        }
        helper.sortBy(component, event, helper, sortFieldName);
    },
    
    normalizeMixedDataValue: function( value ) {
 
        var padding = "000000000000000";
        
        // Loop over all numeric values in the string and
        // replace them with a value of a fixed-width for
        // both leading (integer) and trailing (decimal)
        // padded zeroes.
        value = value.replace(
        /(\d+)((\.\d+)+)?/g,
        function( $0, integer, decimal, $3 ) {
        
                // If this numeric value has "multiple"
                // decimal portions, then the complexity
                // is too high for this simple approach -
                // just return the padded integer.
                if ( decimal !== $3 ) {
                
                return(
                padding.slice( integer.length ) +
                integer +
                decimal
                );
                
            }
     
             decimal = ( decimal || ".0" );
            
                return(
                    padding.slice( integer.length ) +
                    integer +
                    decimal +
                    padding.slice( decimal.length )
                );
    
    	}
    	);
    
        console.log( value );
        
        return( value );
    
    },
 

    sortBy: function (component, event, helper, sortBy) {
        var sort;
        var orderBy = component.get('v.isAsc');
        var data = component.get('v.paymentList');
        if (orderBy == true) {
            if (sortBy == 'paymentReference') {                   
                sort = data.sort((a,b) => (a.paymentId.toLowerCase() > b.paymentId.toLowerCase()) ? 1 : (b.paymentId.toLowerCase() >a.paymentId.toLowerCase()) ? -1 : 0);
            } else if (sortBy == 'paymentStatus') {  
                sort = data.sort((a,b) => (helper.normalizeMixedDataValue(a.parsedPaymentStatus) > helper.normalizeMixedDataValue(b.parsedPaymentStatus)) ? 1 : ((helper.normalizeMixedDataValue(b.parsedPaymentStatus) >helper.normalizeMixedDataValue(a.parsedPaymentStatus)) ? -1 : 0));
            } else if (sortBy == 'paymentMethod') {                   
                sort = data.sort((a,b) => (a.parsedPaymentMethod.toUpperCase() > b.parsedPaymentMethod.toUpperCase()) ? 1 : ((b.parsedPaymentMethod.toUpperCase() > a.parsedPaymentMethod.toUpperCase()) ? -1 : 0));
            } else if (sortBy == 'valueDate') {
                sort = data.sort((a, b) => new Date(a.valueDate) - new Date(b.valueDate));
            } else if (sortBy == 'FX') {                   
                sort = data.sort((a,b) => (a.fxFlag > b.fxFlag) ? 1 : ((b.fxFlag > a.fxFlag) ? -1 : 0));
            } else if (sortBy == 'paymentCurrency') {                   
                sort = data.sort((a,b) => (a.paymentCurrency.toUpperCase() > b.paymentCurrency.toUpperCase()) ? 1 : ((b.paymentCurrency.toUpperCase() > a.paymentCurrency.toUpperCase()) ? -1 : 0));
            } else if (sortBy == 'paymentAmount') {                    
                sort = data.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
            } else if (sortBy == 'sourceAccount') {                   
                sort = data.sort((a,b) => (a.sourceAccount.toUpperCase() > b.sourceAccount.toUpperCase()) ? 1 : ((b.sourceAccount.toUpperCase() > a.sourceAccount.toUpperCase()) ? -1 : 0));
            } else if (sortBy == 'beneficiaryAccount') {                   
                sort = data.sort((a,b) => (a.beneficiaryAccount.toUpperCase() > b.beneficiaryAccount.toUpperCase()) ? 1 : ((b.beneficiaryAccount.toUpperCase() > a.beneficiaryAccount.toUpperCase()) ? -1 : 0));
            }
        } else {
        	if (sortBy == 'paymentReference') {                   
                sort = data.sort((a,b) => (a.paymentId.toLowerCase() < b.paymentId.toLowerCase()) ? 1 : (b.paymentId.toLowerCase() < a.paymentId.toLowerCase()) ? -1 : 0);
            } else if(sortBy == 'paymentStatus') { 
                sort = data.sort((a,b) => (helper.normalizeMixedDataValue(a.paymentStatus) < helper.normalizeMixedDataValue(b.paymentStatus)) ? 1 : ((helper.normalizeMixedDataValue(b.paymentStatus) < helper.normalizeMixedDataValue(a.paymentStatus)) ? -1 : 0));
            } else if(sortBy == 'paymentMethod') {                   
                sort = data.sort((a,b) => (a.parsedPaymentMethod.toUpperCase() < b.parsedPaymentMethod.toUpperCase()) ? 1 : ((b.parsedPaymentMethod.toUpperCase() < a.parsedPaymentMethod.toUpperCase()) ? -1 : 0));
            } else if(sortBy == 'valueDate') {                    
                sort = data.sort((a, b) => new Date(b.valueDate) - new Date(a.valueDate));
            } else if (sortBy == 'FX') {                   
            	sort = data.sort((a,b) => (a.fxFlag < b.fxFlag) ? 1 : ((b.fxFlag < a.fxFlag) ? -1 : 0));
            } else if(sortBy == 'paymentCurrency') {                   
            	sort = data.sort((a,b) => (a.paymentCurrency.toUpperCase() < b.paymentCurrency.toUpperCase()) ? 1 : ((b.paymentCurrency.toUpperCase() < a.paymentCurrency.toUpperCase()) ? -1 : 0));
            } else if (sortBy == 'paymentAmount') {                    
            	sort = data.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
            } else if (sortBy == 'sourceAccount') {                   
                sort = data.sort((a,b) => (a.sourceAccount.toUpperCase() < b.sourceAccount.toUpperCase()) ? 1 : ((b.sourceAccount.toUpperCase() < a.sourceAccount.toUpperCase()) ? -1 : 0));
            } else if (sortBy == 'beneficiaryAccount') {                   
                sort = data.sort((a,b) => (a.beneficiaryAccount.toUpperCase() < b.beneficiaryAccount.toUpperCase()) ? 1 : ((b.beneficiaryAccount.toUpperCase() < a.beneficiaryAccount.toUpperCase()) ? -1 : 0));
            }
        }
        component.set('v.paymentList', sort);
        helper.selectPage(component, event, helper);
        //helper.setPaginations(component, event, helper);
    },
    validateRanges: function (component, event, helper, idA, idB, msgA, msgB, type, typeComparison) {
        var fromValue = component.find(idA).get('v.value');
        var toValue = component.find(idB).get('v.value');
        var fromError = msgA;
        var toError = msgB;
        if (!$A.util.isEmpty(fromValue) && !$A.util.isEmpty(toValue)) {
            if (helper.validateExpression(fromValue, toValue, typeComparison)) {
                if (type == 'ui') {
                    component.find(idA).set('v.errors', [{
                        message: fromError
                    }]);
                    component.find(idB).set('v.errors', [{
                        message: toError
                    }]);
                    $A.util.addClass(component.find(idA + 'Element'), 'slds-has-error');
                    $A.util.addClass(component.find(idB + 'Element'), 'slds-has-error');
                } else if (type == 'lightning') {
                    component.find(idA).setCustomValidity(fromError);
                    component.find(idA).reportValidity();
                    component.find(idB).setCustomValidity(toError);
                    component.find(idB).reportValidity();
                }
            } else {
                if (type == 'ui') {
                    component.find(idA).set('v.errors', null);
                    component.find(idB).set('v.errors', null);
                    $A.util.removeClass(component.find(idA + 'Element'), 'slds-has-error');
                    $A.util.removeClass(component.find(idB + 'Element'), 'slds-has-error');
                } else if (type == 'lightning') {
                    component.find(idA).setCustomValidity('');
                    component.find(idA).reportValidity();
                    component.find(idB).setCustomValidity('');
                    component.find(idB).reportValidity();
                }
            }
        } else {
            component.find(idA).setCustomValidity('');
            component.find(idA).reportValidity();
            component.find(idB).setCustomValidity('');
            component.find(idB).reportValidity();
        }
    },
    
    validateExpression: function (fromValue, toValue, typeComparison) {
        if (typeComparison == "amount") {
        	fromValue = parseInt(fromValue, 10);
            toValue = parseInt(toValue, 10);
        } else if (typeComparison == "date") {
            fromValue = new Date(fromValue);
            toValue = new Date(toValue);
        }
        if (toValue < fromValue) {
            return true;
        } else {
            return false;
        }
    },

    sortDropdown: function (component, event, helper, data) {
        var sort;
        sort = data.sort((a,b) => (a.label.toUpperCase() > b.label.toUpperCase()) ? 1 : ((b.label.toUpperCase() > a.label.toUpperCase()) ? -1 : 0));
        return sort;
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Get payments list based on filter criteria
    History
    <Date>		<Author>		<Description>
    06/08/2020	Shahad Naji     Initial version
    27/08/2020  Bea Hill        Add additional fields to for request, control latestOperationsFlag boolean
    */
    search: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {                      
            
            var applySearch = true;
            var globalUserId = null;
            var pendingAuthorization = null;
            var sourceAccountList = null;
            var destinationCountry = null;
            var statusList = null;
            var amountFrom = null;
            var amountTo = null;
            var currencyList = null; 
            var paymentMethod = null;
            var clientReference = null;
            var valueDateFrom = null;
            var valueDateTo = null;
            var latestOperationsFlag = true; //only changes to false when at least one criteria informed
            var paymentReference = null;
            var sourceData = null;
            var destinationData = null;

            //SOURCE ACCOUNT DATA
            var f_accountId = component.get('v.selectedSourceValue');
            var f_accountType = component.get('v.selectedAccountTypeValue');
            var f_agentName = component.get('v.sourceBank');
            var f_sourceAccount = {};
            var sourceAccountAux = null;


            if ($A.util.isEmpty(f_accountId) && !$A.util.isEmpty(f_accountType)) {
                applySearch = false;
            } else if (!$A.util.isEmpty(f_accountId) && $A.util.isEmpty(f_accountType)) {
                applySearch = false;
            } else if (!$A.util.isEmpty(f_accountId) && !$A.util.isEmpty(f_accountType)) {
                latestOperationsFlag = false;
                if (f_accountType.toUpperCase() == 'BBA' || f_accountType.toUpperCase() == 'IBA') {
                    sourceAccountAux = {
                        "accountId": f_accountId,
                        "accountType": f_accountType
                    };
                    f_sourceAccount.sourceAccount = sourceAccountAux

                } else {
                    applySearch = false;
                }
            }

            if (!$A.util.isEmpty(f_agentName)) {
                latestOperationsFlag = false;
                f_sourceAccount.agentName = f_agentName;
            }

            if (!$A.util.isEmpty(f_sourceAccount)) {
                sourceAccountList = [];
                sourceAccountList.push(f_sourceAccount);
            }

            var f_amountFrom = component.get('v.fromAmount');
            if (!$A.util.isEmpty(f_amountFrom)) {
                latestOperationsFlag = false;
                amountFrom = f_amountFrom;            
            }

            var f_amountTo = component.get('v.toAmount');
            if (!$A.util.isEmpty(f_amountTo)) {
                latestOperationsFlag = false;
                amountTo = f_amountTo;            
            }

            if (!$A.util.isEmpty(f_amountFrom) && !$A.util.isEmpty(f_amountTo)) {
                if (f_amountTo < f_amountFrom) {
                  applySearch = false;  
                }
            }

            var f_currencyList = component.get('v.selectedCurrencyValues');
            if (!$A.util.isEmpty(f_currencyList)) {
                latestOperationsFlag = false;
                currencyList = [];
                for(let i = 0; i < f_currencyList.length; i++){
                    currencyList.push({
                        "tcurrency" : f_currencyList[i]
                    });
                }
            }

            var f_clientReference = component.get('v.clientReference');
            if (!$A.util.isEmpty(f_clientReference)) {
                latestOperationsFlag = false;
                clientReference = f_clientReference;
            }

            var f_paymentStatusList = component.get('v.selectedStatusValues');
            if (!$A.util.isEmpty(f_paymentStatusList)) {
                latestOperationsFlag = false;
                statusList = [];
                for (let i = 0; i < f_paymentStatusList.length; i++) {
                    var item = helper.findStatusReasonRecord(component, event, helper, f_paymentStatusList[i]);
                    if(!$A.util.isEmpty(item)){
                        statusList.push({
                            "status": item.PAY_PCK_Status_code__c,
                            "reason" : item.PAY_PCK_Reason_code__c
                        });  
                    }
                    
                }
            }

            var f_paymentMethod = component.get('v.selectedMethodValue');
            if (!$A.util.isEmpty(f_paymentMethod)) {
                latestOperationsFlag = false;
                paymentMethod = f_paymentMethod;
            }

            var f_destinationCountry = component.get('v.selectedCountryValue');
            if (!$A.util.isEmpty(f_destinationCountry)) {
                latestOperationsFlag = false;
                destinationCountry = f_destinationCountry;
            }

            var fieldFrom = component.find('valueDateFrom');
            var fieldTo = component.find('valueDateTo');
            if (!fieldFrom.checkValidity() || !fieldTo.checkValidity()) {
                applySearch = false;
            } else {
                var f_valueDateFrom = component.get('v.fromDate');
                var f_valueDateTo = component.get('v.toDate');
                if (!$A.util.isEmpty(f_valueDateFrom)) {
                    latestOperationsFlag = false;
                    valueDateFrom = f_valueDateFrom;
                }
                if (!$A.util.isEmpty(f_valueDateTo)) {
                    latestOperationsFlag = false;
                    valueDateTo = f_valueDateTo;
                }            
                if (!$A.util.isEmpty(f_valueDateFrom) && !$A.util.isEmpty(f_valueDateTo)) {
                    if(f_valueDateTo < f_valueDateFrom){
                        applySearch = false;
                    }
                }
            }

            var f_paymentReference = component.get('v.paymentReference');
            if (!$A.util.isEmpty(f_paymentReference)) {
                latestOperationsFlag = false;
                paymentReference = f_paymentReference;
            }

            var sourceCompany = component.get('v.sourceCompany');
            if (!$A.util.isEmpty(sourceCompany)) {
                latestOperationsFlag = false;
                sourceData = {
                    "name": sourceCompany
                }
            }

            var beneficiaryCompany = component.get('v.beneficiaryCompany');
            var beneficiaryBank = component.get('v.beneficiaryBank');
            
            if (!$A.util.isEmpty(beneficiaryCompany) || !$A.util.isEmpty(beneficiaryBank)) {
                latestOperationsFlag = false;
                destinationData = {};
                if (!$A.util.isEmpty(beneficiaryCompany)) {
                    destinationData.name = beneficiaryCompany;
                }
                if (!$A.util.isEmpty(beneficiaryBank)) {
                    destinationData.agentName = beneficiaryBank;
                }

            }

            
            if (applySearch) {
                component.set('v.paymentList', []);
                var action = component.get("c.searchPaymentsInformation");
                action.setParams({     
                    "globalUserId": globalUserId,
                    "pendingAuthorization": pendingAuthorization,
                    "sourceAccountList": sourceAccountList,
                    "destinationCountry": destinationCountry,
                    "statusList": statusList,               
                    "amountFrom": amountFrom,
                    "amountTo": amountTo,
                    "currencyList": currencyList,
                    "paymentMethod": paymentMethod,
                    "clientReference": clientReference,
                    "valueDateFrom": valueDateFrom,
                    "valueDateTo": valueDateTo,
                    "latestOperationsFlag": latestOperationsFlag,
                    "sourceData": sourceData,
                    "operationGlobalId": paymentReference,
                    "destinationData": destinationData
                });
                action.setCallback(this, function (response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var result = response.getReturnValue();
                        if (result.success) {
                            if (result.value.output.paymentsList != null &&  result.value.output.paymentsList != undefined) {
                                component.set('v.paymentList', result.value.output.paymentsList);
                                if (result.value.output.paymentsList.length > 0) {
                                    helper.setPaginations(component, event, helper);
                                }
                            } else {
                            	helper.showInfoToast(component, event, helper);   
                            }
                            resolve('ok');                    
                        } else {
                            console.log('ko');
                            reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));                       
                        }                
                    } else if (state === "INCOMPLETE") {
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    } else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                    }
                });        
            	$A.enqueueAction(action);   
            } else {
                //helper.showErrorToast(component, event, helper);
                console.log('error');
                reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
            }
        }), this);
    },
    
    /*
	Author:        	Bea Hill
    Company:        Deloitte
	Description:    Get payment details
    History
    < Date>		<Author>		<Description>
	30/07/2020	Bea Hill        Initial version - adapted from CMP_PaymentsLandingParentHelper getCurrentAccounts
	07/08/2020	Shahad Naji 	Adapted from CMP_PaymentsLandingPaymentDetail
    */
    getPaymentDetails: function (component, event, helper) {
        return new Promise($A.getCallback(function (resolve, reject) {
            var currentUser = component.get('v.currentUser');
            var action = component.get('c.getPaymentDetail');
            var paymentObj = component.get("v.paymentObj");
            action.setParam("paymentId", component.get("v.paymentObj.paymentId"));
            action.setCallback(this, function (actionResult) {
                if (actionResult.getState() == 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    if (!$A.util.isEmpty(returnValue)) {
                        if(returnValue.success){
                            if(!$A.util.isEmpty(returnValue.value)){
                                
                                returnValue.value.paymentDetail.clientReference = paymentObj.clientReference;
                               
                                if(!$A.util.isEmpty(returnValue.value.paymentDetail.issueDate)){
                                    var issueTime = $A.localizationService.formatTime(returnValue.value.paymentDetail.issueDate, 'HH:mm');                                    
                                    returnValue.value.paymentDetail.issueTime = issueTime;
                                }else{
                                    returnValue.value.paymentDetail.issueTime = '';
                                }
                                
                                if(!$A.util.isEmpty(returnValue.value.paymentDetail.operationNominalFxRollbackDetails)){
                                    if(!$A.util.isEmpty(returnValue.value.paymentDetail.operationNominalFxRollbackDetails.valueDateEfx)){
                                        var valueDateEfx = $A.localizationService.formatTime(returnValue.value.paymentDetail.operationNominalFxRollbackDetails.valueDateEfx, 'HH:mm');                                    
                                        returnValue.value.paymentDetail.operationNominalFxRollbackDetailsValueDateEfxTime = valueDateEfx;
                                    }else{
                                        returnValue.value.paymentDetail.operationNominalFxRollbackDetailsValueDateEfxTime = '';
                                    }
                                }else{
                                    returnValue.value.paymentDetail.operationNominalFxRollbackDetailsValueDateEfxTime = '';
                                }
                                
                                if(!$A.util.isEmpty(returnValue.value.paymentDetail.statusUpdateDate)){
                                    var statusUpdateDate = $A.localizationService.formatTime(returnValue.value.paymentDetail.statusUpdateDate, 'HH:mm');  
                                    returnValue.value.paymentDetail.statusUpdateTime = statusUpdateDate;
                                }else{
                                    returnValue.value.paymentDetail.statusUpdateTime = '';
                                }

                                component.set('v.paymentObj', returnValue.value.paymentDetail);
                                resolve('ok');
                            }else{
                               // helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                                reject($A.get('$Label.c.ERROR_NOT_RETRIEVED')); 
                            }                            
                        }else{
                           // helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                            reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));   
                        }                     
                    }else{
                       // helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                        reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));  
                    }
                    
                } else if (actionResult.getState() == "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log('problem getting list of payments msg2');
                    }
                   // helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }else{
                    //helper.showToast(component, event, helper, $A.get('$Label.c.B2B_Error_Problem_Loading'), $A.get('$Label.c.B2B_Error_Check_Connection'), false);
                    reject($A.get('$Label.c.ERROR_NOT_RETRIEVED'));
                }
            });
            $A.enqueueAction(action);
        }), this);
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to show info toast when it is required
    History
    <Date>		<Author>		<Description>
	10/08/2020	Shahad Naji     Initial version
    */
    //$Label.c.Search_NoPaymentsFound
    //$Label.c.PAY_noResultsWithFilters
    showInfoToast: function (component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: $A.get("$Label.c.Search_NoPaymentsFound"),
            message: $A.get("$Label.c.PAY_noResultsWithFilters"),            
            duration: '5000',
            key: 'info_alt',
            type: 'info',
            mode: 'pester'
        });
        toastEvent.fire();
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to show error toast when it is required
    History
    <Date>		<Author>		<Description>
	10/08/2020	Shahad Naji     Initial version
    */
    // $Label.c.ERROR
    showErrorToast: function (component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: $A.get("$Label.c.ERROR"),
            message: '',            
            duration: '5000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },
     /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to find the Payment_Status_List__mdt record of a certain value
    History
    <Date>		<Author>		<Description>
	06/11/2020	Shahad Naji     Initial version
    */
    findStatusReasonRecord : function (component, event, helper, value) {
        var paymentStatusList =  component.get('v.paymentStatusList');
        var record = {};
        if(!$A.util.isEmpty(paymentStatusList)){
            record = paymentStatusList.find(item => item.DeveloperName === value);
        }else{
            record = {}
        }
        return record;
    },
      /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to reset sort table attributes
    History
    <Date>		<Author>		<Description>
	06/11/2020	Shahad Naji     Initial version
    */
    resetSort : function (component, event, helper){
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.arrowDirection', 'arrowup');
            component.set('v.isAsc',  true);
            component.set('v.selectedTabsoft', '');
            resolve('ok');
        }), this);
    },
      /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to reset pagination attributes
    History
    <Date>		<Author>		<Description>
	06/11/2020	Shahad Naji     Initial version
    */
    resetPagination : function (component, event, helper){
        return new Promise($A.getCallback(function (resolve, reject) {
            component.set('v.selectedValue', null);
            component.set('v.paymentsNumber', null);
            component.set('v.finalItem', null);
            component.set('v.firstItem', 1);
			component.set('v.pagesNumbers', null);
            component.set('v.paginationList', null);
            component.set('v.currentPage', null);
            resolve('ok');
        }), this);
    },
         /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to set time parameter
    History
    <Date>		<Author>		<Description>
	12/11/2020	Shahad Naji     Initial version
    */
    setTime :  function (component, event, helper){
        return new Promise($A.getCallback(function (resolve, reject) {
            
            var payment = component.get('v.paymentObj');
            if(!$A.util.isEmpty(payment)){
                
                if(!$A.util.isEmpty(payment.issueDate)){
                    var issueTime = $A.localizationService.formatTime(payment.issueDate, 'HH:mm');                                    
                    payment.issueTime = issueTime;
                }else{
                    payment.issueTime = '';
                }
                
                if(!$A.util.isEmpty(payment.operationNominalFxRollbackDetails)){
                    if(!$A.util.isEmpty(payment.operationNominalFxRollbackDetails.valueDateEfx)){
                        var valueDateEfx = $A.localizationService.formatTime(payment.operationNominalFxRollbackDetails.valueDateEfx, 'HH:mm');                                    
                        payment.operationNominalFxRollbackDetailsValueDateEfxTime = valueDateEfx;
                    }else{
                        payment.operationNominalFxRollbackDetailsValueDateEfxTime = '';
                    }
                }else{
                    payment.operationNominalFxRollbackDetailsValueDateEfxTime = '';
                }
                
                if(!$A.util.isEmpty(payment.statusUpdateDate)){
                    var statusUpdateDate = $A.localizationService.formatTime(payment.statusUpdateDate, 'HH:mm');  
                    payment.statusUpdateTime = statusUpdateDate;
                }else{
                    payment.statusUpdateTime = '';
                }
                
                component.set('v.paymentObj', payment);
                resolve('ok');
            }else{
                reject('KO');
            }
        }), this);
    }
    
})