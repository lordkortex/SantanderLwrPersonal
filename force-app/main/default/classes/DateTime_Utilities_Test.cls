/*----------------------------------------------------------------------------------
Author:         Shahad Naji
Company:        Deloitte
Description:    Test class of DateTime_Utilities
History
<Date>			<Author>		<Description>
13/01/2020		Shahad Naji    	Initial version
----------------------------------------------------------------------------------*/
@isTest
private class DateTime_Utilities_Test {
    
              /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test data setup
History
<Date>			<Author>		<Description>
13/01/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/  
    @TestSetup
    static void makeData(){ 
        DataFactory.getRunningUser(true);    
    }
    
    /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of getCurrentUserDateTime method
History
<Date>			<Author>		<Description>
13/01/2020		Shahad Naji     Initial version
13/03/2020		Shahad Naji 	Run as user
----------------------------------------------------------------------------------*/  
    @isTest
    static void getCurrentUserDateTimeTest(){
        Test.startTest();
        String temp = '';
        List<User> usrLst = [SELECT Id FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
              temp = DateTime_Utilities.getCurrentUserDateTime();
            }
        }
        System.assert(temp != '', 'Current user datetime is not expected');  
        Test.stopTest();
    }
    
      /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of formatDate method
History
<Date>			<Author>		<Description>
13/03/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/ 
    @isTest
    static void formatDateTest(){
        Datetime aux = System.now();
        String temp = DateTime_Utilities.formatDate(aux);
        System.assert((temp != '' || temp != Null), 'The datetime value is not formatted correctly');
    }
    
          /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of stringToDateTime method
History
<Date>			<Author>		<Description>
13/01/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/ 
    @isTest
    static void stringToDateTimeTest(){
        String aux = '2019-12-12T01:02:59.060';
        Datetime temp = DateTime_Utilities.stringToDateTime(aux, 1);      
        System.assert(temp != Null, 'The method cannot convert a String to Datetime');
    }
    
              /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of getStrTimeZone method
History
<Date>			<Author>		<Description>
13/03/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/ 
    @isTest
    static void getStrTimeZoneTest(){
        String aux = '20191112T141016000+0300';
        String temp = DateTime_Utilities.getStrTimeZone(aux);
        System.assert(temp == 'GMT+03:00', 'The method does not return the correct timezone');
    }
    
    /*----------------------------------------------------------------------------------
        Author:        Shahad Naji
        Company:        Deloitte
        Description:   	Test method of getDate method
        History
        <Date>			<Author>		<Description>
        13/03/2020		Shahad Naji     Initial version
	----------------------------------------------------------------------------------*/
    @isTest
    static void getDateTest(){
        Date myDate = Date.newInstance(2019, 11, 27);
        Time myTime = Time.newInstance(19, 20, 0, 0);
        DateTime myDateTime = DateTime.newInstance(myDate, myTime);
        String myTimeZone = 'GMT+03:00';
        Datetime temp = DateTime_Utilities.getDate(myDateTime, myTimeZone);
         System.assert(temp != NULL, 'The method retrives a null value');
    }
    
    /*----------------------------------------------------------------------------------
        Author:        Shahad Naji
        Company:        Deloitte
        Description:   	Test method of getDifferenceDateTime method
        History
        <Date>			<Author>		<Description>
        13/01/2020		Shahad Naji     Initial version
	----------------------------------------------------------------------------------*/    
    @isTest
    static void getDifferenceDateTimeTest(){
        DateTime first = DateTime.newInstance(2006, 3, 16, 12, 6, 13);
        DateTime second = DateTime.newInstance(2006, 3, 16, 23, 0, 0);
        List<Integer> temp = DateTime_Utilities.getDifferenceDateTime(first, second);
        System.assert(temp.size() > 0, 'The method does not calculate the difference between two datetime value correctly');
    }
    
          /*----------------------------------------------------------------------------------
Author:        Shahad Naji
Company:        Deloitte
Description:   	Test method of getDatetime method
History
<Date>			<Author>		<Description>
13/03/2020		Shahad Naji     Initial version
----------------------------------------------------------------------------------*/  
    @isTest
    static void getDatetimeTest(){
        Test.startTest();
        DateTime temp = null;
        List<User> usrLst = [SELECT Id FROM User WHERE Email='test@test.es'];
        if(!usrLst.isEmpty()){
            system.runAs(usrLst.get(0)){
                temp = DateTime_Utilities.getDatetime('2019-12-12T01:02:59.060', 1);
            }
        }
        System.assert(temp != null, 'Current user datetime is not expected');  
        Test.stopTest();
    }
    
   

}