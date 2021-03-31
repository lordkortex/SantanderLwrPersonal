@isTest
public class CNT_ConsentForm_Test {

    @TestSetup
    static void setup(){
        DataFactory.createAccount();
    }

    @isTest
    static void initComponent_Test(){
        CNT_ConsentForm.initComponent('accountId');
    }
    
    @isTest
    static void getConsentTypeAndManagement_Test(){
        CNT_ConsentForm.getConsentTypeAndManagement('ES', 'BSCHESM0000');
    }    
    
    @isTest
    static void callStratioAndSaveAccount_Test(){
        Account acc = [SELECT Id, Name, ACC_PCK_Country__c, ACC_TXT_BIC__c , ACC_PCK_Type__c, ACC_PCK_Management__c, ACC_CHK_Validation__c, ACC_DATE_InitialDate__c, ACC_DATE_FinalDate__c 
                       FROM Account WHERE Name = 'Empresa' LIMIT 1];

        CNT_ConsentForm.callStratioAndSaveAccount(acc);
    }    
    
    
    
    
    
}