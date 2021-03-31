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
            if(searchString.length() > 1){                
                String query = 'SELECT Id, ' + filterFields[0] + ' FROM '+objectName;
                if(String.isNotBlank(value)) {
                    query += ' WHERE Id = \''+ value + '\' LIMIT 49999';
                } else {
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
                
                if(functionality == 'LOGIN_AS')
                {
                    query = ' FIND  \'' + String.escapeSingleQuotes(searchString) + '\' IN NAME FIELDS RETURNING Contact(Name, Id WHERE Account.Parent.NAME != \'\')';
                    System.debug('Query => ' + query);
                    
                    List<Contact> contactList = (List<Contact>) Search.query(query)[0];
                    for(Contact c : contactList)
                    {
                        recordsDataList.add( new RecordsData((String)c.get(filterFields[0]), (String)c.get('id')) );
                    }
                }
                else
                {
                    for(SObject s : Database.query(query)) {
                        
                        
                        recordsDataList.add( new RecordsData((String)s.get(filterFields[0]), (String)s.get('id')) );
                    }
                }                      
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