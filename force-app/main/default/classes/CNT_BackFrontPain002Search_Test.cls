/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Test class for CNT_BackFrontPain002Search component controller
History
<Date>			<Author>		<Description>
12/02/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_BackFrontPain002Search_Test {
    
    @IsTest
    /*------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Tests the method getEntities from the class.
    History 
    <Date>          <Author>            <Change Description>
	12/02/2020		R. Alexander Cervino     Initial version
    ------------------------------------------------------------*/ 
    public static void getCompanyID_Test()
    {
        Test.startTest();
        user u =DataFactory.getRunningUser(true);
        System.runAs(u){
            DataFactory.createAccount();
            CNT_BackFrontPain002Search.getCompanyID('Deloitte');
            CNT_BackFrontPain002Search.getCompanyID('test');
        }
        Test.stopTest();       
    }

}