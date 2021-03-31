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
           WRAPPER_AccountList.AccountDetails sourceAccountGB = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
           WRAPPER_AccountList.AccountDetails sourceAccountES = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.destinationAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);


            Test.startTest();
            ServiceTransfersBeneficiaries.getBeneficiaries();
            ServiceTransfersBeneficiaries.getBeneficiaries(sourceAccountGB);
            ServiceTransfersBeneficiaries.getBeneficiaries(sourceAccountES);

            Test.stopTest();
            
        } catch (Exception e) {
            System.debug('ServiceTransfersBeneficiaries_Test.getBeneficiariesTest: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
       @isTest
    static void registerNewBeneficiaryTest() {
        try{

            WRAPPER_AccountList.AccountDetails data = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
            WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.destinationAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
            Test.startTest();
            ServiceTransfersBeneficiaries.registerNewBeneficiary(data, sourceAccount);
            data.country = 'PL'; 
            data.displayNumber = 'PL37ABBY090724452832890000';
            ServiceTransfersBeneficiaries.registerNewBeneficiary(data, sourceAccount);
            data.country = 'ES'; 
            data.displayNumber = 'ES37ABBY0907244528328900';
            ServiceTransfersBeneficiaries.registerNewBeneficiary(data, sourceAccount);
            data.country = 'BR'; 
            data.displayNumber = 'BR37ABBY090724452832890000022';
            ServiceTransfersBeneficiaries.registerNewBeneficiary(data, sourceAccount);
            ServiceTransfersBeneficiaries.registerNewBeneficiary(data);
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