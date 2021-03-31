({
	getURLParams : function(component, event, helper) {
		component.set("v.loadingUserInfo", true);		
		var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
		component.find("Service").dataDecryption(component,helper, sPageURLMain, this.handleParams);	
	},

	handleParams : function (component, helper, response){
		var userId = $A.get( "$SObjectType.CurrentUser.Id" );
		var sParameterName;
		if(response != "") {
			for(var i = 0; i < response.length ; i++) {
				sParameterName = response[i].split("="); 
				switch(sParameterName[0]) {
					case("c__groupName"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.groupName", sParameterName[1]);
						break;
					case("c__comesFrom"):
						if(sParameterName[1] != undefined) {
							if(sParameterName[1] == "Groups") {
								component.set("v.comesFromGroups", true);
							}
						}
						break;
					case("c__hasProfiling"):
						if(sParameterName[1] != undefined) {
							if(sParameterName[1] == "true") {
								console.log("es true");
								component.set("v.hasProfile", true);
							}
						}
						break;
					case("c__groupId"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.groupId",sParameterName[1]);
						break;
					case("c__groupAuth"):
						sParameterName[1] === undefined ? 'Not found' : component.set("v.groupAuth",sParameterName[1]);
						var paramsProfile = {
							"empGroupCod" : component.get("v.groupId"),
							"groupCod" : sParameterName[1]
						};
						component.find("Service").callApex2(component,helper, "c.profilingTable", paramsProfile, helper.setDataServices);
						break;
				}
			}
			console.log('llega service');
			component.find("Service").callApex2(component, helper,"c.entitlementData", {}, helper.getEntitlementData);
		}
	},
	
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to decrypt the URL params that is sended from the History movement component.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
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
        },
        
        /*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the data from the server
    History
    <Date>			<Author>			<Description>
	20/01/2020		Guillermo Giral     Initial version
	*/
	
	getServiceProfilingData : function(component, event, helper) {
		component.find("Service").callApex2(component, helper,"c.getServiceProfilingInfo", {}, this.populateServiceProfiling);
	},

	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to populate the tables with the data fetched from the server (pending + request auths)
    History
    <Date>			<Author>			<Description>
	20/01/2020		Guillermo Giral     Initial version
	*/
	
	populateServiceProfiling : function(component,helper,response){
		if(response){
			// Create dummy data to fill the table
			var accountList = response.accounts;
			var entitlementList = response.entitlements;
			var groupedData = [];
			var accEntData = [];
			for(var acc in accountList){
				var entitlements = [];
				var data = {};
				for(var ent in entitlementList){
					entitlements.push(entitlementList[ent]);
					data.entitlement = entitlements;
				}
				data.account = accountList[acc];
				accEntData.push(data);
			}
			
			// Prepare the data to call the method in CMP_GroupNewS2_ProfilingTable
			// It will build the table and displayed the grouped data
			var innerData = accEntData;
			var grouping = [];
			for(const [key,value] of Object.entries(response.countryMap)){
				grouping.push(value);
			}
			component.find("profilingTable").buildTable(innerData, grouping);
		}
	},

	getProfileData : function(component,event,helper) {
		var params = {
			"empGroupCod" : component.get("v.groupId"),
			"groupCod" : component.get("v.groupAuth")
		};
		var paramsUser = {
			"userCod" : component.get("v.userId")
		};
		if(component.get("v.comesFromGroups"))
		{
			component.find("Service").callApex2(component, helper, "c.getGroupProfile", params, this.setData);
		}
		if(component.get("v.comesFromUsers"))
		{
			component.find("Service").callApex2(component, helper, "c.getUserProfile", paramsUser, this.setData);
		}
	},

	setData : function(component, helper, response) {
        if(response){
			// Create dummy data to fill the table
			//var countryList = response.listaServicios[0].servicio.listaPais;
			var countryList = response.listaServicios.filter(dato=>dato.servicio.codServicio.includes('RE'))[0].servicio.listaPais;
			var accEntData = [];
			var countries = [];

			console.log(countryList);

			for(var i = 0; i < countryList.length; i++) {
				var accounts = [];
				countries.push(countryList[i].pais.codPais);

				var accountList = countryList[i].pais.listaCuentas;
				for(var j = 0; j < accountList.length; j++) {
					var entitlements = [];
					var data = {};
					accounts.push([accountList[j].cuentasArbol.codPais, accountList[j].cuentasArbol.codigoDivisa, accountList[j].cuentasArbol.cuentaExtracto, accountList[j].cuentasArbol.nombreCorporate].join(' - '));
					
					var entitlementList = accountList[j].cuentasArbol.permisosSubprod;
					for(var k = 0; k < entitlementList.length; k++) {
						entitlements.push(entitlementList[k].permisosSubprod.codPermiso);
						data.entitlement = entitlements;
					}

					data.account = accounts[j];
					accEntData.push(data);
				}
			}

			component.find("profilingTable").buildTable(accEntData, countries);
		}
	},
	
	setDataServices : function(component,helper,response){
		component.set("v.servicesList", response);
		component.set("v.loadingUserInfo", false);
	}
})