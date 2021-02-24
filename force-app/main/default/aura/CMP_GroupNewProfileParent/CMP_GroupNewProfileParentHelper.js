({
	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the data from the server
    History
    <Date>			<Author>			<Description>
	20/01/2020		Guillermo Giral     Initial version
	*/
	
	getServiceProfilingData : function(component, event, helper) {
		component.find("service").callApex2(component, helper,"c.getServiceProfilingInfo", {}, this.populateServiceProfiling);
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
			// Set data
			component.set("v.countries", response.countries);
			component.set("v.countriesMap", response.countryMap);
            component.set("v.accounts", response.accounts);
			component.set("v.defaultAccounts", response.accounts);
            component.set("v.entitlements", response.entitlements);
			component.set("v.defaultEntitlements", response.entitlements);

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
            
            // Initialize the dropdown filters data
            component.find("profilingFilter").populateDropdownData(accountList, entitlementList, Object.keys(countriesMap));
		}
	},

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
                        //añadir paramatros en caso de que falten.
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
                        }
                    }
                });
            }
 
        } catch (e) {
            console.log(e);
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