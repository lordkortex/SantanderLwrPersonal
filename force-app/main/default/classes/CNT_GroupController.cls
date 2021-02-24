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
    @AuraEnabled
    public static List<WRAPPER_GroupAdmin> getData()
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
    public static List<WRAPPER_GroupAdmin> getGroups()
    {
        try 
        {            
            //CNT_GetGroups
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetGroups');
            String response = Global_IntegrationWrapper.launchHTTP('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            
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
                List<WRAPPER_GroupAdmin> listGroups = WRAPPER_GroupAdmin.parse(response);
                return listGroups;
            } else
            {
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) 
        {
            System.debug('CNT_GroupController.getGroups: ' + e.getMessage());
            throw new customException(e.getMessage());
        }
    }
    
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