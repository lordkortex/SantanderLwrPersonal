@isTest
public class CNT_UserData_Test {

    @isTest
    static void getUserData_Test(){
        Test.startTest();
        User u =  DataFactory.getRunningUser(true);
        CNT_UserData.getUserData(u.Id);
        Test.stopTest(); 
    }
    
    @isTest
    static void getUsersDataGlobal_Test(){
        Test.startTest();
        User u =  DataFactory.getRunningUser(true);
        List<String> aux = new List<String>();
        aux.add(u.Id);
        CNT_UserData.getUsersDataGlobal(aux);
        Test.stopTest(); 
    }
}