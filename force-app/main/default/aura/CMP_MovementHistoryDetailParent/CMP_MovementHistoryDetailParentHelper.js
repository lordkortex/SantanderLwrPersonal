({
	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from the History movement component.
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/

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
						sParameterName = sURLVariables[i].split('=');      
						//añadir paramatros en caso de que falten.
						//console.log('label ' + sParameterName[0]);
						//console.log('value ' + sParameterName[1]);
						if (sParameterName[0] === 'c__accountNumberAndEntity') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumberAndEntity",sParameterName[1]);
						}else if (sParameterName[0] === 'c__source') { 
							//console.log("SOURCE: " + sParameterName[0]);
							sParameterName[1] === undefined ? 'Not found' : component.set("v.source",sParameterName[1]);
							
							
						}else if (sParameterName[0] === 'c__accountInteger') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.accountInteger",sParameterName[1]);
						}else if (sParameterName[0] === 'c__accountDecimals') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.accountDecimals",sParameterName[1]);
						}else if (sParameterName[0] === 'c__extractDate') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.extractDate",sParameterName[1]);
						}
						else if (sParameterName[0] === 'c__bookDateParam') { 
								
								var datesArray = [];					
								sParameterName[1] === undefined ? 'Not found' : datesArray[0] = sParameterName[1];
								var dateAux = new Date(datesArray[0].split('/')[2], datesArray[0].split('/')[1]-1, datesArray[0].split('/')[0]);
								var day=(dateAux.getDate() < 10 ? '0' : '') + dateAux.getDate();					
								var getmonth= dateAux.getMonth()+1;
								var month = (getmonth < 10 ? '0' : '') + getmonth;
								var year = dateAux.getFullYear();
								dateAux = year + '/' + month + '/' + day;
								datesArray[0] = dateAux;
								component.set("v.dates",datesArray);
							
						}else if (sParameterName[0] === 'c__selectedAccountSearch') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.SelectedAccount",sParameterName[1]);
						}else if (sParameterName[0] === 'c__accountNumberBank') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.accountNumberBank",sParameterName[1]);
						}else if (sParameterName[0] === 'c__accountName') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.accountName",sParameterName[1]);
						}else if (sParameterName[0] === 'c__lastFinalBalance') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.finalBalance",sParameterName[1]);
						}else if (sParameterName[0] === 'c__currencyTable') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.currencyTable",sParameterName[1]);
						}else if (sParameterName[0] === 'c__lastUpdateAvailableBalance') { 
						
							var datesArray = [];	
							var datesArrayAux=[];
							sParameterName[1] === undefined ? 'Not found' : datesArray[0] = sParameterName[1];
							var dateParamAux = datesArray[0].split(',')[0];
							
							var longitudYear = dateParamAux.split('/')[0];
							if(longitudYear.length == 4){
								component.set("v.dates",dateParamAux);
							}else{
							var dateParamAux2 = dateParamAux.split('/')[2] + dateParamAux.split('/')[1] + dateParamAux.split('/')[0];
							datesArrayAux.push(dateParamAux2);
							component.set("v.dates",dateParamAux2);

						}
							
						}else if (sParameterName[0] === 'c__currentCurrency') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.currencyTable",sParameterName[1]);
						}else if (sParameterName[0] === 'c__dateTo') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.dateTo",sParameterName[1]);
							
						}else if (sParameterName[0] === 'c__dateFrom') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.dateFrom",sParameterName[1]);
						
						}else if (sParameterName[0] === 'c__currencyHistoric') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.currencyTable",sParameterName[1]);
						}else if (sParameterName[0] === 'c__bookBalanceParam') { 	
							sParameterName[1] === undefined ? 'Not found' : component.set("v.bookBalanceParam",sParameterName[1]);
							
						}else if (sParameterName[0] === 'c__availableBalanceParam') { 
							sParameterName[1] === undefined ? 'Not found' : component.set("v.availableBalanceParam",sParameterName[1]);
							
						}
						
					}
				

					component.set("v.ready",true);
					helper.getAccountDataDropdown(component,event,helper);

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

	/*
	Author:         Pablo Tejedor
	Company:        Deloitte
	Description:    Function to get the avaible accounts for the user .
	History
	<Date>			<Author>			<Description>
	16/01/2020		Pablo Tejedor   	Initial version
	*/	
	getAccountDataDropdown : function(component,event,helper){					
		component.find("Service").callApex2(component, helper,"c.getAccountsAvaibleData", {}, this.getAccountData);
	},

	/*
	Author:         Pablo Tejedor
	Company:        Deloitte
	Description:    Function to get the avaible accounts for the user .
	History
	<Date>			<Author>			<Description>
	16/01/2020		Pablo Tejedor   	Initial version
	*/

	getAccountData: function(component,helper,response){
		var listData = [];
		for(var a=0; a<response.accountList.length ;a++){
			var dropDownList = response.accountList[a].currencyCodeAvailableBalance + ' - ' + response.accountList[a].displayNumber;
			listData.push(dropDownList);    
			if(component.get("v.accountNumberAndEntity") != null && component.get("v.accountNumberAndEntity") == response.accountList[a].displayNumber){
				component.set("v.SelectedAccount",response.accountList[a].currencyCodeAvailableBalance + ' - ' + response.accountList[a].displayNumber );
				component.set("v.currencyTable",response.accountList[a].currencyCodeAvailableBalance);

			}
		}
		component.set("v.accountInfoDataSearch",response.accountList );
		component.set("v.AccountList", listData.sort() );
	
	}	
})