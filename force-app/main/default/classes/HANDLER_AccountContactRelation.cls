/*----------------------------------------------------------------------------------
Author:         Antonio Matachana
Company:        Grupo Avalon
Description:    Handler for the AccountContactRelation trigger
Test Class:     HANDLER_AccountContactRelation_Test
History
<Date>          <Author>        	<Description>
20/08/2020      Antonio Matachana     Initial version
----------------------------------------------------------------------------------*/
public without sharing class HANDLER_AccountContactRelation {
    
        /*---------------------------------------------------------------------------------------------
        Author:         Antonio Matachana
        Company:        Grupo Avalon
        Description:    Store date when AccountContactRelation field isActive change to false.
        History 
        <Date>          <Author>            <Change Description>
        20/08/2020      Antonio Matachana  		Intial Version
        ---------------------------------------------------------------------------------------------*/
        public static void deactivateTime(List<AccountContactRelation> newAcrList){
            for (AccountContactRelation acr : newAcrList) {
                if(acr.isActive == false){
                    acr.ACR_DATET_Deactivate__c = system.today();
                }
            }
        }
    
    
    	/*---------------------------------------------------------------------------------------------
        Author:         Antonio Matachana
        Company:        Grupo Avalon
        Description:    Populate field ACR_TXT_RelationId__c in AccountContactRelation created automatically
						created when Account is asociated to Contact the first time.
        History 
        <Date>          <Author>            <Change Description>
        28/08/2020      Antonio Matachana  		Intial Version
        ---------------------------------------------------------------------------------------------*/
        public static void createRelationId(List<AccountContactRelation> newAcrList){
        	Set<Id> setIdContact = new Set<Id>();
            Set<Id> setIdAccount = new Set<Id>();            
            
            Map<Id,Contact> mapContacts = new Map<Id,Contact>();
            Map<Id,Account> mapAccounts = new Map<Id,Account>();
                       
            for(AccountContactRelation acr: newAcrList){
                //Records created automatically the field IsDirect value is always true
                if(acr.IsDirect){
                    setIdAccount.add(acr.AccountId);
                    setIdContact.add(acr.ContactId);
                }
            }
            
            List<Contact> listContacts = [SELECT Id, CONTACT_TXT_GlobalId__c FROM Contact WHERE Id IN :setIdContact];
            if(listContacts.size()>0){
                for(Contact c: listContacts){
                    mapContacts.put(c.Id, c);
                }
            }
            
            List<Account> listAccounts = [SELECT Id, ACC_TXT_CompanyId__c FROM Account WHERE Id IN :setIdAccount];
            if(listAccounts.size()>0){
                for(Account acc: listAccounts){
                    mapAccounts.put(acc.Id, acc);
                }
            }
            
            for(AccountContactRelation acr: newAcrList){
                if(acr.IsDirect){
                    if((mapContacts.get(acr.ContactId).CONTACT_TXT_GlobalId__c)!=null && mapAccounts.get(acr.AccountId).ACC_TXT_CompanyId__c !=null){
                        acr.ACR_TXT_RelationId__c = (mapContacts.get(acr.ContactId).CONTACT_TXT_GlobalId__c) + (mapAccounts.get(acr.AccountId).ACC_TXT_CompanyId__c);
                    	System.debug('createRelationId: ' + acr.ACR_TXT_RelationId__c);
                    }                             
                }
            }           
        }
    	

        /*---------------------------------------------------------------------------------------------
        Author:         Antonio Matachana
        Company:        Grupo Avalon
        Description:    Change Users Active field if user dont have any active relationship between Contact and Account the User has to be deactivated.
        History 
        <Date>          <Author>            <Change Description>
        20/08/2020      Antonio Matachana  		Intial Version
        ---------------------------------------------------------------------------------------------*/
        public static void checkUsers(List<AccountContactRelation> newAcrList){
            List<AccountContactRelation> oldAtivateRelations = new List<AccountContactRelation>();

            Set<Id> setAcrContactDeactivatedNew = new Set<Id>();
            Set<Id> setAcrContactActiveNew = new Set<Id>();
            Set<Id> setAcrDeactivateNew = new Set<Id>();

            Set<Id> setOldContacAcrActive = new Set<Id>();
            Set<Id> setContacToDeactivate = new Set<Id>();
            List<User> listUserToUpdate = new List<User>();

            //System.debug('Number of ACR: ' + newAcrList.size());

            for(AccountContactRelation acr: newAcrList){
                if(acr.isActive){
                    setAcrContactActiveNew.add(acr.ContactId);
                }
            }

            //System.debug('Id Contacts ACR Active : ' + setAcrContactActiveNew.size());

            updateInactiveUsers(setAcrContactActiveNew);

            for(AccountContactRelation acr: newAcrList){
                if(acr.isActive == false && !setAcrContactActiveNew.contains(acr.ContactId)){
                    setAcrContactDeactivatedNew.add(acr.ContactId);
                    setAcrDeactivateNew.add(acr.Id);
                }
            }
            //System.debug('Number of Contacts with ACR deactivate: ' + setAcrContactDeactivatedNew.size());

            oldAtivateRelations = [SELECT Id, ACR_TXT_RelationId__c, ContactId, isActive from AccountContactRelation WHERE isActive = true AND ContactId IN :setAcrContactDeactivatedNew];
            //System.debug('Old ACR Activate: ' + oldAtivateRelations.size());

            for(AccountContactRelation oldAcrActive: oldAtivateRelations){
                setOldContacAcrActive.add(oldAcrActive.Id);
            }

            for(Id idContactAcr: setAcrContactDeactivatedNew){
                if(!setOldContacAcrActive.contains(idContactAcr)){
                    setContacToDeactivate.add(idContactAcr);
                }
            }

            if(setContacToDeactivate.size()>0){
                updateUsers(setContacToDeactivate);
            }

        }


        /*---------------------------------------------------------------------------------------------
        Author:         Antonio Matachana
        Company:        Grupo Avalon
        Description:    Change Users Active field if user have any active relationship between Contact and Account the User must be activated.
        History 
        <Date>          <Author>            <Change Description>
        20/08/2020      Antonio Matachana  		Intial Version
        ---------------------------------------------------------------------------------------------*/
        public static void checkUsersInsert(List<AccountContactRelation> newAcrList){
            Set<Id> setAcrContactActiveNew = new Set<Id>();

            for(AccountContactRelation acr: newAcrList){
                if(acr.isActive){
                    setAcrContactActiveNew.add(acr.ContactId);
                }
            }
            //System.debug('Number of Contacts with ACR Active (Insert): ' + setAcrContactActiveNew.size());
            if(setAcrContactActiveNew.size()>0){
                updateInactiveUsers(setAcrContactActiveNew);
            }
        }



        /*---------------------------------------------------------------------------------------------
        Author:         Antonio Matachana
        Company:        Grupo Avalon
        Description:    Deactive Users if they not have any active Acr.
        History 
        <Date>          <Author>            <Change Description>
        20/08/2020      Antonio Matachana  		Intial Version
        ---------------------------------------------------------------------------------------------*/
        @future
        public static void updateUsers(Set<Id> setContactToDeactivate){
            List<User> listUserToUpdate = new List<User>();
            List<User> listUserContact = [SELECT Id, Name, isActive, ContactId FROM User WHERE ContactId IN :setContactToDeactivate];
            for(User u: listUserContact){
                u.isActive = false;
                listUserToUpdate.add(u);
            }
            if(listUserToUpdate.size()>0){
                System.debug('Number of User to update: ' + listUserToUpdate.size());
                update listUserToUpdate;
            }
        }

        /*---------------------------------------------------------------------------------------------
        Author:         Antonio Matachana
        Company:        Grupo Avalon
        Description:    Active Users if they have any active Acr.
        History 
        <Date>          <Author>            <Change Description>
        20/08/2020      Antonio Matachana  		Intial Version
        ---------------------------------------------------------------------------------------------*/
        @future
        public static void updateInactiveUsers (Set<Id> setAcrActive){
            //System.debug('Number of users to reactivate: ' + setAcrActive.size());
            List<User> listUserToActivate = new List<User>();

            List<User> listUserContact = [SELECT Id, Name, isActive, ContactId FROM User WHERE ContactId IN :setAcrActive];
            //System.debug('Number of users listUserContact: ' + listUserContact.size());
            for(User u: listUserContact){
                if(!u.isActive){
                    u.isActive = true;
                    listUserToActivate.add(u);
                }
            }
            //System.debug('User to Update in updateInactiveUsers: ' + listUserToActivate.size());
            if(listUserToActivate.size()>0){
                update listUserToActivate;
            }
        }
}