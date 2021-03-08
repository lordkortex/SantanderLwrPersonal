@isTest
public class ServiceDeviceInfo_Test {



    @isTest
    static void getDeviceInfo_Test(){
        Test.startTest(); 
        Map<String, String> navigatorInfo = new Map<String, String>();
        ServiceDeviceInfo.getDeviceInfo( navigatorInfo, 'POST');
        Test.stopTest();
    }

}