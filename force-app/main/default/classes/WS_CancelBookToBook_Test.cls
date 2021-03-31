@isTest
public class WS_CancelBookToBook_Test {
    
    @testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);     
    }
    
    @isTest
    static void execute_Test(){
        Test.setMock(HttpCalloutMock.class, new WS_CancelBookToBook_MockHttp());
        
        Test.startTest();
                
        WS_CancelBookToBook wsObject = new WS_CancelBookToBook('bookToBookId');
        wsObject.execute('flowIndicator', 'orderedBy');
        
        Test.stopTest();
    }
    

}