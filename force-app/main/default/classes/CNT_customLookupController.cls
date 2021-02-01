/*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Controller for the custom lookup component
Test Class:     CNT_customLookupController_Test
History
<Date>			<Author>		    <Description>
17/06/2020		Guillermo Giral     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_customLookupController {
    @AuraEnabled
    public static List<RecordsData> fetchRecords(String objectName, List<String> filterFields, String searchString, String value, String functionality) {
        try {
            List<RecordsData> recordsDataList = new List<RecordsData>();
            String query = 'SELECT Id, ' + filterFields[0] + ' FROM '+objectName;
            if(String.isNotBlank(value)) {
                query += ' WHERE Id = \''+ value + '\' LIMIT 49999';
            } else {
                if(functionality == 'LOGIN_AS'){
                    //query += ' WHERE isActive = true AND USER_CHK_CashNexus__c = true AND isDummyBackOfficeUser__c = false AND ProfileId IN (SELECT Id FROM Profile WHERE Name = \'' + System.Label.NexusUserProfile + '\') AND AccountId IN (SELECT Id FROM Account WHERE Name = \'' + System.Label.NexusAccount +'\' OR Parent.Name = \'' + System.Label.NexusAccount +'\')';                   
                    query += ' WHERE isActive = true AND isDummyBackOfficeUser__c = false AND ProfileId IN (SELECT Id FROM Profile WHERE Name = \'' + System.Label.NexusUserProfile + '\' OR Name = \'' + System.Label.PortalUserProfile + '\' )'; //AND AccountId IN (SELECT Id FROM Account WHERE Name = \'' + System.Label.NexusAccount +'\' OR Parent.Name = \'' + System.Label.NexusAccount +'\')';                   

                }
                for(Integer i=0; i<filterFields.size(); i++){
                    if(i==0){
                        if(functionality != ''){
                            query += ' AND ('+filterFields[i]+
                                ' LIKE ' + '\'' + String.escapeSingleQuotes(searchString.trim()) + '%\''; 
                        } else{
                            query += ' WHERE '+filterFields[i]+
                            		' LIKE ' + '\'' + String.escapeSingleQuotes(searchString.trim()) + '%\'';
                            query += filterFields.size() == 1 && functionality != '' ? ')' : '';
                        } 
                    } else if(i>0 && i<filterFields.size()-1){
                        query += ' OR '+filterFields[i] +
                            ' LIKE ' + '\'' + String.escapeSingleQuotes(searchString.trim()) + '%\'';
                    } else{
                        query += ' OR '+filterFields[i] +
                            ' LIKE ' + '\'' + String.escapeSingleQuotes(searchString.trim()) + '%\''; // ) LIMIT 20';
                        query += functionality != '' ? ') LIMIT 20' : ' LIMIT 20';
                    }
                }
            }
            System.debug('Query => ' + query);
	        for(SObject s : Database.query(query)) {
	            recordsDataList.add( new RecordsData((String)s.get(filterFields[0]), (String)s.get('id')) );
            }
            return recordsDataList;
	    } catch (Exception err) {
	    	if ( String.isNotBlank( err.getMessage() ) && err.getMessage().contains( 'error:' ) ) {
                throw new AuraHandledException(err.getMessage().split('error:')[1].split(':')[0] + '.');
            } else {
                throw new AuraHandledException(err.getMessage());
            }
	    }
    }

    public class RecordsData {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        public RecordsData(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}