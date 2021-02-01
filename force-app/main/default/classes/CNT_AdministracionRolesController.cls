public class CNT_AdministracionRolesController {
    
    @AuraEnabled
    public static List<CNT_AdministracionRolesController.CNT_AdministracionRolesWrapper> getAdministracionRolesDataMock(){
        return generateFalseData();
    }
    
    @AuraEnabled(cacheable=true)
    public static List<WRAPPER_RolesAdmin> getAdministracionRolesData(){
        return getRoles();
    }
    
    public static List<CNT_AdministracionRolesController.CNT_AdministracionRolesWrapper> generateFalseData() {
        
        List<CNT_AdministracionRolesWrapper> data = new List<CNT_AdministracionRolesWrapper>();
        CNT_AdministracionRolesWrapper data1 = new CNT_AdministracionRolesWrapper('1','Rol1','Rol Alias 1');
        data.add(data1);     
        CNT_AdministracionRolesWrapper data2 = new CNT_AdministracionRolesWrapper('2','Rol2','Rol Alias 2');
        data.add(data2);
        CNT_AdministracionRolesWrapper data3 = new CNT_AdministracionRolesWrapper('3','Rol3','Rol Alias 3');
        data.add(data3);
        CNT_AdministracionRolesWrapper data4 = new CNT_AdministracionRolesWrapper('4','Rol4','Rol Alias 4');
        data.add(data4);
        CNT_AdministracionRolesWrapper data5 = new CNT_AdministracionRolesWrapper('5','Rol5','Rol Alias 5');
        data.add(data5);
        CNT_AdministracionRolesWrapper data6 = new CNT_AdministracionRolesWrapper('6','Rol6','Rol Alias 6');
        data.add(data6);
        CNT_AdministracionRolesWrapper data7 = new CNT_AdministracionRolesWrapper('7','Rol7','');
        data.add(data7);
        CNT_AdministracionRolesWrapper data8 = new CNT_AdministracionRolesWrapper('8','Rol8','');
        data.add(data8);
        CNT_AdministracionRolesWrapper data9 = new CNT_AdministracionRolesWrapper('9','Rol9','');
        data.add(data9);
        CNT_AdministracionRolesWrapper data10 = new CNT_AdministracionRolesWrapper('10','Rol10','');
        data.add(data10);     
        CNT_AdministracionRolesWrapper data11 = new CNT_AdministracionRolesWrapper('11','Rol11','');
        data.add(data11);
        CNT_AdministracionRolesWrapper data12 = new CNT_AdministracionRolesWrapper('12','Rol12','');
        data.add(data12);
        CNT_AdministracionRolesWrapper data13 = new CNT_AdministracionRolesWrapper('13','Rol13','');
        data.add(data13);
        CNT_AdministracionRolesWrapper data14 = new CNT_AdministracionRolesWrapper('14','Rol14','');
        data.add(data14);
        CNT_AdministracionRolesWrapper data15 = new CNT_AdministracionRolesWrapper('15','Rol15','');
        data.add(data15);
        CNT_AdministracionRolesWrapper data16 = new CNT_AdministracionRolesWrapper('16','Rol16','');
        data.add(data16);
        CNT_AdministracionRolesWrapper data17 = new CNT_AdministracionRolesWrapper('17','Rol17','');
        data.add(data17);
        CNT_AdministracionRolesWrapper data18 = new CNT_AdministracionRolesWrapper('18','Rol18','');
        data.add(data18);
        CNT_AdministracionRolesWrapper data19 = new CNT_AdministracionRolesWrapper('19','Rol19','');
        data.add(data19);
        CNT_AdministracionRolesWrapper data20 = new CNT_AdministracionRolesWrapper('20','Rol20','');
        data.add(data20);
        
        
        return data;
    }
    
    /*----------------------------------------------------------------------------------
Author:         Guillermo Giral
Company:        Deloitte
Description:    Method that retrieves the data from the Mulesoft Roles endpoint
History
<Date>			<Author>		            <Description>
29/01/2020		Guillermo Giral             Initial version
----------------------------------------------------------------------------------*/
    public static List<WRAPPER_RolesAdmin> getRoles(){
        try {            
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetRolesData');
            String response = Global_IntegrationWrapper.launchHttp('', configWs.CNT_Endpoint__c, configWs.CNT_HTTPMethod__c);
            
            if (Test.isRunningTest() ) {
                
                response = '['+
                    '  {'+
                    '    \"order\": \"1\",'+
                    '    \"rolAlias\": \"Rol Alias 1\",'+
                    '    \"rolName\": \"Rol1\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"2\",'+
                    '    \"rolAlias\": \"Rol Alias 2\",'+
                    '    \"rolName\": \"Rol2\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"3\",'+
                    '    \"rolAlias\": \"Rol Alias 3\",'+
                    '    \"rolName\": \"Rol3\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"4\",'+
                    '    \"rolAlias\": \"Rol Alias 4\",'+
                    '    \"rolName\": \"Rol4\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"5\",'+
                    '    \"rolAlias\": \"Rol Alias 5\",'+
                    '    \"rolName\": \"Rol5\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"6\",'+
                    '    \"rolAlias\": \"Rol Alias 6\",'+
                    '    \"rolName\": \"Rol6\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"7\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol7\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"8\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol8\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"9\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol9\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"10\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol10\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"11\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol11\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"12\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol12\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"13\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol13\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"14\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol14\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"15\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol15\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"16\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol16\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"17\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol17\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"18\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol18\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"19\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol19\"'+
                    '  },'+
                    '  {'+
                    '    \"order\": \"20\",'+
                    '    \"rolAlias\": \"\",'+
                    '    \"rolName\": \"Rol20\"'+
                    '  }'+
                    ']';
            }
            if (String.isNotBlank(response)) {
                List<WRAPPER_RolesAdmin> listRoles = WRAPPER_RolesAdmin.parse(response);
                return listRoles;
            } else {
                //FALTA LA LABEL
                throw new customException(Label.getDataError);
            }
        } catch (Exception e) {
            System.debug('CNT_AdministracionRolesController.getRoles: ' + e.getMessage());
            throw new customException(e.getMessage());
        }
    }
    
    // WRAPPER FOR DUMMY DATA  
    public class CNT_AdministracionRolesWrapper {
        
        @AuraEnabled public String order           	   {get;set;}
        @AuraEnabled public String rolName	    	   {get;set;}
        @AuraEnabled public String rolAlias       	   {get;set;}
        
        
        public CNT_AdministracionRolesWrapper(String order, String rolName, String rolAlias){
            this.order = order;
            this.rolName = rolName;
            this.rolAlias = rolAlias;    
        }
    }
    
}