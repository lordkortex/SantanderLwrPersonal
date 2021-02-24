/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Test class for CNT_SwiftPaymentTable
History
<Date>			<Author>		<Description>
12/12/2019		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_SwiftPaymentTable_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    @isTest
    static void main(){
        Test.setMock(HttpCalloutMock.class, new CNT_SwiftPaymentTable_MockHttp());
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(Name = 'CNT_UETRPublic',
                                                                       CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/{{entorno}}/api/v1/payments_tracker_public_web/{payment_Id}',
                                                                       CNT_HTTPMethod__c = 'GET',
                                                                       CNT_Service__c = 'mulesoft');
        insert configWs;
        
        SNG_Payment__c payment = new SNG_Payment__c(SGN_TXT_IdPayment__c='Test');
		insert payment;
        
        Test.startTest();
        
        
        CNT_SwiftPaymentTable.getFilteredData('hola');
        CNT_SwiftPaymentTable.downloadMT103Doc('Test');
        try{
            CNT_SwiftPaymentTable.encryptData('Test');
        }catch(Exception e){
            system.debug(e);
        }
        
        CNT_SwiftPaymentTable.removeMT103('Test');
        CNT_SwiftPaymentTable.getDateAndTime('10/10/2020');
        CNT_SwiftPaymentTable.getUETR('Test');
        Test.stopTest();
	}
}