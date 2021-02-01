/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Apex class to filter accounts received from "" or "" service 
Test Class:     CNT_PaymentsParent_Test
History
<Date>          <Author>        <Description>
12/11/2020      Shahad Naji     Initial version
----------------------------------------------------------------------------------*/
global with sharing class ServiceFilterAccounts {
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Method to discard accounts by country 
History
<Date>          <Author>             <Description>
12/11/2020     Shahad Naji        Initial version
----------------------------------------------------------------------------------*/    
    //PAY_DiscardAccountsByCountry custom label
    @AuraEnabled
    global static ReturnValue discardAccountsByCountry (List<WRAPPER_AccountList.AccountDetails> accountList, List<String> countries){
        ReturnValue rv = null;
        Map<String, Object> value = new Map<String, Object>();
        try{
            Set<WRAPPER_AccountList.AccountDetails> result = new Set<WRAPPER_AccountList.AccountDetails>();
            List<String> accountIds = new List<String>();
           if(!accountList.isEmpty() && !countries.isEmpty()){   
                
                for(WRAPPER_AccountList.AccountDetails account : accountList){
                    if(!countries.contains(account.country)){
                        result.add(account);
                    }  
                } 
             
            } 
            
            value.put('accountList', result);
            rv = new ReturnValue(true, value);
        } catch (Exception e) {
            System.debug('ServiceFilterAccounts.discardAccountsByCountry: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            rv = new ReturnValue(false, null, e.getMessage());
        }        
        return rv;
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji 
Company:        Deloitte
Description:    Get the list of accounts filtered by country and/or currency, to submit a "book to book" payment
of them
History
<Date>          <Author>             <Description>
30/09/2020      Shahad Naji        	Initial version
26/10/2020 		Shahad Naji 		Call ServiceAPILine.getAPILine(...) to retrieve source data
28/10/2020		Shahad Naji			Filter accounts by country and/or currency taking into consideration the API LINE (MULTI_ONE_TRADE, NEXUS or LOCAL_BANKING)
----------------------------------------------------------------------------------*/
    @AuraEnabled
    global static ReturnValue filterAccountsByCountryAndCurrency(WrapperUserData userData, List<WRAPPER_AccountList.AccountDetails> accountLst){
        ReturnValue response = null;
        Map<String, Object> value = new Map<String, Object>();
        Set<WRAPPER_AccountList.AccountDetails> responseAccountLst = new Set<WRAPPER_AccountList.AccountDetails>();
        try{
            if(userData == null){
                userData = ServiceUserData.getUserData();
            }
            if(userData != null && accountLst != null){
                String serviceAPILine = ServiceAPILine.getAPILine (userData);
                if(!accountLst.isEmpty()){                 
                    
                    if(serviceAPILine == System.Label.PAY_ServiceAPILine_001){  //MULTI_ONE_TRADE
                        List<Multi_One_Trade_B2B_Ordering_Filters__c> filterValues = Global_Utilities.getMultiOneTradeB2BOrderingFilters();
                        for(WRAPPER_AccountList.AccountDetails acc : accountLst){                           
                            for(Multi_One_Trade_B2B_Ordering_Filters__c fv : filterValues){
                                if(acc.country.equalsIgnoreCase(fv.B2B_TXT_Country_ISO_Code__c)){                                    
                                    if(String.isNotEmpty(fv.B2B_TXT_Currencies__c)){
                                        List<String> currencyLst = fv.B2B_TXT_Currencies__c.split(';');                                        
                                        if(currencyLst.contains(acc.currencyCodeAvailableBalance)){
                                            responseAccountLst.add(acc);
                                        }                                        
                                    }else{
                                        responseAccountLst.add(acc);
                                    }
                                }
                            }
                        }
                        value.put('accountList', responseAccountLst);                    
                        response = new ReturnValue(true, value);
                    }else if(serviceAPILine == System.Label.PAY_ServiceAPILine_002){//NEXUS
                        List<Nexus_B2B_Ordering_Filters__c> filterValues = Global_Utilities.getNexusB2BOrderingFilters();
                        for(WRAPPER_AccountList.AccountDetails acc : accountLst){                           
                            for(Nexus_B2B_Ordering_Filters__c fv : filterValues){
                                if(acc.country.equalsIgnoreCase(fv.B2B_TXT_Country_ISO_Code__c)){
                                    if(String.isNotEmpty(fv.B2B_TXT_Currencies__c)){
                                        List<String> currencyLst = fv.B2B_TXT_Currencies__c.split(';');
                                        if(currencyLst.contains(acc.currencyCodeAvailableBalance)){
                                            responseAccountLst.add(acc);
                                        }
                                    }else{
                                       responseAccountLst.add(acc); 
                                    }                                    
                                }
                            }
                        }
                        value.put('accountList', responseAccountLst);                    
                        response = new ReturnValue(true, value);
                    }
                    else if(serviceAPILine == System.Label.PAY_ServiceAPILine_003){ //LOCAL_BANKING
                        value.put('accountList', accountLst);                    
                        response = new ReturnValue(true, value);
                    }else{
                        response = new ReturnValue(false);
                    }                    
                }
            }
        }
        catch (Exception e) {
            System.debug('ServiceFilterAccounts.filterAccountsByCountryAndCurrency: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            response = new ReturnValue(false, null, e.getMessage());
        }
        
        return response;
    }
    
    
}