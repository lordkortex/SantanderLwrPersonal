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
                    case("c__lastUpdate"):
                        sParameterName[1] === undefined ? 'Not found' : component.set("v.lastUpdate", sParameterName[1]);
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
                        sParameterName[1] === undefined ? 'Not found' : accountDetails.iIdType = sParameterName[1];
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
	Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to notify update error
    History
    <Date>			<Author>			<Description>
	21/04/2020		Shahad Naji     		Initial version
    */   
    updateErrorNotification : function (component, event, helper,sourceId){
        if(sourceId == 'saveAliasAccount'){
            var msg = $A.get("$Label.c.errorAliasAccount");
            component.set("v.msgToast", msg);
            component.set("v.typeToast", "error");
            component.set("v.showToast", true);
        }else if(sourceId == 'saveAliasBank'){
            var msg = $A.get("$Label.c.errorAliasBank");
            component.set("v.msgToast", msg);
            component.set("v.typeToast", "error");
            component.set("v.showToast", true);
        }
    },
    /*
	Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to notify the update of Alias account or Alias bank
    History
    <Date>			<Author>			<Description>
	21/04/2020		Shahad Naji     		Initial version
    */   
    updateSuccessfullNotification : function (component, event, helper,sourceId){
        if(sourceId == 'saveAliasAccount'){
            var msg = $A.get("$Label.c.successAliasAccount");
            component.set("v.msgToast", msg);
            component.set("v.typeToast", "success");
            component.set("v.showToast", true);
        }else if(sourceId == 'saveAliasBank'){
            var msg = $A.get("$Label.c.successAliasBank");
            component.set("v.msgToast", msg);
            component.set("v.typeToast", "success");
            component.set("v.showToast", true);
        }	       
    },
    /*
	Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to update Account Alias
    History
    <Date>			<Author>			<Description>
    20/04/2020		Shahad Naji     		Initial version
    21/05/2020      Shahad Naji         Store wheather Account Alias has been updated or not
    */    
    updateAccountAlias :function (component, helper,sourceId,aliasAccount){
        try{
            var userId = $A.get( "$SObjectType.CurrentUser.Id" );
            component.set("v.isLoading", true);
            var codigoCuenta = component.get('v.accountDetails.codigoCuenta');
            var nombreUsuario = component.get("v.personalSettings.nombreUsuario");
            if((codigoCuenta != null && codigoCuenta != undefined && codigoCuenta != '')
                    && (nombreUsuario != null && nombreUsuario != undefined && nombreUsuario != '')){

            
                var params = {};
                params.uid = '';//component.get("v.personalSettings.UIDModificacion");
                params.cod_subproducto = '26';
                params.nombre_cdemgr =  component.get("v.personalSettings.nombreUsuario").trim();
                params.lista_alias_cuenta_perfilada = [];
                var alias_cuenta_perfilada_aux = {};
                alias_cuenta_perfilada_aux.codigo_cuenta = codigoCuenta;
                alias_cuenta_perfilada_aux.alias_cuenta_perfilada_desc = aliasAccount;
        
                var alias_cuenta_perfilada = {
                    alias_cuenta_perfilada : alias_cuenta_perfilada_aux
                };
                
                params.lista_alias_cuenta_perfilada.push(alias_cuenta_perfilada);
                
                
                var action = component.get("c.updateAliasAccount");
                action.setParams({
                    "actionParameters" : JSON.stringify(params)
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    
                    if (state === "SUCCESS") {
                        var res = response.getReturnValue(); 
                        if(res == true){
                            component.set("v.accountDetails.accountAlias", aliasAccount);
                            component.set("v.editingAliasAccount", false);
                            component.set("v.isLoading", false);                        
                            window.localStorage.removeItem(userId + '_' + 'balanceGP'); 
                            window.localStorage.removeItem(userId + '_' + 'balanceTimestampGP');
                            window.localStorage.removeItem(userId + '_' + 'balanceEODGP'); 
                            window.localStorage.removeItem(userId + '_' + 'balanceEODTimestampGP');                         
                            this.updateSuccessfullNotification(component,event, helper,sourceId);                    
                        }else{
                            
                            component.set("v.editingAliasAccount", false);
                            component.set("v.isLoading", false);
                            this.updateErrorNotification(component,event, helper,sourceId);                     
                        }
                        
                    }
                    else{
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                                component.set("v.editingAliasAccount", false);
                                component.set("v.isLoading", false);
                                this.updateErrorNotification(component,event, helper,sourceId);
                            }
                        } else {
                            console.log("Unknown error");
                            component.set("v.editingAliasAccount", false);
                            component.set("v.isLoading", false);
                            this.updateErrorNotification(component, event,helper,sourceId);
                        }
                    }
                });
                $A.enqueueAction(action);
            
            }else{
                console.log("Unknown error");
                component.set("v.editingAliasAccount", false);
                component.set("v.isLoading", false);
                this.updateErrorNotification(component, event,helper,sourceId);
            }   
        }catch(e){
            console.log("CMP_Account_Transactions_AccountDetails / updateAccountAlias : " + e);
        }

    },   
    /*
	Author:         Shahad Naji
    Company:        Deloitte
    Description:    Method to update Bank Alias
    History
    <Date>			<Author>			<Description>
	20/04/2020		Shahad Naji     		Initial version
    */    
    updateBankAlias :function (component, helper,sourceId,bankAlias){
        try{
            component.set("v.isLoading", true);
            
            var codigoEmisora =  component.get('v.accountDetails.codigoEmisora');
           
            
            var params = {};
            params.uid = '';//component.get("v.personalSettings.UIDModificacion");
            params.cod_subproducto = '26';
            //params.nombre_cdemgr = component.get("v.personalSettings.nombreCliente").trim();
            params.nombre_cdemgr = component.get("v.personalSettings.nombreCliente");
            params.lista_aliasbancos = [];
            
            var alias_banco_aux = {};
            alias_banco_aux.cod_emisora=codigoEmisora;
            alias_banco_aux.alias = bankAlias;
            //alias_banco.pais = '';
            var alias_banco = {
                alias_banco : alias_banco_aux
            };
            params.lista_aliasbancos.push(alias_banco);
            
            
            var action = component.get("c.updateAliasBank");
            
            action.setParams({
                "actionParameters" : JSON.stringify(params)
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                
                if (state === "SUCCESS") {
                    var res = response.getReturnValue(); 
                    if(res == true){
                        component.set("v.accountDetails.aliasEntidad", bankAlias);
                        component.set("v.editingAliasBank", false);
                        component.set("v.isLoading", false);
                        this.updateSuccessfullNotification(component,event, helper,sourceId);
                    }else{
                        component.set("v.editingAliasBank", false);
                        component.set("v.isLoading", false);
                        this.updateErrorNotification(component, event,helper,sourceId);
                    }    
                }
                else{
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                            component.set("v.editingAliasBank", false);
                            component.set("v.isLoading", false);
                            this.updateErrorNotification(component, event,helper,sourceId);                         
                        }
                    } else {
                        console.log("Unknown error");
                        component.set("v.editingAliasBank", false);
                        component.set("v.isLoading", false);
                        this.updateErrorNotification(component,event, helper,sourceId);                  
                    }
                }
            });
            $A.enqueueAction(action);
            
            
        }catch(e){
            console.log("CMP_Account_Transactions_AccountDetails / updateBankAlias : " + e);
        }
    },  
    
    /*
	Author:         R. Cervino
    Company:        Deloitte
    Description:    Method to get the personal setting information
    History
    <Date>			<Author>			<Description>
	06/04/2020		R. Cervino     		Initial version
    20/04/2020		Shahad Naji			Setting response value in personalSetting attribute
    */   
    getPersonalSettingsInfo : function (component, event, helper){
        try{
            
            var action = component.get("c.getPersonalSettings");                
            action.setCallback(this, function(response) {
                var state = response.getState();
                console.log(state);
                if (state === "SUCCESS") {
                    var res = response.getReturnValue();                     
                    component.set("v.personalSettings", res.personalsettings);     
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
            
        }catch(e){
            console.log("CMP_Account_Transactions_AccountDetails / getPersonalSettingsInfo : " + e);
        }
    }
})