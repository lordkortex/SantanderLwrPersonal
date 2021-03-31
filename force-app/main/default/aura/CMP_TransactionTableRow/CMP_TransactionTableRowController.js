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
    var source = component.get("v.sourcePage");
    if(component.get("v.sourcePage") != 'globalBalance'){
      source = 'transactionDropdown';
    }else{
      source = 'transactionGlobalBalance';
    }

    
    var amount =  component.get("v.transactionRow.amount")+' '+ component.get("v.transactionRow.currencyExtract");
    var url =
    "c__source="+source+
    "&c__account="+component.get("v.transactionRow.accountNumber")+
    "&c__valueDate="+component.get("v.transactionRow.valueDate")+
    "&c__clientRef="+component.get("v.transactionRow.refCliente")+
    "&c__bankRef=SAN"+component.get("v.transactionRow.refCliente")+
    "&c__bookDate="+component.get("v.transactionRow.bookDate")+
    "&c__category="+component.get("v.transactionRow.category")+
    "&c__amount="+amount+
    "&c__subsidiaryName="+component.get("v.accountName")+
    "&c__accountNumberTransaction="+component.get("v.accountNumber")+
    "&c__accountBank="+component.get("v.bank")+
    "&c__availableBalanceParam="+component.get("v.availableBalance")+
    "&c__bookBalanceParam="+component.get("v.bookBalance")+
    "&c__currencyTable="+component.get("v.accountCurrency")+
    "&c__description="+component.get("v.transactionRow.description")+
    "&c__showPills="+component.get("v.showPills")+
    "&c__pills="+JSON.stringify(component.get("v.pills"))+
    "&c__isSearching="+component.get("v.isSearching");
    console.log(url);
    
    component.find("service").redirect("transaction-detail-view",url);
    

   }
})