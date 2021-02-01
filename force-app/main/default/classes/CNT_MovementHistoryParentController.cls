/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Controller of CNT_MovementHistoryParent components
Test Class:     CNT_MovementHistoryParentControllerTest
History
<Date>			<Author>		<Description>
10/01/2020		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/
public class CNT_MovementHistoryParentController {
    /*------------------------------------------------------------
Author:        Pablo Tejedor
Company:        Deloitte
Description:    Returns the dummy data to the component (10 data)
History 
<Date>          <Author>            <Change Description>
10/01/2020      Pablo Tejedor       Initial version
------------------------------------------------------------*/     
    @AuraEnabled
    public static List<CNT_MovementHistoryDataWrapper> getDataMovementHistory(){
        // return null;
        return generateFalseData();
    }
    
    /*--------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Returns the from and to dates based on the previous window
History 
<Date>          <Author>            <Change Description>
10/01/2020      Pablo Tejedor       Initial version
------------------------------------------------------------*/  
    @AuraEnabled
    public static List<date> getDatesFromTo(){
        Date dateTo = System.today();//.addDays(-1);
        Date dateFrom = dateTo.addMonths(-25);
        List<Date> datesFromToList = new List<Date>();
        datesFromToList.add(dateTo);
        datesFromToList.add(dateFrom);
        
        return datesFromToList;
    }
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
Description:    Calls to the init method from CNT_Imtermatonal_Treasury_Management class to get the users accounts avaibles.
History 
<Date>          <Author>            <Change Description>
16/01/2020		Pablo Tejedor        Initial version
------------------------------------------------------------*/     
    @AuraEnabled
    public static CNT_International_Treasury_Management getAccountsAvaibleData(){
        String endOfDate = label.EndOfDay;
        return CNT_International_Treasury_Management.initClass(endOfDate);
        
    }
    
    /*------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:   Method to send data information that needs mulesoft
History 
<Date>          <Author>            <Change Description>
24/01/2020		Pablo Tejedor        Initial version
------------------------------------------------------------*/  
    @AuraEnabled(cacheable=true)
    public static List<CNT_MovementHistoryDataWrapper> getMovementHistoryData(String accountNumber, String dateTo, String dateFrom) { 
        
        
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetMovementHistoryData');
        System.debug('configWs ' + configWs);
        String finalEndPoint = configWs.CNT_Endpoint__c.replace('{accountCode}','ES3221145896466666611476').replace('{dateTo}','04/11/2020').replace('{dateFrom}','04/11/2017');
        System.debug('finalEndPoint ' + finalEndPoint);
        String respuesta = Global_IntegrationWrapper.launchHTTP('',finalEndPoint , configWs.CNT_HTTPMethod__c);
        System.debug('respuesta ' + respuesta);
        if(Test.isRunningTest()){
            respuesta='[{"bookDate":"01/08/2019","bookBalance":"10000","currencyTable":"EUR","availableDate":"01/08/2019","availableBalance":"1888342.39"}]';
        }
            return(List<CNT_MovementHistoryDataWrapper>) JSON.deserialize(respuesta,List<CNT_MovementHistoryDataWrapper>.class);
        
    }
    
