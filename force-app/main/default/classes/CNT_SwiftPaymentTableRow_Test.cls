/*----------------------------------------------------------------------------------
Author:         R. Alexander Cervino
Company:        Deloitte
Description:    Test class for CNT_SwiftPaymentTableRow
History
<Date>			<Author>		<Description>
12/02/2020		R. Alexander Cervino     Initial version
----------------------------------------------------------------------------------*/
@isTest
public class CNT_SwiftPaymentTableRow_Test {
    
    @isTest
    public static void downloadMT103Doc(){
        Test.startTest();      
        DataFactory.createWsConfigurationSetting(true);
        try{
            CNT_SwiftPaymentTableRow.downloadMT103Doc('hola');
        }catch(Exception e){
            system.debug(e);
        }
        
        Test.stopTest();

    }
    @isTest
    public static void encryotDataTest(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        CNT_SwiftPaymentTableRow.encryptData('hola');
        Test.stopTest();
    }
    
    @isTest
    public static void getDateAndTimeTest(){
        Test.startTest();
        DataFactory.getCustomSettingCryptoKey(true);
        CNT_SwiftPaymentTableRow.getDateAndTime('10/10/2020');
        Test.stopTest();
    }
    
    @isTest
    public static void removeMT103(){
        Test.startTest();
         ContentVersion cont = new ContentVersion();
        cont.Title = 'MT103_'+DateTime.now().format('yyyy-MM-dd\'T\'HH:mm:ss.SSS');
        cont.PathOnClient = 'file_' + Datetime.now().getTime() + '.txt';
        cont.VersionData = Blob.valueOf('test');
        if(Schema.sObjectType.ContentVersion.isCreateable()){
            insert cont;
        }
        
        List<ContentDocument> doc = new List<ContentDocument>([SELECT id from ContentDocument LIMIT 1]);

        CNT_SwiftPaymentTableRow.removeMT103(doc[0].id);
        Test.stopTest();
    }

}