({
    /*
    Author:       	Guillermo Giral
    Company:        Deloitte
    Description:    Method to get the accounts
    History
    <Date>			<Author>			<Description>
    11/09/2020		Guillermo Giral     Initial version
    */
    isOneTrade : function(component, helper, response){
        try{
            // If the user is NOT One Trade, then it IS tracker
            let userId = $A.get( "$SObjectType.CurrentUser.Id" );
            let hasGlobalPositionAccess = window.localStorage.getItem(userId + "_hasGlobalPositionAccess") != false && window.localStorage.getItem(userId + "_hasGlobalPositionAccess") != "false" ? true: false;
            /*if(response == false && window.sessionStorage.getItem(userId + "_firstAccess") == undefined){
                window.sessionStorage.setItem(userId + "_firstAccess", true);
                component.find("Service").redirect("international-payments-tracker", "");             
            } else */
            if(hasGlobalPositionAccess){
                helper.getIsCashNexus(component, event);
                helper.handleDoInit(component, event, helper);
            } else {
                component.set("v.showNoAccessError", true);
            }
        } catch (e) {
            console.log(e);
        }   
    },
    
    //SNJ - 23/04/2020 - Toast/Notification messages
    // DO NOT DELETE the following lines. They are hints to ensure labels are preloaded
    // $Label.c.ERROR_NOT_RETRIEVED
    handleDoInit : function(component, event, helper) {
        component.set("v.loadingUserInfo", true);
        component.set("v.loadingData", true);
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        
        var storageBalance = window.localStorage.getItem(userId + '_' + 'balanceGP');
        var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceTimestampGP');
        var sessionCheck = window.sessionStorage.getItem(userId + '_' + 'loadingScreenCheck');
        
        //Check if we have the variable on the session cache, to show or not the first time welcome loading.
        //if(storageBalance != undefined || storageBalanceEOD != undefined){
        if(sessionCheck != undefined && sessionCheck != null){
            component.set("v.firstTimeLoading", false);
        }else{
            component.set("v.firstTimeLoading", true);
            window.sessionStorage.setItem(userId + '_' + 'loadingScreenCheck', true);
        }
        
        //Check if its LU or EOD, if we have cache of them we decrypt it and if not we call the service.
        if(storageBalance != 'null' && storageBalance != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 ){
            helper.decryptInitialData(component, event, helper,  storageBalance);
        }else{
            component.find("Service").callApex2(component,helper,"c.retrieveIAMData", {isEndOfDay: false, globalId: userId}, helper.handleInitialData);
        }
    },
    
    /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to encrypt data
    History
    <Date>			<Author>		<Description>
    21/05/2020		R. Alexander Cervino     Initial version*/
    
    encryptInitialData : function(component, helper,data){
        try{
            var result="null";
            var action = component.get("c.encryptData");
            action.setParams({ str : JSON.stringify(data)});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
                    if(result!='null' && result!=undefined && result!=null){
                        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
                        window.localStorage.setItem(userId + '_' + 'balanceGP', result);
                        window.localStorage.setItem(userId + '_' + 'balanceTimestampGP', new Date());
                    }
                }
            });
            $A.enqueueAction(action);
        } catch (e) { 
            console.log(e);
        }
    },
    
    setData : function(component, helper, response) {   
        var UserInfo = {};
        UserInfo.firstName = response;
        var label = $A.get("$Label.c.GlobalPositionTItle").replace('{}',response);
        component.set("v.UserInfo", UserInfo);
        component.set("v.title", label);
        component.set("v.loadingUserInfo", false);
    },
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to set the data retrieved from the web service 
    History
    <Date>			<Author>		    <Description>
    10/07/2020		Guillermo Giral     Initial version
    */
    handleInitialData : function(component, helper, response, decrypt) {
        if(response && !response.isOneTrade)
        {
            component.find("Service").callApex2(component,helper,"c.retrieveIAMData", {isEndOfDay: false, globalId: $A.get( "$SObjectType.CurrentUser.Id" )}, helper.handleInitialData);
        } else
        {
            component.set("v.loadingData", true);
        if(response != null && response.is403Error)
        {
            component.set("v.showError403", true);
            component.set("v.loadingData", false);
            component.set("v.dataIsLoaded", false);            
            component.set("v.firstTimeLoading", false);
            component.set("v.loadingUserInfo", false);
        }
        else
        {
            var emptyList = [];
            var emptyMap = {};
            var emptyString = "";
            var userId = $A.get( "$SObjectType.CurrentUser.Id" );
            component.set("v.avaibleBookBalance", emptyString);
            component.set("v.totalBookBalance", emptyString);
            component.set("v.currencyList",emptyList);
            // component.set("v.selectedCurrency", emptyString);
            component.set("v.mainCurrency", emptyString);
            //component.set("v.mainCurrencyUser", emptyString);
            component.set("v.currenciesExchange", []);
            component.set("v.totalBookBalanceMapped", emptyMap);
            component.set("v.availableBookBalanceMapped", emptyMap);
            component.set("v.ExchangeRates", emptyMap);
            component.set("v.eRatesLastModifiedDate", emptyString);
            component.set("v.ExchangeRatesToShow", emptyList);
            component.set("v.countryGroupResponse", []);
            component.set("v.corporateGroupResponse", []);
            component.set("v.lastInfoDate", "");
            component.set("v.lastInfoHour", "");
            
            helper.setData(component, helper, response.userFirstName);
            
            
            if(response != null){
                if(decrypt!=true){
                    helper.encryptInitialData(component, helper, response);
                }
                
                //AM - 28/10/2020 - FIX INC726
                var userCurrency = window.localStorage.getItem(userId + "_actualCurrencyChange");
                if(userCurrency == undefined || userCurrency == null){
                    userCurrency =  $A.get("$Locale.currencyCode");
                }
                
                if(response.currenciesList != undefined && response.currenciesList != null && response.currenciesList.length > 0 ){
                    if(!response.currenciesList.includes(userCurrency)){                   
                        var userCurrency = 'EUR';
                    }
                }
                
                // Set Payments Tracker visibility in the cache
                window.localStorage.setItem(userId + "_hasPaymentsTrackerAccess",  response.canUserSeePaymentsTracker);
                window.localStorage.setItem(userId + "_hasGlobalPositionAccess",  response.canUserSeeGP);
                
                // Set the component attributes if the user has access to Global Position
                if(response.canUserSeeGP){
                    component.set("v.avaibleBookBalance", response.avaibleBookBalance);
                    component.set("v.totalBookBalance", response.totalBookBalance);
                    // component.set("v.countryGroupResponse", response.accountsByCountry);
                    // component.set("v.corporateGroupResponse", response.accountsByCorporate);
                    component.set("v.currencyList", response.currenciesList);
                    // component.set("v.selectedCurrency", response.divisaPrincipalUsuario);
                    component.set("v.selectedCurrency",userCurrency);
                    component.set("v.mainCurrency", response.divisaPrincipal);
                    //component.set("v.mainCurrencyUser", response.divisaPrincipalUsuario);
                    component.set("v.mainCurrencyUser", userCurrency);
                    component.set("v.currenciesExchange", response.cambioDivisas);
                    component.set("v.totalBookBalanceMapped", response.bookBalanceMapped);
                    component.set("v.availableBookBalanceMapped", response.avaibleBookBalanceMapped);
                    component.set("v.ExchangeRates", response.tiposDeCambio);
                    component.set("v.eRatesLastModifiedDate", response.eRatesLastModifiedDate);
                    component.set("v.eRatesLastModifiedDateMain", response.eRatesLastModifiedDateMain);
                    component.set("v.ExchangeRatesToShow", response.tiposDeCambio[response.divisaPrincipal]);
                    // Set the preferred user date and number
                    component.set("v.userPreferredDateFormat", response.mapUserFormats.dateFormat != '' ? response.mapUserFormats.dateFormat : "dd/MM/yyyy");
                    component.set("v.userPreferredNumberFormat", response.mapUserFormats.numberFormat != '' ? response.mapUserFormats.numberFormat : "###.###.###,##");
                    
                    if(response.headerLastModifiedDate != null){
                        component.set("v.headerLastModifiedDate", response.headerLastModifiedDate);
                        var aux = response.headerLastModifiedDate.split(" ");
                        // component.set("v.lastInfoDate", aux[0]+'T'+aux[1]+'.000Z');
                        component.set("v.lastInfoDate", response.headerLastModifiedDateMain);
                        component.set("v.lastInfoHour", $A.localizationService.formatTime(response.headerLastModifiedDate, 'HH:mm')); 
                    }
                    
                    //Check to update the currencies if its not the first time we open the Global Position Tab.
                    var storageBalance = window.localStorage.getItem(userId + '_' + 'balanceGP');
                    if(storageBalance != undefined){
                        helper.updateCurrencies(component, helper);                
                    }
                    
                    component.set("v.dataIsLoaded", true);
                    
                    
                    // Order country by country code
                    response.accountsByCountry.sort(function(a,b){
                        const countryA = a.countryCode;
                        const countryB = b.countryCode;
                        if(countryA < countryB){
                            return -1;
                        } else if(countryA > countryB){
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    
                    // Order corporate by name
                    response.accountsByCorporate.sort(function(a,b){
                        const corporateA = a.corporateName;
                        const corporateB = b.corporateName;
                        if(corporateA < corporateB){
                            return -1;
                        } else if(corporateA > corporateB){
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    
                    
                    component.set("v.countryGroupResponse", response.accountsByCountry);
                    component.set("v.corporateGroupResponse", response.accountsByCorporate);
                } else {
                    component.set("v.countryGroupResponse", {});
                    component.set("v.corporateGroupResponse", {});
                    component.set("v.avaibleBookBalance", 0.0);
                    component.set("v.totalBookBalance", 0.0);
                    component.set("v.totalBookBalanceMapped", {});
                    component.set("v.availableBookBalanceMapped", {});
                    component.set("v.showNoAccessError", true);
                }
                
                component.set("v.loadingData", false);  
            }else{
                
                component.set("v.loadingData", false);
                var msg = $A.get("$Label.c.ERROR_NOT_RETRIEVED");
                component.set("v.showToast", true);
                component.set("v.msgToast", msg);
                component.set("v.typeToast", "error");
                component.set("v.toBeHiddenToast", false);
                component.set("v.dataIsLoaded", true);
            }
        }
        
        
        
        
        
        }
    },
    
    /*Author:      Shahad Naji
    Company:        Deloitte
    Description:    Method to notify an error
    History
    <Date>			<Author>		<Description>
    23/04/2020		Shahad Naji    Initial version
    */
    notifyLoadingError : function(component){
        var msg = $A.get("$Label.c.ERROR_NOT_RETRIEVED");
        component.set("v.showToast", true);
        component.set("v.msgToast", msg);
        component.set("v.typeToast", "error");
        component.set("v.toBeHiddenToast", false);
    },
    updateUserCurrency : function(component,  helper) {
        try{
            if(component.get("v.selectedCurrency") != undefined){
                
                
                var action = component.get("c.setUserCurrency");  
                action.setParams({
                    "currencyStr" : component.get("v.selectedCurrency")
                });              
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue(); 
                        
                        this.updateCurrencies(component, helper);    
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
            }   
        }catch(e){
            console.log("CMP_GlobalPosition / updateCurrencies : " + e);
        }
    },
    updateCurrencies : function(component, helper) 
    {
        
        if(component.get("v.mainCurrency") != undefined)
        {
            var selectedCurrency = component.get("v.selectedCurrency");
            
            component.set("v.avaibleBookBalance", component.get("v.availableBookBalanceMapped")[component.get("v.selectedCurrency")]);
            component.set("v.totalBookBalance", component.get("v.totalBookBalanceMapped")[component.get("v.selectedCurrency")]);
            
            var elementList = [];
            component.get("v.countryGroupResponse").forEach((element) => {
                element.availableBalance = element.avaibleBalanceMapped[component.get("v.selectedCurrency")];
                element.totalBalance = element.bookBalanceMapped[component.get("v.selectedCurrency")];
                elementList.push(element);
            });
                component.set("v.countryGroupResponse", elementList);
                
                elementList = [];
                component.get("v.corporateGroupResponse").forEach((element) => {
                element.availableBalance = element.avaibleBalanceMapped[component.get("v.selectedCurrency")];
                element.totalBalance = element.bookBalanceMapped[component.get("v.selectedCurrency")];
                elementList.push(element);
            });
                component.set("v.corporateGroupResponse", elementList);
                
                component.set("v.ExchangeRatesToShow", component.get("v.ExchangeRates")[component.get("v.selectedCurrency")]);
            }
                
            },
                
                getIsCashNexus :  function (component, event){
                    try{
                        var action = component.get("c.getIsCashNexus");
                        
                        action.setCallback(this, function(response) {
                            var state = response.getState();
                            if (state === "SUCCESS") {
                                var iReturn = response.getReturnValue();
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
                                    if(key == "GB"){
                                        component.set("v.isGB", iReturn[key]);
                                    }
                                    if(key == "Other"){
                                        component.set("v.isOther", iReturn[key]);
                                    }
                                }
                                
                                var gb = component.get("v.isGB");
                                var es = component.get("v.isES");
                                var pl = component.get("v.isPL");
                                var other = component.get("v.isOther");
                                
                                if(gb == true) {
                                    component.set("v.country", "GB");
                                } else if(es == true) {
                                    component.set("v.country", "ES");
                                } else if(other == true) {
                                    component.set("v.country", "Other");
                                }else if(pl == true) {
                                    component.set("v.country", "PL");
                                }
                                
                                var nexus = component.get("v.isCashNexus");
                                var terms = component.get("v.agreedTerms");
                                var bic = component.get("v.isBIC");
                                
                                if(nexus == true && terms == false){
                                    component.set("v.showTerms", true);
                                }
                                
                                if(nexus == false && bic == true && terms == false && pl == true) {
                                    component.set("v.showTerms", true);
                                }
                            }
                            else {
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
                } , 
                /*Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get user browser
    History
    <Date>			<Author>		<Description>
    17/03/2020		R. Alexander Cervino     Initial version*/
                
                checkBrowser: function (component,event,helper) {
                    try{
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
                        if (browserType.startsWith("IE")) {
                            component.set("v.isIE", true);
                        }else{
                            component.set("v.isIE", false);
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
    21/05/2020		R. Alexander Cervino     Initial version*/
                
                decryptInitialData : function(component ,event, helper,data){
                    try {
                        var result="null";
                        var action = component.get("c.decryptData");
                        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
                        
                        action.setParams({ str : data }); 
                        
                        action.setCallback(this, function(response) {
                            var state = response.getState();
                            if (state === "ERROR") {
                                var errors = response.getError();
                                if (errors) {
                                    if (errors[0] && errors[0].message) {
                                        console.log("Error message: " + 
                                                    errors[0].message);
                                        component.find("Service").callApex2(component,helper,"c.retrieveIAMData", {isEndOfDay: false, globalId: userId}, helper.handleInitialData); 
                                    }
                                } else {
                                    console.log("Unknown error");
                                }
                            }else if (state === "SUCCESS") {
                                result = response.getReturnValue();
                                
                                if(result!=null && result !=undefined && result!='null'){
                                    
                                    result = JSON.parse(result); 
                                    if(result.responseGP != undefined && result.responseGP != null){
                                        result = result.responseGP;
                                    }
                                    
                                    helper.handleInitialData(component, helper, result,true);
                                }else{
                                    component.find("Service").callApex2(component,helper,"c.retrieveIAMData", {isEndOfDay: false, globalId: userId}, helper.handleInitialData); 
                                }
                            }
                        });
                        $A.enqueueAction(action);
                    } catch(e) {
                        console.error(e);
                    }
                }
                
                
                
            })