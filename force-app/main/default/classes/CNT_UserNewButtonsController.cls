/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Controller of CMP_UserNewButtons components
Test Class:     CNT_UserNewButtonsControllerTest TO DO
History
<Date>			<Author>		<Description>
10/01/2020		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/
public class CNT_UserNewButtonsController {

    /*------------------------------------------------------------
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Calls to the global utilities encrypt data method to navigate to another page
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020		Pablo Tejedor       Initial version
    ------------------------------------------------------------*/   
    @AuraEnabled
    public static String encryptData(String str){
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
      /*------------------------------------------------------------
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Calls CNT_GroupNewProfileParentController to obtain the data about entitlements.
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020		Pablo Tejedor        Initial version
    ------------------------------------------------------------*/     
    @AuraEnabled
    public static CNT_GroupNewProfileParentController.CNT_ServiceProfilingWrapper entitlementData(){
       return CNT_GroupNewProfileParentController.getServiceProfilingInfo();
    
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
    

}