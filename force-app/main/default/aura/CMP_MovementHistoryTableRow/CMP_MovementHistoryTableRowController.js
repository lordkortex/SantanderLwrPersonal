({

    /*
	Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Method to redirect to the next page
    History
    <Date>			<Author>			<Description>
	26/12/2019		Pablo Tejedor   	Initial version
	*/
    navigateToDetailsComponent : function(component, event, helper) {
    
        var url= "c__accountNumberAndEntity="+component.get("v.accountNumberAndEntity")
        +"&c__accountInteger="+component.get("v.accountInteger")
        +"&c__accountDecimals="+component.get("v.accountDecimals")
        +"&c__extractDate="+component.get("{!v.HistoricoObject.fechaContable}")
        +"&c__bookDateParam="+component.get("{!v.HistoricoObject.bookDate}")
        +"&c__selectedAccountSearch="+component.get("v.SelectedAccount")
        +"&c__accountNumberBank="+component.get("v.accountNumberBank")
        +"&c__accountName="+component.get("v.accountName")
        +"&c__lastFinalBalance="+component.get("v.lastHistoryFinalBalance.bookBalance")
        +"&c__currencyTable="+component.get("v.lastHistoryFinalBalance.currencyTable")
        +"&c__source="+component.get("v.sourceMovementHistory")
        +"&c__dateFrom="+component.get("v.dateFrom")
        +"&c__dateTo="+component.get("v.dateTo")
        +"&c__availableBalanceParam="+component.get("v.availableBalanceParam")
        +"&c__bookBalanceParam="+component.get("v.bookBalanceParam")
        +"&c__currencyHistoric="+component.get("v.currencyTable");


        // We need to check for the whole navigation path (source) so it can be checked whether
        // the previous window was "History of extracts" or "Global Balance > History of extracts"
        if(component.get("v.source").includes($A.get("$Label.c.International_Treasury_Management"))){
            url+="&c__source=historyofextracts";
        }        
        
        helper.encrypt(component, url).then(function(results){
            let navService = component.find("navService");

            let pageReference = {
                type: "comm__namedPage",
                attributes: {
                    pageName: "movementhistorydetail"
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