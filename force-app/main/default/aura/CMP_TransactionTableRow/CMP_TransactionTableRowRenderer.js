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

    var url =
    "c__source="+component.get("v.source")+
    "&c__account="+component.get("v.transactionRow.accountNumber")+
    "&c__valueDate="+component.get("v.transactionRow.valueDate")+
    "&c__clientRef="+component.get("v.transactionRow.refCliente")+
    "&c__bankRef=SAN"+component.get("v.transactionRow.refCliente")+
    "&c__bookDate="+component.get("v.transactionRow.bookDate")+
    "&c__category="+component.get("v.transactionRow.category")+
    "&c__amount="+component.get("v.transactionRow.amount")+
    "&c__description="+component.get("v.transactionRow.description")+
    "&c__isSearching="+component.get("v.isSearching");
    
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