({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to get the URL params 
					sent from the previous window
    History
    <Date>			<Author>			<Description>
	31/01/2020		Guillermo Giral   	Initial version
	*/
    getURLParams : function(component,event,helper) {

        try{
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            
            var sPageURL;

            if (sURLVariablesMain[0] == 'params') {
                this.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;

                    var sURLVariables=sPageURL.split('&');
                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                        sParameterName = sURLVariables[i].split('=');      
                        if (sParameterName[0] === 'c__userId') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.urlParams.userId",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__userName') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.urlParams.userName",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__userRol') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.urlParams.userRol",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__userGroup') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.urlParams.userGroup",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__comesFrom') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.urlParams.source",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__serviceName') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.urlParams.service",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__profileTree') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.profileTree", JSON.parse(sParameterName[1]));
                        }else if (sParameterName[0] === 'c__profile') { 
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.profile", JSON.parse(sParameterName[1]));
                        }
                    }
                });
            }

            // Get the admin profile from the cache
            //component.find("service").retrieveFromCache(component, helper, "profileInfo", helper.populateTranslationMaps);
            component.find("service").callApex2(component, helper, "c.getTranslationsMaps", {}, helper.populateTranslationMaps);
        } catch (e) {
            console.log(e);
        }
    },

    /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to the tranlsation maps (countries + entitlements)
    History
    <Date>			<Author>			<Description>
	08/06/2020		Guillermo Giral     Initial version
	*/
	
	populateTranslationMaps : function(component, helper, response){
        // Set the countries and entitlements translations maps
        component.set("v.countriesMap", response.countriesMap);
        component.set("v.entitlementsMap", response.entitlementsMap);
        // Get the admin profile from the cache
        component.find("service").retrieveFromCache(component, helper, "profileInfo", helper.populateServiceProfiling);
    },

	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the tables with the data fetched from the server (pending + request auths)
    History
    <Date>			<Author>			<Description>
	20/01/2020		Guillermo Giral     Initial version
	*/	
	populateServiceProfiling : function(component, helper, response){
        
        component.set("v.adminProfile", JSON.parse(response)); 
        let adminProfile = component.get("v.adminProfile");
        let profile = component.get("v.profile");
        let listaServicios = adminProfile.inicio.profiled.listadoServicios;

        // Variables to create the table and dropdowns
        let accounts = [];
        let entitlements = [];
        let countries = [];

		if(response){
            // Fill the table with the data
            for(let i = 0; i < listaServicios.length; i++){
                if(listaServicios[i].servicio.codServicio == "RE"){
                    let countryList = listaServicios[0].servicio.listaPais;
                    let accEntData = [];

                    for(let i = 0; i < countryList.length; i++) {
                        countries.push({
                            "value" : countryList[i].pais.codPais, 
                            "displayValue" : component.get("v.countriesMap")[countryList[i].pais.codPais]
                        });
        
                        let accountList = countryList[i].pais.listaCuentas;
                        let entitlementCodes = [];
                        entitlements.forEach(ent => {
                            entitlementCodes.push(ent.value);
                        });
                        for(let j = 0; j < accountList.length; j++) {
                            let data = {};
                            //accounts.push([accountList[j].cuentasArbol.codPais, accountList[j].cuentasArbol.codigoDivisa, accountList[j].cuentasArbol.cuentaExtracto, accountList[j].cuentasArbol.nombreCorporate].join(' - '));
                            accounts.push({
                                "value" : accountList[j].cuentasArbol.codigoCuenta.toString(),
                                "displayValue" : accountList[j].cuentasArbol.cuentaExtracto,
                                "countryCode" : accountList[j].cuentasArbol.codPais
                            });
        
                            // Iterate over each account to get its permissions (entitlements)
                            var entitlementList = accountList[j].cuentasArbol.permisosSubprod;
                            for(let k = 0; k < entitlementList.length; k++) {
                                if(!entitlementCodes.includes(entitlementList[k].permisosSubprod.codPermiso)){
                                    let entitlementsMap = component.get("v.entitlementsMap");
                                    entitlements.push({
                                        "value" : entitlementList[k].permisosSubprod.codPermiso,
                                        "displayValue" : entitlementsMap[entitlementList[k].permisosSubprod.codPermiso]
                                    });
                                    entitlementCodes.push(entitlementList[k].permisosSubprod.codPermiso);
                                    data.entitlement = entitlements;
                                }
                            }
        
                            data.account = accounts[j];
                            accEntData.push(data);
                        }
                    }
                }
            }

            //component.find("profilingTable").buildTable(accEntData, countries);
            
            // Initialize the dropdown filters data
            component.find("profilingFilter").populateDropdownData(accounts, entitlements, countries);
            component.set("v.countries", countries);
            component.set("v.accounts", accounts);
			component.set("v.defaultAccounts", accounts);
            component.set("v.entitlements", entitlements);
			component.set("v.defaultEntitlements", entitlements);
		}
    },
    
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
	Description:    Function to decrypt the URL params that are sent
					from the previous screen
    History
    <Date>			<Author>			<Description>
	31/01/2020		Guillermo Giral   	Initial version
	*/
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
    }	
})