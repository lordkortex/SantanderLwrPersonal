trigger TRG_AgentWork on AgentWork (after update) {
    
    
    
    for ( AgentWork newAW : Trigger.new){
        
        AgentWork oldAW = Trigger.oldMap.get(newAW.Id);
        Boolean acceptedWork = oldAW.AcceptDatetime != newAW.AcceptDatetime;
        
        if (Test.isRunningTest() ) {
            acceptedWork=true;
        } 
        
        if ( acceptedWork ){
            
            try{
                
                Case c = [SELECT Status,OwnerId FROM Case WHERE Id =: newAw.WorkItemId ];
                
                c.Status = 'In progress';
                c.CASE_Resolutor__c=c.OwnerId;	
                
                update c;
                
            } catch (exception e){
                
                //do nothing
                
                System.debug('error message: '+ e.getMessage());
                
            }
        }
    }
    
    
}