@isTest
public class ServiceDeviceInfo_Test {

    @isTest
    static void getDeviceInfo_Test () {
        Test.startTest(); 
        user u = DataFactory.getRunningUser(true); 
        System.runAs(u) {
            Map<String, String> navigatorInfo = new Map<String, String>();
            ServiceDeviceInfo.getDeviceInfo( navigatorInfo, 'POST');
        }
        Test.stopTest();
    }
}