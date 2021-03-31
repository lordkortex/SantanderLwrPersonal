({
	/*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Navigates to the extract detail view
    History
    <Date>          <Author>            <Description>
    31/01/2019      Guillermo Giral     Initial version
    */
   	navigateToExtractDetail : function(component, event, helper){
        
		// Creación de la URL para navegar a la página de 
		// detalles del extracto
	    var amount = component.get("v.ExtractObject.amount") +' '+ component.get("v.currencyTable");
		var url =
		"c__source="+component.get("v.source")+
		"&c__account="+component.get("v.accountNumberAndEntity")+
		"&c__valueDate="+component.get("v.ExtractObject.valueDate")+
		"&c__clientRef="+component.get("v.ExtractObject.refCliente")+
		"&c__bankRef=SAN"+component.get("v.ExtractObject.refCliente")+
		"&c__bookDate="+component.get("v.dates[0]")+
		"&c__category="+component.get("v.ExtractObject.category")+
		"&c__amount="+amount+
		"&c__accountBank="+component.get("v.accountNumberBank")+
		"&c__selectedAccount="+component.get("v.SelectedAccount")+
		"&c__subsidiaryName="+component.get("v.accountName")+
		"&c__currencyTable="+component.get("v.currencyTable")+
		"&c__dateFrom="+component.get("v.dateFrom")+			
		"&c__dateTo="+component.get("v.dateTo")+
		"&c__availableBalanceParam="+component.get("v.availableBalanceParam")+
		"&c__bookBalanceParam="+component.get("v.bookBalanceParam")+
		"&c__description=/LTC/0891-Cash desposit /HTC/CHK/AIN/00000002355";
		
		//console.log("URL DETAIL:" + url);

		helper.encrypt(component, url).then(function(results){
			let navService = component.find("navService");

			let pageReference = {
				type: "comm__namedPage",
				attributes: {
					pageName: "transaction-detail-view"
				},
				state: {
					params : results
				}
			}

			component.set("v.pageReference", pageReference);
			navService.navigate(pageReference); 
		});
   	}
})