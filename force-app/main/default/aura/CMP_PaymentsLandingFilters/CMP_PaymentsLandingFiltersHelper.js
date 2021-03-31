({
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Sets filters list
    History
    <Date>			<Author>			<Description>
	02/06/2020		Shahad Naji   		Initial version
    */
	setFilters : function(component, event, helper) {
		let rPayemntMethodList = component.get('v.paymentMethodDropdownList');
        let rCurrencyList = component.get('v.currencyDropdownList');
        let rStatusList = component.get('v.statusDropdownList');
        let rCountryList = component.get('v.countryDropdownList');

        
        let currencyList = [];
        let currencyListAux = [];
        let statusList = [];
        let statusListAux = [];
        let methodList = [];
        let methodListAux = [];
        let countryList = [];
        let countryListAux = [];

        
        for(let i=0; i < rCurrencyList.length; i++){
            //currency
            let currency = rCurrencyList[i].currencyName;
            if(!$A.util.isEmpty(currency)){
                if(!currencyListAux.includes(currency)){
                    currencyListAux.push(currency);
                    currencyList.push({
                        'label' : rCurrencyList[i].parsedCurrencyName,
                        'value' : 'chk_' + currency
                    });
                }
            }
        }
        for(let i=0; i < rStatusList.length; i++){
            //Status
            let status = rStatusList[i].statusName;
            if(!$A.util.isEmpty(status)){
                if(!statusListAux.includes(status)){
                    statusListAux.push(status);
                    statusList.push({
                        'label' : rStatusList[i].parsedStatusName,
                        'value' : 'chk_' + status
                    });
                }
            }
        }
        
        for(let i=0; i < rPayemntMethodList.length; i++){
            //Payment method
            let method = rPayemntMethodList[i].paymentTypeName;
            if(!$A.util.isEmpty(method)){
                if(!methodListAux.includes(method)){
                    methodListAux.push(method);
                    methodList.push({
                        'label' : rPayemntMethodList[i].parsedPaymentTypeName,
                        'value' : 'chk_' + method
                    });
                }
            }
        }
 
        for(let i=0; i < rCountryList.length; i++){
            //Country
            let country = rCountryList[i].countryName;
            if(!$A.util.isEmpty(country)){
                if(!countryListAux.includes(country)){
                    countryListAux.push(country);
                    countryList.push({
                        'label' : rCountryList[i].parsedCountryName,
                        'value' : 'chk_' + country
                    });
                }
            }
        }

    

        var sortCurrencyList = helper.sortList(component, event,helper, currencyList);
        var sortStatusList = helper.sortList(component, event, helper, statusList);
        var sortMethodList = helper.sortList(component, event, helper, methodList);
        var sortCountryList = helper.sortList(component, event, helper, countryList);
        component.set('v.currencyDropdownList', sortCurrencyList);
        component.set('v.statusDropdownList', sortStatusList);
        component.set('v.paymentMethodDropdownList', sortMethodList);
        component.set('v.countryDropdownList', sortCountryList);

        
	},
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Sorts filters label
    History
    <Date>			<Author>			<Description>
	02/06/2020		Shahad Naji   		Initial version
    */
    sortList : function(component, event, helper, list) {
        var sort;
        var data = list;
       	sort = data.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
        return sort;
    },
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    This method is to deselect the clicked header payment status when the Status is cleared
    History
    <Date>			<Author>			<Description>
	03/06/2020		Shahad Naji   		Initial version
    */
    clearSelectedPaymentStatusBox : function(component, event, helper){
        component.set('v.selectedPaymentStatusBox', '');
        
    },

    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Reset filter options
    History
    <Date>			<Author>			<Description>
    15/06/2020		Shahad Naji   		Initial version
    17/06/2020      Bea Hill            Adapted from CMP_B2B_FilterAccounts
    06/07/2020      Bea Hill            Reset all fields that are not controlled in their own components
    */
    resetSearch : function(component, event, helper){
        
        var emptyLst = [];
        //Account
        component.set('v.searchedSourceAccount', '');
        component.set('v.selectedSourceAccount', {});
        
        //Amount       
        component.set('v.fromDecimal', ''); 
        component.set('v.toDecimal', '');            

        //Currency
        // component.set('v.clearCurrencyDropdown', true);
        // component.set('v.selectedCurrencies', []);
        
        //Payment status
        // component.set('v.clearStatusDropdown', true);
        // component.set('v.selectedPaymentStatusBox', '');
        //component.set('v.selectedStatuses', []);

        //Payment method
        component.set('v.selectedMethod', '');

        //Client reference
        // component.set('v.clientReference', '');  
        component.set('v.searchedString', '');  

        //Dates
        component.set('v.dates', ['','']);            

        //Country   
        component.set('v.selectedCountry', '');   
        
        // General
        component.set('v.resetSearch', false); 
        component.set('v.filterCounter', 0);
    },

    
        /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Filter by the header option selected
    History
    <Date>			<Author>			<Description>
	03/06/2020		Shahad Naji   		Initial version
    
    */
    statusAction : function(component, event, helper){
        var statusBox = component.get('v.selectedPaymentStatusBox');
        if(!$A.util.isEmpty(statusBox)){
            // var searchString =  component.get('v.searchedString');
            // if(!$A.util.isEmpty(searchString)){
            //     component.set('v.searchedString', '');
            // }
            // var selectedCurrencies = component.get('v.selectedCurrencies');
            // if(!$A.util.isEmpty(selectedCurrencies)){
            //     component.set('v.selectedCurrencies', []);
            // } 
            helper.resetSearch(component, event, helper);
            // component.set('v.selectedPaymentStatusBox', statusBox)
            // helper.setFilterCounter(component, event, helper);
            component.set('v.applyIsClicked', true);
           helper.setFilterCounter(component, event, helper);
        }

    },
    //$Label.c.PAY_Status_PendingOne
    //$Label.c.PAY_Status_PendingTwo
    //$Label.c.PAY_Status_InReviewOne
    //$Label.c.PAY_Status_ScheduledOne
    //$Label.c.PAY_Status_CompletedOne
    //$Label.c.PAY_Status_RejectedOne
    setFilterCounter : function(component, event, helper){
        var selectedBox = component.get('v.selectedPaymentStatusBox');
        if(!$A.util.isEmpty(selectedBox)){
            if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_PendingOne")){
                component.set('v.filterCounter', 1);
            } else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_PendingTwo")){
                component.set('v.filterCounter', 1);
            }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_InReviewOne")){
                component.set('v.filterCounter', 1);
            }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_ScheduledOne")){
                component.set('v.filterCounter', 2);
            }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_CompletedOne")){
                component.set('v.filterCounter', 2);
            } else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_RejectedOne")){
                component.set('v.filterCounter', 2);
            }
        }
    },
    
    
    /*
	Author:        	Shahad Naji
    Company:        Deloitte
	Description:    Method to Fire 'searchOperationsListFired' event
    History
    <Date>			<Author>			<Description>
	26/07/2020		Shahad Naji   		Initial version  
    11/08/2020		Shahad Naji 		Set idType of an account with the value of 'BBA', when it is empty
    */
    applySearch : function(component, event, helper){
        if(component.get('v.applyIsClicked')){
            
            
            var globalUserId = null;   
            var pendingAuthorization = null;
            var latestOperationsFlag = false;
            var sourceAccountList = null;  
            var bankId = null;
            var alias = null;
            var idType = null;
            var accountId = null;
            var destinationCountry = null;
            var amountFrom = null;
            var amountTo = null;
            var currencyList = null;
            var paymentMethod = null;
            var statusList = null;
            var clientReference = null;
            var valueDateFrom = null;
            var valueDateTo = null;
            
            
            
            var isHeaderOptionSelected = component.get('v.isHeaderOptionSelected');
            var isPendingAuthorization = component.get('v.pendingOfMyAuthorization');
            if(isHeaderOptionSelected){             
                
                var selectedBox = component.get('v.selectedPaymentStatusBox');
                if(!$A.util.isEmpty(selectedBox)){
                    
                    
                    if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_PendingOne")){
                        pendingAuthorization = isPendingAuthorization;
                        if(!$A.util.isEmpty(component.get('v.currentUser').globalId)){
                            
                            globalUserId = component.get('v.currentUser').globalId;
                        }
                    } else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_PendingTwo")){
                        pendingAuthorization = isPendingAuthorization;
                        if(!$A.util.isEmpty(component.get('v.currentUser').globalId)){
                           
                            globalUserId = component.get('v.currentUser').globalId;
                        }
                    }else if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_InReviewOne")){
                        console.log('In review');
                    }
                    
                    
                    if(selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_ScheduledOne")){
                        var d = [];
                        var aux_date = '';
                        var aux_month = '';
                        // Curent date
                        var currentDate = new Date();                        
                        var currentMonth = currentDate.getMonth()+1;                        
                        if(currentMonth < 10){
                            aux_month = '0'+String(currentMonth);
                        }else{
                            aux_month = String(currentMonth);
                        }
                        
                        
                        if(currentDate.getDate() < 10){
                            aux_date = '0'+String(currentDate.getDate());
                        }else{
                            aux_date = String(currentDate.getDate());
                        }
                        
                        var iToday = currentDate.getFullYear() + "-" + aux_month + "-" + aux_date;
                        d.push(iToday);
                        var toDate = new Date();
                        toDate.setDate(toDate.getDate() + 7);
                        var toMonth = toDate.getMonth()+1;
                        
                        if(toMonth < 10 ){
                            aux_month = '0'+String(toMonth);
                        }else{
                            aux_month = String(toMonth);
                        }
                        
                        if(toDate.getDate() < 10){
                            aux_date = '0'+String(toDate.getDate());
                        }else{
                            aux_date = String(toDate.getDate());
                        }
                        var nextWeek = toDate.getFullYear() + "-" + aux_month + "-" + aux_date;	
                        d.push(nextWeek);
                        
                        component.set('v.dates', d);
                    }else if((selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_CompletedOne")) || (selectedBox.parsedStatusDescription == $A.get("$Label.c.PAY_Status_RejectedOne"))){
                        var d = [];
                        var aux_date = '';
                        var aux_month = '';
                        // Curent date
                        var currentDate = new Date();
                        var currentMonth = currentDate.getMonth()+1;
                        if(currentMonth < 10){
                            aux_month = '0'+String(currentMonth);
                        }else{
                            aux_month = String(currentMonth);
                        }
                        
                         
                        if(currentDate.getDate() < 10){
                            aux_date = '0'+String(currentDate.getDate());
                        }else{
                            aux_date = String(currentDate.getDate());
                        }
                        
                        var iToday = currentDate.getFullYear() + "-" + aux_month + "-" + aux_date;
                        
                        var toDate = new Date();
                        toDate.setDate(toDate.getDate() - 7);
                        var toMonth = toDate.getMonth()+1;
                        
                        if(toMonth < 10 ){
                            aux_month = '0'+String(toMonth);
                        }else{
                            aux_month = String(toMonth);
                        }
                        
                        if(toDate.getDate() < 10){
                            aux_date = '0'+String(toDate.getDate());
                        }else{
                            aux_date = String(toDate.getDate());
                        }
                        var nextWeek = toDate.getFullYear() + "-" + aux_month + "-" + aux_date;	
                        d.push(nextWeek);
                        d.push(iToday);
                        component.set('v.dates', d);
                } 
            }
        }
           
        
            if(!$A.util.isEmpty(component.get('v.searchedString'))){
               
                clientReference =  component.get('v.searchedString');
            }
            if(!$A.util.isEmpty(component.get('v.selectedSourceAccount'))) {
            
                if(!$A.util.isEmpty(component.get('v.selectedSourceAccount'))) {
                    console.log('selected source account: ' + JSON.stringify(component.get('v.selectedSourceAccount'))); 
                } else {
                    console.log('no selected source account'); 
                }
                
                var account = component.get('v.selectedSourceAccount');
                
                sourceAccountList = [];
                bankId = account.codigoBic;
                alias = account.alias;
                idType = account.idType;
                accountId = account.displayNumber;  
                if($A.util.isEmpty(idType)){
                    idType = 'BBA';
                }
                if(!$A.util.isEmpty(accountId) && !$A.util.isEmpty(idType)){
                    sourceAccountList.push({
                        "sourceAccount" : {"accountId" : accountId, "accountType" : idType}
                    });
                    
                } 
            }
            if(!$A.util.isEmpty(component.get('v.fromDecimal'))){
             
              amountFrom = component.get('v.fromDecimal');
            }
            if(!$A.util.isEmpty(component.get('v.toDecimal'))){
              
                amountTo = component.get('v.toDecimal');
            }
            if(!$A.util.isEmpty(component.get('v.selectedCurrencies'))){
               
                var currencyArray = component.get('v.selectedCurrencies');
                currencyList = [];
                var i;
                for (i = 0; i < currencyArray.length; i++) {
                    
                    var item = currencyArray[i];
                    var includesLowBar = item.includes("_");
                    if(includesLowBar){
                        var res = item.split("_");
                        if(res.length == 2){
                            currencyList.push({
                                "tcurrency" : res[1]
                            });
                        }
                    }
                }
            }

            if(!$A.util.isEmpty(component.get('v.selectedStatuses'))){
                var statusArray = component.get('v.selectedStatuses');
                var availableStatuses = component.get('v.availableStatuses');
                statusList = [];
                var i;
                for (i = 0; i < statusArray.length; i++) {                    
                    var item = statusArray[i];
                    var includesLowBar = item.includes("_");
                    if(includesLowBar){
                        var res = item.split("_");
                        if(res.length == 2){
                            var statusCode = res[1];
                            var j;
                            for (j = 0; j < availableStatuses.length; j++) {
                                if (availableStatuses[j].status == statusCode) {
                                    statusList.push(availableStatuses[j]);
                                }
                            }
                        }
                    }
                }
            }
            if(!$A.util.isEmpty(component.get('v.selectedMethod'))){
               
                var method = component.get('v.selectedMethod');
                var includesLowBar = method.includes("_");
                if(includesLowBar){
                    var res = method.split("_");
                    if(res.length == 2){
                        paymentMethod = res[1]; 
                    }
                }
            }
            if(!$A.util.isEmpty(component.get('v.selectedCountry'))){
               
                var country =  component.get('v.selectedCountry');
                var includesLowBar = country.includes("_");
                if(includesLowBar){
                    var res = country.split("_");
                    if(res.length == 2){
                        destinationCountry = res[1]; 
                    }
                }
            }
            
            var dateLst = component.get('v.dates');
            if(dateLst != null){
                if(dateLst[0] != null && dateLst[0] != '' ){
                    valueDateFrom = dateLst[0];
                }
                
                if(dateLst[1] != null && dateLst[1] != ''){
                    valueDateTo = dateLst[1];
                }
            }
            component.set('v.pendingOfMyAuthorization', false);
            component.set('v.isHeaderOptionSelected', false);
            component.set('v.applyIsClicked', false);
            // var filterCounter = component.get('v.filterCounter');
            // if (filterCounter == 0) {
            //     component.set('v.resetSearch', true);
            // }
			var searchEvt = component.getEvent("searchOperationsListFired");// getting the Instance of event
            searchEvt.setParams({
                "globalUserId" : globalUserId,
                "pendingAuthorization" : pendingAuthorization,
                "latestOperationsFlag" : latestOperationsFlag,
                "sourceAccountList" : sourceAccountList,
                "destinationCountry" : destinationCountry,                
                "statusList" : statusList,
                "amountFrom" : amountFrom,
                "amountTo" : amountTo,
                "currencyList" :  currencyList,
                "paymentMethod" : paymentMethod,
                "clientReference" : clientReference,
                "valueDateFrom" : valueDateFrom,
                "valueDateTo" : valueDateTo
            });// setting the attribute of event
            searchEvt.fire();// firing the event.
        }
        
        
    },

    countFilters : function(component, event, helper) {
    
        var count = 0;
        component.set('v.filterCounter', count);
        
        var source = component.get('v.selectedSourceAccount');
        
        // var source = component.get('v.searchedSourceAccount');
        // var destination = component.get('v.searchedDestinationAccount');
        
        if(!$A.util.isEmpty(source)){
            count = count + 1;
            console.log('>>> Source account: '+ source);
        }
        
        var fromDecimal = component.get('v.fromDecimal');
        var toDecimal = component.get('v.toDecimal');
        
        if((fromDecimal != undefined && fromDecimal != null && fromDecimal != '') || (toDecimal != undefined && toDecimal != null && toDecimal != '')){
            count = count + 1;
            console.log('>>> From decimal: '+ fromDecimal);
            console.log('>>> To decimal: '+ toDecimal);
        }
        
        var selectedCurrencies = component.get('v.selectedCurrencies');
        
        if(selectedCurrencies != undefined && selectedCurrencies != null && selectedCurrencies.length > 0){
            count = count + 1;
            console.log('>>> Currencies: '+ selectedCurrencies);
        }
        
        var selectedStatuses = component.get('v.selectedStatuses');
        
        if(selectedStatuses != undefined && selectedStatuses != null && selectedStatuses.length > 0){
            count = count + 1;
            console.log('>>> Status: '+ selectedStatuses);
        }
        
        
        var selectedMethod = component.get('v.selectedMethod');
        
        if(selectedMethod != undefined && selectedMethod != null && selectedMethod != ''){
            count = count + 1;
            console.log('>>> Method: '+ selectedMethod);
        }
        
        // var clientReference = component.get('v.clientReference');
        var searchedString = component.get('v.searchedString');
        
        if(searchedString != undefined && searchedString != null && searchedString != ''){
            count = count + 1;
            console.log('>>> Client reference: '+ clientReference);
        }
        
        var selectedCountry = component.get('v.selectedCountry');
        
        if(selectedCountry != undefined && selectedCountry != null && selectedCountry != ''){
            count = count + 1;
            console.log('>>> Country: '+ selectedCountry);
        }

        var dates = component.get('v.dates');
        if(dates != undefined && dates != null && dates.length > 0){
            if(!$A.util.isEmpty(dates[0]) || !$A.util.isEmpty(dates[1])){
                count = count + 1;
                console.log('>>> from date: '+ dates[0]);
                console.log('>>> to date: '+ dates[1]);
            }            
        }
        component.set('v.filterCounter', count);
        
                
        
    },

    showToast: function (component, event, helper, title, body, functionType, functionClass, noReload) {
        var toast = component.find('toast');
        if (!$A.util.isEmpty(toast)) {
            //errorToast.showToast(action, static, notificationTitle, bodyText, functionTypeText, functionTypeClass, functionTypeClassIcon, noReload)
            toast.openToast(false, false, title,  body, functionType, functionClass, functionClass, noReload);
        }
    }
    


})