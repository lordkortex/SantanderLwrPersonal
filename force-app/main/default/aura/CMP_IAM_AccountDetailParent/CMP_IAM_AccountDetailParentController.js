({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the URL params sent
                    by the previous page
    History
    <Date>			<Author>			<Description>
    24/03/2020		Guillermo Giral  	Initial version
    21/05/2020      Shahad Naji         Store wheather Account Alias has been updated or not
	*/
    getAccountDetails : function(component, event, helper) {     
        helper.getURLParams(component,event,helper);       
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to navigate to the previous screen
                    sending the necessary parameters
    History
    <Date>			<Author>			<Description>
	24/03/2020		Guillermo Giral  	Initial version
	*/
    navigateToPreviousScreen : function(component, event, helper) {
        var sourcePage = component.get("v.source");
        if(sourcePage == "globalBalance"){
            var aux = component.get("v.source");
            var url = "c__source="+aux
            +"&c__filters="+JSON.stringify(component.get("v.accountDetails.filters"))
            +"&c__tabs="+component.get("v.accountDetails.tabs")
            +"&c__sourcePage="+component.get("v.accountDetails.sourcePage")
            +"&c__iRegister="+JSON.stringify(component.get("v.accountDetails.iRegister"))
            +"&c__firstAccountCountryList="+JSON.stringify(component.get("v.accountDetails.firstAccountCountryList"))
            +"&c__firstTAccountCountryList="+JSON.stringify(component.get("v.accountDetails.firstTAccountCountryList"))
           	+"&c__accountGrouping="+component.get("v.iSortSelected")
            +"&c__consolidationCurrency="+component.get("v.iCurrency");

            component.find("Service").redirect("accounts", url);
            
            //component.find("Service").redirect("accounts", "");
        } else if(sourcePage == "accountTransactions"){
            var aux = "globalBalance";
            var accountDetails = component.get("v.accountDetails");
            var url = "c__source="+aux+"&c__subsidiaryName="+accountDetails.accountName+"&c__accountNumber="+accountDetails.accountNumber
                        +"&c__bank="+accountDetails.bank+"&c__mainAmount="+accountDetails.bookBalance+"&c__availableAmount="+accountDetails.availableBalance
                        +"&c__currentCurrency="+accountDetails.accountCurrency+"&c__alias="+accountDetails.accountAlias
                        +"&c__lastUpdate=true"+"&c__idType="+accountDetails.idType+"&c__country="+accountDetails.country+"&c__aliasBank="+accountDetails.bankAlias
                        +"&c__bic="+accountDetails.bic+"&c__filters="+JSON.stringify(component.get("v.accountDetails.filters"))+"&c__accountCode="+accountDetails.codigoCuenta+"&c__codigoBic="+accountDetails.codigoBic
                        //DA - 18/11/2020 - Account Detail Back Button
                        +"&c__codigoEmisora="+accountDetails.codigoEmisora+"&c__aliasEntidad="+accountDetails.aliasEntidad+"&c__codigoCuenta="+accountDetails.codigoCuenta+"&c__bookDate="+accountDetails.bookDate+"&c__valueDate="+accountDetails.valueDate
                        +"&c__countryName="+accountDetails.countryName+"&c__tabs=true"+"&c__sourcePage="+"&c__comesFrom=accountList";
            
            
            //AM - 28/09/2020 - Ebury Accounts
            if(component.get("v.accountDetails.codigoCorporate") != undefined && component.get("v.accountDetails.codigoCorporate") != null){
                url = url + "&c__codigoCorporate="+component.get("v.accountDetails.codigoCorporate");
            }
            if(component.get("v.accountDetails.dataProvider") != undefined && component.get("v.accountDetails.dataProvider") != null){
                url = url + "&c__dataProvider="+component.get("v.accountDetails.dataProvider");
            }
            if(component.get("v.accountDetails.associatedAccountList") != undefined && component.get("v.accountDetails.associatedAccountList") != null){
                url = url + "&c__associatedAccountList="+JSON.stringify(component.get("v.accountDetails.associatedAccountList"));
            }

            // Navigate to the account transactions page                      
            component.find("Service").redirect("account-transactions", url);

            
        } else if(sourcePage == "fromIPTParent"){
            var accountDetails = component.get("v.accountDetails");
            var url = "c__subsidiaryName="+accountDetails.accountName+
                "&c__alias="+accountDetails.accountAlias+
                "&c__bic="+accountDetails.bic+
                "&c__currentCurrency="+accountDetails.accountCurrency+
                "&c__accountNumber="+accountDetails.accountNumber+
                "&c__idType="+accountDetails.iIdType+
                "&c__source="+aux+
                "&c__updateHour="+accountDetails.hourValue+
                "&c__date="+accountDetails.dateValue+
                "&c__bank="+accountDetails.bank+
                "&c__mainAmount="+accountDetails.bookBalance+
                "&c__availableAmount="+accountDetails.availableBalance+
                "&c__lastUpdate=true"+
                "&c__country="+accountDetails.country+
                "&c__aliasBank="+accountDetails.bankAlias+
                "&c__filters="+component.get("v.filters");
            
            // Navigate to the account transactions page           
            component.find("Service").redirect("international-payments-tracker", url);
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to edit the alias of the account / bank
    History
    <Date>			<Author>			<Description>
	26/03/2020		Guillermo Giral  	Initial version
	*/
    editAlias : function(component, event, helper) {
        var sourceId = event.currentTarget.id;
        if(sourceId == "aliasAccount"){
            component.set("v.editingAliasAccount", true);
        } else if(sourceId == "aliasBank"){
            component.set("v.editingAliasBank", true);
        }
    },

    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to close / save the alias 
                    of the account / bank
    History
    <Date>			<Author>			<Description>
	26/03/2020		Guillermo Giral  	Initial version
    21/04/2020		Shahad Naji			Service callout
	*/
    closeSaveAlias : function(component, event, helper){
        var sourceId = event.currentTarget.id;
        switch(sourceId){
            case "saveAliasAccount":              
                helper.updateAccountAlias(component, helper ,sourceId,document.getElementById("aliasAccountInput").value);
                break;
            case "closeAliasAccount":
                component.set("v.editingAliasAccount", false);
                break;
            case "saveAliasBank":
                helper.updateBankAlias(component, helper ,sourceId,document.getElementById("aliasBankInput").value);
                break;
            case "closeAliasBank":
                component.set("v.editingAliasBank", false);
                break;
        }
    }
})