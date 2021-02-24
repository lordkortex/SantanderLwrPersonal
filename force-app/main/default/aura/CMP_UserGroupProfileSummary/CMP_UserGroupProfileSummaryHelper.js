({
		getURLParams : function(component,event,helper) {

			try{
				console.log('entra en el try');
				var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
				var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
				var sParameterName;
				
				var sPageURL;
	
				if (sURLVariablesMain[0] == 'params') {
					this.decrypt(component,sURLVariablesMain[1]).then(function(results){
						sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;
	
						var sURLVariables=sPageURL.split('&');
	
						for ( var i = 0; i < sURLVariables.length; i++ ) {
							console.log(sURLVariables[i]);
							sParameterName = sURLVariables[i].split('=');
							if (sParameterName[0] === 'c__userId') { 
								sParameterName[1] === undefined ? 'Not found' : component.set("v.userId",sParameterName[1]);
							}else if (sParameterName[0] === 'c__userName') { 
								sParameterName[1] === undefined ? 'Not found' : component.set("v.userName",sParameterName[1]);
							}else if (sParameterName[0] === 'c__userRol') { 
								sParameterName[1] === undefined ? 'Not found' : component.set("v.rolName",sParameterName[1]);
							}else if (sParameterName[0] === 'c__userGroup') { 
								sParameterName[1] == "undefined" ? 'Not found' : component.set("v.groupName",sParameterName[1]);
							}
							else if (sParameterName[0] === 'c__hasData') {
								if(sParameterName[1] != undefined) {
									if(sParameterName[1] == "true") {
										component.set("v.hasProfile", true);
									} else if(sParameterName[1] == "false") {
										component.set("v.hasProfile", false);
									}
									
								}
							}
							
							else if (sParameterName[0] === 'c__comesFrom') { 
								if(sParameterName[1] != undefined && sParameterName[1] != null) {

									component.set("v.comesFrom", sParameterName[1]);

									switch(sParameterName[1]) {
										case "Groups":
											component.set("v.comesFromGroups", true);
											component.set("v.comesFromUsers", false);
											break;

										case "Users":
											component.set("v.comesFromGroups", false);
											component.set("v.comesFromUsers", true);
											break;

										case "Profile-User":
											component.set("v.comesFromGroups", false);
											component.set("v.comesFromUsers", true);
											break;

										case "Profile-Group":
											component.set("v.comesFromGroups", true);
											component.set("v.comesFromUsers", false);
											break;
                                            
                                        case "Authorizations-User":
											component.set("v.comesFromGroups", false);
											component.set("v.comesFromUsers", true);
											break;
                                            
                                        case "Authorizations-Group":
											component.set("v.comesFromGroups", true);
											component.set("v.comesFromUsers", false);
											break;
									}

									if(sParameterName[1] == "UserList") {
										component.set("v.breadCrumbs", ["GroupNewConfigProfiling_Profile", "Users", "UserGroupProfileSummary"]);
										component.set("v.comesFromUsers", true);	
									} if(sParameterName[1] == "Groups") {
										component.set("v.comesFromGroups", true);
										component.set("v.comesFromUsers", false);
									}
								}

							}

						} 
						//component.set("v.ready",true);
						console.log('llega service');
						
					});
					
					
				}
				console.log(component.get("v.hasProfile"));
				console.log("oleeeeee");
				if(component.get("v.hasProfile")) {
					console.log("entra");
					helper.getServiceProfilingData(component, event, helper);
				}
				
			} catch (e) {
			    console.log('entra en el catch');
				console.log(e);
			}
			
			
		},
				/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get data about entitlement
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
	getEntitlementData : function(component,helper,response) {
		console.log('llega a entitlementData');
		console.log(response);
		if(response){
			console.log('entra a la respuesta');
			// Set data
			component.set("v.countries", response.countries);
			component.set("v.countriesMap", response.countryMap);
			component.set("v.accounts", response.accounts);
			component.set("v.entitlements", response.entitlements);

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
			var countriesMap = component.get("v.countriesMap");
			for(const [key,value] of Object.entries(countriesMap)){
				grouping.push(value);
			}
			console.log(JSON.stringify(grouping));
			console.log(JSON.stringify(accEntData));
			component.find("profilingTable").buildTable(innerData, grouping);
		}
	
	},

		/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to decypt the URL params that is sended from the global balance component.
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
	}	,
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
	}
	
})