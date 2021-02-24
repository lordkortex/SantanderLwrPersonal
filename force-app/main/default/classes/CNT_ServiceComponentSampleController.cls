public with sharing class CNT_ServiceComponentSampleController {
	@AuraEnabled
    public static void doNothing(){
        System.debug('Done nothing');
    }
    
    @AuraEnabled
    public static void doNothingAgain(){
        System.debug('Done nothing again');
    }
}