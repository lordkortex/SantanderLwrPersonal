public class testABR {

@AuraEnabled
	public static List<Account> getLstAccounts(){
    	List<Account>  lstAccts = New List<Account>([SELECT Id, 
        												    ACC_TXT_DocumentType__c, 
                                                            ACC_TXT_DocumentNumber__c, 
                                                            Name, 
                                                            Consent_Country__c
                                                     FROM Account
 													WHERE ParentID = '0011j00000YX6JPAA1']); //ACC_TXT_TermsConditions_OTView_Signatory__c != NULL]);
		return lstAccts;
        
    }
    
    
    
@AuraEnabled
    public static String setLstAccounts(List<String> updateStr){
       
        system.debug(updateStr);
       List<Account>  lstAccts = New List<Account>([SELECT Id, 
        												   ACC_CHK_OTView_Enrollment__c
                                                     FROM Account
 													WHERE Id IN :updateStr]); 
        
        system.debug(lstAccts);
		try{
            for(Account acct: lstAccts){
                acct.ACC_CHK_OTView_Enrollment__c = true;
            }
            update lstAccts;
            
            return 'Vuelve'; 
        }catch(Exception e){
            system.debug(e);
            return 'Error'; 
        }
		
    }
}