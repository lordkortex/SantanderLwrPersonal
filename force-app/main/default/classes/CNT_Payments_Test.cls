@isTest
public class CNT_Payments_Test {
    
    @isTest
    static void methods_Test(){
        
		CNT_payments.getAccountTypes();
		CNT_payments.getCurrencyList();
		CNT_payments.getStatusList();
		CNT_payments.getPaymentMethodList();
		CNT_payments.getPaymentTypeList();
		CNT_payments.getCountryList();
		CNT_payments.getPaymentStatus ('statusCode');
		CNT_payments.getPaymentMethod('methodCode');
		CNT_payments.getPaymentPurpose('purposeCode');
		CNT_payments.getPaymentStatusMap();
		CNT_payments.getStatusList(true,false);
		CNT_payments.getStatusList(false,true);
		CNT_payments.getStatusList(false,false);
		CNT_payments.getPaymentStatusReasonList();
		CNT_payments.getTestPaymentsInformation(true);
		CNT_payments.loadAccountList();
		CNT_payments.getTrackingStep('001', '001');
    }
    
    @isTest
    static void getUserMap_test(){
        User u = DataFactory.getRunningUser(true);
        List<String> UserIds = new List<String>();
        UserIds.add(u.USER_TXT_GlobalId__c);
        List<User> userList = [SELECT USER_TXT_GlobalId__c, Name FROM User WHERE USER_TXT_GlobalId__c IN :UserIds];
        system.debug(userList);
        CNT_payments.getUserMap(userIds);
    }
}