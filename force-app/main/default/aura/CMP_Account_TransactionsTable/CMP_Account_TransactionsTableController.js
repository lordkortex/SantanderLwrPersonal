({
    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to show the required batch of rows in the table
    History
    <Date>			<Author>			<Description>
	03/03/2020		Pablo Tejedor    Initial version
	*/

    buildTablePage : function(component, event, helper){
        try {
            var json = component.get("v.transactionResults");
            var currentPage = event.getParam("currentPage");
            var oldPage = component.get("v.oldPage");
            var perPage = component.get("v.transactionsPerPage");
            var start = component.get("v.start");

            if (currentPage != null && currentPage != undefined && currentPage != '' && oldPage!=currentPage){
                //Update the index of dataset to display
                if(currentPage >oldPage && currentPage!=1){
                    component.set("v.start",perPage*currentPage-perPage);
                    if(Math.ceil(json.length/currentPage) >= perPage){
                        component.set("v.end",perPage*currentPage);
                    }else{
                        component.set("v.end",json.length);
                    }
                }else{
                    component.set("v.end",start);
                    if(currentPage==1){ 
                        component.set("v.start",0);
                        component.set("v.end",perPage);

                    }else{
                        component.set("v.start",start-perPage);
                    }
                }
                component.set("v.oldPage",currentPage);

                //Update a set of the paginated data
                var paginatedValues=[];
                for(var i= component.get("v.start");i<=component.get("v.end");i++){
                    paginatedValues.push(json[i]);
                }

                component.set("v.paginatedTransactions",paginatedValues);
            }
        } catch(e) {
            console.error(e);
        }
    },

    /*
    Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Method that launches everytime the pagination is changed
    History
    <Date>          <Author>                <Description>
    19/03/2020      Guillermo Giral        Initial version
    */
    paginationChange : function(component, event, helper) {
        helper.buildPagination(component, event ,helper);
    },

	/*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to sort the columns of the transactions table.
    History
    <Date>			<Author>			<Description>
	02/03/2020		Pablo Tejedor   	Initial version
	*/
	sortBy : function(component, event, helper) {

        try {
            //Retrieve the field to sort by
            if(event.target.id != null && event.target.id != "" && event.target.id != undefined){
                var sortEvent = component.getEvent("sortColumn");
                if(sortEvent){
                    var sortItem = "v.sort" + event.target.id;
                    sortEvent.setParams({
                                            "column" : event.target.id,
                                            "sortItem" : sortItem
                    });
                    sortEvent.fire();
                }
            }
        } catch (e) {
            console.error(e);
        }   
    },

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
        var transactionRow = component.get("v.transactionResults")[event.currentTarget.id];

        if(component.get("v.sourcePage") == "globalBalance"){
            var url =
                "c__accountNumber="+component.get("v.accountDetails.accountNumber")+
                "&c__valueDate="+transactionRow.obtTransacBusqueda.formattedValueDate+
                "&c__clientRef="+transactionRow.obtTransacBusqueda.refCliente+
                "&c__bankRef="+transactionRow.obtTransacBusqueda.refBanco+
                "&c__bookDate="+transactionRow.obtTransacBusqueda.formattedBookDate+
                "&c__category="+transactionRow.obtTransacBusqueda.tipoTransaccion+
                "&c__amount="+transactionRow.obtTransacBusqueda.importe+
                "&c__bank="+component.get("v.accountDetails.bank")+
                "&c__alias="+transactionRow.obtTransacBusqueda.aliasCuentaPerfilado+
                "&c__description="+transactionRow.obtTransacBusqueda.descripcion+
                "&c__accountCode="+component.get("v.accountDetails.accountCode")+
                "&c__source="+component.get("v.sourcePage")+
                "&c__lastUpdate="+!component.get("v.isEndOfDay")+
                "&c__subsidiaryName="+component.get("v.accountDetails.accountName")+
                "&c__mainAmount="+component.get("v.accountDetails.bookBalance")+
                "&c__availableAmount="+component.get("v.accountDetails.availableBalance")+
                "&c__currentCurrency="+transactionRow.obtTransacBusqueda.moneda+
                "&c__country="+component.get("v.accountDetails.country")+
                "&c__countryName="+component.get("v.accountDetails.countryName")+
                "&c__aliasBank="+transactionRow.obtTransacBusqueda.aliasEntidad+
                "&c__accountsData="+JSON.stringify(component.get("v.accountsData"))+
                "&c__codigoBic="+component.get("v.accountDetails.finalCodigoBic")+
                "&c__codigoCorporate="+component.get("v.accountDetails.codigoCorporate")+ // DA - 07/11/2020 - Ebury accounts
                "&c__selectedFilters="+JSON.stringify(component.get("v.selectedFilters"))+
                //JOAQUIN VERA
                "&c__isIAM="+component.get("v.isIAM")+
                "&c__accountStatus="+component.get("v.accountDetails.status")+ 
                "&c__localTransactionCode="+transactionRow.obtTransacBusqueda.ltcCode+
                "&c__localTransactionDescription="+transactionRow.obtTransacBusqueda.ltcDescription+ 
                "&c__transactionBatchReference="+transactionRow.obtTransacBusqueda.transactionBatchReference+
                "&c__dates="+JSON.stringify(component.get("v.dates"))+
                "&c__bic="+component.get("v.accountDetails.bic");

                //AM - 28/09/2020 - Ebury Accounts
                if(component.get("v.accountDetails.dataProvider") != null && component.get("v.accountDetails.dataProvider") != ""){
                    url = url + "&c__dataProvider=" + component.get("v.accountDetails.dataProvider");
                }
                if(transactionRow.obtTransacBusqueda.transactionType != null && transactionRow.obtTransacBusqueda.transactionType != ""){
                    url = url + "&c__transactionType=" + transactionRow.obtTransacBusqueda.transactionType;
                }
                if(transactionRow.obtTransacBusqueda.balanceResultAmount != null && transactionRow.obtTransacBusqueda.balanceResultAmount != ""){
                    url = url + "&c__balanceResultAmount=" + transactionRow.obtTransacBusqueda.balanceResultAmount;
                }
                if(transactionRow.obtTransacBusqueda.customerAdditionalInformation != null && transactionRow.obtTransacBusqueda.customerAdditionalInformation != ""){
                    url = url + "&c__customerAdditionalInformation=" + transactionRow.obtTransacBusqueda.customerAdditionalInformation;
                }
                if(transactionRow.obtTransacBusqueda.transactionType != null && transactionRow.obtTransacBusqueda.transactionType == 'debit' && transactionRow.obtTransacBusqueda.creditorAccountsDetails != null && transactionRow.obtTransacBusqueda.creditorAccountsDetails != ""){
                    url = url + "&c__creditorAccountDetails=" + JSON.stringify(transactionRow.obtTransacBusqueda.creditorAccountsDetails);
                }else if(transactionRow.obtTransacBusqueda.transactionType != null && transactionRow.obtTransacBusqueda.transactionType == 'credit' && transactionRow.obtTransacBusqueda.debtorAccountDetails != null && transactionRow.obtTransacBusqueda.debtorAccountDetails != ""){
                    url = url + "&c__debtorAccountDetails=" + JSON.stringify(transactionRow.obtTransacBusqueda.debtorAccountDetails);
                }

                //AM - 11/11/2020 - US6421: Campos Nuevos Nexus
                if(transactionRow.obtTransacBusqueda.aditionalInformation != null && transactionRow.obtTransacBusqueda.aditionalInformation != ""){
                    url = url + "&c__aditionalInformation=" + transactionRow.obtTransacBusqueda.aditionalInformation;
                }
                if(transactionRow.obtTransacBusqueda.customerAditionalInformation != null && transactionRow.obtTransacBusqueda.customerAditionalInformation != ""){
                    url = url + "&c__customerAditionalInformation=" + transactionRow.obtTransacBusqueda.customerAditionalInformation;
                }
                
        } else {        
            var url =
                "c__accountNumber="+transactionRow.obtTransacBusqueda.cuentaExtracto+
                "&c__valueDate="+transactionRow.obtTransacBusqueda.formattedValueDate+
                "&c__clientRef="+transactionRow.obtTransacBusqueda.refCliente+
                "&c__bankRef="+transactionRow.obtTransacBusqueda.refBanco+
                "&c__bookDate="+transactionRow.obtTransacBusqueda.formattedBookDate+
                "&c__category="+transactionRow.obtTransacBusqueda.tipoTransaccion+
                "&c__amount="+transactionRow.obtTransacBusqueda.importe+
                "&c__currentCurrency="+transactionRow.obtTransacBusqueda.moneda+
                "&c__bank="+transactionRow.obtTransacBusqueda.nombreEntidad+
                "&c__alias="+transactionRow.obtTransacBusqueda.aliasCuentaPerfilado+
                "&c__description="+transactionRow.obtTransacBusqueda.descripcion+
                "&c__source="+component.get("v.sourcePage")+
                "&c__lastUpdate="+!component.get("v.isEndOfDay")+
                "&c__accountsData="+JSON.stringify(component.get("v.accountsData"))+
                "&c__accountCodeToInfo="+JSON.stringify(component.get("v.accountCodeToInfo"))+
                "&c__selectedTimeframe="+component.get("v.selectedTimeframe")+
                "&c__dates="+JSON.stringify(component.get("v.dates"))+
                "&c__selectedFilters="+JSON.stringify(component.get("v.selectedFilters"))+
				"&c__accountCodes="+JSON.stringify(component.get("v.accountCodesToSearch"))+
                "&c__accountStatus="+component.get("v.accountDetails.status")+ 
                "&c__localTransactionCode="+transactionRow.obtTransacBusqueda.ltcCode+
                "&c__localTransactionDescription="+transactionRow.obtTransacBusqueda.ltcDescription+ 
                "&c__transactionBatchReference="+transactionRow.obtTransacBusqueda.transactionBatchReference;
            
            let accountList = component.get("v.accountsData")[0].accountList;
            for(var acc in accountList){
                if(accountList[acc].displayNumber.trim() == transactionRow.obtTransacBusqueda.cuentaExtracto){
                    url += "&c__accountStatus=" + accountList[acc].status;
                    break;
                }
            }
        }

        url += "&c__filters="+JSON.stringify(component.get("v.filters"));
        url += "&c__formFilters="+JSON.stringify(component.get("v.formFilters"));
        
        component.find("Service").redirect("transaction-detail-view",url);
    }
})