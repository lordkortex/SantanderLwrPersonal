/*----------------------------------------------------------------------------------
Author:         R. Cervino
Company:        Deloitte
Description:    Test class of CNT_DownloadMT103
History
<Date>			<Author>		<Description>
30/03/2020		R. Cervino    	Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_DownloadMT103_Test {

	@testSetup
    static void setup(){
        DataFactory.createWsConfigurationSetting(true);
    }
    
    @isTest
    public static void globalTest(){
        
        //DataFactory.createWsConfigurationSetting(true);
         Test.setMock(HttpCalloutMock.class, new TestClass_MockHttp());
        Test.startTest();
        CNT_DownloadMT103 testDwn = new CNT_DownloadMT103('test');
        testDwn.execute();
        Test.stopTest();
        
    }

}