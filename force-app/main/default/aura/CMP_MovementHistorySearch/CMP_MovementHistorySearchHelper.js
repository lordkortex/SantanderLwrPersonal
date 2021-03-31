({
	/*Author:       Pablo Tejedor
    Company:        Deloitte
    Description:    Helper  method to calculate the from and to dates attributes
    History
    <Date>			<Author>		<Description>
    18/12/2019		Pablo Tejedor     Initial version*/
	datesCalculator: function(component, event, helper) {
		component.find("Service").callApex2(component, helper,"c.getDatesFromTo", {}, this.getDatesSearch); 

	},

	getDatesSearch: function(component,helper,response){
		var dateTo = response[0];
		var dateFrom = response[1];
		
		var dateTodd = dateTo.split('-')[2];
		var dateTomm = dateTo.split('-')[1];
		var dateToyyy = dateTo.split('-')[0];
		
		var dateFromdd = dateFrom.split('-')[2];
		var dateFrommm = dateFrom.split('-')[1];
		var dateFromyyy = dateFrom.split('-')[0];
		
		component.set("v.dateTo", dateToyyy +'/'+ dateTomm +'/'+ dateTodd);
		component.set("v.dateFrom", dateFromyyy +'/'+ dateFrommm +'/'+ dateFromdd);
	
	
	},

	/*Author:       Pablo Tejedor
    Company:        Deloitte
    Description:    Just empties start date and end date data attributes.
    History
    <Date>			<Author>		<Description>
    18/12/2019		Pablo Tejedor     Initial version*/
	handleClearButton : function(component, event, helper) 
	{
		component.set("v.dateFrom", null);
		component.set("v.dateTo", null);
		component.set("v.SelectedAccount", null);
	},

	/*Author:       Pablo Tejedor
    Company:        Deloitte
    Description:    Gets the attributes and launches an event to the parent to call mulesoft
    History
    <Date>			<Author>		<Description>
    18/12/2019		Pablo Tejedor     Initial version*/
	handleSearchButton : function(component, event, helper){

		if((component.get("v.dateFrom") != null && component.get("v.dateFrom")!= '' && component.get("v.dateFrom") != undefined)  && 
		   (component.get("v.dateTo")!= null && component.get("v.dateTo")!= '' && component.get("v.dateTo")!=undefined)  && 
		   (component.get("v.SelectedAccount") != null && component.get("v.SelectedAccount") != null 
		   && component.get("v.SelectedAccount")  != undefined  )){
		
			component.set("v.displayDownloadIcon", true);
			component.set("v.displayNoResultsMessage", false);
			var accountNumber = component.get("v.SelectedAccount");
			var accountList = component.get("v.accountInfoDataSearch");
		
			var split = accountNumber.split(' - ');
			var accountSplit =split[1];
			
		

			for(var i=0; i<accountList.length; i++ ){

				if(accountList[i].displayNumber == accountSplit){
			
					component.set("v.accountNumberAndEntity",accountList[i].displayNumber );
					component.set("v.accountNumberBank",accountList[i].bankName );
					component.set("v.accountName",accountList[i].subsidiaryName );
					component.set("v.currencyTable",accountList[i].currencyCodeAvailableBalance );
					component.set("v.availableBalanceParam",accountList[i].amountAvailableBalance);
					component.set("v.bookBalanceParam",accountList[i].amountMainBalance);
					var bookdateAux = accountList[i].lastUpdateAvailableBalance;
					component.set("v.dateParam",bookdateAux.split(',')[0]);

					if((component.get("v.finalAvailableDate") == null || component.get("v.finalAvailableDate") == undefined) && component.get("v.source") != 'globalBalance'){
						component.set("v.finalAvailableDate", helper.formatDate(component.get("v.dateTo")));
						
					}
				}
			} 
		
			
			var dateParam = component.get("v.finalAvailableDate");
			
			if(dateParam != null || dateParam != 'undefined' ){
				
				if(dateParam.includes('undefined')){
					do{
					 dateParam = dateParam.replace('undefined/','');
					} while (dateParam.includes('undefined'));
					
				 }

				

				component.set("v.dateParam",dateParam.split('/')[2] +'/'+dateParam.split('/')[1] +'/'+dateParam.split('/')[0]);
			
				component.set("v.isSearched",true );
			}
			
		
			// Fire event to search Mulesoft data
			var params = {
				"accountNumber" : component.get("v.accountNumberAndEntity"),
				"dateTo" : component.get("v.dateTo"),
				"dateFrom" : component.get("v.dateFrom")	
			};
			

			var evt = $A.get("e.c:EVT_MovementHistorySearchData");
			if(evt){
				evt.setParams(params);
				evt.fire();
			}
		}
		if((component.get("v.dateFrom") != null && component.get("v.dateFrom")!= '' && component.get("v.dateFrom") != undefined)  && 
		   (component.get("v.dateTo")!= null && component.get("v.dateTo")!= '' && component.get("v.dateTo")!=undefined)  && 
		   (component.get("v.SelectedAccount") != null && component.get("v.SelectedAccount") != null 
		   && component.get("v.SelectedAccount")  != undefined  )){
		var dateParamAux =component.get("v.dateParam");


		if(dateParamAux != null || dateParamAux != 'undefined' ){
			 
			if(dateParamAux.includes('undefined')){
				do{
					dateParamAux = dateParamAux.replace('undefined/','');
				} while (dateParamAux.includes('undefined'));
					 
			}
			if(dateParamAux.split('/')[0].length == 2){
				component.set("v.dateParam",dateParamAux.split('/')[0]+'/'+dateParamAux.split('/')[1]+'/'+dateParamAux.split('/')[2]);
			}else{
			component.set("v.dateParam",dateParamAux.split('/')[2]+'/'+dateParamAux.split('/')[1]+'/'+dateParamAux.split('/')[0]);
			}
		}
	}
		
		if(component.get("v.dateTo") == null || component.get("v.dateFrom") == null || component.get("v.dateFrom") == undefined ||
		   component.get("v.dateTo") == '' || component.get("v.dateFrom") == '' ||  component.get("v.dateFrom") == undefined ||
		   component.get("v.SelectedAccount") == null || component.get("v.SelectedAccount") == '' || component.get("v.SelectedAccount") == undefined){
			component.set("v.displayNoResultsMessage", true);
			component.set("v.displayDownloadIcon", false);
		
		}
		

		
	},

	/*Author:       Guillermo Giral
    Company:        Deloitte
    Description:    Gets the date and gives it the proper format
    History
    <Date>			<Author>			<Description>
    31/01/2020		Guillermo Giral    	Initial version*/

	formatDate: function(date){		
		var datedd = date.split('-')[2];
		var datemm = date.split('-')[1];
		var dateyyy = date.split('-')[0];
		
		return (dateyyy +'/'+ datemm +'/'+ datedd);
	}

})