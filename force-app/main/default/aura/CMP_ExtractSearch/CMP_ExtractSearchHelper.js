({
	/*Author:       Pablo Tejedor
    Company:        Deloitte
    Description:    Gets the attributes and launches an event to the parent to call mulesoft
    History
    <Date>			<Author>		<Description>
	18/12/2019		Pablo Tejedor     Initial version*/
	
	searchButtonHelper : function(component, event, helper){
		
		var bookdate = component.get("v.dates[0]");
		if(component.get("v.SelectedAccount") != null && bookdate != null ){
			component.set("v.displayNoResultsMessage",false);
			component.set("v.displayDownloadIcon",true);
			var accountNumber = component.get("v.SelectedAccount");
			var accountList = component.get("v.accountInfoDataSearch");		
			var split = accountNumber.split(' - ');
			var accountSplit =split[1];
		

			for(var i=0; i<accountList.length; i++ ){

				if(accountList[i].displayNumber == accountSplit){
			
					component.set("v.accountNumberAndEntity",accountList[i].displayNumber );
					component.set("v.accountNumberBank",accountList[i].bankName );
					component.set("v.accountName",accountList[i].subsidiaryName );
					component.set("v.currencyTable", accountList[i].currencyCodeAvailableBalance);
				}
			}
			var params = {
				"accountNumber" : component.get("v.accountNumberAndEntity"),
				"dateTo" : bookdate
					
			};
			
		
			var evt = $A.get("e.c:EVT_MovementHistorySearchData");
			if(evt){
				evt.setParams(params);
				evt.fire();
			}
		}else if(component.get("v.SelectedAccount") == null || bookdate == null ){
			component.set("v.displayNoResultsMessage",true);
			component.set("v.displayDownloadIcon",false);
			
		}
		
	}	
})