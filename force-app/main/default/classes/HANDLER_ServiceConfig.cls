public without sharing class HANDLER_ServiceConfig {
    
    public static void updateOneTradeView(Map<Id, SRV_Config__c> oldServiceConfigMap, List<SRV_Config__c> listNew){
        List<SRV_Config__c> listSCToUpdate = new List<SRV_Config__c>();
        Boolean deactiveOTV = false;
        Boolean activeOTV = false;
        
        for(SRV_Config__c sc: listNew){
            System.debug('HANDLER_ServiceConfig DENTRO FOR: ');
            System.debug('HANDLER_ServiceConfig DENTRO FOR: ' + sc.Service_Entity__c);
            System.debug('HANDLER_ServiceConfig DENTRO FOR OLD: ' + oldServiceConfigMap.get(sc.Id).Global_Activation__c);
            System.debug('HANDLER_ServiceConfig DENTRO FOR NEW: ' + sc.Global_Activation__c);
            if(sc.Service_Entity__c == 'Global' && (oldServiceConfigMap.get(sc.Id).Global_Activation__c != sc.Global_Activation__c)){
                System.debug('HANDLER_ServiceConfig DENTRO IF: ' + sc.Service_Entity__c);
                System.debug('HANDLER_ServiceConfig DENTRO OLD: ' + oldServiceConfigMap.get(sc.Id).Global_Activation__c);
                System.debug('HANDLER_ServiceConfig DENTRO NEW: ' + sc.Global_Activation__c);
                if(sc.Global_Activation__c == false){             
                    deactiveOTV = true;
                }else{
                    activeOTV = true;
                } 
                System.debug('deactiveOTV: ' + deactiveOTV);
                System.debug('activeOTV: ' + activeOTV);
                //List<SRV_Config__c> listSC  = [SELECT Id, One_Trade_Fx_Service__c, Service_Entity__c FROM SRV_Config__c WHERE Service_Entity__c != 'Global'];
                List<SRV_Config__c> listSC  = [SELECT Id, One_Trade_Fx_Service__c, Service_Entity__c FROM SRV_Config__c];
                System.debug('List SC: ' + listSC);
                //listSCToUpdate  = [SELECT Id, One_Trade_Fx_Service__c, SRV_Entity__c FROM SRV_Config__c WHERE  SRV_Entity__c != 'Global'];
                if(listSC.size() > 0){
                    for(SRV_Config__c scu: listSC){
                        if(deactiveOTV){
                            scu.One_Trade_Fx_Service__c = false;
                        }
                        if(activeOTV){
                            scu.One_Trade_Fx_Service__c = true;
                        }
                        listSCToUpdate.add(scu);
                    }
                    if(listSCToUpdate.size()>0){
						update listSCToUpdate;
					}
                }   
            }    
        }
    }
}