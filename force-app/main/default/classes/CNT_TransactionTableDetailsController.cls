/*----------------------------------------------------------------------------------
Author:         Pablo Tejedor
Company:        Deloitte
Description:    Controller of CMP_TransactionTableDetails components
Test Class:     CNT_TransactionTableDetails_Test
History
<Date>			<Author>		<Description>
15/01/2020		Pablo Tejedor     Initial version
----------------------------------------------------------------------------------*/
public class CNT_TransactionTableDetailsController {

    /*------------------------------------------------------------
    Author:         Pablo Tejedor
    Company:        Deloitte
    Description:    Returns the dummy data to the component 
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020      Pablo Tejedor       Initial version
    ------------------------------------------------------------*/    

    @AuraEnabled
    public static List<CNT_TransactionTableDetailsController.CNT_TransactionTableDetailsControllerDataWrapper> getDataTransactions(){
        
        return generateData();
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
    Author:        Pablo Tejedor
    Company:        Deloitte
    Description:    Generates dummy data with the number of data to return
    History 
    <Date>          <Author>            <Change Description>
    10/01/2020	    Pablo Tejedor       Initial version
    ------------------------------------------------------------*/ 
    public static List<CNT_TransactionTableDetailsController.CNT_TransactionTableDetailsControllerDataWrapper> generateData() {
        List<CNT_TransactionTableDetailsController.CNT_TransactionTableDetailsControllerDataWrapper> data = new List<CNT_TransactionTableDetailsController.CNT_TransactionTableDetailsControllerDataWrapper>();
        
        CNT_TransactionTableDetailsControllerDataWrapper data1 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data1);     

        CNT_TransactionTableDetailsControllerDataWrapper data2 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data2);    

        CNT_TransactionTableDetailsControllerDataWrapper data3 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data3);    

        CNT_TransactionTableDetailsControllerDataWrapper data4 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data1);    

        CNT_TransactionTableDetailsControllerDataWrapper data5 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data5);    

        CNT_TransactionTableDetailsControllerDataWrapper data6 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data6);    

        CNT_TransactionTableDetailsControllerDataWrapper data7 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data7);    

        CNT_TransactionTableDetailsControllerDataWrapper data8 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data8);    

        CNT_TransactionTableDetailsControllerDataWrapper data9 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data5);    

        CNT_TransactionTableDetailsControllerDataWrapper data10 = new CNT_TransactionTableDetailsControllerDataWrapper('ES26 0110 7298 5555 8888 1589','20/10/2019','20/10/2019','BNK','234987947239ssf9837249827sdf284793','-330',  '20944966.17', 'EUR','SAN987947239ssf9837249827sdf284793','Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        data.add(data10);    

        return data;
    }

     public class  CNT_TransactionTableDetailsControllerDataWrapper{
        @AuraEnabled public String accountNumber           {get;set;}
        @AuraEnabled public String bookDate                {get;set;}
        @AuraEnabled public String valueDate               {get;set;}
        @AuraEnabled public String category                {get;set;}
        @AuraEnabled public String refCliente    	       {get;set;}
        @AuraEnabled public String amount                  {get;set;}
        @AuraEnabled public String bookBalance             {get;set;}
        @AuraEnabled public String currencytransaction     {get;set;}
        @AuraEnabled public String bankref                 {get;set;}
        @AuraEnabled public String description             {get;set;}
        
        public CNT_TransactionTableDetailsControllerDataWrapper(String accountNumber, String bookDate, String valueDate, String category, String refCliente, String amount, String bookBalance,String currencytransaction,String bankref,String description){
            this.accountNumber = accountNumber;
            this.bookDate = bookDate;
            this.valueDate = valueDate;
            this.category = category;
            this.refCliente = refCliente;
            this.amount = amount;
            this.bookBalance = bookBalance;
            this.currencytransaction = currencytransaction;
            this.bookBalance = bankref;
            this.description = description;
  
        }
    }


}