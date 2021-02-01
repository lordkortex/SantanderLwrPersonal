public class HANDLER_Account {
    
    public static void updateAccount(Map<Id, Account> oldAccountMap, List<Account> newAccountList){
        System.debug('HANDLER_Account.updateAccount >>>>> START');

        if(!newAccountList.isEmpty()){
            
            Set<Id> setAccountIdsOld = new Set<Id>();
            Set<Id> setAccountIdsNew = new Set<Id>();
            List<Account> listParentsOld = new List<Account>();
            List<Account> listParentsNew = new List<Account>();

            //Old Relation
            for(Account acc : oldAccountMap.values()){
                setAccountIdsOld.add(acc.ParentId);
            }
            if(!setAccountIdsOld.isEmpty()){
                listParentsOld = [SELECT Id, ACC_TXT_CompanyId__c FROM Account WHERE Id IN :setAccountIdsOld];
            }

            //New Relation
            for(Account acc : newAccountList){
                setAccountIdsNew.add(acc.ParentId);
            }
            if(!setAccountIdsNew.isEmpty()){
                listParentsNew = [SELECT Id, ACC_TXT_CompanyId__c FROM Account WHERE Id IN :setAccountIdsNew];
            }

               
            for(Account accList : newAccountList){
                String companyId;
                String parentCompanyId;
                String actionType;

                //INSERT - Null to not Null
                if(oldAccountMap.containsKey(accList.Id) && oldAccountMap.get(accList.Id).ParentId == null && accList.ParentId != null){
                    actionType = 'I';
                //UPDATE - value to another value (always not null)
                } else if(oldAccountMap.get(accList.Id).ParentId != null && accList.ParentId != null && accList.ParentId != oldAccountMap.get(accList.Id).ParentId){
                    actionType = 'U';
                //DELETE - not Null to Null
                } else if(oldAccountMap.get(accList.Id).ParentId != null && accList.ParentId == null){
                    actionType = 'D';
                }
                
                companyId = accList.ACC_TXT_CompanyId__c;
            
                //If it's delete we take the old relation before it becomes null.
                if(actionType == 'D'){
                    if(!listParentsOld.isEmpty()){
                        for(Account oldAcc : oldAccountMap.values()){
                            for(Account oldParent : listParentsOld){
                                system.debug(oldAcc);
                                system.debug(oldParent);
                                if(oldAcc.ParentId == oldParent.Id){
                                    parentCompanyId = oldParent.ACC_TXT_CompanyId__c;
                                    break;
                                }
                            }
                        }
                    }   
                    
                }else{
                    if(!listParentsNew.isEmpty()){
                        for(Account parentList : listParentsNew){
                            if(accList.ParentId == parentList.Id){
                                parentCompanyId = parentList.ACC_TXT_CompanyId__c;
                                break;
                            }  
                        }
                    }
                }

                System.debug('HANDLER_Account.updateAccount - Action Type >>>>>: '      + actionType);
                System.debug('HANDLER_Account.updateAccount - Account >>>>>: '          + accList);
                System.debug('HANDLER_Account.updateAccount - Company Id >>>>>: '   	+ companyId);
                System.debug('HANDLER_Account.updateAccount - Parent  Id >>>>>: '   	+ parentCompanyId);
                
                //CALLOUT METHOD
                if(companyId != null && actionType != null){
                    String bodyParams = '{"companyGlobalId":"'+companyId+'"}';
                    calloutCompanyHierarchy(companyId, parentCompanyId, bodyParams, actionType);
                }
            }
        } 
    }
    
    @future (callout=true)
    public static void calloutCompanyHierarchy(String companyId, String parentCompanyId, String bodyParams, String actionType) {
        System.debug('HANDLER_Account.calloutCompanyHierarchy >>>>> START');
        if(!Test.isRunningTest()){
            if(actionType != null && actionType != 'D'){
               	CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_CompanyHierarchy'); 
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{company_global_id}', parentCompanyId);
                Global_IntegrationWrapper.launchHttp(bodyParams,finalEndPoint,configWs.CNT_HTTPMethod__c);
            }else{
            	CNT_ApiConfiguration__c configWs = CNT_ApiConfiguration__c.getValues('TRG_CompanyHierarchy_Delete');
                String finalEndPoint = configWs.CNT_Endpoint__c.replace('{company_global_id}', parentCompanyId).replace('{child_company_global_id}', companyId);
                Global_IntegrationWrapper.launchHttp('',finalEndPoint,configWs.CNT_HTTPMethod__c);
            }   
        }
        System.debug('HANDLER_Account.calloutCompanyHierarchy >>>>> END');
    }
}