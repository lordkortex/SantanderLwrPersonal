({
    recalculateAmounts : function(component, event, helper) {
        
        // Call the method in c:CMP_displayAmount to show the amounts
        // in the user's preferred format
        // SNJ 01/04/2020
        if(component.get("v.showTotals") == true){
            component.find("valueBalance").formatNumber();
            component.find("bookBalance").formatNumber();
        }
    },

	navigateToAccountDetails : function(component, event, helper) {
		
		// Creación de la URL para navegar a la página de 
		// detalles del extracto
		var aux = "";
        // SNJ 02/04/2020
        if(component.get("v.source") == "fromIPTParent"){
            aux = "fromIPTParent";
        }else{
          aux = "accountTransactions";  
        }
		
		var accountDetails = component.get("v.accountDetails");
        //SNJ - 06/05/2020 - Adding other parameters to the url: c__codigoEmisora and c__aliasEntidad
        var url =
            "c__country="+accountDetails.country+
            "&c__source="+aux+
            "&c__bank="+accountDetails.bank+
            "&c__accountNumber="+accountDetails.accountNumber+
            "&c__bic="+accountDetails.bic+
            "&c__subsidiaryName="+accountDetails.accountName+
            "&c__aliasBank="+accountDetails.bankAlias+
            "&c__mainAmount="+accountDetails.bookBalance+
            "&c__availableAmount="+accountDetails.availableBalance+
            "&c__alias="+accountDetails.accountAlias+
            "&c__idType="+accountDetails.idType+
            "&c__currentCurrency="+accountDetails.accountCurrency+
            "&c__filters="+JSON.stringify(component.get("v.filters"))+
            "&c__codigoCuenta="+accountDetails.accountCode+
            "&c__codigoBic="+accountDetails.finalCodigoBic+
            "&c__codigoEmisora="+accountDetails.codigoEmisora+
            "&c__aliasEntidad="+accountDetails.aliasEntidad+
        	//DA - 18/11/2020 - Account Detail Back Button
            "&c__bookDate="+accountDetails.bookDate+
            "&c__valueDate="+accountDetails.aliasEntidad+
            "&c__countryName="+accountDetails.countryName;
            
            //AM - 28/09/2020 - Ebury Accounts
            if(component.get("v.accountDetails.associatedAccountList") != undefined && component.get("v.accountDetails.associatedAccountList") != null){
                url = url + "&c__associatedAccountList="+JSON.stringify(component.get("v.accountDetails.associatedAccountList"));
            }
        	if(component.get("v.accountDetails.codigoCorporate") != undefined && component.get("v.accountDetails.codigoCorporate") != null){
                url = url + "&c__codigoCorporate="+component.get("v.accountDetails.codigoCorporate");
            }
            if(component.get("v.accountDetails.dataProvider") != undefined && component.get("v.accountDetails.dataProvider") != null){
                url = url + "&c__dataProvider="+component.get("v.accountDetails.dataProvider");
            }
            		
		component.find("Service").redirect("account-detail-transaction",url);
       
	},

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to copy the account number
    				to the clipboard
    History
    <Date>			<Author>			<Description>
	04/04/2020		Guillermo Giral   	Initial version
	*/
	copy :function(component, event, helper) {
        var dummy = document.createElement('input'),
        text = component.get("v.accountToCopy"); 
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    },
    
        /*Author:       Joaquin Vera
    Company:        Deloitte
    Description:    Navigate to the accounts page
    History
    <Date>			<Author>		    <Description>
    02/08/2020		Joaquin Vera     Initial version
    */
    openPaymentUETRTrack : function(component, event, helper){
        component.find("service").redirect("payment-uetr-track", "");
    },
})