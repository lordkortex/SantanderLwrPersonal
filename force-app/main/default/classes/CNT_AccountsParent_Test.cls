@IsTest
public class CNT_AccountsParent_Test {
    
    @testSetUp
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @IsTest
    static void getBalanceDataTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AccountsParent_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
        	CNT_AccountsParent listaWrapper = CNT_AccountsParent.getBalanceData('EndOfDay',u.Id);
        	CNT_AccountsParent listaWrapper2 = CNT_AccountsParent.getBalanceData('lastUpdate',u.Id);
           	Test.stopTest();
        }
        
    }

    @IsTest
    static void setUserCurrencyTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AccountsParent_MockHttp());
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
        	CNT_AccountsParent.setUserCurrency('EUR');
			Test.stopTest();
        }
    }   
    
    @IsTest
    static void setAccountBalanceTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AccountsParent_MockHttp());
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            CNT_AccountsParent.setAccountBalance('lastUpdate', UserInfo.getUserId(), new CNT_AccountsParent());
            CNT_AccountsParent.setAccountBalance('oneTrade', UserInfo.getUserId(), new CNT_AccountsParent());
            Test.stopTest();
        }
    }
    
    @IsTest
    static void retrieveDataLUTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AccountsParent_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            WRAPPER_Balance_LU data = CNT_AccountsParent.retrieveDataLU('');
            Test.stopTest();
        }
    }
    
    @IsTest
    static void retrieveDataTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AccountsParent_MockHttp());
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            WRAPPER_Balance data = CNT_AccountsParent.retrieveData('endOfDay');
            Test.stopTest();
        }
    }
    
    @IsTest
    static void getCountryNameTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AccountsParent_MockHttp());
        Test.startTest();
        String data = CNT_AccountsParent.getCountryName('');
        Test.stopTest();
    }
    
     @IsTest
    static void returnRandomSpanTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AccountsParent_MockHttp());
        Test.startTest();
        CNT_AccountsParent.returnRandomSpan();
        Test.stopTest();
    }
    
     @IsTest
    static void returnRandomSampleTest(){
        Test.setMock(HttpCalloutMock.class, new CNT_AccountsParent_MockHttp());
        Integer probability = 12;
        Test.startTest();
        CNT_AccountsParent.returnRandomSample(probability);
        Test.stopTest();
    }
}