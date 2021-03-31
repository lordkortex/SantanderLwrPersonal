@isTest
public class CNT_FilesUtilities_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
        DataFactory.createB2BOrderingFilters();
        DataFactory.createSignatureStructure();
    }
    
    @isTest
    static void saveFile_Test(){
        try {
            Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());
            
            String paymentId= 'paymentId';
            String strFileName = 'test_Name';
            String base64Data = 'dataInBase64';
            
            Test.startTest();
            CNT_FilesUtilities.saveFile(paymentId, strFileName, base64Data);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_FilesUtilities_Test.saveFile_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    @isTest
    static void deleteFile_Test(){
        try {
            Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());
            
            String fileId= 'paymentId';
            Test.startTest();
            CNT_FilesUtilities.deleteFile(fileId);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_FilesUtilities_Test.fileId_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }    

    @isTest
    static void releatedFiles_Test(){
        try {
            Test.setMock(HttpCalloutMock.class, new WS_TrackingPaymentOperation_MockHttp());
            
            String paymentId= 'paymentId';
            Test.startTest();
            CNT_FilesUtilities.releatedFiles(paymentId);
            Test.stopTest();
        } catch (Exception e) {
            System.debug('CNT_FilesUtilities_Test.fileId_Test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
}