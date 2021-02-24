public with sharing class HandlerAccount {
    
    public List<Account> AccountsNew { Get; Set; }
    
    public HandlerAccount(List<Account> accountsN) {
        if(accountsN != null && !accountsN.isEmpty()) {
            accountsNew = accountsN;
        }
      	
    }
    
    /*public void setUserId () {
        String userId = UserInfo.getUserId();
        if(accountsNew != null && !accountsNew.isEmpty()) {
            
            for (Account a : accountsNew) {
               	a.ACC_LCK_User__c = userId;
            }
            
        }
    }*/
    
    public void setParent () {
        
        for (Account a : accountsNew) {
                a.ACC_CHK_Partner__c = a.IsPartner;
            }
 
    }
}