    /*------------------------------------------------------------
Author:        Pablo Tejedor
Company:        Deloitte
Description:    Generates dummy data with the number of data to return
History 
<Date>          <Author>            <Change Description>
10/01/2020	    Pablo Tejedor       Initial version
------------------------------------------------------------*/ 
    public static List<CNT_MovementHistoryDataWrapper> generateFalseData() {
        
        List<CNT_MovementHistoryDataWrapper> data = new List<CNT_MovementHistoryDataWrapper>();
        //CNT_MovementHistoryDataWrapper data1 = new CNT_MovementHistoryDataWrapper('11/08/2019','5.342',',39 ARS','11/08/2019','-5.342.000',',39 ARS');
        CNT_MovementHistoryDataWrapper data1 = new CNT_MovementHistoryDataWrapper('10/08/2019','50342.39','10/08/2019','-5342000.39', 'ARS');
        data.add(data1);
        //CNT_MovementHistoryDataWrapper data2 = new CNT_MovementHistoryDataWrapper('11/08/2019','5.342',',39 ARS','11/08/2019','5.342.523',',39 ARS');
        CNT_MovementHistoryDataWrapper data2 = new CNT_MovementHistoryDataWrapper('09/08/2019','53402.39','09/08/2019','5342523.39' ,'ARS');
        data.add(data2);
        //CNT_MovementHistoryDataWrapper data3 = new CNT_MovementHistoryDataWrapper('10/08/2019','5.100',',11 ARS','10/08/2019','5.100.234',',11 ARS');
        CNT_MovementHistoryDataWrapper data3 = new CNT_MovementHistoryDataWrapper('08/08/2019','51000.11','08/08/2019','5100234.11', 'ARS');
        data.add(data3);
        //CNT_MovementHistoryDataWrapper data4 = new CNT_MovementHistoryDataWrapper('09/08/2019','4.573',',40 ARS','09/08/2019','4.573.645',',40 USD');
        CNT_MovementHistoryDataWrapper data4 = new CNT_MovementHistoryDataWrapper('07/08/2019','45073.40','07/08/2019','4573645.40' ,'ARS');
        data.add(data4);
        //CNT_MovementHistoryDataWrapper data5 = new CNT_MovementHistoryDataWrapper('08/08/2019','4.333',',33 ARS','08/08/2019','4.333.664',',33 ARS');
        CNT_MovementHistoryDataWrapper data5 = new CNT_MovementHistoryDataWrapper('06/08/2019','43033.33','06/08/2019','4333664.33','ARS');
        data.add(data5);
        //CNT_MovementHistoryDataWrapper data6 = new CNT_MovementHistoryDataWrapper('07/08/2019','4.219',',44 ARS','07/08/2019','4.219.567',',44 ARS');
        CNT_MovementHistoryDataWrapper data6 = new CNT_MovementHistoryDataWrapper('05/08/2019','42109.44','05/08/2019','4219567.44', 'ARS');
        data.add(data6);
        //CNT_MovementHistoryDataWrapper data7 = new CNT_MovementHistoryDataWrapper('06/08/2019','3.123',',99 ARS','06/08/2019','351.230.333',',99 ARS');
        CNT_MovementHistoryDataWrapper data7 = new CNT_MovementHistoryDataWrapper('04/08/2019','31023.99','04/08/2019','351230333.99', 'ARS'); 
        data.add(data7);
        //CNT_MovementHistoryDataWrapper data8 = new CNT_MovementHistoryDataWrapper('05/08/2019','2.986',',75 ARS','05/08/2019','2.986.234',',75 ARS');
        CNT_MovementHistoryDataWrapper data8 = new CNT_MovementHistoryDataWrapper('03/08/2019','29086.75','03/08/2019','2986234.75','ARS');
        data.add(data8);
        //CNT_MovementHistoryDataWrapper data9 = new CNT_MovementHistoryDataWrapper('03/08/2019','2.123',',00 ARS','03/08/2019','2.123.723',',00 ARS');
        CNT_MovementHistoryDataWrapper data9 = new CNT_MovementHistoryDataWrapper('02/08/2019','21023','02/08/2019','2123723' ,'ARS');
        data.add(data9);
        //CNT_MovementHistoryDataWrapper data10 = new CNT_MovementHistoryDataWrapper('01/08/2019','1,888',',39 ARS','01/08/2019','1,888.342',',39 ARS');
        CNT_MovementHistoryDataWrapper data10 = new CNT_MovementHistoryDataWrapper('01/08/2019','18088.39','01/08/2019','1888342.39','ARS');
        data.add(data10);
        
        return data;
        
    }
    
    /*------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Wrapper class of the movement History list
History 
<Date>          <Author>            <Change Description>
10/01/2020	    Pablo Tejedor       Initial version
------------------------------------------------------------*/ 
    //WRAPPER OF MOVEMENT HISTORY DATA
    public class CNT_MovementHistoryDataWrapper {
        @AuraEnabled public String availableDate               {get;set;}
        @AuraEnabled public String availableBalance            {get;set;}
        @AuraEnabled public String bookDate                    {get;set;}
        @AuraEnabled public String bookBalance                 {get;set;}
        @AuraEnabled public String currencyTable               {get;set;}
        
        
        public CNT_MovementHistoryDataWrapper(String availableDate,String availableBalance,String bookDate, String bookBalance,String currencyTable){   
            this.bookDate = bookDate;
            this.bookBalance = bookBalance;
            this.currencyTable = currencyTable;
            this.availableDate = availableDate;
            this.availableBalance = availableBalance;
        }
    }   
    
}