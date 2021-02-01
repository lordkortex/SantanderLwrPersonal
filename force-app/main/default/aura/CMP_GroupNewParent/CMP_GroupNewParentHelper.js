({
    handleDoInit : function(component,event,helper) {
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
                        if (sParameterName[0] === 'c__groupName') { 
                            console.log("llega al groupName" + sParameterName[1]);
                            sParameterName[1] === undefined ? 'Not found' : component.set("v.groupName", sParameterName[1]);
                        }else if (sParameterName[0] === 'c__comesFrom') { 
                            if(sParameterName[1] != undefined) {
                                if(sParameterName[1] == "Groups") {
                                    component.set("v.comesFromGroups", true);
                                }
                            }
                        }else if (sParameterName[0] === 'c__hasProfiling') { 
                            if(sParameterName[1] != undefined) {
                                if(sParameterName[1] == "true") {
                                    console.log("es true");
                                    component.set("v.hasProfile", true);
                                }
                            }
                        }

                    } 
                    //component.set("v.ready",true);
                    console.log('llega service');
                    component.find("Service").callApex2(component, helper,"c.entitlementData", {}, helper.getEntitlementData);
                });
                
                
            }

        } catch (e) {
            console.log('entra en el catch');
            console.log(e);
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
	}
})