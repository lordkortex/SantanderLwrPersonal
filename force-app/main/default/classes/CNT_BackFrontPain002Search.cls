/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CNT_MRTrackerSearch
Test Class:     CNT_BackFrontPain002Search_Test
History
<Date>			<Author>		<Description>
21/01/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_BackFrontPain002Search {


    

     /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the account company ID
    History
    <Date>			<Author>		<Description>
    10/03/2020		R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/

    @AuraEnabled
    public static String getCompanyID(String name) {
        try{

            List<Account> res= new List<Account>([SELECT ACC_TXT_CompanyId__c FROM Account WHERE Name=:name LIMIT 1]);

            if(!res.isEmpty()){
                return res[0].ACC_TXT_CompanyId__c;
            }
            return '';
            
        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
        
    }
}