({
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the accounts
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getAccounts : function(component, event, helper){
        try {
            var action = component.get("c.getAccounts");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var res =response.getReturnValue();
                    if(res!=null && res!=undefined && res!=""){
                        console.log(res);
                        var resJSON =JSON.parse(res).accountsDataList;

                        var accounts=[];
                        for(var i in resJSON){
                            console.log(resJSON[i].bankId);

                            accounts.push({'account':resJSON[i].accountIdList[0].accountId,'bic':resJSON[i].bankId,'id_type':resJSON[i].accountIdList[0].idType,'alias':resJSON[i].alias});
                        }
                        component.set("v.accountList",accounts);
                        component.set("v.ready",true);
                        component.set("v.errorAccount",false);
                    }else{
                        component.set("v.ready",true);
                        component.set("v.errorAccount",true);
                    }
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        component.set("v.errorAccount",true);

                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                    errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });

            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the accounts and payments
    History
    <Date>			<Author>		    <Description>
    07/07/2020		Guillermo Giral     Initial version
    */

    getAccountsAndPayments : function(component, event, helper){
        component.find("service").callApex2(component, helper, "c.getAccountsAndPayments", {}, helper.setAccountsAndPayments);
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to set the accounts and payments
                    based on the webservice response
    History
    <Date>			<Author>		    <Description>
    07/07/2020		Guillermo Giral     Initial version
    */

    setAccountsAndPayments : function(component, helper, response){
        try {           
            if(response!=null && response!=undefined && response!=""){
                // Sets the accounts data
                //var resJSON =JSON.parse(response).accountsDataList;
                var resJSON = response.accountsDataList;
                var accounts=[];
                
                // Set GP and Payments Tracker permission     
                let userId = $A.get( "$SObjectType.CurrentUser.Id" );    
                window.localStorage.setItem(userId + "_hasGlobalPositionAccess", resJSON[0].canUserSeeGP);
                window.localStorage.setItem(userId + "_hasPaymentsTrackerAccess", resJSON[0].canUserSeePaymentsTracker);
                
                // If the user has access to see Payments Tracker
                //if(resJSON[0].canUserSeePaymentsTracker){
                    for(var i in resJSON){
                        if(resJSON[i].hasSwiftPayments != "false") {
                            accounts.push({'account':resJSON[i].accountIdList[0].accountId,'bic':resJSON[i].bankId,'id_type':resJSON[i].accountIdList[0].idType,'alias':resJSON[i].alias});
                        }
                        
                    }
                    component.set("v.accountList",accounts);
                    component.set("v.ready",true);
                    component.set("v.errorAccount",false);
    
                    // Sets the payments data
                    //component.find("paymentsTable").initTable(JSON.parse(response));
                    component.set("v.loading", false);
                    component.find("paymentsTable").initTable(response);  
                /*} else {
                    component.set("v.loading", false);
                	// Set access denied error
                	component.set("v.showNoAccessError", true);
                    component.set("v.showWelcome", false);
                }*/
            }else{
                component.set("v.ready",true);
                component.set("v.errorAccount",true);
                component.set("v.loading", false);
            }
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get if user agreed the welcome pack
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getCheckboxWelcomePack :  function (component, event){
        try {

            var action = component.get("c.getCheckboxWelcomePack");
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var iReturn = response.getReturnValue();
                    if(iReturn == false) {
                        component.set("v.showWelcome", true);
                    } else {
                        component.set("v.showWelcome", false);
                    }
                }
                else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action); 
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get if user is Cash Nexus user
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
    
    getIsCashNexus :  function (component, event){
        try{
            var action = component.get("c.getIsCashNexus");
        
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log("isCASHNE");
                console.log(state);
                if (state === "SUCCESS") {
                    var iReturn = response.getReturnValue();
                    console.log(iReturn);
                    for ( var key in iReturn ) {
                        if(key == "agreedTerms"){
                            component.set("v.agreedTerms", iReturn[key]);
                        }
                        if(key == "isCashNexusUser"){
                            component.set("v.isCashNexus", iReturn[key]);
                        }
                        if(key == "BIC"){
                            component.set("v.isBIC", iReturn[key]);
                        }
                        if(key == "ES"){
                            component.set("v.isES", iReturn[key]);
                        }
                        if(key == "PL"){
                            component.set("v.isPL", iReturn[key]);
                        }
                        if(key == "CL"){
                            component.set("v.isCL", iReturn[key]);
                        }
                        if(key == "GB"){
                            component.set("v.isGB", iReturn[key]);
                        }
                        if(key == "MX"){
                            component.set("v.isMX", iReturn[key]);
                        }
                       if(key == "PT"){
                            component.set("v.isPT", iReturn[key]);
                        }
                        if(key == "Other"){
                            component.set("v.isOther", iReturn[key]);
                        }
                        
                    }
                    
                    var gb = component.get("v.isGB");
                    var es = component.get("v.isES");
                    var pl = component.get("v.isPL");
                    var cl = component.get("v.isCL");
                    var mx = component.get("v.isMX");
                    var pt = component.get("v.isPT");
                    var other = component.get("v.isOther");
                    
                    if(gb == true) {
                        component.set("v.country", "GB");
                    } else if(es == true) {
                        component.set("v.country", "ES");
                        component.set("v.agreedTerms", true);
                    } else if(pl == true) {
                        component.set("v.country", "PL");
                    } else if(cl == true) {
                        component.set("v.country", "CL");
                    } else if(mx == true) {
                        component.set("v.country", "MX");
                    } else if(pt == true) {
                        component.set("v.country", "PT"); 
                        component.set("v.agreedTerms", true);                   
                    } else if(other == true) {
                        component.set("v.country", "Other");
                        component.set("v.agreedTerms", true);
                    } else if(component.get("v.isCashNexus") == false && component.get("v.isBIC") == false) {
                        component.set("v.agreedTerms", true);
                    }
                    
                    var nexus = component.get("v.isCashNexus");
                    var terms = component.get("v.agreedTerms");
                    var bic = component.get("v.isBIC");
                    
                    if(nexus == true && terms == false){
                        console.log("ENTROOK1");
                        component.set("v.showTerms", true);
                    }
                    
                    if(nexus == false && bic == true && terms == false) {
                        component.set("v.showTerms", true);
                    }
                }
                else {
                    var errors = response.getError();
                    console.log(errors);
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get user browser
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    checkBrowser: function (component,event,helper) {
        try{
            console.log("BROWSER")
            var browserType = navigator.sayswho= (function(){
                var ua= navigator.userAgent, tem,
                    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if(/trident/i.test(M[1])){
                    tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE '+(tem[1] || '');
                }
                if(M[1]=== 'Chrome'){
                    tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
                    if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
                }
                M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
                return M.join(' ');
            })();
            console.log(browserType);
            if (browserType.startsWith("IE")) {
                component.set("v.isIE", true);
            }else{
                component.set("v.isIE", false);
            }
            
        } catch (e) {
            console.log(e);
        }
    },

    /*
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to obtain the user uetr.
    History
    <Date>			<Author>		<Description>
    05/11/2020		Adrian Munio    Adrian Munio
    17/03/2021		Antonio Duarte	Promise version
    */
    getUserUETR : function(component, event, helper){
        return new Promise(function (resolve, reject) {
        	let userId = $A.get( "$SObjectType.CurrentUser.Id" );
            var action = component.get('c.getUserUETR');
            action.setParams({
                'userId': userId
            });
            action.setCallback(this, function (response) {
                var result = 'null';
                var state = response.getState();
                if (state === 'ERROR') {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error message: ' + errors[0].message);
                            reject(response.getError()[0]);
                        }
                    } else {
                        console.log('Unknown error');
                    }
                } else if (state === 'SUCCESS') {
                    result = response.getReturnValue();
                    if(result != undefined && result != null && result != ""){
                        component.find("service").redirect("payment-uetr-track", "c__comesFromTracker=true&c__uetr=" + result);
                    }
                }
                resolve(result);
            });
            $A.enqueueAction(action);
        });
    },
    

    /*
    Author:         Adrian Munio
    Company:        Deloitte
    Description:    Method to redirect the PT users that comes from SSO.
    History
    <Date>			<Author>		<Description>
    05/11/2020		Adrian Munio    Adrian Munio
    
    checkPTSSO : function(component, helper, response){
        //If the user country is Portugal and comes from SSO with and uetr cached we will redirect him to Search uetr screen.
        if(response != undefined && response != null && response != ""){
        	component.find("service").redirect("payment-uetr-track", "c__comesFromTracker=true&c__uetr=" + response);
        }
    },*/
    
    /*
    Author:       Shahad Naji
    Company:        Deloitte
    Description:    The method below parses and returns the parameters.
    History
    <Date>			<Author>		<Description>
    01/04/2020		Shahad Naji     Initial version
    */
    getURLParams : function(component,event,helper) {
        try{
            
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            var sPageURL;
            var iAccount = component.get("v.accountObj");
            
            if (sURLVariablesMain[0] == 'params') {
                this.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
                    var sURLVariables=sPageURL.split('&');

                    if(sURLVariables[0] != ""){
                        for ( var i = 0; i < sURLVariables.length; i++ ) {
                            sParameterName = sURLVariables[i].split('=');      
                            
                            if (sParameterName[0] === 'c__subsidiaryName') { 
                                sParameterName[1] === undefined ? 'Not found' : iAccount.accountName = sParameterName[1];
                            }else if (sParameterName[0] === 'c__alias') { 
                                sParameterName[1] === undefined ? 'Not found' : iAccount.accountAlias = sParameterName[1];
                            }else if (sParameterName[0] === 'c__bic') { 
                                sParameterName[1] === undefined ? 'Not found' : iAccount.bic = sParameterName[1];
                            }else if (sParameterName[0] === 'c__currentCurrency') { 
                                sParameterName[1] === undefined ? 'Not found' : iAccount.currency = sParameterName[1];
                            }else if (sParameterName[0] === 'c__accountNumber') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.accountNumber = sParameterName[1];
                            }else if (sParameterName[0] === 'c__idType') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.iIdType = sParameterName[1];
                            }else if (sParameterName[0] === 'c__source') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.iSource = sParameterName[1];
                            }else if (sParameterName[0] === 'c__updateHour') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.hourValue = sParameterName[1];
                            }else if (sParameterName[0] === 'c__date') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.dateValue = sParameterName[1];
                            }else if (sParameterName[0] === 'c__bank') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.bank = sParameterName[1];
                            }else if (sParameterName[0] === 'c__mainAmount') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.bookBalance = sParameterName[1];
                            }else if (sParameterName[0] === 'c__availableAmount') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.availableBalance = sParameterName[1];
                            }else if (sParameterName[0] === 'c__lastUpdate') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.lastUpdate = sParameterName[1];
                            }else if (sParameterName[0] === 'c__country') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.country = sParameterName[1];
                            }else if (sParameterName[0] === 'c__aliasBank') {
                                sParameterName[1] === undefined ? 'Not found' : iAccount.bankAlias = sParameterName[1];
							}
                            else if (sParameterName[0] === 'c__showFilters') {
                                // Payments Tracker for Nexus - When the user navigates from an account
                                sParameterName[1] == "true" ? component.set("v.showAccountPayment" , true) : component.set("v.showAccountPayment" , false);
                            }else if (sParameterName[0] === 'c__isOneTrade') {
                                sParameterName[1] == "true" ? component.set("v.isOneTrade" , true) : component.set("v.isOneTrade" , false);
                            } else if (sParameterName[0] === 'c__filters') {
                                sParameterName[1] === undefined ? 'Not found' : component.set("v.filters", sParameterName[1]);
							} else if (sParameterName[0] === 'c__fromDetail') {
                                sParameterName[1] == "true" ? component.set("v.fromDetail" , true) : component.set("v.fromDetail" , false);
                            } else if (sParameterName[0] === 'c__allAccounts') { 
                                sParameterName[1] === undefined ? 'Not found' : component.set("v.fullAccountList",sParameterName[1]);	
                            }
                        }
                        component.set('v.fromCashNexus', true);                   
    
                        component.set('v.accountObj', iAccount);     
                        if(component.get('v.accountObj').iSource == 'fromAccount'){
                            var accounts=[];
                            accounts.push({'account':iAccount.accountNumber,'bic': iAccount.bic,'id_type':iAccount.iIdType,'alias': iAccount.accountAlias});  
                            component.set("v.accountList",accounts);
                            component.set("v.ready",true);
                            component.set("v.errorAccount",false);
                            if(component.get("v.fromCashNexus")){
                                   let filters = {
                                                "searchData": 
                                                    {
                                                           "latestPaymentsFlag": "NO",
                                                        "_limit": "1000",
                                                        "_offset": "0",
                                                        "inOutIndicator": "OUT",
                                                        "originatorAccountList":[
                                                               {
                                                                   "bankId": iAccount.bic,
                                                                   "account":{
                                                                       "idType": iAccount.iIdType,
                                                                       "accountId": iAccount.accountNumber
                                                                   }
                                                               }
                                                           ]
                                                    }
                                                };
                                component.set("v.loading", false); 
                                component.set("v.filters", JSON.stringify(filters));
                            }
                        }
                        
                        if(component.get("v.fromDetail") == true) {
                            
                            var parsedAccounts = JSON.parse(component.get("v.fullAccountList"));

                            component.set("v.accountList", parsedAccounts);

                            console.log(component.get("v.accountList"));
                            console.log(component.get("v.errorAccount"));

                            component.set("v.loading", false);
                            
                            //for
                        }
                        
                    } else {
                        component.set("v.showAccountPayment", false);
                    }                                  
                });
            }else{
                component.set("v.showAccountPayment", false);
            }   
         
        } catch (e) {
            console.log(e);
        }
    },
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to decrypt data
    History
    <Date>			<Author>		<Description>
    19/11/2019		R. Alexander Cervino     Initial version*/

    decrypt : function(component, data){
        try {
            var result="null";
            var action = component.get("c.decryptData");
    
            action.setParams({ str : data }); 
            
            return new Promise(function (resolve, reject) {
                action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                        errors[0].message);
                                reject(response.getError()[0]);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                }
                    resolve(result);
                });
                $A.enqueueAction(action);
            });

        } catch(e) {
            console.error(e);
        }
    },

    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the accounts
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/

    getCurrency : function(component, event, helper){
        try {
            var action = component.get("c.getCurrencies");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var res =response.getReturnValue();
                    if(res!=null && res!=undefined && res!=""){
                       
                        component.set("v.currencyList",res);
                    }
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        component.set("v.errorAccount",true);

                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                    errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });

            $A.enqueueAction(action);

        } catch (e) {
            console.log(e);
        }
    }
    
    
})