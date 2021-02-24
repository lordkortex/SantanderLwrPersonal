trigger TRG_Case on Case (after insert, before insert, after update, before update) {
    
    if (Trigger.isInsert) {
        if(Trigger.isBefore){
            System.debug('Insert: isBefore');           
            HANDLER_Case.fillBasicFields(Trigger.new);
            HANDLER_Case.AssignRecordType(Trigger.new);     
            HANDLER_Case.updateOwner(Trigger.new);
			//Amr 17/02/2021 
            HANDLER_Case.cau2CaseCreation(Trigger.new);            
        }
        if(Trigger.isAfter){
            System.debug('Insert: isAfter');
            HANDLER_Case.sendComplianceEmail(Trigger.new);
        }
    }       
    if (Trigger.isUpdate) {
        if(Trigger.isBefore){
            System.debug('Update: isBefore');
            HANDLER_Case.shareObject(Trigger.new);        
            HANDLER_Case.stopMilestone(Trigger.new);
            HANDLER_Case.updateOwnerAfter(Trigger.old, Trigger.new);
            // DELETE GG - 04/08/2020 - 
            HANDLER_Case.UpdateResolutor(Trigger.oldMap, Trigger.new);
            //SNJ - 28/07/2020 - Comentar la siguiente linea antes de subir a PROD - Funcionalidad PAGO duplicado
            // DELETE GG - 04/08/2020 - 
            HANDLER_Case.closePaymentCase(Trigger.old, Trigger.new);            
            HANDLER_Case.inProgressHours(Trigger.oldMap, Trigger.new);
            //AMR Desarrollo Customer Service SGTGLTRSE-4781 13/01/2021
            HANDLER_Case.caseReopen(Trigger.oldMap,Trigger.new);             
        }          
        if(Trigger.isAfter){
            System.debug('Update: isAfter');
            HANDLER_Case.shareObject(Trigger.new);
            HANDLER_Case.createTask(Trigger.old,  Trigger.new);
            HANDLER_Case.deleteRelatedTasks(Trigger.new);   
            HANDLER_Case.updateMilestoneCase(Trigger.new);
            // DELETE GG - 04/08/2020 -
            HANDLER_Case.createChildCase(Trigger.oldMap,  Trigger.new);            
        }
    }
}