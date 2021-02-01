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
        System.runAs(u){
            Test.startTest();
            ServiceAPILine.getAPILine(u.Id);
            ServiceAPILine.getAPILine();
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