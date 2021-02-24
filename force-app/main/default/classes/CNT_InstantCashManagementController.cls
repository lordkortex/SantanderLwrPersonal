public with sharing class CNT_InstantCashManagementController 
{
    @AuraEnabled
    public static String getJsonICMStep1(){
               
        //return '[{"id": 0,"alias": "Senior Manager","accountNumber": "ES27 1234 3857 2234 1358 1246", "balance": "8000323","currency":    "EUR"},{"id": 1,"alias": "Manager","accountNumber": "ES27 3456 3421 1235 7531 9752", "balance": "4002342","currency": "EUR"},{"id": 2,"alias": "Project Manager","accountNumber": "ES27 9853 0864 2334 3246 1111", "balance": "2003421","currency": "EUR"},{"id": 3,"alias": "Team Leader","accountNumber": "ES27 0094 0952 9922 6521 6452", "balance": "100346","currency": "EUR"},{"id": 4,"alias": "Senior Analyst","accountNumber": "ES27 0987 4455 1268 9927 1758", "balance": "80215","currency": "EUR"},{"id": 5,"alias": "Analyst","accountNumber": "ES27 0002 1257 8556 6642 7693", "balance": "37495","currency": "EUR"},{"id": 6,"alias": "Programmer","accountNumber": "ES27 5543 2335 3467 7753 0093","balance": "24500","currency": "EUR"},{"id": 7,"alias": "Junior Programmer","accountNumber": "ES27 1257 8936 1236 4542 0374", "balance": "14000","currency": "EUR"},{"id": 8,"alias": "Intern ","accountNumber": "ES27 9482 1224 1263 5432 9031", "balance": "9543","currency": "EUR"},{"id": 9,"alias": "Waschbär ","accountNumber": "DE27 1234 3857 2234 1358 1246", "balance": "8000323","currency": "EUR"},{"id": 10,"alias": "Flusspferd","accountNumber": "DE27 3456 3421 1235 7531 9752", "balance": "4002342","currency": "EUR"},{"id": 11,"alias": "Handschuh ","accountNumber": "DE27 9853 0864 2334 3246 1111", "balance": "2003421","currency": "EUR"},{"id": 12,"alias": "Meerschweinchen","accountNumber": "DE27 0094 0952 9922 6521 6452", "balance": "100346","currency": "EUR"},{"id": 13,"alias": "Zahnfleisch ","accountNumber": "DE27 0987 4455 1268 9927 1758", "balance": "80215","currency": "EUR"},{"id": 14,"alias": "Glübirne","accountNumber": "DE27 0002 1257 8556 6642 7693", "balance": "37495","currency": "EUR"},{"id": 15,"alias": "Tausendschön","accountNumber": "DE27 5543 2335 3467 7753 0093","balance": "24500","currency": "EUR"},{"id": 16,"alias": "Gürteltier","accountNumber": "DE27 1257 8936 1236 4542 0374", "balance": "14000","currency": "EUR"},{"id": 17,"alias": "Kühlschrank  ","accountNumber": "DE27 9482 1224 1263 5432 9031", "balance": "9543","currency": "EUR"}]';	
        return generateFalseData();
	} 
    

    @AuraEnabled
    public static String sendPayment(Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> data) 
    {
        system.debug('uuu' + data);
        //Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> mapaDatos = (Map<String,CNT_PaymentProcessWrapper.CNT_OriginDataWrapper>)data;
        CNT_PaymentProcessWrapper datos = new CNT_PaymentProcessWrapper(data);
        String serialized = JSON.serialize(datos);
        serialized = serialized.replaceAll('\"ObjectCurrency\":' , '\"currency\":');
        System.debug(serialized);
        CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('CNT_SendPaymentProcess');
        String respuesta = Global_IntegrationWrapper.launchHTTP(serialized,configWs.CNT_Endpoint__c , configWs.CNT_HTTPMethod__c);
        system.debug('respuesta: ' + respuesta);
        return respuesta;
    }

    public static String generateFalseData() {

        List<CNT_PaymentProcessWrapper.CNT_OriginDataWrapper> data = new List<CNT_PaymentProcessWrapper.CNT_OriginDataWrapper>();
        CNT_PaymentProcessWrapper.CNT_OriginDataWrapper data1 = new CNT_PaymentProcessWrapper.CNT_OriginDataWrapper();
        data1.id = 0;
        data1.alias = 'Cuenta Principal';
        data1.accountNumber = 'ES45 0049 0001 5026 1011 6815';
        data1.balance = '873.568,00';
        data1.ObjectCurrency = 'EUR';
        data.add(data1);
/*
        CNT_PaymentProcessWrapper.CNT_OriginDataWrapper data2 = new CNT_PaymentProcessWrapper.CNT_OriginDataWrapper();
        data2.id = 01;
        data2.alias = 'Cuenta Secundaria';
        data2.accountNumber = 'ES89 0049 0001 5125 1015 3788';
        data2.balance = '1.937.774,00';
        data2.ObjectCurrency = 'EUR';
        data.add(data2);

        CNT_PaymentProcessWrapper.CNT_OriginDataWrapper data3 = new CNT_PaymentProcessWrapper.CNT_OriginDataWrapper();
        data3.id = 2;
        data3.alias = 'Cuenta Emergencias';
        data3.accountNumber = 'ES84 0049 0001 5928 1017 1964';
        data3.balance = '500.000,00';
        data3.ObjectCurrency = 'EUR';
        data.add(data3);
        */

        CNT_PaymentProcessWrapper.CNT_OriginDataWrapper data4 = new CNT_PaymentProcessWrapper.CNT_OriginDataWrapper();
        data4.id = 3;
        data4.alias = 'Creditor Bank Account';
        data4.accountNumber = 'GB09012834128146';
        data4.balance = '500.000,00';
        data4.ObjectCurrency = 'GBP';
        data.add(data4);
/*
        CNT_PaymentProcessWrapper.CNT_OriginDataWrapper data5 = new CNT_PaymentProcessWrapper.CNT_OriginDataWrapper();
        data5.id = 4;
        data5.alias = 'Debtor Bank Account';
        data5.accountNumber = 'GB09012774076183';
        data5.balance = '500.000,00';
        data5.ObjectCurrency = 'GBP';
        data.add(data5);
*/
        return JSON.serialize(data);
    }	

}