trigger TRG_Account on Account (after insert, after update, after delete, before update) {
    
    //AFTER INSERT 
    /*
    if (Trigger.isInsert && Trigger.isAfter) {
        
        //IF to avoid onboarding insertions.
        if(!Trigger.new.isEmpty() && Trigger.new.size() == 1){
            System.debug('TRG_Account >>>>> After Insert');
            HANDLER_Account.insertAccount(Trigger.new);
        }
    }*/
    
    //AFTER UPDATE
    if (Trigger.isUpdate && Trigger.isAfter) {
        
        //IF to avoid onboarding updates.
        if(!Trigger.new.isEmpty() && Trigger.new.size() == 1){
            System.debug('TRG_Account >>>>> After Update');
            HANDLER_Account.updateAccount(Trigger.oldMap, Trigger.new);
            
            
        }
    }

    if (Trigger.isUpdate && Trigger.isBefore){
         System.debug('TRG_Account >>>>> Before Update');
        if (!Trigger.new.isEmpty()){
            HANDLER_Account.startOneTradeProcess(Trigger.oldMap, Trigger.new);
            //HANDLER_Account.updateAccountContactRelation(Trigger.oldMap, Trigger.newMap);
        }
    }
    
    //AFTER DELETE
    /*
    if (Trigger.isDelete && Trigger.isAfter) {
        
        //IF to avoid massive deletes.
        if(!Trigger.old.isEmpty() && Trigger.old.size() == 1){
            System.debug('TRG_Account >>>>> After Delete');
            HANDLER_Account.deleteAccount(Trigger.old);
        }
    }*/
}