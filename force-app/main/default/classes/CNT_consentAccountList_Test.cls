@isTest
public class CNT_consentAccountList_Test {

    @isTest
    static void getAccountList_Test(){
        CNT_consentAccountList.getAccountList('IdAccount');
    }
    
    @isTest
    static void getColumnsFromFields_Test(){
        List<String> fields = new List<String>{'Name', 'Id'};
        CNT_consentAccountList.getColumnsFromFields('Account', fields);
    }
    
    
}