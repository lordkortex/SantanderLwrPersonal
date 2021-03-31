/*----------------------------------------------------------------------------------
Author:         Andrea Martín
Company:        Deloitte
History
<Date>			<Author>		<Description>
22/02/2021		Andrea Martín     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class WS_STR_SignatureGroups_Test {
    
    @TestSetup
    static void setup(){
        DataFactory.getCustomSettingCryptoKey(true);
        DataFactory.createWsConfigurationSetting(true);   
    }
    
    @isTest 
    static  void getGroups_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_SignatureGroups',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/gts_signature/groups',
                CNT_HTTPMethod__c = 'GET',
                tokenPlatform__c = 'GTS',
                tokenUser__c = 'local',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            
            Test.setMock(HttpCalloutMock.class, new WS_STR_SignatureGroups_MockHttp.getGroupsResponse());
            WS_STR_SignatureGroups.INPUT input = new WS_STR_SignatureGroups.INPUT();
            input.groupId = 'GRP0001';
            input.groupName = 'GROUP A';
            input.customerId = '2995';
            input.groupStatus = 'active';
            
            Test.startTest();
            WS_STR_SignatureGroups.getGroups(input);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.getGroups_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest 
    static  void postGroup_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_SignatureGroups',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/gts_signature/groups',
                CNT_HTTPMethod__c = 'POST',
                tokenPlatform__c = 'GTS',
                tokenUser__c = 'local',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            
            Test.setMock(HttpCalloutMock.class, new WS_STR_SignatureGroups_MockHttp.getGroupsResponse());
           	String body = 'body';
            
            Test.startTest();
            WS_STR_SignatureGroups.postGroup(body);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.postGroup_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest 
    static  void patchGroup_test(){
        try{
            CNT_ApiConfiguration__c configWs = new CNT_ApiConfiguration__c(
                Name = 'WS_STR_SignatureGroups',
                CNT_Endpoint__c = 'https://api.sandbox.mulesoft.onetrade.santander.com/onetrade/cert/api/v1/gts_signature/groups',
                CNT_HTTPMethod__c = 'PATCH',
                tokenPlatform__c = 'GTS',
                tokenUser__c = 'local',
                CNT_Service__c = 'mulesoft'
            );
            insert configWs;
            
            Test.setMock(HttpCalloutMock.class, new WS_STR_SignatureGroups_MockHttp.getGroupsResponse());
            WS_STR_SignatureGroups.INPUT input = new WS_STR_SignatureGroups.INPUT();
            input.groupId = 'GRP0001';
            input.groupName = 'GROUP A';
            input.customerId = '2995';
            input.groupStatus = 'active';
            
           	String body = 'body';
            
            Test.startTest();
            WS_STR_SignatureGroups.patchGroup(input, body);
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.patchGroup_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    @isTest 
    static  void output_test(){
        try{
            Test.startTest();
            List<WS_STR_SignatureGroups.Signers> signersList = new List<WS_STR_SignatureGroups.Signers>();
            WS_STR_SignatureGroups.Signers signers = new WS_STR_SignatureGroups.Signers();
            signers.userId = 'Useruid001';
            signers.emailAddress = 'aaaa@bbb.com';
            signers.status = 'active';
            signersList.add(signers);
            
            List< WS_STR_SignatureGroups.tGroup> groupList = new List< WS_STR_SignatureGroups.tGroup>();
            WS_STR_SignatureGroups.tGroup tGroup = new WS_STR_SignatureGroups.tGroup();
           
            tGroup.groupId = 'cf38d159-325b-4d06-b4fc-e96c43864933';
            tGroup.groupName = 'GROUP A';
            tGroup.customerId='2995';
            tGroup.groupStatus = 'active';
            tGroup.SignersList = signersList;
            groupList.add(tGroup);
            
            WS_STR_SignatureGroups.OUTPUT output = new WS_STR_SignatureGroups.OUTPUT();
            output.groupList = groupList;
            
            Test.stopTest();          
            
        } catch (Exception e) {
            System.debug('WS_STR_SignatureGroups_Test.getGroups_test: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
}