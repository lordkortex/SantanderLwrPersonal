public class CNT_ExternalURL {  
    public class externalURL{
        @AuraEnabled
        public String image{get;set;}
        @AuraEnabled    
        public String url{get;set;}
        @AuraEnabled    
        public String externalName{get;set;}
    }
   @AuraEnabled
    public static List<externalURL> getExternalURLs(){
        ID userID = UserInfo.getUserId();
     	List<externalURL> lstURL = new List<externalURL>();
        StaticResource static_resource = [SELECT Id, SystemModStamp
                                            FROM StaticResource 
                                           WHERE Name = 'ExternalURL'
                                           LIMIT 1];
		List<User> currentUser = [SELECT Id, ContactId FROM User WHERE Id = :userId LIMIT 1];
        if(!currentUser.isEmpty() && currentUser[0].ContactId != null){
            List<Contact> contactList = [SELECT Id, CONTACT_CHK_Mercury__c,CONTACT_CHK_Confirming__c FROM Contact WHERE Id = :currentUser[0].ContactId LIMIT 1];	  
            if(!contactList.isEmpty()){
                if(contactList[0].CONTACT_CHK_Mercury__c){
                    externalURL extURL = new externalURL();
					String image = '/resource/'
						   	   + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                               + '/ExternalURL/Mercury.png';
                    extURL.image = image;
                    extURL.externalName = 'Mercury';
                    extURL.url = 'https://gateway-mercury.appls.dev.gts.dev.weu.azure.paas.cloudcenter.corp/mercury/index';
                	lstURL.add(extURL);
                }
                if(contactList[0].CONTACT_CHK_Confirming__c){
                    externalURL extURL = new externalURL();
					String image = '/resource/'
						   	   + String.valueOf(((DateTime)static_resource.get('SystemModStamp')).getTime())
                               + '/ExternalURL/Confirming.png';
                    extURL.image = image;
                    extURL.externalName = 'Confirming';
                    extURL.url = 'https://gateway-mercury.appls.dev.gts.dev.weu.azure.paas.cloudcenter.corp/mercury/index';
                	lstURL.add(extURL);
                }
            }
        }
        return lstURL;        
    } 
}