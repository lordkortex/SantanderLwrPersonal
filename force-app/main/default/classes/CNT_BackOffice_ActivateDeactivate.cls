public class CNT_BackOffice_ActivateDeactivate {
    
    
	public static void contactHandler(Id id, Boolean isActivate){
        Contact targetContact = [SELECT Id, Name, Contact_User__c FROM Contact WHERE ID= :id];
        User targetUser = [SELECT LastName, Id From User Where ID= :targetContact.Contact_User__c];
        List<AccountContactRelation> targetACRelations = [Select Id, ContactId, AccountId From AccountContactRelation WHERE ContactId = :targetContact.Id];
        
        if(isActivate){
            targetUser.IsActive = true;
            //targetContact.isActive = true;???
            
            for(AccountContactRelation accCntR: targetACRelations){                
                Account targetAccount = [SELECT Id, Name From Account Where Id =: accCntR.AccountId];                
                /////////
                //Falta cambiar el if true por una comprobación en account para saber si está activa.
                /////////
                if(true){
                    accCntR.IsActive = true;
                }                
            }
            
            update targetUser;
            update targetContact;
            update targetACRelations;
            
        }else{
            targetUser.IsActive = false;
            //targetContact.IsActive = false;
            for(AccountContactRelation accCntR: targetACRelations){                
                accCntR.IsActive = false;              
            }
            
            update targetUser;
            update targetContact;
            update targetACRelations;
        }
    }
    
    public static void accountHandler(Id id, Boolean isActivate){
        Account targetAccount = [SELECT Id, Name FROM Account WHERE ID= :id];
        List<AccountContactRelation> targetACRelations = [Select Id, ContactId, AccountId From AccountContactRelation WHERE AccountId = :targetAccount.Id];
        Contact targetContact;
        if(isActivate){
            //targetAccount.isActive = true;???
            
            for(AccountContactRelation accCntR: targetACRelations){                
                targetContact = [SELECT Id, Name From Contact Where Id =: accCntR.ContactId];
                
                //En vez del true un ¿targetContact.isActive? o algo así si existe.
                if(true){
                    accCntR.IsActive = true;
                }
            }
            
            update targetAccount;
            update targetACRelations;
        }else{
            //targetAccount.isActive = false;?
            //Como gestiono el habilitar/deshabilitar acc
            
            for(AccountContactRelation accCntR: targetACRelations){
                accCntR.IsActive = false;    
            }
            
            update targetAccount;
            update targetACRelations;
            
           	if(!hasMoreCompanies(targetContact.Id)){
                //targetContact.setActive = false;
                //Desactivar usuario también*
            }
        }
    }    
    
    
    public static void accountContactRelationHandler(Id id, Boolean isActivate){
    	AccountContactRelation targetACRelation = [SELECT Id, AccountId, ContactId FROM AccountContactRelation WHERE ID= :id];
        Account targetAccount = [SELECT Id, Name FROM Account WHERE ID= :targetACRelation.AccountId];
        Contact targetContact = [SELECT Id, Name, Contact_User__c FROM Contact WHERE ID= :targetACRelation.ContactId];
        
        if(isActivate){
            //Check de if(targetAccount.isActive & targetContact.isActive)
            if(true){
                targetACRelation.IsActive = true;
                update targetACRelation;
            }
        }else{
            targetACRelation.IsActive = false;
            update targetACRelation;
            
            if(!hasMoreCompanies(targetContact.Id)){
                //targetContact.setActive = false;
                //Desactivar usuario también*
            }
        }
    	   
    }
    
    private static Boolean hasMoreCompanies(ID contactId){        
        List<AccountContactRelation> targetACRelations = [Select Id, AccountId From AccountContactRelation WHERE ContactId = :contactId];
        
        for(AccountContactRelation accCntR: targetACRelations){
            if(accCntR.IsActive){
                return true;
            }
        }
        return false;
    }
}