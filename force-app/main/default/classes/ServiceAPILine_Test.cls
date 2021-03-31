@isTest
public class ServiceAPILine_Test {
    
    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createB2BOrderingFilters();
    }

    @isTest
    static void getAPILine_Test(){
        user u = DataFactory.getRunningUser(true);
        String res = MockResponse.wrapperUserData('OneTrade');
        WrapperUserData userData = (WrapperUserData) JSON.deserialize(res, WrapperUserData.class);
        
        String res1 = MockResponse.wrapperUserData('Nexus');
        WrapperUserData userData1 = (WrapperUserData) JSON.deserialize(res1, WrapperUserData.class);
        
        String res2 = MockResponse.wrapperUserData('Country Support');
        WrapperUserData userData2 = (WrapperUserData) JSON.deserialize(res2, WrapperUserData.class);
        
        String res3 = MockResponse.wrapperUserData('Batata');
        WrapperUserData userData3 = (WrapperUserData) JSON.deserialize(res3, WrapperUserData.class);
        
        System.runAs(u){
            Test.startTest();
            ServiceAPILine.getAPILine(u.Id);
            ServiceAPILine.getAPILine();
            ServiceAPILine.getAPILine(userData);
            ServiceAPILine.getAPILine(userData1);
            ServiceAPILine.getAPILine(userData2);
            ServiceAPILine.getAPILine(userData3);
           	Test.stopTest();
        }
    }
    
	@isTest
    static void isNexus_Test(){
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            ServiceAPILine.isNexus(u.Id);
            ServiceAPILine.isNexus();
           	Test.stopTest();
        }
    }

	@isTest
    static void isMultiOneTrade(){
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            ServiceAPILine.isMultiOneTrade(u.Id);
            ServiceAPILine.isMultiOneTrade();
           	Test.stopTest();
        }
    }      
   
    @isTest
    static void isLocalBanking_Test(){
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            ServiceAPILine.isLocalBanking(u.Id);
            ServiceAPILine.isLocalBanking();
           	Test.stopTest();
        }
    }
    
    @isTest
    static void isBackOfficeLocalBank_Test(){
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            ServiceAPILine.isBackOfficeLocalBank(u.Id);
			ServiceAPILine.isBackOfficeLocalBank();
            Test.stopTest();
        }
    }
    
    @isTest
    static void isBackOfficeGTSOperations_Test(){
        user u = DataFactory.getRunningUser(true);
        System.runAs(u){
            Test.startTest();
            ServiceAPILine.isBackOfficeGTSOperations(u.Id);
            ServiceAPILine.isBackOfficeGTSOperations();
           	Test.stopTest();
        }
    }
}