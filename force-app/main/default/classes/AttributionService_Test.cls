@isTest
private class AttributionService_Test {
    
    @testSetup 
    static void setup(){
       
    }     

    @isTest
    static void getAccountsByAttributionsAndServices_Test(){
        List<WRAPPER_AccountList.AccountDetails> accountList = DataFactory.getAccountList();
        String res = MockResponse.WS_Attributions();
        system.debug(res);
        WS_Attributions.OUTPUT AttributionsResponse = (WS_Attributions.OUTPUT) JSON.deserialize(res, WS_Attributions.OUTPUT.class);
        List<String> services = new List<String>{'add_international_payment_internal', 'add_international_payment_external', 'list_international_payments'};
            
        system.debug(AttributionsResponse);
        AttributionsService.getAccountsByAttributionsAndServices(accountList, AttributionsResponse.serviceListResponse.serviceDataList, services);
        
            
    }
    
}