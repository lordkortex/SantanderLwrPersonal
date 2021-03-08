/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Test class for the custom lookup component
History
<Date>			<Author>		    <Description>
17/06/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_customLookupController_Test {
    @isTest
    static void fetchRecordsTest1() {
        Account acc = new Account();
        acc.Name = 'Test Account';
        acc.Phone = '123456789';
        acc.Type = 'Prospect';
        insert acc;
        
        List<CNT_customLookupController.RecordsData> result = CNT_customLookupController.fetchRecords('Account', new List<String>{'Name'}, 'Test', '', '');
        System.assertEquals(result != null, true);
    }
    
    @isTest
    static void fetchRecordsTest2() {
        Account acc = new Account();
        acc.Name = 'Test Account';
        acc.Phone = '123456789';
        acc.Type = 'Prospect';
        insert acc;
        
        List<CNT_customLookupController.RecordsData> result = CNT_customLookupController.fetchRecords('Account', new List<String>{'Name'}, 'Test', (String)acc.Id, '');
        System.assertEquals(result.size(), 1);
    }
    
    @isTest
    static void fetchRecordsTest_filterThreeFields() {
        Account acc = new Account();
        acc.Name = 'Test Account';
        acc.Phone = '123456789';
        acc.Type = 'Prospect';
        insert acc;
        
        List<CNT_customLookupController.RecordsData> result = CNT_customLookupController.fetchRecords('Account', new List<String>{'Name', 'Phone', 'Type'}, 'Test', '', '');
        System.assertEquals(result.size(), 1);
    }
    
    @isTest
    static void fetchRecordsNegativeTest() {
        try {
        	List<CNT_customLookupController.RecordsData> result = CNT_customLookupController.fetchRecords('', new List<String>{'Name'}, 'Test', '', '');
        } catch(Exception ex) {
            System.assertNotEquals(ex.getMessage(), NULL);
        }
    }
}