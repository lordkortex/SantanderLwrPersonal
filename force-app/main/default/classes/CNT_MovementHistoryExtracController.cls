/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Controller of CNT_MovementHistoryExtracController components
Test Class:     CNT_MovementHistoryExtracControllerTest
History
<Date>			<Author>		<Description>
10/01/2020		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/
public class CNT_MovementHistoryExtracController {
    
    /*------------------------------------------------------------
Author:        Pablo Tejedor
Company:        Deloitte
Description:    Returns the dummy data to the component (9 data)
History 
<Date>          <Author>            <Change Description>
10/01/2020      Pablo Tejedor       Initial version
------------------------------------------------------------*/     
    @AuraEnabled
    public static List<CNT_MovementHistoryExtracController.CNT_MovementHistoryExtractDataWrapper> getDataExtract(){
        
        return generateFalseData();
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
    
    //ESTE METODO SE USA AHORA PARA SACAR DATOS PARA LA CONSTRUCCION YA QUE EL METODO DE END OF DAY A DIA 3 de Marzo NO SACA DATOS
    @AuraEnabled
    public static CNT_International_Treasury_Management getAccountsAvaibleDataLastUpdate(String tablabel){
        
        return CNT_International_Treasury_Management.initClass(tablabel);
        
    }
    
    /*------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Method to send data information that needs mulesoft
History 
<Date>          <Author>            <Change Description>
24/01/2020		Pablo Tejedor        Initial version
------------------------------------------------------------*/  
    @AuraEnabled(cacheable=true)
    public static WRAPPER_ExtractsData getExtractIntegrationData(String accountNumber, String dateTo) { 
        try{
            CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_GetExtractData');
            //String finalEndPoint = 'https://e-onetrade-cert.de-c1.cloudhub.io/api/v1/extracts/12314?account=0720590942290418123456&dateTo=20/11/2019';
            //String finalEndpoint = 'https://e-onetrade-dev.de-c1.cloudhub.io/api/v1/nx/extracts/12314?account=0720590942290418123456&dateTo=20/11/2019';
            String finalEndPoint = configWs.CNT_Endpoint__c.replace('{account}','0720590942290418123456').replace('{dateTo}','20/11/2019');
            System.debug('finalEndPoint ' + finalEndPoint);
            String response = Global_IntegrationWrapper.launchHttp('',finalEndPoint, configWs.CNT_HTTPMethod__c);
           
            if (String.isNotBlank(response)) {
                System.debug('Response: ' + response);
                WRAPPER_ExtractsData listExtracts = WRAPPER_ExtractsData.parse(response);
                return listExtracts;
            } else {
                throw new customException(Label.getDataError);
            }
            
        }catch (Exception e) {
            System.debug('CNT_MovementHistoryExtracController.getExtractIntegrationData: ' + e.getMessage() +' line '+ e.getLineNumber() );
            throw new customException('CNT_MovementHistoryExtracController.getExtractIntegrationData: ' + e.getMessage() +' line '+ e.getLineNumber() );
        }
        
    }
    
    /*------------------------------------------------------------
Author:        Pablo Tejedor
Company:        Deloitte
Description:    Generates dummy data with the number of data to return
History 
<Date>          <Author>            <Change Description>
10/01/2020	    Pablo Tejedor       Initial version
------------------------------------------------------------*/ 
    public static List<CNT_MovementHistoryExtracController.CNT_MovementHistoryExtractDataWrapper> generateFalseData() {
        
        List<CNT_MovementHistoryExtracController.CNT_MovementHistoryExtractDataWrapper> data = new List<CNT_MovementHistoryExtracController.CNT_MovementHistoryExtractDataWrapper>();
        
        //CNT_MovementHistoryExtractDataWrapper data1 = new CNT_MovementHistoryExtractDataWrapper('ES26 0110 7298 5555 8888 2356','20/11/2019','20/12/2019','MSC','234987947239ssf9837249827sdf284793','-44',',44 EUR',  '-6.125',',96 EUR');
        CNT_MovementHistoryExtractDataWrapper data1 = new CNT_MovementHistoryExtractDataWrapper('ES26 0110 7298 5555 8888 2356','20/11/2019','20/12/2019','MSC','234987947239ssf9837249827sdf284793','-44.44',  '-6125.96', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355');
        data.add(data1);     
        //CNT_MovementHistoryExtractDataWrapper data2 = new CNT_MovementHistoryExtractDataWrapper('ES26 8456 1235 1235 4542 1353','12/11/2019','20/12/2019','BKN','234987947239ssf9837249827sdf284793', '-55',',22 EUR', '-6.125',',96 EUR');
        CNT_MovementHistoryExtractDataWrapper data2 = new CNT_MovementHistoryExtractDataWrapper('ES26 8456 1235 1235 4542 1353','12/11/2019','20/12/2019','BKN','234987947239ssf9837249827sdf284793', '55.22', '-6125.96', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355');
        data.add(data2);
        //CNT_MovementHistoryExtractDataWrapper data3 = new CNT_MovementHistoryExtractDataWrapper('ES26 0947 8563 1268 7654 1245','09/11/2019','20/12/2019','BBC','234987947239ssf9837249827sdf284793', '-321',',66 EUR', '-5.124',',12 EUR');
        CNT_MovementHistoryExtractDataWrapper data3 = new CNT_MovementHistoryExtractDataWrapper('ES26 0947 8563 1268 7654 1245','09/11/2019','20/12/2019','BBC','234987947239ssf9837249827sdf284793', '-321.66', '-5124.12', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355');
        data.add(data3);
        //CNT_MovementHistoryExtractDataWrapper data4 = new CNT_MovementHistoryExtractDataWrapper('ES26 6352 3256 1234 1235 3457','12/10/2019','20/12/2019','MSM','234987947239ssf9837249827sdf284793', '-521',',50 EUR', '-1.000',',64 EUR');
        CNT_MovementHistoryExtractDataWrapper data4 = new CNT_MovementHistoryExtractDataWrapper('ES26 6352 3256 1234 1235 3457','12/10/2019','20/12/2019','MSM','234987947239ssf9837249827sdf284793', '-521.50', '-1000.64', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355'); 
        data.add(data4);
        //CNT_MovementHistoryExtractDataWrapper data5 = new CNT_MovementHistoryExtractDataWrapper('ES26 8462 1245 2235 6232 6643','22/11/2019','20/12/2019','SMS','234987947239ssf9837249827sdf284793','-22',',99 EUR', '-125',',00 EUR');
        CNT_MovementHistoryExtractDataWrapper data5 = new CNT_MovementHistoryExtractDataWrapper('ES26 8462 1245 2235 6232 6643','22/11/2019','20/12/2019','SMS','234987947239ssf9837249827sdf284793','22.99', '-125', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355');
        data.add(data5);
        //CNT_MovementHistoryExtractDataWrapper data6 = new CNT_MovementHistoryExtractDataWrapper('ES26 7455 7642 7654 2223 2135','08/11/2019','20/12/2019','ATT','234987947239ssf9837249827sdf284793', '-163',',06 EUR', '-2.042',',74 EUR');
        CNT_MovementHistoryExtractDataWrapper data6 = new CNT_MovementHistoryExtractDataWrapper('ES26 7455 7642 7654 2223 2135','08/11/2019','20/12/2019','ATT','234987947239ssf9837249827sdf284793', '-163.06', '-2042.74', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355');
        data.add(data6);
        //CNT_MovementHistoryExtractDataWrapper data7 = new CNT_MovementHistoryExtractDataWrapper('ES26 1122 1257 1231 0124 1234','01/11/2019','20/12/2019','SGT', '234987947239ssf9837249827sdf284793','-125',',31 EUR', '-3.902',',11 EUR');
        CNT_MovementHistoryExtractDataWrapper data7 = new CNT_MovementHistoryExtractDataWrapper('ES26 1122 1257 1231 0124 1234','01/11/2019','20/12/2019','SGT', '234987947239ssf9837249827sdf284793','-125.31', '-3902.11', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355');
        data.add(data7);
        //CNT_MovementHistoryExtractDataWrapper data8 = new CNT_MovementHistoryExtractDataWrapper('ES26 7763 1235 6422 0006 2214','29/11/2019','20/12/2019','OPC', '234987947239ssf9837249827sdf284793','-631',',51 EUR', '-50',',00 EUR');
        CNT_MovementHistoryExtractDataWrapper data8 = new CNT_MovementHistoryExtractDataWrapper('ES26 7763 1235 6422 0006 2214','29/11/2019','20/12/2019','OPC', '234987947239ssf9837249827sdf284793','-631.51', '-50', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355');
        data.add(data8);
        //CNT_MovementHistoryExtractDataWrapper data9 = new CNT_MovementHistoryExtractDataWrapper('ES26 3337 4321 1235 3521 1235','15/11/2019','20/12/2019','RFG','234987947239ssf9837249827sdf284793', '-22',',34 EUR', '-1.230',',94 EUR');
        CNT_MovementHistoryExtractDataWrapper data9 = new CNT_MovementHistoryExtractDataWrapper('ES26 3337 4321 1235 3521 1235','15/11/2019','20/12/2019','RFG','234987947239ssf9837249827sdf284793', '-22.34', '-1230.94', 'EUR', '234987947239ssf9837249827sdf284793', '/LTC/0891-Cash deposit /HTC/CHK/AIN/00000002355');
        data.add(data9);
        
        return data;
    }
    /*------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Wrapper class of the Extract list
History 
<Date>          <Author>            <Change Description>
10/01/2020	    Pablo Tejedor       Initial version
------------------------------------------------------------*/ 
    //WRAPPER OF MOVEMENT HISTORY DATA
    public class  CNT_MovementHistoryExtractDataWrapper{
        @AuraEnabled public String accountNumber       {get;set;}
        @AuraEnabled public String bookDate            {get;set;}
        @AuraEnabled public String valueDate           {get;set;}
        @AuraEnabled public String category            {get;set;}
        @AuraEnabled public String refCliente    	   {get;set;}
        @AuraEnabled public String amount              {get;set;}
        @AuraEnabled public String bookBalance         {get;set;}
        @AuraEnabled public String currencyExtract     {get;set;}
        @AuraEnabled public String refBank             {get;set;}
        @AuraEnabled public String description         {get;set;}
        
        //public CNT_MovementHistoryExtractDataWrapper(String accountNumber, String bookDate, String valueDate, String category,String refCliente, String amountEntero,String amountdecimal, String bookBalanceEntero, String bookBalanceDecimal){
        public CNT_MovementHistoryExtractDataWrapper(String accountNumber, String bookDate, String valueDate, String category, String refCliente, String amount, String bookBalance,String currencyExtract, String refBank, String description){
            this.accountNumber = accountNumber;
            this.bookDate = bookDate;
            this.valueDate = valueDate;
            this.category = category;
            this.refCliente = refCliente;
            this.amount = amount;
            this.bookBalance = bookBalance;
            this.currencyExtract = currencyExtract;
            this.refBank = refBank;
            this.description = description;
            
        }
    }
}