@isTest
public class WS_ExchangeRate_Test {
      
    @testSetup
    static void setup () {
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createClaims();
    }
    
    @isTest
    static void execute() {

         Test.setMock(HttpCalloutMock.class, new WS_TransfersBeneficiaries_MockHttp.OperationsResponse());
        try{
            String integrationType = 'b2b';
            String integrationType_iip = 'iip';

            String payment_id = 'f548286b75ca42e7ad5c5602589338c7';
            String requestType = 'GET';
            String priceType = 'ONI';
            String requestPurpose = 'requestPurpose_test';
            Integer timer = 25000;
            String str = MockResponse.B2BData_AccountData(); 
       		WRAPPER_B2B_Data.AccountData accountData = (WRAPPER_B2B_Data.AccountData) JSON.deserialize(str, WRAPPER_B2B_Data.AccountData.class);
            //    global WS_ExchangeRate (String payment_id, String integrationType, String requestType, String priceType, WRAPPER_B2B_Data.AccountData accountData) {

			WS_ExchangeRate wsExchangeRate = new WS_ExchangeRate(payment_id,integrationType, requestType, priceType, accountData);
            //    global void setParameters (String payment_id, String integrationType, String requestType, String priceType, WRAPPER_B2B_Data.AccountData accountData, Integer timer) {

            WS_ExchangeRate wsExchangeRate_1 = new WS_ExchangeRate(payment_id,integrationType_iip, requestType, priceType, accountData, timer);
            WS_ExchangeRate wsExchangeRate_2 = new WS_ExchangeRate(payment_id,integrationType, requestType, priceType, accountData, timer, requestPurpose);

			//WS_ExchangeRate_MockHttp
			Decimal amountSend = 10; 
            Decimal amountReceive = 10; 
			String currencySend = 'EUR';
            String currencyReceiver = 'EUR';
            String sourceAlias = 'OTHER VT';
            String sourceAliasEntidad = 'OTHER VT';
            String customerId = 'J101484427';
            String country_1= 'ES';
            String country = ''; 
            
            String codigoBIC_1 = 'BSCHESMMXXX';
            String codigoBIC = '';

               // ServiceUserData.getControllerUserData();

            Test.startTest();
            wsExchangeRate.setParameters(payment_id,integrationType, requestType, priceType, accountData, timer);
            wsExchangeRate.setIntegrationType(integrationType);
           // wsExchangeRate.tokenUser = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlc0d0c1NhbGVzZm9yY2VJbnRlcm5ldCJ9.eyJpc3MiOiJkZXNHdHNJbnRlcm5ldCIsInN1YiI6IlNHUGd0c2Z1bjIxMTkxMSIsImlhdCI6MTYwNTU1MzY5OCwibmJmIjoxNjA1NTUzNjY4LCJleHAiOjE2MDU2NDAwOTgsImp0aSI6IjkyZWIwNWU3LTI4MjAtNDc3OC1hMjU3LWMwMmFlZmNiOGVhOCIsImNvdW50cnkiOiJHVFNORVhVU0JJQyIsImxvY2FsX3VpZCI6IlNHUGd0c2Z1bjIxMTkxMSIsImxvY2FsX3JlYWxtIjoiIn0.RQYyMz1JO-myYWZdRhHP2z9oxMZ0u_FNSwK_oCikM7VqH5hV2mEY4-jHL4Dc8NAZDOzeMif1jRmqPOIjba369bDA8zMDyVOclZ0vfIQx4Z4UQ3gobEeVbsMU78uVQ2xGYZmrv8zC6b38kz6OuYu6e3oohY0iN4xYEA9rrXpz-d0JLuI89FJIDV8hKjwHwfTmVq-KESi1qhPchq0fNPwoeOw-KH5aYhVkPCbTbydS4jmqi4u_hwJ_TmbnmNN9nrKK3-Gx-dceUMdQw8lpER5PMZ0-Up20c8DH_y7KvjpLTz5DhKGZkPnTiv38eGalq3tNzstTsmofhpXrKMkMJDH0xA';

            wsExchangeRate.execute (amountSend, amountReceive, currencySend, currencyReceiver, sourceAlias, sourceAliasEntidad, customerId, country, codigoBIC);
            wsExchangeRate_1.execute (amountSend, amountReceive, currencySend, currencyReceiver, sourceAlias, sourceAliasEntidad, customerId, country, codigoBIC);
            wsExchangeRate.execute (null, amountReceive, currencySend, currencyReceiver, sourceAlias, sourceAliasEntidad, customerId, country, codigoBIC);
            wsExchangeRate.execute (amountSend, null, currencySend, currencyReceiver, sourceAlias, sourceAliasEntidad, customerId, country, codigoBIC);

            Test.stopTest();
            
        } catch (Exception e) {
            System.debug('WS_ExchangeRate_Test.execute: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}