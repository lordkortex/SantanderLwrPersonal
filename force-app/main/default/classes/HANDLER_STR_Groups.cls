public class HANDLER_STR_Groups {

    public static void insertGroupRecords(String accountId, String companyId, Object groupOutput){
        String res = '';
        try{
            Id groupRecordType = Schema.SObjectType.STR_SignersGroup__c.getRecordTypeInfosByDeveloperName().get('STR_SignatureGroup').getRecordTypeId();
            Id SignerRecordType = Schema.SObjectType.STR_Signer__c.getRecordTypeInfosByDeveloperName().get('STR_Signer').getRecordTypeId();
            List<STR_SignersGroup__c> groupsToInsert = new List<STR_SignersGroup__c>();
            List<STR_Signer__c> signersToInsert = new List<STR_Signer__c>();
            Map<String, List<WS_STR_SignatureGroups.Signers>> GroupSignersMap = new Map<String, List<WS_STR_SignatureGroups.Signers>>();
            Map<String, String> userIdsMap = getUserIdsMap(accountId);
            WS_STR_SignatureGroups.OUTPUT objGroup = (WS_STR_SignatureGroups.OUTPUT) groupOutput;
            for (WS_STR_SignatureGroups.tGroup sGroup : objGroup.groupList){
                STR_SignersGroup__c newGroup = new STR_SignersGroup__c();
                newGroup.recordTypeId = groupRecordType;
                newGroup.STR_LKP_Company__c = companyId;
                newGroup.STR_TXT_GroupId__c = sGroup.groupId;
                newGroup.Name = sGroup.groupName;
                newGroup.STR_TXT_GroupStatus__c = sGroup.groupStatus;              
                groupsToInsert.add(newGroup);
                GroupSignersMap.put(sGroup.groupId, sGroup.signersList);               
            }          
            if(!groupsToInsert.isEmpty()){
                database.insert(groupsToInsert, true);
            }
            for(STR_SignersGroup__c tGroup : groupsToInsert){
                List<WS_STR_SignatureGroups.Signers> signerList = GroupSignersMap.get(tGroup.STR_TXT_GroupId__c);
                for(WS_STR_SignatureGroups.Signers signer : signerList){
                	STR_Signer__c newSigner = new STR_Signer__c();
                	newSigner.RecordTypeId = SignerRecordType;
                    newSigner.STR_TXT_Email__c = signer.emailAddress;
                    newSigner.STR_LKP_SignersGroup__c = tGroup.Id;
                    newSigner.STR_LKP_User__c = userIdsMap.get(signer.userId);
                    newSigner.Name = signer.userId;
				}
            }
        } catch (Exception e) {
            System.debug('HANDLER_STR_Groups.insertGroupRecords: ' + e.getMessage() + ', in line: ' + e.getLineNumber());
        }
    }
    
    public static Map<String, String> getUserIdsMap(String accountId){
        Map<String, String> response = new Map<String, String>();
        List<User> listUser = [SELECT Id, USER_TXT_GlobalId__c FROM User WHERE User.ContactId IN (SELECT ContactId FROM AccountContactRelation WHERE AccountId = :accountId)];
        for(User tUser : listUser){
            response.put(tUser.USER_TXT_GlobalId__c, tUser.Id);
        }        
        return response;
    }
}