@isTest
public class CNT_LWC_FX_TradesLandingParentTest {
            
    @isTest
    public static void testDownloadCSV(){
        Test.setMock(HttpCalloutMock.class, new CNT_LWC_FX_TradesLandingParent_MockHttp.downloadResponse());
        test.startTest();
        String formatCSV = 'CSV';
        String params = '[{"field": "","operator": "","value": ""}]';
        WRAPPER_FX_Download rv = CNT_LWC_FX_TradesLandingParent.downloadTrades(formatCSV, params);
        test.stopTest();
    }
    
    /*@isTest
    public static void testDownloadXLS(){
        String formatXLS = 'XLS';
        String params = '[{"field": "","operator": "","value": ""}]';
        WRAPPER_FX_Download rv = CNT_LWC_FX_TradesLandingParent.downloadTrades(formatXLS, params);
    }*/
}