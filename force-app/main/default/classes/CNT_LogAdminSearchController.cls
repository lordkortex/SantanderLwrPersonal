public class CNT_LogAdminSearchController {
    
    @AuraEnabled (cacheable=true)
    public static List<String> getActions(String userId){
        try {
            List<String> pickListValuesList = new List<String>();
            Schema.DescribeFieldResult fieldResult = Log_action__mdt.LOG_PCK_LogActions__c.getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
            for( Schema.PicklistEntry pickListVal : ple){
                pickListValuesList.add(pickListVal.getLabel());
            }     
            System.debug(pickListValuesList);
            return pickListValuesList;
        } catch (Exception e) {
            System.debug('CNT_LogAdminSearchController.getActions: ' + e.getMessage());
        }
        return null;
    }


    @AuraEnabled
    public static List<WRAPPER_LogAdminSearch> getLogs(Map<String,Object> filters){
        
        return getLogsData(filters);
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
    public static List<WRAPPER_LogAdminSearch> getLogsData(Map<String,Object> filters){

        WRAPPER_Login login = CNT_LoginVisibilityManagerController.getUserLoginData(UserInfo.getUserId());


        //Converting dates
        String oldDate = String.valueOf(filters.get('dateFrom'))  +  'T00:00:00.000Z';
        String newDate = String.valueOf(filters.get('dateTo')) +  'T00:00:00.000Z';

        //GETTING CURRENT GMT
        DateTime T = DateTime.now();
        TimeZone tz = UserInfo.getTimeZone();
        Integer total = tz.getOffset(T)/3600000;
        String curCMT = 'GMT';

        if(total >= 0)
        {
            curCMT += '+'+String.valueOf(total);
        }
        else
        {
            curCMT += String.valueOf(total);
        }
        
        //Getting current action Code
        String actionCode = mapValue(Schema.SObjectType.Log_action__mdt.fields.LOG_PCK_LogActions__c.PicklistValues, String.valueOf(filters.get('typelogs')));
        
        String response = '';  
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetLogs');
        //https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/nx/admin/logs?action={}&cdemgr={}&content={}&destinyGmt={}&endDate={}&originGm={}&startDate={}&user={}
        String finalEndpoint = configWs.CNT_Endpoint__c;
        finalEndpoint = finalEndpoint.replace('action={}', 'action=' + actionCode);
        finalEndpoint = finalEndpoint.replace('cdemgr={}', 'cdemgr=' + String.valueOf(login.inicio.user.codigoCliente));
        finalEndpoint = finalEndpoint.replace('content={}', 'content=' + String.valueOf(filters.get('keywords')));
        finalEndpoint = finalEndpoint.replace('destinyGmt={}', 'destinyGmt=' + curCMT);
        finalEndpoint = finalEndpoint.replace('originGm={}', 'originGmt=' +  curCMT);
        finalEndpoint = finalEndpoint.replace('endDate={}', 'endDate=' + newDate);
        finalEndpoint = finalEndpoint.replace('startDate={}', 'startDate=' + oldDate);
        finalEndpoint = finalEndpoint.replace('user={}', 'user=' +  String.valueOf(filters.get('userid')));


        response = Global_IntegrationWrapper.launchHTTP('',finalEndpoint, configWs.CNT_HTTPMethod__c);
        
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
        }
        return null;
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

    public static String mapValue(Schema.PicklistEntry[] dataList, String toSearch)
    {
        System.debug('Mapping:' + toSearch);
        System.debug('Mapping:2 ' + dataList);
        for(PicklistEntry data : dataList) 
        {
            if(data.label.equals(toSearch)) 
            {
                
                return data.value;
            }
        }
        return '';
    }

    
    

    
}