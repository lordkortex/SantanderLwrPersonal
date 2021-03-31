/*----------------------------------------------------------------------------------
Author:         Andrea Martín
Company:        Deloitte
History
<Date>			<Author>		<Description>
22/01/2021		Andrea Martín     Initial version
----------------------------------------------------------------------------------*/

@isTest
public class ServiceChannelServices_Test {
    @testSetup  
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);  
    }
    @isTest
    static void filterAccountsByChannelServices_Test(){
        try {  
           // Test.setMock(HttpCalloutMock.class, new ServiceFilterAccounts_MockHttp());
            Test.setMock(HttpCalloutMock.class, new WS_ChannelServices_MockHttp());

            
            String str = MockResponse.wrapperUserData('Nexus');
            WrapperUserData userData = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class); 
            str = MockResponse.wrapperUserData('LOCAL_BANKING');
            WrapperUserData userData_LB = (WrapperUserData) JSON.deserialize(str, WrapperUserData.class);
            userData_LB.country = 'PL';

            String str1 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
            WRAPPER_AccountList.AccountDetails accountDetails_ES = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str1, WRAPPER_AccountList.AccountDetails.class);
            str1 = MockResponse.AccountList_AccountDetails('GB', 'GBR');
            WRAPPER_AccountList.AccountDetails accountDetails_GB = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str1, WRAPPER_AccountList.AccountDetails.class);
            str1 = MockResponse.AccountListAccountDetails_ES();
            WRAPPER_AccountList.AccountDetails accountDetails_ES2 = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str1, WRAPPER_AccountList.AccountDetails.class);

            List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
            accountList.add(accountDetails_ES);
            accountList.add(accountDetails_GB);
             accountList.add(accountDetails_ES2);
            
            List<String> services = new List<String>{'add_international_payment_internal', 'add_international_payment_external', 'list_international_payments'};
                
                //filterAccountsByChannelServices (WrapperUserData userData, List<WRAPPER_AccountList.AccountDetails> accountList, List<String> services){
            Test.startTest();
            
            ServiceChannelServices.filterAccountsByChannelServices(userData, accountList, services);
            ServiceChannelServices.filterAccountsByChannelServices(userData_LB, accountList, services);
            // getAccountsByChannelServiceAndServices (List<WRAPPER_AccountList.AccountDetails> accountList, List<WS_ChannelServices.ServicesDataList> servicesDataList, List<String> services) 
            Test.stopTest();
            
            
        } catch (Exception e) {
            System.debug('ServiceChannelServices.filterAccountsByChannelServices_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        
    }
    
        @isTest
    static void getAccountsByChannelServiceAndServices_Test(){
        try {  
            //Test.setMock(HttpCalloutMock.class, new ServiceFilterAccounts_MockHttp());
            Test.setMock(HttpCalloutMock.class, new WS_ChannelServices_MockHttp());

            String str1 = MockResponse.AccountList_AccountDetails('ES', 'EUR');
            WRAPPER_AccountList.AccountDetails accountDetails_ES = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str1, WRAPPER_AccountList.AccountDetails.class);
            str1 = MockResponse.AccountList_AccountDetails('GB', 'GBR');
            WRAPPER_AccountList.AccountDetails accountDetails_GB = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str1, WRAPPER_AccountList.AccountDetails.class);
            str1 = MockResponse.AccountListAccountDetails_ES();
            WRAPPER_AccountList.AccountDetails accountDetails_ES2 = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(str1, WRAPPER_AccountList.AccountDetails.class);

            List<WRAPPER_AccountList.AccountDetails> accountList = new List<WRAPPER_AccountList.AccountDetails>();
            accountList.add(accountDetails_ES);
            accountList.add(accountDetails_GB);
             accountList.add(accountDetails_ES2);
            
            List<String> services = new List<String>{'add_international_payment_internal', 'add_international_payment_external', 'list_international_payments'};
           
            List<WS_ChannelServices.ContractsList> contractsList = new List<WS_ChannelServices.ContractsList>();
            WS_ChannelServices.ContractsList contract = new WS_ChannelServices.ContractsList();
            contract.contractId = 'contractId_Test';
            contract.operativityIndicatorContract = 'Operative';
            contract.contractType = 'contractType_Test';
            contractsList.add(contract);
            
            List<WS_ChannelServices.ServicesDataList> servicesDataList =  new List<WS_ChannelServices.ServicesDataList>(); 
            WS_ChannelServices.ServicesDataList servicesData = new WS_ChannelServices.ServicesDataList();
            servicesData.serviceId = 'add_international_payment_internal'; 
            servicesData.contractsList = contractsList; 
            servicesDataList.add(servicesData);
            
            Test.startTest();
            
            ServiceChannelServices.getAccountsByChannelServiceAndServices( accountList, servicesDataList, services);
            
            Test.stopTest();
            
            
        } catch (Exception e) {
            System.debug('ServiceChannelServices.filterAccountsByChannelServices_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        
    }
    
}