/*----------------------------------------------------------------------------------
Author:         Joaquín Vera Vallés
Company:        Deloitte
Description:    Controller of Users components
Test Class:     CNT_UsersController_Test
History
<Date>			<Author>		<Description>
15/01/2020		Joaquín Vera Vallés     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_UsersController 
{
    
    /*------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Returns the dummy data to the component (800 data)
History 
<Date>          <Author>            <Change Description>
15/01/2020		Joaquin Vera        Initial version
------------------------------------------------------------   
@AuraEnabled
public static List<CNT_UsersController.CNT_UsersWrapper> getUsersMockInfo()
{
return generateUsers();
}*/
    
    /*------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Returns the data from Mulesoft to the users table
History 
<Date>          <Author>            <Description>
29/01/2020		Guillermo Giral     Initial version
--------------------------------------------------------------------*/   
    @AuraEnabled
    public static List<WRAPPER_Users> getUsersInfo()
    {
        //return getUsersData();
        return getUsersData();
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Method that retrieves the data from Mulesoft
History
<Date>			<Author>		            <Description>
29/01/2020		Guillermo Giral             Initial version
----------------------------------------------------------------------------------*/
    public static List<WRAPPER_Users> getUsersData(){
        List<WRAPPER_Users> listUsers;
        try {
            String response='';
            
            WRAPPER_Login login = CNT_LoginVisibilityManagerController.getUserLoginData(UserInfo.getUserId());
            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_Users_RetrieveUsers');

            String groupsEndpoint = configWs.CNT_Endpoint__c.replace('{}', String.valueOf(login.inicio.user.codigoCliente));
            
            response = Global_IntegrationWrapper.launchHttp('',groupsEndpoint,configWs.CNT_HTTPMethod__c);
            System.debug(response);
            if (Test.isRunningTest() ) {
                response = '['+
                    '  {'+
                    '    \"groupName\": \"Sales\",'+
                    '    \"role\": \"Sales Manager\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Functional\",'+
                    '    \"userId\": \"SAL - 4776184\",'+
                    '    \"userName\": \"Miguel Álvarez Aguilera \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"Sales\",'+
                    '    \"role\": \"Sales Director\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Functional\",'+
                    '    \"userId\": \"SAL - 9518471\",'+
                    '    \"userName\": \"Maria Yolanda del Valle Redondo  \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"Marketing\",'+
                    '    \"role\": \"\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Administrator\",'+
                    '    \"userId\": \"MRK - 6076084\",'+
                    '    \"userName\": \"Trinidad Hernandez Arias \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"\",'+
                    '    \"role\": \"\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Functional\",'+
                    '    \"userId\": \"NG - 6559471\",'+
                    '    \"userName\": \"Jan Hernandez Pena \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"Service\",'+
                    '    \"role\": \"Service Representative\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Functional\",'+
                    '    \"userId\": \"SRV - 9873878\",'+
                    '    \"userName\": \"Lorena Ballesteros de Miguel \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"B2B\",'+
                    '    \"role\": \"B2B Representative\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Functional\",'+
                    '    \"userId\": \"B2B - 2797327\",'+
                    '    \"userName\": \"Eloisa Gallardo Melero\"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"\",'+
                    '    \"role\": \"Customer\",'+
                    '    \"state\": \"Disabled\",'+
                    '    \"type\": \"Advisory\",'+
                    '    \"userId\": \"CST - 3904297\",'+
                    '    \"userName\": \"Javier Marcos Hurtado \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"\",'+
                    '    \"role\": \"\",'+
                    '    \"state\": \"Disabled\",'+
                    '    \"type\": \"Administrator\",'+
                    '    \"userId\": \"ADM - 1885709\",'+
                    '    \"userName\": \"Luis David Latorre Castaño \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"Sales\",'+
                    '    \"role\": \"Sales Manager\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Functional\",'+
                    '    \"userId\": \"SAL - 8394160\",'+
                    '    \"userName\": \"Miguel Álvarez Aguilera \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"Sales\",'+
                    '    \"role\": \"Sales Director\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Functional\",'+
                    '    \"userId\": \"SAL - 5647552\",'+
                    '    \"userName\": \"Maria Yolanda del Valle Redondo  \"'+
                    '  },'+
                    '  {'+
                    '    \"groupName\": \"Marketing\",'+
                    '    \"role\": \"\",'+
                    '    \"state\": \"Enabled\",'+
                    '    \"type\": \"Administrator\",'+
                    '    \"userId\": \"MRK - 7079110\",'+
                    '    \"userName\": \"Trinidad Hernandez Arias \"'+
                    '  }'+
                    ']';         
            }
            if (String.isNotBlank(response)) {
                listUsers = WRAPPER_Users.parse(response);
                for(WRAPPER_Users singleUser : listUsers)
                {
                    singleUser.state = mapData(Schema.SObjectType.User_actions__mdt.fields.USR_PCK_UserStatus__c.picklistValues, singleUser.state);
                    singleUser.type_Z = mapData(Schema.SObjectType.User_actions__mdt.fields.USR_PCK_UserType__c.picklistValues, singleUser.type_Z );
                }
            
                
            } else {throw new customException(Label.getDataError);}
        } catch (Exception e) {
            System.debug('CNT_UsersController.getUsersData: ' + e.getMessage());
        }
        System.debug(listUsers);
        return listUsers;
    }
    


    /*------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Calls to the global utilities encrypt data method to navigate to another page
History 
<Date>          <Author>            <Change Description>
21/01/2020		Joaquin Vera        Initial version
------------------------------------------------------------*/ 
    @AuraEnabled
    public static string regeneratePassword(String userId){
        return '';
    }
    
    /*------------------------------------------------------------
Author:         Joaquin Vera
Company:        Deloitte
Description:    Gets an userId, calls to mulesoft and returns the user info to the component
History 
<Date>          <Author>            <Change Description>
13/02/2020		Joaquin Vera        Initial version
------------------------------------------------------------*/ 
    @AuraEnabled
    public static WRAPPER_USERINFO getUserInfo(String userId){
                
        String response='';
        //Configure the endpoint
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_AuthorizationUserInfo');//'CNT_Users_GetUserInfo');
        String finalEndpoint = configWs.CNT_Endpoint__c + userId;//configWs.CNT_Endpoint__c.replace('{}', userId);
        
        //Web service call
        response = Global_IntegrationWrapper.launchHTTP('', finalEndPoint, configWs.CNT_HTTPMethod__c);
        if (Test.isRunningTest() ) {
            
            response = '{'+
                '  \"userId\": \"7\",'+
                '  \"Name\": \"funjmrol1\",'+
                '  \"Surname\": \"funjmrol1                                                                       \",'+
                '  \"Type\": \"F\",'+
                '  \"State\": \"H\",'+
                '  \"Language\": \"ES\",'+
                '  \"TimeZone\": \"14\",'+
                '  \"NumberFormat\": \"01\",'+
                '  \"dateFormat\": \"01\",'+
                '  \"Email\": \"                    \",'+
                '  \"Phone\": \"                    \",'+
                '  \"Address\": \"                    \",'+
                '  \"MobileAppAccess\": \"S\",'+
                '  \"HasCryptoCalculator\": \"S\",'+
                '  \"CryptoCalculatorNumber\": \"61-0004682-5\",'+
                '  \"VascoID\": \"61-0004682-5\",'+
                '  \"TieneVasco\": \"N\",'+
                '  \"corporates\": ['+
                '    {'+
                '      \"codigoCorporate\": 1,'+
                '      \"nombreCorporate\": \"TESTPORTARG\",'+
                '      \"numDocumento\": \"13456789001111111111\"'+
                '    },'+
                '    {'+
                '      \"codigoCorporate\": 2,'+
                '      \"nombreCorporate\": \"TESTPORTBR\",'+
                '      \"numDocumento\": \"12345678903456111111\"'+
                '    },'+
                '    {'+
                '      \"codigoCorporate\": 3,'+
                '      \"nombreCorporate\": \"TESTPORTMEX                                                                                                                                                                                             \",'+
                '      \"numDocumento\": \"RFC56678909878      \"'+
                '    },'+
                '    {'+
                '      \"codigoCorporate\": 5,'+
                '      \"nombreCorporate\": \"TESTPORTESP\",'+
                '      \"numDocumento\": \"A78676776689\"'+
                '    },'+
                '    {'+
                '      \"codigoCorporate\": 8,'+
                '      \"nombreCorporate\": \"ISBAN-SPAIN\",'+
                '      \"numDocumento\": \"A79194148111\"'+
                '    },'+
                '    {'+
                '      \"codigoCorporate\": 2797,'+
                '      \"nombreCorporate\": \"TESTPORTUSA\",'+
                '      \"numDocumento\": \"TESTPORTUSA\"'+
                '    },'+
                '    {'+
                '      \"codigoCorporate\": 2798,'+
                '      \"nombreCorporate\": \"TESTPORTUS\",'+
                '      \"numDocumento\": \"TESTPORTUS\"'+
                '    },'+
                '    {'+
                '      \"codigoCorporate\": 2806,'+
                '      \"nombreCorporate\": \"TESTPORTUK\",'+
                '      \"numDocumento\": \"TESTPORTUK\"'+
                '    },'+
                '    {'+
                '      \"codigoCorporate\": 2847,'+
                '      \"nombreCorporate\": \"TESTCORPCO\",'+
                '      \"numDocumento\": \"TESTCORPCO\"'+
                '    }'+
                '  ]'+
                '}';           
        }
        
        WRAPPER_USERINFO deserialized = new WRAPPER_USERINFO(System.JSON.createParser(response));
        return deserialized;
    }
    
    /*------------------------------------------------------------
Author:         Pablo Tejedor 
Company:        Deloitte
Description:    Calls to the global utilities decrypt data method to get the params to another page
History 
<Date>          <Author>            <Change Description>
10/01/2020		Pablo Tejedor         Initial version
------------------------------------------------------------*/   
    @AuraEnabled
    public static String decryptData(String str){
        return Global_Utilities.decryptData(str);
    }

    public static String mapData(Schema.PicklistEntry[] dataList, String toSearch)
    {
        for(PicklistEntry data : dataList) 
        {
            if(data.value.equals(toSearch)) 
            {
                return data.label;
            }
        }
        return '';
    }

    public static String mapValue(Schema.PicklistEntry[] dataList, String toSearch)
    {
        for(PicklistEntry data : dataList) 
        {
            if(data.label.equals(toSearch)) 
            {
                return data.value;
            }
        }
        return '';
    }

    @AuraEnabled (cacheable=true)
    public static WRAPPER_GetUserProfile.UserProfileMant getUserProfile(String codUsuario){

        String response = '';
        WRAPPER_Login login = CNT_LoginVisibilityManagerController.getUserLoginData(UserInfo.getUserId());
                    
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_RetrieveUserProfile');

        String finalEndpoint = configWs.CNT_Endpoint__c.replace('{codUsuario}', codUsuario);
        finalEndpoint = finalEndpoint.replace('{codEmpresa}', login.inicio.user.codigoCliente + '');
        response = Global_IntegrationWrapper.launchHTTP('', finalEndpoint, configWs.CNT_HTTPMethod__c);

        if(response != '')
        {
            WRAPPER_GetUserProfile responseParsed  = WRAPPER_GetUserProfile.parse(response);

            CNT_GroupNewProfileParentController.mapEntitlement(responseParsed.userProfileMant.listaServicios);
            return responseParsed.userProfileMant;
        }

        return null;
    }


    public static List<WRAPPER_GetUserProfile.TableService> getProfiledServices(List<WRAPPER_GetProfiles.ListaServicios> servicesList)
    {
        //Si listaPais y listaPermisosSinMetodos están vacías, el servicio no está perfilado (service.isProfiled = false)
        List<WRAPPER_GetUserProfile.TableService> listServices = new List<WRAPPER_GetUserProfile.TableService>();
        
        for(WRAPPER_GetProfiles.ListaServicios singleService : servicesList)
        {
            WRAPPER_GetUserProfile.TableService serviceToAdd = new WRAPPER_GetUserProfile.TableService();
            serviceToAdd.codService = singleService.servicio.codServicio;
            if(singleService.servicio.listaPais.size() == 0 && singleService.servicio.listaPermisosSinMetodos.size() == 0)
            {
                serviceToAdd.isProfiled = false;
            } 
            else{
                serviceToAdd.isProfiled = true;
            }
            listServices.add(serviceToAdd);
        }
        return listServices;
    }


}