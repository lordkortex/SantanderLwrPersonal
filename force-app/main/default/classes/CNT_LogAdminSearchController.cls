public class CNT_LogAdminSearchController {
    
    @AuraEnabled
    public static List<WRAPPER_LogAdminSearch> getLogs(){
        
        return getLogsData();
    }
    
    @AuraEnabled
    public static List<CNT_LogAdminSearchDataWrapper> getLogsMock(){
        
        return generateMockData();
    }
    
    public static List<CNT_LogAdminSearchDataWrapper> generateMockData() {
        
        List<CNT_LogAdminSearchDataWrapper> data = new List<CNT_LogAdminSearchDataWrapper>();
        for(Integer i = 0; i<220; i++){
            CNT_LogAdminSearchDataWrapper data1 = new CNT_LogAdminSearchDataWrapper('25/11/2019, 12:35', '02101626092254', 'Miguel Admin Temporal ' + i, 'User Login : OK 02101626092254 Miguel Admin Temporal');
            data.add(data1);
        }
        
        return data;
        
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Method that retrieves the data from the input source
History
<Date>			<Author>		            <Description>
29/01/2020		Guillermo Giral             Initial version
----------------------------------------------------------------------------------*/
    public static List<WRAPPER_LogAdminSearch> getLogsData(){
        try {       
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetLogs');
            String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            
            if (Test.isRunningTest() ) {
                response='['+
                    '  {'+
                    '    \"action\": \"User Login : OK 02101626092254 Miguel Admin Temporal\",'+
                    '    \"logDate\": \"25/11/2019, 12:35\",'+
                    '    \"name\": \"Miguel Admin Temporal 0\",'+
                    '    \"userId\": \"02101626092254\"'+
                    '  },'+
                    '  {'+
                    '    \"action\": \"User Login : OK 02101626092254 Miguel Admin Temporal\",'+
                    '    \"logDate\": \"25/11/2019, 12:35\",'+
                    '    \"name\": \"Miguel Admin Temporal 1\",'+
                    '    \"userId\": \"02101626092254\"'+
                    '  },'+
                    '  {'+
                    '    \"action\": \"User Login : OK 02101626092254 Miguel Admin Temporal\",'+
                    '    \"logDate\": \"25/11/2019, 12:35\",'+
                    '    \"name\": \"Miguel Admin Temporal 2\",'+
                    '    \"userId\": \"02101626092254\"'+
                    '  },'+
                    '  {'+
                    '    \"action\": \"User Login : OK 02101626092254 Miguel Admin Temporal\",'+
                    '    \"logDate\": \"25/11/2019, 12:35\",'+
                    '    \"name\": \"Miguel Admin Temporal 3\",'+
                    '    \"userId\": \"02101626092254\"'+
                    '  }'+
                    ']';
            }
            
            
            if (String.isNotBlank(response)) {
                List<WRAPPER_LogAdminSearch> listLogs = WRAPPER_LogAdminSearch.parse(response);
                return listLogs;
            } else {
                //FALTA LA LABEL
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_LogAdminSearchController.getLogsData: ' + e.getMessage());
            throw new customException(e.getMessage());
        }
    }
    
    //WRAPPER OF LOGS DATA
    public class CNT_LogAdminSearchDataWrapper {
        @AuraEnabled public String logDate                      {get;set;}
        @AuraEnabled public String userId                       {get;set;}
        @AuraEnabled public String name                         {get;set;}
        @AuraEnabled public String action                       {get;set;}
        
        public CNT_LogAdminSearchDataWrapper(String logDate,String userId,String name,String action){
            this.logDate = logDate;
            this.userId = userId;
            this.name = name;
            this.action = action;
        }
    }   
    
}