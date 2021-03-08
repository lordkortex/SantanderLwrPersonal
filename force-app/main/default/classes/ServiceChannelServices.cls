global with sharing class ServiceChannelServices {
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Method to get accounts filtered by channel services response
History
<Date>          <Author>             <Description>
26/01/2021		Shahad Naji       	Initial version
----------------------------------------------------------------------------------*/ 
    global static List<WRAPPER_AccountList.AccountDetails> filterAccountsByChannelServices (WrapperUserData userData, List<WRAPPER_AccountList.AccountDetails> accountList, List<String> services){
        List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>();
        try{
            
            Boolean multipleCallouts = false;
           
            multipleCallouts = ServiceChannelServices.isChannelAccessAgreementIdRequired (userData);   
            
            if(multipleCallouts){
                system.debug('>>> HERE multipleCallouts: ' + multipleCallouts);
                accountListResponse =  ServiceChannelServices.executeMultipleCallouts(accountList, services);
            }else{
                accountListResponse = ServiceChannelServices.executeOneCallout(accountList, services);
            } 
        } catch (Exception e) {
            System.debug('ServiceChannelServices.filterAccountsByChannelServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            accountListResponse = null;
        }
        return accountListResponse;
    }
    
    @TestVisible
    private static List<WRAPPER_AccountList.AccountDetails> executeMultipleCallouts(List<WRAPPER_AccountList.AccountDetails> accountList, List<String> services){
        List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>();
        try{
            Set<String> customerIdList = new Set<String>();
            customerIdList = getCustomerIdSet(accountList);
            
            if(customerIdList != null){
                if(!customerIdList.isEmpty()){
                    List<WS_ChannelServices.ServicesDataList> servicesDataList = new List<WS_ChannelServices.ServicesDataList>();
                    for(String customerId : customerIdList){
                        String channel_access_agreement_id = customerId;
                        WS_ChannelServices.OUTPUT output = new WS_ChannelServices.OUTPUT();  
                        WS_ChannelServices wsChannelServices = new WS_ChannelServices();
                        output = wsChannelServices.execute(null, null, services, null, null, null, channel_access_agreement_id);
                        if(output != null){
                            if(output.servicesDataList != null){
                                if(!output.servicesDataList.isEmpty()){
                                    servicesDataList.addAll(output.servicesDataList);
                                }
                            }
                        }
                    }
                    
                    if(servicesDataList != null){
                        if(!servicesDataList.isEmpty()){
                            accountListResponse = ServiceChannelServices.getAccountsByChannelServiceAndServices (accountList, servicesDataList, services);
                        }else{
                            accountListResponse = null; 
                        } 
                    }else{
                        accountListResponse = null; 
                    }                    
                }else{
                    accountListResponse = null; 
                }
            }else{
                accountListResponse = null; 
            }      
            
        } catch (Exception e) {
            System.debug('ServiceChannelServices.executeMultipleCallouts: ' + e.getMessage() + ', in line: ' + e.getLineNumber());  
            accountListResponse = null;
        }
        return accountListResponse;
    }
    
    @TestVisible
    private static List<WRAPPER_AccountList.AccountDetails> executeOneCallout(List<WRAPPER_AccountList.AccountDetails> accountList, List<String> services){
        List<WRAPPER_AccountList.AccountDetails> accountListResponse = new List<WRAPPER_AccountList.AccountDetails>();
        try{            
            if(accountList != null){
                if(!accountList.isEmpty()){
                    WS_ChannelServices wsChannelServices = new WS_ChannelServices();
                    wsChannelServices.execute(null, null, services, null, null, null, null);
                    if(wsChannelServices.getResponse() != null){                        
                        if(wsChannelServices.getResponse().servicesDataList != null){
                            accountList = ServiceChannelServices.getAccountsByChannelServiceAndServices (accountList, wsChannelServices.getResponse().servicesDataList, services);
                            accountListResponse =  accountList;
                        }                          
                    }
                }
            }            
        } catch (Exception e) {
            System.debug('ServiceChannelServices.executeOneCallout: ' + e.getMessage() + ', in line: ' + e.getLineNumber());  
            accountListResponse = null;
        }
        return accountListResponse;
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Julian Hoyos
Company:        Deloitte
Description:    Method to get the list of accounts filtered by a certain list of services 

History
<Date>          <Author>             <Description>
18/11/2020     Julian Hoyos        	Initial version
29/11/2020		Shahad Naji 		Revised WS_ChannelServices parameters
26/01/2021		Shahad Naji			Removes the method from ServiceFilterAccounts class and add it into this class 
----------------------------------------------------------------------------------*/ 
    @TestVisible 
    private static List<WRAPPER_AccountList.AccountDetails> getAccountsByChannelServiceAndServices (List<WRAPPER_AccountList.AccountDetails> accountList, List<WS_ChannelServices.ServicesDataList> servicesDataList, List<String> services) {
        List<WRAPPER_AccountList.AccountDetails> res = new List<WRAPPER_AccountList.AccountDetails>(); 
        try {
            List<String> contractIds = ServiceChannelServices.filterAccountsByChannelServices(servicesDataList, services);            
            for (WRAPPER_AccountList.AccountDetails account : accountList) {
                if (contractIds.contains(account.displayNumber)) {
                    res.add(account);
                }
            }
        } catch (Exception e) {
            System.debug('ServiceChannelServices.getAccountsByChannelServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
    
    
    /*----------------------------------------------------------------------------------
Author:         Julian Hoyos
Company:        Deloitte
Description:    Method to get the list of contractsIds filtered by services list values and operativityIndicatorContract 

History
<Date>          <Author>             <Description>
18/11/2020     	Shahad Naji         Initial version
29/11/2020		Shahad Naji 		Revised WS_ChannelServices parameters
26/01/2021		Shahad Naji			Removes the method from ServiceFilterAccounts class and add it into this class 
----------------------------------------------------------------------------------*/    
    @TestVisible
    private static List<String> filterAccountsByChannelServices(List<WS_ChannelServices.ServicesDataList> servicesDataList, List<String> services) {
        List<String> res = new List<String>(); 
        try {
            for(WS_ChannelServices.ServicesDataList serviceData : servicesDataList){
                if(String.isNotBlank(serviceData.serviceId)){
                    if(services.contains(serviceData.serviceId)){
                        if(serviceData.contractsList != null){
                            if(!serviceData.contractsList.isEmpty()){
                                system.debug('>>> HERE serviceData.contractsList.size(): ' + serviceData.contractsList.size());
                                for(WS_ChannelServices.ContractsList contractData : serviceData.contractsList){
                                    if(String.isNotBlank(contractData.operativityIndicatorContract)){
                                        if(contractData.operativityIndicatorContract == 'Operative'){
                                            if(String.isNotBlank(contractData.contractId)){
                                                res.add(contractData.contractId);
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                        
                    }
                }                   
                
            }
        } catch (Exception e) {
            System.debug('ServiceChannelServices.filterAccountsByChannelServices: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        return res;
    }
    
    @TestVisible 
    private static Boolean isChannelAccessAgreementIdRequired (WrapperUserData userData){
        Boolean isChannelAccessAgreementIdRequired = false;
        try{
            if(userData != null){
                if(userData.country == 'PL'){
                    isChannelAccessAgreementIdRequired = true;
                }   
            }
              
        } catch (Exception e) {
            System.debug('ServiceChannelServices.isChannelAccessAgreementIdRequired: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return null;            
        }    
        return isChannelAccessAgreementIdRequired;
    }
    
    
    
    /*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Method to get a set of customer ids of the accounts that belong to the current user
History
<Date>          <Author>             <Description>
27/01/2021		Shahad Naji       	Initial version
----------------------------------------------------------------------------------*/ 
    @TestVisible 
    private static Set<String> getCustomerIdSet( List<WRAPPER_AccountList.AccountDetails> accountList){
        Set<String> customerIds = new Set<String>();
        try{
            for(WRAPPER_AccountList.AccountDetails acc : accountList){
                if(String.isNotBlank(acc.customerId)){
                    if(!customerIds.contains(acc.customerId)){
                        customerIds.add(acc.customerId);
                    }  
                }                
            }
            system.debug('>>> HERE customerIds: ' + customerIds);
        } catch (Exception e) {
            System.debug('ServiceChannelServices.getCustomerIdSet: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
            return null;            
        } 
        return customerIds;
    }
    
    
     
}