({
    doInit : function(component, event, helper) {
    
        helper.handleDoInit(component,event,helper);

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
        var url = "c__accountNumber="+component.get("v.data.account")+
            "&c__accountCode="+component.get("v.data.accountCode")+
            "&c__valueDate="+component.get("v.data.valueDate")+
            "&c__clientRef="+component.get("v.data.clientRef")+
            "&c__bankRef="+component.get("v.data.bankRef")+
            "&c__bookDate="+component.get("v.data.bookDate")+		
			"&c__category="+component.get("v.data.category")+
			"&c__currentCurrency="+component.get("v.data.currency")+
            "&c__amount="+component.get("v.data.amount")+
            "&c__description="+component.get("v.data.description")+
            "&c__bank="+component.get("v.data.bank")+
            "&c__aliasBank="+component.get("v.data.aliasBank")+
            "&c__alias="+component.get("v.data.alias")+
            "&c__lastUpdate="+component.get("v.data.lastUpdate")+
            "&c__subsidiaryName="+component.get("v.data.corporate")+
            "&c__mainAmount="+component.get("v.data.bookBalance")+
            "&c__availableAmount="+component.get("v.data.availableBalance")+
            "&c__country="+component.get("v.data.country")+
            "&c__countryName="+component.get("v.data.countryName")+
            "&c__bic="+component.get("v.data.bic")+
            "&c__filters="+JSON.stringify(component.get("v.filters"));

		if(component.get("v.source") == "accountTransactions"){
			
            // Add the source parameter and redirect to the page
            var source = "accountTransactions";
            url += "&c__source="+source;
            component.find("Service").redirect("account-transactions",url);
        }else if(component.get("v.source") == "transactions"){
            
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
        var dummy = document.createElement('input');
        //text = window.location.href;
        var text;
        console.log(component.get("v.data.movementDescription"));
        text = component.get("v.data.movementDescription"); 
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    }
})