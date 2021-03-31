/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Test class for CNT_CustomLookup component controller
History
<Date>			<Author>		<Description>
12/02/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_CustomLookup_Test {
    
    @IsTest
    /*------------------------------------------------------------
    Author:         R. Alexander Cervino
    Company:        Deloitte
    Description:    Tests the method getFilteredData from the class.
    History 
    <Date>          <Author>            <Change Description>
	12/02/2020		R. Alexander Cervino     Initial version
    ------------------------------------------------------------*/ 
    public static void getFilteredData_Test()
    {
        Test.startTest();
        CNT_CustomLookup.fetchLookUpValues('d','Account');
        Test.stopTest();       
    }

}