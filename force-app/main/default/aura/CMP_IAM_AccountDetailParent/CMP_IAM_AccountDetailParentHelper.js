({
    //SNJ - 21/04/2020 - Toast/Notification messages
    // DO NOT DELETE the following 4 lines. They are hints to ensure labels are preloaded
    // $Label.c.successAliasBank
    // $Label.c.successAliasAccount
    // $Label.c.errorAliasAccount
    // $Label.c.errorAliasBank
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Gets the Url params from the
                    previous screen and updates the data
    History
    <Date>          <Author>              <Description>
    24/03/2020      Guillermo Giral       Initial version
    */
    getURLParams : function(component, event, helper) {
        var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
        component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);		
    },
    
    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Receives the decrypted params and
                    sets the screen data
    History
    <Date>          <Author>            <Description>
    10/01/2019      Joaquin Vera        Initial version
    02/04/2020		Shahad Naji			Adding Type id attribute
    15/04/2020		Shahad Naji			Adding codigoEmisora and codigoCuenta
    */
    handleParams : function (component, helper, response){
        if(response != "") {
            var sParameterName;
            var accountDetails = {};
            for(var i = 0; i < response.length ; i++) {
                sParameterName = response[i].split("="); 
                switch(sParameterName[0]) {
                    case("c__source"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.source", sParameterName[1]);
                        break;
                    case("c__subsidiaryName"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.accountName = sParameterName[1];
                        break;
                    case("c__accountNumber"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.accountNumber = sParameterName[1];
                        break;
                    case("c__bank"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.bank = sParameterName[1];
                        break;
                    case("c__mainAmount"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.bookBalance = sParameterName[1];
                        break;
                    case("c__availableAmount"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.availableBalance = sParameterName[1];
                        break;
                    case("c__currentCurrency"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.accountCurrency = sParameterName[1];
                        break;
                    case("c__alias"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.accountAlias = sParameterName[1];
                        break;
                    case("c__country"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.country = sParameterName[1];
                        break;
                    case("c__aliasBank"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.bankAlias = sParameterName[1];
                        break;
                    case("c__bic"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.bic = sParameterName[1];
                        break;
                    case("c__codigoEmisora"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoEmisora = sParameterName[1];
                        break;
                    case("c__codigoCuenta"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoCuenta = sParameterName[1];
                        break;
                    case("c__filters"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.filters = JSON.parse(sParameterName[1]);
                        break;
                    case("c__tabs"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.tabs = sParameterName[1];
                        break;
                    case("c__sourcePage"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.sourcePage = sParameterName[1];
                        break;
                    case("c__comesFrom"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.comesFrom = sParameterName[1];
                        break;
                    case("c__iRegister"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.iRegister = JSON.parse(sParameterName[1]);
                        break;
                    case("c__firstAccountCountryList"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.firstAccountCountryList = JSON.parse(sParameterName[1]);
                        break;
                    case("c__firstTAccountCountryList"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.firstTAccountCountryList = JSON.parse(sParameterName[1]);
                        break;
                    case("c__idType"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.idType = sParameterName[1];
                        break;
                    case("c__codigoBic"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoBic = sParameterName[1];
                        break;
                    case("c__accountGrouping"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.iSortSelected",sParameterName[1]);
                        break;
                     case("c__consolidationCurrency"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.iCurrency",sParameterName[1]);
                        break;
                    case("c__aliasEntidad"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.aliasEntidad = sParameterName[1];
                        break;
                    //AM - 28/09/2020 - Ebury Accounts
                    case("c__codigoCorporate"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoCorporate = sParameterName[1];
                        break;
                    case("c__dataProvider"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.dataProvider = sParameterName[1];
                        break;
                    case("c__associatedAccountList"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.associatedAccountList = JSON.parse(sParameterName[1]);
                        break;
                    //DA - 18/11/2020 - Account Detail Back Button
                    case("c__bookDate"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.bookDate = sParameterName[1];
                        break;
                    case("c__valueDate"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.valueDate = sParameterName[1];
                        break;
                    case("c__countryName"):
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.countryName = sParameterName[1];
                        break;
                    case("c__codigoCorporate"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.codigoCorporate = sParameterName[1];
						break;
					case("c__dataProvider"):
						sParameterName[1] === undefined ? 'Not found' : accountDetails.dataProvider = sParameterName[1];
						break;
                }
            }
            // Clean undefined values
            for(var key in Object.keys(accountDetails)){
                if(accountDetails[Object.keys(accountDetails)[key]] == "undefined"){
                    accountDetails[Object.keys(accountDetails)[key]] = "";
                }
            }
            component.set("v.accountDetails", accountDetails); 
            component.set("v.isLoading", false); 
        } 
    },
    
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to notify update error
    History
    <Date>			<Author>			<Description>
	24/08/2020		Guillermo Giral     Initial version
    */   
    updateErrorNotification : function (component, event, helper){
        var msg = $A.get("$Label.c.errorAliasAccount");
        component.set("v.msgToast", msg);
        component.set("v.typeToast", "error");
        component.set("v.showToast", true);
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to notify the update of Alias account or Alias bank
    History
    <Date>			<Author>			<Description>
	24/08/2020		Guillermo Giral     Initial version
    */   
    updateSuccessfullNotification : function (component, event, helper){
        var msg = $A.get("$Label.c.successAliasAccount");
        component.set("v.msgToast", msg);
        component.set("v.typeToast", "success");
        component.set("v.showToast", true);    
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to update Account Alias
    History
    <Date>			<Author>			    <Description>
    24/08/2020		Guillermo Giral         Initial version
    */    
    updateAccountAlias :function (component, helper, sourceId, aliasAccount){
        let accountDetails = component.get("v.accountDetails");
        let bankId = accountDetails.codigoBic;
        let idType = accountDetails.idType;
        let accountId = accountDetails.accountNumber;
        let aliasGts = aliasAccount;

        // Create the request body
        let requestBody = {
            "aliasData" : {
                "bankId" : bankId,
                "account" : {
                    "idType" : idType,
                    "accountId" : accountId
                },
                "aliasGTS" : aliasGts
            }
        };

        // Call the server-side action and make the callout to the update alias service
        let params = {
            "actionParameters" : JSON.stringify(requestBody),
            "newAlias" : aliasGts
        }
        component.find("Service").callApex2(component, helper, "c.updateOneTradeAlias", params , helper.setUpdatedAlias);
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method to set the Account Alias
    History
    <Date>			<Author>			<Description>
    24/08/2020		Guillermo Giral     Initial version
    */    
    setUpdatedAlias : function (component, helper, response){
        let isUpdated = Object.values(response)[0];
        if (isUpdated) {
            let newAlias = Object.keys(response)[0];
            let userId = $A.get("$SObjectType.CurrentUser.Id");
            component.set("v.accountDetails.accountAlias", newAlias);                   
            window.localStorage.removeItem(userId + '_' + 'balanceGP'); 
            window.localStorage.removeItem(userId + '_' + 'balanceTimestampGP');                        
            helper.updateSuccessfullNotification(component, event, helper);                    
        } else{  
            helper.updateErrorNotification(component, event, helper);                     
        }
        component.set("v.editingAliasAccount", false);
        component.set("v.isLoading", false);     
    }
})