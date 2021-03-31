/*
    Author:         Andrea Martin
    Company:        Deloitte

    History:
    <Date>          <Author>            <Description>
    03/02/2021      Andrea Martin         Initial version
*/
@isTest
public class WS_ChannelServices_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true); 
    }
    
    @isTest
    static void execute_Test(){
        
        try{
            Test.setMock(HttpCalloutMock.class, new WS_ChannelServices_MockHttp());   
            WS_ChannelServices wsobject = new WS_ChannelServices();
            
            //    public WS_ChannelServices.OUTPUT execute () {

            String business_group= 'business_group';
            String customer_id = 'J101484427';
            List<String> service_id = new List<String>{'add_international_payment_internal'};
            List<String> contract_type_list = new List<String>{'contract_type_list'};
            List<String> contract_id_list =  new List<String>{'contract_id_list'};
            String status = 'active';
            String channelAccessAgreementId = 'web'; 
            
            Test.startTest();
				wsobject.execute(business_group, customer_id, service_id, contract_type_list, contract_id_list, status, channelAccessAgreementId);
           
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_ChannelServices_Test.executeGet: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    @isTest
    static void output_Test(){
        
        try{
            
            WS_ChannelServices.OUTPUT output = new WS_ChannelServices.OUTPUT();
            
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
           output.servicesDataList = servicesDataList;
            Test.stopTest();
        } catch (Exception e) {
            System.debug('WS_ChannelServices_Test.executeGet: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}