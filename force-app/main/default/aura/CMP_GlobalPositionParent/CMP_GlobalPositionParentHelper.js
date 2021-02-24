({

    //SNJ - 23/04/2020 - Toast/Notification messages
    // DO NOT DELETE the following lines. They are hints to ensure labels are preloaded
    // $Label.c.ERROR_NOT_RETRIEVED


    handleDoInit : function(component, event, helper) {
        component.set("v.loadingUserInfo", true);
        component.set("v.loadingData", true);
        //component.find("Service").callApex2(component,helper,"c.getUserInfo", {}, helper.setData);
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );

        var storageBalance = window.localStorage.getItem(userId + '_' + 'balanceGP');
        var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceTimestampGP');
        var storageBalanceEOD = window.localStorage.getItem(userId + '_' + 'balanceEODGP');
        var balanceTimestampGP = window.localStorage.getItem(userId + '_' + 'balanceEODTimestampGP');
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
        if(component.get("v.lastUpdateSelected")){
            if(storageBalance != 'null' && storageBalance != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 ){
                helper.decryptInitialData(component, event, helper,  storageBalance);
            }else{
                component.find("Service").callApex2(component,helper,"c.retrieveData", {isEndOfDay: !component.get("v.lastUpdateSelected"), globalId: userId}, helper.handleInitialData);
            }
        }else{
            if(storageBalanceEOD != 'null' && storageBalanceEOD != undefined && balanceTimestampGP != 'null' && balanceTimestampGP != undefined && (new Date() - new Date(Date.parse(balanceTimestampGP))) < parseInt($A.get('$Label.c.refreshBalanceCollout'))*60000 ){
                helper.decryptInitialData(component, event, helper,  storageBalanceEOD);
            }else{
                component.find("Service").callApex2(component,helper,"c.retrieveData", {isEndOfDay: !component.get("v.lastUpdateSelected"), globalId: userId}, helper.handleInitialData);
            }
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
                        if(component.get("v.lastUpdateSelected")){
                            window.localStorage.setItem(userId + '_' + 'balanceGP', result);
                            window.localStorage.setItem(userId + '_' + 'balanceTimestampGP', new Date());   
                        }else{
                            window.localStorage.setItem(userId + '_' + 'balanceEODGP', result);
                            window.localStorage.setItem(userId + '_' + 'balanceEODTimestampGP', new Date());
                        }
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
    Description:    Function to update only the relevant data
                    when Last Update / End of Day is clicked
    History
    <Date>			<Author>			<Description>
    19/04/2020		Guillermo Giral   	Initial version
    */
    handleUpdateData : function(component, event, helper){
        helper.handleDoInit(component, event, helper);      
    },

    setData : function(component, helper, response) {   
        var UserInfo = {};
        UserInfo.FirstName = response;
        var label = $A.get("$Label.c.GlobalPositionTItle").replace('{}',response);
        component.set("v.UserInfo", UserInfo);
        component.set("v.title", label);
        component.set("v.loadingUserInfo", false);
    },
    
    handleInitialData : function(component, helper, response,decrypt) {
        component.set("v.loadingData", true);
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
		//AB - 3/12/2020 - Error204 (No tiene cuentas perfiladas)
        if(response.is204Error){
            component.set("v.showError204", true);
            component.set("v.loadingData", false);
            component.set("v.dataIsLoaded", false);            
            component.set("v.firstTimeLoading", false);
            component.set("v.loadingUserInfo", false);
        //AB - 10/12/2020 - Error401 (No tiene cuentas perfiladas)
        }else if(response.is401Error){
            component.set("v.showError401", true);
            component.set("v.loadingData", false);
            component.set("v.dataIsLoaded", false);            
            component.set("v.firstTimeLoading", false);
            component.set("v.loadingUserInfo", false);
        }else if(response != null){
            if(decrypt!=true){
                helper.encryptInitialData(component, helper, response);
            }
            
            //AM - 28/10/2020 - FIX INC726
            var userCurrency = window.localStorage.getItem(userId + "_actualCurrencyChange");
            if(userCurrency == undefined || userCurrency == null){
                userCurrency =  $A.get("$Locale.currencyCode");
            }
            
           if(response.currenciesList.length > 0 ){
                if(!response.currenciesList.includes(userCurrency)){                   
                    var userCurrency = 'EUR';
                }
            }
            
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
            var storageBalanceEOD = window.localStorage.getItem(userId + '_' + 'balanceEODGP');
            if(storageBalance != undefined || storageBalanceEOD != undefined){
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
                        if(key == "GB"){
                            component.set("v.isGB", iReturn[key]);
                        }
                        if(key == "Other"){
                            component.set("v.isOther", iReturn[key]);
                        }
                    }
                    
                    var gb = component.get("v.isGB");
                    var es = component.get("v.isES");
                    var other = component.get("v.isOther");
                    
                    if(gb == true) {
                        component.set("v.country", "GB");
                    } else if(es == true) {
                        component.set("v.country", "ES");
                    } else if(other == true) {
                        component.set("v.country", "Other");
                    }
                    
                    var nexus = component.get("v.isCashNexus");
                    var terms = component.get("v.agreedTerms");
                    var bic = component.get("v.isBIC");
                    
                    if(nexus == true && terms == false){
                        component.set("v.showTerms", true);
                    }
                    
                    if(nexus == false && bic == true && terms == false) {
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
                //helper.getIsCashNexus(component, event);
                //helper.handleDoInit(component, event, helper);
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
                        component.find("Service").callApex2(component,helper,"c.retrieveData", {isEndOfDay: !component.get("v.lastUpdateSelected"), globalId: userId}, helper.handleInitialData); 
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
                        component.find("Service").callApex2(component,helper,"c.retrieveData", {isEndOfDay: !component.get("v.lastUpdateSelected"), globalId: userId}, helper.handleInitialData); 
                    }
                }
                });
                $A.enqueueAction(action);
        } catch(e) {
            console.error(e);
        }
    }

    
 
})