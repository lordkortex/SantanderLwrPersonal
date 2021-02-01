@isTest
public class CNT_PAY_PaymentOptions_Test {

    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createClaims();
    }
    
    @isTest
    static void getPaymentDetail_Test(){
        Test.setMock(HttpCalloutMock.class, new CNT_PAY_PaymentOptions_MockHttp());

        Test.startTest();
        CNT_PAY_PaymentOptions.getPaymentDetail('12345');
        
        User u = DataFactory.getRunningUser(true);
        Profile p = [Select Id from Profile where Name = :System.Label.Profile_BackOffice_002];
        u.ProfileId = p.Id;
        update u;
        
        system.runAS(u){
            CNT_PAY_PaymentOptions.getPaymentDetail('12345');
        }
        Test.stopTest();
    }
    
    @isTest
    static void getUserMap_Test(){
        User u = DataFactory.getRunningUser(true);
        List<String> userList = new List<String>();
        userList.add(u.USER_TXT_GlobalId__c);
        CNT_PAY_PaymentOptions.getUserMap(userList);
    }
}