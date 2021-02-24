({
    getTransactionDetails : function(component, event, helper){
       
        helper.getURLParams(component, event, helper);
    },

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to return page.
    History
    <Date>			<Author>			<Description>
	26/12/2019		 Pablo Tejedor   	Initial version
	*/
	gobackPage :function(component, event, helper) {
        // Generate common URL 
        var url = "c__accountNumber="+component.get("v.transactionDetails.account")+
            "&c__accountCode="+component.get("v.transactionDetails.accountCode")+
            "&c__accountCodes="+component.get("v.accountCodesToSearch")+
            "&c__valueDate="+component.get("v.transactionDetails.valueDate")+
            "&c__clientRef="+component.get("v.transactionDetails.clientRef")+
            "&c__bankRef="+component.get("v.transactionDetails.bankRef")+
            "&c__bookDate="+component.get("v.transactionDetails.bookDate")+		
			"&c__category="+component.get("v.transactionDetails.category")+
			"&c__currentCurrency="+component.get("v.transactionDetails.currency")+
            "&c__amount="+component.get("v.transactionDetails.amount")+
            "&c__description="+component.get("v.transactionDetails.description")+
            "&c__bank="+component.get("v.transactionDetails.bank")+
            "&c__aliasBank="+component.get("v.transactionDetails.aliasBank")+
            "&c__alias="+component.get("v.transactionDetails.alias")+
            "&c__lastUpdate="+component.get("v.transactionDetails.lastUpdate")+
            "&c__subsidiaryName="+component.get("v.transactionDetails.corporate")+
            "&c__mainAmount="+component.get("v.transactionDetails.bookBalance")+
            "&c__availableAmount="+component.get("v.transactionDetails.availableBalance")+
            "&c__country="+component.get("v.transactionDetails.country")+
            "&c__countryName="+component.get("v.transactionDetails.countryName")+
            "&c__bic="+component.get("v.transactionDetails.bic")+
            "&c__filters="+JSON.stringify(component.get("v.filters"))+
            "&c__formFilters="+JSON.stringify(component.get("v.formFilters"))+
            "&c__accountsData="+JSON.stringify(component.get("v.accountsData"))+
            "&c__accountCodeToInfo="+JSON.stringify(component.get("v.accountCodeToInfo"))+
            "&c__selectedTimeframe="+component.get("v.selectedTimeframe")+
            "&c__selectedFilters="+JSON.stringify(component.get("v.selectedFilters"))+
            "&c__codigoBic="+component.get("v.accountCodigoBic")+
            "&c__codigoCorporate="+component.get("v.accountCodigoCorporate")+ // DA - 07/11/2020 - Ebury accounts
            "&c__dates="+JSON.stringify(component.get("v.dates"))+
            "&c__accountStatus="+component.get("v.transactionDetails.accountStatus");

        if(component.get("v.source") == "globalBalance"){  
            // Add the source parameter and redirect to the page
            var source = "globalBalance";
            url += "&c__source="+source;
            component.find("Service").redirect("account-transactions",url);          
        } else {
            // Add the source parameter and redirect to the page
            url += "&c__source=";
            component.find("Service").redirect("transaction-search",url);
        }
    }, 

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to return page.
    History
    <Date>			<Author>			<Description>
	26/12/2019		 Pablo Tejedor   	Initial version
	*/
	copy :function(component, event, helper) {
        console.log('copy method 1' + location.href);
        var dummy = document.createElement('input'),
        //text = window.location.href;
        text = component.get("v.transactionDetails.description"); 
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    }
   
})