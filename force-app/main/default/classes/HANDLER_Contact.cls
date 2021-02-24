public class HANDLER_Contact {
    public static void updateAccount(Map<Id, Contact> oldContactMap, List<Contact> newContactList){
        Set<Id> setContactIdsOld = new Set<Id>();
        Set<Id> setContactIdsNew = new Set<Id>();
        Set<Id> setUserIds = new Set<Id>();
        
        List<User> userToUpdate = new List<User>();
        List<Contact> updatedContact = new List<Contact>();
        
        List<User> listToUpdate = new List<User>();
        
        System.debug('HANDLER_Contact.updateAccount >>>>> START');

        if(!newContactList.isEmpty()){
            
            

            //Old Relation
            for(Contact con : oldContactMap.values()){
                setUserIds.add(con.CONTACT_User__c);
                setContactIdsOld.add(con.Id);
            }
            
            //Id userId = setContactIdsOld[0];
            //Id contactId = setContactIdsOld[1];
            
            System.debug(setContactIdsOld);
            
            if(!setContactIdsOld.isEmpty()){
                userToUpdate = [SELECT Id, FirstName, LastName, Email, DefaultCurrencyIsoCode, USER_TXT_BIC__c, USER_TXT_GlobalId__c, ContactId FROM User WHERE Id IN : setUserIds];
                updatedContact = [SELECT Id, FirstName, LastName, Email, CurrencyIsoCode, CONTACT_TXT_BIC__c, CONTACT_TXT_GlobalId__c FROM Contact WHERE Id IN : setContactIdsOld];
            }
            
            System.debug('USER: ' + userToUpdate);
            System.debug('CONTACT: ' + updatedContact);
            
            Map<Id, User> mapContactIdUser = new Map<Id, User>();
            
            for(User u: userToUpdate){
                mapContactIdUser.put(u.ContactId, u);
            }
            
            for(Contact c: updatedContact){
                if(mapContactIdUser.containsKey(c.Id)){
                    User relatedUser = mapContactIdUser.get(c.Id);
                    relatedUser.FirstName = c.FirstName;
                	relatedUser.LastName = c.LastName;
                	relatedUser.DefaultCurrencyIsoCode = c.CurrencyIsoCode;
                	relatedUser.USER_TXT_BIC__c = c.CONTACT_TXT_BIC__c;
                	relatedUser.USER_TXT_GlobalId__c = c.CONTACT_TXT_GlobalId__c;
                        if(c.Email != null) {
                            relatedUser.Email = c.Email;
                        }
                	System.debug('RELATED: ' + relatedUser);
                    listToUpdate.add(relatedUser);
                }                
            }                   
        } 
                   if(listToUpdate.size()>=0){
                       update listToUpdate;
                   }
    }
}