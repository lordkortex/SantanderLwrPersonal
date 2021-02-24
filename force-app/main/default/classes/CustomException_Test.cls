/*----------------------------------------------------------------------------------
    Author:         Joaquin Vera
    Company:        Deloitte
    Description:    Test class of customException class
History
19/11/2019		Joaquin Vera     Initial version
----------------------------------------------------------------------------------*/
@isTest
public with sharing class CustomException_Test 
{
    
@IsTest
static void testCustomException()
{
    Boolean isCatched = false;
    Test.startTest();

    try
    {
        throw new CustomException('');
    } catch(CustomException e)
    {
        isCatched = true;
    }
    Test.stopTest();

    System.assert(isCatched, 'Assert for testing that the Exception throw worked fine');

}
}