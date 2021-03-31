trigger TRG_ServiceConfig on SRV_Config__c (after insert, before insert, after update, before update) {
     if (Trigger.isInsert) {
        if(Trigger.isAfter){
            //TO DO
        }
        if(Trigger.isBefore){
            //TO DO
        }
    } else if(Trigger.isUpdate){
        if(Trigger.isBefore){
            //TO DO
        }
        if(Trigger.isAfter){
            System.debug('DENTRO ISUPDATE ISAFTER');
            HANDLER_ServiceConfig.updateOneTradeView(Trigger.oldMap, Trigger.new);
        }
    }
}