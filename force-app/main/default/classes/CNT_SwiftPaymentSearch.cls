/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Controller of CNT_SwiftPaymentSearch
Test Class:     CNT_SwiftPaymentSearch_Test
History
<Date>          <Author>        <Description>
10/12/2019      R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
public with sharing class CNT_SwiftPaymentSearch {

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the countries ISO2
    History
    <Date>          <Author>        <Description>
    10/12/2019      R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/

    @AuraEnabled(cacheable=true)
    public static List<String> getISO2Values() {
        try{
        
            return Global_Utilities.getISO2Values();

        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
        
    }

    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the countries ISO2
    History
    <Date>          <Author>        <Description>
    12/02/2020      R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------*/

    @AuraEnabled(cacheable=true)
    public static List<String> getStatus() {
        try{
            return Global_Utilities.getStatuses();

        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
        
    }

    /*----------------------------------------------------------------------------------
    Author:         Diego Asis
    Company:        Deloitte
    Description:    Method to get the user's data
    History
    <Date>          <Author>        <Description>
    12/08/2020      DiegoAsis       Initial version
    ----------------------------------------------------------------------------------*/

    @AuraEnabled(cacheable=true)
    public static List<String> getUserData() {
        
        Id userId = UserInfo.getUserId();
        system.debug(userId);
        User userRole = [SELECT Id, UserRole.name, Profile.name FROM User WHERE Id =: userId AND UserRoleId != null LIMIT 1];

        String userProfile = userRole.Profile.name;
        String userCountry = userRole.UserRole.name.substring(0, 2);

        List<String> userData = new List<String>();
        userData.add(userProfile);
        userData.add(userCountry);

        return userData;
    }
    
    /*----------------------------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Method to get the account Numbers
    History
    <Date>          <Author>        <Description>
    22/01/2020      R. Alexander Cervino     Initial version
    ----------------------------------------------------------------------------------

    @AuraEnabled
    public static String getAccounts() {
        try{
            String res='';
            String id='hola';
            testGit prueba = new testGit();
            res=prueba.listaCuentas('test');
            
            if(Test.isRunningTest()){
                throw new customException();
            }
            
            return res;            

        }catch(Exception e){throw new AuraHandledException('The following exception has occurred: '+ e.getMessage());}
    }*/

    /*------------------------------------------------------------
    Author:         R. Cerviño
    Company:        Deloitte
    Description:   	Method to retriebe ll currencies
    History 
    <Date>          <Author>                <Change Description>
    06/04/2020		 R. Cerviño  			Intial Version
    ------------------------------------------------------------*/
    
    @AuraEnabled(cacheable=true) 
    public static List<String> getCurrencies (){
        try{

           /*List<Currencytype> curr=new List<CurrencyType>([SELECT ISOCode FROM CurrencyType]);
            List<String> res= new List<String>();
            if(curr.isEmpty()==false){
                for(CurrencyType c : curr){
                    res.add(c.ISOCode);
                }
            }*/

            return Global_Utilities.getISO3Values();
        } catch(Exception e ){ throw new AuraHandledException('The following exception has occurred: ' + e.getMessage());}
    }
}