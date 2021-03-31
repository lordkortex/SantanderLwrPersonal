/*----------------------------------------------------------------------------------
Author:         Andrea Martín
Company:        Deloitte
History
<Date>			<Author>		<Description>
22/02/2021		Andrea Martín     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_STR_Limits_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true); 
        
    }
    
    @isTest 
    static  void getLimits_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_Limits',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/limit_management',
                CNT_HTTPMethod__c = 'GET',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            Test.setMock(HttpCalloutMock.class, new WS_STR_Limits_MockHttp.getLimitsResponse());
            
            WS_STR_Limits.INPUT input = new WS_STR_Limits.INPUT();
            input.customerId = 'GTS_PLATFORM_LIMIT';
            input.businessGroup = '2167130010391GTS';
            input.serviceId = 'add_international_payment_external';
            input.tcurrency = 'EUR';
            input.amountFrom = 200000.95;
            input.amountTo = 300000.45;
            input.status = 'active';
            Test.startTest();
            WS_STR_Limits.getLimits(input);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_Limits_Test.getLimits_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest 
    static  void updateLimit_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_Limits',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/limit_management',
                CNT_HTTPMethod__c = 'POST',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            
            Test.setMock(HttpCalloutMock.class, new WS_STR_Limits_MockHttp.getLimitsResponse());
            
            String body = '';
            String method = '';
            Test.startTest();
            WS_STR_Limits.updateLimit(body, method);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_Limits_Test.getLimits_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest 
    static  void output_test(){
        try{
            
            WS_STR_Limits.OUTPUT output =  (WS_STR_Limits.OUTPUT) JSON.deserialize(MockResponse.WS_STR_Limits(), WS_STR_Limits.OUTPUT.class);
            Test.startTest();
            for (Integer i = 0; i < output.operationLimitList.size(); i++){
                WS_STR_Limits.OperationLimit operationLimit = new WS_STR_Limits.OperationLimit();
                operationLimit.customerId = output.operationLimitList[i].customerId; 
                operationLimit.businessGroup = output.operationLimitList[i].businessGroup; 
                operationLimit.serviceId = output.operationLimitList[i].serviceId;
                operationLimit.status = output.operationLimitList[i].status;
                WS_STR_Limits.LimitAmount limitAmount = new WS_STR_Limits.LimitAmount();
                limitAmount.amount =  output.operationLimitList[i].limitAmount.amount;
                limitAmount.tcurrency = output.operationLimitList[i].limitAmount.tcurrency;
                operationLimit.limitAmount = limitAmount;
            }
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_Limits_Test.getLimits_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}