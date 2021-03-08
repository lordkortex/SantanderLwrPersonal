@isTest
public class ServiceTransfersBeneficiaries_Test {
      
    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void getBeneficiariesTest() {

         Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp.OperationsResponse());
        try{
            Test.startTest();
            ServiceTransfersBeneficiaries.getBeneficiaries();
            Test.stopTest();
            
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries_Test.getBeneficiariesTest: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
       @isTest
    static void registerNewBeneficiaryTest() {
        try{

          WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountListAccountDetails_ES(), WRAPPER_AccountList.AccountDetails.class);
          WRAPPER_AccountList.AccountDetails dataGB = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
         // WRAPPER_AccountList.AccountDetails dataES = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.destinationAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);

          WRAPPER_AccountList.AccountDetails dataES = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountListAccountDetails_ES(), WRAPPER_AccountList.AccountDetails.class);

            Test.startTest();
            ServiceTransfersBeneficiaries.registerNewBeneficiary(dataGB);
            ServiceTransfersBeneficiaries.registerNewBeneficiary(dataES);

            ServiceTransfersBeneficiaries.registerNewBeneficiary(dataGB, sourceAccount);
            ServiceTransfersBeneficiaries.registerNewBeneficiary(dataES, sourceAccount);

            Test.stopTest();
            
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries_Test.registerNewBeneficiaryTest: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
           @isTest
    static void completeAccountDetailsTest() {
        try{

          //WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
          WRAPPER_AccountList.AccountDetails data = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
            
            Test.startTest();
            ServiceTransfersBeneficiaries.completeAccountDetails(data);
            Test.stopTest();
            
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries_Test.completeAccountDetailsTest: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
               @isTest
    static void createBeneficiaryDataTest() {
        try{

          //WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
          WRAPPER_AccountList.AccountDetails data = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
            
            Test.startTest();
            ServiceTransfersBeneficiaries.createBeneficiaryData(data);
            Test.stopTest();
            
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries_Test.createBeneficiaryDataTest: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}