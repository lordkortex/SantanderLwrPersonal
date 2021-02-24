({
		getURLParams : function(component,event,helper) {
			var groupsList = [$A.get("$Label.c.selectOne"), "Sales", "Marketing", "Service", "B2B"];
			var rolesList = [$A.get("$Label.c.selectOne"), "Sales Manager", "Sales Director", "Service Representative", "B2B Representative", "Customer"];

			component.set("v.groupsList", groupsList);
			component.set("v.rolesList", rolesList);

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
							console.log(sParameterName[0]);
							//añadir paramatros en caso de que falten.
							//console.log('label ' + sParameterName[0]);
							//console.log('value ' + sParameterName[1]);
							if (sParameterName[0] === 'c__userId') { 
								sParameterName[1] === undefined ? 'Not found' : component.set("v.userId",sParameterName[1]);
							}else if (sParameterName[0] === 'c__userName') { 
								sParameterName[1] === undefined ? 'Not found' : component.set("v.userName",sParameterName[1]);
							}else if (sParameterName[0] === 'c__selectedValueRol') { 
								sParameterName[1] === undefined ? 'Not found' : component.set("v.selectedValueRol",sParameterName[1]);
							}else if (sParameterName[0] === 'c__selectedValueGroup') { 
								sParameterName[1] === undefined ? 'Not found' : component.set("v.selectedValueGroup",sParameterName[1]);
							}else if (sParameterName[0] === 'c__currentStep') { 
								var stringAux;
								sParameterName[1] === undefined ? 'Not found' : stringAux = sParameterName[1];
								component.set("v.currentStageNumber",parseInt(stringAux));
							
							}else if(sParameterName[0] === 'c__isStage1Finished') {
								var auxBoolean;
								sParameterName[1] === undefined ? 'Not found' : auxBoolean = sParameterName[1];
								if(auxBoolean == 'true'){
									component.set("v.stage1Finished",true)
								}
								
							
							} else if (sParameterName[0] === 'c__comesFrom') { 
								if(sParameterName[1] == 'Creation') {
									var rolesList = component.get("v.rolesList")[1];
									component.set("v.selectedValueRol", component.get("v.rolesList")[1]);
									console.log('esta entrando en cretion');
									component.set("v.isNewUser", true);
									console.log(component.get("v.isNewUser"));

								}
							
							}
						}
					});
					
					
				}
				

			} catch (e) {
				console.log(e);
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

	/*
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Method to encrypt the data before navigating to another page.
    History
    <Date>          <Author>            <Description>
    16/01/2020      Joaquin Vera        Initial version
    */
   encrypt : function(component, data){  
    var result="null";
    var action = component.get("c.encryptData");
    action.setParams({ str : data });
    // Create a callback that is executed after 
    // the server-side action returns
    return new Promise(function (resolve, reject) {
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                    if (errors[0] && errors[0].message) {
                           
                            reject(response.getError()[0]);
                    }
                    } 
            }else if (state === "SUCCESS") {
                    result = response.getReturnValue();
            }
                    resolve(result);
            });
            $A.enqueueAction(action);
    });
},
	
})