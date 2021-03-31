({
	/*
   Author:         Guillermo Giral
   Company:        Deloitte
   Description:    Redirects to the user to a given page with
				   the current page params
   History
   <Date>          <Author>            	<Description>
   23/03/2019      Guillermo Giral        	Initial version
   */
   navigateToExtractDetail : function(component, event, helper) {
	   // This component is accessible from the "Account Transactions" screen
	   // and the "Transaction Search" screen. Hence we need to adapt the url depending
	   // on the source screen

	   if(component.get("v.sourcePage") == "accountTransactions"){
		   var url =
		   "c__accountNumber="+component.get("v.accountDetails.accountNumber")+
		   "&c__valueDate="+component.get("v.transactionRow.obtTransacBusqueda.valueDate")+
		   "&c__clientRef="+component.get("v.transactionRow.obtTransacBusqueda.refCliente")+
		   "&c__bankRef="+component.get("v.transactionRow.obtTransacBusqueda.refBanco")+
		   "&c__bookDate="+component.get("v.transactionRow.obtTransacBusqueda.bookDate")+
		   "&c__category="+component.get("v.transactionRow.obtTransacBusqueda.tipoTransaccion")+
		   "&c__amount="+component.get("v.transactionRow.obtTransacBusqueda.importe")+
		   "&c__bank="+component.get("v.accountDetails.bank")+
		   "&c__alias="+component.get("v.transactionRow.obtTransacBusqueda.aliasCuentaPerfilado")+
		   "&c__description="+component.get("v.transactionRow.obtTransacBusqueda.descripcion")+
		   "&c__accountCode="+component.get("v.accountDetails.accountCode")+
		   "&c__source="+component.get("v.sourcePage")+
		   "&c__lastUpdate="+component.get("v.lastUpdate")+
		   "&c__subsidiaryName="+component.get("v.accountDetails.corporate")+
		   "&c__mainAmount="+component.get("v.accountDetails.bookBalance")+
		   "&c__availableAmount="+component.get("v.accountDetails.availableBalance")+
		   "&c__currentCurrency="+component.get("v.transactionRow.obtTransacBusqueda.moneda")+
		   "&c__country="+component.get("v.accountDetails.country")+
		   "&c__countryName="+component.get("v.accountDetails.countryName")+
		   "&c__aliasBank="+component.get("v.transactionRow.obtTransacBusqueda.aliasEntidad")+
		   "&c__accountsData="+JSON.stringify(component.get("v.accountsData"))+
			"&c__codigoBic="+component.get("v.accountDetails.finalCodigoBic")+
			"&c__selectedFilters="+JSON.stringify(component.get("v.selectedFilters"))+
		   "&c__bic="+component.get("v.accountDetails.bic");
	   } else if(component.get("v.sourcePage") == "transactions"){
		   var url =
			   "c__accountNumber="+component.get("v.transactionRow.obtTransacBusqueda.cuentaExtracto")+
			   "&c__valueDate="+component.get("v.transactionRow.obtTransacBusqueda.valueDate")+
			   "&c__clientRef="+component.get("v.transactionRow.obtTransacBusqueda.refCliente")+
			   "&c__bankRef="+component.get("v.transactionRow.obtTransacBusqueda.refBanco")+
			   "&c__bookDate="+component.get("v.transactionRow.obtTransacBusqueda.bookDate")+
			   "&c__category="+component.get("v.transactionRow.obtTransacBusqueda.tipoTransaccion")+
			   "&c__amount="+component.get("v.transactionRow.obtTransacBusqueda.importe")+
			   "&c__currentCurrency="+component.get("v.transactionRow.obtTransacBusqueda.moneda")+
			   "&c__bank="+component.get("v.transactionRow.obtTransacBusqueda.nombreEntidad")+
			   "&c__alias="+component.get("v.transactionRow.obtTransacBusqueda.aliasCuentaPerfilado")+
			   "&c__description="+component.get("v.transactionRow.obtTransacBusqueda.descripcion")+
			   "&c__source="+component.get("v.sourcePage")+
			   "&c__lastUpdate="+!component.get("v.isEndOfDay")+
			   "&c__accountsData="+JSON.stringify(component.get("v.accountsData"))+
			   "&c__accountCodeToInfo="+JSON.stringify(component.get("v.accountCodeToInfo"))+
			   "&c__selectedTimeframe="+component.get("v.selectedTimeframe")+
			   "&c__dates="+JSON.stringify(component.get("v.dates"))+
			   "&c__selectedFilters="+JSON.stringify(component.get("v.selectedFilters"));
	   }

	   url += "&c__filters="+JSON.stringify(component.get("v.filters"));
	   
	   component.find("Service").redirect("transaction-detail-view",url);
	  }
})