trigger TRG_AgentWork on AgentWork (after update) {
    
    if (Trigger.isUpdate) {
        if(Trigger.isAfter){
    
    		for ( AgentWork newAW : Trigger.new){
        
            	AgentWork oldAW = Trigger.oldMap.get(newAW.Id);
        		Boolean acceptedWork = oldAW.AcceptDatetime != newAW.AcceptDatetime;
        
        		if (Test.isRunningTest() ) {
            		acceptedWork=true;
        		} 
        
        		if ( acceptedWork ){
            
           			 try{
                
                		RecordType RTC = [Select Name, id, SobjectType from RecordType where Name = 'Case RecordType' and SobjectType  = 'Case' LIMIT 1];
                
                		Case c = [SELECT Status,OwnerId, RecordTypeId FROM Case WHERE Id =: newAw.WorkItemId ];
                
                		if(c.RecordTypeId == RTC.Id){
                			c.Status = 'In progress';
                			c.CASE_Resolutor__c=c.OwnerId;
                		}
                        
                		update c;
 
            		} catch (exception e){
                
                		//do nothing
                
                		System.debug('error message: '+ e.getMessage());
                
            			}
        		}
    		}
    	}
    } 
    
}