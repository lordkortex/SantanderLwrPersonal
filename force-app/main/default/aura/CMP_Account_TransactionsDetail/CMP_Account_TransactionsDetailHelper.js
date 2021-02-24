({
    /*
	Author:         Guillermo Giral
    Company:        Deloitte
    Description:    Function to get the URL params that is sended from the global balance component.
    History
    <Date>			<Author>			<Description>
	31/01/2020		Guillermo Giral  	Initial version
	*/
    getURLParams : function(component, event, helper) {

        try{
            var sPageURLMain = decodeURIComponent(window.location.search.substring(1));
            var sURLVariablesMain = sPageURLMain.split('&')[0].split("="); 
            var sParameterName;
            
            var sPageURL;
           

            if (sURLVariablesMain[0] == 'params') {
                this.decrypt(component,sURLVariablesMain[1]).then(function(results){
                    sURLVariablesMain[1] === undefined ? 'Not found' : sPageURL = results;

                    var sURLVariables=sPageURL.split('&');
                    console.log("Received data: " + sURLVariables);
                    
                    for ( var i = 0; i < sURLVariables.length; i++ ) {
                        sParameterName = sURLVariables[i].split('=');      
                        if(sParameterName[0] === 'c__source') {
                            sParameterName[1] === "undefined" ? component.set("v.source", "") : component.set("v.source",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__accountNumber') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.account", "") : component.set("v.transactionDetails.account",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__accountCode') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.accountCode", "") : component.set("v.transactionDetails.accountCode",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__valueDate') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.valueDate", "") : component.set("v.transactionDetails.valueDate",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__clientRef') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.clientRef", "") : component.set("v.transactionDetails.clientRef",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__bankRef') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.bankRef", "") : component.set("v.transactionDetails.bankRef",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__bookDate') {
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.bookDate", "") : component.set("v.transactionDetails.bookDate",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__category'){
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.category", "") : component.set("v.transactionDetails.category",sParameterName[1]);                            sParameterName[1] === undefined ? 'Not found' : component.set("v.availableBalanceParam",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__currentCurrency'){
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.currency", "") : component.set("v.transactionDetails.currency",sParameterName[1]);                            sParameterName[1] === undefined ? 'Not found' : component.set("v.availableBalanceParam",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__amount') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.amount", "") : component.set("v.transactionDetails.amount",sParameterName[1]);
                        } else if(sParameterName[0] === 'c__description') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.description", "") : component.set("v.transactionDetails.description",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__bank') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.bank", "") : component.set("v.transactionDetails.bank",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__aliasBank') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.aliasBank", "") : component.set("v.transactionDetails.aliasBank",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__alias') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.alias", "") : component.set("v.transactionDetails.alias",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__lastUpdate') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.lastUpdate", "") : component.set("v.transactionDetails.lastUpdate",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__subsidiaryName') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.corporate", "") : component.set("v.transactionDetails.corporate",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__mainAmount') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.bookBalance", "") : component.set("v.transactionDetails.bookBalance",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__availableAmount') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.availableBalance", "") : component.set("v.transactionDetails.availableBalance",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__country') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.country", "") : component.set("v.transactionDetails.country",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__countryName') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.countryName", "") : component.set("v.transactionDetails.countryName",sParameterName[1]);
                        }else if(sParameterName[0] === 'c__bic') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.bic", "") : component.set("v.transactionDetails.bic",sParameterName[1]);
                        }else if (sParameterName[0] === 'c__filters') { 
                            sParameterName[1] === "undefined" ? component.set("v.filters", []) : component.set("v.filters", JSON.parse(sParameterName[1]));	           
                        }else if (sParameterName[0] === 'c__formFilters') { 
                            sParameterName[1] === "undefined" ? component.set("v.formFilters", []) : component.set("v.formFilters", JSON.parse(sParameterName[1]));	           
                        }else if (sParameterName[0] === 'c__accountsData') { 
                            sParameterName[1] === "undefined" ? component.set("v.accountsData", []) : component.set("v.accountsData", JSON.parse(sParameterName[1]));	           
                        }else if (sParameterName[0] === 'c__accountCodeToInfo') { 
                            sParameterName[1] === "undefined" ? component.set("v.accountCodeToInfo", {}) : component.set("v.accountCodeToInfo", JSON.parse(sParameterName[1]));	           
                        }else if (sParameterName[0] === 'c__selectedTimeframe') { 
                            sParameterName[1] === "undefined" ? component.set("v.selectedTimeframe", "") : component.set("v.selectedTimeframe", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__dates') { 
                            sParameterName[1] === "undefined" ? component.set("v.dates", []) : component.set("v.dates", JSON.parse(sParameterName[1]));	           
                        }else if (sParameterName[0] === 'c__selectedFilters') { 
                            sParameterName[1] === "undefined" ? component.set("v.selectedFilters", []) : component.set("v.selectedFilters", JSON.parse(sParameterName[1]));	           
                        }else if (sParameterName[0] === 'c__codigoBic') { 
                            sParameterName[1] === "undefined" ? component.set("v.accountCodigoBic", {}) : component.set("v.accountCodigoBic", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__isIAM') { 
                            sParameterName[1] === "undefined" ? component.set("v.isIAM", false) : component.set("v.isIAM", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__accountStatus') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.accountStatus", "") : component.set("v.transactionDetails.accountStatus", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__localTransactionCode') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.localTransactionCode", "") : component.set("v.transactionDetails.localTransactionCode", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__localTransactionDescription') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.localTransactionDescription", "") : component.set("v.transactionDetails.localTransactionDescription", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__transactionBatchReference') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.transactionBatchReference", "") : component.set("v.transactionDetails.transactionBatchReference", sParameterName[1]);	           
                        
                        //AM - 28/09/2020 - Ebury Accounts
                        }else if (sParameterName[0] === 'c__dataProvider') { 
                            sParameterName[1] === "undefined" ? component.set("v.dataProvider", "") : component.set("v.dataProvider", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__transactionType') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.transactionType", "") : component.set("v.transactionDetails.transactionType", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__balanceResultAmount') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.balanceResultAmount", "") : component.set("v.transactionDetails.balanceResultAmount", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__customerAdditionalInformation') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.customerAdditionalInformation", "") : component.set("v.transactionDetails.customerAdditionalInformation", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__creditorAccountDetails') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.accountDetails", {}) : component.set("v.transactionDetails.accountDetails", JSON.parse(sParameterName[1]));	           
                        }else if (sParameterName[0] === 'c__debtorAccountDetails') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.accountDetails", {}) : component.set("v.transactionDetails.accountDetails", JSON.parse(sParameterName[1]));	
                        
                        // DA - 07/11/2020 - Ebury accounts
                        }else if (sParameterName[0] === 'c__codigoCorporate') { 
                            sParameterName[1] === "undefined" ? component.set("v.accountCodigoCorporate", {}) : component.set("v.accountCodigoCorporate", sParameterName[1]);	           
                        

                        //AM - 11/11/2020 - US6421: Campos Nuevos Nexus
                        }else if (sParameterName[0] === 'c__aditionalInformation') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.aditionalInformation", "") : component.set("v.transactionDetails.aditionalInformation", sParameterName[1]);	           
                        }else if (sParameterName[0] === 'c__customerAditionalInformation') { 
                            sParameterName[1] === "undefined" ? component.set("v.transactionDetails.customerAditionalInformation", "") : component.set("v.transactionDetails.customerAditionalInformation", sParameterName[1]);	           
                        }
                    }

                    component.set("v.doneLoadingScreen", true);
                });
            }

 
        } catch (e) {
            console.log(e);
        }
    
    },

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Function to decypt the URL params that is sended from the global balance component.
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
    }
})