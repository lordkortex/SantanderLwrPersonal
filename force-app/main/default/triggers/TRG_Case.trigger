trigger TRG_Case on Case (after insert, before insert, after update, before update) {
    
    if (Trigger.isInsert) {
        System.debug('estoy en isInsert');
        
        if(Trigger.isBefore){
            System.debug('estoy en isBefore Insert');
            
            HANDLER_Case.fillBasicFields(Trigger.new);
            HANDLER_Case.AssignRecordType(Trigger.new);
            
            
        }
      
        
    }    
    System.debug('antes de actualizar');
    
    if (Trigger.isUpdate) {
        System.debug('estoy en isUpdate');
        
        if(Trigger.isBefore){
            System.debug('estoy en isBefore Update');
            //for(Case c : Trigger.new){
                //if(UserInfo.getUserId() == c.OwnerId){
                    
                   HANDLER_Case.shareObject(Trigger.new);

                 
                    HANDLER_Case.stopMilestone(Trigger.new);
                    HANDLER_Case.updateOwnerAfter(Trigger.old, Trigger.new);
            		// DELETE GG - 04/08/2020 - HANDLER_Case.UpdateResolutor(Trigger.oldMap, Trigger.new);
            		//SNJ - 28/07/2020 - Comentar la siguiente linea antes de subir a PROD - Funcionalidad PAGO duplicado
            		// DELETE GG - 04/08/2020 - HANDLER_Case.closePaymentCase(Trigger.old, Trigger.new);
            		//HANDLER_Case.CreateChildCase(Trigger.oldMap,  Trigger.new);
         
                //HANDLER_Case.stopMilestone(Trigger.old,Trigger.new);
				
					HANDLER_Case.inProgressHours(Trigger.oldMap, Trigger.new);
                
            }
            
            
            if(Trigger.isAfter){
                HANDLER_Case.shareObject(Trigger.new);
                HANDLER_Case.createTask(Trigger.old,  Trigger.new);
                HANDLER_Case.deleteRelatedTasks(Trigger.new);   
                HANDLER_Case.updateMilestoneCase(Trigger.new);
                // DELETE GG - 04/08/2020 - HANDLER_Case.CreateChildCase(Trigger.oldMap,  Trigger.new);
                
                
                
                
            }
            
        //}
        }
    }