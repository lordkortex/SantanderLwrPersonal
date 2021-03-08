/*----------------------------------------------------------------------------------
Author:         Andrea Martín
Company:        Deloitte
History
<Date>			<Author>		<Description>
22/01/2021		Andrea Martín     Initial version
----------------------------------------------------------------------------------*/

@isTest
public class WS_TransfersBeneficiaries_Test {
 @testSetup  
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);  
    }
    @isTest
    static void executeGet_test(){
        try {
            
            Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp());            
            WS_TransfersBeneficiaries wsObject = new WS_TransfersBeneficiaries();
            
            WS_TransfersBeneficiaries.OUTPUT output = new WS_TransfersBeneficiaries.OUTPUT();
            Test.startTest();
            output = WS_TransfersBeneficiaries.executeGet();
            Test.stopTest();
            
            
        } catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.executeGet: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
        
    }
        @isTest
    static void executePost_test(){
        try {

        Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp());            
        //WS_TransfersBeneficiaries wsObject = new WS_TransfersBeneficiaries();

        WRAPPER_AccountList.AccountDetails sourceAccount = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.AccountListAccountDetails_ES(), WRAPPER_AccountList.AccountDetails.class);
        WRAPPER_AccountList.AccountDetails dataGB = (WRAPPER_AccountList.AccountDetails) JSON.deserialize(MockResponse.sourceAccount_Fraud(), WRAPPER_AccountList.AccountDetails.class);
        WS_TransfersBeneficiaries.BeneficiaryData benefData = ServiceTransfersBeneficiaries.createBeneficiaryData(dataGB, sourceAccount);
		WS_TransfersBeneficiaries.OUTPUT output = new WS_TransfersBeneficiaries.OUTPUT();

        Test.startTest();
            output  = WS_TransfersBeneficiaries.executePost(benefData);
        Test.stopTest();           
       	} catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.executePost: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }   
    }
            @isTest
    static void output_test(){
        try {

        Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp());            
        //WS_TransfersBeneficiaries wsObject = new WS_TransfersBeneficiaries();
        WS_TransfersBeneficiaries.OUTPUT output = new WS_TransfersBeneficiaries.OUTPUT();
        WS_TransfersBeneficiaries.OutBeneficiaryList beneficiaryList = new WS_TransfersBeneficiaries.OutBeneficiaryList();
        WS_TransfersBeneficiaries.BeneficiaryData beneficiaryData =  new WS_TransfersBeneficiaries.BeneficiaryData();
        WS_TransfersBeneficiaries.Account account = new WS_TransfersBeneficiaries.Account();
        WS_TransfersBeneficiaries.Bank bank = new WS_TransfersBeneficiaries.Bank();
        WS_TransfersBeneficiaries.Address address = new WS_TransfersBeneficiaries.Address();
            
        account.accountId = '09072322275601';
        account.accountIdType = 'accountIdType_TEST';
        account.accountType = 'accountType_Type';
            
        bank.bankAddress = 'bankAddress_TEST';
        bank.bankbranchId = 'bankbranchId_TEST';
        bank.bankCountry = 'GB';
        bank.bankId = 'ABBYGB20XXX';
        bank.bankIdType = 'BBA';
        bank.bankName = 'SANTANDER UK PLC';
        
        address.addressAddition = 'addressAddition_TEST';
        address.addressType = 'addressType_TEST'; 
        address.buildingName = 'buildingName_TEST';
        address.country= 'ES';
        address.countyIdentification= 'countyIdentification_TEST'; 
        address.department = 'department_TEST'; 
        address.districtName = 'districtName_TEST';
        address.floor = 'floor_TEST';
        address.location = 'location_TEST';
        address.postCodeIdentification = 'postCodeIdentification_TEST';
        address.postOfficeBox = 'postOfficeBox_TEST';
        address.province = 'province_TEST';
        address.regionIdentification = 'regionIdentification_TEST';
        address.state = 'state_TEST';
        address.streetBuildingIdentification = 'streetBuildingIdentification_TEST'; 
        address.streetName = 'Calle Patones'; 
        address.subDepartment = 'subDepartment_TEST'; 
        address.townName = 'Madrid';
        
        beneficiaryData.beneficiaryId = 'id';
        beneficiaryData.emailAddress = 'email';
        beneficiaryData.account = account; 
        beneficiaryData.address = address; 
        beneficiaryData.alias = 'OTHER VT'; 
        beneficiaryData.bank = bank; 
        beneficiaryData.beneficiaryName = 'beneficiaryName_TEST'; 
        beneficiaryData.companyGlobalId = 'companyGlobalId_TEST';
        beneficiaryData.documentNumber = 'documentNumber_TEST'; 
        beneficiaryData.documentType = 'documentType_TEST';
        beneficiaryData.favorite = true; 
        beneficiaryData.lastUsedDate = '2021-01-26T08:24:48Z';
        beneficiaryData.name = 'name_TEST';
        beneficiaryData.phoneNumber = 'phoneNumber_TEST';
        beneficiaryData.residenceCountry = 'residenceCountry_TEST';
        beneficiaryData.residenceIndicator = 'residenceIndicator_TEST';
        beneficiaryData.visibility = 'visibility_TEST';
        
        beneficiaryList.beneficiaryData[0] = beneficiaryData ;

   
            
        Test.startTest();
            output.beneficiaryList[0] = beneficiaryData;
        Test.stopTest();           
       	} catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.executePost: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }   
    }
                @isTest
    static void outputError_test(){
        try {
            WS_TransfersBeneficiaries.OUTPUT output = new WS_TransfersBeneficiaries.OUTPUT();
            WS_TransfersBeneficiaries.Error error = new WS_TransfersBeneficiaries.Error();
            error.code = 'test';
            error.description = 'test';
            error.level ='test';
            error.message = 'test';
            List<WS_TransfersBeneficiaries.Error> listErrors = new List<WS_TransfersBeneficiaries.Error>();
            listErrors.add(error);
           Test.startTest();
            output.errors = listErrors;
        Test.stopTest();           
       	} catch (Exception e) {
            System.debug('WS_TransfersBeneficiaries.executePost: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }   
    }
}