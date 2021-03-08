/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Controller of Groups components
Test Class:     CNT_GroupController_Test
History
<Date>			<Author>		<Description>
10/01/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
global with sharing class CNT_GroupController 
{
    
    /*------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Returns the dummy data to the component (12 data)
History 
<Date>          <Author>            <Change Description>
10/01/2020		Joaquin Vera        Initial version
------------------------------------------------------------*/     
    @AuraEnabled
    public static List<CNT_GroupController.CNT_GroupWrapper> getDummyData()
    {
        return generateDummyData(12);
    }
    
    /*------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Returns the data from Mulesoft to the component
History 
<Date>          <Author>             <Change Description>
29/01/2020		Guillermo Giral      Initial version
------------------------------------------------------------*/     
    @AuraEnabled (cacheable = true)
    public static WRAPPER_GroupAdmin getData(String userId)
    {
        return getGroups();
    }
    
    /*------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Returns the data from Mulesoft profiling table
History 
<Date>          <Author>             <Change Description>
29/01/2020		Guillermo Giral      Initial version
------------------------------------------------------------*/     
    @AuraEnabled
    public static CNT_GroupNewProfileParentController.CNT_ServiceProfilingWrapper getServiceProfilingInfo()
    {
        return CNT_GroupNewProfileParentController.getServiceProfilingInfo();
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Method that retrieves the data from the groups endpoint
History
<Date>			<Author>		            <Description>
29/01/2020		Guillermo Giral             Initial version
----------------------------------------------------------------------------------*/
    public static WRAPPER_GroupAdmin getGroups()
    {
        
        WRAPPER_Login login = CNT_LoginVisibilityManagerController.getUserLoginData(UserInfo.getUserId());
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetGroups');
        //String groupsEndpoint = configWs.CNT_Endpoint__c.replace('{}', String.valueOf(login.inicio.user.codigoCliente));
        String groupsEndpoint = configWs.CNT_Endpoint__c.replace('{}', '7');
        
        String response = Global_IntegrationWrapper.launchHTTP('', groupsEndpoint, configWs.CNT_HTTPMethod__c);
        
        if (Test.isRunningTest() ) {
            response ='['+
                '  {'+
                '    \"name\": \"Grupo 1\"'+
                '  },'+
                '  {'+
                '    \"name\": \"Grupo 2\"'+
                '  },'+
                '  {'+
                '    \"name\": \"Grupo 3\"'+
                '  },'+
                '  {'+
                '    \"name\": \"Grupo 4\"'+
                '  },'+
                '  {'+
                '    \"name\": \"Grupo 5\"'+
                '  }'+
                ']';
        } 
        
        
        if (String.isNotBlank(response)) 
        {
            WRAPPER_GroupAdmin listGroups = WRAPPER_GroupAdmin.parse(response);
            System.debug('Respuesta: ' + JSON.serialize(listGroups));
            return listGroups;
        }
        return null;
        
    }
    
    @AuraEnabled
    public static boolean saveData (String groupName)
    {
        WRAPPER_Login login = CNT_LoginVisibilityManagerController.getUserLoginData(UserInfo.getUserId());
        Wrapper_SavingGroup savingGroup = new Wrapper_SavingGroup();
        savingGroup.empGroupCod = String.valueOf(login.inicio.user.codigoCliente);
        savingGroup.environment = 'S';
        savingGroup.groupName = groupName;
        savingGroup.state = 'H';
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_PostGroups');
        String response = Global_IntegrationWrapper.launchHttp(JSON.serialize(savingGroup), configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
        
        return true;
    }
    
    @AuraEnabled
    public static boolean saveProfile (String groupAuth, String groupId, List<String> profiledService)
    {
        //WRAPPER_Login login = CNT_LoginVisibilityManagerController.getUserLoginData(UserInfo.getUserId());
        Wrapper_SavingProfile savingProfile = new Wrapper_SavingProfile();
        savingProfile.group_cod = groupId;
        savingProfile.inter_ind = groupAuth;
        savingProfile.service_list = profiledService;
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_PutGroups');
        String response = Global_IntegrationWrapper.launchHttp(JSON.serialize(savingProfile), configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
        
        return true;
    }
    
    /*public static boolean updateGroup (String groupName, String groupId, String groupAuth)
    {
        Wrapper_UpdateGroup updateGroup = new Wrapper_UpdateGroup();
        updateGroup.empGroupCod = String.valueOf(login.inicio.user.codigoCliente);
        updateGroup.environment = 'S';
        updateGroup.groupName = groupName;
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_PostGroups');
        String response = Global_IntegrationWrapper.launchHttp(JSON.serialize(savingGroup), configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
        
        return true;
    }*/
    
    /*------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Generates dummy data with the number of rows to return
History 
<Date>          <Author>            <Change Description>
10/01/2020		Joaquin Vera        Initial version
------------------------------------------------------------*/ 
    public static List<CNT_GroupController.CNT_GroupWrapper> generateDummyData(Integer numberOfRows)
    {
        List<CNT_GroupController.CNT_GroupWrapper> lista = new List<CNT_GroupController.CNT_GroupWrapper>();
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Apoderados'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Directiva'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Contabilidad' ));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Impuestos'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Apoderados Externo'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Auditoría' ));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Supervisores'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Auditoría Segundo Nivel'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Impuestos 2' ));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Aprobadoras'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Administradores'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Usuarios' ));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Riesgos'));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Contabilidad Segundo Nivel '));
        lista.add(new CNT_GroupController.CNT_GroupWrapper('Supervisoras' ));
        
        return lista;
    }
    
    /*------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Wrapper class of the group list
History 
<Date>          <Author>            <Change Description>
10/01/2020		Joaquin Vera        Initial version
------------------------------------------------------------*/ 
    public class CNT_GroupWrapper
    {
        @AuraEnabled public String name;
        
        public CNT_GroupWrapper(String name)
        {
            this.name = name;
        }
    }
    
    public class Wrapper_SavingGroup
    {
        @AuraEnabled public String empGroupCod;
        @AuraEnabled public String environment;
        @AuraEnabled public String groupName;
        @AuraEnabled public String state;
        
        public Wrapper_SavingGroup()
        {
        }
    }

	public class Wrapper_SavingProfile
    {
        @AuraEnabled public String group_cod;
        @AuraEnabled public String inter_ind;
        @AuraEnabled public List<String> service_list;
        
        public Wrapper_SavingProfile()
        {
        }
    }    
    
    public class Wrapper_UpdateGroup
    {
        @AuraEnabled public String groupName;
        @AuraEnabled public String groupId;
        @AuraEnabled public String groupAuth;
        
        public Wrapper_UpdateGroup()
        {
        }
    }    
    
    /*------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Calls to the global utilities encrypt data method to navigate to another page
History 
<Date>          <Author>            <Change Description>
10/01/2020		Joaquin Vera        Initial version
------------------------------------------------------------*/ 
    @AuraEnabled
    public static string encryptData(String str)
    {
        return Global_Utilities.encryptData(str);
    }
    /*------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Calls to the global utilities decrypt data method to get the params to another page
History 
<Date>          <Author>            <Change Description>
10/01/2020		Pablo Tejedor        Initial version
------------------------------------------------------------*/     
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
        
    }
}