/*----------------------------------------------------------------------------------
Author:         A. Borraz
Company:        Deloitte
History
<Date>			<Author>		<Description>
24/11/2020		A. Borraz     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_GetPaymentDetail_Test {
	
    @TestSetup  
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
		main();
    }
   
    @isTest
    static void main(){
       CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(Name = 'WS_TrackingPaymentOperation',
                                                                       CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/operation_tracking/operation?originPlatform=gts&product_id={productId}&global_operation_id={paymentId}',
                                                                       CNT_HTTPMethod__c = 'GET',
                                                                       CNT_Service__c = 'Mulesoft');
       insert configWs;
       Test.setMock(HttpCalloutMock.class, new WS_GetPaymentDetail_Test_MockHttp());
       Test.startTest();
       WS_GetPaymentDetail wsGetPayment = new WS_GetPaymentDetail('Test');
        wsGetPayment.getResult();
        try{
            wsGetPayment.execute();
        }catch(Exception e){
            system.debug(e);
        }
	   Test.stopTest();
	}
}