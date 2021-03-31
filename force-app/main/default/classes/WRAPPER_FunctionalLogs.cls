public class WRAPPER_FunctionalLogs {
    
    public enum LogTypeEnum
    {
        ACTIVITY,FUNCTIONAL,TECHNICAL,SECURITY
    }
    
    public enum LogLevelEnum
    {
        DEBUG, ERROR, INFO, TRACE, WARN
    }
    
    // Mandatory fields
    public String IP;
    public String appName;
    
    //Contact data
    public String country;
    public String localId;
    
    
    public String clientName;
    public String clientLastName;
    
    //logType and log level with fixed values in enum
    public String logType;
    public Boolean error;
    public String logLevel;
    
    
    //Log Description and operation type
    public String description;
    public String operationType;
    
    
    //Only on inserting companies
    public String CompanyGlobalId;
    public String companyLocalId;

    
    public WRAPPER_FunctionalLogs(LogTypeEnum logType, LogLevelEnum logLevel, String logMessage){
        loadBasicData(logType);
        this.description = logMessage;
        this.operationType = 'Onboarding';
        this.logLevel = String.valueOf(logLevel);
    }
    
    public WRAPPER_FunctionalLogs(LogTypeEnum logType, LogLevelEnum logLevel, String logMessage, String companyGlobalId, String companyLocalId, String createType){
        loadBasicData(logType);
        this.description = logMessage;
        this.logLevel = String.valueOf(logLevel);
        if(createType == 'COMPANY')
        {
            this.companyGlobalId = companyGlobalId;
            this.companyLocalId = companyLocalId;
            this.operationType = 'Onboarding Empresa';
        }
        else
        {        
            this.clientName = companyGlobalId;
            this.clientLastName = companyLocalId;
            this.operationType = 'Onboarding Cliente';
        }

    }
    
    
    public void loadBasicData(LogTypeEnum logType)
    {
        if(Test.isRunningTest()){
            IP = '1.1.1.1';
        }else{
            IP = Auth.SessionManagement.getCurrentSession().get('SourceIp');
        }
        
        appName = 'Onboarding Digital';
        
        this.logType = String.valueOf(logType);
        
        if(this.logType == 'ERROR')
        {
            this.error = true; 
        }
        
        else
        {
            this.error = false;
        }
        if(CNT_OBD_Controller.userCountry != null)
        {
            this.country = CNT_OBD_Controller.userCountry;
        }
        if(CNT_OBD_Controller.userLocalId != null){
            this.localId = CNT_OBD_Controller.userLocalId;
        }
        
    }
    
    public static WRAPPER_FunctionalLogs parse(String json) {
        return (WRAPPER_FunctionalLogs) System.JSON.deserialize(json, WRAPPER_FunctionalLogs.class);
    }
    
    public boolean sendLog()
    {
        CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c();     
        configWs = CNT_ApiConfiguration__c.getValues('CNT_FunctionalLogs');
        System.debug(configWs);
        HttpResponse res = Global_IntegrationWrapper.launchHTTPWithResponse(JSON.serialize(this), configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c, 
                                                                            null, UserInfo.getUserId(), 
                                                                            true, null);
        if(res.getStatusCode() == 200)
        {
            return true;
        }
        return false;
    }
}