@isTest
public class CNT_TransactionDetails_Test {
    
    @isTest
    public static void initClassTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            CNT_TransactionDetails.initClass();
        }
    }
    
    /*@isTest
    public static void returnEndOfDayInformationTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            CNT_TransactionDetails.returnEndOfDayInformation();
        }
    }*/
    
    @isTest
    public static void getCountryNameTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            String data = CNT_TransactionDetails.getCountryName('');
        }
    }
   
    
    @isTest
    public static void getCurrencyLabelTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            String data = CNT_TransactionDetails.getCurrencyLabel('');
        }
    }
    
    @isTest
    public static void decryptDataTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.getCustomSettingCryptoKey(true);
                String data = CNT_TransactionDetails.decryptData(Global_Utilities.encryptData('test'));
        }
    }
    
    @isTest
    public static void getTransactionCategoriesTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            List<String> data = CNT_TransactionDetails.getTransactionCategories();
        }
    }
    
    @isTest
    public static void datafalseTest(){
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            
            List<CNT_MovementHistoryExtracController.CNT_MovementHistoryExtractDataWrapper> data = CNT_TransactionDetails.datafalse();
        }
    }
}