@isTest
public class CNT_DownloadAccountsLUController_Test {
    
    @testSetUp
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    static void downloadAccountsController_Test(){
        
        //HttpCalloutMock
        Test.setMock(HttpCalloutMock.class, new CNT_DownloadAccountsLUController_Mock.BasicResponse());
        
        //method params
        List<WRAPPER_AccountList.AccountDetails> accountList = DataFactory.getAccountList();
        
        List<CNT_DownloadAccountsLUController.gettingParams> getParamsList = new List<CNT_DownloadAccountsLUController.gettingParams>();
        CNT_DownloadAccountsLUController.gettingParams getParams = new CNT_DownloadAccountsLUController.gettingParams();
        getParams.key = 'test1';
        getParams.value = accountList;
        getParamsList.add(getParams);
        String actualData = JSON.serialize(getParamsList);
        
        WRAPPER_AccountList.TipoDeCambio wcTestTipoCambio = new WRAPPER_AccountList.TipoDeCambio();
        wcTestTipoCambio.claError='test';
        wcTestTipoCambio.divisa='test';
        wcTestTipoCambio.fecha='test';
        wcTestTipoCambio.tipError='test';
        wcTestTipoCambio.importeDecimal=1.0;
        wcTestTipoCambio.importe=1.0;
        List<WRAPPER_AccountList.TipoDeCambio> tiposDeCambio = new List<WRAPPER_AccountList.TipoDeCambio>();
        tiposDeCambio.add(wcTestTipoCambio);
        
        CNT_DownloadAccountsLUController.downloadAccountsController(actualData, 'actualGrouping', 'consolidationCurrency', tiposDeCambio);
    }
    
}